import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MoleculeDrug } from '../../data/qfdosData';
import { CartasDeckView } from './CartasDeckView';
import { X, Layers, ShieldCheck } from 'lucide-react';

interface CartasDocenteModalProps {
  onClose: () => void;
  onOpenAdmet?: (drug: MoleculeDrug) => void;
}

export const CartasDocenteModal: React.FC<CartasDocenteModalProps> = ({
  onClose,
  onOpenAdmet
}) => {
  const { isProfesor } = useAuth();

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Si no es profesor, denegar acceso completamente
  if (!isProfesor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{
          maxWidth: '1280px',
          width: '95vw',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div
          className="modal-header"
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--surface)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: 'linear-gradient(135deg, var(--primary, #1e3a8a) 0%, var(--secondary, #0d9488) 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(30, 58, 138, 0.25)'
              }}
            >
              <Layers size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Baraja de Fármacos QFDOS · Tema 1
                </h3>
                <span className="qfdos-badge badge-mint" style={{ fontSize: '0.62rem', padding: '1px 6px', fontWeight: 800 }}>
                  <ShieldCheck size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />
                  Exclusivo Docente
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                15 Cartas Coleccionables de la Sinapsis Colinérgica · Escala comparativa de afinidad e índices SAR
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={onClose}
              className="btn btn-sm btn-ghost-clean"
              title="Cerrar ventana (Esc)"
              style={{ padding: '6px', borderRadius: '50%' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div
          className="modal-body"
          style={{
            padding: '20px',
            overflowY: 'auto',
            background: 'var(--neutral-bg, #f8fafc)'
          }}
        >
          <CartasDeckView onOpenAdmet={onOpenAdmet} showDocenteBanner={true} />
        </div>

        {/* Pie del Modal */}
        <div
          className="modal-footer"
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--surface)'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Química Farmacéutica II (Grupo E) · Curso 2026/2027 · Universidad de Granada
          </div>
          <button onClick={onClose} className="btn btn-sm btn-primary" style={{ padding: '6px 16px' }}>
            Cerrar Baraja
          </button>
        </div>
      </div>
    </div>
  );
};
