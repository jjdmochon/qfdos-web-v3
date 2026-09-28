import React, { useState, useEffect, useMemo } from 'react';
import { QfdosTopic, Flashcard, INITIAL_TOPICS } from '../data/qfdosData';
import { Chem2DDrawer } from './Chem2DDrawer';
import { recurso } from '../services/rutas';
import { useAuth } from '../context/AuthContext';
import { pulsable } from '../utils/a11y';
import {
  submitFlashcardsAttemptToGoogleSheets,
  GoogleSheetsSubmissionResult
} from '../services/googleSheetsService';
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

  // Alumno / Docente que realiza la autoevaluación
  const [studentName, setStudentName] = useState<string>(user?.name || '');
  const [studentEmail, setStudentEmail] = useState<string>(user?.email || '');

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
  const STORAGE_KEY = `qfdos_v3_flashcards_${topic.id}`;
  const [cardStats, setCardStats] = useState<{ [id: string]: 'easy' | 'medium' | 'hard' }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
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

  // Tarjetas a mostrar según filtro
  const displayCards = useMemo(() => {
    if (!filterHardOnly) return allCards;
    const hardFiltered = allCards.filter(c => cardStats[c.id] === 'hard');
    return hardFiltered.length > 0 ? hardFiltered : allCards;
  }, [allCards, filterHardOnly, cardStats]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Estado de sincronización con Google Sheets (hoja oficial Respuestas_QFDOS)
  const [sheetStatus, setSheetStatus] = useState<
    'idle' | 'sending' | 'sent' | 'sent_unconfirmed' | 'network_error' | 'no_url' | 'sesion_invalida'
  >('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Estadísticas globales
  const easyCount = allCards.filter(c => cardStats[c.id] === 'easy').length;
  const hardCount = allCards.filter(c => cardStats[c.id] === 'hard').length;
  const mediumCount = allCards.filter(c => cardStats[c.id] === 'medium').length;
  const ratedCount = allCards.filter(c => !!cardStats[c.id]).length;
  const scorePercent = allCards.length > 0 ? Math.round((easyCount / allCards.length) * 100) : 0;
  const score10 = allCards.length > 0 ? ((easyCount / allCards.length) * 10).toFixed(1) : '0.0';

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
    if (sheetStatus === 'sent') { setSheetStatus('idle'); setStatusMessage(''); }

    // Si aún quedan tarjetas por ver en el orden, avanza a la siguiente
    if (safeIndex < displayCards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Si llegó al final y están todas valoradas, sugerir sincronizar
      const allRated = allCards.every(c => !!updated[c.id]);
      if (allRated) {
        setShowSummary(true);
        // Autoregistrar en la hoja de cálculo oficial
        handleSyncToSheets(updated);
      }
    }
  };

  // Enviar a la hoja oficial de Google Sheets (Respuestas_QFDOS)
  const handleSyncToSheets = async (customStats?: { [id: string]: 'easy' | 'medium' | 'hard' }) => {
    const statsToUse = customStats || cardStats;
    const rated = allCards.filter(c => statsToUse[c.id]);

    if (rated.length === 0) {
      setStatusMessage('Valora al menos una tarjeta como Fácil o Difícil antes de registrar.');
      return;
    }

    const emailFinal = (studentEmail || user?.email || '').trim() || 'estudiante@ugr.es';
    const nameFinal = (studentName || user?.name || '').trim() || 'Estudiante QFDOS';

    setSheetStatus('sending');
    setStatusMessage('Enviando respuestas y valoración a la hoja oficial de calificaciones...');

    try {
      const eCount = allCards.filter(c => statsToUse[c.id] === 'easy').length;
      const hCount = allCards.filter(c => statsToUse[c.id] === 'hard').length;
      const mCount = allCards.filter(c => statsToUse[c.id] === 'medium').length;

      const res: GoogleSheetsSubmissionResult = await submitFlashcardsAttemptToGoogleSheets({
        studentName: nameFinal,
        studentEmail: emailFinal,
        topicId: topic.id,
        topicNumber: topic.number,
        topicTitle: topic.title,
        totalCards: allCards.length,
        easyCount: eCount,
        hardCount: hCount,
        mediumCount: mCount,
        ratings: allCards.map(c => ({
          cardId: c.id,
          concept: c.concept,
          front: c.front,
          rating: statsToUse[c.id] || 'hard'
        }))
      });

      setSheetStatus(res.status);
      if (res.status === 'sent') {
        setStatusMessage('✓ Valoración registrada con éxito en la hoja oficial de calificaciones (Respuestas_QFDOS).');
      } else if (res.status === 'sent_unconfirmed') {
        setStatusMessage('Valoración enviada, pero no se ha podido confirmar en la hoja. Si tu sesión ha caducado, vuelve a entrar y registra de nuevo.');
      } else {
        setStatusMessage(res.message || 'Error al conectar con Google Sheets.');
      }
    } catch (err) {
      console.error('Error enviando flashcards a Google Sheets:', err);
      setSheetStatus('network_error');
      setStatusMessage('Error de conexión con Google Sheets. La autoevaluación queda guardada en tu dispositivo.');
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
            {user?.email ? (
              <span>
                <strong>{user.name}</strong> ({user.email}) · <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Cuenta UGR verificada</span>
              </span>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Registrar como:</span>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface)'
                  }}
                />
                <input
                  type="email"
                  placeholder="correo@ugr.es"
                  value={studentEmail}
                  onChange={e => setStudentEmail(e.target.value)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface)'
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Progreso: <strong>{ratedCount} / {allCards.length}</strong>
            </span>
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
            /* VISTA DE RESUMEN Y REGISTRO EN GOOGLE SHEETS                   */
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
                  Resumen de Autoevaluación: {topic.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
                  Resultados consolidados para la hoja oficial de evaluación continua (Respuestas_QFDOS).
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', margin: '12px 0' }}>
                  <div style={{ background: 'var(--surface)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dominio Estimado</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-ink)' }}>{scorePercent}%</div>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nota / 10</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--teal-ink)' }}>{score10}</div>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>Fáciles (Dominadas)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{easyCount}</div>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 700 }}>Difíciles (A repasar)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-red)' }}>{hardCount}</div>
                  </div>
                </div>

                {/* Sincronización en la Hoja Oficial */}
                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleSyncToSheets()}
                    disabled={sheetStatus === 'sending'}
                    className="btn btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 700,
                      padding: '8px 18px',
                      fontSize: '0.88rem'
                    }}
                  >
                    <Send size={15} />
                    {sheetStatus === 'sending' ? 'Enviando a Google Sheets...' : 'Registrar en Hoja Oficial de Calificaciones'}
                  </button>

                  {statusMessage && (
                    <div className={`status-msg ${sheetStatus === 'sent' ? 'status-msg--ok' : sheetStatus === 'sending' ? 'status-msg--info' : sheetStatus === 'sent_unconfirmed' || sheetStatus === 'no_url' ? 'status-msg--warn' : sheetStatus === 'idle' ? 'status-msg--warn' : 'status-msg--bad'}`} role={sheetStatus === 'network_error' ? 'alert' : 'status'}>
                      {sheetStatus === 'sent' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      {statusMessage}
                    </div>
                  )}
                </div>
              </div>

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
                            className={`btn btn-sm ${st === 'hard' ? 'btn-secondary' : 'btn-outline'}`}
                            style={{
                              fontSize: '0.72rem',
                              padding: '2px 8px',
                              borderColor: st === 'hard' ? 'var(--accent-red)' : undefined,
                              color: st === 'hard' ? 'var(--accent-red)' : undefined,
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
                          style={{ maxHeight: '240px', maxWidth: '100%', objectFit: 'contain', borderRadius: '6px' }}
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
                    (Se registra en la hoja oficial de calificaciones)
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

              {/* Status Banner si se ha enviado o está enviando a Sheets */}
              {statusMessage && (
                <div className={`status-msg ${sheetStatus === 'sent' ? 'status-msg--ok' : sheetStatus === 'sending' ? 'status-msg--info' : sheetStatus === 'sent_unconfirmed' || sheetStatus === 'no_url' ? 'status-msg--warn' : sheetStatus === 'idle' ? 'status-msg--warn' : 'status-msg--bad'}`} style={{ width: '100%' }} role={sheetStatus === 'network_error' ? 'alert' : 'status'}>
                  {sheetStatus === 'sent' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span>{statusMessage}</span>
                </div>
              )}
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
            <button
              onClick={() => handleSyncToSheets()}
              disabled={sheetStatus === 'sending' || sheetStatus === 'sent' || ratedCount === 0}
              aria-busy={sheetStatus === 'sending'}
              className="btn btn-sm btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
              title="Guardar en la hoja de cálculo oficial de Google Sheets"
            >
              <Send size={14} />
              {sheetStatus === 'sending' ? 'Enviando...' : sheetStatus === 'sent' ? 'Registrado ✓' : 'Registrar en Hoja Oficial'}
            </button>
            <button onClick={onClose} className="btn btn-sm btn-outline">
              Cerrar Flashcards
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
