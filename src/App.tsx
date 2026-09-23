import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  QFDOS_INFO,
  COURSE_DATA_VERSION,
  INITIAL_TOPICS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_GLOSSARY,
  INITIAL_RESOURCE_LINKS,
  INITIAL_STUDENT_QUESTIONS,
  QfdosTopic,
  QfdosAnnouncement,
  QfdosGlossaryTerm,
  QfdosResourceLink,
  StudentQuestion,
  CourseAttachment,
  TestQuestion,
  MoleculeDrug
} from './data/qfdosData';
import { useAuth } from './context/AuthContext';
import { descargarContenido, contenidoEnCache, normalizarTemas } from './services/contenidoRemoto';
import { ExternalLink } from 'lucide-react';

import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HubDashboard } from './components/HubDashboard';
import { TemasSection } from './components/TemasSection';
import { TopicDetailModal } from './components/TopicDetailModal';
import { AffinitySimulator } from './components/AffinitySimulator';
import { AdmetCalculator } from './components/AdmetCalculator';
import { GlossarySection } from './components/GlossarySection';
import { ResourceLinksSection } from './components/ResourceLinksSection';
import { EvaluationSection } from './components/EvaluationSection';
import { PracticasSection } from './components/practicas/PracticasSection';
import { CourseInfoSection } from './components/CourseInfoSection';

import { QuizModal } from './components/QuizModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { StudentQuestionModal } from './components/StudentQuestionModal';
import { SpotifyPlayerModal } from './components/SpotifyPlayerModal';
import { SearchModal } from './components/SearchModal';
import { DrugSearchModal } from './components/DrugSearchModal';
import { ExamGeneratorModal } from './components/ExamGeneratorModal';
import { FirSimulatorModal } from './components/FirSimulatorModal';
import { AdminCmsModal } from './components/AdminCmsModal';
import { Model3DViewerModal } from './components/Model3DViewerModal';

const VERSION_KEY = 'qfdos_v3_data_version';

/**
 * Contenido que viaja con la aplicación. Se regenera desde el fichero de datos
 * cuando cambia COURSE_DATA_VERSION, porque una corrección de contenido (por
 * ejemplo, una estructura química errónea) tiene que llegar a todo el mundo.
 */
const SHIPPED_KEYS = [
  'qfdos_v3_topics',
  'qfdos_v3_announcements',
  'qfdos_v3_glossary',
  'qfdos_v3_contenido_remoto',
  'qfdos_v3_links'
];

/**
 * Contenido que escribe el profesorado desde el CMS y que no existe en ningún
 * otro sitio: enlaces de interés y dudas del alumnado. Nunca se purga — se
 * sembró una vez con los ejemplos iniciales y a partir de ahí manda el usuario.
 */
function purgeStaleCourseCache(): void {
  const stored = localStorage.getItem(VERSION_KEY);
  if (stored === COURSE_DATA_VERSION) return;

  // Preservar enlaces y modificaciones locales introducidas por el profesor
  const oldTopicsStr = localStorage.getItem('qfdos_v3_topics');
  const customTopicOverrides: Record<string, Partial<QfdosTopic>> = {};
  if (oldTopicsStr) {
    try {
      const parsed = JSON.parse(oldTopicsStr) as QfdosTopic[];
      parsed.forEach(t => {
        if (t.notesPdfUrl || t.slidesPdfUrl || t.spotifyPodcastUrl || (t.geminiNotebookUrl && t.geminiNotebookUrl !== INITIAL_TOPICS[0]?.geminiNotebookUrl)) {
          customTopicOverrides[t.id] = {
            notesPdfUrl: t.notesPdfUrl,
            notesPdfName: t.notesPdfName,
            slidesPdfUrl: t.slidesPdfUrl,
            slidesPdfName: t.slidesPdfName,
            geminiNotebookUrl: t.geminiNotebookUrl,
            spotifyPodcastUrl: t.spotifyPodcastUrl,
            videoPodcastUrl: t.videoPodcastUrl
          };
        }
      });
    } catch { /* ignorar dato corrupto */ }
  }

  SHIPPED_KEYS.forEach(k => localStorage.removeItem(k));
  localStorage.setItem(VERSION_KEY, COURSE_DATA_VERSION);

  if (Object.keys(customTopicOverrides).length > 0) {
    const updated = INITIAL_TOPICS.map(t => {
      const over = customTopicOverrides[t.id];
      return over ? { ...t, ...over } : t;
    });
    localStorage.setItem('qfdos_v3_topics', JSON.stringify(updated));
  }
}

/** Lee del navegador y, si no hay nada válido, cae al contenido distribuido. */
function loadCached<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key);
  if (saved) {
    try { return JSON.parse(saved) as T; } catch { /* dato corrupto: se ignora */ }
  }
  return fallback;
}

/**
 * Igual que loadCached, pero para contenido propio del usuario: siembra los
 * ejemplos sólo la primera vez. Si el usuario los borró todos, respeta la
 * lista vacía en lugar de resucitarlos en la siguiente carga.
 */
function loadUserOwned<T>(key: string, seed: T): T {
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    try { return JSON.parse(saved) as T; } catch { /* dato corrupto: se resiembra */ }
  }
  return seed;
}

/** Ponderación oficial de la evaluación continua del Grupo E. */
const PONDERACION = [
  { pct: 70, tone: 'primary', label: 'Examen final oficial', note: 'Obligatorio · mínimo 5,0' },
  { pct: 20, tone: 'second',  label: 'Examen parcial',       note: 'No eliminatorio' },
  { pct:  5, tone: 'minor',   label: 'Prácticas de laboratorio', note: 'Obligatorio' },
  { pct:  5, tone: 'minor',   label: 'Trabajos y seminarios', note: '' },
] as const;

export type TabType = 'hub' | 'info' | 'temas' | 'practicas' | 'simulador' | 'admet' | 'glosario' | 'enlaces' | 'evaluacion';

const TAB_TO_HASH: Record<TabType, string> = {
  hub: 'hub',
  info: 'curso',
  temas: 'temario',
  practicas: 'practicas',
  simulador: 'simulador',
  admet: 'admet',
  glosario: 'glosario',
  enlaces: 'enlaces',
  evaluacion: 'evaluacion'
};

const HASH_TO_TAB: Record<string, TabType> = {
  '': 'hub',
  hub: 'hub',
  inicio: 'hub',
  curso: 'info',
  info: 'info',
  horarios: 'info',
  temario: 'temas',
  temas: 'temas',
  practicas: 'practicas',
  laboratorio: 'practicas',
  simulador: 'simulador',
  afinidad: 'simulador',
  admet: 'admet',
  glosario: 'glosario',
  enlaces: 'enlaces',
  evaluacion: 'evaluacion',
  '3d': 'temas',
  'nachr-3d': 'temas',
  'modelo-3d': 'temas'
};

function parseUrlHash(): { tab: TabType; sub?: string; action?: string } {
  try {
    const raw = window.location.hash.replace(/^#\/?/, '').trim();
    if (!raw) return { tab: 'hub' };
    const [main, sub, action] = raw.split('/');
    const tab = HASH_TO_TAB[main.toLowerCase()] || 'hub';
    return { tab, sub, action };
  } catch {
    return { tab: 'hub' };
  }
}

function trackPageView(hash: string) {
  if (typeof (window as any).gtag === 'function') {
    try {
      (window as any).gtag('event', 'page_view', {
        page_path: hash,
        page_location: window.location.href,
        page_title: document.title
      });
    } catch {
      // analytics fail-safe
    }
  }
}

export const App: React.FC = () => {
  const { isAuthenticated, isProfesor } = useAuth();

  const initialRoute = useMemo(() => parseUrlHash(), []);
  const [activeTab, setActiveTab] = useState<TabType>(initialRoute.tab);
  const [practicasSubTab, setPracticasSubTab] = useState<string | undefined>(initialRoute.sub);

  const navigateTo = useCallback((tab: TabType, subRoute?: string, replace = false) => {
    setActiveTab(tab);
    if (tab === 'practicas') {
      setPracticasSubTab(subRoute);
    }
    const hashPrefix = TAB_TO_HASH[tab] || 'hub';
    const targetHash = subRoute ? `#/${hashPrefix}/${subRoute}` : `#/${hashPrefix}`;
    if (window.location.hash !== targetHash) {
      if (replace) {
        window.history.replaceState({ tab, subRoute }, '', targetHash);
      } else {
        window.history.pushState({ tab, subRoute }, '', targetHash);
      }
    }
    trackPageView(targetHash);
  }, []);

  // Se ejecuta antes que cualquier lectura de caché de abajo
  const [topics, setTopics] = useState<QfdosTopic[]>(() => {
    purgeStaleCourseCache();
    const raw = contenidoEnCache()?.topics ?? loadCached('qfdos_v3_topics', INITIAL_TOPICS);
    const normalized = normalizarTemas(raw);
    // Auto-heal Tema 1 para garantizar que siempre tenga las 15 preguntas y las 10 flashcards canónicas
    const t1 = normalized.find(t => t.id === 'tema-01');
    const base1 = INITIAL_TOPICS.find(t => t.id === 'tema-01') || INITIAL_TOPICS[1];
    if (t1) {
      let modified = false;
      if (!t1.testQuestions || t1.testQuestions.length !== 15) {
        t1.testQuestions = base1.testQuestions;
        modified = true;
      }
      if (!t1.flashcards || t1.flashcards.length !== 10 || t1.flashcards[0]?.front !== base1.flashcards?.[0]?.front) {
        t1.flashcards = base1.flashcards;
        modified = true;
      }
      if (modified) {
        localStorage.setItem('qfdos_v3_topics', JSON.stringify(normalized));
      }
    }
    return normalized;
  });

  const [announcements, setAnnouncements] = useState<QfdosAnnouncement[]>(() =>
    contenidoEnCache()?.announcements ?? loadCached('qfdos_v3_announcements', INITIAL_ANNOUNCEMENTS)
  );

  const [glossary, setGlossary] = useState<QfdosGlossaryTerm[]>(() =>
    contenidoEnCache()?.glossary ?? loadCached('qfdos_v3_glossary', INITIAL_GLOSSARY)
  );

  const [resourceLinks, setResourceLinks] = useState<QfdosResourceLink[]>(() =>
    contenidoEnCache()?.resourceLinks ?? loadCached('qfdos_v3_links', INITIAL_RESOURCE_LINKS)
  );

  const [studentQuestions, setStudentQuestions] = useState<StudentQuestion[]>(() =>
    loadUserOwned('qfdos_v3_student_questions', INITIAL_STUDENT_QUESTIONS)
  );

  // Modal states
  const [selectedTopicDetail, setSelectedTopicDetail] = useState<QfdosTopic | null>(null);
  const [topicInitialTab, setTopicInitialTab] = useState<'sar' | 'materials' | 'drugs' | 'retrosintesis' | undefined>();
  const [selectedQuizTopic, setSelectedQuizTopic] = useState<QfdosTopic | null>(null);
  const [selectedFlashcardsTopic, setSelectedFlashcardsTopic] = useState<QfdosTopic | null>(null);
  const [selectedSpotifyAttachment, setSelectedSpotifyAttachment] = useState<CourseAttachment | null>(null);
  const [selectedAdmetDrug, setSelectedAdmetDrug] = useState<MoleculeDrug | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrugSearchOpen, setIsDrugSearchOpen] = useState(false);
  const [isExamGeneratorOpen, setIsExamGeneratorOpen] = useState(false);
  const [isFirModalOpen, setIsFirModalOpen] = useState(false);
  const [isStudentQuestionOpen, setIsStudentQuestionOpen] = useState(false);
  const [isAdminCmsOpen, setIsAdminCmsOpen] = useState(false);
  const [isDirect3DModalOpen, setIsDirect3DModalOpen] = useState(false);
  const [publicadoEn, setPublicadoEn] = useState<string>(contenidoEnCache()?.publicadoEn ?? '');

  const handleOpenAdmet = (drug: MoleculeDrug) => {
    setSelectedAdmetDrug(drug);
    navigateTo('admet');
  };

  // Persist data
  useEffect(() => { localStorage.setItem('qfdos_v3_topics', JSON.stringify(topics)); }, [topics]);
  useEffect(() => { localStorage.setItem('qfdos_v3_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('qfdos_v3_glossary', JSON.stringify(glossary)); }, [glossary]);
  useEffect(() => {
    if (isProfesor) {
      localStorage.setItem('qfdos_v3_links', JSON.stringify(resourceLinks));
    }
  }, [resourceLinks, isProfesor]);
  useEffect(() => { localStorage.setItem('qfdos_v3_student_questions', JSON.stringify(studentQuestions)); }, [studentQuestions]);

  /**
   * Trae el contenido que el profesor haya publicado.
   *
   * Se hace en cada arranque y sin bloquear la interfaz: la aplicación ya se
   * ha pintado con la última copia conocida, y si hay algo más reciente en la
   * hoja se sustituye. Así los cambios del profesor llegan a todo el mundo, en
   * lugar de quedarse en su navegador.
   */
  useEffect(() => {
    let cancelado = false;

    descargarContenido().then(remoto => {
      if (cancelado || !remoto) return;
      if (Array.isArray(remoto.topics) && remoto.topics.length) {
        setTopics(normalizarTemas(remoto.topics));
      }
      if (Array.isArray(remoto.announcements)) setAnnouncements(remoto.announcements);
      if (Array.isArray(remoto.glossary)) setGlossary(remoto.glossary);
      if (Array.isArray(remoto.resourceLinks)) setResourceLinks(remoto.resourceLinks);
      setPublicadoEn(remoto.publicadoEn || '');
    });

    return () => { cancelado = true; };
  }, []);

  // Ctrl+K search shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleQuestionsAddedToTopic = (topicId: string, newQuestions: TestQuestion[]) => {
    setTopics(prev => prev.map(t =>
      t.id === topicId ? { ...t, testQuestions: [...(t.testQuestions || []), ...newQuestions] } : t
    ));
  };

  // Sincronización bidireccional con el historial del navegador (Back / Forward)
  useEffect(() => {
    const handleHashSync = () => {
      const { tab, sub, action } = parseUrlHash();
      const raw = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
      if (raw === 'fir' || raw === 'simulador-fir') {
        setIsFirModalOpen(true);
      }
      if (raw === '3d' || raw === 'nachr-3d' || raw === 'modelo-3d' || action === '3d' || sub === '3d') {
        setIsDirect3DModalOpen(true);
        const tema1 = topics.find(t => t.id === 'tema-01');
        if (tema1) setSelectedTopicDetail(tema1);
      } else {
        setIsDirect3DModalOpen(false);
      }
      setActiveTab(tab);
      if (tab === 'practicas') {
        setPracticasSubTab(sub);
      } else if (tab === 'temas') {
        if (sub && sub !== '3d') {
          const topic = topics.find(t => t.id === sub);
          if (topic) setSelectedTopicDetail(topic);
        } else if (!sub) {
          setSelectedTopicDetail(null);
        }
      }
      // Cerrar modales abiertos si el usuario pulsó Atrás
      setIsSearchOpen(false);
      setIsDrugSearchOpen(false);
      setIsExamGeneratorOpen(false);
      if (raw !== 'fir' && raw !== 'simulador-fir') {
        setIsFirModalOpen(false);
      }
      setIsStudentQuestionOpen(false);
      setSelectedQuizTopic(null);
      setSelectedFlashcardsTopic(null);
      setSelectedSpotifyAttachment(null);
      trackPageView(window.location.hash || '#/hub');
    };

    if (!window.location.hash) {
      window.history.replaceState({ tab: 'hub' }, '', '#/hub');
    } else {
      handleHashSync();
    }

    window.addEventListener('popstate', handleHashSync);
    window.addEventListener('hashchange', handleHashSync);

    return () => {
      window.removeEventListener('popstate', handleHashSync);
      window.removeEventListener('hashchange', handleHashSync);
    };
  }, [topics]);

  // Gate: show login if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Header
        activeTab={activeTab}
        setActiveTab={(tab: any) => navigateTo(tab)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenExamGenerator={() => setIsExamGeneratorOpen(true)}
        onOpenFirSimulator={() => setIsFirModalOpen(true)}
        onOpenStudentQuestion={() => setIsStudentQuestionOpen(true)}
        onOpenAdminCms={() => setIsAdminCmsOpen(true)}
      />

      {activeTab === 'hub' && (
        <Hero
          onNavigateToTemas={() => navigateTo('temas')}
          onNavigateToSimulador={() => navigateTo('simulador')}
          onOpenDrugSearch={() => setIsDrugSearchOpen(true)}
          onOpenFirSimulator={() => setIsFirModalOpen(true)}
        />
      )}

      <main style={{ flex: 1 }}>
        {activeTab === 'hub' && (
          <HubDashboard
            topics={topics}
            announcements={announcements}
            onSelectTopic={topic => { setSelectedTopicDetail(topic); navigateTo('temas', topic.id); }}
            onNavigateToCourseInfo={() => navigateTo('info')}
            onNavigateToTemas={() => navigateTo('temas')}
            onNavigateToSimulador={() => navigateTo('simulador')}
            onNavigateToAdmet={() => navigateTo('admet')}
            onNavigateToPracticas={() => navigateTo('practicas')}
            onOpenExamGenerator={() => setIsExamGeneratorOpen(true)}
            onOpenAdminCms={() => setIsAdminCmsOpen(true)}
            onOpenFirSimulator={() => setIsFirModalOpen(true)}
            onOpenTema1Exam={() => {
              const tema1 = topics.find(t => t.id === 'tema-01');
              if (tema1) setSelectedQuizTopic(tema1);
            }}
          />
        )}
        {activeTab === 'info' && <CourseInfoSection />}
        {activeTab === 'temas' && (
          <TemasSection
            topics={topics}
            onSelectTopic={(topic, tab) => { 
              setTopicInitialTab(tab);
              setSelectedTopicDetail(topic); 
              navigateTo('temas', topic.id); 
            }}
            onOpenQuiz={setSelectedQuizTopic}
            onOpenFlashcards={setSelectedFlashcardsTopic}
          />
        )}
        {activeTab === 'practicas' && (
          <PracticasSection
            currentSubTab={practicasSubTab}
            onSubTabChange={sub => navigateTo('practicas', sub)}
          />
        )}
        {activeTab === 'simulador' && <AffinitySimulator />}
        {activeTab === 'admet' && <AdmetCalculator initialDrug={selectedAdmetDrug} />}
        {activeTab === 'glosario' && <GlossarySection glossary={glossary} />}
        {activeTab === 'enlaces' && (
          <ResourceLinksSection
            links={resourceLinks}
            onOpenAdminCms={() => setIsAdminCmsOpen(true)}
          />
        )}
        {activeTab === 'evaluacion' && (
          <EvaluationSection 
            onOpenFirSimulator={() => setIsFirModalOpen(true)} 
          />
        )}
      </main>

      {/* Modals */}
      {selectedTopicDetail && (
        <TopicDetailModal
          topic={selectedTopicDetail}
          initialTab={topicInitialTab}
          onClose={() => {
            setSelectedTopicDetail(null);
            setTopicInitialTab(undefined);
            if (window.location.hash.includes('tema-')) {
              navigateTo('temas', undefined, true);
            }
          }}
          onUpdateTopic={updatedTopic => {
            setTopics(prev => prev.map(t => t.id === updatedTopic.id ? updatedTopic : t));
            setSelectedTopicDetail(updatedTopic);
          }}
          onOpenQuiz={t => { setSelectedTopicDetail(null); setSelectedQuizTopic(t); }}
          onOpenFlashcards={t => { setSelectedTopicDetail(null); setSelectedFlashcardsTopic(t); }}
          onOpenSpotifyPlayer={att => setSelectedSpotifyAttachment(att)}
          onOpenAdmet={handleOpenAdmet}
        />
      )}
      {selectedQuizTopic && (
        <QuizModal topic={selectedQuizTopic} onClose={() => setSelectedQuizTopic(null)} />
      )}
      {selectedFlashcardsTopic && (
        <FlashcardsModal topic={selectedFlashcardsTopic} onClose={() => setSelectedFlashcardsTopic(null)} />
      )}
      {selectedSpotifyAttachment && (
        <SpotifyPlayerModal attachment={selectedSpotifyAttachment} onClose={() => setSelectedSpotifyAttachment(null)} />
      )}
      {isDirect3DModalOpen && (
        <Model3DViewerModal
          onClose={() => {
            setIsDirect3DModalOpen(false);
            if (window.location.hash.includes('3d') || window.location.hash.includes('nachr') || window.location.hash.includes('modelo')) {
              window.history.pushState(null, '', '#/temario/tema-01');
            }
          }}
          modelTitle="Receptor Nicotínico de Acetilcolina (nAChR)"
        />
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        topics={topics}
        glossary={glossary}
        onSelectTopic={topic => { setSelectedTopicDetail(topic); navigateTo('temas', topic.id); }}
        onNavigateToTab={(tab: any) => navigateTo(tab)}
        onOpenNotesGenerator={() => {}}
        onOpenExamGenerator={() => setIsExamGeneratorOpen(true)}
        onOpenDrugSearch={() => setIsDrugSearchOpen(true)}
        onOpenAdmet={handleOpenAdmet}
      />

      <DrugSearchModal
        isOpen={isDrugSearchOpen}
        onClose={() => setIsDrugSearchOpen(false)}
        topics={topics}
        onSelectTopic={topic => { setSelectedTopicDetail(topic); navigateTo('temas', topic.id); }}
        onNavigateToTab={(tab: any) => navigateTo(tab)}
        onOpenAdmet={handleOpenAdmet}
      />

      {isProfesor && isExamGeneratorOpen && (
        <ExamGeneratorModal
          topics={topics}
          onClose={() => setIsExamGeneratorOpen(false)}
          onQuestionsAddedToTopic={handleQuestionsAddedToTopic}
        />
      )}
      <FirSimulatorModal
        isOpen={isFirModalOpen}
        onClose={() => {
          setIsFirModalOpen(false);
          if (window.location.hash.includes('fir')) {
            window.history.pushState(null, '', '#/hub');
          }
        }}
      />
      {isStudentQuestionOpen && (
        <StudentQuestionModal topics={topics} onClose={() => setIsStudentQuestionOpen(false)} />
      )}
      {/* Admin CMS: only accessible to professor */}
      {isAdminCmsOpen && isProfesor && (
        <AdminCmsModal
          topics={topics}
          announcements={announcements}
          glossary={glossary}
          resourceLinks={resourceLinks}
          studentQuestions={studentQuestions}
          onClose={() => setIsAdminCmsOpen(false)}
          onUpdateTopics={setTopics}
          onUpdateAnnouncements={setAnnouncements}
          onUpdateGlossary={setGlossary}
          onUpdateResourceLinks={setResourceLinks}
          publicadoEn={publicadoEn}
          onPublicado={(cuando: string) => setPublicadoEn(cuando)}
          onUpdateStudentQuestions={setStudentQuestions}
        />
      )}

      {/* Footer QFDOS UGR */}
      <footer className="qfdos-footer-root">
        <div className="container">
          <div className="qfdos-footer-grid">
            {/* Columna 1: Asignatura y Cátedra */}
            <div className="qfdos-footer-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="brand-title" style={{ fontSize: '1.1rem' }}>QFDOS</span>
                <span className="qfdos-badge badge-nowrap" style={{ fontSize: '0.62rem' }}>2026/2027</span>
                <span className="qfdos-badge badge-neutral badge-nowrap" style={{ fontSize: '0.62rem' }}>Grupo E</span>
              </div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 6px 0' }}>
                {QFDOS_INFO.name} ({QFDOS_INFO.code})
              </h4>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
                {QFDOS_INFO.department}<br />
                {QFDOS_INFO.faculty} · {QFDOS_INFO.institution}<br />
                Campus Universitario de Cartuja · Granada (España)
              </p>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <span className="qfdos-badge" style={{ fontSize: '0.66rem' }}>
                    QFDOS Structural Affinity v2.0
                  </span>
                </div>
                {/* NEXUS.LAB Developer Badge Card */}
                <a
                  href="https://nexus-lab-team.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ftr-nexus-card"
                  title="Visitar NEXUS.LAB — Ingeniería Digital & Ciencia Aplicada"
                >
                  <div className="ftr-nexus-icon-box">
                    <svg className="ftr-nexus-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                  </div>
                  <div className="ftr-nexus-info">
                    <span className="ftr-nexus-eyebrow">Desarrollado por</span>
                    <span className="ftr-nexus-title">NEXUS<span className="ftr-nexus-dot">.LAB</span></span>
                    <span className="ftr-nexus-sub">Ingeniería Digital & Ciencia Aplicada</span>
                  </div>
                  <ExternalLink size={14} className="ftr-nexus-arrow" />
                </a>
              </div>
            </div>

            {/* Columna 2: Profesorado Responsable & Coordinación */}
            <div className="qfdos-footer-col">
              <h5 className="qfdos-footer-heading">Profesorado y coordinación</h5>
              <div className="ftr-person">
                <div className="ftr-person-name">Dr. Juan José Díaz-Mochón</div>
                <div className="ftr-person-role">Profesor Titular · Responsable del Grupo E</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a className="ftr-person-mail" href="mailto:juandiaz@go.ugr.es">juandiaz@go.ugr.es</a>
                  <span style={{ opacity: 0.5, color: 'var(--text-muted)' }}>·</span>
                  <a className="ftr-person-mail" href="mailto:juandiaz@ugr.es">juandiaz@ugr.es</a>
                </div>
              </div>
              <div className="ftr-person" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="ftr-person-name">Dra. Ana Sousa</div>
                <div className="ftr-person-role">Coordinadora de Prácticas · Gestión de Incidencias</div>
                <a className="ftr-person-mail" href="mailto:ana.sousa@ugr.es">ana.sousa@ugr.es</a>
              </div>
              <p style={{ fontSize: '0.74rem', lineHeight: 1.5, margin: '6px 0 0' }}>
                Tutorías de teoría en Farmacia (Cartuja), GENYO (PTS) o Meet. Incidencias de laboratorio a través de Coordinación de Prácticas.
              </p>
            </div>

            {/* Columna 3: Ponderación Oficial de Evaluación.
                La barra reaparece aquí con el mismo gesto que la regla de
                ocupación de la cabecera: un solo carril, segmentos por peso. */}
            <div className="qfdos-footer-col">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h5 className="qfdos-footer-heading" style={{ margin: 0 }}>Evaluación continua (UGR)</h5>
                <span className="ftr-eval-pct">100 %</span>
              </div>
              <div
                className="ftr-affinity"
                role="img"
                aria-label="Ponderación: examen final 70 %, examen parcial 20 %, prácticas 5 %, trabajos 5 %"
              >
                {PONDERACION.map(s => (
                  <span key={s.label} className={`ftr-affinity-seg is-${s.tone}`} style={{ width: `${s.pct}%` }} />
                ))}
              </div>
              {PONDERACION.map(s => (
                <div key={s.label} className={`ftr-eval-row is-${s.tone}`}>
                  <span className={`ftr-eval-key is-${s.tone}`} aria-hidden="true" />
                  <span className="ftr-eval-label">
                    {s.label}
                    {s.note && <span className="ftr-eval-note">{s.note}</span>}
                  </span>
                  <span className="ftr-eval-pct">{s.pct} %</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subfooter de copyright y acceso institucional */}
          <div className="qfdos-footer-sub">
            <div>
              Universidad de Granada (UGR) · Grado en Farmacia · Asignatura: Química Farmacéutica II (Grupo E) · Desarrollada por{' '}
              <a
                href="https://nexus-lab-team.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="nexus-footer-inline-link"
              >
                <strong>NEXUS.LAB</strong>
              </a>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span>Acceso: @go.ugr.es / @gmail.com</span>
              <span>•</span>
              <a
                href="https://nexus-lab-team.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="nexus-footer-inline-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Desarrollado por <strong>NEXUS.LAB</strong></span>
                <ExternalLink size={11} />
              </a>
              <span>•</span>
              <span>Plataforma QFDOS v3.2</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
