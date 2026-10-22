// ==========================================================================
// QFDOS - Exámenes del Tema 04: Serotonina e inhibidores de la recaptación de aminas biógenas
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Generado desde Exámenes modelo jev/Tema 4/fuente (examen1, examen2 y examen3).
// Consolidado contra los apuntes del Tema 4 y las tres clases del tema.
// Tipografía científica: Unicode directo, sin LaTeX crudo.
// ==========================================================================

import type { TestQuestion } from './qfdosData';

// MODELO 1: Modelo 1 · ISRS, tricíclicos y síntesis de la imipramina
// Clave: B, C, D, A, C, B, D, A, B, C, A, D, C, B, A
export const TEMA4_MODELO_1_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t04-m1-q01",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P1 (Fluoxetina: ISRS de cadena abierta sin triciclo rígido)",
    question: "Entre las cuatro estructuras, señale la fluoxetina, el ISRS de cadena abierta, sin triciclo rígido, con un grupo CF₃ en el arilo y una amina secundaria N-metilada.",
    options: [
      { text: "Estructura A", smiles: "CNCCCN1c2ccccc2CCc2ccccc21", revealedName: "desipramina" },
      { text: "Estructura B", smiles: "CNCCC(Oc1ccc(C(F)(F)F)cc1)c1ccccc1", revealedName: "fluoxetina" },
      { text: "Estructura C", smiles: "CN(C)CCC(Oc1ccc(C(F)(F)F)cc1)c1ccccc1", revealedName: "análogo N,N-dimetilado de la fluoxetina" },
      { text: "Estructura D", smiles: "CNCCC(Oc1ccccc1)c1ccccc1", revealedName: "análogo de la fluoxetina sin CF₃" },
    ],
    correctIndex: 1,
    explanation: "La fluoxetina es una fenilalquilamina abierta: un arilo con CF₃, un puente –O–CH(Ph)–CH₂–CH₂– y una amina secundaria N-metilada. Al no tener el triciclo rígido, los ISRS apenas se unen a receptores muscarínicos, H₁ y α₁ y dan menos efectos adversos que los tricíclicos.\n\nDescartamos la A: La desipramina es un tricíclico (dibenzoazepina): lleva el triciclo rígido que los ISRS no tienen y no lleva CF₃.\nDescartamos la C: Lleva CF₃, pero la amina es terciaria (N,N-dimetilada) y no secundaria N-metilada.\nDescartamos la D: Mantiene la amina secundaria y la cadena abierta, pero le falta el CF₃ del arilo.\n\nReferencia: Apuntes §3.1 y §8.2."
  },
  {
    id: "t04-m1-q02",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P2 (Citalopram: ftalano con nitrilo y p-fluorofenilo)",
    question: "Entre las cuatro estructuras, señale el citalopram, el ISRS con un ftalano que lleva un nitrilo y un p-fluorofenilo en el carbono cuaternario, y una cadena de tres carbonos que termina en dimetilamina.",
    options: [
      { text: "Estructura A", smiles: "CN(C)CCCC1(c2ccc(F)cc2)OCc2ccccc21", revealedName: "análogo sin nitrilo" },
      { text: "Estructura B", smiles: "CNCCCC1(c2ccc(F)cc2)OCc2cc(C#N)ccc21", revealedName: "desmetilcitalopram (amina secundaria)" },
      { text: "Estructura C", smiles: "CN(C)CCCC1(c2ccc(F)cc2)OCc2cc(C#N)ccc21", revealedName: "citalopram" },
      { text: "Estructura D", smiles: "CN(C)CCCC1(c2ccccc2)OCc2cc(C#N)ccc21", revealedName: "análogo con fenilo sin flúor" },
    ],
    correctIndex: 2,
    explanation: "El citalopram es un ftalano (isobenzofurano) con el nitrilo en el anillo fusionado, un p-fluorofenilo y una cadena de tres carbonos con dimetilamina en el carbono cuaternario. Se vende como racémico; su enantiómero (S) es el escitalopram.\n\nDescartamos la A: Le falta el nitrilo del anillo fusionado, que el citalopram sí tiene.\nDescartamos la B: Es el metabolito N-desmetilado: la amina es secundaria, no dimetilada.\nDescartamos la D: El arilo no lleva el flúor en para, que el citalopram sí tiene.\n\nReferencia: Apuntes §3.1 y §8.2."
  },
  {
    id: "t04-m1-q03",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P3 (Sertralina: isómero cis)",
    question: "La sertralina se comercializa como el estereoisómero cis. Entre las cuatro estructuras, señale la que lo representa.",
    options: [
      { text: "Estructura A", smiles: "CN[C@H]1CC[C@H](c2ccc(Cl)c(Cl)c2)c2ccccc21", revealedName: "diastereómero trans (1S,4R)" },
      { text: "Estructura B", smiles: "CNC1CCC(c2ccc(Cl)c(Cl)c2)c2ccccc21", revealedName: "sin estereoquímica definida" },
      { text: "Estructura C", smiles: "CN[C@@H]1CC[C@@H](c2ccc(Cl)c(Cl)c2)c2ccccc21", revealedName: "diastereómero trans (1R,4S)" },
      { text: "Estructura D", smiles: "CN[C@H]1CC[C@@H](c2ccc(Cl)c(Cl)c2)c2ccccc21", revealedName: "sertralina cis (1S,4S)" },
    ],
    correctIndex: 3,
    explanation: "En la sertralina cis, el NHCH₃ de C1 y el arilo de C4 quedan en la misma cara del anillo: los dos enlaces van en trazo discontinuo (o los dos en cuña). Si uno va en cuña y el otro en trazo discontinuo, los sustituyentes están en caras opuestas y el isómero es trans.\n\nDescartamos la A: Un enlace va en trazo discontinuo y el otro en cuña: sustituyentes en caras opuestas, isómero trans.\nDescartamos la B: Todos los enlaces son líneas simples: la estructura no permite saber si es cis o trans.\nDescartamos la C: Un enlace va en cuña y el otro en trazo discontinuo: sustituyentes en caras opuestas, isómero trans.\n\nReferencia: Apuntes §3.1 (estereoquímica)."
  },
  {
    id: "t04-m1-q04",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P4 (Imipramina frente a clorpromazina: puente central)",
    question: "Al pasar de la clorpromazina a la imipramina se modifica el puente central del triciclo. ¿Qué cambio explica que la imipramina deje de ser neuroléptica y pase a inhibir SERT y NET?",
    questionStructures: [{ name: "Clorpromazina", smiles: "CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21" }, { name: "Imipramina", smiles: "CN(C)CCCN1c2ccccc2CCc2ccccc21" }],
    options: [
      { text: "El puente –S– se sustituye por –CH₂–CH₂–, lo que cambia la forma del anillo central y desplaza la diana hacia SERT y NET." },
      { text: "El cloro del anillo se traslada a la posición 2 y la amina se convierte en cuaternaria, lo que bloquea el receptor D₂ en el estriado." },
      { text: "La cadena de tres carbonos se acorta a dos y se añade un hidroxilo, lo que aumenta la afinidad por la MAO-A y su inhibición." },
      { text: "El azufre se oxida a sulfóxido, lo que incrementa la polaridad del triciclo y favorece la inhibición de la fosfodiesterasa cerebral." },
    ],
    correctIndex: 0,
    explanation: "El puente –S– de la fenotiazina se cambia por –CH₂–CH₂–, que da la dibenzazepina y altera el plegado del anillo central. Con la forma modificada, la molécula pierde afinidad D₂ y pasa a inhibir la recaptación de serotonina y noradrenalina.\n\nDescartamos la B: El cloro no cambia de posición en la imipramina: se elimina del anillo aromático, y la amina sigue siendo terciaria.\nDescartamos la C: La cadena de tres carbonos se conserva en la imipramina; el hidroxilo y la inhibición de la MAO-A no forman parte del cambio.\nDescartamos la D: En la imipramina no hay azufre ni sulfóxido; el puente es un etileno y la fosfodiesterasa no es la diana del fármaco.\n\nReferencia: Apuntes §3.2."
  },
  {
    id: "t04-m1-q05",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P5 (Desipramina: metabolito N-desmetilado de la imipramina)",
    question: "El hígado N-desmetila la imipramina y da una amina secundaria, más selectiva por el transportador de noradrenalina. Señale ese metabolito.",
    options: [
      { text: "Estructura A", smiles: "CN(C)CCCN1c2ccccc2CCc2ccccc21", revealedName: "imipramina" },
      { text: "Estructura B", smiles: "CN(C)CCC=C1c2ccccc2CCc2ccccc21", revealedName: "amitriptilina" },
      { text: "Estructura C", smiles: "CNCCCN1c2ccccc2CCc2ccccc21", revealedName: "desipramina" },
      { text: "Estructura D", smiles: "OCCN1CCN(CCCN2c3ccccc3C=Cc3ccccc32)CC1", revealedName: "opipramol" },
    ],
    correctIndex: 2,
    explanation: "La desipramina es la imipramina con un metilo menos en el nitrógeno de la cadena, es decir, una amina secundaria. Mantiene el anillo de dibenzoazepina y la cadena de tres carbonos.\n\nDescartamos la A: La imipramina es el sustrato de la N-desmetilación y conserva la dimetilamina.\nDescartamos la B: La amitriptilina tiene un carbono sp² exocíclico en lugar del nitrógeno del anillo central, y no resulta de la N-desmetilación.\nDescartamos la D: El opipramol tiene un doble enlace C10=C11 y una hidroxietilpiperazina en la cadena.\n\nReferencia: Apuntes §3.3 y figura 3."
  },
  {
    id: "t04-m1-q06",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P6 (Acidez del metilo del o-nitrotolueno)",
    question: "En la primera etapa de la síntesis de la imipramina, el etóxido sódico desprotona el metilo del o-nitrotolueno. ¿Por qué ese metilo es lo bastante ácido?",
    questionStructures: [{ name: "o-Nitrotolueno", smiles: "Cc1ccccc1[N+](=O)[O-]" }],
    options: [
      { text: "Porque el NO₂ en orto cede un par de electrones al metilo, lo que aumenta la densidad electrónica del carbono bencílico." },
      { text: "Porque el carbanión bencílico deslocaliza la carga sobre el NO₂ en orto, y esa estabilización hace accesible la desprotonación." },
      { text: "Porque el etóxido actúa como electrófilo y se adiciona al anillo aromático, lo que activa el protón del metilo para su retirada." },
      { text: "Porque el metilo está en para respecto al nitro, y una hidrogenación previa del anillo le confiere acidez suficiente." },
    ],
    correctIndex: 1,
    explanation: "El carbanión bencílico formado por desprotonación queda estabilizado por resonancia hacia el grupo nitro situado en orto. Esa deslocalización hace que el protón sea lo bastante ácido para que el etóxido lo retire.\n\nDescartamos la A: Un grupo NO₂ es electroatractor; no cede electrones al metilo.\nDescartamos la C: El etóxido actúa como base, no como electrófilo sobre el anillo.\nDescartamos la D: El metilo está en orto, no en para, y no hay hidrogenación previa del anillo en esta etapa.\n\nReferencia: Apuntes §3.4, tabla paso 1."
  },
  {
    id: "t04-m1-q07",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P7 (Dimerización oxidativa: 2,2′-dinitrobibencilo)",
    question: "En la etapa de oxidación con aire, dos carbaniones bencílicos radicalizados se acoplan. Señale la estructura del dímero formado.",
    questionStructures: [{ name: "o-Nitrotolueno", smiles: "Cc1ccccc1[N+](=O)[O-]" }],
    options: [
      { text: "Estructura A", smiles: "O=[N+]([O-])c1ccccc1Cc1ccccc1[N+](=O)[O-]", revealedName: "dinitrodifenilmetano" },
      { text: "Estructura B", smiles: "Nc1ccccc1CCc1ccccc1N", revealedName: "2,2′-diaminobibencilo" },
      { text: "Estructura C", smiles: "O=[N+]([O-])c1ccccc1CCc1ccccc1", revealedName: "2-nitrobibencilo" },
      { text: "Estructura D", smiles: "O=[N+]([O-])c1ccccc1CCc1ccccc1[N+](=O)[O-]", revealedName: "2,2′-dinitrobibencilo" },
    ],
    correctIndex: 3,
    explanation: "El acoplamiento de dos radicales bencílicos forma un enlace C–C entre los dos CH₂, y el dímero resultante es el 2,2′-dinitrobibencilo (C₁₄). Los dos grupos nitro se conservan hasta la reducción.\n\nDescartamos la A: El dinitrodifenilmetano tiene un solo carbono entre los anillos; el dímero del o-nitrotolueno tiene dos.\nDescartamos la B: El diamino es el producto de la reducción de los nitro, que es la etapa posterior, no la de dimerización.\nDescartamos la C: Solo tiene un grupo nitro; el dímero de la oxidación conserva los dos.\n\nReferencia: Apuntes §3.4, tabla paso 2."
  },
  {
    id: "t04-m1-q08",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P8 (Ciclización a iminodibencilo con pérdida de NH₃)",
    question: "El 2,2′-diaminobibencilo se calienta con H₃PO₄ a 300 °C para dar el tricíclico iminodibencilo. ¿Qué tipo de reacción es y qué molécula se pierde?",
    questionStructures: [{ name: "2,2′-Diaminobibencilo", smiles: "Nc1ccccc1CCc1ccccc1N" }],
    options: [
      { text: "Ciclación intramolecular, con pérdida de una molécula de NH₃ y formación del anillo central." },
      { text: "Condensación con ácido nitroso a 0 °C, con pérdida de N₂ y formación de una sal de diazonio cíclica." },
      { text: "Hidrogenación de los dos enlaces C–C con H₂/Ni Raney, con pérdida de NH₃ y formación de un ciclohexano." },
      { text: "Oxidación de ambos CH₂ a cetonas con KMnO₄, con pérdida de agua y formación de una antraquinona." },
    ],
    correctIndex: 0,
    explanation: "El H₃PO₄ a alta temperatura promueve la ciclación de las dos aminas sobre el enlace C–C, con eliminación de NH₃ y formación del anillo central del iminodibencilo.\n\nDescartamos la B: El ácido nitroso no interviene en esta etapa; se usa en la diazotación de la síntesis del sumatriptán.\nDescartamos la C: La hidrogenación no cambia el número de carbonos ni forma el anillo central.\nDescartamos la D: La oxidación no es la transformación de esta etapa, y no se forma una antraquinona.\n\nReferencia: Apuntes §3.4, tabla paso 4."
  },
  {
    id: "t04-m1-q09",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P9 (N-alquilación del iminodibencilo: necesidad de NaNH₂)",
    question: "Antes de alquilar el iminodibencilo con Cl–(CH₂)₃–NMe₂ se usa NaNH₂. ¿Por qué hace falta esa base tan fuerte?",
    questionStructures: [{ name: "Iminodibencilo", smiles: "C1Cc2ccccc2Nc2ccccc21" }, { name: "Cl–(CH₂)₃–NMe₂", smiles: "ClCCCN(C)C" }],
    options: [
      { text: "Porque el NaNH₂ actúa como catalizador ácido y protona el halógeno del cloruro de alquilo, activándolo para la sustitución." },
      { text: "Porque el NH de la diarilamina es poco nucleófilo, su par está deslocalizado y hay que desprotonarlo antes del SN2." },
      { text: "Porque el NaNH₂ reduce el enlace C–Cl y forma una amina primaria, que después se metila sobre el nitrógeno del triciclo." },
      { text: "Porque el NaNH₂ oxida el NH del triciclo a radical, que después se acopla con el carbono terminal de la cadena de alquilo." },
    ],
    correctIndex: 1,
    explanation: "La diarilamina tiene el par de electrones deslocalizado sobre los dos anillos, así que es poco nucleófila. El NaNH₂ genera el anión amida, que desplaza al cloruro en una SN2.\n\nDescartamos la A: El NaNH₂ es una base fuerte, no un ácido; no protona el haluro.\nDescartamos la C: El NaNH₂ no reduce enlaces C–Cl ni genera una amina primaria en esta etapa.\nDescartamos la D: No hay oxidación ni acoplamiento radicalario en la N-alquilación.\n\nReferencia: Apuntes §3.4, tabla paso 5 y «Lo que hay que saber»."
  },
  {
    id: "t04-m1-q10",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 1 · P10 (Reducción de los nitro a amina con H₂/PtO₂)",
    question: "En el paso 3 de la síntesis de la imipramina, H₂ con PtO₂ en metanol transforma el dímero dinitro. ¿Qué tipo de reacción es y qué ocurre con el número de carbonos?",
    questionStructures: [{ name: "2,2′-Dinitrobibencilo", smiles: "O=[N+]([O-])c1ccccc1CCc1ccccc1[N+](=O)[O-]" }],
    options: [
      { text: "Oxidación del NO₂ con incorporación de dos átomos de oxígeno, con crecimiento del dímero hasta un C₁₆ en el producto." },
      { text: "Deshidratación con pérdida de una molécula de agua, que reduce el número de carbonos del dímero hasta un C₁₃ en el producto." },
      { text: "Reducción de NO₂ a NH₂; el número de carbonos no cambia y el producto, el 2,2′-diaminobibencilo, sigue siendo C₁₄." },
      { text: "Sustitución nucleófila aromática del NO₂ por NH₂, con adición de un carbono a la cadena y pérdida de un oxígeno." },
    ],
    correctIndex: 2,
    explanation: "Los grupos NO₂ se reducen a NH₂ con hidrógeno y catalizador. Dos o-nitrotoluenos de siete carbonos dan un dímero de catorce, y esa cuenta se mantiene en la reducción.\n\nDescartamos la A: La reducción de NO₂ a NH₂ elimina oxígenos; no añade átomos de oxígeno ni carbonos.\nDescartamos la B: No hay deshidratación en esta etapa, y el número de carbonos del dímero es 14.\nDescartamos la D: La reacción no es una sustitución aromática; el nitro se reduce en el mismo sitio y no se añade carbono.\n\nReferencia: Apuntes §3.4, tabla paso 3 y «Contar carbonos»."
  },
  {
    id: "t04-m1-q11",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 1 · P11 (Numeración del indol: sulfonamida en C5)",
    question: "Entre las cuatro estructuras, señale la que lleva el grupo –CH₂–SO₂–NH–CH₃ en la posición 5 del indol, como el sumatriptán.",
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1", revealedName: "sumatriptán (sustituyente en C5)" },
      { text: "Estructura B", smiles: "CNS(=O)(=O)Cc1ccc2c(CCN(C)C)c[nH]c2c1", revealedName: "isómero con el sustituyente en C6" },
      { text: "Estructura C", smiles: "CNS(=O)(=O)Cc1cccc2[nH]cc(CCN(C)C)c12", revealedName: "isómero con el sustituyente en C4" },
      { text: "Estructura D", smiles: "CNS(=O)(=O)Cc1cccc2c(CCN(C)C)c[nH]c12", revealedName: "isómero con el sustituyente en C7" },
    ],
    correctIndex: 0,
    explanation: "El NH del pirrol es la posición 1; después van C2 y C3 (con la cadena de la triptamina), el carbono de fusión C3a, y en el benceno C4, C5, C6 y C7. El C5 queda en meta respecto al carbono de fusión C7a y es donde el sumatriptán lleva la sulfonamida.\n\nDescartamos la B: El sustituyente está en C6, el carbono del benceno que queda en para respecto al C3a.\nDescartamos la C: El sustituyente está en C4, junto al carbono de fusión C3a y a la cadena de C3.\nDescartamos la D: El sustituyente está en C7, junto al carbono de fusión C7a que se une al NH.\n\nReferencia: Apuntes §5.4 (numeración del indol)."
  },
  {
    id: "t04-m1-q12",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P12 (Localización periférica de la serotonina)",
    question: "¿Dónde se localiza la mayor parte de la serotonina del organismo y cómo obtiene el cerebro la suya?",
    options: [
      { text: "En las plaquetas, que la sintetizan y la liberan al cerebro, que carece de triptófano hidroxilasa funcional." },
      { text: "En el cerebro, que la recibe de la sangre porque la serotonina atraviesa con facilidad la barrera hematoencefálica." },
      { text: "En el hígado, donde se sintetiza a partir de la melatonina pineal y después se reparte por el resto del organismo." },
      { text: "Fuera del SNC, en las células enterocromafines del intestino; el cerebro la sintetiza en los núcleos del rafe." },
    ],
    correctIndex: 3,
    explanation: "El 90 % de la serotonina corporal está en las células enterocromafines del intestino. Por su polaridad no cruza la barrera hematoencefálica, y el cerebro la sintetiza en los núcleos del rafe.\n\nDescartamos la A: Las plaquetas captan y almacenan la serotonina, pero no la sintetizan.\nDescartamos la B: La serotonina no cruza la barrera hematoencefálica, por eso el cerebro la fabrica.\nDescartamos la C: La serotonina no se forma a partir de melatonina; ocurre al revés en la glándula pineal.\n\nReferencia: Apuntes §2.3."
  },
  {
    id: "t04-m1-q13",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P13 (Aldehído intermedio de la oxidación por la MAO)",
    question: "La MAO oxida la serotonina a un intermedio aldehídico, que la aldehído deshidrogenasa convierte después en ácido. Señale ese aldehído.",
    options: [
      { text: "Estructura A", smiles: "OC(=O)Cc1c[nH]c2ccc(O)cc12", revealedName: "ácido 5-hidroxiindolacético (5-HIAA)" },
      { text: "Estructura B", smiles: "NCCc1c[nH]c2ccc(O)cc12", revealedName: "serotonina" },
      { text: "Estructura C", smiles: "O=CCc1c[nH]c2ccc(O)cc12", revealedName: "5-hidroxiindolacetaldehído (5-HIAL)" },
      { text: "Estructura D", smiles: "COc1ccc2[nH]cc(CCNC(C)=O)c2c1", revealedName: "melatonina" },
    ],
    correctIndex: 2,
    explanation: "La MAO oxida la amina primaria a iminio, que se hidroliza al aldehído 5-HIAL. La aldehído deshidrogenasa lo oxida después a 5-HIAA, que se elimina por la orina.\n\nDescartamos la A: El 5-HIAA es el ácido, producto final de la aldehído deshidrogenasa, no el aldehído intermedio.\nDescartamos la B: La serotonina es el sustrato de la MAO, no su producto.\nDescartamos la D: La melatonina se forma en la glándula pineal por otra vía, sin pasar por la oxidación de la MAO.\n\nReferencia: Apuntes §2.4 y figura 5."
  },
  {
    id: "t04-m1-q14",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P14 (Melatonina: N-acetilación y O-metilación)",
    question: "La melatonina se sintetiza a partir de la serotonina en la glándula pineal. ¿Qué dos transformaciones lleva a cabo?",
    questionStructures: [{ name: "Serotonina", smiles: "NCCc1c[nH]c2ccc(O)cc12" }, { name: "Melatonina", smiles: "COc1ccc2[nH]cc(CCNC(C)=O)c2c1" }],
    options: [
      { text: "O-metilación del 5-OH seguida de descarboxilación del triptófano, por la misma enzima en dos pasos." },
      { text: "N-acetilación del nitrógeno de la cadena por la AANAT y O-metilación del 5-OH con SAM por la ASMT." },
      { text: "Hidroxilación de C5 con BH₄ seguida de N-metilación del nitrógeno indólico con yoduro de metilo." },
      { text: "Oxidación del grupo amino a aldehído por la MAO y reducción posterior del carbonilo con NADPH." },
    ],
    correctIndex: 1,
    explanation: "La AANAT acetila el nitrógeno de la cadena y la ASMT metila el 5-OH con SAM. Son dos pasos y el resultado es la melatonina, que regula el ritmo circadiano.\n\nDescartamos la A: La descarboxilación no interviene: la serotonina ya no tiene el carboxilo del triptófano.\nDescartamos la C: La hidroxilación de C5 ya ocurrió en la biosíntesis de la serotonina, y el yoduro de metilo no es un reactivo biológico.\nDescartamos la D: La oxidación a aldehído es la vía de la MAO, no la de la melatonina.\n\nReferencia: Apuntes §2.4."
  },
  {
    id: "t04-m1-q15",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 1 · P15 (Receptores 5-HT: canal iónico frente a proteína G)",
    question: "¿Cuál de estas afirmaciones sobre los receptores de serotonina es correcta?",
    options: [
      { text: "El 5-HT₃ es un canal iónico pentamérico, mientras que 5-HT₁ y 5-HT₂ son receptores acoplados a proteína G." },
      { text: "Los receptores 5-HT₁ y 5-HT₂ son canales iónicos, y el 5-HT₃ se acopla a Gq para elevar el calcio intracelular." },
      { text: "El 5-HT₃ se acopla a Gs y aumenta el AMPc, mientras que el 5-HT₁ es un canal de sodio activado por triptamina." },
      { text: "El 5-HT₂ está acoplado a Gi/o y reduce el AMPc, y el antiguo 5-HT₁C pasó a llamarse 5-HT₄ en la nomenclatura actual." },
    ],
    correctIndex: 0,
    explanation: "Todos los receptores de serotonina son acoplados a proteína G salvo el 5-HT₃, que es un canal iónico pentamérico de la familia del receptor nicotínico. Los ISRS, tricíclicos e IMAO no actúan sobre receptores.\n\nDescartamos la B: Es al revés: el 5-HT₃ es el canal, y 5-HT₁ y 5-HT₂ son receptores acoplados a proteína G.\nDescartamos la C: El 5-HT₃ no se acopla a Gs; es un canal iónico y 5-HT₁ no es un canal de sodio.\nDescartamos la D: El 5-HT₂ se acopla a Gq, no a Gi/o, y el antiguo 5-HT₁C se reclasificó como 5-HT₂C.\n\nReferencia: Apuntes §2.5."
  },
];

// MODELO 2: Modelo 2 · IMAO, triptanes y síntesis de Fischer
// Clave: C, A, D, B, D, C, A, B, A, C, D, B, A, C, B
export const TEMA4_MODELO_2_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t04-m2-q01",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P1 (RIMA frente a IMAO irreversibles: efecto queso)",
    question: "Un inhibidor reversible de la MAO-A (RIMA) reduce el riesgo de efecto queso frente a los IMAO irreversibles. ¿Por qué?",
    options: [
      { text: "Se une de forma covalente al FAD y su efecto se recupera en unas dos semanas, tiempo en el que la tiramina se metaboliza." },
      { text: "Es un inhibidor selectivo de MAO-B que impide la degradación de la dopamina en el cuerpo estriado sin afectar a la tiramina." },
      { text: "Se une de forma reversible y competitiva, de modo que la tiramina puede desplazarlo y la MAO-A la metaboliza sin bloqueo." },
      { text: "Bloquea los receptores α₁ vasculares y evita la vasoconstricción provocada por la noradrenalina liberada tras la ingesta de tiramina." },
    ],
    correctIndex: 2,
    explanation: "La moclobemida se une al centro activo de la MAO-A de forma competitiva y reversible. Si el paciente ingiere tiramina, esta desplaza al fármaco y la enzima la metaboliza, por lo que el riesgo de crisis hipertensiva casi desaparece.\n\nDescartamos la A: Esa es la descripción de los IMAO de propargilo, que son irreversibles; el RIMA no forma enlace covalente.\nDescartamos la B: Un RIMA inhibe la MAO-A, no la MAO-B, y la tiramina no se preserva por esa selectividad.\nDescartamos la D: El mecanismo del efecto queso es la liberación de noradrenalina, no un bloqueo de receptores α₁ por el RIMA.\n\nReferencia: Apuntes §4.5."
  },
  {
    id: "t04-m2-q02",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P2 (Pargilina: propargilamina con N-bencilo)",
    question: "Entre las cuatro estructuras, señale la pargilina, la propargilamina con un grupo bencilo y un metilo sobre el nitrógeno.",
    options: [
      { text: "Estructura A", smiles: "C#CCN(C)Cc1ccccc1", revealedName: "pargilina" },
      { text: "Estructura B", smiles: "CC(C)NNC(=O)c1ccncc1", revealedName: "iproniazida" },
      { text: "Estructura C", smiles: "NNC(=O)c1ccncc1", revealedName: "isoniazida" },
      { text: "Estructura D", smiles: "C#CCN(C)CCCOc1ccc(Cl)cc1Cl", revealedName: "clorgilina" },
    ],
    correctIndex: 0,
    explanation: "La pargilina tiene el grupo N–CH₂–C≡CH, marca de las propargilaminas, unido a un nitrógeno con metilo y bencilo. Las hidrazidas no tienen el alquino, y la clorgilina cambia el bencilo por una cadena aril-oxialquílica.\n\nDescartamos la B: La iproniazida es una hidrazida con isopropilo en el nitrógeno terminal, sin triple enlace.\nDescartamos la C: La isoniazida es la hidrazida de partida de la serie, sin grupo propargilo.\nDescartamos la D: La clorgilina es también una propargilamina, pero lleva una cadena de oxipropilo con diclorofenilo en lugar del bencilo.\n\nReferencia: Apuntes §4.2 y figura 6."
  },
  {
    id: "t04-m2-q03",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P3 (Sumatriptán: C5 imprescindible y amina terciaria)",
    question: "El sumatriptán tiene una amina terciaria dimetilada y una sulfonamida en C5. ¿Qué función cumple la amina terciaria?",
    questionStructures: [{ name: "Sumatriptán", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1" }],
    options: [
      { text: "Aumenta la lipofilia de la molécula y permite cruzar la barrera hematoencefálica sin necesidad de protonarse." },
      { text: "Forma un puente de hidrógeno con el aspartato de 5-HT₁B, que sustituye a la sulfonamida en el receptor." },
      { text: "Introduce un centro quiral que fija la selectividad por el receptor 5-HT₁D frente al 5-HT₁B en el trigémino." },
      { text: "Bloquea la desaminación por MAO-A y permanece protonada a pH fisiológico para anclarse al receptor." },
    ],
    correctIndex: 3,
    explanation: "La amina terciaria no es una amina primaria y la MAO-A apenas la desamina. Además, a pH fisiológico sigue protonada, lo que conserva el anclaje iónico al receptor.\n\nDescartamos la A: La amina protonada es la que permite el anclaje al receptor; la lipofilia no es su función.\nDescartamos la B: La sulfonamida es la que forma el enlace de hidrógeno en C5, no la amina terciaria.\nDescartamos la C: El sumatriptán es aquiral; no hay centro quiral en la molécula.\n\nReferencia: Apuntes §5.3."
  },
  {
    id: "t04-m2-q04",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P4 (Diseño del sumatriptán: carboxamida con CH₂ y N-metilo)",
    question: "La 5-carboxamidotriptamina (5-CT) es muy potente pero no selectiva. Al añadir un CH₂ bencílico y N-metilar la amida se obtiene un compuesto selectivo por 5-HT₁B/1D que no se absorbe por vía oral. Señale su estructura.",
    questionStructures: [{ name: "5-Carboxamidotriptamina (5-CT)", smiles: "NC(=O)c1ccc2[nH]cc(CCN)c2c1" }],
    options: [
      { text: "Estructura A", smiles: "CNC(=O)c1ccc2[nH]cc(CCN)c2c1", revealedName: "N-metilamida sin CH₂" },
      { text: "Estructura B", smiles: "CNC(=O)Cc1ccc2[nH]cc(CCN)c2c1", revealedName: "amida con CH₂ y N-metilo" },
      { text: "Estructura C", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN)c2c1", revealedName: "sulfonamida con amina primaria" },
      { text: "Estructura D", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1", revealedName: "sumatriptán" },
    ],
    correctIndex: 1,
    explanation: "El segundo paso del diseño intercala un CH₂ bencílico entre el indol y la amida y metila el nitrógeno amídico. Se gana selectividad por 5-HT₁B/1D, pero la molécula sigue sin absorberse por vía oral y la amina primaria se desamina.\n\nDescartamos la A: Tiene el N-metilo pero la amida sigue unida directamente al anillo; falta el CH₂ intercalado.\nDescartamos la C: Es el bioisóstero sulfonamida, el paso siguiente del diseño, con la amina primaria aún sin dimetilar.\nDescartamos la D: El sumatriptán es el final del diseño: lleva sulfonamida y amina terciaria.\n\nReferencia: Apuntes §5.3 y figura 10."
  },
  {
    id: "t04-m2-q05",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P5 (Ergolinas: triptamina y feniletilamina rígidas)",
    question: "Los alcaloides ergolínicos, como el LSD de la figura, actúan sobre muchos receptores y tienen efectos adversos graves. ¿Qué rasgo del esqueleto lo explica?",
    questionStructures: [{ name: "LSD (5R,8R)", smiles: "CCN(CC)C(=O)[C@@H]1C=C2c3cccc4[nH]cc(C[C@H]2N(C)C1)c34" }],
    options: [
      { text: "Contiene un catecol que se ancla a dos serinas del receptor, como las catecolaminas, y por eso une receptores adrenérgicos." },
      { text: "Es una propargilamina que forma un enlace covalente con el FAD de la MAO y por eso altera las vías aminérgicas en general." },
      { text: "Lleva un biciclo con nitrógeno básico y un carbonilo aromático, rasgos que reconocen el canal iónico 5-HT₃ y los D₂." },
      { text: "Contiene a la vez una triptamina rígida y una feniletilamina rígida, que reconocen receptores 5-HT, D₂ y α adrenérgicos." },
    ],
    correctIndex: 3,
    explanation: "El esqueleto de ergolina incluye una triptamina rígida, que encaja en los receptores 5-HT, y una feniletilamina rígida, que reconocen los D₂ y los α. Por eso son compuestos poco selectivos y con efectos adversos graves.\n\nDescartamos la A: El esqueleto de ergolina contiene un indol, no un catecol.\nDescartamos la B: La ergolina no tiene grupo propargilo y no es un IMAO.\nDescartamos la C: El canal 5-HT₃ lo reconocen los setrones; las ergolinas actúan sobre receptores acoplados a proteína G.\n\nReferencia: Apuntes §5.1 y figura 8."
  },
  {
    id: "t04-m2-q06",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P6 (Fischer: indol obtenido de fenilhidrazina y butanal)",
    question: "La fenilhidrazina y el butanal se calientan con ZnCl₂ (síntesis de Fischer). Señale el indol que se forma.",
    questionStructures: [{ name: "Fenilhidrazina", smiles: "NNc1ccccc1" }, { name: "Butanal", smiles: "CCCC=O" }],
    options: [
      { text: "Estructura A", smiles: "CCc1cc2ccccc2[nH]1", revealedName: "2-etilindol" },
      { text: "Estructura B", smiles: "CCCc1c[nH]c2ccccc12", revealedName: "3-propilindol" },
      { text: "Estructura C", smiles: "CCc1c[nH]c2ccccc12", revealedName: "3-etilindol" },
      { text: "Estructura D", smiles: "CCCc1cc2ccccc2[nH]1", revealedName: "2-propilindol" },
    ],
    correctIndex: 2,
    explanation: "El carbono del CHO se convierte en C2 (sin sustituyente) y el carbono α, que lleva el etilo, en C3. Los reactivos aportan C₁₀ al indol, que es el 3-etilindol (C₁₀H₁₁N), además de H₂O y NH₃.\n\nDescartamos la A: El etilo está en C2; el C2 procede del carbono del CHO, que no lleva sustituyente de la cadena.\nDescartamos la B: El propilo suma un carbono más del que aportan los reactivos: el indol tiene diez carbonos.\nDescartamos la D: Tiene un carbono de más y además coloca el sustituyente en C2.\n\nReferencia: Apuntes §7.1 («Fischer al revés»)."
  },
  {
    id: "t04-m2-q07",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P7 (Fischer al revés: arilhidrazina y carbonilo de un indol dado)",
    question: "¿Qué arilhidrazina y qué carbonilo, en medio ácido y con calor, dan por síntesis de Fischer el indol de la figura?",
    questionStructures: [{ name: "Indol objetivo", smiles: "COc1ccc2[nH]c(C)cc2c1" }],
    options: [
      { text: "Estructura A", smiles: "COc1ccc(NN)cc1.CC(C)=O", revealedName: "(4-metoxifenil)hidrazina + acetona" },
      { text: "Estructura B", smiles: "COc1cccc(NN)c1.CC(C)=O", revealedName: "(3-metoxifenil)hidrazina + acetona" },
      { text: "Estructura C", smiles: "COc1ccc(NN)cc1.CCC=O", revealedName: "(4-metoxifenil)hidrazina + propanal" },
      { text: "Estructura D", smiles: "COc1ccc(NN)cc1.CCC(C)=O", revealedName: "(4-metoxifenil)hidrazina + butanona" },
    ],
    correctIndex: 0,
    explanation: "Un sustituyente en para de la arilhidrazina acaba en C5 del indol. El carbono del C=O pasa a C2 y conserva su sustituyente (el metilo), y el carbono α pasa a C3. La acetona da C2 con metilo y C3 sin sustituir: 5-metoxi-2-metilindol.\n\nDescartamos la B: El metoxilo en meta de la arilhidrazina acaba en C4 o C6 del indol, no en C5.\nDescartamos la C: El propanal pone el metilo en C3 y deja C2 sin sustituir; el indol objetivo lleva el metilo en C2.\nDescartamos la D: La butanona aporta un carbono más: el producto sería un 2,3-dimetilindol, no un 2-metilindol.\n\nReferencia: Apuntes §7.1 («Fischer en el examen» y «Fischer al revés»)."
  },
  {
    id: "t04-m2-q08",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P8 (Arilhidrazina a partir de la anilina del sumatriptán)",
    question: "La anilina del sumatriptán se transforma en la arilhidrazina de partida de la síntesis de Fischer mediante diazotación con NaNO₂/HCl y reducción con SnCl₂. Señale la arilhidrazina correspondiente.",
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc(N)cc1", revealedName: "anilina de partida" },
      { text: "Estructura B", smiles: "CNS(=O)(=O)Cc1ccc(NN)cc1", revealedName: "arilhidrazina en para" },
      { text: "Estructura C", smiles: "CNS(=O)(=O)Cc1cccc(NN)c1", revealedName: "arilhidrazina en meta" },
      { text: "Estructura D", smiles: "CNS(=O)(=O)Cc1ccccc1NN", revealedName: "arilhidrazina en orto" },
    ],
    correctIndex: 1,
    explanation: "La diazotación de la anilina y la reducción con SnCl₂ dan la arilhidrazina. El grupo CH₂SO₂NHMe debe quedar en para para que la ciclación de Fischer genere el C5 del indol.\n\nDescartamos la A: La anilina es el sustrato de la diazotación; no tiene el grupo NHNH₂ que resulta de la reducción.\nDescartamos la C: El sustituyente está en meta; el sumatriptán exige la posición para respecto al grupo hidrazina.\nDescartamos la D: El sustituyente está en orto; el indol de C5 se forma a partir de la posición para.\n\nReferencia: Apuntes §7.2, pasos 1 y 2 y figura 15."
  },
  {
    id: "t04-m2-q09",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P9 (Pérdidas en la síntesis de Fischer)",
    question: "La fenilhidrazina y la ciclohexanona dan, en medio ácido y con calor, el tetrahidrocarbazol de la figura. Al comparar las fórmulas de reactivos y producto, ¿qué moléculas se pierden en la secuencia?",
    questionStructures: [{ name: "Fenilhidrazina", smiles: "NNc1ccccc1" }, { name: "Ciclohexanona", smiles: "O=C1CCCCC1" }, { name: "1,2,3,4-Tetrahidrocarbazol", smiles: "c1ccc2c(c1)[nH]c1c2CCCC1" }],
    options: [
      { text: "Una molécula de H₂O en la condensación a hidrazona y una de NH₃ tras la transposición [3,3] y la ciclación." },
      { text: "Dos moléculas de H₂O, una en la condensación a hidrazona y otra en la aromatización final del anillo de pirrol." },
      { text: "Una molécula de N₂ en la transposición [3,3] y una de HCl tras la ciclación, con el nitrógeno saliendo como gas." },
      { text: "Una molécula de CO₂ por descarboxilación y una de H₂ por reducción del nitrógeno del indol resultante." },
    ],
    correctIndex: 0,
    explanation: "La suma de reactivos es C₁₂H₁₈N₂O y el producto es C₁₂H₁₃N. La diferencia, H₅NO, equivale a H₂O (condensación) y NH₃ (tras la transposición [3,3] y la ciclación).\n\nDescartamos la B: El balance C₆H₈N₂ + C₆H₁₀O − C₁₂H₁₃N deja H₅NO: agua y amoníaco, no dos aguas.\nDescartamos la C: El balance no contiene cloro ni pierde los dos nitrógenos como N₂; uno de ellos queda en el indol.\nDescartamos la D: Los reactivos no tienen carboxilo, así que no hay CO₂, y el balance no incluye H₂.\n\nReferencia: Apuntes §7.1 («Fischer en el examen»)."
  },
  {
    id: "t04-m2-q10",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 2 · P10 (Reducción del nitrilo a amina primaria)",
    question: "En el paso 5 de la síntesis del sumatriptán, el indol-3-acetonitrilo de la figura se trata con H₂ y un catalizador. Señale el producto.",
    questionStructures: [{ name: "Indol-3-acetonitrilo", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CC#N)c2c1" }],
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CC(N)=O)c2c1", revealedName: "amida primaria" },
      { text: "Estructura B", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CC(=O)O)c2c1", revealedName: "ácido carboxílico" },
      { text: "Estructura C", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN)c2c1", revealedName: "triptamina primaria" },
      { text: "Estructura D", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCCN)c2c1", revealedName: "homólogo con un carbono más" },
    ],
    correctIndex: 2,
    explanation: "El nitrilo –CH₂–C≡N se reduce a –CH₂–CH₂–NH₂ sin ganar ni perder carbonos, y la molécula conserva el C₁₂ del indol-3-acetonitrilo con la sulfonamida.\n\nDescartamos la A: La amida resultaría de una hidratación del nitrilo, no de una reducción con H₂.\nDescartamos la B: El ácido resultaría de una hidrólisis completa, no de una reducción.\nDescartamos la D: Tiene un carbono más que el nitrilo: en una reducción de nitrilo a amina el número de carbonos no cambia.\n\nReferencia: Apuntes §7.2, paso 5, y «Cómo responder las preguntas del sumatriptán»."
  },
  {
    id: "t04-m2-q11",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P11 (Sustratos de la MAO-A frente a la MAO-B)",
    question: "¿Qué sustratos prefiere cada isoforma de la monoaminooxidasa?",
    options: [
      { text: "La MAO-B degrada serotonina y noradrenalina, y la MAO-A prefiere la 2-feniletilamina y la bencilamina." },
      { text: "Ambas isoformas degradan solo tiramina, y la diferencia está en su localización en hígado o en cerebro." },
      { text: "La MAO-A oxida el triptófano y la MAO-B la L-DOPA, y ambas dependen de BH₄ como cofactor en el cerebro." },
      { text: "La MAO-A degrada serotonina y noradrenalina; la MAO-B prefiere la 2-feniletilamina y la bencilamina." },
    ],
    correctIndex: 3,
    explanation: "La MAO-A tiene preferencia por serotonina y noradrenalina y es la diana antidepresiva. La MAO-B prefiere feniletilamina y bencilamina y es la diana del tratamiento antiparkinsoniano.\n\nDescartamos la A: Está intercambiado: la MAO-A es la que degrada serotonina y noradrenalina.\nDescartamos la B: Las dos isoformas degradan varios sustratos; la diferencia está en la preferencia, no en un sustrato único.\nDescartamos la C: El triptófano no es sustrato de la MAO; el cofactor de la MAO es el FAD, no el BH₄.\n\nReferencia: Apuntes §4.1."
  },
  {
    id: "t04-m2-q12",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P12 (Efecto queso: origen y mecanismo de la tiramina)",
    question: "Un paciente tratado con un IMAO irreversible presenta una crisis hipertensiva tras comer queso curado. ¿Qué explica el episodio?",
    questionStructures: [{ name: "L-Tirosina", smiles: "N[C@@H](Cc1ccc(O)cc1)C(=O)O" }, { name: "Tiramina", smiles: "NCCc1ccc(O)cc1" }],
    options: [
      { text: "La tiramina se forma por oxidación de la noradrenalina en el hígado, y el IMAO impide ese paso y el desplazamiento." },
      { text: "La tiramina de la dieta, que la MAO normalmente degrada, pasa a la circulación y desplaza la noradrenalina vesicular." },
      { text: "El queso fresco contiene más tiramina que el curado, porque la maduración degrada la tirosina y elimina la tiramina." },
      { text: "La crisis se debe a la unión covalente de la tiramina con el FAD de la MAO, lo que bloquea los receptores β₁ cardíacos." },
    ],
    correctIndex: 1,
    explanation: "La tiramina de los alimentos curados se forma por descarboxilación de la tirosina. Con la MAO bloqueada de forma irreversible, pasa a la circulación, entra en las terminaciones simpáticas y desplaza la noradrenalina.\n\nDescartamos la A: La tiramina se forma por descarboxilación de la tirosina por bacterias, no por oxidación de la noradrenalina.\nDescartamos la C: El queso curado es el que tiene más tiramina; la maduración la acumula al descarboxilar la tirosina.\nDescartamos la D: La tiramina no se une covalentemente al FAD ni bloquea receptores β₁.\n\nReferencia: Apuntes §4.4."
  },
  {
    id: "t04-m2-q13",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P13 (Moclobemida: RIMA de uso clínico)",
    question: "Entre las cuatro estructuras, señale la moclobemida, el inhibidor reversible de la MAO-A de uso clínico, una 4-clorobenzamida unida por una cadena de etilendiamina a una morfolina.",
    options: [
      { text: "Estructura A", smiles: "O=C(NCCN1CCOCC1)c1ccc(Cl)cc1", revealedName: "moclobemida" },
      { text: "Estructura B", smiles: "CN(C)CCNC(=O)c1ccc(Cl)cc1", revealedName: "clorobenzamida con dimetilaminoetilo" },
      { text: "Estructura C", smiles: "NNC(=O)c1ccncc1", revealedName: "isoniazida" },
      { text: "Estructura D", smiles: "O=C(NCCN1CCOCC1)c1ccccc1", revealedName: "benzamida sin cloro con morfolina" },
    ],
    correctIndex: 0,
    explanation: "La moclobemida es una 4-clorobenzamida unida a morfolina por una cadena de etilendiamina. Esa cadena es esencial para la actividad reversible sobre la MAO-A.\n\nDescartamos la B: Tiene cloro en la benzamida pero una amina dimetilada en lugar de la morfolina.\nDescartamos la C: La isoniazida es una hidrazida de primera generación, no un RIMA.\nDescartamos la D: Le falta el cloro del anillo; la morfolina y la cadena de etilendiamina son las mismas.\n\nReferencia: Apuntes §4.5."
  },
  {
    id: "t04-m2-q14",
    topicId: "tema-04",
    block: "Bio/Metabolismo",
    badge: "Modelo 2 · P14 (Propargilaminas: inhibición covalente y recuperación)",
    question: "¿Por qué los IMAO de propargilo tardan unas dos semanas en recuperar la actividad enzimática?",
    questionStructures: [{ name: "Pargilina", smiles: "C#CCN(C)Cc1ccccc1" }],
    options: [
      { text: "Se disocian lentamente porque la unión es electrostática con un aspartato del centro activo de la enzima." },
      { text: "Son metabolizados por el hígado a un producto activo que inhibe la MAO durante varias semanas tras la dosis." },
      { text: "Forman un enlace covalente con el FAD, que solo se restablece cuando la célula sintetiza MAO nueva." },
      { text: "Desencadenan la degradación proteolítica del receptor 5-HT₁A, que tarda unas dos semanas en regenerarse." },
    ],
    correctIndex: 2,
    explanation: "El grupo propargilo se une de forma covalente a la MAO. La inactivación es permanente, y la actividad solo vuelve cuando se sintetiza enzima nueva, en unas dos semanas.\n\nDescartamos la A: La unión electrostática sería reversible; el propargilo se une de forma covalente.\nDescartamos la B: El metabolito no es el responsable: la inhibición es por la propia unión covalente.\nDescartamos la D: El receptor 5-HT₁A no es la diana de la MAO; la inhibición afecta a la enzima.\n\nReferencia: Apuntes §4.3 y figura 6."
  },
  {
    id: "t04-m2-q15",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 2 · P15 (Zolmitriptán: oxazolidinona en C5 y configuración (S))",
    question: "Entre las cuatro estructuras, señale el zolmitriptán, el triptán de segunda generación con una oxazolidinona en C5 del indol y configuración (S) en el estereocentro de ese anillo.",
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1", revealedName: "sumatriptán" },
      { text: "Estructura B", smiles: "CN(C)CCc1c[nH]c2ccc(C[C@H]3COC(=O)N3)cc12", revealedName: "zolmitriptán (S)" },
      { text: "Estructura C", smiles: "CN(C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12", revealedName: "almotriptán" },
      { text: "Estructura D", smiles: "CN(C)CCc1c[nH]c2ccc(C[C@@H]3COC(=O)N3)cc12", revealedName: "enantiómero (R) del zolmitriptán" },
    ],
    correctIndex: 1,
    explanation: "El zolmitriptán lleva en C5 una oxazolidinona, aceptora de enlaces de hidrógeno, en lugar de la sulfonamida abierta del sumatriptán. Se comercializa como el enantiómero (S), y su biodisponibilidad oral sube a ≈40 %.\n\nDescartamos la A: El sumatriptán lleva en C5 una sulfonamida abierta (–CH₂–SO₂–NH–CH₃), no una oxazolidinona, y su biodisponibilidad es de ≈14 %.\nDescartamos la C: El almotriptán lleva en C5 una sulfonamida cerrada en pirrolidina, no una oxazolidinona.\nDescartamos la D: Tiene la misma constitución, pero el estereocentro de la oxazolidinona es (R), no el (S) del fármaco comercializado.\n\nReferencia: Apuntes §5.2 (tabla de triptanes) y §8.1."
  },
];

// MODELO 3: Modelo 3 · Azapironas, setrones, ciproheptadina y almotriptán
// Clave: A, D, B, C, C, A, D, C, B, D, A, B, A, C, D
export const TEMA4_MODELO_3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t04-m3-q01",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P1 (Buspirona: reconocimiento de la azapirona)",
    question: "Entre las cuatro estructuras, señale la buspirona, el ansiolítico agonista parcial 5-HT₁A que no actúa sobre el GABA-A y no produce sedación ni dependencia.",
    options: [
      { text: "Estructura A", smiles: "O=C1CC2(CCCC2)CC(=O)N1CCCCN1CCN(CC1)c1ncccn1", revealedName: "buspirona" },
      { text: "Estructura B", smiles: "CN1C(=O)CN=C(c2ccccc2)c2cc(Cl)ccc21", revealedName: "diazepam" },
      { text: "Estructura C", smiles: "CNCCC(Oc1ccc(cc1)C(F)(F)F)c1ccccc1", revealedName: "fluoxetina" },
      { text: "Estructura D", smiles: "O=C(NCCN1CCOCC1)c1ccc(Cl)cc1", revealedName: "moclobemida" },
    ],
    correctIndex: 0,
    explanation: "La buspirona es una azapirona: una pirimidinilpiperazina unida por un puente de cuatro carbonos a una imida (8-azaspiro[4.5]decano-7,9-diona). Es agonista parcial 5-HT₁A, no modula el GABA-A y su efecto ansiolítico tarda de 2 a 4 semanas.\n\nDescartamos la B: El diazepam es una benzodiazepina, modulador alostérico positivo del GABA-A: seda y produce tolerancia y dependencia.\nDescartamos la C: La fluoxetina es un ISRS con arilo, cadena corta y amina secundaria; bloquea SERT y no es agonista 5-HT₁A.\nDescartamos la D: La moclobemida es una 4-clorobenzamida con morfolina, un RIMA que inhibe la MAO-A y no actúa sobre receptores 5-HT₁A.\n\nReferencia: Apuntes §5.5 y §8.1."
  },
  {
    id: "t04-m3-q02",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P2 (Granisetrón: amida de indazol con granatano)",
    question: "Entre las cuatro estructuras, señale el granisetrón, antiemético antagonista del receptor 5-HT₃ cuyo grupo carbonilo forma una amida.",
    options: [
      { text: "Estructura A", smiles: "CN1C2CCC1CC(C2)OC(=O)c1c[nH]c2ccccc12", revealedName: "tropisetrón" },
      { text: "Estructura B", smiles: "O=C1CC2(CCCC2)CC(=O)N1CCCCN1CCN(CC1)c1ncccn1", revealedName: "buspirona" },
      { text: "Estructura C", smiles: "CCN(CC)CCNC(=O)c1cc(Cl)c(N)cc1OC", revealedName: "metoclopramida" },
      { text: "Estructura D", smiles: "Cn1nc(C(=O)NC2CC3CCCC(C2)N3C)c2ccccc12", revealedName: "granisetrón" },
    ],
    correctIndex: 3,
    explanation: "El granisetrón es la amida del ácido 1-metilindazol-3-carboxílico con el 9-metil-9-azabiciclo[3.3.1]nonan-3-amina. La amida es más resistente a la hidrólisis que el éster del tropisetrón.\n\nDescartamos la A: El tropisetrón es un éster indol-3-carboxílico de tropina, no una amida con granatano.\nDescartamos la B: La buspirona es una azapirona con imida, sin biciclo básico ni antagonismo 5-HT₃.\nDescartamos la C: La metoclopramida es una benzamida antagonista D₂, no un setrón.\n\nReferencia: Apuntes §6 y figura 13."
  },
  {
    id: "t04-m3-q03",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P3 (Éster frente a amida en los setrones)",
    question: "En el paso de los setrones desde el éster de la cocaína hasta la amida, ¿qué ventaja se busca y por qué?",
    questionStructures: [{ name: "Cocaína", smiles: "COC(=O)[C@H]1[C@@H](OC(=O)c2ccccc2)C[C@@H]2CC[C@H]1N2C" }, { name: "Tropisetrón", smiles: "CN1C2CCC1CC(C2)OC(=O)c1c[nH]c2ccccc12" }, { name: "Granisetrón", smiles: "Cn1nc(C(=O)NC2CC3CCCC(C2)N3C)c2ccccc12" }],
    options: [
      { text: "Mayor lipofilia para cruzar la barrera hematoencefálica, ya que la amida es más apolar que el éster." },
      { text: "Mayor estabilidad frente a las esterasas, porque la amida se hidroliza mucho menos que el éster." },
      { text: "Menor afinidad por el canal 5-HT₃, lo que reduce los efectos adversos cardiacos del antiemético." },
      { text: "Mayor basicidad del nitrógeno a pH fisiológico, que mejora la unión al carboxilato del receptor." },
    ],
    correctIndex: 1,
    explanation: "Las esterasas hidrolizan con rapidez los ésteres. Sustituir el éster por una amida conserva la unión al receptor y aumenta la estabilidad metabólica.\n\nDescartamos la A: La amida no es más lipófila que el éster en el sentido que exige la barrera hematoencefálica.\nDescartamos la C: El objetivo del cambio es mantener la afinidad por el canal 5-HT₃, no reducirla.\nDescartamos la D: La amida no es más básica; la carga positiva la aporta el nitrógeno del biciclo, no el carbonilo.\n\nReferencia: Apuntes §6 (modificación 1)."
  },
  {
    id: "t04-m3-q04",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P4 (Almotriptán: sulfonamida de pirrolidina)",
    question: "Entre las cuatro estructuras, señale el almotriptán, el triptán de segunda generación con sulfonamida de pirrolidina en C5.",
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1", revealedName: "sumatriptán" },
      { text: "Estructura B", smiles: "CN(C)CCc1c[nH]c2ccc(CC3COC(=O)N3)cc12", revealedName: "zolmitriptán" },
      { text: "Estructura C", smiles: "CN(C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12", revealedName: "almotriptán" },
      { text: "Estructura D", smiles: "NC(=O)c1ccc2[nH]cc(CCN)c2c1", revealedName: "5-carboxamidotriptamina (5-CT)" },
    ],
    correctIndex: 2,
    explanation: "El almotriptán cierra la sulfonamida del sumatriptán en un anillo de pirrolidina, lo que baja la polaridad y eleva la biodisponibilidad oral hasta cerca del 70 %.\n\nDescartamos la A: El sumatriptán tiene una sulfonamida abierta con N-metilo en C5.\nDescartamos la B: El zolmitriptán lleva una oxazolidinona en C5, no una sulfonamida.\nDescartamos la D: La 5-CT tiene carboxamida en C5 y una amina primaria.\n\nReferencia: Apuntes §5.3 y figura 9."
  },
  {
    id: "t04-m3-q05",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P5 (Ondansetrón: carbazolona con 2-metilimidazol)",
    question: "Entre las cuatro estructuras, señale el ondansetrón, el setrón con un núcleo de carbazolona y un 2-metilimidazol.",
    options: [
      { text: "Estructura A", smiles: "COC(=O)C1C2CCC(CC1OC(=O)c1ccccc1)N2C", revealedName: "cocaína" },
      { text: "Estructura B", smiles: "CCN(CC)CCNC(=O)c1cc(Cl)c(N)cc1OC", revealedName: "metoclopramida" },
      { text: "Estructura C", smiles: "Cc1nccn1CC1CCc2c(C1=O)c1ccccc1n2C", revealedName: "ondansetrón" },
      { text: "Estructura D", smiles: "CN1C2CCC1CC(C2)OC(=O)c1c[nH]c2ccccc12", revealedName: "tropisetrón" },
    ],
    correctIndex: 2,
    explanation: "El ondansetrón es una carbazolona con un 2-metilimidazol unido por un CH₂. Esa combinación, y no un biciclo con nitrógeno básico, lo distingue de los demás setrones.\n\nDescartamos la A: La cocaína es un éster del tropano con ácido benzoico, sin carbazolona ni imidazol.\nDescartamos la B: La metoclopramida es una benzamida con cadena de dietilaminoetilo, sin biciclo ni imidazol.\nDescartamos la D: El tropisetrón es el éster indol-3-carboxílico de la tropina, sin carbazolona.\n\nReferencia: Apuntes §6 y figura 13; §8.2."
  },
  {
    id: "t04-m3-q06",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P6 (Compuesto 3: dibenzosuberona por Friedel–Crafts intramolecular)",
    question: "El ácido 2-(2-feniletil)benzoico de la figura se trata con ácido polifosfórico y da el primer intermedio de la síntesis de la ciproheptadina. Señale su estructura.",
    questionStructures: [{ name: "Ácido 2-(2-feniletil)benzoico", smiles: "OC(=O)c1ccccc1CCc1ccccc1" }],
    options: [
      { text: "Estructura A", smiles: "O=C1CCc2ccccc2-c2ccccc12", revealedName: "dibenzosuberona" },
      { text: "Estructura B", smiles: "O=C1c2ccccc2C(Br)Cc2ccccc12", revealedName: "10-bromodibenzosuberona" },
      { text: "Estructura C", smiles: "CN1CCC(=C2c3ccccc3C=Cc3ccccc32)CC1", revealedName: "ciproheptadina" },
      { text: "Estructura D", smiles: "CN(C)CCC=C1c2ccccc2CCc2ccccc21", revealedName: "amitriptilina" },
    ],
    correctIndex: 0,
    explanation: "El ácido polifosfórico promueve la acilación de Friedel–Crafts intramolecular: el carboxilo ataca el otro anillo aromático y cierra el anillo de siete miembros con un carbonilo, la dibenzosuberona.\n\nDescartamos la B: El bromuro es el compuesto 4, que se forma en la etapa siguiente con NBS.\nDescartamos la C: La ciproheptadina es el producto final, con el piperidilideno ya introducido.\nDescartamos la D: La amitriptilina es otro tricíclico, con cadena de tres carbonos y sin carbonilo.\n\nReferencia: Apuntes §7.4 (compuesto 3) y §7.6."
  },
  {
    id: "t04-m3-q07",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P7 (Compuesto 4: bromación bencílica con NBS)",
    question: "La dibenzosuberona de la figura se trata con NBS (luz o calor). ¿Qué reacción tiene lugar y en qué posición?",
    questionStructures: [{ name: "Dibenzosuberona", smiles: "O=C1CCc2ccccc2-c2ccccc12" }],
    options: [
      { text: "Acilación de Friedel–Crafts en el anillo aromático, con un grupo acilo en posición para al carbonilo." },
      { text: "Adición electrófila de Br₂ a un doble enlace, que da un dibromuro vecinal en el anillo central de siete miembros." },
      { text: "Sustitución nucleófila acílica del carbonilo por bromuro, con salida de agua y formación de un bromuro de acilo." },
      { text: "Bromación radicalaria del carbono bencílico C10, que es el CH₂ unido directamente a un anillo aromático." },
    ],
    correctIndex: 3,
    explanation: "El NBS, con luz o calor, genera bromo radicalario que solo ataca el carbono unido al anillo aromático. En la dibenzosuberona, esa posición bencílica es C10.\n\nDescartamos la A: La acilación necesita RCOCl y AlCl₃; el NBS no introduce grupos acilo.\nDescartamos la B: El sustrato no tiene doble enlace en el anillo central; el NBS actúa sobre el CH₂ bencílico.\nDescartamos la C: El carbonilo de una cetona no se sustituye por bromuro con NBS.\n\nReferencia: Apuntes §7.4 (compuesto 4) y §7.6."
  },
  {
    id: "t04-m3-q08",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P8 (Compuesto 5: E2 con trietilamina)",
    question: "El bromuro bencílico de la figura se trata con trietilamina. ¿Qué reacción ocurre?",
    questionStructures: [{ name: "Bromuro bencílico (compuesto 4)", smiles: "O=C1c2ccccc2C(Br)Cc2ccccc12" }],
    options: [
      { text: "Sustitución SN2 del bromo por la amina, con formación de una sal de amonio cuaternaria unida al anillo central." },
      { text: "Reducción del enlace C–Br a C–H por transferencia de hidruro desde la amina, sin cambio en el esqueleto." },
      { text: "Deshidrohalogenación E2: la base retira un H vecino, sale HBr y se forma el doble enlace C10=C11 del anillo." },
      { text: "Hidrólisis del bromuro a alcohol secundario por el agua residual, con la amina como catalizador ácido." },
    ],
    correctIndex: 2,
    explanation: "La trietilamina es una base orgánica que arranca un protón vecino al bromo. Sale HBr y se forma el doble enlace C10=C11 en el anillo central.\n\nDescartamos la A: La trietilamina actúa aquí como base orgánica, no como nucleófilo.\nDescartamos la B: La trietilamina no es un agente reductor.\nDescartamos la D: No hay hidrólisis: la base provoca la eliminación de HBr y no forma un alcohol.\n\nReferencia: Apuntes §7.4 (compuesto 5) y §7.6."
  },
  {
    id: "t04-m3-q09",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P9 (Compuesto 6: adición de Grignard al carbonilo)",
    question: "La cetona de la figura reacciona con el reactivo de Grignard de la figura, preparado con la 4-cloro-1-metilpiperidina (Mg, éter), y después se trata con H₃O⁺. Señale el producto de esta etapa.",
    questionStructures: [{ name: "Cetona (compuesto 5)", smiles: "O=C1c2ccccc2C=Cc2ccccc12" }, { name: "Reactivo de Grignard de la 4-cloro-1-metilpiperidina", smiles: "CN1CCC([Mg]Cl)CC1" }],
    options: [
      { text: "Estructura A", smiles: "CN1CCC(=C2c3ccccc3C=Cc3ccccc32)CC1", revealedName: "ciproheptadina" },
      { text: "Estructura B", smiles: "CN1CCC(CC1)C1(O)c2ccccc2C=Cc2ccccc12", revealedName: "alcohol terciario" },
      { text: "Estructura C", smiles: "OC1c2ccccc2C=Cc2ccccc12", revealedName: "alcohol secundario" },
      { text: "Estructura D", smiles: "CN1CCC(CC1)C1c2ccccc2C=Cc2ccccc12", revealedName: "producto con C–H en lugar de OH" },
    ],
    correctIndex: 1,
    explanation: "El carbono unido al magnesio actúa como nucleófilo y ataca el carbono del C=O. Tras el tratamiento con H₃O⁺ queda un alcohol terciario con el anillo de piperidina, que se deshidrata en la etapa siguiente.\n\nDescartamos la A: La ciproheptadina es el resultado de la deshidratación posterior con H⁺ y calor.\nDescartamos la C: Es el alcohol que resultaría de reducir la cetona, sin introducir el anillo de piperidina.\nDescartamos la D: Tiene el anillo de piperidina, pero ha perdido el OH, que el Grignard deja en el carbono tras el H₃O⁺.\n\nReferencia: Apuntes §7.4 (compuesto 6) y §7.6."
  },
  {
    id: "t04-m3-q10",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P10 (Etapa 17: reducción del nitro a anilina)",
    question: "En la síntesis del almotriptán, el compuesto nitrado de la figura se trata con H₂ y Ni Raney. Señale el producto.",
    questionStructures: [{ name: "Sulfonamida de pirrolidina con NO₂", smiles: "O=[N+]([O-])c1ccc(CS(=O)(=O)N2CCCC2)cc1" }],
    options: [
      { text: "Estructura A", smiles: "N#[N+]c1ccc(CS(=O)(=O)N2CCCC2)cc1", revealedName: "sal de diazonio" },
      { text: "Estructura B", smiles: "NNc1ccc(CS(=O)(=O)N2CCCC2)cc1", revealedName: "arilhidrazina" },
      { text: "Estructura C", smiles: "NC1CCC(CS(=O)(=O)N2CCCC2)CC1", revealedName: "ciclohexilamina" },
      { text: "Estructura D", smiles: "Nc1ccc(CS(=O)(=O)N2CCCC2)cc1", revealedName: "anilina" },
    ],
    correctIndex: 3,
    explanation: "El H₂ con Ni Raney reduce el NO₂ a NH₂ y deja la sulfonamida intacta. La anilina se diazota después con NaNO₂ y HCl, y se reduce con SnCl₂ para dar la arilhidrazina.\n\nDescartamos la A: La sal de diazonio se forma después, al tratar la anilina con NaNO₂ y HCl.\nDescartamos la B: La arilhidrazina se obtiene al reducir la sal de diazonio con SnCl₂, dos etapas más tarde.\nDescartamos la C: El anillo aromático no se hidrogena en estas condiciones; se reduce el NO₂.\n\nReferencia: Apuntes §7.5 (etapa 17) y §7.6."
  },
  {
    id: "t04-m3-q11",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P11 (Aminación reductora: se detiene en la amina terciaria)",
    question: "La triptamina primaria de la figura se trata con formaldehído en exceso y NaBH₃CN. Señale el producto principal.",
    questionStructures: [{ name: "Triptamina primaria", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN)c2c1" }],
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1", revealedName: "amina terciaria N,N-dimetilada (sumatriptán)" },
      { text: "Estructura B", smiles: "CNCCc1c[nH]c2ccc(CS(=O)(=O)NC)cc12", revealedName: "amina secundaria N-monometilada" },
      { text: "Estructura C", smiles: "C[N+](C)(C)CCc1c[nH]c2ccc(CS(=O)(=O)NC)cc12", revealedName: "sal de amonio cuaternaria" },
      { text: "Estructura D", smiles: "O=CNCCc1c[nH]c2ccc(CS(=O)(=O)NC)cc12", revealedName: "formamida N-formilada" },
    ],
    correctIndex: 0,
    explanation: "Cada ciclo forma un ion iminio con el formaldehído y lo reduce con el hidruro. Tras dos ciclos el nitrógeno es terciario, no tiene H y no puede formar más iminio, de modo que la reacción se detiene sola en el sumatriptán.\n\nDescartamos la B: La amina secundaria sí tiene un H en el nitrógeno y forma otro ion iminio con el formaldehído en exceso, así que la reacción sigue.\nDescartamos la C: La sal cuaternaria es el producto de la alquilación directa con CH₃I; en la aminación reductora no se forma.\nDescartamos la D: La formamida requeriría un agente acilante, y el NaBH₃CN solo reduce el ion iminio.\n\nReferencia: Apuntes §7.3 (aminación reductora) y figura 16."
  },
  {
    id: "t04-m3-q12",
    topicId: "tema-04",
    block: "Síntesis",
    badge: "Modelo 3 · P12 (Etapa 19: Fischer (variante de Grandberg) con 4-clorobutanal)",
    question: "En la síntesis del almotriptán, la arilhidrazina de la figura se calienta con 4-clorobutanal y HCl (Fischer, variante de Grandberg). Señale el producto.",
    questionStructures: [{ name: "Arilhidrazina (compuesto a)", smiles: "NNc1ccc(CS(=O)(=O)N2CCCC2)cc1" }],
    options: [
      { text: "Estructura A", smiles: "ClCCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12", revealedName: "3-(2-cloroetil)indol" },
      { text: "Estructura B", smiles: "NCCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12", revealedName: "triptamina primaria con sulfonamida de pirrolidina" },
      { text: "Estructura C", smiles: "CN(C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12", revealedName: "almotriptán (amina terciaria)" },
      { text: "Estructura D", smiles: "ClCCCC=NNc1ccc(CS(=O)(=O)N2CCCC2)cc1", revealedName: "arilhidrazona sin ciclar" },
    ],
    correctIndex: 1,
    explanation: "Con el 4-clorobutanal la síntesis de Fischer da directamente la triptamina primaria, sin pasar por el nitrilo: el CHO acaba en C2, el CH₂ en α en C3 y el resto de la cadena queda como –CH₂–CH₂–NH₂. El almotriptán se obtiene después con HCHO y NaBH₄ (o NaBH₃CN).\n\nDescartamos la A: El 3-(2-cloroetil)indol conserva el cloro y no lleva la amina; en la variante de Grandberg la cadena sale como amina primaria.\nDescartamos la C: El almotriptán es la amina terciaria que se forma en la etapa siguiente, con HCHO y un hidruro; aquí no hay fuente de metilos.\nDescartamos la D: La arilhidrazona es el primer intermedio de la condensación; con ácido y calor sigue la transposición [3,3] y la ciclación a indol.\n\nReferencia: Apuntes §7.5 (etapa 19) y §7.6."
  },
  {
    id: "t04-m3-q13",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P13 (1-PP: metabolito activo de la buspirona)",
    question: "La buspirona de la figura se N-desalquila en el hígado y da un metabolito activo que bloquea los receptores α₂ presinápticos y aumenta la liberación de noradrenalina. Señale su estructura.",
    questionStructures: [{ name: "Buspirona", smiles: "O=C1CC2(CCCC2)CC(=O)N1CCCCN1CCN(CC1)c1ncccn1" }],
    options: [
      { text: "Estructura A", smiles: "c1cnc(nc1)N1CCNCC1", revealedName: "1-(2-pirimidinil)piperazina (1-PP)" },
      { text: "Estructura B", smiles: "c1ccnc(c1)N1CCNCC1", revealedName: "1-(2-piridil)piperazina" },
      { text: "Estructura C", smiles: "O=C1CC2(CCCC2)CC(=O)N1", revealedName: "8-azaspiro[4.5]decano-7,9-diona" },
      { text: "Estructura D", smiles: "c1ccc(cc1)N1CCNCC1", revealedName: "1-fenilpiperazina" },
    ],
    correctIndex: 0,
    explanation: "La N-desalquilación rompe el enlace entre el puente de cuatro carbonos y la piperazina y deja la 1-(2-pirimidinil)piperazina (1-PP). Ese metabolito bloquea los receptores α₂ presinápticos y aumenta la liberación de noradrenalina.\n\nDescartamos la B: Tiene un anillo de piridina en lugar de pirimidina; la buspirona lleva dos nitrógenos en el heterociclo aromático.\nDescartamos la C: Es el fragmento de imida que queda al otro lado del puente; no contiene la piperazina y no es el metabolito activo.\nDescartamos la D: Tiene un fenilo en lugar de la pirimidina; la buspirona no tiene ningún benceno.\n\nReferencia: Apuntes §5.5 (1-PP)."
  },
  {
    id: "t04-m3-q14",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P14 (Amitriptilina: carbono sp² exocíclico con cadena de tres carbonos)",
    question: "Entre las cuatro estructuras, señale la amitriptilina, el tricíclico con un carbono sp² en lugar del nitrógeno del anillo central y una cadena de tres carbonos que termina en dimetilamina.",
    options: [
      { text: "Estructura A", smiles: "CN(C)CCCN1c2ccccc2CCc2ccccc21", revealedName: "imipramina" },
      { text: "Estructura B", smiles: "OCCN1CCN(CCCN2c3ccccc3C=Cc3ccccc32)CC1", revealedName: "opipramol" },
      { text: "Estructura C", smiles: "CN(C)CCC=C1c2ccccc2CCc2ccccc21", revealedName: "amitriptilina" },
      { text: "Estructura D", smiles: "CN1CCC(=C2c3ccccc3C=Cc3ccccc32)CC1", revealedName: "ciproheptadina" },
    ],
    correctIndex: 2,
    explanation: "La amitriptilina es un dibenzocicloheptano: el nitrógeno del anillo central de la imipramina se cambia por un carbono sp² con un metilideno exocíclico, y conserva la cadena de tres carbonos con dimetilamina.\n\nDescartamos la A: La imipramina mantiene el nitrógeno en el anillo central; el átomo del puente es N y no un carbono sp².\nDescartamos la B: El opipramol conserva el nitrógeno del anillo, lleva un doble enlace C10=C11 y una hidroxietilpiperazina en la cadena.\nDescartamos la D: La ciproheptadina tiene el mismo tricíclico de siete con C10=C11, pero un piperidilideno en lugar de la cadena de tres carbonos.\n\nReferencia: Apuntes §3.3 y §8.2."
  },
  {
    id: "t04-m3-q15",
    topicId: "tema-04",
    block: "SAR",
    badge: "Modelo 3 · P15 (Lasmiditán: ditán 5-HT₁F que no es un indol)",
    question: "Entre las cuatro estructuras, señale el lasmiditán, el agonista 5-HT₁F que se emplea cuando los triptanes están contraindicados por riesgo vascular.",
    options: [
      { text: "Estructura A", smiles: "CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1", revealedName: "sumatriptán" },
      { text: "Estructura B", smiles: "O=C(NCCN1CCOCC1)c1ccc(Cl)cc1", revealedName: "moclobemida" },
      { text: "Estructura C", smiles: "CN(C)CCc1c[nH]c2ccc(CC3COC(=O)N3)cc12", revealedName: "zolmitriptán" },
      { text: "Estructura D", smiles: "CN1CCC(C(=O)c2cccc(NC(=O)c3c(F)cc(F)cc3F)n2)CC1", revealedName: "lasmiditán" },
    ],
    correctIndex: 3,
    explanation: "El lasmiditán es un ditán: agonista 5-HT₁F que no contrae los vasos. No es un indol; lleva una piridina y una piperidina unidas por una cetona y una amida con un trifluorobenzoilo.\n\nDescartamos la A: El sumatriptán es un triptán, agonista 5-HT₁B/1D, y la vasoconstricción que produce lo contraindica en la cardiopatía isquémica.\nDescartamos la B: La moclobemida es un RIMA con 4-clorobenzamida y morfolina; no es un antimigrañoso.\nDescartamos la C: El zolmitriptán es un triptán de segunda generación con oxazolidinona en C5, agonista 5-HT₁B/1D.\n\nReferencia: Apuntes §5.2."
  },
];
