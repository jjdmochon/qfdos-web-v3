import React, { useEffect, useState } from 'react';
import { Duda, cargarDudas, responderDuda, borrarDuda, fechaDuda, tituloTema } from '../services/dudas';
import { MessageSquare, Send, Trash2, RefreshCw, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

interface PanelDudasProfesorProps {
  /** Se avisa cada vez que cambia el número de dudas sin responder. */
  onPendientes?: (n: number) => void;
}

type Filtro = 'pendientes' | 'todas';

/**
 * Las dudas de todo el alumnado, con respuesta y borrado directos. Es el
 * mismo panel que muestra el buzón cuando entra el profesorado.
 */
export const PanelDudasProfesor: React.FC<PanelDudasProfesorProps> = ({ onPendientes }) => {
  const [dudas, setDudas] = useState<Duda[]>([]);
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Filtro>('pendientes');
  const [respondiendoId, setRespondiendoId] = useState<string | null>(null);
  const [texto, setTexto] = useState('');
  const [guardando, setGuardando] = useState(false);

  const avisarPendientes = (lista: Duda[]) => onPendientes?.(lista.filter(d => d.estado === 'pendiente').length);

  const recargar = async () => {
    setCargando(true);
    const r = await cargarDudas();
    if (r.ok) {
      setDudas(r.datos);
      setAviso(null);
      avisarPendientes(r.datos);
    } else {
      setAviso(`No se han podido cargar las dudas: ${r.error}`);
    }
    setCargando(false);
  };

  useEffect(() => { recargar(); }, []);

  const pendientes = dudas.filter(d => d.estado === 'pendiente').length;
  const visibles = filtro === 'pendientes' ? dudas.filter(d => d.estado === 'pendiente') : dudas;

  const enviarRespuesta = async (id: string) => {
    if (!texto.trim() || guardando) return;
    setGuardando(true);
    const r = await responderDuda(id, texto.trim());
    setGuardando(false);
    if (!r.ok) {
      // El texto se queda en el cuadro para no perderlo
      setAviso(`No se ha podido guardar la respuesta: ${r.error}`);
      return;
    }
    const nueva = dudas.map(d => (d.id === id ? r.datos : d));
    setDudas(nueva);
    avisarPendientes(nueva);
    setAviso(null);
    setRespondiendoId(null);
    setTexto('');
  };

  const eliminar = async (id: string) => {
    if (!window.confirm('¿Eliminar esta consulta? El alumno dejará de verla.')) return;
    const r = await borrarDuda(id);
    if (!r.ok) {
      setAviso(`No se ha podido eliminar: ${r.error}`);
      return;
    }
    const nueva = dudas.filter(d => d.id !== id);
    setDudas(nueva);
    avisarPendientes(nueva);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MessageSquare size={16} color="var(--navy-ink)" />
          Dudas del alumnado ({pendientes} pendientes · {dudas.length} en total)
        </h4>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {(['pendientes', 'todas'] as Filtro[]).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltro(f)}
              className={`btn btn-sm ${filtro === f ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.74rem' }}
              aria-pressed={filtro === f}
            >
              {f === 'pendientes' ? 'Pendientes' : 'Todas'}
            </button>
          ))}
          <button
            type="button"
            onClick={recargar}
            disabled={cargando}
            className="btn btn-sm btn-outline"
            style={{ fontSize: '0.74rem' }}
            title="Volver a leer las dudas del servidor"
          >
            <RefreshCw size={12} className={cargando ? 'spin' : undefined} /> Recargar
          </button>
        </div>
      </div>

      {aviso && (
        <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--accent-red)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle size={14} /> {aviso}
        </div>
      )}

      {cargando && dudas.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.86rem' }}>Cargando dudas…</div>
      ) : visibles.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
          {filtro === 'pendientes' ? 'No hay dudas pendientes. ' : 'No hay dudas en el buzón. '}
          {filtro === 'pendientes' && dudas.length > 0 && (
            <button type="button" onClick={() => setFiltro('todas')} className="btn btn-sm btn-outline" style={{ fontSize: '0.74rem', marginLeft: 6 }}>Ver todas</button>
          )}
        </div>
      ) : (
        visibles.map(q => (
          <div
            key={q.id}
            className="qfdos-card"
            style={{ padding: '1rem', borderLeft: q.estado === 'pendiente' ? '4px solid #f59e0b' : '4px solid #10b981' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span className="qfdos-badge badge-teal" style={{ fontSize: '0.7rem' }}>{tituloTema(q.temaTitulo)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`qfdos-badge ${q.estado === 'pendiente' ? 'badge-amber' : 'badge-emerald'}`} style={{ fontSize: '0.68rem' }}>
                  {q.estado.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => eliminar(q.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px', display: 'flex' }}
                  title="Eliminar esta consulta"
                  aria-label="Eliminar esta consulta"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-title)', margin: '0 0 6px', whiteSpace: 'pre-wrap' }}>
              «{q.pregunta}»
            </p>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Por: <strong>{q.nombre || q.correo}</strong> ({q.correo}) · {fechaDuda(q.recibidaEn)}
            </div>

            {q.respuesta ? (
              <div style={{ background: 'var(--surface-alt)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.78rem', color: 'var(--navy-ink)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                  <CheckCircle2 size={13} /> Tu respuesta{q.respondidaEn ? ` · ${fechaDuda(q.respondidaEn)}` : ''}:
                </strong>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' }}>{q.respuesta}</p>
              </div>
            ) : respondiendoId === q.id ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <textarea
                  placeholder="Escribe la respuesta para el estudiante…"
                  value={texto}
                  onChange={e => setTexto(e.target.value)}
                  className="form-input"
                  rows={4}
                  autoFocus
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" onClick={() => { setRespondiendoId(null); setTexto(''); }} className="btn btn-sm btn-outline">
                    Cancelar
                  </button>
                  <button type="button" onClick={() => enviarRespuesta(q.id)} disabled={guardando || !texto.trim()} className="btn btn-sm btn-primary">
                    <Send size={13} /> {guardando ? 'Guardando…' : 'Enviar respuesta'}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => { setRespondiendoId(q.id); setTexto(''); }} className="btn btn-sm btn-primary">
                  <MessageSquare size={13} /> Responder
                </button>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--warn-ink)', fontSize: '0.75rem' }}>
                  <Clock size={13} /> Sin responder
                </span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
