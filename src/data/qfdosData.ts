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

export interface QuizAnswerDetail {
  questionId: string;
  questionNumber: number;
  questionText: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  correctOptionIndex: number;
  correctOptionText: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  studentEmail: string;
  studentName: string;
  studentDni?: string;
  evaluator?: string;
  evaluationMode?: 'docente_sesion' | 'alumno_evaluado';
  topicId: string;
  topicNumber?: string;
  topicTitle?: string;
  modelName?: string;
  score: number; // 0 to 10
  correctCount: number;
  totalQuestions: number;
  timestamp: string;
  answersDetail?: QuizAnswerDetail[];
}

export type QuizRegistrationRecord = QuizAttempt;

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
export const COURSE_DATA_VERSION = '3.7.0';
export const COURSE_BUILD_TIMESTAMP = '2026-09-22T12:00:00.000Z';

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

// ==========================================================================
// Banco Oficial de Examen: Modelo Retrosíntesis (Tema 01 - Slides 28-35)
// Teoría de las Desconexiones, Sintones y Síntesis en Fármacos Colinérgicos
// 15 Preguntas con Estructuras SMILES 2D en Enunciados y Opciones
// ==========================================================================




export const MODELO_A_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 't01-a-01',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Naturaleza de la Carga Catiónica en',
    question: 'En la estructura molecular de la acetilcolina, ¿qué factor fisicoquímico determina que la cabeza catiónica mantenga su carga formal positiva de manera independiente del pH del medio biológico?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'La presencia de tres grupos metilo que actúan como inductores atractores de carga negativa en el átomo de nitrógeno.' },
  { text: 'La interacción por enlace de hidrógeno intramolecular entre los protones del nitrógeno y el oxígeno del grupo éster.' },
  { text: 'La tetravalencia del átomo de nitrógeno cuaternario que carece de par de electrones solitario capaz de desprotonarse.' },
  { text: 'La rápida velocidad de inversión piramidal del nitrógeno que dispersa la densidad electrónica sobre el puente etilénico.' }
    ],
    correctIndex: 2,
    explanation: 'Debemos destacar que el catión amonio cuaternario tiene sus cuatro valencias saturadas por enlaces covalentes C–N (tres metilos y el puente etilénico). Al carecer por completo de par electrónico solitario desprotonable, mantiene de forma permanente e invariable su carga formal positiva independientemente del pH fisiológico. En cuanto a los distractores, la trampa conceptual típica (opción a) confunde el efecto inductivo: los alquilos son dadores (+I), no atractores; la opción b es inviable porque el nitrógeno cuaternario no posee enlaces N–H para donar hidrógeno; y en la opción d, al no haber par solitario, no existe inversión piramidal.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-02',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Interacción Iónica y Catión-π en el',
    question: 'Durante el anclaje de la acetilcolina en el sitio ortostérico del receptor muscarínico, ¿qué interacción no covalente fundamental estabiliza prioritariamente la cabeza de trimetilamonio?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'La atracción electrostática iónica con un carboxilato de aspartato reforzada por interacciones catión-π con residuos aromáticos.' },
  { text: 'La formación de un puente de hidrógeno direccional específico con el hidroxilo fenólico de una tirosina conservada en la cavidad.' },
  { text: 'El ataque nucleófilo reversible del grupo tiol de cisteína sobre uno de los carbonos metílicos del catión amonio cuaternario.' },
  { text: 'La formación de enlaces covalentes coordinados con cationes divalentes de zinc solvatados en el fondo del bolsillo de unión diana.' }
    ],
    correctIndex: 0,
    explanation: 'En el laboratorio de modelado molecular observamos que el catión trimetilamonio encaja en una cavidad aromática formada por residuos de tirosina y triptófano mediante interacciones catión-π con las nubes electrónicas aromáticas, anclándose de forma simultánea por atracción electrostática iónica directa con el carboxilato del aspartato conservado (Asp105/Asp147). Respecto a las alternativas erróneas, la opción b es imposible porque el nitrógeno cuaternario carece de protones para formar puentes de hidrógeno convencionales; la opción c supondría una desmetilación irreversible destructiva; y la opción d es falsa porque los receptores muscarínicos son GPCRs que no emplean cofactores de zinc en el sitio ortostérico.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-03',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Conformación Bioactiva y Regla de l',
    question: 'La clásica regla de los cinco átomos de Ing describe la longitud de la cadena en análogos de colina. ¿Qué consecuencia estructural y conformacional impone sobre el farmacóforo colinérgico?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'Obliga a que la molécula adopte una conformación totalmente extendida antiperiplanar para encajar en el canal iónico.' },
  { text: 'Fija una separación espacial óptima de aproximadamente 3.2 Å entre el catión amonio y el oxígeno en conformación sinclinal.' },
  { text: 'Permite la rotación libre de cadenas de hasta siete metilenos sin que se reduzca la afinidad por los receptores muscarínicos.' },
  { text: 'Exige la presencia obligatoria de un anillo aromático condensado a cinco carbonos del átomo de nitrógeno cuaternario.' }
    ],
    correctIndex: 1,
    explanation: 'Al analizar la regla de los cinco átomos de Ing, comprobamos que para una máxima actividad agonista muscarínica no debe superarse una separación de cinco átomos entre el nitrógeno cuaternario y el extremo terminal. En la conformación bioactiva sinclinal (gauche), el ángulo diedro O–C–C–N⁺ se sitúa en torno a 60°, lo que fija una distancia interatómica óptima de ~3.2 Å entre el centro catiónico y el oxígeno del éster, permitiendo la interacción complementaria simultánea con los dos subsitios del receptor. La opción a es un error frecuente: la conformación antiperiplanar separa los grupos a ~4.5 Å, reduciendo drásticamente la afinidad muscarínica.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-04',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Estereoquímica y Eudismia en Metaco',
    question: 'Al evaluar la actividad biológica de los enantiómeros de la metacolina sobre receptores muscarínicos, ¿qué observación experimental y fundamento molecular justifican su marcada eudismia?',
    questionSmiles: 'CC(=O)O[C@@H](C)C[N+](C)(C)C',
    options: [
  { text: 'El enantiómero (R) es más potente porque su metilo orienta el par electrónico del éster hacia los residuos básicos del canal iónico.' },
  { text: 'Ambos enantiómeros presentan idéntica afinidad biológica porque el receptor colinérgico carece de asimetría quiral en su bolsillo.' },
  { text: 'El enantiómero (R) presenta mayor afinidad debido a que se hidroliza con mayor lentitud por la enzima acetilcolinesterasa neuronal.' },
  { text: 'El enantiómero (S) es unas 250 veces más activo al reproducir con fidelidad la disposición espacial de la (+)-muscarina natural.' }
    ],
    correctIndex: 3,
    explanation: 'En el diseño estereoquímico de agonistas, el eutómero indiscutible es la (S)-metacolina, que muestra unas 250 veces más potencia que su enantiómero (R). El fundamento molecular reside en que su centro estereogénico sitúa el grupo metilo en la orientación tridimensional equivalente a la configuración del carbono C-5 de la (+)-(2S,4R,5S)-muscarina natural, emulando con exactitud su encaje en el bolsillo hidrófobo del receptor sin generar impedimento estérico. El distractor a induce al error típico de atribuir mayor afinidad a la forma (R) confundiéndola con su cinética de hidrólisis lenta frente a la AChE.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-05',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Resistencia a la Hidrólisis en Carb',
    question: 'El carbacol presenta una estabilidad metabólica notablemente superior a la acetilcolina frente a la acetilcolinesterasa. ¿Cuál es la base electrónica de dicha resistencia?',
    questionSmiles: 'NC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'El impedimento estérico originado por el grupo amino primario que bloquea el acceso de moléculas de agua al sitio activo enzimático.' },
  { text: 'La donación por resonancia del par solitario del nitrógeno del carbamato que reduce el carácter electrófilo del grupo carbonilo.' },
  { text: 'La protonación reversible del grupo carbamato a pH fisiológico que genera una repulsión electrostática con la enzima colinesterasa.' },
  { text: 'La formación de un enlace disulfuro covalente con el bolsillo enzimático que impide la liberación del centro acetilado en la serina.' }
    ],
    correctIndex: 1,
    explanation: 'Planteamos la síntesis de carbacol para resolver la inestabilidad metabólica de la acetilcolina. El carbacol es un éster carbámico (carbamato) donde el par de electrones no enlazante del nitrógeno –NH₂ se deslocaliza hacia el carbonilo por efecto mesómero donador (+M: NH₂–C(=O)–O ↔ ⁺NH₂=C(–O⁻)–O). Esta conjugación disminuye drásticamente el carácter electrófilo del carbono carbonílico, bloqueando el ataque nucleófilo de la Ser203 de la acetilcolinesterasa. La trampa en la que cae el alumno en la opción a es atribuir la resistencia a impedimento estérico: el grupo amino primario no es voluminoso, su efecto protector es puramente electrónico.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-06',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Pilocarpina: Estabilidad Química y ',
    question: 'La pilocarpina es un alcaloide empleado en el tratamiento del glaucoma. ¿Qué vía de degradación química inactiva a este fármaco en disolución acuosa mediante una inversión de configuración?',
    questionSmiles: 'CCC1C(COC1=O)Cc2cnc[nH]2',
    options: [
  { text: 'La epimerización alfa del anillo lactónico para generar el diastereoisómero trans-isopilocarpina desprovisto de actividad.' },
  { text: 'La oxidación fotoquímica del heterociclo de imidazol a derivado de urea cíclica inerte por acción del oxígeno molecular disuelto.' },
  { text: 'La eliminación bimolecular del grupo metilo unido al nitrógeno con formación de imidazol libre y desprendimiento de metanol gas.' },
  { text: 'La dimerización intermolecular mediante acoplamiento de tipo radicalario entre dos anillos de imidazol bajo radiación ultravioleta.' }
    ],
    correctIndex: 0,
    explanation: 'Al trabajar con disoluciones de pilocarpina debemos controlar rigurosamente dos rutas de degradación: la epimerización en el carbono quiral C-3 que genera isopilocarpina (inactiva) y la hidrólisis básica del anillo lactónico que rinde ácido pilocárpico. En medio básico, la desprotonación del protón en alfa al carbonilo genera un enolato plano que al reprotonarse termodinámicamente invierte la configuración relativa cis a trans, provocando la pérdida irreversible de actividad antiglaucomatosa. Los distractores b y c confunden la labilidad del anillo lactónico con el heterociclo de imidazol, el cual es químicamente estable en condiciones fisiológicas.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-07',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Fisostigmina vs Neostigmina: Confin',
    question: 'Al comparar las propiedades farmacocinéticas de la fisostigmina y la neostigmina en la inhibición de la acetilcolinesterasa, señale la correlación estructura-distribución correcta:',
    questionSmiles: 'CNC(=O)Oc1ccc2c(c1)[C@]3(C)CCN(C)[C@@H]3N2C',
    options: [
  { text: 'Ambos fármacos cruzan la barrera hematoencefálica con idéntica eficacia al presentar coeficientes de reparto lipófilos muy semejantes.' },
  { text: 'La neostigmina accede con gran facilidad al sistema nervioso central gracias a la naturaleza aromática de su anillo carbámico difusible.' },
  { text: 'La fisostigmina penetra en el SNC por poseer una amina terciaria, mientras que la neostigmina actúa sólo en periferia por su amonio 4º.' },
  { text: 'La fisostigmina queda confinada a la placa motora neuromuscular periférica debido a la elevada rigidez de su anillo tricíclico de indol.' }
    ],
    correctIndex: 2,
    explanation: 'En farmacología clínica distinguimos con claridad la fisostigmina de la neostigmina por su confinamiento: la fisostigmina es un carbamato alcaloide con nitrógeno terciario no ionizado a pH fisiológico (LogP alto), lo que le permite atravesar la barrera hematoencefálica y revertir intoxicaciones anticolinérgicas centrales por atropina. Por el contrario, la neostigmina incorpora un nitrógeno cuaternario permanentemente cargado (LogP muy bajo) que le impide cruzar la BHE, restringiendo su acción terapéutica a la placa motora periférica (miastenia gravis). La opción a invierte de manera errónea el estado de ionización de ambas moléculas.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-08',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Inhibidores No Carbamatos en Alzhei',
    question: 'El donepezilo es un fármaco de primera línea en la enfermedad de Alzheimer que inhibe la AChE sin formar intermediarios covalentes. ¿Cuál es su mecanismo de fijación molecular?',
    questionSmiles: 'COc1cc2c(cc1OC)C(=O)CC2CC3CCN(Cc4ccccc4)CC3',
    options: [
  { text: 'Carbamoila covalentemente la serina catalítica mediante la transferencia del fragmento carbonilo con hidrólisis celular sumamente lenta.' },
  { text: 'Se une de forma irreversible mediante alquilación con formación de un enlace fosfodiéster en el fondo de la triada catalítica profunda.' },
  { text: 'Actúa como modulador alostérico negativo uniéndose de modo selectivo a la región citoplasmática profunda del receptor muscarínico M1.' },
  { text: 'Interacciona de forma reversible no covalente ocupando simultáneamente el sitio catalítico (CAS) y el sitio aniónico periférico (PAS).' }
    ],
    correctIndex: 3,
    explanation: 'Para el tratamiento del Alzheimer seleccionamos donepezilo porque es un inhibidor reversible no carbamato que ocupa simultáneamente el sitio activo catalítico (CAS) y el sitio aniónico periférico (PAS) de la AChE mediante apilamiento aromático con Trp86 y Trp286. Al no transferir grupos químicos covalentes a la Ser203, carece por completo de la hepatotoxicidad grave observada históricamente con la tacrina y no induce tolerancia enzimática. El error conceptual del distractor a radica en clasificar al donepezilo como sustrato suicida o carbamoilante covalente.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-09',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Reactivación de la AChE por Pralido',
    question: 'La pralidoxima (2-PAM) se administra como antídoto específico frente a intoxicaciones por organofosforados como el sarín. ¿Cuál es el mecanismo químico exacto de dicha reactivación?',
    questionSmiles: 'O/N=C/c1cccc[n+]1C',
    options: [
  { text: 'El ión oximato ataca nucleofílicamente al átomo de fósforo electrofílico desplazando el enlace con la serina catalítica de la enzima.' },
  { text: 'El nitrógeno piridínico desprotona a la histidina catalítica para restaurar la conformación abierta del canal de acceso al bolsillo activo.' },
  { text: 'La molécula actúa como aceptor competitivo del grupo acetilo libre acumulado en el espacio sináptico restableciendo el equilibrio iónico.' },
  { text: 'Induce la desmetilación oxidativa del residuo de colina fosforilado permitiendo la entrada directa de moléculas de agua desfosforilantes.' }
    ],
    correctIndex: 0,
    explanation: 'Al diseñar antídotos contra organofosforados, empleamos pralidoxima (2-PAM) porque combina un catión piridinio que se ancla electrostáticamente al subsitio aniónico periférico de la AChE y un grupo oxima nucleófilo (=N–OH) perfectamente posicionado. El grupo oxima ataca el átomo de fósforo electrofílico del resto organofosforado unido a la Ser203, desplazándolo mediante sustitución nucleófila y regenerando la enzima libre antes de que ocurra el envejecimiento. La trampa de la opción c consiste en creer que la oxima ataca a la colina o al resto acetilo.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-10',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Farmacóforo General de los Antagoni',
    question: 'Al transformar un agonista colinérgico muscarínico en un antagonista competitivo de alta afinidad (tipo atropina), ¿qué modificación estructural farmacofórica es imprescindible?',
    questionSmiles: 'CN1C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3',
    options: [
  { text: 'La presencia obligatoria de un grupo nitro o sulfonamida polar conjugado con una cabeza básica libre de sustituyentes alquílicos.' },
  { text: 'La reducción estricta del tamaño de la molécula a un máximo de tres átomos de carbono entre el nitrógeno y el grupo carbonilo.' },
  { text: 'La incorporación de sustituyentes hidrófobos voluminosos (anillos aromáticos o cicloalifáticos) que ocupan bolsas accesorias.' },
  { text: 'La eliminación de cualquier átomo de nitrógeno para evitar interacciones electrostáticas con los residuos aniónicos del receptor.' }
    ],
    correctIndex: 2,
    explanation: 'Definimos el farmacóforo de los antagonistas muscarínicos como una cabeza catiónica básica separada por una cadena alquilica corta de un centro acilo esterificado con dos anillos hidrófobos voluminosos (aromáticos o cicloalifáticos). Estos anillos lipófilos actúan como un \'escudo hidrófobo\' que establece interacciones no específicas con zonas adyacentes al sitio ortostérico, impidiendo el cambio conformacional del receptor hacia el estado activo. La opción a es la trampa habitual: la regla de Ing rige para agonistas colinérgicos flexibles, mientras que los antagonistas toleran estructuras voluminosas de mayor extensión.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-11',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Confinamiento Farmacocinético de Ip',
    question: 'El bromuro de ipratropio se administra por vía inhalatoria para el broncoespasmo en la EPOC. ¿Qué característica química impide que produzca efectos adversos atropínicos centrales?',
    questionSmiles: 'CC(C)[N+]1(C)C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3',
    options: [
  { text: 'Su mayor lipofilia molecular le permite atravesar con gran rapidez el epitelio alveolar alcanzando concentraciones plasmáticas muy altas.' },
  { text: 'Su cabeza de amonio cuaternario con carga permanente previene la absorción y el paso por la BHE, evitando efectos adversos en SNC.' },
  { text: 'Posee un enlace éster modificado químicamente que resiste la degradación hidrolítica durante más de dos semanas en el parénquima pulmonar.' },
  { text: 'Actúa selectivamente como agonista nicotínico facilitando la contracción de la musculatura lisa bronquial durante las crisis respiratorias.' }
    ],
    correctIndex: 1,
    explanation: 'Prescribimos bromuro de ipratropio por vía inhalatoria en EPOC porque la presencia del nitrógeno cuaternario N-isopropílico le confiere una carga positiva permanente e hidrofobicidad nula (LogP < 0). Esto anula su absorción a través de la mucosa bronquial y la barrera hematoencefálica, limitando el bloqueo de receptores M3 al músculo liso bronquial sin provocar los efectos anticolinérgicos sistémicos típicos de la atropina (taquicardia, retención urinaria, sequedad). La opción a confunde la selectividad farmacocinética (confinamiento tópico) con una selectividad por subtipo de receptor.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-12',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Aminoalcoholes Carbinólicos: Resist',
    question: 'El trihexifenidilo es un anticolinérgico empleado en la enfermedad de Parkinson. ¿Qué elemento de su diseño químico le otorga mayor estabilidad metabólica que los ésteres atropínicos?',
    questionSmiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CCCCC3',
    options: [
  { text: 'La presencia de un puente disulfuro cíclico que estabiliza el anillo piperidínico frente a la acción oxidativa del citocromo P450.' },
  { text: 'La sustitución del anillo bencénico por un resto heterocíclico de pirimidina resistente al metabolismo de fase II hepático.' },
  { text: 'La incorporación de un enlace carbamato fluorado que resiste la desaminación oxidativa mediada por monoamino oxidasas neuronales.' },
  { text: 'El reemplazo del enlace éster por un carbinol terciario lipófilo que resulta completamente inmune a las esterasas plasmáticas.' }
    ],
    correctIndex: 3,
    explanation: 'Al evaluar antimuscarínicos sintéticos como el trihexifenidilo, comprobamos que la presencia de un carbinol terciario impide su oxidación metabólica a cetona, ya que el carbono carbinólico carece de átomos de hidrógeno disponibles (C–H). Además, el grupo amino terciario piperidínico en forma básica neutra facilita un cruce eficiente de la BHE para controlar el temblor y rigidez en el Parkinson. La trampa típica (opción a) afirma que los alcoholes terciarios se oxidan a ácidos carboxílicos, lo cual es químicamente imposible sin rotura de enlaces C–C.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-13',
    topicId: 'tema-01',
    block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
    badge: 'Mecanismo de Transducción Muscaríni',
    question: 'En la señalización colinérgica muscarínica, ¿qué cascada bioquímica intracelular diferencia a los receptores M1, M3 y M5 respecto a los subtipos M2 y M4?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'M2 y M4 estimulan a la fosfolipasa C citoplasmática liberando inositol trifosfato, mientras que M1, M3 y M5 fosforilan receptores.' },
  { text: 'M1, M3 y M5 activan la proteína Gq estimulando fosfolipasa C (PLC-β), mientras que M2 y M4 inhiben la adenilato ciclasa vía Gi.' },
  { text: 'M1, M3 y M5 se acoplan a la proteína Gs estimuladora elevando el AMP cíclico, mientras que M2 y M4 operan como canales de cloruro.' },
  { text: 'Todos los subtipos activan la cascada citoplasmática de tirosina cinasa induciendo la apertura directa de macrocanales de membrana.' }
    ],
    correctIndex: 1,
    explanation: 'En la transducción de señales de receptores muscarínicos, diferenciamos dos cascadas: los subtipos M1, M3 y M5 se acoplan a proteínas Gq/11, activando la fosfolipasa C-beta (PLCβ) con generación de inositol trisfosfato (IP3) y diacilglicerol (DAG), lo que moviliza calcio intracelular. En cambio, los receptores M2 y M4 se acoplan a proteínas Gi/o, inhibiendo a la adenilato ciclasa y disminuyendo los niveles de AMPc. El error conceptual del distractor a invierte el acoplamiento, asociando erróneamente M2 a estimulación celular.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-14',
    topicId: 'tema-01',
    block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
    badge: 'Síntesis Orgánica Directa de Ciclop',
    question: 'En la síntesis orgánica directa del ciclopentolato, ¿cuál es la secuencia de reacciones que construye el fragmento hidroxiácido y el éster final?',
    questionSmiles: 'CN(C)CCOC(=O)C(c1ccccc1)C2(O)CCCC2',
    options: [
  { text: 'Acilación de Friedel-Crafts de ciclopenteno con cloruro de benzoilo y posterior oxidación de Baeyer-Villiger en medio anhidro.' },
  { text: 'Condensación de Claisen de ciclopentanocarboxilato con fenilacetato de etilo en etóxido sódico y posterior hidrólisis ácida.' },
  { text: 'Adición del dianión de fenilacetato (reactivo de Ivanov) a ciclopentanona seguida de esterificación con dimetilaminoetanol.' },
  { text: 'Reacción de Reformatsky entre alfa-bromofenilacetato y ciclopentanol sobre zinc metálico activado en tetrahidrofurano anhidro.' }
    ],
    correctIndex: 2,
    explanation: 'En la síntesis de ciclopentolato en el laboratorio, preparamos el reactivo de Ivanov tratando el ácido fenilacético con dos equivalentes de reactivo de Grignard o LDA para generar el dianión hidrocarbonado correspondiente. Al condensar este dianión con ciclopentanona, la presencia de la carga carboxilato suprime la enolización competitiva de la cetona ciclopentánica, permitiendo la adición nucleófila limpia sobre el carbonilo y rindiendo el alfa-hidroxiácido con excelente rendimiento sin subproductos aldólicos. La opción a es la trampa típica: un enolato simple provocaría autocondensación aldólica descontrolada de la ciclopentanona.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-15',
    topicId: 'tema-01',
    block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
    badge: 'Ruta Sintética Directa de Betanecol',
    question: 'En la preparación sintética directa del betanecol a partir de 1-(trimetilamonio)propan-2-ol, ¿qué secuencia de reactivos introduce el grupo carbamato?',
    questionSmiles: 'NC(=O)OC(C)C[N+](C)(C)C',
    options: [
  { text: 'Reacción con fosgeno (COCl₂) para obtener el cloroformiato intermedio seguida de aminólisis directa con amoniaco gaseoso anhidro.' },
  { text: 'Calentamiento prolongado con urea en medio de ácido sulfúrico concentrado con eliminación irreversible de agua azeotrópica en reflujo.' },
  { text: 'Acilación del alcohol secundario con cloruro de acetilo anhidro seguida de reacción con hidrazina y transposición térmica de Curtius.' },
  { text: 'Tratamiento con isocianato de metilo en presencia de piridina seca rindiendo directamente un derivado de N-metilcarbamato secundario.' }
    ],
    correctIndex: 0,
    explanation: 'Planteamos la ruta directa de betanecol a partir de 1-(trimetilamonio)propan-2-ol: activamos el alcohol secundario con fosgeno (COCl₂) para generar el éster de cloroformiato correspondiente y lo tratamos seguidamente con amoníaco anhidro en medio aprótico para formar el grupo carbamato terminal. La presencia del metilo en beta bloquea cualquier interacción con el receptor nicotínico y protege estéricamente el enlace éster. La opción b falla porque la urea es un electrófilo demasiado poco reactivo para acilar un alcohol secundario sin catalizadores metálicos agresivos.',
    difficulty: 'Medio'
  }
];

export const MODELO_B_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 't01-b-01',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Diferenciación Estructural de Recep',
    question: '¿Qué característica estructural y funcional fundamental distingue a los receptores muscarínicos de los receptores nicotínicos en la sinapsis colinérgica?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'Los receptores muscarínicos son dímeros citoplasmáticos con actividad tirosina cinasa y los nicotínicos son canales activados por voltaje.' },
  { text: 'Los receptores nicotínicos son receptores acoplados a proteínas G triméricas y los muscarínicos operan como canales de calcio intracelular.' },
  { text: 'Ambos tipos de receptores presentan una estructura idéntica de siete dominios transmembrana diferenciándose sólo por su velocidad de apertura.' },
  { text: 'Los receptores muscarínicos son GPCRs de siete hélices transmembrana y los nicotínicos son canales iónicos pentaméricos activados por ligando.' }
    ],
    correctIndex: 3,
    explanation: 'En la cátedra diferenciamos claramente las dos familias colinérgicas: los receptores muscarínicos son GPCRs metabotrópicos monoméricos con siete segmentos transmembrana acoplados a proteínas G heterodiméricas, mientras que los nicotínicos son canales iónicos ionotrópicos pentaméricos formados por cinco subunidades homoméricas o heteroméricas dispuestas en torno a un poro acuoso central. La opción a es una trampa clásica de examen que invierte la naturaleza metabotrópica e ionotrópica de ambas familias proteicas.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-02',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Geometría Conformacional Gauche de ',
    question: 'En disolución acuosa y en el estado cristalino, la acetilcolina adopta preferentemente una conformación respecto al enlace central O–C–C–N⁺. ¿Cuál es y cuál es su origen?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'La conformación antiperiplanar con un ángulo de torsión de 180° que aleja al máximo las densidades de carga de ambos heteroátomos polares.' },
  { text: 'La conformación sinclinal (gauche) con ángulo diedro de unos 60° que sitúa los centros farmacofóricos a la distancia óptima de interacción.' },
  { text: 'La conformación eclipsada con ángulo diedro de 0° estabilizada por enlace por puente de hidrógeno intramolecular entre los metilos catiónicos.' },
  { text: 'Una mezcla equimolecular desordenada sin preferencia conformacional debido a la barrera de rotación nula en torno al enlace carbono-carbono.' }
    ],
    correctIndex: 1,
    explanation: 'Mediante resonancia magnética nuclear (1H RMN) y cristalografía determinamos que la acetilcolina en disolución y en el sitio activo muscarínico adopta prioritariamente la conformación sinclinal (gauche), con un ángulo diedro O–C–C–N⁺ de ~60°. Esta disposición espacial sitúa el catión trimetilamonio a ~3.2 Å del oxígeno del éster, encajando a la perfección en la distancia entre el residuo de aspartato y los subsitios aromáticos. El distractor a confunde la estabilidad antiperiplanar en fase gas con la conformación bioactiva real impuesta por el receptor.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-03',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Etapa Limitante Presináptica: Recap',
    question: 'En el ciclo de biosíntesis y degradación de la acetilcolina en la sinapsis colinérgica, ¿cuál es el paso limitante que modula la velocidad de síntesis del neurotransmisor?',
    questionSmiles: 'OCC[N+](C)(C)C',
    options: [
  { text: 'La recaptación de colina mediante el transportador de alta afinidad CHT1 dependiente de sodio, diana que resulta inhibida por hemicolinio-3.' },
  { text: 'La fosforilación mitocondrial del acetil-CoA catalizada por fosfotransferasas dependientes de magnesio, estimulada por toxina botulínica.' },
  { text: 'La condensación citoplasmática mediada por colina acetiltransferasa, la cual es bloqueada competitivamente por concentraciones de nicotina.' },
  { text: 'La entrada pasiva de acetato libre a través de la bicapa lipídica presináptica, proceso acelerado por agentes bloqueantes de los canales de calcio.' }
    ],
    correctIndex: 0,
    explanation: 'Al analizar el ciclo presináptico de la acetilcolina, identificamos la recaptación de colina mediante el transportador CHT1 de alta afinidad (simporte dependiente de Na⁺ y Cl⁻) como la etapa limitante de toda la biosíntesis. Este transportador es el cuello de botella cinético que regula la disponibilidad del sustrato intracelular para la colina acetiltransferasa (ChAT). La opción b es un error conceptual común: la enzima ChAT trabaja a velocidad saturante y no constituye el factor limitante.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-04',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Selectividad Receptor: Alfa-Metilco',
    question: 'La introducción de un sustituyente metilo en la cadena etilénica de la acetilcolina modifica drásticamente la selectividad por receptores. Indique la pauta correcta:',
    questionSmiles: 'CC(=O)OCC(C)[N+](C)(C)C',
    options: [
  { text: 'La alfa-metilcolina es un agonista selectivo muscarínico y la beta-metilcolina carece por completo de actividad sobre cualquier receptor.' },
  { text: 'Ambos derivados pierden la actividad agonista y actúan como antagonistas competitivos debido al excesivo volumen estérico de los metilos.' },
  { text: 'La alfa-metilcolina presenta mayor afinidad por receptores nicotínicos mientras que la beta-metilcolina muestra selectividad muscarínica.' },
  { text: 'Ambos análogos muestran idéntica selectividad muscarínica porque el receptor colinérgico no distingue la posición relativa del sustituyente.' }
    ],
    correctIndex: 2,
    explanation: 'En el desarrollo de derivados metilados de colina, demostramos la rigurosa selectividad estérica: la sustitución con metilo en posición alfa (alfa-metilcolina) preserva la actividad agonista nicotínica pero anula prácticamente la muscarínica, mientras que la metilación en beta (metacolina) induce una selectividad muscarínica casi exclusiva con resistencia añadida frente a la AChE. La trampa del distractor a invierte la posición de los sustituyentes alfa y beta en el puente etilénico.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-05',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Betanecol: Resistencia Combinada y ',
    question: 'El betanecol es un agonista colinérgico de acción prolongada empleado en la retención urinaria posoperatoria. ¿Qué dos modificaciones moleculares sustentan su perfil?',
    questionSmiles: 'NC(=O)OC(C)C[N+](C)(C)C',
    options: [
  { text: 'Un anillo bencénico rígido y un grupo sulfonato que proporcionan afinidad por canales iónicos y protección química frente a esterasas.' },
  { text: 'Un enlace éter inalterable y una amina terciaria no protonable que impiden el ataque de la triada catalítica de la acetilcolinesterasa sináptica.' },
  { text: 'Un grupo éster aromático y dos centros cuaternarios que inducen resistencia enzimática pero confieren selectividad hacia nicotínicos.' },
  { text: 'Un grupo carbamato resistente por resonancia junto a un grupo metilo en posición beta que confiere impedimento estérico y selectividad M.' }
    ],
    correctIndex: 3,
    explanation: 'Diseñamos el betanecol combinando dos modificaciones protectoras sinérgicas: el grupo carbamato le otorga resistencia electrónica frente a la AChE mediante deslocalización por resonancia (+M), mientras que el grupo metilo en posición beta introduce impedimento estérico frente a la catálisis enzimática y anula toda afinidad nicotínica, convirtiéndolo en un agonista muscarínico puro de acción selectiva sobre músculo liso gastrointestinal y urinario. La opción b induce a error al sugerir una afinidad residual por la placa motora.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-06',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Cevimelina: Agonista Muscarínico Es',
    question: 'La cevimelina es un agonista muscarínico prescrito en el síndrome de Sjögren para la xerostomía. ¿Cuál es su elemento estructural distintivo frente a los ésteres clásicos?',
    questionSmiles: 'CC1OC2(CN3CCC2CC3)SC1',
    options: [
  { text: 'Posee un grupo éster fosfato unido a un anillo de piperidina que simula fielmente la densidad de carga del neurotransmisor acetilcolina.' },
  { text: 'Presenta un sistema bicíclico de espirooxatiolano quinuclidina que carece de enlace éster, siendo refractaria a esterasas plasmáticas.' },
  { text: 'Contiene un núcleo de carbamato aromático cuaternario que libera fluoruro en el bolsillo activo bloqueando la degradación enzimática.' },
  { text: 'Incorpora una cadena alquílica larga de doce carbonos que ancla covalentemente la molécula a la superficie externa de la membrana celular.' }
    ],
    correctIndex: 1,
    explanation: 'Al estudiar agonistas no clásicos para el síndrome de Sjögren, analizamos la cevimelina: su núcleo quinuclidinil-tiolano espirocíclico sustituye la cabeza de trimetilamonio acíclica por una amina terciaria bicíclica rígida que estimula selectivamente los receptores M1 y M3 de las glándulas salivales y lagrimales con mínima afectación cardiovascular (M2). El distractor a clasifica erróneamente a la cevimelina como inhibidor de la acetilcolinesterasa.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-07',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Mecanismo y Cinética de Carbamoilac',
    question: 'Al inhibir la acetilcolinesterasa mediante derivados de carbamato como la neostigmina, ¿cuál es el fundamento mecanístico de su carácter pseudoirreversible?',
    questionSmiles: 'CN(C)C(=O)Oc1cccc(c1)[N+](C)(C)C',
    options: [
  { text: 'El fármaco se coordina de forma irreversible con el triptófano del subsitio aniónico bloqueando la salida de los reactivos polares.' },
  { text: 'La molécula se oxida en el fondo de la cavidad catalítica generando un precipitado insoluble que bloquea el acceso a la serina.' },
  { text: 'La enzima carbamoilada en Ser203 sufre una hidrólisis sumamente lenta (orden de horas) frente a la enzima acetilada rápida.' },
  { text: 'El grupo fenólico saliente establece un enlace covalente cruzado irreversible entre la histidina y el glutamato de la tríada.' }
    ],
    correctIndex: 2,
    explanation: 'En el mecanismo de inhibición por carbamatos (neostigmina, piridostigmina), la Ser203 ataca al carbonilo carbámico formando una carbamoil-enzima covalente. A diferencia del intermediario acetilado de la ACh (que se hidroliza en microsegundos), la descarbamoilación de la enzima es sumamente lenta debido a la estabilización por resonancia del carbamato, con una semivida de regeneración de varias horas, actuando como inhibidores pseudoirreversibles. La opción a confunde este proceso con la fosforilación irreversible de los organofosforados.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-08',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Modulación Alostérica Positiva (PAM',
    question: 'La galantamina ofrece una acción terapéutica particular en el tratamiento de la enfermedad de Alzheimer gracias a un mecanismo dual. ¿En qué consiste?',
    questionSmiles: 'CN1CC[C@@]23c4cc5c(cc4O[C@@H]2[C@@H](O)C=C[C@H]3C1)OCO5',
    options: [
  { text: 'Inhibe de forma competitiva reversible la AChE y actúa a la vez como modulador alostérico positivo (PAM) de receptores nicotínicos.' },
  { text: 'Actúa como inhibidor covalente irreversible de la AChE y como antagonista competitivo selectivo de los receptores muscarínicos M1.' },
  { text: 'Bloquea la captación neuronal de colina en la terminal presináptica y estimula la recaptación vesicular de acetato en el citosol.' },
  { text: 'Induce la degradación selectiva de la butirilcolinesterasa plasmática y activa los canales de calcio dependientes de voltaje en axones.' }
    ],
    correctIndex: 0,
    explanation: 'La galantamina posee un doble mecanismo de acción terapéutico en la enfermedad de Alzheimer: actúa como inhibidor competitivo reversible de la AChE y, simultáneamente, se une como modulador alostérico positivo (PAM) a los receptores colinérgicos nicotínicos neuronales (subtipos alfa4-beta2 y alfa7), potenciando la neurotransmisión colinérgica endógena. El distractor b propone falsamente un antagonismo competitivo nicotínico, lo que empeoraría el cuadro cognitivo.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-09',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Fenómeno de Envejecimiento (Aging) ',
    question: 'Tras la fosforilación de la acetilcolinesterasa por ciertos organofosforados como el somán o el sarín, la enzima se vuelve irreversiblemente refractaria. ¿A qué se debe?',
    questionSmiles: 'CC(C)OP(=O)(C)F',
    options: [
  { text: 'La protonación reversible de la histidina catalítica que desplaza el catión magnesio necesario para la catálisis enzimática fisiológica.' },
  { text: 'La migración intramolecular del grupo fosforilo hacia el residuo de triptófano vecino en la entrada de la garganta hidrofóbica activa.' },
  { text: 'La racemización del centro fosforado con pérdida de la afinidad por reactivadores derivados de oximas y desnaturalización de la proteína.' },
  { text: 'La desaquilación no enzimática del aducto enzima-fosforilado que genera una carga negativa neta que repele el ataque de la pralidoxima.' }
    ],
    correctIndex: 3,
    explanation: 'El fenómeno de envejecimiento (aging) de la AChE fosforilada por organofosforados consiste en la ruptura no enzimática de uno de los enlaces éster C–O del resto organofosforado con pérdida de un grupo alquilo (p. ej. isopropilo en sarín), dejando un átomo de oxígeno cargado negativamente sobre el fósforo. Esta carga negativa aniónica desactiva el carácter electrófilo del fósforo e impide por completo el ataque de reactivadores como la pralidoxima. La opción a es errónea: el aging no es la hidrólisis espontánea del enlace fosfoserina.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-10',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Atropina como Mezcla Racémica Natur',
    question: 'La atropina utilizada en clínica se presenta como una mezcla racémica (±), a pesar de proceder de la planta Atropa belladonna. ¿Cuál es el origen químico de este hecho?',
    questionSmiles: 'CN1C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3',
    options: [
  { text: 'El vegetal biosintetiza exclusivamente el racemato mediante una ruta enzimática que carece por completo de estereoselectividad óptica.' },
  { text: 'Se aísla a partir de la (-)-hiosciamina natural, la cual sufre una racemización espontánea en el carbono alfa del éster durante el proceso.' },
  { text: 'Procede de una ruta semisintética donde el acoplamiento entre tropanol y ácido trópico transcurre con pérdida total de los centros quirales.' },
  { text: 'Ambos enantiómeros poseen idéntica afinidad por el receptor muscarínico debido a que el centro quiral no participa en el anclaje a la diana.' }
    ],
    correctIndex: 1,
    explanation: 'Explicamos a los alumnos que la atropina es la mezcla racémica (±)-hiosciamina. En la planta Atropa belladonna se biosintetiza exclusivamente el enantiómero levógiro (-)-(S)-hiosciamina, pero durante el proceso de extracción en medio alcalino el centro quiral alfa al carbonilo se enoliza con extrema facilidad, racemizando a (±)-atropina. El enantiómero (-) retiene casi toda la actividad antimuscarínica. El distractor a confunde la racemización química de extracción con una síntesis biológica racémica.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-11',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Butilescopolamina: Confinamiento Pe',
    question: 'El bromuro de butilescopolamina es un fármaco ampliamente prescrito en cólicos gastrointestinales y renales. ¿Cuál es la base de su ausencia de efectos sedantes en el SNC?',
    questionSmiles: 'CCCC[N+]1(C)C2CC(C1C3OC23)OC(=O)C(CO)c4ccccc4',
    options: [
  { text: 'La supresión del puente epóxido en el anillo de tropano que acelera la excreción renal reduciendo de manera drástica la toxicidad sistémica.' },
  { text: 'La escisión del anillo bicíclico para convertirlo en una cadena alifática flexible que incrementa la selectividad espasmolítica digestiva.' },
  { text: 'La introducción de un resto butilo cuaternario que confiere carga formal permanente impidiendo atravesar la barrera hematoencefálica.' },
  { text: 'La sustitución del éster trópico por una función amida alifática primaria que confiere resistencia frente a esterasas de la luz intestinal.' }
    ],
    correctIndex: 2,
    explanation: 'El bromuro de butilescopolamina es el ejemplo paradigmático de diseño de antiespasmódico por cuaternización: la incorporación del grupo n-butilo sobre el nitrógeno del tropano genera una sal cuaternaria permanente con LogP extremadamente bajo. Esto anula su absorción sistémica y su paso a través de la barrera hematoencefálica, limitando su acción al bloqueo local de receptores M3 en el plexo mientérico intestinal sin efectos centrales. La opción a es falsa: la butilescopolamina no atraviesa la BHE.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-12',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Biperideno vs Tropicamida: Diferenc',
    question: 'Al comparar las estructuras y aplicaciones del biperideno y la tropicamida, identifique la correlación molecular y clínica acertada:',
    questionSmiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CC4C=CC3C4',
    options: [
  { text: 'El biperideno es un aminoalcohol terciario lipófilo para Parkinson central; la tropicamida es una amida terciaria para midriasis diagnóstica.' },
  { text: 'El biperideno es un catión amonio cuaternario para broncodilatación en EPOC; la tropicamida es un carbinol bicíclico para tratamiento de úlcera.' },
  { text: 'La tropicamida posee una carga formal permanente positiva que confiere cicloplejía prolongada; el biperideno es un éster de acción ultracorta.' },
  { text: 'Ambos son amonios cuaternarios hidrófilos que se administran conjuntamente por vía oftálmica para tratar el glaucoma de ángulo cerrado.' }
    ],
    correctIndex: 0,
    explanation: 'Comparamos el perfil de biperideno y tropicamida: el biperideno es una amina terciaria lipófila que cruza con rapidez la BHE para bloquear receptores M1 estriatales en el Parkinson, mientras que la tropicamida es una amida/amina diseñada para uso oftálmico tópico como midriático y ciclopléjico de acción ultracorta (recuperación en 4-6 h). La opción b invierte la farmacocinética de ambos agentes terapéuticos.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-13',
    topicId: 'tema-01',
    block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
    badge: 'Mecanismo de Apertura y Desensibili',
    question: 'A nivel molecular, ¿qué cambio conformacional desencadena la unión de dos moléculas de acetilcolina en el receptor nicotínico muscular (nAChR)?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'Fosforilación del bucle citoplasmático por cinasas celulares induciendo la escisión proteolítica irreversible del canal iónico.' },
  { text: 'Disociación de las subunidades alfa en monómeros citoplasmáticos solubles debido a cambios bruscos del potencial de membrana.' },
  { text: 'Oligomerización de varios pentámeros en la membrana plasmática formando un megaporos no selectivo permeable a proteínas globulares.' },
  { text: 'Rotación de las hélices transmembrana M2 desplazando el anillo de leucinas de la compuerta para permitir el influjo catiónico.' }
    ],
    correctIndex: 3,
    explanation: 'Al activarse el receptor nicotínico muscular o neuronal, la unión concertada de dos moléculas de acetilcolina en las interfases alfa-gamma y alfa-delta provoca una rotación de las hélices transmembrana M2, abriendo el canal iónico central y permitiendo la entrada rápida de Na⁺ (y salida de K⁺) que despolariza la membrana. La ocupación prolongada por agonistas conduce a una desensibilización conformacional reversible del canal. La opción a comete el error de afirmar que el canal se abre con una sola molécula de ligando.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-14',
    topicId: 'tema-01',
    block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
    badge: 'Síntesis Orgánica Directa de Trihex',
    question: 'En la ruta sintética directa del trihexifenidilo, ¿qué dos etapas consecutivas permiten construir el esqueleto del aminoalcohol carbinólico?',
    questionSmiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CCCCC3',
    options: [
  { text: 'Condensación de Claisen de fenilacetato con ciclohexanona en medio básico y posterior aminación reductora catalítica con piperidina.' },
  { text: 'Acilación de Friedel-Crafts de benceno con cloruro de acriloilo sobre AlCl₃ y posterior adición organometálica de tipo Reformatsky.' },
  { text: 'Reacción de Mannich de acetofenona, formaldehído y piperidina en medio ácido seguida de adición con bromuro de ciclohexilmagnesio.' },
  { text: 'Acoplamiento de Heck entre bromobenceno y 1-alilpiperidina catalizado por paladio seguido de epoxidación con perácidos aromáticos.' }
    ],
    correctIndex: 2,
    explanation: 'Planteamos la síntesis directa de trihexifenidilo mediante una secuencia en dos pasos clave: en primer lugar, ejecutamos una reacción de Mannich de tres componentes condensando acetofenona, formaldehído acuoso y piperidina en medio ácido para obtener la beta-aminocetona precursora; a continuación, realizamos una adición de Grignard con bromuro de ciclohexilmagnesio en éter anhidro sobre el carbonilo cetónico para construir el carbinol terciario con alto rendimiento. La opción a es la trampa de examen clásica: una adición aldólica directa no introduciría el grupo amino piperidínico.',
    difficulty: 'Medio'
  },
  {
    id: 't01-b-15',
    topicId: 'tema-01',
    block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
    badge: 'Síntesis Orgánica Directa de Adifen',
    question: 'En la preparación sintética directa del antiespasmódico adifenina, ¿qué reactivos y condiciones conducen eficazmente al éster aminoalcohólico?',
    questionSmiles: 'CCN(CC)CCOC(=O)C(c1ccccc1)c2ccccc2',
    options: [
  { text: 'Condensación entre difenilcetena y dietilcloroamina en presencia de etóxido sódico en medio alcohólico anhidro a temperatura ambiente.' },
  { text: 'Reacción entre cloruro de difenilacetilo y 2-(dietilamino)etanol en disolvente aprótico anhidro en presencia de una base aceptora.' },
  { text: 'Acoplamiento radicalario entre ácido difenilacético y dietilamina libre promovido por peróxidos orgánicos a temperaturas elevadas.' },
  { text: 'Alquilación reductora de difenilmetano con carbonato de dietilaminoetilo catalizada por ácido sulfúrico concentrado a reflujo suave.' }
    ],
    correctIndex: 1,
    explanation: 'Para la preparación de adifenina en el laboratorio, seleccionamos la acilación directa del 2-(dietilamino)etanol empleando cloruro de difenilacetilo en disolvente aprótico anhidro (diclorometano o tolueno) en presencia de una base no nucleofílica como trietilamina o piridina como captador del HCl liberado. Esta vía acilo-oxígeno evita reacciones colaterales de cuaternización intramolecular. El distractor a confunde la ruta acilo con una sustitución nucleófila SN2 sobre haluros de alquilo que polimerizaría la diamina.',
    difficulty: 'Medio'
  }
];

export const MODELO_C_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 't01-c-01',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Interacción de Enlace de Hidrógeno ',
    question: 'El oxígeno carbonílico del enlace éster de la acetilcolina desempeña un papel clave en el receptor muscarínico. ¿Cuál es su interacción molecular primaria?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'Actúa como aceptor de enlace de hidrógeno con un residuo conservado (como Asn o Thr) estabilizando la conformación activa del receptor.' },
  { text: 'Cede electrones para formar un enlace covalente dativo irreversible con cationes de hierro presentes en el bolsillo de unión proteico.' },
  { text: 'Genera una repulsión estérica voluntaria que expulsa las moléculas de agua circundantes aumentando la entropía de solvatación del ligando.' },
  { text: 'Sufre un ataque nucleófilo por parte de un residuo de histidina desprotonada para formar un enlace acilo covalente transitorio y reversible.' }
    ],
    correctIndex: 0,
    explanation: 'En el reconocimiento molecular de la acetilcolina por el receptor muscarínico, el oxígeno del grupo carbonilo del éster actúa como un aceptor de enlace de hidrógeno específico y riguroso, interactuando con restos conservados de tirosina y asparagina en el fondo de la cavidad ortostérica. Esta interacción orienta el dipolo de la molécula para permitir el anclaje óptimo de la cabeza catiónica. El distractor b comete el error habitual de proponer al oxígeno como dador de hidrógeno, lo cual es físicamente imposible al carecer de enlaces O–H.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-02',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Rotación y Flexibilidad en la Caden',
    question: 'La cadena de dos carbonos (puente etilénico) de la acetilcolina posee una elevada flexibilidad conformacional. ¿Cómo influye dicha propiedad en su perfil farmacológico?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'El enlace C-C posee rotación completamente impedida por enlaces de hidrógeno intramoleculares, forzando una estructura rígida plana en agua.' },
  { text: 'La molécula adopta con exclusividad la conformación eclipsada de máxima energía para superar la barrera dipolar generada por el nitrógeno.' },
  { text: 'La rotación permite estados sinclinal y antiperiplanar, siendo la sinclinal (gauche) la predominante en el complejo de unión muscarínico.' },
  { text: 'El puente de dos metilenos polimeriza espontáneamente en ausencia de disolventes próticos impidiendo la rotación en medio fisiológico.' }
    ],
    correctIndex: 2,
    explanation: 'El enlace sigma C–C del puente etilénico en la acetilcolina presenta una barrera rotacional muy baja (~3 kcal/mol), lo que permite a la molécula interconvertirse libremente en disolución acuosa entre confórmeros antiperiplanarares (trans) y sinclinales (gauche). Sin embargo, el receptor muscarínico selecciona específicamente el confórmero gauche (sinclinal, ~60°, 3.2 Å) al inducir el acoplamiento bioactivo complementario. La opción a es falsa: la cadena de ACh no está rígidamente bloqueada por enlaces dobles.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-03',
    topicId: 'tema-01',
    block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
    badge: 'Catálisis Enzimática en AChE: Tríad',
    question: 'En la tríada catalítica de la acetilcolinesterasa (Ser203, His447, Glu334), ¿cuál es la función mecanística coordinada de His447 y Glu334 durante la acetilación de Ser203?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'Glu334 protona directamente a la serina para neutralizar su carácter nucleófilo facilitando la aproximación dipolar del grupo acetilo.' },
  { text: 'His447 establece un enlace covalente dativo con el nitrógeno cuaternario anclando la molécula de acetilcolina en el fondo de la cavidad.' },
  { text: 'La tríada catalítica estabiliza el ión oxianión intermedio por repulsión iónica sin participar en transferencias de protones en el ciclo.' },
  { text: 'Glu334 orienta y polariza a His447, la cual actúa como base general sustrayendo el protón de Ser203 para potenciar su ataque nucleófilo.' }
    ],
    correctIndex: 3,
    explanation: 'Al analizar la catálisis enzimática en la acetilcolinesterasa, describimos el mecanismo de relé de carga de la tríada Ser203-His447-Glu334: el carboxilato de Glu334 estabiliza por puente de hidrógeno a His447, permitiendo que esta base actúe como un aceptor general de protones que desprotona el hidroxilo de la Ser203, transformándolo en un alcóxido sumamente nucleófilo capaz de atacar al carbonilo de la acetilcolina a velocidad de difusión. La opción a comete el grave error de atribuir el ataque nucleófilo a un residuo de cisteína.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-04',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Mimetismo Estéreo: (S)-Metacolina y',
    question: 'Al comparar tridimensionalmente la (+)-muscarina natural y la (S)-metacolina, ¿qué coincidencia estereoquímica explica la superior potencia del enantiómero S?',
    questionSmiles: 'CC(=O)O[C@@H](C)C[N+](C)(C)C',
    options: [
  { text: 'El grupo beta-metilo en (R)-metacolina orienta el amonio hacia el exterior impidiendo toda interacción con el residuo de aspartato diana.' },
  { text: 'El grupo beta-metilo en configuración S reproduce la orientación del metilo en C-5 y la conformación gauche bioactiva de (+)-muscarina.' },
  { text: 'La configuración R provoca la desprotonación espontánea del nitrógeno cuaternario en el fondo del bolsillo del receptor colinérgico diana.' },
  { text: 'La orientación S incrementa el peso molecular del ligando reduciendo de manera drástica su tasa de difusión transmembrana en la sinapsis.' }
    ],
    correctIndex: 1,
    explanation: 'La razón estructural de la eudismia en metacolina es que la (S)-metacolina mimetiza con fidelidad el centro estereogénico C-5 de la (+)-(2S,4R,5S)-muscarina natural. Esta correspondencia conformacional sitúa el sustituyente metilo en una bolsa hidrófoba no impedida del receptor muscarínico, mientras que en el eutómero (R) el metilo genera un choque estéreo frontal que impide el acercamiento del éster a los residuos polares del receptor. La opción a confunde los centros quirales, asignando erróneamente la actividad a la forma (R).',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-05',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Jerarquía de Estabilidad Metabólica',
    question: 'Considere la serie de análogos de acetilcolina: acetilcolina, metacolina, carbacol y betanecol. ¿Cuál es el orden creciente de estabilidad metabólica frente a AChE?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'Carbacol < Acetilcolina < Metacolina < Betanecol, ya que los carbamatos aceleran notablemente el ataque nucleófilo en la cavidad activa.' },
  { text: 'Betanecol < Metacolina < Carbacol < Acetilcolina, ya que los sustituyentes beta aumentan la accesibilidad al bolsillo catalítico de la serina.' },
  { text: 'Acetilcolina < Metacolina < Carbacol < Betanecol, combinando sucesivamente impedimento estérico beta y resonancia donadora del carbamato.' },
  { text: 'Metacolina < Betanecol < Acetilcolina < Carbacol, porque la presencia del centro quiral favorece la aproximación de la serina catalítica.' }
    ],
    correctIndex: 2,
    explanation: 'Establecemos en el laboratorio la jerarquía estricta de estabilidad metabólica frente a la AChE: Acetilcolina (hidrólisis ultra rápida, t½ en milisegundos) < Metacolina (estabilidad intermedia por efecto estérico del metilo en beta) < Carbacol / Betanecol (resistencia prácticamente total debido al efecto mesómero donador +M del grupo carbamato que anula la electrofilia del carbonilo). El distractor a propone erróneamente que la acetilcolina es más resistente que los carbamatos.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-06',
    topicId: 'tema-01',
    block: 'Bloque 2 · Agonistas Directos y SAR',
    badge: 'Pilocarpina: Farmacóforo y Protonac',
    question: 'A diferencia de la mayoría de los agonistas muscarínicos, la pilocarpina carece de un nitrógeno cuaternario. ¿Cómo interactúa eficazmente con el receptor?',
    questionSmiles: 'CCC1C(COC1=O)Cc2cnc[nH]2',
    options: [
  { text: 'El nitrógeno del anillo de imidazol se protona parcialmente a pH fisiológico mimetizando la cabeza catiónica y la lactona aporta el oxígeno.' },
  { text: 'El heterociclo de imidazol actúa como dador de enlaces covalentes directos con el zinc catalítico del canal iónico nicotínico postsináptico.' },
  { text: 'La lactona aromática se abre reversiblemente en el plasma rindiendo un ácido carboxílico que interacciona con los residuos básicos del canal.' },
  { text: 'La molécula carece de interacciones polares actuando de forma indirecta mediante la inhibición competitiva de esterasas en la hendidura sináptica.' }
    ],
    correctIndex: 0,
    explanation: 'Al examinar la estructura de la pilocarpina, observamos que su farmacóforo combina un anillo de imidazol que a pH fisiológico (7.4) se encuentra en un equilibrio de protonación parcial (~20-30% como catión) y un anillo gamma-lactónico sustituido. La forma catiónica del imidazol mimetiza a la cabeza de amonio cuaternario de la acetilcolina interactuando con el carboxilato del receptor muscarínico, mientras que el oxígeno lactónico mimetiza al éster de ACh. La opción b induce a error al afirmar que el imidazol está cuaternizado permanentemente.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-07',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Rivastigmina: Inhibidor Pseudoirrev',
    question: 'La rivastigmina se emplea en la demencia tipo Alzheimer. ¿Qué rasgo estructural le confiere una selectividad enzimática central y prolongada acción terapéutica?',
    questionSmiles: 'CCN(C)C(=O)Oc1cccc(c1)[C@@H](C)N(C)C',
    options: [
  { text: 'Un grupo amonio cuaternario hidrófilo que impide su distribución periférica facilitando un transporte activo mediado por vesículas a encéfalo.' },
  { text: 'Un enlace éster fosfato aromático que forma enlaces covalentes irreversibles con la butirilcolinesterasa de los miocitos periféricos.' },
  { text: 'Un núcleo pirroloindólico oxidable que genera radicales libres en la vecindad de las placas beta-amiloides neutralizando su toxicidad neuronal.' },
  { text: 'Un grupo carbamato lipófilo con amina terciaria que cruza la BHE y carbamoila la serina catalítica de la AChE cerebral durante horas.' }
    ],
    correctIndex: 3,
    explanation: 'Diseñamos la rivastigmina como un inhibidor carbámico dual de AChE y BuChE para el tratamiento del Alzheimer en el SNC: su estructura incorpora un grupo carbamato fenólico N-etil-N-metilo que se carbamoila lentamente en el cerebro (semivida de inhibición ~10 horas) y una amina terciaria lipófila que cruza la BHE, metabolizándose por sulfoconjugación y no por el citocromo P450, lo que elimina el riesgo de hepatotoxicidad severa. El distractor a confunde a la rivastigmina con un bloqueante neuromuscular irreversible.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-08',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Evolución Molecular: De Tacrina a D',
    question: 'La tacrina fue el primer inhibidor de AChE aprobado para Alzheimer pero se retiró por severa hepatotoxicidad. ¿Cómo solucionó el diseño de donepezilo este problema?',
    questionSmiles: 'c1ccc2c(c1)c(c3c(n2)CCCC3)N',
    options: [
  { text: 'Se incorporó un grupo amonio cuaternario con carga fija que confina la molécula al hígado impidiendo su metabolismo oxidativo por citocromos.' },
  { text: 'Se reemplazó el núcleo aminoacridínico reactivo por un sistema de bencilpiperidina e indanona que inhibe de modo reversible no hepatotóxico.' },
  { text: 'Se eliminaron todos los heteroátomos aromáticos de la molécula transformándola en un lípido insaponificable que no requiere excreción biliar.' },
  { text: 'Se añadió un enlace carbamato fluorado que suprime por completo la formación de metabolitos reactivos de tipo quinona imina en hepatocitos.' }
    ],
    correctIndex: 1,
    explanation: 'En la evolución histórica de fármacos anticolinesterásicos para el Alzheimer, la tacrina fue el primer fármaco aprobado pero debió retirarse por su alta incidencia de necrosis hepática e hipertransaminasemia. Fue sustituida por el donepezilo, un inhibidor reversible no carbamato derivado de bencildimetoxialcanos que no forma metabolitos quinónicos hepatotóxicos y posee una semivida plasmática prolongada (~70 h) que permite una sola dosis diaria. La opción a invierte la cronología y el perfil toxicológico de ambos compuestos.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-09',
    topicId: 'tema-01',
    block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
    badge: 'Función del Catión Piridinio en la ',
    question: 'La pralidoxima posee un nitrógeno cuaternario de N-metilpiridinio contiguo a la función aldoxima. ¿Cuál es la justificación fisicoquímica de este catión?',
    questionSmiles: 'O/N=C/c1cccc[n+]1C',
    options: [
  { text: 'El catión piridinio ancla la molécula en el subsitio aniónico orientando con precisión el ión oximato frente al fósforo electrofílico.' },
  { text: 'El nitrógeno cuaternario permite que la pralidoxima atraviese con facilidad la barrera hematoencefálica para reactivar la enzima central.' },
  { text: 'El anillo aromático reacciona por sustitución electrófila desactivando las moléculas de organofosforado libres en la hendidura sináptica.' },
  { text: 'La carga positiva oxida al residuo de histidina catalítica impidiendo que continúe la hidrólisis anormal de fosfoésteres en la serina.' }
    ],
    correctIndex: 0,
    explanation: 'Al utilizar pralidoxima (2-PAM) como reactivador enzimático, el átomo de nitrógeno del anillo de piridinio porta una carga formal positiva permanente que se ancla electrostáticamente en el subsitio aniónico periférico (PAS) de la enzima; este posicionamiento tridimensional orienta de manera precisa el grupo oxima nucleófilo en ángulo directo de ataque hacia el átomo de fósforo del organofosforado. La trampa en la opción b sostiene que el piridinio es una base que captura protones, ignorando su estado cuaternario invariable.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-10',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Bromuro de Tiotropio: Selectividad ',
    question: 'El bromuro de tiotropio se administra una sola vez al día en EPOC gracias a su selectividad cinética. ¿Qué modificación molecular explica su disociación tan lenta?',
    questionSmiles: 'C[N+]1(C)C2CC(C1C3OC23)OC(=O)C(O)(c4cccs4)c5cccs5',
    options: [
  { text: 'La reducción de su volumen estérico que acelera el transporte activo en el músculo liso bronquial mediado por transportadores de cationes.' },
  { text: 'La sustitución del anillo de tropano por una amina voluminosa que resiste la hidrólisis por esterasas en el tejido respiratorio periférico.' },
  { text: 'La formación de un enlace covalente coordinado con el receptor muscarínico que impide la inactivación por internalización endocítica rápida.' },
  { text: 'La incorporación de dos anillos aromáticos ditienilo voluminosos que retardan drásticamente la constante de disociación del receptor M3.' }
    ],
    correctIndex: 3,
    explanation: 'En el tratamiento del broncoespasmo en la EPOC, el bromuro de tiotropio destaca por su selectividad cinética: aunque tiene afinidad similar por los receptores M1, M2 y M3, se disocia extremadamente despacio de los receptores M3 broncodilatadores (t½ de disociación > 35 horas) y mucho más rápido de los receptores M2 autorreceptores, permitiendo un efecto broncodilatador sostenido de 24 horas con una única inhalación al día. El distractor a propone una selectividad termodinámica pura, desconociendo el fenómeno de selectividad cinética por disociación lenta.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-11',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Parámetros Fisicoquímicos y Confina',
    question: '¿Qué combinación de propiedades fisicoquímicas en una molécula anticolinérgica asegura que quede confinada en periferia sin penetrar en el encéfalo?',
    questionSmiles: 'CC(C)[N+]1(C)C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3',
    options: [
  { text: 'Una elevada lipofilia (LogP > 4.5) combinada con un área polar superficial (TPSA) baja inferior a 25 Å² que excluye la penetración celular.' },
  { text: 'Un peso molecular superior a 1500 Da que supera el umbral de filtración glomerular impidiendo el transporte por transportadores endoteliales.' },
  { text: 'Una carga positiva neta permanente (ionización 100%), hidrofilia elevada y TPSA efectiva alta que bloquean la difusión pasiva por la BHE.' },
  { text: 'Una susceptibilidad extrema a la degradación por aminopeptidasas del endotelio vascular cerebral que destruyen el fármaco antes de cruzar.' }
    ],
    correctIndex: 2,
    explanation: 'En Química Médica correlacionamos la biodisponibilidad y cruce de barreras mediante el coeficiente de reparto LogP y la carga formal: fármacos con amonios cuaternarios permanentes (neostigmina, ipratropio) poseen LogP negativo y carecen de formas neutras permeables, quedando estrictamente confinados en el compartimento vascular y periférico. En contraste, las aminas terciarias (fisostigmina, donepezilo, atropina) mantienen una fracción neutra en equilibrio que atraviesa membranas biológicas y la BHE por difusión pasiva lipófila. La opción a invierte esta correlación.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-12',
    topicId: 'tema-01',
    block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
    badge: 'Ciclopentolato vs Tropicamida: Dura',
    question: 'Tanto ciclopentolato como tropicamida se emplean como midriáticos en exploraciones oculares. ¿Cuál es la base química de la acción más breve de la tropicamida?',
    questionSmiles: 'CN(C)CCOC(=O)C(c1ccccc1)C2(O)CCCC2',
    options: [
  { text: 'La presencia de una función amida en la tropicamida que confiere menor afinidad y disociación rápida respecto al éster de ciclopentolato.' },
  { text: 'El grupo amino cuaternario de la tropicamida que sufre una hidrólisis ácida instantánea en contacto con las sales del fluido lagrimal ocular.' },
  { text: 'La menor solubilidad de la tropicamida en el humor acuoso que induce su precipitación mecánica en forma de microcristales insolubles inertes.' },
  { text: 'La degradación fotoquímica del anillo de piridina de la tropicamida inducida por la luz azul empleada en la lámpara de hendidura diagnóstica.' }
    ],
    correctIndex: 0,
    explanation: 'Comparamos la duración clínica de la midriasis y cicloplejía en oftalmología: la tropicamida posee una afinidad moderada y una cinética de disociación rápida, lo que permite la recuperación de la función visual en solo 4 a 6 horas, siendo ideal para exploraciones diagnósticas de fondo de ojo. Por el contrario, el ciclopentolato se disocia mucho más lentamente del receptor M3 ciliar, prolongando la parálisis acomodativa durante más de 24 horas. La opción a es la trampa típica: invierte los tiempos de acción de ambos fármacos oftálmicos.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-13',
    topicId: 'tema-01',
    block: 'Bloque 5 · Síntesis Orgánica Directa de Fármacos Colinérgicos',
    badge: 'Síntesis Orgánica Directa de Neosti',
    question: 'En la síntesis industrial de la neostigmina a partir de 3-(dimetilamino)fenol, ¿cuál es la ruta sintética directa de dos etapas empleada?',
    questionSmiles: 'CN(C)C(=O)Oc1cccc(c1)[N+](C)(C)C',
    options: [
  { text: 'Tratamiento fenólico con fosgeno gaseoso seguido de aminólisis con hidrazina y posterior metilación exhaustiva con diazometano.' },
  { text: 'Carbamoilación del fenol con cloruro de dimetilcarbamoilo en medio básico y posterior cuaternización con sulfato de dimetilo.' },
  { text: 'Alquilación directa del fenol con cloruro de tetrametilamonio acuoso seguida de carbamoilación con urea en ácido sulfúrico anhidro.' },
  { text: 'Nitración aromática del fenol seguida de hidrogenación catalítica y condensación con isocianato de metilo en amoniaco líquido.' }
    ],
    correctIndex: 1,
    explanation: 'Para la síntesis de neostigmina en el laboratorio, preparamos primero el éster carbámico tratando el 3-(dimetilamino)fenol con cloruro de dimetilcarbamoilo (Me₂N–COCl) en piridina anhidra a reflujo moderado; una vez aislado el carbamato aromático, procedemos a la cuaternización regioselectiva del nitrógeno de la amina terciaria mediante tratamiento con sulfato de dimetilo o bromuro de metilo a temperatura ambiente. La opción a es errónea: intentar cuaternizar antes de la carbamilación desactivaría nucleofílicamente al fenol o formaría sales insolubles.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-14',
    topicId: 'tema-01',
    block: 'Bloque 5 · Síntesis Orgánica Directa de Fármacos Colinérgicos',
    badge: 'Síntesis Orgánica Directa de Carbac',
    question: 'En la preparación sintética directa del carbacol a partir de 2-cloroetanol, ¿qué reactivos y transformaciones químicas se suceden en la ruta?',
    questionSmiles: 'NC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'Oxidación de 2-cloroetanol a ácido cloroacético seguida de condensación con urea anhidra y metilación con yoduro de metilo gaseoso.' },
  { text: 'Sustitución con cianuro sódico seguida de reducción con hidruro de litio y aluminio e introducción del carbamato con cloroformiato.' },
  { text: 'Reacción de óxido de etileno con amoniaco seguida de acilación con cloruro de acetilo y cuaternización final con cloruro de metilo.' },
  { text: 'Reacción con fosgeno para dar cloroformiato de cloroetilo, aminólisis con amoniaco y desplazamiento bimolecular con trimetilamina.' }
    ],
    correctIndex: 3,
    explanation: 'Planteamos la ruta industrial de carbacol a partir de 2-cloroetanol: condensamos el alcohol clorado con fosgeno gaseoso (COCl₂) en medio seco para formar el cloroformiato de 2-cloroetilo; a continuación, el tratamiento con amoníaco anhidro rinde el carbamato de 2-cloroetilo libre de subproductos; finalmente, la cuaternización mediante sustitución nucleófila bimolecular (SN2) con trimetilamina en tubo cerrado produce el cloruro de carbacol puro. El distractor a propone una aminación con urea que no prospera por la baja nucleofilia de las amidas.',
    difficulty: 'Medio'
  },
  {
    id: 't01-c-15',
    topicId: 'tema-01',
    block: 'Bloque 5 · Síntesis Orgánica Directa de Fármacos Colinérgicos',
    badge: 'Síntesis Orgánica Directa de Metaco',
    question: 'En la ruta sintética directa de la metacolina a partir de 1-bromo-2-propanol, ¿cuáles son los reactivos empleados en la secuencia de dos etapas?',
    questionSmiles: 'CC(=O)OC(C)C[N+](C)(C)C',
    options: [
  { text: '(1) Fosgeno (COCl₂) en medio básico alcalino y (2) amoníaco gas anhidro en exceso para rendir directamente el éster carbámico terminal.' },
  { text: '(1) Amoniaco gaseoso en autoclave para formar amina primaria y (2) cloruro de acetilo seguido de metilación con diazometano volátil.' },
  { text: '(1) Trimetilamina para la cuaternización nucleófila (SN2) y (2) anhídrido acético para la acilación selectiva del alcohol secundario.' },
  { text: '(1) Trietilamina para favorecer eliminación de tipo Hofmann a alqueno y (2) adición electrofílica de ácido acético concentrado caliente.' }
    ],
    correctIndex: 2,
    explanation: 'En la síntesis directa de metacolina, partimos de 1-bromo-2-propanol o abrimos regioespecíficamente óxido de propileno con trimetilamina en disolución alcohólica, rindiendo el hidroxi-amonio cuaternario 1-(trimetilamonio)propan-2-ol; en la etapa final, acetilamos el alcohol secundario con cloruro de acetilo o anhídrido acético en presencia de acetato sódico anhidro. La trampa del distractor a consiste en intentar condensar acetato de etilo con bromuro de colina, lo que no generaría la ramificación metílica beta de la metacolina.',
    difficulty: 'Medio'
  }
];

export const RETROSINTESIS_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 'ret-01',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Desconexiones C–C y Alquilación',
    badge: 'Desconexión C–C en Bencilmalonatos:',
    question: 'En el análisis retrosintético del bencilmalonato de dietilo (precursor de derivados fenilalquilcarboxílicos), ¿cuál es la desconexión C–C en la posición alfa viable frente a la desconexión directa del enlace con el anillo aromático?',
    questionSmiles: 'CCOC(=O)C(Cc1ccccc1)C(=O)OCC',
    options: [
  { text: 'Sintón fenilo catiónico Ph⁺ (bromobenceno) y carbanión malonato ⁻CH(CO₂Et)₂, viable por ataque nucleófilo directo sobre el anillo aromático sp².' },
  { text: 'Sintón benzoilo PhCO⁺ (cloruro de benzoilo) y aceptor carbaniónico ⁻C(CO₂Et)₂ (malonato), seguido de reducción con hidruro de litio y aluminio anhidro.' },
  { text: 'Sintón bencilo electrófilo PhCH₂⁺ (bromuro de bencilo) y nucleófilo dador ⁻CH(CO₂Et)₂ (malonato), evitando la inviable sustitución SN2 en carbono sp².' },
  { text: 'Sintón radicalario bencilo PhCH₂• (tolueno) y radical malonilo •CH(CO₂Et)₂ (malonato), activados térmicamente mediante peróxido de dibenzoilo a reflujo.' }
    ],
    correctIndex: 2,
    explanation: 'Planteamos la desconexión estratégica del enlace C(alfa)–C(bencílico) porque nos genera el sintón aceptor PhCH₂⁺ (equivalente comercial: bromuro de bencilo) y el sintón nucleófilo dador ⁻CH(CO₂Et)₂ (malonato de dietilo desprotonado con NaOEt). Esta ruta funciona con rendimientos excelentes mediante sustitución SN2 limpia sobre el carbono bencílico primario activado. Como trampa típica (opción a), el alumno suele intentar desconectar el enlace C(alfa)–Ar; sin embargo, generar un sintón Ph⁺ requeriría una sustitución nucleófila directa sobre un haluro de arilo (bromobenceno), lo cual es imposible por SN2 en carbonos aromáticos sp².',
    difficulty: 'Medio'
  },
  {
    id: 'ret-02',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Desconexiones de Ésteres Acilo-Oxígeno',
    badge: 'Desconexión Éster Acilo-Oxígeno en ',
    question: 'En el diseño retrosintético de la adifenina (antagonista muscarínico antiespasmódico), ¿cuál es la desconexión éster más convergente y eficiente en términos de sintones y equivalentes sintéticos comerciales?',
    questionSmiles: 'CCN(CC)CCOC(=O)C(c1ccccc1)c2ccccc2',
    options: [
  { text: 'Desconexión C–O acilo-oxígeno: sintón aceptor Ph₂CH–CO⁺ (cloruro de difenilacetilo) y sintón dador ⁻OCH₂CH₂NEt₂ (2-(dietilamino)etanol) en medio aprótico anhidro.' },
  { text: 'Desconexión C–O alquilo-oxígeno: sintón carboxilato Ph₂CH–COO⁻ (ácido difenilacético) y sintón carbocatión ⁺CH₂CH₂NEt₂ (2-cloro-N,N-dietiletanamina) con base débil.' },
  { text: 'Desconexión C–C central: sintón carbanión Ph₂CH⁻ (difenilmetano) y sintón carbonilo electrofílico ClCOOCH₂CH₂NEt₂ (cloroformiato) en disolvente polar prótico prótico.' },
  { text: 'Desconexión C–N amínica: amida terminal Ph₂CH–COOCH₂CH₂Cl (cloroetil éster) y sintón dietilamiduro ⁻NEt₂ (dietilamina acuosa) en calentamiento a reflujo continuo.' }
    ],
    correctIndex: 0,
    explanation: 'Planteamos la desconexión C–O acilo-oxígeno como la ruta más limpia y convergente: activamos el ácido difenilacético como cloruro de acilo (Ph₂CH–COCl) y condensamos directamente con el 2-(dietilamino)etanol en piridina o trietilamina anhidra. La trampa conceptual clásica en la que cae el alumno (opción b) es intentar la desconexión alquilo-oxígeno: alquilar el carboxilato libre con una beta-cloroalquilamina (ClCH₂CH₂NEt₂) provoca la ciclación intramolecular instantánea de la amina a catión aziridinio, polimerizando el reactivo y arruinando el rendimiento.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-03',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Reordenamientos y Transposiciones',
    badge: 'Desconexión del Carbinol Terciario ',
    question: 'La benactizina contiene un resto de ácido bencílico (alfa-hidroxiácido diarílico). ¿Cuál es la ruta retrosintética estratégica para generar el fragmento dihidroxi/carboxílico central mediante transposición?',
    questionSmiles: 'CCN(CC)CCOC(=O)C(O)(c1ccccc1)c2ccccc2',
    options: [
  { text: 'Adición nucleófila de bromuro de fenilmagnesio sobre benzofenona seguida de carboxilación con dióxido de carbono gaseoso en condiciones de anhidro constante.' },
  { text: 'Desconexión a Benzoína (2-hidroxi-1,2-difeniletanona) mediante oxidación oxidativa con peryodato sódico e hidrólisis alcalina a reflujo continuado prolongado en etanol.' },
  { text: 'Desconexión a Benzaldehído mediante condensación benzoínica con cianuro potásico y posterior adición de formiato etílico en tetrahidrofurano seco anhidro.' },
  { text: 'Desconexión a Bencilo (1,2-difeniletano-1,2-diona), que experimenta transposición bencílica inducida por base (OH⁻) con migración 1,2 del grupo fenilo arílico.' }
    ],
    correctIndex: 3,
    explanation: 'En el laboratorio planteamos la desconexión del ácido bencílico hacia la 1,2-dicetona simétrica bencilo (Ph–CO–CO–Ph). En sentido sintético directo, al tratar el bencilo con KOH en medio hidroalcohólico caliente, el ion hidróxido ataca a uno de los carbonilos induciendo una transposición concertada 1,2 del anillo fenílico con migración aniónica al carbono vecino. Esta reacción rinde el alfa-hidroxiácido con rendimiento casi cuantitativo y total economía atómica, evitando el uso de organometálicos sensibles.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-04',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Dianiones y Reactivo de Ivanov',
    badge: 'Desconexión del Carbinol de Ciclope',
    question: 'En la retrosíntesis del fragmento ácido del ciclopentolato (ácido alfa-(1-hidroxiciclopentil)fenilacético), ¿cuál es la desconexión C–C que aprovecha la reactividad de un dianión organometálico?',
    questionSmiles: 'CN(C)CCOC(=O)C(c1ccccc1)C2(O)CCCC2',
    options: [
  { text: 'Desconexión C–C entre el carbinol y ciclopentanol mediante ataque nucleófilo del anión mandelato activado con dos equivalentes de butillitio seco en éter.' },
  { text: 'Desconexión C–C carbinólica rindiendo ciclopentanona como electrófilo y el reactivo de Ivanov (dianión del ácido fenilacético) como nucleófilo dador alfa.' },
  { text: 'Desconexión C–C mediante condensación aldólica cruzada entre ciclopentanocarbaldehído y bromuro de bencilmagnesio en éter etílico anhidro a cero grados.' },
  { text: 'Desconexión radicalaria con bromociclopentano y éster metílico del ácido fenilborónico catalizada por paladio tetrakis a temperatura ambiente constante.' }
    ],
    correctIndex: 1,
    explanation: 'Para sintetizar el resto alfa-hidroxiácido del ciclopentolato, seleccionamos la desconexión del carbinol terciario hacia ciclopentanona y el dianión del ácido fenilacético (reactivo de Ivanov, preparado tratando el ácido con dos equivalentes de reactivo de Grignard o LDA). La enorme ventaja que debemos destacar en el laboratorio es que la carga negativa sobre el carboxilato del reactivo de Ivanov bloquea la desprotonación alfa de la ciclopentanona, permitiendo una adición nucleófila quimioselectiva sin que la cetona ciclopentánica enolice ni experimente autocondensaciones aldólicas indeseadas.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-05',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Expansión de Heterociclos',
    badge: 'Retrosíntesis de Piperidolato: Expa',
    question: 'En la síntesis del piperidolato, el fragmento básico heterocíclico 1-etilpiperidin-3-ol se genera mediante una elegante desconexión heterocíclica. ¿Cuál es la secuencia retrosintética precursora?',
    questionSmiles: 'CCN1CCCC(C1)OC(=O)C(c2ccccc2)c3ccccc3',
    options: [
  { text: 'Desconexión a piridina libre y bromoetano, seguida de oxidación selectiva de la posición C3 con permanganato potásico en medio básico diluido acuoso.' },
  { text: 'Desconexión a alcohol furfurílico y dietilamina, con apertura de anillo por ozonólisis y ciclación intramolecular catalizada por ácido sulfúrico concentrado.' },
  { text: 'Desconexión a furfural y etilamina (vía N-furfuriletilamina), con expansión furánica a sal de 1-etil-3-hidroxipiridinio e hidrogenación catalítica total.' },
  { text: 'Desconexión a 3-bromopiridina y etanol, con acoplamiento de Ullmann a alta presión e hidrogenación catalítica sobre óxido de platino Adams activado seco.' }
    ],
    correctIndex: 2,
    explanation: 'Planteamos la desconexión del anillo de 1-etilpiperidin-3-ol hasta furfural. En el laboratorio, condensamos primero el furfural con etilamina y sometemos el intermediario a hidrogenación catalítica con catalizador de níquel Raney a presión y temperatura: bajo estas condiciones forzadas, el anillo de furano experimenta hidrogenólisis y una expansión molecular concertada que cicla al anillo piperidínico sustituido en posición 3. Desconectar a piridinas aromáticas (opción a) obligaría a una reducción heterogénea difícilmente controlable y poco selectiva.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-06',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Reacción de Mannich y Organometálicos',
    badge: 'Retrosíntesis de Trihexifenidilo: A',
    question: 'En el análisis retrosintético escalonado del trihexifenidilo, ¿cuál es la secuencia de desconexiones C–C que desglosa el fármaco en una aminocetona y tres reactivos de partida fundamentales?',
    questionSmiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CCCCC3',
    options: [
  { text: 'Desconexión C–C carbinólica con reactivo de Grignard ciclohexílico rindiendo una base de Mannich, y desconexión Mannich a acetofenona, formaldehído y piperidina.' },
  { text: 'Desconexión C–C carbinólica rindiendo fenil ciclohexil cetona y condensación nucleófila con el sintón carbaniónico derivado de 1-(2-cloroetil)piperidina comercial.' },
  { text: 'Desconexión C–C de tipo aldólica entre ciclohexil metil cetona y benzaldehído, seguida de adición conjugada 1,4 de piperidina pura a reflujo en etanol acuoso.' },
  { text: 'Desconexión C–O del carbinol rindiendo difenilcetona y alquilación de Friedel-Crafts con 3-(piperidin-1-il)propanol en presencia de tricloruro de aluminio anhidro.' }
    ],
    correctIndex: 0,
    explanation: 'Desconectamos el carbinol terciario del trihexifenidilo mediante adición nucleófila de bromuro de ciclohexilmagnesio sobre la beta-aminocetona precursora (3-piperidin-1-il-1-fenilpropan-1-ona). A su vez, esta aminocetona la desconectamos limpiamente en sus tres componentes elementales de la reacción de Mannich clásica: acetofenona (componente enolizable), formaldehído y piperidina en medio ácido acuoso. La trampa habitual (opción d) es intentar añadir ciclohexilamina sobre una enona, lo que daría adición conjugada 1,4 en lugar del carbinol terciario deseado.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-07',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Transformación de Grupo Funcional (FGI)',
    badge: 'Retrosíntesis de Isopropamida: Desc',
    question: 'En la desconexión retrosintética de la isopropamida (antisecretor gástrico cuaternario), ¿cuál es la serie lógica de transformaciones retrosintéticas (FGI y desconexiones C–N y C–C)?',
    questionSmiles: 'CC(C)[N+](C)(CCC(C(N)=O)(c1ccccc1)c2ccccc2)C(C)C',
    options: [
  { text: 'Desconexión C–C directa de difenilmetano con acrilamida, seguida de adición de Markovnikov de diisopropilamina y posterior cuaternización con sulfato de dimetilo.' },
  { text: 'Desconexión acilo-nitrógeno a cloruro de difenilacetilo y N,N-diisopropiletilendiamina, seguida de reducción de la función carbonilo y metilación alcalina final.' },
  { text: 'Desconexión aldólica entre benzofenona y 4-(diisopropilamino)butanonitrilo con posterior reducción catalítica y metilación por desplazamiento nucleófilo SN2 seco.' },
  { text: 'Desconexión C–N (desmetilación), FGI amida a nitrilo (4-amino-2,2-difenilbutanonitrilo) y desconexión C–C a 2,2-difenilacetonitrilo y 2-cloroetildiisopropilamina.' }
    ],
    correctIndex: 3,
    explanation: 'Planteamos la retrosíntesis de la isopropamida desconectando en primer lugar el catión amonio cuaternario mediante desmetilación (yoduro de metilo como último paso). A continuación, aplicamos una interconversión de grupo funcional (FGI) sobre la amida primaria, llevándola al nitrilo aromático 2,2-difenil-4-(diisopropilamino)butanonitrilo; esto nos permite generar previamente el centro cuaternario por doble alquilación consecutiva del fenilacetonitrilo con electrófilos halogenados en presencia de NaNH₂ o LDA.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-08',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Amidas y Derivados Piridínicos',
    badge: 'Retrosíntesis de Tropicamida: Desco',
    question: 'En la retrosíntesis de la tropicamida (midriático de acción corta), ¿cuál es la desconexión primaria más limpia que fragmenta el fármaco en sus dos sinteces principales comerciales?',
    questionSmiles: 'CCN(Cc1ccccc1)C(=O)C(CO)c2ccncc2',
    options: [
  { text: 'Desconexión C–C entre el carbono aromático piridínico y la etilamina, rindiendo ácido 3-hidroxi-2-fenilpropanoico y 4-cloropiridina en medio básico fuerte anhidro.' },
  { text: 'Desconexión C–N acilo-nitrógeno rindiendo ácido trópico (ácido 3-hidroxi-2-fenilpropanoico) y la amina secundaria N-etil-1-(piridin-4-il)metanamina como precursores.' },
  { text: 'Desconexión C–C aldólica rindiendo ácido fenilacético y 4-(aminometil)piridina mediante condensación en presencia de etóxido sódico a alta temperatura en autoclave sellado.' },
  { text: 'Desconexión C–N rindiendo nicotinamida y 2-feniletanol con desplazamiento bimolecular SN2 en dimetilformamida anhidra a reflujo durante veinticuatro horas seguidas.' }
    ],
    correctIndex: 1,
    explanation: 'Planteamos la desconexión directa del enlace amida acilo-nitrógeno de la tropicamida, obteniendo como equivalentes sintéticos el ácido trópico (ácido 3-hidroxi-2-fenilpropanoico) y la N-etil-N-(piridin-4-ilmetil)amina. En la síntesis directa, debemos proteger previamente el hidroxilo primario del ácido trópico (o emplear su acetil derivado) para evitar la competencia nucleófila del alcohol frente a la amina secundaria al acoplar con agentes de condensación como DCC o cloruro de tionilo.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-09',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Apertura Regioselectiva de Oxiranos',
    badge: 'Retrosíntesis de Metacolina: Descon',
    question: 'En la desconexión retrosintética de la metacolina, ¿cuál es la ruta convergente óptima para acceder al aminoalcohol cuaternario intermedio evitando regioselectividades no deseadas?',
    questionSmiles: 'CC(=O)OC(C)C[N+](C)(C)C',
    options: [
  { text: 'Desconexión del éster de acetilo a 1-(trimetilamonio)propan-2-ol, cuya retrosíntesis implica la apertura nucleófila regioselectiva de óxido de propileno con trimetilamina.' },
  { text: 'Desconexión del éster a colina cuaternaria sin sustituir, seguida de metilación del carbono beta mediante adición de yoduro de metilo en tetrahidrofurano anhidro a ebullición.' },
  { text: 'Desconexión C–C rindiendo 3-(trimetilamonio)propan-1-ol y condensación con anhídrido acético en diclorometano seco con piridina como catalizador nucleófilo básico suave.' },
  { text: 'Desconexión C–N rindiendo acetato de 1-cloropropan-2-ilo y sustitución con amoniaco gaseoso en medio alcohólico diluido para generar la amina primaria correspondiente libre.' }
    ],
    correctIndex: 0,
    explanation: 'Desconectamos el éster de acetato para revelar el aminoalcohol quiróforo 1-(trimetilamonio)propan-2-ol. Retrosintéticamente, este aminoalcohol beta-sustituido proviene de la apertura regioespecífica de óxido de propileno mediante ataque nucleófilo directo de trimetilamina anhidra. Por regla de apertura de epóxidos en medio básico/neutro, la trimetilamina ataca quimioselectivamente al carbono menos impedido (C-1), dejando el grupo hidroxilo libre en C-2 listo para la acetilación final con cloruro de acetilo.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-10',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Carbamoilación y Cloroformiatos',
    badge: 'Retrosíntesis de Carbacol: Desconex',
    question: 'En el análisis retrosintético del carbacol (éster carbámico de colina), ¿cuál es la estrategia industrial clásica para introducir el grupo carbamoilo sin recurrir a reactivos inestables?',
    questionSmiles: 'NC(=O)OCC[N+](C)(C)C',
    options: [
  { text: 'Desconexión directa del carbamato con colina y cianato potásico en medio ácido mineral concentrado a reflujo constante durante cuarenta y ocho horas en reactor presurizado.' },
  { text: 'Desconexión C–O carbámica rindiendo 2-cloroetanol e isocianato de metilo, seguida de desplazamiento bimolecular SN2 con trimetilamina en disolvente polar aprótico anhidro.' },
  { text: 'Desconexión del carbamato a carbamato de 2-cloroetilo (desde 2-cloroetanol, fosgeno y amoníaco gas) y posterior cuaternización nucleófila bimolecular SN2 con trimetilamina.' },
  { text: 'Desconexión a urea y óxido de etileno en presencia de cantidades catalíticas de ácido sulfúrico concentrado, seguida de metilación exhaustiva con clorometano gaseoso seco.' }
    ],
    correctIndex: 2,
    explanation: 'Planteamos la desconexión del grupo carbamato del carbacol hacia cloruro de cloroformilo o fosgeno (COCl₂). En la síntesis directa, hacemos reaccionar el 2-cloroetanol con fosgeno para generar el éster de cloroformiato correspondiente, el cual tratamos con amoníaco gas para obtener el carbamato de 2-cloroetilo; finalmente, una sustitución nucleófila SN2 con trimetilamina acuosa a presión cuaterniza el nitrógeno rindiendo el cloruro de carbacol con pureza analítica.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-11',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Sistemas Bicíclicos y Aminopropanonas',
    badge: 'Retrosíntesis de Biperideno: Fragme',
    question: 'El biperideno incorpora un sistema bicíclico rígido de norbornenilo unido a un carbinol terciario. ¿Cuál es la desconexión retrosintética convergente del enlace C–C carbinólico?',
    questionSmiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CC4C=CC3C4',
    options: [
  { text: 'Cicloadición de Diels-Alder simultánea entre ciclopentadieno y 1-fenil-3-(piperidin-1-il)prop-2-en-1-ona, seguida de reducción con borohidruro de sodio en metanol frío.' },
  { text: 'Desconexión C–C entre norborneno y difenilcetona en presencia de catalizadores de rutenio para acoplamiento cruzado de enlaces C–H aromáticos a temperatura elevada.' },
  { text: 'Desconexión C–O rindiendo biciclo[2.2.1]hept-5-eno-2-carboxilato de fenilo y posterior sustitución bimolecular con la sal lítica de piperidina en tetrahidrofurano anhidro.' },
  { text: 'Desconexión C–C a 1-fenil-3-(piperidin-1-il)propan-1-ona (base de Mannich) y haluro de biciclo[2.2.1]hept-5-en-2-ilmagnesio como reactivo organometálico nucleófilo.' }
    ],
    correctIndex: 3,
    explanation: 'Desconectamos el carbinol terciario del biperideno hacia la beta-aminopropanona precursora (1-fenil-3-piperidinopropan-1-ona) y un nucleófilo organometálico portador del resto bicíclico: el reactivo de Grignard derivado del 5-bromo-2-norborneno. La gran ventaja sintética de este diseño es que el enlace carbono-carbono entre el norbornenilo y el carbinol se construye en una sola etapa con alta estereoselectividad endo/exo controlada por el impedimento estérico del puente metilénico.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-12',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Ésteres Acetilénicos y Reacción de Mannich',
    badge: 'Retrosíntesis de Oxibutinina: Desco',
    question: 'En la desconexión retrosintética de la oxibutinina (antiespasmódico vesical), ¿cuál es la fragmentación convergente del éster y la subsiguiente retrosíntesis del fragmento acetilénico?',
    questionSmiles: 'CCN(CC)CC#CCOC(=O)C(O)(c1ccccc1)C2CCCCC2',
    options: [
  { text: 'Desconexión a ácido difenilglicólico y 4-(dietilamino)butan-1-ol saturado, preparado mediante hidrogenación selectiva de diacetileno con catalizador de Lindlar húmedo a presión.' },
  { text: 'Desconexión del éster a ácido 2-ciclohexil-2-hidroxi-2-fenilacético y 4-(dietilamino)but-2-in-1-ol, este último accesible por reacción de Mannich en alcohol propargílico.' },
  { text: 'Desconexión a ácido mandélico y 1-(dietilamino)but-3-en-2-ol, sintetizado a partir de cloruro de alilo y dietilamina mediante sustitución nucleófila bimolecular SN2.' },
  { text: 'Desconexión acilo-oxígeno rindiendo ácido ciclohexanocarboxílico y but-2-ino-1,4-diol, seguido de aminación catalítica homogénea con sales de cobre en acetonitrilo seco.' }
    ],
    correctIndex: 1,
    explanation: 'Planteamos la desconexión convergente del éster de oxibutinina en el enlace acilo-oxígeno, aislando el ácido alfa-ciclohexil-alfa-hidroxifenilacético y el alcohol propargílico 4-(dietilamino)but-2-in-1-ol. Este aminoalcohol acetilénico se sintetiza elegantemente mediante una reacción de Mannich de tres componentes empleando alcohol propargílico, paraformaldehído y dietilamina en presencia de cloruro de cobre(I) como catalizador.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-13',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Ésteres Bicicloalifáticos Lipófilos',
    badge: 'Retrosíntesis de Diciclomina: Desco',
    question: 'En el análisis retrosintético de la diciclomina (antiespasmódico no atropínico), ¿qué desconexión éster C–O acilo-oxígeno define los precursores sintéticos alifáticos idóneos?',
    questionSmiles: 'CCN(CC)CCOC(=O)C1(CCCCC1)C2CCCCC2',
    options: [
  { text: 'Desconexión a ácido [1,1\'-biciclohexil]-1-carboxílico (o su cloruro de acilo) y 2-(dietilamino)etanol, obtenidos por hidrogenación total de precursores aromáticos fenilados.' },
  { text: 'Desconexión a ácido difenilacético y 2-(diisopropilamino)etanol en presencia de ácido sulfúrico acuoso a reflujo constante durante setenta y dos horas en matraz esférico sellado.' },
  { text: 'Desconexión a cloruro de ciclohexanocarbonilo y 2-(dietilamino)etilamina en medio alcalino bifásico de Schotten-Baumann generando un enlace amida térmicamente insensible.' },
  { text: 'Desconexión a diciclohexilmetano y cloroformiato de dietilaminoetilo en presencia de tricloruro de aluminio anhidro mediante alquilación directa a ciento ochenta grados.' }
    ],
    correctIndex: 0,
    explanation: 'Planteamos la desconexión del éster de diciclomina hacia el ácido [1,1\'-bi(ciclohexil)]-1-carboxílico y el 2-(dietilamino)etanol. El fragmento ácido se sintetiza mediante acoplamiento organometálico y carboxilación, o por reducción catalítica exhaustiva con PtO₂ a alta presión del ácido 1-fenilciclohexanocarboxílico, saturando totalmente los dos anillos carbocíclicos antes de formar el cloruro de acilo y esterificar.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-14',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Ésteres Tricíclicos Heterocíclicos',
    badge: 'Retrosíntesis de Propantelina: Desc',
    question: 'En el diseño retrosintético de la propantelina (antagonista muscarínico tricíclico), ¿cuál es la ruta secuencial de desconexiones que minimiza problemas de reactividad nucleófila?',
    questionSmiles: 'CC(C)[N+](C)(CCOC(=O)C1c2ccccc2Oc3ccccc13)C(C)C',
    options: [
  { text: 'Desconexión de xantona aromática con cloruro de 2-(dimetilamino)etilo catalizada por sodio metálico, seguida de adición nucleófila de yodometano en medio polar alcalino.' },
  { text: 'Desconexión a ácido difenilacético y 2-(diisopropilamino)etanol con posterior acoplamiento oxidativo intramolecular catalizado por paladio en atmósfera de monóxido de carbono.' },
  { text: 'Desconexión C–N (desmetilación) a éster terciario, y desconexión éster acilo-oxígeno a ácido xanteno-9-carboxílico (o cloruro) con 2-(diisopropilamino)etanol comercial.' },
  { text: 'Desconexión a fluoreno-9-carboxilato de metilo y aminoalcohol terciario, seguida de transesterificación alcalina y cuaternización final con sulfato de dimetilo anhidro.' }
    ],
    correctIndex: 2,
    explanation: 'Desconectamos la propantelina desglosando la cuaternización del nitrógeno (adición de bromuro de metilo como paso final) y desconectando el éster acilo-oxígeno hacia el ácido xanteno-9-carboxílico y el 2-(diisopropilamino)etanol. El ácido tricíclico se prepara a partir de xantidrol por carbonilación o tratamiento con cianuro e hidrólisis alcalina; la esterificación se efectúa vía cloruro de acilo en piridina seca para evitar la apertura del anillo de pirona.',
    difficulty: 'Medio'
  },
  {
    id: 'ret-15',
    topicId: 'tema-01',
    block: 'Bloque Retrosíntesis · Carbamoilación de Aminofenoles',
    badge: 'Retrosíntesis de Neostigmina: Desco',
    question: 'En la desconexión retrosintética de la neostigmina (inhibidor reversible de AChE), ¿cuál es la secuencia secuencial de reconexiones que define la selectividad sobre el nitrógeno?',
    questionSmiles: 'CN(C)C(=O)Oc1cccc(c1)[N+](C)(C)C',
    options: [
  { text: 'Desconexión a 4-(dimetilamino)fenol y cloruro de dietilcarbamoilo, seguida de cuaternización selectiva del nitrógeno anilínico para evitar la hidrólisis del éster carbamato.' },
  { text: 'Desconexión C–N (desmetilación) del amonio cuaternario y desconexión éster carbamato a 3-(dimetilamino)fenol y cloruro de N,N-dimetilcarbamoilo como reactivos de partida.' },
  { text: 'Desconexión a resorcinol y dimetilamina con introducción de fosgeno gaseoso a alta temperatura, seguida de alquilación con cloruro de metilo en medio alcalino acuoso.' },
  { text: 'Desconexión a 3-metoxifenol y dimetilcarbamato de metilo mediante transesterificación ácida prolongada, con posterior cuaternización directa con sulfato de dimetilo seco.' }
    ],
    correctIndex: 1,
    explanation: 'Planteamos la desconexión del carbamato de la neostigmina hacia 3-(dimetilamino)fenol y cloruro de dimetilcarbamoilo (Me₂N–COCl). En el laboratorio, la reacción de carbamilación se conduce en piridina anhidra a temperatura controlada; el fenolato ataca selectivamente al carbonilo del cloruro de carbamoilo. Posteriormente, la cuaternización regiespecífica del nitrógeno amínico terciario se logra tratando con sulfato de dimetilo o bromuro de metilo, obteniendo la sal cuaternaria sin alterar el éster carbámico.',
    difficulty: 'Medio'
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
        id: 't01-b-01',
        topicId: 'tema-01',
        block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
        badge: 'Diferenciación Estructural de Recep',
        question: '¿Qué característica estructural y funcional fundamental distingue a los receptores muscarínicos de los receptores nicotínicos en la sinapsis colinérgica?',
        questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
        options: [
      { text: 'Los receptores muscarínicos son dímeros citoplasmáticos con actividad tirosina cinasa y los nicotínicos son canales activados por voltaje.' },
      { text: 'Los receptores nicotínicos son receptores acoplados a proteínas G triméricas y los muscarínicos operan como canales de calcio intracelular.' },
      { text: 'Ambos tipos de receptores presentan una estructura idéntica de siete dominios transmembrana diferenciándose sólo por su velocidad de apertura.' },
      { text: 'Los receptores muscarínicos son GPCRs de siete hélices transmembrana y los nicotínicos son canales iónicos pentaméricos activados por ligando.' }
        ],
        correctIndex: 3,
        explanation: 'En la cátedra diferenciamos claramente las dos familias colinérgicas: los receptores muscarínicos son GPCRs metabotrópicos monoméricos con siete segmentos transmembrana acoplados a proteínas G heterodiméricas, mientras que los nicotínicos son canales iónicos ionotrópicos pentaméricos formados por cinco subunidades homoméricas o heteroméricas dispuestas en torno a un poro acuoso central. La opción a es una trampa clásica de examen que invierte la naturaleza metabotrópica e ionotrópica de ambas familias proteicas.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-02',
        topicId: 'tema-01',
        block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
        badge: 'Geometría Conformacional Gauche de ',
        question: 'En disolución acuosa y en el estado cristalino, la acetilcolina adopta preferentemente una conformación respecto al enlace central O–C–C–N⁺. ¿Cuál es y cuál es su origen?',
        questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
        options: [
      { text: 'La conformación antiperiplanar con un ángulo de torsión de 180° que aleja al máximo las densidades de carga de ambos heteroátomos polares.' },
      { text: 'La conformación sinclinal (gauche) con ángulo diedro de unos 60° que sitúa los centros farmacofóricos a la distancia óptima de interacción.' },
      { text: 'La conformación eclipsada con ángulo diedro de 0° estabilizada por enlace por puente de hidrógeno intramolecular entre los metilos catiónicos.' },
      { text: 'Una mezcla equimolecular desordenada sin preferencia conformacional debido a la barrera de rotación nula en torno al enlace carbono-carbono.' }
        ],
        correctIndex: 1,
        explanation: 'Mediante resonancia magnética nuclear (1H RMN) y cristalografía determinamos que la acetilcolina en disolución y en el sitio activo muscarínico adopta prioritariamente la conformación sinclinal (gauche), con un ángulo diedro O–C–C–N⁺ de ~60°. Esta disposición espacial sitúa el catión trimetilamonio a ~3.2 Å del oxígeno del éster, encajando a la perfección en la distancia entre el residuo de aspartato y los subsitios aromáticos. El distractor a confunde la estabilidad antiperiplanar en fase gas con la conformación bioactiva real impuesta por el receptor.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-03',
        topicId: 'tema-01',
        block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
        badge: 'Etapa Limitante Presináptica: Recap',
        question: 'En el ciclo de biosíntesis y degradación de la acetilcolina en la sinapsis colinérgica, ¿cuál es el paso limitante que modula la velocidad de síntesis del neurotransmisor?',
        questionSmiles: 'OCC[N+](C)(C)C',
        options: [
      { text: 'La recaptación de colina mediante el transportador de alta afinidad CHT1 dependiente de sodio, diana que resulta inhibida por hemicolinio-3.' },
      { text: 'La fosforilación mitocondrial del acetil-CoA catalizada por fosfotransferasas dependientes de magnesio, estimulada por toxina botulínica.' },
      { text: 'La condensación citoplasmática mediada por colina acetiltransferasa, la cual es bloqueada competitivamente por concentraciones de nicotina.' },
      { text: 'La entrada pasiva de acetato libre a través de la bicapa lipídica presináptica, proceso acelerado por agentes bloqueantes de los canales de calcio.' }
        ],
        correctIndex: 0,
        explanation: 'Al analizar el ciclo presináptico de la acetilcolina, identificamos la recaptación de colina mediante el transportador CHT1 de alta afinidad (simporte dependiente de Na⁺ y Cl⁻) como la etapa limitante de toda la biosíntesis. Este transportador es el cuello de botella cinético que regula la disponibilidad del sustrato intracelular para la colina acetiltransferasa (ChAT). La opción b es un error conceptual común: la enzima ChAT trabaja a velocidad saturante y no constituye el factor limitante.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-04',
        topicId: 'tema-01',
        block: 'Bloque 2 · Agonistas Directos y SAR',
        badge: 'Selectividad Receptor: Alfa-Metilco',
        question: 'La introducción de un sustituyente metilo en la cadena etilénica de la acetilcolina modifica drásticamente la selectividad por receptores. Indique la pauta correcta:',
        questionSmiles: 'CC(=O)OCC(C)[N+](C)(C)C',
        options: [
      { text: 'La alfa-metilcolina es un agonista selectivo muscarínico y la beta-metilcolina carece por completo de actividad sobre cualquier receptor.' },
      { text: 'Ambos derivados pierden la actividad agonista y actúan como antagonistas competitivos debido al excesivo volumen estérico de los metilos.' },
      { text: 'La alfa-metilcolina presenta mayor afinidad por receptores nicotínicos mientras que la beta-metilcolina muestra selectividad muscarínica.' },
      { text: 'Ambos análogos muestran idéntica selectividad muscarínica porque el receptor colinérgico no distingue la posición relativa del sustituyente.' }
        ],
        correctIndex: 2,
        explanation: 'En el desarrollo de derivados metilados de colina, demostramos la rigurosa selectividad estérica: la sustitución con metilo en posición alfa (alfa-metilcolina) preserva la actividad agonista nicotínica pero anula prácticamente la muscarínica, mientras que la metilación en beta (metacolina) induce una selectividad muscarínica casi exclusiva con resistencia añadida frente a la AChE. La trampa del distractor a invierte la posición de los sustituyentes alfa y beta en el puente etilénico.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-05',
        topicId: 'tema-01',
        block: 'Bloque 2 · Agonistas Directos y SAR',
        badge: 'Betanecol: Resistencia Combinada y ',
        question: 'El betanecol es un agonista colinérgico de acción prolongada empleado en la retención urinaria posoperatoria. ¿Qué dos modificaciones moleculares sustentan su perfil?',
        questionSmiles: 'NC(=O)OC(C)C[N+](C)(C)C',
        options: [
      { text: 'Un anillo bencénico rígido y un grupo sulfonato que proporcionan afinidad por canales iónicos y protección química frente a esterasas.' },
      { text: 'Un enlace éter inalterable y una amina terciaria no protonable que impiden el ataque de la triada catalítica de la acetilcolinesterasa sináptica.' },
      { text: 'Un grupo éster aromático y dos centros cuaternarios que inducen resistencia enzimática pero confieren selectividad hacia nicotínicos.' },
      { text: 'Un grupo carbamato resistente por resonancia junto a un grupo metilo en posición beta que confiere impedimento estérico y selectividad M.' }
        ],
        correctIndex: 3,
        explanation: 'Diseñamos el betanecol combinando dos modificaciones protectoras sinérgicas: el grupo carbamato le otorga resistencia electrónica frente a la AChE mediante deslocalización por resonancia (+M), mientras que el grupo metilo en posición beta introduce impedimento estérico frente a la catálisis enzimática y anula toda afinidad nicotínica, convirtiéndolo en un agonista muscarínico puro de acción selectiva sobre músculo liso gastrointestinal y urinario. La opción b induce a error al sugerir una afinidad residual por la placa motora.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-06',
        topicId: 'tema-01',
        block: 'Bloque 2 · Agonistas Directos y SAR',
        badge: 'Cevimelina: Agonista Muscarínico Es',
        question: 'La cevimelina es un agonista muscarínico prescrito en el síndrome de Sjögren para la xerostomía. ¿Cuál es su elemento estructural distintivo frente a los ésteres clásicos?',
        questionSmiles: 'CC1OC2(CN3CCC2CC3)SC1',
        options: [
      { text: 'Posee un grupo éster fosfato unido a un anillo de piperidina que simula fielmente la densidad de carga del neurotransmisor acetilcolina.' },
      { text: 'Presenta un sistema bicíclico de espirooxatiolano quinuclidina que carece de enlace éster, siendo refractaria a esterasas plasmáticas.' },
      { text: 'Contiene un núcleo de carbamato aromático cuaternario que libera fluoruro en el bolsillo activo bloqueando la degradación enzimática.' },
      { text: 'Incorpora una cadena alquílica larga de doce carbonos que ancla covalentemente la molécula a la superficie externa de la membrana celular.' }
        ],
        correctIndex: 1,
        explanation: 'Al estudiar agonistas no clásicos para el síndrome de Sjögren, analizamos la cevimelina: su núcleo quinuclidinil-tiolano espirocíclico sustituye la cabeza de trimetilamonio acíclica por una amina terciaria bicíclica rígida que estimula selectivamente los receptores M1 y M3 de las glándulas salivales y lagrimales con mínima afectación cardiovascular (M2). El distractor a clasifica erróneamente a la cevimelina como inhibidor de la acetilcolinesterasa.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-07',
        topicId: 'tema-01',
        block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
        badge: 'Mecanismo y Cinética de Carbamoilac',
        question: 'Al inhibir la acetilcolinesterasa mediante derivados de carbamato como la neostigmina, ¿cuál es el fundamento mecanístico de su carácter pseudoirreversible?',
        questionSmiles: 'CN(C)C(=O)Oc1cccc(c1)[N+](C)(C)C',
        options: [
      { text: 'El fármaco se coordina de forma irreversible con el triptófano del subsitio aniónico bloqueando la salida de los reactivos polares.' },
      { text: 'La molécula se oxida en el fondo de la cavidad catalítica generando un precipitado insoluble que bloquea el acceso a la serina.' },
      { text: 'La enzima carbamoilada en Ser203 sufre una hidrólisis sumamente lenta (orden de horas) frente a la enzima acetilada rápida.' },
      { text: 'El grupo fenólico saliente establece un enlace covalente cruzado irreversible entre la histidina y el glutamato de la tríada.' }
        ],
        correctIndex: 2,
        explanation: 'En el mecanismo de inhibición por carbamatos (neostigmina, piridostigmina), la Ser203 ataca al carbonilo carbámico formando una carbamoil-enzima covalente. A diferencia del intermediario acetilado de la ACh (que se hidroliza en microsegundos), la descarbamoilación de la enzima es sumamente lenta debido a la estabilización por resonancia del carbamato, con una semivida de regeneración de varias horas, actuando como inhibidores pseudoirreversibles. La opción a confunde este proceso con la fosforilación irreversible de los organofosforados.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-08',
        topicId: 'tema-01',
        block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
        badge: 'Modulación Alostérica Positiva (PAM',
        question: 'La galantamina ofrece una acción terapéutica particular en el tratamiento de la enfermedad de Alzheimer gracias a un mecanismo dual. ¿En qué consiste?',
        questionSmiles: 'CN1CC[C@@]23c4cc5c(cc4O[C@@H]2[C@@H](O)C=C[C@H]3C1)OCO5',
        options: [
      { text: 'Inhibe de forma competitiva reversible la AChE y actúa a la vez como modulador alostérico positivo (PAM) de receptores nicotínicos.' },
      { text: 'Actúa como inhibidor covalente irreversible de la AChE y como antagonista competitivo selectivo de los receptores muscarínicos M1.' },
      { text: 'Bloquea la captación neuronal de colina en la terminal presináptica y estimula la recaptación vesicular de acetato en el citosol.' },
      { text: 'Induce la degradación selectiva de la butirilcolinesterasa plasmática y activa los canales de calcio dependientes de voltaje en axones.' }
        ],
        correctIndex: 0,
        explanation: 'La galantamina posee un doble mecanismo de acción terapéutico en la enfermedad de Alzheimer: actúa como inhibidor competitivo reversible de la AChE y, simultáneamente, se une como modulador alostérico positivo (PAM) a los receptores colinérgicos nicotínicos neuronales (subtipos alfa4-beta2 y alfa7), potenciando la neurotransmisión colinérgica endógena. El distractor b propone falsamente un antagonismo competitivo nicotínico, lo que empeoraría el cuadro cognitivo.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-09',
        topicId: 'tema-01',
        block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
        badge: 'Fenómeno de Envejecimiento (Aging) ',
        question: 'Tras la fosforilación de la acetilcolinesterasa por ciertos organofosforados como el somán o el sarín, la enzima se vuelve irreversiblemente refractaria. ¿A qué se debe?',
        questionSmiles: 'CC(C)OP(=O)(C)F',
        options: [
      { text: 'La protonación reversible de la histidina catalítica que desplaza el catión magnesio necesario para la catálisis enzimática fisiológica.' },
      { text: 'La migración intramolecular del grupo fosforilo hacia el residuo de triptófano vecino en la entrada de la garganta hidrofóbica activa.' },
      { text: 'La racemización del centro fosforado con pérdida de la afinidad por reactivadores derivados de oximas y desnaturalización de la proteína.' },
      { text: 'La desaquilación no enzimática del aducto enzima-fosforilado que genera una carga negativa neta que repele el ataque de la pralidoxima.' }
        ],
        correctIndex: 3,
        explanation: 'El fenómeno de envejecimiento (aging) de la AChE fosforilada por organofosforados consiste en la ruptura no enzimática de uno de los enlaces éster C–O del resto organofosforado con pérdida de un grupo alquilo (p. ej. isopropilo en sarín), dejando un átomo de oxígeno cargado negativamente sobre el fósforo. Esta carga negativa aniónica desactiva el carácter electrófilo del fósforo e impide por completo el ataque de reactivadores como la pralidoxima. La opción a es errónea: el aging no es la hidrólisis espontánea del enlace fosfoserina.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-10',
        topicId: 'tema-01',
        block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
        badge: 'Atropina como Mezcla Racémica Natur',
        question: 'La atropina utilizada en clínica se presenta como una mezcla racémica (±), a pesar de proceder de la planta Atropa belladonna. ¿Cuál es el origen químico de este hecho?',
        questionSmiles: 'CN1C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3',
        options: [
      { text: 'El vegetal biosintetiza exclusivamente el racemato mediante una ruta enzimática que carece por completo de estereoselectividad óptica.' },
      { text: 'Se aísla a partir de la (-)-hiosciamina natural, la cual sufre una racemización espontánea en el carbono alfa del éster durante el proceso.' },
      { text: 'Procede de una ruta semisintética donde el acoplamiento entre tropanol y ácido trópico transcurre con pérdida total de los centros quirales.' },
      { text: 'Ambos enantiómeros poseen idéntica afinidad por el receptor muscarínico debido a que el centro quiral no participa en el anclaje a la diana.' }
        ],
        correctIndex: 1,
        explanation: 'Explicamos a los alumnos que la atropina es la mezcla racémica (±)-hiosciamina. En la planta Atropa belladonna se biosintetiza exclusivamente el enantiómero levógiro (-)-(S)-hiosciamina, pero durante el proceso de extracción en medio alcalino el centro quiral alfa al carbonilo se enoliza con extrema facilidad, racemizando a (±)-atropina. El enantiómero (-) retiene casi toda la actividad antimuscarínica. El distractor a confunde la racemización química de extracción con una síntesis biológica racémica.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-11',
        topicId: 'tema-01',
        block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
        badge: 'Butilescopolamina: Confinamiento Pe',
        question: 'El bromuro de butilescopolamina es un fármaco ampliamente prescrito en cólicos gastrointestinales y renales. ¿Cuál es la base de su ausencia de efectos sedantes en el SNC?',
        questionSmiles: 'CCCC[N+]1(C)C2CC(C1C3OC23)OC(=O)C(CO)c4ccccc4',
        options: [
      { text: 'La supresión del puente epóxido en el anillo de tropano que acelera la excreción renal reduciendo de manera drástica la toxicidad sistémica.' },
      { text: 'La escisión del anillo bicíclico para convertirlo en una cadena alifática flexible que incrementa la selectividad espasmolítica digestiva.' },
      { text: 'La introducción de un resto butilo cuaternario que confiere carga formal permanente impidiendo atravesar la barrera hematoencefálica.' },
      { text: 'La sustitución del éster trópico por una función amida alifática primaria que confiere resistencia frente a esterasas de la luz intestinal.' }
        ],
        correctIndex: 2,
        explanation: 'El bromuro de butilescopolamina es el ejemplo paradigmático de diseño de antiespasmódico por cuaternización: la incorporación del grupo n-butilo sobre el nitrógeno del tropano genera una sal cuaternaria permanente con LogP extremadamente bajo. Esto anula su absorción sistémica y su paso a través de la barrera hematoencefálica, limitando su acción al bloqueo local de receptores M3 en el plexo mientérico intestinal sin efectos centrales. La opción a es falsa: la butilescopolamina no atraviesa la BHE.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-12',
        topicId: 'tema-01',
        block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
        badge: 'Biperideno vs Tropicamida: Diferenc',
        question: 'Al comparar las estructuras y aplicaciones del biperideno y la tropicamida, identifique la correlación molecular y clínica acertada:',
        questionSmiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CC4C=CC3C4',
        options: [
      { text: 'El biperideno es un aminoalcohol terciario lipófilo para Parkinson central; la tropicamida es una amida terciaria para midriasis diagnóstica.' },
      { text: 'El biperideno es un catión amonio cuaternario para broncodilatación en EPOC; la tropicamida es un carbinol bicíclico para tratamiento de úlcera.' },
      { text: 'La tropicamida posee una carga formal permanente positiva que confiere cicloplejía prolongada; el biperideno es un éster de acción ultracorta.' },
      { text: 'Ambos son amonios cuaternarios hidrófilos que se administran conjuntamente por vía oftálmica para tratar el glaucoma de ángulo cerrado.' }
        ],
        correctIndex: 0,
        explanation: 'Comparamos el perfil de biperideno y tropicamida: el biperideno es una amina terciaria lipófila que cruza con rapidez la BHE para bloquear receptores M1 estriatales en el Parkinson, mientras que la tropicamida es una amida/amina diseñada para uso oftálmico tópico como midriático y ciclopléjico de acción ultracorta (recuperación en 4-6 h). La opción b invierte la farmacocinética de ambos agentes terapéuticos.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-13',
        topicId: 'tema-01',
        block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
        badge: 'Mecanismo de Apertura y Desensibili',
        question: 'A nivel molecular, ¿qué cambio conformacional desencadena la unión de dos moléculas de acetilcolina en el receptor nicotínico muscular (nAChR)?',
        questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
        options: [
      { text: 'Fosforilación del bucle citoplasmático por cinasas celulares induciendo la escisión proteolítica irreversible del canal iónico.' },
      { text: 'Disociación de las subunidades alfa en monómeros citoplasmáticos solubles debido a cambios bruscos del potencial de membrana.' },
      { text: 'Oligomerización de varios pentámeros en la membrana plasmática formando un megaporos no selectivo permeable a proteínas globulares.' },
      { text: 'Rotación de las hélices transmembrana M2 desplazando el anillo de leucinas de la compuerta para permitir el influjo catiónico.' }
        ],
        correctIndex: 3,
        explanation: 'Al activarse el receptor nicotínico muscular o neuronal, la unión concertada de dos moléculas de acetilcolina en las interfases alfa-gamma y alfa-delta provoca una rotación de las hélices transmembrana M2, abriendo el canal iónico central y permitiendo la entrada rápida de Na⁺ (y salida de K⁺) que despolariza la membrana. La ocupación prolongada por agonistas conduce a una desensibilización conformacional reversible del canal. La opción a comete el error de afirmar que el canal se abre con una sola molécula de ligando.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-14',
        topicId: 'tema-01',
        block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
        badge: 'Síntesis Orgánica Directa de Trihex',
        question: 'En la ruta sintética directa del trihexifenidilo, ¿qué dos etapas consecutivas permiten construir el esqueleto del aminoalcohol carbinólico?',
        questionSmiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CCCCC3',
        options: [
      { text: 'Condensación de Claisen de fenilacetato con ciclohexanona en medio básico y posterior aminación reductora catalítica con piperidina.' },
      { text: 'Acilación de Friedel-Crafts de benceno con cloruro de acriloilo sobre AlCl₃ y posterior adición organometálica de tipo Reformatsky.' },
      { text: 'Reacción de Mannich de acetofenona, formaldehído y piperidina en medio ácido seguida de adición con bromuro de ciclohexilmagnesio.' },
      { text: 'Acoplamiento de Heck entre bromobenceno y 1-alilpiperidina catalizado por paladio seguido de epoxidación con perácidos aromáticos.' }
        ],
        correctIndex: 2,
        explanation: 'Planteamos la síntesis directa de trihexifenidilo mediante una secuencia en dos pasos clave: en primer lugar, ejecutamos una reacción de Mannich de tres componentes condensando acetofenona, formaldehído acuoso y piperidina en medio ácido para obtener la beta-aminocetona precursora; a continuación, realizamos una adición de Grignard con bromuro de ciclohexilmagnesio en éter anhidro sobre el carbonilo cetónico para construir el carbinol terciario con alto rendimiento. La opción a es la trampa de examen clásica: una adición aldólica directa no introduciría el grupo amino piperidínico.',
        difficulty: 'Medio'
      },
      {
        id: 't01-b-15',
        topicId: 'tema-01',
        block: 'Bloque 5 · Mecanismos de Acción y Síntesis Directa',
        badge: 'Síntesis Orgánica Directa de Adifen',
        question: 'En la preparación sintética directa del antiespasmódico adifenina, ¿qué reactivos y condiciones conducen eficazmente al éster aminoalcohólico?',
        questionSmiles: 'CCN(CC)CCOC(=O)C(c1ccccc1)c2ccccc2',
        options: [
      { text: 'Condensación entre difenilcetena y dietilcloroamina en presencia de etóxido sódico en medio alcohólico anhidro a temperatura ambiente.' },
      { text: 'Reacción entre cloruro de difenilacetilo y 2-(dietilamino)etanol en disolvente aprótico anhidro en presencia de una base aceptora.' },
      { text: 'Acoplamiento radicalario entre ácido difenilacético y dietilamina libre promovido por peróxidos orgánicos a temperaturas elevadas.' },
      { text: 'Alquilación reductora de difenilmetano con carbonato de dietilaminoetilo catalizada por ácido sulfúrico concentrado a reflujo suave.' }
        ],
        correctIndex: 1,
        explanation: 'Para la preparación de adifenina en el laboratorio, seleccionamos la acilación directa del 2-(dietilamino)etanol empleando cloruro de difenilacetilo en disolvente aprótico anhidro (diclorometano o tolueno) en presencia de una base no nucleofílica como trietilamina o piridina como captador del HCl liberado. Esta vía acilo-oxígeno evita reacciones colaterales de cuaternización intramolecular. El distractor a confunde la ruta acilo con una sustitución nucleófila SN2 sobre haluros de alquilo que polimerizaría la diamina.',
        difficulty: 'Medio'
      }
    ],
        correctIndex: 2,
        explanation: 'Debemos destacar que el catión amonio cuaternario tiene sus cuatro valencias saturadas por enlaces covalentes C–N (tres metilos y el puente etilénico). Al carecer por completo de par electrónico solitario desprotonable, mantiene de forma permanente e invariable su carga formal positiva independientemente del pH fisiológico. En cuanto a los distractores, la trampa conceptual típica (opción a) confunde el efecto inductivo: los alquilos son dadores (+I), no atractores; la opción b es inviable porque el nitrógeno cuaternario no posee enlaces N–H para donar hidrógeno; y en la opción d, al no haber par solitario, no existe inversión piramidal.',
        difficulty: 'Fácil'
      },
      {
        id: 't01-m02',
        topicId: 'tema-01',
        block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
        badge: 'Interacción Receptor',
        question: 'Durante el anclaje de la acetilcolina en el sitio ortostérico del receptor muscarínico, ¿qué interacción no covalente fundamental estabiliza prioritariamente la cabeza de trimetilamonio?',
        questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
        options: [
          { text: 'La atracción electrostática iónica con un carboxilato de aspartato reforzada por interacciones catión-π con residuos aromáticos.', smiles: 'CC(=O)OCC[N+](C)(C)C' },
          { text: 'La formación de un puente de hidrógeno direccional específico con el grupo hidroxilo fenólico de una tirosina conservada.', smiles: 'OCC[N+](C)(C)C' },
          { text: 'El ataque nucleófilo reversible del grupo tiol de una cisteína sobre uno de los carbonos metílicos del catión amonio.', smiles: 'C[N+](C)(C)C' },
          { text: 'La formación de enlaces covalentes coordinados con cationes divalentes de zinc solvatados en el fondo del bolsillo de unión.', smiles: 'NC(=O)OCC[N+](C)(C)C' }
        ],
        correctIndex: 0,
        explanation: 'En el laboratorio de modelado molecular observamos que el catión trimetilamonio encaja en una cavidad aromática formada por residuos de tirosina y triptófano mediante interacciones catión-π con las nubes electrónicas aromáticas, anclándose de forma simultánea por atracción electrostática iónica directa con el carboxilato del aspartato conservado (Asp105/Asp147). Respecto a las alternativas erróneas, la opción b es imposible porque el nitrógeno cuaternario carece de protones para formar puentes de hidrógeno convencionales; la opción c supondría una desmetilación irreversible destructiva; y la opción d es falsa porque los receptores muscarínicos son GPCRs que no emplean cofactores de zinc en el sitio ortostérico.',
        difficulty: 'Medio'
      },
      {
        id: 't01-m03',
        topicId: 'tema-01',
        block: 'Bloque 1 · Fundamentos y Farmacóforo de ACh',
        badge: 'SAR & Conformación',
        question: 'La clásica regla de los cinco átomos de Ing describe la longitud de la cadena en análogos de colina. ¿Qué consecuencia estructural y conformacional impone sobre el farmacóforo colinérgico?',
        questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
        options: [
          { text: 'Obliga a que la molécula adopte una conformación totalmente extendida antiperiplanar para encajar en el canal iónico.', smiles: 'CCCCC[N+](C)(C)C' },
          { text: 'Fija una separación espacial óptima de aproximadamente 3.2 Å entre el catión amonio y el oxígeno en conformación sinclinal.', smiles: 'CC(=O)OCC[N+](C)(C)C' },
          { text: 'Permite la rotación libre de cadenas de hasta siete metilenos sin que se reduzca la afinidad por los receptores muscarínicos.', smiles: 'CCCCCCC[N+](C)(C)C' },
          { text: 'Exige la presencia obligatoria de un anillo aromático condensado a cinco carbonos del átomo de nitrógeno cuaternario.', smiles: 'c1ccccc1CC[N+](C)(C)C' }
        ],
        correctIndex: 1,
        explanation: 'Al analizar la regla de los cinco átomos de Ing, comprobamos que para una máxima actividad agonista muscarínica no debe superarse una separación de cinco átomos entre el nitrógeno cuaternario y el extremo terminal. En la conformación bioactiva sinclinal (gauche), el ángulo diedro O–C–C–N⁺ se sitúa en torno a 60°, lo que fija una distancia interatómica óptima de ~3.2 Å entre el centro catiónico y el oxígeno del éster, permitiendo la interacción complementaria simultánea con los dos subsitios del receptor. La opción a es un error frecuente: la conformación antiperiplanar separa los grupos a ~4.5 Å, reduciendo drásticamente la afinidad muscarínica.',
        difficulty: 'Medio'
      },
      {
        id: 't01-m04',
        topicId: 'tema-01',
        block: 'Bloque 2 · Agonistas Directos y SAR',
        badge: 'Estereoquímica & Eudismia',
        question: 'Al evaluar la actividad biológica de los enantiómeros de la metacolina sobre receptores muscarínicos, ¿qué observación experimental y fundamento molecular justifican su marcada eudismia?',
        questionSmiles: 'CC(=O)O[C@@H](C)C[N+](C)(C)C',
        options: [
          { text: 'El enantiómero (R) es más potente porque su metilo orienta el par electrónico del éster hacia los residuos básicos del canal.', smiles: 'CC(=O)O[C@H](C)C[N+](C)(C)C' },
          { text: 'Ambos enantiómeros presentan la misma afinidad porque el receptor colinérgico carece de asimetría quiral en su sitio de unión.', smiles: 'CC(=O)OCC[N+](C)(C)C' },
          { text: 'El enantiómero (R) presenta mayor afinidad debido a que se hidroliza con mayor lentitud por la enzima acetilcolinesterasa.', smiles: 'CC(=O)OC(C)C[N+](C)(C)C' },
          { text: 'El enantiómero (S) es unas 250 veces más activo al reproducir con fidelidad la disposición espacial de la (+)-muscarina natural.', smiles: 'CC(=O)O[C@@H](C)C[N+](C)(C)C' }
        ],
        correctIndex: 3,
        explanation: 'En el diseño estereoquímico de agonistas, el eutómero indiscutible es la (S)-metacolina, que muestra unas 250 veces más potencia que su enantiómero (R). El fundamento molecular reside en que su centro estereogénico sitúa el grupo metilo en la orientación tridimensional equivalente a la configuración del carbono C-5 de la (+)-(2S,4R,5S)-muscarina natural, emulando con exactitud su encaje en el bolsillo hidrófobo del receptor sin generar impedimento estérico. El distractor a induce al error típico de atribuir mayor afinidad a la forma (R) confundiéndola con su cinética de hidrólisis lenta frente a la AChE.',
        difficulty: 'Medio'
      },
      {
        id: 't01-m05',
        topicId: 'tema-01',
        block: 'Bloque 2 · Agonistas Directos y SAR',
        badge: 'Resistencia Metabólica',
        question: 'El carbacol presenta una estabilidad metabólica notablemente superior a la acetilcolina frente a la acetilcolinesterasa. ¿Cuál es la base electrónica de dicha resistencia?',
        questionSmiles: 'NC(=O)OCC[N+](C)(C)C',
        options: [
          { text: 'El impedimento estérico originado por el grupo amino primario que bloquea el acceso de moléculas de agua al sitio activo.', smiles: 'CC(=O)OCC[N+](C)(C)C' },
          { text: 'La donación por resonancia del par solitario del nitrógeno del carbamato que reduce el carácter electrófilo del carbonilo.', smiles: 'NC(=O)OCC[N+](C)(C)C' },
          { text: 'La protonación reversible del grupo carbamato a pH fisiológico que genera una repulsión electrostática con la enzima.', smiles: 'NC(=O)OC(C)C[N+](C)(C)C' },
          { text: 'La formación de un enlace disulfuro covalente con el bolsillo enzimático que impide la liberación del centro acetilado.', smiles: 'CC(=O)OC(C)C[N+](C)(C)C' }
        ],
        correctIndex: 1,
        explanation: 'Planteamos la síntesis de carbacol para resolver la inestabilidad metabólica de la acetilcolina. El carbacol es un éster carbámico (carbamato) donde el par de electrones no enlazante del nitrógeno –NH₂ se deslocaliza hacia el carbonilo por efecto mesómero donador (+M: NH₂–C(=O)–O ↔ ⁺NH₂=C(–O⁻)–O). Esta conjugación disminuye drásticamente el carácter electrófilo del carbono carbonílico, bloqueando el ataque nucleófilo de la Ser203 de la acetilcolinesterasa. La trampa en la que cae el alumno en la opción a es atribuir la resistencia a impedimento estérico: el grupo amino primario no es voluminoso, su efecto protector es puramente electrónico.',
        difficulty: 'Medio'
      },
      {
        id: 't01-m06',
        topicId: 'tema-01',
        block: 'Bloque 2 · Agonistas Directos y SAR',
        badge: 'Degradación & Epimerización',
        question: 'La pilocarpina es un alcaloide empleado en el tratamiento del glaucoma. ¿Qué vía de degradación química inactiva a este fármaco en disolución acuosa mediante una inversión de configuración?',
        questionSmiles: 'CCC1C(COC1=O)Cc2cnc[nH]2',
        options: [
          { text: 'La epimerización del centro estereogénico en posición alfa del anillo lactónico para generar el diastereoisómero inactivo isopilocarpina.', smiles: 'CC[C@H]1C(=O)OC[C@@H]1Cc2cnc[nH]2' },
          { text: 'La oxidación fotoquímica del heterociclo de imidazol a derivado de urea cíclica por acción del oxígeno atmosférico disuelto.', smiles: 'CC[C@@H]1C(=O)OC[C@@H]1Cc2cnc[nH]2' },
          { text: 'La eliminación bimolecular del grupo metilo unido al nitrógeno con formación de imidazol libre y desprendimiento de metanol.', smiles: 'CC[C@@H]1C(=O)OC[C@@H]1Cc2c[nH]cn2' },
          { text: 'La dimerización intermolecular mediante acoplamiento de tipo radicalario entre dos anillos de imidazol bajo radiación UV.', smiles: 'CC[C@@H]1C(=O)OC[C@@H]1CO' }
        ],
        correctIndex: 0,
        explanation: 'Al trabajar con disoluciones de pilocarpina debemos controlar rigurosamente dos rutas de degradación: la epimerización en el carbono quiral C-3 que genera isopilocarpina (inactiva) y la hidrólisis básica del anillo lactónico que rinde ácido pilocárpico. En medio básico, la desprotonación del protón en alfa al carbonilo genera un enolato plano que al reprotonarse termodinámicamente invierte la configuración relativa cis a trans, provocando la pérdida irreversible de actividad antiglaucomatosa. Los distractores b y c confunden la labilidad del anillo lactónico con el heterociclo de imidazol, el cual es químicamente estable en condiciones fisiológicas.',
        difficulty: 'Avanzado'
      },
      {
        id: 't01-m07',
        topicId: 'tema-01',
        block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
        badge: 'Farmacocinética & BHE',
        question: 'Al comparar las propiedades farmacocinéticas de la fisostigmina y la neostigmina en la inhibición de la acetilcolinesterasa, señale la correlación estructura-distribución correcta:',
        questionSmiles: 'CNC(=O)Oc1ccc2c(c1)[C@]3(C)CCN(C)[C@@H]3N2C',
        options: [
          { text: 'Ambos fármacos cruzan la barrera hematoencefálica con idéntica eficacia al presentar coeficientes de reparto lipófilos similares.', smiles: 'CNC(=O)Oc1ccc2c(c1)[C@]3(C)CCN(C)[C@@H]3N2C' },
          { text: 'La neostigmina accede con gran facilidad al sistema nervioso central gracias a la naturaleza aromática de su anillo carbámico.', smiles: 'CN(C)C(=O)Oc1cccc(c1)[N+](C)(C)C' },
          { text: 'La fisostigmina penetra en el SNC por poseer una amina terciaria, mientras que la neostigmina actúa sólo en periferia por su amonio 4º.', smiles: 'CNC(=O)Oc1ccc2c(c1)[C@]3(C)CCN(C)[C@@H]3N2C' },
          { text: 'La fisostigmina queda confinada a la placa motora neuromuscular periférica debido a la presencia de su anillo tricíclico de indol.', smiles: 'CN(C)C(=O)Oc1cccnc1' }
        ],
        correctIndex: 2,
        explanation: 'En farmacología clínica distinguimos con claridad la fisostigmina de la neostigmina por su confinamiento: la fisostigmina es un carbamato alcaloide con nitrógeno terciario no ionizado a pH fisiológico (LogP alto), lo que le permite atravesar la barrera hematoencefálica y revertir intoxicaciones anticolinérgicas centrales por atropina. Por el contrario, la neostigmina incorpora un nitrógeno cuaternario permanentemente cargado (LogP muy bajo) que le impide cruzar la BHE, restringiendo su acción terapéutica a la placa motora periférica (miastenia gravis). La opción a invierte de manera errónea el estado de ionización de ambas moléculas.',
        difficulty: 'Fácil'
      },
      {
        id: 't01-m08',
        topicId: 'tema-01',
        block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
        badge: 'Inhibidores No Carbamatos',
        question: 'El donepezilo se utiliza en la enfermedad de Alzheimer como inhibidor de la acetilcolinesterasa. ¿Qué característica distingue su modo de unión molecular del exhibido por la rivastigmina?',
        questionSmiles: 'COc1cc2c(cc1OC)C(=O)CC2CC3CCN(Cc4ccccc4)CC3',
        options: [
          { text: 'Carbamoila covalentemente la serina catalítica mediante la transferencia del fragmento carbonilo con hidrólisis muy lenta.', smiles: 'CCN(C)C(=O)Oc1cccc(c1)[C@@H](C)N(C)C' },
          { text: 'Se une de forma irreversible mediante alquilación con formación de enlace fosfodiéster en la triada catalítica profunda.', smiles: 'CCOP(=O)(OCC)SCCN(C(C)C)C(C)C' },
          { text: 'Actúa como modulador alostérico negativo uniéndose exclusivamente a la región citoplasmática del receptor muscarínico M1.', smiles: 'c1ccc2c(c1)c(c3c([nH]2)cccc3)N' },
          { text: 'Interacciona de forma reversible no covalente ocupando simultáneamente el sitio catalítico (CAS) y el sitio aniónico periférico (PAS).', smiles: 'COc1cc2c(cc1OC)C(=O)CC2CC3CCN(Cc4ccccc4)CC3' }
        ],
        correctIndex: 3,
        explanation: 'Para el tratamiento del Alzheimer seleccionamos donepezilo porque es un inhibidor reversible no carbamato que ocupa simultáneamente el sitio activo catalítico (CAS) y el sitio aniónico periférico (PAS) de la AChE mediante apilamiento aromático con Trp86 y Trp286. Al no transferir grupos químicos covalentes a la Ser203, carece por completo de la hepatotoxicidad grave observada históricamente con la tacrina y no induce tolerancia enzimática. El error conceptual del distractor a radica en clasificar al donepezilo como sustrato suicida o carbamoilante covalente.',
        difficulty: 'Medio'
      },
      {
        id: 't01-m09',
        topicId: 'tema-01',
        block: 'Bloque 3 · Inhibidores de AChE y Reactivadores',
        badge: 'Reactivación Oxímica',
        question: 'Tras una intoxicación por agentes organofosforados neurotóxicos como el sarín, ¿cómo logra la pralidoxima (2-PAM) regenerar la enzima acetilcolinesterasa activa?',
        questionSmiles: 'O/N=C/c1cccc[n+]1C',
        options: [
          { text: 'El ión oximato ataca nucleofílicamente al átomo de fósforo electrofílico desplazando el enlace con la serina catalítica de la enzima.', smiles: 'O/N=C/c1cccc[n+]1C' },
          { text: 'El nitrógeno piridínico desprotona a la histidina catalítica para restaurar la conformación abierta del canal de acceso al bolsillo.', smiles: 'CC(C)OP(=O)(C)F' },
          { text: 'La molécula actúa como aceptor competitivo del grupo acetilo libre acumulado en el espacio sináptico restableciendo el equilibrio.', smiles: 'CCOP(=O)(C#N)N(C)C' },
          { text: 'Induce la desmetilación oxidativa del residuo de colina fosforilado permitiendo la entrada directa de agua para desfosforilar.', smiles: 'CC(C)(C)C(C)OP(=O)(C)F' }
        ],
        correctIndex: 0,
        explanation: 'Al diseñar antídotos contra organofosforados, empleamos pralidoxima (2-PAM) porque combina un catión piridinio que se ancla electrostáticamente al subsitio aniónico periférico de la AChE y un grupo oxima nucleófilo (=N–OH) perfectamente posicionado. El grupo oxima ataca el átomo de fósforo electrofílico del resto organofosforado unido a la Ser203, desplazándolo mediante sustitución nucleófila y regenerando la enzima libre antes de que ocurra el envejecimiento. La trampa de la opción c consiste en creer que la oxima ataca a la colina o al resto acetilo.',
        difficulty: 'Medio'
      },
      {
        id: 't01-m10',
        topicId: 'tema-01',
        block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
        badge: 'Farmacóforo Antagonista',
        question: 'Los antagonistas muscarínicos clásicos como la atropina presentan un farmacóforo característico. ¿Cuál es el rasgo estructural determinante que les confiere actividad bloqueante frente a los agonistas?',
        questionSmiles: 'CN1C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3',
        options: [
          { text: 'La presencia obligatoria de un grupo nitro o sulfonamida polar conjugado con una cabeza básica libre de sustituyentes alquílicos.', smiles: 'CCN(CC)CCOC(=O)C(c1ccccc1)c1ccccc1' },
          { text: 'La reducción estricta del tamaño de la molécula a un máximo de tres átomos de carbono entre el nitrógeno y el grupo carbonilo.', smiles: 'CC(=O)OCC[N+](C)(C)C' },
          { text: 'La incorporación de sustituyentes hidrófobos voluminosos (anillos aromáticos o cicloalifáticos) que ocupan bolsas accesorias.', smiles: 'CN1C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3' },
          { text: 'La eliminación de cualquier átomo de nitrógeno para evitar interacciones electrostáticas con los residuos aniónicos del receptor.', smiles: 'CCN(CC)CCOC(=O)C(O)(c1ccccc1)c1ccccc1' }
        ],
        correctIndex: 2,
        explanation: 'Definimos el farmacóforo de los antagonistas muscarínicos como una cabeza catiónica básica separada por una cadena alquilica corta de un centro acilo esterificado con dos anillos hidrófobos voluminosos (aromáticos o cicloalifáticos). Estos anillos lipófilos actúan como un 'escudo hidrófobo' que establece interacciones no específicas con zonas adyacentes al sitio ortostérico, impidiendo el cambio conformacional del receptor hacia el estado activo. La opción a es la trampa habitual: la regla de Ing rige para agonistas colinérgicos flexibles, mientras que los antagonistas toleran estructuras voluminosas de mayor extensión.',
        difficulty: 'Fácil'
      },
      {
        id: 't01-m11',
        topicId: 'tema-01',
        block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
        badge: 'Confinamiento Respiratorio',
        question: 'En el tratamiento del broncoespasmo en la EPOC se prescribe bromuro de ipratropio por vía inhalatoria. ¿Qué ventaja molecular presenta frente a la atropina para uso respiratorio?',
        questionSmiles: 'CC(C)[N+]1(C)C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3',
        options: [
          { text: 'Su mayor lipofilia le permite atravesar con gran rapidez el epitelio alveolar alcanzando concentraciones plasmáticas elevadas.', smiles: 'CN1C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3' },
          { text: 'Su cabeza de amonio cuaternario con carga permanente previene la absorción y el paso por la BHE, evitando efectos adversos en SNC.', smiles: 'CC(C)[N+]1(C)C2CCC1CC(C2)OC(=O)C(CO)c3ccccc3' },
          { text: 'Posee un enlace éster modificado químicamente que resiste la degradación hidrolítica durante más de dos semanas en pulmón.', smiles: 'CCCC[N+]1(C)C2CC3OC3C1CC(C2)OC(=O)C(CO)c4ccccc4' },
          { text: 'Actúa selectivamente como agonista nicotínico facilitando la contracción de la musculatura lisa bronquial en crisis agudas.', smiles: 'CN1[C@@H]2C[C@@H](OC(=O)[C@H](CO)c3ccccc3)C[C@H]1[C@@H]1O[C@@H]12' }
        ],
        correctIndex: 1,
        explanation: 'Prescribimos bromuro de ipratropio por vía inhalatoria en EPOC porque la presencia del nitrógeno cuaternario N-isopropílico le confiere una carga positiva permanente e hidrofobicidad nula (LogP < 0). Esto anula su absorción a través de la mucosa bronquial y la barrera hematoencefálica, limitando el bloqueo de receptores M3 al músculo liso bronquial sin provocar los efectos anticolinérgicos sistémicos típicos de la atropina (taquicardia, retención urinaria, sequedad). La opción a confunde la selectividad farmacocinética (confinamiento tópico) con una selectividad por subtipo de receptor.',
        difficulty: 'Fácil'
      },
      {
        id: 't01-m12',
        topicId: 'tema-01',
        block: 'Bloque 4 · Antagonistas y Farmacocinética BHE',
        badge: 'Estabilidad Metabólica',
        question: 'El trihexifenidilo es un anticolinérgico empleado en la enfermedad de Parkinson. ¿Qué elemento de su diseño químico le otorga mayor estabilidad metabólica que los ésteres atropínicos?',
        questionSmiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CCCCC3',
        options: [
          { text: 'La presencia de un puente disulfuro cíclico que estabiliza el anillo piperidínico frente a la acción oxidativa del citocromo P450.', smiles: 'OC(CCN1CCCC1)(c2ccccc2)C3CCCCC3' },
          { text: 'La sustitución del anillo bencénico por un resto heterocíclico de pirimidina resistente al metabolismo de fase II hepático.', smiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CC4C=CC3C4' },
          { text: 'La incorporación de un enlace carbamato fluorado que resiste la desaminación oxidativa mediada por monoamino oxidasas neuronales.', smiles: 'CN(C)CCOC(=O)C(c1ccccc1)C2(O)CCCC2' },
          { text: 'El reemplazo del enlace éster por un carbinol terciario lipófilo que resulta completamente inmune a las esterasas plasmáticas.', smiles: 'OC(CCN1CCCCC1)(c2ccccc2)C3CCCCC3' }
        ],
        correctIndex: 3,
        explanation: 'Al evaluar antimuscarínicos sintéticos como el trihexifenidilo, comprobamos que la presencia de un carbinol terciario impide su oxidación metabólica a cetona, ya que el carbono carbinólico carece de átomos de hidrógeno disponibles (C–H). Además, el grupo amino terciario piperidínico en forma básica neutra facilita un cruce eficiente de la BHE para controlar el temblor y rigidez en el Parkinson. La trampa típica (opción a) afirma que los alcoholes terciarios se oxidan a ácidos carboxílicos, lo cual es químicamente imposible sin rotura de enlaces C–C.',
        difficulty: 'Medio'
      },
      {
        id: 't01-m13',
        topicId: 'tema-01',
        block: 'Bloque 5 · Retrosíntesis y Síntesis Orgánica',
        badge: 'Criterio de Desconexión',
        question: 'En el análisis retrosintético del bencilmalonato de dietilo, se opta por el corte PhCH₂─CH(CO₂Et)₂ frente al corte Ph─CH₂CH(CO₂Et)₂. ¿Cuál es la razón orbital que invalida este segundo corte?',
        questionSmiles: 'CCOC(=O)C(Cc1ccccc1)C(=O)OCC',
        options: [
          { text: 'El catión bencilo derivado del corte descartado sufre una dimerización radicalaria espontánea en presencia de etóxido sódico.', smiles: 'c1ccccc1CBr' },
          { text: 'El sintón catión fenilo [Ph]⁺ sitúa la vacante en un orbital sp² ortogonal al sistema π aromático, impidiendo su estabilización.', smiles: 'c1ccccc1Br' },
          { text: 'El carbanión malonato pierde su carácter quelante con el contracatión metálico de sodio al separar el grupo metileno bencílico.', smiles: 'CCOC(=O)CC(=O)OCC' },
          { text: 'El bromobenceno resultante como reactivo comercial actúa como oxidante fuerte consumiendo el malonato por condensación parásita.', smiles: 'CCOC(=O)C(Cc1ccccc1)C(=O)OCC' }
        ],
        correctIndex: 1,
        explanation: 'En la transducción de señales de receptores muscarínicos, diferenciamos dos cascadas: los subtipos M1, M3 y M5 se acoplan a proteínas Gq/11, activando la fosfolipasa C-beta (PLCβ) con generación de inositol trisfosfato (IP3) y diacilglicerol (DAG), lo que moviliza calcio intracelular. En cambio, los receptores M2 y M4 se acoplan a proteínas Gi/o, inhibiendo a la adenilato ciclasa y disminuyendo los niveles de AMPc. El error conceptual del distractor a invierte el acoplamiento, asociando erróneamente M2 a estimulación celular.',
        difficulty: 'Medio'
      },
      {
        id: 't01-m14',
        topicId: 'tema-01',
        block: 'Bloque 5 · Retrosíntesis y Síntesis Orgánica',
        badge: 'Reactivo de Ivanov',
        question: 'En la síntesis de ciclopentolato, el ataque de un carbanión convencional sobre ciclopentanona da rendimientos deficientes. ¿Cómo solventa el reactivo de Ivanov este inconveniente químico?',
        questionSmiles: 'CN(C)CCOC(=O)C(c1ccccc1)C2(O)CCCC2',
        options: [
          { text: 'Provoca la apertura electrocíclica del anillo de cinco miembros liberando un aldehído lineal altamente electrofílico para la adición.', smiles: 'CCOC(=O)Cc1ccccc1' },
          { text: 'Oxida el alcohol secundario generado in situ evitando que la ciclopentanona se deshidrate a derivados diénicos poliméricos.', smiles: 'OC(=O)Cc1ccccc1' },
          { text: 'Su estructura dianiónica blanda actúa como nucleófilo eficiente suprimiendo la desprotonación y enolización de la ciclopentanona.', smiles: 'O=C1CCCC1' },
          { text: 'Actúa como ácido de Lewis quelando al oxígeno del carbonilo para promover una sustitución nucleófila bimolecular sobre el anillo.', smiles: 'CN(C)CCOC(=O)C(c1ccccc1)C2(O)CCCC2' }
        ],
        correctIndex: 2,
        explanation: 'En la síntesis de ciclopentolato en el laboratorio, preparamos el reactivo de Ivanov tratando el ácido fenilacético con dos equivalentes de reactivo de Grignard o LDA para generar el dianión hidrocarbonado correspondiente. Al condensar este dianión con ciclopentanona, la presencia de la carga carboxilato suprime la enolización competitiva de la cetona ciclopentánica, permitiendo la adición nucleófila limpia sobre el carbonilo y rindiendo el alfa-hidroxiácido con excelente rendimiento sin subproductos aldólicos. La opción a es la trampa típica: un enolato simple provocaría autocondensación aldólica descontrolada de la ciclopentanona.',
        difficulty: 'Avanzado'
      },
      {
        id: 't01-m15',
        topicId: 'tema-01',
        block: 'Bloque 5 · Retrosíntesis y Síntesis Orgánica',
        badge: 'Síntesis Industrial',
        question: 'En la preparación del betanecol a partir de 1-(trimetilamonio)propan-2-ol, ¿cuál es la secuencia de reactivos y transformaciones químicas necesaria para introducir la función carbamato?',
        questionSmiles: 'NC(=O)OC(C)C[N+](C)(C)C',
        options: [
          { text: 'Tratamiento con fosgeno (COCl₂) para formar el intermedio cloroformiato seguido de adición de amoniaco para generar el carbamato.', smiles: 'CC(O)C[N+](C)(C)C' },
          { text: 'Reacción directa con urea a reflujo prolongado en ácido sulfúrico concentrado con eliminación de agua como fuerza impulsora.', smiles: 'NC(=O)N' },
          { text: 'Acilación del hidroxilo con cloruro de acetilo seguida de condensación con hidrazina y transposición térmica de Curtius.', smiles: 'CC(=O)Cl' },
          { text: 'Tratamiento con isocianato de metilo anhidro en presencia de una base terciaria impedida para rendir un N-metilcarbamato.', smiles: 'CN=C=O' }
        ],
        correctIndex: 0,
        explanation: 'Planteamos la ruta directa de betanecol a partir de 1-(trimetilamonio)propan-2-ol: activamos el alcohol secundario con fosgeno (COCl₂) para generar el éster de cloroformiato correspondiente y lo tratamos seguidamente con amoníaco anhidro en medio aprótico para formar el grupo carbamato terminal. La presencia del metilo en beta bloquea cualquier interacción con el receptor nicotínico y protege estéricamente el enlace éster. La opción b falla porque la urea es un electrófilo demasiado poco reactivo para acilar un alcohol secundario sin catalizadores metálicos agresivos.',
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
