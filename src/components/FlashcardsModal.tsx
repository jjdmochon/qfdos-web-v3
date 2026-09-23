import React, { useState } from 'react';
import { QfdosTopic, Flashcard, INITIAL_TOPICS } from '../data/qfdosData';
import { Chem2DDrawer } from './Chem2DDrawer';
import { recurso } from '../services/rutas';
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
  Sparkles
} from 'lucide-react';

interface FlashcardsModalProps {
  topic: QfdosTopic;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  topic,
  onClose
}) => {
  const cards: Flashcard[] = React.useMemo(() => {
    if (topic.id === 'tema-01' || topic.number === 'Tema 01') {
      const base1 = INITIAL_TOPICS.find(t => t.id === 'tema-01') || INITIAL_TOPICS[1];
      if (base1?.flashcards && base1.flashcards.length > 0) return base1.flashcards;
    }
    return topic.flashcards || [];
  }, [topic]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStats, setCardStats] = useState<{ [id: string]: 'easy' | 'medium' | 'hard' }>({});

  if (cards.length === 0) {
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
                          <strong key={partIdx} style={{ color: 'var(--navy)', fontWeight: 700 }}>
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      // Soporte para cursivas *...* si las hubiera
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

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIdx = Math.floor(Math.random() * cards.length);
    setCurrentIndex(randomIdx);
  };

  const handleRate = (rating: 'easy' | 'medium' | 'hard') => {
    setCardStats(prev => ({ ...prev, [currentCard.id]: rating }));
    handleNext();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '680px' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--mint)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>
              Flashcards de Repetición Espaciada: {topic.number}
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Top Indicators */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Tarjeta {currentIndex + 1} de {cards.length}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {currentCard.category && (
                <span className="qfdos-badge badge-teal" style={{ fontSize: '0.7rem' }}>
                  {currentCard.category}
                </span>
              )}
              {cardStats[currentCard.id] && (
                <span className={`qfdos-badge ${cardStats[currentCard.id] === 'easy' ? 'badge-emerald' : cardStats[currentCard.id] === 'medium' ? 'badge-amber' : 'badge-navy'}`} style={{ fontSize: '0.7rem' }}>
                  {cardStats[currentCard.id].toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Interactive Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              width: '100%',
              minHeight: '260px',
              background: isFlipped ? 'linear-gradient(135deg, var(--surface) 0%, var(--surface-alt) 100%)' : 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              border: isFlipped ? '2px solid var(--teal)' : '2px solid var(--navy)',
              boxShadow: 'var(--shadow-md)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
          >
            <span style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              fontSize: '0.72rem',
              color: isFlipped ? 'var(--teal)' : 'var(--navy)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <RotateCw size={13} /> {isFlipped ? 'Ver Anverso' : 'Toca para Girar'}
            </span>

            <span className="qfdos-badge badge-navy" style={{ marginBottom: '12px', fontSize: '0.75rem' }}>
              {currentCard.concept}
            </span>

            {/* Front or Back Content */}
            {!isFlipped ? (
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-title)', lineHeight: 1.45 }}>
                  {currentCard.front}
                </h4>
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                {renderFormattedText(currentCard.back)}

                {/* Multi-structure display (e.g. aminoácidos activos AChE o Fisostigmina vs Neostigmina) */}
                {currentCard.structures && currentCard.structures.length > 0 && (
                  <div style={{
                    marginTop: '14px',
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    background: 'var(--surface-alt)',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}>
                    {currentCard.structures.map((st, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--navy)' }}>
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
                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>
                    <Chem2DDrawer smiles={currentCard.smiles} width={220} height={100} />
                  </div>
                )}

                {/* Optional Didactic Image Asset */}
                {currentCard.imagePath && (
                  <div style={{
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#ffffff',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}>
                    <img
                      src={recurso(currentCard.imagePath)}
                      alt={currentCard.concept}
                      style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rating Buttons (Visible when flipped) */}
          {isFlipped && (
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: '4px' }}>¿Qué tal la recordaste?</span>
              <button
                onClick={() => handleRate('hard')}
                className="btn btn-sm btn-outline"
                style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)', fontSize: '0.75rem' }}
              >
                Difícil
              </button>
              <button
                onClick={() => handleRate('medium')}
                className="btn btn-sm btn-outline"
                style={{ borderColor: 'var(--accent-amber)', color: '#b45309', fontSize: '0.75rem' }}
              >
                Regular
              </button>
              <button
                onClick={() => handleRate('easy')}
                className="btn btn-sm btn-mint"
                style={{ fontSize: '0.75rem' }}
              >
                Fácil ✓
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={handlePrev} className="btn btn-sm btn-outline">
              <ChevronLeft size={16} /> Anterior
            </button>
            <button onClick={handleShuffle} className="btn btn-sm btn-outline" title="Tarjeta Aleatoria">
              <Shuffle size={14} /> Aleatorio
            </button>
            <button onClick={handleNext} className="btn btn-sm btn-primary">
              Siguiente <ChevronRight size={16} />
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-outline">
            Cerrar Flashcards
          </button>
        </div>

      </div>
    </div>
  );
};
