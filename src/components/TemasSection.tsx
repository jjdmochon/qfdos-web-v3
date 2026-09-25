import React, { useState } from 'react';
import { QfdosTopic } from '../data/qfdosData';
import { Chem2DDrawer } from './Chem2DDrawer';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Radio, 
  CheckCircle2, 
  Search, 
  ArrowRight,
  Sparkles,
  Lock,
  Award,
  FileText,
  Calendar,
  Filter,
  ExternalLink,
  GitBranch
} from 'lucide-react';

interface TemasSectionProps {
  topics: QfdosTopic[];
  onSelectTopic: (topic: QfdosTopic, tab?: 'sar' | 'materials' | 'drugs' | 'retrosintesis' | 'cartas') => void;
  onOpenQuiz: (topic: QfdosTopic) => void;
  onOpenFlashcards: (topic: QfdosTopic) => void;
  onOpenCartas?: () => void;
}

export const TemasSection: React.FC<TemasSectionProps> = ({
  topics,
  onSelectTopic,
  onOpenQuiz,
  onOpenFlashcards,
  onOpenCartas
}) => {
  const { isProfesor } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'teoria' | 'examen' | 'trabajo' | 'seminario'>('all');

  const filteredTopics = topics.filter(t => {
    const matchesCategory = 
      selectedCategory === 'all' ? true :
      selectedCategory === 'teoria' ? (!t.category || t.category === 'teoria') :
      t.category === selectedCategory;

    const matchesSearch = 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.keyConcepts.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
      t.drugs.some(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const theoryCount = topics.filter(t => !t.category || t.category === 'teoria').length;
  const examCount = topics.filter(t => t.category === 'examen').length;
  const projectCount = topics.filter(t => t.category === 'trabajo').length;

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      
      {/* Header & Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <BookOpen size={22} color="var(--navy-ink)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-title)' }}>
              Temario Oficial, Exámenes y Trabajos QFDOS
            </h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Módulos teóricos ({theoryCount}), Convocatorias de examen ({examCount}) y Proyectos ({projectCount}) · Curso 2026/2027 · UGR
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '260px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Buscar por tema, fármaco, diana..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ marginBottom: '1.75rem', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
          <Filter size={14} /> Filtrar por:
        </span>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
        >
          Todos los Módulos ({topics.length})
        </button>
        <button
          onClick={() => setSelectedCategory('teoria')}
          className={`tab-btn ${selectedCategory === 'teoria' ? 'active' : ''}`}
          style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
        >
          🔬 Teoría (Temas 00-10) ({theoryCount})
        </button>
        <button
          onClick={() => setSelectedCategory('examen')}
          className={`tab-btn ${selectedCategory === 'examen' ? 'active' : ''}`}
          style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
        >
          📝 Exámenes Oficiales ({examCount})
        </button>
        <button
          onClick={() => setSelectedCategory('trabajo')}
          className={`tab-btn ${selectedCategory === 'trabajo' ? 'active' : ''}`}
          style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
        >
          💼 Trabajos & Proyectos ({projectCount})
        </button>
      </div>

      {/* Topics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {filteredTopics.map((topic, idx) => {
          const isExam = topic.category === 'examen';
          const isProject = topic.category === 'trabajo';
          const accentClass = isExam ? 'card-amber' : isProject ? 'card-emerald' : idx % 3 === 0 ? 'card-navy' : idx % 3 === 1 ? 'card-teal' : 'card-mint';

          // Un tema sin publicar se muestra, para que se vea que existe y esta
          // por venir, pero sin acceso: el profesorado si entra, para prepararlo.
          const esProximamente = topic.status === 'Próximamente';
          const bloqueado = esProximamente && !isProfesor;

          return (
            <div
              key={topic.id}
              className={`qfdos-card ${accentClass} ${bloqueado ? 'tema-proximamente' : ''}`}
              style={{ justifyContent: 'space-between' }}
              aria-disabled={bloqueado || undefined}
            >
              <div>
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {topic.id !== 'tema-00' && topic.number && (
                      <span className={`qfdos-badge ${isExam ? 'badge-amber' : isProject ? 'badge-emerald' : 'badge-navy'}`} style={{ fontSize: '0.72rem' }}>
                        {topic.number}
                      </span>
                    )}
                    {topic.category && topic.category !== 'teoria' && (
                      <span className="qfdos-badge badge-teal" style={{ fontSize: '0.65rem' }}>
                        {topic.category.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {topic.pdbTargetId && (
                      <a
                        href={`https://www.rcsb.org/structure/${topic.pdbTargetId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="qfdos-badge badge-teal"
                        style={{
                          fontSize: '0.68rem',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          cursor: 'pointer'
                        }}
                        title={`Ver estructura PDB ${topic.pdbTargetId} en RCSB PDB`}
                      >
                        PDB: {topic.pdbTargetId}
                        <ExternalLink size={9} />
                      </a>
                    )}
                    <span
                      className={`qfdos-badge ${esProximamente ? 'badge-muted' : 'badge-emerald'}`}
                      style={{ fontSize: '0.68rem' }}
                    >
                      {esProximamente && <Lock size={10} style={{ marginRight: 3 }} />}
                      {topic.status}
                    </span>
                  </div>
                </div>

                {/* Title and Subtitle */}
                <h3 
                  onClick={() => { if (!bloqueado) onSelectTopic(topic); }}
                  style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', cursor: bloqueado ? 'default' : 'pointer', marginBottom: '4px' }}
                >
                  {topic.title}
                </h3>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--teal-ink)', marginBottom: '8px' }}>
                  {topic.subtitle}
                </h4>

                {/* Due Date Indicator if Exam or Project */}
                {topic.dueDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: isExam ? 'var(--amber)' : 'var(--emerald)', fontWeight: 700, marginBottom: '8px' }}>
                    <Calendar size={13} />
                    <span>Fecha Oficial: {topic.dueDate}</span>
                    {topic.weightPercentage && (
                      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({topic.weightPercentage}%)</span>
                    )}
                  </div>
                )}

                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '12px' }}>
                  {topic.description.length > 140 ? `${topic.description.slice(0, 140)}...` : topic.description}
                </p>

                {/* 4 Materials Quick Indicators */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.66rem', padding: '2px 6px', borderRadius: '4px', background: topic.slidesPdfUrl ? 'rgba(30,58,138,0.1)' : 'var(--surface-alt)', color: topic.slidesPdfUrl ? 'var(--navy)' : 'var(--text-muted)' }}>
                    📑 Diapositivas {topic.slidesPdfUrl ? '✓' : ''}
                  </span>
                  <span style={{ fontSize: '0.66rem', padding: '2px 6px', borderRadius: '4px', background: topic.notesPdfUrl ? 'rgba(13,148,136,0.1)' : 'var(--surface-alt)', color: topic.notesPdfUrl ? 'var(--teal)' : 'var(--text-muted)' }}>
                    📝 Apuntes {topic.notesPdfUrl ? '✓' : ''}
                  </span>
                  <span style={{ fontSize: '0.66rem', padding: '2px 6px', borderRadius: '4px', background: topic.geminiNotebookUrl ? 'rgba(45,212,191,0.15)' : 'var(--surface-alt)', color: topic.geminiNotebookUrl ? 'var(--teal)' : 'var(--text-muted)' }}>
                    📓 Notebook {topic.geminiNotebookUrl ? '✓' : ''}
                  </span>
                  <span style={{ fontSize: '0.66rem', padding: '2px 6px', borderRadius: '4px', background: topic.spotifyPodcastUrl ? 'rgba(29,185,84,0.15)' : 'var(--surface-alt)', color: topic.spotifyPodcastUrl ? '#1db954' : 'var(--text-muted)' }}>
                    🎙️ Video Podcast {topic.spotifyPodcastUrl ? '✓' : ''}
                  </span>
                  {topic.id === 'tema-01' && (
                    <>
                      <span 
                        style={{ 
                          fontSize: '0.66rem', 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          background: 'linear-gradient(135deg, rgba(13,148,136,0.2) 0%, rgba(30,58,138,0.15) 100%)', 
                          color: 'var(--teal-ink)', 
                          border: '1px solid var(--teal)',
                          fontWeight: 800 
                        }}
                      >
                        🧬 Taller Retrosíntesis ✓
                      </span>
                      <span 
                        style={{ 
                          fontSize: '0.66rem', 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          background: 'linear-gradient(135deg, rgba(45,212,191,0.2) 0%, rgba(13,148,136,0.15) 100%)', 
                          color: 'var(--teal-ink)', 
                          border: '1px solid var(--teal)',
                          fontWeight: 800 
                        }}
                      >
                        🧊 Modelo 3D (nAChR) ✓
                      </span>
                      {isProfesor && (
                        <span 
                          style={{ 
                            fontSize: '0.66rem', 
                            padding: '2px 8px', 
                            borderRadius: '4px', 
                            background: 'linear-gradient(135deg, rgba(30,58,138,0.15) 0%, rgba(45,212,191,0.2) 100%)', 
                            color: 'var(--primary, #1e3a8a)', 
                            border: '1px solid rgba(45,212,191,0.5)',
                            fontWeight: 800 
                          }}
                        >
                          🎴 Baraja Docente (15) ✓
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Key Concepts Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                  {topic.keyConcepts.slice(0, 3).map((concept, cIdx) => (
                    <span
                      key={cIdx}
                      style={{
                        fontSize: '0.68rem',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--surface-alt)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      • {concept}
                    </span>
                  ))}
                </div>

                {/* 2D Structure of First Drug */}
                {topic.drugs && topic.drugs.length > 0 && (
                  <div style={{ margin: '8px 0 12px', display: 'flex', justifyContent: 'center' }}>
                    <Chem2DDrawer smiles={topic.drugs[0].smiles} name={topic.drugs[0].name} width={260} height={110} />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-color)', marginTop: 'auto', width: '100%' }}>
                {/* Fila 1: Materiales y Taller de Retrosíntesis */}
                <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                  <button
                    onClick={() => onSelectTopic(topic, 'sar')}
                    disabled={bloqueado}
                    title={bloqueado ? 'Este tema aún no está publicado' : undefined}
                    className="btn btn-sm btn-primary"
                    style={{ 
                      flex: 1, 
                      minWidth: 0,
                      fontSize: '0.76rem', 
                      padding: '7px 8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {bloqueado ? <><Lock size={12} /> No disponible</> : <>Guía & Materiales <ArrowRight size={12} /></>}
                  </button>

                  {topic.id === 'tema-01' && (
                    <button
                      onClick={() => onSelectTopic(topic, 'retrosintesis')}
                      className="btn btn-sm"
                      style={{ 
                        flex: 1, 
                        minWidth: 0,
                        fontSize: '0.76rem', 
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-ink) 100%)',
                        color: '#ffffff',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(13,148,136,0.25)',
                        padding: '7px 8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap'
                      }}
                      title="Acceso directo al Taller de Retrosíntesis (Slides 28-35)"
                    >
                      <GitBranch size={13} /> Retrosíntesis
                    </button>
                  )}
                </div>

                {/* Fila 2: Herramientas de Estudio (Test y Flashcards) */}
                {topic.id !== 'tema-00' && !bloqueado && ((topic.testQuestions && topic.testQuestions.length > 0) || (topic.flashcards && topic.flashcards.length > 0)) && (
                  <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                    {topic.testQuestions && topic.testQuestions.length > 0 && (
                      <button
                        onClick={() => onOpenQuiz(topic)}
                        disabled={bloqueado}
                        className="btn btn-sm btn-secondary"
                        style={{ 
                          flex: 1, 
                          minWidth: 0,
                          fontSize: '0.74rem', 
                          padding: '6px 8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          whiteSpace: 'nowrap'
                        }}
                        title="Realizar autoevaluación tipo test"
                      >
                        <HelpCircle size={13} /> {topic.id === 'tema-01' ? 'Test (MODELOS)' : `Test (${topic.testQuestions ? topic.testQuestions.length : 0})`}
                      </button>
                    )}

                    {topic.flashcards && topic.flashcards.length > 0 && (
                      <button
                        onClick={() => onOpenFlashcards(topic)}
                        disabled={bloqueado}
                        className="btn btn-sm btn-mint"
                        style={{ 
                          flex: 1, 
                          minWidth: 0,
                          fontSize: '0.74rem', 
                          padding: '6px 8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          whiteSpace: 'nowrap'
                        }}
                        title="Repasar flashcards de memoria activa"
                      >
                        <Award size={13} /> Flashcards ({topic.flashcards.length})
                      </button>
                    )}
                  </div>
                )}

                {/* Fila 3: Baraja Docente Exclusiva (Tema 01) */}
                {topic.id === 'tema-01' && isProfesor && onOpenCartas && (
                  <div style={{ display: 'flex', gap: '6px', width: '100%', marginTop: '2px' }}>
                    <button
                      onClick={onOpenCartas}
                      className="btn btn-sm"
                      style={{ 
                        flex: 1, 
                        minWidth: 0,
                        fontSize: '0.74rem', 
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(13, 148, 136, 0.12) 100%)',
                        color: 'var(--navy-ink)',
                        border: '1.5px solid rgba(45, 212, 191, 0.45)',
                        boxShadow: '0 2px 6px rgba(30, 58, 138, 0.08)',
                        padding: '6px 8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap'
                      }}
                      title="Baraja Coleccionable de Fármacos Colinérgicos · 15 cartas (Exclusivo Docente)"
                    >
                      <Layers size={13} color="var(--teal)" /> Cartas Fármacos
                      <span className="qfdos-badge badge-mint" style={{ fontSize: '0.58rem', padding: '1px 5px', fontWeight: 800 }}>
                        Docente (15)
                      </span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
