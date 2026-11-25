import React, { useMemo, useState } from 'react';
import {
  GraduationCap, HelpCircle, X, ArrowRight, Send, Clock, RotateCcw, Award, ListChecks,
  CheckCircle2, AlertCircle, BookOpen, Lock, Maximize2
} from 'lucide-react';
import type { TemaPrivado, PreguntaPrivada } from '../services/temaPrivado';
import { ImageLightboxModal, type LightboxImagePayload } from './ImageLightboxModal';
import { pulsable } from '../utils/a11y';

/**
 * Test interactivo del Tema 7 en la vista docente privada, con el mismo formato que
 * el «Test (MODELOS)» del Tema 6: pantalla inicial, tarjetas de modelo, modalidad
 * (examen o preparación), prueba, calificación y revisión.
 *
 * Diferencias deliberadas: no hay formulario de identificación, ni pestaña de
 * calificaciones, ni envío a ninguna hoja, ni opinión de dificultad, ni nada en
 * localStorage. Las preguntas llegan del servidor y viven solo en el estado de este
 * componente.
 */
const ESTILOS_MODELO = [
  { color: 'var(--navy)', fondo: 'rgba(30, 58, 138, 0.05)', tinta: 'var(--navy-ink)' },
  { color: 'var(--teal)', fondo: 'rgba(13, 148, 136, 0.05)', tinta: 'var(--teal-ink)' },
  { color: '#8b5cf6', fondo: 'rgba(139, 92, 246, 0.05)', tinta: '#6d28d9' }
];

const resumenDe = (preguntas: PreguntaPrivada[]) => {
  const t = preguntas.slice(0, 7).map(p => p.titulo).filter(Boolean);
  return t.join(' · ') + (preguntas.length > 7 ? ' …' : '');
};

export const TestPrivadoModal: React.FC<{ datos: TemaPrivado; onClose: () => void }> = ({ datos, onClose }) => {
  const [modelIdx, setModelIdx] = useState(0);
  const [examMode, setExamMode] = useState(true);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [zoom, setZoom] = useState<LightboxImagePayload | null>(null);

  const modelo = datos.modelos[modelIdx];
  const questions = modelo.preguntas;
  const estilo = ESTILOS_MODELO[modelIdx % ESTILOS_MODELO.length];
  const etiquetaCorta = `Modelo ${modelIdx + 1}`;
  const q = questions[index];
  const answeredCount = questions.reduce((n, _p, i) => (answers[i] !== undefined && answers[i] >= 0 ? n + 1 : n), 0);

  const resultado = useMemo(() => {
    const correct = questions.reduce((n, p, i) => (answers[i] === p.correcta ? n + 1 : n), 0);
    return { correct, total: questions.length, score: ((correct / questions.length) * 10).toFixed(1) };
  }, [questions, answers]);

  const reiniciar = () => {
    setAnswers({}); setSelected(null); setShowExplanation(false); setIndex(0); setCompleted(false);
  };
  const empezar = () => { reiniciar(); setStarted(true); };
  const elegirModelo = (i: number) => { setModelIdx(i); };
  const irA = (t: number) => {
    if (t < 0 || t >= questions.length) return;
    setIndex(t);
    const guardada = answers[t];
    setSelected(guardada === undefined || guardada < 0 ? null : guardada);
    setShowExplanation(false);
  };
  const seleccionar = (i: number) => {
    if (showExplanation) return;
    setSelected(i);
    if (examMode) setAnswers(prev => ({ ...prev, [index]: i }));
  };
  const comprobar = () => {
    if (selected === null) return;
    setShowExplanation(true);
    setAnswers(prev => ({ ...prev, [index]: selected }));
  };
  const siguiente = () => {
    if (index < questions.length - 1) { irA(index + 1); } else { setCompleted(true); }
  };
  const salir = () => {
    if (started && !completed && answeredCount > 0 && !window.confirm('¿Salir del examen? Se perderán las respuestas de este intento (no se guarda nada).')) return;
    reiniciar(); setStarted(false);
  };
  const cerrar = () => {
    if (started && !completed && answeredCount > 0 && !window.confirm('¿Cerrar el test? Se perderán las respuestas de este intento (no se guarda nada).')) return;
    onClose();
  };
  const ampliar = (p: PreguntaPrivada) => {
    if (!p.imagen) return;
    setZoom({ src: p.imagen, title: `Pregunta ${p.n}`, subtitle: p.enunciado, tag: 'Figura de Examen', hideDownload: true });
  };

  const enProgreso = started && !completed;

  return (
    <div className="modal-overlay" onClick={cerrar}>
      <div className="modal-container" style={{ maxWidth: '760px', width: '95%' }} onClick={e => e.stopPropagation()}>
        {/* Cabecera */}
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'var(--primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy-ink)', flexShrink: 0 }}>
              <GraduationCap size={20} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', margin: 0, lineHeight: 1.3 }}>
                  Autoevaluación: Tema 07 · Sistema Histaminérgico
                </h3>
                <span className="qfdos-badge quiz-header-badge" style={{ fontSize: '0.66rem', background: '#3b82f6', color: '#fff', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  <Lock size={10} style={{ marginRight: 4, verticalAlign: '-1px' }} />Vista docente privada
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '2px 0 0 0', lineHeight: 1.3 }}>
                {questions.length} Preguntas · Solo docente · Sin registro de calificaciones ni envío
              </p>
            </div>
          </div>
          <button onClick={cerrar} className="btn btn-sm btn-outline" style={{ flexShrink: 0, marginLeft: '8px' }} title="Cerrar ventana (Esc)" aria-label="Cerrar ventana"><X size={18} /></button>
        </div>

        {/* Pestaña única (misma barra que el Tema 6, sin registro de calificaciones) */}
        <div className="modal-tabs-scroll" style={{ display: 'flex', borderBottom: '1.5px solid var(--border-color)', background: 'var(--surface-raised)', padding: '6px 16px 0', gap: '8px' }}>
          <span style={{ padding: '8px 16px', background: 'var(--surface)', color: 'var(--navy-ink)', fontWeight: 800, fontSize: '0.84rem', borderRadius: '8px 8px 0 0', borderTop: '3px solid var(--navy)', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={15} /> Test Interactivo ({questions.length} Preguntas)
          </span>
        </div>

        <div className="modal-body" style={{ maxHeight: '64vh', overflowY: 'auto' }}>
          {!started ? (
            /* ---------- PANTALLA INICIAL ---------- */
            <div>
              <div style={{ padding: '14px 16px', marginBottom: '1.1rem', borderRadius: 'var(--radius-lg)', background: 'rgba(30, 58, 138, 0.04)', border: '1.5px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Lock size={16} color="var(--navy)" />
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-title)' }}>Vista docente privada del Tema 7</strong>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  El banco se pide al servidor con tu sesión de profesor y vive solo en esta ventana. No se registra ninguna calificación, no se envía nada a Google Sheets y nada se guarda en este navegador.
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>Selecciona el Modelo de Examen:</label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '12px', marginBottom: '12px' }}>
                  {datos.modelos.map((mod, i) => {
                    const e = ESTILOS_MODELO[i % ESTILOS_MODELO.length];
                    const activo = modelIdx === i;
                    return (
                      <div
                        key={mod.id}
                        onClick={() => elegirModelo(i)} {...pulsable(() => elegirModelo(i))}
                        aria-pressed={activo}
                        style={{
                          padding: '14px 16px', borderRadius: 'var(--radius-lg)',
                          border: activo ? `2.5px solid ${e.color}` : '1.5px solid var(--border-color)',
                          background: activo ? e.fondo : 'var(--surface)',
                          boxShadow: activo ? '0 3px 12px rgba(30, 58, 138, 0.12)' : 'none',
                          cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease',
                          display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                            <div>
                              <span style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: e.tinta }}>Vista docente privada</span>
                              <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: e.tinta, margin: '2px 0 0 0' }}>Modelo {i + 1} ({mod.preguntas.length} Preguntas)</h4>
                            </div>
                            <span className="qfdos-badge" style={{ fontSize: '0.68rem', background: 'var(--surface-alt)', color: 'var(--text-muted)', fontWeight: 600 }}>No registrado</span>
                          </div>
                          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.45 }}>{resumenDe(mod.preguntas)}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
                          <span>Sin intentos registrados</span>
                          <strong style={{ color: activo ? e.tinta : 'var(--text-muted)' }}>{activo ? '● Seleccionado' : `Elegir Modelo ${i + 1}`}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selector de modalidad */}
                <div className="quiz-mode-selector-wrap" style={{ marginTop: '12px', padding: '12px 14px', background: 'var(--surface-raised)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 'min(220px, 100%)' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-title)' }}>Modalidad de Realización:</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {examMode
                        ? 'Examen: responde las preguntas sin ver la corrección y entrega al finalizar.'
                        : 'Preparación y estudio: comprueba cada respuesta de inmediato con su explicación pedagógica.'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => setExamMode(true)} className={examMode ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline'} style={{ fontSize: '0.78rem', fontWeight: 700, padding: '7px 14px', whiteSpace: 'nowrap' }}>Modo Examen</button>
                    <button type="button" onClick={() => setExamMode(false)} className={!examMode ? 'btn btn-sm btn-teal' : 'btn btn-sm btn-outline'} style={{ fontSize: '0.78rem', fontWeight: 700, padding: '7px 14px', whiteSpace: 'nowrap' }}>Modo Preparación / Estudio</button>
                  </div>
                </div>
              </div>

              {/* Estado e instrucciones */}
              <div style={{ marginBottom: '1.25rem', padding: '14px 16px', borderRadius: 'var(--radius-lg)', background: 'rgba(30, 58, 138, 0.06)', border: '1.5px solid var(--navy)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Clock size={18} color="var(--navy)" />
                  <strong style={{ fontSize: '0.92rem', color: 'var(--navy-ink)' }}>{etiquetaCorta} · Vista docente privada</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.81rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {examMode ? (
                    <>
                      <li><strong>Modo Examen:</strong> respondes sin ver la corrección durante la prueba; puedes navegar libremente entre las {questions.length} preguntas y cambiar respuestas en cualquier momento.</li>
                      <li>Puedes entregar cuando quieras; las preguntas no respondidas computan como no acertadas.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>Modo Preparación / Estudio:</strong> compruebas cada respuesta al instante tras marcarla y accedes a la justificación y al análisis de cada distractor.</li>
                      <li>Avanzas paso a paso; al terminar las {questions.length} preguntas obtienes tu balance y puedes repetir las veces que quieras.</li>
                    </>
                  )}
                  <li style={{ color: 'var(--navy-ink)', fontWeight: 700 }}>
                    Al terminar, la calificación solo se muestra en esta pantalla: no se registra ni se envía a ninguna hoja, y se pierde al cerrar la ventana.
                  </li>
                </ul>
              </div>

              {/* Resumen del modelo */}
              <div className="quiz-banner-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--surface-alt)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 'min(220px, 100%)' }}>
                  <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-ink)', flexShrink: 0 }}>{questions.length}</span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
                    <strong>{etiquetaCorta}:</strong> {questions.length} preguntas calibradas JEV: {resumenDe(questions)}
                  </div>
                </div>
                <span className="qfdos-badge badge-teal quiz-banner-badge" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap', flexShrink: 0 }}>Sin registro · Sin envío</span>
              </div>

              <div className="quiz-actions-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={onClose} className="btn btn-outline">Cancelar</button>
                <button onClick={empezar} className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.92rem', fontWeight: 700 }}>
                  Comenzar {etiquetaCorta} ({questions.length} Preguntas · {examMode ? 'Examen' : 'Preparación'}) <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                </button>
              </div>
            </div>
          ) : enProgreso ? (
            /* ---------- PRUEBA EN CURSO ---------- */
            <div>
              <div className="quiz-in-progress-user-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', padding: '6px 12px', background: 'var(--surface-raised)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                  <Lock size={14} color="var(--navy)" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-muted)' }}>Vista docente:</span>
                  <strong style={{ color: 'var(--text-title)' }}>sin registro de calificaciones</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="qfdos-badge" style={{ fontSize: '0.68rem', background: estilo.color, color: '#fff', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {etiquetaCorta} · {examMode ? 'Examen' : 'Preparación'}
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-ink)', whiteSpace: 'nowrap' }}>
                    Pregunta {index + 1} de {questions.length}
                  </span>
                </div>
              </div>

              {examMode && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', padding: '8px 10px', marginBottom: '0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-alt)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>Respondidas {answeredCount} / {questions.length}</span>
                  {questions.map((_p, i) => {
                    const contestada = answers[i] !== undefined && answers[i] >= 0;
                    const activa = i === index;
                    return (
                      <button key={i} type="button" onClick={() => irA(i)} title={contestada ? `Pregunta ${i + 1} (respondida)` : `Pregunta ${i + 1} (sin responder)`} className="font-mono"
                        style={{ width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 800, border: activa ? '2px solid var(--navy)' : '1px solid var(--border-color)', background: contestada ? 'rgba(16, 185, 129, 0.16)' : 'var(--surface)', color: contestada ? 'var(--ok-ink)' : 'var(--text-muted)' }}>
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="qfdos-badge" style={{ fontSize: '0.68rem', background: '#3b82f6', color: '#fff' }}>{etiquetaCorta}</span>
                  {q.nivel > 0 && <span className="qfdos-badge badge-amber" style={{ fontSize: '0.68rem' }}>Nivel {q.nivel}</span>}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ID: {modelo.id}-q{String(q.n).padStart(2, '0')}</div>
              </div>

              <div style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-title)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {index + 1}. {q.enunciado}
              </div>

              {q.imagen && (
                <div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem', background: '#ffffff', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)', cursor: 'zoom-in', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
                  onClick={() => ampliar(q)} {...pulsable(() => ampliar(q))}
                  title="Haz clic para ver la figura a pantalla completa"
                >
                  <img src={q.imagen} alt="Figura de la pregunta" style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }} />
                  <span style={{ marginTop: '6px', fontSize: '0.72rem', color: 'var(--teal-ink)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Maximize2 size={12} /> Clic para ampliar a pantalla completa
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.25rem' }}>
                {q.opciones.map((opt, i) => {
                  let bg = 'var(--surface)';
                  let borde = 'var(--border-color)';
                  if (selected === i) { bg = 'var(--primary-bg)'; borde = 'var(--navy)'; }
                  if (showExplanation) {
                    if (i === q.correcta) { bg = 'rgba(16, 185, 129, 0.12)'; borde = '#10b981'; }
                    else if (selected === i) { bg = 'rgba(239, 68, 68, 0.12)'; borde = '#ef4444'; }
                  }
                  return (
                    <div key={i} onClick={() => seleccionar(i)} {...pulsable(() => seleccionar(i), showExplanation)} aria-pressed={selected === i}
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: `1.5px solid ${borde}`, background: bg, cursor: showExplanation ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', transition: 'all var(--transition-fast)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: 0 }}>
                        <span className="font-mono" style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selected === i ? 'var(--navy)' : 'var(--surface-alt)', color: selected === i ? '#fff' : 'var(--text-main)', fontSize: '0.78rem', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.45 }}>{opt}</span>
                      </div>
                      {showExplanation && i === q.correcta && <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginLeft: '6px' }} />}
                      {showExplanation && selected === i && i !== q.correcta && <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginLeft: '6px' }} />}
                    </div>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="qfdos-card" style={{ background: selected === q.correcta ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', borderColor: selected === q.correcta ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)', padding: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <BookOpen size={16} color={selected === q.correcta ? '#059669' : '#dc2626'} />
                    <strong style={{ fontSize: '0.88rem', color: selected === q.correcta ? 'var(--ok-ink)' : 'var(--bad-ink)' }}>
                      {selected === q.correcta ? '¡Respuesta Correcta!' : 'Explicación Pedagógica:'}
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>{q.justificacion}</p>
                  {q.apuntes && <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '6px 0 0' }}>Apuntes: {q.apuntes}</p>}
                  {Object.keys(q.distractores).length > 0 && (
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border-color)', fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      <strong>Análisis de distractores:</strong>
                      {Object.entries(q.distractores).map(([l, t]) => <div key={l}><strong>{l.toUpperCase()})</strong> {t}</div>)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* ---------- RESULTADOS ---------- */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Award size={34} color="var(--navy-ink)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>¡Autoevaluación Calibrada Finalizada!</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }} role="status">
                Vista docente privada: la calificación no se ha registrado ni enviado a ninguna parte.
              </p>
              {(() => {
                const aprobado = Number(resultado.score) >= 5.0;
                return (
                  <div className="qfdos-card" style={{ maxWidth: '420px', margin: '0 auto 1.25rem', padding: '1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                      Calificación (Tema 07 · {etiquetaCorta} ({questions.length}P) · {examMode ? 'Modo Examen' : 'Modo Preparación'}):
                    </div>
                    <div className="font-mono" style={{ fontSize: '2.8rem', fontWeight: 900, color: aprobado ? 'var(--teal-ink)' : 'var(--accent-red)', lineHeight: 1 }}>
                      {resultado.score} <span style={{ fontSize: '1.3rem', color: 'var(--text-muted)' }}>/ 10</span>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.84rem', fontWeight: 700, color: aprobado ? 'var(--secondary-dark)' : 'var(--accent-red)' }}>
                      {aprobado ? '✓ APROBADO' : '✗ NO SUPERADO'} · {resultado.correct} aciertos de {resultado.total} preguntas
                    </div>
                    <button type="button" className="btn btn-sm btn-outline" style={{ marginTop: '10px' }}
                      onClick={() => {
                        const sinMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
                        document.getElementById('revision-respuestas-privada')?.scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth', block: 'start' });
                      }}>
                      <ListChecks size={15} /> Revisar aciertos y fallos
                    </button>
                  </div>
                );
              })()}

              <div id="revision-respuestas-privada" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {questions.map((p, i) => {
                  const r = answers[i];
                  const acierto = r === p.correcta;
                  return (
                    <div key={i} className="qfdos-card" style={{ padding: '0.9rem 1rem', borderColor: acierto ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '4px', fontSize: '0.8rem' }}>
                        <strong>Pregunta {p.n}</strong>
                        <span style={{ fontWeight: 700, color: acierto ? 'var(--ok-ink)' : 'var(--bad-ink)' }}>
                          {acierto ? '✓ Acierto' : r === undefined || r < 0 ? '✗ Sin responder' : '✗ Fallo'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.84rem', lineHeight: 1.45, marginBottom: '6px' }}>{p.enunciado}</div>
                      {p.imagen && <img src={p.imagen} alt="Figura de la pregunta" style={{ maxHeight: '130px', maxWidth: '100%', objectFit: 'contain', background: '#fff', borderRadius: '6px', marginBottom: '6px' }} />}
                      <div style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
                        {r !== undefined && r >= 0 && !acierto && <div style={{ color: 'var(--bad-ink)' }}>Tu respuesta: {String.fromCharCode(65 + r)}) {p.opciones[r]}</div>}
                        <div style={{ color: 'var(--ok-ink)', fontWeight: 600 }}>Correcta: {String.fromCharCode(65 + p.correcta)}) {p.opciones[p.correcta]}</div>
                        <div style={{ marginTop: '4px', color: 'var(--text-main)' }}>{p.justificacion}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="quiz-actions-footer" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                <button onClick={() => { reiniciar(); setStarted(false); }} className="btn btn-outline">Elegir otro modelo</button>
                <button onClick={empezar} className="btn btn-primary"><RotateCcw size={15} /> Repetir {etiquetaCorta}</button>
              </div>
            </div>
          )}
        </div>

        {/* Pie durante la prueba */}
        {enProgreso && (
          <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '10px 16px' }}>
            <div className="quiz-in-progress-footer" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <button type="button" onClick={salir} className="btn btn-sm btn-outline" style={{ whiteSpace: 'nowrap' }}>Salir del Examen</button>
              {examMode ? (
                <div className="quiz-exam-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => irA(index - 1)} disabled={index === 0} className="btn btn-sm btn-outline">Anterior</button>
                  <button onClick={() => irA(index + 1)} disabled={index >= questions.length - 1} className="btn btn-sm btn-secondary">Siguiente <ArrowRight size={14} /></button>
                  <button onClick={() => setCompleted(true)} className="btn btn-primary quiz-exam-submit" style={{ fontWeight: 700, whiteSpace: 'nowrap' }} title="Termina el examen ahora; las preguntas sin responder puntúan como falladas">
                    <Send size={15} /> Entregar Examen ({answeredCount}/{questions.length})
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {!showExplanation ? (
                    <button onClick={comprobar} disabled={selected === null} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Comprobar Respuesta</button>
                  ) : (
                    <button onClick={siguiente} className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                      {index < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Calificación Final'} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ImageLightboxModal image={zoom} onClose={() => setZoom(null)} />
    </div>
  );
};
