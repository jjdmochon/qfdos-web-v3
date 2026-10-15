import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const CLAVE = 'qfdos_aviso_grabacion_tests_2026_10';
/** A partir de esta fecha el aviso deja de mostrarse solo; queda en el tablón. */
const HASTA = new Date('2026-11-01T00:00:00+01:00').getTime();
export const CORREO_CONTACTO = 'juandiaz@go.ugr.es';

/**
 * Aviso al entrar: el fallo que impedía grabar algunas notas de los tests está
 * resuelto. Se cierra con la ✕ y no vuelve a salir en ese navegador.
 */
export const AvisoGrabacionTests: React.FC = () => {
  const [visible, setVisible] = useState(() => {
    if (Date.now() >= HASTA) return false;
    try { return localStorage.getItem(CLAVE) !== 'cerrado'; } catch { return true; }
  });
  if (!visible) return null;

  const cerrar = () => {
    setVisible(false);
    try { localStorage.setItem(CLAVE, 'cerrado'); } catch { /* vuelve a salir en la próxima visita */ }
  };

  return (
    <div className="container" style={{ marginTop: '12px' }}>
      <div className="entrega-aviso entrega-aviso--ok" role="status" style={{ fontSize: '0.86rem', padding: '10px 12px' }}>
        <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
        <span style={{ flex: 1 }}>
          <strong>Las notas de los tests ya se graban.</strong> Hemos solucionado el problema que impedía registrar
          algunas notas de los tests de los Temas 2 y 3. Si alguno no se te grabó, recarga la página (Ctrl+F5 en el
          ordenador; en el móvil, cierra y vuelve a abrir la web) y repite el test. Si aun así no se graba, escríbeme a{' '}
          <a href={`mailto:${CORREO_CONTACTO}?subject=${encodeURIComponent('QFDOS · No se graba la nota del test')}`}>
            {CORREO_CONTACTO}
          </a>{' '}
          indicando el tema, el modelo y el mensaje que te aparece al terminar.
        </span>
        <button type="button" className="btn btn-xs btn-outline" onClick={cerrar} aria-label="Cerrar el aviso" style={{ flexShrink: 0 }}>
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
