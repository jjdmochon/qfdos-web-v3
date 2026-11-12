// ==========================================================================
// QFDOS - Flashcards Tema 06: Péptidos como neurotransmisores e hipnoanalgésicos
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Total tarjetas generadas: 31
// Consolidado contra los apuntes publicados del Tema 6 (QFDOS Tema 6 Apuntes.pdf).
// Tipografía Científica: texto plano y caracteres Unicode directos (cero LaTeX crudo)
// ==========================================================================

import type { Flashcard } from './qfdosData';

export const TEMA6_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-06-01",
    topicId: 'tema-06',
    concept: "Opiáceos frente a Opioides y Estereoquímica",
    front: "¿Qué diferencia conceptual existe entre un opiáceo y un opioide, cuántos estereocentros tiene la morfina y cuál es su enantiómero activo?",
    back: "En cuanto al origen, los **opiáceos** son los alcaloides naturales extraídos del látex de la adormidera (*Papaver somniferum*), como la **morfina**, la **codeína** y la **tebaína**. Los **opioides** engloban a toda sustancia, natural, semisintética o totalmente sintética, capaz de unirse a los receptores opioides y ser bloqueada por naloxona (incluyendo péptidos endógenos, fentanilos y metadona).\n\nRespecto a la estereoquímica, la morfina es una molécula pentacíclica rígida con **cinco centros quirales**: **C5 (R), C6 (S), C9 (R), C13 (S) y C14 (R)**. En la naturaleza existe como un único enantiómero, el **levógiro (−)**. Su imagen especular, la **(+)-morfina (ent-morfina)**, carece por completo de actividad analgésica opioide, lo que demuestra la naturaleza quiral estricta del receptor opioide.",
    structures: [
      { name: "Morfina", imagePath: "estructuras/tema-06/QFDOS-299_morfina.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "(−) Natural · 5R,6S,9R,13S,14R" }
    ],
    difficulty: 'easy',
    category: "Morfina y SAR Clásico"
  },
  {
    id: "fc-06-02",
    topicId: 'tema-06',
    concept: "Numeración Clásica de la Morfina y sus Anillos",
    front: "¿Cómo se recorre la numeración clásica no IUPAC de la morfina y qué función química ocupa cada vértice clave del esqueleto?",
    back: "En la numeración clásica de la morfina, el recorrido comienza en el anillo aromático A y avanza de forma continua:\n\n1. **Anillo A (aromático):** C1 y C2 libres; **C3** porta el **fenol esencial (–OH)**; C4 está unido al puente éter.\n2. **Anillo E (dihidrofurano):** C4–O–C5 forma el puente éter 4,5-epóxido.\n3. **Anillo C (ciclohexénico):** C5 (cabeza del éter), **C6** porta el **alcohol alílico secundario (–OH)**, y entre **C7=C8** se sitúa el doble enlace no aromático.\n4. **Vértices internos:** C9 está unido al nitrógeno; C10 es el CH2 bencílico; C11 y C12 son vértices de fusión aromática; **C13** es el **carbono cuaternario central**; C14 es el metino contiguo a C13 y C8.\n5. **Anillo D (piperidina):** El puente etano C15–C16 conecta C13 con el **nitrógeno terciario N17** (N–CH3).",
    structures: [
      { name: "Morfina", imagePath: "estructuras/tema-06/QFDOS-299_morfina.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "C3-OH · C6-OH · C7=C8 · N17" }
    ],
    difficulty: 'medium',
    category: "Morfina y SAR Clásico"
  },
  {
    id: "fc-06-03",
    topicId: 'tema-06',
    concept: "SAR del Fenol en C3: Morfina frente a Codeína",
    front: "¿Por qué la metilación del fenol C3-OH (codeína) reduce drásticamente la afinidad por el receptor y por qué sigue siendo analgésica en clínica?",
    back: "En cuanto al reconocimiento molecular, el **hidroxilo fenólico en C3** actúa como **dador de enlace de hidrógeno** fundamental con residuos del centro activo del receptor opioide μ (His297). Si se enmascara como éter metílico (–OCH3 en la codeína) o éter etílico (etilmorfina), la molécula pierde la capacidad de donar el protón y la afinidad intrínseca cae entre 10 y 50 veces.\n\nEn clínica, la codeína funciona porque se comporta parcialmente como un **profármaco**: aproximadamente un 10% de la dosis sufre **O-desmetilación hepática por la CYP2D6**, regenerando morfina libre con fenol C3-OH. Los individuos metabolizadores lentos de CYP2D6 no obtienen alivio del dolor, mientras que los metabolizadores ultrarrápidos acumulan morfina con riesgo grave de intoxicación.",
    structures: [
      { name: "Morfina", imagePath: "estructuras/tema-06/QFDOS-299_morfina.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "C3-OH libre · Activa directa" },
      { name: "Codeína", imagePath: "estructuras/tema-06/QFDOS-300_codeina.png", smiles: "COc1ccc2c3c1O[C@H]1[C@@H](O)C=C[C@H]4[C@@H](C2)N(C)CC[C@@]341", badge: "C3-OMe · Profármaco CYP2D6" }
    ],
    difficulty: 'easy',
    category: "Morfina y SAR Clásico"
  },
  {
    id: "fc-06-04",
    topicId: 'tema-06',
    concept: "SAR del Alcohol Alílico en C6: Heterocodeína e Hidromorfona",
    front: "¿Qué ocurre al modificar el alcohol en C6 manteniendo libre el fenol C3, y cómo se explica la mayor potencia de la heterocodeína y la hidromorfona?",
    back: "A diferencia de C3, el **grupo –OH en C6 no es esencial** para la interacción analgésica directa con el receptor opioide; de hecho, su presencia polar reduce la lipofilia y frena el cruce de la barrera hematoencefálica.\n\nAl modificar selectivamente C6 manteniendo C3-OH libre:\n1. **Heterocodeína (6-O-metilmorfina):** La metilación del alcohol C6 elimina el enlace H polar y aumenta la lipofilia, logrando una potencia analgésica **unas 5 veces superior a la morfina**.\n2. **6-Acetilmorfina (6-MAM):** La acetilación en C6 genera una molécula unas **4 veces más potente** que la morfina.\n3. **Hidromorfona:** La oxidación del alcohol secundario C6 a cetona (=O) combinada con la reducción catalítica del doble enlace C7=C8 rinde una molécula unas **7–8 veces más potente** que la morfina.",
    structures: [
      { name: "Heterocodeína", imagePath: "estructuras/tema-06/QFDOS-303_heterocodeina.png", smiles: "CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)O)O[C@H]3[C@H](C=C4)OC", badge: "6-OMe · 5x potencia" },
      { name: "Hidromorfona", imagePath: "estructuras/tema-06/QFDOS-311_hidromorfona.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@H]3[C@H]1C5", badge: "6-Oxo · 7,8-dihidro · 8x potencia" }
    ],
    difficulty: 'medium',
    category: "Morfina y SAR Clásico"
  },
  {
    id: "fc-06-05",
    topicId: 'tema-06',
    concept: "Heroína: Profármaco Lipófilo de Paso Rápido",
    front: "¿Cuál es la estructura de la heroína, por qué produce un efecto «flash» en el SNC y mediante qué secuencia enzimática se activa?",
    back: "Respecto a su estructura química, la **heroína es la 3,6-diacetilmorfina (diamorfina)**, obtenida por acetilación neutrofílica de ambos hidroxilos con anhídrido acético.\n\nAl tener enmascarados el fenol C3 y el alcohol C6 con grupos éster acetato, la molécula pierde la polaridad de los hidroxilos y multiplica su lipofilia. Esto le permite **atravesar la barrera hematoencefálica en cuestión de segundos**, originando el característico efecto «flash» euforizante.\n\nUna vez en el encéfalo, las **esterasas tisulares** la activan en dos etapas:\n1. Hidrólisis rápida del acetato fenólico de C3 -> **6-acetilmorfina (6-MAM)**, que posee el fenol libre y altísima afinidad intrínseca por el receptor μ.\n2. Hidrólisis posterior del acetato en C6 -> **morfina libre**, asegurando una acción analgésica prolongada.",
    structures: [
      { name: "Heroína", imagePath: "estructuras/tema-06/QFDOS-305_heroina.png", smiles: "CC(=O)Oc1ccc2c3c1O[C@H]1[C@@H](OC(C)=O)C=C[C@H]4[C@@H](C2)N(C)CC[C@@]341", badge: "3,6-Diacetato · Paso BHE ultrarrápido" },
      { name: "6-Acetilmorfina", imagePath: "estructuras/tema-06/QFDOS-304_6_acetilmorfina.png", smiles: "CC(=O)O[C@H]1C=C[C@H]2[C@H]3CC4=C5[C@]2([C@H]1OC5=C(C=C4)O)CCN3C", badge: "Metabolito cerebral activo" }
    ],
    difficulty: 'easy',
    category: "Morfina y SAR Clásico"
  },
  {
    id: "fc-06-06",
    topicId: 'tema-06',
    concept: "Farmacóforo Opioide de Beckett–Casy",
    front: "¿Cuáles son los cuatro elementos obligatorios del farmacóforo opioide clásico y qué residuo del receptor fija al nitrógeno?",
    back: "El modelo farmacofórico canónico de los analgésicos opioides (Beckett–Casy) exige cuatro elementos estructurales dispuestos en una geometría espacial definida:\n\n1. **Anillo aromático plano:** Establece interacciones hidrofóbicas y de apilamiento pi con el receptor.\n2. **Centro hidroxílico fenólico:** Situado a la distancia adecuada en el anillo aromático (C3-OH) para donar un enlace de hidrógeno clave.\n3. **Carbono cuaternario central (C13):** Proyecta la cadena perpendicularmente al plano aromático (geometría en T).\n4. **Nitrógeno terciario protonable:** Separado por una cadena etilénica (-CH2-CH2-) de dos carbonos respecto al carbono cuaternario. A pH fisiológico (7,4) está protonado en forma de catión amonio (–NH⁺–) y forma un **enlace iónico esencial con el carboxilato del Aspartato 147 (Asp147)** en el receptor opioide μ.",
    structures: [
      { name: "Morfina", imagePath: "estructuras/tema-06/QFDOS-299_morfina.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "Farmacóforo pentacíclico" },
      { name: "Petidina", imagePath: "estructuras/tema-06/QFDOS-333_petidina.png", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", badge: "Farmacóforo simplificado" }
    ],
    difficulty: 'medium',
    category: "Farmacóforo e Interacciones"
  },
  {
    id: "fc-06-07",
    topicId: 'tema-06',
    concept: "N-Desalquilación Semisintética con Cloroformiatos",
    front: "¿Cómo se elimina industrialmente el grupo N-metilo de la morfina para preparar normorfina y poder acoplar nuevas cadenas?",
    back: "Para modificar el nitrógeno de la morfina es necesario eliminar primero el grupo metilo original (desmetilación). Dado que la amina terciaria no puede desmetilarse por sustitución directa simple, se utiliza la **reacción con cloroformiatos** (de etilo, fenilo o 2,2,2-tricloroetilo):\n\n1. El nitrógeno terciario ataca al carbonilo del cloroformiato (Cl–COO–R) expulsando cloruro y formando un cloruro de amonio cuaternario inestable.\n2. Por calentamiento, el cloruro liberado ataca al metilo vía SN2, expulsando cloruro de metilo (CH3Cl) gaseoso y dejando un **carbamato en el nitrógeno**.\n3. La hidrólisis ácida o básica suave del carbamato libera dióxido de carbono y el alcohol correspondiente, rindiendo la amina secundaria **normorfina**.\n4. La normorfina libre se alquila o acila con el reactivo deseado (bromuro de alilo, cloruro de ciclopropanocarbonilo, cloruro de fenacetilo).",
    structures: [
      { name: "Morfina", imagePath: "estructuras/tema-06/QFDOS-299_morfina.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "N-Metilo original" },
      { name: "Naloxona", imagePath: "estructuras/tema-06/QFDOS-316_naloxona.png", smiles: "C=CCN1CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@@]3(O)[C@H]1C5", badge: "N-Alilo semisintético" }
    ],
    difficulty: 'hard',
    category: "Semisíntesis y Reactividad"
  },
  {
    id: "fc-06-08",
    topicId: 'tema-06',
    concept: "SAR del Nitrógeno: Transición de Agonista a Antagonista",
    front: "¿Cómo varía la actividad opioide al modificar el tamaño y naturaleza de la cadena unida al nitrógeno N17?",
    back: "La modificación del sustituyente sobre el nitrógeno es el eje más crítico de la farmacología opioide:\n\n- **N-Metilo (–CH3):** Agonismo puro óptimo (morfina, codeína).\n- **N-Etilo / N-Propilo (–CH2CH3, –CH2CH2CH3):** La actividad analgésica cae casi a cero por impedimento estérico inicial en el bolsillo de activación.\n- **Cadenas de 3 carbonos insaturadas o rígidas (Alilo o Ciclopropilmetilo):** Se produce una **transición completa a ANTAGONISMO**: la molécula mantiene la afinidad de unión pero no puede inducir el cambio conformacional activo del receptor (nalorfina, naloxona, naltrexona).\n- **N-Fenetilo (–CH2–CH2–Ph):** La potencia analgésica se dispara hasta **14 veces la de la morfina** (y 50-100 veces en fentanilos) porque el anillo fenílico distal alcanza un bolsillo hidrofóbico accesorio suplementario en el receptor.",
    structures: [
      { name: "Morfina", imagePath: "estructuras/tema-06/QFDOS-299_morfina.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "N-Me · Agonista" },
      { name: "Naloxona", imagePath: "estructuras/tema-06/QFDOS-316_naloxona.png", smiles: "C=CCN1CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@@]3(O)[C@H]1C5", badge: "N-Alilo · Antagonista" },
      { name: "N-Fenetilnormorfina", imagePath: "estructuras/tema-06/QFDOS-314_n_fenetilnormorfina.png", smiles: "Oc1ccc2c3c1O[C@H]1[C@@H](O)C=C[C@H]4[C@@H](C2)N(CCc2ccccc2)CC[C@@]341", badge: "N-Fenetilo · 14x potencia" }
    ],
    difficulty: 'medium',
    category: "Extensión y Antagonistas"
  },
  {
    id: "fc-06-09",
    topicId: 'tema-06',
    concept: "Diferenciación Electrónica: Alilo frente a Vinilo",
    front: "¿Por qué un grupo alilo en el nitrógeno genera un antagonista activo (naloxona) mientras que un grupo vinilo hace la molécula inactiva?",
    back: "En cuanto a la reactividad electrónica y la protonación:\n\n- **Grupo Alilo (–CH2–CH=CH2):** El doble enlace alquénico está separado del nitrógeno por un **carbono espaciador sp3 (–CH2–)**. Esta discontinuidad impide la conjugación electrónica por resonancia. El par de electrones solitario del nitrógeno queda completamente disponible para **protonarse a pH fisiológico 7,4 (–NH⁺–)** y establecer el enlace iónico indispensable con el residuo de Aspartato del receptor.\n\n- **Grupo Vinilo (–CH=CH2):** El doble enlace se halla directamente unido al nitrógeno, formando una **enamina**. El par electrónico no enlazante del nitrógeno se deslocaliza hacia el sistema pi del alqueno. Como resultado, la basicidad del nitrógeno se desploma (pKa < 4), impidiendo su protonación a pH 7,4, lo que anula por completo la formación del enlace electrostático con el receptor.",
    structures: [
      { name: "Nalorfina", imagePath: "estructuras/tema-06/QFDOS-315_nalorfina.png", smiles: "C=CCN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "N-Alilo (sp3 separador) · Activa" }
    ],
    difficulty: 'medium',
    category: "Extensión y Antagonistas"
  },
  {
    id: "fc-06-10",
    topicId: 'tema-06',
    concept: "El Sustituyente 14-OH: Oximorfona y Oxicodona",
    front: "¿Qué aporta la introducción del grupo hidroxilo en C14 (14β-OH) y en qué fármacos comerciales se encuentra?",
    back: "En cuanto a la optimización estructural, la introducción de un grupo hidroxilo terciario en la posición C14 orientado hacia la cara beta (**14β-OH**) genera importantes ventajas farmacológicas:\n\n1. **Aumento de la afinidad y potencia:** El –OH en C14 establece un enlace de hidrógeno adicional con el receptor opioide μ, compensando posibles pérdidas de unión y aumentando la potencia entre 2 y 5 veces.\n2. **Selectividad de subtipo:** Favorece fuertemente la selectividad por el receptor μ frente a los receptores κ y δ.\n\nSe encuentra en fármacos de gran relevancia clínica: la **oximorfona** (10 veces más potente que morfina), la **oxicodona** (semisintetizada a partir de tebaína, con excelente biodisponibilidad oral), el antídoto **naloxona** y el antagonista oral **naltrexona**.",
    structures: [
      { name: "Oximorfona", imagePath: "estructuras/tema-06/QFDOS-312_oximorfona.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@@]3(O)[C@H]1C5", badge: "14-OH · 6-Oxo · Alta afinidad" },
      { name: "Oxicodona", imagePath: "estructuras/tema-06/QFDOS-313_oxicodona.png", smiles: "COc1ccc2c3c1O[C@H]1C(=O)CC[C@@]4(O)[C@@H](C2)N(C)CC[C@]314", badge: "14-OH · 3-OMe · Oral" }
    ],
    difficulty: 'medium',
    category: "Extensión y Antagonistas"
  },
  {
    id: "fc-06-11",
    topicId: 'tema-06',
    concept: "Antagonistas Periféricos PAMORA",
    front: "¿Qué es un PAMORA, qué tres estrategias químicas impiden que crucen la barrera hematoencefálica y cuál es su indicación clínica?",
    back: "Los **PAMORA** (*Peripherally Acting Mu-Opioid Receptor Antagonists*) son antagonistas opioides selectivos de receptores μ periféricos diseñados para revertir el **estreñimiento inducido por opioides (EIO)** sin anular la analgesia central en pacientes con dolor crónico u oncológico.\n\nPara impedir el cruce de la barrera hematoencefálica se emplean tres estrategias químicas distintas:\n1. **Carga permanente de amonio cuaternario:** **Metilnaltrexona**, con un nitrógeno tetrasustituido ionizado permanentemente a cualquier pH biológico.\n2. **Conjugación con polietilenglicol (PEG):** **Naloxegol**, cuyo derivado pegilado en C6 posee gran tamaño molecular polar y actúa como sustrato activo de la bomba de expulsión glicoproteína P (P-gp).\n3. **Volumen estérico masivo:** **Naldemedina**, con una carboxamida voluminosa unida a un heterociclo de 1,2,4-oxadiazol en C7.",
    structures: [
      { name: "Metilnaltrexona", imagePath: "estructuras/tema-06/QFDOS-319_metilnaltrexona.png", smiles: "C[N+]1(CC2CC2)CC[C@]23c4c5ccc(O)c4O[C@H]2C(=O)CC[C@@]3(O)[C@H]1C5", badge: "Amonio cuaternario N+" },
      { name: "Naloxegol", imagePath: "estructuras/tema-06/QFDOS-320_naloxegol.png", smiles: "C=CCN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](OCCOCCOCCOCCOCCOCCOCCOC)CC[C@@]3(O)[C@H]1C5", badge: "Conjugado PEG en C6" },
      { name: "Naldemedina", imagePath: "estructuras/tema-06/QFDOS-321_naldemedina.png", smiles: "CC(C)(NC(=O)C1=C(O)[C@@H]2Oc3c(O)ccc4c3[C@@]23CCN(CC2CC2)[C@H](C4)[C@]3(O)C1)c1nc(-c2ccccc2)no1", badge: "Sustituyente voluminoso C7" }
    ],
    difficulty: 'hard',
    category: "Extensión y Antagonistas"
  },
  {
    id: "fc-06-12",
    topicId: 'tema-06',
    concept: "Simplificación Molecular: Morfinanos (Levorfanol y Dextrometorfano)",
    front: "¿Qué anillo se elimina al pasar de la morfina a los morfinanos y qué ilustran el levorfanol y el dextrometorfano sobre la eudismia?",
    back: "En la primera etapa de simplificación molecular de la morfina se elimina el **anillo E (puente éter 4,5-epóxido)**, pasando de un sistema pentacíclico a un sistema tetracíclico denominado **morfinano** (esqueleto fenantrénico con anillo de piperidina).\n\nRespecto a los dos fármacos emblemáticos:\n- **Levorfanol:** Es el enantiómero levógiro **(−)-3-hidroxi-N-metilmorfinano**. Posee una afinidad por receptores μ y una potencia analgésica unas **4 a 8 veces mayor que la morfina**, demostrando que el puente éter 4,5 no solo no es necesario, sino que su eliminación permite una mejor acomodación en el receptor.\n- **Dextrometorfano:** Es el enantiómero dextrógiro **(+)-3-metoxi-N-metilmorfinano**. Carece absolutamente de afinidad por receptores opioides μ (no es analgésico ni genera adicción), pero es un eficaz **antitusígeno central** y bloqueante de receptores NMDA. Es un ejemplo clásico de eudismia en química farmacéutica.",
    structures: [
      { name: "Levorfanol", imagePath: "estructuras/tema-06/QFDOS-324_levorfanol.png", smiles: "CN1CC[C@]23CCCC[C@H]2[C@H]1Cc1ccc(O)cc13", badge: "(−) Morfinano · Agonista μ" },
      { name: "Dextrometorfano", imagePath: "estructuras/tema-06/QFDOS-328_dextrometorfano.png", smiles: "COc1ccc2c(c1)[C@]13CCCC[C@@H]1[C@H](C2)N(C)CC3", badge: "(+) Morfinano · Antitusígeno NMDA" }
    ],
    difficulty: 'medium',
    category: "Simplificación Molecular"
  },
  {
    id: "fc-06-13",
    topicId: 'tema-06',
    concept: "6,7-Benzomorfanos: Metazocina y Pentazocina",
    front: "¿Qué anillos se eliminan en los benzomorfanos, qué representan los dos metilos cis y qué perfil de receptor tiene la pentazocina?",
    back: "En la segunda etapa de simplificación molecular se elimina además el **anillo C**, conservando únicamente los anillos **A (aromático), B y D (piperidina)**: es el andamiaje del **6,7-benzomorfano**.\n\n- **Los dos metilos en cis (metazocina):** Ocupan las posiciones que correspondían a los carbonos de unión del anillo C eliminado («muñones» del anillo C). Son imprescindibles para mantener la conformación tridimensional activa de la piperidina.\n- **Pentazocina:** Incorpora una cadena N-dimetilalilo (-CH2-CH=C(CH3)2). Actúa como **agonista de receptores opioides κ (KOR)** y como antagonista débil o agonista parcial μ. Produce analgesia espinal con menor riesgo de depresión respiratoria que la morfina (efecto techo), pero puede provocar **disforia, alucinaciones y efectos psicotomiméticos** debidos a la activación κ central.",
    structures: [
      { name: "Metazocina", imagePath: "estructuras/tema-06/QFDOS-329_metazocina.png", smiles: "C[C@H]1[C@@H]2Cc3ccc(O)cc3[C@]1(C)CCN2C", badge: "Muñones cis del anillo C" },
      { name: "Pentazocina", imagePath: "estructuras/tema-06/QFDOS-331_pentazocina.png", smiles: "CC(C)=CCN1CCC2(C)c3cc(O)ccc3CC1C2C", badge: "Agonista κ / Antagonista μ" }
    ],
    difficulty: 'medium',
    category: "Simplificación Molecular"
  },
  {
    id: "fc-06-14",
    topicId: 'tema-06',
    concept: "4-Fenilpiperidinas: Petidina frente a Cetobemidona",
    front: "¿Cómo se simplifica el esqueleto en la petidina y por qué la cetobemidona es sustancialmente más potente?",
    back: "En la tercera etapa de simplificación se elimina también el anillo B, conservando únicamente el **anillo A fenilo** y el **anillo de piperidina** unidos a través de un carbono cuaternario central en la posición 4 de la piperidina:\n\n- **Petidina (meperidina):** Contiene un éster etílico (-COOCH2CH3) en C4. Carece del grupo hidroxilo fenólico en el anillo aromático, por lo que su potencia es sólo un 10-20% de la morfina, pero conserva suficiente afinidad para el dolor agudo y posee propiedades antiespasmódicas.\n- **Cetobemidona:** Sustituye el éster etílico por una cetona alifática (grupo **propanoílo, –CO–CH2–CH3**) y reintroduce el **hidroxilo fenólico en posición meta**. Esta combinación restaura una interacción óptima por puente de hidrógeno en el receptor MOR, elevando su potencia analgésica al nivel o por encima de la morfina.",
    structures: [
      { name: "Petidina", imagePath: "estructuras/tema-06/QFDOS-333_petidina.png", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", badge: "Éster etílico · Sin fenol" },
      { name: "Cetobemidona", imagePath: "estructuras/tema-06/QFDOS-334_cetobemidona.png", smiles: "CCC(=O)C1(c2cccc(O)c2)CCN(C)CC1", badge: "Propanoílo · Fenol meta · Alta potencia" }
    ],
    difficulty: 'easy',
    category: "Simplificación Molecular"
  },
  {
    id: "fc-06-15",
    topicId: 'tema-06',
    concept: "El Enigma SAR del N-Cinamilo: Petidina frente a Morfina",
    front: "¿Qué efecto paradójico produce el grupo N-cinamilo en la norpetidina frente a la normorfina y qué revela del receptor?",
    back: "La sustitución del grupo N-metilo por un grupo **N-cinamilo (–CH2–CH=CH–Ph)** produce un comportamiento diametralmente opuesto según la rigidez del andamiaje molecular:\n\n1. **En la norpetidina:** La **N-cinamilnorpetidina** es unas **30 veces más potente** que la petidina original. La mayor flexibilidad conformacional de la 4-fenilpiperidina permite que el nitrógeno se oriente de tal forma que el fenilo del grupo cinamilo alcance un bolsillo hidrofóbico accesorio muy favorable en el receptor opioide μ.\n2. **En la normorfina:** La **N-cinamilnormorfina** es **totalmente inactiva**. En el esqueleto pentacíclico rígido de la morfina, la restricción geométrica orienta el grupo cinamilo hacia una pared estérica del receptor, chocando con residuos proteicos e impidiendo la unión.\n\nEsto demuestra que una misma modificación de sustituyente puede tener consecuencias opuestas según la flexibilidad del andamiaje.",
    structures: [
      { name: "Petidina", imagePath: "estructuras/tema-06/QFDOS-333_petidina.png", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", badge: "Prototipo 4-fenilpiperidina" },
      { name: "N-Cinamilnorpetidina", imagePath: "estructuras/tema-06/QFDOS-335_n_cinamilnorpetidina.png", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C/C=C/c2ccccc2)CC1", badge: "30x potencia frente a petidina" }
    ],
    difficulty: 'hard',
    category: "Simplificación Molecular"
  },
  {
    id: "fc-06-16",
    topicId: 'tema-06',
    concept: "Síntesis Industrial de la Petidina (Meperidina)",
    front: "¿Cuáles son los cuatro pasos de la síntesis de la petidina a partir de fenilacetonitrilo y mecloretamina?",
    back: "La síntesis industrial clásica de la petidina sigue cuatro etapas de gran elegancia mecanicista:\n\n1. **Generación del carbanión bencílico:** El **fenilacetonitrilo** (PhCH2CN) se trata con una base muy fuerte (**sodamida, NaNH2**). El nitrilo y el fenilo aumentan la acidez del carbono alfa, formándose un carbanión nucleófilo.\n2. **Cierre de piperidina por doble alquilación:** El carbanión ataca a la **mecloretamina** (mostaza nitrogenada: Cl–CH2CH2–N(CH3)–CH2CH2–Cl) en una primera sustitución nucleófila SN2; un segundo desprotonado permite el ataque intramolecular sobre el segundo cloro, cerrando el anillo de seis miembros y rindiendo **4-fenil-1-metilpiperidina-4-carbonitrilo**.\n3. **Hidrólisis del nitrilo:** El grupo ciano (-CN) se hidroliza con ácido acuoso a reflujo, pasando por amida hasta **ácido carboxílico en C4**.\n4. **Esterificación final:** Reacción con etanol en medio ácido sulfúrico concentrado para rendir el éster etílico (**petidina**).",
    structures: [
      { name: "Fenilacetonitrilo", imagePath: "estructuras/tema-06/QFDOS-346_fenilacetonitrilo.png", smiles: "C1=CC=C(C=C1)CC#N", badge: "Reactivo alfa-ácido" },
      { name: "Mecloretamina", imagePath: "estructuras/tema-06/QFDOS-347_mecloretamina.png", smiles: "CN(CCCl)CCCl", badge: "Doble alquilante mostaza" },
      { name: "Petidina", imagePath: "estructuras/tema-06/QFDOS-333_petidina.png", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", badge: "Producto final" }
    ],
    difficulty: 'hard',
    category: "Síntesis de Analgésicos"
  },
  {
    id: "fc-06-17",
    topicId: 'tema-06',
    concept: "Síntesis de la Cetobemidona: Reactivo de Grignard",
    front: "¿Cómo se introduce la cetona propanoílica en la síntesis de la cetobemidona a partir del nitrilo metoxilado?",
    back: "En la síntesis de la cetobemidona se parte de **3-metoxifenilacetonitrilo**, que se cicla con mecloretamina para dar 4-(3-metoxifenil)-1-metilpiperidina-4-carbonitrilo.\n\nPara transformar el nitrilo en la cetona deseada:\n1. Se trata el nitrilo con un reactivo de Grignard alifático de dos carbonos: **bromuro de etilmagnesio (CH3CH2MgBr)**.\n2. El reactivo organometálico nucleófilo ataca al carbono electrofílico del nitrilo formando una **sal de imina intermedia**.\n3. La hidrólisis ácida cuidadosa de la imina genera la cetona propanoílica (**O-metilcetobemidona**).\n4. Finalmente, se calienta con **ácido bromhídrico (HBr concentrado)** a reflujo para romper el éter metílico aromático (desprotección) y liberar el **fenol libre en meta**, completando la cetobemidona.",
    structures: [
      { name: "Cetobemidona", imagePath: "estructuras/tema-06/QFDOS-334_cetobemidona.png", smiles: "CCC(=O)C1(c2cccc(O)c2)CCN(C)CC1", badge: "Fenol meta + propanoílo" }
    ],
    difficulty: 'hard',
    category: "Síntesis de Analgésicos"
  },
  {
    id: "fc-06-18",
    topicId: 'tema-06',
    concept: "4-Anilidopiperidinas: Fentanilo y sus Características",
    front: "¿Por qué el fentanilo es 50 a 100 veces más potente que la morfina a pesar de carecer de fenol y de carbono cuaternario?",
    back: "El **fentanilo (N-fenil-N-[1-fenetilpiperidin-4-il]propanamida)** supuso una revolución en el diseño farmacológico:\n\n1. **Ausencia de elementos tradicionales:** No tiene carbono cuaternario central ni grupo fenol libre en el anillo aromático. En su lugar, el nitrógeno anilínico conecta el fenilo a la piperidina mediante un enlace de amida propanoilada.\n2. **Lipofilia extrema:** Su estructura altamente hidrófoba le confiere un logP elevado, atravesando la barrera hematoencefálica con enorme rapidez y redistribuyéndose rápidamente a tejido adiposo (inicio de acción inmediato, corta duración tras dosis única).\n3. **Ajuste óptimo por el grupo fenetilo:** La cadena N-fenetilo proyecta su anillo aromático hacia un bolsillo hidrófobo complementario de MOR, logrando una afinidad de unión extraordinariamente alta que compensa la ausencia del fenol.",
    structures: [
      { name: "Fentanilo", imagePath: "estructuras/tema-06/QFDOS-337_fentanilo.png", smiles: "CCC(=O)N(c1ccccc1)C1CCN(CCc2ccccc2)CC1", badge: "4-Anilidopiperidina · 50-100x potencia" }
    ],
    difficulty: 'easy',
    category: "Simplificación Molecular"
  },
  {
    id: "fc-06-19",
    topicId: 'tema-06',
    concept: "Síntesis del Fentanilo: Ruta Janssen",
    front: "¿Qué tres pasos componen la síntesis clásica del fentanilo a partir de 1-fenetil-4-piperidona (NPP)?",
    back: "La síntesis del fentanilo (ruta desarrollada por Paul Janssen) consta de tres etapas consecutivas:\n\n1. **Condensación para formar la imina:** La **1-fenetil-4-piperidona (NPP)** reacciona con **anilina** en presencia de catálisis ácida con eliminación de agua para formar una base de Schiff (imina):\n   `NPP + Anilina -> Imina de piperidona + H2O`\n2. **Aminación reductora:** La imina se reduce selectivamente con borohidruro de sodio (NaBH4) o hidrogenación catalítica (H2/Pd) para rendir la amina secundaria **4-ANPP (4-anilino-N-fenetilpiperidina)**.\n3. **Acilación final:** La 4-ANPP se hace reaccionar con **cloruro de propionilo (CH3CH2COCl)** en presencia de una base (trietilamina) para acilar el nitrógeno anilínico, rindiendo la amida final **fentanilo**.",
    structures: [
      { name: "NPP", imagePath: "estructuras/tema-06/QFDOS-353_1_fenetil_4_piperidona.png", smiles: "C1CN(CCC1=O)CCc2ccccc2", badge: "Precursor piperidona" },
      { name: "4-ANPP", imagePath: "estructuras/tema-06/QFDOS-356_4_anpp.png", smiles: "C1CN(CCC1Nc2ccccc2)CCc3ccccc3", badge: "Intermedio amina secundaria" },
      { name: "Fentanilo", imagePath: "estructuras/tema-06/QFDOS-337_fentanilo.png", smiles: "CCC(=O)N(c1ccccc1)C1CCN(CCc2ccccc2)CC1", badge: "Producto final acilado" }
    ],
    difficulty: 'medium',
    category: "Síntesis de Analgésicos"
  },
  {
    id: "fc-06-20",
    topicId: 'tema-06',
    concept: "Remifentanilo: Prototipo de Fármaco Blando (Soft Drug)",
    front: "¿Qué modificación estructural convierte al remifentanilo en un fármaco de vida media ultracorta y por qué no depende del hígado?",
    back: "El **remifentanilo** es el ejemplo paradigmático de **fármaco blando (soft drug)** en anestesiología:\n\n- **Modificación química:** Incorpora un grupo **éster metílico lábil** en la cadena propanoato unida al nitrógeno de la piperidina (–CH2–CH2–COOCH3), además de otro éster metílico en C4.\n- **Metabolismo tisular no hepático:** Una vez en el torrente circulatorio, el éster es hidrolizado rápidamente por **esterasas inespecíficas plasmáticas e histicas**, liberando un metabolito ácido carboxílico que posee una afinidad por MOR unas 4600 veces menor (inactivo).\n- **Ventaja clínica:** Su vida media sensible al contexto es de **apenas 3 a 5 minutos**, idéntica tras 1 hora o tras 12 horas de infusión. Su aclaramiento no depende del hígado ni del riñón, siendo ideal para pacientes críticos con fallo hepático o renal.",
    structures: [
      { name: "Remifentanilo", imagePath: "estructuras/tema-06/QFDOS-339_remifentanilo.png", smiles: "CCC(=O)N(c1ccccc1)C1(C(=O)OC)CCN(CCC(=O)OC)CC1", badge: "Éster lábil · Fármaco blando" }
    ],
    difficulty: 'medium',
    category: "Simplificación Molecular"
  },
  {
    id: "fc-06-21",
    topicId: 'tema-06',
    concept: "Metadona: Difenilpropilamina y Conformación Pseudocíclica",
    front: "¿Cómo adopta una molécula acíclica tan flexible como la metadona la conformación necesaria para unirse al receptor opioide?",
    back: "La **metadona (6-dimetilamino-4,4-difenilheptan-3-ona)** es una molécula acíclica de cadena alifática abierta con dos anillos fenílicos en un carbono cuaternario:\n\n1. **Conformación pseudocíclica:** A pesar de carecer de ciclos heterocíclicos, en solución adopta una conformación plegada pseudocíclica de seis miembros. Esto se debe a una **interacción electrostática dipolar intramolecular entre el par electrónico del nitrógeno básico y el carbono carbonílico del C=O**, estabilizada por enlace de hidrógeno intramolecular o apilamiento de los fenilos.\n2. **Eudismia:** Es una molécula quiral con un estereocentro en C6. Se administra comercialmente como racemato; el enantiómero **(R)-(−) (levometadona)** es el eutómero, con una afinidad por el receptor μ unas 10 a 50 veces mayor que el enantiómero (S).\n3. **Farmacocinética:** Posee una vida media muy larga (24–36 horas) y bloquea receptores NMDA, lo que evita el síndrome de abstinencia y fundamenta su uso en programas de mantenimiento de adictos a opiáceos.",
    structures: [
      { name: "Metadona", imagePath: "estructuras/tema-06/QFDOS-341_metadona.png", smiles: "CCC(=O)C(CC(C)N(C)C)(c1ccccc1)c1ccccc1", badge: "(R)-Levometadona es el eutómero" }
    ],
    difficulty: 'medium',
    category: "Simplificación Molecular"
  },
  {
    id: "fc-06-22",
    topicId: 'tema-06',
    concept: "Tramadol y Tapentadol: Mecanismos Duales",
    front: "¿Qué diferencia al tramadol del tapentadol en cuanto a su mecanismo de acción dual y su dependencia de la CYP2D6?",
    back: "Ambos fármacos combinan dos mecanismos sinérgicos: **agonismo de receptores opioides μ** e **inhibición de la recaptación de monoaminas** en las vías descendentes inhibitorias del dolor:\n\n- **Tramadol:** Es un aminociclohexanol racémico *trans*. Administrado como tal, es un inhibidor de recaptación de serotonina (5-HT) y noradrenalina (NA) y un agonista μ muy débil. Requiere **activación metabólica por la CYP2D6** (O-desmetilación) para formar el metabolito **O-desmetiltramadol (M1)**, que es el verdadero agonista μ potente. Por ello, su eficacia presenta variabilidad genética interindividual.\n\n- **Tapentadol:** Es una fenilpropilamina enantioméricamente pura *(1R,2R)* que **ya posee el fenol libre en meta**. Presenta agonismo directo en receptores μ e inhibición potente de la recaptación de noradrenalina (IRN), **sin necesidad de activación por CYP2D6**. Se metaboliza por glucuronidación directa de Fase II, garantizando una respuesta analgésica predecible.",
    structures: [
      { name: "Tramadol", imagePath: "estructuras/tema-06/QFDOS-343_tramadol.png", smiles: "COc1cccc(C2(O)CCCCC2CN(C)C)c1", badge: "Profármaco del metabolito M1" },
      { name: "Tapentadol", imagePath: "estructuras/tema-06/QFDOS-345_tapentadol.png", smiles: "CC[C@@H](c1cccc(O)c1)[C@@H](C)CN(C)C", badge: "Dual directo · Fenol meta libre" }
    ],
    difficulty: 'medium',
    category: "Simplificación Molecular"
  },
  {
    id: "fc-06-23",
    topicId: 'tema-06',
    concept: "Tebaína: Reactividad de Diels–Alder y Síntesis de Orvinoles",
    front: "¿Por qué la tebaína actúa como dieno en cicloadiciones [4+2] y qué secuencia de pasos conduce a la buprenorfina?",
    back: "La **tebaína** es un alcaloide del opio que carece de acción analgésica útil (es proconvulsivante). Su estructura contiene un **dieno conjugado endomolecular (C6=C7–C8=C14)** con 4 electrones pi reactivo frente a cicloadiciones [4+2] de Diels–Alder:\n\n1. **Cicloadición [4+2]:** Reacciona con dienófilos como la **metilvinilcetona** formando un aducto rígido con un puente **6,14-endo-eteno** (**tevinona**).\n2. **Hidrogenación catalítica:** Reducción del doble enlace del puente eteno a etano (**6,14-endo-etano**, dihidrotevinona).\n3. **Adición nucleófila de Grignard:** Tratamiento con cloruro de tert-butilmagnesio (tBuMgCl) sobre la cetona para formar un **alcohol terciario voluminoso** (con el grupo lipófilo en paraguas tert-butilo).\n4. **N-Desalquilación y N-alquilación:** Eliminación del N-metilo con BrCN (von Braun) y acilación con cloruro de ciclopropanocarbonilo seguida de reducción con LiAlH4 para introducir el grupo **N-ciclopropilmetilo**.\n5. **Desmetilación del fenol:** Tratamiento con KOH/dietilenglicol a reflujo para liberar el C3-OH, rindiendo **buprenorfina**.",
    structures: [
      { name: "Tebaína", imagePath: "estructuras/tema-06/QFDOS-357_tebaina.png", smiles: "COC1=CC=C2[C@H]3Cc4ccc(OC)c5c4[C@@]2(CCN3C)[C@H]1O5", badge: "Dieno conjugado C6=C7-C8=C14" },
      { name: "Buprenorfina", imagePath: "estructuras/tema-06/QFDOS-367_buprenorfina.png", smiles: "C[C@]([C@H]1C[C@@]23CC[C@@]1([C@H]4[C@@]25CCN([C@@H]3CC6=C5C(=C(C=C6)O)O4)CC7CC7)OC)(C(C)(C)C)O", badge: "Oripavina rígida final" }
    ],
    difficulty: 'hard',
    category: "Rigidez y Oripavinas"
  },
  {
    id: "fc-06-24",
    topicId: 'tema-06',
    concept: "Buprenorfina: Cinética de Disociación y Efecto Techo",
    front: "¿Por qué se dice que la buprenorfina se disocia de forma pseudoirreversible y por qué la naloxona convencional no la revierte fácilmente?",
    back: "La **buprenorfina** es un agonista parcial de receptores opioides μ y antagonista de receptores κ con características singulares:\n\n1. **Altísima afinidad y disociación lentísima:** El voluminoso grupo tert-butilo lipófilo forma un «paraguas» hidrófobo sobre el centro activo del receptor, impidiendo la entrada de moléculas de agua. Su tasa de disociación molecular es extraordinariamente lenta (**pseudoirreversible**).\n2. **Resistencia a reversión con naloxona:** A dosis terapéuticas estándar de naloxona, el antídoto no puede desplazar a la buprenorfina del receptor MOR debido a su lenta constante de desunión (koff). Si se produce una sobredosis, se requieren dosis masivas o infusión continua prolongada de naloxona.\n3. **Seguridad clínica (efecto techo):** Al ser un agonista parcial en MOR, presenta un **efecto techo en la depresión respiratoria**: a partir de cierta dosis, un incremento no acentúa la depresión respiratoria, lo que le confiere un perfil toxicológico mucho más seguro que la morfina o el fentanilo.",
    structures: [
      { name: "Buprenorfina", imagePath: "estructuras/tema-06/QFDOS-367_buprenorfina.png", smiles: "C[C@]([C@H]1C[C@@]23CC[C@@]1([C@H]4[C@@]25CCN([C@@H]3CC6=C5C(=C(C=C6)O)O4)CC7CC7)OC)(C(C)(C)C)O", badge: "Agonista parcial μ · Parasol t-Bu" }
    ],
    difficulty: 'medium',
    category: "Rigidez y Oripavinas"
  },
  {
    id: "fc-06-25",
    topicId: 'tema-06',
    concept: "Etorfina y Diprenorfina: Inmovilización Megafauna",
    front: "¿Por qué la etorfina es miles de veces más potente que la morfina y cuál es su antídoto veterinario específico?",
    back: "La **etorfina** es un orvinol derivado de la cicloadición sobre tebaína que incorpora una cadena alifática 2-pentanol en C7:\n\n- **Potencia extrema:** Es de **1000 a 8000 veces más potente que la morfina**. Su grupo alcohol terciario sustituido con n-propilo y metilo, junto al fenol C3 libre y al puente 6,14-endo-eteno, confiere una lipofilia e interacción hidrófoba casi insuperables.\n- **Uso exclusivo veterinario:** Debido a que unos pocos miligramos son letales para el ser humano por parada respiratoria inmediata, su uso está restringido exclusivamente a la inmovilización química de grandes animales (elefantes, rinocerontes).\n- **Antídoto específico:** Para revertir la inmovilización y despertar al animal se administra **diprenorfina**, un antagonista competitivo estricto que posee la misma estructura pero con un grupo **N-ciclopropilmetilo** en lugar del N-metilo.",
    structures: [
      { name: "Etorfina", imagePath: "estructuras/tema-06/QFDOS-365_etorfina.png", smiles: "CCC[C@@](C)(O)[C@H]1C[C@@]23C=C[C@]1(OC)[C@@H]1Oc4c(O)ccc5c4[C@@]12CCN(C)[C@@H]3C5", badge: "Agonista 1000-8000x morfina" }
    ],
    difficulty: 'medium',
    category: "Rigidez y Oripavinas"
  },
  {
    id: "fc-06-26",
    topicId: 'tema-06',
    concept: "Familias de Receptores Opioides y Señalización",
    front: "¿Cuáles son las tres familias principales de receptores opioides, a qué proteína G se acoplan y qué efectos celulares inducen?",
    back: "Los receptores opioides pertenecen a la superfamilia de **receptores acoplados a proteínas G (GPCR)** y se dividen en tres familias clásicas más el receptor NOP:\n\n- **Receptor Mu (μ / MOR):** Analgesia supraespinal y espinal, euforia, dependencia física, miosis, **depresión respiratoria** y estreñimiento.\n- **Receptor Kappa (κ / KOR):** Analgesia espinal, sedación, **disforia**, efectos psicotomiméticos (alucinaciones) y diuresis.\n- **Receptor Delta (δ / DOR):** Analgesia espinal y supraespinal, modulación del estado de ánimo y efecto antidepresivo.\n\nTodos se acoplan a **proteínas Gi/Go** inhibidoras:\n1. Inhiben la enzima **adenilato ciclasa**, disminuyendo los niveles intracelulares de AMPc.\n2. Cierran canales de calcio dependientes de voltaje en el terminal presináptico, **frenando la liberación de neurotransmisores del dolor** (sustancia P, glutamato).\n3. Abren canales de potasio rectificadores entrantes (**GIRK**) postsinápticos, provocando la salida de K⁺ y la **hiperpolarización neuronal**.",
    structures: [
      { name: "Morfina", imagePath: "estructuras/tema-06/QFDOS-299_morfina.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "Agonista MOR prototipo" }
    ],
    difficulty: 'easy',
    category: "Receptores y Péptidos"
  },
  {
    id: "fc-06-27",
    topicId: 'tema-06',
    concept: "Encefalinas Endógenas y Superposición Farmacofórica",
    front: "¿Cuál es la secuencia de las dos encefalinas endógenas y qué aminoácido mimetiza la porción activa de la morfina?",
    back: "Las encefalinas son pentapéptidos opioides endógenos liberados por neuronas del SNC:\n\n- **Met-encefalina:** `H-Tyr-Gly-Gly-Phe-Met-OH`\n- **Leu-encefalina:** `H-Tyr-Gly-Gly-Phe-Leu-OH`\n\nAmbas comparten idéntica secuencia tetrapeptídica N-terminal (`Tyr-Gly-Gly-Phe`), difiriendo únicamente en el quinto aminoácido C-terminal.\n\nEn cuanto a la superposición molecular con la morfina:\n1. El residuo **Tirosina N-terminal (Tyr1)** mimetiza con exactitud la región farmacofórica clave: su anillo fenólico coincide con el **anillo A y el C3-OH** de la morfina, mientras que su grupo amino terminal protonado (–NH3⁺) se superpone al **nitrógeno terciario protonado N17**.\n2. El residuo **Fenilalanina (Phe4)** aporta un segundo núcleo aromático hidrófobo que se superpone a la cavidad accesoria que ocupa el grupo fenetilo en la N-fenetilnormorfina o el fentanilo.",
    structures: [
      { name: "Met-encefalina", imagePath: "estructuras/tema-06/QFDOS-369_met_encefalina.png", smiles: "CSCC[C@@H](C(=O)O)NC(=O)[C@H](CC1=CC=CC=C1)NC(=O)CNC(=O)CNC(=O)[C@H](CC2=CC=C(C=C2)O)N", badge: "Tyr-Gly-Gly-Phe-Met" },
      { name: "Morfina", imagePath: "estructuras/tema-06/QFDOS-299_morfina.png", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", badge: "Tyr1 mimetiza el fenol y la amina" }
    ],
    difficulty: 'medium',
    category: "Receptores y Péptidos"
  },
  {
    id: "fc-06-28",
    topicId: 'tema-06',
    concept: "Estrategias de Estabilización Peptídica: DAMGO",
    front: "¿Por qué las encefalinas se degradan en segundos in vivo y qué modificaciones incorpora el DAMGO para estabilizarse?",
    back: "Las encefalinas naturales tienen una vida media de pocos segundos en plasma y cerebro porque son rápidamente hidrolizadas por proteasas:\n- Las **aminopeptidasas** rompen el enlace peptídico N-terminal entre Tyr1 y Gly2.\n- Las **endopeptidasas (neprilisina / NEP / encefalinasa)** hidrolizan el enlace interno entre Gly3 y Phe4.\n- Las **carboxipeptidasas** eliminan el aminoácido C-terminal.\n\nEl análogo de investigación **DAMGO ([D-Ala2, N-MePhe4, Gly5-ol]-encefalina)** resuelve esta inestabilidad mediante tres modificaciones racionales:\n1. **D-Alanina en posición 2 (D-Ala2):** La inversión de configuración de L a D en el segundo aminoácido bloquea estéricamente el ataque de las aminopeptidasas sin alterar la unión del farmacóforo al receptor μ.\n2. **N-Metilación en Phe4 (N-MePhe4):** Impide el reconocimiento y corte por neprilisina.\n3. **Alcohol en C-terminal (Gly5-ol):** La reducción del carboxilo terminal a alcohol primario (–CH2OH) evita la hidrólisis por carboxipeptidasas.",
    structures: [
      { name: "DAMGO", imagePath: "estructuras/tema-06/QFDOS-371_damgo.png", smiles: "C[C@H](C(=O)NCC(=O)N(C)[C@@H](CC1=CC=CC=C1)C(=O)NCCO)NC(=O)[C@H](CC2=CC=C(C=C2)O)N", badge: "D-Ala2 · N-MePhe4 · Gly-ol5" }
    ],
    difficulty: 'hard',
    category: "Receptores y Péptidos"
  },
  {
    id: "fc-06-29",
    topicId: 'tema-06',
    concept: "Difelikefalina: Tetrapéptido de D-Aminoácidos",
    front: "¿Cuál es la estructura de la difelikefalina, por qué no entra al SNC y cuál es su indicación aprobada?",
    back: "La **difelikefalina** es un innovador fármaco peptídico aprobado para el prurito asociado a hemodiálisis:\n\n- **Estructura química:** Es un tetrapéptido sintético constituido íntegramente por **D-aminoácidos**: `D-Phe-D-Phe-D-Leu-D-Lys`, cuyo extremo C-terminal está conjugado con un anillo de **ácido 4-aminopiperidina-4-carboxílico**.\n- **Resistencia enzimática:** Al estar formada por D-aminoácidos no naturales, las proteasas fisiológicas humanas son incapaces de hidrolizar sus enlaces peptídicos.\n- **Restricción periférica:** Posee múltiples grupos ionizables polares y alta hidrofilia, lo que **le impide por completo cruzar la barrera hematoencefálica**.\n- **Mecanismo e indicación:** Actúa como **agonista selectivo de receptores opioides κ (KOR) periféricos** presentes en las terminaciones de los nervios sensoriales de la piel. Alivia el prurito urémico sin provocar la disforia, sedación o alucinaciones centrales características de los agonistas κ que penetran al encéfalo.",
    structures: [
      { name: "Difelikefalina", imagePath: "estructuras/tema-06/QFDOS-372_difelikefalina.png", smiles: "CC(C)C[C@@H](NC(=O)[C@@H](Cc1ccccc1)NC(=O)[C@H](N)Cc1ccccc1)C(=O)N[C@H](CCCCN)C(=O)N1CCC(N)(C(=O)O)CC1", badge: "Todo D-aa · KOR periférico" }
    ],
    difficulty: 'hard',
    category: "Novedades y Nuevas Dianas"
  },
  {
    id: "fc-06-30",
    topicId: 'tema-06',
    concept: "Oliceridina: Agonismo Sesgado (Biased Agonism)",
    front: "¿En qué consiste el agonismo sesgado de la oliceridina en el receptor μ y qué hipótesis terapéutica perseguía?",
    back: "La **oliceridina** es un ligando sintético no morfínico diseñado bajo el paradigma del **agonismo sesgado (*biased agonism*)**:\n\n- **Bifurcación de vías de señalización:** Tras la activación del receptor μ, se pueden desencadenar dos vías intracelulares principales:\n  1. **Vía de la proteína Gi:** Inhibición de adenilato ciclasa y apertura de canales de potasio, responsable de la **analgesia**.\n  2. **Vía de la β-arrestina-2:** Responsable de la desensibilización del receptor, la tolerancia y asociada experimentalmente a efectos adversos graves como la **depresión respiratoria** y el estreñimiento.\n- **Diseño sesgado:** La oliceridina estimula selectivamente la vía de la proteína G minimizando el reclutamiento de β-arrestina-2, con el objetivo de lograr analgesia potente con menor riesgo de hipoventilación.\n- **Situación regulatoria:** Aprobada por la FDA en 2020 (Olinvyk); a finales de 2024 la compañía retiró el producto por razones de viabilidad comercial. En clínica humana la reducción de depresión respiratoria resultó menor de la esperada.",
    structures: [
      { name: "Oliceridina", imagePath: "estructuras/tema-06/QFDOS-373_oliceridina.png", smiles: "COc1ccsc1CNCC[C@@]1(c2ccccn2)CCOC2(CCCC2)C1", badge: "G-protein biased · No morfínico" }
    ],
    difficulty: 'hard',
    category: "Novedades y Nuevas Dianas"
  },
  {
    id: "fc-06-31",
    topicId: 'tema-06',
    concept: "Suzetrigina: Analgésico No Opioide Bloqueante NaV1.8",
    front: "¿Cuál es la diana de la suzetrigina y por qué representa un hito en el tratamiento del dolor agudo?",
    back: "La **suzetrigina (VX-548 / Journavx)** representa uno de los mayores hitos terapéuticos recientes (aprobada por la FDA en enero de 2025):\n\n- **Diana molecular:** Es un **bloqueante alostérico selectivo del canal de sodio dependiente de voltaje NaV1.8**.\n- **Localización restringida:** El canal NaV1.8 se expresa casi exclusivamente en las neuronas nociceptivas periféricas (fibras C y Aδ del ganglio de la raíz dorsal) que transmiten las señales de dolor hacia la médula espinal.\n- **Revolución analgésica:** Logra una eficacia analgésica en dolor agudo moderado a severo (postoperatorio) comparable a los opioides potentes, pero **sin actuar sobre ningún receptor opioide**. Al bloquear la propagación del potencial de acción periférico, **carece totalmente de riesgo de adicción, tolerancia, abuso o depresión respiratoria**.",
    structures: [
      { name: "Suzetrigina", imagePath: "estructuras/tema-06/QFDOS-374_suzetrigina.png", smiles: "COc1c([C@H]2[C@H](C(=O)Nc3ccnc(C(N)=O)c3)O[C@@](C)(C(F)(F)F)[C@H]2C)ccc(F)c1F", badge: "Bloqueante selectivo NaV1.8" }
    ],
    difficulty: 'medium',
    category: "Novedades y Nuevas Dianas"
  }
];
