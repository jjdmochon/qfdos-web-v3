// ==========================================================================
// QFDOS Master Data Repository (v2.0)
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Tipografía Científica Limpia: Texto plano y caracteres Unicode directos (cero LaTeX crudo)
// ==========================================================================

export interface CourseAttachment {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'video' | 'spotify' | 'notebook' | 'drive' | 'model3d' | 'data';
  url: string;
  driveId?: string;
  size?: string;
  date: string;
  spotifyUri?: string;
  isPodcastVideo?: boolean;
}

export interface TestQuestionOption {
  text: string;
  smiles?: string;
}

export interface TestQuestion {
  id: string;
  topicId: string;
  block?: string;
  question: string;
  questionSmiles?: string;
  options: (string | TestQuestionOption)[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'Fácil' | 'Medio' | 'Avanzado';
  imagePath?: string;
  badge?: string;
  authorEmail?: string;
  authorName?: string;
  isStudentSubmitted?: boolean;
  status?: 'approved' | 'pending';
}

export interface Flashcard {
  id: string;
  topicId: string;
  concept: string;
  front: string;
  back: string;
  smiles?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface LectureAudioNote {
  id: string;
  topicId: string;
  title: string;
  audioUrl?: string;
  date: string;
  duration?: string;
  transcription?: string;
  synthesizedNotesMarkdown?: string;
  slidesMarkdownUrl?: string;
  status: 'transcribing' | 'completed' | 'draft';
}

export interface QuizAttempt {
  id: string;
  studentEmail: string;
  studentName: string;
  topicId: string;
  score: number; // 0 to 10
  correctCount: number;
  totalQuestions: number;
  timestamp: string;
}

export interface StudentEvaluationProfile {
  email: string;
  name: string;
  attempts: QuizAttempt[];
  labGrade: number;
  projectGrade?: number;
  parcialGrade?: number;
  trabajosGrade?: number;
}

export interface MoleculeDrug {
  name: string;
  smiles: string;
  formula?: string;
  mw?: number;
  logP?: number;
  hbd?: number;
  hba?: number;
  tpsa?: number;
  rotBonds?: number;
  role: string;
  pdbId?: string;
}

export interface QfdosTopic {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category?: 'teoria' | 'examen' | 'trabajo' | 'seminario';
  keyConcepts: string[];
  slideCount: number;
  pdbTargetId?: string;
  targetName?: string;
  drugs: MoleculeDrug[];
  status: 'Publicado' | 'En Revisión' | 'Próximamente';
  // 4 Recursos Didácticos Principales por Unidad
  slidesPdfUrl?: string;
  slidesPdfName?: string;
  notesPdfUrl?: string;
  notesPdfName?: string;
  geminiNotebookUrl?: string;
  spotifyPodcastUrl?: string;
  videoPodcastUrl?: string;
  // Metadatos para Exámenes y Trabajos/Proyectos
  dueDate?: string;
  maxScore?: number;
  weightPercentage?: number;
  submissionInstructions?: string;
  attachments?: CourseAttachment[];
  studentSubmissionUrl?: string;
  testQuestions?: TestQuestion[];
  flashcards?: Flashcard[];
  lectureAudios?: LectureAudioNote[];
}

export interface QfdosGlossaryTerm {
  id: string;
  term: string;
  category: 'Afinidad & Receptor' | 'SNC & Neuro' | 'Cardiovascular' | 'Antiinfecciosos' | 'ADMET & Profiling';
  definition: string;
  technicalCode?: string;
  clinicalRelevance: string;
  smiles?: string;
}

/**
 * Enlace de interés: material externo que el profesorado recopila para que el
 * alumnado vea qué hace la química farmacéutica fuera del aula.
 */
export interface QfdosResourceLink {
  id: string;
  title: string;
  url: string;
  /** Resumen del profesor: por qué merece la pena y qué mirar */
  summary: string;
  category: ResourceCategory;
  /** Medio de origen, mostrado junto al dominio (Nature, NEJM, EMA…) */
  source?: string;
  /** Lectura estimada o duración, p. ej. "12 min" o "Vídeo 8 min" */
  duration?: string;
  /** Módulo del temario con el que conecta, p. ej. "Tema 09" */
  relatedTopic?: string;
  /** Recomendado: se destaca al principio de la sección */
  featured?: boolean;
  addedAt: string;
}

export const RESOURCE_CATEGORIES = [
  'Casos de éxito',
  'Descubrimiento de fármacos',
  'Impacto en pacientes',
  'Regulación & seguridad',
  'Industria & carrera profesional',
  'Divulgación'
] as const;

export type ResourceCategory = typeof RESOURCE_CATEGORIES[number];

export const INITIAL_RESOURCE_LINKS: QfdosResourceLink[] = [
  {
    id: 'link-estructuras-qfdos-db',
    title: 'Base de Datos Oficial de Estructuras QFDOS (40 Moléculas · XLSX y CSV)',
    url: 'estructuras/estructuras_qfdos.xlsx',
    summary:
      'Repositorio maestro de estructuras químicas del curso de Química Farmacéutica II (Bloques 1 a 8: Neurotransmisores, Agonistas colinérgicos, Antagonistas muscarínicos, Anticolinesterásicos y Reactivadores, Biosíntesis colinérgica, Antimuscarínicos sintéticos y centrales, y Placa motora). Incluye hojas de propiedades fisicoquímicas, descriptores Lipinski, estereocentros CIP y estructuras en alta resolución.',
    category: 'Descubrimiento de fármacos',
    source: 'Cátedra de Química Farmacéutica (UGR)',
    relatedTopic: 'Tema 01',
    featured: true,
    addedAt: '2026-09-17'
  },
  {
    id: 'link-nachr-3d-model',
    title: 'Estructura 3D del Receptor Nicotínico de Acetilcolina (nAChR)',
    url: 'https://skfb.ly/6zvJE',
    summary:
      'Modelo macromolecular tridimensional del canal iónico pentamérico ("Nicotinic Acetylcholine Receptor" por British Pharmacological Society bajo licencia Creative Commons Attribution CC BY 4.0). Permite explorar el poro central y la arquitectura de subunidades transmembrana diana de agonistas y bloqueantes colinérgicos.',
    category: 'Descubrimiento de fármacos',
    source: 'British Pharmacological Society (CC BY 4.0)',
    relatedTopic: 'Tema 01',
    featured: true,
    addedAt: '2026-09-17'
  },
  {
    id: 'link-acs-fall-2026-disclosures',
    title: 'ACS Otoño 2026: 13 nuevas estructuras y candidatos clínicos',
    url: 'https://drughunter.com/articles/acs-fall-2026-first-time-disclosures?utm_term=fall%202026%20disclosures&utm_campaign=33777960-2026_Articles_Social&utm_content=384911386&utm_medium=social&utm_source=twitter&hss_channel=tw-1366500304867401729',
    summary:
      'Primera publicación de 13 candidatos de molécula pequeña presentados en la división MEDI de la ACS. Ejemplos reales de vanguardia: inhibidores alostéricos de KRAS G12D, pegamentos moleculares de IKZF2/4, inhibidores duales Wee1/Myt1 por FEP, fármacos antivirulencia contra FimH y dianas emergentes en inflamación (cGAS, MRGPRX2, KIT). Imprescindible para ver cómo la optimización farmacófora y de seguridad (hERG, atropoisomería) se aplica hoy en día',
    category: 'Descubrimiento de fármacos',
    source: 'DrugHunter, ACS',
    featured: true,
    addedAt: '2026-08-29'
  },
  {
    id: 'link-imatinib',
    title: 'Imatinib: del cromosoma Filadelfia a la primera terapia dirigida',
    url: 'https://www.nature.com/articles/nrd4570',
    summary:
      'La leucemia mieloide crónica pasó de ser mortal a una enfermedad crónica con una sola molécula. Fijaos en cómo el conocimiento de la diana (la fusión BCR-ABL) precedió al diseño del fármaco: es el orden inverso al del descubrimiento clásico por cribado, y es la lógica que seguimos en todo el temario.',
    category: 'Casos de éxito',
    source: 'Nature Reviews Drug Discovery',
    duration: '15 min',
    relatedTopic: 'Tema 00',
    featured: true,
    addedAt: '2026-08-28'
  },
  {
    id: 'link-coxibs',
    title: 'Por qué se retiró el rofecoxib: selectividad COX-2 y riesgo cardiovascular',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa050493',
    summary:
      'El mismo razonamiento estructural que hace al celecoxib selectivo — el bolsillo lateral que la Val523 deja libre en COX-2 — explica el desequilibrio entre prostaciclina y tromboxano que costó la retirada del rofecoxib. Un recordatorio de que la selectividad de diana no garantiza seguridad clínica.',
    category: 'Regulación & seguridad',
    source: 'New England Journal of Medicine',
    duration: '20 min',
    relatedTopic: 'Tema 09',
    featured: true,
    addedAt: '2026-08-28'
  },
  {
    id: 'link-ema-approvals',
    title: 'Medicamentos autorizados este año por la EMA',
    url: 'https://www.ema.europa.eu/en/medicines/medicines-human-use-under-evaluation',
    summary:
      'El registro público de la Agencia Europea del Medicamento. Buscad cualquier principio activo del temario y leed su informe: veréis los datos reales de eficacia y seguridad con los que se toma la decisión de autorizar, y cuántas veces se rechaza.',
    category: 'Regulación & seguridad',
    source: 'European Medicines Agency',
    relatedTopic: 'Tema 10',
    addedAt: '2026-08-28'
  },
  {
    id: 'link-alphafold',
    title: 'AlphaFold y qué cambia (y qué no) en el diseño de fármacos',
    url: 'https://www.nature.com/articles/s41586-021-03819-2',
    summary:
      'Predecir la estructura de una proteína dejó de ser el cuello de botella. Pero conocer el pliegue no da el modo de unión ni la afinidad: el trabajo termodinámico que hacemos en el simulador sigue siendo necesario. Buen antídoto contra el entusiasmo fácil.',
    category: 'Descubrimiento de fármacos',
    source: 'Nature',
    duration: '25 min',
    relatedTopic: 'Tema 00',
    addedAt: '2026-08-28'
  },
  {
    id: 'link-antibiotic-gap',
    title: 'Por qué apenas se desarrollan antibióticos nuevos',
    url: 'https://www.who.int/publications/i/item/9789240094000',
    summary:
      'El informe de la OMS sobre la cartera de antibacterianos en desarrollo. El problema no es solo científico: un antibiótico bien usado se reserva, se vende poco y no recupera la inversión. Un caso donde la química farmacéutica choca con la economía del medicamento.',
    category: 'Impacto en pacientes',
    source: 'Organización Mundial de la Salud',
    addedAt: '2026-08-28'
  }
];

export interface QfdosAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'alta' | 'normal';
}

export interface StudentQuestion {
  id: string;
  topicId: string;
  topicTitle: string;
  studentName: string;
  studentEmail: string;
  question: string;
  timestamp: string;
  status: 'pendiente' | 'respondida';
  response?: string;
}

/**
 * Versión del contenido docente distribuido con la aplicación.
 *
 * Súbela cada vez que cambien los datos del curso (estructuras, temario,
 * preguntas). Al arrancar, la aplicación compara esta versión con la guardada
 * en el navegador y, si difieren, descarta la copia en caché y recarga el
 * contenido oficial. Sin esto, un navegador que ya visitó la plataforma se
 * queda con la versión antigua para siempre.
 *
 * v3.2.2 — Atribución y actualización de enlace oficial de NEXUS.LAB (https://nexus-lab-team.netlify.app/).
 * v3.2.0 — Nueva seccion de enlaces de interes (INITIAL_RESOURCE_LINKS).
 * v3.1.0 — Estructuras SMILES verificadas contra PubChem y corregidas:
 *          haloperidol y zolpidem no eran ni siquiera moléculas válidas;
 *          donepezilo, sumatriptán, ondansetrón, flumazenil, naloxona y
 *          losartán tenían el esqueleto equivocado; morfina, captopril,
 *          enalapril, levodopa, rivastigmina, valaciclovir, ranitidina y
 *          pralidoxima carecían de estereoquímica.
 */
export const COURSE_DATA_VERSION = '3.6.0';
export const COURSE_BUILD_TIMESTAMP = '2026-09-17T13:45:00.000Z';

export const QFDOS_INFO = {
  code: "2041142 (2627 QFDOS E)",
  name: "Química Farmacéutica II",
  year: "2026/2027",
  institution: "Universidad de Granada (UGR)",
  faculty: "Facultad de Farmacia",
  department: "Química Farmacéutica y Orgánica",
  professors: [
    "Dr. Juan José Díaz-Mochón (Profesor Responsable · Grupo E)",
    "Dra. Ana Sousa (Coordinadora de Prácticas de Laboratorio · ana.sousa@ugr.es)"
  ],
  developer: {
    name: "NEXUS.LAB",
    tagline: "Ingeniería Digital & Ciencia Aplicada",
    url: "https://nexus-lab-team.netlify.app/"
  },
  designSystem: "QFDOS Structural Affinity Identity v2.0",
  driveFolderUrl: "https://drive.google.com/drive/folders/1_QFDOS_2627_Classroom",
  evaluacion: {
    examenFinal: 70,
    examenParcial: 20,
    practicas: 5,
    trabajosSeminarios: 5
  }
};

export const INITIAL_ANNOUNCEMENTS: QfdosAnnouncement[] = [
  {
    id: 'ann-estructuras-qfdos-update',
    title: '🔬 Base de Datos de Estructuras QFDOS Actualizada: 40 Fármacos Oficiales (Bloques 1 a 8)',
    content: 'Incorporadas al Tema 01 las nuevas estructuras oficiales del curso (Benztropina, Succinilcolina, Pilocarpina, Biperideno y Prociclidina), completando 40 moléculas con renderizado 2D RDKit interactivo, descriptores fisicoquímicos completos (logP, TPSA, QED, estereocentros CIP) y calculadora ADMET.',
    date: '17 Septiembre 2026',
    priority: 'alta'
  },
  {
    id: 'ann-receptor-3d-t01',
    title: '🧬 Nuevo Modelo 3D Interactivo: Receptor Nicotínico de Acetilcolina (nAChR)',
    content: 'Disponible en el Tema 01 (Sistema Colinérgico) la estructura tridimensional interactiva del receptor nicotínico (nAChR, formato GLB, modelo "Nicotinic Acetylcholine Receptor" por British Pharmacological Society bajo licencia CC BY 4.0). Podéis explorar la simetría pentamérica, el poro iónico central y los sitios de unión ortostéricos de la acetilcolina directamente en 3D con rotación orbital y zoom.',
    date: '17 Septiembre 2026',
    priority: 'alta'
  },
  {
    id: 'ann-presentacion-disp',
    title: '📢 Material de la Presentación del Curso ya Disponible',
    content: 'Todo el material de la Presentación del Curso de Química Farmacéutica II (Grupo E) se encuentra ya disponible para su consulta y descarga: Guía Docente Oficial, Diapositivas de clase en PDF y Cuaderno interactivo de estudio en Google NotebookLM. Podéis acceder directamente desde el módulo inaugural.',
    date: '14 Septiembre 2026',
    priority: 'alta'
  },
  {
    id: 'ann-1',
    title: '🚀 Bienvenida al Curso 2026/2027: Portal QFDOS v3 desarrollado por NEXUS LAB',
    content: 'Plataforma desarrollada por NEXUS LAB para el Prof. Mochón y el alumnado del Grupo E. Estructuras 2D renderizadas con RDKit y descriptores calculados sobre la marcha, podcasts en Spotify, flashcards con repetición espaciada y generador de exámenes.',
    date: '10 Septiembre 2026',
    priority: 'alta'
  },
  {
    id: 'ann-2',
    title: '📊 Simuladores Biofísicos de Afinidad y Criterios ADMET de Lipinski / Veber',
    content: 'Disponibles las herramientas de cálculo en tiempo real para constantes termodinámicas (ΔG°, Kd, Ki), ecuación de Cheng-Prusoff (IC50) y perfilado de permeabilidad celular.',
    date: '12 Septiembre 2026',
    priority: 'normal'
  },
  {
    id: 'ann-3',
    title: '📚 Actualización de Materiales Docentes y Cuaderno de Prácticas',
    content: 'Los esquemas SAR, estructuras 2D interactivas y casos de estudio se encuentran ya disponibles en cada unidad temática. Las diapositivas y apuntes se irán publicando conforme avance el calendario de clases.',
    date: '14 Septiembre 2026',
    priority: 'normal'
  }
];

export const INITIAL_TOPICS: QfdosTopic[] = [
  {
    id: 'tema-00',
    number: '',
    title: 'Presentación del Curso',
    subtitle: 'Guía Docente Oficial, Evaluación Continua y Ecosistema de Aprendizaje',
    description: 'Sesión inaugural de Química Farmacéutica II (Grupo E). Presentación de la guía docente oficial aprobada por la UGR, criterios de evaluación continua (70% examen final, 20% parcial, 5% prácticas de laboratorio, 5% seminarios y trabajos), calendario de clases magistrales y prácticas, cuaderno de laboratorio y ecosistema digital de aprendizaje interactivo.',
    keyConcepts: [
      'Guía docente y competencias formativas',
      'Criterios de evaluación continua (70/20/5/5)',
      'Calendario de clases magistrales, seminarios y prácticas',
      'Normativa académica y régimen de convocatorias (UGR)',
      'Ecosistema interactivo QFDOS v3 y NotebookLM'
    ],
    slideCount: 28,
    targetName: 'Química Farmacéutica II · Guía Docente y Evaluación',
    status: 'Publicado',
    slidesPdfUrl: '',
    slidesPdfName: 'Presentación del Curso (Diapositivas).pdf',
    notesPdfUrl: '',
    notesPdfName: 'Apuntes y Guía de Presentación del Curso.pdf',
    geminiNotebookUrl: 'https://notebook.google.com/notebook/4ec999d2-6985-4cd1-8172-5ab07a892986',
    spotifyPodcastUrl: '',
    drugs: [],
    attachments: [
      {
        id: 'att-t00-notebook',
        title: 'NotebookLM: Información General del Curso',
        url: 'https://notebook.google.com/notebook/4ec999d2-6985-4cd1-8172-5ab07a892986',
        type: 'notebook',
        date: '14/09/2026'
      }
    ],
    testQuestions: [],
    flashcards: []
  },
  {
    id: 'tema-01',
    number: 'Tema 01',
    title: 'Sistema Colinérgico',
    subtitle: 'Agonistas, Inhibidores de Acetilcolinesterasa (AChE) y Reactivadores Oxímicos',
    description: 'Estudio de la transmisión colinérgica, receptores muscarínicos y nicotínicos. Relaciones estructura-actividad (SAR) de ésteres de colina y carbamatos. Mecanismo catalítico de la tríada de AChE (Ser200, His440, Glu327), fosforilación por organofosforados neurotóxicos y reactivación mediante oximas nucleofílicas como pralidoxima (2-PAM).',
    keyConcepts: [
      'Receptores muscarínicos (M1-M5) y nicotínicos (nAChR)',
      'Mecanismo catalítico de la Acetilcolinesterasa (AChE)',
      'Inhibidores reversibles y pseudoirreversibles (Carbamatos)',
      'Organofosforados y fenómeno de envejecimiento enzimático',
      'Reactivadores oxímicos (Pralidoxima / 2-PAM)',
      'Fármacos para la enfermedad de Alzheimer (Donepezilo, Rivastigmina)'
    ],
    slideCount: 56,
    pdbTargetId: '2HA4',
    targetName: 'Acetilcolinesterasa en complejo con Acetilcolina (AChE · ACh)',
    status: 'Publicado',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 01: Diapositivas Oficiales Sistema Colinérgico.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 01: Apuntes Magistrales de Fármacos Colinérgicos.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Acetilcolina',
        smiles: 'CC(=O)OCC[N+](C)(C)C',
        formula: 'C7H16NO2+',
        mw: 146.21,
        logP: 0.26,
        hbd: 0,
        hba: 2,
        tpsa: 26.3,
        rotBonds: 3,
        role: 'Neurotransmisor colinérgico endógeno (agonista nAChR y mAChR); catión cuaternario permanente',
        pdbId: '2HA4'
      },
      {
        name: 'Ácido L-glutámico',
        smiles: 'N[C@@H](CCC(=O)O)C(=O)O',
        formula: 'C5H9NO4',
        mw: 147.13,
        logP: -0.74,
        hbd: 3,
        hba: 3,
        tpsa: 100.62,
        rotBonds: 4,
        role: 'Principal neurotransmisor excitador del SNC (NMDA/AMPA/kainato y mGluR)'
      },
      {
        name: 'Ácido L-aspártico',
        smiles: 'N[C@@H](CC(=O)O)C(=O)O',
        formula: 'C4H7NO4',
        mw: 133.10,
        logP: -1.13,
        hbd: 3,
        hba: 3,
        tpsa: 100.62,
        rotBonds: 3,
        role: 'Aminoácido excitador del SNC; agonista de receptores NMDA'
      },
      {
        name: 'GABA (Ácido γ-aminobutírico)',
        smiles: 'NCCCC(=O)O',
        formula: 'C4H9NO2',
        mw: 103.12,
        logP: -0.19,
        hbd: 2,
        hba: 2,
        tpsa: 63.32,
        rotBonds: 3,
        role: 'Principal neurotransmisor inhibidor del SNC (receptores GABAA y GABAB)'
      },
      {
        name: 'Glicina',
        smiles: 'NCC(=O)O',
        formula: 'C2H5NO2',
        mw: 75.07,
        logP: -0.97,
        hbd: 2,
        hba: 2,
        tpsa: 63.32,
        rotBonds: 1,
        role: 'Neurotransmisor inhibidor medular y coagonista obligado del receptor NMDA'
      },
      {
        name: 'Taurina',
        smiles: 'NCCS(=O)(=O)O',
        formula: 'C2H7NO3S',
        mw: 125.15,
        logP: -1.17,
        hbd: 2,
        hba: 3,
        tpsa: 80.39,
        rotBonds: 2,
        role: 'Ácido 2-aminoetanosulfónico; neuromodulador inhibidor y osmolito celular'
      },
      {
        name: 'Noradrenalina',
        smiles: 'NC[C@H](O)c1ccc(O)c(O)c1',
        formula: 'C8H11NO3',
        mw: 169.18,
        logP: 0.09,
        hbd: 4,
        hba: 4,
        tpsa: 86.71,
        rotBonds: 2,
        role: '(R)-(-)-noradrenalina; catecolamina endógena activa sobre adrenoceptores α y β1'
      },
      {
        name: 'Dopamina',
        smiles: 'NCCc1ccc(O)c(O)c1',
        formula: 'C8H11NO2',
        mw: 153.18,
        logP: 0.60,
        hbd: 3,
        hba: 3,
        tpsa: 66.48,
        rotBonds: 2,
        role: 'Catecolamina neurotransmisora; agonista de receptores dopaminérgicos D1-D5'
      },
      {
        name: 'Serotonina (5-HT)',
        smiles: 'NCCc1c[nH]c2ccc(O)cc12',
        formula: 'C10H12N2O',
        mw: 176.22,
        logP: 1.37,
        hbd: 3,
        hba: 2,
        tpsa: 62.04,
        rotBonds: 2,
        role: '5-hidroxitriptamina; indolamina agonista de receptores 5-HT1 a 5-HT7'
      },
      {
        name: '(R)-Metacolina',
        smiles: 'C[C@H](C[N+](C)(C)C)OC(C)=O',
        formula: 'C8H18NO2+',
        mw: 160.24,
        logP: 0.64,
        hbd: 0,
        hba: 2,
        tpsa: 26.3,
        rotBonds: 3,
        role: 'Distómero colinérgico: potencia muscarínica ~200 veces inferior al eutómero (S)'
      },
      {
        name: '(S)-Metacolina',
        smiles: 'C[C@@H](C[N+](C)(C)C)OC(C)=O',
        formula: 'C8H18NO2+',
        mw: 160.24,
        logP: 0.64,
        hbd: 0,
        hba: 2,
        tpsa: 26.3,
        rotBonds: 3,
        role: 'Eutómero muscarínico: β-metilo confiere selectividad y resistencia frente a AChE'
      },
      {
        name: 'Muscarina',
        smiles: 'C[C@@H]1O[C@H](C[N+](C)(C)C)C[C@H]1O',
        formula: 'C9H20NO2+',
        mw: 174.26,
        logP: 0.23,
        hbd: 1,
        hba: 2,
        tpsa: 29.46,
        rotBonds: 2,
        role: 'L-(+)-muscarina (2S,4R,5S); agonista muscarínico natural prototípico cuaternario no éster'
      },
      {
        name: 'Carbacol',
        smiles: 'C[N+](C)(C)CCOC(N)=O',
        formula: 'C6H15N2O2+',
        mw: 147.20,
        logP: -0.21,
        hbd: 1,
        hba: 2,
        tpsa: 52.32,
        rotBonds: 3,
        role: 'Carbamato bioisóstero de acetilcolina resistente a hidrólisis; agonista mixto (M y N)'
      },
      {
        name: 'Betanecol',
        smiles: 'CC(C[N+](C)(C)C)OC(N)=O',
        formula: 'C7H17N2O2+',
        mw: 161.22,
        logP: 0.18,
        hbd: 1,
        hba: 2,
        tpsa: 52.32,
        rotBonds: 3,
        role: 'Carbamato con β-metilo: agonista muscarínico selectivo y estable por vía oral'
      },
      {
        name: 'Atropina',
        smiles: 'CN1[C@@H]2CC[C@H]1C[C@@H](OC(=O)C(CO)c1ccccc1)C2',
        formula: 'C17H23NO3',
        mw: 289.38,
        logP: 1.93,
        hbd: 1,
        hba: 4,
        tpsa: 49.77,
        rotBonds: 4,
        role: 'Alcaloide tropánico ((±)-hiosciamina); antagonista competitivo no selectivo M1-M5'
      },
      {
        name: 'Escopolamina',
        smiles: 'CN1[C@@H]2C[C@@H](OC(=O)[C@H](CO)c3ccccc3)C[C@H]1[C@@H]1O[C@@H]12',
        formula: 'C17H21NO4',
        mw: 303.36,
        logP: 0.92,
        hbd: 1,
        hba: 5,
        tpsa: 62.30,
        rotBonds: 4,
        role: '(-)-hioscina; 6,7-epóxido tropánico con penetración en SNC (cinetosis y preanestesia)'
      },
      {
        name: 'Metilescopolamina',
        smiles: 'C[N+]1(C)[C@@H]2C[C@@H](OC(=O)[C@H](CO)c3ccccc3)C[C@H]1[C@@H]1O[C@@H]12',
        formula: 'C18H24NO4+',
        mw: 318.39,
        logP: 1.06,
        hbd: 1,
        hba: 4,
        tpsa: 59.06,
        rotBonds: 4,
        role: 'N-metil amonio cuaternario; antimuscarínico confinado al territorio periférico'
      },
      {
        name: 'Genescopolamina',
        smiles: 'C[N+]1([O-])[C@@H]2C[C@@H](OC(=O)[C@H](CO)c3ccccc3)C[C@H]1[C@@H]1O[C@@H]12',
        formula: 'C17H21NO5',
        mw: 319.36,
        logP: 0.93,
        hbd: 1,
        hba: 5,
        tpsa: 82.12,
        rotBonds: 4,
        role: 'N-óxido de escopolamina; derivado polar hidrosoluble que se reduce in vivo a escopolamina'
      },
      {
        name: 'Butilescopolamina',
        smiles: 'CCCC[N+]1(C)[C@@H]2C[C@@H](OC(=O)[C@H](CO)c3ccccc3)C[C@H]1[C@@H]1O[C@@H]12',
        formula: 'C21H30NO4+',
        mw: 360.47,
        logP: 2.23,
        hbd: 1,
        hba: 4,
        tpsa: 59.06,
        rotBonds: 7,
        role: 'Butilbromuro de hioscina (Buscapina); antiespasmódico de músculo liso periférico'
      },
      {
        name: 'Metilatropina',
        smiles: 'C[N+]1(C)[C@@H]2CC[C@H]1C[C@@H](OC(=O)C(CO)c1ccccc1)C2',
        formula: 'C18H26NO3+',
        mw: 304.41,
        logP: 2.08,
        hbd: 1,
        hba: 3,
        tpsa: 46.53,
        rotBonds: 4,
        role: 'N-metilatropina cuaternaria; antimuscarínico estrictamente periférico y midriático'
      },
      {
        name: 'Genatropina',
        smiles: 'C[N+]1([O-])[C@@H]2CC[C@H]1C[C@@H](OC(=O)C(CO)c1ccccc1)C2',
        formula: 'C17H23NO4',
        mw: 305.37,
        logP: 1.94,
        hbd: 1,
        hba: 4,
        tpsa: 69.59,
        rotBonds: 4,
        role: 'N-óxido de atropina (aminóxido); forma polar con bio-reducción in vivo a amina terciaria'
      },
      {
        name: 'Ipratropio',
        smiles: 'CC(C)[N+]1(C)[C@@H]2CC[C@H]1C[C@@H](OC(=O)C(CO)c1ccccc1)C2',
        formula: 'C20H30NO3+',
        mw: 332.46,
        logP: 2.85,
        hbd: 1,
        hba: 3,
        tpsa: 46.53,
        rotBonds: 5,
        role: 'Bromuro de ipratropio (Atrovent); broncodilatador cuaternario por confinamiento local en EPOC'
      },
      {
        name: 'Fisostigmina',
        smiles: 'CNC(=O)Oc1ccc2c(c1)[C@]1(C)CCN(C)[C@@H]1N2C',
        formula: 'C15H21N3O2',
        mw: 275.35,
        logP: 1.77,
        hbd: 1,
        hba: 4,
        tpsa: 44.81,
        rotBonds: 1,
        role: '(-)-eserina; carbamato natural inhibidor pseudoirreversible de AChE con paso a SNC'
      },
      {
        name: 'Neostigmina',
        smiles: 'CN(C)C(=O)Oc1cccc([N+](C)(C)C)c1',
        formula: 'C12H19N2O2+',
        mw: 223.30,
        logP: 1.94,
        hbd: 0,
        hba: 2,
        tpsa: 29.54,
        rotBonds: 2,
        role: 'Carbamato sintético cuaternario periférico; inhibidor de AChE y agonista nicotínico'
      },
      {
        name: 'Pralidoxima (2-PAM)',
        smiles: 'C[n+]1ccccc1C=NO',
        formula: 'C7H9N2O+',
        mw: 137.16,
        logP: 0.32,
        hbd: 1,
        hba: 2,
        tpsa: 36.47,
        rotBonds: 1,
        role: 'Reactivador nucleofílico oxímico de AChE fosforilada por organofosforados'
      },
      {
        name: 'Atracurio',
        smiles: 'COc1ccc(CC2c3cc(OC)c(OC)cc3CC[N+]2(C)CCC(=O)OCCCCCOC(=O)CC[N+]2(C)CCc3cc(OC)c(OC)cc3C2Cc2ccc(OC)c(OC)c2)cc1OC',
        formula: 'C53H72N2O12+2',
        mw: 929.16,
        logP: 8.07,
        hbd: 0,
        hba: 12,
        tpsa: 126.44,
        rotBonds: 24,
        role: 'Bloqueante neuromuscular biscuaternario inactivado por degradación de Hofmann espontánea'
      },
      {
        name: 'Donepezilo',
        smiles: 'COC1=C(C=C2C(=C1)CC(C2=O)CC3CCN(CC3)CC4=CC=CC=C4)OC',
        formula: 'C24H29NO3',
        mw: 379.50,
        logP: 4.27,
        hbd: 0,
        hba: 4,
        tpsa: 38.8,
        rotBonds: 6,
        role: 'Inhibidor reversible y específico de AChE para enfermedad de Alzheimer',
        pdbId: '4EY7'
      },
      {
        name: 'Rivastigmina',
        smiles: 'CCN(C)C(=O)OC1=CC=CC(=C1)[C@H](C)N(C)C',
        formula: 'C14H22N2O2',
        mw: 250.34,
        logP: 2.30,
        hbd: 0,
        hba: 3,
        tpsa: 32.8,
        rotBonds: 4,
        role: 'Inhibidor carbamato de acción pseudoirreversible en SNC (Alzheimer)'
      },
      {
        name: 'Acetil coenzima A',
        smiles: 'CC(=O)SCCNC(=O)CCNC(=O)[C@H](O)C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@H]1O[C@@H](n2cnc3c(N)ncnc32)[C@H](O)[C@@H]1OP(=O)(O)O',
        formula: 'C23H38N7O17P3S',
        mw: 809.58,
        logP: -1.32,
        hbd: 9,
        hba: 18,
        tpsa: 363.63,
        rotBonds: 19,
        role: 'Donante de acetilo en la biosíntesis presináptica de acetilcolina vía ChAT (tioéster activo de alta energía)'
      },
      {
        name: 'Adifenina',
        smiles: 'CCN(CC)CCOC(=O)C(c1ccccc1)c1ccccc1',
        formula: 'C20H25NO2',
        mw: 311.43,
        logP: 3.70,
        hbd: 0,
        hba: 3,
        tpsa: 29.54,
        rotBonds: 8,
        role: 'Aminoéster sintético; simplificación del tropano a dietilaminoetilo y éster de difenilacetato'
      },
      {
        name: 'Benactizina',
        smiles: 'CCN(CC)CCOC(=O)C(O)(c1ccccc1)c1ccccc1',
        formula: 'C20H25NO3',
        mw: 327.42,
        logP: 2.81,
        hbd: 1,
        hba: 4,
        tpsa: 49.77,
        rotBonds: 8,
        role: 'Éster del ácido bencílico (difenilglicolato); hidroxilo en alfa que incrementa la afinidad muscarínica y penetración en SNC'
      },
      {
        name: 'Propantelina',
        smiles: 'CC(C)[N+](C)(CCOC(=O)C1c2ccccc2Oc2ccccc21)C(C)C',
        formula: 'C23H30NO3+',
        mw: 368.50,
        logP: 4.73,
        hbd: 0,
        hba: 3,
        tpsa: 35.53,
        rotBonds: 6,
        role: 'Aminoéster cuaternario con puente tricíclico xanteno rígido; antiespasmódico periférico sin efectos centrales'
      },
      {
        name: 'Piperidolato',
        smiles: 'CCN1CCCC(C1)OC(=O)C(c1ccccc1)c1ccccc1',
        formula: 'C21H25NO2',
        mw: 323.44,
        logP: 3.85,
        hbd: 0,
        hba: 3,
        tpsa: 29.54,
        rotBonds: 5,
        role: 'Aminoéster con ciclo piperidínico (1-etilpiperidin-3-ilo); rigidez conformacional entre nitrógeno básico y éster'
      },
      {
        name: 'Ciclopentolato',
        smiles: 'CN(C)CCOC(=O)C(c1ccccc1)C1(O)CCCC1',
        formula: 'C17H25NO3',
        mw: 291.39,
        logP: 2.18,
        hbd: 1,
        hba: 4,
        tpsa: 49.77,
        rotBonds: 6,
        role: 'Patrón mandélico con ciclopentilo e hidroxilo terciario; midriático y ciclopléjico oftálmico de acción breve'
      },
      {
        name: 'Trihexifenidilo',
        smiles: 'OC(CCN1CCCCC1)(c1ccccc1)C1CCCCC1',
        formula: 'C20H31NO',
        mw: 301.47,
        logP: 4.33,
        hbd: 1,
        hba: 2,
        tpsa: 23.47,
        rotBonds: 5,
        role: 'Aminopropanol carbinólico sin función éster (resistente a esterasas); antiparkinsoniano anticolinérgico central'
      },
      {
        name: 'Isopropamida',
        smiles: 'CC(C)[N+](C)(CCC(C(N)=O)(c1ccccc1)c1ccccc1)C(C)C',
        formula: 'C23H33N2O+',
        mw: 353.53,
        logP: 4.11,
        hbd: 1,
        hba: 1,
        tpsa: 43.09,
        rotBonds: 8,
        role: 'Amidoamonio cuaternario (butanamida); catión periférico no hidrolizable por esterasas y acción antimuscarínica prolongada'
      },
      {
        name: 'Yoduro de isopropamida',
        smiles: 'CC(C)[N+](C)(CCC(C(N)=O)(c1ccccc1)c1ccccc1)C(C)C.[I-]',
        formula: 'C23H33IN2O',
        mw: 480.43,
        logP: 1.12,
        hbd: 1,
        hba: 1,
        tpsa: 43.09,
        rotBonds: 8,
        role: 'Forma farmacéutica en sal de yoduro comercial de la isopropamida'
      },
      {
        name: 'Benztropina',
        smiles: 'CN1[C@@H]2CC[C@H]1C[C@@H](OC(c1ccccc1)c1ccccc1)C2',
        formula: 'C21H25NO',
        mw: 307.44,
        logP: 4.42,
        hbd: 0,
        hba: 2,
        tpsa: 12.47,
        rotBonds: 4,
        role: 'Éter tropánico con benzhidrilo (híbrido atropina-difenhidramina); TPSA mínima (12.47), antiparkinsoniano central e inhibidor de DAT'
      },
      {
        name: 'Succinilcolina',
        smiles: 'C[N+](C)(C)CCOC(=O)CCC(=O)OCC[N+](C)(C)C',
        formula: 'C14H30N2O4+2',
        mw: 290.40,
        logP: 0.27,
        hbd: 0,
        hba: 4,
        tpsa: 52.60,
        rotBonds: 9,
        role: 'Suxametonio (dímero éster succínico de acetilcolina); bloqueante neuromuscular despolarizante de acción ultracorta (hidrólisis por BChE)'
      },
      {
        name: 'Pilocarpina',
        smiles: 'CC[C@@H]1C(=O)OC[C@@H]1Cc1cncn1C',
        formula: 'C11H16N2O2',
        mw: 208.26,
        logP: 1.16,
        hbd: 0,
        hba: 3,
        tpsa: 44.12,
        rotBonds: 3,
        role: 'Alcaloide de Pilocarpus jaborandi; agonista muscarínico no cuaternario con γ-butirolactona e imidazol (glaucoma y xerostomía)'
      },
      {
        name: 'Biperideno',
        smiles: 'OC(CCN1CCCCC1)(c1ccccc1)C1CC2C=CC1C2',
        formula: 'C21H29NO',
        mw: 311.47,
        logP: 3.96,
        hbd: 1,
        hba: 2,
        tpsa: 23.47,
        rotBonds: 5,
        role: 'Aminopropanol con norbornenilo rígido y piperidina; antiparkinsoniano central y corrector de extrapiramidalismos por neurolépticos'
      },
      {
        name: 'Prociclidina',
        smiles: 'OC(CCN1CCCC1)(c1ccccc1)C1CCCCC1',
        formula: 'C19H29NO',
        mw: 287.45,
        logP: 3.94,
        hbd: 1,
        hba: 2,
        tpsa: 23.47,
        rotBonds: 5,
        role: 'Aminopropanol con pirrolidina en vez de piperidina; antiparkinsoniano antimuscarínico con idéntica firma polar a trihexifenidilo'
      }
    ],
    attachments: [
      {
        id: 'att-t01-nachr-3d',
        title: 'Modelo 3D: "Nicotinic Acetylcholine Receptor" (British Pharmacological Society · CC BY 4.0)',
        type: 'model3d',
        url: 'models/nicotinic_acetylcholine_receptor.glb',
        size: '7.0 MB',
        date: '17/09/2026'
      },
      {
        id: 'att-t01-estructuras-xlsx',
        title: 'Base de Datos Oficial de Estructuras QFDOS (40 estructuras · Bloques 1-8)',
        type: 'data',
        url: 'estructuras/estructuras_qfdos.xlsx',
        size: '722 KB',
        date: '17/09/2026'
      },
      {
        id: 'att-t01-propiedades-csv',
        title: 'Tabla de Descriptores Fisicoquímicos y SAR QFDOS (CSV RDKit)',
        type: 'data',
        url: 'estructuras/propiedades_qfdos.csv',
        size: '42 KB',
        date: '17/09/2026'
      }
    ],
    testQuestions: [

      {
        id: 't01-retro-01',
        topicId: 'tema-01',
        block: 'Retrosíntesis & Desconexiones',
        badge: 'Retrosíntesis',
        question: 'En el análisis retrosintético del bencilmalonato de dietilo (precursor de análogos anticolinérgicos), se descarta el corte "b" (enlace Ph-CH2) frente al corte "a" (enlace PhCH2-CH). ¿Cuál es la justificación electrónica y orbital que invalida el corte "b"?',
        questionSmiles: 'CCOC(=O)C(Cc1ccccc1)C(=O)OCC',
        imagePath: '/retrosintesis/slide29_bencilmalonato_desconexion.png',
        options: [
          { text: 'El sintón bencilo [PhCH2]+ derivado de "b" experimenta una transposición sigmatrópica irreversible a ión tropilio inerte.', smiles: 'c1ccccc1C=Cc2ccccc2' },
          { text: 'El sintón fenilo [Ph]+ posee la vacante electrónica en un orbital sp2 ortogonal al sistema pi, resultando inaccesible.', smiles: 'c1ccccc1[CH2+]' },
          { text: 'El bromobenceno resultante como equivalente de "b" actúa como base de Brønsted desprotonando al malonato por vía E2.', smiles: 'c1ccccc1Br' },
          { text: 'El fragmento malonato aniónico derivado de "b" pierde la capacidad de quelación bidentada con el contracatión metálico.', smiles: 'CCOC(=O)[CH-]C(=O)OCC' }
        ],
        correctIndex: 1,
        explanation: 'El catión fenilo [Ph]+ posee la vacante en un orbital híbrido sp2 en el plano del anillo, perpendicular a los orbitales p del sistema pi aromático, por lo que no puede estabilizarse por resonancia y su formación es energéticamente inviable. En cambio, el corte "a" genera el catión bencilo [PhCH2]+, fuertemente estabilizado por deslocalización en el anillo, y el carbanión malonato estabilizado por dos carbonilos.',
        difficulty: 'Medio'
      },
      {
        id: 't01-retro-02',
        topicId: 'tema-01',
        block: 'Retrosíntesis & Desconexiones',
        badge: 'Retrosíntesis',
        question: 'En la síntesis de Ciclopentolato (midriático oftálmico), la adición organometálica directa sobre ciclopentanona fracasa con bajos rendimientos. ¿Qué factor mecanístico hace indispensable el reactivo de Ivanov (dianión de fenilacetato)?',
        questionSmiles: 'CN(C)CCOC(=O)C(c1ccccc1)C1(O)CCCC1',
        imagePath: '/retrosintesis/slide32_ciclopentolato_ivanov.png',
        options: [
          { text: 'La ciclopentanona sufre apertura electrocíclica por tensión angular de anillo frente a carbaniones monodesprotonados.', smiles: 'O=C1CCCC1' },
          { text: 'El reactivo de Grignard oxida competitivamente el alcohol terciario recién formado hacia una dicetona bicíclica inestable.', smiles: 'O=C(c1ccccc1)C1(=O)CCCC1' },
          { text: 'La ciclopentanona se enoliza frente a bases duras, mientras que el dianión de Ivanov actúa como nucleófilo blando eficaz.', smiles: 'O=C(O)C(c1ccccc1)C1(O)CCCC1' },
          { text: 'El fenilacetato de etilo monovalente experimenta autocondensación de Claisen irreversible antes de atacar a la cetona.', smiles: 'CCOC(=O)Cc1ccccc1' }
        ],
        correctIndex: 2,
        explanation: 'La ciclopentanona posee protones alfa accesibles y un ángulo de enlace en el ciclo de 5 miembros que favorece la enolización competitiva frente a bases carbaniónicas duras. El dianión de Ivanov (generado a partir de ácido fenilacético y 2 equivalentes de i-PrMgCl) actúa como un nucleófilo blando con reducida basicidad libre, adicionándose regioselectivamente en 1,2 al carbonilo para rendir el hidroxiácido con rendimientos superiores al 80%.',
        difficulty: 'Avanzado'
      },
      {
        id: 't01-retro-03',
        topicId: 'tema-01',
        block: 'Retrosíntesis & Desconexiones',
        badge: 'Retrosíntesis',
        question: 'El antiespasmódico Piperidolato contiene el fragmento heterocíclico 1-etilpiperidin-3-ol. En su preparación a partir de furfural agroindustrial, ¿cuál es la secuencia sintética que expande el anillo furánico al ciclo piperidínico?',
        questionSmiles: 'CCN1CCCC(C1)OC(=O)C(c1ccccc1)c1ccccc1',
        imagePath: '/retrosintesis/slide33_aminoesteres_piperidolato.png',
        options: [
          { text: 'Aminación reductiva con etilamina, transposición furan-piridina con HBr/AcOH caliente e hidrogenación catalítica.', smiles: 'CCN1CCCC(O)C1' },
          { text: 'Condensación aldólica con nitrometano, reducción a amina primaria y dialquilación con 1,3-dibromopropano a reflujo.', smiles: 'CCN1CCCCC1' },
          { text: 'Oxidación de Baeyer-Villiger a tetrahidrofurano-2-ona, aminólisis con etilamina y reducción exhaustiva con hidruro de litio.', smiles: 'O=C1CCCCO1' },
          { text: 'Ozonólisis oxidativa a ácido dicarboxílico alifático, condensación a imida con etilamina y reducción con diborano.', smiles: 'O=C1CCCNC1=O' }
        ],
        correctIndex: 0,
        explanation: 'La aminación reductiva del furfural con etilamina rinde N-(furfuril)etilamina. El tratamiento posterior con HBr al 48% en ácido acético glacial provoca la apertura hidrolítica del furano y la posterior reciclación intramolecular del grupo amino sobre el centro carbonílico terminal, transponiéndose a bromuro de 1-etil-3-hidroxipiridinio. Su hidrogenación catalítica sobre PtO2 satura el anillo aromático produciendo 1-etilpiperidin-3-ol racémico.',
        difficulty: 'Avanzado'
      },
      {
        id: 't01-retro-04',
        topicId: 'tema-01',
        block: 'Retrosíntesis & Desconexiones',
        badge: 'Retrosíntesis',
        question: 'La retrosíntesis del Trihexifenidilo (antiparkinsoniano central) desconecta el carbinol terciario a una beta-aminocetona aromática. ¿Qué proceso multicomponente permite la construcción directa de este intermedio?',
        questionSmiles: 'OC(CCN1CCCCC1)(c1ccccc1)C1CCCCC1',
        imagePath: '/retrosintesis/slide34_trihexifenidilo_aminopropanol.png',
        options: [
          { text: 'Adición conjugada de Michael entre fenil vinil cetona y piperidina libre catalizada por fluoruro de tetrabutilamonio.', smiles: 'O=C(c1ccccc1)C=C' },
          { text: 'Acilación de Friedel-Crafts de benceno con cloruro de 3-(piperidin-1-il)propanoilo y tricloruro de aluminio anhidro.', smiles: 'ClC(=O)CCN1CCCCC1' },
          { text: 'Reacción organozíncica de Reformatsky entre 2-bromoacetofenona, piperidina y polvo de zinc en tetrahidrofurano seco.', smiles: 'O=C(c1ccccc1)CBr' },
          { text: 'Condensación de Mannich en medio ácido acuoso entre acetofenona, formaldehído y clorhidrato de piperidina a reflujo.', smiles: 'O=C(c1ccccc1)CCN2CCCCC2' }
        ],
        correctIndex: 3,
        explanation: 'La reacción de Mannich condensa la acetofenona (componente enolizable), el formaldehído (fuente electrofílica no enolizable) y el clorhidrato de piperidina (amina secundaria) en presencia de una cantidad catalítica de ácido clorhídrico, generando directamente la base de Mannich 1-fenil-3-(piperidin-1-il)propan-1-ona con excelente rendimiento, lista para la adición de bromuro de ciclohexilmagnesio.',
        difficulty: 'Medio'
      },
      {
        id: 't01-retro-05',
        topicId: 'tema-01',
        block: 'Retrosíntesis & Desconexiones',
        badge: 'Retrosíntesis',
        question: 'En la preparación sintética de la Isopropamida (antimuscarínico periférico), ¿cuál es la estrategia química idónea para introducir la función carbamoilo (-CONH2) sobre el centro cuaternario altamente impedido?',
        questionSmiles: 'CC(C)[N+](C)(CCC(C(N)=O)(c1ccccc1)c1ccccc1)C(C)C',
        imagePath: '/retrosintesis/slide35_isopropamida_amidoamonio.png',
        options: [
          { text: 'Acoplamiento directo del ácido carboxílico precursor con cloruro amónico usando carbodiimida como deshidratante.', smiles: 'NC(=O)C(c1ccccc1)(c1ccccc1)CC[N+](C)(C(C)C)C(C)C' },
          { text: 'Alquilación de 2,2-difenilacetonitrilo con 2-(diisopropilamino)cloroetano e hidrólisis ácida parcial con ácido sulfúrico.', smiles: 'N#CC(c1ccccc1)(c1ccccc1)CCN(C(C)C)C(C)C' },
          { text: 'Carboxilación de difenilmetano con cloroformiato de etilo, aminólisis en amoníaco gas y dialquilación con bromoisopropano.', smiles: 'CCOC(=O)C(c1ccccc1)c1ccccc1' },
          { text: 'Transposición de Hofmann sobre el intermedio difenilsuccinimida seguida de monoalquilación con óxido de propileno anhidro.', smiles: 'O=C1CC(c2ccccc2)(c2ccccc2)C(=O)N1' }
        ],
        correctIndex: 1,
        explanation: 'La desprotonación del 2,2-difenilacetonitrilo con amida sódica (NaNH2) en tolueno genera un carbanión alfa muy reactivo que alquila con limpieza al 2-(diisopropilamino)cloroetano. El nitrilo terciario resultante se hidrata de forma altamente quimioselectiva a amida primaria mediante tratamiento con H2SO4 al 85% a 90 °C, deteniéndose en la amida gracias al impedimento estérico que previene la hidrólisis completa a ácido.',
        difficulty: 'Medio'
      },
      {
        id: 't01-retro-06',
        topicId: 'tema-01',
        block: 'Retrosíntesis & Desconexiones',
        badge: 'SAR & Farmacocinética',
        question: 'Al comparar la farmacocinética de Trihexifenidilo e Isopropamida, ¿qué rasgo estructural diferencial justifica que el primero penetre en SNC (Parkinson) mientras que el segundo ejerza una acción exclusivamente periférica?',
        questionSmiles: 'OC(CCN1CCCCC1)(c1ccccc1)C1CCCCC1',
        options: [
          { text: 'Trihexifenidilo posee una amina 3ª lipófila que cruza la BHE; Isopropamida un amonio 4º con exclusión de paso al SNC.', smiles: 'OC(CCN1CCCCC1)(c1ccccc1)C1CCCCC1' },
          { text: 'Trihexifenidilo se inactiva por esterasas séricas en plasma; Isopropamida se metaboliza por monoamino oxidasa hepática.', smiles: 'CCN(CC)CCOC(=O)C(c1ccccc1)c1ccccc1' },
          { text: 'Trihexifenidilo se une covalentemente a la albúmina humana; Isopropamida polimeriza por el pH ácido gástrico en estómago.', smiles: 'CC(C)[N+](C)(CCC(C(N)=O)(c1ccccc1)c1ccccc1)C(C)C' },
          { text: 'Trihexifenidilo carece de grupos aromáticos lipófilos; Isopropamida contiene tres núcleos bencénicos con quelación metálica.', smiles: 'CCN1CCCC(C1)OC(=O)C(c1ccccc1)c1ccccc1' }
        ],
        correctIndex: 0,
        explanation: 'El Trihexifenidilo presenta una amina terciaria alifática básica (pKa ≈ 9.3) y un carbinol terciario lipófilo (logP = 4.33, TPSA = 23.5 Å²), lo que le permite atravesar pasivamente la barrera hematoencefálica (BHE) para actuar en el cuerpo estriado. Por el contrario, la Isopropamida posee un catión amonio cuaternario permanente que confiere una carga formal neta positiva a cualquier pH fisiológico, impidiendo su difusión a través de las membranas endoteliales de la BHE y confinándola a receptores muscarínicos periféricos (aparato digestivo).',
        difficulty: 'Medio'
      },
      {
        id: 't01-retro-07',
        topicId: 'tema-01',
        block: 'Retrosíntesis & Desconexiones',
        badge: 'Retrosíntesis',
        question: 'En la desconexión del enlace éster acilo-oxígeno (C(=O)-O) del antiespasmódico Adifenina, ¿cuáles son los sintones idealizados resultantes y sus correspondientes equivalentes sintéticos comerciales?',
        questionSmiles: 'CCN(CC)CCOC(=O)C(c1ccccc1)c1ccccc1',
        imagePath: '/retrosintesis/slide30_difenilmetano_carbonatacion.png',
        options: [
          { text: 'Sintón acilo nucleófilo [Ph2CH-CO]- (reactivo: difenilcetena) y sintón catiónico [OCH2CH2NEt2]+ (reactivo: cloroamina terciaria).', smiles: 'O=C=C(c1ccccc1)c1ccccc1' },
          { text: 'Sintón carbenoide [Ph2C=C=O] (reactivo: diazocetona) y sintón aniónico [CH2CH2NEt2]- (reactivo: organolítico alifático).', smiles: 'CCN(CC)CC' },
          { text: 'Sintón catión acilio [Ph2CH-CO]+ (reactivo: cloruro de difenilacetilo) y sintón alcóxido [OCH2CH2NEt2]- (reactivo: dietilaminoetanol).', smiles: 'ClC(=O)C(c1ccccc1)c1ccccc1' },
          { text: 'Sintón radical [Ph2CH-CO]· (reactivo: perácido difenílico) y sintón oxonio [HO-CH2CH2NEt2]+ (reactivo: sal de pirilio cíclica).', smiles: 'CCN(CC)CCO' }
        ],
        correctIndex: 2,
        explanation: 'La ruptura heterolítica estándar del enlace éster acilo-oxígeno asigna la carga positiva al carbono carbonílico (sintón catión acilio [R-CO]+) debido a la mayor electronegatividad del oxígeno, que retiene el par electrónico convirtiéndose en el sintón alcóxido [RO]-. Los equivalentes sintéticos comerciales son el cloruro de difenilacetilo (Ph2CH-COCl, electrófilo) y el 2-(dietilamino)etanol (HOCH2CH2NEt2, nucleófilo).',
        difficulty: 'Fácil'
      },
      {
        id: 't01-retro-08',
        topicId: 'tema-01',
        block: 'Retrosíntesis & Desconexiones',
        badge: 'Retrosíntesis',
        question: 'Para la síntesis del fragmento ácido de la Benactizina (ácido bencílico o difenilglicólico), ¿qué reacción clásica de química orgánica transforma una 1,2-dicetona simétrica en este alfa-hidroxiácido?',
        questionSmiles: 'CCN(CC)CCOC(=O)C(O)(c1ccccc1)c1ccccc1',
        imagePath: '/retrosintesis/slide31_alcoholes_cianhidrinas_acetilenicos.png',
        options: [
          { text: 'Condensación benzoínica entre dos moléculas de benzaldehído catalizada por cianuro potásico en etanol acuoso a reflujo.', smiles: 'O=C(c1ccccc1)C(O)c2ccccc2' },
          { text: 'Reacción de Cannizzaro cruzada entre benzofenona y formaldehído anhidro empleando hidróxido potásico en medio no polar.', smiles: 'O=C(c1ccccc1)c2ccccc2' },
          { text: 'Oxidación de Oppenauer de 1,2-difeniletanol empleando isopropóxido de aluminio y ciclopentanona como aceptor de hidruro.', smiles: 'OC(Cc1ccccc1)c2ccccc2' },
          { text: 'Transposición del ácido bencílico a partir de bencilo (1,2-difeniletano-1,2-diona) inducida por hidróxido potásico acuoso.', smiles: 'O=C(c1ccccc1)C(=O)c2ccccc2' }
        ],
        correctIndex: 3,
        explanation: 'La transposición del ácido bencílico consiste en el ataque nucleófilo del ión hidróxido (OH-) a uno de los carbonilos del bencilo (Ph-CO-CO-Ph), seguido de una migración 1,2 intramolecular concertada del grupo fenilo con su par de electrones al carbonilo vecino adyacente. La posterior transferencia protónica rinde el anión difenilglicolato (ácido bencílico) con rendimiento prácticamente cuantitativo.',
        difficulty: 'Medio'
      }
    ],
    flashcards: [
      {
        id: 'fc-01-1',
        topicId: 'tema-01',
        concept: 'Mecanismo de Pralidoxima (2-PAM)',
        front: '¿Cuál es el mecanismo químico exacto por el que la pralidoxima reactiva la AChE intoxicada?',
        back: 'El nitrógeno cuaternario de 2-PAM se ancla en el subsitio aniónico de la enzima, orientando geométricamente su grupo oxima (=N-OH) desprotonado para realizar un ataque nucleofílico sobre el átomo de fósforo del organofosforado unido a la Serina catalítica, liberando la enzima activa.',
        smiles: 'C[N+]1=CC=CC=C1/C=N/O',
        difficulty: 'medium',
        category: 'Mecanismos Químicos'
      },
      {
        id: 'fc-01-2',
        topicId: 'tema-01',
        concept: 'Envejecimiento Enzimático (Aging)',
        front: '¿Qué reacción química irreversible define el "envejecimiento" de la AChE fosforilada por organofosforados?',
        back: 'La desalquilación no enzimática de una de las cadenas alcoxi del organofosforado unido a la Serina. Esto genera una carga negativa formal sobre el átomo de oxígeno que repele electrostáticamente a reactivadores como la pralidoxima, haciendo irreversible la inhibición.',
        difficulty: 'hard',
        category: 'Toxicología Molecular'
      }
    ]
  },
  {
    id: 'tema-02',
    number: 'Tema 02',
    title: 'Sistema Adrenérgico',
    subtitle: 'Catecolaminas, Agonistas β2 Selectivos y Antagonistas β-bloqueantes',
    description: 'Biosíntesis y degradación de catecolaminas (MAO, COMT). Diferenciación estructural entre receptores alfa (α1, α2) y beta (β1, β2, β3). SAR de feniletanolaminas y ariloxipropanolaminas. Diseño de agonistas β2 de acción corta (SABA) y prolongada (LABA/ultra-LABA) para asma/EPOC, y desarrollo de β-bloqueantes cardio-selectivos (metoprolol, atenolol, bisoprolol).',
    keyConcepts: [
      'SAR de catecolaminas y sustitución en el nitrógeno amino',
      'Protección metabólica frente a COMT (sustitución saligenina/resorcinol)',
      'Agonistas selectivos β2: Salbutamol, Salmeterol, Formoterol, Indacaterol',
      'Evolución de β-bloqueantes: Dicloroisoprenalina a Propranolol',
      'Ariloxipropanolaminas y cardio-selectividad β1 (Atenolol, Bisoprolol)',
      'Efectos vasculares adicionales (Carvedilol, Nebivolol)'
    ],
    slideCount: 64,
    pdbTargetId: '2RH1',
    targetName: 'Receptor β2-Adrenérgico Humano unido a Timolol',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 02: Diapositivas Oficiales Sistema Adrenérgico.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 02: Apuntes de Agonistas β2 y β-bloqueantes.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Salbutamol',
        smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
        role: 'Agonista selectivo β2 de acción corta (SABA)',
        mw: 239.31,
        logP: 0.64,
        hbd: 3,
        hba: 4,
        tpsa: 72.7,
        rotBonds: 5,
        pdbId: '2RH1'
      },
      {
        name: 'Propranolol',
        smiles: 'CC(C)NCC(O)COc1cccc2ccccc12',
        role: 'Antagonista β-adrenérgico no selectivo clásico',
        mw: 259.34,
        logP: 2.60,
        hbd: 2,
        hba: 3,
        tpsa: 41.5,
        rotBonds: 6
      },
      {
        name: 'Atenolol',
        smiles: 'CC(C)NCC(O)COc1ccc(CC(=O)N)cc1',
        role: 'Antagonista β1 cardio-selectivo hidrofílico',
        mw: 266.34,
        logP: 0.16,
        hbd: 3,
        hba: 4,
        tpsa: 84.6,
        rotBonds: 7
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't02-q1',
        topicId: 'tema-02',
        block: 'SAR Adrenérgico',
        question: '¿Qué modificación química en el anillo aromático confiere al salbutamol resistencia metabólica frente a la enzima catecol-O-metiltransferasa (COMT) conservando la activación agonista β2?',
        questionSmiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
        options: [
          'La adición de dos átomos de cloro en posiciones orto (3,5-dicloro).',
          'La sustitución del grupo catecol 3-hidroxilo por un grupo hidroximetilo (-CH2OH, alcohol saligenínico).',
          'La eliminación completa del grupo fenólico en posición 4.',
          'La introducción de un grupo sulfonamida voluminoso.'
        ],
        correctIndex: 1,
        explanation: 'El grupo hidroximetilo en posición 3 (alcohol saligenina) no es reconocido como sustrato por la COMT pero mantiene la capacidad de formar los enlaces de hidrógeno esenciales con el receptor β2-adrenérgico.',
        difficulty: 'Medio'
      },
      {
        id: 't02-q2',
        topicId: 'tema-02',
        block: 'Estructuras de β-bloqueantes',
        question: '¿Cuál de las siguientes moléculas corresponde a un β-bloqueante cardio-selectivo (β1) que contiene una ariloxipropanolamina con sustituyente para-amida hidrofílico?',
        options: [
          { text: 'Atenolol (para-acetamida ariloxipropanolamina)', smiles: 'CC(C)NCC(O)COc1ccc(CC(=O)N)cc1' },
          { text: 'Propranolol (naftil ariloxipropanolamina no selectiva)', smiles: 'CC(C)NCC(O)COc1cccc2ccccc12' },
          { text: 'Salbutamol (agonista β2 saligenina)', smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1' },
          { text: 'Adrenalina (catecolamina natural)', smiles: 'CNC[C@H](O)c1ccc(O)c(O)c1' }
        ],
        correctIndex: 0,
        explanation: 'El atenolol incorpora el grupo p-acetamida (-CH2-CO-NH2) que interactúa específicamente con residuos del receptor β1 cardíaco y disminuye la lipofilia global, reduciendo el paso a través de la BHE.',
        difficulty: 'Medio'
      }
    ],
    flashcards: [
      {
        id: 'fc-02-1',
        topicId: 'tema-02',
        concept: 'SAR de Ariloxipropanolaminas',
        front: '¿Cuál es el motivo estructural común presente en la mayoría de los antagonistas β-bloqueantes de segunda y tercera generación?',
        back: 'La cadena lateral de ariloxipropanolamina: Ar-O-CH2-CH(OH)-CH2-NH-R, donde la configuración estereoquímica activa es siempre (S) debido a la inserción del átomo de oxígeno que altera las reglas CIP respecto a las feniletanolaminas (R).',
        smiles: 'CC(C)NCC(O)COc1cccc2ccccc12',
        difficulty: 'hard',
        category: 'SAR & Estereoquímica'
      }
    ]
  },
  {
    id: 'tema-03',
    number: 'Tema 03',
    title: 'Sistema Dopaminérgico',
    subtitle: 'Agonistas Antiparkinsonianos y Antipsicóticos Clásicos vs. Atípicos (D2/5-HT2A)',
    description: 'Vías dopaminérgicas centrales (mesolímbica, mesocortical, nigroestriada y tuberoinfundibular). Diseño de precursores y agonistas dopaminérgicos para el tratamiento del Parkinson (Levodopa, Carbidopa, Pramipexol). Antipsicóticos típicos (fenotiazinas, tioxantenos, butirofenonas) y desarrollo de antipsicóticos atípicos multidiada con menor riesgo de síntomas extrapiramidales (Clozapina, Olanzapina, Risperidona, Aripiprazol).',
    keyConcepts: [
      'Receptores D1-like (D1, D5) y D2-like (D2, D3, D4)',
      'Transportador LAT1 y profármacos de dopamina (Levodopa)',
      'Inhibidores periféricos de AADC (Carbidopa, Benserazida) e inhibidores de COMT (Entacapona)',
      'SAR de Fenotiazinas (Clorpromazina) y Butirofenonas (Haloperidol)',
      'Perfil multidiada D2/5-HT2A en antipsicóticos atípicos',
      'Agonismo parcial en el receptor D2 (Aripiprazol)'
    ],
    slideCount: 52,
    pdbTargetId: '6CM4',
    targetName: 'Receptor Dopaminérgico D2 Humano unido a Risperidona',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 03: Diapositivas Oficiales Sistema Dopaminérgico.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 03: Apuntes Magistrales Fármacos Dopaminérgicos.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Haloperidol',
        smiles: 'C1CN(CCC1(C2=CC=C(C=C2)Cl)O)CCCC(=O)C3=CC=C(C=C3)F',
        role: 'Antipsicótico clásico butirofenona de alta potencia D2',
        mw: 375.86,
        logP: 4.30,
        hbd: 1,
        hba: 3,
        tpsa: 40.5,
        rotBonds: 6
      },
      {
        name: 'Olanzapina',
        smiles: 'Cc1cc2c(s1)Nc3ccccc3N=C2N4CCN(CC4)C',
        role: 'Antipsicótico atípico tienobenzodiazepínico D2/5-HT2A',
        mw: 312.43,
        logP: 2.80,
        hbd: 1,
        hba: 3,
        tpsa: 36.6,
        rotBonds: 1
      },
      {
        name: 'Levodopa',
        smiles: 'C1=CC(=C(C=C1C[C@@H](C(=O)O)N)O)O',
        role: 'Precursor biosintético de dopamina que cruza BHE vía LAT1',
        mw: 197.19,
        logP: -2.39,
        hbd: 4,
        hba: 4,
        tpsa: 103.8,
        rotBonds: 3
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't03-q1',
        topicId: 'tema-03',
        block: 'Antipsicóticos',
        question: '¿Cuál es la razón principal por la que los antipsicóticos atípicos como la clozapina u olanzapina presentan una incidencia significativamente menor de síntomas extrapiramidales (SEP) que los neurolépticos típicos como el haloperidol?',
        options: [
          'Su afinidad nula por todos los receptores del sistema nervioso central.',
          'Su elevada relación de antagonismo 5-HT2A frente a D2 y su rápida velocidad de disociación ("fast-off") del receptor D2.',
          'Su capacidad para degradar químicamente la dopamina sináptica.',
          'Su bloqueo exclusivo en la médula espinal.'
        ],
        correctIndex: 1,
        explanation: 'El bloqueo de receptores 5-HT2A en la vía nigroestriada desinhibe la liberación de dopamina localmente, compitiendo con el fármaco y reduciendo el bloqueo D2 excesivo responsable de los síntomas extrapiramidales.',
        difficulty: 'Medio'
      }
    ],
    flashcards: [
      {
        id: 'fc-03-1',
        topicId: 'tema-03',
        concept: 'Transporte de Levodopa por LAT1',
        front: '¿Por qué la dopamina exógena no es eficaz en el Parkinson y se debe administrar Levodopa?',
        back: 'La dopamina es demasiado hidrofílica y se encuentra protonada a pH fisiológico, sin transportador en la barrera hematoencefálica (BHE). La Levodopa, al ser un aminoácido neutro zwitteriónico, utiliza el transportador de aminoácidos neutros grandes (LAT1) para ingresar activamente al cerebro, donde es descarboxilada a dopamina por la DOPA descarboxilasa central.',
        smiles: 'C1=CC(=C(C=C1C[C@@H](C(=O)O)N)O)O',
        difficulty: 'medium',
        category: 'Transporte & ADMET'
      }
    ]
  },
  {
    id: 'tema-04',
    number: 'Tema 04',
    title: 'Sistema Serotoninérgico',
    subtitle: 'Agonistas 5-HT1B/1D (Triptanes), Inhibidores de Recaptación (ISRS) y Antagonistas 5-HT3 (Setrones)',
    description: 'Diversidad de subtipos de receptores 5-HT (receptores acoplados a proteínas G e ionotrópico 5-HT3). Fármacos antimigrañosos: de los alcaloides del cornezuelo a los triptanes agonistas selectivos 5-HT1B/1D. Antidepresivos inhibidores selectivos de la recaptación de serotonina (ISRS: fluoxetina, citalopram, sertralina). Antieméticos antagonistas 5-HT3 en quimioterapia (ondansetrón, granisetrón).',
    keyConcepts: [
      'Subfamilias de receptores 5-HT (5-HT1 a 5-HT7)',
      'Estructura del núcleo indol y SAR de triptanes (Sumatriptán, Zolmitriptán)',
      'Transportador SERT e inhibidores selectivos (ISRS)',
      'Receptor ionotrópico 5-HT3 y antagonistas setrones (Ondansetrón)',
      'Efectos procinéticos mediados por receptores 5-HT4'
    ],
    slideCount: 48,
    pdbTargetId: '6G79',
    targetName: 'Transportador Humano de Serotonina (SERT) unido a Paroxetina',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 04: Diapositivas Oficiales Sistema Serotoninérgico.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 04: Apuntes Magistrales de Triptanes e ISRS.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Sumatriptán',
        smiles: 'CNS(=O)(=O)CC1=CC2=C(C=C1)NC=C2CCN(C)C',
        role: 'Agonista selectivo 5-HT1B/1D antimigrañoso pionero',
        mw: 295.40,
        logP: 0.93,
        hbd: 2,
        hba: 4,
        tpsa: 68.3,
        rotBonds: 5
      },
      {
        name: 'Fluoxetina',
        smiles: 'CNCCC(c1ccccc1)Oc2ccc(C(F)(F)F)cc2',
        role: 'Inhibidor selectivo de la recaptación de serotonina (ISRS)',
        mw: 309.33,
        logP: 4.05,
        hbd: 1,
        hba: 2,
        tpsa: 21.3,
        rotBonds: 5,
        pdbId: '6G79'
      },
      {
        name: 'Ondansetrón',
        smiles: 'CC1=NC=CN1CC2CCC3=C(C2=O)C4=CC=CC=C4N3C',
        role: 'Antagonista 5-HT3 antiemético para quimioterapia',
        mw: 293.36,
        logP: 2.10,
        hbd: 0,
        hba: 3,
        tpsa: 35.1,
        rotBonds: 1
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't04-q1',
        topicId: 'tema-04',
        block: 'SAR Triptanes',
        question: '¿Qué modificación química en posición 5 del anillo indólico de la serotonina permitió el desarrollo del sumatriptán con selectividad vasoconstrictora craneal 5-HT1B/1D?',
        questionSmiles: 'CNS(=O)(=O)CC1=CC2=C(C=C1)NC=C2CCN(C)C',
        options: [
          'La sustitución del grupo 5-hidroxilo por una sulfonamida aromática (-CH2-SO2-NHMe).',
          'La alquilación del nitrógeno indólico con un grupo bencilo voluminoso.',
          'La reducción completa del anillo indol a indolilamina.',
          'La fluoración en posición 2 del anillo de benceno.'
        ],
        correctIndex: 0,
        explanation: 'La introducción del grupo N-metilmetanosulfonamidoetilo en C5 y dimetilaminoetilo en C3 confirió selectividad estricta para los receptores vasculares craneales 5-HT1B/1D evitando la activación de receptores cardíacos 5-HT2B.',
        difficulty: 'Avanzado'
      }
    ],
    flashcards: [
      {
        id: 'fc-04-1',
        topicId: 'tema-04',
        concept: 'Transportador SERT vs. Receptores 5-HT',
        front: '¿Cuál es la diferencia farmacológica fundamental entre la acción de la fluoxetina (ISRS) y el sumatriptán?',
        back: 'La fluoxetina es un inhibidor alostérico del transportador de recaptación SERT (aumentando serotonina en la biofase sináptica), mientras que el sumatriptán es un agonista directo ortostérico de los receptores metabotrópicos 5-HT1B/1D.',
        smiles: 'CNCCC(c1ccccc1)Oc2ccc(C(F)(F)F)cc2',
        difficulty: 'medium',
        category: 'Mecanismo de Acción'
      }
    ]
  },
  {
    id: 'tema-05',
    number: 'Tema 05',
    title: 'Sistema GABAérgico',
    subtitle: 'Moduladores Alostéricos Positivos de GABAA: Benzodiazepinas, Barbitúricos y Fármacos Z',
    description: 'Estructura pentamérica del complejo receptor ionotrópico GABAA (canal de Cl-). Sitio de unión de GABA vs. sitios alostéricos moduladores. SAR de las 1,4-benzodiazepinas (Diazepam, Lorazepam, Alprazolam) y su farmacóforo. Hipnóticos no benzodiazepínicos o "Fármacos Z" selectivos de la subunidad alfa-1 (Zolpidem, Zopiclona). Antagonista específico del sitio benzodiazepínico (Flumazenil) para revertir sedación y sobredosis.',
    keyConcepts: [
      'Subunidades del receptor GABAA (2α, 2β, 1γ) y poro de Cloro',
      'Modulación alostérica positiva (aumento de frecuencia de apertura vs. tiempo)',
      'SAR de 1,4-benzodiazepinas: sustituyentes en C7 (electronegativo), C5 (fenilo) y anillo A/B/C',
      'Profármacos y metabolitos activos de vida media larga (Nordiazepam, Oxazepam)',
      'Fármacos Z (Zolpidem) y selectividad hipnótica α1',
      'Flumazenil como modulador neutro / antagonista competitivo del sitio BZD'
    ],
    slideCount: 50,
    pdbTargetId: '6HUP',
    targetName: 'Receptor GABAA Humano unido a Diazepam y GABA',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 05: Diapositivas Oficiales Sistema GABAérgico.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 05: Apuntes Magistrales Benzodiazepinas y GABAA.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Diazepam',
        smiles: 'CN1C(=O)CN=C(c2ccccc2)c3cc(Cl)ccc13',
        role: 'Modulador alostérico positivo prototípico del receptor GABAA',
        mw: 284.74,
        logP: 2.82,
        hbd: 0,
        hba: 2,
        tpsa: 32.7,
        rotBonds: 1,
        pdbId: '6HUP'
      },
      {
        name: 'Zolpidem',
        smiles: 'CC1=CC=C(C=C1)C2=C(N3C=C(C=CC3=N2)C)CC(=O)N(C)C',
        role: 'Hipnótico imidazopiridina agonista selectivo del sitio α1 de GABAA',
        mw: 307.39,
        logP: 2.40,
        hbd: 0,
        hba: 3,
        tpsa: 38.1,
        rotBonds: 3
      },
      {
        name: 'Flumazenil',
        smiles: 'CCOC(=O)C1=C2CN(C(=O)C3=C(N2C=N1)C=CC(=C3)F)C',
        role: 'Antagonista puro del sitio benzodiazepínico (antídoto de rescate)',
        mw: 303.29,
        logP: 1.65,
        hbd: 0,
        hba: 4,
        tpsa: 58.6,
        rotBonds: 2
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't05-q1',
        topicId: 'tema-05',
        block: 'SAR Benzodiazepinas',
        question: '¿Qué requerimiento electrónico en la posición 7 del anillo A de las 1,4-benzodiazepinas es imprescindible para mantener la alta afinidad por el receptor GABAA?',
        options: [
          'Un grupo electrodador voluminoso como un tert-butilo.',
          'Un sustituyente fuertemente atractor de electrones como un halógeno (-Cl, -Br) o un grupo nitro (-NO2).',
          'La hidroxilación libre en posición 7.',
          'La eliminación completa del anillo aromático A.'
        ],
        correctIndex: 1,
        explanation: 'La densidad electrónica del anillo A debe ser baja; un sustituyente atractor de electrones en posición 7 (ej. cloro en diazepam o nitro en clonazepam) polariza la estructura facilitando la interacción de dipolo con el receptor.',
        difficulty: 'Medio'
      }
    ],
    flashcards: [
      {
        id: 'fc-05-1',
        topicId: 'tema-05',
        concept: 'Mecanismo de Flumazenil',
        front: '¿Cuál es el mecanismo por el cual el flumazenil revierte la sedación por sobredosis de benzodiazepinas?',
        back: 'El flumazenil es un antagonista competitivo neutro que ocupa con alta afinidad el mismo sitio alostérico que las benzodiazepinas en la interfaz α/γ de GABAA, desplazándolas sin alterar la frecuencia de apertura del canal de Cloro.',
        smiles: 'CCOC(=O)C1=C2CN(C(=O)C3=C(N2C=N1)C=CC(=C3)F)C',
        difficulty: 'medium',
        category: 'Farmacología Molecular'
      }
    ]
  },
  {
    id: 'tema-06',
    number: 'Tema 06',
    title: 'Sistema Opioide & Manejo del Dolor',
    subtitle: 'Morfina, Análogos Semisintéticos, Péptidos Opioides y Antagonistas Puros',
    description: 'Transmisión nociceptiva y receptores opioides acoplados a proteína Gi (Mu, Kappa, Delta). El núcleo morfinano y sus derivados semisintéticos y sintéticos (codeína, heroína, oximorfona, metadona, fentanilo). Farmacóforo opioide (modelo de Beckett-Casy). Modificaciones estructurales críticas en C3, C6, C14 y sobre el nitrógeno terciario (conversión de agonistas a antagonistas como Naloxona y Naltrexona).',
    keyConcepts: [
      'Subtipos de receptores opioides (MOR, KOR, DOR)',
      'Estructura pentacíclica de la morfina y simplificación estructural',
      'Papel del fenol C3 libre en la afinidad y glucuronidación metabólica (M3G vs M6G)',
      'Modificaciones en C6: desoxigenación e incremento de potencia lipofílica',
      'Sustitución en el átomo de Nitrógeno: N-metilo (agonista) vs. N-alilo / N-ciclopropilmetilo (antagonista puro)',
      'Familia de las fenilpiperidinas y análogos 4-anilidopiperidinas (Fentanilo)'
    ],
    slideCount: 58,
    pdbTargetId: '4DKL',
    targetName: 'Receptor Opioide Mu Humano unido al Antagonista β-FNA',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 06: Diapositivas Oficiales Sistema Opioide.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 06: Apuntes Magistrales Fármacos Opioides y SAR.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Morfina',
        smiles: 'CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)O)O[C@H]3[C@H](C=C4)O',
        role: 'Agonista opioide prototípico de referencia analgésica',
        mw: 285.34,
        logP: 0.89,
        hbd: 2,
        hba: 4,
        tpsa: 49.3,
        rotBonds: 0,
        pdbId: '4DKL'
      },
      {
        name: 'Fentanilo',
        smiles: 'CCC(=O)N(c1ccccc1)C2CCN(CCc3ccccc3)CC2',
        role: 'Analgésico opioide sintético de ultra-alta potencia y rápida acción',
        mw: 336.47,
        logP: 4.05,
        hbd: 0,
        hba: 2,
        tpsa: 23.6,
        rotBonds: 6
      },
      {
        name: 'Naloxona',
        smiles: 'C=CCN1CC[C@]23[C@@H]4C(=O)CC[C@]2([C@H]1CC5=C3C(=C(C=C5)O)O4)O',
        role: 'Antagonista puro de receptores opioides (reversión de sobredosis)',
        mw: 327.37,
        logP: 1.40,
        hbd: 2,
        hba: 4,
        tpsa: 69.7,
        rotBonds: 2
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't06-q1',
        topicId: 'tema-06',
        block: 'SAR Opioides',
        question: '¿Qué modificación química en el átomo de nitrógeno terciario de la morfina o oximorfona transforma un agonista opioide potente en un antagonista puro competitivo como la naloxona?',
        questionSmiles: 'C=CCN1CC[C@]23[C@@H]4C(=O)CC[C@]2([C@H]1CC5=C3C(=C(C=C5)O)O4)O',
        options: [
          'La adición de un grupo metilo extra para formar una sal cuaternaria.',
          'La sustitución del grupo N-metilo por un grupo N-alilo (-CH2-CH=CH2) o N-ciclopropilmetilo.',
          'La oxidación del nitrógeno a N-óxido.',
          'La acetilación directa del nitrógeno terciario.'
        ],
        correctIndex: 1,
        explanation: 'La presencia de una cadena voluminosa e insaturada o cíclica sobre el nitrógeno orienta el grupo hacia una bolsa hidrofóbica auxiliar del receptor que impide el cambio conformacional necesario para acoplar la proteína Gi, bloqueando la activación y actuando como antagonista puro.',
        difficulty: 'Medio'
      }
    ],
    flashcards: [
      {
        id: 'fc-06-1',
        topicId: 'tema-06',
        concept: 'Regla de Beckett-Casy',
        front: '¿Cuáles son los 4 elementos topológicos del modelo farmacofórico de Beckett-Casy en analgésicos opioides?',
        back: '1) Anillo aromático plano para interacciones hidrofóbicas/van der Waals.\n2) Carbono cuaternario adyacente que posiciona el anillo fuera del plano.\n3) Cadena hidrocarbonada etilénica (-CH2-CH2-).\n4) Nitrógeno terciario básico protonado a pH fisiológico para formar un enlace iónico con un residuo de Aspartato (Asp147 en MOR).',
        smiles: 'CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)O)O[C@H]3[C@H](C=C4)O',
        difficulty: 'medium',
        category: 'Farmacóforos'
      }
    ]
  },
  {
    id: 'tema-07',
    number: 'Tema 07',
    title: 'Sistema Histaminérgico',
    subtitle: 'Antihistamínicos H1 (Clásicos y No Sedantes) y Antiulcerosos Antagonistas H2',
    description: 'Biosíntesis y tautomería de la histamina. Receptores H1 (alergia/inflamación) y H2 (secreción ácida gástrica). SAR de antihistamínicos H1 de primera generación (etanolaminas, etilendiaminas, piperazinas) y diseño de fármacos de segunda generación que no cruzan la BHE (cetirizina, fexofenadina, loratadina). Desarrollo de antagonistas H2 a partir del modelo de guanilhistamina y burimamida hasta cimetidina, ranitidina y famotidina.',
    keyConcepts: [
      'Tautomería tele (Nτ) y pros (Nπ) de la histamina',
      'Antihistamínicos H1 de 1ª generación: lipofilia y penetración en BHE (sedación)',
      'Estrategias para evitar la BHE en H1 de 2ª generación: zwitteriones y cadenas ácidas',
      'Desarrollo de antagonistas H2: cadena flexible espaciadora y grupo terminal neutro polar (ciano-guanidina, nitroetenodiamina)',
      'Interacciones farmacológicas por inhibición de CYP450 (Cimetidina vs. Ranitidina)'
    ],
    slideCount: 46,
    pdbTargetId: '3RZE',
    targetName: 'Receptor Histaminérgico H1 Humano unido a Doxepina',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 07: Diapositivas Oficiales Sistema Histaminérgico.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 07: Apuntes Magistrales Antihistamínicos H1 y H2.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Cetirizina',
        smiles: 'c1ccc(cc1)C(c2ccc(Cl)cc2)N3CCN(CC3)CCOCC(=O)O',
        role: 'Antihistamínico H1 de 2ª generación no sedante (zwitterión)',
        mw: 388.89,
        logP: 1.70,
        hbd: 1,
        hba: 4,
        tpsa: 53.6,
        rotBonds: 6,
        pdbId: '3RZE'
      },
      {
        name: 'Ranitidina',
        smiles: 'CN/C(=C\[N+](=O)[O-])/NCCSCC1=CC=C(O1)CN(C)C',
        role: 'Antagonista H2 antiulceroso con grupo nitroetenodiamina',
        mw: 314.41,
        logP: 0.27,
        hbd: 2,
        hba: 6,
        tpsa: 85.5,
        rotBonds: 8
      },
      {
        name: 'Difenhidramina',
        smiles: 'CN(C)CCOC(c1ccccc1)c2ccccc2',
        role: 'Antihistamínico H1 clásico de 1ª generación sedante',
        mw: 255.35,
        logP: 3.27,
        hbd: 0,
        hba: 2,
        tpsa: 12.5,
        rotBonds: 5
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't07-q1',
        topicId: 'tema-07',
        block: 'Antihistamínicos H1',
        question: '¿Qué característica estructural explica la ausencia de efectos sedantes centrales en la cetirizina frente a la hidroxizina de la que deriva?',
        questionSmiles: 'c1ccc(cc1)C(c2ccc(Cl)cc2)N3CCN(CC3)CCOCC(=O)O',
        options: [
          'La eliminación completa del anillo aromático clorado.',
          'La presencia de un grupo ácido carboxílico terminal (-COOH) que a pH fisiológico existe como ion carboxilato zwitteriónico, impidiendo atravesar la BHE.',
          'Su degradación ácida ultra-rápida en el torrente sanguíneo.',
          'Su unión irreversible a los receptores H2 gástricos.'
        ],
        correctIndex: 1,
        explanation: 'La cetirizina es el metabolito carboxílico de la hidroxizina. Su carácter polar zwitteriónico reduce drásticamente la permeabilidad pasiva a través de la barrera hematoencefálica, eliminando la somnolencia central.',
        difficulty: 'Fácil'
      }
    ],
    flashcards: [
      {
        id: 'fc-07-1',
        topicId: 'tema-07',
        concept: 'Grupos Isósteros en Antagonistas H2',
        front: '¿Por qué en los antagonistas H2 se sustituyó el grupo tiourea de la metiamida por cianoguanidina (cimetidina) o nitroetenodiamina (ranitidina)?',
        back: 'El grupo tiourea producía agranulocitosis tóxica en humanos. Los grupos cianoguanidina y nitroetenodiamina actúan como bioisósteros neutros polares coplanares, no ionizables a pH fisiológico, conservando la alta afinidad por H2 sin citotoxicidad medular.',
        smiles: 'CN/C(=C\[N+](=O)[O-])/NCCSCC1=CC=C(O1)CN(C)C',
        difficulty: 'medium',
        category: 'Bioisosterismo & Toxicología'
      }
    ]
  },
  {
    id: 'tema-08',
    number: 'Tema 08',
    title: 'Sistema Renina-Angiotensina',
    subtitle: 'Inhibidores de ECA (IECA Peptidomiméticos) y Antagonistas de Receptores AT1 (ARA-II)',
    description: 'Fisiopatología del eje renina-angiotensina-aldosterona (SRAA). Diseño racional de inhibidores de la Enzima Convertidora de Angiotensina (ECA, metaloproteasa con Zn2+): de los venenos de serpiente (Bothrops jararaca) y el modelo de carboxipeptidasa A al diseño de Captopril (grupo sulfhidrilo), Enalapril (profármaco dicarboxílico) y Lisinopril. Antagonistas de receptores de Angiotensina II (ARA-II) basados en el sistema bifenil-tetrazol (Losartán, Valsartán, Candesartán).',
    keyConcepts: [
      'Cascada proteolítica: Angiotensinógeno -> Angiotensina I -> Angiotensina II',
      'Centro activo de la ECA: átomo de Zinc catalítico (Zn2+) y bolsas S1, S1\', S2\'',
      'Captopril y el quelante tiol (-SH): toxicidad dérmica y disgeusia',
      'Transición a quelantes dicarboxílicos e inhibidores con profármacos éster (Enalaprilat/Enalapril)',
      'Modelo farmacofórico de ARA-II: bioisosterismo entre el carboxilato C-terminal de Ang II y el anillo 1H-tetrazol'
    ],
    slideCount: 54,
    pdbTargetId: '1E86',
    targetName: 'ECA Humana Somática Complejada con Captopril (Zn2+)',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 08: Diapositivas Oficiales SRAA (IECA & ARA-II).pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 08: Apuntes de Inhibidores de ECA y Antagonistas AT1.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Captopril',
        smiles: 'C[C@H](CS)C(=O)N1CCC[C@H]1C(=O)O',
        role: 'Inhibidor pionero de ECA con grupo sulfhidrilo quelante de Zn2+',
        mw: 217.29,
        logP: 0.84,
        hbd: 2,
        hba: 3,
        tpsa: 57.6,
        rotBonds: 3,
        pdbId: '1E86'
      },
      {
        name: 'Enalapril',
        smiles: 'CCOC(=O)[C@H](CCC1=CC=CC=C1)N[C@@H](C)C(=O)N2CCC[C@H]2C(=O)O',
        role: 'Profármaco éster etílico dicarboxilato de Enalaprilat',
        mw: 376.45,
        logP: 1.38,
        hbd: 2,
        hba: 5,
        tpsa: 78.7,
        rotBonds: 8
      },
      {
        name: 'Losartán',
        smiles: 'CCCCC1=NC(=C(N1CC2=CC=C(C=C2)C3=CC=CC=C3C4=NNN=N4)CO)Cl',
        role: 'Antagonista de receptores AT1 (ARA-II) con anillo bifenil-tetrazol',
        mw: 422.91,
        logP: 4.40,
        hbd: 2,
        hba: 5,
        tpsa: 75.3,
        rotBonds: 6
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't08-q1',
        topicId: 'tema-08',
        block: 'IECA & ARA-II',
        question: '¿Por qué el enalaprilat (el principio activo con ambos carboxilatos libres) debe administrarse por vía oral en forma de su profármaco éster monoetílico enalapril?',
        questionSmiles: 'CCOC(=O)[C@H](CCC1=CC=CC=C1)N[C@@H](C)C(=O)N2CCC[C@H]2C(=O)O',
        options: [
          'Porque el enalaprilat se oxida inmediatamente al entrar en contacto con el aire.',
          'Porque el enalaprilat es un zwitterión tri-iónico con LogP negativo y absorción oral insignificante (<10%), mientras que el monoéster tiene la lipofilia óptima para atravesar el epitelio intestinal y luego ser hidrolizado por esterasas hepáticas.',
          'Porque el enalaprilat destruye la microbiota intestinal.',
          'Porque el éster etílico se une de forma covalente a la renina.'
        ],
        correctIndex: 1,
        explanation: 'El enalaprilat libre contiene dos ácidos carboxílicos y una amina secundaria, resultando en una polaridad excesiva que impide su difusión pasiva. El profármaco éster etílico enmascara una carga negativa facilitando su absorción oral adecuada (~60%).',
        difficulty: 'Medio'
      }
    ],
    flashcards: [
      {
        id: 'fc-08-1',
        topicId: 'tema-08',
        concept: 'Tetrazol como Bioisóstero de Carboxilato',
        front: '¿Qué ventajas bioisostéricas aporta el anillo 1H-tetrazol-5-ilo presente en el losartán frente a un grupo ácido carboxílico tradicional?',
        back: 'El tetrazol tiene un pKa muy similar (~4.5-5.0), por lo que se desprotona a pH fisiológico manteniendo la interacción iónica con el receptor AT1, pero es 10 veces más lipofílico y más voluminoso, resistiendo la glucuronidación directa y mejorando la penetración membranar.',
        smiles: 'CCCCC1=NC(=C(N1CC2=CC=C(C=C2)C3=CC=CC=C3C4=NNN=N4)CO)Cl',
        difficulty: 'hard',
        category: 'Bioisosterismo'
      }
    ]
  },
  {
    id: 'tema-09',
    number: 'Tema 09',
    title: 'AINEs & Coxibs',
    subtitle: 'Inhibición de Ciclooxigenasas (COX-1/COX-2), Profenos y Bolsillo Alostérico Val523',
    description: 'Ruta del ácido araquidónico y síntesis de prostanoides y tromboxano. Mecanismo de acetilación irreversible de Ser530 en COX-1 y Ser516 en COX-2 por el ácido acetilsalicílico (aspirina). SAR de derivados de ácido arilacético (diclofenaco, indometacina) y arilpropiónico (profenos: ibuprofeno, naproxeno, ketoprofeno) y su inversión quiral metabólica in vivo. Descubrimiento de COX-2 y diseño racional de coxibs (celecoxib, etoricoxib) aprovechando el bolsillo secundario accesible por la presencia de Val523 frente a Ile523 en COX-1.',
    keyConcepts: [
      'Diferencias estructurales entre COX-1 constitutiva y COX-2 inducible',
      'Mecanismo de acción de Aspirina y cardioprotección antiagregante',
      'SAR de Profenos e inversión metabólica unidireccional (R) a (S)',
      'Bolsillo hidrofóbico lateral en COX-2 delimitado por Val523 (frente al impedimento de Ile523 en COX-1)',
      'Inhibidores selectivos Coxibs (Celecoxib) y seguridad gastrointestinal vs. riesgo cardiovascular'
    ],
    slideCount: 62,
    pdbTargetId: '3LN1',
    targetName: 'Complejo COX-2 Humana unida a Celecoxib (Bolsillo Val523)',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 09: Diapositivas Oficiales AINEs y Coxibs.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 09: Apuntes de Inhibidores de Ciclooxigenasa.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Celecoxib',
        smiles: 'Cc1ccc(cc1)c2cc(nn2c3ccc(cc3)S(=O)(=O)N)C(F)(F)F',
        role: 'Inhibidor selectivo de COX-2 con grupo sulfonamida complementario a Val523',
        mw: 381.37,
        logP: 3.99,
        hbd: 1,
        hba: 4,
        tpsa: 77.9,
        rotBonds: 3,
        pdbId: '3LN1'
      },
      {
        name: 'Ibuprofeno',
        smiles: 'CC(C)Cc1ccc(cc1)C(C)C(=O)O',
        role: 'AINE clásico no selectivo derivado del ácido arilpropiónico (profeno)',
        mw: 206.28,
        logP: 3.50,
        hbd: 1,
        hba: 2,
        tpsa: 37.3,
        rotBonds: 4
      },
      {
        name: 'Ácido Acetilsalicílico',
        smiles: 'CC(=O)Oc1ccccc1C(=O)O',
        role: 'Inhibidor irreversible por acetilación de Ser530/516',
        mw: 180.16,
        logP: 1.19,
        hbd: 1,
        hba: 3,
        tpsa: 63.6,
        rotBonds: 2
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't09-q1',
        topicId: 'tema-09',
        block: 'Selectividad COX-2',
        question: '¿Cuál es la diferencia de aminoácido clave en el canal catalítico entre COX-1 y COX-2 que permite el diseño de inhibidores voluminosos selectivos (Coxibs)?',
        questionSmiles: 'Cc1ccc(cc1)c2cc(nn2c3ccc(cc3)S(=O)(=O)N)C(F)(F)F',
        options: [
          'La sustitución de un residuo de Triptófano por Alanina.',
          'La presencia de Valina en posición 523 en COX-2 en lugar de Isoleucina 523 en COX-1, lo que genera un bolsillo lateral auxiliar hidrofóbico accesible.',
          'La ausencia total del residuo de Tirosina catalítica en COX-2.',
          'La presencia de un ion Cobre en lugar de un grupo hemo.'
        ],
        correctIndex: 1,
        explanation: 'La Isoleucina 523 en COX-1 tiene una cadena lateral más larga con un grupo metilo extra que bloquea estéricamente el acceso a la cavidad lateral. En COX-2, la Valina 523 (más pequeña por un grupo metileno) deja abierta una cavidad adicional donde encajan los grupos sulfonamida o metilsulfonilo de los coxibs.',
        difficulty: 'Medio'
      }
    ],
    flashcards: [
      {
        id: 'fc-09-1',
        topicId: 'tema-09',
        concept: 'Inversión Quiral de Profenos',
        front: '¿En qué consiste el fenómeno de inversión metabólica quiral de los profenos (ej. Ibuprofeno) en el organismo?',
        back: 'El enantiómero (R)-ibuprofeno inactivo es transformado enzimáticamente in vivo en su forma activa (S)-ibuprofeno a través de la formación de un intermediario acil-CoA tioéster por la acil-CoA sintetasa, racemización por 2-arilpropionil-CoA epimerasa e hidrólisis subsiguiente. El proceso es unidireccional (R) -> (S).',
        smiles: 'CC(C)Cc1ccc(cc1)C(C)C(=O)O',
        difficulty: 'hard',
        category: 'Estereoquímica & Metabolismo'
      }
    ]
  },
  {
    id: 'tema-10',
    number: 'Tema 10',
    title: 'Transporte de Membrana & Perfil ADMET',
    subtitle: 'Transportadores ABC/SLC (P-gp, PEPT1), Profármacos y Estabilidad CYP450',
    description: 'Mecanismos de permeabilidad y transporte transmembrana en el diseño farmacéutico. Superfamilias de transportadores de eflujo ABC (Glicoproteína-P / MDR1, BCRP) y de influjo SLC (PEPT1, OATP, OCT). Estrategias de diseño de profármacos de absorción y targeting. Optimización de la estabilidad metabólica frente a isoformas de citocromo P450 (CYP3A4, CYP2D6, CYP2C9) y reducción de la inhibición del canal cardíaco hERG.',
    keyConcepts: [
      'Clasificación Biofarmacéutica (BCS: Clases I a IV)',
      'Transportador de eflujo P-glicoproteína (P-gp / ABCB1) y resistencia a fármacos',
      'Targeting al transportador de péptidos intestinal PEPT1 (Valaciclovir, Valganciclovir)',
      'Reglas de Lipinski (Ro5) y extensiones de Veber para biodisponibilidad oral',
      'Puntos calientes metabólicos (soft spots) de CYP450 y deuteración de fármacos',
      'Riesgo de cardiotoxicidad por bloqueo del canal de potasio hERG'
    ],
    slideCount: 52,
    pdbTargetId: '6QEX',
    targetName: 'Glicoproteína P Humana (P-gp / ABCB1) en Estado de Eflujo',
    status: 'Próximamente',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 10: Diapositivas Oficiales Transporte de Membrana y ADMET.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 10: Apuntes Magistrales de Transportadores y P-gp.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: '',
    drugs: [
      {
        name: 'Valaciclovir',
        smiles: 'CC(C)[C@@H](C(=O)OCCOCN1C=NC2=C1N=C(NC2=O)N)N',
        role: 'Profármaco éster L-valilo sustrato de PEPT1 con 55% de biodisponibilidad oral',
        mw: 324.34,
        logP: -1.38,
        hbd: 3,
        hba: 7,
        tpsa: 128.8,
        rotBonds: 7
      },
      {
        name: 'Aciclovir',
        smiles: 'C1=NC2=C(N1COCCO)N=C(NC2=O)N',
        role: 'Fármaco antiviral libre con baja permeabilidad y absorción limitada (~15%)',
        mw: 225.20,
        logP: -1.56,
        hbd: 3,
        hba: 6,
        tpsa: 102.5,
        rotBonds: 3
      },
      {
        name: 'Verapamilo',
        smiles: 'COc1ccc(cc1OC)C(C#N)(C(C)C)CCCN(C)CCc2ccc(OC)c(OC)c2',
        role: 'Inhibidor potente de Glicoproteína-P (P-gp)',
        mw: 454.60,
        logP: 3.79,
        hbd: 0,
        hba: 5,
        tpsa: 63.9,
        rotBonds: 13
      }
    ],
    attachments: [],
    testQuestions: [
      {
        id: 't10-q1',
        topicId: 'tema-10',
        block: 'Profármacos & PEPT1',
        question: '¿Por qué la esterificación del aciclovir con L-valina (valaciclovir) incrementa su biodisponibilidad oral de un 15% a más del 55%?',
        questionSmiles: 'CC(C)[C@@H](C(=O)OCCOCN1C=NC2=C1N=C(NC2=O)N)N',
        options: [
          'Porque el valaciclovir destruye la mucosa intestinal para difundir pasivamente.',
          'Porque el resto L-valilo mimetiza un dipéptido natural y es reconocido como sustrato de alta afinidad por el transportador intestinal de influjo PEPT1 (SLC15A1).',
          'Porque el valaciclovir inhibe irreversiblemente a la P-glicoproteína.',
          'Porque el valaciclovir polimeriza en el estómago protegiéndose de la degradación.'
        ],
        correctIndex: 1,
        explanation: 'El transportador de oligopéptidos PEPT1 reconoce dipéptidos y profármacos conjugados con aminoácidos como la L-valina. El valaciclovir es transportado activamente al interior del enterocito donde la enzima valaciclovirasa hidroliza el éster liberando aciclovir puro en sangre.',
        difficulty: 'Medio'
      }
    ],
    flashcards: [
      {
        id: 'fc-10-1',
        topicId: 'tema-10',
        concept: 'Criterios de Veber para Biodisponibilidad Oral',
        front: '¿Cuáles son los 2 criterios clave de Veber que complementan la Regla de Lipinski para predecir buena biodisponibilidad oral?',
        back: '1) Área de Superficie Polar Tópica (TPSA) <= 140 Å² (o <= 12 donadores + aceptores de enlaces de H).\n2) Número de enlaces rotables (RotBonds) <= 10.\nMoléculas que cumplen estos criterios presentan una tasa de permeabilidad membranar y biodisponibilidad significativamente mayor.',
        difficulty: 'medium',
        category: 'ADMET & Profiling'
      }
    ]
  }
];

export const INITIAL_GLOSSARY: QfdosGlossaryTerm[] = [
  {
    id: 'glo-1',
    term: 'Afinidad (Kd)',
    category: 'Afinidad & Receptor',
    definition: 'Constante de disociación en el equilibrio termodinámico entre el ligando y su diana macromolecular. A menor valor numérico de Kd, mayor es la fuerza intrínseca de unión (afinidad). Relacionada con la energía libre de Gibbs: ΔG° = R · T · ln(Kd).',
    technicalCode: 'TERMO-KD-01',
    clinicalRelevance: 'Permite seleccionar cabezas de serie con afinidad nanomolar (Kd < 10 nM) para minimizar dosis y toxicidad fuera de diana (off-target).'
  },
  {
    id: 'glo-2',
    term: 'Constante de Inhibición (Ki)',
    category: 'Afinidad & Receptor',
    definition: 'Constante termodinámica de equilibrio de disociación del complejo enzima-inhibidor. Es una propiedad intrínseca e independiente de la concentración de sustrato [S], a diferencia de la IC50.',
    technicalCode: 'TERMO-KI-02',
    clinicalRelevance: 'Parámetro fundamental en el diseño racional de fármacos dirigidos a quinasas, proteasas y enzimas del SNC.'
  },
  {
    id: 'glo-3',
    term: 'Ecuación de Cheng-Prusoff',
    category: 'Afinidad & Receptor',
    definition: 'Ecuación matemática que relaciona el valor experimental de IC50 con la constante absoluta de inhibición Ki en inhibición competitiva: IC50 = Ki · (1 + [S]/Km).',
    technicalCode: 'CIN-CP-03',
    clinicalRelevance: 'Demuestra por qué el valor de IC50 medido in vitro varía entre diferentes laboratorios y protocolos experimentales.'
  },
  {
    id: 'glo-4',
    term: 'Eficiencia de Ligando (LE)',
    category: 'ADMET & Profiling',
    definition: 'Medida que normaliza la energía libre de Gibbs de unión por cada átomo no-hidrógeno (átomo pesado): LE = -ΔG° / Nheavy = (1.37 / Nheavy) · pIC50. Valores >= 0.3 kcal/(mol·átomo) son deseables.',
    technicalCode: 'LEAD-LE-04',
    clinicalRelevance: 'Evita la tendencia perjudicial de inflar el peso molecular y la lipofilia durante la optimización de cabezas de serie.'
  },
  {
    id: 'glo-5',
    term: 'Bioisosterismo Clásico y No Clásico',
    category: 'Afinidad & Receptor',
    definition: 'Sustitución de átomos o grupos funcionales por otros con propiedades fisicoquímicas o electrónicas similares (mismo número de electrones de valencia o distribución de densidad) para mejorar estabilidad metabólica, selectividad o biodisponibilidad.',
    technicalCode: 'SAR-BIO-05',
    clinicalRelevance: 'Ejemplo clave: reemplazo del ácido carboxílico por un anillo 1H-tetrazol en los ARA-II (Losartán) o del catecol por alcohol saligenina en Salbutamol.'
  },
  {
    id: 'glo-6',
    term: 'Bolsillo Alostérico Val523 (COX-2)',
    category: 'Cardiovascular',
    definition: 'Cavidad hidrofóbica lateral accesible en la ciclooxigenasa-2 (COX-2) debido a la presencia del aminoácido Valina 523 (más pequeño que la Isoleucina 523 presente en COX-1), permitiendo el anclaje selectivo de Coxibs (Celecoxib).',
    technicalCode: 'COX2-VAL523',
    clinicalRelevance: 'Base molecular del diseño de AINEs con protección gástrica selectiva.'
  },
  {
    id: 'glo-7',
    term: 'Transportador PEPT1 (SLC15A1)',
    category: 'ADMET & Profiling',
    definition: 'Transportador de influjo transmembrana dependiente de gradiente de protones ubicado en el borde en cepillo del enterocito intestinal. Reconoce dipéptidos y profármacos peptídicos como Valaciclovir.',
    technicalCode: 'SLC-PEPT1-07',
    clinicalRelevance: 'Estrategia de química médica para triplicar la absorción oral de fármacos hidrofílicos poco absorbibles.'
  },
  {
    id: 'glo-8',
    term: 'Glicoproteína-P (P-gp / ABCB1)',
    category: 'ADMET & Profiling',
    definition: 'Bomba de eflujo transmembrana dependiente de ATP que expulsa xenobióticos y fármacos lipofílicos desde el citoplasma al exterior celular en la barrera hematoencefálica, intestino y túbulo renal.',
    technicalCode: 'ABC-PGP-08',
    clinicalRelevance: 'Principal causa de resistencia a quimioterápicos y limitante de la penetración de fármacos en el sistema nervioso central.'
  }
];

export const INITIAL_STUDENT_PROFILES: StudentEvaluationProfile[] = [];

export const INITIAL_STUDENT_EVALUATION_DATA = INITIAL_STUDENT_PROFILES;

export const INITIAL_STUDENT_QUESTIONS: StudentQuestion[] = [
  {
    id: 'sq-1',
    topicId: 'tema-00',
    topicTitle: 'Tema 00: Presentación del Curso',
    studentName: 'Elena García Pérez',
    studentEmail: 'alumno.demo@correo.ugr.es',
    question: 'Profesor Mochón, respecto a la evaluación continua, ¿la nota mínima de 5 sobre 10 en el examen final es indispensable para que sumen el parcial (20%) y las prácticas (5%)?',
    timestamp: '14/09/2026 11:20',
    status: 'respondida',
    response: '¡Hola, Elena! Efectivamente: de acuerdo con la guía docente aprobada por la UGR, es requisito indispensable alcanzar un mínimo de 5,0 sobre 10 en el examen final oficial para promediar con las calificaciones de la evaluación continua obtenidas durante el semestre.'
  },
  {
    id: 'sq-2',
    topicId: 'tema-09',
    topicTitle: 'Tema 09: AINEs & Coxibs',
    studentName: 'Manuel Martínez López',
    studentEmail: 'martinez.m@correo.ugr.es',
    question: '¿Por qué el celecoxib no inhibe la COX-1 a concentraciones terapéuticas si el sitio activo es tan parecido al de COX-2?',
    timestamp: '15/09/2026 17:45',
    status: 'respondida',
    response: 'Manuel, el motivo es el impedimento estérico: el grupo sulfonamida voluminoso del celecoxib requiere entrar en el bolsillo lateral secundario. En COX-1, el aminoácido Isoleucina 523 tiene un grupo metilo extra que bloquea físicamente la entrada a ese bolsillo, mientras que en COX-2 la Valina 523 es más corta y deja expedito el canal.'
  }
];
