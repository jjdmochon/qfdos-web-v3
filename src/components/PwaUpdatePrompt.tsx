import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw } from 'lucide-react';
import { hayTrabajoEnCurso, EVENTO_TRABAJO_EN_CURSO } from '../utils/proteccionSalida';

const CADA_5_MIN = 5 * 60 * 1000;
const SEGUNDOS_AVISO = 5;
const CLAVE_INTENTOS = 'qfdos_recarga_version';

/**
 * Recarga obligatoria con versión nueva.
 *
 * Cada compilación publica version.json con su hora (vite.config.ts). La
 * pestaña lo consulta sin caché al abrir, cada 5 minutos y al volver a
 * primer plano; si la hora publicada no es la del código que está
 * ejecutando, la plataforma se bloquea y recarga sola a los pocos segundos.
 *
 * Si hay un examen empezado y sin entregar no se recarga: se avisa de que la
 * recarga llegará al entregar, y llega en cuanto termina. Para no entrar en
 * bucle si Pages tarda en servir la versión nueva, cada versión se intenta
 * como mucho dos veces seguidas; después queda el botón de recargar.
 */
export const PwaUpdatePrompt: React.FC = () => {
  const registro = useRef<ServiceWorkerRegistration | undefined>(undefined);
  const { needRefresh: [swEnEspera] } = useRegisterSW({
    onRegisteredSW(_url: string, r?: ServiceWorkerRegistration) {
      registro.current = r;
    }
  });

  const [nueva, setNueva] = useState<string | null>(null);
  const [esperandoExamen, setEsperandoExamen] = useState(false);
  const [cuenta, setCuenta] = useState(SEGUNDOS_AVISO);
  const [recargando, setRecargando] = useState(false);

  const comprobar = useCallback(async () => {
    if (!navigator.onLine) return;
    try {
      const resp = await fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!resp.ok) return;
      const { build } = await resp.json();
      if (typeof build === 'string' && build && build !== __BUILD_TIME__) setNueva(build);
    } catch { /* sin red o sin version.json (desarrollo): nada que hacer */ }
  }, []);

  // Cuándo se comprueba
  useEffect(() => {
    const inicial = window.setTimeout(comprobar, 3000);
    const intervalo = window.setInterval(comprobar, CADA_5_MIN);
    const alVolver = () => { if (document.visibilityState === 'visible') comprobar(); };
    document.addEventListener('visibilitychange', alVolver);
    window.addEventListener('online', comprobar);
    return () => {
      window.clearTimeout(inicial);
      window.clearInterval(intervalo);
      document.removeEventListener('visibilitychange', alVolver);
      window.removeEventListener('online', comprobar);
    };
  }, [comprobar]);

  // Un service worker nuevo en espera también es una versión nueva
  useEffect(() => { if (swEnEspera) setNueva(n => n ?? 'sw'); }, [swEnEspera]);

  // Examen en curso: se espera a que se entregue o se cierre
  useEffect(() => {
    const revisar = () => setEsperandoExamen(hayTrabajoEnCurso());
    revisar();
    window.addEventListener(EVENTO_TRABAJO_EN_CURSO, revisar);
    return () => window.removeEventListener(EVENTO_TRABAJO_EN_CURSO, revisar);
  }, []);

  const intentos = (): { build: string; n: number } => {
    try { return JSON.parse(sessionStorage.getItem(CLAVE_INTENTOS) || '') ?? { build: '', n: 0 }; }
    catch { return { build: '', n: 0 }; }
  };
  const agotado = nueva !== null && intentos().build === nueva && intentos().n >= 2;

  const recargar = useCallback(async () => {
    if (recargando || nueva === null) return;
    setRecargando(true);
    const previo = intentos();
    try {
      sessionStorage.setItem(CLAVE_INTENTOS, JSON.stringify({ build: nueva, n: previo.build === nueva ? previo.n + 1 : 1 }));
    } catch { /* sin sessionStorage: se recarga igual */ }
    // Que el service worker nuevo tome el control antes de recargar; si no, la
    // recarga podría servir la precaché antigua
    const sw = navigator.serviceWorker;
    if (sw && registro.current) {
      await new Promise<void>(resolver => {
        const listo = () => resolver();
        sw.addEventListener('controllerchange', listo, { once: true });
        window.setTimeout(listo, 6000);
        registro.current!.update()
          .then(() => registro.current?.waiting?.postMessage({ type: 'SKIP_WAITING' }))
          .catch(() => resolver());
      });
    }
    window.location.reload();
  }, [nueva, recargando]);

  // Cuenta atrás y recarga automática
  useEffect(() => {
    if (nueva === null || esperandoExamen || agotado) return;
    setCuenta(SEGUNDOS_AVISO);
    const t = window.setInterval(() => setCuenta(c => {
      if (c <= 1) { window.clearInterval(t); recargar(); return 0; }
      return c - 1;
    }), 1000);
    return () => window.clearInterval(t);
  }, [nueva, esperandoExamen, agotado, recargar]);

  if (nueva === null) return null;

  if (esperandoExamen) {
    return (
      <div className="pwa-update" role="status" aria-live="polite">
        <RefreshCw size={18} strokeWidth={2} aria-hidden="true" />
        <span>Hay una versión nueva. Al entregar el examen, la página se recargará sola.</span>
      </div>
    );
  }

  return (
    <div className="pwa-bloqueo" role="alertdialog" aria-modal="true" aria-labelledby="pwa-bloqueo-titulo">
      <div className="pwa-bloqueo-caja">
        <RefreshCw size={28} strokeWidth={2} aria-hidden="true" className={recargando ? 'pwa-girando' : undefined} />
        <h2 id="pwa-bloqueo-titulo">Hay una versión nueva de la plataforma</h2>
        <p>
          {agotado
            ? 'No hemos podido cargarla sola. Pulsa el botón; si sigue sin cambiar, cierra la pestaña y vuelve a abrirla.'
            : recargando ? 'Cargando la versión nueva…' : `Recargamos la página en ${cuenta} s para que veas el contenido actualizado.`}
        </p>
        <button type="button" className="pwa-update-btn" onClick={recargar} disabled={recargando}>
          Recargar ahora
        </button>
      </div>
    </div>
  );
};
