import { useEffect } from 'react';

// ==========================================================================
// Protección de salida de un examen en curso
//
// El comportamiento general de los modales (role="dialog", foco atrapado,
// Escape, foco devuelto) lo da `services/modalA11y.ts` a cualquier
// `.modal-overlay`. Aquí solo va lo específico de perder un examen a medias:
// cerrar la pestaña o recargar piden confirmación, y la recarga forzada por
// versión nueva (PwaUpdatePrompt) espera a que no quede nada en curso.
// ==========================================================================

let enCurso = 0;
export const EVENTO_TRABAJO_EN_CURSO = 'qfdos-trabajo-en-curso';

/** ¿Hay algún examen empezado y sin entregar en esta pestaña? */
export const hayTrabajoEnCurso = () => enCurso > 0;

/** Mientras `activo`, cerrar la pestaña o recargar pide confirmación. */
export function useProtegerSalida(activo: boolean) {
  useEffect(() => {
    if (!activo) return;
    const antesDeCerrar = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    enCurso++;
    window.dispatchEvent(new Event(EVENTO_TRABAJO_EN_CURSO));
    window.addEventListener('beforeunload', antesDeCerrar);
    return () => {
      window.removeEventListener('beforeunload', antesDeCerrar);
      enCurso = Math.max(0, enCurso - 1);
      window.dispatchEvent(new Event(EVENTO_TRABAJO_EN_CURSO));
    };
  }, [activo]);
}
