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
  audioUrl?: string;
  driveId?: string;
  size?: string;
  date: string;
  spotifyUri?: string;
  isPodcastVideo?: boolean;
  /** Solo lo ve el profesorado (el alumnado no lo ve aunque el tema esté publicado) */
  soloDocente?: boolean;
}

export interface TestQuestionOption {
  text: string;
  smiles?: string;
  /** Nombre o descripción que se revela exclusivamente tras contestar o en el solucionario para mantener el rigor del examen */
  revealedName?: string;
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

export interface FlashcardStructure {
  name: string;
  smiles: string;
  badge?: string;
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
  imagePath?: string;
  structures?: FlashcardStructure[];
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
  evaluationMode?: 'docente_sesion' | 'alumno_evaluado' | 'flashcards_autoevaluacion';
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

/**
 * Molécula que se dibuja en la tarjeta del tema. Por defecto, el primer
 * fármaco de la lista; aquí se fija otra cuando la primera no es la más
 * representativa (el Tema 2 abre con la L-tirosina por la biosíntesis de
 * catecolaminas, pero su tarjeta muestra el salbutamol). Va por id y nombre,
 * no por posición, para que siga valiendo con el contenido publicado desde el
 * panel, que puede traer los fármacos en otro orden.
 */
const MOLECULA_DE_TARJETA: Record<string, RegExp> = {
  'tema-02': /salbutamol/i,
  'tema-03': /^haloperidol$/i
};

export function moleculaDeTarjeta(topic: { id: string; drugs?: MoleculeDrug[] }): MoleculeDrug | undefined {
  const drugs = topic.drugs ?? [];
  const patron = MOLECULA_DE_TARJETA[topic.id];
  return (patron && drugs.find(d => patron.test(d.name))) || drugs[0];
}

export interface QfdosTopic {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category?: 'teoria' | 'examen' | 'trabajo' | 'seminario' | 'general';
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
  audioPodcastUrl?: string;
  audioPodcastName?: string;
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
  /** false = el test existe pero aún no se ofrece al alumnado */
  testDisponible?: boolean;
  /** false = las flashcards existen pero aún no se ofrecen al alumnado */
  flashcardsDisponibles?: boolean;
}

/** ¿Se puede abrir el test de este tema? */
export function testHabilitado(t: QfdosTopic): boolean {
  if (t.id === 'tema-01' || t.id === 'tema-02') return true;
  return t.testDisponible !== false && (t.testQuestions?.length ?? 0) > 0;
}

/** ¿Se pueden abrir las flashcards de este tema? */
export function flashcardsHabilitadas(t: QfdosTopic): boolean {
  return t.flashcardsDisponibles !== false && (t.flashcards?.length ?? 0) > 0;
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
  /** Portada de la noticia: se usa como fondo en las Historias */
  imageUrl?: string;
  /** Crédito de la imagen, visible en las Historias */
  imageCredit?: string;
  /** MP4/WebM directo: se reproduce en las Historias (primeros 30 s) */
  videoUrl?: string;
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
    id: 'link-nobel-quimica-2026',
    title: 'Nobel de Química 2026: Kagan y Soai, efectos no lineales y autocatálisis en síntesis asimétrica',
    url: 'https://www.nobelprize.org/prizes/chemistry/2026/press-release/',
    summary:
      'En cuanto al Nobel de Química, quiero que os quedéis con una idea: la vida es enantiopura. Los aminoácidos son L, los azúcares son D, y todas las dianas que nos interesan (receptores, enzimas, canales) son entornos quirales que distinguen a los dos enantiómeros de un fármaco con precisión absoluta. Por eso sintetizar moléculas enantioméricamente puras es el camino para interaccionar con los sistemas biológicos de forma mucho más precisa: un enantiómero es el eutómero y el otro, el distómero, puede ser inactivo, más tóxico o incluso antagonista. Es la eudismia que veis en el Tema 2, con los β2 agonistas y los β-bloqueantes. La Academia Sueca premia a Henri B. Kagan (Universidad Paris-Saclay, emérito) y Kenso Soai (Universidad de Ciencias de Tokio, emérito) por el descubrimiento de los efectos no lineales y la autocatálisis en la síntesis orgánica asimétrica. Kagan demostró que la pureza enantiomérica del producto no tiene por qué ser proporcional a la del catalizador quiral (efectos no lineales), y su bisfosfina DIOP abrió la hidrogenación asimétrica con rodio. Soai describió en 1995 la primera reacción autocatalítica con amplificación asimétrica: un alcohol pirimidílico quiral cataliza su propia formación a partir de pirimidina-5-carbaldehído y diisopropilcinc, y un exceso enantiomérico ínfimo acaba en un producto casi enantiopuro. Es el modelo experimental más claro de cómo una asimetría mínima pudo imponer la homoquiralidad de la vida. Un fármaco racémico es, en la práctica, una mezcla de dos compuestos distintos, y dominar la síntesis asimétrica es lo que permite administrar solo el que hace el trabajo. Os recomiendo leerlo con los apuntes de estereoquímica delante.',
    category: 'Divulgación',
    source: 'NobelPrize.org',
    duration: '6 min',
    relatedTopic: 'Tema 02',
    imageUrl: 'historias/nobel-quimica-2026.jpg',
    imageCredit: 'Ilustración: Niklas Elmehed © Nobel Prize Outreach',
    featured: true,
    addedAt: '2026-10-07'
  },
  {
    id: 'link-nobel-medicina-2026',
    title: 'Nobel de Medicina 2026: la optogenética y el control de neuronas con luz',
    url: 'https://www.nobelprize.org/prizes/medicine/2026/press-release/',
    summary:
      'En cuanto al Nobel de Medicina, el premio es para Karl Deisseroth (Stanford), Peter Hegemann (Universidad Humboldt de Berlín) y Georg Nagel (Universidad de Würzburg) por la optogenética. Hegemann y Nagel identificaron en el alga Chlamydomonas la canalrodopsina, un canal iónico que se abre con la luz gracias a su cromóforo de retinal, y Deisseroth la llevó a neuronas de mamífero para encenderlas y apagarlas con pulsos de luz. Para nosotros tiene un interés muy directo, porque es una herramienta de validación de dianas: cuando activamos o silenciamos un circuito concreto, como las neuronas dopaminérgicas que estamos viendo en el Tema 3 en modelos de Parkinson o de adicción, sabemos qué efecto tendría un fármaco que actuara solo ahí antes de diseñarlo. Ya hay ensayos clínicos iniciales para recuperar visión en la retinosis pigmentaria, y la fotofarmacología persigue ese mismo control con moléculas fotoconmutables en lugar de genes. Os recomiendo leerlo con el temario de receptores delante.',
    category: 'Descubrimiento de fármacos',
    source: 'NobelPrize.org',
    duration: '5 min',
    relatedTopic: 'Tema 03',
    imageUrl: 'historias/nobel-medicina-2026.jpg',
    imageCredit: 'Ilustración: Niklas Elmehed © Nobel Prize Outreach',
    featured: true,
    addedAt: '2026-10-06'
  },
  {
    id: 'link-nobel-fisica-2026',
    title: 'Nobel de Física 2026: IceCube y los neutrinos de alta energía, de la Antártida a la medicina nuclear',
    url: 'https://www.nobelprize.org/prizes/physics/2026/press-release/',
    summary:
      'Respecto al Nobel de Física, Francis Halzen (Universidad de Wisconsin-Madison) lo recibe por su papel decisivo en IceCube, un kilómetro cúbico de hielo antártico instrumentado con sensores de luz, y por el descubrimiento de neutrinos de alta energía de origen astrofísico. El detector registra la luz Cherenkov que emiten las partículas cargadas generadas cuando un neutrino choca en el hielo. El vínculo con la farmacia está más cerca de lo que parece, y creo que merece la pena verlo con calma: cada desintegración β⁺ de un radiofármaco de PET, como el [¹⁸F]FDG, emite un positrón y un neutrino, y la luz Cherenkov de esos positrones ya se aprovecha en imagen óptica de radiotrazadores, de modo que la misma física que estudia IceCube trabaja a diario en medicina nuclear.',
    category: 'Divulgación',
    source: 'NobelPrize.org',
    duration: '5 min',
    imageUrl: 'historias/nobel-fisica-2026.jpg',
    imageCredit: 'Ilustración: Niklas Elmehed © Nobel Prize Outreach',
    featured: true,
    addedAt: '2026-10-06'
  },
  {
    id: 'link-isomorphic-labs-iso-dde',
    title: 'Isomorphic Labs: una nueva vía para fabricar medicamentos con IA',
    url: 'https://www.isomorphiclabs.com/articles/building-a-new-path-to-make-medicines-with-ai',
    summary:
      'Isomorphic Labs (fundada en 2021, nacida en torno a AlphaFold) presenta su motor de diseño de fármacos, IsoDDE, que va más allá de predecir estructuras: agentes generativos exploran en días un espacio químico de unas 10⁶⁰ moléculas pequeñas, frente a los 10⁵–10⁹ compuestos que cubre un cribado clásico en meses o años. Fijaos en lo que la empresa afirma y en lo que muestra: hay datos preclínicos, pero ninguna diana ni ensayo clínico concretos. Buen texto para conectar con el diseño basado en estructura y con el cribado virtual.',
    category: 'Descubrimiento de fármacos',
    source: 'Isomorphic Labs',
    duration: '6 min · con vídeos',
    relatedTopic: 'Tema 00',
    featured: true,
    addedAt: '2026-09-30',
    imageUrl: 'https://cdn.prod.website-files.com/6846c7b5a78f3e9225c64f10/6aaa84d4e30dc0dd73568a6c_iso-max-jaderberg-1920x1080.jpg',
    videoUrl: 'https://storage.googleapis.com/isomorphiclabs-website-public-artifacts/videos/blogs/IsomorphicLabs_MultiSearchVideo_4K_Compressed.mp4'
  },
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
    url: 'https://www.ema.europa.eu/en/medicines',
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
  imageUrl?: string;
  imageCaption?: string;
  pdfUrl?: string;
  pdfName?: string;
  audioUrl?: string;
  audioName?: string;
  videoUrl?: string;
  linkUrl?: string;
  linkLabel?: string;
  /** Entra en las Historias de la portada, como primera pieza */
  enHistorias?: boolean;
  /** Tema al que lleva el botón de la historia, p. ej. `tema-02` */
  temaId?: string;
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
 * v3.23.0 — Acceso directo a edición de temas desde el portal docente y persistencia blindada.
 * v3.24.0 — Noticia de Isomorphic Labs en enlaces de interés y en las Historias.
 * v3.25.0 — 3 modelos oficiales de examen para el Tema 2 (Sistema Adrenérgico, 45 preguntas calibradas JEV).
 * v3.26.0 — Renderizado 2D RDKit de estructuras químicas en opciones del quiz y Modelo 1 actualizado con Modelo B (Ahlquist, Fries, β₂, CIP y Eudismia).
 * v3.27.0 — Ocultación de nombres de fármacos en opciones con estructuras (se evita desvelar respuestas; nombres accesibles solo tras contestar y en revisión).
 * v3.28.0 — Historias del Tema 2: cartel, clip, vídeo resumen (Spotify) y píldora de audio.
 * v3.29.0 — Aviso del Tema 2 (tipo test y recursos) en el tablón y como primera historia.
 * v3.30.0 — Generador de estructuras del Tema 3 como adjunto solo para el profesorado.
 * v3.31.0 — Tema 3: baraja de 20 cartas dopaminérgicas y 43 fármacos con estructura en Fármacos & Quimioinformática.
 * v3.32.0 — Tema 3 sin test ni flashcards (se retiran del código y del contenido publicado).
 * v3.33.0 — Enlaces de interés: Nobel de Medicina 2026 (optogenética) y de Física 2026 (IceCube).
 * v3.34.0 — Las claves de corrección incluyen los 3 modelos del Tema 2 (antes solo el Modelo 1 llegaba al servidor).
 * v3.35.0 — Enlace de interés y Historia: Nobel de Química 2026 (Kagan y Soai).
 * v3.36.0 — Ilustraciones de la Academia (Niklas Elmehed) como fondo de las noticias de los tres Nobel 2026 y énfasis en la estereoquímica.
 * v3.37.0 — Las ilustraciones de los Nobel llegan también a los enlaces ya publicados (el alumnado no las veía en Medicina y Física).
 * v3.38.0 — Se retira la música sintetizada de las historias sin sonido; quedan los efectos de brag.
 * v3.39.0 — Tema 2: 10 flashcards de autoevaluación (SAR, interacción con el receptor β2, síntesis de salbutamol y guanetidina, estereoquímica) con valoración fácil/difícil.
 * v3.39.1 — Las flashcards del Tema 2 que trae eexport const COURSE_BUILD_TIMESTAMP = '2026-10-07T15:47:00.000Z';a 1 tarjeta en vez de 10).
 */
export const COURSE_DATA_VERSION = '3.39.1';
export const COURSE_BUILD_TIMESTAMP = '2026-10-07T14:55:00.000Z';

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
  designSystem: "QFDOS Structural Affinity Identity v3.0",
  evaluacion: {
    examenFinal: 70,
    examenParcial: 20,
    practicas: 5,
    trabajosSeminarios: 5
  }
};

/** Avisos del código que se ofrecen al profesorado para publicarlos (ver utils/enlacesNuevos.ts). */
export const AVISOS_A_OFRECER = ['ann-tema02-tests-recursos'];

export const INITIAL_ANNOUNCEMENTS: QfdosAnnouncement[] = [
  {
    id: 'ann-tema02-tests-recursos',
    title: '📝 Tema 2 · Sistema Adrenérgico: ya están disponibles los tipo test y el resto de recursos',
    content: 'Ya podéis hacer los tres modelos de examen tipo test del Tema 2 (45 preguntas en total, 15 por modelo) desde el botón de test de la tarjeta del Tema 02 en el temario. Además tenéis la píldora de audio del tema (6 min y medio), el vídeo resumen en Spotify y, en las Historias de la portada, el cartel y el clip del tema. Os recomendamos escuchar el audio y ver el resumen antes de enfrentaros a los tests.',
    date: '6 Octubre 2026',
    priority: 'normal',
    imageUrl: 'historias/tema-02-brag.jpg',
    imageCaption: 'Noradrenalina, (R): la molécula de la lucha o la huida',
    audioUrl: 'audio/podcast_adrenergicos.mp3',
    audioName: 'Píldora Docente 02: Noradrenalina y Sistema Adrenérgico (6,5 min)',
    linkUrl: 'https://open.spotify.com/episode/4EcClAu7PKvIWraUM7Ohez?si=3f_LGqt5ReenndfcslT3KA',
    linkLabel: 'Ver el vídeo resumen en Spotify',
    enHistorias: true,
    temaId: 'tema-02'
  },
  {
    id: 'ann-podcast-t01',
    title: '🎙️ Nueva Píldora de Audio del Tema 1: Sistema Colinérgico (MP3 & Spotify)',
    content: 'Publicado el episodio de audio docente para el repaso autónomo de la transmisión colinérgica, inhibidores de AChE (Donepezilo, Rivastigmina) y rescate enzimático frente a organofosforados con Pralidoxima (2-PAM). Puedes escucharlo directamente aquí o descargarlo en MP3.',
    date: '28 Septiembre 2026',
    priority: 'alta',
    audioUrl: 'audio/podcast_colinergicos.mp3',
    audioName: 'Píldora Docente 01: Acetilcolina y Fármacos Colinérgicos (6 min)',
    linkUrl: 'https://open.spotify.com/episode/7wNxoaxVPBMS5HvdSByor2',
    linkLabel: 'Escuchar en Spotify'
  },
  {
    id: 'ann-fda-targets-2026',
    title: '📄 Novedades Regulatorias: Fármacos Aprobados FDA (Q3 2026) y Landscape de Dianas',
    content: 'Disponibles en el nuevo módulo de Material General los informes con las últimas moléculas aprobadas por la FDA en 2026 y la revisión sobre el panorama evolutivo de dianas terapéuticas.',
    date: '28 Septiembre 2026',
    priority: 'alta',
    pdfUrl: 'varios/FDA_drug_approved_Q3_2026.pdf',
    pdfName: 'FDA Drug Approved Q3 2026 (PDF · 1.2 MB)',
    imageUrl: 'varios/Mapa_de_las_dianas_terapeuticas.png',
    imageCaption: 'Mapa de Dianas Terapéuticas y Familias Farmacológicas'
  },
  {
    id: 'ann-examen-tema1-modelo-a',
    title: '📝 Abierto el Examen Tipo Test del Tema 1 · Modelo A (15 preguntas) en modo examen',
    content: 'Ya está disponible para todo el alumnado el cuestionario oficial del Tema 1 (Sistema Colinérgico), Modelo A de 15 preguntas calibradas. Se realiza en modo examen: respondéis sin ver la corrección, podéis moveros libremente entre preguntas y entregar en cualquier momento. Las preguntas de síntesis del bloque final corresponden a metacolina y betanecol. Al entregar, la nota y el detalle de respuestas quedan registrados automáticamente en la hoja oficial de calificaciones. Basta con vuestro nombre y correo UGR: ya no se pide el DNI.',
    date: '22 Septiembre 2026',
    priority: 'alta'
  },
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
    block: 'Bloque 5 · Síntesis Directa: Metacolina y Betanecol',
    badge: 'Síntesis Directa de Metacolina',
    question: 'En la síntesis directa de la metacolina a partir de óxido de propileno, ¿qué secuencia de reactivos construye el éster acético sobre el alcohol secundario y la cabeza de amonio cuaternario?',
    questionSmiles: 'CC(=O)OC(C)C[N+](C)(C)C',
    options: [
  { text: 'Condensación de Claisen entre acetato de etilo y cloruro de trimetilamonio en etóxido sódico, con reducción final del cetoéster mediante borohidruro.' },
  { text: 'Apertura del óxido de propileno con amoníaco anhidro seguida de carbamoilación con fosgeno y posterior alquilación exhaustiva con bromuro de etilo.' },
  { text: 'Apertura del óxido de propileno con dimetilamina por el carbono menos impedido, acetilación con anhídrido acético y cuaternización con yoduro de metilo.' },
  { text: 'Adición de bromuro de metilmagnesio a cloroacetato de metilo seguida de hidrólisis ácida y tratamiento directo con trimetilamina en medio acuoso.' }
    ],
    correctIndex: 2,
    explanation: 'En el laboratorio preparamos metacolina abriendo el óxido de propileno con dimetilamina: el nucleófilo ataca por el carbono menos sustituido y deja el hidroxilo en posición secundaria, que es precisamente el metilo en beta que distingue a la metacolina de la acetilcolina. Acetilamos después ese alcohol secundario con anhídrido acético (o cloruro de acetilo) y cerramos la ruta cuaternizando la amina terciaria con yoduro de metilo, que fija la carga positiva permanente. El orden importa: si cuaternizamos antes de acilar, el amonio vecino desactiva el hidroxilo y la esterificación se vuelve mucho más lenta. La opción b conduce al esqueleto carbámico del betanecol, no al éster acético que buscamos.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-14',
    topicId: 'tema-01',
    block: 'Bloque 5 · Síntesis Directa: Metacolina y Betanecol',
    badge: 'Bifurcación Sintética: Metacolina vs Betanecol',
    question: 'La metacolina y el betanecol comparten el intermedio 1-(trimetilamonio)propan-2-ol. ¿Qué etapa final diferencia la obtención de cada fármaco a partir de ese precursor común?',
    questionSmiles: 'OC(C)C[N+](C)(C)C',
    options: [
  { text: 'La acilación con cloruro de acetilo rinde betanecol, mientras que el calentamiento con urea en ácido sulfúrico concentrado rinde metacolina.' },
  { text: 'La reacción con isocianato de metilo rinde metacolina, mientras que la esterificación de Fischer con ácido fórmico en medio ácido rinde betanecol.' },
  { text: 'La oxidación del carbinol secundario a cetona rinde metacolina, mientras que la aminación reductora posterior con amoníaco rinde betanecol.' },
  { text: 'La acilación del hidroxilo con anhídrido acético rinde metacolina, mientras que la carbamoilación vía fosgeno y amoníaco anhidro rinde betanecol.' }
    ],
    correctIndex: 3,
    explanation: 'Partimos del mismo 1-(trimetilamonio)propan-2-ol y la ruta se bifurca únicamente en la naturaleza del acilo que colgamos del hidroxilo secundario. Con anhídrido acético o cloruro de acetilo obtenemos el éster acético, es decir la metacolina, que sigue siendo sustrato de la acetilcolinesterasa aunque se hidroliza bastante más despacio que la acetilcolina por el impedimento del metilo en beta. Si en cambio activamos el alcohol con fosgeno y tratamos el cloroformiato con amoníaco anhidro obtenemos el carbamato, el betanecol, resistente a la esterasa porque el par solitario del nitrógeno se deslocaliza sobre el carbonilo y le resta carácter electrófilo. El distractor a invierte ambas rutas: es el error más repetido en el examen.',
    difficulty: 'Medio'
  },
  {
    id: 't01-a-15',
    topicId: 'tema-01',
    block: 'Bloque 5 · Síntesis Directa: Metacolina y Betanecol',
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


// MODELO E TEST QUESTIONS
export const MODELO_E_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 't01-e-01',
    topicId: 'tema-01',
    block: 'Bloque 1 · Neurotransmisión y Biosíntesis',
    badge: 'Biosíntesis ChAT Presináptica',
    question: 'En el sistema colinérgico, la acetilcolina ejerce su función como neurotransmisor primordial tanto en el sistema autónomo como en la placa motora. Observe su estructura molecular. ¿Mediante qué mecanismo enzimático específico tiene lugar su biosíntesis en el terminal presináptico a partir de precursores metabólicos?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
      { text: 'Transferencia de un resto acetilo desde el Acetil-CoA hacia la colina catalizada por la colina acetiltransferasa presináptica.' },
      { text: 'Condensación oxidativa de etanolamina con acetato libre dependiente de ATP mediante ligasas microsómicas citoplasmáticas.' },
      { text: 'Descarboxilación enzimática de serina unida a acetato por acción directa de la fosfatidilcolina descarboxilasa neuronal.' },
      { text: 'Metilación de fosfatidiletanolamina acoplada a una transacetilación espontánea no enzimática en las vesículas sinápticas.' }
    ],
    correctIndex: 0,
    explanation: 'La biosíntesis de acetilcolina (AcC) tiene lugar en el citoplasma del terminal axonal presináptico mediante la transferencia directa de un grupo acetilo desde el Acetil-CoA hacia el grupo hidroxilo de la colina, reacción catalizada selectivamente por la enzima colina acetiltransferasa (ChAT). La colina requerida proviene de la recaptación presináptica mediante el transportador de alta afinidad (CHT1) o de la hidrólisis de lecitinas de membrana. En cuanto a los distractores: • Opción B: La biosíntesis no transcurre por condensación directa de etanolamina libre con acetato, sino por transacetilación enzimática sobre colina ya cuaternizada. • Opción C: No existe una ruta de descarboxilación directa de acetil-serina; la síntesis de colina endógena implica metilaciones sucesivas de fosfolípidos. • Opción D: La acetilación en la sinapsis no es un proceso espontáneo vesicular, sino una catálisis citoplasmática estricta mediada por ChAT antes del llenado vesicular.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-02',
    topicId: 'tema-01',
    block: 'Bloque 2 · SAR de Agonistas Colinérgicos',
    badge: 'Sinergia Estérica y Resonancia',
    question: 'Al analizar la relación estructura-actividad de los agonistas colinérgicos directos, el betanecol presenta una estabilidad metabólica extraordinariamente superior a la acetilcolina, permitiendo su administración oral. ¿Qué combinación de factores estructurales justifica rigurosamente su resistencia a la hidrólisis por la acetilcolinesterasa?',
    questionSmiles: 'CC(C[N+](C)(C)C)OC(=O)N',
    options: [
      { text: 'La presencia de un grupo éter cíclico rígido que protege al enlace carboxílico y la inclusión de dos cadenas metilo sobre el nitrógeno catiónico.' },
      { text: 'La deslocalización del par libre amídico sobre el carbonilo y el impedimento estérico que el metilo beta ejerce sobre el ataque de Ser-203.' },
      { text: 'La protonación reversible de la amina terciaria y la ausencia de carga formal neta positiva sobre la cabeza polar a pH fisiológico tisular.' },
      { text: 'La sustitución del resto acilo por un grupo fosfonato neutro que bloquea irreversiblemente la entrada al bolsillo catalítico de la esterasa.' }
    ],
    correctIndex: 1,
    explanation: 'El betanecol presenta una doble protección sinérgica: (1) Protección electrónica: el grupo carbamato (-O-CO-NH2) aporta el par de electrones no enlazantes del nitrógeno por resonancia mesómera al carbonilo, reduciendo drásticamente su electrofilia. (2) Protección estérica: el grupo metilo situado sobre el carbono beta apantalla físicamente el acceso del residuo catalítico Ser-203 de la AChE, ralentizando la velocidad de acilación. En cuanto a los distractores: • Opción A: El betanecol no posee éteres cíclicos ni tiene dos metilos en el nitrógeno (es un catión trimetilamonio cuaternario acíclico). • Opción C: El betanecol posee una carga formal positiva fija independiente del pH al ser una sal de amonio cuaternario. • Opción D: El betanecol es un carbamato de colina sustituido, careciendo por completo de funciones fosfonato u organofosforadas.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-03',
    topicId: 'tema-01',
    block: 'Bloque 3 · Estereoquímica y Eudismia',
    badge: 'Eudismia Metacolina / Muscarina',
    question: 'La introducción de un centro estereogénico en el carbono beta de la acetilcolina origina los enantiómeros (S)-metacolina y (R)-metacolina. ¿Cuál es la razón fisicoquímica por la cual el eutómero (S) es aproximadamente 250 veces más potente sobre receptores muscarínicos que el distómero (R)?',
    questionSmiles: 'C[C@@H](C[N+](C)(C)C)OC(=O)C',
    options: [
      { text: 'Porque el isómero (S) adopta exclusivamente una disposición antiperiplanar forzada que interacciona selectivamente con el canal nicotínico.' },
      { text: 'Porque la hidrólisis por la colinesterasa destruye instantáneamente al enantiómero (R) en plasma sin permitir que alcance la biofase tisular.' },
      { text: 'Porque la disposición tridimensional del eutómero (S) mimetiza con alta fidelidad la orientación espacial de la (+)-(2S,4R,5S)-muscarina.' },
      { text: 'Porque el grupo metilo en configuración (S) establece un enlace covalente transitorio con la treonina presente en la entrada del receptor.' }
    ],
    correctIndex: 2,
    explanation: 'El eutómero (S)-metacolina presenta una disposición espacial quiral que superpone con precisión sus centros farmacofóricos con los centros 2 y 5 de la (+)-(2S,4R,5S)-muscarina natural, encajando óptimamente en el modelo de fijación multipunto del receptor muscarínico sin choques estéricos. En cuanto a los distractores: • Opción A: El eutómero (S)-metacolina es selectivo muscarínico, no nicotínico; el derivado alfa-metilado es el que muestra preferencia nicotínica. • Opción B: Ambos enantiómeros son hidrolizados a velocidades similares; la eudismia radica en la afinidad intrínseca por el receptor muscarínico. • Opción D: La unión a receptores GPCR muscarínicos es reversible y no covalente (fuerzas de Coulomb, puentes de hidrógeno y fuerzas de van der Waals).',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-04',
    topicId: 'tema-01',
    block: 'Bloque 4 · Farmacóforos y Bioisostería',
    badge: 'Regla de Ing y Volumen Catiónico',
    question: 'La regla de los cinco átomos de Ing establece que para mantener una actividad agonista colinérgica potente, la cadena unida al nitrógeno no debe sobrepasar cinco átomos. Si se reemplazan los tres grupos metilo del catión trimetilamonio de la acetilcolina por tres cadenas etilo (derivado trietílico), ¿qué consecuencia molecular directa se observa?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
      { text: 'La molécula pierde prácticamente toda afinidad por colapso de la atracción electrostática e incremento del volumen estérico del catión.' },
      { text: 'La molécula se transforma en un agonista nicotínico irreversible de gran potencia por sobreactivación alostérica de la subunidad alfa.' },
      { text: 'La velocidad de hidrólisis enzimática por acetilcolinesterasa se incrementa mil veces debido a la mayor acidez del protón beta residual.' },
      { text: 'La afinidad muscarínica se mantiene intacta porque el nitrógeno conserva íntegramente su carga formal catiónica en solución fisiológica.' }
    ],
    correctIndex: 0,
    explanation: 'La interacción catiónica se rige por la ley de Coulomb: F = (q1*q2)/(4*pi*eps*r^2). En la acetilcolina, los tres metilos encajan en un microentorno anhidro (eps ≈ 2-4) a una distancia óptima r ≈ 3.2 Å. Al sustituir por trietilo, el choque estérico desplaza la cabeza catiónica (r > 7 Å) y permite la entrada de agua (eps ≈ 80), colapsando la atracción electrostática y perdiendo la actividad agonista. En cuanto a los distractores: • Opción B: El derivado trietílico no sobreactiva receptores nicotínicos; el aumento de volumen en el amonio genera antagonismo o pérdida total de afinidad. • Opción C: El derivado trietílico es hidrolizado mucho más lentamente por la AChE debido a la incapacidad de acomodarse en la hendidura aromática de Trp-84. • Opción D: Mantener la carga formal no basta: el radio estérico y la exclusión de agua de solvatación son requisitos estrictos del bolsillo activo.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-05',
    topicId: 'tema-01',
    block: 'Bloque 5 · Síntesis Industrial Directa',
    badge: 'Síntesis Carbacol (Fosgeno/NH3)',
    question: 'En la síntesis orgánica industrial del carbacol a partir de 2-cloroetanol, identifique la secuencia de reactivos y el mecanismo de la etapa intermedia que permite transformar el alcohol primario en el éster carbámico terminal antes de la cuaternización final:',
    questionSmiles: 'C[N+](C)(C)CCOC(=O)N.[Cl-]',
    options: [
      { text: 'Tratamiento sucesivo con anhídrido acético y dimetilamina mediante sustitución electrófila catalizada por bases de Lewis anhidras.' },
      { text: 'Tratamiento con fosgeno para dar cloroformiato de 2-cloroetilo y posterior adición-eliminación con amoniaco gas con salida de cloruro.' },
      { text: 'Reacción directa con cianato potásico en ácido acético glacial mediante transposición concertada de tipo Hofmann sobre el enlace éter.' },
      { text: 'Acilación con cloruro de acetilo seguida de nitración aromática y reducción selectiva con borohidruro sódico en medio alcohólico básico.' }
    ],
    correctIndex: 1,
    explanation: 'La síntesis industrial de carbacol transcurre en dos fases: (1) Reacción de 2-cloroetanol con fosgeno (COCl2), generando el intermedio cloroformiato de 2-cloroetilo (Cl-CH2-CH2-O-CO-Cl). (2) Tratamiento con amoniaco gas en exceso, donde el amoniaco actúa como nucleófilo en una sustitución nucleófila acílica expulsando cloruro para formar carbamato de 2-cloroetilo, el cual se cuaterniza con trimetilamina. En cuanto a los distractores: • Opción A: El anhídrido acético generaría un éster acetato (acetilcolina), no carbamato, y la dimetilamina daría un carbamato dimetilado. • Opción C: El cianato potásico se emplea para generar ureas en medios acuosos, no para la síntesis industrial del éster carbámico del carbacol. • Opción D: El cloruro de acetilo rinde acetatos y la nitración aromática no aplica sobre una molécula alifática carente de anillos aromáticos.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-06',
    topicId: 'tema-01',
    block: 'Bloque 6 · Síntesis Industrial Directa',
    badge: 'Síntesis Metacolina (Reducción/Ac2O)',
    question: 'En la preparación industrial de metacolina a partir de la bromación de acetona y posterior reacción con trimetilamina, se genera una cetona cuaternaria que debe ser transformada en el fármaco final. ¿Qué secuencia de reactivos completa la reducción y la funcionalización del grupo éster?',
    questionSmiles: 'CC(C[N+](C)(C)C)OC(=O)C',
    options: [
      { text: 'Oxidación con permanganato potásico a carboxilato cuaternario y esterificación directa con metanol en reflujo con ácido sulfúrico.' },
      { text: 'Tratamiento con fosgeno gaseoso a baja temperatura y posterior desplazamiento nucleófilo con dimetilamina en etanol absoluto.' },
      { text: 'Hidrólisis alcalina con hidróxido sódico acuoso concentrado y posterior condensación deshidratante con cloruro de carbamoilo seco.' },
      { text: 'Reducción de la cetona con borohidruro sódico para dar el alcohol secundario y posterior acetilación con anhídrido acético anhidro.' }
    ],
    correctIndex: 3,
    explanation: 'La síntesis industrial de metacolina procede mediante la reducción de la cetona cuaternaria (con NaBH4 o LiAlH4) rindiendo el alcohol secundario cuaternario 1-(trimetilamonio)propan-2-ol. A continuación, la reacción de este alcohol con anhídrido acético ((CH3CO)2O) rinde cuantitativamente el éster acetato de metacolina. En cuanto a los distractores: • Opción A: La oxidación de la cetona rompería el esqueleto carbonado o generaría ácidos carboxílicos incompatibles con la estructura de colina. • Opción B: El tratamiento con fosgeno y aminas se reserva para la síntesis de carbamatos (betanecol o carbacol), no para el éster acetato de metacolina. • Opción C: La hidrólisis no reduce la cetona y el cloruro de carbamoilo generaría betanecol, no metacolina.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-07',
    topicId: 'tema-01',
    block: 'Bloque 7 · Síntesis Industrial Directa',
    badge: 'Síntesis Betanecol (SN2)',
    question: 'Observe la estructura del 1-cloropropan-2-ol de partida. Para obtener el fármaco betanecol a través de la formación de un cloroformiato reactivo, ¿cuál es la secuencia correcta de reactivos que permite introducir sucesivamente la función carbamato terminal y la cabeza catiónica de amonio?',
    questionSmiles: 'CC(O)CCl',
    options: [
      { text: 'Adición directa de cianamida en medio fuertemente alcalino y posterior neutralización con ácido clorhídrico gaseoso anhidro.' },
      { text: 'Condensación con urea bajo reflujo de tolueno anhidro catalizada por cantidades estequiométricas de trifluoruro de boro eterato.' },
      { text: 'Reacción con fosgeno seguida de amoniaco para formar el carbamato y posterior desplazamiento del cloruro con trimetilamina.' },
      { text: 'Tratamiento sucesivo con isocianato de metilo en diclorometano y posterior hidrólisis ácida suave con ácido sulfúrico diluido.' }
    ],
    correctIndex: 2,
    explanation: 'A partir de 1-cloropropan-2-ol, el alcohol secundario se trata con fosgeno (COCl2) para formar el cloroformiato intermedio. El tratamiento con amoniaco (NH3) rinde el carbamato de 1-cloropropan-2-ilo mediante adición-eliminación acílica. Finalmente, la sustitución nucleófila bimolecular (SN2) del átomo de cloro con trimetilamina (N(CH3)3) introduce el catión amonio cuaternario rindiendo betanecol. En cuanto a los distractores: • Opción A: La cianamida genera derivados guanidínicos, no ésteres carbámicos alifáticos. • Opción B: La transesterificación con urea requiere temperaturas extremas que degradan térmicamente los sustratos clorados o cuaternarios. • Opción D: El isocianato de metilo generaría un N-metilcarbamato, mientras que el betanecol posee un carbamato primario no sustituido (-NH2).',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-08',
    topicId: 'tema-01',
    block: 'Bloque 8 · Arquitectura Activa de AChE',
    badge: 'Tríada y Anclaje Iónico AChE',
    question: 'El bolsillo de unión de la acetilcolinesterasa (AChE) está dividido en un sitio aniónico y un sitio esterásico. ¿Qué dos aminoácidos específicos del centro activo establecen, respectivamente, la atracción electrostática con el amonio cuaternario y el enlace de hidrógeno orientador con el oxígeno carbonílico de la acetilcolina?',
    questionSmiles: 'CC(=O)OCC[N+](C)(C)C',
    options: [
      { text: 'Un residuo de Glutamato catalítico en el sitio esterásico y un residuo de Triptófano terminal en la entrada superior del canal.' },
      { text: 'Un residuo de Aspartato en el sitio aniónico y un residuo de Tirosina en el sitio esterásico que fija por enlace H al grupo éster.' },
      { text: 'Un residuo de Lisina desprotonada en la garganta hidrófoba y un residuo de Cisteína que forma un enlace tioéter transitorio.' },
      { text: 'Un residuo de Arginina cargado positivamente en el fondo del bolsillo y un residuo de Fenilalanina que fija por apilamiento pi.' }
    ],
    correctIndex: 1,
    explanation: 'La acetilcolina se fija en el centro activo de la AChE mediante dos interacciones clave: (1) Enlace electrostático/iónico a un residuo de Aspartato (Asp) en el sitio aniónico de la cavidad, y (2) Enlace de hidrógeno donado por el hidroxilo fenólico de un residuo de Tirosina (Tyr) en el sitio esterásico hacia el oxígeno carbonílico del éster, polarizándolo y facilitando el ataque nucleofílico. En cuanto a los distractores: • Opción A: El glutamato interviene asistiendo a la histidina en la tríada catalítica profunda, pero la fijación aniónica descrita en el sitio de anclaje es el Aspartato. • Opción C: La lisina cargada positivamente repelería electrostáticamente al catión amonio cuaternario. • Opción D: La arginina posee carga positiva neta, causando fuerte repulsión con el catión trimetilamonio del sustrato.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-09',
    topicId: 'tema-01',
    block: 'Bloque 9 · Mecanismo Catalítico de AChE',
    badge: 'Catálisis Ser-203 / His-440',
    question: 'En el mecanismo catalítico de hidrólisis de la acetilcolina por la AChE, la reacción transcurre a través de tres fases: ataque nucleófilo, acetilación con liberación de colina y desacetilación por agua. ¿Cuál es el papel mecanístico exacto que desempeñan la Serina y la Histidina a lo largo de este ciclo catalítico?',
    questionSmiles: 'C[N+](C)(C)CCO',
    options: [
      { text: 'La Serina actúa como nucleófilo principal y la Histidina actúa como catalizador ácido/base asistiendo el ataque y la desacetilación.' },
      { text: 'La Histidina actúa exclusivamente como barrera estérica y la Serina dona un protón al agua para inactivar irreversiblemente el carbonilo.' },
      { text: 'La Serina actúa como electrófilo oxidante y la Histidina como grupo saliente que se libera al medio acuoso durante la fase de acetilación.' },
      { text: 'Ambos aminoácidos forman un enlace disulfuro covalente que almacena transitoriamente el resto acetilo antes de liberarlo como acetato.' }
    ],
    correctIndex: 0,
    explanation: 'La Serina (Ser-203) actúa como nucleófilo principal cuyo grupo hidroxilo ataca al carbonilo del éster formando el intermediario covalente acetil-enzima. Por sí sola es un nucleófilo débil, por lo que requiere indispensablemente a la Histidina (His-440), que actúa como catalizador ácido/base general desprotonando a la serina para aumentar su nucleofilia y asistiendo la desacetilación con agua. En cuanto a los distractores: • Opción B: La histidina no es una simple barrera estérica sino el catalizador ácido-base activo imprescindible para desprotonar a la serina. • Opción C: La serina no es un oxidante sino un nucleófilo hidroxílico, y la histidina es un residuo catalítico fijo del enzima que nunca se libera. • Opción D: Ni la serina ni la histidina poseen grupos tiol (-SH), por lo que no pueden formar puentes disulfuro.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-10',
    topicId: 'tema-01',
    block: 'Bloque 10 · Reactivadores Oxímicos',
    badge: 'Reactivación Pralidoxima (2-PAM)',
    question: 'Tras la intoxicación con agentes nerviosos organofosforados como el sarín, la Ser-203 de la AChE queda fosforilada covalentemente. Si se administra precozmente pralidoxima (2-PAM), se produce la regeneración enzimática activa. ¿Cuál es el mecanismo químico exacto de esta desfosforilación?',
    questionSmiles: 'C[N+]1=CC=CC=C1C=NO',
    options: [
      { text: 'El nitrógeno piridínico realiza una sustitución electrófila sobre el átomo de fósforo con expulsión inmediata del oxígeno de serina.' },
      { text: 'La molécula se descompone liberando gas amoniaco que desprotona el complejo enzima-inhibidor revirtiendo la unión por retro-adición.' },
      { text: 'El resto metilo cuaternario transfiere una carga negativa al bolsillo catalítico induciendo la hidrólisis ácida instantánea del éster.' },
      { text: 'El grupo oxima desprotonado actúa como un potente nucleófilo que ataca al átomo de fósforo desplazando al residuo Ser-203 como saliente.' }
    ],
    correctIndex: 3,
    explanation: 'La pralidoxima (PAM) consta de una cabeza catiónica de piridinio que se ancla en el sitio aniónico de la AChE, orientando el grupo oxima (=N-OH) hacia el fósforo. El anión oximato (nucleófilo muy potente por efecto alfa) ataca al fósforo del organofosforado, formando un fosfato-oxima y regenerando el grupo hidroxilo de la Serina activa. En cuanto a los distractores: • Opción A: El nitrógeno del piridinio está cuaternizado (-N+(CH3)-) y carece de pares de electrones para atacar como nucleófilo; el ataque lo realiza el oxígeno oximato. • Opción B: La pralidoxima es térmicamente estable a pH 7.4 y no libera amoniaco gaseoso in vivo. • Opción C: Los metilos cuaternarios no transfieren electrones ni provocan hidrólisis ácida.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-11',
    topicId: 'tema-01',
    block: 'Bloque 11 · Fenómeno de Aging',
    badge: 'Aging y Repulsión Electrostática',
    question: 'La eficacia de los reactivadores oxímicos (2-PAM) disminuye con el tiempo transcurrido tras la exposición al tóxico organofosforado debido al fenómeno denominado \'envejecimiento\' (aging) de la enzima. ¿Qué transformación química define este proceso e impide la reactivación nucleofílica?',
    questionSmiles: 'CC(C)OP(=O)(C)F',
    options: [
      { text: 'La oxidación irreversible del azufre tiofílico a sulfonato aromático por acción de oxigenasas hepáticas de fase I microsómicas.' },
      { text: 'La desnaturalización térmica de la subunidad alfa del canal iónico nicotínico con colapso permanente del poro transmembrana.' },
      { text: 'La rotura de una unión éster alcoxílica con formación de una carga negativa sobre el fósforo que repele electrostáticamente a la oxima.' },
      { text: 'La polimerización intermolecular de los residuos de histidina adyacentes formando un entramado insoluble en el fondo de la hendidura.' }
    ],
    correctIndex: 2,
    explanation: 'El envejecimiento de la AChE fosforilada consiste en la hidrólisis no enzimática de una de las uniones alcoxi unidas al fósforo (ej. pérdida de isopropanol en sarín). Esto genera un átomo de oxígeno desprotonado (-P-O(-)) cuya carga negativa estabiliza el enlace fósforo-enzima y repele electrostáticamente a la oxima nucleófila, bloqueando irreversiblemente la reactivación. En cuanto a los distractores: • Opción A: El sarín es un fluorofosfonato sin azufre y el envejecimiento ocurre espontáneamente en la biofase tisular sin enzimas hepáticas. • Opción B: El envejecimiento afecta a la enzima hidrolítica acetilcolinesterasa, no al receptor canal nicotínico. • Opción D: No existe polimerización proteica; la enzima conserva su estructura pero el fósforo queda químicamente apantallado por la carga negativa.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-12',
    topicId: 'tema-01',
    block: 'Bloque 12 · Inhibidores Carbámicos (BHE)',
    badge: 'Fisostigmina vs Neostigmina (BHE)',
    question: 'La fisostigmina y la neostigmina son dos inhibidores carbámicos de la acetilcolinesterasa utilizados en clínica. Sin embargo, la fisostigmina es eficaz en intoxicaciones anticolinérgicas centrales mientras que la neostigmina se restringe a patologías periféricas como la miastenia gravis. ¿Qué rasgo estructural justifica esta diferencia?',
    questionSmiles: 'CN(C)C(=O)OC1=CC=CC(=C1)[N+](C)(C)C',
    options: [
      { text: 'La fisostigmina presenta un grupo carbamato terciario resistente mientras que la neostigmina se hidroliza de forma espontánea en el estómago.' },
      { text: 'La fisostigmina posee una amina terciaria capaz de cruzar la BHE mientras que la neostigmina tiene un catión cuaternario permanente.' },
      { text: 'La neostigmina carece de anillo aromático y se elimina por excreción biliar sin alcanzar los receptores de la unión neuromuscular.' },
      { text: 'La fisostigmina actúa como un inhibidor irreversible alcohólico y la neostigmina como un reactivador reversible del residuo de serina.' }
    ],
    correctIndex: 1,
    explanation: 'La fisostigmina posee un nitrógeno amínico terciario que a pH fisiológico (7.4) existe parcialmente en forma neutra no ionizada lipófila, cruzando la barrera hematoencefálica (BHE) y ejerciendo efectos en el SNC. En cambio, la neostigmina porta un catión amonio cuaternario permanente con carga neta positiva, impidiendo su difusión a través de la BHE y restringiendo su acción a la placa motora y vísceras periféricas. En cuanto a los distractores: • Opción A: Ambos compuestos poseen enlaces carbamato estables; el carbamato dimetílico de la neostigmina es incluso más estable frente a la hidrólisis espontánea. • Opción C: La neostigmina posee un anillo bencénico sustituido (m-dimetilcarbamoiloxifeniltrimetilamonio) esencial para su fijación. • Opción D: Ambos son inhibidores carbámicos pseudoirreversibles; ninguno es un reactivador ni fosforilador.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-13',
    topicId: 'tema-01',
    block: 'Bloque 13 · Inhibidores Reversibles (Alzheimer)',
    badge: 'Donepezilo: Unión No Covalente',
    question: 'El donepezilo es un fármaco ampliamente prescrito en el tratamiento de la enfermedad de Alzheimer. A diferencia de los carbamatos (como la neostigmina) y de los organofosforados (como el sarín), ¿qué tipo de inhibición enzimática ejerce sobre la acetilcolinesterasa?',
    questionSmiles: 'COC1=C(C=C2C(=C1)CC(C2=O)CC3CCN(CC3)CC4=CC=CC=C4)OC',
    options: [
      { text: 'Es un inhibidor irreversible que alquila covalentemente los residuos de histidina periféricos impidiendo la catálisis ácida.' },
      { text: 'Es un inhibidor suicida o de transición que fosforila irreversiblemente el hidroxilo de la serina catalítica del bolsillo.' },
      { text: 'Es un inhibidor reversible no covalente que bloquea la enzima sin transferir restos acilo, carbamato o fosforilo a la serina.' },
      { text: 'Es un inhibidor pseudoirreversible que carbamoila covalentemente el sitio esterásico requiriendo horas para su hidrólisis.' }
    ],
    correctIndex: 2,
    explanation: 'El donepezilo es un inhibidor reversible y puramente no covalente de la acetilcolinesterasa. A diferencia de los carbamatos (que actúan como inhibidores pseudoirreversibles al carbamoilar covalentemente la serina con una hidrólisis lenta de varias horas) o de los organofosforados (que fosforilan irreversiblemente la serina), el donepezilo se fija al bolsillo activo mediante interacciones no covalentes (puentes de hidrógeno, apilamiento aromático e interacciones hidrófobas), bloqueando el acceso al sustrato sin formar ningún enlace covalente con la enzima. En cuanto a los distractores: • Opción A: El donepezilo no alquila covalentemente residuos de la enzima; su unión es de naturaleza puramente no covalente y reversible. • Opción B: La fosforilación covalente irreversible de la serina catalítica corresponde a los agentes nerviosos e insecticidas organofosforados (sarín, DFP). • Opción D: La carbamoilación covalente de vida media prolongada (inhibición pseudoirreversible) es el mecanismo característico de los carbamatos (neostigmina, fisostigmina).',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-14',
    topicId: 'tema-01',
    block: 'Bloque 14 · Bioisosterismo en Antagonistas',
    badge: 'Trihexifenidilo: Alcohol Terciario',
    question: 'Para superar la susceptibilidad a la hidrólisis del enlace éster carboxílico presente en la atropina y sus derivados sintéticos, se desarrollaron análogos bioisostéricos de vida media más prolongada. ¿Qué fármacos antiparkinsonianos representan la sustitución del éster por una función alcohol terciario lipófilo?',
    questionSmiles: 'C1CCC(CC1)C(CCN2CCCCC2)(C3=CC=CC=C3)O',
    options: [
      { text: 'El trihexifenidilo y el biperideno, donde el resto carbinol terciario y la amina terciaria mantienen la afinidad sin enlaces éster.' },
      { text: 'La isopropamida y el carbetopentano, donde la sustitución del oxígeno éster se efectúa mediante enlaces tioéter altamente oxidados.' },
      { text: 'La piridostigmina y el edrofonio, donde la función alcohol se encuentra bloqueada por derivados fosforados de liberación sostenida.' },
      { text: 'La metacolina y el betanecol, donde la hidrólisis se impide mediante la incorporación de anillos de oxirano parcialmente reducidos.' }
    ],
    correctIndex: 0,
    explanation: 'El trihexifenidilo y el biperideno sustituyen el enlace éster hidrolizable (-COO-) por un alcohol terciario alifático (-C(OH)-) flanqueado por anillos voluminosos (fenilo y ciclohexilo o norbornenilo) y una piperidina básica. Al carecer de función éster, no son hidrolizados por esterasas plasmáticas y cruzan con facilidad la BHE para bloquear la hiperactividad colinérgica en el Parkinson. En cuanto a los distractores: • Opción B: La isopropamida es una carboxamida cuaternaria periférica, no un alcohol terciario antiparkinsoniano. • Opción C: La piridostigmina es un inhibidor carbámico de la AChE y el edrofonio un fenol cuaternario simple. • Opción D: Metacolina y betanecol son agonistas colinérgicos (no antagonistas antiparkinsonianos) y no contienen oxiranos.',
    difficulty: 'Medio'
  },
  {
    id: 't01-e-15',
    topicId: 'tema-01',
    block: 'Bloque 15 · Antagonistas Nicotínicos (Curare)',
    badge: 'Tubocurarina: Distancia 1.4 nm (14 Å)',
    question: 'La tubocurarina es el alcaloide natural prototipo de los bloqueantes neuromusculares competitivos o no despolarizantes. Observe su estructura molecular bis-nitrogenada. ¿Qué parámetro estructural crítico determina la complementariedad y potencia de los bloqueantes curarizantes en el receptor nicotínico pentamérico?',
    questionSmiles: 'CN1CCC2=CC(=C3C=C2C1CC4=CC=C(C=C4)OC5=C6C(CC7=CC(=C(C=C7)O)O3)[N+](CCC6=CC(=C5O)OC)(C)C)OC',
    options: [
      { text: 'La presencia de un anillo lactónico insaturado unido en posición alfa a una sal cuaternaria de pirazol deslocalizada térmicamente.' },
      { text: 'La ausencia de carga formal catiónica en la molécula para permitir la difusión pasiva selectiva a través de los canales de sodio.' },
      { text: 'La inclusión obligatoria de dos enlaces tioéster alifáticos capaces de sufrir reducción enzimática por glutatión celular eritrocitario.' },
      { text: 'La distancia rígida inter-nitrógeno de aproximadamente 1.4 nm (14 Å) que separa a los dos centros catiónicos en la molécula.' }
    ],
    correctIndex: 3,
    explanation: 'La tubocurarina posee dos centros catiónicos (un catión amonio cuaternario permanente y una amina terciaria que se encuentra protonada a pH fisiológico) separados por una distancia rígida de 1.4 nm (14 Ångstroms). Esta distancia nicotínica canónica permite anclar simultáneamente los dos bolsillos de unión de las dos subunidades alfa del receptor pentamérico muscular de la placa motora, impidiendo su apertura. En cuanto a los distractores: • Opción A: La tubocurarina es un alcaloide bencilisoquinolínico bis-nitrogenado y carece por completo de anillos lactónicos de pirazol. • Opción B: La carga catiónica en ambos nitrógenos es imprescindible para la atracción electrostática hacia las subunidades alfa del receptor nicotínico. • Opción C: No contiene enlaces tioéster alifáticos; su esqueleto está compuesto por anillos bencénicos, éteres y piperidinas fusionadas.',
    difficulty: 'Medio'
  }
];

export const MODELO_FIR_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 't01-fir-01',
    topicId: 'tema-01',
    block: 'SAR Agonistas & Bioisosterismo',
    badge: 'FIR 2021 · P14 (Ministerio de Sanidad)',
    question: 'El carbacol es un análogo de acetilcolina que tiene en su estructura un grupo carbamato en lugar del grupo éster. ¿Qué consecuencias tiene esta sustitución?',
    options: [
      { text: 'El carbacol se hidroliza en medio ácido con mayor facilidad que la acetilcolina debido a la presencia del grupo carbamato.' },
      { text: 'El grupo carbamato confiere al carbacol estabilidad química y metabólica.' },
      { text: 'El grupo carbamato permite incrementar la afinidad por el receptor a través de una interacción π-π.' },
      { text: 'La sustitución bioisostérica del metilo por el grupo amino en el carbacol incrementa el efecto estérico, aumentando la afinidad por su diana terapéutica.' }
    ],
    correctIndex: 1,
    explanation: 'Respuesta oficial del Ministerio de Sanidad (Opción B): El grupo carbamato confiere al carbacol estabilidad química y metabólica. El par solitario del nitrógeno amínico del carbamato cede densidad electrónica por resonancia al carbono carbonílico (-O-CO-NH₂ ↔ -O-C(O⁻)=N⁺H₂). Esto deslocaliza la carga y neutraliza parcialmente la deficiencia electrónica del carbonilo, reduciendo drásticamente su susceptibilidad al ataque nucleofílico del residuo catalítico Ser-203 de la acetilcolinesterasa y frente a la hidrólisis acuosa.',
    difficulty: 'Fácil'
  },
  {
    id: 't01-fir-02',
    topicId: 'tema-01',
    block: 'SAR Agonistas & Bioisosterismo',
    badge: 'FIR 2022 · P17 (Ministerio de Sanidad)',
    question: 'En el diseño de fármacos, la sustitución de una función éster por un grupo carbamato, ¿qué consecuencia tiene?',
    options: [
      { text: 'Un aumento de la lipofilia y, por tanto, mejor absorción oral.' },
      { text: 'Una disminución de la vida media plasmática.' },
      { text: 'Un aumento de la estabilidad metabólica.' },
      { text: 'Un incremento drástico del impedimento estérico.' }
    ],
    correctIndex: 2,
    explanation: 'Respuesta oficial del Ministerio de Sanidad (Opción C): Un aumento de la estabilidad metabólica. La sustitución bioisostérica de un enlace éster (-COO-) por un éster carbámico o carbamato (-O-CO-NH- o -O-CO-NR₂) reduce la velocidad de hidrólisis enzimática por esterasas plasmáticas y tisulares, prolongando la acción farmacológica. Esta estrategia es clave en colinérgicos (carbacol, betanecol) e inhibidores de AChE (neostigmina, rivastigmina).',
    difficulty: 'Fácil'
  },
  {
    id: 't01-fir-03',
    topicId: 'tema-01',
    block: 'Bloqueantes Neuromusculares',
    badge: 'FIR 2020 · P4 (Ministerio de Sanidad)',
    question: '¿Qué es el suxametonio (succinilcolina) respecto al decametonio?',
    options: [
      { text: 'Un profármaco activable por esterasas.' },
      { text: 'Un análogo blando.' },
      { text: 'Un antagonista competitivo reversible.' },
      { text: 'Un análogo más lipófilo para penetrar la barrera hematoencefálica.' }
    ],
    correctIndex: 1,
    explanation: 'Respuesta oficial del Ministerio de Sanidad (Opción B): Un análogo blando (soft drug). El decametonio es un bloqueante neuromuscular despolarizante bis-amónico con cadena hidrocarbonada de 10 metilenos que producía parálisis prolongada no reversible. El suxametonio (succinilcolina) se diseñó incorporando dos funciones éster centrales que lo convierten en un fármaco biológicamente activo pero que sufre una metabolización predecible y ultra-rápida (5-10 minutos) por pseudocolinesterasas plasmáticas rindiendo succinato y colina inocuos.',
    difficulty: 'Medio'
  },
  {
    id: 't01-fir-04',
    topicId: 'tema-01',
    block: 'Bloqueantes Neuromusculares',
    badge: 'FIR 2022 · P12 (Ministerio de Sanidad)',
    question: 'El atracurio es un bloqueante neuromuscular análogo sintético de la tubocurarina que se inactiva rápidamente en la sangre (pH = 7.4) por una reacción de:',
    options: [
      { text: 'Hidrólisis enzimática de un grupo carbamato.' },
      { text: 'Desmetilación oxidativa de la sal de amonio cuaternario.' },
      { text: 'Oxidación hepática del heterociclo tetrahidroisoquinolina por CYP3A4.' },
      { text: 'Eliminación de Hofmann.' }
    ],
    correctIndex: 3,
    explanation: 'Respuesta oficial del Ministerio de Sanidad (Opción D): Eliminación de Hofmann. El atracurio fue diseñado para autoinactivarse a pH (7.4) y temperatura (37 °C) fisiológicos mediante una fragmentación de eliminación de Hofmann (β-eliminación facilitada por el grupo carbonilo electroatrayente vecino al carbono β). Este proceso no enzimático permite su empleo seguro en pacientes con insuficiencia renal o hepática grave.',
    difficulty: 'Medio'
  },
  {
    id: 't01-fir-05',
    topicId: 'tema-01',
    block: 'Bloqueantes Neuromusculares',
    badge: 'FIR 2022 · P13 (Ministerio de Sanidad)',
    question: '¿Cuáles de los siguientes fragmentos deben estar presentes en la estructura de los antagonistas nicotínicos de la placa motora?',
    options: [
      { text: 'Dos restos de acetilcolina situados a una determinada distancia el uno del otro.' },
      { text: 'Un átomo de nitrógeno cuaternario, una función oxigenada y dos grupos apolares próximos a esta última.' },
      { text: 'Dos átomos de nitrógeno cargados unidos por un espaciador, de manera que estén situados a una distancia determinada el uno del otro.' },
      { text: 'Un nitrógeno cuaternario central y anillos aromáticos orto-sustituidos con grupos aceptores de electrones.' }
    ],
    correctIndex: 2,
    explanation: 'Respuesta oficial del Ministerio de Sanidad (Opción C): Dos átomos de nitrógeno cargados unidos por un espaciador, de manera que estén situados a una distancia determinada el uno del otro. El receptor nicotínico muscular pentamérico (α2βγδ) contiene dos sitios de unión ortostéricos situados en las interfases de las dos subunidades α. Los curares y bloqueantes neuromusculares bis-catiónicos exigen una distancia inter-nitrógeno rígida de ~1.4 nm (14 Ångstroms, o 10-12 carbonos) para puentear simultáneamente ambos sitios y provocar el bloqueo neuromuscular.',
    difficulty: 'Medio'
  },
  {
    id: 't01-fir-06',
    topicId: 'tema-01',
    block: 'Inhibidores & Reactivadores AChE',
    badge: 'FIR 2021 · P16 (Ministerio de Sanidad)',
    question: 'Para el diseño de los antídotos frente a los gases neurotóxicos organofosforados (sarín, tabún, somán), se utilizó la siguiente estrategia:',
    options: [
      { text: 'Diseñar compuestos derivados de hidroxilamina capaces de hidrolizar la posición fosforilada en la acetilcolinesterasa y reactivar así la enzima rápidamente.' },
      { text: 'Diseñar compuestos derivados de hidroxilamina capaces de hidrolizar el residuo acetilado en la acetilcolinesterasa y reactivar así la enzima de forma controlada.' },
      { text: 'Diseñar compuestos derivados de hidroxicloroquina que debido a su elevada electrofilia son capaces de hidrolizar el residuo carbamoilado en la acetilcolinesterasa reactivando rápidamente la enzima.' },
      { text: 'Diseñar compuestos derivados de hidrazina capaces de hidrolizar la posición carbamoilada en la acetilcolinesterasa y reactivar la enzima rápidamente.' }
    ],
    correctIndex: 0,
    explanation: 'Respuesta oficial del Ministerio de Sanidad (Opción A): Diseñar compuestos derivados de hidroxilamina capaces de hidrolizar la posición fosforilada en la acetilcolinesterasa y reactivar así la enzima rápidamente. La pralidoxima (2-PAM) posee un catión piridínico que se orienta en el sitio aniónico libre y sitúa su grupo oxima (=N-OH, derivado de hidroxilamina) próximo al átomo de fósforo electrofílico unido a la Ser-203. El anión oximato efectúa un ataque nucleofílico favorecido por el efecto alfa, desplazando el residuo fosforilado y regenerando la enzima libre activa antes del proceso de envejecimiento (aging).',
    difficulty: 'Medio'
  },
  {
    id: 't01-fir-07',
    topicId: 'tema-01',
    block: 'Antagonistas Muscarínicos',
    badge: 'FIR 2024 · P9 (Ministerio de Sanidad)',
    question: '¿Cuál de los siguientes fármacos con núcleo tricíclico ejerce su acción terapéutica principalmente por interacción antagonista con receptores muscarínicos (selectividad M1)?',
    imagePath: 'fir-images/FIR2024_9.jpg',
    options: [
      { text: 'El compuesto A (Clozapina / dibenzodiazepina antipsicótica).' },
      { text: 'El compuesto B (Clomipramina / dibenzoazepina antidepresiva).' },
      { text: 'El compuesto C (Clorpromazina / fenotiazina neuroléptica).' },
      { text: 'El compuesto D (Pirenzepina / piridobenzodiazepina antisecretora gástrica).' }
    ],
    correctIndex: 3,
    explanation: 'Respuesta oficial del Ministerio de Sanidad (Opción D): Pirenzepina (Compuesto D en la lámina oficial FIR 2024). Aunque comparte un esqueleto tricíclico condensado (núcleo de piridobenzodiazepina) con otros psicofármacos tricíclicos, la pirenzepina se diseñó como un antagonista selectivo de receptores muscarínicos M1. Bloquea los receptores muscarínicos en los ganglios intramurales gástricos reduciendo la secreción ácida gástrica sin penetrar en el SNC debido a su mayor polaridad hidrofílica.',
    difficulty: 'Avanzado'
  },
  {
    id: 't01-fir-08',
    topicId: 'tema-01',
    block: 'Inhibidores & Reactivadores AChE',
    badge: 'FIR 2021 · P7 (Ministerio de Sanidad)',
    question: 'En el estudio de inhibidores enzimáticos en química farmacéutica, ¿cómo se clasifica mecanísticamente la Rivastigmina (fármaco colinérgico para Alzheimer) frente a un inhibidor suicida como la Selegilina?',
    options: [
      { text: 'La rivastigmina es un inhibidor suicida porque requiere activación metabólica microsomal previa.' },
      { text: 'La rivastigmina es un inhibidor alostérico reversible no competitivo que no interacciona con la tríada catalítica.' },
      { text: 'La rivastigmina es un inhibidor pseudoirreversible o de transición lenta, que carbamila covalentemente la Ser-203 pero se regenera por decarbamilación lenta.' },
      { text: 'La rivastigmina es un análogo químicamente inerte que actúa exclusivamente como antagonista de canales de calcio.' }
    ],
    correctIndex: 2,
    explanation: 'Respuesta oficial y fundamentación mecanística: La rivastigmina transfiere su grupo carbamilo al residuo nucleofílico Ser-203 de la acetilcolinesterasa y butirilcolinesterasa formando un intermediario carbamoil-enzima covalente. La decarbamilación hidrolítica posterior es extraordinariamente lenta (semivida de varias horas), por lo que se comporta como un inhibidor pseudoirreversible (sustrato suicida de carbamilación), a diferencia de la selegilina que es un inhibidor suicida irreversible que forma enlace covalente irreversible con el cofactor FAD de la MAO-B.',
    difficulty: 'Medio'
  },
  {
    id: 't01-fir-09',
    topicId: 'tema-01',
    block: 'Inhibidores & Reactivadores AChE',
    badge: 'FIR 2025 · P18 (Ministerio de Sanidad)',
    question: '¿Cuál de las siguientes afirmaciones describe con exactitud el mecanismo de interacción molecular del Donepezilo con la Acetilcolinesterasa (AChE)?',
    options: [
      { text: 'Es un análogo del estado de transición que fosforila irreversiblemente el sitio activo.' },
      { text: 'Es un inhibidor no covalente reversible mixto que se une simultáneamente al centro catalítico (CAS) mediante apilamiento π con Trp-86 y al sitio aniónico periférico (PAS) con Trp-286.' },
      { text: 'Es un inhibidor suicida que forma un enlace covalente carbono-carbono con el cofactor enzimático.' },
      { text: 'Es un fármaco que actúa exclusivamente bloqueando la síntesis presináptica de colina acetiltransferasa.' }
    ],
    correctIndex: 1,
    explanation: 'Respuesta y fundamentación estructural: El donepezilo es un inhibidor reversible no covalente de segunda generación para la enfermedad de Alzheimer. Su molécula alargada spanning se aloja a lo largo de toda la garganta hidrofóbica de 20 Å de la AChE: el anillo aromático de indanona interactúa en el sitio aniónico periférico (PAS) cerca de Trp-286 en la superficie, mientras que el anillo de bencilpiperidina se extiende hasta la base de la garganta interactuando con Trp-86 (CAS), bloqueando estéricamente el paso de acetilcolina sin formar enlaces covalentes.',
    difficulty: 'Avanzado'
  },
  {
    id: 't01-fir-10',
    topicId: 'tema-01',
    block: 'SAR Agonistas & Bioisosterismo',
    badge: 'FIR 2025 · P3 (Ministerio de Sanidad)',
    question: 'El compuesto cuya estructura se representa a continuación incorpora un enlace éster intermedio en la cadena alifática hidrófoba respecto al cloruro de cetilpiridinio. ¿Qué concepto de diseño farmacoquímico representa esta estrategia?',
    imagePath: 'fir-images/FIR2025_3.jpg',
    options: [
      { text: 'Diseño de un profármaco hidrofílico para administración intravenosa.' },
      { text: 'Diseño de un análogo blando (soft drug) para limitar la toxicidad sistémica mediante degradación metabólica predecible por esterasas.' },
      { text: 'Diseño de un homólogo rígido para aumentar la selectividad por receptores nicotínicos.' },
      { text: 'Diseño de un bioisóstero no clásico resistente a la oxidación microsomal hepática.' }
    ],
    correctIndex: 1,
    explanation: 'Respuesta oficial del Ministerio de Sanidad (Opción B): Es un análogo blando. Los fármacos blandos (concepto introducido en química farmacéutica en derivados colinérgicos como la succinilcolina) son agentes terapéuticos activos diseñados de forma que contengan un punto de clivaje metabólico predecible (enlace éster lábil). Tras ejercer su acción tópica o superficial, las esterasas plasmáticas los escinden rápidamente en metabolitos inactivos no tóxicos, suprimiendo la absorción y toxicidad sistémica.',
    difficulty: 'Medio'
  }
];

export * from './tema02ExamsData';
import { TEMA2_MODELO_1_TEST_QUESTIONS } from './tema02ExamsData';

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
    slideCount: 19,
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
    slideCount: 59,
    pdbTargetId: '2HA4',
    targetName: 'Acetilcolinesterasa en complejo con Acetilcolina (AChE · ACh)',
    status: 'Publicado',
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 01: Diapositivas Oficiales Sistema Colinérgico.pdf',
    notesPdfUrl: 'https://drive.google.com/file/d/1h9jKvHzDiwjI0QWaHlqWjmgt1ImTNP2H/view?usp=drive_link',
    notesPdfName: 'Tema 01: Apuntes Magistrales de Fármacos Colinérgicos.pdf',
    geminiNotebookUrl: 'https://notebook.google.com/notebook/bb462eb7-e40b-42be-9356-f785b120b782',
    spotifyPodcastUrl: 'https://open.spotify.com/episode/7wNxoaxVPBMS5HvdSByor2?si=I3iZ3wb2STmRUHVWvlAUKw',
    videoPodcastUrl: 'https://open.spotify.com/episode/7wNxoaxVPBMS5HvdSByor2?si=I3iZ3wb2STmRUHVWvlAUKw',
    audioPodcastUrl: 'audio/podcast_colinergicos.mp3',
    audioPodcastName: 'Píldora Docente 01: Acetilcolina y Fármacos Colinérgicos (Audio MP3 · 6 min)',
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
        id: 'att-t01-podcast-audio',
        title: 'Píldora Docente de Audio 01: Transmisión y Fármacos Colinérgicos (Audio MP3 · 6 min)',
        type: 'audio',
        url: 'audio/podcast_colinergicos.mp3',
        size: '4.3 MB',
        date: '28/09/2026'
      },
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
        testQuestions: MODELO_E_TEST_QUESTIONS,

flashcards: [
      {
        id: 'fc-01-01',
        topicId: 'tema-01',
        concept: 'Regla de los Cinco Átomos de Ing',
        front: '¿En qué consiste la Regla de Ing para agonistas colinérgicos y cómo se numeran los 5 átomos de la cadena de la acetilcolina?',
        back: '**Regla de los Cinco Átomos de Ing:** Para una actividad agonista muscarínica óptima, la cadena principal unida al catión amonio cuaternario no debe sobrepasar 5 átomos de longitud (distancia exacta de la acetilcolina). Cadenas más largas superan las dimensiones del bolsillo del receptor, perdiendo afinidad agonista o actuando como antagonistas.\n\n**Numeración de los 5 átomos de la cadena (desde N⁺):**\n1. **Átomo 1:** Carbono α (-CH₂- unido directamente al nitrógeno)\n2. **Átomo 2:** Carbono β (-CH₂- espaciador etilénico)\n3. **Átomo 3:** Oxígeno del éster (-O-)\n4. **Átomo 4:** Carbono del carbonilo (-C=O)\n5. **Átomo 5:** Carbono del metilo terminal (-CH₃)\n\n**Efecto Trietilo:** Sustituir los 3 metilos por etilos desplaza el catión de r ≈ 3.2 Å a r > 7.5 Å de la cavidad receptora, permitiendo la intrusión de agua (la constante dieléctrica ε aumenta de ~3 a ~80) y colapsando la atracción de Coulomb (molécula inactiva).',
        smiles: 'CC(=O)OCC[N+](C)(C)C',
        imagePath: 'assets/tema-01/acetilcolina_regla_5_atomos.svg',
        difficulty: 'easy',
        category: 'SAR Agonistas'
      },
      {
        id: 'fc-01-02',
        topicId: 'tema-01',
        concept: 'Eudismia de la Metacolina ((S) vs (R))',
        front: '¿Por qué el enantiómero (S)-metacolina es ~250 veces más potente sobre receptores muscarínicos que el distómero (R)?',
        back: 'Porque la disposición espacial tridimensional de la **(S)-metacolina** mimetiza con fidelidad absoluta la conformación activa de la **(+)-(2S,4R,5S)-muscarina**, encajando perfectamente en los 3 puntos de fijación del receptor muscarínico sin choques estéricos.',
        smiles: 'C[C@@H](C[N+](C)(C)C)OC(=O)C',
        difficulty: 'easy',
        category: 'Estereoquímica'
      },
      {
        id: 'fc-01-03',
        topicId: 'tema-01',
        concept: 'Sinergia Estérica y Electrónica en Betanecol',
        front: '¿Qué modificaciones estructurales convierten al Betanecol en un agonista muscarínico oral resistente a la acetilcolinesterasa?',
        back: '1. **Protección Electrónica:** Grupo éster carbámico (-O-CO-NH₂), cuya resonancia amídica reduce el carácter electrófilo del carbonilo.\n2. **Protección Estérica:** Metilo en el carbono beta, que apantalla físicamente el acceso nucleofílico de la Ser-203 de la AChE.',
        smiles: 'CC(C[N+](C)(C)C)OC(=O)N',
        difficulty: 'medium',
        category: 'SAR Agonistas'
      },
      {
        id: 'fc-01-04',
        topicId: 'tema-01',
        concept: 'Aminoácidos Clave de la AChE y su Función Catalítica',
        front: '¿Cuáles son los 4 aminoácidos esenciales del centro activo de la Acetilcolinesterasa y qué papel molecular cumple cada uno?',
        back: '• **Aspartato (Asp):** Ubicado en el **sitio aniónico**, establece la atracción iónica esencial con el catión trimetilamonio de la acetilcolina.\n• **Tirosina (Tyr):** Ubicada en el **sitio esterásico**, dona un enlace de hidrógeno al oxígeno carbonílico, polarizándolo y orientando el sustrato.\n• **Serina (Ser):** Actúa como el **nucleófilo principal**, cuyo grupo hidroxilo ataca al éster para formar el intermediario covalente acetil-enzima.\n• **Histidina (His):** Funciona como **catalizador ácido/base general**, asistiendo indispensablemente a la serina en la acetilación y desacetilación.',
        structures: [
          { name: 'Aspartato (Asp)', smiles: 'N[C@@H](CC(=O)O)C(=O)O', badge: 'Sitio Aniónico' },
          { name: 'Tirosina (Tyr)', smiles: 'N[C@@H](Cc1ccc(O)cc1)C(=O)O', badge: 'Sitio Esterásico (H-bond)' },
          { name: 'Serina (Ser)', smiles: 'N[C@@H](CO)C(=O)O', badge: 'Nucleófilo Catalítico' },
          { name: 'Histidina (His)', smiles: 'N[C@@H](Cc1c[nH]cn1)C(=O)O', badge: 'Ácido/Base General' }
        ],
        difficulty: 'hard',
        category: 'Catálisis Enzimática'
      },
      {
        id: 'fc-01-05',
        topicId: 'tema-01',
        concept: 'Mecanismo de Desfosforilación por Pralidoxima (2-PAM)',
        front: '¿Cuál es el fundamento químico de la reactivación de la AChE fosforilada mediante Pralidoxima?',
        back: 'El catión piridínico de PAM se ancla en el sitio aniónico libre, situando el grupo oxima (=N-OH) en vecindad inmediata al fósforo. El anión oximato efectúa un ataque nucleofílico concertado (efecto alfa) desplazando la Ser-203 y regenerando la enzima libre activa.',
        smiles: 'C[N+]1=CC=CC=C1C=NO',
        imagePath: 'assets/tema-01/structure_image_70.png',
        difficulty: 'medium',
        category: 'Reactivadores'
      },
      {
        id: 'fc-01-06',
        topicId: 'tema-01',
        concept: 'Fenómeno de Envejecimiento (Aging) de la AChE',
        front: '¿Qué transformación química impide que un organofosforado sea revertido por oximas tras varias horas?',
        back: 'La **descalquilación hidrolítica** de una de las cadenas alcóxido unidas al fósforo. Esto genera un oxígeno aniónico terminal (-P-O⁻), cuya carga negativa repele electrostáticamente a la oxima nucleófila impidiendo la reactivación.',
        smiles: 'CC(C)OP(=O)(C)F',
        difficulty: 'hard',
        category: 'Toxicología'
      },
      {
        id: 'fc-01-07',
        topicId: 'tema-01',
        concept: 'BHE: Fisostigmina vs Neostigmina',
        front: '¿Por qué la Fisostigmina cruza la BHE mientras que la Neostigmina carece de acción central?',
        back: '• **Fisostigmina (Amina Terciaria):** Contiene un nitrógeno básico terciario. A pH fisiológico 7.4 coexiste en equilibrio entre la forma protonada y la forma neutra lipófila; esta fracción no ionizada **SÍ atraviesa la BHE**, permitiendo revertir intoxicaciones anticolinérgicas centrales en el SNC.\n\n• **Neostigmina (Amonio Cuaternario):** Posee una cabeza catiónica de trimetilamonio cuaternario (-N⁺(CH₃)₃) con carga positiva permanente. Por su alta polaridad e incapacidad de desprotonarse, **NO atraviesa la BHE**, restringiendo su acción a la placa motora (miastenia gravis) y vísceras periféricas.',
        structures: [
          { name: 'Fisostigmina', smiles: 'CC12CCN(C1N(C3=C2C=C(C=C3)OC(=O)NC)C)C', badge: 'Amina 3ª · Cruza BHE' },
          { name: 'Neostigmina', smiles: 'CN(C)C(=O)OC1=CC=CC(=C1)[N+](C)(C)C', badge: 'Amonio 4º · NO Cruza BHE' }
        ],
        difficulty: 'easy',
        category: 'Farmacocinética'
      },
      {
        id: 'fc-01-08',
        topicId: 'tema-01',
        concept: 'Síntesis Industrial de Metacolina y Betanecol',
        front: '¿Cómo se diferencian las síntesis industriales de Metacolina y Betanecol a partir del alcohol secundario común?',
        back: 'Ambas parten del mismo **alcohol secundario**, el **1-(trimetilamonio)propan-2-ol**: bromación de la acetona, cuaternización con trimetilamina y reducción con LiAlH₄.\n• **Metacolina:** Se acila directamente con **anhídrido acético** ((CH₃CO)₂O).\n• **Betanecol:** Reacciona primero con **fosgeno (COCl₂)** dando un cloroformiato y luego con **amoniaco (NH₃)** rindiendo el carbamato terminal.',
        smiles: 'CC(C[N+](C)(C)C)OC(=O)C',
        difficulty: 'medium',
        imagePath: 'assets/tema-01/sintesis_metacolina_betanecol.png',
        category: 'Síntesis Orgánica'
      },
      {
        id: 'fc-01-09',
        topicId: 'tema-01',
        concept: 'Bioisostería del Enlace Éster en Antiparkinsonianos',
        front: '¿Cómo se evita la hidrólisis metabólica de los anticolinérgicos sintéticos en Trihexifenidilo y Biperideno?',
        back: 'Sustituyendo el enlace éster hidrolizable (-COO-) por un **alcohol terciario alifático (-C(OH)-)** unido a cadenas alicíclicas y a un anillo de piperidina, logrando fármacos resistentes a esterasas con alta penetración en el SNC.',
        smiles: 'C1CCC(CC1)C(CCN2CCCCC2)(C3=CC=CC=C3)O',
        difficulty: 'medium',
        category: 'Bioisostería'
      },
      {
        id: 'fc-01-10',
        topicId: 'tema-01',
        concept: 'Tubocurarina y Distancia Nicotínica',
        front: '¿Qué características estructurales definen a la Tubocurarina como bloqueante neuromuscular competitivo prototipo?',
        back: 'Es un alcaloide natural con **dos centros catiónicos separados por una distancia rígida de 1.4 nm (14 Å)**. Esta separación complementa con exactitud los dos bolsillos de unión de las dos subunidades alfa del receptor nicotínico muscular de la placa motora.',
        smiles: 'CN1CCC2=CC(=C3C=C2C1CC4=CC=C(C=C4)OC5=C6C(CC7=CC(=C(C=C7)O)O3)[N+](CCC6=CC(=C5O)OC)(C)C)OC',
        imagePath: 'assets/tema-01/image_47.png',
        difficulty: 'hard',
        category: 'Antagonistas Nicotínicos'
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
    status: 'Publicado',
    // Estructuras oficiales publicadas; test oficial (3 modelos calibrados) y 10 flashcards disponibles
    testDisponible: true,
    flashcardsDisponibles: true,
    slidesPdfUrl: '',
    slidesPdfName: 'Tema 02: Diapositivas Oficiales Sistema Adrenérgico.pdf',
    notesPdfUrl: '',
    notesPdfName: 'Tema 02: Apuntes de Agonistas β2 y β-bloqueantes.pdf',
    geminiNotebookUrl: '',
    spotifyPodcastUrl: 'https://open.spotify.com/episode/4EcClAu7PKvIWraUM7Ohez?si=3f_LGqt5ReenndfcslT3KA',
    videoPodcastUrl: 'https://open.spotify.com/episode/4EcClAu7PKvIWraUM7Ohez?si=3f_LGqt5ReenndfcslT3KA',
    audioPodcastUrl: 'audio/podcast_adrenergicos.mp3',
    audioPodcastName: 'Píldora Docente 02: Noradrenalina y Sistema Adrenérgico (6,5 min)',
    drugs: [
      {
        name: 'L-Tirosina',
        smiles: 'N[C@@H](Cc1ccc(O)cc1)C(=O)O',
        formula: 'C9H11NO3',
        mw: 181.19,
        logP: 0.35,
        hbd: 3,
        hba: 3,
        tpsa: 83.55,
        rotBonds: 3,
        role: 'Aminoácido precursor inicial de la biosíntesis de catecolaminas'
      },
      {
        name: 'L-DOPA (Levodopa)',
        smiles: 'N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O',
        formula: 'C9H11NO4',
        mw: 197.19,
        logP: 0.05,
        hbd: 4,
        hba: 4,
        tpsa: 103.78,
        rotBonds: 3,
        role: 'Precursor de las catecolaminas; sustrato de LAT1, cruza la BHE (tratamiento del Parkinson)',
        pdbId: '8J8L'
      },
      {
        name: 'Dopamina',
        smiles: 'NCCc1ccc(O)c(O)c1',
        formula: 'C8H11NO2',
        mw: 153.18,
        logP: 0.6,
        hbd: 3,
        hba: 3,
        tpsa: 66.48,
        rotBonds: 2,
        role: 'Neurotransmisor central y periférico, precursor biosintético directo de la noradrenalina mediante la dopamina beta-hidroxilasa (DbH)'
      },
      {
        name: 'Noradrenalina (Norepinefrina)',
        smiles: 'NC[C@H](O)c1ccc(O)c(O)c1',
        formula: 'C8H11NO3',
        mw: 169.18,
        logP: 0.09,
        hbd: 4,
        hba: 4,
        tpsa: 86.71,
        rotBonds: 2,
        role: 'Neurotransmisor principal de las terminaciones postganglionares del sistema simpático y prototipo funcional del Tema 2'
      },
      {
        name: 'Adrenalina (Epinefrina)',
        smiles: 'CNC[C@H](O)c1ccc(O)c(O)c1',
        formula: 'C9H13NO3',
        mw: 183.21,
        logP: 0.35,
        hbd: 4,
        hba: 4,
        tpsa: 72.72,
        rotBonds: 3,
        role: 'Hormona de la médula adrenal producida por N-metilación de la noradrenalina mediante la feniletanolamina N-metiltransferasa (PNMT)'
      },
      {
        name: 'α-Metiltirosina (Metirosina)',
        smiles: 'C[C@](N)(Cc1ccc(O)cc1)C(=O)O',
        formula: 'C10H13NO3',
        mw: 195.22,
        logP: 0.74,
        hbd: 3,
        hba: 3,
        tpsa: 83.55,
        rotBonds: 3,
        role: 'Inhibidor competitivo de la tirosina hidroxilasa'
      },
      {
        name: 'α-Metildopa',
        smiles: 'C[C@](N)(Cc1ccc(O)c(O)c1)C(=O)O',
        formula: 'C10H13NO4',
        mw: 211.22,
        logP: 0.44,
        hbd: 4,
        hba: 4,
        tpsa: 103.78,
        rotBonds: 3,
        role: 'Pro-fármaco antihipertensivo de elección en la hipertensión del embarazo'
      },
      {
        name: 'α-Metildopamina',
        smiles: 'CC(N)Cc1ccc(O)c(O)c1',
        formula: 'C9H13NO2',
        mw: 167.21,
        logP: 0.99,
        hbd: 3,
        hba: 3,
        tpsa: 66.48,
        rotBonds: 2,
        role: 'Metabolito de la α-metildopa formado por la L-DOPA descarboxilasa'
      },
      {
        name: 'α-Metilnoradrenalina (Corbasil)',
        smiles: 'C[C@H](N)[C@H](O)c1ccc(O)c(O)c1',
        formula: 'C9H13NO3',
        mw: 183.21,
        logP: 0.48,
        hbd: 4,
        hba: 4,
        tpsa: 86.71,
        rotBonds: 2,
        role: 'Falso neurotransmisor: sustituye a la NA en las vesículas (metabolito activo de la α-metildopa)'
      },
      {
        name: 'Carbidopa',
        smiles: 'C[C@](NN)(Cc1ccc(O)c(O)c1)C(=O)O',
        formula: 'C10H14N2O4',
        mw: 226.23,
        logP: -0.05,
        hbd: 5,
        hba: 5,
        tpsa: 115.81,
        rotBonds: 4,
        role: 'Inhibidor periférico de la L-DOPA descarboxilasa (AADC, aminoácido aromático descarboxilasa)'
      },
      {
        name: 'Disulfiramo',
        smiles: 'CCN(CC)C(=S)SSC(=S)N(CC)CC',
        formula: 'C10H20N2S4',
        mw: 296.55,
        logP: 3.62,
        hbd: 0,
        hba: 4,
        tpsa: 6.48,
        rotBonds: 4,
        role: 'Inhibidor de la dopamina β-hidroxilasa por quelación de su cobre catalítico'
      },
      {
        name: 'Reserpina',
        smiles: 'COC(=O)[C@H]1[C@H]2C[C@@H]3c4[nH]c5cc(OC)ccc5c4CCN3C[C@H]2C[C@@H](OC(=O)c2cc(OC)c(OC)c(OC)c2)[C@@H]1OC',
        formula: 'C33H40N2O9',
        mw: 608.69,
        logP: 4.17,
        hbd: 1,
        hba: 10,
        tpsa: 117.78,
        rotBonds: 8,
        role: 'Alcaloide de Rauwolfia: bloquea VMAT-2 y vacía las vesículas de noradrenalina'
      },
      {
        name: 'Mediodespidina (Deserpidina)',
        smiles: 'COC(=O)[C@H]1[C@H]2C[C@@H]3c4[nH]c5ccccc5c4CCN3C[C@H]2C[C@@H](OC(=O)c2cc(OC)c(OC)c(OC)c2)[C@@H]1OC',
        formula: 'C32H38N2O8',
        mw: 578.66,
        logP: 4.16,
        hbd: 1,
        hba: 9,
        tpsa: 108.55,
        rotBonds: 7,
        role: '11-Desmetoxirreserpina: hipotensora como la reserpina, con menor depresión central'
      },
      {
        name: 'Rescinamina',
        smiles: 'COC(=O)[C@H]1[C@H]2C[C@@H]3c4[nH]c5cc(OC)ccc5c4CCN3C[C@H]2C[C@@H](OC(=O)/C=C/c2cc(OC)c(OC)c(OC)c2)[C@@H]1OC',
        formula: 'C35H42N2O9',
        mw: 634.73,
        logP: 4.57,
        hbd: 1,
        hba: 10,
        tpsa: 117.78,
        rotBonds: 9,
        role: 'Alcaloide de Rauwolfia con éster 3,4,5-trimetoxicinámico: ejemplo de vinilogía natural'
      },
      {
        name: 'Guanidina',
        smiles: 'NC(N)=N',
        formula: 'CH5N3',
        mw: 59.07,
        logP: -1.16,
        hbd: 3,
        hba: 1,
        tpsa: 75.89,
        rotBonds: 0,
        role: 'Base muy fuerte (pKa 13,6): el catión guanidinio se estabiliza por resonancia'
      },
      {
        name: 'Guanetidina',
        smiles: 'N=C(N)NCCN1CCCCCCC1',
        formula: 'C10H22N4',
        mw: 198.31,
        logP: 0.74,
        hbd: 3,
        hba: 2,
        tpsa: 65.14,
        rotBonds: 3,
        role: 'Bloqueante neuronal presináptico que vacía las reservas de noradrenalina'
      },
      {
        name: 'Cloruro de S-metilisotiuronio',
        smiles: 'CSC(N)=[NH2+].[Cl-]',
        formula: 'C2H7ClN2S',
        mw: 126.61,
        logP: -4.57,
        hbd: 2,
        hba: 1,
        tpsa: 51.61,
        rotBonds: 0,
        role: 'Reactivo de guanidinación en la síntesis de la guanetidina'
      },
      {
        name: '3,4-Dihidroxifenilglicolaldehído (DOPEGAL)',
        smiles: 'O=CC(O)c1ccc(O)c(O)c1',
        formula: 'C8H8O4',
        mw: 168.15,
        logP: 0.33,
        hbd: 3,
        hba: 4,
        tpsa: 77.76,
        rotBonds: 2,
        role: 'Metabolito aldehídico intermediario de la inactivación de la noradrenalina por la monoaminooxidasa (MAO)'
      },
      {
        name: '(-)-Efedrina',
        smiles: 'CN[C@@H](C)[C@H](O)c1ccccc1',
        formula: 'C10H15NO',
        mw: 165.24,
        logP: 1.33,
        hbd: 2,
        hba: 2,
        tpsa: 32.26,
        rotBonds: 3,
        role: 'Alcaloide de Ephedra y prototipo de agonista adrenérgico de acción mixta (activa receptores alfa y beta directamente y estimula la liberación de noradrenalina)'
      },
      {
        name: '(+)-Pseudoefedrina',
        smiles: 'CN[C@@H](C)[C@@H](O)c1ccccc1',
        formula: 'C10H15NO',
        mw: 165.24,
        logP: 1.33,
        hbd: 2,
        hba: 2,
        tpsa: 32.26,
        rotBonds: 3,
        role: 'Diastereoisómero (1S,2S)-(+)-treo de la efedrina'
      },
      {
        name: 'Fenilpropanolamina (Norefedrina)',
        smiles: 'CC(N)C(O)c1ccccc1',
        formula: 'C9H13NO',
        mw: 151.21,
        logP: 1.07,
        hbd: 2,
        hba: 2,
        tpsa: 46.25,
        rotBonds: 2,
        role: 'Análogo desmetilado en el nitrógeno de la efedrina (propadrina)'
      },
      {
        name: 'Anfetamina',
        smiles: 'CC(N)Cc1ccccc1',
        formula: 'C9H13N',
        mw: 135.21,
        logP: 1.58,
        hbd: 1,
        hba: 1,
        tpsa: 26.02,
        rotBonds: 2,
        role: 'Prototipo de estimulante adrenérgico indirecto puro'
      },
      {
        name: 'Dextroanfetamina',
        smiles: 'C[C@H](N)Cc1ccccc1',
        formula: 'C9H13N',
        mw: 135.21,
        logP: 1.58,
        hbd: 1,
        hba: 1,
        tpsa: 26.02,
        rotBonds: 2,
        role: 'Eutómero (S)-(+) de la anfetamina'
      },
      {
        name: 'Metanfetamina',
        smiles: 'CN[C@@H](C)Cc1ccccc1',
        formula: 'C10H15N',
        mw: 149.24,
        logP: 1.84,
        hbd: 1,
        hba: 1,
        tpsa: 12.03,
        rotBonds: 3,
        role: 'Derivado N-metilado de la dextroanfetamina'
      },
      {
        name: 'Fentermina',
        smiles: 'CC(C)(N)Cc1ccccc1',
        formula: 'C10H15N',
        mw: 149.24,
        logP: 1.97,
        hbd: 1,
        hba: 1,
        tpsa: 26.02,
        rotBonds: 2,
        role: 'alfa,alfa-dimetilfeniletilamina'
      },
      {
        name: 'Mefentermina',
        smiles: 'CNC(C)(C)Cc1ccccc1',
        formula: 'C11H17N',
        mw: 163.26,
        logP: 2.23,
        hbd: 1,
        hba: 1,
        tpsa: 12.03,
        rotBonds: 3,
        role: 'Derivado N-metilado de la fentermina'
      },
      {
        name: 'Hidroxianfetamina (Paredrina)',
        smiles: 'CC(N)Cc1ccc(O)cc1',
        formula: 'C9H13NO',
        mw: 151.21,
        logP: 1.28,
        hbd: 2,
        hba: 2,
        tpsa: 46.25,
        rotBonds: 2,
        role: '4-hidroxianfetamina'
      },
      {
        name: 'Isoprenalina (Isoproterenol)',
        smiles: 'CC(C)NCC(O)c1ccc(O)c(O)c1',
        formula: 'C11H17NO3',
        mw: 211.26,
        logP: 1.13,
        hbd: 4,
        hba: 4,
        tpsa: 72.72,
        rotBonds: 4,
        role: 'Prototipo clásico de agonista beta-adrenérgico directo no selectivo (beta1 = beta2)'
      },
      {
        name: 'Isoetarina',
        smiles: 'CCC(NC(C)C)C(O)c1ccc(O)c(O)c1',
        formula: 'C13H21NO3',
        mw: 239.31,
        logP: 1.91,
        hbd: 4,
        hba: 4,
        tpsa: 72.72,
        rotBonds: 5,
        role: 'Primer agonista adrenérgico con selectividad funcional beta2 > beta1 empleado en clínica'
      },
      {
        name: 'Salbutamol (Albuterol)',
        smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
        formula: 'C13H21NO3',
        mw: 239.31,
        logP: 1.31,
        hbd: 4,
        hba: 4,
        tpsa: 72.72,
        rotBonds: 4,
        role: 'Hito farmacológico en el asma (Ventolin, 1969)',
        pdbId: '2RH1'
      },
      {
        name: '(R)-Salbutamol (Levosalbutamol)',
        smiles: 'CC(C)(C)NC[C@H](O)c1ccc(O)c(CO)c1',
        formula: 'C13H21NO3',
        mw: 239.31,
        logP: 1.31,
        hbd: 4,
        hba: 4,
        tpsa: 72.72,
        rotBonds: 4,
        role: 'Eutómero (R)-(-) activo del salbutamol'
      },
      {
        name: 'Normetanefrina',
        smiles: 'COc1cc(C(O)CN)ccc1O',
        formula: 'C9H13NO3',
        mw: 183.21,
        logP: 0.39,
        hbd: 3,
        hba: 4,
        tpsa: 75.71,
        rotBonds: 3,
        role: 'Metabolito inactivo generado por O-metilación del hidroxilo fenólico en C3 de la noradrenalina catalizada por la catecol-O-metiltransferasa (COMT)'
      },
      {
        name: 'Salbutamol: análogo hidroxietílico',
        smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CCO)c1',
        formula: 'C14H23NO3',
        mw: 253.34,
        logP: 1.35,
        hbd: 4,
        hba: 4,
        tpsa: 72.72,
        rotBonds: 5,
        role: 'Compuesto clave en el estudio de REA del receptor beta2: demostró que la inserción de un espaciador de dos carbonos (-CH2CH2OH) sigue permitiendo el enlace de hidrógeno con el…'
      },
      {
        name: 'Fenilefrina',
        smiles: 'CNC[C@H](O)c1cccc(O)c1',
        formula: 'C9H13NO2',
        mw: 167.21,
        logP: 0.65,
        hbd: 3,
        hba: 3,
        tpsa: 52.49,
        rotBonds: 3,
        role: 'Agonista alfa1-adrenérgico selectivo directo'
      },
      {
        name: 'Nafazolina',
        smiles: 'c1ccc2c(CC3=NCCN3)cccc2c1',
        formula: 'C14H14N2',
        mw: 210.28,
        logP: 2.38,
        hbd: 1,
        hba: 2,
        tpsa: 24.39,
        rotBonds: 2,
        role: 'Agonista alfa-adrenérgico directo derivado de la 2-imidazolina (2-(1-naftilmetil)-4,5-dihidro-1H-imidazol)'
      },
      {
        name: 'Dicloroisoproterenol (DCI)',
        smiles: 'CC(C)NCC(O)c1ccc(Cl)c(Cl)c1',
        formula: 'C11H15Cl2NO',
        mw: 248.15,
        logP: 3.02,
        hbd: 2,
        hba: 2,
        tpsa: 32.26,
        rotBonds: 4,
        role: 'Primer bloqueante beta de la historia (Powell y Slater, 1958)'
      },
      {
        name: 'Pronetalol',
        smiles: 'CC(C)NCC(O)c1ccc2ccccc2c1',
        formula: 'C15H19NO',
        mw: 229.32,
        logP: 2.87,
        hbd: 2,
        hba: 2,
        tpsa: 32.26,
        rotBonds: 4,
        role: 'Diseñado por James Black en 1962 (Alderlin) reemplazando el anillo diclorofenilo por un núcleo de 2-naftilo'
      },
      {
        name: '(S)-Propranolol',
        smiles: 'CC(C)NC[C@H](O)COc1cccc2ccccc12',
        formula: 'C16H21NO2',
        mw: 259.35,
        logP: 2.58,
        hbd: 2,
        hba: 3,
        tpsa: 41.49,
        rotBonds: 6,
        role: 'Hito cumbre de Black (1964'
      },
      {
        name: '(R)-Propranolol',
        smiles: 'CC(C)NC[C@@H](O)COc1cccc2ccccc12',
        formula: 'C16H21NO2',
        mw: 259.35,
        logP: 2.58,
        hbd: 2,
        hba: 3,
        tpsa: 41.49,
        rotBonds: 6,
        role: 'Distómero del propranolol'
      },
      {
        name: 'Practolol',
        smiles: 'CC(=O)Nc1ccc(OCC(O)CNC(C)C)cc1',
        formula: 'C14H22N2O3',
        mw: 266.34,
        logP: 1.38,
        hbd: 3,
        hba: 4,
        tpsa: 70.59,
        rotBonds: 7,
        role: 'Primer bloqueante beta1-cardioselectivo introducido en clínica (Eraldin)'
      },
      {
        name: 'Piperoxano',
        smiles: 'C1CCN(CC2COc3ccccc3O2)CC1',
        formula: 'C14H19NO2',
        mw: 233.31,
        logP: 2.31,
        hbd: 0,
        hba: 3,
        tpsa: 21.7,
        rotBonds: 2,
        role: 'Primer antagonista alfa sintético de la historia (Fourneau y Bovet, 1933'
      },
      {
        name: '(S)-Prosimpal',
        smiles: 'CCN(CC)C[C@H]1COc2ccccc2O1',
        formula: 'C13H19NO2',
        mw: 221.3,
        logP: 2.17,
        hbd: 0,
        hba: 3,
        tpsa: 21.7,
        rotBonds: 4,
        role: '2-(dietilaminometil)-1,4-benzodioxano (F 883)'
      },
      {
        name: '(R)-Prosimpal',
        smiles: 'CCN(CC)C[C@@H]1COc2ccccc2O1',
        formula: 'C13H19NO2',
        mw: 221.3,
        logP: 2.17,
        hbd: 0,
        hba: 3,
        tpsa: 21.7,
        rotBonds: 4,
        role: 'Distómero (R)-(+) del prosimpal'
      },
      {
        name: 'Prazosina',
        smiles: 'COc1cc2nc(N3CCN(C(=O)c4ccco4)CC3)nc(N)c2cc1OC',
        formula: 'C19H21N5O4',
        mw: 383.41,
        logP: 1.78,
        hbd: 1,
        hba: 8,
        tpsa: 106.95,
        rotBonds: 4,
        role: 'Antagonista alfa1 postsináptico potente y selectivo (quinazolina 4-amino-6,7-dimetoxilada sustituida con furoilpiperazina)'
      },
      {
        name: 'Tolazolina',
        smiles: 'c1ccc(CC2=NCCN2)cc1',
        formula: 'C10H12N2',
        mw: 160.22,
        logP: 1.23,
        hbd: 1,
        hba: 2,
        tpsa: 24.39,
        rotBonds: 2,
        role: '2-bencil-4,5-dihidro-1H-imidazol'
      },
      {
        name: 'Fentolamina',
        smiles: 'Cc1ccc(N(CC2=NCCN2)c2cccc(O)c2)cc1',
        formula: 'C17H19N3O',
        mw: 281.36,
        logP: 2.84,
        hbd: 2,
        hba: 4,
        tpsa: 47.86,
        rotBonds: 4,
        role: 'Antagonista alfa1/alfa2 competitivo no selectivo de tipo imidazolina'
      },
      {
        name: 'Yohimbina',
        smiles: 'COC(=O)[C@@H]1[C@H]2C[C@H]3c4[nH]c5ccccc5c4CCN3C[C@@H]2CC[C@@H]1O',
        formula: 'C21H26N2O3',
        mw: 354.45,
        logP: 2.65,
        hbd: 2,
        hba: 4,
        tpsa: 65.56,
        rotBonds: 1,
        role: 'Alcaloide indólico pentacíclico de Pausinystalia johimbe'
      },
      {
        name: 'Fenoxibenzamina',
        smiles: 'CC(COc1ccccc1)N(CCCl)Cc1ccccc1',
        formula: 'C18H22ClNO',
        mw: 303.83,
        logP: 4.19,
        hbd: 0,
        hba: 2,
        tpsa: 12.47,
        rotBonds: 8,
        role: 'Antagonista alfa irreversible no competitivo'
      },
      {
        name: 'Aziridinio de fenoxibenzamina',
        smiles: 'CC(COc1ccccc1)[N+]1(Cc2ccccc2)CC1',
        formula: 'C18H22NO+',
        mw: 268.38,
        logP: 3.48,
        hbd: 0,
        hba: 1,
        tpsa: 9.23,
        rotBonds: 6,
        role: 'Intermedio catiónico reactivo y especie biológicamente activa real de la fenoxibenzamina'
      },
      {
        name: 'Propranolol (racémico)',
        smiles: 'CC(C)NCC(O)COc1cccc2ccccc12',
        role: 'Antagonista β-adrenérgico no selectivo clásico; se comercializa como racemato',
        mw: 259.34,
        logP: 2.6,
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
    attachments: [
      {
        id: 'att-t02-lat1-8j8l-3d',
        title: 'Modelo 3D Crio-EM: Complejo LAT1 (SLC7A5) con L-DOPA (PDB 8J8L)',
        type: 'model3d',
        url: 'https://www.rcsb.org/3d-view/8J8L/1',
        size: '3.56 Å · RCSB 3D',
        date: '24/09/2026'
      },
      {
        id: 'att-t02-estructuras-xlsx',
        title: 'Base de Datos Oficial de Estructuras QFDOS — Tema 2 (49 fármacos · QFDOS-046 a 094)',
        type: 'data',
        url: 'estructuras/tema2/estructuras_qfdos.xlsx',
        size: '841 KB',
        date: '24/09/2026'
      },
      {
        id: 'att-t02-propiedades-csv',
        title: 'Tabla de Propiedades Físico-Químicas QFDOS — Tema 2 (RDKit / CSV)',
        type: 'data',
        url: 'estructuras/tema2/propiedades_qfdos.csv',
        size: '40 KB',
        date: '24/09/2026'
      }
    ],
    testQuestions: TEMA2_MODELO_1_TEST_QUESTIONS,
    flashcards: [
      {
        id: 'fc-02-01',
        topicId: 'tema-02',
        concept: 'Escalera del Sustituyente en el Nitrógeno',
        front: '¿Cómo cambia el perfil α/β al aumentar el volumen del sustituyente sobre el nitrógeno, desde la noradrenalina hasta el salbutamol?',
        back: '**A más volumen en el N, menos α y más β.**\n\n1. **–H (noradrenalina):** preferencia α, con β1 y escasa β2.\n2. **–CH₃ (adrenalina):** perfil mixto α + β.\n3. **–CH(CH₃)₂ (isoprenalina):** β pura, sin α, pero β1 = β2.\n4. **–C(CH₃)₃ (salbutamol, terbutalina):** selectividad **β2 > β1**.\n\n**Doble función:** ese mismo volumen impide el acceso de la **MAO**, que oxida bien las aminas primarias y poco sustituidas.',
        structures: [
          { name: 'Noradrenalina', smiles: 'NC[C@H](O)c1ccc(O)c(O)c1', badge: 'N–H · α > β' },
          { name: 'Adrenalina', smiles: 'CNC[C@H](O)c1ccc(O)c(O)c1', badge: 'N–CH₃ · α + β' },
          { name: 'Isoprenalina', smiles: 'CC(C)NCC(O)c1ccc(O)c(O)c1', badge: 'N–iPr · β1 + β2' },
          { name: 'Salbutamol', smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1', badge: 'N–tBu · β2' }
        ],
        difficulty: 'easy',
        category: 'SAR Agonistas'
      },
      {
        id: 'fc-02-02',
        topicId: 'tema-02',
        concept: 'Metilación por COMT del 3-OH',
        front: '¿Qué hidroxilo del catecol metila la COMT, con qué cofactores, y por qué el metabolito pierde la actividad?',
        back: '**La COMT metila siempre el 3-OH (meta), nunca el 4-OH.** El metilo procede de la **S-adenosil-L-metionina (SAM)** y el **Mg²⁺** coordina los dos oxígenos del catecol en orto.\n\n• Noradrenalina → **normetanefrina**\n• Adrenalina → **metanefrina**\n• Dopamina → **3-metoxitiramina**\n\n**Por qué es inactivo:** el 3-OCH₃ ya no dona enlace de hidrógeno a la **Ser203** del TM5 y además añade volumen donde el bolsillo es estrecho.',
        structures: [
          { name: '(R)-Noradrenalina', smiles: 'NC[C@H](O)c1ccc(O)c(O)c1', badge: 'Sustrato · 3-OH libre' },
          { name: 'Normetanefrina', smiles: 'NC[C@H](O)c1ccc(O)c(OC)c1', badge: 'Metabolito inactivo · 3-OCH₃' }
        ],
        difficulty: 'easy',
        category: 'Metabolismo'
      },
      {
        id: 'fc-02-03',
        topicId: 'tema-02',
        concept: 'Dos Soluciones a la COMT: Salbutamol y Terbutalina',
        front: 'Salbutamol y terbutalina resisten la COMT. ¿Qué estrategia estructural usa cada uno y qué significa que «el sitio del 3-OH es un volumen, no un punto»?',
        back: '**Salbutamol (saligenina):** cambia el 3-OH por **3-CH₂OH**. El donador sigue alcanzando la Ser203, pero ya no hay catecol: cambia la *identidad* del grupo.\n\n**Terbutalina (resorcinol):** conserva dos fenoles, pero en **3,5 (meta)**. Demasiado separados para quelar el Mg²⁺ de la COMT: cambia la *geometría*.\n\n**Volumen del 3-OH:** –OH, –CH₂OH y –CH₂CH₂OH alcanzan el mismo aceptor del receptor; con **–(CH₂)₃OH** el hidroxilo ya no cabe y la actividad se pierde.',
        structures: [
          { name: 'Salbutamol', smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1', badge: '3-CH₂OH, 4-OH' },
          { name: 'Terbutalina', smiles: 'CC(C)(C)NCC(O)c1cc(O)cc(O)c1', badge: '3,5-(OH)₂' }
        ],
        difficulty: 'medium',
        category: 'SAR Agonistas β2'
      },
      {
        id: 'fc-02-04',
        topicId: 'tema-02',
        concept: 'Farmacóforo β2 en Tres Puntos y Eutómero (R)',
        front: '¿Con qué tres residuos del receptor β2 interacciona el salbutamol y por qué solo el enantiómero (R) es activo?',
        back: '**Tres puntos de anclaje en el bolsillo ortostérico:**\n1. **Amina protonada → Asp113 (TM3):** enlace iónico. Sin carga positiva no hay agonismo.\n2. **OH bencílico → Asn293 (TM6):** enlace de hidrógeno.\n3. **Donadores del anillo (3-CH₂OH, 4-OH) → Ser203/Ser207 (TM5):** disparan la activación.\n\n**Easson-Stedman:** solo la configuración **(R)** del carbono bencílico satisface los tres contactos a la vez; el (S) alcanza dos. Asigna por CIP: **–OH > –CH₂NHR > arilo > –H**.\n\nEl salbutamol se comercializa como **racemato**; el (R) puro es el **levalbuterol**.',
        smiles: 'CC(C)(C)NC[C@H](O)c1ccc(O)c(CO)c1',
        difficulty: 'hard',
        category: 'Interacción Ligando-Receptor'
      },
      {
        id: 'fc-02-05',
        topicId: 'tema-02',
        concept: 'Síntesis del Salbutamol desde el Ácido Acetilsalicílico',
        front: 'Desde el ácido acetilsalicílico, ¿cuáles son los seis pasos de la síntesis del salbutamol y qué dos decisiones de la ruta hay que saber justificar?',
        back: '1. **AlCl₃, PhNO₂:** transposición de Fries → ácido 5-acetil-2-hidroxibenzoico (el acilo pasa del O al C, en para).\n2. **MeOH, HCl:** esterificación del carboxilo.\n3. **Br₂:** bromación en α del carbonilo → α-bromocetona.\n4. **N-bencil-terc-butilamina:** SN2 sobre el C–Br.\n5. **LiAlH₄, THF:** doble reducción.\n6. **H₂, Pd/C:** hidrogenólisis del bencilo → salbutamol racémico.\n\n**Decisión 1 (paso 4):** la amina **secundaria** bencilada da una amina terciaria que no vuelve a alquilar; con terc-butilamina primaria habría **polialquilación**.\n\n**Decisión 2 (paso 5):** el **LiAlH₄** reduce a la vez la cetona (OH bencílico) y el **éster** (–CH₂OH). El NaBH₄ no reduce ésteres.',
        structures: [
          { name: 'Ácido acetilsalicílico', smiles: 'CC(=O)Oc1ccccc1C(=O)O', badge: 'Material de partida' },
          { name: '5-(Bromoacetil)salicilato de metilo', smiles: 'BrCC(=O)c1ccc(O)c(C(=O)OC)c1', badge: 'Electrófilo (paso 3)' },
          { name: 'Salbutamol', smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1', badge: 'Producto (racemato)' }
        ],
        difficulty: 'medium',
        category: 'Síntesis Orgánica'
      },
      {
        id: 'fc-02-06',
        topicId: 'tema-02',
        concept: 'Síntesis de la Guanetidina (Transposición de Beckmann)',
        front: '¿Cómo se sintetiza la guanetidina a partir de la cicloheptanona y por qué no produce sedación, a diferencia de la reserpina?',
        back: '**Ruta:**\n1. **NH₂OH:** cicloheptanona → oxima.\n2. **Beckmann (medio ácido):** migra el grupo en **anti** al –OH; el anillo de 7 se expande a la lactama de **8 miembros** (azocan-2-ona).\n3. **LiAlH₄:** lactama → **azocano** (amina cíclica).\n4. **ClCH₂CN:** N-alquilación → (azocan-1-il)acetonitrilo.\n5. **LiAlH₄:** nitrilo → amina primaria.\n6. **S-metilisotiourea:** guanilación → **guanetidina**.\n\n**Sin sedación:** la guanidina (pKa ≈ 13) está siempre **protonada** a pH 7,4 y no cruza la barrera hematoencefálica. Actúa solo en el terminal periférico, bloqueando la liberación de NA.',
        structures: [
          { name: 'Cicloheptanona', smiles: 'O=C1CCCCCC1', badge: 'Anillo de 7' },
          { name: 'Oxima', smiles: 'ON=C1CCCCCC1', badge: 'Sustrato de Beckmann' },
          { name: 'Azocan-2-ona', smiles: 'O=C1CCCCCCN1', badge: 'Lactama de 8' },
          { name: 'Guanetidina', smiles: 'NC(=N)NCCN1CCCCCCC1', badge: 'Guanidina · pKa ≈ 13' }
        ],
        difficulty: 'hard',
        category: 'Síntesis Orgánica'
      },
      {
        id: 'fc-02-07',
        topicId: 'tema-02',
        concept: 'Falso Transmisor: α-Metildopa frente a Carbidopa',
        front: '¿Por qué la α-metildopa baja la presión arterial actuando en el SNC, mientras que la carbidopa, tan parecida, actúa solo en la periferia?',
        back: '**α-Metildopa:** profármaco con esqueleto de α-aminoácido, sustrato de **LAT1**, que la introduce en el SNC. Allí se descarboxila a α-metildopamina y se β-hidroxila a **α-metilnoradrenalina**, un **falso transmisor** que estimula los **α2 centrales** y reduce el tono simpático. Es de elección en la hipertensión del embarazo.\n\n**Carbidopa:** cambia el NH₂ por una **hidrazina** (–NH–NH₂). Muy polar, no cruza la barrera: inhibe la **L-aminoácido aromático descarboxilasa periférica** y se asocia a la levodopa para que esta llegue intacta al cerebro.\n\nEl **metilo en α** de ambas frena además la acción de la MAO.',
        structures: [
          { name: 'α-Metildopa', smiles: 'C[C@](N)(Cc1ccc(O)c(O)c1)C(=O)O', badge: 'Profármaco · SNC' },
          { name: 'α-Metilnoradrenalina', smiles: 'C[C@H](N)[C@H](O)c1ccc(O)c(O)c1', badge: 'Falso transmisor · α2' },
          { name: 'Carbidopa', smiles: 'NN[C@@](C)(Cc1ccc(O)c(O)c1)C(=O)O', badge: 'Hidrazina · periférica' }
        ],
        difficulty: 'medium',
        category: 'Biosíntesis y Falsos Transmisores'
      },
      {
        id: 'fc-02-08',
        topicId: 'tema-02',
        concept: 'Agonistas Indirectos: Anfetamina y Efedrina',
        front: '¿Qué tres cambios estructurales, respecto a la noradrenalina, convierten la anfetamina en un estimulante central de acción indirecta?',
        back: '**Agonista indirecto:** no activa el receptor; entra en el terminal por el transportador y **desplaza la NA** de las vesículas.\n\n1. **Sin OH fenólicos:** más lipofilia, buena absorción oral y paso a SNC.\n2. **Sin OH bencílico:** todavía más lipófila y más central.\n3. **Metilo en α:** impide la desaminación por la **MAO** y alarga la acción.\n\n**Efedrina:** recupera el OH bencílico y lleva N-metilo. Más polar, menos central y de **acción mixta** (directa e indirecta), con dos estereocentros.\n\n**Metanfetamina:** anfetamina N-metilada, todavía más central. El eutómero central de la anfetamina es la **(S)-(+)**, la dexanfetamina.',
        structures: [
          { name: 'Noradrenalina', smiles: 'NC[C@H](O)c1ccc(O)c(O)c1', badge: 'Directo · no cruza BHE' },
          { name: 'Anfetamina', smiles: 'CC(N)Cc1ccccc1', badge: 'Indirecto · SNC' },
          { name: 'Efedrina', smiles: 'CN[C@@H](C)[C@H](O)c1ccccc1', badge: 'Acción mixta' }
        ],
        difficulty: 'easy',
        category: 'Agonistas Indirectos'
      },
      {
        id: 'fc-02-09',
        topicId: 'tema-02',
        concept: 'Ariloxipropanolaminas (S) frente a Ariletanolaminas (R)',
        front: 'El eutómero del propranolol es (S) y el del pronetalol es (R). ¿Significa esto que se unen al receptor β con una geometría distinta?',
        back: '**No. La disposición espacial del OH es la misma; solo cambia la letra.**\n\n**Ariletanolamina (pronetalol):** en el carbono carbinólico, **–OH > –CH₂NHR > arilo > –H** → eutómero **(R)**.\n\n**Ariloxipropanolamina (propranolol):** el puente **–O–CH₂–** intercala un oxígeno. Ahora el metileno unido al O (O,H,H) supera al metileno unido al N (N,H,H): **–OH > –CH₂O–Ar > –CH₂NHR > –H** → eutómero **(S)**.\n\nAmbos colocan el OH igual frente al receptor. Las prioridades CIP describen la molécula, no su modo de unión.\n\nEl puente oximetilénico define la clase de todos los β-bloqueantes actuales.',
        structures: [
          { name: '(R)-Pronetalol', smiles: 'CC(C)NC[C@H](O)c1ccc2ccccc2c1', badge: 'Ariletanolamina · (R)' },
          { name: '(S)-Propranolol', smiles: 'CC(C)NC[C@H](O)COc1cccc2ccccc12', badge: 'Ariloxipropanolamina · (S)' }
        ],
        difficulty: 'hard',
        category: 'Estereoquímica'
      },
      {
        id: 'fc-02-10',
        topicId: 'tema-02',
        concept: 'Fenoxibenzamina: Ión Aziridinio y Bloqueo Irreversible',
        front: '¿Qué especie reactiva forma la fenoxibenzamina en el organismo y por qué su bloqueo α no se revierte aumentando la dosis de agonista?',
        back: '**Ión aziridinio:** el par libre del nitrógeno desplaza intramolecularmente al cloruro de la cadena β-cloroetilo y cierra un anillo de **tres miembros con carga positiva**, muy tenso y muy electrófilo.\n\n**Alquilación:** un nucleófilo del receptor α (p. ej., el carboxilato de un **aspartato**) abre el anillo y queda unido por **enlace covalente**.\n\n**Consecuencia:** antagonismo **irreversible e insuperable**. El efecto dura días, hasta que la célula sintetiza receptores nuevos. Se usa en la preparación preoperatoria del **feocromocitoma**.',
        structures: [
          { name: 'Fenoxibenzamina', smiles: 'ClCCN(Cc1ccccc1)C(C)COc1ccccc1', badge: 'β-Haloalquilamina' },
          { name: 'Ión aziridinio', smiles: 'C1C[N+]1(Cc1ccccc1)C(C)COc1ccccc1', badge: 'Electrófilo activo' }
        ],
        difficulty: 'medium',
        category: 'Antagonistas α'
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
        name: 'Epinina (N-metildopamina)',
        smiles: 'CNCCc1ccc(O)c(O)c1',
        formula: 'C9H13NO2',
        mw: 167.21,
        logP: 0.86,
        hbd: 3,
        hba: 3,
        tpsa: 52.49,
        rotBonds: 3,
        role: 'N-metildopamina (desoxiadrenalina). Conserva el catecol y la amina básica de la dopamina con libre giro en la cadena etilamínica: muchas conformaciones accesibles.'
      },
      {
        name: 'ADTN (2-amino-6,7-dihidroxitetralina)',
        smiles: 'NC1CCc2cc(O)c(O)cc2C1',
        formula: 'C10H13NO2',
        mw: 179.22,
        logP: 0.91,
        hbd: 3,
        hba: 3,
        tpsa: 66.48,
        rotBonds: 0,
        role: '2-Amino-6,7-dihidroxi-1,2,3,4-tetrahidronaftaleno. Agonista dopaminérgico potente: la tetralina fija la cadena etilamínica de la dopamina en conformación antiperiplanar (trans extendida) con el catecol.'
      },
      {
        name: 'Apomorfina',
        smiles: 'CN1CCc2cccc3c2[C@H]1Cc1ccc(O)c(O)c1-3',
        formula: 'C17H17NO2',
        mw: 267.33,
        logP: 2.85,
        hbd: 2,
        hba: 3,
        tpsa: 43.7,
        rotBonds: 0,
        role: 'Agonista D1/D2 obtenido por transposición ácida de la morfina (HCl, deshidratación y migración que aromatiza el anillo C, ver QFDOS-130). Contiene la epinina con la conformación antiperiplanar congelada en el sistema aporfínico.'
      },
      {
        name: 'Morfina',
        smiles: 'CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5',
        formula: 'C17H19NO3',
        mw: 285.34,
        logP: 1.2,
        hbd: 2,
        hba: 4,
        tpsa: 52.93,
        rotBonds: 0,
        role: 'Material de partida de la apomorfina. En medio ácido fuerte se abre el puente éter 4,5, se pierde agua y el anillo C aromatiza, generando el catecol y el esqueleto aporfínico.'
      },
      {
        name: 'Benserazida',
        smiles: 'NC(CO)C(=O)NNCc1ccc(O)c(O)c1O',
        formula: 'C10H15N3O5',
        mw: 257.25,
        logP: -1.76,
        hbd: 7,
        hba: 7,
        tpsa: 148.07,
        rotBonds: 5,
        role: 'Inhibidor de la dopa-descarboxilasa periférica (AADC) asociado a levodopa (Madopar). Hidrazida de la serina con un 2,3,4-trihidroxibencilo: la función hidrazina atrapa el piridoxal fosfato, igual que la carbidopa (QFDOS-094).'
      },
      {
        name: 'Dipivaloildopamina',
        smiles: 'CC(C)(C)C(=O)Oc1ccc(CCN)cc1OC(=O)C(C)(C)C',
        formula: 'C18H27NO4',
        mw: 321.42,
        logP: 3.09,
        hbd: 1,
        hba: 5,
        tpsa: 78.62,
        rotBonds: 4,
        role: 'Profármaco por latentización del catecol como diéster de ácido piválico. Suficientemente lipófilo para atravesar la BHE, pero no queda retenido en el cerebro y su acción es breve;'
      },
      {
        name: 'Doble profarmaco dihidropiridinico de dopamina',
        smiles: 'CN1C=CCC(C(=O)NCCc2ccc(OC(=O)C(C)(C)C)c(OC(=O)C(C)(C)C)c2)=C1',
        formula: 'C25H34N2O5',
        mw: 442.56,
        logP: 3.98,
        hbd: 1,
        hba: 6,
        tpsa: 84.94,
        rotBonds: 6,
        role: 'Sistema de liberación química de Bodor. La amina primaria va como amida del ácido 1-metil-1,4-dihidropiridina-3-carboxílico y el catecol como dipivalato: molécula neutra y lipófila que entra en el SNC.'
      },
      {
        name: 'Sal de piridinio del profarmaco (forma retenida)',
        smiles: 'C[n+]1cccc(C(=O)NCCc2ccc(O)c(O)c2)c1',
        formula: 'C15H17N2O3+',
        mw: 273.31,
        logP: 0.89,
        hbd: 3,
        hba: 3,
        tpsa: 73.44,
        rotBonds: 4,
        role: 'Intermedio del doble profármaco tras la oxidación de la dihidropiridina y la hidrólisis de los pivalatos. Catión permanente (amonio aromático cuaternario), por eso queda atrapado tras la BHE: es la forma depósito en el SNC.'
      },
      {
        name: 'Trigonelina',
        smiles: 'C[n+]1cccc(C(=O)[O-])c1',
        formula: 'C7H7NO2',
        mw: 137.14,
        logP: -1.13,
        hbd: 0,
        hba: 2,
        tpsa: 44.01,
        rotBonds: 1,
        role: 'N-metilnicotinato (betaína, sal interna). Subproducto del doble profármaco en el SNC: no tóxico, polar, se elimina. Alcaloide natural del café y de la alholva y metabolito de la niacina.'
      },
      {
        name: '(R)-Selegilina',
        smiles: 'C#CCN(C)[C@H](C)Cc1ccccc1',
        formula: 'C13H17N',
        mw: 187.29,
        logP: 2.18,
        hbd: 0,
        hba: 1,
        tpsa: 3.24,
        rotBonds: 4,
        role: 'N,α-dimetil-N-propargilfenetilamina. Inhibidor irreversible y selectivo de la MAO-B (inhibidor suicida: el propargilo se oxida y forma un aducto covalente con el FAD).'
      },
      {
        name: '(S)-Selegilina',
        smiles: 'C#CCN(C)[C@@H](C)Cc1ccccc1',
        formula: 'C13H17N',
        mw: 187.29,
        logP: 2.18,
        hbd: 0,
        hba: 1,
        tpsa: 3.24,
        rotBonds: 4,
        role: 'Distómero de la selegilina. Su N-desalquilación produce (S)-metanfetamina (dextrometanfetamina, QFDOS-068), estimulante central responsable de los efectos indeseados; por eso se comercializa el enantiómero (R).'
      },
      {
        name: 'Rasagilina',
        smiles: 'C#CCN[C@@H]1CCc2ccccc21',
        formula: 'C12H13N',
        mw: 171.24,
        logP: 1.9,
        hbd: 1,
        hba: 1,
        tpsa: 12.03,
        rotBonds: 2,
        role: 'N-propargil-1-(R)-aminoindano. Análogo cíclico de la selegilina: la cadena fenilisopropílica queda cerrada en un indano, y el nitrógeno pasa a secundario sin metilo.'
      },
      {
        name: 'Tolcapona',
        smiles: 'Cc1ccc(C(=O)c2cc(O)c(O)c([N+](=O)[O-])c2)cc1',
        formula: 'C14H11NO5',
        mw: 273.24,
        logP: 2.55,
        hbd: 2,
        hba: 5,
        tpsa: 100.67,
        rotBonds: 3,
        role: 'Inhibidor reversible de la COMT, periférico y central. El nitro en orto al catecol baja el pKa del OH adyacente (≈ 4.5): a pH 7.4 circula como fenolato y es un mal sustrato de la metilación, pero se une con alta afinidad.'
      },
      {
        name: 'Amantadina',
        smiles: 'NC12CC3CC(CC(C3)C1)C2',
        formula: 'C10H17N',
        mw: 151.25,
        logP: 1.91,
        hbd: 1,
        hba: 1,
        tpsa: 26.02,
        rotBonds: 0,
        role: '1-Aminoadamantano. Único fármaco de uso clínico que provoca la liberación presináptica de dopamina (además bloquea receptores NMDA). También antivírico frente a influenza A (bloqueo del canal M2).'
      },
      {
        name: 'N-(1-Adamantil)acetamida',
        smiles: 'CC(=O)NC12CC3CC(CC(C3)C1)C2',
        formula: 'C12H19NO',
        mw: 193.29,
        logP: 2.09,
        hbd: 1,
        hba: 1,
        tpsa: 29.1,
        rotBonds: 1,
        role: 'Producto de la reacción de Ritter: el carbocatión 1-adamantilo (a partir de adamantan-1-ol o 1-bromoadamantano en medio ácido) es atrapado por el nitrilo (acetonitrilo) y el ion nitrilio se hidrata a la amida.'
      },
      {
        name: 'Fenotiazina',
        smiles: 'c1ccc2c(c1)Nc1ccccc1S2',
        formula: 'C12H9NS',
        mw: 199.28,
        logP: 3.89,
        hbd: 1,
        hba: 2,
        tpsa: 12.03,
        rotBonds: 0,
        role: 'Núcleo tricíclico (10H-dibenzo-1,4-tiazina) de los neurolépticos tricíclicos. Numeración: N10, S5, posición 2 la que recibe el grupo atrayente (Cl, CF3, SCH3...). Se obtiene por tionación de la difenilamina con azufre e I2.'
      },
      {
        name: '3-Clorodifenilamina',
        smiles: 'Clc1cccc(Nc2ccccc2)c1',
        formula: 'C12H10ClN',
        mw: 203.67,
        logP: 4.08,
        hbd: 1,
        hba: 1,
        tpsa: 12.03,
        rotBonds: 2,
        role: 'Sustrato de la tionación (S8, I2, calor) para la síntesis de la 2-clorofenotiazina. El cierre puede producirse en orto o para al cloro y genera dos isómeros (2-cloro y 4-cloro) que deben separarse;'
      },
      {
        name: '2-Clorofenotiazina',
        smiles: 'Clc1ccc2c(c1)Nc1ccccc1S2',
        formula: 'C12H8ClNS',
        mw: 233.72,
        logP: 4.55,
        hbd: 1,
        hba: 2,
        tpsa: 12.03,
        rotBonds: 0,
        role: 'Intermedio clave de la clorpromazina. Se N-alquila con NaNH2 y 3-cloro-N,N-dimetilpropilamina. El Cl en 2 es el grupo atrayente que optimiza la actividad neuroléptica (región C del farmacóforo de Gordon).'
      },
      {
        name: 'Prometazina',
        smiles: 'CC(CN1c2ccccc2Sc2ccccc21)N(C)C',
        formula: 'C17H20N2S',
        mw: 284.43,
        logP: 4.24,
        hbd: 0,
        hba: 3,
        tpsa: 6.48,
        rotBonds: 3,
        role: 'Fenotiazina antihistamínica H1 con efecto sedante: puente de 2 carbonos ramificado con metilo entre los nitrógenos y sin sustituyente en 2.'
      },
      {
        name: 'Clorpromazina',
        smiles: 'CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21',
        formula: 'C17H19ClN2S',
        mw: 318.87,
        logP: 4.89,
        hbd: 0,
        hba: 3,
        tpsa: 6.48,
        rotBonds: 4,
        role: 'Prototipo de los neurolépticos (1952). Cumple las tres zonas del farmacóforo de Gordon: A, amina terciaria protonable; B, cadena de exactamente 3 carbonos entre nitrógenos; C, tricíclico con Cl en 2.'
      },
      {
        name: 'Levomepromazina',
        smiles: 'COc1ccc2c(c1)N(C[C@H](C)CN(C)C)c1ccccc1S2',
        formula: 'C19H24N2OS',
        mw: 328.48,
        logP: 4.5,
        hbd: 0,
        hba: 4,
        tpsa: 15.71,
        rotBonds: 5,
        role: 'Metotrimeprazina (Sinogán). 2-Metoxi y cadena de 3 carbonos ramificada con metilo en β: perfil intermedio entre clorpromazina y prometazina, muy sedante y analgésico. Eutómero (R)-(−) (levo).'
      },
      {
        name: 'Carfenazina',
        smiles: 'CCC(=O)c1ccc2c(c1)N(CCCN1CCN(CCO)CC1)c1ccccc1S2',
        formula: 'C24H31N3O2S',
        mw: 425.6,
        logP: 3.88,
        hbd: 1,
        hba: 6,
        tpsa: 47.02,
        rotBonds: 8,
        role: '2-Propionilfenotiazina con cadena hidroxietilpiperazinilpropilo. Síntesis: N-acilación protectora con EtCOCl, Friedel-Crafts en 2 (el S dirige al desaparecer la activación del N acilado), desprotección, alquilación con…'
      },
      {
        name: 'Flufenazina',
        smiles: 'OCCN1CCN(CCCN2c3ccccc3Sc3ccc(C(F)(F)F)cc32)CC1',
        formula: 'C22H26F3N3OS',
        mw: 437.53,
        logP: 4.31,
        hbd: 1,
        hba: 5,
        tpsa: 29.95,
        rotBonds: 6,
        role: 'Neuroléptico piperazínico de alta potencia. CF3 en 2 (más atrayente y lipófilo que Cl) y N básico incluido en una piperazina, dos modificaciones que aumentan la potencia D2 frente a la clorpromazina y desplazan el perfil a más…'
      },
      {
        name: 'Decanoato de flufenazina',
        smiles: 'CCCCCCCCCC(=O)OCCN1CCN(CCCN2c3ccccc3Sc3ccc(C(F)(F)F)cc32)CC1',
        formula: 'C32H44F3N3O2S',
        mw: 591.78,
        logP: 8,
        hbd: 0,
        hba: 6,
        tpsa: 36.02,
        rotBonds: 15,
        role: 'Éster del ácido decanoico (cáprico) sobre el OH de la flufenazina. Latentización para acción muy prolongada: en solución oleosa intramuscular se libera lentamente del depósito y se hidroliza a flufenazina, con efecto de 2 a 4…'
      },
      {
        name: 'Enantato de flufenazina',
        smiles: 'CCCCCCC(=O)OCCN1CCN(CCCN2c3ccccc3Sc3ccc(C(F)(F)F)cc32)CC1',
        formula: 'C29H38F3N3O2S',
        mw: 549.7,
        logP: 6.83,
        hbd: 0,
        hba: 6,
        tpsa: 36.02,
        rotBonds: 12,
        role: 'Éster del ácido heptanoico (enántico). Cadena tres carbonos más corta que el decanoato: liberación algo más rápida y duración menor.'
      },
      {
        name: '1-(2-Hidroxietil)piperazina',
        smiles: 'OCCN1CCNCC1',
        formula: 'C6H14N2O',
        mw: 130.19,
        logP: -1.12,
        hbd: 2,
        hba: 3,
        tpsa: 35.5,
        rotBonds: 2,
        role: 'Reactivo para introducir la cadena lateral de carfenazina y flufenazina. Se prepara protegiendo un N de la piperazina como uretano (ClCOOEt), alquilando el otro con óxido de etileno y desprotegiendo con NaOH: monofuncionalización…'
      },
      {
        name: 'Clorprotixeno',
        smiles: 'CN(C)CC/C=C1/c2ccccc2Sc2ccc(Cl)cc21',
        formula: 'C18H18ClNS',
        mw: 315.87,
        logP: 5.19,
        hbd: 0,
        hba: 2,
        tpsa: 3.24,
        rotBonds: 3,
        role: 'Tioxanteno: el N10 de la fenotiazina se sustituye por un carbono sp2 unido a la cadena por un doble enlace exocíclico. Isosterismo N→C que conserva el farmacóforo. El doble enlace genera isómeros geométricos;'
      },
      {
        name: 'Estructura 1 (Ejercicio 3.3)',
        smiles: 'CN(C)C1Cc2cccc3c2N(C1)c1ccccc1S3',
        formula: 'C17H18N2S',
        mw: 282.41,
        logP: 3.78,
        hbd: 0,
        hba: 3,
        tpsa: 6.48,
        rotBonds: 1,
        role: 'Fenotiazina tetracíclica del ejercicio 3.3: la cadena trimetilénica se cierra sobre el carbono peri de un anillo bencénico.'
      },
      {
        name: 'Petidina',
        smiles: 'CCOC(=O)C1(c2ccccc2)CCN(C)CC1',
        formula: 'C15H21NO2',
        mw: 247.34,
        logP: 2.21,
        hbd: 0,
        hba: 3,
        tpsa: 29.54,
        rotBonds: 3,
        role: 'Analgésico opioide sintético (Dolantina), simplificación de la morfina por supresión de los anillos B, C y D: conserva fenilo, carbono cuaternario y piperidina N-metilada.'
      },
      {
        name: 'Analogo butirofenonico de la petidina',
        smiles: 'CCOC(=O)C1(c2ccccc2)CCN(CCCC(=O)c2ccccc2)CC1',
        formula: 'C24H29NO3',
        mw: 379.5,
        logP: 4.25,
        hbd: 0,
        hba: 4,
        tpsa: 46.61,
        rotBonds: 8,
        role: 'Intermedio conceptual (analgésico y neuroléptico). La cadena 4-oxo-4-fenilbutilo sobre el N de la petidina aporta la acción neuroléptica.'
      },
      {
        name: 'Haloperidol',
        smiles: 'O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1',
        formula: 'C21H23ClFNO2',
        mw: 375.87,
        logP: 4.43,
        hbd: 1,
        hba: 3,
        tpsa: 40.54,
        rotBonds: 6,
        role: 'Prototipo de las butirofenonas: 4-[4-(4-clorofenil)-4-hidroxipiperidino]-4\'-fluorobutirofenona. Antagonista D2 de alta potencia y escasa acción sobre otros receptores: poco sedante e hipotensor, muchos efectos extrapiramidales.'
      },
      {
        name: '4-(4-Clorofenil)piperidin-4-ol',
        smiles: 'OC1(c2ccc(Cl)cc2)CCNCC1',
        formula: 'C11H14ClNO',
        mw: 211.69,
        logP: 1.91,
        hbd: 2,
        hba: 2,
        tpsa: 32.26,
        rotBonds: 1,
        role: 'Fragmento 4-aril-4-piperidinol del haloperidol. En la síntesis: tetrahidropiridina (QFDOS-161) + HBr/AcOH (adición Markovnikov del acetato o bromuro) e hidrólisis con NaOH.'
      },
      {
        name: '4-Cloro-4\'-fluorobutirofenona',
        smiles: 'O=C(CCCCl)c1ccc(F)cc1',
        formula: 'C10H10ClFO',
        mw: 200.64,
        logP: 3.03,
        hbd: 0,
        hba: 1,
        tpsa: 17.07,
        rotBonds: 4,
        role: 'Agente alquilante común a casi todas las butirofenonas (haloperidol, droperidol, trifluperidol). Se obtiene por Friedel-Crafts del fluorobenceno con cloruro de 4-clorobutanoílo.'
      },
      {
        name: 'alfa-Metil-p-cloroestireno',
        smiles: 'C=C(C)c1ccc(Cl)cc1',
        formula: 'C9H9Cl',
        mw: 152.62,
        logP: 3.37,
        hbd: 0,
        hba: 0,
        tpsa: 0,
        rotBonds: 1,
        role: 'Alqueno de partida de la síntesis del haloperidol. Reacciona con formaldehído y NH4Cl (catión iminio CH2=NH2+): adición electrófila al alqueno que recuerda a la reacción de Mannich, segunda adición de formaldehído y ciclación a…'
      },
      {
        name: '4-(4-Clorofenil)-1,2,3,6-tetrahidropiridina',
        smiles: 'Clc1ccc(C2=CCNCC2)cc1',
        formula: 'C11H12ClN',
        mw: 193.68,
        logP: 2.72,
        hbd: 1,
        hba: 1,
        tpsa: 12.03,
        rotBonds: 1,
        role: 'Intermedio del haloperidol (vía Mannich/Prins). Mismo tipo de anillo que el droperidol conserva en el fármaco final.'
      },
      {
        name: 'Droperidol',
        smiles: 'O=C(CCCN1CC=C(n2c(=O)[nH]c3ccccc32)CC1)c1ccc(F)cc1',
        formula: 'C22H22FN3O2',
        mw: 379.44,
        logP: 3.68,
        hbd: 1,
        hba: 3,
        tpsa: 58.1,
        rotBonds: 6,
        role: 'Butirofenona en la que el 4-arilpiperidinol se sustituye por una 4-(2-oxobencimidazolinil)-1,2,3,6-tetrahidropiridina. Neuroléptico de acción corta y antiemético; en anestesia (neuroleptoanalgesia con fentanilo).'
      },
      {
        name: 'Pimozida',
        smiles: 'O=c1[nH]c2ccccc2n1C1CCN(CCCC(c2ccc(F)cc2)c2ccc(F)cc2)CC1',
        formula: 'C28H29F2N3O',
        mw: 461.56,
        logP: 5.86,
        hbd: 1,
        hba: 2,
        tpsa: 41.03,
        rotBonds: 7,
        role: 'Difenilbutilpiperidina: el carbonilo de la butirofenona se sustituye por un segundo anillo p-fluorofenilo, demostrando que la cetona no es imprescindible. Conserva el bencimidazolona-piperidina del droperidol.'
      },
      {
        name: 'Trifluperidol',
        smiles: 'O=C(CCCN1CCC(O)(c2cccc(C(F)(F)F)c2)CC1)c1ccc(F)cc1',
        formula: 'C22H23F4NO2',
        mw: 409.42,
        logP: 4.79,
        hbd: 1,
        hba: 3,
        tpsa: 40.54,
        rotBonds: 6,
        role: 'Análogo del haloperidol con 3-CF3-fenilo en lugar de 4-clorofenilo en el piperidinol. Más potente.'
      },
      {
        name: 'orto-Metoxiprocainamida',
        smiles: 'CCN(CC)CCNC(=O)c1ccc(N)cc1OC',
        formula: 'C14H23N3O2',
        mw: 265.36,
        logP: 1.35,
        hbd: 2,
        hba: 4,
        tpsa: 67.59,
        rotBonds: 7,
        role: 'Procainamida con 2-OMe. Mostró, además de la acción anestésica local esperada, una notable actividad antiemética. Cabeza de serie de las ortopramidas.'
      },
      {
        name: 'Metoclopramida',
        smiles: 'CCN(CC)CCNC(=O)c1cc(Cl)c(N)cc1OC',
        formula: 'C14H22ClN3O2',
        mw: 299.8,
        logP: 2,
        hbd: 2,
        hba: 4,
        tpsa: 67.59,
        rotBonds: 7,
        role: '4-Amino-5-cloro-2-metoxi-N-(2-dietilaminoetil)benzamida (Primperan). Antagonista D2 en la zona quimiorreceptora gatillo: antiemético potente, procinético (también agonista 5-HT4), anestésico local moderado.'
      },
      {
        name: 'Dopamina',
        smiles: 'NCCc1ccc(O)c(O)c1',
        formula: 'C8H11NO2',
        mw: 153.18,
        logP: 0.6,
        hbd: 3,
        hba: 3,
        tpsa: 66.48,
        rotBonds: 2,
        role: 'Protagonista del Tema 3 (misma molécula que QFDOS-008 y QFDOS-048, aquí con su contexto dopaminérgico).'
      },
      {
        name: 'L-DOPA (Levodopa)',
        smiles: 'N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O',
        formula: 'C9H11NO4',
        mw: 197.19,
        logP: 0.05,
        hbd: 4,
        hba: 4,
        tpsa: 103.78,
        rotBonds: 3,
        role: 'Misma molécula que QFDOS-047, aquí como antiparkinsoniano. Profármaco de la dopamina: el resto aminoácido la hace sustrato del transportador LAT1, que la lleva a través de la mucosa intestinal y de la BHE;'
      },
      {
        name: 'Carbidopa',
        smiles: 'C[C@@](Cc1ccc(O)c(O)c1)(NN)C(=O)O',
        formula: 'C10H14N2O4',
        mw: 226.23,
        logP: -0.05,
        hbd: 5,
        hba: 5,
        tpsa: 115.81,
        rotBonds: 4,
        role: 'Misma molécula que QFDOS-094. Inhibidor de la dopa-descarboxilasa periférica (Sinemet con levodopa): análogo α-hidrazínico de la α-metildopa cuya hidrazina forma una hidrazona con el piridoxal fosfato de la AADC.'
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
      }
    ],
    attachments: [
      {
        id: 'att-t03-generador-estructuras',
        title: 'Generador de estructuras del Tema 3 (RDKit · Python): regenera CSV, XLSX, imágenes y figuras QFDOS-127 a 169',
        type: 'data',
        url: 'estructuras/tema3/generar_tema3_completo.py',
        size: '40 KB',
        date: '06/10/2026',
        soloDocente: true
      }
    ],
    testQuestions: [],
    flashcards: []
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
  },
  {
    id: 'tema-varios',
    number: 'Varios',
    title: 'Material General del Curso y Documentación Complementaria',
    subtitle: 'Informes regulatorios FDA, panorama de dianas terapéuticas y recursos transversales',
    description: 'Espacio de recursos generales y lecturas complementarias de Química Farmacéutica II. Contiene los informes oficiales de aprobación de nuevos fármacos por la FDA (Q3 2026), revisiones especializadas sobre el panorama evolutivo de dianas farmacológicas e infografías de referencia.',
    category: 'general',
    keyConcepts: [
      'Aprobaciones de Fármacos FDA (Q3 2026)',
      'Panorama Evolutivo de Dianas Farmacológicas',
      'Química Médica Traslacional',
      'Documentación y Recursos Transversales'
    ],
    slideCount: 0,
    status: 'Publicado',
    slidesPdfUrl: '',
    notesPdfUrl: '',
    geminiNotebookUrl: 'https://notebook.google.com/notebook/4ec999d2-6985-4cd1-8172-5ab07a892986',
    attachments: [
      {
        id: 'att-var-fda-2026',
        title: 'FDA Drug Approvals Q3 2026 (Informe Oficial de Nuevas Moléculas y Biológicos)',
        type: 'pdf',
        url: 'varios/FDA_drug_approved_Q3_2026.pdf',
        size: '1.2 MB',
        date: '28/09/2026'
      },
      {
        id: 'att-var-targets-paper',
        title: 'The Evolving Landscape of Drug Targets (Nature Reviews Drug Discovery)',
        type: 'pdf',
        url: 'varios/The_evolving_landscape_of_drug_targets.pdf',
        size: '1.7 MB',
        date: '28/09/2026'
      },
      {
        id: 'att-var-mapa-dianas',
        title: 'Mapa Infográfico de Dianas Terapéuticas y Familias Farmacológicas (PNG HD)',
        type: 'data',
        url: 'varios/Mapa_de_las_dianas_terapeuticas.png',
        size: '5.1 MB',
        date: '28/09/2026'
      }
    ],
    drugs: [],
    testQuestions: [],
    flashcards: []
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

export const INITIAL_STUDENT_QUESTIONS: StudentQuestion[] = [];
