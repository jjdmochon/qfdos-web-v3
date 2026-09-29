import { useEffect, useState } from 'react';

// ==========================================================================
// Instalar la plataforma como app
//
// Android y escritorio (Chrome, Edge) avisan con `beforeinstallprompt`, que
// llega una sola vez y muy pronto, así que se guarda en cuanto se importa este
// módulo. iOS no lo tiene: solo se puede instalar desde Safari con
// Compartir → «Añadir a pantalla de inicio», y ahí hay que explicarlo.
// ==========================================================================

interface EventoInstalacion extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let diferido: EventoInstalacion | null = null;
const oyentes = new Set<() => void>();
const avisar = () => oyentes.forEach(f => f());

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    diferido = e as EventoInstalacion;
    avisar();
  });
  window.addEventListener('appinstalled', () => {
    diferido = null;
    avisar();
  });
}

const yaInstalada = (): boolean =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true);

const esIOS = (): boolean =>
  typeof navigator !== 'undefined' &&
  (/iphone|ipad|ipod/i.test(navigator.userAgent) ||
    // iPadOS se presenta como Mac con pantalla táctil
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

export type OpcionInstalar = 'nativa' | 'ios' | null;

/**
 * `nativa`: el navegador ofrece instalar con un toque. `ios`: hay que
 * explicarlo. `null`: ya está instalada o el navegador no puede instalarla.
 */
export function useInstalarApp() {
  const [, forzar] = useState(0);
  useEffect(() => {
    const f = () => forzar(n => n + 1);
    oyentes.add(f);
    return () => { oyentes.delete(f); };
  }, []);

  const opcion: OpcionInstalar = yaInstalada() ? null : diferido ? 'nativa' : esIOS() ? 'ios' : null;

  const instalar = async (): Promise<boolean> => {
    if (!diferido) return false;
    const e = diferido;
    diferido = null; // el evento solo vale una vez
    avisar();
    await e.prompt();
    const { outcome } = await e.userChoice;
    return outcome === 'accepted';
  };

  return { opcion, instalar };
}
