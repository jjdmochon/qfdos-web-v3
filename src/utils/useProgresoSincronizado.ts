import { useEffect, useRef, useState } from 'react';
import { getSesion } from '../services/sesion';
import {
  fusionar, leerProgresoClave, guardarProgresoClave,
  type Valor, type ProgresoMapa
} from '../services/progreso';

export type EstadoSync = 'local' | 'sincronizando' | 'ok' | 'error';

/**
 * Sincroniza con la cuenta un mapa id → valor que el componente ya guarda en
 * localStorage. Cada cambio lleva su marca de tiempo (y un borrado deja la
 * suya, para que el otro dispositivo no lo resucite). Al abrir se fusiona con
 * el servidor —gana lo más reciente— y los cambios se envían agrupados.
 * Sin sesión, sin red o con un Codigo.gs anterior a la v8 no hace nada: el
 * progreso sigue en el navegador.
 */
export function useProgresoSincronizado<T extends Valor>(
  clave: string,
  almacenMarcas: string,
  mapa: Record<string, T>,
  setMapa: (m: Record<string, T>) => void,
  /** Solo sincroniza mientras está activo (por ejemplo, con el modal abierto) */
  activo = true
): EstadoSync {
  const marcas = useRef<Record<string, number>>((() => {
    try { return JSON.parse(localStorage.getItem(almacenMarcas) || '{}'); } catch { return {}; }
  })());
  const previo = useRef<Record<string, T>>(mapa);
  const actual = useRef<Record<string, T>>(mapa);
  actual.current = mapa;
  const sincronizado = useRef(false);
  const temporizador = useRef<number | undefined>(undefined);
  const [estado, setEstado] = useState<EstadoSync>('local');

  const guardarMarcas = () => {
    try { localStorage.setItem(almacenMarcas, JSON.stringify(marcas.current)); } catch { /* sin almacenamiento */ }
  };

  const aProgreso = (): ProgresoMapa => {
    const r: ProgresoMapa = {};
    for (const id of new Set([...Object.keys(actual.current), ...Object.keys(marcas.current)])) {
      r[id] = [actual.current[id] ?? null, marcas.current[id] ?? 0];
    }
    return r;
  };

  const enviar = () => {
    temporizador.current = undefined;
    guardarProgresoClave(clave, aProgreso()).then(ok => setEstado(ok ? 'ok' : 'error'));
  };

  // Marca de tiempo de lo que cambia (altas, cambios y borrados) y envío diferido
  useEffect(() => {
    let hayCambios = false;
    for (const id of new Set([...Object.keys(mapa), ...Object.keys(previo.current)])) {
      if (mapa[id] !== previo.current[id]) { marcas.current[id] = Date.now(); hayCambios = true; }
    }
    previo.current = mapa;
    if (!hayCambios) return;
    guardarMarcas();
    if (sincronizado.current) {
      setEstado('sincronizando');
      window.clearTimeout(temporizador.current);
      temporizador.current = window.setTimeout(enviar, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapa]);

  // Al abrir: traer lo del servidor y fusionar
  useEffect(() => {
    sincronizado.current = false;
    if (!activo || !getSesion()) return;
    let cancelado = false;
    setEstado('sincronizando');
    leerProgresoClave(clave).then(remoto => {
      if (cancelado) return;
      if (!remoto) { setEstado('error'); return; }
      const { fusion, cambiaLocal, cambiaRemoto } = fusionar(aProgreso(), remoto);
      if (cambiaLocal) {
        const nuevo: Record<string, T> = {};
        for (const id of Object.keys(fusion)) {
          marcas.current[id] = fusion[id][1];
          if (fusion[id][0] !== null) nuevo[id] = fusion[id][0] as T;
        }
        previo.current = nuevo;
        guardarMarcas();
        setMapa(nuevo);
      }
      sincronizado.current = true;
      if (cambiaRemoto) enviar();
      else setEstado('ok');
    });
    return () => {
      cancelado = true;
      sincronizado.current = false;
      // Al cerrar no se pierde lo pendiente
      if (temporizador.current !== undefined) { window.clearTimeout(temporizador.current); enviar(); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave, almacenMarcas, activo]);

  return estado;
}
