import React, { useState, useEffect, useMemo } from 'react';
import { QfdosTopic, CourseAttachment, MoleculeDrug } from '../data/qfdosData';
import { Chem2DDrawer } from './Chem2DDrawer';
import { renderMoleculeSvg } from '../services/rdkitService';
import { useAuth } from '../context/AuthContext';
import { RetrosintesisWorkshop } from './RetrosintesisWorkshop';
import { Model3DViewerModal } from './Model3DViewerModal';
import { 
  X, 
  Search,
  BookOpen, 
  Layers, 
  Copy,
  Check,
  Box,
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
  Settings,
  GitBranch,
  ArrowRight
} from 'lucide-react';

interface TopicDetailModalProps {
  topic: QfdosTopic;
  initialTab?: 'sar' | 'materials' | 'drugs' | 'retrosintesis';
  onClose: () => void;
  onOpenQuiz: (topic: QfdosTopic) => void;
  onOpenFlashcards: (topic: QfdosTopic) => void;
  onOpenSpotifyPlayer: (att: CourseAttachment) => void;
  onOpenAdmet?: (drug: MoleculeDrug) => void;
  onUpdateTopic?: (updatedTopic: QfdosTopic) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  initialTab,
  onClose,
  onOpenQuiz,
  onOpenFlashcards,
  onOpenSpotifyPlayer,
  onOpenAdmet,
  onUpdateTopic
}) => {
  const [activeTab, setActiveTab] = useState<'sar' | 'materials' | 'drugs' | 'retrosintesis'>(initialTab || 'sar');
  const { isProfesor } = useAuth();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);
  const [isEditingDriveLinks, setIsEditingDriveLinks] = useState(false);
  const [editSlidesUrl, setEditSlidesUrl] = useState(topic.slidesPdfUrl || '');
  const [editNotesUrl, setEditNotesUrl] = useState(topic.notesPdfUrl || '');
  const [editNotebookUrl, setEditNotebookUrl] = useState(topic.geminiNotebookUrl || '');
  const [editSpotifyUrl, setEditSpotifyUrl] = useState(topic.spotifyPodcastUrl || '');
  const [drugSearchTerm, setDrugSearchTerm] = useState('');

  useEffect(() => {
    setEditSlidesUrl(topic.slidesPdfUrl || '');
    setEditNotesUrl(topic.notesPdfUrl || '');
    setEditNotebookUrl(topic.geminiNotebookUrl || '');
    setEditSpotifyUrl(topic.spotifyPodcastUrl || '');
    setIsEditingDriveLinks(false);
    setDrugSearchTerm('');
  }, [topic]);

  const filteredDrugs = useMemo(() => {
    if (!topic.drugs || topic.drugs.length === 0) return [];
    const term = drugSearchTerm.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!term) return topic.drugs;

    return topic.drugs.filter(drug => {
      const name = (drug.name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const role = (drug.role || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const formula = (drug.formula || '').toLowerCase();
      const smiles = (drug.smiles || '').toLowerCase();
      const pdbId = (drug.pdbId || '').toLowerCase();

      return (
        name.includes(term) ||
        role.includes(term) ||
        formula.includes(term) ||
        smiles.includes(term) ||
        pdbId.includes(term)
      );
    });
  }, [topic.drugs, drugSearchTerm]);

  const handleSaveDriveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateTopic) return;
    const updated: QfdosTopic = {
      ...topic,
      slidesPdfUrl: editSlidesUrl.trim() || undefined,
      notesPdfUrl: editNotesUrl.trim() || undefined,
      geminiNotebookUrl: editNotebookUrl.trim() || undefined,
      spotifyPodcastUrl: editSpotifyUrl.trim() || undefined,
      videoPodcastUrl: editSpotifyUrl.trim() || undefined
    };
    onUpdateTopic(updated);
    setIsEditingDriveLinks(false);
  };

  const [copiedSmiles, setCopiedSmiles] = useState<string | null>(null);

  const handleCopySmiles = (smiles: string, drugName: string) => {
    navigator.clipboard.writeText(smiles);
    setCopiedSmiles(drugName);
    setTimeout(() => setCopiedSmiles(null), 2000);
  };

  const handleDownloadPng = async (drug: MoleculeDrug) => {
    if (!drug.smiles) return;
    try {
      // 1000x750 px para una exportación nítida en alta resolución
      const svg = await renderMoleculeSvg(drug.smiles, { width: 1000, height: 750, dark: false });
      if (!svg) return;

      let cleanSvg = svg;
      if (!cleanSvg.includes('xmlns=')) {
        cleanSvg = cleanSvg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
      }

      const svgBlob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 1000;
          canvas.height = 750;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Fondo blanco sólido para que no quede transparente al pegarlo en Word, PPT o informes
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 1000, 750);

            canvas.toBlob((blob) => {
              if (!blob) return;
              const pngUrl = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = pngUrl;
              const safeName = drug.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9_-]/gi, '_');
              a.download = `${safeName}_2d.png`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
            }, 'image/png');
          }
        } finally {
          URL.revokeObjectURL(url);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        console.error('Error al procesar la imagen para exportar a PNG');
      };

      img.src = url;
    } catch (err) {
      console.error('Error downloading PNG:', err);
    }
  };

  const handleOpen3D = (drug: MoleculeDrug) => {
    if (!drug.smiles) return;
    window.open(`https://molview.org/?smiles=${encodeURIComponent(drug.smiles)}`, '_blank', 'noopener,noreferrer');
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
                <Layers size={14} /> Fármacos & Quimioinformática ({drugSearchTerm.trim() ? `${filteredDrugs.length}/${topic.drugs.length}` : topic.drugs.length})
              </button>
            )}
            {topic.id === 'tema-01' && (
              <button
                onClick={() => setActiveTab('retrosintesis')}
                className={`tab-btn ${activeTab === 'retrosintesis' ? 'active' : ''}`}
                style={{ 
                  fontWeight: 800,
                  background: activeTab === 'retrosintesis' 
                    ? 'var(--surface-raised)' 
                    : 'linear-gradient(135deg, rgba(13, 148, 136, 0.15) 0%, rgba(30, 58, 138, 0.1) 100%)',
                  border: '1.5px solid var(--teal)',
                  color: 'var(--teal-ink)',
                  boxShadow: '0 2px 8px rgba(13, 148, 136, 0.15)'
                }}
              >
                <GitBranch size={14} /> Taller de Retrosíntesis
                <span className="qfdos-badge badge-teal" style={{ fontSize: '0.62rem', padding: '1px 6px', marginLeft: '6px', fontWeight: 800 }}>
                  Slides 28-35
                </span>
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
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)', display: 'block', marginBottom: '4px' }}>
                          🎙️ Enlace Episodio Spotify
                        </label>
                        <input
                          type="text"
                          value={editSpotifyUrl}
                          onChange={e => setEditSpotifyUrl(e.target.value)}
                          placeholder="https://open.spotify.com/episode/..."
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

                      {/* 5. Examen Oficial del Tema (Modelo A en modo examen + Google Sheets) */}
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
                              {isProfesor && (
                                <span className="qfdos-badge badge-amber" style={{ fontSize: '0.66rem', fontWeight: 700, padding: '2px 8px' }}>
                                  Modo Docente
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>
                              {isProfesor
                                ? `${topic.id === 'tema-01' ? 15 : topic.testQuestions.length} preguntas oficiales (cuatro modelos disponibles). Calificaciones volcadas en Google Sheets.`
                                : `${topic.id === 'tema-01' ? 15 : topic.testQuestions.length} preguntas oficiales calibradas. Respondes sin ver la corrección y entregas cuando quieras; tu nota se registra en Google Sheets.`
                              }
                            </p>
                          </div>
                          <button 
                            onClick={() => onOpenQuiz(topic)}
                            className="btn btn-sm btn-primary" 
                            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700 }}
                          >
                            <HelpCircle size={13} /> {isProfesor ? 'Portal Docente / Realizar Test' : 'Realizar el Examen (15 Preguntas)'}
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

                      {/* 7. Taller de Retrosíntesis & Desconexiones (Card Destacada para Tema 01) */}
                      {topic.id === 'tema-01' && (
                        <div 
                          className="qfdos-card card-teal resource-card is-active"
                          style={{
                            border: '2px solid var(--teal)',
                            boxShadow: '0 6px 20px -3px rgba(13, 148, 136, 0.28)',
                            background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(30, 58, 138, 0.08) 100%)',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <div style={{ position: 'absolute', top: 0, right: 0, background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-ink) 100%)', color: '#ffffff', fontSize: '0.6rem', fontWeight: 800, padding: '3px 10px', borderBottomLeftRadius: '8px', letterSpacing: '0.5px' }}>
                            ✨ DESTACADO
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', marginTop: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  background: 'rgba(13, 148, 136, 0.22)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  <GitBranch size={17} color="var(--teal-ink)" />
                                </div>
                                <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)' }}>
                                  7. Taller de Retrosíntesis
                                </strong>
                              </div>
                              <span className="qfdos-badge badge-teal" style={{ fontSize: '0.66rem', fontWeight: 800, padding: '2px 8px' }}>
                                Slides 28-35
                              </span>
                            </div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.45 }}>
                              4 casos prácticos guiados de desconexión (⇒) y 8 diapositivas vectoriales RDKit con visor a pantalla completa.
                            </p>
                          </div>
                          <button 
                            onClick={() => setActiveTab('retrosintesis')}
                            className="btn btn-sm btn-primary" 
                            style={{ 
                              width: '100%', 
                              justifyContent: 'center', 
                              fontSize: '0.8rem', 
                              fontWeight: 800,
                              background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-ink) 100%)',
                              border: 'none',
                              boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)'
                            }}
                          >
                            <GitBranch size={14} /> Abrir Taller de Retrosíntesis <ArrowRight size={13} />
                          </button>
                        </div>
                      )}

                      {/* 8. Modelo 3D: Receptor Nicotínico de Acetilcolina (nAChR) */}
                      {topic.id === 'tema-01' && (
                        <div 
                          className="qfdos-card card-teal resource-card is-active"
                          style={{
                            border: '1.5px solid var(--teal)',
                            boxShadow: '0 4px 16px rgba(13,148,136,0.18)',
                            position: 'relative'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  background: 'linear-gradient(135deg, rgba(13,148,136,0.25) 0%, rgba(30,58,138,0.3) 100%)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  <Box size={17} color="var(--teal-ink)" />
                                </div>
                                <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)' }}>
                                  8. Estructura 3D: Receptor Nicotínico (nAChR)
                                </strong>
                              </div>
                              <span className="qfdos-badge badge-teal" style={{ fontSize: '0.66rem', fontWeight: 800, padding: '2px 8px' }}>
                                3D GLB · 7.0 MB
                              </span>
                            </div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', marginBottom: '8px', lineHeight: 1.45 }}>
                              Canal iónico pentamérico interactivo. Rotación orbital 360°, zoom y detalle de sitios de unión de acetilcolina y bloqueantes.
                            </p>
                            <p style={{ fontSize: '0.69rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.35 }}>
                              <a href="https://skfb.ly/6zvJE" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-ink)', textDecoration: 'underline' }}>"Nicotinic Acetylcholine Receptor"</a> by <strong style={{ color: 'var(--text-title)' }}>British Pharmacological Society</strong> (licencia <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-ink)', textDecoration: 'underline' }}>CC BY 4.0</a>).
                            </p>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                            <button 
                              onClick={() => setIs3DViewerOpen(true)}
                              className="btn btn-sm btn-primary" 
                              style={{ 
                                flex: 1.2, 
                                justifyContent: 'center', 
                                fontSize: '0.78rem', 
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-ink) 100%)',
                                border: 'none',
                                boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)',
                                padding: '7px 8px'
                              }}
                            >
                              <Box size={13} /> Explorar en 3D
                            </button>
                            <a
                              href={`${import.meta.env.BASE_URL}models/nicotinic_acetylcholine_receptor.glb`}
                              download="receptor_nicotinico_nachr.glb"
                              className="btn btn-sm btn-outline"
                              style={{ 
                                flex: 0.8,
                                justifyContent: 'center', 
                                fontSize: '0.74rem',
                                padding: '7px 8px',
                                textDecoration: 'none'
                              }}
                              title="Descargar archivo GLB nativo (7 MB)"
                            >
                              <Download size={12} /> .GLB
                            </a>
                          </div>
                        </div>
                      )}

                      {/* 9. Base de Datos Oficial de Estructuras QFDOS */}
                      {topic.id === 'tema-01' && (
                        <div 
                          className="qfdos-card card-teal resource-card is-active"
                          style={{
                            border: '1.5px solid var(--border-color)',
                            position: 'relative'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  background: 'rgba(13, 148, 136, 0.16)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  <Database size={17} color="var(--teal-ink)" />
                                </div>
                                <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)' }}>
                                  9. Base de Datos de Estructuras QFDOS
                                </strong>
                              </div>
                              <span className="qfdos-badge badge-teal" style={{ fontSize: '0.66rem', fontWeight: 800, padding: '2px 8px' }}>
                                40 Fármacos · RDKit
                              </span>
                            </div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.45 }}>
                              Fichero maestro con 40 estructuras del curso (Bloques 1-8). Incluye imágenes 2D, descriptores fisicoquímicos, Lipinski, estereocentros CIP y notas docentes.
                            </p>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                            <a
                              href={`${import.meta.env.BASE_URL}estructuras/estructuras_qfdos.xlsx`}
                              download="estructuras_qfdos.xlsx"
                              className="btn btn-sm btn-primary"
                              style={{
                                flex: 1.2,
                                justifyContent: 'center',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                textDecoration: 'none'
                              }}
                              title="Descargar Excel con hojas de propiedades y estructuras integradas (722 KB)"
                            >
                              <Download size={12} /> Descargar .XLSX
                            </a>
                            <a
                              href={`${import.meta.env.BASE_URL}estructuras/propiedades_qfdos.csv`}
                              download="propiedades_qfdos.csv"
                              className="btn btn-sm btn-outline"
                              style={{
                                flex: 0.8,
                                justifyContent: 'center',
                                fontSize: '0.74rem',
                                padding: '7px 8px',
                                textDecoration: 'none'
                              }}
                              title="Descargar tabla de descriptores CSV (42 KB)"
                            >
                              <Download size={12} /> .CSV
                            </a>
                          </div>
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
              
              {/* Barra de Búsqueda y Filtro de Fármacos dentro del Tema */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  padding: '10px 14px',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <div style={{ position: 'relative', width: '100%', maxWidth: '440px', display: 'flex', alignItems: 'center' }}>
                  <Search
                    size={15}
                    color="var(--text-muted)"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Buscar fármaco por nombre, mecanismo, SMILES, PDB..."
                    value={drugSearchTerm}
                    onChange={e => setDrugSearchTerm(e.target.value)}
                    className="form-input"
                    style={{
                      width: '100%',
                      height: '38px',
                      paddingLeft: '36px',
                      paddingRight: drugSearchTerm ? '32px' : '12px',
                      fontSize: '0.84rem',
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                  {drugSearchTerm && (
                    <button
                      onClick={() => setDrugSearchTerm('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Limpiar búsqueda"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    className={`qfdos-badge ${drugSearchTerm.trim() ? 'badge-teal' : 'badge-neutral'}`}
                    style={{ fontSize: '0.74rem', fontWeight: 600, padding: '5px 12px', borderRadius: 'var(--radius-sm)' }}
                  >
                    {drugSearchTerm.trim()
                      ? `Mostrando ${filteredDrugs.length} de ${topic.drugs?.length || 0} fármacos`
                      : `${topic.drugs?.length || 0} fármacos registrados`}
                  </span>
                  {drugSearchTerm.trim() && (
                    <button
                      onClick={() => setDrugSearchTerm('')}
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '0.72rem', padding: '3px 8px', height: '26px' }}
                    >
                      Restablecer
                    </button>
                  )}
                </div>
              </div>

              {/* Grid de Fármacos Filtrados */}
              {filteredDrugs.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                  {filteredDrugs.map((drug, i) => (
                    <div key={drug.name + '-' + i} className="qfdos-card card-teal" style={{ padding: '1.25rem', overflow: 'hidden', boxSizing: 'border-box' }}>
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

                      {/* SMILES code with 1-click copy */}
                      <div style={{
                        background: 'var(--surface-alt)',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        marginBottom: '8px',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.70rem',
                          color: 'var(--navy-ink)',
                          wordBreak: 'break-all',
                          lineHeight: 1.3
                        }}>
                          <span style={{ fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>SMILES:</span>
                          {drug.smiles}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopySmiles(drug.smiles, drug.name)}
                          className="btn btn-sm"
                          style={{
                            flexShrink: 0,
                            padding: '3px 7px',
                            fontSize: '0.68rem',
                            height: 'auto',
                            background: copiedSmiles === drug.name ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-card)',
                            color: copiedSmiles === drug.name ? '#059669' : 'var(--text-body)',
                            border: '1px solid ' + (copiedSmiles === drug.name ? '#10b981' : 'var(--border-color)'),
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Copiar código SMILES al portapapeles"
                        >
                          {copiedSmiles === drug.name ? (
                            <>
                              <Check size={11} />
                              <span>Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Herramientas de Estructura: Descargar PNG & Visualizar en 3D */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '6px',
                        marginBottom: '10px',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}>
                        <button
                          type="button"
                          onClick={() => handleDownloadPng(drug)}
                          className="btn btn-sm"
                          style={{
                            background: 'rgba(13, 148, 136, 0.08)',
                            color: 'var(--teal-ink)',
                            border: '1px solid rgba(13, 148, 136, 0.25)',
                            fontSize: '0.72rem',
                            padding: '5px 6px',
                            justifyContent: 'center',
                            gap: '4px',
                            minWidth: 0,
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                          title={`Descargar estructura 2D de ${drug.name} en imagen PNG`}
                        >
                          <Download size={12} style={{ flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Descargar PNG</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpen3D(drug)}
                          className="btn btn-sm"
                          style={{
                            background: 'rgba(99, 102, 241, 0.08)',
                            color: '#4f46e5',
                            border: '1px solid rgba(99, 102, 241, 0.25)',
                            fontSize: '0.72rem',
                            padding: '5px 6px',
                            justifyContent: 'center',
                            gap: '4px',
                            minWidth: 0,
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                          title={`Abrir visor 3D interactivo de ${drug.name} en MolView`}
                        >
                          <Box size={12} style={{ flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ver en 3D</span>
                          <ExternalLink size={10} style={{ opacity: 0.6, flexShrink: 0 }} />
                        </button>
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

                      {/* External DB Links: PubChem, DrugBank, PDB & ADMET */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border-color)', paddingTop: '8px', width: '100%', boxSizing: 'border-box' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: drug.pdbId ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))', gap: '6px', width: '100%', boxSizing: 'border-box' }}>
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
                              gap: '4px',
                              minWidth: 0,
                              width: '100%',
                              boxSizing: 'border-box'
                            }}
                            title={`Buscar ${drug.name} en PubChem`}
                          >
                            <Globe size={12} style={{ flexShrink: 0 }} />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>PubChem</span>
                            <ExternalLink size={10} style={{ opacity: 0.7, flexShrink: 0 }} />
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
                              gap: '4px',
                              minWidth: 0,
                              width: '100%',
                              boxSizing: 'border-box'
                            }}
                            title={`Buscar ${drug.name} en DrugBank`}
                          >
                            <Database size={12} style={{ flexShrink: 0 }} />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>DrugBank</span>
                            <ExternalLink size={10} style={{ opacity: 0.7, flexShrink: 0 }} />
                          </button>

                          {drug.pdbId && (
                            <button
                              onClick={() => window.open(`https://www.rcsb.org/3d-view/${drug.pdbId}`, '_blank', 'noopener,noreferrer')}
                              className="btn btn-sm"
                              style={{
                                background: 'rgba(16, 185, 129, 0.08)',
                                color: '#047857',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                fontSize: '0.74rem',
                                padding: '4px 6px',
                                justifyContent: 'center',
                                gap: '4px',
                                minWidth: 0,
                                width: '100%',
                                boxSizing: 'border-box'
                              }}
                              title={`Ver complejo macromolecular ${drug.pdbId} en 3D (RCSB PDB)`}
                            >
                              <Atom size={12} style={{ flexShrink: 0 }} />
                              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>PDB 3D</span>
                              <ExternalLink size={10} style={{ opacity: 0.7, flexShrink: 0 }} />
                            </button>
                          )}
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
              ) : (
                <div
                  className="qfdos-card"
                  style={{
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'var(--surface-raised)'
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--surface-alt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)'
                  }}>
                    <Search size={22} />
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)', margin: 0 }}>
                    No se encontraron fármacos
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, maxWidth: '42ch', lineHeight: 1.5 }}>
                    No hay ningún principio activo en este tema que coincida con «<strong style={{ color: 'var(--text-main)' }}>{drugSearchTerm}</strong>».
                  </p>
                  <button
                    onClick={() => setDrugSearchTerm('')}
                    className="btn btn-sm btn-secondary"
                    style={{ marginTop: '4px', fontWeight: 700 }}
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: Taller de Retrosíntesis & Desconexiones */}
          {activeTab === 'retrosintesis' && (
            <RetrosintesisWorkshop isProfesor={isProfesor} />
          )}

        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.75rem' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {topic.id !== 'tema-00' && (
              <>
                {isProfesor && (
                  <button onClick={() => onOpenQuiz(topic)} className="btn btn-sm btn-primary">
                    <HelpCircle size={14} /> {topic.id === 'tema-01' ? 'Test (MODELOS)' : `Test (${topic.testQuestions?.length || 0})`}
                  </button>
                )}
                <button onClick={() => onOpenFlashcards(topic)} className="btn btn-sm btn-secondary">
                  <Award size={14} /> Flashcards ({topic.flashcards?.length || 0})
                </button>
                {topic.id === 'tema-01' && (
                  <>
                    <button 
                      onClick={() => setActiveTab('retrosintesis')} 
                      className={`btn btn-sm ${activeTab === 'retrosintesis' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ 
                        fontWeight: 800,
                        border: '1.5px solid var(--teal)',
                        boxShadow: '0 2px 8px rgba(13, 148, 136, 0.2)'
                      }}
                    >
                      <GitBranch size={14} /> Taller Retrosíntesis
                    </button>
                    <button 
                      onClick={() => setIs3DViewerOpen(true)}
                      className="btn btn-sm btn-outline"
                      style={{ 
                        fontWeight: 700,
                        borderColor: 'var(--teal)',
                        color: 'var(--teal-ink)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Abrir visor 3D interactivo del receptor nicotínico"
                    >
                      <Box size={14} /> Visor 3D nAChR
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <button onClick={onClose} className="btn btn-outline">
            Cerrar Ficha
          </button>
        </div>

      </div>

      {is3DViewerOpen && (
        <Model3DViewerModal 
          onClose={() => setIs3DViewerOpen(false)} 
          modelTitle="Receptor Nicotínico de Acetilcolina (nAChR)"
        />
      )}
    </div>
  );
};
