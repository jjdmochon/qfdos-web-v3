// ==========================================================================
// QFDOS - Exámenes del Tema 04: Serotonina e inhibidores de la recaptación de aminas biógenas
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Generado desde Exámenes modelo jev/Tema 4/fuente (examen1, examen2 y examen3).
// Consolidado contra los apuntes publicados del Tema 4 y las tres clases del tema.
// Tipografía científica: Unicode directo, sin LaTeX crudo.
// ==========================================================================

import type { TestQuestion } from './qfdosData';

// MODELO 1: Modelo 1 · Receptores, ISRS, tricíclicos, imipramina y metabolismo de la serotonina
// Clave: C, B, A, A, C, B, B, A, A, D, C, D, C, D, B
export const TEMA4_MODELO_1_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t04-m1-q01",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P1 (ISRS frente a ATC: selectividad por SERT y seguridad en sobredosis)",
    question: "Los inhibidores selectivos de la recaptación de serotonina (ISRS) han desplazado a los antidepresivos tricíclicos (ATC) como tratamiento de primera línea de la depresión. Identifica la propiedad farmacológica diferencial que lo justifica.",
    options: [
      { text: "Inhiben la MAO-A de forma reversible, sin actuar sobre transportadores, con un menor riesgo cardiotóxico" },
      { text: "Bloquean SERT y NET con igual potencia y conservan la afinidad por receptores muscarínicos, H₁ y α₁" },
      { text: "Bloquean SERT con poca afinidad por receptores muscarínicos, H₁ y α₁; son más seguros en sobredosis" },
      { text: "Son agonistas directos de 5-HT1A, de modo que evitan el bloqueo de receptores H₁ y α₁ y la toxicidad" },
    ],
    correctIndex: 2,
    explanation: "Vemos que los ISRS conservan el bloqueo del transportador SERT y pierden la afinidad por receptores muscarínicos, histamínicos H₁ y adrenérgicos α₁ que sí muestran los ATC. De ahí menos efectos anticolinérgicos, sedación e hipotensión ortostática, y un margen de seguridad mucho mayor en sobredosis (los ATC provocan arritmias y convulsiones).\n\nDescartamos la A: Los ISRS no inhiben la MAO: ese mecanismo es el de los RIMA. Los ISRS bloquean la recaptación de 5-HT en el transportador SERT.\nDescartamos la B: Los ISRS son selectivos de SERT; la afinidad por receptores M, H₁ y α₁ es la propiedad que mantienen los ATC, no los ISRS.\nDescartamos la D: Los ISRS no son agonistas directos de 5-HT1A: elevan la 5-HT sináptica al bloquear SERT. Ese agonismo corresponde a las azapironas.\n\nReferencia: Apuntes §4.1-4.2; clase 1."
  },
  {
    id: "t04-m1-q02",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P2 (Escitalopram como eutómero (S) del citalopram)",
    question: "El citalopram, un ISRS con la cadena de fenilalquilamina cerrada en un anillo, se comercializó primero como racemato. Después llegó su eutómero, con configuración (S) en el centro quiral cuaternario. Marca la estructura que representa ese eutómero.",
    questionStructures: [{ name: "Citalopram (racémico)", smiles: "CN(C)CCCC1(OCc2cc(C#N)ccc21)c1ccc(F)cc1" }],
    options: [
      { text: "Estructura A", smiles: "CN(C)CCC[C@@]1(OCc2cc(C#N)ccc21)c1ccc(F)cc1", revealedName: "(R)-Citalopram (distómero)" },
      { text: "Estructura B", smiles: "CN(C)CCC[C@]1(OCc2cc(C#N)ccc21)c1ccc(F)cc1", revealedName: "Escitalopram, (S)-citalopram" },
      { text: "Estructura C", smiles: "CN(C)CCC[C@]1(OCc2ccccc21)c1ccc(F)cc1", revealedName: "Análogo (S) sin el nitrilo (des-ciano)" },
      { text: "Estructura D", smiles: "CN(C)CCC[C@]1(OCc2cc(C#N)ccc21)c1ccc(Cl)cc1", revealedName: "Análogo (S) con Cl en lugar de F" },
    ],
    correctIndex: 1,
    explanation: "Vemos que el centro quiral es cuaternario: lleva el O del anillo, dos arilos distintos (fluorofenilo y el del anillo bicíclico) y la cadena de tres carbonos. Al asignar CIP, la estructura escrita con [C@] y este orden de átomos es (S): el escitalopram. La opción con [C@@] es el (R), distómero. Los análogos sin CN o con Cl, aunque (S), no son citalopram.\n\nDescartamos la A: Es el (R)-citalopram: la inversión del centro cuaternario da el distómero, menos potente en el bloqueo de SERT.\nDescartamos la C: Mantiene la configuración (S), pero carece del nitrilo del anillo bicíclico: no es citalopram.\nDescartamos la D: Mantiene la configuración (S), pero lleva Cl en lugar de F en el arilo: no es citalopram.\n\nReferencia: Apuntes §4.1 (tabla de fármacos y figura 5); clase 1."
  },
  {
    id: "t04-m1-q03",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P3 (Sertralina (1S,4S): identificación entre estereoisómeros)",
    question: "La sertralina es un ISRS con núcleo de 1,2,3,4-tetrahidronaftalen-1-amina N-metilada y un grupo 3,4-diclorofenilo en C-4, y se comercializa como estereoisómero (1S,4S). Marca la estructura que corresponde a la sertralina.",
    options: [
      { text: "Estructura A", smiles: "CN[C@H]1CC[C@H](C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl", revealedName: "Sertralina (1S,4S)" },
      { text: "Estructura B", smiles: "CN[C@@H]1CC[C@H](C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl", revealedName: "(1R,4S)-sertralina (diastereómero)" },
      { text: "Estructura C", smiles: "CN[C@H]1CC[C@@H](C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl", revealedName: "(1S,4R)-sertralina (diastereómero)" },
      { text: "Estructura D", smiles: "CN[C@@H]1CC[C@@H](C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl", revealedName: "(1R,4R)-sertralina (enantiómero)" },
    ],
    correctIndex: 0,
    explanation: "Observamos dos centros estereogénicos (C-1 con la amina y C-4 con el diclorofenilo), luego hay cuatro estereoisómeros. La sertralina es (1S,4S), de disposición cis. Su enantiómero es (1R,4R) y los diastereómeros son (1S,4R) y (1R,4S); solo una estructura reproduce las dos configuraciones S.\n\nDescartamos la B: Es (1R,4S): invierte el centro C-1 y da un diastereómero (trans).\nDescartamos la C: Es (1S,4R): invierte el centro C-4 y da un diastereómero (trans).\nDescartamos la D: Es (1R,4R): invierte los dos centros y da el enantiómero de la sertralina.\n\nReferencia: Apuntes §4.1 (tabla de fármacos y figura 5); clase 1."
  },
  {
    id: "t04-m1-q04",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P4 (Cambio de clorpromazina a imipramina: puente central y perfil farmacológico)",
    question: "Al pasar de la clorpromazina (neuroléptico) a la imipramina (antidepresivo) cambia el anillo central del tricíclico. Indica qué se conserva y qué cambia, tanto en la estructura como en la actividad.",
    questionStructures: [{ name: "Clorpromazina", smiles: "CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21" }, { name: "Imipramina", smiles: "CN(C)CCCN1c2ccccc2CCc2ccccc21" }],
    options: [
      { text: "Se conserva la cadena dimetilaminopropílica, el puente –S– pasa a –CH₂–CH₂– y se pierde el Cl; ya no es neuroléptica e inhibe la recaptación de NA y 5-HT" },
      { text: "Se conserva el anillo central con –S– y la dimetilamina se cambia por una morfolina; deja de ser neuroléptica y pasa a inhibir la MAO-A y la MAO-B por igual" },
      { text: "Se conserva el puente –S– y la cadena se acorta a dos carbonos con dimetilamina; la molécula sigue siendo neuroléptica y gana además acción antidepresiva" },
      { text: "Se pierde la cadena aminoalquílica y el puente –S– pasa a –O–; deja de ser neuroléptica y pasa a agonista parcial 5-HT1A con acción ansiolítica sin sedación" },
    ],
    correctIndex: 0,
    explanation: "Vemos que la cadena de tres carbonos con dimetilamina es idéntica en ambos fármacos. Lo que cambia es el núcleo: el azufre del puente fenotiazínico se sustituye por etileno (–CH₂–CH₂–), que da el núcleo dibenzoazepínico, y se elimina el cloro aromático. Este cambio de núcleo hace que la imipramina deje de ser neuroléptica y muestre actividad antidepresiva por inhibición de la recaptación de noradrenalina y serotonina.\n\nDescartamos la B: La imipramina mantiene la dimetilamina y pierde el –S–; no lleva morfolina ni actúa como inhibidora de la MAO-A.\nDescartamos la C: La cadena de tres carbonos con dimetilamina se conserva, no se acorta, el puente deja de ser –S– y el perfil neuroléptico se pierde.\nDescartamos la D: La imipramina conserva la cadena aminoalquílica y el puente es etileno, no –O–; su actividad no es agonismo 5-HT1A.\n\nReferencia: Apuntes §4.2.1 (figura 6); clase 1."
  },
  {
    id: "t04-m1-q05",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P5 (Desipramina: metabolito N-desmetilado activo de la imipramina, con perfil más noradrenérgico)",
    question: "La imipramina se N-desmetila y origina desipramina. Elige la afirmación que describe bien la relación entre ambas.",
    questionStructures: [{ name: "Imipramina", smiles: "CN(C)CCCN1c2ccccc2CCc2ccccc21" }],
    options: [
      { text: "La desipramina es una amina primaria con mayor perfil serotoninérgico, y la imipramina carece de actividad hasta desmetilarse" },
      { text: "La desipramina es un precursor inactivo que se activa tras una N-oxidación, y es más serotoninérgica que la imipramina" },
      { text: "La desipramina es el metabolito N-desmetilado activo de la imipramina: una amina secundaria con un perfil más noradrenérgico" },
      { text: "La desipramina conserva la amina terciaria y el mismo perfil que la imipramina, y ambas se degradan por la vía de la MAO-A" },
    ],
    correctIndex: 2,
    explanation: "Observamos que la pérdida de un metilo del N terminal da una amina secundaria (CH₃–NH–), no primaria ni terciaria. La desipramina es un metabolito activo y su contribución es más noradrenérgica que la de la imipramina, que inhibe la recaptación de serotonina y noradrenalina por sí misma.\n\nDescartamos la A: Una sola N-desmetilación da una amina secundaria, no primaria; la imipramina ya es activa por sí misma y la desipramina es más noradrenérgica.\nDescartamos la B: La desipramina es activa por sí misma, no requiere N-oxidación y su perfil se desplaza hacia la noradrenalina, no hacia la serotonina.\nDescartamos la D: La desipramina es una amina secundaria, no terciaria, y tiene mayor perfil noradrenérgico; ambas actúan sobre la recaptación, no sobre la MAO-A.\n\nReferencia: Apuntes §4.2 (tabla y figura 7); clase 1."
  },
  {
    id: "t04-m1-q06",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P6 (Acidez del metilo del o-nitrotolueno con EtONa)",
    question: "En la primera etapa de la síntesis de la imipramina, el o-nitrotolueno reacciona con etóxido sódico (EtONa). Elige la explicación de que una base de la fuerza del etóxido baste para desprotonar el grupo metilo.",
    questionStructures: [{ name: "o-Nitrotolueno", smiles: "Cc1ccccc1[N+](=O)[O-]" }],
    options: [
      { text: "El grupo NO₂ cede densidad electrónica al metilo por resonancia y debilita el enlace C–H bencílico." },
      { text: "El carbanión bencílico formado deslocaliza la carga negativa sobre el grupo NO₂ situado en orto." },
      { text: "Tras perder un hidruro, el catión bencílico se estabiliza por resonancia con el nitro en orto." },
      { text: "El etóxido arranca un H del anillo aromático y el aril-anión resultante se estabiliza con el NO₂." },
    ],
    correctIndex: 1,
    explanation: "Observamos que el NO₂ es un grupo aceptor fuerte (–I, –M). Al desprotonar el CH₃ en orto, el par del carbanión bencílico se conjuga con el anillo y con el N⁺(=O)O⁻, de modo que la carga negativa queda repartida sobre los oxígenos del nitro (forma aci-nitro). Esa deslocalización baja el pKa del metilo lo suficiente para que EtONa lo desprotone en equilibrio.\n\nDescartamos la A: Invierte el efecto electrónico: el NO₂ retira densidad electrónica, no la cede; lo que ocurre es que estabiliza al carbanión.\nDescartamos la C: Confunde un carbanión con un carbocatión: con una base se forma un anión, y un catión bencílico estaría desestabilizado por el NO₂ aceptor.\nDescartamos la D: Los H aromáticos no son ácidos en estas condiciones y el anillo no se desprotona; el sitio ácido es el CH₃ bencílico.\n\nReferencia: Apuntes §4.3 (figura 8); clase 1."
  },
  {
    id: "t04-m1-q07",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P7 (Dimerización oxidativa hasta el 2,2′-dinitrobibencilo (estructura))",
    question: "El carbanión del o-nitrotolueno (formado con EtONa) se oxida por transferencia de un electrón a un radical bencílico, que dimeriza. Marca la estructura del producto de dimerización de esta ruta.",
    questionStructures: [{ name: "o-Nitrotolueno", smiles: "Cc1ccccc1[N+](=O)[O-]" }],
    options: [
      { text: "Estructura A", smiles: "CC(c1ccccc1[N+](=O)[O-])c1ccccc1[N+](=O)[O-]", revealedName: "1,1-Bis(2-nitrofenil)etano (acoplamiento con migración)" },
      { text: "Estructura B", smiles: "[O-][N+](=O)c1ccccc1CCc1ccccc1[N+](=O)[O-]", revealedName: "2,2′-Dinitrobibencilo (acoplamiento CH₂–CH₂)" },
      { text: "Estructura C", smiles: "[O-][N+](=O)c1ccccc1-c1ccccc1[N+](=O)[O-]", revealedName: "2,2′-Dinitrobifenilo (acoplamiento arilo–arilo)" },
      { text: "Estructura D", smiles: "[O-][N+](=O)c1ccccc1COCc1ccccc1[N+](=O)[O-]", revealedName: "Éter bis(2-nitrobencílico) (acoplamiento C–O–C)" },
    ],
    correctIndex: 1,
    explanation: "Vemos que el radical está centrado en el CH₂ bencílico. La dimerización radical–radical une dos radicales por ese carbono y da Ar–CH₂–CH₂–Ar: el 2,2′-dinitrobibencilo. Una sola unión C–C sin transposición conserva los dos CH₂ y el puente etileno que acabará en el anillo central de siete miembros del iminodibencilo.\n\nDescartamos la A: Supone una migración de H o de un radical que no ocurre; la unión radical–radical es directa entre los dos CH₂ y deja un puente CH₂–CH₂.\nDescartamos la C: Exigiría unir los carbonos aromáticos (tipo Ullmann); el radical está en el CH₂ bencílico y es ese carbono el que acopla.\nDescartamos la D: Requeriría un oxígeno que una los dos carbonos bencílicos; la oxidación monoelectrónica solo genera el radical, que acopla C–C y no incorpora O al puente.\n\nReferencia: Apuntes §4.3 (figura 8); clase 1."
  },
  {
    id: "t04-m1-q08",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P8 (Cierre de la diamina a iminodibencilo con pérdida de NH₃)",
    question: "Se calienta el 2,2′-diaminobibencilo en la síntesis de la imipramina. Indica qué transformación tiene lugar en esta etapa.",
    questionStructures: [{ name: "2,2′-Diaminobibencilo", smiles: "Nc1ccccc1CCc1ccccc1N" }],
    options: [
      { text: "Ciclación con pérdida de NH₃: un N sustituye al otro y queda una diarilamina en un anillo de siete miembros." },
      { text: "Oxidación con pérdida de H₂: los dos NH₂ forman un enlace N=N que cierra un anillo central de ocho miembros." },
      { text: "Desaminación de ambos anillos con pérdida de 2 NH₃, que da el bibencilo sin N y sin cierre de anillo alguno." },
      { text: "Pérdida de NH₃ con cierre de un anillo de seis miembros: el N se une a un CH₂ bencílico y da una dihidroacridina." },
    ],
    correctIndex: 0,
    explanation: "Observamos que la diamina cicla en caliente con pérdida de NH₃: un nitrógeno desplaza al otro en el carbono ipso y el N que queda une los dos anillos. El resultado es el iminodibencilo (10,11-dihidro-5H-dibenzo[b,f]azepina), con el NH diarílico dentro del anillo central de siete miembros (dos CH₂, dos carbonos aromáticos por lado y un N).\n\nDescartamos la B: No hay oxidante ni pérdida de H₂; el balance es de desaminación (–NH₃), y se forma un enlace C–N, no N=N.\nDescartamos la C: Perder los dos nitrógenos elimina el átomo que se necesita: la etapa pierde un solo NH₃ y conserva un N como puente diarilamina.\nDescartamos la D: Un anillo de seis miembros con N unido a un CH₂ exigiría romper la cadena etilénica; el N se une al carbono aromático y el anillo es de siete.\n\nReferencia: Apuntes §4.3 (tabla de etapas y figura 8); clase 1."
  },
  {
    id: "t04-m1-q09",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P9 (N-alquilación del iminodibencilo con NaNH₂: SN2 y necesidad de base fuerte)",
    question: "Para N-alquilar el iminodibencilo con 3-cloro-N,N-dimetilpropilamina usamos NaNH₂. Elige la razón.",
    questionStructures: [{ name: "Iminodibencilo", smiles: "C1Cc2ccccc2Nc2ccccc21" }],
    options: [
      { text: "El NH es el de una diarilamina poco básica; el amiduro lo desprotona y el anión ataca por SN2 al CH₂Cl." },
      { text: "El NH₂⁻ sustituye al Cl del reactivo y la amina primaria resultante se une al iminodibencilo por acilación." },
      { text: "El NaNH₂ desprotona el puente CH₂–CH₂ bencílico y el carbanión se alquila con el cloruro (C-alquilación)." },
      { text: "El NaNH₂ convierte el cloruro en un grupo saliente mejor por intercambio con NH₂⁻, y la reacción sigue por SN1." },
    ],
    correctIndex: 0,
    explanation: "Vemos que el iminodibencilo es una diarilamina poco básica, de modo que su N–H se desprotona con una base fuerte como NaNH₂. El amiduro resultante es nucleófilo y desplaza el Cl del cloruro primario por SN2 (ataque por la cara posterior, sin carbocatión).\n\nDescartamos la B: El NH₂⁻ se consume en la desprotonación y no sustituye al Cl del reactivo; además no hay acilación: se forma un enlace N–C(sp³) por SN2.\nDescartamos la C: El sitio ácido buscado es el N–H, mucho más ácido que el CH₂ bencílico; la reacción es una N-alquilación y no una C-alquilación.\nDescartamos la D: Un cloruro primario no ioniza (no hay SN1) y el NaNH₂ no actúa intercambiando el halógeno, sino desprotonando el N–H.\n\nReferencia: Apuntes §4.3 (figura 8); clase 1."
  },
  {
    id: "t04-m1-q10",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P10 (Mecanismo de Fischer: hidrazona, enhidrazina, [3,3], pérdida de H₂O y NH₃)",
    question: "En la síntesis de indoles de Fischer, una arilhidrazina y un compuesto carbonílico dan un indol en medio ácido y en caliente. Elige la secuencia que describe bien el mecanismo.",
    options: [
      { text: "Condensación (–H₂O) a hidrazona, enhidrazina, transposición [3,3] (rompe C–C, forma N–N) y ciclación con pérdida de NH₃." },
      { text: "Condensación (–H₂O) a hidrazona, enhidrazina, desplazamiento [1,5] de H (rompe N–N, forma C–N) y pérdida de NH₃." },
      { text: "Condensación (–NH₃) a hidrazona, enhidrazina, transposición [3,3] (rompe N–N, forma C–C) y ciclación con pérdida de H₂O." },
      { text: "Condensación (–H₂O) a hidrazona, enhidrazina, transposición [3,3] (rompe N–N, forma C–C) y pérdida de NH₃." },
    ],
    correctIndex: 3,
    explanation: "Observamos cuatro hechos. (1) La condensación con el carbonilo expulsa H₂O y da la hidrazona. (2) La hidrazona tautomeriza a enhidrazina. (3) Protonada, la enhidrazina sufre una transposición sigmatrópica [3,3] que rompe el enlace N–N y forma el enlace C–C. (4) La ciclación y la eliminación de NH₃ aromatizan al indol.\n\nDescartamos la A: Invierte los enlaces: en la [3,3] se rompe N–N, que es el enlace débil, y se forma el C–C que une el anillo al carbono del carbonilo.\nDescartamos la B: Un desplazamiento [1,5] de H no rompe N–N ni construye el esqueleto del indol; el paso clave es la [3,3] que forma el enlace C–C.\nDescartamos la C: Cambia la molécula que se pierde: la condensación elimina H₂O, y el NH₃ sale al final, en la aromatización.\n\nReferencia: Apuntes §7.1; clase 2."
  },
  {
    id: "t04-m1-q11",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P11 (Biosíntesis Trp → 5-HTP → 5-HT: enzima que hidroxila el C5 y cofactor)",
    question: "En la biosíntesis de la serotonina a partir del L-triptófano, una enzima introduce el grupo hidroxilo en el indol. Indica cuál es y qué cofactor necesita.",
    options: [
      { text: "N-acetiltransferasa, que acetila el aminoácido con acetil-CoA antes de la hidroxilación en el C5 del indol" },
      { text: "Monoaminooxidasa (MAO), que oxida el triptófano a 5-HTP en la mitocondria y requiere FAD como cofactor" },
      { text: "Triptófano hidroxilasa, que hidroxila el C5 del indol y requiere tetrahidrobiopterina (BH₄) como cofactor" },
      { text: "Descarboxilasa de aminoácidos aromáticos, que convierte el 5-HTP en 5-HT con piridoxal fosfato (PLP)" },
    ],
    correctIndex: 2,
    explanation: "Vemos que la ruta comienza con la hidroxilación del C5 del indol del L-triptófano por la triptófano hidroxilasa, con tetrahidrobiopterina (BH₄) como cofactor, que da el 5-hidroxitriptófano (5-HTP). La descarboxilasa de aminoácidos aromáticos (con piridoxal fosfato) elimina después el CO₂ y forma la serotonina.\n\nDescartamos la A: La N-acetilación pertenece a la vía pineal hacia melatonina, a partir de serotonina; no actúa sobre el triptófano.\nDescartamos la B: La MAO es una oxidasa catabólica de la 5-HT (flavoenzima con FAD); no participa en la síntesis ni hidroxila el triptófano.\nDescartamos la D: La descarboxilasa actúa en la segunda etapa (descarboxilación del 5-HTP); no introduce el hidroxilo del indol.\n\nReferencia: Apuntes §2.1 (figura 2); clase 1."
  },
  {
    id: "t04-m1-q12",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P12 (Distribución de la 5-HT: mayor parte periférica y síntesis cerebral local)",
    question: "Elige la afirmación correcta sobre la distribución de la serotonina en el organismo.",
    options: [
      { text: "La mayor parte está en el SNC, y la 5-HT periférica atraviesa la barrera hematoencefálica por un transportador específico" },
      { text: "Las plaquetas sintetizan la mayor parte de la 5-HT y la liberan al cerebro, atravesando la barrera hematoencefálica" },
      { text: "El cerebro capta la 5-HT plasmática y la reutiliza, sin sintetizarla localmente a partir del triptófano de la dieta" },
      { text: "La mayor parte es periférica (intestino y plaquetas); el cerebro sintetiza la suya, porque la circulante no cruza la BHE" },
    ],
    correctIndex: 3,
    explanation: "Observamos que la mayor parte de la 5-HT del organismo está en la periferia, sobre todo en el tubo digestivo y en las plaquetas, que la captan y almacenan, pero no la sintetizan. La serotonina circulante no atraviesa de forma significativa la barrera hematoencefálica, de modo que el cerebro la sintetiza localmente a partir de L-triptófano, que sí accede al sistema nervioso central.\n\nDescartamos la A: Invierte la distribución: la mayor parte de la 5-HT es extracerebral y la 5-HT periférica no cruza la BHE.\nDescartamos la B: Las plaquetas captan y almacenan la 5-HT, pero no son su fuente principal de síntesis y no la transfieren al cerebro.\nDescartamos la C: El cerebro no depende de la 5-HT plasmática: la sintetiza localmente a partir del triptófano, que sí cruza la BHE.\n\nReferencia: Apuntes §2.2; clase 1 y clase 3."
  },
  {
    id: "t04-m1-q13",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P13 (Catabolismo por MAO: aldehído como producto inmediato)",
    question: "La monoaminooxidasa (MAO), una flavoenzima con FAD, desamina oxidativamente la serotonina. Marca la estructura del producto orgánico inmediato, que aparece tras la hidrólisis del iminio con liberación de NH₃.",
    questionStructures: [{ name: "Serotonina", smiles: "NCCc1c[nH]c2ccc(O)cc12" }],
    options: [
      { text: "Estructura A", smiles: "O=CCc1c[nH]c2ccc(OC)cc12", revealedName: "5-Metoxiindolacetaldehído (aldehído O-metilado)" },
      { text: "Estructura B", smiles: "CC(=O)NCCc1c[nH]c2ccc(O)cc12", revealedName: "N-Acetilserotonina" },
      { text: "Estructura C", smiles: "O=CCc1c[nH]c2ccc(O)cc12", revealedName: "5-Hidroxiindolacetaldehído (5-HIAL)" },
      { text: "Estructura D", smiles: "OC(=O)Cc1c[nH]c2ccc(O)cc12", revealedName: "Ácido 5-hidroxiindolacético (5-HIAA)" },
    ],
    correctIndex: 2,
    explanation: "Vemos que la MAO (flavoenzima con FAD) desamina oxidativamente la amina primaria: pasa por el iminio y, tras hidrólisis, libera NH₃ y el aldehído, el 5-hidroxiindolacetaldehído, que conserva el OH fenólico del C-5. Una aldehído deshidrogenasa lo oxida después a ácido (5-HIAA), el metabolito que se excreta por orina.\n\nDescartamos la A: Es un aldehído, pero con el OH fenólico metilado: la MAO no O-metila; la O-metilación pertenece a la vía de la melatonina y actúa sobre la N-acetilserotonina.\nDescartamos la B: La N-acetilserotonina es el intermedio de la vía pineal hacia la melatonina (N-acetiltransferasa), no del catabolismo por MAO.\nDescartamos la D: El 5-HIAA es el producto final, formado por oxidación posterior del aldehído; la MAO no da el ácido directamente.\n\nReferencia: Apuntes §2.3 (figura 3); clase 2."
  },
  {
    id: "t04-m1-q14",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P14 (Melatonina en dos pasos: N-acetilación y O-metilación)",
    question: "La melatonina se forma en la glándula pineal a partir de la serotonina en dos pasos enzimáticos. Elige la secuencia correcta.",
    options: [
      { text: "Oxidación por la MAO a 5-HIAA, seguida de O-metilación del 5-OH y de amidación posterior del carboxilo libre con acetil-CoA" },
      { text: "O-metilación del 5-OH por la N-acetiltransferasa, y N-acetilación posterior del grupo amino por la O-metiltransferasa" },
      { text: "Una sola acetiltransferasa forma la melatonina directamente y la N-acetilserotonina es un metabolito posterior de esta" },
      { text: "N-acetilación del grupo amino por una N-acetiltransferasa y O-metilación posterior del 5-OH por una O-metiltransferasa" },
    ],
    correctIndex: 3,
    explanation: "Observamos que en la glándula pineal la serotonina se N-acetila (N-acetiltransferasa) y da N-acetilserotonina, que conserva el 5-OH libre. Después la O-metiltransferasa metila ese hidroxilo y forma la N-acetil-5-metoxitriptamina, la melatonina. La N-acetilserotonina es el intermedio, no el producto.\n\nDescartamos la A: El 5-HIAA es un producto catabólico de la MAO y la aldehído deshidrogenasa; la melatonina sale de la serotonina intacta, sin pasar por el ácido.\nDescartamos la B: Intercambia las enzimas: la acetilación la hace la N-acetiltransferasa y la metilación la O-metiltransferasa.\nDescartamos la C: Hacen falta dos pasos con dos enzimas; la N-acetilserotonina es el intermedio y no un metabolito posterior.\n\nReferencia: Apuntes §2.3 (figura 4); clase 1."
  },
  {
    id: "t04-m1-q15",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P15 (Receptores 5-HT: 5-HT3 único ionotrópico y transducción de 5-HT1 y 5-HT2)",
    question: "Elige el enunciado que describe bien la clasificación de los receptores de serotonina y su transducción de señal.",
    options: [
      { text: "5-HT3 es el único receptor ionotrópico (canal catiónico); 5-HT1 acopla a Gq, 5-HT2 a Gi/o y el resto son GPCR" },
      { text: "5-HT3 es el único receptor ionotrópico (canal catiónico); 5-HT1 acopla a Gi/o, 5-HT2 a Gq y el resto son GPCR" },
      { text: "5-HT3 es un GPCR acoplado a Gq; 5-HT1 acopla a Gi/o, 5-HT2 es un canal catiónico y el resto son GPCR" },
      { text: "5-HT2 y 5-HT3 son canales catiónicos ionotrópicos; 5-HT1 acopla a Gi/o y el resto son GPCR del tipo metabotrópico" },
    ],
    correctIndex: 1,
    explanation: "Vemos que el 5-HT3 es el único receptor serotoninérgico ionotrópico (canal catiónico activado por ligando). Los otros seis son GPCR: la familia 5-HT1 acopla a Gi/o y reduce el AMPc, y la 5-HT2 a Gq, que activa la fosfolipasa C (IP₃/DAG).\n\nDescartamos la A: Permuta la proteína G de las dos familias: 5-HT1 es Gi/o y 5-HT2 es Gq.\nDescartamos la C: El 5-HT3 es un canal iónico, no un GPCR, y el 5-HT2 es un GPCR acoplado a Gq.\nDescartamos la D: El 5-HT2 es un GPCR acoplado a Gq; el 5-HT3 es el único canal iónico.\n\nReferencia: Apuntes §3 (tabla de receptores); clase 1."
  }
];

// MODELO 2: Modelo 2 · IMAO, triptanes, síntesis de Fischer y sumatriptán
// Clave: B, C, D, D, C, B, B, A, D, C, C, A, B, A, D
export const TEMA4_MODELO_2_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t04-m2-q01",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P1 (Identificación del RIMA entre los inhibidores de la MAO)",
    question: "Entre los siguientes inhibidores de la monoaminooxidasa, marca el RIMA, el inhibidor reversible y selectivo de la MAO-A de tercera generación.",
    options: [
      { text: "Isoniazida" },
      { text: "Moclobemida" },
      { text: "Selegilina" },
      { text: "Iproniazida" },
    ],
    correctIndex: 1,
    explanation: "Vemos que la moclobemida es el inhibidor reversible y preferente de la MAO-A (RIMA). La iproniazida es una hidrazina derivada de la isoniazida cuya toxicidad hepática limitó su desarrollo, y la selegilina es una propargilamina de inhibición irreversible, ejemplo docente de inhibidor de la MAO-B. La isoniazida es el antituberculoso cuyo efecto sobre el ánimo despertó el interés por esta familia.\n\nDescartamos la A: Isoniazida: antituberculoso del que derivan las hidrazinas; no es el RIMA.\nDescartamos la C: Selegilina: propargilamina de inhibición irreversible, ejemplo docente asociado a la MAO-B.\nDescartamos la D: Iproniazida: hidrazina derivada de la isoniazida; su toxicidad hepática limitó su desarrollo como antidepresivo.\n\nReferencia: Apuntes §5.2; clase 2."
  },
  {
    id: "t04-m2-q02",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P2 (Moclobemida: inhibición reversible y selectiva de MAO-A frente a la irreversible no selectiva)",
    question: "La moclobemida se presenta como alternativa a la inhibición irreversible no selectiva de la MAO. Elige la afirmación correcta sobre cómo la inhibe.",
    options: [
      { text: "Es una inhibidora reversible, pero bloquea la MAO-A y la MAO-B por igual, sin preferencia de isoenzima alguna en el sitio activo" },
      { text: "Es una inhibidora irreversible y no selectiva, como el resto de inhibidores clásicos de la monoaminooxidasa y sus hidrazinas" },
      { text: "Es una inhibidora reversible y selectiva de la MAO-A, lo que cambia su perfil frente a la inhibición irreversible no selectiva" },
      { text: "Es una inhibidora irreversible y preferente de la MAO-B, de modo que su perfil coincide con el de las propargilaminas conocidas" },
    ],
    correctIndex: 2,
    explanation: "Observamos que la moclobemida se presenta como inhibidor reversible y preferente de la MAO-A (RIMA). La reversibilidad y la selectividad modifican su perfil de interacción frente a la inhibición irreversible no selectiva.\n\nDescartamos la A: Es reversible, pero su selectividad es por la MAO-A; no inhibe las dos isoenzimas por igual.\nDescartamos la B: La inhibición irreversible no selectiva es la del grupo frente al que se compara la moclobemida, que es reversible y selectiva.\nDescartamos la D: Los apuntes (§5.2) sitúan a la moclobemida como reversible y preferente de MAO-A; la inhibición irreversible es la de las propargilaminas, con la selegilina como ejemplo de MAO-B.\n\nReferencia: Apuntes §5.2; clase 2."
  },
  {
    id: "t04-m2-q03",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P3 (SAR del sumatriptán: sustituyente de C-5 y N,N-dimetilación frente a la MAO)",
    question: "En el diseño del sumatriptán a partir de la serotonina se estudió el efecto de los sustituyentes del indol. Elige la afirmación correcta sobre la relación estructura-actividad.",
    questionStructures: [{ name: "Sumatriptán", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1" }],
    options: [
      { text: "El sustituyente de C-5 es prescindible para la actividad, y la dimetilación del N terminal no modifica el reconocimiento por la MAO" },
      { text: "El N indólico y la cadena etilamínica de C-3 son prescindibles, y el sustituyente de C-5 basta para la afinidad y la selectividad" },
      { text: "El sustituyente de C-5 contribuye a la afinidad, y la dimetilación del N terminal protege del metabolismo por la MAO de forma completa" },
      { text: "El sustituyente de C-5 aporta afinidad y selectividad, y la dimetilación reduce, sin bloquear del todo, el reconocimiento por la MAO" },
    ],
    correctIndex: 3,
    explanation: "Vemos que el farmacóforo triptánico conserva el N indólico, una cadena etilamínica básica en C-3 y un sustituyente en C-5 que contribuye a la afinidad y la selectividad. La N,N-dimetilación de la amina terminal modifica el reconocimiento metabólico por la MAO, pero no es una protección absoluta frente al metabolismo.\n\nDescartamos la A: El sustituyente de C-5 contribuye a la afinidad y la selectividad, no es prescindible, y la dimetilación sí modifica el reconocimiento por la MAO.\nDescartamos la B: El farmacóforo triptánico conserva el N indólico y la cadena etilamínica básica en C-3; no basta con el sustituyente de C-5.\nDescartamos la C: La N,N-dimetilación no debe describirse como una protección absoluta frente a la MAO: reduce el reconocimiento, sin bloquearlo del todo.\n\nReferencia: Apuntes §6.1 (farmacóforo triptánico y sumatriptán); clase 2 y clase 3."
  },
  {
    id: "t04-m2-q04",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P4 (Sustituyentes más lipófilos o cíclicos y absorción oral de los triptanes posteriores)",
    question: "La absorción oral mejora en los triptanes posteriores al sumatriptán. Indica qué cambio estructural lo explica.",
    questionStructures: [{ name: "Sumatriptán", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1" }, { name: "Almotriptán", smiles: "CN(C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12" }],
    options: [
      { text: "Sustituyentes en C-5 más polares, con más grupos donadores de enlace de hidrógeno, que facilitan el paso por la mucosa intestinal" },
      { text: "Una amina primaria terminal en lugar de la terciaria, que escapa a la MAO y mejora la absorción en el intestino delgado" },
      { text: "La pérdida del N indólico, que reduce la polaridad del núcleo y evita la desaminación oxidativa por la MAO intestinal" },
      { text: "Sustituyentes más lipófilos o grupos cíclicos en C-5, que modifican la absorción y las propiedades farmacocinéticas" },
    ],
    correctIndex: 3,
    explanation: "Observamos que la optimización de los triptanes posteriores exploró sustituyentes más lipófilos o grupos cíclicos, con el fin de modificar la absorción y las propiedades farmacocinéticas. Basta comparar el sulfonamido N-metilado polar del sumatriptán con la sulfonilpirrolidina cíclica del almotriptán. Las cifras de biodisponibilidad dependen de la fuente y de la presentación: lo que importa es el cambio estructural.\n\nDescartamos la A: Los triptanes posteriores exploraron sustituyentes más lipófilos o cíclicos, no más polares.\nDescartamos la B: La amina primaria es sustrato de la MAO; la N,N-dimetilación es la que reduce ese reconocimiento, y los triptanes conservan la amina terciaria.\nDescartamos la C: El farmacóforo triptánico conserva el N indólico; su pérdida no explica la mejora de absorción.\n\nReferencia: Apuntes §6.1; clase 2."
  },
  {
    id: "t04-m2-q05",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P5 (Amitriptilina frente a imipramina: carbono sp² exocíclico)",
    question: "La amitriptilina y la imipramina comparten el esqueleto tricíclico 6-7-6 con una cadena de tres carbonos y dimetilamina. Indica la diferencia estructural que las distingue.",
    questionStructures: [{ name: "Imipramina", smiles: "CN(C)CCCN1c2ccccc2CCc2ccccc21" }, { name: "Amitriptilina", smiles: "CN(C)CCC=C1c2ccccc2CCc2ccccc21" }],
    options: [
      { text: "En la amitriptilina se conserva el N del anillo central y se añade un doble enlace C10=C11 en el puente etileno de ese anillo" },
      { text: "En la amitriptilina el N del anillo central se sustituye por un carbono sp³ unido por enlace sencillo a la cadena de tres carbonos con amina" },
      { text: "En la amitriptilina el N del anillo central se sustituye por un carbono sp² unido por doble enlace exocíclico (metilideno) a la cadena" },
      { text: "En la amitriptilina se conserva el N del anillo central y el puente etileno se oxida a carbonilo C10=O, con amina secundaria en la cadena" },
    ],
    correctIndex: 2,
    explanation: "Vemos que en la amitriptilina el N del anillo central de la imipramina es reemplazado por un carbono sp² (metilideno, =CH–CH₂CH₂NMe₂): el doble enlace es exocíclico al anillo de siete miembros. El puente etileno C10–C11 permanece saturado. La opción con carbono sp³ pierde ese doble enlace, y la que conserva el N con un C10=C11 describe otra estructura.\n\nDescartamos la A: En la amitriptilina el N se sustituye por carbono y el doble enlace es exocíclico, no C10=C11 con el N conservado.\nDescartamos la B: El carbono que sustituye al N es sp² (doble enlace exocíclico), no sp³ con enlace sencillo.\nDescartamos la D: La amitriptilina no lleva carbonilo en el puente etileno ni amina secundaria; mantiene la dimetilamina terciaria.\n\nReferencia: Apuntes §4.2 (tabla y figura 7); clase 1."
  },
  {
    id: "t04-m2-q06",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P6 (Fischer: arilhidrazina y 4-oxobutanonitrilo para el indol-3-acetonitrilo del sumatriptán)",
    question: "El indol-3-acetonitrilo de la síntesis del sumatriptán se obtiene por reacción de Fischer (HCl, Δ, –NH₃) a partir de una arilhidrazina y un compuesto carbonílico. Marca la pareja de reactivos de partida que necesitas.",
    questionStructures: [{ name: "Indol-3-acetonitrilo (intermedio del sumatriptán)", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CC#N)c2c1" }],
    options: [
      { text: "Estructura A", smiles: "NNc1cccc(CS(=O)(=O)NC)c1.O=CCCC#N", revealedName: "3-Hidrazino (meta) con 4-oxobutanonitrilo (daría mezcla 4-/6-sustituida)" },
      { text: "Estructura B", smiles: "NNc1ccc(CS(=O)(=O)NC)cc1.O=CCCC#N", revealedName: "4-Hidrazino-N-metilbencenometanosulfonamida y 4-oxobutanonitrilo" },
      { text: "Estructura C", smiles: "NNc1ccc(CS(=O)(=O)NC)cc1.O=CCC#N", revealedName: "Misma arilhidrazina con 3-oxopropanonitrilo (daría el indol-3-carbonitrilo)" },
      { text: "Estructura D", smiles: "NNc1ccc(CS(=O)(=O)NC)cc1.CC(=O)CCC#N", revealedName: "Misma arilhidrazina con 4-oxopentanonitrilo (cetona; daría el 2-metilindol)" },
    ],
    correctIndex: 1,
    explanation: "Vemos que el N1 del indol procede del Nα de la arilhidrazina y que el carbono que forma el enlace C–C es el orto a ese N, de modo que el sustituyente del C5 del indol (para respecto al C7a) debe ir en para de la hidrazina. El carbonilo fija R₁ y R₂: el CHO aporta C2 y su CH₂ vecino aporta C3 con su sustituyente CH₂CN, es decir, OHC–CH₂CH₂–CN (4-oxobutanonitrilo).\n\nDescartamos la A: Con el sustituyente en meta la ciclación en cualquiera de los dos orto posibles da un indol 4- o 6-sustituido, no 5-sustituido.\nDescartamos la C: Con OHC–CH₂–CN el sustituyente de C3 sería el propio CN y se obtendría el indol-3-carbonitrilo, no el indol-3-acetonitrilo.\nDescartamos la D: Una cetona fija un sustituyente en C2 (CH₃): se obtendría el 2-metilindol y no el indol con C2 sin sustituir.\n\nReferencia: Apuntes §7.2 (figura 12); clase 3."
  },
  {
    id: "t04-m2-q07",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P7 (Condiciones de la síntesis de Fischer: catálisis ácida y calor)",
    question: "Elige la afirmación correcta sobre las condiciones de la síntesis de indoles de Fischer.",
    options: [
      { text: "Exige una base fuerte y calor (NaNH₂, EtONa): la enhidrazina se forma por desprotonación y sufre después la transposición [3,3]" },
      { text: "Exige catálisis ácida y calor: la hidrazona tautomeriza a enhidrazina, que sufre la transposición sigmatrópica [3,3] y cicla" },
      { text: "Transcurre a temperatura ambiente sin catalizador, pues la transposición sigmatrópica [3,3] no necesita medio ácido ni calor" },
      { text: "Exige un oxidante en medio neutro, que convierte la hidrazona en enhidrazina y cierra el anillo de cinco miembros del indol" },
    ],
    correctIndex: 1,
    explanation: "Observamos que la síntesis de Fischer convierte una arilhidrazina y un compuesto carbonílico en un indol, normalmente bajo condiciones ácidas y con calentamiento. La hidrazona (formada con pérdida de H₂O) adopta la forma enhidrazina bajo catálisis ácida, sufre la transposición [3,3] y cicla con pérdida de NH₃.\n\nDescartamos la A: La tautomerización a enhidrazina se produce bajo catálisis ácida, no básica; las bases de este tema (NaNH₂, EtONa) son las de la síntesis de la imipramina.\nDescartamos la C: La reacción se realiza normalmente con catálisis ácida y calentamiento; sin ellos no se forma la enhidrazina ni se produce la transposición.\nDescartamos la D: No hay etapa oxidante: el balance es una condensación (–H₂O) y una pérdida de NH₃, con catálisis ácida.\n\nReferencia: Apuntes §7.1; clase 2."
  },
  {
    id: "t04-m2-q08",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P8 (Anilina del sumatriptán a arilhidrazina: HNO₂ y SnCl₂ (estructura))",
    question: "Se trata la 4-amino-N-metilbencenometanosulfonamida con 1) NaNO₂/HCl y 2) SnCl₂. Marca la estructura del producto de esta secuencia, que se usa después en la reacción de Fischer.",
    questionStructures: [{ name: "4-Amino-N-metilbencenometanosulfonamida", smiles: "CNS(=O)(=O)Cc1ccc(N)cc1" }],
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc(NN)cc1", revealedName: "4-Hidrazino-N-metilbencenometanosulfonamida (arilhidrazina)" },
      { text: "Estructura B", smiles: "CNS(=O)(=O)Cc1ccc([N+](=O)[O-])cc1", revealedName: "Nitroareno (sobreoxidación de la anilina)" },
      { text: "Estructura C", smiles: "CNS(=O)(=O)Cc1ccc([N+]#N)cc1", revealedName: "Sal de diazonio (intermedio, sin reducir)" },
      { text: "Estructura D", smiles: "CNS(=O)(=O)Cc1ccc(O)cc1", revealedName: "Fenol (hidrólisis del diazonio)" },
    ],
    correctIndex: 0,
    explanation: "Vemos dos etapas. El HNO₂ generado en el medio (NaNO₂ + HCl) convierte la amina aromática en la sal de diazonio (Ar–N₂⁺). El SnCl₂ reduce el diazonio al grupo hidrazino (Ar–NH–NH₂). Esa arilhidrazina es la que condensa con el carbonilo en la síntesis de Fischer.\n\nDescartamos la B: Ni HNO₂ ni SnCl₂ oxidan la anilina a nitro; la secuencia transforma el NH₂ en N₂⁺ y luego en NHNH₂ (reducción).\nDescartamos la C: Es el intermedio tras el paso 1; el SnCl₂ del paso 2 lo reduce, de modo que no es el producto final de la secuencia.\nDescartamos la D: El fenol aparecería por hidrólisis del diazonio en agua caliente; con SnCl₂ presente se reduce el diazonio, no se hidroliza.\n\nReferencia: Apuntes §7.2 (figura 12); clase 3."
  },
  {
    id: "t04-m2-q09",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P9 (Fischer con un aldehído R–CH₂–CHO: origen de C2 y C3)",
    question: "Una arilhidrazina condensa con un aldehído R–CH₂–CHO y se calienta la hidrazona con HCl (síntesis de Fischer). Indica qué indol se forma y cómo se distribuyen los átomos del aldehído.",
    options: [
      { text: "N-alquilindol: el grupo CH₂R se une al N1, y C2 y C3 quedan sin sustituir en el anillo pirrólico." },
      { text: "Indol 2-sustituido: el CH₂ vecino al CHO se une al anillo en C3 y el formilo pasa a C2, que lleva el grupo R." },
      { text: "Indol 3-sustituido: el CHO aporta C3, su CH₂ vecino aporta C2 y el grupo R migra hasta el N1 en la ciclación." },
      { text: "Indol 3-sustituido: el CHO aporta C2, su CH₂ vecino aporta C3 y el grupo R queda como sustituyente de C3." },
    ],
    correctIndex: 3,
    explanation: "Observamos que el CHO de la hidrazona es el carbono C=N, que pasa a ser C2 del indol. El CH₂ en α es el carbono de la enhidrazina que forma el enlace C–C con el anillo y es C3, con su sustituyente R. Tras la [3,3] y la pérdida de NH₃ queda un indol 3-sustituido con C2 sin sustituir (en la síntesis del sumatriptán, R = CH₂CN).\n\nDescartamos la A: No hay alquilación del N: el N1 es el Nα de la hidrazina y la cadena queda unida al carbono C3 del anillo.\nDescartamos la B: Invierte el origen de C2 y C3: el carbono formilo es C2 y el vecino, con el grupo R, es C3.\nDescartamos la C: Invierte el origen de C2 y C3 y supone una migración de R al N que no ocurre en la reacción.\n\nReferencia: Apuntes §7.1-7.2; clase 2 y clase 3."
  },
  {
    id: "t04-m2-q10",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P10 (Del nitrilo a la amina primaria y N,N-dimetilación con HCHO/NaBH₃CN (iminio, control frente a la alquilación directa))",
    question: "Se convierte el 5-(N-metilsulfamoilmetil)indol-3-acetonitrilo en sumatriptán con H₂ y catalizador y, después, con exceso de HCHO y NaBH₃CN. Indica qué ocurre en estas etapas.",
    questionStructures: [{ name: "Indol-3-acetonitrilo", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CC#N)c2c1" }],
    options: [
      { text: "H₂ reduce C≡N a CH₂NH₂; el HCHO metila el N por alquilación directa, y la reacción continúa hasta sales de amonio cuaternario" },
      { text: "H₂ reduce C≡N a CH₂NH₂; el HCHO y el hidruro dan una N-metilamina secundaria, y la reacción se detiene ahí por completo" },
      { text: "H₂ reduce C≡N a CH₂NH₂; el HCHO forma un iminio (–H₂O) que el NaBH₃CN reduce, y la reacción se detiene en la amina terciaria" },
      { text: "H₂ reduce C≡N a CH₂NH₂; el NaBH₃CN desplaza el OH del hemiaminal por SN2, sin formar un ion iminio como intermedio" },
    ],
    correctIndex: 2,
    explanation: "Vemos tres cosas. Primera, la hidrogenación catalítica reduce el nitrilo a la amina primaria sin perder carbonos. Segunda, la amina ataca al HCHO y tras perder H₂O da el ion iminio; el hidruro reduce el iminio y queda la N-metilamina. Tercera, el exceso de HCHO repite el ciclo sobre la amina secundaria y la reacción se detiene en la amina terciaria R–N(CH₃)₂, el sumatriptán. Por eso la aminación reductora controla mejor la N-alquilación que el haluro de alquilo en exceso, que da mezclas y sales cuaternarias.\n\nDescartamos la A: La alquilación directa con haluros es la que da mezclas de grados de alquilación y sales cuaternarias; con HCHO y NaBH₃CN la reacción se detiene en la terciaria.\nDescartamos la B: La amina secundaria sigue siendo nucleófila y, con exceso de HCHO, forma un segundo iminio; la reacción llega a la amina terciaria.\nDescartamos la D: El hidruro no desplaza un grupo saliente por SN2; reduce el enlace C=N⁺ del ion iminio por adición nucleófila.\n\nReferencia: Apuntes §7.2-7.3 (figura 12); clase 3."
  },
  {
    id: "t04-m2-q11",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P11 (MAO-A frente a MAO-B: sustratos preferentes)",
    question: "Elige la afirmación correcta sobre la especificidad de sustrato de las isoenzimas de la monoaminooxidasa.",
    options: [
      { text: "MAO-A oxida preferentemente serotonina y noradrenalina; MAO-B, feniletilamina; la dopamina y la tiramina son sustratos solo de la MAO-B" },
      { text: "MAO-A prefiere feniletilamina y bencilamina; MAO-B, serotonina y noradrenalina; dopamina y tiramina son sustratos de ambas" },
      { text: "MAO-A prefiere serotonina y noradrenalina; MAO-B, feniletilamina y bencilamina; dopamina y tiramina son sustratos de ambas" },
      { text: "MAO-A y MAO-B oxidan la serotonina con igual eficacia, y la selectividad depende de su localización mitocondrial y no del sustrato" },
    ],
    correctIndex: 2,
    explanation: "Observamos que ambas son flavoenzimas (FAD) de la membrana mitocondrial externa. La MAO-A prefiere serotonina y noradrenalina (de ahí que los antidepresivos sean iMAO-A); la MAO-B prefiere feniletilamina y bencilamina. Dopamina y tiramina se oxidan por las dos isoformas.\n\nDescartamos la A: La dopamina y la tiramina son sustratos de ambas isoformas; atribuirlas solo a la MAO-B reproduce un error del borrador.\nDescartamos la B: Intercambia los sustratos preferentes de las dos isoenzimas.\nDescartamos la D: Las isoenzimas difieren en sustrato preferente: la serotonina es sustrato preferente de MAO-A.\n\nReferencia: Apuntes §5.1; clase 2."
  },
  {
    id: "t04-m2-q12",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P12 (Efecto queso: tiramina e IMAO irreversibles)",
    question: "Un paciente tratado con un IMAO irreversible come queso curado y sufre una crisis hipertensiva. Indica qué mecanismo lo explica.",
    options: [
      { text: "La tiramina no se degrada en intestino e hígado, llega a la circulación y libera noradrenalina de las terminaciones simpáticas" },
      { text: "La tiramina desplaza al IMAO de la MAO por competición, regenera la enzima y provoca una liberación masiva de dopamina vascular" },
      { text: "La MAO-A inhibida acumula serotonina, que activa receptores 5-HT3 vasculares y desencadena la vasoconstricción y la hipertensión" },
      { text: "La tiramina se descarboxila a tirosina en el hígado, que las plaquetas captan y liberan después en forma de adrenalina circulante" },
    ],
    correctIndex: 0,
    explanation: "Vemos que la tiramina de quesos curados, embutidos y vino se desamina normalmente por la MAO de la pared intestinal y del hígado. Con un IMAO irreversible no se degrada, pasa a la circulación y libera noradrenalina: crisis hipertensiva.\n\nDescartamos la B: Describe el desplazamiento de un inhibidor reversible (RIMA); un IMAO irreversible no se desplaza.\nDescartamos la C: Atribuye la crisis a la serotonina y a 5-HT3, que no median la respuesta presora a la tiramina.\nDescartamos la D: Invierte la ruta: la tiramina procede de la descarboxilación de la tirosina, no al revés.\n\nReferencia: Apuntes §5.3; clase 2."
  },
  {
    id: "t04-m2-q13",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P13 (Ejemplo docente de inhibidor de MAO-B: selegilina)",
    question: "Entre los inhibidores de la monoaminooxidasa estudiados, indica cuál es el ejemplo docente asociado principalmente a la MAO-B.",
    options: [
      { text: "Iproniazida" },
      { text: "Selegilina" },
      { text: "Moclobemida" },
      { text: "Isoniazida" },
    ],
    correctIndex: 1,
    explanation: "Observamos que la selegilina es una propargilamina de inhibición irreversible y el ejemplo docente asociado principalmente a la MAO-B. La moclobemida es el inhibidor reversible y preferente de la MAO-A (RIMA); la iproniazida es una hidrazina derivada de la isoniazida, y esta última es el antituberculoso del que parte la historia.\n\nDescartamos la A: La iproniazida es una hidrazina de la primera etapa de los inhibidores; su toxicidad hepática limitó su desarrollo.\nDescartamos la C: La moclobemida es un inhibidor reversible y preferente de la MAO-A, no de la MAO-B.\nDescartamos la D: La isoniazida es el antituberculoso cuyo efecto sobre el ánimo despertó el interés por los derivados; no es el ejemplo de MAO-B.\n\nReferencia: Apuntes §5.2; clase 2."
  },
  {
    id: "t04-m2-q14",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P14 (Propargilamina: unión covalente a la MAO y recuperación con enzima nueva)",
    question: "Un inhibidor de la MAO con grupo propargilamina inactiva la enzima. Indica cómo la inhibe y cuándo se recupera la actividad enzimática.",
    options: [
      { text: "Forma un aducto covalente con la enzima; la actividad solo vuelve con la síntesis de MAO nueva, un proceso lento" },
      { text: "Forma un aducto covalente con la enzima, pero este se hidroliza y la actividad vuelve en pocas horas sin enzima nueva" },
      { text: "Compite de forma reversible con el sustrato por el sitio activo; la actividad se recupera al eliminarse el fármaco" },
      { text: "Se une al hemo de la MAO y el glutatión regenera la enzima en pocas horas, al reducir el metal del centro catalítico" },
    ],
    correctIndex: 0,
    explanation: "Vemos que algunas propargilaminas se unen de manera covalente a la MAO y la inactivan. La enzima inactivada no se regenera: la actividad no se recupera hasta que se sintetiza nueva MAO. La MAO es una flavoenzima dependiente de FAD, no una hemoproteína.\n\nDescartamos la B: El aducto con la enzima no se hidroliza: la recuperación exige síntesis de enzima nueva, no horas.\nDescartamos la C: Describe una inhibición reversible; la propargilamina inactiva la enzima de forma covalente.\nDescartamos la D: La MAO es una flavoenzima (FAD), no una hemoproteína, y el glutatión no regenera la enzima inactivada.\n\nReferencia: Apuntes §5.2; clase 2."
  },
  {
    id: "t04-m2-q15",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P15 (Mecanismo antimigrañoso de los triptanes: 5-HT1B vasoconstricción craneal y 5-HT1D transmisión trigeminal)",
    question: "Indica qué mecanismo explica la acción antimigrañosa de los triptanes y por qué hay que considerar el riesgo vascular al usarlos.",
    options: [
      { text: "Vía 5-HT1D contraen los vasos craneales y vía 5-HT1B reducen la transmisión trigeminal; la vasoconstricción obliga a considerar el riesgo vascular" },
      { text: "Activan el canal 5-HT3 de las terminaciones trigeminales y dilatan los vasos craneales; su riesgo vascular procede de la vasodilatación que inducen" },
      { text: "Antagonizan receptores 5-HT2 de los vasos craneales y reducen la transmisión trigeminal; su riesgo vascular procede de la vasodilatación que inducen" },
      { text: "Vía 5-HT1B contraen los vasos craneales y vía 5-HT1D reducen la transmisión trigeminal; la vasoconstricción obliga a considerar el riesgo vascular" },
    ],
    correctIndex: 3,
    explanation: "Observamos que los triptanes son agonistas de receptores 5-HT1B/1D y se usan en el tratamiento agudo de la migraña. La activación 5-HT1B puede producir vasoconstricción en vasos craneales; la activación 5-HT1D reduce la transmisión trigeminal y la liberación de mediadores de la señal dolorosa. Esa vasoconstricción explica la utilidad y también la necesidad de considerar el riesgo vascular.\n\nDescartamos la A: Permuta los subtipos: la vasoconstricción craneal se asigna al 5-HT1B y la reducción de la transmisión trigeminal al 5-HT1D.\nDescartamos la B: El 5-HT3 es un canal catiónico diana de antieméticos; los triptanes actúan sobre 5-HT1B/1D y contraen vasos, no los dilatan.\nDescartamos la C: Los triptanes son agonistas 5-HT1B/1D, no antagonistas 5-HT2, y su riesgo procede de la vasoconstricción.\n\nReferencia: Apuntes §6.1; clase 2."
  }
];

// MODELO 3: Modelo 3 · Azapironas, setrones, ejercicios 4.4 y 4.7 y reconocimiento estructural
// Clave: A, A, D, D, B, D, B, D, C, B, B, A, C, A, C
export const TEMA4_MODELO_3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t04-m3-q01",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P1 (Azapironas: buspirona, agonista parcial 5-HT1A)",
    question: "La buspirona es el prototipo de las azapironas, ansiolíticos sin sedación. Elige la descripción correcta de su estructura y su mecanismo.",
    questionStructures: [{ name: "Buspirona", smiles: "O=C1CC2(CCCC2)CC(=O)N1CCCCN1CCN(c2ncccn2)CC1" }],
    options: [
      { text: "Pirimidinilpiperazina unida por un puente de cuatro carbonos a una imida; es agonista parcial del receptor 5-HT1A" },
      { text: "Pirimidinilpiperazina unida por un puente de dos carbonos a una imida; es agonista pleno del receptor 5-HT2A" },
      { text: "Fenilpiperazina unida por una cadena de seis carbonos a una lactama; es antagonista del receptor 5-HT1A" },
      { text: "Pirimidinilpiperazina unida a una amida sin imida por puente de cuatro carbonos; inhibe la recaptación de serotonina" },
    ],
    correctIndex: 0,
    explanation: "Vemos que las azapironas unen una pirimidinilpiperazina a una imida (en la buspirona, una imida cíclica espirocíclica con dos C=O) mediante un puente de cuatro carbonos, y actúan como agonistas parciales 5-HT1A. Los distractores cambian la longitud del puente, la diana o el tipo de grupo.\n\nDescartamos la B: El puente es de cuatro carbonos, no de dos, y el receptor es 5-HT1A, no 5-HT2A; el agonismo es parcial, no pleno.\nDescartamos la C: El arilo es pirimidinilo, el puente tiene cuatro carbonos y el compuesto es agonista, no antagonista, de 5-HT1A.\nDescartamos la D: La buspirona conserva las dos C=O de la imida y actúa sobre el receptor 5-HT1A, no sobre el transportador SERT.\n\nReferencia: Apuntes §6.2 (figura 11); clase 3."
  },
  {
    id: "t04-m3-q02",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P2 (8-OH-DPAT: derivado aminotetralínico, agonista 5-HT1A de investigación básica)",
    question: "El 8-OH-DPAT es un derivado aminotetralínico que se relaciona con el receptor 5-HT1A. Elige la afirmación correcta sobre su perfil.",
    questionStructures: [{ name: "8-OH-DPAT (sin estereoquímica)", smiles: "CCCN(CCC)C1CCc2cccc(O)c2C1" }],
    options: [
      { text: "Es un agonista del receptor 5-HT1A que se emplea en investigación básica y no se utiliza como fármaco ansiolítico" },
      { text: "Es un agonista del receptor 5-HT1A, comercializado como ansiolítico y empleado con frecuencia en la clínica humana" },
      { text: "Es un antagonista del receptor 5-HT1A que se emplea en investigación básica y no se utiliza como fármaco ansiolítico" },
      { text: "Es un agonista del canal iónico 5-HT3 con acción antiemética, derivado de una feniletilamina sin núcleo de tetralina" },
    ],
    correctIndex: 0,
    explanation: "Observamos que el 8-OH-DPAT es un derivado aminotetralínico y un agonista del receptor 5-HT1A cuyo uso se limita a la investigación básica; no es un ansiolítico comercializado como la buspirona. El 5-HT3 es un canal iónico diana de los antieméticos (antagonistas), no de este compuesto.\n\nDescartamos la B: No se comercializa: su uso queda en la investigación básica; el ansiolítico aprobado de la familia 5-HT1A es la buspirona.\nDescartamos la C: Es un agonista, no un antagonista, del receptor 5-HT1A.\nDescartamos la D: El 5-HT3 es un canal iónico cuyos antagonistas son antieméticos; el 8-OH-DPAT actúa sobre 5-HT1A y lleva un núcleo de tetralina.\n\nReferencia: Apuntes §6.2; clase 3 (8-OH-DPAT solo figura en la clase)."
  },
  {
    id: "t04-m3-q03",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P3 (Origen de los setrones desde la cocaína: tropisetrón)",
    question: "La cocaína fue el punto de partida conceptual de los antagonistas del canal 5-HT3: a partir de su actividad se ensayaron ésteres y amidas del tropano con ácidos aromáticos. Marca la estructura del antagonista tropisetrón.",
    questionStructures: [{ name: "Cocaína", smiles: "CN1[C@H]2CC[C@@H]1[C@H]([C@H](C2)OC(=O)C3=CC=CC=C3)C(=O)OC" }],
    options: [
      { text: "Estructura A", smiles: "CN1[C@@H]2CC[C@H]1C[C@H](C2)OC(=O)c1ccccc1", revealedName: "Benzoato de tropina (cocaína sin CO₂Me)" },
      { text: "Estructura B", smiles: "CN1[C@H]2CC[C@@H]1[C@H]([C@H](C2)OC(=O)c3c[nH]c4ccccc34)C(=O)OC", revealedName: "Éster indol-3-carboxílico con CO₂Me de la cocaína (no es tropisetrón)" },
      { text: "Estructura C", smiles: "CN1[C@@H]2CC[C@H]1C[C@H](C2)NC(=O)c1c[nH]c2ccccc12", revealedName: "Indol-3-carboxamida del 3-aminotropano (amida)" },
      { text: "Estructura D", smiles: "CN1[C@@H]2CC[C@H]1C[C@H](C2)OC(=O)c1c[nH]c2ccccc12", revealedName: "Tropisetrón" },
    ],
    correctIndex: 3,
    explanation: "Vemos que el tropisetrón conserva el esqueleto de tropano de la cocaína, pero cambia el ácido (indol-3-carboxílico en lugar de benzoico) y elimina el CO₂Me del C-2. Es un éster de la tropina, no una amida. Las demás estructuras conservan el CO₂Me, el benzoato o el enlace amida.\n\nDescartamos la A: Es el benzoato de tropina: sin CO₂Me, pero con ácido benzoico, no indol-3-carboxílico.\nDescartamos la B: Conserva el CO₂Me del C-2 de la cocaína, que el tropisetrón no lleva.\nDescartamos la C: Une el indol por enlace amida a un 3-aminotropano; el tropisetrón es un éster de la tropina.\n\nReferencia: Apuntes §8 (figura 13); clase 3."
  },
  {
    id: "t04-m3-q04",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P4 (Granisetrón: sistema granatánico unido a un indazol)",
    question: "El granisetrón es un antagonista del canal 5-HT3 con utilidad antiemética. Elige la descripción correcta de su estructura.",
    questionStructures: [{ name: "Granisetrón", smiles: "CN1[C@@H]2CCC[C@H]1C[C@H](C2)NC(=O)c1nn(C)c2ccccc12" }],
    options: [
      { text: "Un sistema granatánico unido a un indol por un enlace amida con el ácido carboxílico aromático correspondiente" },
      { text: "Un sistema tropánico, como el de la cocaína, unido a un indazol por un enlace amida con el ácido carboxílico" },
      { text: "Un sistema granatánico unido a un indazol por un enlace éster con el ácido carboxílico aromático correspondiente a él" },
      { text: "Un sistema granatánico unido a un indazol por un enlace amida con el ácido carboxílico aromático correspondiente" },
    ],
    correctIndex: 3,
    explanation: "Observamos que el granisetrón es un sistema granatánico unido a un grupo indazol por un enlace amida, un esqueleto distinto del tropánico de la cocaína y del tropisetrón. Los distractores cambian el biciclo, el heterociclo aromático o el tipo de enlace.\n\nDescartamos la A: El heterociclo aromático es un indazol, no un indol (el indol corresponde al tropisetrón).\nDescartamos la B: El granisetrón lleva un sistema granatánico, no el tropano de la cocaína.\nDescartamos la C: El enlace del granisetrón es una amida, no un éster.\n\nReferencia: Apuntes §8 (tabla y figura 13); clase 3."
  },
  {
    id: "t04-m3-q05",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P5 (Reconocimiento estructural del sumatriptán: posición C-5 de la sulfonamida en el indol)",
    question: "En el indol, la numeración parte del N-1, recorre C-2 y C-3, salta el carbono de fusión y continúa C-4, C-5, C-6 y C-7. El sumatriptán es un triptán con una cadena dimetilaminoetilo en C-3 y una sulfonamida en el anillo bencénico. Marca la estructura del sumatriptán.",
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc2c(CCN(C)C)c[nH]c2c1", revealedName: "Isómero con la sulfonamida en C-6" },
      { text: "Estructura B", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1", revealedName: "Sumatriptán (sulfonamida en C-5)" },
      { text: "Estructura C", smiles: "CNS(=O)(=O)Cc1cccc2[nH]cc(CCN(C)C)c12", revealedName: "Isómero con la sulfonamida en C-4" },
      { text: "Estructura D", smiles: "CNS(=O)(=O)Cc1cccc2c(CCN(C)C)c[nH]c12", revealedName: "Isómero con la sulfonamida en C-7" },
    ],
    correctIndex: 1,
    explanation: "Vemos que el sumatriptán lleva la sulfonamida (CH₂SO₂NHCH₃) en C-5 del indol. Para localizarla se parte del N-1, se pasa por C-2 y C-3, se salta el carbono de fusión C-3a y se cuenta C-4, C-5. Los otros isómeros conservan la cadena en C-3 y la misma sulfonamida, pero la sitúan en C-4, C-6 o C-7.\n\nDescartamos la A: La sulfonamida está en C-6 (una posición más allá de C-5); no es el sumatriptán.\nDescartamos la C: La sulfonamida está en C-4, junto al carbono de fusión C-3a; no es el sumatriptán.\nDescartamos la D: La sulfonamida está en C-7, junto al carbono de fusión C-7a y al N-1; no es el sumatriptán.\n\nReferencia: Apuntes §6.1 (figura 10); clase 3."
  },
  {
    id: "t04-m3-q06",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P6 (Ejercicio 4.4: ciclación intramolecular con H₃PO₄ para dar la cetona tricíclica)",
    question: "Calentamos el ácido 2-(2-feniletil)benzoico con H₃PO₄, primera etapa de la síntesis de la ciproheptadina. Marca la estructura que se obtiene.",
    questionStructures: [{ name: "Ácido 2-(2-feniletil)benzoico", smiles: "OC(=O)c1ccccc1CCc1ccccc1" }],
    options: [
      { text: "Estructura A", smiles: "OC1c2ccccc2CCc2ccccc21", revealedName: "Dibenzosuberol (alcohol, reducción del C=O)" },
      { text: "Estructura B", smiles: "O=C1OC(c2ccccc2)Cc2ccccc21", revealedName: "3-Fenilisocroman-1-ona (lactona, oxidación bencílica)" },
      { text: "Estructura C", smiles: "O=Cc1ccccc1CCc1ccccc1", revealedName: "2-(2-Feniletil)benzaldehído (reducción del ácido)" },
      { text: "Estructura D", smiles: "O=C1c2ccccc2CCc2ccccc21", revealedName: "Dibenzosuberona" },
    ],
    correctIndex: 3,
    explanation: "Observamos que el H₃PO₄ activa el ácido carboxílico como acilio (o anhídrido mixto fosfórico). El segundo anillo, nucleófilo, ataca al acilio en orto al puente etileno por sustitución electrófila aromática intramolecular (acilación de Friedel–Crafts) y cierra un anillo de siete miembros: la dibenzosuberona (10,11-dihidro-5H-dibenzo[a,d]cicloheptenona), con pérdida de H₂O.\n\nDescartamos la A: Un alcohol exigiría un reductor (un hidruro como LiAlH₄); el H₃PO₄ es un ácido deshidratante y deja el C=O.\nDescartamos la B: Una lactona exigiría oxidar el CH₂ bencílico, lo que no hace el H₃PO₄; el segundo anillo aromático es el nucleófilo que cierra el ciclo.\nDescartamos la C: El H₃PO₄ no reduce el ácido a aldehído; la reacción deshidrata y cicla, y no cambia el estado de oxidación del carbono carboxílico.\n\nReferencia: Apuntes §9.2 (figura 14); clase 3."
  },
  {
    id: "t04-m3-q07",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P7 (Ejercicio 4.4: bromación bencílica con NBS y eliminación E2 con Et₃N)",
    question: "La dibenzosuberona pasa a dibenzosuberenona con NBS y, después, con Et₃N. Indica qué mecanismo opera en cada etapa.",
    questionStructures: [{ name: "Dibenzosuberona", smiles: "O=C1c2ccccc2CCc2ccccc21" }],
    options: [
      { text: "NBS bromó el carbono α al C=O por vía de enol, y la base Et₃N eliminó HBr por E1 vía carbocatión." },
      { text: "NBS bromó el CH₂ bencílico por radicales, y la base Et₃N eliminó HBr por E2 para formar el CH=CH." },
      { text: "NBS bromó un carbono del anillo por SEAr, y la base Et₃N eliminó HBr del anillo para dar un arino." },
      { text: "NBS bromó el CH₂ bencílico por radicales, y la amina Et₃N sustituyó al Br por SN2 dando la sal de amonio." },
    ],
    correctIndex: 1,
    explanation: "Vemos que los CH₂ del puente son bencílicos y el enlace C–H bencílico es débil, de modo que NBS (baja concentración de Br₂, iniciador radicalario) bromó selectivamente esa posición y dio la 10-bromodibenzosuberona. A continuación, Et₃N actúa como base, no como nucleófilo: arranca el H vecino y expulsa Br⁻ en un solo paso concertado (E2) que crea el doble enlace C10=C11, conjugado con los dos anillos.\n\nDescartamos la A: La dibenzosuberona no tiene H en α al C=O (sus vecinos son carbonos aromáticos); la bromación es bencílica y la eliminación con Et₃N es E2.\nDescartamos la C: NBS en condiciones radicalarias no bromó el anillo; y una eliminación del anillo con Et₃N no es plausible: la eliminación forma el alqueno del puente.\nDescartamos la D: Et₃N es una base que elimina HBr; la sustitución SN2 por la amina sobre un bromuro secundario bencílico no conduce a la dibenzosuberenona.\n\nReferencia: Apuntes §9.2 (figura 14); clase 3."
  },
  {
    id: "t04-m3-q08",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P8 (Ejercicio 4.4: Grignard sobre el carbonilo, hidrólisis posterior y deshidratación ácida del alcohol terciario)",
    question: "La dibenzosuberenona reacciona con el reactivo de Grignard de la 4-cloro-1-metilpiperidina (Mg, éter) y el producto se trata con ácido. Indica cómo se forma la ciproheptadina.",
    questionStructures: [{ name: "4-Cloro-1-metilpiperidina", smiles: "CN1CCC(Cl)CC1" }],
    options: [
      { text: "El Grignard se mezcla con H₃O⁺ antes de añadir la cetona y el alcohol resultante se deshidrata con ácido y calor" },
      { text: "El Grignard se adiciona al C=O y da un alcohol terciario; Et₃N lo deshidrata por E2, porque el OH es buen grupo saliente" },
      { text: "El Grignard arranca un H de un CH₂ del puente y da un enolato; el ácido lo protona y se forma el doble enlace exocíclico" },
      { text: "El Grignard se adiciona al C=O y, tras H₃O⁺, da un alcohol terciario; el ácido lo deshidrata y forma el C=C exocíclico" },
    ],
    correctIndex: 3,
    explanation: "Observamos que el magnesiano (R–MgCl, con R = 1-metilpiperidin-4-ilo) es un nucleófilo de carbono que ataca al carbonilo y, tras la hidrólisis posterior, da el alcohol terciario. La presencia de agua o de protones ácidos antes de la adición destruiría el reactivo organomagnesiano, por eso la hidrólisis va después. En medio ácido y con calor se deshidrata el alcohol terciario y se forma el doble enlace exocíclico de la ciproheptadina.\n\nDescartamos la A: El protón ácido destruiría el organomagnesiano; la hidrólisis se hace después de la formación del enlace C–C, no antes.\nDescartamos la B: El OH es mal grupo saliente y no se elimina con una base débil como Et₃N; la deshidratación exige medio ácido y calor.\nDescartamos la C: La dibenzosuberenona no tiene H ácidos para formar un enolato; el Grignard actúa de nucleófilo sobre el C=O y no de base.\n\nReferencia: Apuntes §9.2 (figura 14); clase 3."
  },
  {
    id: "t04-m3-q09",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P9 (Ejercicio 4.7: Fischer con 4-clorobutanal (aldehído funcionalizado) e indol con aminoetilo en C3)",
    question: "La arilhidrazina de la síntesis del almotriptán se condensa con 4-clorobutanal y la hidrazona se calienta en medio ácido (síntesis de Fischer, con pérdida de NH₃). Marca la estructura del indol que se obtiene y que se convierte después en almotriptán por aminación reductora con HCHO.",
    questionStructures: [{ name: "Arilhidrazina del almotriptán", smiles: "NNc1ccc(CS(=O)(=O)N2CCCC2)cc1" }, { name: "4-Clorobutanal", smiles: "O=CCCCCl" }],
    options: [
      { text: "Estructura A", smiles: "NCCc1cc2cc(CS(=O)(=O)N3CCCC3)ccc2[nH]1", revealedName: "2-(2-Aminoetil)indol (regioisómero C2)" },
      { text: "Estructura B", smiles: "CN(C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12", revealedName: "Almotriptán (con NMe₂, etapa posterior)" },
      { text: "Estructura C", smiles: "NCCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12", revealedName: "Triptamina primaria (19)" },
      { text: "Estructura D", smiles: "ClCCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12", revealedName: "3-(2-Cloroetil)indol (sin desplazamiento del Cl)" },
    ],
    correctIndex: 2,
    explanation: "Vemos que el carbonilo del 4-clorobutanal aporta C2 (CHO) y C3 (CH₂ vecino) y que la cadena queda en C3. La síntesis de Fischer con este aldehído funcionalizado da el indol con cadena aminoetilo (la amina primaria 19). Solo una amina primaria puede dimetilarse después por aminación reductora con HCHO para dar el almotriptán.\n\nDescartamos la A: El CH₂ vecino al formilo forma C3; la cadena queda en C3 y no en C2, que procede del propio carbono formilo.\nDescartamos la B: El grupo NMe₂ se introduce después, por aminación reductora con HCHO; el indol que se pide es el precursor con la amina primaria.\nDescartamos la D: Conserva el Cl y no tiene amina que pueda dimetilarse después por aminación reductora; el aldehído funcionalizado conduce al indol con cadena aminoetilo.\n\nReferencia: Apuntes §9.3 (figura 15); clase 3."
  },
  {
    id: "t04-m3-q10",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P10 (Ondansetrón: carbazolona N-metilada unida a 2-metilimidazol por un CH₂)",
    question: "El ondansetrón es un antagonista del canal 5-HT3 de la familia de los setrones. Indica qué componentes se ensamblan en su estructura.",
    options: [
      { text: "Un tetrahidrocarbazol sin carbonilo que se une al 2-metilimidazol mediante un enlace amida" },
      { text: "Una carbazolona N-metilada con un 2-metilimidazol unido por un CH₂ en el carbono vecino al C=O" },
      { text: "Una carbazolona N-metilada que se une a una amina bicíclica de tropano mediante un enlace éster" },
      { text: "Una dibenzosuberona con un 2-metilimidazol unido por un CH₂ en el carbono vecino al C=O" },
    ],
    correctIndex: 1,
    explanation: "Observamos que el ondansetrón conserva el núcleo carbazolónico (con el N metilado y el C=O) y lleva un 2-metilimidazol unido por un CH₂ al carbono contiguo al carbonilo. A diferencia del tropisetrón y del granisetrón, no tiene un sistema bicíclico de amina.\n\nDescartamos la A: La carbazolona conserva su C=O y el imidazol se une por un CH₂, no por una amida.\nDescartamos la C: El ondansetrón no lleva el biciclo de tropano ni enlace éster; ese motivo corresponde al tropisetrón.\nDescartamos la D: La dibenzosuberona es el intermedio de la ciproheptadina; el ondansetrón parte de una carbazolona.\n\nReferencia: Apuntes §8 (tabla y figura 13); clase 3."
  },
  {
    id: "t04-m3-q11",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 3 · P11 (Iproniazida: hidrazida derivada de la isoniazida y toxicidad hepática)",
    question: "La iproniazida abrió el camino a los inhibidores de la monoaminooxidasa. Indica cuál es su origen y qué limitó su desarrollo como antidepresivo.",
    options: [
      { text: "Propargilamina que dio origen a los inhibidores reversibles; su toxicidad hepática limitó su desarrollo como antidepresivo" },
      { text: "Hidrazida derivada de la isoniazida, antituberculosa; su toxicidad hepática limitó su desarrollo como antidepresivo" },
      { text: "Benzamida con cadena de etilendiamina, origen de los tricíclicos; su toxicidad hepática limitó su desarrollo" },
      { text: "Hidrazida derivada de la isoniazida, antituberculosa; su nefrotoxicidad limitó su desarrollo como antidepresivo" },
    ],
    correctIndex: 1,
    explanation: "Vemos que la observación de efectos sobre el ánimo durante el uso de isoniazida en tuberculosis condujo al interés por derivados como la iproniazida, una hidrazida derivada de la isoniazida. Su toxicidad hepática limitó su desarrollo como antidepresivo.\n\nDescartamos la A: La iproniazida es una hidrazida, no una propargilamina, y las propargilaminas no son la base de los inhibidores reversibles.\nDescartamos la C: La iproniazida no es una benzamida ni origen de los tricíclicos; su estructura es la de una hidrazida derivada de la isoniazida.\nDescartamos la D: El origen es correcto, pero lo que limitó a la iproniazida fue la toxicidad hepática, no la nefrotoxicidad.\n\nReferencia: Apuntes §5.2; clase 2."
  },
  {
    id: "t04-m3-q12",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 3 · P12 (ISRS, tricíclicos e IMAO: efecto sobre la 5-HT sináptica)",
    question: "Indica cómo elevan la concentración sináptica de serotonina los ISRS, los antidepresivos tricíclicos y los IMAO.",
    options: [
      { text: "Sin actuar sobre receptores: ISRS y tricíclicos bloquean la recaptación (SERT) e IMAO bloquean su degradación por la MAO" },
      { text: "Activan la triptófano hidroxilasa y aumentan la síntesis de 5-HT en los tres grupos, sin alterar recaptación ni degradación" },
      { text: "Los ISRS bloquean la MAO-A y los IMAO bloquean el SERT, mientras que los tricíclicos inhiben la descarboxilasa AADC" },
      { text: "Agonizan directamente los receptores 5-HT1A postsinápticos, y los IMAO estimulan además la liberación vesicular de 5-HT" },
    ],
    correctIndex: 0,
    explanation: "Observamos que ninguno de los tres grupos actúa sobre receptores 5-HT: ISRS y tricíclicos inhiben el transportador de recaptación (SERT; los tricíclicos también NET) y los IMAO inhiben la enzima que degrada la amina (MAO). El resultado común es más 5-HT en la sinapsis.\n\nDescartamos la B: Ninguno de estos fármacos activa la TPH; actúan sobre recaptación o degradación.\nDescartamos la C: Invierte las dianas (SERT para ISRS, MAO para IMAO) y la AADC no es la diana de los tricíclicos.\nDescartamos la D: No son agonistas de receptores; los IMAO inhiben la MAO y no estimulan la liberación vesicular.\n\nReferencia: Apuntes §1, §4 y §5; clases 1 y 2."
  },
  {
    id: "t04-m3-q13",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 3 · P13 (Buspirona frente a las benzodiazepinas: sin acción sobre GABA-A y respuesta lenta)",
    question: "Una paciente con ansiedad recibe una azapirona en lugar de una benzodiazepina. Indica qué diferencia de mecanismo y de perfil de respuesta cabe esperar.",
    options: [
      { text: "La azapirona potencia el receptor GABA-A como una benzodiazepina, pero su respuesta ansiolítica es inmediata y sin sedación" },
      { text: "La azapirona antagoniza el receptor 5-HT1A, actúa de inmediato y sedaría más que una benzodiazepina al bloquear GABA" },
      { text: "La azapirona no actúa por el receptor GABA-A, no es un sedante de acción inmediata y su respuesta tarda en desarrollarse" },
      { text: "La azapirona bloquea el transportador SERT y eleva la 5-HT sináptica, con una sedación inmediata como la de una benzodiazepina" },
    ],
    correctIndex: 2,
    explanation: "Observamos que la azapirona (buspirona) es agonista parcial 5-HT1A y se diferencia de las benzodiazepinas en que no ejerce su acción ansiolítica por modulación del receptor GABA-A; por ello no es un sedante de acción inmediata, y su respuesta terapéutica puede tardar en desarrollarse.\n\nDescartamos la A: La azapirona no modula el GABA-A; su respuesta es lenta, no inmediata.\nDescartamos la B: La azapirona es agonista parcial, no antagonista, de 5-HT1A; no actúa por GABA ni es sedante de acción inmediata.\nDescartamos la D: La azapirona actúa sobre el receptor 5-HT1A, no sobre SERT, y no es sedante de acción inmediata.\n\nReferencia: Apuntes §6.2; clase 3."
  },
  {
    id: "t04-m3-q14",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 3 · P14 (Setrones: antagonistas del canal 5-HT3 y mecanismo antiemético)",
    question: "Indica cuál es el mecanismo por el que los setrones (ondansetrón, granisetrón, tropisetrón, palonosetrón) son antieméticos.",
    options: [
      { text: "Antagonizan el canal iónico 5-HT3 y reducen las señales serotoninérgicas periféricas y vagales implicadas en la emesis" },
      { text: "Antagonizan el receptor 5-HT1A acoplado a Gi/o y reducen las señales serotoninérgicas vagales implicadas en la emesis" },
      { text: "Antagonizan un receptor 5-HT3 acoplado a Gq y reducen la señal de IP₃ y DAG implicada en la emesis de origen central" },
      { text: "Agonizan el receptor 5-HT4 acoplado a Gs y aumentan la motilidad digestiva, lo que evita las náuseas y la emesis de origen central" },
    ],
    correctIndex: 0,
    explanation: "Observamos que el receptor 5-HT3 es un canal catiónico activado por ligando y que su antagonismo reduce señales serotoninérgicas periféricas y vagales que participan en la emesis; de ahí la utilidad antiemética de los setrones, por ejemplo en las náuseas asociadas a tratamientos antineoplásicos.\n\nDescartamos la B: La diana antiemética de los setrones es el canal 5-HT3, no el receptor 5-HT1A, que es un GPCR acoplado a Gi/o.\nDescartamos la C: El 5-HT3 no es un GPCR acoplado a Gq: es el único receptor serotoninérgico ionotrópico, un canal catiónico.\nDescartamos la D: Los setrones son antagonistas del canal 5-HT3; no agonizan 5-HT4 ni actúan como procinéticos.\n\nReferencia: Apuntes §8; clase 3."
  },
  {
    id: "t04-m3-q15",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 3 · P15 (Ciproheptadina: antagonista serotoninérgico con diana 5-HT2)",
    question: "La ciproheptadina se sintetiza a partir del ácido 2-(2-feniletil)benzoico. Indica cuál es su perfil farmacológico.",
    options: [
      { text: "Es un agonista 5-HT1B/1D de acción vasoconstrictora craneal y se usa en el ataque agudo de migraña" },
      { text: "Es un inhibidor de SERT y NET con un núcleo tricíclico, como la imipramina, indicado en depresión" },
      { text: "Es un antagonista serotoninérgico que actúa sobre receptores 5-HT2 y no inhibe la recaptación" },
      { text: "Es un inhibidor selectivo del transportador SERT, como la fluoxetina, con latencia terapéutica" },
    ],
    correctIndex: 2,
    explanation: "Vemos que el ejercicio 4.4 propone obtener un antagonista serotoninérgico, la ciproheptadina, y que los apuntes asocian la familia 5-HT2 (acoplada a Gq) con ese ejercicio. Su esqueleto de dibenzosuberenona recuerda a un tricíclico, pero su perfil es el de un antagonista de receptor, no el de un inhibidor de la recaptación ni el de un agonista triptánico.\n\nDescartamos la A: Los triptanes son agonistas 5-HT1B/1D; la ciproheptadina es un antagonista serotoninérgico.\nDescartamos la B: El parecido tricíclico no la hace inhibidora de SERT y NET: es un antagonista serotoninérgico, no un inhibidor de la recaptación.\nDescartamos la D: Los ISRS bloquean el transportador SERT; la ciproheptadina es un antagonista de receptor y no tiene esa diana.\n\nReferencia: Apuntes §9.2 y §3 (5-HT2); clase 3."
  }
];
