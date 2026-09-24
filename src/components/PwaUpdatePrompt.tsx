import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw } from 'lucide-react';

const UNA_HORA = 60 * 60 * 1000;

/**
 * Aviso de versión nueva.
 *
 * El service worker sirve la plataforma desde la caché del móvil. Cuando se
 * publica una versión nueva, se descarga en segundo plano pero no se activa
 * sola: así nadie pierde lo que está escribiendo en una entrega. Este aviso
 * deja actualizar con un toque. Con la app abierta, se comprueba cada hora.
 */
export const PwaUpdatePrompt: React.FC = () => {
  const {
    needRefresh: [hayVersionNueva, setHayVersionNueva],
    updateServiceWorker
  } = useRegisterSW({
    onRegisteredSW(_url, registro) {
      if (registro) setInterval(() => registro.update().catch(() => undefined), UNA_HORA);
    }
  });

  if (!hayVersionNueva) return null;

  return (
    <div className="pwa-update" role="status" aria-live="polite">
      <RefreshCw size={18} strokeWidth={2} aria-hidden="true" />
      <span>Hay una versión nueva de la plataforma.</span>
      <button type="button" className="pwa-update-btn" onClick={() => updateServiceWorker(true)}>
        Actualizar
      </button>
      <button
        type="button"
        className="pwa-update-cerrar"
        onClick={() => setHayVersionNueva(false)}
        aria-label="Más tarde"
      >
        Luego
      </button>
    </div>
  );
};
