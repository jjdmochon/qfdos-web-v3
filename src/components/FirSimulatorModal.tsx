import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Maximize2,
  Minimize2,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Layers,
  FlaskConical,
  GraduationCap,
  Calendar,
  Check,
  ChevronDown
} from 'lucide-react';
import {
  FIR_QUESTIONS,
  FirQuestion,
  getAllFirQuestions
} from '../data/firQuestionsData';
import { Chem2DDrawer } from './Chem2DDrawer';

interface FirSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'embed' | 'trainer' | 'trends';
  initialTopicId?: string;
}

export const FirSimulatorModal: React.FC<FirSimulatorModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'trainer',
  initialTopicId
}) => {
  const [activeTab, setActiveTab] = useState<'embed' | 'trainer' | 'trends'>(initialTab);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Trainer state
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopicId || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Base URL for image assets
  const baseUrl = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopic(initialTopicId);
      setActiveTab('trainer');
    }
  }, [initialTopicId]);

  // Filter questions for trainer
  const filteredQuestions = useMemo(() => {
    return FIR_QUESTIONS.filter(q => {
      if (selectedYear !== 'all' && q.origYear !== selectedYear) return false;
      if (selectedTopic !== 'all' && q.qfdosTopicId !== selectedTopic) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inOptions = q.options.some(o => o.toLowerCase().includes(query));
        const inBadge = q.badge.toLowerCase().includes(query);
        const inBlock = q.block.toLowerCase().includes(query);
        if (!inQuestion && !inOptions && !inBadge && !inBlock) return false;
      }
      return true;
    });
  }, [selectedYear, selectedTopic, searchQuery]);

  // Clamp current index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
  }, [selectedYear, selectedTopic, searchQuery]);

  const currentQ: FirQuestion | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentQ) return;
    setShowExplanation(true);
    setAnswers(prev => ({ ...prev, [currentQ.id]: selectedOption }));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handleRandom = () => {
    if (filteredQuestions.length <= 1) return;
    let nextIdx = currentIndex;
    while (nextIdx === currentIndex) {
      nextIdx = Math.floor(Math.random() * filteredQuestions.length);
    }
    setCurrentIndex(nextIdx);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // Compute stats on filtered questions
  const stats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let incorrect = 0;
    filteredQuestions.forEach(q => {
      const userAns = answers[q.id];
      if (userAns !== undefined) {
        answered++;
        if (userAns === q.correctIndex) correct++;
        else incorrect++;
      }
    });
    // Official Ministerial FIR score formula: Puntos = (3 * aciertos) - fallos
    const ministerialScore = 3 * correct - incorrect;
    return { answered, correct, incorrect, ministerialScore };
  }, [filteredQuestions, answers]);

  if (!isOpen) return null;

  const topicsList = [
    { id: 'all', label: 'Todos los Temas' },
    { id: 'tema-00', label: 'Tema 00: Afinidad & Bioisosterismo' },
    { id: 'tema-01', label: 'Tema 01: Colinérgico' },
    { id: 'tema-02', label: 'Tema 02: Adrenérgico' },
    { id: 'tema-03', label: 'Tema 03: Dopaminérgico' },
    { id: 'tema-04', label: 'Tema 04: Serotoninérgico' },
    { id: 'tema-05', label: 'Tema 05: GABAérgico' },
    { id: 'tema-06', label: 'Tema 06: Opioides' },
    { id: 'tema-07', label: 'Tema 07: Histaminérgico & Antiulcerosos' },
    { id: 'tema-08', label: 'Tema 08: Renina-Angiotensina & Diuréticos' },
    { id: 'tema-09', label: 'Tema 09: AINEs & Coxibs' },
    { id: 'tema-10', label: 'Tema 10: ADMET & Farmacocinética' },
    { id: 'quimica-farmaceutica-general', label: 'Química Farmacéutica General' },
    { id: 'quimica-organica', label: 'Química Orgánica FIR' }
  ];

  const yearsList = [
    { id: 'all', label: 'Todas las Convocatorias (2020-2025)' },
    { id: '2025', label: 'FIR 2025 (21 preguntas QF)' },
    { id: '2024', label: 'FIR 2024 (24 preguntas QF)' },
    { id: '2023', label: 'FIR 2023 (24 preguntas QF)' },
    { id: '2022', label: 'FIR 2022 (24 preguntas QF)' },
    { id: '2021', label: 'FIR 2021 (22 preguntas QF)' },
    { id: '2020', label: 'FIR 2020 (21 preguntas QF)' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="modal-container"
        style={{
          maxWidth: isFullscreen ? '98vw' : '1100px',
          width: '95vw',
          height: isFullscreen ? '96vh' : '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          transition: 'all 0.25s ease'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--surface-alt)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)'
              }}
            >
              <Award size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Simulador Oficial FIR (2020-2025)
                </h3>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: 'rgba(13, 148, 136, 0.14)',
                    color: 'var(--teal-ink)',
                    border: '1px solid rgba(13, 148, 136, 0.3)'
                  }}
                >
                  Ministerio de Sanidad · 1.235 Preguntas
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Preparación para la prueba selectiva de Farmacéutico Interno Residente · Módulo de Química Farmacéutica
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="https://jjdmochon.github.io/FIR/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.75rem',
                textDecoration: 'none'
              }}
              title="Abrir el simulador completo en una pestaña nueva"
            >
              <span>Abrir en web</span>
              <ExternalLink size={13} />
            </a>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="btn btn-sm btn-outline"
              style={{ padding: '6px' }}
              title={isFullscreen ? 'Restaurar tamaño' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button onClick={onClose} className="btn btn-sm btn-outline" style={{ padding: '6px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--surface)',
            padding: '0 16px',
            gap: '8px',
            flexShrink: 0
          }}
        >
          <button
            onClick={() => setActiveTab('trainer')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: activeTab === 'trainer' ? 'var(--teal-ink)' : 'var(--text-muted)',
              borderBottom: activeTab === 'trainer' ? '2.5px solid var(--teal)' : '2.5px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <FlaskConical size={15} />
            <span>Módulo Química & QF (136 Preguntas)</span>
            <span
              style={{
                fontSize: '0.66rem',
                background: 'var(--surface-alt)',
                padding: '2px 6px',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)'
              }}
            >
              Oficial
            </span>
          </button>

          <button
            onClick={() => setActiveTab('embed')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: activeTab === 'embed' ? 'var(--teal-ink)' : 'var(--text-muted)',
              borderBottom: activeTab === 'embed' ? '2.5px solid var(--teal)' : '2.5px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={15} />
            <span>Simulador Oficial Completo (210 Preguntas / 4h 30m)</span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: activeTab === 'trends' ? 'var(--teal-ink)' : 'var(--text-muted)',
              borderBottom: activeTab === 'trends' ? '2.5px solid var(--teal)' : '2.5px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <BookOpen size={15} />
            <span>Análisis & Tendencias FIR (2020-2025)</span>
          </button>
        </div>

        {/* Tab 1: Live Iframe Embed */}
        {activeTab === 'embed' && (
          <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', background: '#090e1a' }}>
            <iframe
              src="https://jjdmochon.github.io/FIR/"
              title="Simulador Oficial FIR"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block'
              }}
              allow="clipboard-write"
            />
          </div>
        )}

        {/* Tab 2: Specialized Chemistry & QF Trainer */}
        {activeTab === 'trainer' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Filter Bar */}
            <div
              style={{
                padding: '10px 16px',
                background: 'var(--surface-alt)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                flexShrink: 0
              }}
            >
              {/* Convocatoria filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} color="var(--text-muted)" />
                <select
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  style={{
                    fontSize: '0.78rem',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface)',
                    color: 'var(--text-title)',
                    fontWeight: 600
                  }}
                >
                  {yearsList.map(y => (
                    <option key={y.id} value={y.id}>{y.label}</option>
                  ))}
                </select>
              </div>

              {/* Tema QFDOS filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <BookOpen size={14} color="var(--text-muted)" />
                <select
                  value={selectedTopic}
                  onChange={e => setSelectedTopic(e.target.value)}
                  style={{
                    fontSize: '0.78rem',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface)',
                    color: 'var(--text-title)',
                    fontWeight: 600
                  }}
                >
                  {topicsList.map(t => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Search filter */}
              <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                <Search
                  size={13}
                  style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                />
                <input
                  type="text"
                  placeholder="Buscar por fármaco, receptor o concepto (ej. omeprazol, captopril, bioisóstero)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    fontSize: '0.78rem',
                    padding: '4px 8px 4px 28px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface)',
                    color: 'var(--text-title)'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '6px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Score pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--surface)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.74rem'
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>Baremo Sanidad:</span>
                <strong style={{ color: stats.ministerialScore >= 0 ? 'var(--teal-ink)' : '#ef4444' }}>
                  {stats.ministerialScore > 0 ? `+${stats.ministerialScore}` : stats.ministerialScore} pts
                </strong>
                <span style={{ color: 'var(--text-muted)' }}>
                  ({stats.correct} aciertos · {stats.incorrect} fallos)
                </span>
              </div>
            </div>

            {/* Questions Body */}
            {filteredQuestions.length === 0 ? (
              <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <HelpCircle size={36} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                <h4>No se encontraron preguntas con estos filtros</h4>
                <p style={{ fontSize: '0.85rem' }}>Prueba a seleccionar "Todos los Temas" o a cambiar el término de búsqueda.</p>
                <button
                  onClick={() => { setSelectedYear('all'); setSelectedTopic('all'); setSearchQuery(''); }}
                  className="btn btn-sm btn-outline"
                  style={{ marginTop: '10px' }}
                >
                  Restablecer filtros
                </button>
              </div>
            ) : currentQ ? (
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
                {/* Meta Badge Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)',
                        color: '#ffffff'
                      }}
                    >
                      {currentQ.badge}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(13, 148, 136, 0.1)',
                        color: 'var(--teal-ink)',
                        border: '1px solid rgba(13, 148, 136, 0.2)'
                      }}
                    >
                      {currentQ.qfdosTopicName}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        background: 'var(--surface-alt)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {currentQ.block}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Pregunta {currentIndex + 1} de {filteredQuestions.length}
                  </span>
                </div>

                {/* Question Text */}
                <div
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    color: 'var(--text-title)',
                    lineHeight: 1.55,
                    marginBottom: '16px'
                  }}
                >
                  {currentQ.question}
                </div>

                {/* Visual Area: Official Diagram or RDKit 2D Structure */}
                <div style={{ marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {/* Official Ministerial Image */}
                  {currentQ.hasImage && currentQ.imagePath && (
                    <div
                      style={{
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--surface)',
                        padding: '8px',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => setZoomedImage(`${baseUrl}${currentQ.imagePath}`)}
                      title="Haz clic para ampliar la figura oficial"
                    >
                      <img
                        src={`${baseUrl}${currentQ.imagePath}`}
                        alt={`Figura oficial ${currentQ.badge}`}
                        style={{
                          maxWidth: '420px',
                          maxHeight: '230px',
                          objectFit: 'contain',
                          borderRadius: '6px'
                        }}
                      />
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        🔍 Haz clic para ampliar figura oficial
                      </span>
                    </div>
                  )}

                  {/* RDKit Interactive 2D Structure */}
                  {currentQ.smiles && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Chem2DDrawer smiles={currentQ.smiles} width={280} height={180} />
                      <span style={{ fontSize: '0.68rem', color: 'var(--teal-ink)', marginTop: '4px', fontWeight: 600 }}>
                        Estructura 2D RDKit (Quimioinformática)
                      </span>
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {currentQ.options.map((opt, idx) => {
                    let optionBg = 'var(--surface)';
                    let optionBorder = 'var(--border-color)';
                    let numBg = 'var(--surface-alt)';
                    let numColor = 'var(--text-muted)';

                    if (selectedOption === idx) {
                      optionBg = 'var(--primary-bg)';
                      optionBorder = 'var(--teal)';
                      numBg = 'var(--teal)';
                      numColor = '#ffffff';
                    }

                    if (showExplanation) {
                      if (idx === currentQ.correctIndex) {
                        optionBg = 'rgba(16, 185, 129, 0.14)';
                        optionBorder = '#10b981';
                        numBg = '#10b981';
                        numColor = '#ffffff';
                      } else if (selectedOption === idx) {
                        optionBg = 'rgba(239, 68, 68, 0.12)';
                        optionBorder = '#ef4444';
                        numBg = '#ef4444';
                        numColor = '#ffffff';
                      }
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: `1.5px solid ${optionBorder}`,
                          background: optionBg,
                          cursor: showExplanation ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: numBg,
                            color: numColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            flexShrink: 0
                          }}
                        >
                          {idx + 1}
                        </span>

                        <span style={{ fontSize: '0.9rem', color: 'var(--text-title)', flex: 1, lineHeight: 1.45 }}>
                          {opt}
                        </span>

                        {showExplanation && idx === currentQ.correctIndex && (
                          <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
                        )}
                        {showExplanation && selectedOption === idx && idx !== currentQ.correctIndex && (
                          <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {showExplanation && (
                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: 'var(--surface-alt)',
                      borderLeft: '4px solid var(--teal)',
                      marginBottom: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <Sparkles size={16} color="var(--teal)" />
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-title)' }}>
                        Plantilla Oficial & Justificación Química:
                      </strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-title)', lineHeight: 1.5 }}>
                      {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>
            ) : null}

            {/* Bottom Controls Bar */}
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--border-color)',
                background: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="btn btn-sm btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                >
                  <ArrowLeft size={14} />
                  <span>Anterior</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= filteredQuestions.length - 1}
                  className="btn btn-sm btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                >
                  <span>Siguiente</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={handleRandom}
                  className="btn btn-sm btn-outline"
                  title="Pregunta aleatoria"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              <div>
                {!showExplanation ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="btn btn-sm btn-primary"
                    style={{
                      padding: '8px 20px',
                      fontWeight: 700,
                      opacity: selectedOption === null ? 0.6 : 1
                    }}
                  >
                    Comprobar Respuesta
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="btn btn-sm btn-primary"
                    style={{
                      padding: '8px 20px',
                      fontWeight: 700
                    }}
                  >
                    {currentIndex < filteredQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Bloque'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Trends & Strategic Guide */}
        {activeTab === 'trends' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 30px' }}>
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <GraduationCap size={26} color="var(--teal)" />
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Análisis Estratégico de Química Farmacéutica en el FIR (2020-2025)
                </h3>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                Las preguntas de Química y Química Farmacéutica representan entre <strong>20 y 25 preguntas anuales</strong> en la prueba selectiva oficial de Farmacéutico Interno Residente (FIR). El análisis sistemático de las últimas seis convocatorias oficiales (136 preguntas analizadas) revela patrones estructurales y mecanísticos constantes que coinciden al 100% con el temario de Química Farmacéutica II (QFDOS):
              </p>

              {/* Core High-Yield Pillars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {[
                  {
                    title: '1. Relaciones Estructura-Actividad (SAR)',
                    pct: '32%',
                    desc: 'Butirofenonas (sustitución en flúor, cadena propilo), fenotiazinas (cadena aminopropilo), ortopramidas (metoxilo en orto), 1,4-benzodiazepinas (C-3 hidroxilo o carboxilato) y beta-bloqueantes ariloxipropanolamínicos.'
                  },
                  {
                    title: '2. Diseño de Profármacos & Bioactivación',
                    pct: '24%',
                    desc: 'Aciloximetilésteres para salvar barreras de absorción, bases de Mannich, bioactivación de omeprazol a sulfenamida reactiva, sulfasalacina por azorreducción colónica, y activación de mitomicina C / dacarbazina.'
                  },
                  {
                    title: '3. Bioisosterismo & Farmacóforos',
                    pct: '18%',
                    desc: 'Isósteros clásicos de Grimm y no clásicos: anillo 1H-tetrazol como bioisóstero del ácido carboxílico, sustituciones bioisostéricas de éster por carbamato o amida, y bioisósteros de flúor aromático para frenar oxidación CYP.'
                  },
                  {
                    title: '4. Metalofármacos & Quelación Enzimática',
                    pct: '14%',
                    desc: 'Inhibidores de la enzima conversora de angiotensina (ECA): interacción del grupo sulfhidrilo de captopril con el ion Zn²⁺ y su sustitución por carboxilato en enalaprilato o fosfinato en fosinopril.'
                  }
                ].map((pill, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--surface-alt)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-title)' }}>{pill.title}</strong>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px', background: 'rgba(13, 148, 136, 0.15)', color: 'var(--teal-ink)' }}>
                        {pill.pct}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {pill.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Topic Correspondence Table */}
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '12px' }}>
                Correspondencia con las Unidades Docentes de QFDOS:
              </h4>

              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-alt)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>Tema QFDOS</th>
                      <th style={{ padding: '8px 12px' }}>Dianas & Familias Frecuentes en el FIR</th>
                      <th style={{ padding: '8px 12px', textAlign: 'center' }}>Preguntas FIR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { topic: 'Tema 00: Introducción & Afinidad', drugs: 'Bioisósteros (tetrazol/carboxilato), constantes Kd/Ki, Cheng-Prusoff, QSAR (π de Hansch)', count: 9 },
                      { topic: 'Tema 01: Colinérgico', drugs: 'Succinilcolina, decametonio, ésteres de colina, inhibidores acetilcolinesterasa', count: 3 },
                      { topic: 'Tema 02: Adrenérgico', drugs: 'Catecolaminas, bloqueantes beta (propranolol), ariloxipropanolaminas', count: 8 },
                      { topic: 'Tema 03: Dopaminérgico', drugs: 'Neurolépticos: butirofenonas (haloperidol), fenotiazinas (flufenazina), ortopramidas, carbidopa/L-dopa', count: 5 },
                      { topic: 'Tema 05: GABAérgico', drugs: '1,4-Benzodiazepinas (sustituciones en C-3, C-7), clorazepato, isoguvacina', count: 4 },
                      { topic: 'Tema 06: Opioides', drugs: 'Morfina, oripavinas por cicloadición [4+2] en tebaína, morfinanos sin puente 4,5-epoxi', count: 5 },
                      { topic: 'Tema 07: Histaminérgico', drugs: 'Omeprazol (bioactivación ácida), antihistamínicos H1 y H2', count: 4 },
                      { topic: 'Tema 08: Renina-Angiotensina', drugs: 'Inhibidores ECA (captopril, enalapril), quelación de Zn²⁺, hidroclorotiazida', count: 9 },
                      { topic: 'Tema 09: AINEs & Coxibs', drugs: 'Aspirina, ibuprofeno, selectividad COX-2, derivados de ácido salicílico', count: 2 },
                      { topic: 'Tema 10: ADMET', drugs: 'Reglas de Lipinski (Ro5), diseño de profármacos, metabolismo Fase I/II, aciloximetilésteres', count: 16 }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.topic}</td>
                        <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>{row.drugs}</td>
                        <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--teal-ink)' }}>{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Button to launch trainer */}
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button
                  onClick={() => setActiveTab('trainer')}
                  className="btn btn-primary"
                  style={{ padding: '10px 24px', fontWeight: 700, fontSize: '0.88rem' }}
                >
                  Comenzar a Practicar con las 136 Preguntas Oficiales
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Zoomed Image Lightbox */}
        {zoomedImage && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 100000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setZoomedImage(null)}
          >
            <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setZoomedImage(null)}
                style={{
                  position: 'absolute',
                  top: '-36px',
                  right: 0,
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                <X size={24} />
              </button>
              <img
                src={zoomedImage}
                alt="Figura oficial ampliada"
                style={{
                  maxWidth: '88vw',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  background: '#ffffff',
                  padding: '8px'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
