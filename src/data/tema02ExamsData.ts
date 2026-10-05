// ==========================================================================
// QFDOS - Exámenes Calibrados Tema 02: Sistema Adrenérgico
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Modelos 1 y 2: Certificación Jev System-1
// Modelo 3: Síntesis Química, Farmacóforo y Bioisosterismo (Claude Code)
// Tipografía Científica: Texto plano y caracteres Unicode directos (cero LaTeX crudo)
// ==========================================================================

import type { TestQuestion } from './qfdosData';

// ==========================================================================
// MODELO 1: Biosíntesis, Metabolismo, Agonistas Directos e Indirectos, y REA
// 15 Preguntas · Clave: B, D, A, C, B, A, D, C, B, A, C, D, B, A, C
// ==========================================================================
export const TEMA2_MODELO_1_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 't02-m1-q01',
    topicId: 'tema-02',
    block: 'Transporte Activo & BHE',
    badge: 'JEV 1 · P1 (Conexión FIR)',
    question: 'La dopamina administrada por vía intravenosa carece de utilidad en el tratamiento de la enfermedad de Parkinson porque es incapaz de atravesar la barrera hematoencefálica (BHE). Sin embargo, su precursor biosintético L-DOPA sí accede al sistema nervioso central. ¿Cuál es la base molecular de esta diferencia farmacocinética?',
    questionSmiles: 'N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O',
    options: [
      { text: 'La L-DOPA difunde pasivamente gracias a que su coeficiente de reparto octanol/agua es notablemente superior al de la dopamina.' },
      { text: 'La L-DOPA es reconocida como sustrato por el transportador de aminoácidos neutros grandes LAT1 (SLC7A5) endotelial, mientras que la dopamina catiónica carece de dicho transporte facilitado.' },
      { text: 'La dopamina es degradada instantáneamente en la luz capilar por la dopa descarboxilasa vascular antes de tocar el endotelio cerebral.' },
      { text: 'La L-DOPA atraviesa la barrera mediante pinocitosis mediada por caveolina estimulada por su función carboxilato.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: La L-DOPA conserva el esqueleto α-aminoácido de la L-tirosina, lo que le permite ser sustrato del transportador facilitado dependiente de sodio LAT1 (SLC7A5) presente en las células endoteliales de los capilares cerebrales. En cambio, la dopamina es una feniletilamina catiónica a pH fisiológico (pKa ≈ 10.6) con un logP muy bajo (-1.0), lo que impide tanto la difusión pasiva transcelular como el transporte facilitado a través de LAT1.\n\n• Distractor a: Falso: la L-DOPA es un zwitterión aún más hidrófilo y polar que la dopamina; no entra por difusión pasiva.\n• Distractor c: Falso: la descarboxilasa periférica descarboxila L-DOPA a dopamina en la periferia, no destruye la dopamina vascular preformada.\n• Distractor d: Falso: el transporte de L-DOPA es selectivo y mediado por el carrier LAT1, no por pinocitosis inespecífica.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q02',
    topicId: 'tema-02',
    block: 'Inhibición Biosintética de Tirosina Hidroxilasa',
    badge: 'JEV 1 · P2 (Estructura 2D)',
    question: 'La tirosina hidroxilasa constituye el paso limitante en la biosíntesis de catecolaminas. ¿Cuál de las cuatro estructuras siguientes representa al inhibidor competitivo de esta enzima (α-metiltirosina / metirosina), capaz de deprimir la síntesis global de catecolaminas en pacientes con feocromocitoma?',
    options: [
      { text: 'L-Tirosina (sustrato fisiológico natural de la enzima)', smiles: 'N[C@@H](Cc1ccc(O)cc1)C(=O)O' },
      { text: 'L-DOPA (producto catecólico de la hidroxilación)', smiles: 'N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O' },
      { text: 'Carbidopa (inhibidor periférico de DOPA descarboxilasa con hidrazina)', smiles: 'CC(NN)(Cc1ccc(O)c(O)c1)C(=O)O' },
      { text: 'α-Metiltirosina / Metirosina (inhibidor competitivo de tirosina hidroxilasa)', smiles: 'CC(N)(Cc1ccc(O)cc1)C(=O)O' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: La α-metiltirosina (metirosina, opción D) se diferencia de la L-tirosina por la incorporación de un grupo metilo en el carbono alfa, conservando el anillo 4-hidroxifenilo (monofenol) y la función aminoácido. Esta sustitución α-metilo le permite competir con la L-tirosina por el centro activo de la tirosina hidroxilasa bloqueando la síntesis global de catecolaminas.\n\n• Distractor a: L-Tirosina: Es el sustrato fisiológico de la enzima, no su inhibidor.\n• Distractor b: L-DOPA: Es el producto de la tirosina hidroxilasa y sustrato de la descarboxilasa.\n• Distractor c: Carbidopa: Inhibidor de la DOPA descarboxilasa periférica caracterizado por su función hidrazina (-NH-NH2) y anillo catecólico.',
    difficulty: 'Avanzado'
  },
  {
    id: 't02-m1-q03',
    topicId: 'tema-02',
    block: 'Falsos Transmisores & Profármacos',
    badge: 'JEV 1 · P3 (Metabolismo Central)',
    question: 'La α-metildopa es un profármaco ampliamente prescrito en la hipertensión durante el embarazo. ¿Cuál es la ruta de bioactivación intracelular y el mecanismo de acción de su metabolito activo?',
    questionSmiles: 'CC(N)(Cc1ccc(O)c(O)c1)C(=O)O',
    options: [
      { text: 'Sufre descarboxilación por AADC y β-hidroxilación por DBH para formar α-metilnoradrenalina, un potente agonista de receptores α₂ presinápticos en el tronco del encéfalo.' },
      { text: 'Es fosforilada en el anillo catecólico formando un inhibidor suicida irreversible de la enzima catecol-O-metiltransferasa (COMT).' },
      { text: 'Es oxidada por la monoamino oxidasa B (MAO-B) transformándose en una sal de piridinio neurotóxica que destruye selectivamente las vesículas adrenérgicas.' },
      { text: 'Se acopla directamente a receptores β₂ bronquiales provocando una liberación refleja de óxido nítrico endotelial periférico.' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: La α-metildopa penetra en el SNC mediante LAT1. En las neuronas noradrenérgicas centrales, la L-aminoácido aromático descarboxilasa (AADC) la convierte en α-metildopamina, y a continuación la dopamina β-hidroxilasa (DBH) la hidroxila estereoespecíficamente para rendir (1R,2S)-α-metilnoradrenalina. Este metabolito actúa como falso neurotransmisor agonista de autorreceptores α₂ adrenérgicos presinápticos en el centro vasomotor bulbar, activando el bucle de retroalimentación negativa que reduce el tono simpático periférico.\n\n• Distractor b: Falso: no sufre fosforilación ni inhibe la COMT; es sustrato secuencial de AADC y DBH.\n• Distractor c: Falso: las sales de piridinio (como MPP+) derivan de tetrahidropiridinas como MPTP; la α-metildopa no sigue esa degradación.\n• Distractor d: Falso: no actúa a nivel periférico sobre receptores β₂, sino a nivel central sobre autorreceptores α₂.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q04',
    topicId: 'tema-02',
    block: 'Inhibidores Periféricos de AADC',
    badge: 'JEV 1 · P4 (Estructura 2D)',
    question: 'En la terapia antiparkinsoniana combinada (Sinemet), ¿qué estructura química corresponde a la carbidopa, inhibidor de la L-DOPA descarboxilasa que posee un grupo hidrazina polar zwitteriónica que le impide atravesar la barrera hematoencefálica?',
    options: [
      { text: 'Dopamina (amina biogénica periférica descarboxilada)', smiles: 'NCCc1ccc(O)c(O)c1' },
      { text: 'α-Metildopamina (metabolito intermedio sin función carboxilato)', smiles: 'CC(N)Cc1ccc(O)c(O)c1' },
      { text: 'Carbidopa (inhibidor periférico irreversible de AADC con hidrazina)', smiles: 'CC(NN)(Cc1ccc(O)c(O)c1)C(=O)O' },
      { text: 'L-DOPA (aminoácido neutro precursor que cruza la BHE)', smiles: 'N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: La carbidopa (opción C) es un análogo a la α-metildopa donde el grupo amino (-NH2) ha sido reemplazado por un grupo hidrazino (-NH-NH2) en el carbono alfa. Este grupo hidrazina condensa con el cofactor fosfato de piridoxal (PLP) de la descarboxilasa formando una hidrazona irreversible. Debido a su elevada polaridad zwitteriónica e impedimento estérico, no es reconocida por el transportador LAT1 y no cruza la BHE, inhibiendo la descarboxilación de L-DOPA exclusivamente en tejidos periféricos.\n\n• Distractor a: Dopamina: Amina descarboxilada carente de ácido carboxílico.\n• Distractor b: α-Metildopamina: Metabolito intermedio descarboxilado, no porta función hidrazina ni carboxilo.\n• Distractor d: L-DOPA: Fármaco principal administrado para cruzar la BHE, sustrato natural de AADC.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q05',
    topicId: 'tema-02',
    block: 'Regioespecificidad de COMT',
    badge: 'JEV 1 · P5 (Interacción con Receptor)',
    question: 'La catecol-O-metiltransferasa (COMT) degrada la noradrenalina transfiriendo un grupo metilo desde la S-adenosilmetionina (SAM) coordinada por un catión Mg²⁺. ¿Sobre qué posición del anillo catecólico ocurre predominantemente la metilación y qué residuo del receptor se ve impedido de interaccionar?',
    questionSmiles: 'NC[C@H](O)c1ccc(O)c(O)c1',
    options: [
      { text: 'Sobre el grupo 4-hidroxilo (para), impidiendo el enlace iónico con el residuo conservado Asp-113 en el TM3.' },
      { text: 'Sobre el grupo 3-hidroxilo (meta), bloqueando selectivamente el enlace de hidrógeno clave con la Ser-203 en el TM5.' },
      { text: 'Sobre el grupo amino de la cadena alifática, imposibilitando la coordinación divalente con el ion Zn²⁺ del bucle extracelular ECL2.' },
      { text: 'Sobre el carbono bencílico secundario, destruyendo el centro estereogénico y generando una mezcla racémica inerte.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: En el centro catalítico de la COMT, el catión Mg²⁺ coordina de forma bidentada a los dos oxígenos catecólicos. La disposición geométrica del complejo con SAM orienta el grupo sulfonio electrofílico selectivamente hacia el oxígeno en posición 3 (meta), rindiendo normetanefrina (3-O-metilnoradrenalina). Al metilarse el 3-OH, se suprime el dador de enlace de hidrógeno que en el receptor adrenérgico se une al residuo Ser-203 (en la hélice TM5), anulando la capacidad de inducir el cambio conformacional agonista.\n\n• Distractor a: Falso: el enlace iónico con Asp-113 (TM3) lo realiza el grupo amino protonado de la cadena lateral, no un OH fenólico.\n• Distractor c: Falso: la COMT metila fenoles catecólicos; la N-metilación la realiza la PNMT en médula adrenal.\n• Distractor d: Falso: la COMT es una O-metiltransferasa regioselectiva sobre el oxígeno fenólico en meta, no actúa sobre carbonos alifáticos.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q06',
    topicId: 'tema-02',
    block: 'Resistencia a COMT & Saligenina',
    badge: 'JEV 1 · P6 (Estructura 2D)',
    question: 'Observe las siguientes feniletanolaminas. ¿Cuál de ellas corresponde al salbutamol, fármaco agonista β₂ donde el 3-OH catecólico ha sido sustituido por un grupo 3-hidroximetilo (-CH2OH) metabólicamente resistente a la COMT?',
    options: [
      { text: 'Salbutamol (3-hidroximetil-4-hidroxifenilo con N-terc-butilo)', smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1' },
      { text: 'Isoprenalina (catecol N-isopropilo, metabolizable por COMT)', smiles: 'CC(C)NCC(O)c1ccc(O)c(O)c1' },
      { text: 'Adrenalina (catecolamina natural con N-metilo)', smiles: 'CNC[C@H](O)c1ccc(O)c(O)c1' },
      { text: 'Terbutalina (núcleo de resorcinol 3,5-dihidroxi con N-terc-butilo)', smiles: 'CC(C)(C)NCC(O)c1cc(O)cc(O)c1' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: El salbutamol (opción A) presenta un grupo 3-hidroximetilo (-CH2OH) y un grupo 4-hidroxi (-OH) en el anillo aromático (alcohol saligenínico), además de un voluminoso grupo terc-butilo (-C(CH3)3) sobre el nitrógeno. El espaciador metileno (-CH2-) entre el anillo y el oxígeno desacopla la coordinación coplanar bidentada requerida por el ion Mg²⁺ en el centro activo de la COMT, impidiendo la transferencia del metilo de SAM y otorgándole una prolongada semivida broncodilatadora.\n\n• Distractor b: Isoprenalina: Catecol clásico con sustituyente N-isopropilo; sufre metabolización inmediata por COMT (semivida de minutos).\n• Distractor c: Adrenalina: Catecol natural con N-metilo, sustrato rápido de COMT y MAO.\n• Distractor d: Terbutalina: Es un agonista β₂ resistente a COMT pero basado en el núcleo de resorcinol (3,5-dihidroxifenilo), no en alcohol saligenínico.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q07',
    topicId: 'tema-02',
    block: 'Metabolismo por MAO & Impedimento Alfa',
    badge: 'JEV 1 · P7 (Estabilidad Estérica)',
    question: 'La monoamino oxidasa (MAO) cataliza la desaminación oxidativa de aminas primarias y secundarias sin impedimento estérico. ¿Qué rasgo estructural presente en fármacos simpaticomiméticos como la anfetamina y la efedrina les confiere resistencia frente a la MAO, permitiendo su actividad biológica por vía oral?',
    questionSmiles: 'CC(N)Cc1ccccc1',
    options: [
      { text: 'La ausencia total de sustituyentes aromáticos en el anillo bencénico.' },
      { text: 'La sustitución del enlace carbono-carbono por una función hidrazina bioisóstera.' },
      { text: 'La protonación permanente del nitrógeno formando un amonio cuaternario insoluble.' },
      { text: 'La presencia de un grupo metilo en el carbono alfa contiguo al grupo amino (-CH(CH3)-NHR).' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: El mecanismo oxidativo de la MAO implica la abstracción estereoespecífica de un hidruro sobre el carbono contiguo al nitrógeno (carbono alfa) mediada por el cofactor FAD. La introducción de un grupo metilo en posición alfa (-CH(CH3)-NHR), como ocurre en la anfetamina y efedrina, genera un impedimento estérico severo en la cavidad de la MAO que bloquea el ataque del FAD. Esta protección metabólica permite que el fármaco resista el metabolismo presistémico intestinal/hepático y sea activo por vía oral con prolongada duración.\n\n• Distractor a: Falso: la anfetamina y efedrina conservan un anillo fenilo no sustituido que es esencial para su lipofilia.\n• Distractor b: Falso: las hidrazinas (como fenelzina) son inhibidores covalentes de la MAO, no el rasgo de las fenilisopropilaminas.\n• Distractor c: Falso: ni anfetamina ni efedrina son sales cuaternarias; son aminas primarias y secundarias respectivamente.',
    difficulty: 'Fácil'
  },
  {
    id: 't02-m1-q08',
    topicId: 'tema-02',
    block: 'REA Adrenérgica: Selectividad Alfa vs Beta',
    badge: 'JEV 1 · P8 (Escalera del Nitrógeno)',
    question: 'Al comparar la afinidad y respuesta funcional en la serie noradrenalina (-NH2) -> adrenalina (-NHCH3) -> isoprenalina (-NH-CH(CH3)2) -> salbutamol (-NH-C(CH3)3), se produce un desplazamiento inequívoco desde una acción preferente alfa hacia una selectividad beta y beta-2. ¿Cuál es la base molecular de esta relación estructura-actividad (REA)?',
    questionSmiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
    options: [
      { text: 'El aumento del volumen estérico sobre el nitrógeno polariza negativamente la amina aumentando el enlace covalente con la Ser-203.' },
      { text: 'Los sustituyentes voluminosos impiden la protonación del nitrógeno, forzando la unión en forma neutra exclusivamente en beta-2.' },
      { text: 'El receptor beta posee una amplia cavidad hidrofóbica adyacente al sitio del nitrógeno iónico capaz de acomodar grupos lipófilos ramificados, mientras que en el receptor alfa dicha zona está estéricamente restringida.' },
      { text: 'El grupo terc-butilo sufre hidrólisis enzimática selectiva en las células musculares lisas bronquiales liberando isobuteno gaseoso vasodilatador.' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: Los receptores adrenérgicos beta (y singularmente β₂) poseen una bolsa hidrofóbica auxiliar espaciosa próxima al residuo ácido Asp-113 en el TM3. Sustituyentes voluminosos ramificados sobre el nitrógeno como isopropilo (-CH(CH3)2) en isoprenalina o terc-butilo (-C(CH3)3) en salbutamol optimizan interacciones de dispersión de van der Waals en esta cavidad. En cambio, en los receptores α₁ y α₂, dicha cavidad es estrecha; sustituyentes mayores que metilo chocan estéricamente, anulando la afinidad agonista alfa.\n\n• Distractor a: Falso: los grupos alquilo donan densidad por efecto inductivo (+I), aumentando la basicidad, y nunca forman enlaces covalentes con serinas.\n• Distractor b: Falso: el pKa de aminas alifáticas secundarias es ≈ 9.5-10.0; a pH fisiológico 7.4 están protonadas en un 99% como catión amonio.\n• Distractor d: Falso: el terc-butilo es metabólicamente estable y no libera gases in vivo.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q09',
    topicId: 'tema-02',
    block: 'Estereoquímica: Easson-Stedman',
    badge: 'JEV 1 · P9 (Eutómero R)',
    question: 'Las catecolaminas presentan un centro estereogénico en el carbono bencílico que soporta el grupo hidroxilo. ¿Cuál es el enantiómero farmacológicamente activo (eutómero) en la noradrenalina y adrenalina, y cómo explica la hipótesis de Easson-Stedman su marcada eudismia?',
    questionSmiles: 'NC[C@H](O)c1ccc(O)c(O)c1',
    options: [
      { text: 'El eutómero es la forma (S), que interacciona en 4 puntos simultáneos mediante puentes disulfuro con cisteínas del ECL2.' },
      { text: 'El eutómero es la forma (R), cuyo grupo OH bencílico se orienta favorablemente para establecer un enlace de hidrógeno con el receptor, mientras que en el distómero (S) dicho OH apunta en dirección opuesta perdiendo dicha interacción complementaria.' },
      { text: 'El eutómero es el racemato equimolar (R,S), ya que ambos enantiómeros cooperan alostéricamente entre sí en el dímero del receptor.' },
      { text: 'El eutómero es la forma (S), porque el distómero (R) es atacado instantáneamente por esterasas plasmáticas endoteliales.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: Según el modelo de tres puntos de Easson-Stedman, la activación óptima del receptor adrenérgico requiere tres anclajes simultáneos: 1) interacción aromática/puentes de hidrógeno del catecol, 2) puente salino del grupo amino protonado con el carboxilato del Asp-113, y 3) enlace de hidrógeno del grupo OH bencílico secundario con un residuo complementario (Asn-293/Ser). En el eutómero (R)-noradrenalina, estos tres grupos se orientan en la conformación tridimensional idónea. En el distómero (S), para acoplar el catecol y la amina, el OH queda proyectado hacia el solvente, comportándose de forma similar a la dopamina (que carece de OH bencílico).\n\n• Distractor a: Falso: el eutómero de las catecolaminas naturales y feniletanolaminas es el enantiómero (R), no el (S).\n• Distractor c: Falso: los enantiómeros puros muestran marcada eudismia; el eutómero (R) es hasta 100 veces más potente que el (S).\n• Distractor d: Falso: no existen enlaces éster en la noradrenalina; no intervienen esterasas en su inactivación estereoselectiva.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q10',
    topicId: 'tema-02',
    block: 'Agonistas Alfa Heterocíclicos',
    badge: 'JEV 1 · P10 (Estructura 2D)',
    question: 'Entre los siguientes fármacos adrenérgicos, ¿cuál corresponde a la oximetazolina, agonista alfa directo vasoconstrictor que incorpora un heterociclo de 2-imidazolina (4,5-dihidro-1H-imidazol) unido por metileno a un fenol lipófilo?',
    options: [
      { text: 'Oximetazolina (arilalquilimidazolina descongestionante nasal)', smiles: 'Cc1cc(C(C)(C)C)c(CC2=NCCN2)c(C)c1O' },
      { text: 'Fenilefrina (feniletanolamina 3-hidroxifenilo directa α₁)', smiles: 'CNCC(O)c1cccc(O)c1' },
      { text: 'Isoprenalina (agonista beta catecólico)', smiles: 'CC(C)NCC(O)c1ccc(O)c(O)c1' },
      { text: 'Salbutamol (agonista β₂ saligenina)', smiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: La oximetazolina (opción A) pertenece a la familia de las arilalquilimidazolinas. Se caracteriza por un anillo bencénico densamente sustituido (grupo 6-terc-butilo, 2,4-dimetilo y 3-hidroxi) conectado por un puente metileno (-CH2-) a la posición 2 de un heterociclo de 4,5-dihidro-1H-imidazol (2-imidazolina). Este catión amidinio a pH fisiológico actúa como un potente agonista directo α₁ y α₂ empleado como descongestionante nasal tópico.\n\n• Distractor b: Fenilefrina: Es una feniletanolamina monocíclica con cadena lineal abierta, sin heterociclo.\n• Distractor c: Isoprenalina: Catecolamina prototipo agonista beta con amina alifática secundaria isopropílica.\n• Distractor d: Salbutamol: Feniletanolamina sustituida con 3-hidroximetilo y N-terc-butilo, agonista β₂ broncodilatador.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q11',
    topicId: 'tema-02',
    block: 'Agonistas Indirectos & Síndrome del Queso',
    badge: 'JEV 1 · P11 (Interacción Farmacológica)',
    question: 'La ingestión de alimentos ricos en tiramina (como quesos curados o vino tinto) en pacientes tratados con inhibidores de la monoamino oxidasa (IMAO) desencadena el denominado "síndrome del queso", caracterizado por crisis hipertensivas potencialmente letales. ¿Cuál es el mecanismo farmacológico responsable de este cuadro?',
    questionSmiles: 'NCCc1ccc(O)cc1',
    options: [
      { text: 'La tiramina es un antagonista irreversible de receptores β₂ que bloquea por completo la vasodilatación fisiológica periférica.' },
      { text: 'La tiramina estimula directamente los receptores muscarínicos vasculares causando una vasoconstricción coronaria masiva.' },
      { text: 'Al no ser degradada por la MAO intestinal/hepática, la tiramina entra en las terminales adrenérgicas por NET y expulsa masivamente la noradrenalina vesicular al espacio sináptico.' },
      { text: 'La tiramina forma un aducto covalente con la albúmina que bloquea los canales de potasio endoteliales.' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: La tiramina es un agonista adrenérgico indirecto. Normalmente se metaboliza por la MAO intestinal y hepática sin alcanzar la circulación sistémica. Bajo tratamiento con IMAO, pasa a la sangre, cruza al terminal axónico mediante el transportador de recaptación NET y compite con la noradrenalina por el transportador vesicular VMAT, desplazando la noradrenalina almacenada al citoplasma axonal y de ahí al espacio sináptico por inversión de NET, provocando vasoconstricción y picos de tensión arterial severos.\n\n• Distractor a: Falso: la tiramina no es un antagonista de β₂; su acción es presináptica indirecta liberadora de catecolaminas.\n• Distractor b: Falso: los receptores muscarínicos vasculares median vasodilatación por NO y no son activados por tiramina.\n• Distractor d: Falso: la fisiopatología radica en la liberación descontrolada de noradrenalina endógena, no en aductos con albúmina.',
    difficulty: 'Fácil'
  },
  {
    id: 't02-m1-q12',
    topicId: 'tema-02',
    block: 'Antagonistas Presinápticos: Reserpina vs Deserpidina',
    badge: 'JEV 1 · P12 (Alcaloides Rauwolfia)',
    question: 'La reserpina es un alcaloide de Rauwolfia serpentina que vacía las reservas vesiculares de noradrenalina; sin embargo, induce una profunda depresión central y sedación. Por su parte, la deserpidina conserva la potencia hipotensora con mínima acción depresora sobre el SNC. ¿Qué diferencia química estructural distingue a la deserpidina de la reserpina?',
    questionSmiles: 'COc1ccc2[nH]c3c(c2c1)CC[C@H]4N3C[C@H]5[C@@H](C4)[C@H](C(=O)OC)[C@H](OC(=O)c6cc(OC)c(OC)c(OC)c6)[C@@H](OC)C5',
    options: [
      { text: 'La deserpidina carece por completo de la cadena de 3,4,5-trimetoxibenzoato en el anillo E.' },
      { text: 'La deserpidina posee un anillo indólico cuaternizado con un catión piridinio permanente.' },
      { text: 'La deserpidina incorpora un grupo flúor en el C18 que impide su unión a los transportadores VMAT.' },
      { text: 'La deserpidina carece del grupo metoxilo (-OCH3) en la posición C11 del núcleo indólico (anillo A).' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: La reserpina y la deserpidina comparten el esqueleto pentacíclico del alcaloide yohimbano esterificado con el éster 3,4,5-trimetoxibenzoato en C18. La única diferencia estructural reside en que la reserpina porta un grupo metoxilo (-OCH3) en la posición 11 del anillo indólico (anillo A), mientras que la deserpidina carece de él (11-desmetoxireserpina). Esta pequeña variación reduce significativamente los efectos secundarios depresores sobre el SNC manteniendo el bloqueo periférico de VMAT.\n\n• Distractor a: Falso: el éster trimetoxibenzoato en C18 es esencial para la actividad y está presente en ambos alcaloides.\n• Distractor b: Falso: no hay nitrógenos cuaternarios; ambos son alcaloides indólicos neutros terciarios.\n• Distractor c: Falso: la molécula carece de átomos de flúor en su estructura natural.',
    difficulty: 'Avanzado'
  },
  {
    id: 't02-m1-q13',
    topicId: 'tema-02',
    block: 'Síntesis Orgánica de Salbutamol',
    badge: 'JEV 1 · P13 (Ruta Industrial)',
    question: 'En la síntesis industrial del salbutamol a partir de salicilato de metilo, ¿cuál es la secuencia correcta de transformaciones químicas sobre la cadena lateral y el sustituyente éster?',
    questionSmiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
    options: [
      { text: 'Bromación directa sobre el anillo aromático con Br2/FeBr3 seguida de condensación con terc-butilamina y oxidación a ácido carboxílico.' },
      { text: 'Acilación de Friedel-Crafts con cloruro de cloroacetilo -> aminación nucleófila con terc-butilamina -> reducción simultánea de la cetona a alcohol secundario y del éster metílico a alcohol primario con LiAlH4.' },
      { text: 'Formilación de Vilsmeier-Haack -> hidrólisis alcalina con NaOH -> alquilación con cloruro de terc-butilo bajo catálisis de paladio.' },
      { text: 'Reacción de Diels-Alder con butadieno -> apertura electrofílica del aducto con terc-butanol concentrado.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: La ruta industrial parte de salicilato de metilo. Se realiza una acilación de Friedel-Crafts con cloruro de cloroacetilo para introducir la cadena -CO-CH2-Cl en la posición para al fenol. A continuación, el cloro se desplaza por aminación nucleófila con terc-butilamina rindiendo una aminocetona intermedia. Finalmente, el tratamiento con hidruro de litio y aluminio (LiAlH4) reduce simultáneamente la cetona al alcohol secundario bencílico (-CH(OH)-) y el éster salicilato al alcohol primario bencílico (-CH2OH), rindiendo el salbutamol racémico.\n\n• Distractor a: Falso: la bromación aromática directa no genera la cadena aminada de feniletanolamina.\n• Distractor c: Falso: Vilsmeier-Haack introduce un formilo (-CHO), no la cadena haloacetilo requerida para la aminación con amina voluminosa.\n• Distractor d: Falso: no se emplean cicloadiciones de Diels-Alder en la construcción de feniletanolaminas.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m1-q14',
    topicId: 'tema-02',
    block: 'Antagonistas Presinápticos & Beckmann',
    badge: 'JEV 1 · P14 (Estructura 2D)',
    question: 'La guanetidina es un bloqueador presináptico que se prepara industrialmente mediante expansión de anillo con transposición de Beckmann. ¿Cuál de las siguientes estructuras químicas representa a la guanetidina?',
    options: [
      { text: 'Guanetidina (anillo de perhidroazocina de 8 miembros + etilguanidina)', smiles: 'NC(=N)NCCN1CCCCCCC1' },
      { text: 'Clonidina (2-(2,6-dicloroanilino)-2-imidazolina)', smiles: 'Clc1cccc(Cl)c1NC2=NCCN2' },
      { text: 'Fentolamina (fenilamino-metilimidazolina)', smiles: 'Cc1ccc(N(CC2=NCCN2)c2cccc(O)c2)cc1' },
      { text: 'Tolazolina (2-bencil-4,5-dihidro-1H-imidazol)', smiles: 'c1ccc(CC2=NCCN2)cc1' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: La guanetidina (opción A) consta de un heterociclo saturado de 8 miembros con un nitrógeno (perhidroazocina u octahidroazocina) unido por una cadena etileno (-CH2-CH2-) a una función guanidina libre terminal (-NH-C(=NH)-NH2). Sintéticamente, el anillo de azocina se obtiene por transposición de Beckmann de la cicloheptanona oxima a azaciclooctanona seguida de reducción del lactámico con LiAlH4, alquilación y guanilación final con S-metilisotiourea.\n\n• Distractor b: Clonidina: Es una 2-(2,6-diclorofenilamino)-2-imidazolina, agonista α₂.\n• Distractor c: Fentolamina: Es una fenilamino-metilimidazolina, antagonista competitivo de receptores alfa.\n• Distractor d: Tolazolina: Es 2-bencil-4,5-dihidro-1H-imidazol, antagonista alfa vasodilatador periférico.',
    difficulty: 'Avanzado'
  },
  {
    id: 't02-m1-q15',
    topicId: 'tema-02',
    block: 'LABAs & Exositios',
    badge: 'JEV 1 · P15 (Persistencia de Acción)',
    question: 'El salmeterol es un agonista β₂ de acción prolongada (LABA) con una duración clínica superior a 12 horas. ¿A qué rasgo molecular específico se debe su persistencia en el receptor bronquial?',
    questionSmiles: 'c1ccccc1CCCCOCCCCCCNCC(O)c2ccc(O)c(CO)c2',
    options: [
      { text: 'A la presencia de un grupo azida terminal que forma un enlace covalente cruzado irreversible con una cisteína del TM6.' },
      { text: 'A que se formula como una nanopartícula polimérica que precipita en la luz bronquial formando un cristal insoluble.' },
      { text: 'A su larga y flexible cadena hidrófoba lateral (4-fenilbutoxihexilo), que interactúa fuertemente con un exositio lipófilo adyacente del receptor manteniéndolo anclado cerca del sitio ortostérico.' },
      { text: 'A que inhibe de forma irreversible la adenilato ciclasa de las células epiteliales respiratorias impidiendo la caída de AMPc.' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: El salmeterol combina el farmacóforo de feniletanolamina del salbutamol (3-hidroximetil-4-hidroxifenilo) con una cadena N-alquílica muy prolongada: -(CH2)6-O-(CH2)4-C6H5 (cadena 4-fenilbutoxihexilo). Esta extensión lipófila se inserta en una zona hidrofóbica secundaria ("exositio") de la membrana lipídica y del receptor β₂. Este anclaje físico evita el lavado del fármaco fuera del microentorno del receptor, permitiendo que la cabeza polar se una y se disocie repetidamente del sitio activo durante más de 12 horas.\n\n• Distractor a: Falso: el salmeterol carece de grupos azida y su unión es puramente reversible, no covalente.\n• Distractor b: Falso: la duración prolongada es una propiedad intrínseca de su estructura química (farmacocinética de exositio), no de excipientes particulados.\n• Distractor d: Falso: los agonistas β₂ activan la adenilato ciclasa mediante proteína Gs aumentando el AMPc intracelular para causar broncodilatación.',
    difficulty: 'Medio'
  }
];

// ==========================================================================
// MODELO 2: Antagonistas (Beta y Alfa), Estereoquímica CIP y Reactividad Covalente
// 15 Preguntas · Clave: C, A, D, B, C, D, B, A, D, C, B, D, A, B, C
// ==========================================================================
export const TEMA2_MODELO_2_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 't02-m2-q01',
    topicId: 'tema-02',
    block: 'Génesis de Beta-Bloqueantes',
    badge: 'JEV 2 · P1 (Estructura 2D)',
    question: '¿Cuál de las siguientes estructuras corresponde al dicloroisoproterenol (DCI), primer β-bloqueante sintetizado en 1958 donde se reemplazaron los dos OH catecólicos por átomos de cloro, mostrando agonismo parcial?',
    options: [
      { text: 'Isoprenalina (catecolamina agonista beta clásica completa)', smiles: 'CC(C)NCC(O)c1ccc(O)c(O)c1' },
      { text: 'Pronetalol (primer antagonista beta puro con núcleo de naftilo)', smiles: 'CC(C)NCC(O)c1ccc2ccccc2c1' },
      { text: 'Dicloroisoproterenol / DCI (3,4-diclorofenil feniletanolamina con agonismo parcial)', smiles: 'CC(C)NCC(O)c1ccc(Cl)c(Cl)c1' },
      { text: 'Propranolol (ariloxipropanolamina prototipo no selectivo)', smiles: 'CC(C)NCC(O)COc1cccc2ccccc12' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: El dicloroisoproterenol (DCI, opción C) fue obtenido sustituyendo los dos hidroxilos catecólicos (3,4-di-OH) de la isoprenalina por dos átomos de cloro (3,4-diclorofenilo). Esta modificación eliminó los donadores de enlace de hidrógeno esenciales para la activación completa del receptor pero conservó suficiente afinidad para bloquear la respuesta de la adrenalina. No obstante, conservaba una notable actividad simpaticomimética intrínseca (ISA / agonismo parcial) que impedía su uso seguro en clínica.\n\n• Distractor a: Isoprenalina: Catecolamina agonista beta clásica completa, dotada de dos OH fenólicos.\n• Distractor b: Pronetalol: Posee un anillo condensado de naftilo; fue el primer antagonista beta puro sin actividad agonista residual.\n• Distractor d: Propranolol: Ariloxipropanolamina con espaciador oxietileno entre el naftilo y la cadena propanolamina.',
    difficulty: 'Fácil'
  },
  {
    id: 't02-m2-q02',
    topicId: 'tema-02',
    block: 'Pronetalol & Retirada Clínica',
    badge: 'JEV 2 · P2 (Toxicología Preclínica)',
    question: 'En 1962, James Black sustituyó el anillo diclorofenilo por un núcleo condensado de naftilo, dando origen al pronetalol. Se convirtió en el primer bloqueador beta puro sin actividad agonista residual, pero fue retirado tempranamente de la investigación clínica. ¿Cuál fue la causa de su retirada?',
    questionSmiles: 'CC(C)NCC(O)c1ccc2ccccc2c1',
    options: [
      { text: 'Demostró una elevada carcinogenicidad al inducir tumores tímicos y linfosarcomas en modelos animales murinos.' },
      { text: 'Desencadenaba hipotensión ortostática fulminante debida a su conversión metabólica en un potente agonista α₂ cerebral.' },
      { text: 'Bloqueaba de forma irreversible los canales de potasio hERG provocando taquicardias ventriculares tipo Torsades de Pointes.' },
      { text: 'Era un sustrato preferente del transportador LAT1 que se acumulaba tóxicamente en las neuronas dopaminérgicas.' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: A pesar de demostrar eficacia clínica como antianginoso y antiarrítmico al ser un antagonista beta puro, el pronetalol indujo la aparición de tumores de timo en ratones en los ensayos toxicológicos preclínicos, obligando a su inmediata retirada y forzando la búsqueda de análogos estructurales seguros.\n\n• Distractor b: Falso: el pronetalol es un β-bloqueante periférico; no se biotransforma en agonistas α₂.\n• Distractor c: Falso: su retirada no obedeció a prolongación del intervalo QT o hERG, sino a carcinogenicidad tímica animal.\n• Distractor d: Falso: no es transportado por LAT1 (no posee esqueleto de aminoácido).',
    difficulty: 'Medio'
  },
  {
    id: 't02-m2-q03',
    topicId: 'tema-02',
    block: 'Ariloxipropanolaminas & Propranolol',
    badge: 'JEV 2 · P3 (Estructura 2D)',
    question: '¿Qué estructura química representa al propranolol, prototipo de los β-bloqueantes que inaugura la familia de las ariloxipropanolaminas al incorporar un espaciador oximetileno (-O-CH2-) entre el naftilo y la cadena de propanolamina?',
    options: [
      { text: 'Pronetalol (ariletanolamina naftílica directa sin oxígeno etéreo)', smiles: 'CC(C)NCC(O)c1ccc2ccccc2c1' },
      { text: 'Practolol (ariloxipropanolamina monocíclica p-acetamido)', smiles: 'CC(=O)Nc1ccc(OCC(O)CNC(C)C)cc1' },
      { text: 'Atenolol (ariloxipropanolamina p-acetamida cardioselectiva β₁)', smiles: 'NC(=O)Cc1ccc(OCC(O)CNC(C)C)cc1' },
      { text: 'Propranolol (1-naftil ariloxipropanolamina no selectiva)', smiles: 'CC(C)NCC(O)COc1cccc2ccccc12' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: El propranolol (opción D) es el fármaco de referencia de las ariloxipropanolaminas: presenta un anillo 1-naftilo conectado a una cadena de -O-CH2-CH(OH)-CH2-NH-CH(CH3)2. La inserción de la unidad oxietileno (-O-CH2-) aumentó de 10 a 20 veces la potencia antagonista beta respecto al pronetalol (opción A) y suprimió completamente la carcinogenicidad tímica observada en su predecesor.\n\n• Distractor a: Pronetalol: Es una ariletanolamina (unión naftilo directa al C-OH sin oxígeno etéreo intercalado).\n• Distractor b: Practolol: Ariloxipropanolamina monocíclica con sustituyente acetamido en para (-NH-CO-CH3), cardioselectivo β₁.\n• Distractor c: Atenolol: Ariloxipropanolamina con sustituyente acetamida terminal (-CH2-CO-NH2) en posición para.',
    difficulty: 'Fácil'
  },
  {
    id: 't02-m2-q04',
    topicId: 'tema-02',
    block: 'Estereoquímica & Reglas CIP',
    badge: 'JEV 2 · P4 (Inversión Formal CIP)',
    question: 'El eutómero de los β-bloqueantes de la serie ariloxipropanolamina (ej. propranolol) posee configuración formal (S), mientras que en las ariletanolaminas (ej. noradrenalina, pronetalol) el eutómero es la forma (R). ¿Cómo se explica que cambie la letra de configuración si ambos interactúan con la MISMA disposición tridimensional en el receptor?',
    questionSmiles: 'CC(C)NC[C@H](O)COc1cccc2ccccc12',
    options: [
      { text: 'Las dos familias adoptan conformaciones torcidas opuestas en el bolsillo de unión al formar enlaces de hidrógeno cruzados.' },
      { text: 'La presencia del átomo de oxígeno etéreo en la cadena altera el orden de prioridades de Cahn-Ingold-Prelog (CIP) alrededor del carbono quiral sin modificar su disposición espacial real.' },
      { text: 'El enantiómero (S) del propranolol sufre una inversión de configuración in vivo mediada por enzimas microsomales hepáticas.' },
      { text: 'El anillo naftilo ejerce un efecto anisotrópico que modifica la hibridación orbital del carbono quiral de sp3 a sp2.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: Se trata de un clásico artificio de la nomenclatura CIP. En las ariletanolaminas (noradrenalina), las prioridades son: 1º -OH, 2º -CH2NH2 (nitrógeno vence a carbono), 3º -Aril, 4º -H. En cambio, en las ariloxipropanolaminas (propranolol), al intercalar el oxígeno, el grupo unido al centro quiral es -CH2-O-Ar; al comparar el carbono de -CH2-O-Ar (unido a oxígeno) con el de -CH2-NH-R (unido a nitrógeno), la prioridad 2 pasa a ser -CH2-O-Ar (Z=8 frente a Z=7 del nitrógeno) y la prioridad 3 pasa a ser -CH2-NH-R. Esto invierte formalmente la letra R a S según CIP, a pesar de que el grupo -OH mantenga exactamente la misma orientación tridimensional en el espacio.\n\n• Distractor a: Falso: ambos ligandos orientan el OH exactamente hacia el mismo residuo aceptor de puentes de hidrógeno.\n• Distractor c: Falso: no existe inversión o epimerización metabólica in vivo; la configuración se mantiene fija.\n• Distractor d: Falso: el centro estereogénico es un carbono sp3 tetraédrico normal en ambas moléculas.',
    difficulty: 'Avanzado'
  },
  {
    id: 't02-m2-q05',
    topicId: 'tema-02',
    block: 'Cardioselectividad Beta-1',
    badge: 'JEV 2 · P5 (Estructura 2D)',
    question: '¿Cuál de las siguientes estructuras representa al atenolol, antagonista cardioselectivo β₁ que posee una función acetamida terminal en la posición para del anillo bencénico?',
    options: [
      { text: 'Propranolol (bloqueante no cardioselectivo muy lipófilo)', smiles: 'CC(C)NCC(O)COc1cccc2ccccc12' },
      { text: 'Carvedilol (bloqueante mixto beta y alfa-1 con carbazol)', smiles: 'COc1ccccc1OCCNCC(O)COc2cccc3[nH]c4ccccc4c23' },
      { text: 'Atenolol (ariloxipropanolamina p-acetamida cardioselectiva β₁)', smiles: 'NC(=O)Cc1ccc(OCC(O)CNC(C)C)cc1' },
      { text: 'Metoprolol (beta-1 selectivo con p-metoxietilo)', smiles: 'COCCc1ccc(OCC(O)CNC(C)C)cc1' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: El atenolol (opción C) es un antagonista β₁ selectivo de segunda generación. Su estructura química se caracteriza por un anillo bencénico para-sustituido con el grupo 2-(4-hidroxifenil)acetamida (-CH2-CO-NH2) conectado a la cadena de ariloxipropanolamina. Esta función amida polar terminal interacciona específicamente con un bolsillo complementario del subtipo β₁ miocárdico y le otorga gran hidrofilia, reduciendo drásticamente su paso al SNC.\n\n• Distractor a: Propranolol: Bloqueante no cardioselectivo muy lipófilo con anillo de 1-naftilo.\n• Distractor b: Carvedilol: Bloqueante mixto beta-no-selectivo y α₁ con núcleo de carbazol y grupo fenoxietilamino.\n• Distractor d: Metoprolol: β₁ selectivo pero portador de un éter alifático en para (-CH2-CH2-OCH3), más lipófilo que el atenolol.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m2-q06',
    topicId: 'tema-02',
    block: 'Síntesis Asimétrica con Epiclorhidrina',
    badge: 'JEV 2 · P6 (Mecanismo SN2)',
    question: 'En la síntesis total de los β-bloqueantes de la familia ariloxipropanolamina (ej. propranolol), ¿cuál es el reactivo electrófilo bifuncional quiral clave empleado para incorporar la unidad oximetileno-propanol y cómo se realiza su apertura nucleófila?',
    questionSmiles: 'CC(C)NCC(O)COc1cccc2ccccc12',
    options: [
      { text: 'El reactivo es el cloruro de oxalilo, que sufre adición electrofílica sobre el anillo aromático activado.' },
      { text: 'El reactivo es el glicerol anhidro, que sufre esterificación catalizada por ácido sulfúrico concentrado.' },
      { text: 'El reactivo es el anhídrido acético, que acetila preferentemente al fenol en condiciones de reflujo.' },
      { text: 'El reactivo es la epiclorhidrina (1-cloro-2,3-epoxipropano); el arilóxido ataca al carbono del epóxido por SN2 rindiendo un éter glicídico que luego es abierto regioselectivamente por la alquilamina primaria.' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: La ruta de síntesis clásica de las ariloxipropanolaminas utiliza epiclorhidrina (1-cloro-2,3-epoxipropano). El 1-naftóxido (desprotonado con base fuerte) actúa como nucleófilo atacando regioselectivamente al carbono terminal del epóxido por mecanismo SN2 (o desplazando el cloruro con posterior cierre de epóxido), generando el aril glicidil éter. En la segunda etapa, la isopropilamina ataca al carbono menos impedido del anillo oxirano del epóxido terminal, provocando su apertura nucleófila para rendir la cadena secundaria de beta-aminoalcohol característica.\n\n• Distractor a: Falso: el cloruro de oxalilo se emplea para introducir grupos dicarbonílicos o formar cloruros de ácido, no cadenas de propanolamina.\n• Distractor b: Falso: el glicerol carece de la función electrófila activada (haloalquilo o epóxido) para la sustitución nucleófila controlada.\n• Distractor c: Falso: el anhídrido acético solo generaría un éster de naftilo (acetato de naftilo), incapaz de ensamblar la cadena del fármaco.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m2-q07',
    topicId: 'tema-02',
    block: 'Contraindicación en Asma Bronquial',
    badge: 'JEV 2 · P7 (Farmacodinamia Bronquial)',
    question: 'Un paciente de 58 años diagnosticado de hipertensión arterial esencial y angina de esfuerzo acude a urgencias por una crisis asmática grave tras iniciar tratamiento antihipertensivo con propranolol. ¿Cuál es el mecanismo fisiopatológico y farmacodinámico de esta reacción adversa potencialmente fatal?',
    questionSmiles: 'CC(C)NCC(O)COc1cccc2ccccc12',
    options: [
      { text: 'El propranolol estimula la síntesis de leucotrienos en los mastocitos alveolares mediante la activación de la 5-lipoxigenasa.' },
      { text: 'El propranolol es un antagonista no selectivo (β₁/β₂); al bloquear los receptores β₂ del músculo liso bronquial, anula la relajación mediada por adrenalina y provoca broncoconstricción refleja descontrolada.' },
      { text: 'El propranolol induce la desgranulación masiva de histamina al unirse directamente a receptores IgE circulantes.' },
      { text: 'El propranolol inhibe la fosfodiesterasa 4 (PDE4) bronquial, reduciendo el monofosfato de adenosina cíclico (AMPc) en las vías aéreas.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: En el músculo liso bronquial predominan los receptores β₂, acoplados a proteína Gs y estimulantes de la adenilato ciclasa; la unión de adrenalina endógena a estos receptores eleva el AMPc y fosforila la cinasa de la cadena ligera de miosina (MLCK), produciendo broncodilatación fisiológica. El propranolol carece de cardioselectividad (antagonista β₁ y β₂ con similar afinidad). Al bloquear competitivamente los receptores β₂ bronquiales, deja sin oposición el tono colinérgico constrictor y los mediadores inflamatorios, desencadenando un broncoespasmo severo en pacientes asmáticos.\n\n• Distractor a: Falso: el propranolol no interactúa con la 5-lipoxigenasa ni incrementa la ruta de leucotrienos.\n• Distractor c: Falso: no se trata de una reacción anafiláctica tipo I mediada por IgE, sino de un efecto farmacodinámico directo sobre el receptor β₂.\n• Distractor d: Falso: los inhibidores de PDE4 (como roflumilast) aumentan el AMPc y son broncodilatadores/antiinflamatorios, lo opuesto a un bloqueante beta.',
    difficulty: 'Fácil'
  },
  {
    id: 't02-m2-q08',
    topicId: 'tema-02',
    block: 'Antagonistas Alfa Irreversibles',
    badge: 'JEV 2 · P8 (Estructura 2D)',
    question: '¿Qué estructura corresponde a la fenoxibenzamina, antagonista alfa-adrenérgico irreversible que forma espontáneamente un ion aziridinio cíclico altamente electrófilo que alquila al receptor?',
    options: [
      { text: 'Fenoxibenzamina (β-haloetilamina alquilante irreversible)', smiles: 'c1ccccc1CN(CCCl)C(C)COc2ccccc2' },
      { text: 'Prazosina (quinazolina antagonista selectivo α₁)', smiles: 'COc1cc2nc(nc(N)c2cc1OC)N3CCN(CC3)C(=O)c4ccco4' },
      { text: 'Fentolamina (antagonista alfa competitivo reversible derivado de imidazolina)', smiles: 'Cc1ccc(N(CC2=NCCN2)c2cccc(O)c2)cc1' },
      { text: 'Tolazolina (antagonista alfa simple)', smiles: 'c1ccc(CC2=NCCN2)cc1' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: La fenoxibenzamina (opción A) pertenece a la clase de las β-haloetilaminas (mostazas nitrogenadas). Está constituida por un grupo bencilamina secundario sustituido con una cadena 2-cloroetilo (-CH2-CH2-Cl) y un grupo 1-metil-2-fenoxietilo (-CH(CH3)-CH2-O-Ph). A pH fisiológico, el nitrógeno terciario ataca intramolecularmente al carbono beta con salida del cloruro por sustitución nucleófila interna, generando un catión aziridinio cíclico de tres miembros de gran reactividad que alquila covalentemente un resto nucleófilo en el receptor alfa.\n\n• Distractor b: Prazosina: Es una quinazolina sustituida con piperazina y furoilo, antagonista competitivo selectivo α₁.\n• Distractor c: Fentolamina: Antagonista alfa competitivo reversible derivado de imidazolina.\n• Distractor d: Tolazolina: Agonista/antagonista alfa simple competitivo con heterociclo de 2-imidazolina.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m2-q09',
    topicId: 'tema-02',
    block: 'Antagonistas Selectivos Alfa-1',
    badge: 'JEV 2 · P9 (Estructura 2D)',
    question: 'Observe las siguientes estructuras. ¿Cuál corresponde a la prazosina, antagonista selectivo α₁ postsináptico constituido por un núcleo heterocíclico de quinazolina fusionado a un anillo de piperazina acilada con 2-furoilo?',
    options: [
      { text: 'Fentolamina (antagonista no selectivo α₁/α₂)', smiles: 'Cc1ccc(N(CC2=NCCN2)c2cccc(O)c2)cc1' },
      { text: 'Clonidina (derivado 2,6-dicloroanilino-imidazolínico)', smiles: 'Clc1cccc(Cl)c1NC2=NCCN2' },
      { text: 'Fenoxibenzamina (β-haloetilamina alquilante)', smiles: 'c1ccccc1CN(CCCl)C(C)COc2ccccc2' },
      { text: 'Prazosina (4-amino-6,7-dimetoxiquinazolina α₁ selectiva)', smiles: 'COc1cc2nc(nc(N)c2cc1OC)N3CCN(CC3)C(=O)c4ccco4' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: La prazosina (opción D) es el prototipo de los antagonistas α₁ postsinápticos de núcleo quinazolínico. Su estructura molecular comprende: 1) un heterociclo bicíclico de 4-amino-6,7-dimetoxiquinazolina, 2) un puente intermedio de piperazina, y 3) una función carbonilo acilada con un anillo de furano (2-furoilo). Al bloquear selectivamente los receptores α₁ vasculares sin antagonizar los autorreceptores α₂ presinápticos, causa vasodilatación arteriolar sin provocar la taquicardia refleja masiva característica de los bloqueantes no selectivos.\n\n• Distractor a: Fentolamina: Antagonista no selectivo α₁/α₂ con núcleo de fenol e imidazolina.\n• Distractor b: Clonidina: Derivado 2,6-dicloroanilino-imidazolínico, agonista α₂.\n• Distractor c: Fenoxibenzamina: β-haloetilamina bloqueante irreversible no selectiva.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m2-q10',
    topicId: 'tema-02',
    block: 'Taquicardia Refleja & Autorreceptores',
    badge: 'JEV 2 · P10 (Fentolamina vs Prazosina)',
    question: 'La fentolamina es un antagonista competitivo de receptores adrenérgicos alfa no selectivo (bloquea tanto α₁ como α₂). ¿Por qué produce una intensa taquicardia refleja indeseable en clínica en comparación con antagonistas selectivos como la prazosina?',
    questionSmiles: 'Cc1ccc(N(CC2=NCCN2)c3cccc(O)c3)cc1',
    options: [
      { text: 'Porque estimula directamente los receptores β₁ del nodo sinusal provocando descargas adrenérgicas ectópicas.' },
      { text: 'Porque inhibe la acetilcolinesterasa en las terminaciones vagales cardíacas aboliendo el control parasimpático.' },
      { text: 'Porque al bloquear simultáneamente los autorreceptores α₂ presinápticos elimina el freno fisiológico de retroalimentación negativa, disparando una liberación descontrolada de noradrenalina que sobreestimula los receptores β₁ cardíacos.' },
      { text: 'Porque activa covalentemente los canales de calcio tipo L miocárdicos provocando entrada sostenida de calcio.' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: El bloqueo de receptores α₁ por la fentolamina induce vasodilatación periférica y caída tensional, activando el reflejo barorreceptor simpático. Sin embargo, dado que la fentolamina bloquea también los autorreceptores α₂ presinápticos en las terminaciones nerviosas cardíacas, anula el freno fisiológico que detiene la exocitosis de noradrenalina. Esta liberación exacerbada de noradrenalina impacta de lleno sobre los receptores β₁ del miocardio (que no están bloqueados), provocando una taquicardia severa. En contraste, los antagonistas α₁ selectivos (prazosina) dejan intactos los receptores α₂ presinápticos, amortiguando la liberación del neurotransmisor.\n\n• Distractor a: Falso: la fentolamina no tiene acción agonista intrínseca sobre receptores β₁ miocárdicos.\n• Distractor b: Falso: no interacciona con la acetilcolinesterasa ni altera la degradación de acetilcolina.\n• Distractor d: Falso: no actúa como modulador alostérico ni abridor de canales de calcio voltaje-dependientes.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m2-q11',
    topicId: 'tema-02',
    block: 'Bioisosterismo & Clonidina',
    badge: 'JEV 2 · P11 (Deslocalización Electrónica)',
    question: 'La clonidina es un antihipertensivo de acción central agonista α₂ presináptico. En su diseño estructural, el puente metileno de la nafazolina se sustituyó por un grupo amino (-NH-). ¿Qué trascendencia electrónica y conformacional tuvo esta modificación bioisóstera?',
    questionSmiles: 'Clc1cccc(Cl)c1NC2=NCCN2',
    options: [
      { text: 'Transformó la molécula en un electrófilo que alquila covalentemente el canal de sodio epitelial (ENaC).' },
      { text: 'Permitió la deslocalización por resonancia del par solitario del nitrógeno puente con el sistema amidinio de la imidazolina, reduciendo su basicidad (pKa ≈ 8.0) y favoreciendo la fracción neutra difusible a través de la BHE.' },
      { text: 'Aumentó el pKa a 13.5, provocando su ionización permanente y confinándola exclusivamente en el espacio vascular.' },
      { text: 'Indujo una hidrólisis espontánea del anillo de imidazolina rindiendo una urea inactiva a temperatura ambiente.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: En la nafazolina, el puente -CH2- aísla electrónicamente el heterociclo, que exhibe un pKa fuertemente básico (≈ 10-11) y se encuentra 99.9% ionizado a pH fisiológico. Al introducir el nitrógeno puente en la clonidina (-NH-), su par de electrones no compartido entra en conjugación con el doble enlace C=N del heterociclo de 2-imidazolina (tautomería amino/imino). Esta deslocalización electrónica reduce el pKa de la clonidina hasta aproximadamente 8.0-8.2. A pH sanguíneo (7.4), aproximadamente un 15-20% de la molécula se encuentra en su forma neutra no ionizada, permitiendo que atraviese con facilidad la barrera hematoencefálica y actúe en el centro vasomotor cerebral.\n\n• Distractor a: Falso: la clonidina es un ligando reversible no alquilante y no interactúa con los canales ENaC renales.\n• Distractor c: Falso: la modificación disminuye el pKa (de 10.5 a 8.0), permitiendo la presencia de forma no ionizada difusible al SNC.\n• Distractor d: Falso: la clonidina es químicamente muy estable frente a la hidrólisis acuosa en condiciones fisiológicas.',
    difficulty: 'Avanzado'
  },
  {
    id: 't02-m2-q12',
    topicId: 'tema-02',
    block: 'Dopamina Beta-Hidroxilasa & Quelación',
    badge: 'JEV 2 · P12 (Cofactor Cobre)',
    question: 'La dopamina β-hidroxilasa (DBH) es una metaloenzima dependiente de ascorbato y oxígeno molecular que cataliza la hidroxilación estereoselectiva de dopamina a noradrenalina. ¿Qué catión metálico cofactor esencial coordina su centro activo y qué fármaco es capaz de inhibirla mediante quelación directa de este cofactor?',
    questionSmiles: 'CCN(CC)C(=S)SSC(=S)N(CC)CC',
    options: [
      { text: 'Ion Fe²⁺ hémico; inhibido selectivamente por el monóxido de carbono (CO).' },
      { text: 'Ion Mg²⁺ coordinado por aspartato; inhibido irreversiblemente por EDTA intravenoso.' },
      { text: 'Ion Zn²⁺ catalítico tetrahédrico; inhibido por sulfametoxazol.' },
      { text: 'Iones de cobre (Cu²⁺/Cu⁺); inhibida por el disulfiram (tras reducción a dietilditiocarbamato) y derivados de picolinato.' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: La dopamina β-hidroxilasa contiene átomos de cobre esenciales (Cu²⁺/Cu⁺) en su centro catalítico que intervienen en la transferencia monoelectrónica y la activación del O2 molecular para hidroxilar el carbono bencílico de la dopamina. El disulfiram (utilizado en el tratamiento del alcoholismo) se reduce in vivo a dietilditiocarbamato, un potente ligando quelante bidentado con dos átomos de azufre que acompleja y secuestra los cationes de cobre de la DBH, bloqueando la conversión de dopamina en noradrenalina.\n\n• Distractor a: Falso: la DBH no contiene grupo hemo con hierro (las oxigenasas hémicas son del citocromo P450).\n• Distractor b: Falso: el magnesio no interviene en la hidroxilación de la DBH (participa en COMT).\n• Distractor c: Falso: el zinc es el cofactor de la anhidrasa carbónica y metaloproteasas, pero no de la dopamina β-hidroxilasa.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m2-q13',
    topicId: 'tema-02',
    block: 'Marcadores Urinarios & VMA',
    badge: 'JEV 2 · P13 (Diagnóstico Feocromocitoma)',
    question: 'En el diagnóstico clínico del feocromocitoma (tumor secretor de catecolaminas), la cuantificación del ácido vanililmandélico (VMA) en orina de 24 horas es una prueba diagnóstica esencial. ¿Cuál es el orden secuencial de acción de las dos enzimas metabólicas principales responsables de la formación de VMA a partir de la noradrenalina?',
    questionSmiles: 'NC[C@H](O)c1ccc(O)c(O)c1',
    options: [
      { text: 'La noradrenalina es desaminada primero por la MAO a un aldehído que se oxida a ácido mandélico, el cual sufre O-metilación regioselectiva por la COMT para rendir ácido vanililmandélico (VMA).' },
      { text: 'La noradrenalina es carboxilada en el fenol por la biotina carboxilasa y luego sulfatada por una sulfotransferasa citoplasmática.' },
      { text: 'La noradrenalina es degradada exclusivamente por la dopamina β-hidroxilasa en sentido inverso hacia L-DOPA urinaria.' },
      { text: 'La noradrenalina sufre glucuronidación directa del OH bencílico sin alteración del catecol ni del grupo amino.' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: El catabolismo global de la noradrenalina hacia ácido vanililmandélico (VMA o ácido 4-hidroxi-3-metoximandélico) requiere la intervención combinada de la MAO y la COMT. La MAO cataliza la desaminación oxidativa de la cadena feniletanolamina rindiendo el 3,4-dihidroxifenilglicolaldehído, que es oxidado por la aldehído deshidrogenasa a ácido 3,4-dihidroximandélico (DOMA). Posteriormente, la COMT metila regioselectivamente el 3-OH meta del catecol rindiendo el VMA, el producto final excretado mayoritariamente en la orina.\n\n• Distractor b: Falso: las catecolaminas no sufren carboxilaciones dependientes de biotina en su catabolismo.\n• Distractor c: Falso: la reacción de la DBH es termodinámicamente irreversible in vivo; no opera en sentido retrógrado.\n• Distractor d: Falso: la glucuronidación es una ruta menor de fase II; el metabolito excretado cuantitativo es el VMA.',
    difficulty: 'Fácil'
  },
  {
    id: 't02-m2-q14',
    topicId: 'tema-02',
    block: 'Antagonistas Selectivos Alfa-2',
    badge: 'JEV 2 · P14 (Yohimbina)',
    question: 'La yohimbina es un alcaloide pentacíclico obtenido de Pausinystalia johimbe. ¿Cuál es su perfil farmacológico principal sobre los receptores adrenérgicos y qué consecuencia fisiológica periférica y central produce su administración?',
    questionSmiles: 'COC(=O)[C@H]1[C@@H](O)CC[C@@H]2CN3CCc4c([nH]c5ccccc45)[C@@H]3C[C@@H]12',
    options: [
      { text: 'Es un agonista irreversible β₃ que activa selectivamente la lipólisis en el tejido adiposo marrón sin alterar la tensión arterial.' },
      { text: 'Es un antagonista selectivo de los receptores α₂ adrenérgicos; al bloquear los autorreceptores presinápticos, incrementa la liberación de noradrenalina provocando aumento del tono simpático, hipertensión y erección peneana.' },
      { text: 'Es un agonista inverso de receptores muscarínicos M2 que reduce el gasto cardíaco y provoca bradicardia sinusal intensa.' },
      { text: 'Es un inhibidor selectivo de la recaptación de dopamina (DAT) sin afinidad por receptores adrenérgicos ni serotoninérgicos.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: La yohimbina es el antagonista selectivo α₂ adrenérgico de referencia experimental. Al antagonizar los autorreceptores α₂ presinápticos tanto a nivel del SNC como en las terminaciones nerviosas periféricas, bloquea el mecanismo de freno por retroalimentación negativa, desencadenando una descarga masiva de noradrenalina hacia la hendidura sináptica. Esto se traduce en elevación de la presión arterial, taquicardia, estimulación psicomotora central y vasodilatación en los cuerpos cavernosos.\n\n• Distractor a: Falso: la yohimbina no es un agonista β₃; es un antagonista selectivo α₂.\n• Distractor c: Falso: la yohimbina no es un bloqueante muscarínico; incrementa el tono simpático, provocando taquicardia, no bradicardia.\n• Distractor d: Falso: su diana farmacológica primaria son los receptores α₂ adrenérgicos, no el transportador DAT.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m2-q15',
    topicId: 'tema-02',
    block: 'Beta-Bloqueantes Mixtos de 3ª Generación',
    badge: 'JEV 2 · P15 (Carvedilol & Labetalol)',
    question: 'Fármacos como el carvedilol y el labetalol se clasifican como β-bloqueantes de tercera generación dotados de actividad vasodilatadora adicional. ¿Qué singularidad molecular les confiere esta doble acción farmacodinámica (antagonismo beta + vasodilatación)?',
    questionSmiles: 'COc1ccccc1OCCNCC(O)COc2cccc3[nH]c4ccccc4c23',
    options: [
      { text: 'Liberan monóxido de carbono gaseoso tras ser metabolizados por el citocromo CYP2D6 en las células endoteliales.' },
      { text: 'Bloquean simultáneamente los receptores de angiotensina II (AT1) mediante su núcleo indol.' },
      { text: 'Combinan en su estructura química motivos capaces de unirse tanto a receptores beta como a receptores α₁ adrenérgicos vasculares, logrando una reducción de la resistencia vascular periférica sin taquicardia refleja.' },
      { text: 'Polimerizan covalentemente en la membrana plasmática del miocito cardíaco sellando los canales de potasio.' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: Tanto el carvedilol como el labetalol son β-bloqueantes no cardioselectivos que incorporan modificaciones farmacofóricas adicionales. El carvedilol contiene una unidad de carbazol unida a una cadena de ariloxipropanolamina que porta un grupo 2-(2-metoxifenoxi)etilamino voluminoso; este fragmento le confiere afinidad antagonista sobre los receptores α₁ vasculares, además de propiedades antioxidantes intrínsecas. El labetalol (mezcla de 4 diastereoisómeros) presenta en uno de ellos ((R,R)-dilevalol) potente antagonismo β₁/β₂, mientras que el isómero (S,R) es un antagonista selectivo α₁. El bloqueo α₁ concomitante produce vasodilatación arteriolar, reduciendo la poscarga sin taquicardia refleja.\n\n• Distractor a: Falso: no liberan monóxido de carbono; no tienen grupos carbonilo lábiles ni quelatos metálicos.\n• Distractor b: Falso: no tienen afinidad relevante por receptores AT1 (los antagonistas AT1 son los "sartanes" con núcleo bifenil-tetrazol).\n• Distractor d: Falso: la unión es no covalente y reversible; no polimerizan en membranas biológicas.',
    difficulty: 'Medio'
  }
];

// ==========================================================================
// MODELO 3: Farmacóforo β₂, Síntesis Orgánica, Bioisosterismo y Eudismia
// 15 Preguntas · Clave: A, B, C, B, A, D, C, A, B, D, A, C, B, D, A
// ==========================================================================
export const TEMA2_MODELO_3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 't02-m3-q01',
    topicId: 'tema-02',
    block: 'Escalera del Nitrógeno & Selectividad β₂',
    badge: 'Claude Code · P1 (REA Nitrógeno)',
    question: 'El volumen del sustituyente sobre el nitrógeno amínico gobierna el tránsito de la actividad α a la β y, en su extremo, la discriminación β₂ frente a β₁. ¿Cuál de las siguientes catecolaminas o análogos presenta el sustituyente que confiere selectividad β₂ junto con resistencia a la desaminación por MAO?',
    questionSmiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
    options: [
      { text: 'Salbutamol: el grupo terc-butilo sobre el nitrógeno fija la selectividad β₂ y bloquea el acceso de la MAO al enlace C-N por impedimento estérico.' },
      { text: 'Noradrenalina: el nitrógeno primario desprovisto de sustitución alquílica determina selectividad β₂ óptima y prolongada semivida.' },
      { text: 'Adrenalina: el grupo N-metilo confiere discriminación selectiva por β₂ impidiendo completamente el catabolismo por la COMT.' },
      { text: 'Isoprenalina: el grupo N-isopropilo proporciona selectividad β₂ pura y resistencia metabólica frente a la desaminación por MAO.' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: El grupo terc-butilo (-C(CH3)3) sobre el nitrógeno del salbutamol cumple dos funciones cruciales: 1) Proporciona un volumen estérico óptimo que complementa la cavidad hidrofóbica adyacente del receptor β₂ adrenérgico, confiriendo selectividad β₂ frente a β₁ y anulando la afinidad por receptores alfa; 2) Ejerce un impedimento estérico formidable sobre el enlace carbono-nitrógeno que bloquea la abstracción de hidruro por el cofactor FAD de la monoamino oxidasa (MAO), confiriéndole completa estabilidad frente a la desaminación oxidativa.\n\n• Distractor b: Noradrenalina: Su amina primaria (-NH2) le otorga preferencia por receptores alfa sobre beta y es sustrato rápido de la MAO.\n• Distractor c: Adrenalina: El grupo N-metilo no impide el metabolismo por la COMT ni proporciona selectividad β₂ frente a β₁.\n• Distractor d: Isoprenalina: El N-isopropilo confiere afinidad beta pero no discrimina entre β₁ y β₂ (activa ambos por igual, provocando taquicardia).',
    difficulty: 'Fácil'
  },
  {
    id: 't02-m3-q02',
    topicId: 'tema-02',
    block: 'Resistencia a COMT: Saligenina',
    badge: 'Claude Code · P2 (Alcohol Saligenínico)',
    question: 'El salbutamol presenta una semivida plasmática marcadamente superior a la de la isoprenalina gracias a una modificación en el anillo aromático. ¿Qué grupo funcional sustituye al hidroxilo fenólico en posición 3 del catecol y cuál es la razón por la que no es metabolizado por la catecol-O-metiltransferasa (COMT)?',
    questionSmiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
    options: [
      { text: 'Un grupo metoxilo (-OCH3), que actúa como aceptor de enlace de hidrógeno pero no es transferible por la S-adenosilmetionina.' },
      { text: 'Un grupo hidroximetilo (-CH2OH, alcohol saligenínico), que separa el oxígeno del anillo aromático mediante un carbono sp3 impidiendo la quelación coplanar del Mg²⁺ en la COMT.' },
      { text: 'Un grupo ácido carboxílico (-COOH), cuya carga negativa a pH fisiológico repele electrostáticamente a la COMT.' },
      { text: 'Un grupo cloro electroatractor, que reduce la densidad electrónica del anillo fenólico inactivándolo frente a metiltransferasas.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: El salbutamol incorpora un grupo 3-hidroximetilo (-CH2OH, alcohol saligenínico) en lugar del 3-hidroxilo fenólico del catecol natural. La inserción del puente metileno (-CH2-) rompe la coplanaridad del sistema catecólico aromático e impide la coordinación bidentada plana con el catión Mg²⁺ en el sitio activo de la COMT. Como resultado, la enzima no puede transferir el grupo metilo de la SAM, confiriéndole una duración de acción de 4-6 horas frente a los pocos minutos de la isoprenalina.\n\n• Distractor a: Falso: un grupo metoxilo (-OCH3) generaría un metabolito inactivo análogo a la metanefrina con drástica pérdida de afinidad beta.\n• Distractor c: Falso: no se introduce un ácido carboxílico (su carga negativa anularía la complementariedad con el bolsillo aromático TM5).\n• Distractor d: Falso: el cloro es el sustituyente del dicloroisoproterenol (DCI), no del salbutamol.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q03',
    topicId: 'tema-02',
    block: 'Easson-Stedman & Eutómero R',
    badge: 'Claude Code · P3 (Ajuste en 3 Puntos)',
    question: 'El modelo de ajuste en tres puntos de Easson-Stedman describe la complementariedad entre los agonistas adrenérgicos y el receptor. ¿Qué configuración absoluta en el carbono bencílico carbinólico (C1) exhibe mayor potencia farmacológica (eutómero) y qué grupo farmacofórico se sitúa en la orientación requerida?',
    questionSmiles: 'NC[C@H](O)c1ccc(O)c(O)c1',
    options: [
      { text: 'Configuración (S), orientando el grupo -OH bencílico hacia la cavidad hidrofóbica del receptor.' },
      { text: 'Configuración (S), porque la numeración CIP asigna la máxima prioridad al anillo de catecol.' },
      { text: 'Configuración (R), orientando el grupo -OH bencílico hacia un enlace de hidrógeno complementario con residuos del receptor.' },
      { text: 'No existe eudismia en el carbono bencílico porque la interacción agonista depende exclusivamente del grupo amonio.' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: El eutómero de todas las feniletanolaminas adrenérgicas agonistas (noradrenalina, adrenalina, salbutamol) posee configuración absoluta (R) en el carbono bencílico carbinólico. En esta conformación espacial, los tres grupos farmacofóricos clave se orientan de forma complementaria: 1) el anillo aromático/catecol hacia las hélices TM5/TM6, 2) la amina protonada hacia el Asp113 en TM3, y 3) el grupo -OH bencílico hacia un residuo aceptor de puentes de hidrógeno (Asn293/Ser). En el distómero (S), el -OH apunta en dirección opuesta hacia el solvente, provocando una caída de potencia de 10 a 100 veces.\n\n• Distractor a: Falso: el enantiómero (S) es el distómero menos activo; el OH no se proyecta a zonas hidrofóbicas.\n• Distractor b: Falso: en las feniletanolaminas la prioridad CIP 1 es el -OH (Z=8) y la configuración del eutómero es (R).\n• Distractor d: Falso: la eudismia es muy acusada; el OH bencílico aporta una contribución entálpica crítica a la afinidad.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q04',
    topicId: 'tema-02',
    block: 'Síntesis de Guanetidina: Beckmann',
    badge: 'Claude Code · P4 (Expansión de Anillo)',
    question: 'La guanetidina es un antihipertensivo que bloquea la transmisión adrenérgica presináptica. En su ruta sintética, la cicloheptanona oxima se somete a una transposición de Beckmann con ácido sulfúrico. ¿Qué producto cíclico se genera en este paso y qué reactivo se emplea a continuación para reducirlo a la amina secundaria precursora?',
    questionSmiles: 'NC(=N)NCCN1CCCCCCC1',
    options: [
      { text: 'Una amida abierta lineal que se cicla con NaH para formar un anillo de piperidina sustituido.' },
      { text: 'Una lactama cíclica de ocho miembros (octahidroazocina-2-ona), que se reduce con LiAlH4 rindiendo la amina secundaria perhidroazocina.' },
      { text: 'Un nitrilo aromático que se hidrogena directamente con níquel Raney a amina primaria.' },
      { text: 'Un derivado de pirrolidina que sufre contracción de anillo catalizada por triflato de trimetilsililo.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: La transposición de Beckmann de la cicloheptanona oxima (anillo de 7 carbonos) con ácido sulfúrico concentrado expande el anillo generando una lactama de 8 miembros: octahidroazocina-2-ona (2-azaciclooctanona). A continuación, el grupo carbonilo lactámico se reduce cuantitativamente con hidruro de litio y aluminio (LiAlH4) para rendir la amina secundaria cíclica perhidroazocina (octametilenimina). Esta se alquila con cloroacetonitrilo o bromoetilamina y finalmente se guanila para producir la guanetidina.\n\n• Distractor a: Falso: la transposición de Beckmann de oximas cíclicas produce lactamas (amidas cíclicas), no amidas lineales abiertas.\n• Distractor c: Falso: no se generan nitrilos aromáticos; los reactivos de partida son cicloalcanos saturados.\n• Distractor d: Falso: la reacción es una expansión de anillo de 7 a 8 miembros, no una contracción a pirrolidina.',
    difficulty: 'Avanzado'
  },
  {
    id: 't02-m3-q05',
    topicId: 'tema-02',
    block: 'Bioisosterismo en Ultra-LABAs',
    badge: 'Claude Code · P5 (Indacaterol)',
    question: 'Los agonistas β₂ de acción ultralarga (ultra-LABAs) como el indacaterol han incorporado bioisósteros no clásicos del catecol para prolongar su efecto terapéutico. ¿Qué núcleo heterocíclico condensado reemplaza al anillo de catecol en el indacaterol y qué ventajas confiere frente al salbutamol?',
    questionSmiles: 'CC(C)NCC(O)c1ccc2[nH]c(=O)ccc2c1',
    options: [
      { text: 'Un núcleo heterocíclico de quinolin-2(1H)-ona condensado, que aporta rigidez conformacional, enlaces de hidrógeno estables y resistencia completa frente a la COMT.' },
      { text: 'Un núcleo de indol-3-carboxamida que se fosforila in vivo por proteincinasas endoteliales.' },
      { text: 'Un sustituyente sulfonamidoaromático idéntico al del sotalol que bloquea la captación neuronal NET.' },
      { text: 'Un anillo de benzodioxano idéntico al del doxazosina que confiere antagonismo selectivo alfa-1 concomitante.' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: En el indacaterol, el anillo catecólico se reemplaza por un sistema bicíclico bioisóstero no clásico de 8-hidroxiquinolin-2(1H)-ona (carbostirilo). La función NH lactámica y el grupo 8-OH mimetizan con gran fidelidad la red de enlaces de hidrógeno de los dos oxígenos catecólicos con los residuos de serina de TM5, mientras que el núcleo condensado rígido resiste por completo la O-metilación por la COMT. Combinado con un sustituyente aminoindánico voluminoso lipófilo, proporciona una semivida que permite una única administración diaria (posología once-daily de 24 horas).\n\n• Distractor b: Falso: no es un indol-3-carboxamida ni sufre fosforilación in vivo.\n• Distractor c: Falso: el sotalol posee un grupo metanosulfonamida y es un beta-bloqueante antiarrítmico de clase III, no un ultra-LABA.\n• Distractor d: Falso: el benzodioxano de la doxazosina confiere antagonismo α₁ vasodilatador, no agonismo β₂ broncodilatador.',
    difficulty: 'Avanzado'
  },
  {
    id: 't02-m3-q06',
    topicId: 'tema-02',
    block: 'Antagonismo Covalente: Aziridinio',
    badge: 'Claude Code · P6 (Fenoxibenzamina)',
    question: 'La fenoxibenzamina es un antagonista adrenérgico alfa irreversible. Su mecanismo de acción implica la formación espontánea de un intermedio reactivo a pH fisiológico. ¿Cuál es la estructura y naturaleza de este intermedio y cómo reacciona con el receptor adrenérgico?',
    questionSmiles: 'c1ccccc1CN(CCCl)C(C)COc2ccccc2',
    options: [
      { text: 'Un carbocatión bencílico estabilizado por resonancia que alquila residuos de tirosina.' },
      { text: 'Un radical libre nitrogenado que cataliza la peroxidación de lípidos de membrana en la sinapsis.' },
      { text: 'Un complejo de coordinación con ion calcio que precipita en el poro del receptor.' },
      { text: 'Un ión aziridinio cíclico de tres miembros, altamente electrófilo por tensión angular, que sufre ataque nucleófilo por restos sulfhidrilo o carboxilato del receptor formando un enlace covalente irreversible.' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: La fenoxibenzamina es una β-haloetilamina terciaria. En medio acuoso y a pH fisiológico (7.4), el par solitario del nitrógeno ataca intramolecularmente al carbono beta con desplazamiento del cloruro como grupo saliente (mecanismo de sustitución nucleófila interna tipo mostaza nitrogenada). Esto genera un catión aziridinio cíclico de tres miembros. La acusada tensión angular del anillo oxirano/aziridínico lo convierte en una especie electrofílica potente que es atacada por nucleófilos del receptor adrenérgico (grupos tiolato de cisteína o carboxilato de aspartato/glutamato), produciendo una alquilación covalente irreversible que exige la síntesis de nuevos receptores para restablecer la función.\n\n• Distractor a: Falso: no se genera un carbocatión libre; la reacción procede vía ion aziridinio cíclico.\n• Distractor b: Falso: el mecanismo es puramente iónico/electrofílico heterolítico, no radicalario.\n• Distractor c: Falso: la fenoxibenzamina no coordina iones calcio ni actúa por precipitación.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q07',
    topicId: 'tema-02',
    block: 'Síntesis de Propranolol: Epiclorhidrina',
    badge: 'Claude Code · P7 (Éter Glicídico)',
    question: 'En la síntesis clásica del propranolol (ariloxipropanolamina), el 1-naftol se hace reaccionar con epiclorhidrina en medio básico. ¿Cuál es el producto intermedio resultante de este paso y con qué amina debe tratarse para completar el fármaco?',
    questionSmiles: 'CC(C)NCC(O)COc1cccc2ccccc12',
    options: [
      { text: '1-cloro-3-(naftalen-1-iloxi)propan-2-ona, tratada con terc-butilamina en medio anhidro.' },
      { text: 'Ácido naftoxiacético activado con DCC, tratado con isopropilamina para rendir una amida.' },
      { text: '1-(naftalen-1-iloxi)-2,3-epoxipropano (un éter glicídico), que se hace reaccionar con isopropilamina para abrir regioselectivamente el anillo oxirano por el carbono menos impedido.' },
      { text: 'Naftil éster del ácido acrílico, tratado con isopropilamina por adición de Michael conjugada.' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: En la primera etapa, el 1-naftolato desplaza el átomo de cloro de la epiclorhidrina (o ataca al epóxido con cierre posterior) en presencia de NaOH rindiendo el 1-(naftalen-1-iloxi)-2,3-epoxipropano (glicidil 1-naftil éter). En la segunda etapa, la isopropilamina actúa como nucleófilo atacando regioselectivamente al carbono terminal (C3, menos impedido estéricamente) del anillo de oxirano por mecanismo SN2. La apertura del epóxido genera el alcohol secundario en C2 portador de la cadena propanolamina característica del propranolol.\n\n• Distractor a: Falso: la reacción no oxida el carbono a cetona; genera un epóxido (éter glicídico) y la amina empleada es isopropilamina, no terc-butilamina.\n• Distractor b: Falso: no se genera una amida ni se emplea acoplamiento peptídico con DCC.\n• Distractor d: Falso: no intervienen ésteres acrílicos ni adiciones conjugadas de Michael.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q08',
    topicId: 'tema-02',
    block: 'Bioactivación de Alfa-Metildopa',
    badge: 'Claude Code · P8 (Falso Neurotransmisor)',
    question: 'La α-metildopa es un profármaco antihipertensivo de acción central. Para ejercer su efecto terapéutico, debe penetrar en el SNC y sufrir una transformación biosintética. ¿Qué secuencia enzimática conduce al principio activo real y cuál es este metabolito?',
    questionSmiles: 'CC(N)(Cc1ccc(O)c(O)c1)C(=O)O',
    options: [
      { text: 'Descarboxilación por la L-aminoácido aromático descarboxilasa (AADC) seguida de β-hidroxilación estereoespecífica por la dopamina β-hidroxilasa (DBH), rindiendo (1R,2S)-α-metilnoradrenalina.' },
      { text: 'O-metilación masiva por COMT en el citoplasma neuronal seguida de hidrólisis ácida lisosomal.' },
      { text: 'N-acetilación microsomal hepática que rinde un metabolito liposoluble agonista periférico beta-2.' },
      { text: 'Desaminación oxidativa por MAO-A rindiendo un ácido carboxílico central antagonista alfa-1.' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: La α-metildopa es transportada al interior del cerebro por el transportador de aminoácidos neutros LAT1. Dentro de las neuronas noradrenérgicas centrales, experimenta una secuencia de dos pasos biosintéticos análogos a la vía fisiológica: 1) Descarboxilación por la AADC convirtiéndose en α-metildopamina, y 2) β-hidroxilación estereoselectiva por la dopamina β-hidroxilasa (DBH), rindiendo (1R,2S)-α-metilnoradrenalina. Este metabolito activo se almacena en vesículas y actúa como falso neurotransmisor agonista potente sobre autorreceptores α₂ presinápticos en el núcleo del tracto solitario, disminuyendo la eferencia simpática.\n\n• Distractor b: Falso: la O-metilación por COMT inactivaría el profármaco; la activación requiere descarboxilación e hidroxilación.\n• Distractor c: Falso: la N-acetilación es una reacción de detoxificación hepática que destruye la actividad adrenérgica.\n• Distractor d: Falso: la presencia del grupo α-metilo protege a la molécula de la degradación por MAO.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q09',
    topicId: 'tema-02',
    block: 'Conformación & pKa de Clonidina',
    badge: 'Claude Code · P9 (Conformación Ortogonal)',
    question: 'La clonidina actúa como agonista α₂ adrenérgico central reduciendo el tono simpático. ¿Qué características estructurales explican su selectividad α₂ y su capacidad para cruzar la barrera hematoencefálica a pesar de contener una función guanidina?',
    questionSmiles: 'Clc1cccc(Cl)c1NC2=NCCN2',
    options: [
      { text: 'La ausencia de sustituyentes en el fenilo, que permite una libre rotación conformacional de 360 grados.' },
      { text: 'Los dos átomos de cloro orto (2,6-dicloro) imponen una conformación perpendicular entre el fenilo y la imidazolina, y la deslocalización del nitrógeno puente rebaja el pKa a ≈ 8.0, permitiendo una fracción no ionizada que cruza la BHE.' },
      { text: 'La presencia de un grupo sulfonamida que acidifica la molécula haciéndola impermeable a la membrana celular.' },
      { text: 'Un nitrógeno cuaternario permamentemente catiónico que penetra al cerebro vía transportador de colina CTL1.' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: La clonidina posee dos rasgos estructurales determinantes: 1) Los dos átomos de cloro en posiciones 2 y 6 del anillo bencénico generan un fuerte impedimento estérico que obliga al anillo aromático a situarse perpendicular (ortogonal, ≈ 90°) respecto al heterociclo de imidazolina, conformación que favorece el reconocimiento selectivo por los receptores α₂; 2) El nitrógeno puente (-NH-) deslocaliza su par electrónico en el sistema amidino de la imidazolina por resonancia guanidínica; esto reduce su pKa de ≈ 10-11 (valor habitual de imidazolinas como nafazolina) a ≈ 8.05. A pH fisiológico sanguíneo (7.4), un 18% de las moléculas se encuentra en forma neutra no ionizada, facilitando el cruce de la BHE.\n\n• Distractor a: Falso: los dos cloros orto restringen severamente la rotación, fijando la conformación perpendicular activa.\n• Distractor c: Falso: la clonidina carece de grupos sulfonamida en su estructura.\n• Distractor d: Falso: no contiene nitrógenos cuaternarios; es una amina secundaria conectada a imidazolina.',
    difficulty: 'Avanzado'
  },
  {
    id: 't02-m3-q10',
    topicId: 'tema-02',
    block: 'Síntesis de Feniletanolaminas',
    badge: 'Claude Code · P10 (Ruta Alfa-Bromocetona)',
    question: 'Una de las estrategias clásicas para la síntesis de feniletanolaminas (como adrenalina o isoprenalina) implica la halogenación alfa de una cetona aromática seguida de aminación y reducción. Si se parte de 3,4-dihidroxi-α-cloroacetofenona, ¿con qué amina debe tratarse y qué reductor se emplea para obtener isoprenalina?',
    questionSmiles: 'CC(C)NCC(O)c1ccc(O)c(O)c1',
    options: [
      { text: 'Tratamiento con amoniaco gaseoso a alta presión seguido de adición de reactivo de Grignard metílico.' },
      { text: 'Tratamiento con metilamina en metanol anhidro seguido de reducción con cianoborohidruro sódico a reflujo.' },
      { text: 'Tratamiento con terc-butilamina seguido de hidrólisis alcalina con hidróxido de litio.' },
      { text: 'Tratamiento con isopropilamina para desplazar nucleofílicamente el halógeno alfa seguido de reducción de la aminocetona intermedia con NaBH4 o H2/Pd-C a alcohol secundario.' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: Para sintetizar isoprenalina, la 3,4-dihidroxi-α-cloroacetofenona se hace reaccionar con exceso de isopropilamina ((CH3)2CH-NH2). La amina primaria actúa como nucleófilo desplazando al ion cloruro en una sustitución bimolecular SN2 para rendir la correspondiente aminocetona intermedia (3,4-dihidroxi-α-(isopropilamino)acetofenona). En el paso posterior, el carbonilo de la cetona aromática se reduce a alcohol secundario bencílico mediante reducción química con borohidruro de sodio (NaBH4) o hidrogenación catalítica heterogénea (H2 con Pd/C), obteniendo isoprenalina racémica.\n\n• Distractor a: Falso: el amoniaco rendiría la amina primaria (noradrenalina); los reactivos de Grignard son incompatibles con cetonas y fenoles libres.\n• Distractor b: Falso: la metilamina conduce a adrenalina, no a isoprenalina.\n• Distractor c: Falso: la terc-butilamina conduce a colterol o análogos con N-terc-butilo, no a isoprenalina.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q11',
    topicId: 'tema-02',
    block: 'Saligenina vs Resorcinol: COMT',
    badge: 'Claude Code · P11 (Geometría del Quelato)',
    question: 'El diseño de agonistas β₂ selectivos estables frente a la COMT condujo a dos soluciones estructurales principales: la saligenina (salbutamol) y el resorcinol (terbutalina). ¿Qué diferencia estructural existe en la disposición de los hidroxilos fenólicos entre ambas estrategias y qué impacto tiene en la afinidad β?',
    questionSmiles: 'CC(C)(C)NCC(O)c1cc(O)cc(O)c1',
    options: [
      { text: 'El salbutamol separa el 3-OH mediante un metileno (-CH2OH, alcohol saligenínico), mientras que la terbutalina sitúa los dos OH en disposición meta (1,3-dihidroxibenceno / resorcinol); ambas geometrías desacoplan la coordinación bidentada con el ion Mg²⁺ en el centro activo de la COMT.' },
      { text: 'La terbutalina elimina completamente los grupos hidroxilo fenólicos convirtiendo la molécula en una feniletilamina neutra.' },
      { text: 'El salbutamol esterifica el grupo catecol con ácido acético formando un profármaco blando hidrolizable.' },
      { text: 'Ambas estrategias provocan una pérdida drástica de la afinidad por receptores beta, actuando únicamente como broncodilatadores indirectos.' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: El centro activo de la COMT requiere una geometría catecólica coplanar orto (1,2-dihidroxibenceno) para formar un quelato bidentado de 5 miembros coordinado con el ion Mg²⁺. La estrategia de saligenina (salbutamol) inserta un -CH2- entre el anillo y el 3-OH, alejándolo de la esfera de coordinación. La estrategia de resorcinol (terbutalina, fenoterol) sitúa los hidroxilos en posiciones 3 y 5 (1,3-dihidroxibenceno, meta entre sí); la separación angular resultante impide por completo la formación del quelato bidentado con Mg²⁺. Sorprendentemente, el receptor β₂ es lo bastante flexible para aceptar ambos patrones de enlace de hidrógeno, conservando una elevada afinidad y eficacia agonista con prolongada semivida.\n\n• Distractor b: Falso: la terbutalina conserva dos grupos hidroxilo fenólicos en disposición 3,5 (resorcinol), no los suprime.\n• Distractor c: Falso: el salbutamol no es un éster ni un profármaco; es un fármaco activo directo.\n• Distractor d: Falso: ambos son potentes agonistas directos β₂ selectivos; no actúan por mecanismos indirectos.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q12',
    topicId: 'tema-02',
    block: 'Anclaje Iónico con TM3: Asp113',
    badge: 'Claude Code · P12 (Reconocimiento Molecular)',
    question: 'En el receptor β₂ adrenérgico, el anclaje del grupo amino de la catecolamina o feniletanolamina es un paso crítico para la afinidad. ¿Qué aminoácido conservado en la tercera hélice transmembrana (TM3) establece la interacción iónica fundamental y qué forma química del fármaco participa?',
    questionSmiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
    options: [
      { text: 'El residuo Ser204 en TM5, mediante un enlace covalente transitorio de tipo éster.' },
      { text: 'El residuo Phe290 en TM6, mediante una interacción hidrofóbica de tipo apilamiento pi con el nitrógeno.' },
      { text: 'El residuo conservado Asp113 en TM3, cuyo carboxilato ionizado establece un par iónico fundamental con el catión amonio protonado de la amina.' },
      { text: 'El residuo Asn312 en TM7, mediante la formación de un puente disulfuro puenteado por agua.' }
    ],
    correctIndex: 2,
    explanation: 'Justificación Química: En todos los receptores de aminas biogénicas de la superfamilia GPCR clase A (incluyendo adrenérgicos, dopaminérgicos y serotoninérgicos), existe un residuo invariante de ácido aspártico en la posición 3.32 (Asp113 en el receptor β₂ humano). A pH fisiológico (7.4), el grupo carboxilato del Asp113 está desprotonado (-COO⁻) y forma un enlace iónico (puente salino) de alta energía con el catión amonio protonado (-NH2⁺-R) del ligando, anclando firmemente la molécula en la cavidad ortostérica.\n\n• Distractor a: Falso: Ser204 y Ser207 se localizan en TM5 y forman enlaces de hidrógeno con los fenoles catecólicos/saligenina, no enlaces covalentes éster.\n• Distractor b: Falso: Phe290 en TM6 participa en el apilamiento aromático con el anillo bencénico del ligando, no con el grupo amino.\n• Distractor d: Falso: el anclaje amino-Asp113 es electrostático directo, sin formación de puentes disulfuro.',
    difficulty: 'Fácil'
  },
  {
    id: 't02-m3-q13',
    topicId: 'tema-02',
    block: 'Doble Reducción con LiAlH4 en Salbutamol',
    badge: 'Claude Code · P13 (Química Sintética)',
    question: 'En la síntesis del salbutamol a partir de 5-(cloroacetil)-2-hidroxibenzoato de metilo, tras la aminación con terc-butilamina se obtiene una cetoamina con función éster metílico en orto al fenol. ¿Qué agente reductor se emplea para reducir simultáneamente el carbonilo de la cetona a alcohol secundario y el éster a alcohol primario?',
    questionSmiles: 'CC(C)(C)NCC(O)c1ccc(O)c(CO)c1',
    options: [
      { text: 'Borohidruro de sodio (NaBH4), que reduce selectivamente tanto ésteres aromáticos como cetonas con idéntica cinética.' },
      { text: 'Hidruro de litio y aluminio (LiAlH4), reductor enérgico capaz de transformar simultáneamente la cetona alifática en alcohol secundario y el éster carboxílico metílico en alcohol primario bencílico.' },
      { text: 'Dihidrógeno con catalizador de Lindlar envenenado con quinolina para evitar la sobre-reducción.' },
      { text: 'Amalgama de zinc y ácido clorhídrico concentrado (reducción de Clemmensen).' }
    ],
    correctIndex: 1,
    explanation: 'Justificación Química: El hidruro de litio y aluminio (LiAlH4) es un agente reductor de hidruro potente. A diferencia del NaBH4 (que solo reduce aldehídos y cetonas pero no ésteres en condiciones ordinarias), el LiAlH4 reduce con facilidad grupos éster a alcoholes primarios y cetonas a alcoholes secundarios. En un único paso y en medio anhidro (THF o éter), el LiAlH4 transforma la cetona alifática en el alcohol secundario bencílico (-CH(OH)-) y el éster metílico aromático (-COOCH3) en el grupo hidroximetilo (-CH2OH, alcohol saligenínico), rindiendo directamente salbutamol.\n\n• Distractor a: Falso: el NaBH4 reduce la cetona pero no es capaz de reducir el éster carboxílico a alcohol primario.\n• Distractor c: Falso: el catalizador de Lindlar se emplea para la hidrogenación parcial de alquinos a alquenos cis, no para reducir ésteres.\n• Distractor d: Falso: la reducción de Clemmensen convierte carbonilos en metilenos (-CH2-), lo que destruiría la función alcohol requerida.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q14',
    topicId: 'tema-02',
    block: 'DCI & Descubrimiento de Beta-Bloqueantes',
    badge: 'Claude Code · P14 (Agonismo Parcial)',
    question: 'El dicloroisoproterenol (DCI, 1958) fue el punto de inflexión histórico en el descubrimiento de los antagonistas beta. ¿Qué modificación estructural se realizó sobre la isoprenalina para transformar al agonista en un antagonista y cuál fue su limitación clínica principal?',
    questionSmiles: 'CC(C)NCC(O)c1ccc(Cl)c(Cl)c1',
    options: [
      { text: 'Se sustituyó el grupo N-isopropilo por un grupo metilo; produjo toxicidad hepática fulminante por necrosis centrolobulillar.' },
      { text: 'Se oxidó el alcohol secundario a cetona aromática; resultó inestable en medio acuoso hidrolizándose en minutos.' },
      { text: 'Se introdujo un puente metileno adicional en la cadena alifática; provocó bloqueo neuromuscular irreversible en la placa motora.' },
      { text: 'Se reemplazaron los dos grupos catecólicos (3,4-di-OH) por átomos de cloro (3,4-dicloro); su limitación fue que conservaba notable actividad simpaticomimética intrínseca (agonismo parcial) que impedía su empleo clínico como antagonista puro.' }
    ],
    correctIndex: 3,
    explanation: 'Justificación Química: El dicloroisoproterenol (DCI) fue diseñado por Powell y Slater en 1958 sustituyendo los dos hidroxilos fenólicos catecólicos (3,4-di-OH) de la isoprenalina por dos átomos de cloro isostéricos (3,4-dicloro). Los cloros conservan el volumen y la electronegatividad para encajar en el bolsillo, pero carecen de protones para actuar como donadores de enlaces de hidrógeno con las serinas de TM5 requeridas para inducir el cambio conformacional activo completo. Aunque demostró por primera vez que era posible bloquear las acciones de la adrenalina, el DCI conservaba una notable actividad simpaticomimética intrínseca (ISA, agonismo parcial significativo), produciendo estimulación cardíaca residual incompatible con el tratamiento antianginoso.\n\n• Distractor a: Falso: el DCI conserva el grupo N-isopropilo de la isoprenalina; la modificación se realizó en el anillo aromático.\n• Distractor b: Falso: el alcohol secundario bencílico se mantuvo intacto.\n• Distractor c: Falso: no se alargó la cadena alifática; el DCI es una feniletanolamina.',
    difficulty: 'Medio'
  },
  {
    id: 't02-m3-q15',
    topicId: 'tema-02',
    block: 'Cardioselectividad Beta-1 & Seguridad en Asma',
    badge: 'Claude Code · P15 (Atenolol vs Propranolol)',
    question: 'Los antagonistas β₁-cardioselectivos (como atenolol o metoprolol) son preferibles a los no selectivos (propranolol) en pacientes con hipertensión arterial que padecen concomitantemente asma o EPOC. ¿Qué rasgo estructural confiere cardioselectividad β₁ y por qué es más seguro en el paciente asmático?',
    questionSmiles: 'NC(=O)Cc1ccc(OCC(O)CNC(C)C)cc1',
    options: [
      { text: 'La presencia de sustituyentes polares o amidas en la posición para del anillo aromático de la ariloxipropanolamina; evita el bloqueo de los receptores β₂ bronquiales conservando la broncodilatación fisiológica mediada por adrenalina.' },
      { text: 'La sustitución completa del nitrógeno secundario por un carbono cuaternario insoluble en sangre.' },
      { text: 'La isomerización a la forma trans de la cadena que impide el acceso a receptores del sistema cardiovascular.' },
      { text: 'La adición de un grupo nitroaromático que induce tolerancia farmacológica aguda selectiva en el árbol respiratorio.' }
    ],
    correctIndex: 0,
    explanation: 'Justificación Química: Los β-bloqueantes de segunda generación (atenolol, metoprolol, bisoprolol, esmolol) se caracterizan por presentar un anillo aromático monocíclico con un sustituyente en posición para capaz de formar enlaces de hidrógeno adicionales (como la función acetamida -CH2-CO-NH2 en el atenolol o el metoxietilo en el metoprolol). Esta extensión para interacciona selectivamente con residuos específicos del receptor β₁ cardíaco mientras que choca estéricamente en la cavidad del receptor β₂ bronquial. Al no bloquear los receptores β₂ del músculo liso bronquial, no suprimen el tono dilatador endógeno mediado por la adrenalina, minimizando el riesgo de desencadenar broncoespasmo en asmáticos.\n\n• Distractor b: Falso: la función amina secundaria protonable es estrictamente indispensable para el anclaje con el Asp113.\n• Distractor c: Falso: las cadenas laterales alifáticas de propanolamina son abiertas y saturadas sp3, no exhiben isomería cis/trans.\n• Distractor d: Falso: ninguno de estos fármacos posee grupos nitroaromáticos ni actúan induciendo tolerancia respiratoria.',
    difficulty: 'Fácil'
  }
];
