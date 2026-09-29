import React, { useState, useEffect } from 'react';
import { 
  QfdosTopic, 
  QfdosAnnouncement, 
  QfdosGlossaryTerm, 
  QfdosResourceLink,
  RESOURCE_CATEGORIES,
  ResourceCategory,
  MoleculeDrug
} from '../data/qfdosData';
import { Duda, cargarDudas, responderDuda, borrarDuda, fechaDuda } from '../services/dudas';
import { 
  getStoredGeminiApiKey, 
  setStoredGeminiApiKey 
} from '../services/geminiService';
import { MaterialUploader } from './MaterialUploader';
import { PublicarContenido } from './PublicarContenido';
import {
  X, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Bell, 
  BookOpen, 
  MessageSquare, 
  Key, 
  CheckCircle2, 
  Layers,
  Send,
  FileText,
  Radio,
  ExternalLink,
  Calendar,
  Award,
  Upload,
  AlertCircle,
  Compass,
  Star,
  Link2,
  Image,
  Film,
  Headphones
} from 'lucide-react';

interface AdminCmsModalProps {
  topics: QfdosTopic[];
  announcements: QfdosAnnouncement[];
  glossary: QfdosGlossaryTerm[];
  resourceLinks: QfdosResourceLink[];
  onClose: () => void;
  onUpdateTopics: (updated: QfdosTopic[]) => void;
  onUpdateAnnouncements: (updated: QfdosAnnouncement[]) => void;
  onUpdateGlossary: (updated: QfdosGlossaryTerm[]) => void;
  onUpdateResourceLinks: (updated: QfdosResourceLink[]) => void;
  publicadoEn?: string;
  onPublicado?: (cuando: string) => void;
  onOpenCartas?: () => void;
  initialTab?: 'materials' | 'modules' | 'announcements' | 'links' | 'drugs' | 'questions' | 'apikey';
  initialEditingTopicId?: string;
}

export const AdminCmsModal: React.FC<AdminCmsModalProps> = ({
  topics,
  announcements,
  glossary,
  resourceLinks,
  onClose,
  onUpdateTopics,
  onUpdateAnnouncements,
  onUpdateGlossary,
  onUpdateResourceLinks,
  publicadoEn,
  onPublicado,
  onOpenCartas,
  initialTab = 'modules',
  initialEditingTopicId
}) => {
  const [activeTab, setActiveTab] = useState<'materials' | 'modules' | 'announcements' | 'links' | 'drugs' | 'questions' | 'apikey'>(initialTab);
  const [materialsTopicId, setMaterialsTopicId] = useState<string>('');
  const [moduleSaveSuccess, setModuleSaveSuccess] = useState<string | null>(null);

  // API Key State
  const [apiKey, setApiKey] = useState(getStoredGeminiApiKey());
  const [apiKeySaved, setApiKeySaved] = useState(false);

  // Announcement Form State
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnPriority, setNewAnnPriority] = useState<'alta' | 'normal'>('normal');
  const [newAnnImageUrl, setNewAnnImageUrl] = useState('');
  const [newAnnImageCaption, setNewAnnImageCaption] = useState('');
  const [newAnnPdfUrl, setNewAnnPdfUrl] = useState('');
  const [newAnnPdfName, setNewAnnPdfName] = useState('');
  const [newAnnAudioUrl, setNewAnnAudioUrl] = useState('');
  const [newAnnAudioName, setNewAnnAudioName] = useState('');
  const [newAnnVideoUrl, setNewAnnVideoUrl] = useState('');
  const [newAnnLinkUrl, setNewAnnLinkUrl] = useState('');
  const [newAnnLinkLabel, setNewAnnLinkLabel] = useState('');
  const [showAnnMedia, setShowAnnMedia] = useState(true);

  // New Drug Form
  const [selectedTopicForDrug, setSelectedTopicForDrug] = useState(topics[0]?.id || 'tema-00');
  const [newDrugName, setNewDrugName] = useState('');
  const [newDrugSmiles, setNewDrugSmiles] = useState('');
  const [newDrugRole, setNewDrugRole] = useState('');
  const [newDrugMw, setNewDrugMw] = useState<number>(250);
  const [newDrugLogP, setNewDrugLogP] = useState<number>(2.0);

  // Formulario de Enlaces de Interés
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [lnkTitle, setLnkTitle] = useState('');
  const [lnkUrl, setLnkUrl] = useState('');
  const [lnkSummary, setLnkSummary] = useState('');
  const [lnkCategory, setLnkCategory] = useState<ResourceCategory>(RESOURCE_CATEGORIES[0]);
  const [lnkSource, setLnkSource] = useState('');
  const [lnkDuration, setLnkDuration] = useState('');
  const [lnkTopic, setLnkTopic] = useState('');
  const [lnkFeatured, setLnkFeatured] = useState(false);
  const [lnkError, setLnkError] = useState<string | null>(null);

  // Question Response State
  const [respondingQId, setRespondingQId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');

  // Module Management State
  const [isCreatingModule, setIsCreatingModule] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  // Form State for New / Editing Module
  const [modCategory, setModCategory] = useState<'teoria' | 'examen' | 'trabajo' | 'seminario' | 'general'>('teoria');
  const [modNumber, setModNumber] = useState('');
  const [modTitle, setModTitle] = useState('');
  const [modSubtitle, setModSubtitle] = useState('');
  const [modDescription, setModDescription] = useState('');
  const [modKeyConcepts, setModKeyConcepts] = useState('');
  const [modPdbTargetId, setModPdbTargetId] = useState('');
  const [modTargetName, setModTargetName] = useState('');
  const [modSlidesPdfUrl, setModSlidesPdfUrl] = useState('');
  const [modNotesPdfUrl, setModNotesPdfUrl] = useState('');
  const [modGeminiNotebookUrl, setModGeminiNotebookUrl] = useState('');
  const [modSpotifyPodcastUrl, setModSpotifyPodcastUrl] = useState('');
  const [modAudioPodcastUrl, setModAudioPodcastUrl] = useState('');
  const [modDueDate, setModDueDate] = useState('');
  const [modWeightPercentage, setModWeightPercentage] = useState<number>(15);
  const [modSubmissionInstructions, setModSubmissionInstructions] = useState('');
  const [modStatus, setModStatus] = useState<'Publicado' | 'En Revisión' | 'Próximamente'>('Publicado');

  const resetLinkForm = () => {
    setEditingLinkId(null);
    setLnkTitle(''); setLnkUrl(''); setLnkSummary('');
    setLnkCategory(RESOURCE_CATEGORIES[0]);
    setLnkSource(''); setLnkDuration(''); setLnkTopic('');
    setLnkFeatured(false); setLnkError(null);
  };

  const handleStartEditLink = (l: QfdosResourceLink) => {
    setEditingLinkId(l.id);
    setLnkTitle(l.title);
    setLnkUrl(l.url);
    setLnkSummary(l.summary);
    setLnkCategory(l.category);
    setLnkSource(l.source ?? '');
    setLnkDuration(l.duration ?? '');
    setLnkTopic(l.relatedTopic ?? '');
    setLnkFeatured(!!l.featured);
    setLnkError(null);
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    setLnkError(null);

    // Aceptamos que se pegue el enlace sin esquema y lo completamos
    const raw = lnkUrl.trim();
    const normalised = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
      new URL(normalised);
    } catch {
      setLnkError('La dirección no es válida. Pega el enlace completo, por ejemplo https://www.nature.com/...');
      return;
    }

    if (!lnkTitle.trim() || !lnkSummary.trim()) {
      setLnkError('El título y el resumen son obligatorios: el resumen es lo que orienta al alumnado.');
      return;
    }

    const base = {
      title: lnkTitle.trim(),
      url: normalised,
      summary: lnkSummary.trim(),
      category: lnkCategory,
      source: lnkSource.trim() || undefined,
      duration: lnkDuration.trim() || undefined,
      relatedTopic: lnkTopic.trim() || undefined,
      featured: lnkFeatured
    };

    if (editingLinkId) {
      onUpdateResourceLinks(
        resourceLinks.map(l => (l.id === editingLinkId ? { ...l, ...base } : l))
      );
    } else {
      onUpdateResourceLinks([
        {
          id: `link-${Date.now()}`,
          ...base,
          addedAt: new Date().toISOString().slice(0, 10)
        },
        ...resourceLinks
      ]);
    }
    resetLinkForm();
  };

  const handleDeleteLink = (l: QfdosResourceLink) => {
    if (!window.confirm(`¿Eliminar el enlace "${l.title}"?`)) return;
    onUpdateResourceLinks(resourceLinks.filter(x => x.id !== l.id));
    if (editingLinkId === l.id) resetLinkForm();
  };

  // Handle Save API Key
  const handleSaveApiKey = () => {
    setStoredGeminiApiKey(apiKey);
    setApiKeySaved(true);
    setTimeout(() => setApiKeySaved(false), 2500);
  };

  // Reset Module Form
  const resetModuleForm = () => {
    setModCategory('teoria');
    setModNumber('');
    setModTitle('');
    setModSubtitle('');
    setModDescription('');
    setModKeyConcepts('');
    setModPdbTargetId('');
    setModTargetName('');
    setModSlidesPdfUrl('');
    setModNotesPdfUrl('');
    setModGeminiNotebookUrl('');
    setModSpotifyPodcastUrl('');
    setModAudioPodcastUrl('');
    setModDueDate('');
    setModWeightPercentage(15);
    setModSubmissionInstructions('');
    setModStatus('Publicado');
    setIsCreatingModule(false);
    setEditingModuleId(null);
  };

  // Auto-edit topic if requested via initialEditingTopicId
  React.useEffect(() => {
    if (initialEditingTopicId) {
      const topic = topics.find(t => t.id === initialEditingTopicId);
      if (topic) {
        handleStartEditModule(topic);
      }
    }
  }, [initialEditingTopicId, topics]);

  // Open Edit Module
  const handleStartEditModule = (topic: QfdosTopic) => {
    setEditingModuleId(topic.id);
    setIsCreatingModule(false);
    setModCategory(topic.category || 'teoria');
    setModNumber(topic.number);
    setModTitle(topic.title);
    setModSubtitle(topic.subtitle);
    setModDescription(topic.description);
    setModKeyConcepts(topic.keyConcepts?.join('\n') || '');
    setModPdbTargetId(topic.pdbTargetId || '');
    setModTargetName(topic.targetName || '');
    setModSlidesPdfUrl(topic.slidesPdfUrl || '');
    setModNotesPdfUrl(topic.notesPdfUrl || '');
    setModGeminiNotebookUrl(topic.geminiNotebookUrl || '');
    setModSpotifyPodcastUrl(topic.spotifyPodcastUrl || '');
    setModAudioPodcastUrl(topic.audioPodcastUrl || '');
    setModDueDate(topic.dueDate || '');
    setModWeightPercentage(topic.weightPercentage || 15);
    setModSubmissionInstructions(topic.submissionInstructions || '');
    setModStatus(topic.status || 'Publicado');

    setTimeout(() => {
      const formEl = document.getElementById('cms-module-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Save (Create or Update) Module
  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modTitle.trim() || !modNumber.trim()) return;

    const conceptsArray = modKeyConcepts
      .split('\n')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    if (editingModuleId) {
      // Update existing module
      const updatedTopics = topics.map(t => {
        if (t.id === editingModuleId) {
          return {
            ...t,
            number: modNumber.trim(),
            title: modTitle.trim(),
            subtitle: modSubtitle.trim(),
            description: modDescription.trim(),
            category: modCategory,
            keyConcepts: conceptsArray.length > 0 ? conceptsArray : t.keyConcepts,
            pdbTargetId: modPdbTargetId.trim().toUpperCase() || undefined,
            targetName: modTargetName.trim() || undefined,
            slidesPdfUrl: modSlidesPdfUrl.trim() || undefined,
            slidesPdfName: modSlidesPdfUrl ? `${modNumber.replace(/\s+/g, '_')}_Diapositivas.pdf` : undefined,
            notesPdfUrl: modNotesPdfUrl.trim() || undefined,
            notesPdfName: modNotesPdfUrl ? `${modNumber.replace(/\s+/g, '_')}_Apuntes.pdf` : undefined,
            geminiNotebookUrl: modGeminiNotebookUrl.trim() || undefined,
            spotifyPodcastUrl: modSpotifyPodcastUrl.trim() || undefined,
            videoPodcastUrl: modSpotifyPodcastUrl.trim() || undefined,
            audioPodcastUrl: modAudioPodcastUrl.trim() || undefined,
            dueDate: modDueDate.trim() || undefined,
            weightPercentage: Number(modWeightPercentage) || undefined,
            submissionInstructions: modSubmissionInstructions.trim() || undefined,
            status: modStatus
          };
        }
        return t;
      });

      onUpdateTopics(updatedTopics);
      localStorage.setItem('qfdos_v3_topics', JSON.stringify(updatedTopics));
      setModuleSaveSuccess(`✓ Módulo "${modNumber} — ${modTitle}" guardado con éxito.`);
      setTimeout(() => setModuleSaveSuccess(null), 5000);
    } else {
      // Create new module
      const newId = `mod_${Date.now()}`;
      const newTopic: QfdosTopic = {
        id: newId,
        number: modNumber.trim(),
        title: modTitle.trim(),
        subtitle: modSubtitle.trim() || `${modCategory.toUpperCase()} - Química Farmacéutica II`,
        description: modDescription.trim() || 'Módulo docente oficial de la Facultad de Farmacia (UGR).',
        category: modCategory,
        keyConcepts: conceptsArray.length > 0 ? conceptsArray : ['Conceptos generales', 'Química Farmacéutica II'],
        slideCount: 0,
        pdbTargetId: modPdbTargetId.trim().toUpperCase() || undefined,
        targetName: modTargetName.trim() || undefined,
        drugs: [],
        status: modStatus,
        slidesPdfUrl: modSlidesPdfUrl.trim() || undefined,
        slidesPdfName: modSlidesPdfUrl ? `${modNumber.replace(/\s+/g, '_')}_Diapositivas.pdf` : undefined,
        notesPdfUrl: modNotesPdfUrl.trim() || undefined,
        notesPdfName: modNotesPdfUrl ? `${modNumber.replace(/\s+/g, '_')}_Apuntes.pdf` : undefined,
        geminiNotebookUrl: modGeminiNotebookUrl.trim() || undefined,
        spotifyPodcastUrl: modSpotifyPodcastUrl.trim() || undefined,
        videoPodcastUrl: modSpotifyPodcastUrl.trim() || undefined,
        audioPodcastUrl: modAudioPodcastUrl.trim() || undefined,
        dueDate: modDueDate.trim() || undefined,
        weightPercentage: Number(modWeightPercentage) || undefined,
        submissionInstructions: modSubmissionInstructions.trim() || undefined,
        testQuestions: [],
        flashcards: []
      };

      const updatedTopics = [...topics, newTopic];
      onUpdateTopics(updatedTopics);
      localStorage.setItem('qfdos_v3_topics', JSON.stringify(updatedTopics));
      setModuleSaveSuccess(`✓ Nuevo módulo "${newTopic.number} — ${newTopic.title}" creado y publicado en local.`);
      setTimeout(() => setModuleSaveSuccess(null), 5000);
    }

    resetModuleForm();
  };

  // Delete Module
  const handleDeleteModule = (id: string) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este módulo del curso?')) return;
    const updated = topics.filter(t => t.id !== id);
    onUpdateTopics(updated);
    localStorage.setItem('qfdos_v3_topics', JSON.stringify(updated));
    if (editingModuleId === id) resetModuleForm();
  };

  // Reset Announcement Form
  const resetAnnouncementForm = () => {
    setEditingAnnId(null);
    setNewAnnTitle('');
    setNewAnnContent('');
    setNewAnnImageUrl('');
    setNewAnnImageCaption('');
    setNewAnnPdfUrl('');
    setNewAnnPdfName('');
    setNewAnnAudioUrl('');
    setNewAnnAudioName('');
    setNewAnnVideoUrl('');
    setNewAnnLinkUrl('');
    setNewAnnLinkLabel('');
    setNewAnnPriority('normal');
  };

  // Start Edit Announcement
  const handleStartEditAnnouncement = (ann: QfdosAnnouncement) => {
    setEditingAnnId(ann.id);
    setNewAnnTitle(ann.title);
    setNewAnnContent(ann.content);
    setNewAnnPriority(ann.priority);
    setNewAnnImageUrl(ann.imageUrl || '');
    setNewAnnImageCaption(ann.imageCaption || '');
    setNewAnnPdfUrl(ann.pdfUrl || '');
    setNewAnnPdfName(ann.pdfName || '');
    setNewAnnAudioUrl(ann.audioUrl || '');
    setNewAnnAudioName(ann.audioName || '');
    setNewAnnVideoUrl(ann.videoUrl || '');
    setNewAnnLinkUrl(ann.linkUrl || '');
    setNewAnnLinkLabel(ann.linkLabel || '');
    setShowAnnMedia(true);
  };

  // Upload Local Image for Announcement (DataURL)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen seleccionada supera los 5 MB. Por favor, elija una de menor resolución.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewAnnImageUrl(reader.result);
        if (!newAnnImageCaption) {
          setNewAnnImageCaption(file.name.replace(/\.[^/.]+$/, ''));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Upload Local Audio for Announcement (DataURL)
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert('El archivo de audio supera los 15 MB. Se recomienda utilizar un archivo MP3 en public/audio/ o enlace externo.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewAnnAudioUrl(reader.result);
        if (!newAnnAudioName) {
          setNewAnnAudioName(file.name.replace(/\.[^/.]+$/, ''));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Upload Local Audio for Module (DataURL)
  const handleModuleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert('El audio supera los 15 MB. Se recomienda utilizar un archivo MP3 en public/audio/ o alojarlo en Google Drive.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setModAudioPodcastUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Add / Update Announcement
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    if (editingAnnId) {
      // Update existing
      const updated = announcements.map(a => {
        if (a.id === editingAnnId) {
          return {
            ...a,
            title: newAnnTitle.trim(),
            content: newAnnContent.trim(),
            priority: newAnnPriority,
            imageUrl: newAnnImageUrl.trim() || undefined,
            imageCaption: newAnnImageCaption.trim() || undefined,
            pdfUrl: newAnnPdfUrl.trim() || undefined,
            pdfName: newAnnPdfName.trim() || undefined,
            audioUrl: newAnnAudioUrl.trim() || undefined,
            audioName: newAnnAudioName.trim() || undefined,
            videoUrl: newAnnVideoUrl.trim() || undefined,
            linkUrl: newAnnLinkUrl.trim() || undefined,
            linkLabel: newAnnLinkLabel.trim() || undefined
          };
        }
        return a;
      });
      onUpdateAnnouncements(updated);
      localStorage.setItem('qfdos_v2_announcements', JSON.stringify(updated));
    } else {
      // Create new
      const newAnn: QfdosAnnouncement = {
        id: `ann_${Date.now()}`,
        title: newAnnTitle.trim(),
        content: newAnnContent.trim(),
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
        priority: newAnnPriority,
        imageUrl: newAnnImageUrl.trim() || undefined,
        imageCaption: newAnnImageCaption.trim() || undefined,
        pdfUrl: newAnnPdfUrl.trim() || undefined,
        pdfName: newAnnPdfName.trim() || undefined,
        audioUrl: newAnnAudioUrl.trim() || undefined,
        audioName: newAnnAudioName.trim() || undefined,
        videoUrl: newAnnVideoUrl.trim() || undefined,
        linkUrl: newAnnLinkUrl.trim() || undefined,
        linkLabel: newAnnLinkLabel.trim() || undefined
      };

      const updated = [newAnn, ...announcements];
      onUpdateAnnouncements(updated);
      localStorage.setItem('qfdos_v2_announcements', JSON.stringify(updated));
    }

    resetAnnouncementForm();
  };

  // Handle Delete Announcement
  const handleDeleteAnnouncement = (id: string) => {
    if (!window.confirm('¿Desea eliminar este aviso del portal?')) return;
    const updated = announcements.filter(a => a.id !== id);
    onUpdateAnnouncements(updated);
    localStorage.setItem('qfdos_v2_announcements', JSON.stringify(updated));
    if (editingAnnId === id) resetAnnouncementForm();
  };

  // Handle Add Drug to Topic
  const handleAddDrug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrugName.trim() || !newDrugSmiles.trim()) return;

    const newDrug: MoleculeDrug = {
      name: newDrugName.trim(),
      smiles: newDrugSmiles.trim(),
      role: newDrugRole.trim() || 'Fármaco de la unidad',
      mw: Number(newDrugMw) || 250,
      logP: Number(newDrugLogP) || 2.0,
      hbd: 1,
      hba: 3,
      tpsa: 45,
      rotBonds: 2
    };

    const updatedTopics = topics.map(t => {
      if (t.id === selectedTopicForDrug) {
        return {
          ...t,
          drugs: [...t.drugs, newDrug]
        };
      }
      return t;
    });

    onUpdateTopics(updatedTopics);
    localStorage.setItem('qfdos_v3_topics', JSON.stringify(updatedTopics));

    setNewDrugName('');
    setNewDrugSmiles('');
    setNewDrugRole('');
  };

  // Handle Delete Drug
  const handleDeleteDrug = (topicId: string, drugName: string) => {
    const updatedTopics = topics.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          drugs: t.drugs.filter(d => d.name !== drugName)
        };
      }
      return t;
    });

    onUpdateTopics(updatedTopics);
    localStorage.setItem('qfdos_v3_topics', JSON.stringify(updatedTopics));
  };

  // Buzón de dudas: se lee y se modifica en el servidor (pestaña _Dudas)
  const [studentQuestions, setStudentQuestions] = useState<Duda[]>([]);
  const [dudasCargando, setDudasCargando] = useState(true);
  const [dudasAviso, setDudasAviso] = useState<string | null>(null);
  const [enviandoRespuesta, setEnviandoRespuesta] = useState(false);

  const recargarDudas = async () => {
    setDudasCargando(true);
    const r = await cargarDudas();
    if (r.ok) {
      setStudentQuestions(r.datos);
      setDudasAviso(null);
    } else {
      setDudasAviso(`No se han podido cargar las dudas: ${r.error}`);
    }
    setDudasCargando(false);
  };

  useEffect(() => { recargarDudas(); }, []);

  const dudasPendientes = studentQuestions.filter(q => q.estado === 'pendiente').length;

  const handleSendResponse = async (qId: string) => {
    if (!responseText.trim() || enviandoRespuesta) return;
    setEnviandoRespuesta(true);
    const r = await responderDuda(qId, responseText.trim());
    setEnviandoRespuesta(false);
    if (!r.ok) {
      // La respuesta sigue en el cuadro de texto para no perderla
      setDudasAviso(`No se ha podido guardar la respuesta: ${r.error}`);
      return;
    }
    setStudentQuestions(prev => prev.map(q => (q.id === qId ? r.datos : q)));
    setDudasAviso(null);
    setRespondingQId(null);
    setResponseText('');
  };

  const handleDeleteStudentQuestion = async (qId: string) => {
    if (!window.confirm('¿Eliminar esta consulta? El alumno dejará de verla.')) return;
    const r = await borrarDuda(qId);
    if (!r.ok) {
      setDudasAviso(`No se ha podido eliminar: ${r.error}`);
      return;
    }
    setStudentQuestions(prev => prev.filter(q => q.id !== qId));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '1020px', height: '90vh' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={22} color="var(--navy-ink)" />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)' }}>
                Panel de Administración CMS · Profesorado UGR
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Gestión de módulos, exámenes, trabajos, materiales (PDF, Notebook, Podcast) y claves de IA
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
        </div>

        {/* Tab Navigation */}
        <div style={{ padding: '0 1.75rem', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="tabs-container" style={{ margin: 0 }} role="tablist">
            <button
              onClick={() => setActiveTab('materials')}
              className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'materials'}
            >
              <Upload size={14} /> Materiales
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`tab-btn ${activeTab === 'modules' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'modules'}
            >
              <BookOpen size={14} /> Módulos, Exámenes & Trabajos ({topics.length})
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'announcements'}
            >
              <Bell size={14} /> Noticias y Tablón de Avisos ({announcements.length})
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`tab-btn ${activeTab === 'links' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'links'}
            >
              <Compass size={14} /> Enlaces Web & Artículos ({resourceLinks.length})
            </button>
            <button
              onClick={() => setActiveTab('drugs')}
              className={`tab-btn ${activeTab === 'drugs' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'drugs'}
            >
              <Layers size={14} /> Fármacos & SMILES
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'questions'}
            >
              <MessageSquare size={14} /> Dudas de Alumnos ({dudasPendientes} pendientes)
            </button>
            <button
              onClick={() => setActiveTab('apikey')}
              className={`tab-btn ${activeTab === 'apikey' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'apikey'}
            >
              <Key size={14} /> Clave API Gemini
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* TAB 0: Materiales — subida de ficheros */}
          {activeTab === 'materials' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <PublicarContenido
                contenido={{ topics, announcements, glossary, resourceLinks }}
                publicadoEn={publicadoEn}
                onPublicado={onPublicado}
              />

              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Materiales del curso
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, maxWidth: '68ch' }}>
                  Arrastra aquí apuntes, diapositivas, imágenes o audio. Los ficheros se guardan en
                  este navegador, listos para consultarlos y descargarlos desde la propia plataforma.
                </p>
              </div>

              <div>
                <label
                  htmlFor="materials-topic"
                  className="eyebrow"
                  style={{ display: 'block', marginBottom: 5 }}
                >
                  Asociar a un módulo
                </label>
                <select
                  id="materials-topic"
                  value={materialsTopicId}
                  onChange={e => setMaterialsTopicId(e.target.value)}
                  className="form-select"
                  style={{ maxWidth: 460 }}
                >
                  <option value="">Sin módulo — material general del curso</option>
                  {topics.map(t => (
                    <option key={t.id} value={t.id}>{t.number} — {t.title}</option>
                  ))}
                </select>
              </div>

              <MaterialUploader
                topicId={materialsTopicId || undefined}
                topicLabel={topics.find(t => t.id === materialsTopicId)?.number}
              />

              <div style={{
                display: 'flex', gap: 9, alignItems: 'flex-start',
                padding: '11px 13px', borderRadius: 'var(--radius-md)',
                background: 'var(--semantic-warn-bg)', border: '1px solid rgba(184,115,15,0.2)'
              }}>
                <AlertCircle size={16} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ fontSize: '0.79rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                  <strong style={{ color: 'var(--accent-amber)' }}>Distribución al alumnado.</strong>{' '}
                  Estos ficheros viven en tu navegador, no en un servidor: el alumnado no los ve desde
                  sus equipos. Para que les lleguen, sube la misma copia a Google Drive y pega el
                  enlace en el campo correspondiente de cada módulo, en la pestaña{' '}
                  <button
                    onClick={() => setActiveTab('modules')}
                    style={{
                      background: 'none', border: 'none', padding: 0, font: 'inherit',
                      color: 'var(--teal-ink)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline'
                    }}
                  >
                    Módulos
                  </button>.
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: Módulos, Exámenes & Trabajos */}
          {activeTab === 'modules' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Publicación remota directa desde la pestaña Módulos */}
              <PublicarContenido
                contenido={{ topics, announcements, glossary, resourceLinks }}
                publicadoEn={publicadoEn}
                onPublicado={onPublicado}
              />

              {/* Mensaje de éxito al guardar módulo */}
              {moduleSaveSuccess && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#065f46',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  {moduleSaveSuccess}
                </div>
              )}

              {/* Header Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                    Planificación Docente: Temas, Exámenes Oficiales y Trabajos
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Gestiona títulos, apuntes oficiales, diapositivas, cuaderno Gemini Notebook y píldoras de audio de cada tema.
                  </p>
                </div>
                {!isCreatingModule && !editingModuleId && (
                  <button
                    onClick={() => {
                      setIsCreatingModule(true);
                      setEditingModuleId(null);
                      setTimeout(() => {
                        document.getElementById('cms-module-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className="btn btn-primary"
                  >
                    <Plus size={16} /> Añadir Nuevo Módulo / Examen / Trabajo
                  </button>
                )}
              </div>

              {/* Form for Creating or Editing Module */}
              {(isCreatingModule || editingModuleId) && (
                <div id="cms-module-form" className="qfdos-card card-teal" style={{ padding: '1.25rem', border: '2px solid var(--teal)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Edit3 size={16} color="var(--teal-ink)" />
                      {editingModuleId ? `Editar Módulo: ${modNumber}` : 'Crear Nuevo Módulo o Convocatoria'}
                    </h4>
                    <button onClick={resetModuleForm} className="btn btn-sm btn-outline">Cancelar</button>
                  </div>

                  <form onSubmit={handleSaveModule} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    
                    {/* Category and Code */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                          Tipo / Categoría del Módulo
                        </label>
                        <select
                          value={modCategory}
                          onChange={e => setModCategory(e.target.value as any)}
                          className="form-input"
                          style={{ width: '100%' }}
                        >
                          <option value="teoria">Teoría (Unidad Temática)</option>
                          <option value="general">Módulo General / Varios</option>
                          <option value="examen">Examen Oficial / Parcial</option>
                          <option value="trabajo">Trabajo Dirigido / Proyecto</option>
                          <option value="seminario">Seminario / Caso Práctico</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                          Código o Número (ej: Tema 11, Examen 01, Trabajo 02)
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Tema 11 / Examen Parcial 2"
                          value={modNumber}
                          onChange={e => setModNumber(e.target.value)}
                          className="form-input"
                          required
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                          Estado de Publicación
                        </label>
                        <select
                          value={modStatus}
                          onChange={e => setModStatus(e.target.value as any)}
                          className="form-input"
                          style={{ width: '100%' }}
                        >
                          <option value="Publicado">Publicado</option>
                          <option value="En Revisión">En Revisión</option>
                          <option value="Próximamente">Próximamente</option>
                        </select>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, max(150px, calc(50% - 1rem))), 1fr))', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                          Título Principal
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Inhibidores de Tirosina Quinasa & Terapias Dirigidas"
                          value={modTitle}
                          onChange={e => setModTitle(e.target.value)}
                          className="form-input"
                          required
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                          Subtítulo o Resumen Corto
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Mecanismo de Acción, SAR y Resistencia por Mutación Gatekeeper"
                          value={modSubtitle}
                          onChange={e => setModSubtitle(e.target.value)}
                          className="form-input"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                        Descripción Completa del Módulo
                      </label>
                      <textarea
                        placeholder="Descripción detallada de los objetivos docentes, bases farmacológicas y estructura..."
                        value={modDescription}
                        onChange={e => setModDescription(e.target.value)}
                        className="form-input"
                        rows={3}
                        style={{ width: '100%', resize: 'vertical' }}
                      />
                    </div>

                    {/* Key Concepts */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                        Conceptos Estructurales Clave (uno por línea)
                      </label>
                      <textarea
                        placeholder="Ejemplo:&#10;Bolsillo de unión a ATP&#10;Mutación T315I / Resistencia&#10;Eficacia de ligando (LE)"
                        value={modKeyConcepts}
                        onChange={e => setModKeyConcepts(e.target.value)}
                        className="form-input"
                        rows={3}
                        style={{ width: '100%', resize: 'vertical' }}
                      />
                    </div>

                    {/* SECTION: RECURSOS Y ENLACES OBLIGATORIOS DEL MÓDULO */}
                    <div style={{ background: 'var(--surface-alt)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                        <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--teal-ink)', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                          <Upload size={16} /> Recursos Didácticos del Módulo (PDFs, Cuaderno IA, Píldoras de Audio y Spotify)
                        </h5>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '12px' }}>
                        
                        {/* 1. Diapositivas PDF */}
                        <div>
                          <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                            <FileText size={13} color="var(--navy-ink)" /> 1. Diapositivas (PDF)
                          </label>
                          <input
                            type="text"
                            placeholder="URL o enlace Google Drive del PDF"
                            value={modSlidesPdfUrl}
                            onChange={e => setModSlidesPdfUrl(e.target.value)}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.8rem' }}
                          />
                        </div>

                        {/* 2. Apuntes PDF */}
                        <div>
                          <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                            <FileText size={13} color="var(--teal-ink)" /> 2. Apuntes Oficiales (PDF)
                          </label>
                          <input
                            type="text"
                            placeholder="URL o enlace Google Drive de apuntes"
                            value={modNotesPdfUrl}
                            onChange={e => setModNotesPdfUrl(e.target.value)}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.8rem' }}
                          />
                        </div>

                        {/* 3. Gemini Notebook */}
                        <div>
                          <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                            <BookOpen size={13} color="var(--mint)" /> 3. Gemini Notebook (NotebookLM)
                          </label>
                          <input
                            type="text"
                            placeholder="https://notebooklm.google.com/notebook/..."
                            value={modGeminiNotebookUrl}
                            onChange={e => setModGeminiNotebookUrl(e.target.value)}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.8rem' }}
                          />
                        </div>

                        {/* 4. Spotify Video Podcast */}
                        <div>
                          <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                            <Radio size={13} color="#1db954" /> 4. Video Podcast Spotify (Episodio)
                          </label>
                          <input
                            type="text"
                            placeholder="https://open.spotify.com/episode/..."
                            value={modSpotifyPodcastUrl}
                            onChange={e => setModSpotifyPodcastUrl(e.target.value)}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.8rem' }}
                          />
                        </div>

                      </div>

                      {/* 5. BLOQUE DESTACADO: PÍLDORA DE AUDIO / PODCAST NATIVO */}
                      <div style={{
                        marginTop: '12px',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(37, 99, 235, 0.05)',
                        border: '1px solid rgba(37, 99, 235, 0.25)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                          <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '5px', margin: 0 }}>
                            <Headphones size={15} color="#2563eb" /> 5. Píldora de Audio Web (Podcast MP3 / WAV integrable)
                          </label>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              onClick={() => setModAudioPodcastUrl('audio/podcast_colinergicos.mp3')}
                              className="btn btn-sm btn-ghost"
                              style={{ fontSize: '0.68rem', padding: '2px 7px', color: '#2563eb', border: '1px solid rgba(37,99,235,0.3)' }}
                              title="Asignar el audio del podcast de colinérgicos"
                            >
                              + Usar podcast_colinergicos.mp3
                            </button>
                            {modAudioPodcastUrl && (
                              <button
                                type="button"
                                onClick={() => setModAudioPodcastUrl('')}
                                className="btn btn-sm btn-ghost"
                                style={{ fontSize: '0.68rem', padding: '2px 7px', color: 'var(--bad-ink)' }}
                              >
                                ✕ Quitar
                              </button>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) auto', gap: '8px', alignItems: 'center' }}>
                          <input
                            type="text"
                            placeholder="Ruta en public/ (ej: audio/podcast_colinergicos.mp3) o URL externa"
                            value={modAudioPodcastUrl}
                            onChange={e => setModAudioPodcastUrl(e.target.value)}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.8rem' }}
                          />
                          <label className="btn btn-sm btn-outline" style={{ fontSize: '0.74rem', gap: '5px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <Upload size={13} /> Subir Audio PC
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={handleModuleAudioUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>

                        {modAudioPodcastUrl && (
                          <div style={{ marginTop: '8px' }}>
                            <audio 
                              controls 
                              src={modAudioPodcastUrl.startsWith('data:') || modAudioPodcastUrl.startsWith('http') ? modAudioPodcastUrl : `${import.meta.env.BASE_URL}${modAudioPodcastUrl}`} 
                              style={{ width: '100%', height: '30px' }} 
                              preload="none" 
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Crystallographic Target & Dates */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '3px' }}>
                          Código PDB Diana (ej: 2HA4, 2RH1)
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: 2HA4"
                          value={modPdbTargetId}
                          onChange={e => setModPdbTargetId(e.target.value)}
                          className="form-input"
                          maxLength={4}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '3px' }}>
                          Nombre de la Diana
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Ciclooxigenasa-2 Humana"
                          value={modTargetName}
                          onChange={e => setModTargetName(e.target.value)}
                          className="form-input"
                          style={{ width: '100%' }}
                        />
                      </div>

                      {/* Exam / Project specific fields */}
                      {(modCategory === 'examen' || modCategory === 'trabajo') && (
                        <>
                          <div>
                            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '3px' }}>
                              Fecha Oficial / Límite
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: 15/12/2026 09:30"
                              value={modDueDate}
                              onChange={e => setModDueDate(e.target.value)}
                              className="form-input"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '3px' }}>
                              Ponderación (%)
                            </label>
                            <input
                              type="number"
                              placeholder="15"
                              value={modWeightPercentage}
                              onChange={e => setModWeightPercentage(Number(e.target.value))}
                              className="form-input"
                              style={{ width: '100%' }}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Submission Instructions for Works */}
                    {modCategory === 'trabajo' && (
                      <div>
                        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '3px' }}>
                          Instrucciones de Entrega y Rúbrica del Trabajo
                        </label>
                        <textarea
                          placeholder="Detalles sobre el formato de entrega, memoria en PDF, tablas de SMILES, etc."
                          value={modSubmissionInstructions}
                          onChange={e => setModSubmissionInstructions(e.target.value)}
                          className="form-input"
                          rows={2}
                          style={{ width: '100%' }}
                        />
                      </div>
                    )}

                    {/* Save Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                      <button type="button" onClick={resetModuleForm} className="btn btn-outline">
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-mint">
                        <Save size={16} /> {editingModuleId ? 'Guardar Cambios del Módulo' : 'Publicar Módulo en el Portal'}
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* Existing Modules List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  Módulos Configurados en el Curso ({topics.length})
                </h5>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                  {topics.map(topic => (
                    <div
                      key={topic.id}
                      className="qfdos-card"
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 'min(280px, 100%)', flex: 1 }}>
                        <span className={`qfdos-badge ${topic.category === 'examen' ? 'badge-amber' : topic.category === 'trabajo' ? 'badge-emerald' : 'badge-navy'}`}>
                          {topic.number}
                        </span>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)' }}>
                              {topic.title}
                            </h4>
                            {topic.category && topic.category !== 'teoria' && (
                              <span className="qfdos-badge badge-teal" style={{ fontSize: '0.65rem' }}>
                                {topic.category.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.78rem', color: 'var(--teal-ink)', fontWeight: 600 }}>
                            {topic.subtitle}
                          </span>

                          {/* Quick Resource Indicators */}
                          <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: topic.slidesPdfUrl ? 'rgba(30,58,138,0.1)' : 'var(--surface-alt)', color: topic.slidesPdfUrl ? 'var(--navy-ink)' : 'var(--text-muted)' }}>
                              📑 Diapositivas {topic.slidesPdfUrl ? '✓' : '✗'}
                            </span>
                            <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: topic.notesPdfUrl ? 'rgba(13,148,136,0.1)' : 'var(--surface-alt)', color: topic.notesPdfUrl ? 'var(--teal-ink)' : 'var(--text-muted)' }}>
                              📝 Apuntes {topic.notesPdfUrl ? '✓' : '✗'}
                            </span>
                            <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: topic.geminiNotebookUrl ? 'rgba(45,212,191,0.15)' : 'var(--surface-alt)', color: topic.geminiNotebookUrl ? 'var(--teal-ink)' : 'var(--text-muted)' }}>
                              📓 Gemini Notebook {topic.geminiNotebookUrl ? '✓' : '✗'}
                            </span>
                            <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: topic.audioPodcastUrl ? 'rgba(37,99,235,0.15)' : 'var(--surface-alt)', color: topic.audioPodcastUrl ? '#2563eb' : 'var(--text-muted)', fontWeight: topic.audioPodcastUrl ? 700 : 400 }}>
                              🎧 Píldora de Audio {topic.audioPodcastUrl ? '✓' : '✗'}
                            </span>
                            <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: topic.spotifyPodcastUrl ? 'rgba(29,185,84,0.15)' : 'var(--surface-alt)', color: topic.spotifyPodcastUrl ? '#1db954' : 'var(--text-muted)' }}>
                              🎙️ Video Podcast {topic.spotifyPodcastUrl ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Module Actions */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => handleStartEditModule(topic)}
                          className="btn btn-sm btn-outline"
                          title="Editar enlaces y contenidos del módulo"
                        >
                          <Edit3 size={14} /> Editar
                        </button>
                        <button
                          onClick={() => handleDeleteModule(topic.id)}
                          className="btn btn-sm btn-outline"
                          style={{ color: 'var(--bad-ink)', borderColor: 'rgba(239,68,68,0.3)' }}
                          title="Eliminar módulo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Tablón de Avisos */}
          {activeTab === 'announcements' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Add / Edit Announcement Form */}
              <div className="qfdos-card card-navy" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bell size={18} color="var(--navy-ink)" />
                    {editingAnnId ? 'Editar Noticia / Aviso del Portal' : 'Publicar Nueva Noticia o Aviso en el Portal'}
                  </h4>
                  {editingAnnId && (
                    <button type="button" onClick={resetAnnouncementForm} className="btn btn-sm btn-outline">
                      Cancelar Edición
                    </button>
                  )}
                </div>

                <form onSubmit={handleAddAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '3px' }}>
                        Titular de la Noticia / Aviso
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Nuevo mapa interactivo de dianas terapéuticas disponible"
                        value={newAnnTitle}
                        onChange={e => setNewAnnTitle(e.target.value)}
                        className="form-input"
                        required
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '3px' }}>
                        Nivel de Prioridad
                      </label>
                      <select
                        value={newAnnPriority}
                        onChange={e => setNewAnnPriority(e.target.value as 'alta' | 'normal')}
                        className="form-input"
                        style={{ width: '100%' }}
                      >
                        <option value="normal">Normal (Informativo)</option>
                        <option value="alta">Alta (Urgente / Examen)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '3px' }}>
                      Cuerpo del Mensaje / Explicación para los Estudiantes
                    </label>
                    <textarea
                      placeholder="Redacta la noticia, indicando a los alumnos qué materiales se han actualizado, fechas clave o tareas..."
                      value={newAnnContent}
                      onChange={e => setNewAnnContent(e.target.value)}
                      className="form-input"
                      rows={3}
                      required
                      style={{ width: '100%', resize: 'vertical' }}
                    />
                  </div>

                  {/* PANEL MULTIMEDIA PERMANENTE: IMAGEN, PDF, AUDIO, VÍDEO */}
                  <div style={{
                    background: 'var(--surface-alt)',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--teal-ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Upload size={16} /> Adjuntar Contenido Multimedia a la Noticia
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Opcional: puedes adjuntar imágenes, PDFs, audios o vídeos
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '12px' }}>
                      
                      {/* 1. IMAGEN DESTACADA */}
                      <div style={{ background: 'var(--surface-raised)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                          <label style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
                            <Image size={14} color="var(--teal-ink)" /> 1. Imagen Destacada
                          </label>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setNewAnnImageUrl('varios/Mapa_de_las_dianas_terapeuticas.png');
                                if (!newAnnImageCaption) setNewAnnImageCaption('Mapa de Dianas Terapéuticas QFDOS');
                              }}
                              className="btn btn-sm btn-ghost"
                              style={{ fontSize: '0.66rem', padding: '1px 6px', color: 'var(--teal-ink)' }}
                              title="Usar imagen del Mapa de Dianas"
                            >
                              + Mapa Dianas
                            </button>
                            {newAnnImageUrl && (
                              <button
                                type="button"
                                onClick={() => setNewAnnImageUrl('')}
                                className="btn btn-sm btn-ghost"
                                style={{ fontSize: '0.66rem', padding: '1px 6px', color: 'var(--bad-ink)' }}
                              >
                                ✕ Quitar
                              </button>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '6px', marginBottom: '5px' }}>
                          <input
                            type="text"
                            placeholder="URL externa o ruta en public/ (ej: varios/...png)"
                            value={newAnnImageUrl}
                            onChange={e => setNewAnnImageUrl(e.target.value)}
                            className="form-input"
                            style={{ flex: 1, fontSize: '0.78rem' }}
                          />
                          <label className="btn btn-sm btn-outline" style={{ fontSize: '0.72rem', gap: '4px', cursor: 'pointer', whiteSpace: 'nowrap' }} title="Subir foto desde tu ordenador">
                            <Upload size={12} /> Subir PC
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>

                        <input
                          type="text"
                          placeholder="Pie de foto descriptivo..."
                          value={newAnnImageCaption}
                          onChange={e => setNewAnnImageCaption(e.target.value)}
                          className="form-input"
                          style={{ width: '100%', fontSize: '0.74rem' }}
                        />

                        {newAnnImageUrl && (
                          <div style={{ marginTop: '6px', textAlign: 'center' }}>
                            <img
                              src={newAnnImageUrl.startsWith('data:') || newAnnImageUrl.startsWith('http') ? newAnnImageUrl : `${import.meta.env.BASE_URL}${newAnnImageUrl}`}
                              alt="Vista previa"
                              style={{ maxHeight: '70px', borderRadius: '4px', objectFit: 'contain', border: '1px solid var(--border-color)' }}
                            />
                          </div>
                        )}
                      </div>

                      {/* 2. DOCUMENTO PDF */}
                      <div style={{ background: 'var(--surface-raised)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                          <label style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
                            <FileText size={14} color="var(--navy-ink)" /> 2. Documento PDF Adjunto
                          </label>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setNewAnnPdfUrl('varios/FDA_drug_approved_Q3_2026.pdf');
                                setNewAnnPdfName('Informe Oficial FDA Q3 2026');
                              }}
                              className="btn btn-sm btn-ghost"
                              style={{ fontSize: '0.66rem', padding: '1px 6px', color: 'var(--navy-ink)' }}
                            >
                              + FDA Q3
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setNewAnnPdfUrl('varios/The_evolving_landscape_of_drug_targets.pdf');
                                setNewAnnPdfName('The Evolving Landscape of Drug Targets');
                              }}
                              className="btn btn-sm btn-ghost"
                              style={{ fontSize: '0.66rem', padding: '1px 6px', color: 'var(--navy-ink)' }}
                            >
                              + Landscape
                            </button>
                            {newAnnPdfUrl && (
                              <button
                                type="button"
                                onClick={() => { setNewAnnPdfUrl(''); setNewAnnPdfName(''); }}
                                className="btn btn-sm btn-ghost"
                                style={{ fontSize: '0.66rem', padding: '1px 6px', color: 'var(--bad-ink)' }}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder="URL externa o ruta (ej: varios/FDA_drug_approved_Q3_2026.pdf)"
                          value={newAnnPdfUrl}
                          onChange={e => setNewAnnPdfUrl(e.target.value)}
                          className="form-input"
                          style={{ width: '100%', fontSize: '0.78rem', marginBottom: '5px' }}
                        />
                        <input
                          type="text"
                          placeholder="Nombre con el que verán el botón (ej: Informe FDA Q3 2026)"
                          value={newAnnPdfName}
                          onChange={e => setNewAnnPdfName(e.target.value)}
                          className="form-input"
                          style={{ width: '100%', fontSize: '0.74rem' }}
                        />
                      </div>

                      {/* 3. PÍLDORA DE AUDIO */}
                      <div style={{ background: 'var(--surface-raised)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                          <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
                            <Headphones size={14} color="#2563eb" /> 3. Píldora de Audio (MP3 / Podcast)
                          </label>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setNewAnnAudioUrl('audio/podcast_colinergicos.mp3');
                                setNewAnnAudioName('Píldora Docente: Colinérgicos (6 min)');
                              }}
                              className="btn btn-sm btn-ghost"
                              style={{ fontSize: '0.66rem', padding: '1px 6px', color: '#2563eb' }}
                            >
                              + Podcast T01
                            </button>
                            {newAnnAudioUrl && (
                              <button
                                type="button"
                                onClick={() => { setNewAnnAudioUrl(''); setNewAnnAudioName(''); }}
                                className="btn btn-sm btn-ghost"
                                style={{ fontSize: '0.66rem', padding: '1px 6px', color: 'var(--bad-ink)' }}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '6px', marginBottom: '5px' }}>
                          <input
                            type="text"
                            placeholder="Ruta en public/ (ej: audio/podcast_colinergicos.mp3) o URL"
                            value={newAnnAudioUrl}
                            onChange={e => setNewAnnAudioUrl(e.target.value)}
                            className="form-input"
                            style={{ flex: 1, fontSize: '0.78rem' }}
                          />
                          <label className="btn btn-sm btn-outline" style={{ fontSize: '0.72rem', gap: '4px', cursor: 'pointer', whiteSpace: 'nowrap' }} title="Subir audio desde tu ordenador">
                            <Upload size={12} /> Subir PC
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={handleAudioUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>

                        <input
                          type="text"
                          placeholder="Título del audio (ej: Píldora Docente: Colinérgicos)"
                          value={newAnnAudioName}
                          onChange={e => setNewAnnAudioName(e.target.value)}
                          className="form-input"
                          style={{ width: '100%', fontSize: '0.74rem' }}
                        />

                        {newAnnAudioUrl && (
                          <div style={{ marginTop: '6px' }}>
                            <audio
                              controls
                              src={newAnnAudioUrl.startsWith('data:') || newAnnAudioUrl.startsWith('http') ? newAnnAudioUrl : `${import.meta.env.BASE_URL}${newAnnAudioUrl}`}
                              style={{ width: '100%', height: '28px' }}
                              preload="none"
                            />
                          </div>
                        )}
                      </div>

                      {/* 4. VÍDEO Y ENLACE WEB */}
                      <div style={{ background: 'var(--surface-raised)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <label style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}>
                          <Film size={14} color="#8b5cf6" /> 4. Vídeo o Enlace Web Externo
                        </label>
                        <input
                          type="text"
                          placeholder="URL Vídeo (YouTube, Vimeo, etc.)"
                          value={newAnnVideoUrl}
                          onChange={e => setNewAnnVideoUrl(e.target.value)}
                          className="form-input"
                          style={{ width: '100%', fontSize: '0.78rem', marginBottom: '5px' }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4px' }}>
                          <input
                            type="text"
                            placeholder="URL enlace web"
                            value={newAnnLinkUrl}
                            onChange={e => setNewAnnLinkUrl(e.target.value)}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.74rem' }}
                          />
                          <input
                            type="text"
                            placeholder="Texto botón"
                            value={newAnnLinkLabel}
                            onChange={e => setNewAnnLinkLabel(e.target.value)}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.74rem' }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                    {editingAnnId && (
                      <button type="button" onClick={resetAnnouncementForm} className="btn btn-outline">
                        Cancelar
                      </button>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.4rem', fontWeight: 700 }}>
                      <Save size={16} /> {editingAnnId ? 'Guardar Cambios de la Noticia' : 'Publicar Noticia en el Portal'}
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Announcements */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  Noticias y Avisos Publicados ({announcements.length})
                </h5>

                {announcements.map(ann => (
                  <div 
                    key={ann.id} 
                    className="qfdos-card" 
                    style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '1rem 1.25rem',
                      borderLeft: ann.priority === 'alta' ? '4px solid #ef4444' : '4px solid var(--navy)'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0, marginRight: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-title)' }}>
                          {ann.title}
                        </h4>
                        <span className={`qfdos-badge ${ann.priority === 'alta' ? 'badge-amber' : 'badge-navy'}`} style={{ fontSize: '0.65rem' }}>
                          {ann.priority.toUpperCase()}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                        {ann.content}
                      </p>
                      
                      {/* Attached media indicators */}
                      {(ann.imageUrl || ann.pdfUrl || ann.audioUrl || ann.videoUrl || ann.linkUrl) && (
                        <div style={{ display: 'flex', gap: '6px', marginTop: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          {ann.imageUrl && (
                            <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                              📷 Imagen adjunta
                            </span>
                          )}
                          {ann.pdfUrl && (
                            <span className="qfdos-badge badge-navy" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                              📄 PDF: {ann.pdfName || 'Documento'}
                            </span>
                          )}
                          {ann.audioUrl && (
                            <span className="qfdos-badge" style={{ fontSize: '0.68rem', padding: '2px 8px', background: '#2563eb', color: '#fff' }}>
                              🎙️ Audio: {ann.audioName || 'Pista MP3'}
                            </span>
                          )}
                          {ann.videoUrl && (
                            <span className="qfdos-badge badge-purple" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                              🎥 Vídeo adjunto
                            </span>
                          )}
                          {ann.linkUrl && (
                            <span className="qfdos-badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                              🔗 {ann.linkLabel || 'Enlace'}
                            </span>
                          )}
                        </div>
                      )}

                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Publicado: {ann.date}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        onClick={() => handleStartEditAnnouncement(ann)}
                        className="btn btn-sm btn-outline"
                        title="Editar esta noticia o cambiar multimedia"
                      >
                        <Edit3 size={14} /> Editar
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="btn btn-sm btn-outline"
                        style={{ color: 'var(--bad-ink)', borderColor: 'rgba(239,68,68,0.3)' }}
                        title="Eliminar aviso"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB: Enlaces de Interés */}
          {activeTab === 'links' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>

              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Enlaces de interés
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, maxWidth: '70ch' }}>
                  Pega la dirección y escribe un resumen breve. El resumen es lo que de verdad
                  lee el alumnado: cuéntales por qué merece la pena y en qué fijarse, no lo que
                  ya dice el título.
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSaveLink} className="qfdos-card card-teal" style={{ padding: '1.25rem', gap: '11px' }}>
                <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  {editingLinkId ? 'Editar enlace' : 'Añadir enlace'}
                </h5>

                <input
                  type="text"
                  placeholder="https://www.nature.com/articles/..."
                  value={lnkUrl}
                  onChange={e => setLnkUrl(e.target.value)}
                  className="form-input"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
                  required
                />

                <input
                  type="text"
                  placeholder="Título con el que aparecerá en la sección"
                  value={lnkTitle}
                  onChange={e => setLnkTitle(e.target.value)}
                  className="form-input"
                  required
                />

                <textarea
                  placeholder="Resumen: qué van a encontrar y por qué importa. Dos o tres frases bastan."
                  value={lnkSummary}
                  onChange={e => setLnkSummary(e.target.value)}
                  className="form-input"
                  rows={3}
                  style={{ resize: 'vertical' }}
                  required
                />

                <div className="link-editor-row">
                  <div>
                    <label className="eyebrow" style={{ display: 'block', marginBottom: 4 }}>Categoría</label>
                    <select
                      value={lnkCategory}
                      onChange={e => setLnkCategory(e.target.value as ResourceCategory)}
                      className="form-select"
                      style={{ width: '100%' }}
                    >
                      {RESOURCE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="eyebrow" style={{ display: 'block', marginBottom: 4 }}>Fuente</label>
                    <input
                      type="text"
                      placeholder="Nature, EMA, OMS…"
                      value={lnkSource}
                      onChange={e => setLnkSource(e.target.value)}
                      className="form-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label className="eyebrow" style={{ display: 'block', marginBottom: 4 }}>Duración</label>
                    <input
                      type="text"
                      placeholder="15 min · Vídeo 8 min"
                      value={lnkDuration}
                      onChange={e => setLnkDuration(e.target.value)}
                      className="form-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label className="eyebrow" style={{ display: 'block', marginBottom: 4 }}>Módulo relacionado</label>
                    <select
                      value={lnkTopic}
                      onChange={e => setLnkTopic(e.target.value)}
                      className="form-select"
                      style={{ width: '100%' }}
                    >
                      <option value="">Ninguno</option>
                      {topics.map(t => <option key={t.id} value={t.number}>{t.number} — {t.title}</option>)}
                    </select>
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.82rem', color: 'var(--text-main)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={lnkFeatured}
                    onChange={e => setLnkFeatured(e.target.checked)}
                    style={{ width: 15, height: 15, accentColor: 'var(--teal)', cursor: 'pointer' }}
                  />
                  <Star size={13} color="var(--accent-amber)" />
                  Destacar: aparecerá el primero, marcado como recomendado
                </label>

                {lnkError && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: 7,
                    padding: '8px 11px', borderRadius: 'var(--radius-md)',
                    background: 'var(--semantic-bad-bg)', color: 'var(--accent-red)',
                    fontSize: '0.79rem', lineHeight: 1.5
                  }}>
                    <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>{lnkError}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  {editingLinkId && (
                    <button type="button" onClick={resetLinkForm} className="btn btn-outline">
                      Cancelar
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    {editingLinkId ? <><Save size={15} /> Guardar cambios</> : <><Plus size={15} /> Añadir enlace</>}
                  </button>
                </div>
              </form>

              {/* Listado */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  Publicados ({resourceLinks.length})
                </h5>

                {resourceLinks.length === 0 && (
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', padding: '1.5rem 0', textAlign: 'center' }}>
                    Todavía no hay enlaces. Añade el primero con el formulario de arriba.
                  </p>
                )}

                {resourceLinks.map(l => (
                  <div key={l.id} className="link-admin-item">
                    <Link2 size={16} color="var(--teal-ink)" style={{ flexShrink: 0, marginTop: 3 }} />

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)' }}>{l.title}</strong>
                        {l.featured && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                            <Star size={10} fill="currentColor" /> Destacado
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: '0.79rem', color: 'var(--text-main)', lineHeight: 1.5, margin: '3px 0' }}>
                        {l.summary}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        <span className="qfdos-badge badge-teal" style={{ fontSize: '0.62rem' }}>{l.category}</span>
                        {l.relatedTopic && <span>{l.relatedTopic}</span>}
                        {l.source && <span>{l.source}</span>}
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', display: 'inline-flex', alignItems: 'center', gap: 3 }}
                        >
                          Abrir <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                      <button onClick={() => handleStartEditLink(l)} className="icon-btn" title="Editar">
                        <Edit3 size={15} />
                      </button>
                      <button onClick={() => handleDeleteLink(l)} className="icon-btn icon-btn-danger" title="Eliminar">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Gestión de Fármacos & SMILES */}
          {activeTab === 'drugs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Acceso a Baraja Coleccionable Tema 1 */}
              {onOpenCartas && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(13, 148, 136, 0.12) 100%)',
                  border: '1.5px solid rgba(45, 212, 191, 0.45)',
                  borderRadius: 'var(--radius-lg, 12px)',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 12
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      background: 'var(--primary, #1e3a8a)',
                      color: 'var(--tertiary, #2dd4bf)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(30, 58, 138, 0.25)'
                    }}>
                      <Layers size={18} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-title)', display: 'block' }}>
                        Baraja Coleccionable de Fármacos · Tema 1 (15 Cartas)
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Material exclusivo del profesorado con escala docente comparativa de afinidad e índices SAR
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { onClose(); onOpenCartas(); }}
                    className="btn btn-sm btn-primary"
                    style={{ fontSize: '0.78rem', padding: '6px 14px', fontWeight: 700 }}
                  >
                    Abrir Baraja Docente
                  </button>
                </div>
              )}

              {/* Add Drug Form */}
              <div className="qfdos-card card-teal" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '10px' }}>
                  Añadir Fármaco a una Unidad Temática
                </h4>

                <form onSubmit={handleAddDrug} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, max(150px, calc(50% - 1rem))), 1fr))', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                        Unidad Temática de Destino
                      </label>
                      <select
                        value={selectedTopicForDrug}
                        onChange={e => setSelectedTopicForDrug(e.target.value)}
                        className="form-input"
                        style={{ width: '100%' }}
                      >
                        {topics.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.number}: {t.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                        Nombre del Fármaco / Principio Activo
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Donepezilo, Rivastigmina..."
                        value={newDrugName}
                        onChange={e => setNewDrugName(e.target.value)}
                        className="form-input"
                        style={{ width: '100%' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                        Estructura SMILES Canónica
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: CC(=O)Oc1ccccc1C(=O)O"
                        value={newDrugSmiles}
                        onChange={e => setNewDrugSmiles(e.target.value)}
                        className="form-input font-mono"
                        style={{ width: '100%' }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                        Rol / Mecanismo SAR
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Inhibidor reversible AChE"
                        value={newDrugRole}
                        onChange={e => setNewDrugRole(e.target.value)}
                        className="form-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, max(150px, calc(50% - 1rem))), 1fr))', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                        Peso Molecular (MW en Da)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={newDrugMw}
                        onChange={e => setNewDrugMw(Number(e.target.value))}
                        className="form-input"
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                        LogP Estimado
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={newDrugLogP}
                        onChange={e => setNewDrugLogP(Number(e.target.value))}
                        className="form-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-mint">
                      <Plus size={16} /> Guardar Fármaco en la Unidad
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Drugs per Topic */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  Fármacos Registrados en el Temario
                </h5>

                {topics.map(t => (
                  <div key={t.id} className="qfdos-card" style={{ padding: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="qfdos-badge badge-navy">{t.number}: {t.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.drugs.length} fármacos</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {t.drugs.map((d, dIdx) => (
                        <div
                          key={dIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'var(--surface-alt)',
                            padding: '4px 8px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.78rem'
                          }}
                        >
                          <strong>{d.name}</strong>
                          <span style={{ color: 'var(--text-muted)' }}>({d.role})</span>
                          <button
                            onClick={() => handleDeleteDrug(t.id, d.name)}
                            style={{ background: 'none', border: 'none', color: 'var(--bad-ink)', cursor: 'pointer', padding: '2px' }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: Dudas de Alumnos */}
          {activeTab === 'questions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>
                    Buzón de Preguntas y Tutorías Virtuales
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    Preguntas enviadas por los estudiantes desde el portal. Cada alumno ve sólo las suyas y, cuando responda, la respuesta aparecerá en su buzón.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={recargarDudas}
                  disabled={dudasCargando}
                  className="btn btn-sm btn-outline"
                  style={{ fontSize: '0.74rem' }}
                  title="Volver a leer las dudas del servidor"
                >
                  {dudasCargando ? 'Cargando…' : 'Recargar dudas'}
                </button>
              </div>

              {dudasAviso && (
                <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--accent-red)', fontSize: '0.82rem' }}>
                  {dudasAviso}
                </div>
              )}

              {dudasCargando && studentQuestions.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                  Cargando dudas…
                </div>
              ) : studentQuestions.length === 0 ? (
                <div style={{
                  padding: '30px',
                  textAlign: 'center',
                  background: 'var(--surface-alt)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed var(--border-color)',
                  color: 'var(--text-muted)',
                  fontSize: '0.86rem'
                }}>
                  No hay preguntas de alumnos en el buzón actualmente.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {studentQuestions.map(q => (
                    <div
                      key={q.id}
                      className="qfdos-card"
                      style={{
                        padding: '1.25rem',
                        borderLeft: q.estado === 'pendiente' ? '4px solid #f59e0b' : '4px solid #10b981'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className="qfdos-badge badge-teal" style={{ fontSize: '0.7rem' }}>
                          {q.temaTitulo || 'Tema General'}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className={`qfdos-badge ${q.estado === 'pendiente' ? 'badge-amber' : 'badge-emerald'}`} style={{ fontSize: '0.68rem' }}>
                            {q.estado.toUpperCase()}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteStudentQuestion(q.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '2px',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title="Eliminar esta consulta"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                        "{q.pregunta}"
                      </p>

                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                        Por: <strong>{q.nombre || q.correo}</strong> ({q.correo}) · {fechaDuda(q.recibidaEn)}
                      </div>

                      {/* Response display or response form */}
                      {q.respuesta ? (
                        <div style={{ background: 'var(--surface-alt)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                          <strong style={{ fontSize: '0.78rem', color: 'var(--navy-ink)', display: 'block', marginBottom: '3px' }}>
                            Respuesta del Profesor:
                          </strong>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                            <span style={{ whiteSpace: 'pre-wrap' }}>{q.respuesta}</span>
                          </p>
                        </div>
                      ) : respondingQId === q.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                          <textarea
                            placeholder="Escriba la respuesta oficial para el estudiante..."
                            value={responseText}
                            onChange={e => setResponseText(e.target.value)}
                            className="form-input"
                            rows={3}
                          />
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button onClick={() => setRespondingQId(null)} className="btn btn-sm btn-outline">
                              Cancelar
                            </button>
                            <button onClick={() => handleSendResponse(q.id)} disabled={enviandoRespuesta} className="btn btn-sm btn-primary">
                              <Send size={13} /> {enviandoRespuesta ? 'Guardando…' : 'Enviar Respuesta Oficial'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setRespondingQId(q.id); setResponseText(''); }}
                          className="btn btn-sm btn-outline"
                          style={{ alignSelf: 'flex-start' }}
                        >
                          <MessageSquare size={13} /> Responder Duda
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 5: Clave API Gemini */}
          {activeTab === 'apikey' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="qfdos-card card-mint" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '6px' }}>
                  Configuración de Google Gemini AI (UGR Classroom)
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Introduzca su clave API de <strong>Google Gemini</strong> para habilitar las funciones de generación de apuntes oficiales de clase, creación de preguntas tipo test razonadas y respuesta asistida para tutorías docentes.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    Google AI Studio / Gemini API Key
                  </label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    className="form-input font-mono"
                    style={{ fontSize: '0.9rem' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      La clave se almacena de forma segura y local en su navegador web.
                    </span>
                    <button onClick={handleSaveApiKey} className="btn btn-mint">
                      {apiKeySaved ? <><CheckCircle2 size={16} /> Clave Guardada</> : <><Save size={16} /> Guardar Clave API</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">
            Cerrar Panel CMS
          </button>
        </div>

      </div>
    </div>
  );
};
