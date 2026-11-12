// ==========================================================================
// QFDOS - Exámenes del Tema 06: Péptidos como neurotransmisores e hipnoanalgésicos
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Generado con scripts/exportar_examenes_tema6_web.py desde Exámenes modelo jev/Tema 6/banco.
// Mismo orden y claves que los cuadernillos QFDOS_Tema6_Examen{1,2,3}_15preguntas.
// Consolidado contra los apuntes del Tema 6 (Tema 06 - Peptidos como neurotransmisores...).
// Tipografía científica: Unicode directo, sin LaTeX crudo.
// ==========================================================================

import type { TestQuestion } from './qfdosData';

// MODELO 1: Morfina, SAR de C3/C6, N-desmetilación, síntesis de petidina y péptidos opioides
// Clave: A, B, C, D, B, A, D, C, A, C, B, D, A, B, C
export const TEMA6_MODELO_1_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t06-m1-q01",
    topicId: "tema-06",
    block: "SAR · Estereoquímica",
    badge: "Modelo 1 · P1 · SAR · Estereoquímica",
    question: "En la estructura pentacíclica rígida de la morfina natural, ¿cuál es la configuración de sus cinco centros estereogénicos y el perfil de su enantiómero especular?",
    options: [
      { text: "Posee 5R,6S,9R,13S,14R y su enantiómero especular dextrógiro carece de analgesia" },
      { text: "Posee 5S,6R,9S,13R,14S y su enantiómero dextrógiro tiene idéntica analgesia útil" },
      { text: "Posee 5R,6R,9R,13R,14R y su enantiómero especular actúa de antagonista puro mu" },
      { text: "Posee 5S,6S,9S,13S,14S y ambos enantiómeros tienen la misma potencia biológica" },
    ],
    correctIndex: 0,
    explanation: "La morfina natural es un único enantiómero levógiro (-) con configuración absoluta 5R, 6S, 9R, 13S, 14R. Su imagen especular sintética, la (+)-morfina (ent-morfina), carece por completo de actividad analgésica opioide, evidenciando el estricto requerimiento estereoquímico del receptor.\n\nDescartamos la B: La morfina natural es el enantiómero levógiro (-); la (+)-morfina especular no activa los receptores opioides.\nDescartamos la C: La (+)-morfina no es antagonista opioide; carece de afinidad por el bolsillo estereoselectivo del receptor.\nDescartamos la D: El receptor opioide es fuertemente quiral y solo reconoce la disposición espacial del enantiómero natural (-).\n\nReferencia: Apuntes, Estructura pentacíclica y centros quirales."
  },
  {
    id: "t06-m1-q02",
    topicId: "tema-06",
    block: "SAR · Morfina",
    badge: "Modelo 1 · P2 · SAR · Morfina",
    question: "¿Qué consecuencia directa tiene sobre la afinidad intrínseca por el receptor opioide mu la eterificación del fenol C3-OH frente a la del alcohol alílico C6-OH?",
    questionStructures: [{ name: "Morfina (C3-OH y C6-OH libres)", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5" }, { name: "Codeína (C3-OMe bloqueado)", smiles: "COc1ccc2c3c1O[C@H]1[C@@H](O)C=C[C@H]4[C@@H](C2)N(C)CC[C@@]341" }],
    options: [
      { text: "Eterificar C3 incrementa la afinidad; eterificar C6 la anula de forma completa" },
      { text: "Eterificar C3 destruye la afinidad directa; eterificar C6 la conserva o eleva" },
      { text: "Ambas eterificaciones anulan por completo la interacción con el receptor mu" },
      { text: "Ambas eterificaciones aumentan de forma sinérgica la afinidad por el receptor" },
    ],
    correctIndex: 1,
    explanation: "El hidroxilo fenólico en C3 actúa como dador esencial de enlace de hidrógeno con el receptor opioide mu (His297). Si se enmascara como éter metílico (codeína), la afinidad intrínseca cae drásticamente. En cambio, el hidroxilo alílico en C6 no establece interacciones clave; su eterificación u oxidación reduce la polaridad hidrofilica y eleva la lipofilia neta, incrementando la penetración en SNC y la potencia (como ocurre en la heterocodeína).\n\nDescartamos la A: El fenol C3-OH libre es indispensable para donar un enlace de H esencial con His297 en el receptor mu.\nDescartamos la C: El C6-OH no es indispensable; enmascararlo en la heterocodeína aumenta la potencia unas 5 veces.\nDescartamos la D: La metilación de C3 genera codeína, cuya afinidad intrínseca directa cae entre 10 y 50 veces.\n\nReferencia: Apuntes, Relaciones estructura–actividad (SAR) de la morfina."
  },
  {
    id: "t06-m1-q03",
    topicId: "tema-06",
    block: "Metabolismo · Glucurónidos",
    badge: "Modelo 1 · P3 · Metabolismo · Glucurónidos",
    question: "En la glucuronidación hepática de fase II de la morfina mediada por UGT2B7, ¿qué perfiles farmacológicos opuestos presentan el M3G frente al M6G?",
    options: [
      { text: "M3G es el metabolito analgésico principal; M6G carece por completo de actividad útil" },
      { text: "Ambos metabolitos poseen idéntica afinidad mu y la misma capacidad antinociceptiva" },
      { text: "M3G carece de analgesia y es neurotóxico; M6G es analgésico más potente que morfina" },
      { text: "M3G provoca depresión respiratoria letal; M6G bloquea selectivamente receptores kappa" },
    ],
    correctIndex: 2,
    explanation: "La morfina sufre glucuronidación mayoritaria en el fenol C3 rindiendo morfina-3-glucurónido (M3G, ~60%), el cual carece de actividad opioide mu y es responsable de efectos neuroexcitadores (alodinia, mioclonías). En cambio, la glucuronidación en el alcohol alílico rinde morfina-6-glucurónido (M6G, ~10%), metabolito que conserva el C3-OH libre y resulta dos a cuatro veces más potente como analgésico mu que la propia morfina.\n\nDescartamos la A: El bloqueo del fenol en C3 en M3G destruye el enlace de hidrógeno esencial para la afinidad mu.\nDescartamos la B: M3G no tiene analgesia y produce hiperalgesia/alodinia, mientras M6G es analgésico activo.\nDescartamos la D: M6G activa receptores mu causando analgesia; M3G es neuroexcitador sin acción opioide mu.\n\nReferencia: Apuntes, Modificaciones en el fenol (C3–OH)."
  },
  {
    id: "t06-m1-q04",
    topicId: "tema-06",
    block: "Farmacocinética · Heroína",
    badge: "Modelo 1 · P4 · Farmacocinética · Heroína",
    question: "Tras la administración de heroína, ¿qué etapas metabólicas explican su rápido inicio de acción («flash») seguido de analgesia mantenida?",
    options: [
      { text: "Unión directa covalente con el receptor mu sin requerir ninguna hidrólisis previa" },
      { text: "Conjugación selectiva con sulfato en riñón antes de su distribución en el cerebro" },
      { text: "Inhibición irreversible de CYP2D6 que impide la degradación hepática de alcaloides" },
      { text: "Cruce rápido de BHE por lipofilia, hidrólisis a 6-MAM y posterior paso a morfina" },
    ],
    correctIndex: 3,
    explanation: "La diacetilmorfina atraviesa la barrera hematoencefálica con enorme rapidez debido a su elevada lipofilia (logP mucho mayor que morfina). En el tejido cerebral, las esterasas hidrolizan rápidamente el éster fenólico C3 rindiendo 6-MAM (activo inmediato de gran afinidad) y, más lentamente, el éster C6 rindiendo morfina libre, que mantiene la analgesia prolongada.\n\nDescartamos la A: La heroína in vitro presenta afinidad insignificante y se comporta como profármaco.\nDescartamos la B: La activación es enzimática por esterasas tisulares cerebrales y plasmáticas, no renal.\nDescartamos la C: La heroína se hidroliza por carboxilesterasas inespecíficas, no por enzimas del citocromo P450.\n\nReferencia: Apuntes, La heroína como profármaco de penetración rápida."
  },
  {
    id: "t06-m1-q05",
    topicId: "tema-06",
    block: "SAR · Heroína",
    badge: "Modelo 1 · P5 · SAR · Heroína",
    question: "¿Cuál de las siguientes estructuras corresponde al metabolito 6-monoacetilmorfina (6-MAM), responsable de la rápida activación de receptores opioides en el SNC tras la hidrólisis de heroína?",
    options: [
      { text: "Estructura A", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Morfina" },
      { text: "Estructura B", smiles: "CC(=O)O[C@H]1C=C[C@H]2[C@H]3CC4=C5[C@]2([C@H]1OC5=C(C=C4)O)CCN3C", revealedName: "6-Monoacetilmorfina (6-MAM)" },
      { text: "Estructura C", smiles: "CC(=O)Oc1ccc2c3c1O[C@H]1[C@@H](OC(C)=O)C=C[C@H]4[C@@H](C2)N(C)CC[C@@]341", revealedName: "Heroína (Diacetilmorfina)" },
      { text: "Estructura D", smiles: "CC(=O)Oc1ccc2c3c1O[C@H]1[C@@H](O)C=C[C@H]4[C@@H](C2)N(C)CC[C@@]341", revealedName: "3-Monoacetilmorfina" },
    ],
    correctIndex: 1,
    explanation: "La 6-monoacetilmorfina (6-MAM) conserva el fenol C3-OH libre (indispensable para el enlace de H con el receptor) y mantiene esterificado el C6-OH con un grupo acetilo, lo que le confiere alta lipofilia y afinidad por el receptor mu superior a la propia morfina.\n\nDescartamos la A: La morfina presenta ambos hidroxilos libres (C3-OH y C6-OH), no el éster acetato en C6.\nDescartamos la C: La heroína es el diacetilderivado (acetilada en C3 y C6) y se comporta como profármaco inactivo in vitro.\nDescartamos la D: La 3-monoacetilmorfina posee el fenol C3 acetilado y carece de afinidad directa por el receptor mu.\n\nReferencia: Apuntes, La heroína como profármaco de penetración rápida."
  },
  {
    id: "t06-m1-q06",
    topicId: "tema-06",
    block: "SAR · Farmacóforo",
    badge: "Modelo 1 · P6 · SAR · Farmacóforo",
    question: "En el modelo farmacofórico de interacción de la morfina con el receptor opioide mu, ¿qué interacción determinante establece su nitrógeno terciario protonado?",
    options: [
      { text: "Un enlace iónico determinante con el carboxilato aniónico de Asp147" },
      { text: "Un enlace covalente de alta energía con el tiolato de una cisteína" },
      { text: "Una coordinación de enlace dativo con iones divalentes de magnesio" },
      { text: "Un apilamiento pi aromático directo con el anillo indólico de triptófano" },
    ],
    correctIndex: 0,
    explanation: "A pH fisiológico (~7,4), el nitrógeno terciario de la morfina (pKa ~8,0) se encuentra protonado en un 80% como catión amonio, formando un enlace electrostático (par iónico) esencial con el carboxilato del aspartato Asp147 (TM3) del receptor mu.\n\nDescartamos la B: La interacción no es covalente; se trata de un enlace iónico reversible entre el catión amonio y el carboxilato.\nDescartamos la C: El nitrógeno protonado interactúa electrostáticamente con residuos ácidos, no con cationes metálicos.\nDescartamos la D: El apilamiento pi involucra al anillo A aromático de la morfina, mientras que el nitrógeno forma un par iónico.\n\nReferencia: Apuntes, El farmacóforo opioide y el modelo de interacción con el receptor."
  },
  {
    id: "t06-m1-q07",
    topicId: "tema-06",
    block: "Síntesis · N-desmetilación",
    badge: "Modelo 1 · P7 · Síntesis · N-desmetilación",
    question: "¿Qué secuencia de reactivos permite la N-desmetilación quimioselectiva de derivados morfinánicos para acceder a normorfina o noroximorfona?",
    questionStructures: [{ name: "Morfina (N17-Me)", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5" }, { name: "Normorfina (N17-H)", smiles: "NCC[C@]12c3c4ccc(O)c3O[C@H]1[C@@H](O)C=C[C@H]2[C@H]5CC45" }],
    options: [
      { text: "Tratamiento directo con borohidruro sódico en medio alcohólico bajo reflujo suave" },
      { text: "Oxidación drástica con permanganato potásico seguida de transposición catalítica" },
      { text: "Alquilación exhaustiva con yoduro de metilo seguida de eliminación con hidróxido" },
      { text: "Cloroformiato de etilo o de alfa-cloroetilo y posterior hidrólisis del carbamato" },
    ],
    correctIndex: 3,
    explanation: "La reacción de von Braun modificada utiliza cloroformiatos de alquilo o de alfa-cloroetilo (ACE-Cl) para atacar nucleofílicamente al nitrógeno terciario, expulsando cloruro de metilo y formando un carbamato intermedio que se desprotege fácilmente por hidrólisis ácida o con metanol a reflujo para rendir la amina secundaria (nor-derivado).\n\nDescartamos la A: El borohidruro sódico reduce aldehídos y cetonas, pero no escinde enlaces C-N de aminas terciarias.\nDescartamos la B: El permanganato destruye el sistema aromático y oxida los alcoholes de forma inespecífica.\nDescartamos la C: La degradación de Hofmann en la morfina provoca apertura del ciclo de piperidina, no N-desmetilación.\n\nReferencia: Apuntes, Semisíntesis: N-desmetilación con cloroformiatos."
  },
  {
    id: "t06-m1-q08",
    topicId: "tema-06",
    block: "SAR · Antagonistas",
    badge: "Modelo 1 · P8 · SAR · Antagonistas",
    question: "¿Cuál de las siguientes estructuras corresponde a la naloxona, antagonista opioide puro portador de un grupo alilo en N17 y un hidroxilo en C14?",
    options: [
      { text: "Estructura A", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Morfina" },
      { text: "Estructura B", smiles: "C=CCN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Nalorfina" },
      { text: "Estructura C", smiles: "C=CCN1CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@@]3(O)[C@H]1C5", revealedName: "Naloxona" },
      { text: "Estructura D", smiles: "NCC[C@]12c3c4ccc(O)c3O[C@H]1[C@@H](O)C=C[C@H]2[C@H]5CC45", revealedName: "Normorfina" },
    ],
    correctIndex: 2,
    explanation: "La naloxona combina la cadena N-alilo (que proyecta hacia la cavidad accesoria hidrofóbica del receptor e impide el cambio conformacional de activación) con el sustituyente 14-OH y la función cetona en C6, confiriendo un perfil de antagonista competitivo puro.\n\nDescartamos la A: La morfina porta un grupo N-metilo y es un agonista pleno, no un antagonista.\nDescartamos la B: La nalorfina tiene grupo N-alilo pero carece del 14-OH y conserva el alcohol alílico C6-OH, siendo agonista parcial kappa.\nDescartamos la D: La normorfina es la amina secundaria desmetilada (N-H), no portadora de cadena alílica ni 14-OH.\n\nReferencia: Apuntes, SAR del nitrógeno: tamaño de la cadena y transición a antagonistas."
  },
  {
    id: "t06-m1-q09",
    topicId: "tema-06",
    block: "Síntesis · Petidina",
    badge: "Modelo 1 · P9 · Síntesis · Petidina",
    question: "En la síntesis clásica de la petidina a partir de mecloretamina y fenilacetonitrilo, ¿qué reactivos y condiciones conducen al cierre del anillo de piperidina?",
    options: [
      { text: "Doble alquilación en alfa con amiduro sódico en medio fuertemente básico" },
      { text: "Condensación aldólica intramolecular con ácido sulfúrico acuoso a reflujo" },
      { text: "Cicloadición térmica concertada sin intervención de base desprotonante" },
      { text: "Acilación intramolecular de Friedel-Crafts con tricloruro de aluminio" },
    ],
    correctIndex: 0,
    explanation: "El fenilacetonitrilo posee protones en alfa acidificados por el grupo ciano y el fenilo. El amiduro sódico (NaNH2) genera sucesivamente los carbaniones que atacan por sustitución nucleófila bimolecular (SN2) a los dos brazos clorados de la bis(2-cloroetil)metilamina (mecloretamina), cerrando la piperidina tetrasustituida en C4.\n\nDescartamos la B: El fenilacetonitrilo y las mostazas nitrogenadas no condensan por catálisis ácida de tipo aldólico.\nDescartamos la C: La reacción consiste en dos ataques nucleófilos SN2 sucesivos sobre carbonos sp3 con cloruro saliente.\nDescartamos la D: No hay cloruros de acilo ni anillos aromáticos que sufran sustitución electrófila aromática en este paso.\n\nReferencia: Apuntes, Síntesis de la petidina."
  },
  {
    id: "t06-m1-q10",
    topicId: "tema-06",
    block: "Síntesis · Petidina",
    badge: "Modelo 1 · P10 · Síntesis · Petidina",
    question: "¿Cuál de las siguientes estructuras corresponde al intermedio 4-ciano-4-fenilpiperidina obtenido tras la ciclación antes de la eterificación a petidina?",
    options: [
      { text: "Estructura A", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", revealedName: "Petidina" },
      { text: "Estructura B", smiles: "CCC(=O)C1(c2cccc(O)c2)CCN(C)CC1", revealedName: "Cetobemidona" },
      { text: "Estructura C", smiles: "N#CC1(c2ccccc2)CCN(C)CC1", revealedName: "4-Ciano-4-fenil-1-metilpiperidina" },
      { text: "Estructura D", smiles: "CCC(=O)N(c1ccccc1)C1CCN(CCc2ccccc2)CC1", revealedName: "Fentanilo" },
    ],
    correctIndex: 2,
    explanation: "La doble alquilación del fenilacetonitrilo con mecloretamina rinde 4-ciano-4-fenil-1-metilpiperidina. Posteriormente, la hidrólisis ácida del nitrilo combinada con etanol rinde el éster etílico de la petidina en una sola etapa.\n\nDescartamos la A: La petidina es el éster etílico final (C4-COOEt), no el intermedio nitrilo inicial.\nDescartamos la B: La cetobemidona posee un grupo propionilo y fenol en meta, siendo un producto analgésico final.\nDescartamos la D: El fentanilo es una anilidopiperidina con cadena N-fenetilo y sin grupo nitrilo.\n\nReferencia: Apuntes, Síntesis de la petidina."
  },
  {
    id: "t06-m1-q11",
    topicId: "tema-06",
    block: "Síntesis · Orvinoles",
    badge: "Modelo 1 · P11 · Síntesis · Orvinoles",
    question: "En la cicloadición de Diels–Alder entre la tebaína y la metilvinilcetona, ¿por qué cara del sistema diénico ocurre el ataque y qué puente bicíclico se genera?",
    options: [
      { text: "Por la cara beta impedida por la piperidina, formando un puente 7,8-epóxido" },
      { text: "Por la cara alfa menos impedida, formando un puente rígido 6,14-endo-eteno" },
      { text: "Por ambas caras de modo aleatorio, generando mezclas equimolares racémicas" },
      { text: "A través del anillo aromático A, rompiendo la aromaticidad del feniléter" },
    ],
    correctIndex: 1,
    explanation: "La tebaína posee un dieno conjugado endo en el anillo C (C6=C7-C8=C14). La cicloadición [4+2] con dienófilos como la metilvinilcetona transcurre con estricto control estereoquímico por la cara alfa (inferior), ya que la cara beta se halla muy impedida por el puente etanoamina (C9-C13-C15-C16-N17), originando el puente 6,14-endo-eteno con total estereoselectividad.\n\nDescartamos la A: La cara beta está estéricamente bloqueada por el puente etanoamina de la piperidina.\nDescartamos la C: La reacción es completamente diastereofacialmente selectiva por la cara inferior alfa.\nDescartamos la D: El dieno de la tebaína está situado en el anillo C (C6-C7=C8-C14), no en el anillo aromático A.\n\nReferencia: Apuntes, Cicloadición de Diels–Alder sobre la tebaína."
  },
  {
    id: "t06-m1-q12",
    topicId: "tema-06",
    block: "Bioquímica · Señalización Gi/Go",
    badge: "Modelo 1 · P12 · Bioquímica · Señalización Gi/Go",
    question: "Tras la fijación de la morfina al receptor opioide mu acoplado a proteínas heterotriméricas Gi/Go, ¿qué cascada de señalización intracelular se desencadena?",
    options: [
      { text: "Aumento de AMPc por activación de Gs y despolarización masiva por entrada de Na+" },
      { text: "Activación constitutiva de fosfolipasa C con liberación masiva intracelular de IP3" },
      { text: "Fosforilación de tirosina cinasas de membrana sin intervención de nucleótidos cíclicos" },
      { text: "Caída de AMPc por inhibición de adenilato ciclasa y modulación de canales Ca2+/K+" },
    ],
    correctIndex: 3,
    explanation: "El receptor mu activa la subunidad alfa-i/o que inhibe la adenilil ciclasa reduciendo los niveles intracelulares de AMPc. De modo simultáneo, las subunidades beta-gamma cierran canales de Ca2+ dependientes de voltaje en terminales presinápticas (bloqueando la exocitosis de glutamato y sustancia P) y abren canales de K+ rectificadores entrantes (GIRK) postsinápticos, hiperpolarizando la neurona.\n\nDescartamos la A: Los receptores mu se acoplan a Gi/Go inhibiendo la adenilato ciclasa, nunca a Gs.\nDescartamos la B: La vía de PLC/IP3 es típica de receptores acoplados a Gq, no de los opioides Gi/Go.\nDescartamos la C: Los receptores opioides son GPCR clásicos de siete hélices transmembrana, no receptores catalíticos RTK.\n\nReferencia: Apuntes, Cuatro familias de receptores opioides acoplados a proteína G."
  },
  {
    id: "t06-m1-q13",
    topicId: "tema-06",
    block: "Bioquímica · Péptidos endógenos",
    badge: "Modelo 1 · P13 · Bioquímica · Péptidos endógenos",
    question: "¿Cuál de las siguientes estructuras corresponde al pentapéptido opioide endógeno Met-encefalina (H-Tyr-Gly-Gly-Phe-Met-OH)?",
    options: [
      { text: "Estructura A", smiles: "CSCC[C@@H](C(=O)O)NC(=O)[C@H](CC1=CC=CC=C1)NC(=O)CNC(=O)CNC(=O)[C@H](CC2=CC=C(C=C2)O)N", revealedName: "Metionina-encefalina (Met-encefalina)" },
      { text: "Estructura B", smiles: "C[C@H](C(=O)NCC(=O)N(C)[C@@H](CC1=CC=CC=C1)C(=O)NCCO)NC(=O)[C@H](CC2=CC=C(C=C2)O)N", revealedName: "DAMGO" },
      { text: "Estructura C", smiles: "CC(C)C[C@@H](NC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@H](N)Cc1ccccc1)C(=O)N[C@H](CCCCN)C(=O)N1CCC(N)(C(=O)O)CC1", revealedName: "Difelikefalina" },
      { text: "Estructura D", smiles: "CC(C)C[C@@H](C(=O)O)NC(=O)[C@H](CC1=CC=CC=C1)NC(=O)CNC(=O)CNC(=O)[C@H](CC2=CC=C(C=C2)O)N", revealedName: "Leucina-encefalina (Leu-encefalina)" },
    ],
    correctIndex: 0,
    explanation: "La Met-encefalina es un pentapéptido opioide endógeno sintetizado a partir de la proencefalina; su secuencia es H-Tyr-Gly-Gly-Phe-Met-OH y actúa como agonista fisiológico con afinidad preferente por receptores delta y mu.\n\nDescartamos la B: DAMGO es un análogo sintético modificado con D-Ala2, N-Me-Phe4 y alcohol terminal Gly-ol.\nDescartamos la C: La difelikefalina es un tetrapéptido D-aminoacídico sintético con núcleo piperidina terminal.\nDescartamos la D: La Leu-encefalina posee leucina en el extremo carboxilo terminal en lugar de metionina.\n\nReferencia: Apuntes, Péptidos opioides endógenos: las encefalinas."
  },
  {
    id: "t06-m1-q14",
    topicId: "tema-06",
    block: "Bioquímica · Farmacóforo peptídico",
    badge: "Modelo 1 · P14 · Bioquímica · Farmacóforo peptídico",
    question: "En la superposición farmacofórica entre las encefalinas y los alcaloides del opio, ¿qué resto aminoacídico mimetiza las funciones esenciales de la morfina?",
    options: [
      { text: "El residuo hidrofóbico de fenilalanina mediante apilamiento aromático con Trp" },
      { text: "El residuo Tyr1 con su fenol dador de enlace de H y su centro catiónico básico" },
      { text: "El grupo metionina terminal a través de interacciones electrostáticas con azufre" },
      { text: "Los dos restos glicina centrales que aportan la rigidez conformacional necesaria" },
    ],
    correctIndex: 1,
    explanation: "El residuo N-terminal L-tirosina (Tyr1) de las encefalinas reproduce la tríada farmacofórica básica de la morfina: el fenol de su cadena lateral mimetiza el fenol C3-OH del anillo A, mientras que su grupo alfa-amino protonado a pH biológico se superpone espacialmente con el nitrógeno protonado de la piperidina de la morfina.\n\nDescartamos la A: Phe4 interactúa con un bolsillo hidrofóbico accesorio, mimetizando el fenetilo del fentanilo.\nDescartamos la C: La cadena terminal C-terminal modula la selectividad de subtipo, no el farmacóforo básico.\nDescartamos la D: Las dos glicinas actúan como espaciador flexible, no como grupos dadores o catiónicos.\n\nReferencia: Apuntes, Superposición farmacofórica: la tirosina como mímica de la morfina."
  },
  {
    id: "t06-m1-q15",
    topicId: "tema-06",
    block: "Síntesis · Fentanilo",
    badge: "Modelo 1 · P15 · Síntesis · Fentanilo",
    question: "En la ruta industrial del fentanilo a partir de 1-fenetil-4-piperidona, ¿qué secuencia sintética completa la obtención del analgésico final?",
    questionStructures: [{ name: "1-Fenetil-4-piperidona", smiles: "C1CN(CCC1=O)CCc2ccccc2" }, { name: "Intermedio 4-ANPP", smiles: "C1CN(CCC1Nc2ccccc2)CCc3ccccc3" }],
    options: [
      { text: "Bencilamina con cianuro sódico y posterior hidrólisis ácida de la función amida" },
      { text: "Fenilhidrazina seguida de reducción con cinc metálico en medio acético caliente" },
      { text: "Anilina con NaBH(OAc)3 para formar 4-ANPP y acilación con cloruro de propionilo" },
      { text: "Nitrobenceno en medio reductor con hidruro de litio y aluminio bajo reflujo seco" },
    ],
    correctIndex: 2,
    explanation: "La síntesis de Janssen del fentanilo condensa 1-fenetil-4-piperidona con anilina para formar una imina (base de Schiff), la cual se reduce selectivamente in situ con triacetoxiborohidruro sódico (o NaBH4) para aislar la 4-anilinopiperidina (4-ANPP), seguida de acilación con cloruro de propionilo.\n\nDescartamos la A: La ruta del fentanilo no utiliza síntesis de Strecker ni intermediarios alfa-aminonitrilo.\nDescartamos la B: La fenilhidrazina formaría hidrazonas que ciclarían a indoles, no a 4-anilidopiperidinas.\nDescartamos la D: El nitrobenceno no reacciona como amina nucleófila sobre cetonas para dar iminas intermedias.\n\nReferencia: Apuntes, La síntesis del fentanilo: aminación reductora."
  }
];

// MODELO 2: Heroína, farmacóforo opioide, sustituyente 14-OH, morfinanos, cetobemidona y acoplamiento Gi/Go
// Clave: C, A, D, B, A, C, B, D, C, A, D, B, D, A, C
export const TEMA6_MODELO_2_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t06-m2-q01",
    topicId: "tema-06",
    block: "Síntesis · Heroína",
    badge: "Modelo 2 · P1 · Síntesis · Heroína",
    question: "¿Cuál de las siguientes estructuras corresponde a la diacetilmorfina (heroína), obtenida por tratamiento exhaustivo de la morfina con anhídrido acético a reflujo?",
    options: [
      { text: "Estructura A", smiles: "CC(=O)Oc1ccc2c3c1O[C@H]1[C@@H](O)C=C[C@H]4[C@@H](C2)N(C)CC[C@@]341", revealedName: "3-Acetilmorfina" },
      { text: "Estructura B", smiles: "CC(=O)O[C@H]1C=C[C@H]2[C@H]3CC4=C5[C@]2([C@H]1OC5=C(C=C4)O)CCN3C", revealedName: "6-Acetilmorfina (6-MAM)" },
      { text: "Estructura C", smiles: "CC(=O)Oc1ccc2c3c1O[C@H]1[C@@H](OC(C)=O)C=C[C@H]4[C@@H](C2)N(C)CC[C@@]341", revealedName: "Heroína (Diacetilmorfina)" },
      { text: "Estructura D", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Morfina" },
    ],
    correctIndex: 2,
    explanation: "La reacción de la morfina con exceso de anhídrido acético (Ac2O) o cloruro de acetilo calienta y acetila secuencialmente primero el fenol C3-OH (más nucleófilo por resonancia fenólica) y luego el alcohol secundario alílico en C6, rindiendo diacetilmorfina pura (heroína).\n\nDescartamos la A: La 3-acetilmorfina es el producto de monoacetilación selectiva del fenol C3-OH en frío.\nDescartamos la B: La 6-acetilmorfina presenta el fenol C3-OH libre y solo el C6-OH esterificado.\nDescartamos la D: La morfina es el reactivo dihidroxilado de partida sin ningún grupo acetato.\n\nReferencia: Apuntes, La heroína como profármaco de penetración rápida."
  },
  {
    id: "t06-m2-q02",
    topicId: "tema-06",
    block: "SAR · Morfinanos y 14-OH",
    badge: "Modelo 2 · P2 · SAR · Morfinanos y 14-OH",
    question: "¿Cuál de las siguientes estructuras corresponde a la oximorfona, agonista opioide semisintético portador del grupo 14-hidroxilo y carbonilo en C6?",
    options: [
      { text: "Estructura A", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@@]3(O)[C@H]1C5", revealedName: "Oximorfona" },
      { text: "Estructura B", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Morfina" },
      { text: "Estructura C", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@H]3[C@H]1C5", revealedName: "Hidromorfona" },
      { text: "Estructura D", smiles: "COc1ccc2c3c1O[C@H]1C(=O)CC[C@@]4(O)[C@@H](C2)N(C)CC[C@]314", revealedName: "Oxicodona" },
    ],
    correctIndex: 0,
    explanation: "La oximorfona incorpora un grupo hidroxilo terciario en C14 en configuración beta junto a la cetona en C6 y saturación de C7-C8, lo que incrementa su afinidad y potencia analgésica unas 10 veces respecto a la morfina.\n\nDescartamos la B: La morfina carece de hidroxilo en C14 y posee un alcohol secundario alílico en C6.\nDescartamos la C: La hidromorfona presenta carbonilo en C6 pero carece del grupo 14-hidroxilo (C14-H).\nDescartamos la D: La oxicodona porta un éter metílico en C3 (C3-OMe), comportándose como derivado de codeína.\n\nReferencia: Apuntes, El sustituyente 14-OH: oximorfona y oxicodona."
  },
  {
    id: "t06-m2-q03",
    topicId: "tema-06",
    block: "Farmacocinética · PAMORA",
    badge: "Modelo 2 · P3 · Farmacocinética · PAMORA",
    question: "¿Qué mecanismo farmacocinético impide que el naloxegol cruce la barrera hematoencefálica y le permite revertir el estreñimiento opioide sin antagonizar la analgesia?",
    options: [
      { text: "La presencia de una carga permanente de amonio cuaternario en su anillo piperidínico" },
      { text: "La formación de enlaces covalentes irreversibles con mucinas del epitelio entérico" },
      { text: "Su inmediata hidrólisis por fosfatasas plasmáticas antes de alcanzar los capilares" },
      { text: "Su conjugación con PEG lo hace sustrato de expulsión activa por glicoproteína P" },
    ],
    correctIndex: 3,
    explanation: "El naloxegol es el derivado de naloxol conjugado en C6 con una cadena monodispersa de polietilenglicol (PEG). Aunque es una amina terciaria neutra, la cadena hidrófila de PEG reduce la permeabilidad pasiva y, fundamentalmente, convierte a la molécula en un excelente sustrato del transportador de eflujo glicoproteína P (P-gp/ABCB1) en el endotelio cerebral, expulsándolo activamente hacia la luz capilar.\n\nDescartamos la A: El naloxegol no es una sal de amonio cuaternario sino una amina terciaria pegilada.\nDescartamos la B: El naloxegol es un antagonista competitivo reversible del receptor opioide mu.\nDescartamos la C: La cadena de PEG unida por enlace éter al C6-OH es químicamente muy estable en sangre.\n\nReferencia: Apuntes, Antagonistas periféricos (PAMORA)."
  },
  {
    id: "t06-m2-q04",
    topicId: "tema-06",
    block: "SAR · Morfinanos",
    badge: "Modelo 2 · P4 · SAR · Morfinanos",
    question: "¿Cuál de las siguientes estructuras corresponde al levorfanol, morfinano obtenido por eliminación formal del puente éter furánico de la morfina?",
    options: [
      { text: "Estructura A", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Morfina" },
      { text: "Estructura B", smiles: "CN1CC[C@]23CCCC[C@H]2[C@H]1Cc1ccc(O)cc13", revealedName: "Levorfanol" },
      { text: "Estructura C", smiles: "CC(C)=CCN1CCC2(C)c3cc(O)ccc3CC1C2C", revealedName: "Pentazocina" },
      { text: "Estructura D", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", revealedName: "Petidina" },
    ],
    correctIndex: 1,
    explanation: "El levorfanol representa la simplificación a morfinano (sistema tetracíclico A-B-C-D), prescindiendo del anillo E (furano) y del oxígeno alílico en C6, rindiendo un fármaco con afinidad mu y potencia superiores a la morfina.\n\nDescartamos la A: La morfina conserva el anillo dihidrofuránico E (puente éter 4,5-epóxido).\nDescartamos la C: La pentazocina es un 6,7-benzomorfano donde también se ha eliminado el anillo C de ciclohexano.\nDescartamos la D: La petidina es una 4-fenilpiperidina monocíclica con éster etílico, no un morfinano tetracíclico.\n\nReferencia: Apuntes, Morfinanos: eliminación del puente éter (anillo B)."
  },
  {
    id: "t06-m2-q05",
    topicId: "tema-06",
    block: "SAR · Morfinanos",
    badge: "Modelo 2 · P5 · SAR · Morfinanos",
    question: "Al comparar los enantiómeros de la serie del morfinano mostrados, ¿qué divergencia farmacológica fundamental exhiben el levorfanol y el dextrometorfano?",
    questionStructures: [{ name: "Levorfanol (−)", smiles: "CN1CC[C@]23CCCC[C@H]2[C@H]1Cc1ccc(O)cc13" }, { name: "Dextrometorfano (+)", smiles: "COc1ccc2c(c1)[C@]13CCCC[C@@H]1[C@H](C2)N(C)CC3" }],
    options: [
      { text: "El levógiro es potente agonista mu; el dextrógiro es antitusígeno sin acción mu" },
      { text: "El dextrógiro es el agonista mu; el levógiro carece de cualquier efecto biológico" },
      { text: "Ambos enantiómeros provocan idéntica depresión respiratoria y adicción física" },
      { text: "El levógiro actúa como antagonista puro; el dextrógiro es agonista de tipo kappa" },
    ],
    correctIndex: 0,
    explanation: "La serie del morfinano muestra una divergencia eudísmica clásica: el enantiómero levógiro (-) (levorfanol) es un analgésico opioide mu más potente que la morfina, mientras que la serie dextrógira (+) (dextrometorfano) carece de afinidad por receptores opioides y se emplea como antitusígeno de acción central.\n\nDescartamos la B: El enantiómero levógiro (-) es el eutómero analgésico opioide mu; el dextrógiro no se une al receptor mu.\nDescartamos la C: El dextrometorfano no genera adicción ni depresión respiratoria opioide a dosis terapéuticas.\nDescartamos la D: El levorfanol es agonista pleno mu; el dextrometorfano modula receptores sigma y bloquea canales NMDA.\n\nReferencia: Apuntes, Enantiómeros con perfiles farmacológicos opuestos."
  },
  {
    id: "t06-m2-q06",
    topicId: "tema-06",
    block: "SAR · Benzomorfanos",
    badge: "Modelo 2 · P6 · SAR · Benzomorfanos",
    question: "En la serie de los 6,7-benzomorfanos representada por la pentazocina y metazocina, ¿qué elementos del esqueleto original de la morfina han sido suprimidos?",
    options: [
      { text: "Se ha eliminado únicamente el fenol C3-OH, manteniendo intactos los cinco ciclos" },
      { text: "Se conservan los anillos B y C eliminando por completo la amina de la piperidina" },
      { text: "Se han suprimido los anillos B y C, conservando el núcleo benzomorfanicidónico" },
      { text: "Se ha escindido el anillo aromático A, reteniendo los anillos B, C, D y el éter E" },
    ],
    correctIndex: 2,
    explanation: "Los 6,7-benzomorfanos proceden de la supresión simultánea del anillo furánico (éter 4,5) y del anillo C (ciclohexénico), dejando únicamente el anillo aromático A fusionado a la piperidina D (sistema bicíclico benzomorfanicidónico) con dos metilos en las posiciones equivalentes a C13 y C14.\n\nDescartamos la A: El fenol aromático se conserva para la interacción mu; lo que se suprime son los anillos B y C.\nDescartamos la B: El nitrógeno básico del anillo D es indispensable para el par iónico y no puede suprimirse.\nDescartamos la D: El anillo aromático A es un pilar farmacofórico absoluto y se conserva siempre.\n\nReferencia: Apuntes, 6,7-Benzomorfanos: eliminación de los anillos B y C."
  },
  {
    id: "t06-m2-q07",
    topicId: "tema-06",
    block: "Metabolismo · Petidina",
    badge: "Modelo 2 · P7 · Metabolismo · Petidina",
    question: "En pacientes con alteración de la función renal tratados con petidina, ¿qué complicación grave ocasiona la acumulación de su metabolito norpetidina?",
    options: [
      { text: "Bloqueo auriculoventricular irreversible mediado por toxicidad mitocondrial" },
      { text: "Hiperexcitabilidad del SNC con mioclonías, temblores e inducción de convulsiones" },
      { text: "Sedación profunda continua sin riesgo de excitación cortical ni crisis mioclónicas" },
      { text: "Hipertensión maligna refractaria por liberación masiva periférica de histamina" },
    ],
    correctIndex: 1,
    explanation: "La petidina sufre N-desmetilación hepática rindiendo norpetidina. Este metabolito tiene una semivida de eliminación larga (15 a 30 horas frente a 3 horas de petidina) y se excreta por vía renal; en insuficiencia renal o tratamientos prolongados se acumula y cruza la BHE provocando hiperexcitabilidad neuronal, temblores, mioclonías y crisis convulsivas refractarias a naloxona.\n\nDescartamos la A: La toxicidad principal de la norpetidina es cortical central, no necrosis miocárdica.\nDescartamos la C: La norpetidina tiene menor efecto analgésico y el doble de potencia como agente convulsivante.\nDescartamos la D: La acumulación no se manifiesta por hipertensión maligna sino por neurotoxicidad y convulsiones.\n\nReferencia: Apuntes, 4-Fenilpiperidinas: petidina y cetobemidona."
  },
  {
    id: "t06-m2-q08",
    topicId: "tema-06",
    block: "SAR · Piperidinas",
    badge: "Modelo 2 · P8 · SAR · Piperidinas",
    question: "¿Cuál de las siguientes estructuras corresponde a la petidina (meperidina), prototipo analgésico de la familia de las 4-fenilpiperidinas?",
    options: [
      { text: "Estructura A", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Morfina" },
      { text: "Estructura B", smiles: "CCC(=O)C1(c2cccc(O)c2)CCN(C)CC1", revealedName: "Cetobemidona" },
      { text: "Estructura C", smiles: "CCC(=O)C(CC(C)N(C)C)(c1ccccc1)c1ccccc1", revealedName: "Metadona" },
      { text: "Estructura D", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", revealedName: "Petidina" },
    ],
    correctIndex: 3,
    explanation: "La petidina fue el primer opioide sintético simple; conserva únicamente el anillo aromático A y la piperidina D (4-fenilpiperidina) con un éster etílico en el carbono cuaternario C4 y un grupo N-metilo.\n\nDescartamos la A: La morfina es un sistema pentacíclico rígido, mientras que la petidina es una piperidina monocíclica flexible.\nDescartamos la B: La cetobemidona porta una cetona propionilo en C4 y un fenol en meta sobre el anillo aromático.\nDescartamos la C: La metadona es una difenilheptanona acíclica de cadena abierta, sin anillo de piperidina.\n\nReferencia: Apuntes, 4-Fenilpiperidinas: petidina y cetobemidona."
  },
  {
    id: "t06-m2-q09",
    topicId: "tema-06",
    block: "Síntesis · Cetobemidona",
    badge: "Modelo 2 · P9 · Síntesis · Cetobemidona",
    question: "En la síntesis de la cetobemidona a partir de su correspondiente nitrilo intermedio, ¿qué organometálico introduce la cadena propionilo en C4?",
    options: [
      { text: "Metillitio en exceso seguido de deshidratación con ácido fosfórico concentrado" },
      { text: "Fenilmagnesio en tetrahidrofurano seguido de reducción catalítica con paladio" },
      { text: "Bromuro de etilmagnesio seguido de hidrólisis ácida de la cetimina formada" },
      { text: "Cloruro de acetilo con tricloruro de aluminio bajo acilación de Friedel-Crafts" },
    ],
    correctIndex: 2,
    explanation: "El ataque nucleófilo del bromuro de etilmagnesio (EtMgBr) sobre el grupo ciano (-C≡N) del intermedio 4-(3-metoxifenil)-1-metilpiperidina-4-carbonitrilo genera la sal de cetimina intermedia, cuya hidrólisis con ácido clorhídrico caliente produce la etilcetona y desprotege simultáneamente el éter fenólico para rendir cetobemidona.\n\nDescartamos la A: El metillitio introduciría una metilcetona (acetilo), no el grupo propionilo requerido.\nDescartamos la B: Un fenil Grignard generaría una benzofenona, no la etilcetona característica de cetobemidona.\nDescartamos la D: Los cloruros de acilo no reaccionan con nitrilos para rendir cetonas alifáticas ramificadas.\n\nReferencia: Apuntes, Síntesis de la cetobemidona."
  },
  {
    id: "t06-m2-q10",
    topicId: "tema-06",
    block: "Bioquímica · Metadona",
    badge: "Modelo 2 · P10 · Bioquímica · Metadona",
    question: "Además de su agonismo sobre receptores opioides mu y bloqueo NMDA, ¿qué diana iónica de la metadona fundamenta el riesgo de prolongación del intervalo QT?",
    options: [
      { text: "Bloqueo de canales de potasio dependientes de voltaje hERG (IKr) en el miocardio" },
      { text: "Activación constitutiva de canales de calcio presinápticos cardíacos de tipo N" },
      { text: "Inhibición irreversible de la bomba sodio-potasio ATPasa dependiente de magnesio" },
      { text: "Apertura forzada de canales de cloruro modulados por receptores GABAA auriculares" },
    ],
    correctIndex: 0,
    explanation: "La metadona bloquea de forma dosis-dependiente el canal de potasio cardíaco IKr (subunidad alfa hERG / KCNH2). Al retrasar la corriente rectificadora tardía de salida de potasio durante la fase 3 de repolarización del potencial de acción ventricular, prolonga el intervalo QT y predispone a arritmias ventriculares potencialmente mortales (Torsades de Pointes).\n\nDescartamos la B: Los opioides inhiben canales de calcio voltaje-dependientes, no los abren constitutivamente.\nDescartamos la C: La bomba Na+/K+ ATPasa es inhibida por digitálicos como digoxina, no por metadona.\nDescartamos la D: Los receptores GABA y canales de Cl- no participan en la génesis de torsades de pointes por metadona.\n\nReferencia: Apuntes, Difenilpropilaminas: metadona."
  },
  {
    id: "t06-m2-q11",
    topicId: "tema-06",
    block: "Farmacocinética · Tapentadol",
    badge: "Modelo 2 · P11 · Farmacocinética · Tapentadol",
    question: "Al comparar las rutas metabólicas de tramadol y tapentadol, ¿qué ventaja farmacocinética crítica presenta el tapentadol en la práctica clínica?",
    options: [
      { text: "Se excreta 100% por vía biliar sin sufrir ningún tipo de metabolismo hepático" },
      { text: "Posee una semivida plasmática cuatro veces más prolongada que la de tramadol" },
      { text: "Genera metabolitos activos altamente lipófilos que cruzan la BHE de forma pasiva" },
      { text: "No requiere bioactivación por CYP2D6, evitando la variabilidad interindividual" },
    ],
    correctIndex: 3,
    explanation: "El tramadol requiere O-desmetilación hepática por el polimórfico citocromo CYP2D6 para formar su metabolito activo M1 (O-desmetiltramadol), cuya afinidad mu es unas 300 veces mayor que el fármaco padre. El tapentadol, en cambio, posee el fenol libre nativo y es activo de forma directa sin requerir enzimas CYP, metabolizándose por glucuronidación directa de fase II y ofreciendo una respuesta predecible e independiente del genotipo del paciente.\n\nDescartamos la A: El tapentadol sufre glucuronidación hepática directa en su grupo fenólico libre.\nDescartamos la B: Las semividas de ambos fármacos son similares (alrededor de 4 a 6 horas).\nDescartamos la C: El tapentadol es la molécula activa per se y sus metabolitos glucurónidos son inactivos.\n\nReferencia: Apuntes, Aminociclohexanoles: tramadol y tapentadol."
  },
  {
    id: "t06-m2-q12",
    topicId: "tema-06",
    block: "Síntesis · Tramadol",
    badge: "Modelo 2 · P12 · Síntesis · Tramadol",
    question: "En la síntesis industrial del tramadol, ¿qué transformación organometálica genera su esqueleto de aminociclohexanol sustituido?",
    questionStructures: [{ name: "Tramadol (QFDOS-336)", smiles: "COc1cccc(C2(O)CCCCC2CN(C)C)c1" }],
    options: [
      { text: "Alquilación de Friedel-Crafts del ciclohexeno con anisol en medio ácido" },
      { text: "Adición del reactivo de Grignard de m-bromoanisol sobre la cetona aminometilada" },
      { text: "Condensación de Claisen entre el benzoato de metilo y la dimetilamina en caliente" },
      { text: "Reducción con hidruro de litio y aluminio de una amida cíclica preformada" },
    ],
    correctIndex: 1,
    explanation: "La síntesis de Grünenthal parte de ciclohexanona, formaldehído y dimetilamina en una reacción de Mannich para rendir 2-[(dimetilamino)metil]ciclohexanona. Posteriormente, la adición del reactivo de Grignard bromuro de (3-metoxifenil)magnesio sobre el carbonilo genera el alcohol terciario del tramadol como mezcla diastereomérica (1R,2R / 1S,2S cis mayoritario).\n\nDescartamos la A: No es una alquilación electrofílica de Friedel-Crafts sino una adición nucleofílica a un carbonilo.\nDescartamos la C: La reacción de Claisen ocurre entre ésteres enolizables, no para formar alcoholes terciarios ciclohexánicos.\nDescartamos la D: El tramadol no proviene de una amida cíclica lactámica sino de una cetona de Mannich.\n\nReferencia: Apuntes, Aminociclohexanoles: tramadol y tapentadol."
  },
  {
    id: "t06-m2-q13",
    topicId: "tema-06",
    block: "Síntesis · Dienos",
    badge: "Modelo 2 · P13 · Síntesis · Dienos",
    question: "¿Qué alcaloide natural del opio porta el sistema 1,3-diénico en el anillo C indispensable para cicloadiciones de Diels–Alder hacia orvinoles?",
    options: [
      { text: "La morfina, que contiene un sistema conjugado aromático en todo el anillo C" },
      { text: "La codeína, que porta un dieno exocíclico acoplado a la piperidina lateral" },
      { text: "La papaverina, que actúa como dieno homocíclico flexible en solventes polares" },
      { text: "La tebaína, que presenta dos dobles enlaces conjugados C6=C7 y C8=C14" },
    ],
    correctIndex: 3,
    explanation: "La tebaína es el único alcaloide principal del opio que cuenta con un sistema 1,3-dieno conjugado homoanular en el anillo C (entre C6=C7 y C8=C14) con dos grupos metoxilo en C3 y C6, lo que la convierte en el dieno de partida indispensable para la semisíntesis de orvinoles (etorfina, buprenorfina) y antagonistas (naloxona, naltrexona).\n\nDescartamos la A: La morfina posee un solo doble enlace no aromático entre C7 y C8, no un sistema 1,3-dieno.\nDescartamos la B: La codeína sólo se diferencia de la morfina en el metiléter en C3 y tiene un único alqueno C7=C8.\nDescartamos la C: La papaverina es una bencilisoquinolina completamente aromática sin esqueleto morfinánico.\n\nReferencia: Apuntes, Cicloadición de Diels–Alder sobre la tebaína."
  },
  {
    id: "t06-m2-q14",
    topicId: "tema-06",
    block: "Síntesis · Orvinoles",
    badge: "Modelo 2 · P14 · Síntesis · Orvinoles",
    question: "¿Cuál de las siguientes estructuras corresponde a la etorfina, orvinol obtenido por adición de bromuro de propilmagnesio sobre el carbonilo de la tevinona?",
    options: [
      { text: "Estructura A", smiles: "CCC[C@@](C)(O)[C@H]1C[C@@]23C=C[C@]1(OC)[C@@H]1Oc4c(O)ccc5c4[C@@]12CCN(C)[C@@H]3C5", revealedName: "Etorfina" },
      { text: "Estructura B", smiles: "CC(=O)[C@H]1C[C@@]23C=C[C@@]1([C@H]4[C@@]25CCN([C@@H]3CC6=C5C(=C(C=C6)OC)O4)C)OC", revealedName: "Tevinona" },
      { text: "Estructura C", smiles: "C[C@]([C@H]1C[C@@]23CC[C@@]1([C@H]4[C@@]25CCN([C@@H]3CC6=C5C(=C(C=C6)O)O4)CC7CC7)OC)(C(C)(C)C)O", revealedName: "Buprenorfina" },
      { text: "Estructura D", smiles: "COC1=CC=C2[C@H]3Cc4ccc(OC)c5c4[C@@]2(CCN3C)[C@H]1O5", revealedName: "Tebaína" },
    ],
    correctIndex: 0,
    explanation: "La reacción del reactivo de Grignard bromuro de n-propilmagnesio con el grupo carbonilo de la tevinona genera el alcohol terciario con cadena n-propílica; la posterior desmetilación quimioselectiva del fenol en C3 rinde etorfina, agonista analgésico varios miles de veces más potente que la morfina.\n\nDescartamos la B: La tevinona es el aducto directo de Diels-Alder con la cetona metílica intacta en C7.\nDescartamos la C: La buprenorfina incorpora un grupo t-butilo terciario y un sustituyente N-ciclopropilmetilo.\nDescartamos la D: La tebaína es el alcaloide natural de partida sin puente eteno ni cadena lateral en C7.\n\nReferencia: Apuntes, Extensión sobre la cetona: adición organometálica de Grignard."
  },
  {
    id: "t06-m2-q15",
    topicId: "tema-06",
    block: "Bioquímica · Péptidos estabilizados",
    badge: "Modelo 2 · P15 · Bioquímica · Péptidos estabilizados",
    question: "¿Qué modificaciones estructurales en el análogo peptídico DAMGO bloquean su degradación enzimática por aminopeptidasas y encefalinasas?",
    options: [
      { text: "Sustitución de todos los residuos por aminoácidos beta en conformación extendida" },
      { text: "Transformación de los cuatro enlaces peptídicos en enlaces tioéster no hidrolizables" },
      { text: "Sustitución por D-Ala en posición 2, N-metilación de Phe4 y alcohol terminal Gly-ol" },
      { text: "Formación de un puente disulfuro intramolecular rígido entre dos restos cisteína" },
    ],
    correctIndex: 2,
    explanation: "Las encefalinas endógenas se degradan en minutos por aminopeptidasas (que escinden Tyr1-Gly2) y por la endopeptidasa neutra neprilisina/encefalinasa (que escinde Gly3-Phe4). En DAMGO ([D-Ala2, N-Me-Phe4, Gly-ol5]-encefalina), el D-aminoácido en posición 2 bloquea el ataque amino-terminal, la N-metilación de la amida en Phe4 impide el corte por neprilisina y la reducción del carboxilo a alcohol (Gly-ol) evita las carboxipeptidasas.\n\nDescartamos la A: DAMGO conserva residuos alfa naturales (Tyr1) y sólo invierte estereoquímica en la posición 2.\nDescartamos la B: DAMGO mantiene la conectividad amídica clásica, empleando N-metilación para impedir el corte.\nDescartamos la D: DAMGO es un péptido lineal, a diferencia de péptidos cíclicos como DPDPE.\n\nReferencia: Apuntes, Estrategia de estabilización: introducción de D-aminoácidos."
  }
];

// MODELO 3: Rigidez molecular, orvinoles, benzomorfanos, síntesis de fentanilo y análogos peptídicos DAMGO
// Clave: D, B, A, C, B, D, C, A, D, C, A, B, D, A, B
export const TEMA6_MODELO_3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t06-m3-q01",
    topicId: "tema-06",
    block: "Metabolismo · CYP2D6",
    badge: "Modelo 3 · P1 · Metabolismo · CYP2D6",
    question: "¿Qué consecuencia clínica presenta un paciente con fenotipo de metabolizador ultrarrápido de CYP2D6 al recibir dosis habituales de codeína?",
    options: [
      { text: "Falta absoluta de eficacia analgésica por incapacidad para bioactivar el fármaco" },
      { text: "Acumulación plasmática de norcodeína provocando crisis hipertensivas recurrentes" },
      { text: "Eliminación renal acelerada de la molécula intacta sin generar metabolitos activos" },
      { text: "Conversión rápida a morfina con riesgo grave de intoxicación y paro respiratorio" },
    ],
    correctIndex: 3,
    explanation: "La codeína requiere O-desmetilación por CYP2D6 (~10%) para generar morfina libre activa. Los metabolizadores ultrarrápidos (con copias duplicadas del gen CYP2D6) transforman la codeína a morfina a gran velocidad y en proporción muy elevada, alcanzando concentraciones plasmáticas tóxicas de morfina con riesgo de sobredosis mortal y depresión respiratoria.\n\nDescartamos la A: La falta de eficacia es característica de metabolizadores lentos (poor metabolizers), no ultrarrápidos.\nDescartamos la B: La norcodeína es un metabolito inactivo de N-desmetilación por CYP3A4 sin efecto hipertensivo.\nDescartamos la C: El fenotipo ultrarrápido incrementa la tasa de biotransformación metabólica, no la excreción intacta.\n\nReferencia: Apuntes, Modificaciones en el fenol (C3–OH)."
  },
  {
    id: "t06-m3-q02",
    topicId: "tema-06",
    block: "Síntesis · Desprotección",
    badge: "Modelo 3 · P2 · Síntesis · Desprotección",
    question: "¿Qué reactivo quimioselectivo permite escindir el éter metílico de la codeína para regenerar el fenol C3-OH de la morfina sin alterar el puente éter furánico?",
    options: [
      { text: "Ácido sulfúrico concentrado bajo reflujo constante con permanganato potásico" },
      { text: "Tribromuro de boro (BBr3) en frío o etanotiolato sódico en medio aprótico polar" },
      { text: "Hidróxido sódico acuoso en digestión prolongada dentro de autoclave cerrado" },
      { text: "Tetrahidruroaluminato de litio en éter dietílico anhidro bajo atmósfera de argón" },
    ],
    correctIndex: 1,
    explanation: "La ruptura de éteres arilmetílicos se logra clásicamente con ácidos de Lewis fuertes como el tribromuro de boro (BBr3) en diclorometano a bajas temperaturas (-78 °C a 0 °C) o con nucleófilos azufrados blandos (como etanotiolato sódico, EtSNa, en DMF a reflujo), coordinando el oxígeno fenólico y liberando selectivamente bromuro de metilo sin abrir el éter cíclico 4,5-epóxido.\n\nDescartamos la A: Estas condiciones oxidantes drásticas destruirían el esqueleto por completo.\nDescartamos la C: Los éteres de arilo y alquilo son inertes frente a bases acuosas moderadas.\nDescartamos la D: El hidruro de litio y aluminio no escinde éteres metílicos aromáticos estables.\n\nReferencia: Apuntes, Modificaciones en el fenol (C3–OH)."
  },
  {
    id: "t06-m3-q03",
    topicId: "tema-06",
    block: "SAR · PAMORA",
    badge: "Modelo 3 · P3 · SAR · PAMORA",
    question: "¿Cuál de las siguientes estructuras corresponde a la metilnaltrexona, antagonista opioide periférico con nitrógeno cuaternario permanente?",
    options: [
      { text: "Estructura A", smiles: "C[N+]1(CC2CC2)CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@@]3(O)[C@H]1C5", revealedName: "Metilnaltrexona" },
      { text: "Estructura B", smiles: "O=C1CC[C@@]2(O)[C@H]3Cc4ccc(O)c5c4[C@@]2(CCN3CC2CC2)[C@H]1O5", revealedName: "Naltrexona" },
      { text: "Estructura C", smiles: "C=CCN1CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@@]3(O)[C@H]1C5", revealedName: "Naloxona" },
      { text: "Estructura D", smiles: "C=CCN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](OCCOCCOCCOCCOCCOCCOCCOC)CC[C@@]3(O)[C@H]1C5", revealedName: "Naloxegol" },
    ],
    correctIndex: 0,
    explanation: "La metilnaltrexona porta una carga positiva permanente en su nitrógeno cuaternario (N,N-dialquilamonio), lo que impide totalmente su paso a través de la barrera hematoencefálica y le permite actuar selectivamente en el tracto gastrointestinal como antagonista periférico (PAMORA).\n\nDescartamos la B: La naltrexona posee amina terciaria protonable y cruza la BHE con facilidad produciendo bloqueo central.\nDescartamos la C: La naloxona es una amina terciaria N-alílica neutra a pH muy básico que difunde al SNC.\nDescartamos la D: El naloxegol es un derivado pegilado de naloxol, no una sal de amonio cuaternario.\n\nReferencia: Apuntes, Antagonistas periféricos (PAMORA)."
  },
  {
    id: "t06-m3-q04",
    topicId: "tema-06",
    block: "SAR · Piperidinas",
    badge: "Modelo 3 · P4 · SAR · Piperidinas",
    question: "¿Cuál de las siguientes estructuras corresponde a la cetobemidona, 4-fenilpiperidina portadora de fenol en posición meta y grupo propionilo en C4?",
    options: [
      { text: "Estructura A", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", revealedName: "Petidina" },
      { text: "Estructura B", smiles: "CCC(=O)N(c1ccccc1)C1CCN(CCc2ccccc2)CC1", revealedName: "Fentanilo" },
      { text: "Estructura C", smiles: "CCC(=O)C1(c2cccc(O)c2)CCN(C)CC1", revealedName: "Cetobemidona" },
      { text: "Estructura D", smiles: "CCC(=O)C(CC(C)N(C)C)(c1ccccc1)c1ccccc1", revealedName: "Metadona" },
    ],
    correctIndex: 2,
    explanation: "La cetobemidona optimiza la serie de la petidina incorporando un fenol en meta sobre el fenilo (mimetizando el C3-OH de la morfina) y sustituyendo el éster etílico por una etilcetona (propionilo), lo que eleva su potencia analgésica al nivel de la morfina.\n\nDescartamos la A: La petidina posee un éster etílico y carece de sustituyente fenólico en el anillo de benceno.\nDescartamos la B: El fentanilo es una 4-anilidopiperidina con cadena N-fenetilo y función propionamida.\nDescartamos la D: La metadona es una difenilpropilamina acíclica con dos fenilos no sustituidos.\n\nReferencia: Apuntes, 4-Fenilpiperidinas: petidina y cetobemidona."
  },
  {
    id: "t06-m3-q05",
    topicId: "tema-06",
    block: "SAR · Anilidopiperidinas",
    badge: "Modelo 3 · P5 · SAR · Anilidopiperidinas",
    question: "En la estructura del fentanilo, ¿a qué características moleculares se debe su extraordinaria potencia (50 a 100 veces superior a la morfina)?",
    questionStructures: [{ name: "Fentanilo (QFDOS-328)", smiles: "CCC(=O)N(c1ccccc1)C1CCN(CCc2ccccc2)CC1" }],
    options: [
      { text: "La formación de enlaces covalentes directos y permanentes con los lípidos del SNC" },
      { text: "Su alta lipofilia y la perfecta orientación fenetilo en el bolsillo hidrofóbico" },
      { text: "La existencia de tres grupos fenólicos donadores de puentes de hidrógeno en meta" },
      { text: "La presencia de un puente rígido endo-eteno que fija su conformación bicíclica" },
    ],
    correctIndex: 1,
    explanation: "El fentanilo sustituye el fenilo directo de la petidina por una anilida (4-anilidopiperidina) y el N-metilo por una cadena N-fenetilo. La cadena fenetilo encaja a la perfección en un bolsillo hidrofóbico accesorio del receptor mu, confiriendo una afinidad y penetración hematoencefálica extraordinarias.\n\nDescartamos la A: El fentanilo se une de forma reversible no covalente al receptor opioide mu.\nDescartamos la C: El fentanilo carece por completo de grupos hidroxilo fenólicos en su estructura.\nDescartamos la D: El puente endo-eteno es exclusivo de los orvinoles (tevinona, etorfina, buprenorfina).\n\nReferencia: Apuntes, 4-Anilidopiperidinas: fentanilo y análogos."
  },
  {
    id: "t06-m3-q06",
    topicId: "tema-06",
    block: "Síntesis · Anilidopiperidinas",
    badge: "Modelo 3 · P6 · Síntesis · Anilidopiperidinas",
    question: "¿Cuál de las siguientes estructuras corresponde al sufentanilo, análogo de fentanilo donde el fenilo se sustituye por tiofeno y C4 porta un éter metoximetilo?",
    options: [
      { text: "Estructura A", smiles: "CCC(=O)N(c1ccccc1)C1CCN(CCc2ccccc2)CC1", revealedName: "Fentanilo" },
      { text: "Estructura B", smiles: "CCC(=O)N(c1ccccc1)C1(COC)CCN(CCN2N=NN(CC)C2=O)CC1", revealedName: "Alfentanilo" },
      { text: "Estructura C", smiles: "CCC(=O)N(c1ccccc1)C1(C(=O)OC)CCN(CCC(=O)OC)CC1", revealedName: "Remifentanilo" },
      { text: "Estructura D", smiles: "CCC(=O)N(c1ccccc1)C1(COC)CCN(CCc2cccs2)CC1", revealedName: "Sufentanilo" },
    ],
    correctIndex: 3,
    explanation: "El sufentanilo optimiza el farmacóforo del fentanilo mediante dos modificaciones bioisostéricas clave: la sustitución del anillo de benceno terminal por un bioisóstero clásico de tiofeno (2-(tiofen-2-il)etilo) y la introducción de un grupo metoximetilo (-CH2OCH3) en la posición 4 de la piperidina, confiriendo una potencia analgésica de 5 a 10 veces superior al fentanilo.\n\nDescartamos la A: El fentanilo porta un grupo N-fenetilo con fenilo no sustituido y C4-H en la piperidina.\nDescartamos la B: El alfentanilo incorpora un heterociclo tetrazol-5-ona unido por cadena etilo al nitrógeno.\nDescartamos la C: El remifentanilo contiene dos grupos éster metílico en C4 y en la cadena N-alquílica.\n\nReferencia: Apuntes, 4-Anilidopiperidinas: fentanilo y análogos."
  },
  {
    id: "t06-m3-q07",
    topicId: "tema-06",
    block: "Síntesis · Soft-drugs",
    badge: "Modelo 3 · P7 · Síntesis · Soft-drugs",
    question: "En el diseño de remifentanilo como fármaco blando (soft-drug), ¿qué enlace lábil permite su metabolización ultrarrápida por esterasas plasmáticas inespecíficas?",
    options: [
      { text: "Un enlace carbamato que experimenta descarboxilación espontánea a pH neutro" },
      { text: "Un puente tioéster lábil escindido selectivamente por glutatión transferasas" },
      { text: "Un grupo éster metílico lábil que se hidroliza a ácido carboxílico inactivo" },
      { text: "Un puente epóxido reactivo susceptible a ataque por agua en el eritrocito" },
    ],
    correctIndex: 2,
    explanation: "El remifentanilo fue diseñado racionalmente incorporando un éster metílico en la cadena N-(2-metoxicarboniletil) y otro en C4. Las carboxilesterasas plasmáticas y tisulares inespecíficas hidrolizan el éster a un metabolito con ácido carboxílico libre ionizado a pH 7,4, cuya afinidad por el receptor mu es 300 a 1000 veces menor, logrando una semivida ultracorta independiente de la función hepática o renal.\n\nDescartamos la A: El remifentanilo no contiene enlaces carbamato sino ésteres metílicos carboxílicos.\nDescartamos la B: No hay átomos de azufre ni funciones tioéster en la molécula de remifentanilo.\nDescartamos la D: La molécula no posee funciones oxirano ni epóxidos reactivos que generen dioles.\n\nReferencia: Apuntes, 4-Anilidopiperidinas: fentanilo y análogos."
  },
  {
    id: "t06-m3-q08",
    topicId: "tema-06",
    block: "SAR · Difenilheptanonas",
    badge: "Modelo 3 · P8 · SAR · Difenilheptanonas",
    question: "¿Cuál de las siguientes estructuras corresponde a la metadona, agonista opioide de cadena abierta derivado de la difenilheptanona?",
    options: [
      { text: "Estructura A", smiles: "CCC(=O)C(CC(C)N(C)C)(c1ccccc1)c1ccccc1", revealedName: "Metadona" },
      { text: "Estructura B", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", revealedName: "Petidina" },
      { text: "Estructura C", smiles: "CCC(=O)OC(Cc1ccccc1)(C(C)CN(C)C)c1ccccc1", revealedName: "Dextropropoxifeno" },
      { text: "Estructura D", smiles: "COc1cccc(C2(O)CCCCC2CN(C)C)c1", revealedName: "Tramadol" },
    ],
    correctIndex: 0,
    explanation: "La metadona es un derivado acíclico de difenilpropilamina donde un carbono cuaternario soporta dos anillos fenílicos y una cadena heptanona con amina terciaria ramificada. En disolución adopta una conformación pseudocíclica estabilizada por atracción dipolo-dipolo entre el nitrógeno y el carbonilo.\n\nDescartamos la B: La petidina es una piperidina monocíclica con un solo anillo aromático.\nDescartamos la C: El propoxifeno posee un éster propionato en lugar de la cetona heptanona de la metadona.\nDescartamos la D: El tramadol es un aminociclohexanol sustituido con un anillo de m-metoxifenilo.\n\nReferencia: Apuntes, Difenilpropilaminas: metadona."
  },
  {
    id: "t06-m3-q09",
    topicId: "tema-06",
    block: "Síntesis · PAMORA",
    badge: "Modelo 3 · P9 · Síntesis · PAMORA",
    question: "En la síntesis de metilnaltrexona a partir de naltrexona, ¿qué reactivo de metilación genera la sal de amonio cuaternario con carga permanente?",
    options: [
      { text: "Metanol en medio fuertemente reductor con paladio sobre carbón activo bajo reflujo" },
      { text: "Diazometano gaseoso en medio etéreo para metilar la amina de forma selectiva" },
      { text: "Formaldehído acuoso con ácido fórmico en una reacción de Eschweiler-Clarke" },
      { text: "Yoduro de metilo (MeI) o sulfato de dimetilo por ataque SN2 del nitrógeno" },
    ],
    correctIndex: 3,
    explanation: "El nitrógeno terciario de la naltrexona sufre una reacción de cuaternización bimolecular (SN2) frente a un agente alquilante potente como el yoduro de metilo o bromuro de metilo. El par libre de N17 desplaza al haluro rindiendo la sal cuaternaria de N-metilnaltrexonio con retención de la carga catiónica permanente.\n\nDescartamos la A: El metanol no cuaterniza aminas terciarias impedidas en condiciones hidrogenantes.\nDescartamos la B: El diazometano metila preferentemente fenoles y ácidos carboxílicos, no aminas terciarias.\nDescartamos la C: La reacción de Eschweiler-Clarke metila aminas primarias y secundarias, pero no aminas terciarias.\n\nReferencia: Apuntes, Antagonistas periféricos (PAMORA)."
  },
  {
    id: "t06-m3-q10",
    topicId: "tema-06",
    block: "SAR · Orvinoles",
    badge: "Modelo 3 · P10 · SAR · Orvinoles",
    question: "¿Cuál de las siguientes estructuras corresponde a la buprenorfina, orvinol portador de puente 6,14-endo-etano, grupo t-butilo y N-ciclopropilmetilo?",
    options: [
      { text: "Estructura A", smiles: "CCC[C@@](C)(O)[C@H]1C[C@@]23C=C[C@]1(OC)[C@@H]1Oc4c(O)ccc5c4[C@@]12CCN(C)[C@@H]3C5", revealedName: "Etorfina" },
      { text: "Estructura B", smiles: "COC1=CC=C2[C@H]3Cc4ccc(OC)c5c4[C@@]2(CCN3C)[C@H]1O5", revealedName: "Tebaína" },
      { text: "Estructura C", smiles: "C[C@]([C@H]1C[C@@]23CC[C@@]1([C@H]4[C@@]25CCN([C@@H]3CC6=C5C(=C(C=C6)O)O4)CC7CC7)OC)(C(C)(C)C)O", revealedName: "Buprenorfina" },
      { text: "Estructura D", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Morfina" },
    ],
    correctIndex: 2,
    explanation: "La buprenorfina es un orvinol semisintético altamente lipófilo derivado de la tebaína; combina un puente 6,14-endo-etano, una cadena terciaria con t-butilo y un grupo N-ciclopropilmetilo, lo que le confiere un perfil de agonista parcial mu con cinética de disociación sumamente lenta y techo terapéutico.\n\nDescartamos la A: La etorfina posee cadena N-metilo y grupo n-propilo en el carbono terciario, siendo agonista pleno ultradotado.\nDescartamos la B: La tebaína es el dieno natural precursor con dos éteres metílicos y sin puente endo-eteno.\nDescartamos la D: La morfina carece del puente etano C6-C14 y del voluminoso sustituyente t-butilo.\n\nReferencia: Apuntes, Etorfina, diprenorfina y buprenorfina."
  },
  {
    id: "t06-m3-q11",
    topicId: "tema-06",
    block: "Síntesis · Orvinoles",
    badge: "Modelo 3 · P11 · Síntesis · Orvinoles",
    question: "En la semisíntesis de la buprenorfina a partir del aducto de Diels-Alder, ¿qué etapas críticas fijan su carácter de agonista parcial y alta potencia?",
    questionStructures: [{ name: "Buprenorfina (QFDOS-343)", smiles: "C[C@]([C@H]1C[C@@]23CC[C@@]1([C@H]4[C@@]25CCN([C@@H]3CC6=C5C(=C(C=C6)O)O4)CC7CC7)OC)(C(C)(C)C)O" }],
    options: [
      { text: "Hidrogenación de C7=C8, adición de t-BuMgBr y N-alquilación con bromuro de CPM" },
      { text: "Oxidación con ácido crómico, metilación de C3-OH y N-desmetilación selectiva" },
      { text: "Bromación radicalaria en C7, eliminación de HBr y condensación con formaldehído" },
      { text: "Apertura del puente éter furánico con BBr3 y reducción con borohidruro sódico" },
    ],
    correctIndex: 0,
    explanation: "La síntesis de buprenorfina a partir del aducto de tebaína involucra: 1) hidrogenación catalítica del alqueno del puente eteno (C7=C8), 2) adición del reactivo de Grignard t-butilmagnesio para generar el alcohol terciario voluminoso, 3) N-desmetilación y 4) N-alquilación con bromometilciclopropano (ciclopropilmetilo, CPM).\n\nDescartamos la B: La buprenorfina requiere el fenol C3-OH libre para unirse a receptores opioides.\nDescartamos la C: La ruta no emplea bromaciones radicalarias sino cicloadición y química organometálica.\nDescartamos la D: El anillo dihidrofuránico E y el puente éter 4,5 se conservan intactos en la buprenorfina.\n\nReferencia: Apuntes, Etorfina, diprenorfina y buprenorfina."
  },
  {
    id: "t06-m3-q12",
    topicId: "tema-06",
    block: "Farmacología · Agonismo sesgado",
    badge: "Modelo 3 · P12 · Farmacología · Agonismo sesgado",
    question: "¿En qué consiste el mecanismo de agonismo sesgado (biased agonism) exhibido por la oliceridina (TRV130) en el receptor opioide mu?",
    options: [
      { text: "Estimula exclusivamente la vía de beta-arrestina-2 sin interaccionar con proteína G" },
      { text: "Activa selectivamente la proteína Gi reduciendo el reclutamiento de beta-arrestina" },
      { text: "Produce un cambio conformacional que desacopla permanentemente al receptor mu" },
      { text: "Se une a un sitio alostérico modulando positivamente la fijación de acetilcolina" },
    ],
    correctIndex: 1,
    explanation: "La oliceridina es un ligando sesgado de proteína G para el receptor opioide mu. Al unirse, estabiliza una conformación del receptor que activa de forma eficiente la proteína Gi (responsable de la analgesia) pero recluta con mucha menor potencia la beta-arrestina-2 (asociada a la internalización del receptor, desensibilización, tolerancia, estreñimiento y depresión respiratoria).\n\nDescartamos la A: El reclutamiento de beta-arrestina media la depresión respiratoria, estreñimiento y tolerancia.\nDescartamos la C: La oliceridina es un ligando sesgado hacia la cascada analgésica de proteína Gi.\nDescartamos la D: Es un ligando ortostérico que compite directamente en el bolsillo de unión de mu.\n\nReferencia: Apuntes, Cuatro familias de receptores opioides acoplados a proteína G."
  },
  {
    id: "t06-m3-q13",
    topicId: "tema-06",
    block: "Farmacología · Subtipos opioides",
    badge: "Modelo 3 · P13 · Farmacología · Subtipos opioides",
    question: "Al comparar las respuestas biológicas mediadas por receptores opioides mu frente a receptores kappa, ¿qué efecto diferencial característico provocan los agonistas kappa?",
    options: [
      { text: "Euforia intensa, estreñimiento severo y marcada depresión respiratoria central" },
      { text: "Broncodilatación periférica masiva y aumento sostenido de la frecuencia cardíaca" },
      { text: "Insomnio persistente mediado por estimulación dopaminérgica en el estriado dorsal" },
      { text: "Disforia, alucinaciones y analgesia espinal con escasa depresión respiratoria" },
    ],
    correctIndex: 3,
    explanation: "Mientras que los receptores mu median analgesia supraespinal, intensa euforia, adicción y depresión respiratoria central por aumento de dopamina mesolímbica, los receptores kappa (KOR) median analgesia predominantemente espinal, disforia, efectos psicotomiméticos (alucinaciones) y sedación, con escaso riesgo de depresión respiratoria.\n\nDescartamos la A: La euforia y la depresión respiratoria severa son mediadas por receptores mu, no kappa.\nDescartamos la B: Los agonistas opioides no son broncodilatadores ni estimulantes adrenérgicos cardíacos.\nDescartamos la C: Los agonistas kappa reducen la liberación de dopamina en el sistema de recompensa, causando sedación y disforia.\n\nReferencia: Apuntes, Cuatro familias de receptores opioides acoplados a proteína G."
  },
  {
    id: "t06-m3-q14",
    topicId: "tema-06",
    block: "Farmacología · Péptidos selectivos",
    badge: "Modelo 3 · P14 · Farmacología · Péptidos selectivos",
    question: "¿Qué perfil farmacodinámico y selectividad caracterizan a la difelikefalina (CR845), primer fármaco aprobado para el prurito asociado a enfermedad renal crónica?",
    options: [
      { text: "Agonista selectivo periférico kappa-opioide con mínima penetración en el SNC" },
      { text: "Agonista pleno mu de acción central con intensa capacidad euforizante y sedante" },
      { text: "Antagonista competitivo puro de receptores delta-opioides en neuronas motoras" },
      { text: "Bloqueante periférico irreversible de receptores histaminérgicos H1 endoteliales" },
    ],
    correctIndex: 0,
    explanation: "La difelikefalina es un tetrapéptido sintético constituido exclusivamente por D-aminoácidos hidrófilos con un derivado de 4-aminopiperidina en el carboxilo terminal. Posee alta selectividad por el receptor kappa-opioide (KOR) frente a mu y delta; su carácter catiónico hidrófilo impide el paso al cerebro, aliviando el prurito periférico sin inducir disforia ni adicción central.\n\nDescartamos la B: La difelikefalina no activa receptores mu y no cruza la barrera hematoencefálica.\nDescartamos la C: No es un antagonista delta sino un agonista muy selectivo del subtipo kappa (KOR).\nDescartamos la D: El prurito urémico no es histaminérgico y responde a la modulación de KOR periféricos.\n\nReferencia: Apuntes, Estrategia de estabilización: introducción de D-aminoácidos."
  },
  {
    id: "t06-m3-q15",
    topicId: "tema-06",
    block: "Novedades · Analgésicos no opioides",
    badge: "Modelo 3 · P15 · Novedades · Analgésicos no opioides",
    question: "¿Qué diana farmacológica no opioide modula la suzetrigina (VX-548) para proporcionar analgesia intensa sin riesgo de adicción ni depresión respiratoria?",
    options: [
      { text: "Inhibición alostérica irreversible de ciclooxigenasa-2 (COX-2) en células gliales" },
      { text: "Bloqueo selectivo de canales de sodio dependientes de voltaje NaV1.8 en nociceptores" },
      { text: "Antagonismo competitivo de los receptores del péptido relacionado con el gen calcitonina" },
      { text: "Activación directa de receptores cannabinoides CB1 en terminales presinápticas talámicas" },
    ],
    correctIndex: 1,
    explanation: "La suzetrigina (VX-548) es un modulador alostérico / bloqueante altamente selectivo del canal de sodio dependiente de voltaje NaV1.8 (SCN10A), expresado casi exclusivamente en las neuronas sensoriales nociceptivas periféricas (ganglios de la raíz dorsal), inhibiendo la transmisión del dolor antes de que alcance la médula espinal y el cerebro, eliminando el riesgo de abuso y depresión respiratoria de los opioides.\n\nDescartamos la A: La suzetrigina no es un AINE ni inhibe las enzimas ciclooxigenasas productoras de prostanoides.\nDescartamos la C: El bloqueo de CGRP es característico de los gepantes antimigrañosos, no de los bloqueantes de canales de sodio.\nDescartamos la D: No tiene actividad sobre receptores cannabinoides centrales ni periféricos.\n\nReferencia: Apuntes, Estado regulatorio y novedades terapéuticas."
  }
];
