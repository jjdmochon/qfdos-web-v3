import React, { useState } from 'react';
import { QfdosTopic, TestQuestion, TestQuestionOption } from '../data/qfdosData';
import { 
  generateExamQuestionsWithGemini, 
  getStoredGeminiApiKey,
  ExamFocusArea 
} from '../services/geminiService';
import { Chem2DDrawer } from './Chem2DDrawer';
import { listFiles, StoredFileMeta } from '../services/fileStorage';
import { getFirQuestionsByTopic, getAllFirQuestions, convertFirToTestQuestion, FirQuestion } from '../data/firQuestionsData';
import { 
  X, 
  FileText, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  Download, 
  PlusCircle, 
  Check, 
  HelpCircle,
  Award,
  Atom,
  Layers,
  Edit3
} from 'lucide-react';

interface ExamGeneratorModalProps {
  topics: QfdosTopic[];
  onClose: () => void;
  onQuestionsAddedToTopic?: (topicId: string, questions: TestQuestion[]) => void;
}

export const ExamGeneratorModal: React.FC<ExamGeneratorModalProps> = ({
  topics,
  onClose,
  onQuestionsAddedToTopic
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'fir' | 'manual'>('ai');
  const [selectedFirIds, setSelectedFirIds] = useState<Set<string>>(new Set());
  const [firTopicFilter, setFirTopicFilter] = useState<string>('current');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const baseUrl = import.meta.env.BASE_URL || '/';
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || 'tema-00');
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Medio' | 'Avanzado'>('Medio');
  const [focusArea, setFocusArea] = useState<ExamFocusArea>('sintesis_reactividad');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<TestQuestion[]>([]);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [topicFiles, setTopicFiles] = useState<StoredFileMeta[]>([]);

  React.useEffect(() => {
    let isMounted = true;
    listFiles(selectedTopicId)
      .then(files => {
        if (isMounted) setTopicFiles(files);
      })
      .catch(err => console.warn('Error fetching topic files', err));
    return () => { isMounted = false; };
  }, [selectedTopicId]);

  // Manual Question Builder State
  const [manualQuestion, setManualQuestion] = useState('');
  const [manualQuestionSmiles, setManualQuestionSmiles] = useState('');
  const [manualOptions, setManualOptions] = useState<TestQuestionOption[]>([
    { text: 'Opción A', smiles: '' },
    { text: 'Opción B', smiles: '' },
    { text: 'Opción C', smiles: '' },
    { text: 'Opción D', smiles: '' }
  ]);
  const [manualCorrectIndex, setManualCorrectIndex] = useState(0);
  const [manualExplanation, setManualExplanation] = useState('');
  const [manualBlock, setManualBlock] = useState('Reactividad & Mecanismo');

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  const handleGenerate = async () => {
    setIsLoading(true);
    setAddedSuccess(false);

    try {
      const filesDesc = topicFiles.length > 0
        ? `Materiales docentes y archivos subidos por el profesor: ${topicFiles.map(f => `${f.name} [${f.kind}]`).join(', ')}`
        : undefined;

      const results = await generateExamQuestionsWithGemini({
        topicId: selectedTopicId,
        topicTitle: `${selectedTopic.number}: ${selectedTopic.title}`,
        questionCount,
        difficulty,
        focusArea,
        topic: selectedTopic,
        uploadedMaterialsContext: filesDesc
      });
      setGeneratedQuestions(results);
    } catch (e) {
      console.error('Error generating exam questions', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToTopic = () => {
    if (onQuestionsAddedToTopic && generatedQuestions.length > 0) {
      onQuestionsAddedToTopic(selectedTopicId, generatedQuestions);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }
  };

  const handleAddManualQuestion = () => {
    if (!manualQuestion.trim()) return;

    const newQ: TestQuestion = {
      id: `manual_q_${Date.now()}`,
      topicId: selectedTopicId,
      block: manualBlock,
      question: manualQuestion,
      questionSmiles: manualQuestionSmiles.trim() || undefined,
      options: manualOptions.map(opt => ({
        text: opt.text,
        smiles: opt.smiles?.trim() || undefined
      })),
      correctIndex: manualCorrectIndex,
      explanation: manualExplanation || 'Explicación del profesorado.',
      difficulty
    };

    if (onQuestionsAddedToTopic) {
      onQuestionsAddedToTopic(selectedTopicId, [newQ]);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }

    // Reset Form
    setManualQuestion('');
    setManualQuestionSmiles('');
    setManualExplanation('');
    setManualOptions([
      { text: '', smiles: '' },
      { text: '', smiles: '' },
      { text: '', smiles: '' },
      { text: '', smiles: '' }
    ]);
  };

  const handleExportMarkdown = () => {
    if (generatedQuestions.length === 0) return;
    const content = `# 📝 Examen Oficial: ${selectedTopic.number} — ${selectedTopic.title}
*Nivel:* ${difficulty} | *Preguntas:* ${generatedQuestions.length} | *Fecha:* ${new Date().toLocaleDateString('es-ES')}

` + generatedQuestions.map((q, idx) => `
### Pregunta ${idx + 1}:
${q.question}
${q.questionSmiles ? `**Estructura SMILES:** \`${q.questionSmiles}\`\n` : ''}
${q.options.map((opt, oIdx) => {
  const text = typeof opt === 'string' ? opt : opt.text;
  const smiles = typeof opt === 'string' ? '' : opt.smiles ? ` (SMILES: ${opt.smiles})` : '';
  return `${String.fromCharCode(65 + oIdx)}) ${text}${smiles}`;
}).join('\n')}

**Respuesta Correcta:** ${String.fromCharCode(65 + q.correctIndex)}  
**Explicación Razonada:** ${q.explanation}
`).join('\n---\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Examen_${selectedTopic.number.replace(/\s+/g, '_')}_${difficulty}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '900px', height: '90vh' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={22} color="var(--teal-ink)" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                Generador & Editor de Preguntas de Examen
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Diseña baterías tipo test con estructuras moleculares 2D y feedback razonado
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
        </div>

        {/* Tab Switcher */}
        <div style={{ padding: '0 1.75rem', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="tabs-container" style={{ margin: 0 }}>
            <button
              onClick={() => setActiveTab('ai')}
              className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            >
              <Sparkles size={14} /> Generación con IA & Aprendizaje Continuo
            </button>
            <button
              onClick={() => setActiveTab('fir')}
              className={`tab-btn ${activeTab === 'fir' ? 'active' : ''}`}
            >
              <Award size={14} /> Banco Oficial FIR (136 Preguntas)
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
            >
              <Edit3 size={14} /> Redacción Manual con Estructuras 2D
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* TAB 1: AI Generator */}
          {activeTab === 'ai' && (
            <>
              {/* Live Knowledge Ingestion Banner */}
              <div style={{
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(13, 148, 136, 0.08) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="#10b981" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      Algoritmo de Aprendizaje Continuo Vinculado al Tema
                    </span>
                    <span style={{ 
                      fontSize: '0.68rem', 
                      fontWeight: 700, 
                      padding: '2px 8px', 
                      borderRadius: '999px', 
                      background: 'rgba(16, 185, 129, 0.2)', 
                      color: '#047857',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      ACTIVO & SINCRONIZADO
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Dossier en vivo: cada material subido afina el examen
                  </span>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                  El generador ingiere automáticamente todos los fármacos, rutas y documentos que subas a este tema para formular preguntas de examen personalizadas:
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '2px' }}>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '5px', 
                    fontSize: '0.74rem', 
                    padding: '4px 9px', 
                    borderRadius: '6px', 
                    background: 'var(--surface)', 
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-title)',
                    fontWeight: 600
                  }}>
                    <Atom size={13} color="var(--teal)" />
                    {selectedTopic.drugs?.length || 0} fármacos con estructura SMILES
                  </span>

                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '5px', 
                    fontSize: '0.74rem', 
                    padding: '4px 9px', 
                    borderRadius: '6px', 
                    background: 'var(--surface)', 
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-title)',
                    fontWeight: 600
                  }}>
                    <Layers size={13} color="#8b5cf6" />
                    {selectedTopic.keyConcepts?.length || 0} conceptos clave
                  </span>

                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '5px', 
                    fontSize: '0.74rem', 
                    padding: '4px 9px', 
                    borderRadius: '6px', 
                    background: 'var(--surface)', 
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-title)',
                    fontWeight: 600
                  }}>
                    <FileText size={13} color="#f59e0b" />
                    {(selectedTopic.attachments?.length || 0) + topicFiles.length} documentos & diapositivas
                  </span>

                  {(selectedTopic.testQuestions?.length || 0) > 0 && (
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '5px', 
                      fontSize: '0.74rem', 
                      padding: '4px 9px', 
                      borderRadius: '6px', 
                      background: 'var(--surface)', 
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-title)',
                      fontWeight: 600
                    }}>
                      <Award size={13} color="#10b981" />
                      {selectedTopic.testQuestions?.length} preguntas previas en repositorio
                    </span>
                  )}
                </div>
              </div>
              {/* Controls Bar */}
              <div className="qfdos-card" style={{ padding: '1.25rem', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {/* Topic */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '3px' }}>
                      Unidad Temática:
                    </label>
                    <select
                      value={selectedTopicId}
                      onChange={e => setSelectedTopicId(e.target.value)}
                      className="form-select"
                    >
                      {topics.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.number}: {t.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of questions */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '3px' }}>
                      Número de Preguntas:
                    </label>
                    <select
                      value={questionCount}
                      onChange={e => setQuestionCount(parseInt(e.target.value))}
                      className="form-select"
                    >
                      <option value={2}>2 Preguntas</option>
                      <option value={3}>3 Preguntas</option>
                      <option value={5}>5 Preguntas</option>
                      <option value={8}>8 Preguntas</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '3px' }}>
                      Nivel de Dificultad:
                    </label>
                    <select
                      value={difficulty}
                      onChange={e => setDifficulty(e.target.value as any)}
                      className="form-select"
                    >
                      <option value="Fácil">Fácil (Conceptos básicos & definiciones)</option>
                      <option value="Medio">Medio (SAR & mecanismos estándar)</option>
                      <option value="Avanzado">Avanzado (Biofísica, enantiómeros & dianas)</option>
                    </select>
                  </div>

                  {/* Focus Area */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '3px' }}>
                      Enfoque Temático:
                    </label>
                    <select
                      value={focusArea}
                      onChange={e => setFocusArea(e.target.value as ExamFocusArea)}
                      className="form-select"
                      style={{ fontWeight: 600, borderColor: focusArea === 'sintesis_reactividad' ? 'var(--teal)' : undefined }}
                    >
                      <option value="sintesis_reactividad">🧪 Reactividad & Síntesis Química (Estructuras 2D)</option>
                      <option value="sar_farmacoforos">🎯 SAR & Farmacóforos (Estructura-Actividad)</option>
                      <option value="mecanismos_dianas">🧬 Dianas Moleculares & Mecanismo Farmacológico</option>
                      <option value="general">⚖️ General / Criterio Oficial FIR (Equilibrado)</option>
                    </select>
                  </div>
                </div>

                {focusArea === 'sintesis_reactividad' && (
                  <div style={{ padding: '8px 12px', background: 'rgba(13, 148, 136, 0.08)', borderRadius: '6px', borderLeft: '3px solid var(--teal)', fontSize: '0.78rem', color: 'var(--teal-ink)' }}>
                    💡 <strong>Modo Reactividad & Síntesis:</strong> Se generarán cuestiones sobre rutas de síntesis de fármacos, quimioselectividad, reactivos e intermedios con estructuras moleculares 2D (RDKit) tanto en el enunciado como en las opciones de respuesta.
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="btn btn-secondary btn-lg"
                  style={{ width: '100%', fontWeight: 700 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="anim-spin-slow" /> Diseñando Batería de Examen con Gemini...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} /> Generar Preguntas de Examen
                    </>
                  )}
                </button>
              </div>

              {/* Generated Questions List */}
              {generatedQuestions.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span className="qfdos-badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                      ✓ {generatedQuestions.length} Preguntas Generadas para {selectedTopic.number} (Nivel {difficulty})
                    </span>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={handleExportMarkdown} className="btn btn-sm btn-outline">
                        <Download size={13} /> Exportar Examen .md
                      </button>
                      <button onClick={handleAddToTopic} className="btn btn-sm btn-mint">
                        <PlusCircle size={13} /> {addedSuccess ? '¡Añadidas al Tema!' : 'Integrar en la Asignatura'}
                      </button>
                    </div>
                  </div>

                  {generatedQuestions.map((q, idx) => (
                    <div key={q.id || idx} className="qfdos-card" style={{ padding: '1.25rem', background: 'var(--surface-alt)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className="qfdos-badge badge-navy" style={{ fontSize: '0.7rem' }}>
                          Pregunta #{idx + 1}
                        </span>
                        <span className="qfdos-badge badge-amber" style={{ fontSize: '0.7rem' }}>
                          {q.difficulty}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '10px' }}>
                        {q.question}
                      </h4>

                      {/* Question SMILES Structure if present */}
                      {q.questionSmiles && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                          <Chem2DDrawer smiles={q.questionSmiles} width={240} height={100} />
                        </div>
                      )}

                      {/* Options */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                        {q.options.map((opt, oIdx) => {
                          const text = typeof opt === 'string' ? opt : opt.text;
                          const smiles = typeof opt === 'string' ? undefined : opt.smiles;
                          const isCorrect = oIdx === q.correctIndex;
                          return (
                            <div
                              key={oIdx}
                              style={{
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-sm)',
                                background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface)',
                                border: `1px solid ${isCorrect ? '#10b981' : 'var(--border-color)'}`,
                                fontSize: '0.84rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '8px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="font-mono" style={{ fontWeight: 700, color: isCorrect ? '#047857' : 'var(--text-muted)' }}>
                                  {String.fromCharCode(65 + oIdx)})
                                </span>
                                <span>{text}</span>
                              </div>
                              {smiles && <Chem2DDrawer smiles={smiles} width={100} height={45} />}
                              {isCorrect && <CheckCircle2 size={15} color="#10b981" style={{ marginLeft: 'auto' }} />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      <div style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(13, 148, 136, 0.08)',
                        borderLeft: '3px solid var(--teal)',
                        fontSize: '0.8rem',
                        color: 'var(--text-main)'
                      }}>
                        <strong style={{ color: 'var(--teal-ink)' }}>Fundamento Farmacológico:</strong> {q.explanation}
                      </div>
                    </div>
                  ))}

                </div>
              )}
            </>
          )}

          
          {/* TAB: Official FIR Questions Bank */}
          {activeTab === 'fir' && (() => {
            const availableFir = firTopicFilter === 'current'
              ? getFirQuestionsByTopic(selectedTopicId)
              : getAllFirQuestions();

            const handleToggleSelectFir = (id: string) => {
              setSelectedFirIds(prev => {
                const next = new Set(prev);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
              });
            };

            const handleSelectAllFir = () => {
              if (selectedFirIds.size === availableFir.length) {
                setSelectedFirIds(new Set());
              } else {
                setSelectedFirIds(new Set(availableFir.map(q => q.id)));
              }
            };

            const handleAddSelectedFir = () => {
              if (!onQuestionsAddedToTopic || selectedFirIds.size === 0) return;
              const toAdd = availableFir
                .filter(q => selectedFirIds.has(q.id))
                .map(convertFirToTestQuestion);
              onQuestionsAddedToTopic(selectedTopicId, toAdd);
              setSelectedFirIds(new Set());
              setAddedSuccess(true);
              setTimeout(() => setAddedSuccess(false), 3000);
            };

            return (
              <div className="qfdos-card" style={{ padding: '1.25rem', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                      Banco Oficial FIR · Química & Química Farmacéutica
                    </h4>
                    <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      136 preguntas oficiales del Ministerio de Sanidad (2020-2025) con estructuras moleculares y retroalimentación razonada
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <select
                      value={selectedTopicId}
                      onChange={e => setSelectedTopicId(e.target.value)}
                      className="form-select"
                      style={{ fontSize: '0.78rem', padding: '5px 10px', width: 'auto' }}
                    >
                      {topics.map(t => (
                        <option key={t.id} value={t.id}>{t.number}: {t.title}</option>
                      ))}
                    </select>

                    <select
                      value={firTopicFilter}
                      onChange={e => setFirTopicFilter(e.target.value)}
                      className="form-select"
                      style={{ fontSize: '0.78rem', padding: '5px 10px', width: 'auto' }}
                    >
                      <option value="current">Solo preguntas de este tema</option>
                      <option value="all">Todas las 136 preguntas FIR</option>
                    </select>
                  </div>
                </div>

                {/* Toolbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-alt)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                    <button
                      onClick={handleSelectAllFir}
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '0.75rem', padding: '3px 10px' }}
                    >
                      {selectedFirIds.size === availableFir.length && availableFir.length > 0 ? 'Deseleccionar todas' : 'Seleccionar todas'}
                    </button>
                    <span style={{ color: 'var(--text-muted)' }}>
                      <strong>{selectedFirIds.size}</strong> seleccionadas de <strong>{availableFir.length}</strong> disponibles
                    </span>
                  </div>

                  <button
                    onClick={handleAddSelectedFir}
                    disabled={selectedFirIds.size === 0}
                    className="btn btn-sm btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      opacity: selectedFirIds.size === 0 ? 0.5 : 1
                    }}
                  >
                    <PlusCircle size={14} />
                    <span>Añadir {selectedFirIds.size} preguntas al {selectedTopic.number}</span>
                  </button>
                </div>

                {addedSuccess && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#047857', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} /> Preguntas oficiales FIR agregadas correctamente al temario.
                  </div>
                )}

                {/* Questions List */}
                {availableFir.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No hay preguntas clasificadas específicamente para este tema.</p>
                    <button onClick={() => setFirTopicFilter('all')} className="btn btn-sm btn-outline">
                      Ver todas las 136 preguntas FIR
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '50vh', overflowY: 'auto' }}>
                    {availableFir.map(fir => {
                      const isSelected = selectedFirIds.has(fir.id);
                      return (
                        <div
                          key={fir.id}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '10px',
                            border: `1.5px solid ${isSelected ? 'var(--teal)' : 'var(--border-color)'}`,
                            background: isSelected ? 'var(--primary-bg)' : 'var(--surface)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleSelectFir(fir.id)}
                                style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--teal)' }}
                              />
                              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', background: 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)', color: '#fff' }}>
                                {fir.badge}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--surface-alt)', padding: '2px 6px', borderRadius: '4px' }}>
                                {fir.block}
                              </span>
                            </div>

                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                              {fir.qfdosTopicName}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)', lineHeight: 1.45, marginBottom: '8px' }}>
                            {fir.question}
                          </div>

                          {/* Visuals */}
                          {(fir.hasImage || fir.smiles) && (
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', margin: '8px 0', flexWrap: 'wrap' }}>
                              {fir.hasImage && fir.imagePath && (
                                <img
                                  src={`${baseUrl}${fir.imagePath}`}
                                  alt="Figura oficial"
                                  style={{ maxHeight: '110px', maxWidth: '240px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                                  onClick={() => setZoomedImage(`${baseUrl}${fir.imagePath}`)}
                                  title="Haz clic para ampliar"
                                />
                              )}
                              {fir.smiles && (
                                <Chem2DDrawer smiles={fir.smiles} width={180} height={90} />
                              )}
                            </div>
                          )}

                          {/* Options preview */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '6px', marginTop: '8px' }}>
                            {fir.options.map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                style={{
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.78rem',
                                  background: oIdx === fir.correctIndex ? 'rgba(16, 185, 129, 0.12)' : 'var(--surface-alt)',
                                  border: `1px solid ${oIdx === fir.correctIndex ? '#10b981' : 'transparent'}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                              >
                                <strong style={{ color: oIdx === fir.correctIndex ? '#047857' : 'var(--text-muted)', fontSize: '0.72rem' }}>
                                  {String.fromCharCode(65 + oIdx)})
                                </strong>
                                <span style={{ color: 'var(--text-title)' }}>{opt}</span>
                                {oIdx === fir.correctIndex && <Check size={12} color="#10b981" style={{ marginLeft: 'auto' }} />}
                              </div>
                            ))}
                          </div>

                          <div style={{ marginTop: '8px', fontSize: '0.74rem', color: 'var(--teal-ink)', borderLeft: '2px solid var(--teal)', paddingLeft: '8px' }}>
                            {fir.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {/* TAB 2: Manual Chemical Question Builder */}
          {activeTab === 'manual' && (
            <div className="qfdos-card" style={{ padding: '1.5rem', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                  Redactar Pregunta Tipo Test con Estructuras Químicas
                </h4>
                <select
                  value={selectedTopicId}
                  onChange={e => setSelectedTopicId(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto' }}
                >
                  {topics.map(t => (
                    <option key={t.id} value={t.id}>{t.number}: {t.title}</option>
                  ))}
                </select>
              </div>

              {/* Question Text */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '4px' }}>
                  Enunciado de la Pregunta:
                </label>
                <textarea
                  value={manualQuestion}
                  onChange={e => setManualQuestion(e.target.value)}
                  placeholder="Ej: ¿Cuál de las siguientes estructuras representa el profármaco éster etílico del enalaprilat?"
                  rows={2}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Question SMILES Structure */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '4px' }}>
                  Estructura SMILES en el Enunciado (Opcional o Esquema Reactivo &rarr; Producto):
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={manualQuestionSmiles}
                    onChange={e => setManualQuestionSmiles(e.target.value)}
                    placeholder="Ej: CC(=O)Oc1ccccc1C(=O)O o CC(C)(C)NCC(O)c1ccc(O)c(CO)c1"
                    className="form-input"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  />
                  {manualQuestionSmiles && (
                    <Chem2DDrawer smiles={manualQuestionSmiles} width={160} height={70} />
                  )}
                </div>
              </div>

              {/* 4 Options */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '8px' }}>
                  Opciones de Respuesta (Indica el texto, SMILES opcional y marca la correcta):
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {manualOptions.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '30px 1fr 1fr 80px',
                        gap: '8px',
                        alignItems: 'center',
                        padding: '8px 10px',
                        background: manualCorrectIndex === oIdx ? 'rgba(16, 185, 129, 0.08)' : 'var(--surface-alt)',
                        borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${manualCorrectIndex === oIdx ? '#10b981' : 'var(--border-color)'}`
                      }}
                    >
                      <span className="font-mono" style={{ fontWeight: 800, color: 'var(--navy-ink)' }}>
                        {String.fromCharCode(65 + oIdx)})
                      </span>
                      <input
                        type="text"
                        placeholder={`Texto opción ${String.fromCharCode(65 + oIdx)}`}
                        value={opt.text}
                        onChange={e => {
                          const newOpts = [...manualOptions];
                          newOpts[oIdx].text = e.target.value;
                          setManualOptions(newOpts);
                        }}
                        className="form-input"
                        style={{ fontSize: '0.82rem' }}
                      />
                      <input
                        type="text"
                        placeholder="SMILES opcional"
                        value={opt.smiles || ''}
                        onChange={e => {
                          const newOpts = [...manualOptions];
                          newOpts[oIdx].smiles = e.target.value;
                          setManualOptions(newOpts);
                        }}
                        className="form-input"
                        style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                      />
                      <button
                        type="button"
                        onClick={() => setManualCorrectIndex(oIdx)}
                        className={`btn btn-sm ${manualCorrectIndex === oIdx ? 'btn-mint' : 'btn-outline'}`}
                        style={{ fontSize: '0.72rem' }}
                      >
                        {manualCorrectIndex === oIdx ? 'Correcta ✓' : 'Marcar'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '4px' }}>
                  Explicación / Fundamento Pedagógico:
                </label>
                <textarea
                  value={manualExplanation}
                  onChange={e => setManualExplanation(e.target.value)}
                  placeholder="Explica la justificación química, el mecanismo de acción o el SAR que fundamenta la respuesta correcta."
                  rows={2}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Save Button */}
              <button
                type="button"
                onClick={handleAddManualQuestion}
                disabled={!manualQuestion.trim()}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', fontWeight: 700 }}
              >
                <PlusCircle size={18} /> {addedSuccess ? '¡Pregunta Guardada en la Asignatura!' : 'Guardar Pregunta en el Módulo'}
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">
            Cerrar Generador
          </button>
        </div>

      </div>
    </div>
  );
};
