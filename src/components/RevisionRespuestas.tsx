import React, { useState } from 'react';
import { CheckCircle2, XCircle, MinusCircle, ListChecks, AlertCircle } from 'lucide-react';
import type { TestQuestion } from '../data/qfdosData';
import { Chem2DDrawer } from './Chem2DDrawer';

type Estado = 'acierto' | 'fallo' | 'blanco';

// El glifo repite el estado sin depender del color (WCAG 1.4.1)
const ESTILO: Record<Estado, { etiqueta: string; glifo: string; tinta: string; fondo: string; borde: string }> = {
  acierto: { etiqueta: 'Acierto', glifo: '✓', tinta: 'var(--ok-ink)', fondo: 'var(--semantic-ok-bg)', borde: '#10b981' },
  fallo: { etiqueta: 'Fallo', glifo: '✗', tinta: 'var(--bad-ink)', fondo: 'var(--semantic-bad-bg)', borde: '#ef4444' },
  blanco: { etiqueta: 'Sin responder', glifo: '–', tinta: 'var(--warn-ink)', fondo: 'var(--semantic-warn-bg)', borde: '#f59e0b' }
};

const rutaImagen = (ruta: string) =>
  ruta.startsWith('http') ? ruta : `${import.meta.env.BASE_URL || '/'}${ruta.replace(/^\//, '')}`;

/** Lo que el enunciado muestra además del texto: figura y estructuras. */
const Enunciado: React.FC<{ q: TestQuestion }> = ({ q }) => {
  if (!q.imagePath && !q.questionSmiles && !q.questionStructures?.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '2px 0 8px', maxWidth: '100%', overflowX: 'auto' }}>
      {q.imagePath && (
        <img
          src={rutaImagen(q.imagePath)}
          alt={`Figura del enunciado: ${q.question}`}
          loading="lazy"
          style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'contain', background: '#ffffff', borderRadius: 'var(--radius-sm)', padding: '4px' }}
        />
      )}
      {q.questionSmiles && <Chem2DDrawer smiles={q.questionSmiles} width={220} height={100} bare={true} />}
      {q.questionStructures?.map(ref => (
        <figure key={ref.smiles} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <Chem2DDrawer smiles={ref.smiles} width={200} height={95} bare={true} />
          <figcaption style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)' }}>{ref.name}</figcaption>
        </figure>
      ))}
    </div>
  );
};

const IconoEstado: React.FC<{ estado: Estado }> = ({ estado }) => {
  const props = { size: 16, color: ESTILO[estado].borde, 'aria-hidden': true, style: { flexShrink: 0 } };
  if (estado === 'acierto') return <CheckCircle2 {...props} />;
  if (estado === 'fallo') return <XCircle {...props} />;
  return <MinusCircle {...props} />;
};

/** Una opción con su letra, su texto, el fármaco que esconde y su estructura. */
const Opcion: React.FC<{ q: TestQuestion; idx: number; rotulo: string; tinta: string }> = ({ q, idx, rotulo, tinta }) => {
  const opt = q.options[idx];
  if (opt === undefined) return null;
  const texto = typeof opt === 'string' ? opt : opt.text;
  const smiles = typeof opt === 'string' ? undefined : opt.smiles;
  const farmaco = typeof opt === 'string' ? undefined : opt.revealedName;
  return (
    <div style={{ fontSize: '0.8rem', lineHeight: 1.45, color: 'var(--text-main)' }}>
      <strong style={{ color: tinta }}>{rotulo}:</strong>{' '}
      <span className="font-mono" style={{ fontWeight: 700 }}>{String.fromCharCode(65 + idx)}.</span> {texto}
      {farmaco && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fármaco: {farmaco}</div>}
      {smiles && (
        <div style={{ marginTop: '4px', maxWidth: '100%', overflowX: 'auto' }}>
          <Chem2DDrawer smiles={smiles} width={200} height={90} bare={true} />
        </div>
      )}
    </div>
  );
};

/**
 * Revisión del test entregado: qué preguntas se acertaron, cuáles se fallaron
 * y cuál era la respuesta correcta. Solo se monta en la pantalla de resultados,
 * así que en modo examen nada de esto se ve hasta entregar.
 */
export const RevisionRespuestas: React.FC<{
  questions: TestQuestion[];
  answers: { [key: number]: number };
  /** El servidor ha corregido con claves distintas a las de esta versión de la web */
  claveDistinta?: boolean;
}> = ({ questions, answers, claveDistinta = false }) => {
  const [soloFalladas, setSoloFalladas] = useState(false);

  const filas = questions.map((q, idx) => {
    const marcada = answers[idx];
    const respondida = marcada !== undefined && marcada >= 0 && marcada < q.options.length;
    const estado: Estado = !respondida ? 'blanco' : marcada === q.correctIndex ? 'acierto' : 'fallo';
    return { q, idx, marcada, respondida, estado };
  });
  const falladas = filas.filter(f => f.estado !== 'acierto').length;
  const visibles = soloFalladas ? filas.filter(f => f.estado !== 'acierto') : filas;

  const irA = (idx: number) => {
    if (soloFalladas && filas[idx].estado === 'acierto') setSoloFalladas(false);
    // Tras desactivar el filtro la fila tarda un render en existir
    requestAnimationFrame(() => {
      const fila = document.getElementById(`revision-p${idx + 1}`);
      if (!fila) return;
      const sinMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      fila.scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth', block: 'start' });
      fila.focus({ preventScroll: true });
    });
  };

  return (
    <section
      className="qfdos-card"
      id="revision-respuestas"
      aria-labelledby="revision-titulo"
      // Una tarjeta tan larga no debe saltar al pasar el ratón
      style={{ maxWidth: '720px', margin: '0 auto 1.25rem', padding: '1rem', textAlign: 'left', transform: 'none', scrollMarginTop: '12px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        <h4 id="revision-titulo" style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--navy-ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ListChecks size={17} aria-hidden="true" /> Revisión de tus respuestas
        </h4>
        <div role="group" aria-label="Filtrar preguntas" style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            className={!soloFalladas ? 'btn btn-xs btn-primary' : 'btn btn-xs btn-outline'}
            aria-pressed={!soloFalladas}
            onClick={() => setSoloFalladas(false)}
          >
            Todas ({filas.length})
          </button>
          <button
            type="button"
            className={soloFalladas ? 'btn btn-xs btn-primary' : 'btn btn-xs btn-outline'}
            aria-pressed={soloFalladas}
            onClick={() => setSoloFalladas(true)}
            disabled={falladas === 0}
          >
            Falladas o en blanco ({falladas})
          </button>
        </div>
      </div>

      {claveDistinta && (
        <div className="status-msg status-msg--bad" role="note" style={{ marginBottom: '10px', fontSize: '0.78rem' }}>
          <AlertCircle size={15} aria-hidden="true" />
          <span>El servidor ha corregido tu intento con claves distintas a las de esta revisión: la nota válida es la del servidor. Consulta con el profesorado las preguntas que no te cuadren.</span>
        </div>
      )}

      {/* Mapa del examen: un número por pregunta, coloreado por resultado */}
      <nav aria-label="Ir a una pregunta" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
        {filas.map(f => (
          <button
            key={f.idx}
            type="button"
            onClick={() => irA(f.idx)}
            className="font-mono"
            title={`Pregunta ${f.idx + 1}: ${ESTILO[f.estado].etiqueta}`}
            aria-label={`Pregunta ${f.idx + 1}: ${ESTILO[f.estado].etiqueta}`}
            style={{
              minWidth: '44px',
              height: '34px',
              borderRadius: '6px',
              border: `1.5px solid ${ESTILO[f.estado].borde}`,
              background: ESTILO[f.estado].fondo,
              color: ESTILO[f.estado].tinta,
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {f.idx + 1}<span aria-hidden="true" style={{ marginLeft: '2px' }}>{ESTILO[f.estado].glifo}</span>
          </button>
        ))}
      </nav>

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {visibles.map(({ q, idx, marcada, respondida, estado }) => (
          <li
            key={idx}
            id={`revision-p${idx + 1}`}
            tabIndex={-1}
            style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              background: ESTILO[estado].fondo,
              borderLeft: `4px solid ${ESTILO[estado].borde}`,
              scrollMarginTop: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.82rem', color: 'var(--text-title)', lineHeight: 1.4 }}>
                P{idx + 1}. {q.question}
              </strong>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 800, color: ESTILO[estado].tinta, flexShrink: 0 }}>
                <IconoEstado estado={estado} /> {ESTILO[estado].etiqueta}
              </span>
            </div>

            <Enunciado q={q} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {respondida ? (
                <Opcion q={q} idx={marcada} rotulo="Tu respuesta" tinta={ESTILO[estado].tinta} />
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No marcaste ninguna opción.</div>
              )}
              {estado !== 'acierto' && <Opcion q={q} idx={q.correctIndex} rotulo="Respuesta correcta" tinta="var(--ok-ink)" />}
            </div>

            {q.explanation && (
              <details style={{ marginTop: '6px' }}>
                <summary style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', cursor: 'pointer' }}>Ver explicación</summary>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.5, margin: '4px 0 0' }}>{q.explanation}</p>
              </details>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};
