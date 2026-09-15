import React, { useState, useEffect } from 'react';
import { QfdosTopic, CourseAttachment, MoleculeDrug } from '../data/qfdosData';
import { Chem2DDrawer } from './Chem2DDrawer';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  BookOpen, 
  Layers, 
  Radio, 
  HelpCircle, 
  Award, 
  FileText, 
  ExternalLink, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  AlertCircle,
  Play,
  Share2,
  Atom,
  Lock,
  Globe,
  Database,
  Activity,
  Upload,
  Settings
} from 'lucide-react';

interface TopicDetailModalProps {
  topic: QfdosTopic;
  onClose: () => void;
  onOpenQuiz: (topic: QfdosTopic) => void;
  onOpenFlashcards: (topic: QfdosTopic) => void;
  onOpenSpotifyPlayer: (att: CourseAttachment) => void;
  onOpenAdmet?: (drug: MoleculeDrug) => void;
  onUpdateTopic?: (updatedTopic: QfdosTopic) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onOpenQuiz,
  onOpenFlashcards,
  onOpenSpotifyPlayer,
  onOpenAdmet,
  onUpdateTopic
}) => {
  const [activeTab, setActiveTab] = useState<'sar' | 'materials' | 'drugs'>('sar');
  const { isProfesor } = useAuth();

  const [isEditingDriveLinks, setIsEditingDriveLinks] = useState(false);
  const [editSlidesUrl, setEditSlidesUrl] = useState(topic.slidesPdfUrl || '');
  const [editNotesUrl, setEditNotesUrl] = useState(topic.notesPdfUrl || '');
  const [editNotebookUrl, setEditNotebookUrl] = useState(topic.geminiNotebookUrl || '');

  useEffect(() => {
    setEditSlidesUrl(topic.slidesPdfUrl || '');
    setEditNotesUrl(topic.notesPdfUrl || '');
    setEditNotebookUrl(topic.geminiNotebookUrl || '');
    setIsEditingDriveLinks(false);
  }, [topic]);

  const handleSaveDriveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateTopic) return;
    const updated: QfdosTopic = {
      ...topic,
      slidesPdfUrl: editSlidesUrl.trim() || undefined,
      notesPdfUrl: editNotesUrl.trim() || undefined,
      geminiNotebookUrl: editNotebookUrl.trim() || undefined
    };
    onUpdateTopic(updated);
    setIsEditingDriveLinks(false);
  };

  // Última barrera: aquí convergen el temario, el panel de inicio y la búsqueda
  // global, así que basta con comprobarlo una vez en este punto.
  const bloqueado =
    topic.status === 'Próximamente' && !isProfesor;

  if (bloqueado) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-container"
          style={{ maxWidth: '520px' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-body" style={{ padding: '2rem 1.9rem', textAlign: 'center' }}>
            <div className="proximamente-icono">
              <Lock size={26} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: 8 }}>
              {topic.number} · {topic.title}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6, maxWidth: '46ch', margin: '0 auto 1.25rem' }}>
              Este tema todavía no está publicado. Cuando el profesorado suba los
              materiales aparecerá aquí completo, con sus apuntes, diapositivas,
              podcast y autoevaluación.
            </p>
            <button onClick={onClose} className="btn btn-primary">
              Volver al temario
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePlayPodcast = () => {
    if (topic.spotifyPodcastUrl) {
      onOpenSpotifyPlayer({
        id: `sp_${topic.id}`,
        title: `Podcast Oficial: ${topic.number} — ${topic.title}`,
        type: 'spotify',
        url: topic.spotifyPodcastUrl,
        date: 'Curso 2026/2027',
        isPodcastVideo: true
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '1020px', height: '90vh' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header" style={{ padding: '1.25rem 1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {topic.id !== 'tema-00' && topic.number && (
              <span className={`qfdos-badge ${topic.category === 'examen' ? 'badge-amber' : topic.category === 'trabajo' ? 'badge-emerald' : 'badge-navy'}`} style={{ fontSize: '0.85rem', padding: '4px 10px' }}>
                {topic.number}
              </span>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: 1.2, margin: 0 }}>
                  {topic.title}
                </h2>
                {topic.category && topic.category !== 'teoria' && (
                  <span className="qfdos-badge badge-teal" style={{ fontSize: '0.7rem' }}>
                    {topic.category.toUpperCase()}
                  </span>
                )}
                {topic.pdbTargetId && (
                  <a
                    href={`https://www.rcsb.org/structure/${topic.pdbTargetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qfdos-badge badge-teal"
                    style={{ fontSize: '0.7rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}
                    title={`Ver estructura ${topic.pdbTargetId} en RCSB PDB`}
                  >
                    PDB: {topic.pdbTargetId}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--teal-ink)', fontWeight: 600 }}>
                {topic.subtitle}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-outline" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ padding: '0 1.75rem', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="tabs-container" style={{ margin: 0 }}>
            <button
              onClick={() => setActiveTab('sar')}
              className={`tab-btn ${activeTab === 'sar' ? 'active' : ''}`}
            >
              <BookOpen size={14} /> Contenido & Guía Docente
            </button>
            {topic.drugs && topic.drugs.length > 0 && (
              <button
                onClick={() => setActiveTab('drugs')}
                className={`tab-btn ${activeTab === 'drugs' ? 'active' : ''}`}
              >
                <Layers size={14} /> Fármacos & Quimioinformática ({topic.drugs.length})
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '1.5rem 1.75rem' }}>
          
          {/* TAB 1: Contenido & Guía Docente */}
          {activeTab === 'sar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Description */}
              <div className="qfdos-card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                  {topic.id === 'tema-00'
                    ? 'Presentación del Curso Química Farmacéutica 2 del Grado de Farmacia. Grupo E. Prof. Mochon'
                    : 'Fundamento Teórico & Farmacología Molecular'}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                  {topic.description}
                </p>
                   {/* PRIMARY RESOURCES SHOWCASE */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="var(--teal-ink)" /> Suite Completa de Recursos para el Alumno
                  </h4>
                  {isProfesor && onUpdateTopic && (
                    <button
                      onClick={() => setIsEditingDriveLinks(prev => !prev)}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.78rem', padding: '5px 12px', gap: '6px', fontWeight: 700 }}
                    >
                      <Settings size={14} /> {isEditingDriveLinks ? 'Cerrar editor' : 'Añadir / Editar enlaces de Drive'}
                    </button>
                  )}
                </div>

                {/* Inline Drive links editor for docent */}
                {isEditingDriveLinks && (
                  <form onSubmit={handleSaveDriveLinks} className="qfdos-card" style={{ padding: '1.25rem', marginBottom: '1rem', border: '2px solid var(--teal)', background: 'var(--surface-raised)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--teal-ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Upload size={15} /> Configurar Enlaces Oficiales (Google Drive / Web)
                      </strong>
                      <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem' }}>Modo Docente</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)', display: 'block', marginBottom: '4px' }}>
                          📄 Enlace Google Drive · Apuntes Oficiales (PDF)
                        </label>
                        <input
                          type="text"
                          value={editNotesUrl}
                          onChange={e => setEditNotesUrl(e.target.value)}
                          placeholder="https://drive.google.com/file/d/.../view"
                          className="form-input"
                          style={{ width: '100%', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)', display: 'block', marginBottom: '4px' }}>
                          📑 Enlace Google Drive · Diapositivas (PDF)
                        </label>
                        <input
                          type="text"
                          value={editSlidesUrl}
                          onChange={e => setEditSlidesUrl(e.target.value)}
                          placeholder="https://drive.google.com/file/d/.../view"
                          className="form-input"
                          style={{ width: '100%', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)', display: 'block', marginBottom: '4px' }}>
                          📓 Enlace Google NotebookLM
                        </label>
                        <input
                          type="text"
                          value={editNotebookUrl}
                          onChange={e => setEditNotebookUrl(e.target.value)}
                          placeholder="https://notebook.google.com/notebook/..."
                          className="form-input"
                          style={{ width: '100%', fontSize: '0.8rem' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={() => setIsEditingDriveLinks(false)}
                        className="btn btn-sm btn-outline"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        style={{ fontWeight: 700 }}
                      >
                        Guardar Enlaces
                      </button>
                    </div>
                  </form>
                )}

                {(() => {
                  const hasNotes = !!(topic.notesPdfUrl && topic.notesPdfUrl.startsWith('http'));
                  const hasSlides = !!(topic.slidesPdfUrl && topic.slidesPdfUrl.startsWith('http'));
                  const hasNotebook = !!(topic.geminiNotebookUrl && topic.geminiNotebookUrl.startsWith('http'));
                  const hasSpotify = !!(topic.spotifyPodcastUrl && topic.spotifyPodcastUrl.startsWith('http'));

                  return (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                      
                      {/* 1. Apuntes PDF */}
                      <div className={`qfdos-card card-teal resource-card ${hasNotes ? 'is-active' : 'is-inactive'}`}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                background: hasNotes ? 'rgba(13, 148, 136, 0.14)' : 'var(--surface-alt)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <FileText size={17} color={hasNotes ? 'var(--teal-ink)' : 'var(--text-muted)'} />
                              </div>
                              <strong style={{ fontSize: '0.88rem', color: hasNotes ? 'var(--text-title)' : 'var(--text-muted)' }}>
                                1. Apuntes Oficiales (PDF)
                              </strong>
                            </div>
                            {hasNotes && (
                              <span className="qfdos-badge badge-teal" style={{ fontSize: '0.66rem', fontWeight: 700, padding: '2px 8px' }}>
                                ✓ Disponible
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.78rem', color: hasNotes ? 'var(--text-main)' : 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>
                            {topic.notesPdfName || 'Apuntes magistrales estructurados con notas para examen.'}
                          </p>
                        </div>
                        {hasNotes ? (
                          <a 
                            href={topic.notesPdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-sm btn-secondary" 
                            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700 }}
                          >
                            <ExternalLink size={13} /> {topic.notesPdfUrl!.includes('drive.google.com') ? 'Abrir en Google Drive' : 'Descargar Apuntes'}
                          </a>
                        ) : (
                          <span className="qfdos-badge badge-neutral" style={{ width: '100%', justifyContent: 'center', fontSize: '0.74rem', padding: '6px' }}>
                            Próximamente disponible
                          </span>
                        )}
                      </div>

                      {/* 2. Diapositivas PDF */}
                      <div className={`qfdos-card card-navy resource-card ${hasSlides ? 'is-active' : 'is-inactive'}`}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                background: hasSlides ? 'rgba(30, 58, 138, 0.12)' : 'var(--surface-alt)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <FileText size={17} color={hasSlides ? 'var(--navy-ink)' : 'var(--text-muted)'} />
                              </div>
                              <strong style={{ fontSize: '0.88rem', color: hasSlides ? 'var(--text-title)' : 'var(--text-muted)' }}>
                                2. Diapositivas (PDF)
                              </strong>
                            </div>
                            {hasSlides && (
                              <span className="qfdos-badge badge-navy" style={{ fontSize: '0.66rem', fontWeight: 700, padding: '2px 8px' }}>
                                ✓ Disponible
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.78rem', color: hasSlides ? 'var(--text-main)' : 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>
                            {topic.slidesPdfName || (topic.slideCount ? `Presentación oficial con esquemas SAR (${topic.slideCount} diapositivas).` : 'Presentación oficial de diapositivas.')}
                          </p>
                        </div>
                        {hasSlides ? (
                          <a 
                            href={topic.slidesPdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-sm btn-primary" 
                            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700 }}
                          >
                            <ExternalLink size={13} /> {topic.slidesPdfUrl!.includes('drive.google.com') ? 'Ver en Google Drive' : 'Ver Diapositivas'}
                          </a>
                        ) : (
                          <span className="qfdos-badge badge-neutral" style={{ width: '100%', justifyContent: 'center', fontSize: '0.74rem', padding: '6px' }}>
                            Próximamente disponible
                          </span>
                        )}
                      </div>

                      {/* 3. Gemini Notebook */}
                      <div className={`qfdos-card card-mint resource-card ${hasNotebook ? 'is-active' : 'is-inactive'}`}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                background: hasNotebook ? 'rgba(45, 212, 191, 0.22)' : 'var(--surface-alt)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <Sparkles size={17} color={hasNotebook ? 'var(--teal-ink)' : 'var(--text-muted)'} />
                              </div>
                              <strong style={{ fontSize: '0.88rem', color: hasNotebook ? 'var(--text-title)' : 'var(--text-muted)' }}>
                                3. Gemini NotebookLM
                              </strong>
                            </div>
                            {hasNotebook && (
                              <span className="qfdos-badge badge-mint" style={{ fontSize: '0.66rem', fontWeight: 700, padding: '2px 8px' }}>
                                ✨ IA Activa
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.78rem', color: hasNotebook ? 'var(--text-main)' : 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>
                            Cuaderno interactivo de estudio para consultar dudas con IA.
                          </p>
                        </div>
                        {hasNotebook ? (
                          <a 
                            href={topic.geminiNotebookUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-sm btn-secondary" 
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-ink) 100%)',
                              color: '#ffffff',
                              border: 'none',
                              boxShadow: '0 2px 8px rgba(13, 148, 136, 0.25)'
                            }}
                          >
                            <ExternalLink size={13} /> Abrir NotebookLM
                          </a>
                        ) : (
                          <span className="qfdos-badge badge-neutral" style={{ width: '100%', justifyContent: 'center', fontSize: '0.74rem', padding: '6px' }}>
                            Próximamente disponible
                          </span>
                        )}
                      </div>

                      {/* 4. Spotify Podcast (Omitido en Presentación del Curso) */}
                      {topic.id !== 'tema-00' && (
                        <div className={`qfdos-card card-spotify resource-card ${hasSpotify ? 'is-active' : 'is-inactive'}`}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  background: hasSpotify ? 'rgba(29, 185, 84, 0.14)' : 'var(--surface-alt)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  <Radio size={17} color={hasSpotify ? '#1db954' : 'var(--text-muted)'} />
                                </div>
                                <strong style={{ fontSize: '0.88rem', color: hasSpotify ? 'var(--text-title)' : 'var(--text-muted)' }}>
                                  4. Podcast en Spotify
                                </strong>
                              </div>
                              {hasSpotify && (
                                <span className="qfdos-badge" style={{ background: 'rgba(29,185,84,0.15)', color: '#1db954', fontSize: '0.66rem', fontWeight: 700, padding: '2px 8px' }}>
                                  🎙️ Audio
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '0.78rem', color: hasSpotify ? 'var(--text-main)' : 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>
                              Episodio de audio/vídeo oficial con explicaciones del profesor.
                            </p>
                          </div>
                          {hasSpotify ? (
                            <button 
                              onClick={handlePlayPodcast}
                              className="btn btn-sm" 
                              style={{
                                width: '100%',
                                justifyContent: 'center',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                background: '#1db954',
                                color: '#ffffff',
                                border: 'none',
                                boxShadow: '0 2px 8px rgba(29, 185, 84, 0.25)'
                              }}
                            >
                              <Play size={13} /> Reproducir Episodio
                            </button>
                          ) : (
                            <span className="qfdos-badge badge-neutral" style={{ width: '100%', justifyContent: 'center', fontSize: '0.74rem', padding: '6px' }}>
                              Próximamente disponible
                            </span>
                          )}
                        </div>
                      )}

                      {/* 5. Cuestionario Test con Moléculas */}
                      {topic.id !== 'tema-00' && topic.testQuestions && topic.testQuestions.length > 0 && (
                        <div className="qfdos-card card-amber resource-card is-active">
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  background: 'rgba(245, 158, 11, 0.14)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  <HelpCircle size={17} color="var(--accent-amber)" />
                                </div>
                                <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)' }}>5. Test de Autoevaluación</strong>
                              </div>
                              <span className="qfdos-badge badge-amber" style={{ fontSize: '0.66rem', fontWeight: 700, padding: '2px 8px' }}>
                                Interactivo
                              </span>
                            </div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>
                              {topic.testQuestions.length} preguntas con estructuras químicas y corrección razonada.
                            </p>
                          </div>
                          <button 
                            onClick={() => onOpenQuiz(topic)}
                            className="btn btn-sm btn-primary" 
                            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700 }}
                          >
                            <HelpCircle size={13} /> Realizar Test
                          </button>
                        </div>
                      )}

                      {/* 6. Flashcards Interactivas */}
                      {topic.id !== 'tema-00' && topic.flashcards && topic.flashcards.length > 0 && (
                        <div className="qfdos-card card-teal resource-card is-active">
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  background: 'rgba(13, 148, 136, 0.14)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  <Award size={17} color="var(--teal-ink)" />
                                </div>
                                <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)' }}>6. Flashcards Interactivas</strong>
                              </div>
                              <span className="qfdos-badge badge-teal" style={{ fontSize: '0.66rem', fontWeight: 700, padding: '2px 8px' }}>
                                Memoria SAR
                              </span>
                            </div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>
                              {topic.flashcards.length} tarjetas de memorización con estructuras 2D.
                            </p>
                          </div>
                          <button 
                            onClick={() => onOpenFlashcards(topic)}
                            className="btn btn-sm btn-secondary" 
                            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700 }}
                          >
                            <Award size={13} /> Repasar Flashcards
                          </button>
                        </div>
                      )}

                    </div>
                  );
                })()}
              </div>
              </div>

              {/* Key Concepts List */}
              <div className="qfdos-card" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '10px' }}>
                  Conceptos Clave de la Unidad:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                  {topic.keyConcepts?.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem' }}>
                      <CheckCircle2 size={15} color="var(--teal-ink)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'var(--text-main)' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Fármacos Prototipo & SAR */}
          {activeTab === 'drugs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                {topic.drugs?.map((drug, i) => (
                  <div key={i} className="qfdos-card card-teal" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                          {drug.name}
                        </h4>
                        <span style={{ fontSize: '0.78rem', color: 'var(--teal-ink)', fontWeight: 600 }}>
                          {drug.role}
                        </span>
                      </div>
                      {drug.pdbId && (
                        <span className="qfdos-badge badge-mint" style={{ fontSize: '0.68rem' }}>
                          PDB: {drug.pdbId}
                        </span>
                      )}
                    </div>

                    {/* 2D Molecular Drawer */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                      <Chem2DDrawer smiles={drug.smiles} name={drug.name} width={260} height={130} />
                    </div>

                    {/* SMILES code */}
                    <div style={{
                      background: 'var(--surface-alt)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--navy-ink)',
                      wordBreak: 'break-all',
                      marginBottom: '10px'
                    }}>
                      SMILES: {drug.smiles}
                    </div>

                    {/* Molecular Properties (Lipinski / Veber) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', fontSize: '0.74rem', marginBottom: '10px' }}>
                      <div style={{ background: 'var(--surface-alt)', padding: '4px 6px', borderRadius: '4px', textAlign: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>PM (Da)</span>
                        <strong>{drug.mw || 'N/A'}</strong>
                      </div>
                      <div style={{ background: 'var(--surface-alt)', padding: '4px 6px', borderRadius: '4px', textAlign: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>LogP</span>
                        <strong>{drug.logP || 'N/A'}</strong>
                      </div>
                      <div style={{ background: 'var(--surface-alt)', padding: '4px 6px', borderRadius: '4px', textAlign: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>TPSA (Å²)</span>
                        <strong>{drug.tpsa || 'N/A'}</strong>
                      </div>
                    </div>

                    {/* External DB Links: PubChem, DrugBank & ADMET */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        <button
                          onClick={() => window.open(`https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(drug.name)}`, '_blank', 'noopener,noreferrer')}
                          className="btn btn-sm"
                          style={{
                            background: 'rgba(30, 58, 138, 0.08)',
                            color: 'var(--navy-ink)',
                            border: '1px solid rgba(30, 58, 138, 0.2)',
                            fontSize: '0.74rem',
                            padding: '4px 6px',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                          title={`Buscar ${drug.name} en PubChem`}
                        >
                          <Globe size={12} />
                          <span>PubChem</span>
                          <ExternalLink size={11} style={{ opacity: 0.7 }} />
                        </button>

                        <button
                          onClick={() => window.open(`https://go.drugbank.com/unearth/q?searcher=drugs&query=${encodeURIComponent(drug.name)}`, '_blank', 'noopener,noreferrer')}
                          className="btn btn-sm"
                          style={{
                            background: 'rgba(13, 148, 136, 0.08)',
                            color: 'var(--teal-ink)',
                            border: '1px solid rgba(13, 148, 136, 0.2)',
                            fontSize: '0.74rem',
                            padding: '4px 6px',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                          title={`Buscar ${drug.name} en DrugBank`}
                        >
                          <Database size={12} />
                          <span>DrugBank</span>
                          <ExternalLink size={11} style={{ opacity: 0.7 }} />
                        </button>
                      </div>

                      {onOpenAdmet && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenAdmet(drug);
                          }}
                          className="btn btn-sm btn-outline"
                          style={{ width: '100%', fontSize: '0.74rem', padding: '4px 6px', justifyContent: 'center', gap: '5px' }}
                          title={`Evaluar propiedades ADMET y Lipinski de ${drug.name}`}
                        >
                          <Activity size={12} />
                          <span>Evaluar en ADMET & Lipinski</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.75rem' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {topic.id !== 'tema-00' && (
              <>
                <button onClick={() => onOpenQuiz(topic)} className="btn btn-sm btn-primary">
                  <HelpCircle size={14} /> Test ({topic.testQuestions?.length || 0})
                </button>
                <button onClick={() => onOpenFlashcards(topic)} className="btn btn-sm btn-secondary">
                  <Award size={14} /> Flashcards ({topic.flashcards?.length || 0})
                </button>
              </>
            )}
          </div>

          <button onClick={onClose} className="btn btn-outline">
            Cerrar Ficha
          </button>
        </div>

      </div>
    </div>
  );
};
