import React, { useRef, useState } from 'react';
import { ArchivoDrive, subirADrive } from '../services/drive';
import { AlertCircle, Loader2, UploadCloud } from 'lucide-react';

interface BotonSubirDriveProps {
  /** Tipos de fichero que ofrece el selector */
  accept?: string;
  /** Se llama con el fichero ya subido; normalmente escribe su enlace en el campo */
  onSubido: (archivo: ArchivoDrive) => void;
}

/**
 * Botón para subir un fichero a la carpeta de Drive del curso desde un campo
 * de enlace: elige el fichero, se sube con barra de progreso y el enlace queda
 * escrito en el campo, sin pasar por Drive ni pegarlo a mano.
 */
export const BotonSubirDrive: React.FC<BotonSubirDriveProps> = ({ accept = '.pdf,.ppt,.pptx,.doc,.docx', onSubido }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progreso, setProgreso] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const elegir = async (lista: FileList | null) => {
    const file = lista?.[0];
    if (!file) return;
    setError(null);
    setAviso(null);
    setProgreso(0);
    const r = await subirADrive(file, setProgreso);
    setProgreso(null);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    onSubido(r.datos);
    if (r.datos.compartido === false) {
      setAviso('Subido, pero sin compartir: en Drive, Compartir → Cualquier persona con el enlace.');
    }
  };

  const subiendo = progreso !== null;

  return (
    <div style={{ marginTop: 4 }}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={e => { elegir(e.target.files); e.target.value = ''; }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={subiendo}
        className="btn btn-xs btn-outline"
        style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}
        title="Sube el fichero a la carpeta de Drive del curso y escribe aquí su enlace"
      >
        {subiendo
          ? <><Loader2 size={12} className="spin" /> Subiendo… {Math.round((progreso ?? 0) * 100)} %</>
          : <><UploadCloud size={12} /> Subir a Drive</>}
      </button>
      {error && (
        <div style={{ marginTop: 4, display: 'flex', gap: 4, alignItems: 'flex-start', color: 'var(--accent-red)', fontSize: '0.72rem', lineHeight: 1.4 }}>
          <AlertCircle size={12} style={{ flexShrink: 0, marginTop: 2 }} /> {error}
        </div>
      )}
      {aviso && <div style={{ marginTop: 4, color: 'var(--warn-ink)', fontSize: '0.72rem', lineHeight: 1.4 }}>{aviso}</div>}
    </div>
  );
};
