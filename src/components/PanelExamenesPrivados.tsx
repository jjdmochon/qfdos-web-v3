import React, { useEffect, useRef, useState } from 'react';
import { Lock, FileText } from 'lucide-react';
import { leerExamenPrivado, imagenExamenPrivado, type DocumentoPrivado } from '../services/examenesPrivados';
import { renderMarkdownMinimo } from '../utils/markdownMinimo';

/** Imagen del documento: se pide por nombre y se muestra como data URL en memoria. Si falla, no pinta nada. */
const ImagenPrivada: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let vivo = true;
    const nombre = src.split('/').pop() ?? '';
    imagenExamenPrivado(nombre).then(u => { if (vivo) setUrl(u); });
    return () => { vivo = false; };
  }, [src]);
  if (!url) return null;
  return <img src={url} alt={alt} style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0.5rem 0' }} />;
};

/**
 * Sección privada del panel docente. El documento se carga a demanda y vive solo
 * en el estado de este componente: nada va a localStorage, sessionStorage ni a
 * la caché. Una respuesta no válida no muestra nada.
 */
export const PanelExamenesPrivados: React.FC<{ documentos: DocumentoPrivado[] }> = ({ documentos }) => {
  const [abierto, setAbierto] = useState<{ nombre: string; texto: string } | null>(null);
  const [cargando, setCargando] = useState(false);
  const turno = useRef(0);

  const abrir = async (id: string) => {
    const mio = ++turno.current;
    setCargando(true);
    setAbierto(null);
    const d = await leerExamenPrivado(id);
    if (mio !== turno.current) return;
    setAbierto(d);
    setCargando(false);
  };

  // Al cerrar la pestaña se descarta todo
  useEffect(() => () => { turno.current++; }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="qfdos-card" style={{ padding: '1rem 1.25rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Lock size={16} /> Exámenes privados
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: '4px 0 0.75rem' }}>
          Solo se ven con tu sesión de profesor y no se guardan en este navegador.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {documentos.map(d => (
            <button key={d.id} className="btn btn-sm btn-outline" onClick={() => abrir(d.id)} title={d.nombre}>
              <FileText size={13} /> {d.nombre}
            </button>
          ))}
        </div>
      </div>
      {cargando && <div style={{ fontSize: '0.85rem' }}>Cargando…</div>}
      {abierto && (
        <div className="qfdos-card" style={{ padding: '1.25rem 1.5rem' }}>
          {renderMarkdownMinimo(abierto.texto, (src, alt, clave) => <ImagenPrivada key={clave} src={src} alt={alt} />)}
        </div>
      )}
    </div>
  );
};
