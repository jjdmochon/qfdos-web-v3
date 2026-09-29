import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CourseAttachment, QfdosTopic } from '../data/qfdosData';
import {
  ArchivoDrive, EXTENSIONES_PERMITIDAS, MAX_SUBIDA_BYTES, listarMaterialesDrive, subirADrive, validarFichero
} from '../services/drive';
import {
  AlertCircle, AlertTriangle, Check, CheckCircle2, Copy, ExternalLink, File as FileIcon, FileText,
  FolderOpen, Image as ImageIcon, Music, RefreshCw, UploadCloud
} from 'lucide-react';

type Destino = 'apuntes' | 'diapositivas' | 'complementario';

interface SubidaDriveProps {
  topics: QfdosTopic[];
  /** Módulo elegido en la pestaña; sin él solo se sube y se copia el enlace */
  topicId?: string;
  onUpdateTopics: (updated: QfdosTopic[]) => void;
}

interface EnCurso {
  clave: string;
  nombre: string;
  tamano: number;
  progreso: number;
  estado: 'subiendo' | 'error';
  error?: string;
}

const formatBytes = (b: number): string =>
  b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;

const icono = (mime: string): React.ElementType =>
  mime === 'application/pdf' || /word|presentation|powerpoint|sheet|excel|text/.test(mime) ? FileText
  : mime.startsWith('image/') ? ImageIcon
  : mime.startsWith('audio/') ? Music
  : FileIcon;

const NOMBRE_DESTINO: Record<Destino, string> = {
  apuntes: 'los apuntes',
  diapositivas: 'las diapositivas',
  complementario: 'un material complementario'
};

/**
 * Sube los materiales a la carpeta de Drive del profesor y devuelve el enlace,
 * que se puede asignar a un módulo con un clic: sin subir el fichero dos veces
 * ni pegar enlaces a mano. Los cambios en el módulo se publican después con el
 * botón «Publicar» de siempre.
 */
export const SubidaDrive: React.FC<SubidaDriveProps> = ({ topics, topicId, onUpdateTopics }) => {
  const [enCurso, setEnCurso] = useState<EnCurso[]>([]);
  const [archivos, setArchivos] = useState<ArchivoDrive[]>([]);
  const [carpeta, setCarpeta] = useState('');
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState<string | null>(null);
  const [aviso2, setAviso2] = useState<string | null>(null);   // confirmaciones
  const [arrastrando, setArrastrando] = useState(false);
  const [copiado, setCopiado] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ocupado = enCurso.some(e => e.estado === 'subiendo');
  const topic = topics.find(t => t.id === topicId);

  const recargar = useCallback(async () => {
    setCargando(true);
    const r = await listarMaterialesDrive();
    if (r.ok) {
      setArchivos(r.datos.archivos);
      setCarpeta(r.datos.carpeta);
      setAviso(null);
    } else {
      setAviso(r.error);
    }
    setCargando(false);
  }, []);

  useEffect(() => { recargar(); }, [recargar]);

  const subir = async (lista: FileList | null) => {
    if (!lista || !lista.length) return;
    setAviso2(null);
    for (const file of Array.from(lista)) {
      const clave = `${file.name}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const invalido = validarFichero(file);
      if (invalido) {
        setEnCurso(prev => [...prev, { clave, nombre: file.name, tamano: file.size, progreso: 0, estado: 'error', error: invalido }]);
        continue;
      }
      setEnCurso(prev => [...prev, { clave, nombre: file.name, tamano: file.size, progreso: 0, estado: 'subiendo' }]);
      const r = await subirADrive(file, f =>
        setEnCurso(prev => prev.map(e => (e.clave === clave ? { ...e, progreso: f } : e)))
      );
      if (r.ok) {
        setEnCurso(prev => prev.filter(e => e.clave !== clave));
        setArchivos(prev => [{ ...r.datos, creado: new Date().toISOString() }, ...prev.filter(a => a.id !== r.datos.id)]);
      } else {
        setEnCurso(prev => prev.map(e => (e.clave === clave ? { ...e, estado: 'error', error: r.error } : e)));
      }
    }
  };

  const copiar = async (a: ArchivoDrive) => {
    try {
      await navigator.clipboard.writeText(a.url);
      setCopiado(a.id);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      window.prompt('Copia el enlace:', a.url);
    }
  };

  const asignar = (a: ArchivoDrive, destino: Destino) => {
    if (!topic) return;
    onUpdateTopics(topics.map(t => {
      if (t.id !== topic.id) return t;
      if (destino === 'apuntes') return { ...t, notesPdfUrl: a.url, notesPdfName: a.nombre };
      if (destino === 'diapositivas') return { ...t, slidesPdfUrl: a.url, slidesPdfName: a.nombre };
      const adjunto: CourseAttachment = {
        id: `att-drive-${a.id}`,
        title: a.nombre.replace(/\.[a-z0-9]{1,5}$/i, ''),
        type: a.mime === 'application/pdf' ? 'pdf' : a.mime.startsWith('audio/') ? 'audio' : 'data',
        url: a.url,
        driveId: a.id,
        size: formatBytes(a.tamano),
        date: new Date().toLocaleDateString('es-ES')
      };
      return { ...t, attachments: [...(t.attachments ?? []).filter(x => x.url !== a.url), adjunto] };
    }));
    setAviso2(`«${a.nombre}» queda como ${NOMBRE_DESTINO[destino]} de ${topic.number || topic.title}. Publica los cambios (botón «Publicar») para que lo vea el alumnado.`);
  };

  return (
    <div className="uploader-root">
      <div
        className={`uploader-drop ${arrastrando ? 'is-dragging' : ''} ${ocupado ? 'is-busy' : ''}`}
        onDragOver={e => { e.preventDefault(); setArrastrando(true); }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={e => { e.preventDefault(); setArrastrando(false); subir(e.dataTransfer.files); }}
        onClick={() => { if (!ocupado) inputRef.current?.click(); }}
        role="button"
        tabIndex={0}
        aria-busy={ocupado}
        onKeyDown={e => { if (!ocupado && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); inputRef.current?.click(); } }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={EXTENSIONES_PERMITIDAS.map(e => `.${e}`).join(',')}
          style={{ display: 'none' }}
          onChange={e => { subir(e.target.files); e.target.value = ''; }}
        />
        <div className="uploader-drop-icon"><UploadCloud size={32} strokeWidth={1.6} /></div>
        <div style={{ textAlign: 'center' }}>
          <strong style={{ fontSize: '0.98rem', color: 'var(--text-title)', display: 'block' }}>
            {ocupado ? 'Subiendo a Drive…' : 'Arrastra los materiales aquí'}
          </strong>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            o haz clic para seleccionarlos · se guardan en vuestra carpeta de Drive y se comparten con enlace
          </span>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, opacity: 0.85 }}>
            PDF · PPTX · DOCX · imágenes · audio — hasta {MAX_SUBIDA_BYTES / 1048576} MB por fichero
          </div>
        </div>
      </div>

      {enCurso.map(e => (
        <div key={e.clave} className="uploader-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: '0.82rem' }}>
            <span className="uploader-item-name" title={e.nombre}>{e.nombre}</span>
            <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              {e.estado === 'subiendo' ? `${Math.round(e.progreso * 100)} % · ${formatBytes(e.tamano)}` : formatBytes(e.tamano)}
            </span>
          </div>
          {e.estado === 'subiendo' ? (
            <div style={{ height: 6, borderRadius: 3, background: 'var(--surface-alt)', overflow: 'hidden' }} role="progressbar" aria-valuenow={Math.round(e.progreso * 100)} aria-valuemin={0} aria-valuemax={100}>
              <div style={{ height: '100%', width: `${e.progreso * 100}%`, background: 'var(--teal)', transition: 'width 0.3s' }} />
            </div>
          ) : (
            <div className="uploader-error" style={{ margin: 0 }}>
              <AlertCircle size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{e.error}</span>
              <button type="button" className="btn btn-xs btn-ghost" onClick={() => setEnCurso(prev => prev.filter(x => x.clave !== e.clave))}>Quitar</button>
            </div>
          )}
        </div>
      ))}

      {aviso2 && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '9px 12px', borderRadius: 'var(--radius-md)', background: 'var(--ok-bg)', color: 'var(--ok-ink)', fontSize: '0.8rem', lineHeight: 1.5 }}>
          <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: 2 }} /> {aviso2}
        </div>
      )}
      {aviso && (
        <div className="uploader-error">
          <AlertCircle size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
          <span>{aviso}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
        <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)' }}>
          En Drive ({archivos.length}){topic ? <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}> · asignar a <strong>{topic.number || topic.title}</strong></span> : null}
        </strong>
        <div style={{ display: 'flex', gap: 6 }}>
          {carpeta && (
            <a href={carpeta} target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-outline" style={{ textDecoration: 'none' }}>
              <FolderOpen size={12} /> Abrir carpeta
            </a>
          )}
          <button type="button" onClick={recargar} disabled={cargando} className="btn btn-xs btn-outline">
            <RefreshCw size={12} className={cargando ? 'spin' : undefined} /> Recargar
          </button>
        </div>
      </div>

      {!topic && archivos.length > 0 && (
        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          Elige un módulo arriba para poder asignar los ficheros como apuntes, diapositivas o material complementario.
        </div>
      )}

      {!cargando && !aviso && archivos.length === 0 && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Todavía no hay materiales en la carpeta de Drive.</div>
      )}

      <div className="uploader-list">
        {archivos.map(a => {
          const Icon = icono(a.mime);
          return (
            <div key={a.id} className="uploader-item" style={{ flexWrap: 'wrap' }}>
              <div className="uploader-item-icon" style={{ color: 'var(--navy-ink)' }}><Icon size={17} /></div>
              <div style={{ minWidth: 0, flex: '1 1 220px' }}>
                <div className="uploader-item-name" title={a.nombre}>{a.nombre}</div>
                <div className="uploader-item-meta">
                  <span>{formatBytes(a.tamano)}</span>
                  {a.creado && <span>{new Date(a.creado).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>}
                  {a.compartido === false && (
                    <span className="qfdos-badge badge-amber" style={{ fontSize: '0.62rem' }} title="No se pudo compartir con enlace: en Drive, Compartir → Cualquier persona con el enlace">
                      <AlertTriangle size={10} /> sin compartir
                    </span>
                  )}
                </div>
              </div>
              <div className="uploader-item-actions" style={{ flexWrap: 'wrap', gap: 4 }}>
                {topic && (
                  <>
                    <button type="button" className="btn btn-xs btn-primary" onClick={() => asignar(a, 'apuntes')} title="Poner como apuntes del módulo">Apuntes</button>
                    <button type="button" className="btn btn-xs btn-primary" onClick={() => asignar(a, 'diapositivas')} title="Poner como diapositivas del módulo">Diapositivas</button>
                    <button type="button" className="btn btn-xs btn-outline" onClick={() => asignar(a, 'complementario')} title="Añadir a Materiales y Documentos Complementarios">Complementario</button>
                  </>
                )}
                <button type="button" onClick={() => copiar(a)} title="Copiar enlace" className="icon-btn">
                  {copiado === a.id ? <Check size={15} /> : <Copy size={15} />}
                </button>
                <a href={a.url} target="_blank" rel="noopener noreferrer" title="Abrir en Drive" className="icon-btn"><ExternalLink size={15} /></a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
