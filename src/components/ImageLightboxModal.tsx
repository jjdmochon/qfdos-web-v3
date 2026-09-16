import React, { useState, useEffect } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Download, 
  ZoomIn, 
  ZoomOut,
  Sparkles
} from 'lucide-react';

export interface LightboxImagePayload {
  src: string;
  alt?: string;
  title: string;
  subtitle?: string;
  tag?: string;
}

interface ImageLightboxModalProps {
  image: LightboxImagePayload | null;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({ image, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Cerrar con Escape y bloquear scroll del body
  useEffect(() => {
    if (!image) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [image, onClose]);

  // Reset zoom al cambiar de imagen
  useEffect(() => {
    setIsZoomed(false);
  }, [image?.src]);

  if (!image) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = image.src;
    const safeTitle = (image.title || 'esquema_quimico')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_-]/gi, '_');
    a.download = `${safeTitle}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div 
      className="lightbox-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3500,
        backgroundColor: 'rgba(10, 20, 35, 0.94)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 180ms ease-out'
      }}
      onClick={onClose}
    >
      {/* Barra Superior / Header del Visor Fullscreen */}
      <div 
        style={{
          padding: '0.85rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          background: 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          flexWrap: 'wrap',
          gap: '12px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {image.tag && (
            <span 
              className="qfdos-badge"
              style={{ 
                background: 'rgba(13, 148, 136, 0.3)', 
                color: '#5eead4', 
                border: '1px solid rgba(45, 212, 191, 0.4)',
                fontSize: '0.72rem',
                fontWeight: 800
              }}
            >
              {image.tag}
            </span>
          )}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#f8fafc', lineHeight: 1.2 }}>
              {image.title}
            </h3>
            {image.subtitle && (
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                {image.subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Acciones de control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Botón Alternar Zoom 100% vs Ajustar */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="btn btn-sm"
            style={{
              background: isZoomed ? 'var(--teal-ink)' : 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px'
            }}
            title={isZoomed ? 'Ajustar a pantalla completa' : 'Ver a resolución 100% nativa'}
          >
            {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
            <span>{isZoomed ? 'Ajustar' : 'Zoom 100%'}</span>
          </button>

          {/* Botón Descargar */}
          <button
            onClick={handleDownload}
            className="btn btn-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px'
            }}
            title="Descargar imagen en alta resolución"
          >
            <Download size={14} />
            <span>Descargar</span>
          </button>

          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="btn btn-sm"
            style={{
              background: 'rgba(239, 68, 68, 0.25)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
            title="Cerrar visor (Esc)"
          >
            <X size={16} /> Cerrar
          </button>
        </div>
      </div>

      {/* Contenedor Principal de la Imagen */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          alignItems: isZoomed ? 'flex-start' : 'center',
          justifyContent: isZoomed ? 'flex-start' : 'center',
          overflow: 'auto',
          padding: '1.25rem',
          position: 'relative',
          cursor: isZoomed ? 'zoom-out' : 'zoom-in'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          } else {
            setIsZoomed(!isZoomed);
          }
        }}
      >
        <div 
          style={{
            margin: 'auto',
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
        >
          <img 
            src={image.src} 
            alt={image.alt || image.title}
            style={{
              maxHeight: isZoomed ? 'none' : 'calc(100vh - 150px)',
              maxWidth: isZoomed ? 'none' : 'calc(100vw - 80px)',
              width: isZoomed ? 'auto' : 'auto',
              height: isZoomed ? 'auto' : 'auto',
              objectFit: 'contain',
              display: 'block',
              borderRadius: 'var(--radius-md)',
              cursor: isZoomed ? 'zoom-out' : 'zoom-in'
            }}
          />
        </div>
      </div>

      {/* Pie Informativo */}
      <div 
        style={{
          padding: '0.45rem 1.5rem',
          textAlign: 'center',
          background: 'rgba(15, 23, 42, 0.8)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#94a3b8',
          fontSize: '0.74rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span>💡 <strong>Tip de visualización:</strong> Haz clic en la imagen para alternar entre {isZoomed ? 'Ajustar a Pantalla' : 'Zoom 100% Real'}</span>
        <span>•</span>
        <span>Pulsa <kbd style={{ background: 'rgba(255,255,255,0.15)', padding: '1px 5px', borderRadius: '3px', color: '#fff' }}>ESC</kbd> o haz clic fuera para salir</span>
      </div>
    </div>
  );
};
