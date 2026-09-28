import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import { EVENTO_PREFERENCIAS, guardarEleccion, leerEleccion, type Eleccion } from '../services/consentimiento';

/**
 * Aviso de cookies de analítica. Aparece en la primera visita (también en la
 * portada de acceso) y se puede reabrir desde el pie. Aceptar y Rechazar
 * tienen el mismo peso: rechazar no puede ser más difícil que aceptar.
 */
export const AvisoCookies: React.FC = () => {
  const [visible, setVisible] = useState(() => leerEleccion() === null);

  useEffect(() => {
    const abrir = () => setVisible(true);
    window.addEventListener(EVENTO_PREFERENCIAS, abrir);
    return () => window.removeEventListener(EVENTO_PREFERENCIAS, abrir);
  }, []);

  if (!visible) return null;

  const elegir = (e: Eleccion) => {
    guardarEleccion(e);
    setVisible(false);
  };

  return (
    <section className="aviso-cookies" role="region" aria-label="Aviso de cookies" aria-live="polite">
      <Cookie size={20} className="aviso-cookies-icono" aria-hidden="true" />
      <p>
        Usamos <strong>Google Analytics</strong> para saber qué secciones se consultan y mejorar la
        plataforma. Solo se activa si lo aceptas. Tu sesión y tus preferencias se guardan en este
        navegador para que la plataforma funcione, y eso no depende de esta elección. Puedes
        cambiarla cuando quieras desde el pie de página.
      </p>
      <div className="aviso-cookies-acciones">
        <button type="button" className="btn btn-primary" onClick={() => elegir('rechazada')}>
          Rechazar
        </button>
        <button type="button" className="btn btn-primary" onClick={() => elegir('aceptada')}>
          Aceptar
        </button>
      </div>
    </section>
  );
};
