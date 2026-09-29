import React, { useState, useEffect, useMemo, useRef } from 'react';
import { QfdosTopic, Flashcard, INITIAL_TOPICS } from '../data/qfdosData';
import { Chem2DDrawer } from './Chem2DDrawer';
import { recurso } from '../services/rutas';
import { useAuth } from '../context/AuthContext';
import { pulsable } from '../utils/a11y';
import { getSesion } from '../services/sesion';
import {
  aProgreso, fusionar, leerProgresoTarjetas, guardarProgresoTarjetas,
  type Valoraciones, type Marcas
} from '../services/progreso';
import { OpinionDificultad } from './OpinionDificultad';
import { 
  X, 
  Award, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Check, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles,
  Send,
  Save,
  CheckCircle2,
  AlertCircle,
  Filter,
  RefreshCw,
  BookOpen,
  User
} from 'lucide-react';

interface FlashcardsModalProps {
  topic: QfdosTopic;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  topic,
  onClose
}) => {
  const { user } = useAuth();


  // Tarjetas canónicas (Tema 01 tiene 10 tarjetas fundamentales)
  const allCards: Flashcard[] = useMemo(() => {
    if (topic.id === 'tema-01' || topic.number === 'Tema 01') {
      const base1 = INITIAL_TOPICS.find(t => t.id === 'tema-01') || INITIAL_TOPICS[1];
      if (base1?.flashcards && base1.flashcards.length > 0) return base1.flashcards;
    }
    return topic.flashcards || [];
  }, [topic]);

  // Modo de filtro: Todas o solo las marcadas como difíciles
  const [filterHardOnly, setFilterHardOnly] = useState(false);

  // Almacenamiento local persistente por tema
  // Por cuenta: dos personas que comparten equipo no mezclan sus valoraciones.
  // Si la cuenta aún no tiene nada, se aprovecha lo guardado antes sin cuenta.
  const STORAGE_KEY = `qfdos_v3_flashcards_${topic.id}_${(user?.email || 'anonimo').toLowerCase()}`;
  const STORAGE_KEY_ANTIGUA = `qfdos_v3_flashcards_${topic.id}`;
  const [cardStats, setCardStats] = useState<{ [id: string]: 'easy' | 'medium' | 'hard' }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY_ANTIGUA);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Guardar en localStorage ante cualquier cambio
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cardStats));
    } catch (e) {
      console.error('Error guardando flashcards en localStorage', e);
    }
  }, [cardStats, STORAGE_KEY]);

  // Sincronización con la cuenta: cada valoración lleva su marca de tiempo y,
  // al abrir, se fusiona con lo guardado en el servidor (gana la más reciente).
  const TIEMPOS_KEY = `${STORAGE_KEY}_t`;
  const marcas = useRef<Marcas>((() => {
    try { return JSON.parse(localStorage.getItem(TIEMPOS_KEY) || '{}'); } catch { return {}; }
  })());
  const previas = useRef<Valoraciones>(cardStats);
  const statsActual = useRef<Valoraciones>(cardStats);
  statsActual.current = cardStats;
  const sincronizado = useRef(false);
  const temporizador = useRef<number | undefined>(undefined);
  const [estadoSync, setEstadoSync] = useState<'local' | 'sincronizando' | 'ok' | 'error'>('local');

  const guardarMarcas = () => {
    try { localStorage.setItem(TIEMPOS_KEY, JSON.stringify(marcas.current)); } catch { /* sin almacenamiento */ }
  };

  const enviar = () => {
    temporizador.current = undefined;
    guardarProgresoTarjetas(topic.id, aProgreso(statsActual.current, marcas.current))
      .then(ok => setEstadoSync(ok ? 'ok' : 'error'));
  };

  // Marca de tiempo de lo que cambia y envío diferido (una ráfaga = un envío)
  useEffect(() => {
    let hayCambios = false;
    for (const id of Object.keys(cardStats)) {
      if (cardStats[id] !== previas.current[id]) { marcas.current[id] = Date.now(); hayCambios = true; }
    }
    previas.current = cardStats;
    if (!hayCambios) return;
    guardarMarcas();
    if (sincronizado.current) {
      setEstadoSync('sincronizando');
      window.clearTimeout(temporizador.current);
      temporizador.current = window.setTimeout(enviar, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardStats]);

  // Al abrir: traer lo del servidor y fusionar
  useEffect(() => {
    sincronizado.current = false;
    if (!getSesion()) return;
    let cancelado = false;
    setEstadoSync('sincronizando');
    leerProgresoTarjetas(topic.id).then(remoto => {
      if (cancelado) return;
      if (!remoto) { setEstadoSync('error'); return; }
      const { fusion, cambiaLocal, cambiaRemoto } = fusionar(aProgreso(statsActual.current, marcas.current), remoto);
      if (cambiaLocal) {
        const nuevas: Valoraciones = {};
        for (const id of Object.keys(fusion)) { nuevas[id] = fusion[id][0]; marcas.current[id] = fusion[id][1]; }
        previas.current = nuevas;
        guardarMarcas();
        setCardStats(nuevas);
      }
      sincronizado.current = true;
      if (cambiaRemoto) enviar();
      else setEstadoSync('ok');
    });
    return () => {
      cancelado = true;
      // Al cerrar no se pierde lo pendiente
      if (temporizador.current !== undefined) { window.clearTimeout(temporizador.current); enviar(); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id, STORAGE_KEY]);

  // Tarjetas a mostrar según filtro
  const displayCards = useMemo(() => {
    if (!filterHardOnly) return allCards;
    const hardFiltered = allCards.filter(c => cardStats[c.id] === 'hard');
    return hardFiltered.length > 0 ? hardFiltered : allCards;
  }, [allCards, filterHardOnly, cardStats]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSummary, setShowSummary] = useState(false);


  // Estadísticas globales
  const easyCount = allCards.filter(c => cardStats[c.id] === 'easy').length;
  const hardCount = allCards.filter(c => cardStats[c.id] === 'hard').length;
  const mediumCount = allCards.filter(c => cardStats[c.id] === 'medium').length;
  const ratedCount = allCards.filter(c => !!cardStats[c.id]).length;

  if (allCards.length === 0) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Flashcards no disponibles</h3>
            <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
          </div>
          <div className="modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No hay tarjetas de memoria configuradas para esta unidad.</p>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn btn-primary">Cerrar</button>
          </div>
        </div>
      </div>
    );
  }

  // Índice protegido si el filtro reduce el tamaño
  const safeIndex = currentIndex >= displayCards.length ? 0 : currentIndex;
  const currentCard = displayCards[safeIndex] || allCards[0];

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const paragraphs = text.split(/\n\n+/);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', width: '100%' }}>
        {paragraphs.map((para, pIdx) => {
          const lines = para.split('\n');
          return (
            <div key={pIdx} style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              {lines.map((line, lIdx) => {
                const trimmed = line.trim();
                const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
                const isNumbered = /^\d+\.\s/.test(trimmed);

                // Parsear negritas **...**
                const parts = line.split(/(\*\*[^*]+\*\*)/g);

                return (
                  <div 
                    key={lIdx} 
                    style={{ 
                      paddingLeft: isBullet || isNumbered ? '12px' : '0px',
                      marginBottom: lIdx < lines.length - 1 ? '4px' : '0px'
                    }}
                  >
                    {parts.map((part, partIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={partIdx} style={{ color: 'var(--navy-ink)', fontWeight: 700 }}>
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      const italicParts = part.split(/(\*[^*]+\*)/g);
                      return (
                        <span key={partIdx}>
                          {italicParts.map((sub, sIdx) => {
                            if (sub.startsWith('*') && sub.endsWith('*')) {
                              return <em key={sIdx} style={{ fontStyle: 'italic' }}>{sub.slice(1, -1)}</em>;
                            }
                            return sub;
                          })}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % displayCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + displayCards.length) % displayCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIdx = Math.floor(Math.random() * displayCards.length);
    setCurrentIndex(randomIdx);
  };

  // Función principal para valorar: Fácil, Difícil (o Regular)
  const handleRate = (rating: 'easy' | 'medium' | 'hard') => {
    const updated = { ...cardStats, [currentCard.id]: rating };
    setCardStats(updated);

    // Si aún quedan tarjetas por ver en el orden, avanza a la siguiente
    if (safeIndex < displayCards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Al terminar la baraja se muestra el resumen del repaso
      const allRated = allCards.every(c => !!updated[c.id]);
      if (allRated) setShowSummary(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onKeyDown={e => {
          const t = e.target as HTMLElement;
          if (t.closest('input, textarea, select')) return;
          if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
          else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
        }} 
        className="modal-container" 
        style={{ maxWidth: '820px', width: '96vw', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={{ padding: '0.9rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Award size={20} color="var(--mint)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
              Flashcards: {topic.number} · {topic.title}
            </h3>
            <span className="qfdos-badge badge-teal" style={{ fontSize: '0.72rem' }}>
              {allCards.length} tarjetas
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className={`btn btn-sm ${showSummary ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              title="Ver resumen y nota"
            >
              <BookOpen size={13} /> {showSummary ? 'Volver a tarjetas' : 'Ver Resumen'}
            </button>
            <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
          </div>
        </div>

        {/* Student identification & continuous evaluation info */}
        <div style={{
          padding: '6px 1.25rem',
          background: 'var(--surface-alt)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <User size={13} color="var(--teal)" />
            <span>
              <strong>Repaso personal</strong> · no cuenta para la nota; al terminar puedes enviar al profesor tu opinión sobre la dificultad
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Progreso: <strong>{ratedCount} / {allCards.length}</strong>
            </span>
            {estadoSync !== 'local' && (
              <span
                style={{ color: estadoSync === 'error' ? 'var(--accent-amber)' : 'var(--text-muted)', fontSize: '0.75rem' }}
                title={estadoSync === 'error'
                  ? 'No se ha podido sincronizar; tu progreso está guardado en este dispositivo.'
                  : 'Tu progreso se guarda en tu cuenta y aparece en tus otros dispositivos.'}
              >
                {estadoSync === 'sincronizando' ? '↻ Sincronizando…' : estadoSync === 'ok' ? '☁ Sincronizado' : '⚠ Solo en este dispositivo'}
              </span>
            )}
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
              {easyCount} Fáciles
            </span>
            <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
              {hardCount} Difíciles
            </span>
            {hardCount > 0 && (
              <button
                onClick={() => {
                  setFilterHardOnly(!filterHardOnly);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`btn btn-sm ${filterHardOnly ? 'btn-secondary' : 'btn-outline'}`}
                style={{ fontSize: '0.7rem', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                title="Repasar solo las tarjetas marcadas como difíciles"
              >
                <Filter size={11} /> {filterHardOnly ? 'Ver Todas' : 'Solo Difíciles'}
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflowY: 'auto', flex: 1, padding: '1.1rem 1.5rem', gap: '0.9rem', boxSizing: 'border-box' }}>
          
          {showSummary ? (
            /* ============================================================== */
            /* VISTA DE RESUMEN DEL REPASO (sin calificación)                  */
            /* ============================================================== */
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(30,58,138,0.06) 0%, rgba(13,148,136,0.08) 100%)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>
                  Resumen del repaso: {topic.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
                  Las flashcards son para estudiar: no se califican. Si quieres, envía al profesor qué tarjetas te han resultado difíciles.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', margin: '12px 0' }}>
                  <div style={{ background: 'var(--surface)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>Fáciles (Dominadas)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{easyCount}</div>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 700 }}>Difíciles (A repasar)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-red)' }}>{hardCount}</div>
                  </div>
                </div>

                {hardCount > 0 && (
                  <button
                    type="button"
                    onClick={() => { setShowSummary(false); setFilterHardOnly(true); setCurrentIndex(0); setIsFlipped(false); }}
                    className="btn btn-primary"
                    style={{ marginTop: '10px' }}
                  >
                    Repasar las {hardCount} difíciles
                  </button>
                )}
              </div>

              {/* Opinión: dificultad global + valoración de cada tarjeta, sin calificación */}
              <OpinionDificultad
                tipo="flashcards"
                temaId={topic.id}
                tema={`${topic.number} · ${topic.title}`}
                pregunta="¿Qué dificultad global te han parecido estas flashcards?"
                detalle={{
                  tarjetasValoradas: String(ratedCount),
                  totalTarjetas: String(allCards.length),
                  faciles: String(easyCount),
                  regulares: String(mediumCount),
                  dificiles: String(hardCount),
                  valoraciones: allCards
                    .filter(c => cardStats[c.id])
                    .map(c => `${c.id}=${cardStats[c.id] === 'easy' ? 'facil' : cardStats[c.id] === 'medium' ? 'regular' : 'dificil'}`)
                    .join('; ')
                }}
              />

              {/* Desglose individual de cada tarjeta */}
              <div style={{ width: '100%' }}>
                <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '8px' }}>
                  Desglose por Concepto ({allCards.length} tarjetas):
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {allCards.map((c, idx) => {
                    const st = cardStats[c.id];
                    return (
                      <div
                        key={c.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          background: 'var(--surface)',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.82rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0, paddingRight: '8px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--text-muted)', width: '22px' }}>#{idx + 1}</span>
                          <span style={{ fontWeight: 600, color: 'var(--navy-ink)' }}>{c.concept}</span>
                          {c.category && (
                            <span className="qfdos-badge badge-teal" style={{ fontSize: '0.65rem' }}>
                              {c.category}
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => {
                              const updated = { ...cardStats, [c.id]: 'hard' as const };
                              setCardStats(updated);
                            }}
                            className={`btn btn-sm ${st === 'hard' ? 'btn-danger' : 'btn-outline'}`}
                            aria-pressed={st === 'hard'}
                            style={{
                              fontSize: '0.72rem',
                              padding: '2px 8px',
                              fontWeight: st === 'hard' ? 700 : 400
                            }}
                          >
                            Difícil
                          </button>
                          <button
                            onClick={() => {
                              const updated = { ...cardStats, [c.id]: 'easy' as const };
                              setCardStats(updated);
                            }}
                            className={`btn btn-sm ${st === 'easy' ? 'btn-mint' : 'btn-outline'}`}
                            style={{
                              fontSize: '0.72rem',
                              padding: '2px 8px',
                              fontWeight: st === 'easy' ? 700 : 400
                            }}
                          >
                            Fácil ✓
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => setShowSummary(false)} className="btn btn-outline">
                  Volver a las tarjetas
                </button>
                {hardCount > 0 && (
                  <button
                    onClick={() => {
                      setFilterHardOnly(true);
                      setCurrentIndex(0);
                      setIsFlipped(false);
                      setShowSummary(false);
                    }}
                    className="btn btn-secondary"
                  >
                    Repasar solo las {hardCount} difíciles
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* VISTA DE ESTUDIO ACTIVO (TARJETA + BOTONES FÁCIL / DIFÍCIL)   */
            /* ============================================================== */
            <>
              {/* Mini-mapa horizontal de progreso interactivo (1 al 10) */}
              <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                  {displayCards.map((c, idx) => {
                    const st = cardStats[c.id];
                    const isCurrent = idx === safeIndex;
                    const bg = st === 'easy' ? 'var(--accent-emerald)' : st === 'hard' ? 'var(--accent-red)' : st === 'medium' ? 'var(--accent-amber)' : 'var(--border-color)';
                    const color = st ? '#ffffff' : 'var(--text-muted)';
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setIsFlipped(false);
                          setCurrentIndex(idx);
                        }}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          border: isCurrent ? '2px solid var(--navy)' : '1px solid transparent',
                          background: isCurrent && !st ? 'var(--primary-bg)' : bg,
                          color: isCurrent && !st ? 'var(--navy-ink)' : color,
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          transform: isCurrent ? 'scale(1.15)' : 'none',
                          transition: 'all 150ms ease'
                        }}
                        title={`Tarjeta ${idx + 1}: ${c.concept} (${st ? (st === 'easy' ? 'Fácil' : 'Difícil') : 'Sin valorar'})`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {currentCard.category && (
                    <span className="qfdos-badge badge-teal" style={{ fontSize: '0.72rem' }}>
                      {currentCard.category}
                    </span>
                  )}
                  {cardStats[currentCard.id] && (
                    <span className={`qfdos-badge ${cardStats[currentCard.id] === 'easy' ? 'badge-emerald' : cardStats[currentCard.id] === 'medium' ? 'badge-amber' : 'badge-red'}`} style={{ fontSize: '0.72rem' }}>
                      {cardStats[currentCard.id] === 'easy' ? 'FÁCIL ✓' : cardStats[currentCard.id] === 'medium' ? 'REGULAR' : 'DIFÍCIL'}
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)} {...pulsable(() => setIsFlipped(!isFlipped))} aria-pressed={isFlipped} aria-label={isFlipped ? 'Tarjeta girada: ver anverso' : 'Girar tarjeta'}
                style={{
                  width: '100%',
                  flexShrink: 0,
                  minHeight: '260px',
                  height: 'auto',
                  background: isFlipped ? 'linear-gradient(135deg, var(--surface) 0%, var(--surface-alt) 100%)' : 'var(--surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: isFlipped ? '2px solid var(--teal)' : '2px solid var(--navy)',
                  boxShadow: 'var(--shadow-md)',
                  padding: '1.4rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: isFlipped ? 'flex-start' : 'center',
                  alignItems: 'stretch',
                  cursor: 'pointer',
                  userSelect: 'none',
                  boxSizing: 'border-box'
                }}
              >
                {/* Header interior de la tarjeta con concepto y botón de girar */}
                <div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '0.6rem',
                  borderBottom: '1px solid var(--border-color)',
                  flexShrink: 0
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="qfdos-badge badge-navy" style={{ fontSize: '0.78rem' }}>
                      {currentCard.concept}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ({safeIndex + 1} de {displayCards.length})
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: isFlipped ? 'var(--teal-ink)' : 'var(--navy-ink)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <RotateCw size={13} /> {isFlipped ? 'Ver Anverso' : 'Toca para Girar'}
                  </span>
                </div>

                {/* Front or Back Content */}
                {!isFlipped ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <h4 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--text-title)', lineHeight: 1.55 }}>
                      {currentCard.front}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                      (Haz clic sobre la tarjeta para revelar la respuesta y las estructuras moleculares)
                    </p>
                  </div>
                ) : (
                  <div style={{ width: '100%' }}>
                    {renderFormattedText(currentCard.back)}

                    {/* Multi-structure display (e.g. aminoácidos activos AChE o Fisostigmina vs Neostigmina) */}
                    {currentCard.structures && currentCard.structures.length > 0 && (
                      <div style={{
                        marginTop: '16px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(135px, 100%), 1fr))',
                        gap: '12px',
                        background: 'var(--surface-alt)',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)'
                      }}>
                        {currentCard.structures.map((st, i) => (
                          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--surface)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--navy-ink)' }}>
                                {st.name}
                              </span>
                              {st.badge && (
                                <span className="qfdos-badge" style={{ fontSize: '0.62rem', background: 'var(--teal)', color: '#fff' }}>
                                  {st.badge}
                                </span>
                              )}
                            </div>
                            <Chem2DDrawer smiles={st.smiles} width={130} height={85} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Single Structure Display (si no hay imagen didáctica anotada específica) */}
                    {currentCard.smiles && !currentCard.structures && !currentCard.imagePath && (
                      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                        <Chem2DDrawer smiles={currentCard.smiles} width={220} height={100} />
                      </div>
                    )}

                    {/* Optional Didactic Image Asset */}
                    {currentCard.imagePath && (
                      <div style={{
                        marginTop: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        background: '#ffffff',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}>
                        <img
                          src={recurso(currentCard.imagePath)}
                          alt={currentCard.concept}
                          style={{ maxHeight: '360px', maxWidth: '100%', objectFit: 'contain', borderRadius: '6px' }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ============================================================== */}
              {/* BOTONES DE VALORACIÓN: FÁCIL / DIFÍCIL (SIEMPRE ACTIVOS)        */}
              {/* ============================================================== */}
              <div style={{
                flexShrink: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: 'var(--surface-alt)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    ¿Cómo valoras este concepto?
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    (No cuenta para la nota: organiza tu repaso y, si la envías, ayuda al profesor)
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {/* Botón DIFÍCIL */}
                  <button
                    onClick={() => handleRate('hard')}
                    className={`btn ${cardStats[currentCard.id] === 'hard' ? 'btn-secondary' : 'btn-outline'}`}
                    style={{
                      flex: '1 1 140px',
                      maxWidth: '220px',
                      padding: '10px 14px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      borderColor: 'var(--accent-red)',
                      color: cardStats[currentCard.id] === 'hard' ? '#ffffff' : 'var(--accent-red)',
                      background: cardStats[currentCard.id] === 'hard' ? 'var(--accent-red)' : 'transparent',
                      boxShadow: cardStats[currentCard.id] === 'hard' ? '0 2px 8px rgba(239,68,68,0.3)' : 'none'
                    }}
                    title="Marcar como difícil (necesito repasarla)"
                  >
                    <ThumbsDown size={16} />
                    {cardStats[currentCard.id] === 'hard' ? '✓ Marcada Difícil' : 'Difícil'}
                  </button>

                  {/* Botón REGULAR (opcional intermedio) */}
                  <button
                    onClick={() => handleRate('medium')}
                    className={`btn ${cardStats[currentCard.id] === 'medium' ? 'btn-secondary' : 'btn-outline'}`}
                    style={{
                      flex: '0 1 110px',
                      padding: '10px 12px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      borderColor: 'var(--accent-amber)',
                      color: cardStats[currentCard.id] === 'medium' ? '#ffffff' : 'var(--warn-ink)',
                      background: cardStats[currentCard.id] === 'medium' ? 'var(--accent-amber)' : 'transparent'
                    }}
                    title="Marcar como regular"
                  >
                    Regular
                  </button>

                  {/* Botón FÁCIL */}
                  <button
                    onClick={() => handleRate('easy')}
                    className={`btn ${cardStats[currentCard.id] === 'easy' ? 'btn-mint' : 'btn-outline'}`}
                    style={{
                      flex: '1 1 140px',
                      maxWidth: '220px',
                      padding: '10px 14px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      borderColor: 'var(--accent-emerald)',
                      color: cardStats[currentCard.id] === 'easy' ? '#ffffff' : 'var(--accent-emerald)',
                      background: cardStats[currentCard.id] === 'easy' ? 'var(--accent-emerald)' : 'transparent',
                      boxShadow: cardStats[currentCard.id] === 'easy' ? '0 2px 8px rgba(16,185,129,0.3)' : 'none'
                    }}
                    title="Marcar como fácil (concepto dominado)"
                  >
                    <ThumbsUp size={16} />
                    {cardStats[currentCard.id] === 'easy' ? '✓ Marcada Fácil' : 'Fácil'}
                  </button>
                </div>
              </div>

            </>
          )}

        </div>

        {/* Footer with Persistent Navigation Controls */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0.85rem 1.5rem', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={handlePrev} className="btn btn-sm btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
              <ChevronLeft size={16} /> Anterior
            </button>
            <button onClick={handleShuffle} className="btn btn-sm btn-outline" title="Tarjeta Aleatoria" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Shuffle size={14} /> Aleatorio
            </button>
            <button onClick={handleNext} className="btn btn-sm btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
              Siguiente <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {!showSummary && ratedCount > 0 && (
              <button type="button" onClick={() => setShowSummary(true)} className="btn btn-sm btn-secondary">
                Terminar y opinar
              </button>
            )}
            <button onClick={onClose} className="btn btn-sm btn-outline">
              Cerrar Flashcards
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
