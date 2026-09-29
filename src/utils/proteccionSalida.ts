import { useEffect } from 'react';

// ==========================================================================
// Protección de salida de un examen en curso
//
// El comportamiento general de los modales (role="dialog", foco atrapado,
// Escape, foco devuelto) lo da `services/modalA11y.ts` a cualquier
// `.modal-overlay`. Aquí solo va lo específico de perder un examen a medias:
// cerrar la pestaña o recargar piden confirmación.
// ==========================================================================

/** Mientras `activo`, cerrar la pestaña o recargar pide confirmación. */
export function useProtegerSalida(activo: boolean) {
  useEffect(() => {
    if (!activo) return;
    const antesDeCerrar = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', antesDeCerrar);
    return () => window.removeEventListener('beforeunload', antesDeCerrar);
  }, [activo]);
}
