import React, { useEffect, useState } from 'react';
import { ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import type { QfdosTopic } from '../data/qfdosData';
import { construirClaves, estadoClaves, publicarClaves, type EstadoClaves } from '../services/claves';

/**
 * Publica en el servidor las claves con las que se corrigen los tests. Hay que
 * repetirlo cuando se añade o se cambia una pregunta.
 */
export const PanelClavesCorreccion: React.FC<{ topics: QfdosTopic[] }> = ({ topics }) => {
  const [estado, setEstado] = useState<EstadoClaves | null>(null);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const [trabajando, setTrabajando] = useState(false);

  const { claves, conflictos } = construirClaves(topics);
  const enWeb = Object.keys(claves).length;

  const cargar = async () => {
    const r = await estadoClaves();
    if (r.ok) { setEstado(r.datos); setError(''); } else setError(r.error);
  };
  useEffect(() => { cargar(); }, []);

  const publicar = async () => {
    setTrabajando(true);
    setAviso('');
    const r = await publicarClaves(claves);
    if (r.ok) {
      setAviso(`Publicadas ${r.datos} claves.`);
      setError('');
      await cargar();
    } else {
      setError(r.error);
    }
    setTrabajando(false);
  };

  const cuando = estado?.actualizadoEn && !isNaN(new Date(estado.actualizadoEn).getTime())
    ? new Date(estado.actualizadoEn).toLocaleString('es-ES') : '';
  const desactualizadas = !!estado && estado.claves !== enWeb;

  return (
    <div className="qfdos-card" style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <ShieldCheck size={18} color="var(--teal-ink)" />
        <strong style={{ color: 'var(--text-title)' }}>Corrección de los tests en el servidor</strong>
        <span className="qfdos-badge badge-teal" style={{ fontSize: '0.7rem' }}>
          {estado ? (estado.exigir ? 'Obligatoria' : 'Opcional') : '…'}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
        La nota que consta en la hoja la calcula el servidor con las respuestas marcadas, no la que envía el
        navegador. Publica las claves para activarlo y repítelo cuando añadas o cambies una pregunta.
        {estado?.exigir
          ? ' Ahora mismo es obligatoria: un test sin claves publicadas no se puede registrar.'
          : ' Mientras no sea obligatoria (propiedad EXIGIR_CORRECCION_SERVIDOR = 1), un intento que el servidor no pueda corregir se acepta y queda marcado como «cliente (sin verificar)».'}
      </p>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        {estado
          ? <>En el servidor: <strong>{estado.claves}</strong> claves{cuando ? ` (publicadas el ${cuando})` : ''}. En la web: <strong>{enWeb}</strong> preguntas.</>
          : <>En la web: <strong>{enWeb}</strong> preguntas.</>}
      </div>
      {desactualizadas && (
        <div className="entrega-aviso entrega-aviso--warn">
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>El servidor no tiene las mismas claves que la web. Publícalas para que la corrección coincida.</span>
        </div>
      )}
      {conflictos.length > 0 && (
        <div className="entrega-aviso entrega-aviso--warn">
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            Hay {conflictos.length} pregunta(s) con el mismo identificador y soluciones distintas; no se publican:{' '}
            <code>{conflictos.slice(0, 5).join(', ')}</code>.
          </span>
        </div>
      )}
      {error && (
        <div className="status-msg status-msg--bad" role="alert">
          <AlertCircle size={15} style={{ flexShrink: 0 }} /> <span>{error}</span>
        </div>
      )}
      {aviso && (
        <div role="status" style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.82rem', color: 'var(--ok-ink)' }}>
          <CheckCircle2 size={15} /> {aviso}
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-sm btn-primary" onClick={publicar} disabled={trabajando || enWeb === 0}>
          {trabajando ? <Loader2 size={14} className="spin" /> : <ShieldCheck size={14} />} Publicar claves de corrección
        </button>
        <button type="button" className="btn btn-sm btn-outline" onClick={cargar} disabled={trabajando}>
          <RefreshCw size={14} /> Comprobar
        </button>
      </div>
    </div>
  );
};
