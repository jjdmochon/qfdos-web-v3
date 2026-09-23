import React, { useState, useEffect, useMemo } from 'react';
import { 
  QfdosTopic, 
  TestQuestion, 
  QuizAttempt, 
  QuizAnswerDetail, 
  QuizRegistrationRecord,
  RETROSINTESIS_TEST_QUESTIONS,
  MODELO_E_TEST_QUESTIONS,
  MODELO_FIR_TEST_QUESTIONS,
  MODELO_A_TEST_QUESTIONS,
  MODELO_B_TEST_QUESTIONS,
  MODELO_C_TEST_QUESTIONS
} from '../data/qfdosData';
import {
  submitAttemptToGoogleSheets,
  getGoogleSheetsUrl,
  setGoogleSheetsUrl,
  GOOGLE_APPS_SCRIPT_TEMPLATE,
  GoogleSheetsSubmissionResult,
  misCalificaciones
} from '../services/googleSheetsService';
import { useAuth } from '../context/AuthContext';
import { Chem2DDrawer } from './Chem2DDrawer';
import { ImageLightboxModal, LightboxImagePayload } from './ImageLightboxModal';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Award,
  BookOpen,
  Maximize2,
  UserCheck,
  User,
  Download,
  Trash2,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  BarChart3,
  UserPlus,
  Printer,
  Settings,
  Copy,
  Check,
  ExternalLink,
  Sheet,
  Send,
  History
} from 'lucide-react';

const REGISTRATION_STORAGE_KEY = 'qfdos_test_registration_records';
const LEGACY_STORAGE_KEY = 'qfdos_v2_quiz_attempts';

interface QuizModalProps {
  topic: QfdosTopic;
  onClose: () => void;
  onAttemptCompleted?: (attempt: QuizAttempt) => void;
}

export type QuizModelType = 'modelo-e' | 'modelo-fir' | 'modelo-a' | 'modelo-b' | 'modelo-c' | 'retrosintesis';

export const QuizModal: React.FC<QuizModalProps> = ({
  topic,
  onClose,
  onAttemptCompleted
}) => {
  const { user, isProfesor } = useAuth();

  // Model Selection State (Modelo E es el examen oficial 2026/27 sin retrosíntesis del Tema 1)
  const [selectedModel, setSelectedModel] = useState<QuizModelType>('modelo-e');

  /**
   * Modo examen.
   *
   * El alumno responde sin ver la correccion ni la explicacion, navega libremente
   * entre preguntas y entrega cuando quiera. El profesor puede desactivarlo para
   * usar el mismo banco en modo estudio, con correccion pregunta a pregunta.
   */
  const [examMode, setExamMode] = useState<boolean>(true);
  const isExamMode = examMode;

  // Compute active question bank dynamically (E, FIR y A para alumnado; B, C y Retrosíntesis exclusivos para docente)
  const questions: TestQuestion[] = useMemo(() => {
    const isTema1 = topic.id === 'tema-01' || topic.number === 'Tema 01' || (topic.title && topic.title.toLowerCase().includes('acetilcolina'));
    if (isTema1) {
      if (selectedModel === 'modelo-fir') return MODELO_FIR_TEST_QUESTIONS;
      if (selectedModel === 'modelo-a') return MODELO_A_TEST_QUESTIONS;
      if (isProfesor) {
        if (selectedModel === 'modelo-b') return MODELO_B_TEST_QUESTIONS;
        if (selectedModel === 'modelo-c') return MODELO_C_TEST_QUESTIONS;
        if (selectedModel === 'retrosintesis') return RETROSINTESIS_TEST_QUESTIONS;
      }
      return MODELO_E_TEST_QUESTIONS;
    }
    return topic.testQuestions && topic.testQuestions.length > 0 ? topic.testQuestions : MODELO_E_TEST_QUESTIONS;
  }, [topic, selectedModel, isProfesor]);

  // Tab State
  const [activeTab, setActiveTab] = useState<'quiz' | 'records'>('quiz');

  // Registration State
  const [evaluationMode, setEvaluationMode] = useState<'docente_sesion' | 'alumno_evaluado'>(
    isProfesor ? 'docente_sesion' : 'alumno_evaluado'
  );
  const [studentName, setStudentName] = useState<string>(
    user?.name ? user.name : (isProfesor ? 'Prof. Juan José Díaz-Mochón' : '')
  );
  const [studentEmail, setStudentEmail] = useState<string>(
    user?.email ? user.email : (isProfesor ? 'jjdiaz@ugr.es' : '')
  );
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // Quiz Navigation State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<LightboxImagePayload | null>(null);

  // Records / Grading Dashboard State
  // Google Sheets Integration State
  const [sheetSubmitStatus, setSheetSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'sent_unconfirmed' | 'no_url' | 'network_error'>('idle');
  const [showSheetsConfig, setShowSheetsConfig] = useState<boolean>(false);
  const [sheetsUrlInput, setSheetsUrlInput] = useState<string>(getGoogleSheetsUrl());
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [urlSaveSuccess, setUrlSaveSuccess] = useState<boolean>(false);

  const [records, setRecords] = useState<QuizRegistrationRecord[]>([]);
  const [estadoHistorial, setEstadoHistorial] =
    useState<'local' | 'cargando' | 'sincronizado' | 'sin_conexion'>('local');
  const [recordsFilterTopic, setRecordsFilterTopic] = useState<'current' | 'all'>('current');
  const [recordsSearchQuery, setRecordsSearchQuery] = useState<string>('');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

  /** Lo guardado en ESTE navegador. */
  const leerRegistrosLocales = (): QuizRegistrationRecord[] => {
    try {
      const raw = localStorage.getItem(REGISTRATION_STORAGE_KEY)
        ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as QuizRegistrationRecord[]) : [];
    } catch (e) {
      console.error('Error loading quiz records', e);
      return [];
    }
  };

  const parseTimestampDate = (ts?: string): Date | null => {
    if (!ts) return null;
    const match = ts.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
    if (match) {
      const [, d, m, y, h, min, s] = match;
      return new Date(Number(y), Number(m) - 1, Number(d), Number(h || 0), Number(min || 0), Number(s || 0));
    }
    const parsed = Date.parse(ts);
    if (!isNaN(parsed)) return new Date(parsed);
    return null;
  };

  const parseTimestampMinutes = (ts?: string): number => {
    const d = parseTimestampDate(ts);
    return d ? Math.floor(d.getTime() / 60000) : 0;
  };

  const formatearFechaVisual = (ts?: string): string => {
    if (!ts) return '';
    const d = parseTimestampDate(ts);
    if (!d) return ts;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  /**
   * Dos intentos son el mismo si coinciden correo, tema y marca temporal
   * (independientemente de si Google Sheets la devuelve como Date o string dd/mm/yyyy).
   */
  const sonMismoIntento = (a: QuizRegistrationRecord, b: QuizRegistrationRecord): boolean => {
    const emailA = (a.studentEmail || '').toLowerCase().trim();
    const emailB = (b.studentEmail || '').toLowerCase().trim();
    if (emailA && emailB && emailA !== emailB) return false;
    if (a.topicId !== b.topicId) return false;

    // Si coinciden en texto literal
    if (a.timestamp && b.timestamp && a.timestamp.trim() === b.timestamp.trim()) return true;

    // Comparación robusta por minutos (con tolerancia de 1 min por desfase horario/servidor)
    const tA = parseTimestampMinutes(a.timestamp);
    const tB = parseTimestampMinutes(b.timestamp);
    if (tA > 0 && tB > 0 && Math.abs(tA - tB) <= 1) {
      if (a.correctCount !== undefined && b.correctCount !== undefined) {
        return a.correctCount === b.correctCount;
      }
      return true;
    }
    return false;
  };

  const fusionar = (
    remotos: QuizRegistrationRecord[],
    locales: QuizRegistrationRecord[]
  ): QuizRegistrationRecord[] => {
    // Si la hoja oficial responde, la fuente de verdad es la hoja remota.
    // Enriquecemos los registros remotos con el answersDetail que tengamos en local.
    const remotosEnriquecidos = remotos.map(rem => {
      const matchLocal = locales.find(loc => sonMismoIntento(rem, loc));
      if (matchLocal && (!rem.answersDetail || rem.answersDetail.length === 0) && matchLocal.answersDetail && matchLocal.answersDetail.length > 0) {
        return { ...rem, answersDetail: matchLocal.answersDetail };
      }
      return rem;
    });

    // Actualizamos localStorage para limpiar huérfanos obsoletos y asegurar paridad entre navegadores
    try {
      localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(remotosEnriquecidos));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(remotosEnriquecidos));
    } catch {
      // cuota del navegador
    }

    return remotosEnriquecidos;
  };

  const loadStoredRecords = () => {
    setRecords(leerRegistrosLocales());
  };

  /**
   * Trae de la hoja los intentos de la cuenta con la que se ha entrado.
   *
   * Antes esto no existía: «Mis Calificaciones» leía el localStorage, así que
   * al entrar desde otro equipo con la misma cuenta el historial salía vacío
   * aunque la nota estuviera registrada.
   */
  const sincronizarRegistros = async () => {
    const locales = leerRegistrosLocales();
    const correo = (user?.email || studentEmail || '').trim();

    if (!correo) {
      setRecords(locales);
      setEstadoHistorial('local');
      return;
    }

    setEstadoHistorial('cargando');
    const remotos = await misCalificaciones(correo);

    if (remotos === null) {
      setRecords(locales);
      setEstadoHistorial('sin_conexion');
      return;
    }

    setRecords(fusionar(remotos, locales));
    setEstadoHistorial('sincronizado');
  };

  useEffect(() => {
    sincronizarRegistros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, isProfesor]);

  // Set default respondent based on role and mode
  useEffect(() => {
    if (isProfesor && evaluationMode === 'docente_sesion') {
      setStudentName(user?.name || 'Prof. Juan José Díaz-Mochón');
      setStudentEmail(user?.email || 'jjdiaz@ugr.es');
    } else if (!isProfesor && user) {
      setStudentName(user.name || '');
      setStudentEmail(user.email || '');
    }
  }, [evaluationMode, user, isProfesor]);

  // Asegurar que el alumnado solo acceda a los Modelos E, FIR y A (B, C y Retrosíntesis son exclusivos del profesor)
  useEffect(() => {
    if (!isProfesor && selectedModel !== 'modelo-e' && selectedModel !== 'modelo-fir' && selectedModel !== 'modelo-a') {
      setSelectedModel('modelo-e');
    }
  }, [isProfesor, selectedModel]);

  /**
   * Obtiene estadísticas de realización (estado, mejor nota, intentos, última fecha)
   * para un modelo específico del tema actual, contrastando el historial de calificaciones.
   */
  const getModelStats = (model: QuizModelType) => {
    const currentEmail = (studentEmail || user?.email || '').toLowerCase().trim();
    const isTema1 = topic.id === 'tema-01' || topic.number === 'Tema 01' || (topic.title && topic.title.toLowerCase().includes('acetilcolina'));

    const matching = records.filter(r => {
      const matchesTopic = r.topicId === topic.id || (isTema1 && (r.topicId === 'tema-1' || !r.topicId || r.topicId === 'tema-01'));
      if (!matchesTopic) return false;

      // Si no es profesor y hay correo, contrastar correo del alumno
      if (!isProfesor && currentEmail) {
        const rEmail = (r.studentEmail || '').toLowerCase().trim();
        if (rEmail && rEmail !== currentEmail) return false;
      }

      const m = (r.modelName || '').toLowerCase();
      if (model === 'modelo-e') {
        return m.includes('modelo e');
      }
      if (model === 'modelo-fir') {
        return m.includes('modelo fir') || m.includes('fir');
      }
      if (model === 'modelo-b') {
        return m.includes('modelo b');
      }
      if (model === 'modelo-c') {
        return m.includes('modelo c');
      }
      if (model === 'retrosintesis') {
        return m.includes('retrosíntesis') || m.includes('retrosintesis');
      }
      if (model === 'modelo-a') {
        // En Tema 1, los intentos iniciales decían 'Modelo A' o no tenían subtipo de modelo
        return m.includes('modelo a') || (!m.includes('modelo e') && !m.includes('modelo fir') && !m.includes('fir') && !m.includes('modelo b') && !m.includes('modelo c') && !m.includes('retrosint'));
      }
      return false;
    });

    if (matching.length === 0) {
      return { completed: false, count: 0, bestScore: null as number | null, lastScore: null as number | null, lastDate: null as string | null };
    }

    const scores = matching.map(r => typeof r.score === 'number' ? r.score : parseFloat(String(r.score)) || 0);
    const bestScore = Math.max(...scores);
    const latest = matching[0];
    const lastScore = typeof latest.score === 'number' ? latest.score : parseFloat(String(latest.score)) || 0;
    const lastDate = latest.timestamp ? formatearFechaVisual(latest.timestamp) : null;

    return {
      completed: true,
      count: matching.length,
      bestScore: Math.round(bestScore * 10) / 10,
      lastScore: Math.round(lastScore * 10) / 10,
      lastDate
    };
  };

  if (questions.length === 0) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Autoevaluación no disponible</h3>
            <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
          </div>
          <div className="modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No hay preguntas configuradas para esta unidad todavía.</p>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn btn-primary">Cerrar</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ: TestQuestion = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    // En modo examen la respuesta queda anotada al instante: el alumno puede
    // volver atras, cambiarla y entregar en cualquier momento.
    if (isExamMode) {
      setAnswers(prev => ({ ...prev, [currentIndex]: idx }));
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setShowExplanation(true);
    setAnswers(prev => ({ ...prev, [currentIndex]: selectedOption }));
  };

  /** Navegacion libre entre preguntas durante el examen. */
  const goToQuestion = (target: number) => {
    if (target < 0 || target >= questions.length) return;
    setCurrentIndex(target);
    const stored = answers[target];
    setSelectedOption(stored === undefined || stored < 0 ? null : stored);
    setShowExplanation(false);
  };

  const answeredCount = questions.reduce(
    (total, _q, idx) => (answers[idx] !== undefined && answers[idx] >= 0 ? total + 1 : total),
    0
  );

  /**
   * Cierra el intento: calcula la nota, la guarda en local y la envia a la hoja
   * oficial de Google Sheets. Se llama tanto al terminar la ultima pregunta como
   * al pulsar «Entregar examen».
   */
  const finalizeAttempt = (finalAnswersMap: { [key: number]: number }) => {
    {
      let correct = 0;

      const answersDetail: QuizAnswerDetail[] = questions.map((q, idx) => {
        const selectedIdx = finalAnswersMap[idx] ?? -1;
        const isOptCorrect = selectedIdx === q.correctIndex;
        if (isOptCorrect) correct++;

        const getOptText = (optIndex: number) => {
          if (optIndex < 0 || optIndex >= q.options.length) return 'Sin respuesta';
          const opt = q.options[optIndex];
          return typeof opt === 'string' ? opt : opt.text;
        };

        return {
          questionId: q.id,
          questionNumber: idx + 1,
          questionText: q.question,
          selectedOptionIndex: selectedIdx,
          selectedOptionText: getOptText(selectedIdx),
          correctOptionIndex: q.correctIndex,
          correctOptionText: getOptText(q.correctIndex),
          isCorrect: isOptCorrect,
          explanation: q.explanation
        };
      });

      const finalScore = Number(((correct / questions.length) * 10).toFixed(1));
      const now = new Date();
      const formattedTimestamp = now.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }) + ' ' + now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });

      let modelDisplayName = 'Modelo E: Examen Oficial 2026/27 - Sin Retrosíntesis (15P)';
      if (topic.id === 'tema-01') {
        if (selectedModel === 'modelo-fir') {
          modelDisplayName = 'Modelo FIR: Preguntas Oficiales Convocatorias 2020-2025 (10P)';
        } else if (selectedModel === 'modelo-a') {
          modelDisplayName = 'Modelo A: Farmacología, MoA y Síntesis Directa (15P)';
        } else if (selectedModel === 'modelo-b') {
          modelDisplayName = 'Modelo B: Diferenciación, Cinética y Síntesis Directa (15P)';
        } else if (selectedModel === 'modelo-c') {
          modelDisplayName = 'Modelo C: Catálisis Enzimática, Estereoquímica y Síntesis (15P)';
        } else if (selectedModel === 'retrosintesis') {
          modelDisplayName = 'Modelo Retrosíntesis: Desconexiones y Sintones (15P)';
        } else {
          modelDisplayName = 'Modelo E: Examen Oficial 2026/27 - Sin Retrosíntesis (15P)';
        }
      }

      const finalAttempt: QuizRegistrationRecord = {
        id: `rec_${Date.now()}`,
        studentName: studentName.trim() || 'Evaluado sin registrar',
        studentEmail: studentEmail.trim() || (user?.email ?? 'sin-email@ugr.es'),
        studentDni: '',
        evaluator: user?.name ? `${user.name} (Docente)` : 'Dr. Juan José Díaz-Mochón (Docente)',
        evaluationMode: evaluationMode,
        topicId: topic.id,
        topicNumber: topic.number,
        topicTitle: topic.title,
        modelName: modelDisplayName,
        score: finalScore,
        correctCount: correct,
        totalQuestions: questions.length,
        timestamp: formattedTimestamp,
        answersDetail: answersDetail
      };

      // Save to localStorage under both keys
      try {
        const existingRecords: QuizRegistrationRecord[] = JSON.parse(
          localStorage.getItem(REGISTRATION_STORAGE_KEY) || '[]'
        );
        const updatedRecords = [finalAttempt, ...existingRecords];
        localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(updatedRecords));

        // Legacy compatibility
        localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updatedRecords));

        setRecords(updatedRecords);
      } catch (e) {
        console.error('Error saving registration record', e);
      }

      if (onAttemptCompleted) {
        onAttemptCompleted(finalAttempt);
      }

      // Enviar de forma asíncrona a Google Sheets
      setSheetSubmitStatus('sending');
      submitAttemptToGoogleSheets(finalAttempt)
        .then((res: GoogleSheetsSubmissionResult) => {
          setSheetSubmitStatus(res.status);
        })
        .catch((err: any) => {
          console.error('Error enviando a Google Sheets:', err);
          setSheetSubmitStatus('network_error');
        });

      setIsCompleted(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      finalizeAttempt({ ...answers, [currentIndex]: selectedOption ?? -1 });
    }
  };

  /** Entrega del examen en cualquier momento, con o sin todas las preguntas hechas. */
  const handleSubmitExam = () => {
    const finalAnswersMap: { [key: number]: number } = { ...answers };
    if (selectedOption !== null) {
      finalAnswersMap[currentIndex] = selectedOption;
    }
    const sinResponder = questions.filter((_q, idx) => finalAnswersMap[idx] === undefined || finalAnswersMap[idx] < 0).length;
    const aviso = sinResponder > 0
      ? `Vas a entregar el examen con ${sinResponder} pregunta(s) sin responder, que puntuaran como falladas. ¿Confirmas la entrega?`
      : '¿Confirmas la entrega del examen? La calificacion quedara registrada en la hoja oficial del profesorado.';
    if (!window.confirm(aviso)) return;
    finalizeAttempt(finalAnswersMap);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setAnswers({});
    setIsCompleted(false);
    setSheetSubmitStatus('idle');
  };

  const handleNewStudentEvaluation = () => {
    handleRestart();
    setEvaluationMode('alumno_evaluado');
    setStudentName('');
    setStudentEmail('');
    setIsStarted(false);
    setActiveTab('quiz');
  };

    const handleCopyAppsScriptCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleSaveSheetsUrl = () => {
    setGoogleSheetsUrl(sheetsUrlInput);
    setUrlSaveSuccess(true);
    setTimeout(() => setUrlSaveSuccess(false), 3000);
  };

  const calculateFinalScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) correct++;
    });
    return {
      correct,
      total: questions.length,
      score: ((correct / questions.length) * 10).toFixed(1)
    };
  };

  const handleDeleteRecord = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('¿Confirmas que deseas eliminar este registro de evaluación?')) return;
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    try {
      localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error deleting record', err);
    }
  };

  const handleClearAllRecords = () => {
    const msg = isProfesor
      ? '¿Deseas vaciar el historial de calificaciones en este navegador? Las notas oficiales de la hoja de Google no se borrarán.'
      : '¿Deseas limpiar la caché local de este navegador y resincronizar con la hoja oficial?';
    if (!window.confirm(msg)) return;
    try {
      localStorage.removeItem(REGISTRATION_STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      const correo = (user?.email || studentEmail || '').trim().toLowerCase();
      if (correo) {
        localStorage.removeItem(`qfdos_calificaciones_remotas_${correo}`);
      }
    } catch (err) {
      console.error('Error clearing records', err);
    }
    sincronizarRegistros();
  };

  const handleExportCsv = () => {
    if (filteredRecords.length === 0) {
      alert('No hay registros disponibles para exportar.');
      return;
    }

    const headers = [
      'ID Registro',
      'Fecha y Hora',
      'Tema ID',
      'Tema Título',
      'Modelo',
      'Modo Evaluación',
      'Estudiante',
      'DNI / Identificador',
      'Correo Electrónico',
      'Docente Evaluador',
      'Calificación (/10)',
      'Aciertos',
      'Total Preguntas'
    ];

    const rows = filteredRecords.map(r => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${r.topicId}"`,
      `"${r.topicTitle || topic.title}"`,
      `"${r.modelName || 'Modelo A'}"`,
      `"${r.evaluationMode === 'docente_sesion' ? 'Sesión Docente' : 'Alumno Evaluado'}"`,
      `"${r.studentName.replace(/"/g, '""')}"`,
      `"${(r.studentDni || '-').replace(/"/g, '""')}"`,
      `"${r.studentEmail.replace(/"/g, '""')}"`,
      `"${(r.evaluator || user?.name || 'Profesor').replace(/"/g, '""')}"`,
      r.score.toFixed(1),
      r.correctCount,
      r.totalQuestions
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `QFDOS_Calificaciones_${topic.id}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered records for dashboard
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (recordsFilterTopic === 'current' && r.topicId !== topic.id) {
        return false;
      }
      if (recordsSearchQuery.trim()) {
        const q = recordsSearchQuery.toLowerCase();
        const matchName = r.studentName?.toLowerCase().includes(q);
        const matchEmail = r.studentEmail?.toLowerCase().includes(q);
        const matchDni = r.studentDni?.toLowerCase().includes(q);
        return matchName || matchEmail || matchDni;
      }
      return true;
    });
  }, [records, recordsFilterTopic, topic.id, recordsSearchQuery]);

  // Dashboard Statistics
  const dashboardStats = useMemo(() => {
    if (filteredRecords.length === 0) {
      return { total: 0, avg: '0.0', passCount: 0, passRate: '0%', maxScore: '0.0' };
    }
    const total = filteredRecords.length;
    const sum = filteredRecords.reduce((acc, r) => acc + r.score, 0);
    const avg = (sum / total).toFixed(1);
    const passCount = filteredRecords.filter(r => r.score >= 5.0).length;
    const passRate = ((passCount / total) * 100).toFixed(0) + '%';
    const maxScore = Math.max(...filteredRecords.map(r => r.score)).toFixed(1);
    return { total, avg, passCount, passRate, maxScore };
  }, [filteredRecords]);

  // Model attempt statistics for active user / browser
  const statsE = getModelStats('modelo-e');
  const statsFir = getModelStats('modelo-fir');
  const statsA = getModelStats('modelo-a');
  const statsB = getModelStats('modelo-b');
  const statsC = getModelStats('modelo-c');
  const statsRetro = getModelStats('retrosintesis');
  const currentStats = getModelStats(selectedModel);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ 
          maxWidth: activeTab === 'records' ? '920px' : '760px',
          width: '95%',
          transition: 'max-width 0.25s ease'
        }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'var(--primary-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--navy)',
              flexShrink: 0
            }}>
              <GraduationCap size={20} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', margin: 0, lineHeight: 1.3 }}>
                  Autoevaluación: {topic.number} · {topic.title}
                </h3>
                <span className="qfdos-badge quiz-header-badge" style={{ 
                  fontSize: '0.66rem', 
                  background: selectedModel === 'modelo-e' ? 'var(--navy)' : selectedModel === 'modelo-fir' ? 'var(--teal)' : selectedModel === 'modelo-b' ? '#8b5cf6' : selectedModel === 'modelo-c' ? '#ea580c' : selectedModel === 'retrosintesis' ? '#0d9488' : '#3b82f6', 
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}>
                  {selectedModel === 'modelo-e' ? 'Modelo E Oficial 26/27' : selectedModel === 'modelo-fir' ? 'Modelo FIR Oficial (10P)' : selectedModel === 'modelo-b' ? 'Modelo B Oficial' : selectedModel === 'modelo-c' ? 'Modelo C Oficial' : selectedModel === 'retrosintesis' ? 'Modelo Retrosíntesis' : 'Modelo A Oficial'}
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '2px 0 0 0', lineHeight: 1.3 }}>
                {selectedModel === 'modelo-fir' ? '10 Preguntas Oficiales FIR' : '15 Preguntas Calibradas JEV System-1'} · Evaluación Continua QFDOS {isProfesor ? '(Modo Profesor)' : '(Portal Alumnado)'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-outline" style={{ flexShrink: 0, marginLeft: '8px' }} title="Cerrar ventana"><X size={18} /></button>
        </div>

        {/* Tab Switcher */}
        <div className="modal-tabs-scroll" style={{ 
          display: 'flex', 
          borderBottom: '1.5px solid var(--border-color)', 
          background: 'var(--surface-raised)',
          padding: '6px 16px 0',
          gap: '8px'
        }}>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: activeTab === 'quiz' ? 'var(--surface)' : 'transparent',
              color: activeTab === 'quiz' ? 'var(--navy)' : 'var(--text-muted)',
              fontWeight: activeTab === 'quiz' ? 800 : 600,
              fontSize: '0.84rem',
              borderRadius: '8px 8px 0 0',
              borderTop: activeTab === 'quiz' ? '3px solid var(--navy)' : '3px solid transparent',
              borderLeft: activeTab === 'quiz' ? '1px solid var(--border-color)' : 'none',
              borderRight: activeTab === 'quiz' ? '1px solid var(--border-color)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <HelpCircle size={15} /> {isProfesor ? 'Test Interactivo (15 Preguntas)' : 'Cuestionario Oficial (15P)'}
          </button>
          <button
            onClick={() => {
              setActiveTab('records');
              loadStoredRecords();
            }}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: activeTab === 'records' ? 'var(--surface)' : 'transparent',
              color: activeTab === 'records' ? 'var(--navy)' : 'var(--text-muted)',
              fontWeight: activeTab === 'records' ? 800 : 600,
              fontSize: '0.84rem',
              borderRadius: '8px 8px 0 0',
              borderTop: activeTab === 'records' ? '3px solid var(--navy)' : '3px solid transparent',
              borderLeft: activeTab === 'records' ? '1px solid var(--border-color)' : 'none',
              borderRight: activeTab === 'records' ? '1px solid var(--border-color)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BarChart3 size={15} /> {isProfesor ? 'Registro de Calificaciones & Google Sheets' : 'Mis Calificaciones'}
            <span style={{ 
              fontSize: '0.68rem', 
              padding: '1px 6px', 
              borderRadius: '10px', 
              background: activeTab === 'records' ? 'var(--navy)' : 'var(--surface-alt)',
              color: activeTab === 'records' ? '#fff' : 'var(--text-main)',
              fontWeight: 700 
            }}>
              {records.length}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto', padding: '1.25rem' }}>
          {activeTab === 'quiz' ? (
            /* TAB 1: QUIZ INTERACTIVO */
            <div>
              {!isStarted ? (
                /* PRE-QUIZ: FICHA DE REGISTRO DOCENTE / IDENTIFICACIÓN DEL EVALUADO */
                <div>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.06) 0%, rgba(13, 148, 136, 0.06) 100%)',
                    border: '1.5px solid var(--border-strong)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <UserCheck size={20} color="var(--navy)" />
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                        {isProfesor ? 'Registro de Identificación para la Evaluación' : 'Identificación Oficial del Alumno · Evaluación Continua'}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {isProfesor 
                        ? 'Como docente acreditado, puedes realizar una prueba de validación con tu sesión o registrar la evaluación continua de un alumno. Las calificaciones se sincronizan con Google Sheets.'
                        : 'Introduce tus datos oficiales de la UGR para que tu calificación y respuestas queden debidamente registradas en la hoja oficial de Google Sheets del profesorado y en tu historial personal.'
                      }
                    </p>
                  </div>

                  {/* Selector Docente / Alumno: solo tiene sentido en sesion de profesor */}
                  {isProfesor && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '8px' }}>
                      Modalidad de Evaluación:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEvaluationMode('docente_sesion');
                          setStudentName('Prof. Juan José Díaz-Mochón');
                          setStudentEmail('jjdiaz@ugr.es');
                        }}
                        style={{
                          padding: '12px',
                          borderRadius: 'var(--radius-md)',
                          border: evaluationMode === 'docente_sesion' ? '2px solid var(--navy)' : '1px solid var(--border-color)',
                          background: evaluationMode === 'docente_sesion' ? 'var(--primary-bg)' : 'var(--surface)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <UserCheck size={18} color={evaluationMode === 'docente_sesion' ? 'var(--navy)' : 'var(--text-muted)'} style={{ marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-title)' }}>
                            Modo Profesor / Validación
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            Acceso a los 4 modelos de examen (B por defecto)
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEvaluationMode('alumno_evaluado');
                          if (user && user.role === 'estudiante') {
                            setStudentName(user.name);
                            setStudentEmail(user.email);
                          } else {
                            setStudentName('');
                            setStudentEmail('');
                          }
                        }}
                        style={{
                          padding: '12px',
                          borderRadius: 'var(--radius-md)',
                          border: evaluationMode === 'alumno_evaluado' ? '2px solid var(--teal)' : '1px solid var(--border-color)',
                          background: evaluationMode === 'alumno_evaluado' ? 'var(--secondary-bg)' : 'var(--surface)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <UserPlus size={18} color={evaluationMode === 'alumno_evaluado' ? 'var(--teal)' : 'var(--text-muted)'} style={{ marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-title)' }}>
                            Modo Alumno (Autoevaluación)
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            Registro con nombre y correo UGR
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  )}

                  {/* Formulario de datos */}
                  <div className="qfdos-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--surface)' }}>
                    <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                          Nombre Completo del Evaluado *
                        </label>
                        <input
                          type="text"
                          value={studentName}
                          onChange={e => setStudentName(e.target.value)}
                          placeholder="Ej: García Morales, Elena"
                          className="form-control"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            fontSize: '0.86rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1.5px solid var(--border-color)'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                          Correo Electrónico (UGR / Institucional)
                        </label>
                        <input
                          type="email"
                          value={studentEmail}
                          onChange={e => setStudentEmail(e.target.value)}
                          placeholder="Ej: elena_gm@correo.ugr.es"
                          className="form-control"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            fontSize: '0.86rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1.5px solid var(--border-color)'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                          Docente Supervisor
                        </label>
                        <div style={{
                          padding: '8px 12px',
                          fontSize: '0.84rem',
                          background: 'var(--surface-alt)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-main)',
                          fontWeight: 600
                        }}>
                          {user?.name ? `${user.name} (Grupo E)` : 'Dr. Juan José Díaz-Mochón (Grupo E)'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Selector de Modelo de Examen (Disponible para Alumnado y Docente) */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <label style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                        {topic.id === 'tema-01' ? 'Selecciona el Modelo de Examen (Modelos Calibrados):' : 'Modelo de Evaluación:'}
                      </label>
                      <span className="qfdos-badge" style={{ 
                        fontSize: '0.68rem', 
                        background: selectedModel === 'modelo-e' ? 'var(--navy)' : selectedModel === 'modelo-fir' ? 'var(--teal)' : selectedModel === 'modelo-b' ? '#8b5cf6' : selectedModel === 'modelo-c' ? '#ea580c' : selectedModel === 'retrosintesis' ? '#0d9488' : '#2563eb', 
                        color: '#fff',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        {selectedModel === 'modelo-e' ? 'Modelo E (Oficial 2026/27)' : selectedModel === 'modelo-fir' ? 'Modelo FIR (Oficial 2020-2025)' : selectedModel === 'modelo-b' ? 'Modelo B (Docente)' : selectedModel === 'modelo-c' ? 'Modelo C (Docente)' : selectedModel === 'retrosintesis' ? 'Retrosíntesis (Docente)' : 'Modelo A (Oficial Previo)'}
                      </span>
                    </div>

                    {topic.id === 'tema-01' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                        {/* Tarjeta Modelo E: Oficial 2026/27 (Sin Retrosíntesis) */}
                        <div
                          onClick={() => setSelectedModel('modelo-e')}
                          style={{
                            padding: '14px 16px',
                            borderRadius: 'var(--radius-lg)',
                            border: selectedModel === 'modelo-e' ? '2.5px solid var(--navy)' : '1.5px solid var(--border-color)',
                            background: selectedModel === 'modelo-e' ? 'rgba(30, 58, 138, 0.05)' : 'var(--surface)',
                            boxShadow: selectedModel === 'modelo-e' ? '0 3px 12px rgba(30, 58, 138, 0.12)' : 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                              <div>
                                <span style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--navy)' }}>
                                  Oficial 2026/27 · Sin Retrosíntesis
                                </span>
                                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--navy)', margin: '2px 0 0 0' }}>
                                  Modelo E (15 Preguntas)
                                </h4>
                              </div>
                              {statsE.completed ? (
                                <span className="qfdos-badge" style={{ fontSize: '0.68rem', background: '#059669', color: '#fff', fontWeight: 700 }}>
                                  ✓ Realizado · {statsE.bestScore}/10
                                </span>
                              ) : (
                                <span className="qfdos-badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                                  Nuevo · Pendiente
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                              Biosíntesis ChAT, SAR betanecol, eudismia metacolina, síntesis industrial directa, catálisis Ser/His de AChE, 2-PAM, aging, BHE y tubocurarina (1.4 nm).
                            </p>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
                            <span>
                              {statsE.completed ? `${statsE.count} intento(s) registrado(s) · Repetible` : 'Sin intentos registrados'}
                            </span>
                            <strong style={{ color: selectedModel === 'modelo-e' ? 'var(--navy)' : 'var(--text-muted)' }}>
                              {selectedModel === 'modelo-e' ? '● Seleccionado' : 'Elegir Modelo E'}
                            </strong>
                          </div>
                        </div>

                        {/* Tarjeta Modelo FIR: Preguntas Oficiales Convocatorias 2020-2025 */}
                        <div
                          onClick={() => setSelectedModel('modelo-fir')}
                          style={{
                            padding: '14px 16px',
                            borderRadius: 'var(--radius-lg)',
                            border: selectedModel === 'modelo-fir' ? '2.5px solid var(--teal)' : '1.5px solid var(--border-color)',
                            background: selectedModel === 'modelo-fir' ? 'rgba(13, 148, 136, 0.05)' : 'var(--surface)',
                            boxShadow: selectedModel === 'modelo-fir' ? '0 3px 12px rgba(13, 148, 136, 0.15)' : 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                              <div>
                                <span style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--teal)' }}>
                                  Oficial Sanidad · FIR 2020–2025
                                </span>
                                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--teal)', margin: '2px 0 0 0' }}>
                                  Modelo FIR (10 Preguntas)
                                </h4>
                              </div>
                              {statsFir.completed ? (
                                <span className="qfdos-badge" style={{ fontSize: '0.68rem', background: '#059669', color: '#fff', fontWeight: 700 }}>
                                  ✓ Realizado · {statsFir.bestScore}/10
                                </span>
                              ) : (
                                <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                                  Oficial · 10P FIR
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                              Preguntas reales de las últimas 6 convocatorias: carbacol y estabilidad metabólica, succinilcolina como análogo blando, atracurio y eliminación de Hofmann, oximas y sarín, rivastigmina, donepezilo y pirenzepina.
                            </p>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
                            <span>
                              {statsFir.completed ? `${statsFir.count} intento(s) registrado(s) · Repetible` : 'Sin intentos registrados'}
                            </span>
                            <strong style={{ color: selectedModel === 'modelo-fir' ? 'var(--teal)' : 'var(--text-muted)' }}>
                              {selectedModel === 'modelo-fir' ? '● Seleccionado' : 'Elegir Modelo FIR'}
                            </strong>
                          </div>
                        </div>

                        {/* Tarjeta Modelo A: Examen Previo */}
                        <div
                          onClick={() => setSelectedModel('modelo-a')}
                          style={{
                            padding: '14px 16px',
                            borderRadius: 'var(--radius-lg)',
                            border: selectedModel === 'modelo-a' ? '2.5px solid var(--navy)' : '1.5px solid var(--border-color)',
                            background: selectedModel === 'modelo-a' ? 'rgba(30, 58, 138, 0.05)' : 'var(--surface)',
                            boxShadow: selectedModel === 'modelo-a' ? '0 3px 12px rgba(30, 58, 138, 0.12)' : 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                              <div>
                                <span style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#2563eb' }}>
                                  Examen Oficial Previo
                                </span>
                                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--navy)', margin: '2px 0 0 0' }}>
                                  Modelo A (15 Preguntas)
                                </h4>
                              </div>
                              {statsA.completed ? (
                                <span className="qfdos-badge" style={{ fontSize: '0.68rem', background: '#059669', color: '#fff', fontWeight: 700 }}>
                                  ✓ Realizado · {statsA.bestScore}/10
                                </span>
                              ) : (
                                <span className="qfdos-badge" style={{ fontSize: '0.68rem', background: 'var(--surface-alt)', color: 'var(--text-muted)', fontWeight: 600 }}>
                                  No realizado
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                              Fundamentos colinérgicos, receptores muscarínicos y nicotínicos, SAR de agonistas, inhibidores de AChE, reactivadores y síntesis directa de metacolina y betanecol.
                            </p>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
                            <span>
                              {statsA.completed ? `${statsA.count} intento(s) registrado(s) · Repetible` : 'Sin intentos registrados'}
                            </span>
                            <strong style={{ color: selectedModel === 'modelo-a' ? 'var(--navy)' : 'var(--text-muted)' }}>
                              {selectedModel === 'modelo-a' ? '● Seleccionado' : 'Elegir Modelo A'}
                            </strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Modelos adicionales de demostración y entrenamiento (Exclusivos para el docente) */}
                    {isProfesor && topic.id === 'tema-01' && (
                      <details style={{ marginBottom: '14px', background: 'var(--surface-alt)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px 12px' }}>
                        <summary style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', cursor: 'pointer' }}>
                          Modelos complementarios de demostración docente (Modelos B, C y Retrosíntesis · Solo Profesor)
                        </summary>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '8px', marginTop: '10px' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedModel('modelo-b')}
                            style={{
                              padding: '10px',
                              borderRadius: 'var(--radius-md)',
                              border: selectedModel === 'modelo-b' ? '2px solid #8b5cf6' : '1px solid var(--border-color)',
                              background: selectedModel === 'modelo-b' ? '#f5f3ff' : 'var(--surface)',
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                              <strong style={{ fontSize: '0.8rem', color: '#7c3aed' }}>Modelo B: Cinética</strong>
                              {statsB.completed && <span className="qfdos-badge" style={{ fontSize: '0.62rem', background: '#059669', color: '#fff' }}>✓ {statsB.bestScore}/10</span>}
                            </div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Ionotrópicos vs metabotrópicos, carbamoilación y aging.</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedModel('modelo-c')}
                            style={{
                              padding: '10px',
                              borderRadius: 'var(--radius-md)',
                              border: selectedModel === 'modelo-c' ? '2px solid #ea580c' : '1px solid var(--border-color)',
                              background: selectedModel === 'modelo-c' ? '#fff7ed' : 'var(--surface)',
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                              <strong style={{ fontSize: '0.8rem', color: '#c2410c' }}>Modelo C: Catálisis</strong>
                              {statsC.completed && <span className="qfdos-badge" style={{ fontSize: '0.62rem', background: '#059669', color: '#fff' }}>✓ {statsC.bestScore}/10</span>}
                            </div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Tríada catalítica de AChE, eudismia y síntesis neostigmina.</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedModel('retrosintesis')}
                            style={{
                              padding: '10px',
                              borderRadius: 'var(--radius-md)',
                              border: selectedModel === 'retrosintesis' ? '2px solid var(--teal)' : '1px solid var(--border-color)',
                              background: selectedModel === 'retrosintesis' ? 'var(--secondary-bg)' : 'var(--surface)',
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--teal)' }}>Retrosíntesis</strong>
                              {statsRetro.completed && <span className="qfdos-badge" style={{ fontSize: '0.62rem', background: '#059669', color: '#fff' }}>✓ {statsRetro.bestScore}/10</span>}
                            </div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Desconexiones C-C, sintones acilo-oxígeno e Ivanov.</p>
                          </button>
                        </div>
                      </details>
                    )}

                    {/* Selector de Modo: Preparación / Estudio vs Examen Oficial */}
                    <div className="quiz-mode-selector-wrap" style={{
                      marginTop: '12px',
                      padding: '12px 14px',
                      background: 'var(--surface-raised)',
                      border: '1.5px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-title)' }}>
                          Modalidad de Realización:
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {examMode 
                            ? 'Examen evaluable: responde las preguntas sin ver la corrección y entrega al finalizar.' 
                            : 'Preparación y estudio: comprueba cada respuesta de inmediato con su explicación pedagógica.'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => setExamMode(true)}
                          className={examMode ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline'}
                          style={{ fontSize: '0.78rem', fontWeight: 700, padding: '7px 14px', whiteSpace: 'nowrap' }}
                        >
                          Modo Examen
                        </button>
                        <button
                          type="button"
                          onClick={() => setExamMode(false)}
                          className={!examMode ? 'btn btn-sm btn-teal' : 'btn btn-sm btn-outline'}
                          style={{ fontSize: '0.78rem', fontWeight: 700, padding: '7px 14px', whiteSpace: 'nowrap' }}
                        >
                          Modo Preparación / Estudio
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Estado de realización e instrucciones */}
                  <div style={{
                    marginBottom: '1.25rem',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: currentStats.completed ? 'rgba(16, 185, 129, 0.06)' : 'rgba(30, 58, 138, 0.06)',
                    border: currentStats.completed ? '1.5px solid #059669' : '1.5px solid var(--navy)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      {currentStats.completed ? (
                        <>
                          <CheckCircle2 size={18} color="#059669" />
                          <strong style={{ fontSize: '0.92rem', color: '#065f46' }}>
                            {selectedModel === 'modelo-e' ? 'Modelo E Oficial 2026/27' : selectedModel === 'modelo-fir' ? 'Modelo FIR Oficial' : selectedModel === 'modelo-a' ? 'Modelo A Oficial Previo' : selectedModel === 'modelo-b' ? 'Modelo B' : selectedModel === 'modelo-c' ? 'Modelo C' : 'Modelo Retrosíntesis'} · Ya Realizado (Mejor Calificación: {currentStats.bestScore}/10)
                          </strong>
                        </>
                      ) : (
                        <>
                          <Clock size={18} color="var(--navy)" />
                          <strong style={{ fontSize: '0.92rem', color: 'var(--navy)' }}>
                            {selectedModel === 'modelo-e' ? 'Modelo E Oficial 2026/27' : selectedModel === 'modelo-fir' ? 'Modelo FIR Oficial' : selectedModel === 'modelo-a' ? 'Modelo A Oficial Previo' : selectedModel === 'modelo-b' ? 'Modelo B' : selectedModel === 'modelo-c' ? 'Modelo C' : 'Modelo Retrosíntesis'} · Pendiente de Realización
                          </strong>
                        </>
                      )}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.81rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      {examMode ? (
                        <>
                          <li><strong>Modo Examen:</strong> respondes sin ver la corrección durante la prueba; puedes navegar libremente entre las {questions.length} preguntas y cambiar respuestas en cualquier momento.</li>
                          <li>Puedes entregar cuando quieras; las preguntas no respondidas computan como no acertadas.</li>
                          <li>Al entregar, tu calificación y el desglose de respuestas se registran de inmediato en la hoja oficial de Google Sheets del profesorado y en tu pestaña de «Mis Calificaciones».</li>
                        </>
                      ) : (
                        <>
                          <li><strong>Modo Preparación / Estudio:</strong> compruebas cada respuesta al instante tras marcarla y accedes a la justificación teórica y distractor por distractor.</li>
                          <li>Avanzas paso a paso afianzando conceptos clave antes de someterte al examen evaluable oficial.</li>
                          <li>Al terminar las {questions.length} preguntas obtendrás tu balance formativo global y podrás repetir tantas veces como necesites.</li>
                        </>
                      )}
                      {currentStats.completed ? (
                        <li style={{ color: '#047857', fontWeight: 700 }}>
                          Tienes {currentStats.count} intento(s) registrado(s){currentStats.lastDate ? ` (último: ${currentStats.lastDate})` : ''}. Puedes volver a realizar este modelo: el nuevo intento se añadirá a tu expediente sin borrar tus notas anteriores.
                        </li>
                      ) : (
                        <li style={{ color: 'var(--navy)', fontWeight: 700 }}>
                          Este modelo aún no ha sido completado con tus datos en la plataforma.
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Banner de resumen del examen */}
                  <div className="quiz-banner-container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-alt)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '220px' }}>
                      <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', flexShrink: 0 }}>
                        {questions.length}
                      </span>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
                        <strong>
                          {selectedModel === 'modelo-e' ? 'Modelo E Oficial 26/27:' : selectedModel === 'modelo-fir' ? 'Modelo FIR Oficial (Sanidad):' : selectedModel === 'modelo-b' ? 'Modelo B Oficial:' : selectedModel === 'modelo-c' ? 'Modelo C Oficial:' : selectedModel === 'retrosintesis' ? 'Modelo Retrosíntesis Oficial:' : 'Modelo A Oficial:'}
                        </strong>{' '}
                        {selectedModel === 'modelo-e'
                          ? '15 preguntas calibradas JEV System-1 (sin retrosíntesis): biosíntesis ChAT, SAR betanecol, eudismia metacolina, síntesis industrial directa, catálisis Ser/His de AChE, 2-PAM, aging, BHE y tubocurarina (1.4 nm).'
                          : selectedModel === 'modelo-fir'
                          ? '10 preguntas reales de exámenes del Ministerio de Sanidad (2020-2025): estabilidad de carbamatos, suxametonio/cetilpiridinio como fármacos blandos, atracurio y Hofmann, oximas y reactivación de AChE, donepezilo, rivastigmina y pirenzepina.'
                          : selectedModel === 'modelo-b'
                          ? '15 preguntas de diferenciación ionotrópica/metabotrópica, cinética de carbamoilación, envejecimiento de AChE y síntesis de derivados.'
                          : selectedModel === 'modelo-c'
                          ? '15 preguntas de tríada catalítica de AChE, estereoquímica de muscarina, selectividad y síntesis de neostigmina.'
                          : selectedModel === 'retrosintesis'
                          ? '15 preguntas de desconexiones C-C, polaridad de sintones, reactivo de Ivanov, piperidolato y trihexifenidilo.'
                          : '15 preguntas de fundamentos colinérgicos, agonistas y SAR, inhibidores de AChE, reactivadores y síntesis directa de metacolina y betanecol.'}
                      </div>
                    </div>
                    <span className="qfdos-badge badge-teal quiz-banner-badge" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Cero LaTeX Crudo · RDKit 2D
                    </span>
                  </div>

                  {/* Botón de Iniciar */}
                  <div className="quiz-actions-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={onClose} className="btn btn-outline">
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!studentName.trim()) {
                          alert('Por favor, indica tu nombre o el del evaluado antes de comenzar.');
                          return;
                        }
                        setIsStarted(true);
                        handleRestart();
                      }}
                      className="btn btn-primary"
                      style={{ padding: '10px 24px', fontSize: '0.92rem', fontWeight: 700 }}
                    >
                      {currentStats.completed ? (
                        <>
                          Repetir {selectedModel === 'modelo-e' ? 'Modelo E Oficial' : selectedModel === 'modelo-fir' ? 'Modelo FIR Oficial' : selectedModel === 'modelo-b' ? 'Modelo B' : selectedModel === 'modelo-c' ? 'Modelo C' : selectedModel === 'retrosintesis' ? 'Modelo Retrosíntesis' : 'Modelo A'} ({questions.length} Preguntas · {examMode ? 'Examen' : 'Preparación'}) <RotateCcw size={16} style={{ marginLeft: '6px' }} />
                        </>
                      ) : (
                        <>
                          Comenzar {selectedModel === 'modelo-e' ? 'Modelo E Oficial' : selectedModel === 'modelo-fir' ? 'Modelo FIR Oficial' : selectedModel === 'modelo-b' ? 'Modelo B' : selectedModel === 'modelo-c' ? 'Modelo C' : selectedModel === 'retrosintesis' ? 'Modelo Retrosíntesis' : 'Modelo A'} ({questions.length} Preguntas · {examMode ? 'Examen' : 'Preparación'}) <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : !isCompleted ? (
                /* QUIZ EN PROGRESO */
                <div>
                  {/* Respondent Info Bar & Progress Bar */}
                  <div className="quiz-in-progress-user-bar" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '0.85rem',
                    padding: '6px 12px',
                    background: 'var(--surface-raised)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                      <User size={14} color="var(--navy)" style={{ flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-muted)' }}>Evaluando a:</span>
                      <strong style={{ color: 'var(--text-title)' }}>{studentName}</strong>
                      {studentEmail && (
                        <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          ({studentEmail})
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="qfdos-badge" style={{ 
                        fontSize: '0.68rem', 
                        background: selectedModel === 'modelo-e' ? 'var(--navy)' : selectedModel === 'modelo-fir' ? 'var(--teal)' : selectedModel === 'modelo-b' ? '#8b5cf6' : selectedModel === 'modelo-c' ? '#ea580c' : selectedModel === 'retrosintesis' ? '#0d9488' : '#2563eb', 
                        color: '#fff',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        {selectedModel === 'modelo-e' ? 'Modelo E' : selectedModel === 'modelo-fir' ? 'Modelo FIR' : selectedModel === 'modelo-b' ? 'Modelo B' : selectedModel === 'modelo-c' ? 'Modelo C' : selectedModel === 'retrosintesis' ? 'Retrosíntesis' : 'Modelo A'} · {isExamMode ? 'Examen' : 'Preparación'}
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>
                        Pregunta {currentIndex + 1} de {questions.length}
                      </span>
                    </div>
                  </div>

                  {/* Navegador de preguntas (modo examen: entrega libre) */}
                  {isExamMode && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      flexWrap: 'wrap',
                      padding: '8px 10px',
                      marginBottom: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--surface-alt)',
                      border: '1px solid var(--border-color)'
                    }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>
                        Respondidas {answeredCount} / {questions.length}
                      </span>
                      {questions.map((_q, idx) => {
                        const contestada = answers[idx] !== undefined && answers[idx] >= 0;
                        const activa = idx === currentIndex;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => goToQuestion(idx)}
                            title={contestada ? `Pregunta ${idx + 1} (respondida)` : `Pregunta ${idx + 1} (sin responder)`}
                            className="font-mono"
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              border: activa ? '2px solid var(--navy)' : '1px solid var(--border-color)',
                              background: contestada ? 'rgba(16, 185, 129, 0.16)' : 'var(--surface)',
                              color: contestada ? '#047857' : 'var(--text-muted)'
                            }}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Badges Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {currentQ.badge && (
                        <span className="qfdos-badge" style={{ fontSize: '0.68rem', background: '#3b82f6', color: '#fff' }}>
                          {currentQ.badge}
                        </span>
                      )}
                      {currentQ.block && (
                        <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem' }}>
                          {currentQ.block}
                        </span>
                      )}
                      {currentQ.difficulty && (
                        <span className="qfdos-badge badge-amber" style={{ fontSize: '0.68rem' }}>
                          Nivel {currentQ.difficulty}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      ID: {currentQ.id}
                    </div>
                  </div>

                  {/* Question Text */}
                  <div style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-title)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {currentIndex + 1}. {currentQ.question}
                  </div>

                  {/* Optional Image for Question */}
                  {currentQ.imagePath && (
                    <div 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        marginBottom: '1rem', 
                        background: '#ffffff', 
                        padding: '10px 14px', 
                        borderRadius: 'var(--radius-md)', 
                        border: '1.5px solid var(--border-color)',
                        cursor: 'zoom-in',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                      }}
                      onClick={() => {
                        const src = currentQ.imagePath!.startsWith('http') 
                          ? currentQ.imagePath! 
                          : `${import.meta.env.BASE_URL || '/'}${currentQ.imagePath!.replace(/^\//, '')}`;
                        setLightboxImage({
                          src,
                          title: `Pregunta ${currentIndex + 1}: ${currentQ.block || 'Examen'}`,
                          subtitle: currentQ.question,
                          tag: currentQ.badge || 'Figura de Examen'
                        });
                      }}
                      title="Haz clic para ver la figura a pantalla completa"
                    >
                      <img 
                        src={currentQ.imagePath.startsWith('http') ? currentQ.imagePath : `${import.meta.env.BASE_URL || '/'}${currentQ.imagePath.replace(/^\//, '')}`}
                        alt="Figura de la pregunta" 
                        style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }} 
                      />
                      <span style={{ marginTop: '6px', fontSize: '0.72rem', color: 'var(--teal-ink)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Maximize2 size={12} /> Clic para ampliar a pantalla completa
                      </span>
                    </div>
                  )}

                  {/* Optional SMILES Structure for Question */}
                  {currentQ.questionSmiles && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Chem2DDrawer smiles={currentQ.questionSmiles} width={260} height={120} />
                    </div>
                  )}

                  {/* Options List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.25rem' }}>
                    {currentQ.options.map((opt, idx) => {
                      const optText = typeof opt === 'string' ? opt : opt.text;
                      const optSmiles = typeof opt === 'string' ? undefined : opt.smiles;

                      let optionBg = 'var(--surface)';
                      let optionBorder = 'var(--border-color)';

                      if (selectedOption === idx) {
                        optionBg = 'var(--primary-bg)';
                        optionBorder = 'var(--navy)';
                      }

                      if (showExplanation) {
                        if (idx === currentQ.correctIndex) {
                          optionBg = 'rgba(16, 185, 129, 0.12)';
                          optionBorder = '#10b981';
                        } else if (selectedOption === idx) {
                          optionBg = 'rgba(239, 68, 68, 0.12)';
                          optionBorder = '#ef4444';
                        }
                      }

                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-md)',
                            border: `1.5px solid ${optionBorder}`,
                            background: optionBg,
                            cursor: showExplanation ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                            <span 
                              className="font-mono" 
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: selectedOption === idx ? 'var(--navy)' : 'var(--surface-alt)',
                                color: selectedOption === idx ? '#fff' : 'var(--text-main)',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                flexShrink: 0
                              }}
                            >
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
                              {optText}
                            </span>
                          </div>

{/* Opciones en texto limpio conforme a instrucción docente */}

                          {showExplanation && idx === currentQ.correctIndex && (
                            <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginLeft: '6px' }} />
                          )}
                          {showExplanation && selectedOption === idx && idx !== currentQ.correctIndex && (
                            <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginLeft: '6px' }} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Card */}
                  {showExplanation && (
                    <div 
                      className="qfdos-card" 
                      style={{
                        background: selectedOption === currentQ.correctIndex ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                        borderColor: selectedOption === currentQ.correctIndex ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                        padding: '1rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <BookOpen size={16} color={selectedOption === currentQ.correctIndex ? '#059669' : '#dc2626'} />
                        <strong style={{ fontSize: '0.88rem', color: selectedOption === currentQ.correctIndex ? '#047857' : '#b91c1c' }}>
                          {selectedOption === currentQ.correctIndex ? '¡Respuesta Correcta!' : 'Explicación Pedagógica:'}
                        </strong>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                        {currentQ.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* PANTALLA DE RESULTADOS */
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <Award size={34} color="var(--navy-ink)" />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>
                    ¡Autoevaluación Calibrada Finalizada!
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    La calificación y el desglose de respuestas se han registrado en el portal docente.
                  </p>

                  {/* Ficha de Calificación */}
                  {(() => {
                    const stats = calculateFinalScore();
                    const numScore = Number(stats.score);
                    const isAprobado = numScore >= 5.0;
                    return (
                      <div className="qfdos-card" style={{ maxWidth: '420px', margin: '0 auto 1.25rem', padding: '1.25rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                          Calificación ({topic.title} · {selectedModel === 'modelo-e' ? 'Modelo E (15P)' : selectedModel === 'modelo-fir' ? 'Modelo FIR (10P)' : selectedModel === 'modelo-b' ? 'Modelo B (15P)' : selectedModel === 'modelo-c' ? 'Modelo C (15P)' : selectedModel === 'retrosintesis' ? 'Modelo Retrosíntesis (15P)' : 'Modelo A (15P)'} · {isExamMode ? 'Modo Examen' : 'Modo Preparación'}):
                        </div>
                        <div className="font-mono" style={{ fontSize: '2.8rem', fontWeight: 900, color: isAprobado ? 'var(--teal)' : 'var(--accent-red)', lineHeight: 1 }}>
                          {stats.score} <span style={{ fontSize: '1.3rem', color: 'var(--text-muted)' }}>/ 10</span>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '0.84rem', fontWeight: 700, color: isAprobado ? 'var(--secondary-dark)' : 'var(--accent-red)' }}>
                          {isAprobado ? '✓ APROBADO' : '✗ NO SUPERADO'} · {stats.correct} aciertos de {stats.total} preguntas
                        </div>

                        <hr style={{ margin: '12px 0', borderColor: 'var(--border-color)' }} />

                        {/* Metadatos del Evaluado */}
                        <div style={{ fontSize: '0.78rem', textAlign: 'left', color: 'var(--text-main)', lineHeight: 1.6 }}>
                          <div><strong>Evaluado:</strong> {studentName}</div>
                          <div><strong>Correo:</strong> {studentEmail}</div>
                          <div><strong>Docente Responsable:</strong> Dr. Juan José Díaz-Mochón</div>
                          {isProfesor && (
                            <div><strong>Almacenamiento Local:</strong> <span className="font-mono" style={{ fontSize: '0.72rem' }}>qfdos_test_registration_records</span></div>
                          )}
                        </div>

                        {/* Estado de Sincronización Google Sheets */}
                        <div style={{ marginTop: '12px' }}>
                          {sheetSubmitStatus === 'sending' && (
                            <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#1d4ed8', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <Clock size={15} /> Sincronizando con la hoja oficial de Google Sheets del docente...
                            </div>
                          )}
                          {sheetSubmitStatus === 'sent' && (
                            <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', color: '#065f46', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <CheckCircle2 size={16} color="#10b981" /> <span><strong>Sincronizado:</strong> Respuestas y nota volcadas en Google Sheets.</span>
                            </div>
                          )}
                          {sheetSubmitStatus === 'sent_unconfirmed' && (
                            <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'var(--semantic-warn-bg)', border: '1px solid var(--accent-amber)', color: 'var(--text-main)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <AlertCircle size={15} color="var(--accent-amber)" />
                              <span><strong>Enviado.</strong> No se ha podido releer la hoja para confirmarlo; el intento queda también en este navegador.</span>
                            </div>
                          )}
                          {sheetSubmitStatus === 'no_url' && (
                            <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid #f59e0b', color: '#92400e', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <AlertCircle size={15} color="#f59e0b" /> <span>Intento guardado localmente en tu historial.</span>
                            </div>
                          )}
                          {sheetSubmitStatus === 'network_error' && (
                            <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #ef4444', color: '#991b1b', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <AlertCircle size={15} color="#ef4444" /> <span>Guardado localmente (sin conexión con Google Sheets).</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Acciones tras el examen */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => {
                        setActiveTab('records');
                        sincronizarRegistros();
                      }}
                      className="btn btn-primary"
                    >
                      <BarChart3 size={15} /> {isProfesor ? 'Ver Registro de Calificaciones' : 'Ver Mis Calificaciones'}
                    </button>
                    {/* Encadenar evaluaciones es cosa del profesorado: un alumno
                        no debe poder abrir un examen a nombre de otra persona. */}
                    {isProfesor && (
                      <button onClick={handleNewStudentEvaluation} className="btn btn-secondary">
                        <UserPlus size={15} /> Evaluar a Otro Alumno
                      </button>
                    )}
                    <button onClick={handleRestart} className="btn btn-outline">
                      <RotateCcw size={15} /> Repetir Intento
                    </button>
                    <button onClick={onClose} className="btn btn-outline">
                      Finalizar & Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* TAB 2: REGISTRO DE INTENTOS / CALIFICACIONES (DOCENTE) */
            <div>
              {/* Header de controles */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 2px 0' }}>
                    {isProfesor ? 'Historial de Autoevaluaciones Registradas' : 'Mis Evaluaciones Realizadas'}
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: 0 }}>
                    {isProfesor 
                      ? 'Portal Docente · Consultas, sincronización en Google Sheets y exportación oficial'
                      : <>Intentos registrados a nombre de <span className="font-mono">{user?.email || studentEmail}</span>, entres desde donde entres</>
                    }
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {isProfesor && (
                    <button
                      onClick={() => setShowSheetsConfig(!showSheetsConfig)}
                      className="btn btn-sm btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', fontWeight: 700 }}
                      title="Configurar webhook de Google Sheets para recepción de notas"
                    >
                      <Sheet size={14} /> {showSheetsConfig ? 'Ocultar Google Sheets' : '⚙ Configurar Google Sheets'}
                    </button>
                  )}
                  <button
                    onClick={handleExportCsv}
                    className="btn btn-sm btn-primary"
                    disabled={filteredRecords.length === 0}
                    style={{ fontSize: '0.76rem', fontWeight: 700 }}
                    title="Exportar informe a CSV para Excel"
                  >
                    <Download size={14} /> Exportar CSV
                  </button>
                  <button
                    onClick={handleClearAllRecords}
                    className="btn btn-sm btn-outline"
                    disabled={records.length === 0}
                    style={{ color: 'var(--accent-red)', borderColor: 'var(--accent-red)', fontSize: '0.76rem' }}
                    title={isProfesor ? "Vaciar historial de evaluaciones registradas en este equipo" : "Limpiar caché local y resincronizar con la hoja oficial"}
                  >
                    <Trash2 size={14} /> {isProfesor ? 'Vaciar' : 'Limpiar Caché'}
                  </button>
                </div>
              </div>

              {estadoHistorial !== 'local' && (
                <div
                  style={{
                    marginBottom: '1rem',
                    background: estadoHistorial === 'sin_conexion' ? 'var(--semantic-warn-bg)' : 'var(--semantic-ok-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '9px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: 'var(--text-main)'
                  }}
                >
                  {estadoHistorial === 'cargando' && (
                    <><Clock size={15} /> Recuperando tus intentos del registro del profesor…</>
                  )}
                  {estadoHistorial === 'sincronizado' && (
                    <>
                      <CheckCircle2 size={15} color="var(--accent-emerald)" />
                      <span>Historial completo: incluye los intentos hechos desde otros navegadores.</span>
                      <button
                        onClick={sincronizarRegistros}
                        className="btn btn-sm btn-ghost"
                        style={{ marginLeft: 'auto', fontSize: '0.74rem' }}
                      >
                        Actualizar
                      </button>
                    </>
                  )}
                  {estadoHistorial === 'sin_conexion' && (
                    <>
                      <AlertCircle size={15} color="var(--accent-amber)" />
                      <span>
                        No se ha podido consultar el registro del profesor, así que abajo sólo aparece
                        lo hecho en este navegador. Tus notas siguen registradas.
                      </span>
                      <button
                        onClick={sincronizarRegistros}
                        className="btn btn-sm btn-ghost"
                        style={{ marginLeft: 'auto', fontSize: '0.74rem' }}
                      >
                        Reintentar
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Panel de Configuración de Google Sheets (Solo para Docentes) */}
              {isProfesor && showSheetsConfig && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%)',
                  border: '1.5px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sheet size={18} color="#059669" />
                      <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#065f46', margin: 0 }}>
                        Vincular con Google Sheets (Evaluación Continua Docente)
                      </h5>
                    </div>
                    <button
                      onClick={handleCopyAppsScriptCode}
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '0.74rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      {copiedCode ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                      {copiedCode ? '¡Código Copiado!' : 'Copiar Google Apps Script'}
                    </button>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.45, marginBottom: '12px' }}>
                    Cada vez que un estudiante o tú completéis un examen, las respuestas y la calificación se insertarán automáticamente como una fila en tu hoja de Google Sheets.
                  </p>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input
                      type="url"
                      value={sheetsUrlInput}
                      onChange={e => setSheetsUrlInput(e.target.value)}
                      placeholder="https://script.google.com/macros/s/.../exec"
                      className="form-control"
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        fontSize: '0.8rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-color)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                    <button
                      onClick={handleSaveSheetsUrl}
                      className="btn btn-sm btn-primary"
                      style={{ whiteSpace: 'nowrap', fontSize: '0.78rem', fontWeight: 700 }}
                    >
                      {urlSaveSuccess ? '¡Guardada ✓!' : 'Guardar URL'}
                    </button>
                  </div>

                  <div style={{ background: 'var(--surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    <strong>Instrucciones rápidas para el profesor:</strong>
                    <ol style={{ margin: '4px 0 0 16px', padding: 0 }}>
                      <li>Crea una Google Sheet en tu Google Drive (ej: <em>Evaluación QFDOS 2627</em>).</li>
                      <li>Haz clic en <strong>Extensiones &gt; Apps Script</strong>.</li>
                      <li>Borra el código existente, pulsa el botón <strong>Copiar Google Apps Script</strong> de arriba y pégalo. Pulsa Guardar (Ctrl+S).</li>
                      <li>Haz clic en <strong>Implementar &gt; Nueva implementación</strong> &gt; Tipo: <strong>Aplicación web</strong> &gt; Ejecutar como: <strong>Yo</strong> &gt; Quién tiene acceso: <strong>Cualquier persona</strong>.</li>
                      <li>Copia la URL resultante que termina en <code>/exec</code> y pégala en el campo de arriba.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Estadísticas Resumen */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
                gap: '10px', 
                marginBottom: '1.25rem' 
              }}>
                <div className="qfdos-card" style={{ padding: '10px 14px', background: 'var(--surface-raised)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Total Evaluaciones</span>
                  <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)' }}>
                    {dashboardStats.total}
                  </span>
                </div>
                <div className="qfdos-card" style={{ padding: '10px 14px', background: 'var(--surface-raised)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Nota Media</span>
                  <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: Number(dashboardStats.avg) >= 5 ? 'var(--teal)' : 'var(--accent-red)' }}>
                    {dashboardStats.avg} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 10</span>
                  </span>
                </div>
                <div className="qfdos-card" style={{ padding: '10px 14px', background: 'var(--surface-raised)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Aprobados</span>
                  <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--teal)' }}>
                    {dashboardStats.passCount} ({dashboardStats.passRate})
                  </span>
                </div>
                <div className="qfdos-card" style={{ padding: '10px 14px', background: 'var(--surface-raised)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Puntuación Máxima</span>
                  <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)' }}>
                    {dashboardStats.maxScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 10</span>
                  </span>
                </div>
              </div>

              {/* Barra de Filtros */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={recordsSearchQuery}
                    onChange={e => setRecordsSearchQuery(e.target.value)}
                    placeholder="Buscar por alumno, DNI o correo..."
                    className="form-control"
                    style={{
                      width: '100%',
                      padding: '7px 12px 7px 32px',
                      fontSize: '0.82rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-color)'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setRecordsFilterTopic('current')}
                    className={`btn btn-sm ${recordsFilterTopic === 'current' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '0.76rem' }}
                  >
                    Solo Tema 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecordsFilterTopic('all')}
                    className={`btn btn-sm ${recordsFilterTopic === 'all' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '0.76rem' }}
                  >
                    Todos los Temas
                  </button>
                </div>
              </div>

              {/* Lista de Registros */}
              {filteredRecords.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'var(--surface-raised)', borderRadius: 'var(--radius-lg)' }}>
                  <HelpCircle size={36} color="var(--text-muted)" style={{ margin: '0 auto 8px', display: 'block', opacity: 0.6 }} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '4px' }}>
                    No hay registros de evaluación para mostrar
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {recordsSearchQuery ? 'Prueba con otro término de búsqueda.' : 'Inicia el test de 15 preguntas para registrar el primer intento.'}
                  </p>
                  <button onClick={() => setActiveTab('quiz')} className="btn btn-sm btn-primary">
                    Realizar Test Ahora
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredRecords.map(rec => {
                    const isExpanded = expandedRecordId === rec.id;
                    const isPass = rec.score >= 5.0;

                    return (
                      <div
                        key={rec.id}
                        className="qfdos-card"
                        style={{
                          padding: '12px 16px',
                          border: isExpanded ? '1.5px solid var(--navy)' : '1px solid var(--border-color)',
                          background: 'var(--surface)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {/* Fila Principal */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {/* Nota Badge */}
                            <div 
                              className="font-mono" 
                              style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: isPass ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                                border: `1.5px solid ${isPass ? '#10b981' : '#ef4444'}`,
                                color: isPass ? '#047857' : '#b91c1c',
                                flexShrink: 0
                              }}
                            >
                              <span style={{ fontSize: '1.15rem', fontWeight: 900, lineHeight: 1 }}>
                                {rec.score.toFixed(1)}
                              </span>
                              <span style={{ fontSize: '0.62rem', fontWeight: 700 }}>/ 10</span>
                            </div>

                            {/* Datos del Alumno */}
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
                                <strong style={{ fontSize: '0.92rem', color: 'var(--text-title)' }}>
                                  {rec.studentName}
                                </strong>
                                <span className={`qfdos-badge ${rec.evaluationMode === 'docente_sesion' ? 'badge-amber' : 'badge-teal'}`} style={{ fontSize: '0.65rem' }}>
                                  {rec.evaluationMode === 'docente_sesion' ? 'Sesión Docente' : 'Alumno'}
                                </span>
                                {rec.modelName && (
                                  <span className="qfdos-badge" style={{ 
                                    fontSize: '0.64rem',
                                    background: rec.modelName.includes('Modelo E') ? 'rgba(30, 58, 138, 0.12)' : rec.modelName.includes('Modelo B') ? '#f5f3ff' : rec.modelName.includes('Retrosíntesis') ? 'rgba(20, 184, 166, 0.12)' : rec.modelName.includes('Modelo C') ? '#fff7ed' : 'rgba(59, 130, 246, 0.12)',
                                    color: rec.modelName.includes('Modelo E') ? 'var(--navy)' : rec.modelName.includes('Modelo B') ? '#7c3aed' : rec.modelName.includes('Retrosíntesis') ? '#0d9488' : rec.modelName.includes('Modelo C') ? '#c2410c' : '#2563eb',
                                    border: `1px solid ${rec.modelName.includes('Modelo E') ? 'var(--navy)' : rec.modelName.includes('Modelo B') ? '#8b5cf6' : rec.modelName.includes('Retrosíntesis') ? '#14b8a6' : rec.modelName.includes('Modelo C') ? '#ea580c' : '#93c5fd'}`
                                  }}>
                                    {rec.modelName.includes('Modelo E') ? 'Modelo E' : rec.modelName.includes('Modelo B') ? 'Modelo B' : rec.modelName.includes('Modelo C') ? 'Modelo C' : rec.modelName.includes('Retrosíntesis') ? 'Retrosíntesis' : 'Modelo A'}
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                {rec.studentDni && rec.studentDni !== '-' && (
                                  <span>DNI: <strong className="font-mono">{rec.studentDni}</strong></span>
                                )}
                                <span>{rec.studentEmail}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <Clock size={12} /> {formatearFechaVisual(rec.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Métricas y Botones de Acción */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ textAlign: 'right', marginRight: '6px' }}>
                              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)' }}>
                                {rec.correctCount} / {rec.totalQuestions} aciertos
                              </div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                {((rec.correctCount / rec.totalQuestions) * 100).toFixed(0)}% de acierto
                              </div>
                            </div>

                            {isProfesor ? (
                              <button
                                onClick={() => setExpandedRecordId(isExpanded ? null : rec.id)}
                                className="btn btn-sm btn-outline"
                                style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem' }}
                                title="Ver desglose de respuestas pregunta a pregunta"
                              >
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                {isExpanded ? 'Ocultar' : 'Ver Detalle'}
                              </button>
                            ) : (
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: '150px', textAlign: 'right' }}>
                                Desglose reservado al profesorado
                              </span>
                            )}

                            {isProfesor && (
                              <button
                                onClick={e => handleDeleteRecord(rec.id, e)}
                                className="btn btn-sm btn-outline"
                                style={{ color: 'var(--text-muted)', padding: '6px 8px' }}
                                title="Eliminar este intento"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Desglose de Preguntas (Accordion, solo profesorado) */}
                        {isExpanded && isProfesor && (
                          <div style={{ 
                            marginTop: '12px', 
                            paddingTop: '12px', 
                            borderTop: '1px dashed var(--border-color)' 
                          }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <BookOpen size={14} /> Desglose de las 15 Preguntas del Examen:
                            </div>

                            {rec.answersDetail && rec.answersDetail.length > 0 ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {rec.answersDetail.map((item, qIdx) => (
                                  <div
                                    key={qIdx}
                                    style={{
                                      padding: '8px 12px',
                                      borderRadius: 'var(--radius-sm)',
                                      background: item.isCorrect ? 'rgba(16, 185, 129, 0.06)' : 'rgba(239, 68, 68, 0.06)',
                                      borderLeft: `4px solid ${item.isCorrect ? '#10b981' : '#ef4444'}`,
                                      fontSize: '0.78rem'
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                      <strong style={{ color: 'var(--text-title)' }}>
                                        P{item.questionNumber}. {item.questionText}
                                      </strong>
                                      <span style={{ 
                                        fontWeight: 800, 
                                        color: item.isCorrect ? '#047857' : '#b91c1c', 
                                        flexShrink: 0,
                                        marginLeft: '8px'
                                      }}>
                                        {item.isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                                      </span>
                                    </div>
                                    <div style={{ color: 'var(--text-main)', marginBottom: '2px' }}>
                                      <strong>Respuesta del Alumno:</strong> {item.selectedOptionText}
                                    </div>
                                    {!item.isCorrect && (
                                      <div style={{ color: '#047857', marginBottom: '2px' }}>
                                        <strong>Respuesta Correcta Oficial:</strong> {item.correctOptionText}
                                      </div>
                                    )}
                                    <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                                      {item.explanation}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
                                Este intento previo no contiene el registro detallado pregunta por pregunta. Los nuevos intentos incorporarán el desglose íntegro.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer (solo activo durante la realización de preguntas) */}
        {activeTab === 'quiz' && isStarted && !isCompleted && (
          <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '10px 16px' }}>
            <div className="quiz-in-progress-footer" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => {
                  if (window.confirm('¿Deseas salir del examen sin entregarlo? Se perderán las respuestas marcadas.')) {
                    setIsStarted(false);
                    handleRestart();
                  }
                }}
                className="btn btn-sm btn-outline"
                style={{ whiteSpace: 'nowrap' }}
              >
                Salir del Examen
              </button>
              {isExamMode ? (
                /* Modo examen: navegacion libre y entrega en cualquier momento */
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => goToQuestion(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="btn btn-sm btn-outline"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => goToQuestion(currentIndex + 1)}
                    disabled={currentIndex >= questions.length - 1}
                    className="btn btn-sm btn-secondary"
                  >
                    Siguiente <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={handleSubmitExam}
                    className="btn btn-primary"
                    style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                    title="Entrega el examen ahora; las preguntas sin responder puntuan como falladas"
                  >
                    <Send size={15} /> Entregar Examen ({answeredCount}/{questions.length})
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {!showExplanation ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedOption === null}
                      className="btn btn-primary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Comprobar Respuesta
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="btn btn-secondary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Calificación Final'} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Visor Lightbox a Pantalla Completa */}
      <ImageLightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};
