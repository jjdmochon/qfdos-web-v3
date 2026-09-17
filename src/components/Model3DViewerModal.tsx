import React, { useState, useRef } from 'react';
import { 
  X, 
  Box, 
  RotateCw, 
  Maximize2, 
  Download, 
  Sparkles, 
  Info, 
  Atom, 
  ExternalLink,
  RefreshCw
} from 'lucide-react';

// Componente web para el Web Component <model-viewer> de Google
const ModelViewer = 'model-viewer' as any;

interface Model3DViewerModalProps {
  onClose: () => void;
  modelUrl?: string;
  modelTitle?: string;
}

export const Model3DViewerModal: React.FC<Model3DViewerModalProps> = ({
  onClose,
  modelUrl,
  modelTitle = 'Receptor Nicotínico de Acetilcolina (nAChR)'
}) => {
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const modelViewerRef = useRef<any>(null);

  // Resolver URL del modelo respetando la ruta base de Vite / GitHub Pages
  const finalModelUrl = modelUrl || `${import.meta.env.BASE_URL}models/nicotinic_acetylcholine_receptor.glb`;

  const handleResetCamera = () => {
    if (modelViewerRef.current) {
      try {
        modelViewerRef.current.cameraOrbit = '0deg 75deg 105%';
        modelViewerRef.current.resetTurntableRotation?.();
      } catch (e) {
        // Fallback no intrusivo
      }
    }
  };

  const handleToggleFullscreen = () => {
    if (modelViewerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      } else {
        modelViewerRef.current.requestFullscreen?.();
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100, backdropFilter: 'blur(8px)' }}>
      <div 
        className="modal-container" 
        style={{ 
          maxWidth: '960px', 
          width: '95vw',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div 
          className="modal-header" 
          style={{ 
            padding: '1.2rem 1.6rem', 
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, var(--hdr-bg) 0%, var(--hdr-bg-2) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: '10px', 
                background: 'linear-gradient(135deg, rgba(13,148,136,0.3) 0%, rgba(30,58,138,0.4) 100%)',
                border: '1px solid var(--teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--teal-ink)'
              }}
            >
              <Box size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  {modelTitle}
                </h3>
                <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                  GLB 3D · 7.0 MB
                </span>
                <span className="qfdos-badge badge-navy" style={{ fontSize: '0.68rem' }}>
                  Tema 01 · Sistema Colinérgico
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Estructura tridimensional interactiva · British Pharmacological Society
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="btn btn-icon" 
            style={{ color: 'var(--text-muted)' }}
            title="Cerrar visor 3D"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo: Visor 3D y Controles flotantes */}
        <div style={{ position: 'relative', background: 'radial-gradient(circle at center, #17263f 0%, #070e18 100%)', minHeight: '440px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <ModelViewer
            ref={modelViewerRef}
            src={finalModelUrl}
            alt="Modelo 3D del Receptor Nicotínico de Acetilcolina (nAChR)"
            camera-controls=""
            auto-rotate={isAutoRotate ? "" : undefined}
            rotation-per-second="25deg"
            shadow-intensity="1.5"
            shadow-softness="0.8"
            exposure="1.0"
            loading="eager"
            style={{
              width: '100%',
              height: '460px',
              outline: 'none',
              cursor: 'grab'
            }}
          />

          {/* Barra Flotante de Herramientas 3D */}
          <div 
            style={{ 
              position: 'absolute', 
              bottom: '14px', 
              right: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              background: 'rgba(15, 27, 48, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              zIndex: 10
            }}
          >
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className="btn btn-sm"
              style={{
                fontSize: '0.72rem',
                padding: '4px 8px',
                background: isAutoRotate ? 'var(--teal)' : 'transparent',
                color: isAutoRotate ? '#fff' : 'var(--text-muted)',
                border: '1px solid var(--border-color)'
              }}
              title={isAutoRotate ? 'Pausar rotación automática' : 'Activar rotación automática'}
            >
              <RotateCw size={12} /> {isAutoRotate ? 'Giro ON' : 'Giro OFF'}
            </button>

            <button
              onClick={handleResetCamera}
              className="btn btn-sm btn-outline"
              style={{ fontSize: '0.72rem', padding: '4px 8px' }}
              title="Restablecer posición inicial de la cámara"
            >
              <RefreshCw size={12} /> Centrar
            </button>

            <button
              onClick={handleToggleFullscreen}
              className="btn btn-sm btn-outline"
              style={{ fontSize: '0.72rem', padding: '4px 8px' }}
              title="Ver a pantalla completa"
            >
              <Maximize2 size={12} /> Pantalla completa
            </button>

            <a
              href={finalModelUrl}
              download="receptor_nicotinico_nachr.glb"
              className="btn btn-sm btn-mint"
              style={{ fontSize: '0.72rem', padding: '4px 8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              title="Descargar archivo 3D en formato .GLB nativo"
            >
              <Download size={12} /> Descargar .GLB
            </a>
          </div>

          {/* Ayuda de interacción interactiva */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '14px', 
              left: '16px',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              pointerEvents: 'none'
            }}
          >
            🖱️ Arrastra para rotar 360° · Rueda para zoom · Clic derecho para desplazar
          </div>
        </div>

        {/* Ficha Molecular y Científica */}
        <div style={{ padding: '1.2rem 1.6rem', background: 'var(--surface-raised)', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
            
            <div style={{ background: 'var(--surface-card)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-ink)', marginBottom: '4px' }}>
                <Atom size={14} /> Arquitectura Pentamérica
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.45 }}>
                Canal iónico transmembranal formado por 5 subunidades ordenadas simétricamente alrededor de un poro central permeable a cationes (Na⁺/K⁺/Ca²⁺).
              </p>
            </div>

            <div style={{ background: 'var(--surface-card)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-ink)', marginBottom: '4px' }}>
                <Sparkles size={14} /> Sitios Ortostéricos de Unión
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.45 }}>
                Ubicados en las interfases de las subunidades α. El amonio cuaternario de la acetilcolina establece interacciones catión-π con residuos aromáticos (Trp/Tyr).
              </p>
            </div>

            <div style={{ background: 'var(--surface-card)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>
                <Info size={14} /> Relevancia en QFDOS
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.45 }}>
                Diana fundamental para el diseño de agonistas nicotínicos, fármacos para la cesación tabáquica (vareniclina) y bloqueantes neuromusculares despolarizantes y no despolarizantes.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
