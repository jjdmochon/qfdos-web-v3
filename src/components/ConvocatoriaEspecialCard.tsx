import React, { useEffect, useMemo, useState } from 'react';
import { CircleCheck, CircleX, CircleMinus, TriangleAlert, Eye, EyeOff, RefreshCw, ClipboardCheck, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CORREO_PROFESOR } from '../data/actualizacionesData';
import {
  leerConvocatoriaEspecial,
  publicarConvocatoriaEspecial,
  MENSAJE_SCRIPT_ANTIGUO,
  type ConvocatoriaEspecial,
  type EstadoPregunta,
  type PreguntaEspecial
} from '../services/convocatoriaEspecial';

const TITULO = 'Convocatoria especial · 10 de noviembre de 2026';

const ESTADO: Record<EstadoPregunta, { etiqueta: string; color: string; Icono: React.ElementType }> = {
  acierto: { etiqueta: 'Acierto', color: 'var(--ok-ink)', Icono: CircleCheck },
  error: { etiqueta: 'Error', color: 'var(--bad-ink)', Icono: CircleX },
  blanco: { etiqueta: 'En blanco', color: 'var(--text-muted)', Icono: CircleMinus },
  doble: { etiqueta: 'Marca doble', color: 'var(--warn-ink)', Icono: TriangleAlert }
};

const formatoNota = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Pregunta: React.FC<{ p: PreguntaEspecial }> = ({ p }) => {
  const e = ESTADO[p.estado];
  const marcada = p.marcada === '-' ? 'ninguna' : p.marcada === '*' ? 'varias' : p.marcada;
  return (
    <details style={{ borderBottom: '1px solid var(--border-color)' }}>
      <summary
        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.6rem 0.25rem', cursor: 'pointer', listStyle: 'none' }}
      >
        <e.Icono size={18} color={e.color} aria-hidden="true" style={{ flexShrink: 0 }} />
        <span className="font-mono" style={{ fontWeight: 800, minWidth: '2.2ch', color: 'var(--text-title)' }}>
          {p.n}
        </span>
        <span style={{ fontSize: '0.84rem', color: 'var(--text-main)', flex: 1, minWidth: 0 }}>
          Marcaste <strong>{marcada}</strong>
          {p.estado !== 'acierto' && <> · correcta <strong>{p.clave}</strong></>}
        </span>
        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: e.color, whiteSpace: 'nowrap' }}>{e.etiqueta}</span>
      </summary>
      <div style={{ padding: '0.25rem 0.25rem 1rem 2.4rem', fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--text-main)' }}>
        {p.tema && <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>{p.tema}</div>}
        {p.enunciado && <p style={{ margin: '0 0 0.6rem' }}>{p.enunciado}</p>}
        <p style={{ margin: '0 0 0.6rem' }}>
          <strong>Opción correcta ({p.clave}):</strong> {p.correcta || 'consulta la clave con el profesor'}
        </p>
        {p.estado === 'doble' && (
          <p style={{ margin: '0 0 0.6rem', color: 'var(--warn-ink)' }}>
            Marcaste más de una opción, así que la pregunta se ha contado como en blanco.
          </p>
        )}
        {p.justificacion && (
          <p style={{ margin: 0, padding: '0.6rem 0.8rem', background: 'var(--surface-alt)', borderRadius: '8px', borderLeft: '3px solid var(--teal)' }}>
            {p.justificacion}
          </p>
        )}
      </div>
    </details>
  );
};

export const ConvocatoriaEspecialCard: React.FC = () => {
  const { isProfesor } = useAuth();
  const [datos, setDatos] = useState<ConvocatoriaEspecial | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [soloFalladas, setSoloFalladas] = useState(false);
  const [cambiando, setCambiando] = useState(false);

  const cargar = async () => {
    setCargando(true);
    setError(null);
    const r = await leerConvocatoriaEspecial();
    if (r.ok) setDatos(r.datos);
    else setError(r.error);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alternar = async () => {
    if (!datos) return;
    const publicar = !datos.publicadas;
    const aviso = publicar
      ? `Se publicarán las notas de la convocatoria especial. Cada estudiante verá su nota y la corrección de sus 60 preguntas${
          datos.sinCorreo ? `. Hay ${datos.sinCorreo} fila${datos.sinCorreo === 1 ? '' : 's'} sin correo válido que nadie verá` : ''
        }. ¿Continuar?`
      : 'El alumnado dejará de ver su nota y la corrección. ¿Continuar?';
    if (!window.confirm(aviso)) return;
    setCambiando(true);
    const r = await publicarConvocatoriaEspecial(publicar);
    if (r.ok) setDatos({ ...datos, publicadas: r.datos });
    else setError(r.error);
    setCambiando(false);
  };

  const mostradas = useMemo(() => {
    const d = datos?.detalle ?? [];
    return soloFalladas ? d.filter(p => p.estado !== 'acierto') : d;
  }, [datos, soloFalladas]);

  const caja: React.CSSProperties = { padding: '1.75rem', marginBottom: '2rem', background: 'var(--surface)' };

  // ── Profesorado: estado de la publicación ──
  if (isProfesor) {
    return (
      <div className="qfdos-card" style={caja}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ClipboardCheck size={22} color="var(--teal)" aria-hidden="true" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>{TITULO}</h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Notas y corrección por pregunta, desde la pestaña «Convocatoria Especial» de la hoja de evaluación
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="btn btn-sm btn-outline" onClick={cargar} disabled={cargando}>
              <RefreshCw size={13} className={cargando ? 'spin' : ''} /> Actualizar
            </button>
            {datos && (
              <button type="button" className={`btn btn-sm ${datos.publicadas ? 'btn-outline' : 'btn-navy'}`} onClick={alternar} disabled={cambiando}>
                {datos.publicadas ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {datos.publicadas ? 'Publicada · Ocultar' : 'Publicar al alumnado'}
              </button>
            )}
          </div>
        </div>
        {error && (
          <p role="alert" style={{ margin: '1rem 0 0', fontSize: '0.84rem', color: 'var(--bad-ink)' }}>{error}</p>
        )}
        {datos && !error && (
          <p style={{ margin: '1rem 0 0', fontSize: '0.84rem', color: 'var(--text-main)' }}>
            {datos.total ?? 0} hoja{datos.total === 1 ? '' : 's'} en la pestaña
            {datos.sinCorreo ? (
              <strong style={{ color: 'var(--warn-ink)' }}> · {datos.sinCorreo} sin correo válido (nadie las verá hasta que las completes)</strong>
            ) : null}
            . {datos.publicadas ? 'El alumnado ya ve su nota y su corrección.' : 'De momento, el alumnado no ve nada.'}
          </p>
        )}
      </div>
    );
  }

  // ── Alumnado ──
  if (cargando) {
    return (
      <div className="qfdos-card" style={caja}>
        <div className="state-panel" role="status" aria-busy="true">
          <RefreshCw size={26} className="spin" />
          <h3>Consultando tu convocatoria especial…</h3>
        </div>
      </div>
    );
  }
  // Antes de publicar, o con el script sin actualizar, la tarjeta no aparece
  if (error) {
    if (error === MENSAJE_SCRIPT_ANTIGUO) return null;
    return (
      <div className="qfdos-card" style={caja}>
        <div className="state-panel state-panel--bad" role="alert">
          <h3>No se ha podido cargar la convocatoria especial</h3>
          <p>{error}</p>
          <button type="button" className="btn btn-sm btn-primary" onClick={cargar}>
            <RefreshCw size={13} /> Reintentar
          </button>
        </div>
      </div>
    );
  }
  if (!datos || !datos.publicadas) return null;

  if (!datos.fila) {
    return (
      <div className="qfdos-card" style={caja}>
        <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--surface-alt)', borderRadius: '8px' }}>
          <Lock size={30} color="var(--text-muted)" style={{ margin: '0 auto 10px' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)', margin: '0 0 4px' }}>
            {TITULO}
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
            No hay ninguna hoja de respuestas registrada a tu correo. Si hiciste el examen, escribe a {CORREO_PROFESOR} para que la localicemos.
          </p>
        </div>
      </div>
    );
  }

  const { fila, detalle } = datos;
  const falladas = detalle.filter(p => p.estado !== 'acierto').length;
  const aprobado = fila.nota >= 5;
  const casilla = (titulo: string, valor: React.ReactNode, color: string): React.ReactNode => (
    <div style={{ background: 'var(--surface-alt)', padding: '0.9rem 1rem', borderRadius: '8px', borderLeft: `3px solid ${color}` }}>
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>{titulo}</span>
      <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color }}>{valor}</div>
    </div>
  );

  return (
    <div className="qfdos-card" style={caja}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <ClipboardCheck size={22} color="var(--teal)" aria-hidden="true" style={{ flexShrink: 0 }} />
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>{TITULO}</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Modelo {fila.modelo} · 60 preguntas</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(120px, 100%), 1fr))', gap: '0.9rem', marginBottom: '0.75rem' }}>
        <div
          style={{
            background: aprobado ? 'var(--ok-bg)' : 'var(--bad-bg)',
            padding: '0.9rem 1rem',
            borderRadius: '8px',
            border: `1.5px solid ${aprobado ? 'var(--ok-border)' : 'var(--bad-border)'}`
          }}
        >
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: aprobado ? 'var(--ok-ink)' : 'var(--bad-ink)', textTransform: 'uppercase' }}>Nota (sobre 10)</span>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: aprobado ? 'var(--ok-ink)' : 'var(--bad-ink)' }}>{formatoNota(fila.nota)}</div>
        </div>
        {casilla('Aciertos', fila.aciertos, 'var(--ok-ink)')}
        {casilla('Errores', fila.errores, 'var(--bad-ink)')}
        {casilla('En blanco', fila.blancos, 'var(--text-muted)')}
      </div>
      <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0 0 1.25rem' }}>
        Nota = (aciertos − 0,25 × errores) / 60 × 10. Cada error resta un cuarto de acierto y las preguntas en blanco no puntúan.
      </p>

      {detalle.length > 0 ? (
        <>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '0.5rem' }} role="group" aria-label="Filtrar preguntas">
            <button type="button" className={`btn btn-sm ${soloFalladas ? 'btn-outline' : 'btn-navy'}`} aria-pressed={!soloFalladas} onClick={() => setSoloFalladas(false)}>
              Todas ({detalle.length})
            </button>
            <button type="button" className={`btn btn-sm ${soloFalladas ? 'btn-navy' : 'btn-outline'}`} aria-pressed={soloFalladas} onClick={() => setSoloFalladas(true)}>
              Solo las que no acerté ({falladas})
            </button>
          </div>
          <div>
            {mostradas.length === 0 ? (
              <p style={{ fontSize: '0.88rem', color: 'var(--ok-ink)', padding: '1rem 0.25rem' }}>No fallaste ninguna: 60 de 60.</p>
            ) : (
              mostradas.map(p => <Pregunta key={p.n} p={p} />)
            )}
          </div>
        </>
      ) : (
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          La corrección pregunta a pregunta todavía no está disponible. Tu nota sí es definitiva.
        </p>
      )}
    </div>
  );
};

export default ConvocatoriaEspecialCard;
