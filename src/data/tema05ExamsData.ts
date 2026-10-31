// ==========================================================================
// QFDOS - Exámenes del Tema 05: Aminoácidos como neurotransmisores
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Generado con scripts/exportar_examenes_tema5_web.py desde Exámenes modelo jev/Tema 5/banco.
// Mismo orden y claves que los cuadernillos QFDOS_Tema5_Examen{1,2,3}_15preguntas.
// Consolidado contra los apuntes publicados del Tema 5 (QFDOS Tema 5 Apuntes.pdf).
// Tipografía científica: Unicode directo, sin LaTeX crudo.
// ==========================================================================

import type { TestQuestion } from './qfdosData';

// MODELO 1: Glutamato, SAR de benzodiazepinas, Sternbach y barbitúricos
// Clave: A, B, C, D, B, A, D, C, A, C, B, D, A, B, C
export const TEMA5_MODELO_1_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t05-m1-q01",
    topicId: "tema-05",
    block: "SAR · Aminoácidos neurotransmisores",
    badge: "Modelo 1 · P1 · SAR · Aminoácidos neurotransmisores",
    question: "¿Cuál de las siguientes estructuras corresponde a un aminoácido neurotransmisor excitador?",
    options: [
      { text: "Estructura A", smiles: "N[C@@H](CCC(=O)O)C(=O)O", revealedName: "Ácido L-glutámico" },
      { text: "Estructura B", smiles: "NCCCC(=O)O", revealedName: "GABA" },
      { text: "Estructura C", smiles: "NCC(=O)O", revealedName: "Glicina" },
      { text: "Estructura D", smiles: "NCCS(=O)(=O)O", revealedName: "Taurina" },
    ],
    correctIndex: 0,
    explanation: "Los aminoácidos excitadores tienen carácter ácido: dos grupos ácidos frente a un solo grupo básico, como el ácido glutámico y el aspártico. Los inhibidores (GABA, glicina, taurina) tienen un grupo ácido y uno amino y son neutros.\n\nDescartamos la B: Tiene un solo grupo ácido y un solo grupo amino: es un aminoácido neutro, inhibidor.\nDescartamos la C: Tiene un solo grupo ácido y un solo grupo amino: es neutra e inhibidora.\nDescartamos la D: Lleva un único grupo ácido (sulfónico) y un grupo amino: es neutra e inhibidora.\n\nReferencia: Apuntes, Excitadores e inhibidores."
  },
  {
    id: "t05-m1-q02",
    topicId: "tema-05",
    block: "Bioquímica · Metabolismo del GABA",
    badge: "Modelo 1 · P2 · Bioquímica · Metabolismo del GABA",
    question: "Queremos subir el GABA del cerebro con un fármaco que cruce la barrera hematoencefálica. ¿Qué enzima conviene inhibir y qué efecto se espera?",
    options: [
      { text: "Inhibir la GAD: el GABA sube y el fármaco es anticonvulsivo" },
      { text: "Inhibir la GABA-AT: el GABA sube y el fármaco es anticonvulsivo" },
      { text: "Inhibir la GABA-AT: el GABA baja y el fármaco es proconvulsivante" },
      { text: "Inhibir la GAD: el GABA baja y el fármaco es anticonvulsivo" },
    ],
    correctIndex: 1,
    explanation: "La GABA-AT degrada el GABA a semialdehído succínico; bloquearla deja más GABA disponible y protege de las crisis, y es la diana de la vigabatrina. La GAD, en cambio, sintetiza el GABA a partir del glutamato, de modo que sus inhibidores bajan el GABA y producen convulsiones.\n\nDescartamos la A: La GAD fabrica el GABA a partir del glutamato; inhibirla hace que el GABA baje.\nDescartamos la C: La GABA-AT degrada el GABA; si se bloquea, el GABA se acumula en lugar de bajar.\nDescartamos la D: Al inhibir la GAD el GABA baja de verdad, pero eso favorece las convulsiones, no las evita.\n\nReferencia: Apuntes, Biosíntesis y degradación del GABA; qué enzima hay que inhibir."
  },
  {
    id: "t05-m1-q03",
    topicId: "tema-05",
    block: "Bioquímica · Metabolismo del GABA",
    badge: "Modelo 1 · P3 · Bioquímica · Metabolismo del GABA",
    question: "La GABA transaminasa quita el grupo amino del GABA y deja un aldehído, que la SSADH oxida después a ácido succínico. ¿Cuál es la estructura de ese aldehído, el semialdehído succínico?",
    options: [
      { text: "Estructura A", smiles: "O=CCC(=O)O", revealedName: "Ácido 3-oxopropanoico" },
      { text: "Estructura B", smiles: "O=CCCCC(=O)O", revealedName: "Ácido 5-oxopentanoico" },
      { text: "Estructura C", smiles: "O=CCCC(=O)O", revealedName: "Semialdehído succínico (ácido 4-oxobutanoico)" },
      { text: "Estructura D", smiles: "O=CCCC=O", revealedName: "Butanodial" },
    ],
    correctIndex: 2,
    explanation: "Contamos los carbonos de la ruta: ácido glutámico 5, GABA 4 (pierde el CO₂ del carboxilo α), semialdehído succínico 4 y ácido succínico 4. El semialdehído lleva un CHO en un extremo, donde estaba el amino, y el COOH original en el otro.\n\nDescartamos la A: Solo tiene 3 carbonos: el GABA pierde únicamente el CO₂ del carboxilo α y conserva 4.\nDescartamos la B: Tiene 5 carbonos, los mismos que el ácido glutámico; el GABA ya ha perdido uno.\nDescartamos la D: Tiene 4 carbonos pero dos aldehídos: falta el carboxilo, que debe estar en el otro extremo.\n\nReferencia: Apuntes, Contar carbonos en la ruta del GABA."
  },
  {
    id: "t05-m1-q04",
    topicId: "tema-05",
    block: "Bioquímica · PLP",
    badge: "Modelo 1 · P4 · Bioquímica · PLP",
    question: "El fosfato de piridoxal (PLP) es el cofactor de la GAD y de la GABA-AT. ¿Qué hace su aldehído del C4 en el enzima y en qué se convierte el cofactor al recibir el grupo amino del sustrato?",
    questionStructures: [{ name: "Fosfato de piridoxal", smiles: "Cc1ncc(COP(=O)(O)O)c(C=O)c1O" }],
    options: [
      { text: "Forma un hemiacetal con una serina y pasa a PMP, con un CH₂–NH₂" },
      { text: "Forma una imina con una lisina y pasa a un alcohol, con un CH₂–OH" },
      { text: "Forma un tioéster con una cisteína y pasa a un alcohol, con un CH₂–OH" },
      { text: "Forma una imina con una lisina y pasa a PMP, con un CH₂–NH₂" },
    ],
    correctIndex: 3,
    explanation: "Una lisina del centro activo ataca el aldehído del C4, sale agua y se forma una base de Schiff (aldimina interna). Cuando el cofactor recibe el amino del sustrato, el CHO pasa a CH₂–NH₂ y el PLP se convierte en fosfato de piridoxamina (PMP).\n\nDescartamos la A: En el enzima, el aldehído del PLP se une a una lisina y forma una base de Schiff (aldimina interna); no se une a una serina.\nDescartamos la B: Al recibir el amino el cofactor gana un CH₂–NH₂ (PMP); no se reduce a alcohol.\nDescartamos la C: Un aldehído no forma un tioéster con una cisteína (el enlace con el enzima es la imina con la lisina) y el cofactor no se reduce a alcohol: gana un CH₂–NH₂.\n\nReferencia: Apuntes, El PLP, cofactor de las enzimas del GABA."
  },
  {
    id: "t05-m1-q05",
    topicId: "tema-05",
    block: "Síntesis · Reactividad",
    badge: "Modelo 1 · P5 · Síntesis · Reactividad",
    question: "¿Cuál de las siguientes estructuras puede sufrir una adición 1,4 (adición de Michael) de un nucleófilo blando como un tiol o una amina?",
    options: [
      { text: "Estructura A", smiles: "C=CCC(=O)OCC", revealedName: "But-3-enoato de etilo (CH₂ sp³ entre C=O y C=C)" },
      { text: "Estructura B", smiles: "CC=CC(=O)OCC", revealedName: "Crotonato de etilo (C=O conjugado con C=C)" },
      { text: "Estructura C", smiles: "C=CCCC(=O)OCC", revealedName: "Pent-4-enoato de etilo (C=C aislado)" },
      { text: "Estructura D", smiles: "C=CCC(C)=O", revealedName: "Pent-4-en-2-ona (CH₂ sp³ entre C=O y C=C)" },
    ],
    correctIndex: 1,
    explanation: "La adición 1,4 exige un C=O (éster, cetona, ácido, amida o aldehído) directamente conjugado con un C=C: las formas resonantes dejan carga parcial positiva en el carbono β y el nucleófilo ataca ahí. Si hay un CH₂ sp³ entre ambos grupos, la conjugación se corta y no hay carbono β electrófilo.\n\nDescartamos la A: El CH₂ sp³ entre el C=O y el C=C corta la conjugación: no hay carbono β electrófilo.\nDescartamos la C: El doble enlace está separado del carbonilo por dos CH₂ sp³: no está conjugado.\nDescartamos la D: Es una cetona, pero el CH₂ sp³ interrumpe la conjugación con el C=C terminal.\n\nReferencia: Apuntes, La adición 1,4 (adición de Michael)."
  },
  {
    id: "t05-m1-q06",
    topicId: "tema-05",
    block: "Bioquímica · Receptor GABA-A",
    badge: "Modelo 1 · P6 · Bioquímica · Receptor GABA-A",
    question: "Las benzodiazepinas y los barbitúricos potencian el receptor GABA-A sin unirse al sitio del GABA. ¿Cuál de estas afirmaciones sobre su acción en el canal es correcta?",
    options: [
      { text: "Las benzodiazepinas aumentan la frecuencia de apertura y necesitan GABA" },
      { text: "Las benzodiazepinas alargan la duración de la apertura y necesitan GABA" },
      { text: "Los barbitúricos aumentan la frecuencia de apertura y necesitan GABA" },
      { text: "Los barbitúricos alargan la apertura y el flumazenilo los revierte" },
    ],
    correctIndex: 0,
    explanation: "Las benzodiazepinas se unen en la interfase α/γ2 y aumentan la frecuencia de apertura del canal; son moduladores alostéricos y sin GABA no tienen efecto. Los barbitúricos, en el dominio transmembrana, alargan la duración de la apertura y a dosis altas abren el canal sin GABA. El flumazenilo revierte solo a las benzodiazepinas.\n\nDescartamos la B: Es el efecto de los barbitúricos; las benzodiazepinas actúan sobre la frecuencia de apertura.\nDescartamos la C: Los barbitúricos alargan la duración de la apertura y, a dosis altas, abren el canal sin GABA.\nDescartamos la D: El flumazenilo ocupa el sitio de las benzodiazepinas; los barbitúricos se unen en el dominio transmembrana y no tienen antídoto.\n\nReferencia: Apuntes, Benzodiazepinas frente a barbitúricos."
  },
  {
    id: "t05-m1-q07",
    topicId: "tema-05",
    block: "Síntesis · Benzodiazepinas",
    badge: "Modelo 1 · P7 · Síntesis · Benzodiazepinas",
    question: "La quinazolina 3-óxido con un clorometilo en C2 se trata con metilamina (una amina primaria). ¿Qué ocurre?",
    questionStructures: [{ name: "Quinazolina 3-óxido", smiles: "ClCc1nc2ccc(Cl)cc2c(-c2ccccc2)[n+]1[O-]" }],
    options: [
      { text: "SN2 sobre el CH₂Cl con el anillo de seis intacto: producto inactivo" },
      { text: "SN2 de la metilamina sobre el CH₂Cl y expansión posterior a siete eslabones" },
      { text: "Ataque en C2 y salida del N-óxido, con el anillo de seis intacto" },
      { text: "Ataque en C2 con apertura del anillo y cierre a siete eslabones" },
    ],
    correctIndex: 3,
    explanation: "La metilamina, poco impedida, ataca el C2 de la quinazolina 3-óxido, que tiene carga parcial positiva. Se abre el anillo de seis y el nitrógeno ataca después el carbono del clorometilo, cerrando un anillo de siete: es el clordiazepóxido, activo. Las aminas secundarias hacen una SN2 sobre el clorometilo, conservan el anillo de seis y dan productos inactivos.\n\nDescartamos la A: Esa es la vía de las aminas secundarias, más voluminosas; la metilamina, poco impedida, ataca el C2.\nDescartamos la B: La metilamina no sustituye al cloro: ataca el C2 y abre el anillo de seis; el CH₂Cl lo desplaza después, dentro de la misma molécula, el nitrógeno que cierra el anillo de siete.\nDescartamos la C: El ataque en C2 abre el anillo de seis; el producto lo cierra de nuevo a siete eslabones con el N-óxido todavía presente.\n\nReferencia: Apuntes, Descubrimiento de las benzodiazepinas: Sternbach."
  },
  {
    id: "t05-m1-q08",
    topicId: "tema-05",
    block: "Síntesis · Benzodiazepinas",
    badge: "Modelo 1 · P8 · Síntesis · Benzodiazepinas",
    question: "La síntesis del diazepam parte de la oxima de la 2-amino-5-clorobenzofenona, que se trata con cloruro de cloroacetilo (ClCH₂COCl). ¿Qué tipo de reacción es este primer paso?",
    questionStructures: [{ name: "Oxima de partida", smiles: "Nc1ccc(Cl)cc1C(=NO)c1ccccc1" }, { name: "ClCH₂COCl", smiles: "O=C(Cl)CCl" }],
    options: [
      { text: "Alquilación del NH₂ de la oxima por el CH₂Cl del reactivo; sale HCl" },
      { text: "Reducción del C=N de la oxima por el cloruro de cloroacetilo" },
      { text: "Acilación del NH₂ por el C=O del cloruro de ácido; sale HCl" },
      { text: "Acilación de Friedel–Crafts del anillo aromático de la oxima" },
    ],
    correctIndex: 2,
    explanation: "El NH₂ aromático ataca el carbonilo del cloruro de ácido (adición–eliminación) y forma la cloroacetamida. Es una acilación, no una alquilación: el CH₂Cl queda intacto y se usa después para cerrar el anillo de siete eslabones.\n\nDescartamos la A: El reactivo que reacciona es el cloruro de ácido, mucho más electrófilo que el CH₂Cl; la alquilación por el CH₂Cl no es el primer paso.\nDescartamos la B: El cloruro de cloroacetilo no aporta hidruro ni electrones: es un electrófilo y no un reductor.\nDescartamos la D: No hay ácido de Lewis (AlCl₃) en este paso; el nucleófilo es el NH₂, no un carbono del anillo.\n\nReferencia: Apuntes, Síntesis del diazepam y del oxazepam."
  },
  {
    id: "t05-m1-q09",
    topicId: "tema-05",
    block: "Bioquímica · Metabolismo de benzodiazepinas",
    badge: "Modelo 1 · P9 · Bioquímica · Metabolismo de benzodiazepinas",
    question: "El clorazepato se administra como sal del ácido que se muestra, con un COOH en el C3. ¿Qué le ocurre en el estómago y qué compuesto activo libera?",
    questionStructures: [{ name: "Ácido clorazépico", smiles: "O=C(O)C1N=C(c2ccccc2)c2cc(Cl)ccc2NC1=O" }],
    options: [
      { text: "Se descarboxila y libera nordazepam, el compuesto activo" },
      { text: "Se descarboxila y libera oxazepam, el compuesto activo" },
      { text: "Se descarboxila y libera diazepam, el compuesto activo" },
      { text: "Se glucuronida en el COOH y se elimina por la orina enseguida" },
    ],
    correctIndex: 0,
    explanation: "El 3-COOH se descarboxila en el estómago y deja el C3 con hidrógenos: sale nordazepam, que es el compuesto activo. Por eso el clorazepato es un profármaco.\n\nDescartamos la B: El oxazepam lleva un OH en C3; al perder el CO₂ el C3 queda con H, como en el nordazepam.\nDescartamos la C: El diazepam lleva un metilo en N1 que el clorazepato no tiene; la descarboxilación no metila ningún nitrógeno.\nDescartamos la D: La glucuronidación directa es propia de los 3-OH; aquí el COOH se pierde como CO₂ en el estómago.\n\nReferencia: Apuntes, SAR de las benzodiazepinas (C3: COOH, clorazepato)."
  },
  {
    id: "t05-m1-q10",
    topicId: "tema-05",
    block: "SAR · Benzodiazepinas",
    badge: "Modelo 1 · P10 · SAR · Benzodiazepinas",
    question: "Se muestran cuatro 1,4-benzodiazepin-2-onas con el mismo resto de la molécula y distinto sustituyente en el anillo A. ¿Cuál carecería de actividad en el sitio benzodiazepínico del receptor GABA-A?",
    options: [
      { text: "Estructura A", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1", revealedName: "Nordazepam (7-Cl)" },
      { text: "Estructura B", smiles: "O=C1CN=C(c2ccccc2)c2cc([N+](=O)[O-])ccc2N1", revealedName: "Nitrazepam (7-NO₂)" },
      { text: "Estructura C", smiles: "O=C1CN=C(c2ccccc2)c2cc(N)ccc2N1", revealedName: "7-Amino análogo (sin uso clínico)" },
      { text: "Estructura D", smiles: "O=C1CN=C(c2ccccc2)c2cc(C(F)(F)F)ccc2N1", revealedName: "7-Trifluorometil análogo" },
    ],
    correctIndex: 2,
    explanation: "En el anillo A conviene un grupo atrayente de electrones en C7 (Cl, NO₂, CF₃, Br, CN). Un grupo dador como el –NH₂ en esa posición hace que la molécula pierda la actividad.\n\nDescartamos la A: El Cl en C7 es un grupo atrayente de electrones, que es lo que conviene en esa posición.\nDescartamos la B: El NO₂ en C7 es atrayente de electrones: da un hipnótico activo.\nDescartamos la D: El CF₃ es atrayente de electrones; está entre los grupos que mantienen la actividad en C7.\n\nReferencia: Apuntes, SAR de las benzodiazepinas."
  },
  {
    id: "t05-m1-q11",
    topicId: "tema-05",
    block: "SAR · Benzodiazepinas",
    badge: "Modelo 1 · P11 · SAR · Benzodiazepinas",
    question: "En una 1,4-benzodiazepina con un fenilo en C5 (anillo C), ¿qué sustitución del fenilo aumenta la actividad?",
    options: [
      { text: "Un F o un Cl en posición meta (3′) del fenilo." },
      { text: "Un F o un Cl en posición orto (2′) del fenilo." },
      { text: "Un F o un Cl en posición para (4′) del fenilo." },
      { text: "Un F o un Cl en meta y en para (3′ y 4′)." },
    ],
    correctIndex: 1,
    explanation: "Un F o un Cl en orto (2′) del anillo C aumentan la actividad, como en el lorazepam (2′-Cl) y el flurazepam (2′-F). En meta o en para la reducen.\n\nDescartamos la A: Un halógeno en meta reduce la actividad; el aumento se da solo con el halógeno en orto.\nDescartamos la C: Un halógeno en para reduce la actividad, no la aumenta.\nDescartamos la D: Los halógenos en meta o para restan actividad; combinarlos no cambia esa tendencia.\n\nReferencia: Apuntes, SAR de las benzodiazepinas."
  },
  {
    id: "t05-m1-q12",
    topicId: "tema-05",
    block: "SAR · Barbitúricos",
    badge: "Modelo 1 · P12 · SAR · Barbitúricos",
    question: "¿Cuál de las siguientes estructuras es el tiopental?",
    options: [
      { text: "Estructura A", smiles: "CCCC(C)C1(CC)C(=O)NC(=O)NC1=O", revealedName: "Pentobarbital" },
      { text: "Estructura B", smiles: "C=CCC1(C(C)CCC)C(=S)NC(=O)NC1=O", revealedName: "Tiobarbitúrico con alilo y 1-metilbutilo, C=S en C4" },
      { text: "Estructura C", smiles: "CCCC(C)C1(CC)C(=S)NC(=O)NC1=O", revealedName: "Pentobarbital con C=S en C4" },
      { text: "Estructura D", smiles: "CCCC(C)C1(CC)C(=O)NC(=S)NC1=O", revealedName: "Tiopental" },
    ],
    correctIndex: 3,
    explanation: "El tiopental conserva el etilo y el 1-metilbutilo del pentobarbital en C5 y cambia el C=O del C2 por un C=S. Para reconocerlo comprobamos las dos cosas: los sustituyentes de C5 y la posición del azufre.\n\nDescartamos la A: Es el análogo con C=O en C2; el tiopental es el que lleva C=S.\nDescartamos la B: En C5 lleva alilo y 1-metilbutilo en lugar de etilo y 1-metilbutilo, y el C=S está en C4, no en C2.\nDescartamos la C: Tiene los sustituyentes del pentobarbital, pero el C=S está en C4, no en C2.\n\nReferencia: Apuntes, Barbitúricos: estructura y estructuras que hay que reconocer."
  },
  {
    id: "t05-m1-q13",
    topicId: "tema-05",
    block: "SAR · Barbitúricos",
    badge: "Modelo 1 · P13 · SAR · Barbitúricos",
    question: "El ácido barbitúrico (pKa 4,1) no tiene actividad hipnótica, mientras que los barbitúricos 5,5-disustituidos (pKa ≈ 7,6) son activos. ¿Qué explica la diferencia?",
    options: [
      { text: "A pH 7,4 el ácido barbitúrico está casi todo ionizado (≈ 0,05 % neutro); los 5,5-disustituidos, ≈ 61 % neutros." },
      { text: "A pH 7,4 el ácido barbitúrico está casi todo neutro (≈ 99 %); los 5,5-disustituidos están ionizados en ≈ 61 % del total." },
      { text: "La disustitución en C5 baja el pKa a ≈ 4 y sube la fracción neutra a pH 7,4 hasta ≈ 61 % del total del compuesto." },
      { text: "Los dos grupos en C5 añaden hidrógenos ácidos al anillo, y así la fracción neutra de ≈ 61 % cruza la barrera cerebral." },
    ],
    correctIndex: 0,
    explanation: "El ácido barbitúrico es muy ácido porque su anión se deslocaliza sobre tres carbonilos, y a pH 7,4 solo un 0,05 % está neutro. Al disustituir el C5 desaparecen los hidrógenos ácidos de ese carbono, el pKa sube a ≈ 7,6 y alrededor del 61 % queda neutro, que es la forma que cruza la barrera hematoencefálica.\n\nDescartamos la B: Se invierte el cálculo: con un pKa de 4,1 a pH 7,4 casi todo el ácido barbitúrico está ionizado.\nDescartamos la C: La disustitución sube el pKa (de 4,1 a ≈ 7,6), no lo baja.\nDescartamos la D: Los dos sustituyentes eliminan los hidrógenos ácidos del C5; no los añaden.\n\nReferencia: Apuntes, El pKa decide cuánta forma activa hay a pH 7,4."
  },
  {
    id: "t05-m1-q14",
    topicId: "tema-05",
    block: "Síntesis · Barbitúricos",
    badge: "Modelo 1 · P14 · Síntesis · Barbitúricos",
    question: "Al desconectar los dos enlaces C–N del anillo de un barbitúrico quedan una urea y un derivado del ácido malónico disustituido. En la síntesis se emplea el malonato de dietilo disustituido con NaOEt y no el dicloruro de malonilo disustituido. ¿Por qué?",
    options: [
      { text: "El dicloruro es poco electrófilo y la urea no logra atacarlo" },
      { text: "El dicloruro, muy reactivo, polimerizaría con la urea" },
      { text: "El dicloruro alquilaría los N de la urea en vez de acilarlos" },
      { text: "El diéster es más electrófilo y cierra el anillo con más rapidez" },
    ],
    correctIndex: 1,
    explanation: "Dos cloruros de ácido en la misma molécula reaccionan con cualquier nucleófilo y la urea daría polímeros en lugar del anillo de seis. El diéster es menos reactivo: con NaOEt la urea ataca los dos ésteres y se cierra la pirimidinatriona, con salida de dos moléculas de etanol.\n\nDescartamos la A: Un cloruro de ácido es más electrófilo que un éster, no menos: el problema es el exceso de reactividad.\nDescartamos la C: Un cloruro de ácido acila; no alquila. La reacción deseada es precisamente una acilación doble.\nDescartamos la D: El diéster es menos electrófilo que el dicloruro; por eso reacciona de forma controlada con la urea y NaOEt.\n\nReferencia: Apuntes, Retrosíntesis: malonato disustituido y urea."
  },
  {
    id: "t05-m1-q15",
    topicId: "tema-05",
    block: "Síntesis · Metilación",
    badge: "Modelo 1 · P15 · Síntesis · Metilación",
    question: "Una amina secundaria se N-metila con formaldehído y ácido fórmico (reacción de Eschweiler–Clarke). ¿Cuál es la secuencia correcta?",
    options: [
      { text: "Condensación con HCHO, iminio (–H₂O) y SN2 con CH₃I formado in situ; llega a la cuaternaria" },
      { text: "SN2 de la amina sobre el carbono del HCHO y reducción del C=O por el formiato (sale CO₂)" },
      { text: "Condensación con HCHO, iminio (–H₂O) e hidruro del formiato (CO₂); queda en la terciaria" },
      { text: "Condensación con HCHO, iminio (–H₂O) e hidruro del formiato (CO₂); llega a la cuaternaria" },
    ],
    correctIndex: 2,
    explanation: "La amina condensa con el formaldehído y, al perder agua, forma el ion iminio. El formiato le cede un hidruro y se libera CO₂. La reacción se detiene en la amina terciaria, a diferencia del yoduro de metilo y del sulfato de dimetilo, que pueden llegar a la sal de amonio cuaternario.\n\nDescartamos la A: Aquí no interviene yoduro de metilo: el carbono viene del formaldehído y el hidrógeno del formiato, como hidruro.\nDescartamos la B: El formaldehído no es un haluro de alquilo: la amina lo ataca en el C=O (adición) y no por SN2.\nDescartamos la D: La reacción se detiene en la amina terciaria: sin N–H no se forma otro ion iminio y no hay sobrealquilación.\n\nReferencia: Apuntes, Agentes metilantes y reacción de Eschweiler–Clarke."
  }
];

// MODELO 2: Receptor GABA-A, numeración, Sandberg y síntesis del flurazepam
// Clave: C, A, D, B, A, C, B, D, C, A, D, B, D, A, C
export const TEMA5_MODELO_2_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t05-m2-q01",
    topicId: "tema-05",
    block: "SAR · Aminoácidos neurotransmisores",
    badge: "Modelo 2 · P1 · SAR · Aminoácidos neurotransmisores",
    question: "Se muestra el ácido L-glutámico. Con las reglas CIP, ¿qué afirmación sobre la configuración de los aminoácidos del tema es correcta?",
    questionStructures: [{ name: "Ácido L-glutámico", smiles: "N[C@@H](CCC(=O)O)C(=O)O" }],
    options: [
      { text: "La L-cisteína es (S): el azufre del CH₂SH no cambia el orden de prioridades del carbono α." },
      { text: "La glicina es (S) porque su carbono α lleva dos hidrógenos y la serie L fija esa configuración." },
      { text: "La L-cisteína es (R): el azufre del CH₂SH da prioridad a la cadena lateral sobre el grupo COOH." },
      { text: "El L-glutámico es (R) porque su carbono α lleva un –CH₂–CH₂–COOH que pasa por delante del COOH." },
    ],
    correctIndex: 2,
    explanation: "Casi todos los L-aminoácidos son (S), como el ácido glutámico. La L-cisteína es la excepción porque su cadena lateral –CH₂–SH lleva un azufre, de mayor número atómico que el oxígeno del carboxilo, y pasa por delante del –COOH. La glicina carece de estereocentro.\n\nDescartamos la A: El azufre tiene mayor número atómico que el oxígeno del carboxilo y sí cambia el orden: la cisteína es (R).\nDescartamos la B: La glicina no tiene estereocentro, porque su carbono α lleva dos hidrógenos: es aquiral.\nDescartamos la D: En el glutámico el COOH (O,O,O) pasa por delante del CH₂ de la cadena: es (S), como casi todos los L-aminoácidos.\n\nReferencia: Apuntes, Estereoquímica de los aminoácidos."
  },
  {
    id: "t05-m2-q02",
    topicId: "tema-05",
    block: "Bioquímica · Barrera hematoencefálica",
    badge: "Modelo 2 · P2 · Bioquímica · Barrera hematoencefálica",
    question: "El GABA es el principal neurotransmisor inhibidor del encéfalo, pero administrado por vía oral o intravenosa no tiene efecto anticonvulsivo. ¿Cuál es la razón química?",
    questionStructures: [{ name: "GABA (ácido γ-aminobutírico)", smiles: "NCCCC(=O)O" }],
    options: [
      { text: "A pH 7,4 es un zwitterión (–NH₃⁺ y –COO⁻), muy polar" },
      { text: "A pH 7,4 es un catión (–NH₃⁺ y –COOH), muy polar" },
      { text: "A pH 7,4 es un anión (–NH₂ y –COO⁻), muy polar" },
      { text: "A pH 7,4 es neutro (–NH₂ y –COOH), pero muy lipófilo" },
    ],
    correctIndex: 0,
    explanation: "A pH 7,4 el amino está protonado y el carboxilo ionizado, de modo que el GABA es un zwitterión muy polar que no atraviesa la barrera hematoencefálica por difusión pasiva. La solución es frenar la degradación del GABA cerebral con moléculas que sí la crucen.\n\nDescartamos la B: A pH 7,4 el carboxilo está ionizado; el GABA no conserva el COOH neutro.\nDescartamos la C: El grupo amino está protonado a pH 7,4; no queda como –NH₂ neutro.\nDescartamos la D: El GABA no es neutro ni lipófilo: lleva dos cargas y es muy polar.\n\nReferencia: Apuntes, El GABA no cruza la barrera hematoencefálica."
  },
  {
    id: "t05-m2-q03",
    topicId: "tema-05",
    block: "Bioquímica · Vigabatrina",
    badge: "Modelo 2 · P3 · Bioquímica · Vigabatrina",
    question: "La vigabatrina se vende como racémico, con el enantiómero (S) como activo, y es un inhibidor suicida de la GABA-AT. ¿Qué secuencia de pasos conduce a la inactivación del enzima?",
    questionStructures: [{ name: "Vigabatrina (γ-vinil-GABA)", smiles: "C=CC(N)CCC(=O)O" }],
    options: [
      { text: "Aldimina externa, imina α,β-insaturada y adición 1,2 de la lisina" },
      { text: "Aldimina externa, imina α,β-insaturada y adición 1,4 de la cisteína" },
      { text: "Aldimina externa, hidrólisis a PMP y adición 1,4 de la lisina" },
      { text: "Aldimina externa, imina α,β-insaturada y adición 1,4 de la lisina" },
    ],
    correctIndex: 3,
    explanation: "El amino de la vigabatrina forma la aldimina externa con el PLP. La enzima arranca un protón y el vinilo queda conjugado con la imina (imina α,β-insaturada). La lisina del centro activo ataca el carbono β en 1,4 y se forma un aducto covalente: la propia enzima genera el grupo reactivo que la destruye.\n\nDescartamos la A: El nucleófilo ataca el carbono β de la imina conjugada (adición 1,4 o de Michael), no el carbono de la imina.\nDescartamos la B: El nucleófilo es la lisina del centro activo, la misma que sostenía al PLP.\nDescartamos la C: Si el proceso acabara en la hidrólisis, el enzima trabajaría como con el GABA; la inactivación exige conjugar el vinilo con la imina.\n\nReferencia: Apuntes, Vigabatrina: inhibidor suicida de la GABA-AT."
  },
  {
    id: "t05-m2-q04",
    topicId: "tema-05",
    block: "Bioquímica · Receptor GABA-A",
    badge: "Modelo 2 · P4 · Bioquímica · Receptor GABA-A",
    question: "El receptor GABA-A es un canal de Cl⁻ cuya apertura hiperpolariza la neurona. ¿Qué descripción de su composición y de sus sitios de unión es correcta?",
    options: [
      { text: "Pentámero 2α, 2β, 1γ; GABA en α/γ2 y benzodiazepinas en β/α" },
      { text: "Pentámero 2α, 2β, 1γ; GABA en β/α y benzodiazepinas en α/γ2" },
      { text: "Pentámero 2α, 2β, 1γ; GABA y benzodiazepinas ambos en β/α" },
      { text: "Pentámero 2α, 2β, 1γ; GABA en β/α y benzodiazepinas transmembrana" },
    ],
    correctIndex: 1,
    explanation: "El receptor es un pentámero, habitualmente 2α, 2β y 1γ. El GABA se une en las interfases β/α, el sitio ortostérico. Las benzodiazepinas se unen en la interfase α/γ2, un sitio alostérico: no compiten con el GABA, sino que cambian la conformación del receptor.\n\nDescartamos la A: Están intercambiados: el GABA ocupa las interfases β/α y las benzodiazepinas la interfase α/γ2.\nDescartamos la C: Las benzodiazepinas no compiten con el GABA: tienen un sitio alostérico propio en α/γ2.\nDescartamos la D: El dominio transmembrana es el sitio de barbitúricos, neuroesteroides y anestésicos generales.\n\nReferencia: Apuntes, Un canal de cloruro."
  },
  {
    id: "t05-m2-q05",
    topicId: "tema-05",
    block: "Síntesis · Benzodiazepinas",
    badge: "Modelo 2 · P5 · Síntesis · Benzodiazepinas",
    question: "El demoxepam se transforma en nordazepam (estructuras). ¿Qué reactivo y qué tipo de reacción hacen este paso?",
    questionStructures: [{ name: "Demoxepam", smiles: "O=C1C[N+]([O-])=C(c2ccccc2)c2cc(Cl)ccc2N1" }, { name: "Nordazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1" }],
    options: [
      { text: "H₂, Pd: reducción suave que retira el O del N-óxido y respeta el C=O" },
      { text: "Ac₂O: transposición que traslada el O del N-óxido al carbono C3 del anillo" },
      { text: "Me₂SO₄ y NaOEt: metilación del N1 que deja intacto el N-óxido del anillo" },
      { text: "ClCH₂COCl: acilación del N-óxido que arranca el oxígeno como ácido" },
    ],
    correctIndex: 0,
    explanation: "El paso es una reducción suave con H₂ y Pd: elimina el oxígeno del N-óxido sin tocar el C=O de la lactama en C2. Con Ac₂O el oxígeno no se elimina sino que pasa al C3 (ruta del oxazepam), y con Me₂SO₄ y NaOEt se metila el N1 (último paso del diazepam).\n\nDescartamos la B: El Ac₂O lleva el oxígeno al C3 y da el 3-acetoxi derivado (vía del oxazepam); no elimina el oxígeno.\nDescartamos la C: Una metilación añade un CH₃ en N1 y daría un derivado N1-metilado que conserva el N-óxido; no retira el O.\nDescartamos la D: Un cloruro de ácido acila nucleófilos; no reduce. Aquí hace falta una reducción que retire el O.\n\nReferencia: Apuntes, Síntesis del diazepam y del oxazepam."
  },
  {
    id: "t05-m2-q06",
    topicId: "tema-05",
    block: "Síntesis · Benzodiazepinas",
    badge: "Modelo 2 · P6 · Síntesis · Benzodiazepinas",
    question: "En la síntesis del flurazepam, la 4-cloroanilina reacciona con cloruro de 2-fluorobenzoílo y AlCl₃ y da la 2-amino-5-cloro-2′-fluorobenzofenona. ¿Qué tipo de reacción es?",
    options: [
      { text: "Alquilación de Friedel–Crafts: el anillo desplaza el Cl del reactivo" },
      { text: "SN2 del NH₂ de la anilina sobre el carbono sp² que lleva el F del reactivo" },
      { text: "Acilación de Friedel–Crafts: el anillo ataca al C=O del cloruro de ácido" },
      { text: "Condensación de Claisen entre la anilina y el C=O del reactivo" },
    ],
    correctIndex: 2,
    explanation: "El cloruro de ácido con AlCl₃ es el reactivo típico de una acilación de Friedel–Crafts: el anillo aromático de la 4-cloroanilina ataca el C=O y se forma una cetona diarílica, la 2-aminobenzofenona con 2′-F. Es la reacción que construye el esqueleto de benzofenona antes de ciclar a benzodiazepina.\n\nDescartamos la A: El reactivo es un cloruro de ácido, no un haluro de alquilo: se forma una cetona diarílica (acilación).\nDescartamos la B: Un carbono sp² aromático no da SN2, y el producto es una benzofenona con un C=O nuevo, no una diarilamina.\nDescartamos la D: La Claisen une dos ésteres a través de un carbanión en α y necesita una base; aquí no hay éster con H en α y el AlCl₃ es un ácido de Lewis.\n\nReferencia: Apuntes, Variaciones: el flurazepam."
  },
  {
    id: "t05-m2-q07",
    topicId: "tema-05",
    block: "Bioquímica · Metabolismo de benzodiazepinas",
    badge: "Modelo 2 · P7 · Bioquímica · Metabolismo de benzodiazepinas",
    question: "El oxazepam, como el lorazepam, tiene una semivida corta. ¿Qué lo explica?",
    questionStructures: [{ name: "Oxazepam", smiles: "O=C1Nc2ccc(Cl)cc2C(c2ccccc2)=NC1O" }],
    options: [
      { text: "El 3-OH se oxida por el CYP a una cetona y se elimina enseguida" },
      { text: "El 3-OH se glucuronida directamente, sin pasar por el CYP" },
      { text: "El CYP lo N-desalquila en el hígado y se elimina enseguida" },
      { text: "El 3-OH aumenta la afinidad por el receptor y lo hace más ansiolítico" },
    ],
    correctIndex: 1,
    explanation: "El 3-OH se conjuga con ácido glucurónico sin necesidad de oxidación previa por el CYP, de modo que la eliminación es rápida y la semivida corta. No cambia el carácter ansiolítico del compuesto.\n\nDescartamos la A: Lo característico del 3-OH es la glucuronidación directa, sin paso previo por el CYP.\nDescartamos la C: El oxazepam no lleva cadena alquilada en N1; la N-desalquilación es propia del flurazepam.\nDescartamos la D: El 3-OH no hace a la molécula más ansiolítica; cambia la eliminación, no la potencia.\n\nReferencia: Apuntes, SAR de las benzodiazepinas (C3: OH, oxazepam y lorazepam)."
  },
  {
    id: "t05-m2-q08",
    topicId: "tema-05",
    block: "SAR · Benzodiazepinas",
    badge: "Modelo 2 · P8 · SAR · Benzodiazepinas",
    question: "Se muestra una 1,4-benzodiazepin-2-ona con un grupo nitro. Con la numeración de la 1,4-benzodiazepina (N1 unido al carbono de fusión del benceno), ¿en qué posición está el NO₂?",
    questionStructures: [{ name: "1,4-Benzodiazepin-2-ona nitrada", smiles: "O=C1CN=C(c2ccccc2)c2cc([N+](=O)[O-])ccc2N1" }],
    options: [
      { text: "En C8" },
      { text: "En C6" },
      { text: "En C9" },
      { text: "En C7" },
    ],
    correctIndex: 3,
    explanation: "Numeramos N1 (unido al carbono de fusión), C2, C3, N4 y C5 en el anillo de siete y seguimos por el benceno con C6, C7, C8 y C9. El nitro del nitrazepam queda en C7, el lugar donde conviene un grupo atrayente de electrones.\n\nDescartamos la A: Desde el carbono de fusión que lleva el N1, la secuencia es C9, C8, C7: el NO₂ está en el tercero, C7, y no en C8.\nDescartamos la B: El C6 es el contiguo al carbono de fusión que lleva el C5; el NO₂ está un carbono más allá, en C7.\nDescartamos la C: El C9 es el contiguo al carbono de fusión con el N1; el NO₂ está dos posiciones más allá, en C7.\n\nReferencia: Apuntes, SAR de las benzodiazepinas."
  },
  {
    id: "t05-m2-q09",
    topicId: "tema-05",
    block: "SAR · Benzodiazepinas",
    badge: "Modelo 2 · P9 · SAR · Benzodiazepinas",
    question: "¿Qué afirmación sobre las benzodiazepinas con un triazol o un imidazol fusionado sobre el enlace N1–C2 es correcta?",
    options: [
      { text: "Son potentes y de semivida larga; el imidazol básico del midazolam permite sales hidrosolubles para vía IV." },
      { text: "Son poco potentes y de semivida corta; el imidazol básico del midazolam permite sales hidrosolubles para vía IV." },
      { text: "Son potentes y de semivida corta; el imidazol básico del midazolam permite sales hidrosolubles para vía IV." },
      { text: "Son potentes y de semivida corta; el imidazol del midazolam es neutro y obliga a formularlo como base lipófila." },
    ],
    correctIndex: 2,
    explanation: "Un triazol (triazolam, alprazolam) o un imidazol (midazolam) sobre N1–C2 da compuestos potentes y de semivida corta. El nitrógeno básico del imidazol del midazolam se protona y forma sales hidrosolubles, lo que permite la vía intravenosa en sedación.\n\nDescartamos la A: Estos compuestos son de semivida corta, no larga.\nDescartamos la B: Son potentes: la fusión de un triazol o un imidazol no resta potencia.\nDescartamos la D: El imidazol del midazolam es básico y se protona, de ahí las sales hidrosolubles para la vía intravenosa.\n\nReferencia: Apuntes, Anillos fusionados: triazolo-, imidazo- y pirazolodiazepinas."
  },
  {
    id: "t05-m2-q10",
    topicId: "tema-05",
    block: "Bioquímica · Neuroesteroides",
    badge: "Modelo 2 · P10 · Bioquímica · Neuroesteroides",
    question: "La progesterona actúa sobre el receptor GABA-A sobre todo a través de un metabolito, la alopregnanolona. ¿Qué pasos enzimáticos lo forman?",
    questionStructures: [{ name: "Progesterona", smiles: "CC(=O)[C@H]1CC[C@H]2[C@@H]3CCC4=CC(=O)CC[C@]4(C)[C@H]3CC[C@]12C" }],
    options: [
      { text: "5α-reductasa sobre el C4=C5 y 3α-HSD sobre la cetona del C3, que da un 3α-OH" },
      { text: "5β-reductasa sobre el C4=C5 y 3α-HSD sobre la cetona del C3, que da un 3α-OH" },
      { text: "5β-reductasa sobre el C4=C5 y 3β-HSD sobre la cetona del C3, que da un 3β-OH" },
      { text: "Solo la 5α-reductasa sobre el C4=C5; el C3 queda como cetona, sin el 3α-OH" },
    ],
    correctIndex: 0,
    explanation: "Son dos reducciones. La 5α-reductasa reduce el doble enlace C4=C5 del anillo A y la 3α-HSD convierte la cetona del C3 en un alcohol 3α. La alopregnanolona se une en el dominio transmembrana del receptor, en un sitio distinto del de las benzodiazepinas y del de los barbitúricos.\n\nDescartamos la B: La reductasa es la 5α: la alopregnanolona es un pregnano 5α.\nDescartamos la C: La reducción del C4=C5 la hace la 5α-reductasa, no una 5β, y la cetona del C3 pasa a alcohol 3α, no 3β.\nDescartamos la D: Hacen falta dos reducciones: sin la segunda no hay 3α-OH, el grupo que caracteriza al neuroesteroide.\n\nReferencia: Apuntes, Esteroides neuroactivos."
  },
  {
    id: "t05-m2-q11",
    topicId: "tema-05",
    block: "SAR · Fármacos Z",
    badge: "Modelo 2 · P11 · SAR · Fármacos Z",
    question: "Se muestran el zolpidem y la zopiclona. ¿Qué afirmación sobre estos fármacos Z es correcta?",
    questionStructures: [{ name: "Zolpidem", smiles: "Cc1ccc(-c2nc3ccc(C)cn3c2CC(=O)N(C)C)cc1" }, { name: "Zopiclona", smiles: "CN1CCN(C(=O)OC2c3nccnc3C(=O)N2c2ccc(Cl)cn2)CC1" }],
    options: [
      { text: "Son benzodiazepinas con otro anillo fusionado, se unen a su sitio como moduladores positivos y el flumazenilo los revierte." },
      { text: "No son benzodiazepinas y se unen a su sitio como antagonistas sin actividad intrínseca, igual que el flumazenilo." },
      { text: "No son benzodiazepinas y se unen al sitio transmembrana de los barbitúricos, por lo que el flumazenilo no los revierte." },
      { text: "No son benzodiazepinas, pero se unen a su sitio como moduladores alostéricos positivos y el flumazenilo los revierte." },
    ],
    correctIndex: 3,
    explanation: "El zolpidem (imidazopiridina) y la zopiclona (ciclopirrolona) no tienen estructura de benzodiazepina, pero ocupan el mismo sitio de la interfase α/γ2 y potencian el efecto del GABA. Como compiten por ese sitio, el flumazenilo los desplaza y revierte su efecto.\n\nDescartamos la A: Una imidazopiridina y una ciclopirrolona no son benzodiazepinas, aunque se unan al mismo sitio.\nDescartamos la B: Son moduladores alostéricos positivos, no antagonistas: potencian el efecto del GABA.\nDescartamos la C: Ocupan el sitio de las benzodiazepinas (interfase α/γ2), y por eso el flumazenilo sí los revierte.\n\nReferencia: Apuntes, Fármacos Z: zopiclona y zolpidem."
  },
  {
    id: "t05-m2-q12",
    topicId: "tema-05",
    block: "SAR · Barbitúricos",
    badge: "Modelo 2 · P12 · SAR · Barbitúricos",
    question: "Según el postulado de Sandberg, ¿cuál de los siguientes barbitúricos, definidos por los sustituyentes R y R′ en C5, incumple los requisitos de actividad?",
    options: [
      { text: "R = etilo y R′ = fenilo (R = 2, R′ = 6; R + R′ = 8 carbonos)." },
      { text: "R = etilo y R′ = heptilo (R = 2, R′ = 7; R + R′ = 9 carbonos)." },
      { text: "R = etilo y R′ = butilo (R = 2, R′ = 4; R + R′ = 6 carbonos)." },
      { text: "R = alilo y R′ = 1-metilbutilo (R = 3, R′ = 5; R + R′ = 8 carbonos)." },
    ],
    correctIndex: 1,
    explanation: "El postulado de Sandberg pide un C5 disustituido, con cada sustituyente de 6 carbonos como máximo y una suma R + R′ de 10 como máximo. Un heptilo tiene 7 carbonos y supera el límite individual.\n\nDescartamos la A: El fenilo tiene 6 carbonos y la suma es 8: cumple R, R′ ≤ 6 y R + R′ ≤ 10.\nDescartamos la C: Ninguno supera 6 carbonos y la suma es 6: cumple los dos límites.\nDescartamos la D: Tienen 3 y 5 carbonos: cumple los dos límites (es el secobarbital).\n\nReferencia: Apuntes, Postulado de Sandberg."
  },
  {
    id: "t05-m2-q13",
    topicId: "tema-05",
    block: "Síntesis · Barbitúricos",
    badge: "Modelo 2 · P13 · Síntesis · Barbitúricos",
    question: "Para introducir un resto secundario (por ejemplo, 1-metilbutilo) en el C5 de un barbitúrico, partiendo de malonato de dietilo y NaOEt, no se emplea un haluro de alquilo secundario. ¿Cuál es la razón y qué se hace en su lugar?",
    questionStructures: [{ name: "Malonato de dietilo", smiles: "CCOC(=O)CC(=O)OCC" }],
    options: [
      { text: "El haluro secundario tiene carbono sp² y no da SN; se usa Claisen con carbonato" },
      { text: "El haluro secundario sufre sobre todo E2; se usa Claisen con carbonato" },
      { text: "El haluro secundario sobrealquila el C5 por SN2 doble; se usa cetona y H₂" },
      { text: "El haluro secundario sufre sobre todo E2; se usa cetona, Knoevenagel y H₂" },
    ],
    correctIndex: 3,
    explanation: "Un haluro secundario, más impedido, compite con eliminación E2 frente al NaOEt. Para meter el resto secundario se condensa el malonato con la cetona correspondiente (Knoevenagel), se deshidrata a alquilidenmalonato y se hidrogena el C=C. Así se evita hacer una SN2 sobre un carbono secundario.\n\nDescartamos la A: Un haluro secundario tiene el carbono sp³, no sp²; además la Claisen con carbonato se reserva para el fenilo y el resto secundario entra con una cetona (Knoevenagel).\nDescartamos la B: La Claisen con carbonato de dietilo se reserva para el fenilo; el resto secundario entra con una cetona (Knoevenagel).\nDescartamos la C: El problema del haluro secundario es la eliminación por impedimento con la base, no una SN2 doble.\n\nReferencia: Apuntes, Cómo se prepara el malonato disustituido."
  },
  {
    id: "t05-m2-q14",
    topicId: "tema-05",
    block: "Síntesis · Barbitúricos",
    badge: "Modelo 2 · P14 · Síntesis · Barbitúricos",
    question: "El fenobarbital lleva un fenilo en el C5. No se introduce alquilando el malonato de dietilo con bromobenceno. ¿Por qué y cómo se obtiene el fenilmalonato de dietilo?",
    options: [
      { text: "El C sp² no da SN; Claisen de fenilacetato de etilo con carbonato de dietilo" },
      { text: "El bromobenceno sufre E2 con NaOEt; se usa Knoevenagel con una cetona y H₂" },
      { text: "El C sp² no da SN; Claisen con el carbonato de dietilo como nucleófilo" },
      { text: "El C sp² da SN2 lenta; se acelera con AlCl₃ en una acilación de Friedel–Crafts" },
    ],
    correctIndex: 0,
    explanation: "En un haluro de arilo el halógeno está sobre un carbono sp² y el enlace C–X se refuerza por deslocalización: no da SN, así que el fenilo no entra alquilando el malonato. Se invierten los papeles: el fenilacetato de etilo aporta el nucleófilo y el carbonato de dietilo el electrófilo, en una condensación de Claisen que da el fenilmalonato de dietilo.\n\nDescartamos la B: El problema no es una eliminación: el carbono del bromobenceno es sp² y no da SN; el fenilo entra por Claisen.\nDescartamos la C: Los papeles están invertidos: el nucleófilo es el fenilacetato de etilo, que tiene H en α; el carbonato es el electrófilo.\nDescartamos la D: El carbono sp² no da SN2 ni con ácido de Lewis; el fenilmalonato se prepara por condensación de Claisen.\n\nReferencia: Apuntes, El fenilo: condensación de Claisen."
  },
  {
    id: "t05-m2-q15",
    topicId: "tema-05",
    block: "Síntesis · Benzodiazepinas",
    badge: "Modelo 2 · P15 · Síntesis · Benzodiazepinas",
    question: "La 2-amino-5-clorobenzofenona se trata con cloruro de cloroacetilo y después con amoníaco para formar el anillo de siete. ¿Por qué el NH₂ reacciona primero con el cloruro de ácido y no con el CH₂Cl?",
    questionStructures: [{ name: "2-Amino-5-clorobenzofenona", smiles: "Nc1ccc(Cl)cc1C(=O)c1ccccc1" }, { name: "ClCH₂COCl", smiles: "O=C(Cl)CCl" }],
    options: [
      { text: "El cloruro de ácido reacciona por SN2 en su carbono sp², más rápida que en el CH₂Cl" },
      { text: "El CH₂Cl tiene el carbono sp², como un haluro de arilo, y no da SN con el NH₂" },
      { text: "El cloruro de acilo es mucho más electrófilo; el CH₂Cl queda para la SN2 con el NH₃" },
      { text: "El cloruro de ácido es menos impedido que el CH₂Cl; ambos reaccionan por SN2 con el NH₂" },
    ],
    correctIndex: 2,
    explanation: "El cloruro de acilo es mucho más electrófilo que el cloruro de alquilo, y el NH₂ lo ataca primero por adición–eliminación en el C=O: se forma la cloroacetamida. El CH₂Cl queda libre y el amoníaco lo desplaza después por SN2 antes de cerrar el anillo.\n\nDescartamos la A: Un carbono sp² no da SN2: el cloruro de acilo reacciona por adición–eliminación en el C=O, y antes, porque es mucho más electrófilo.\nDescartamos la B: El CH₂ es sp³ y sí da SN2: el NH₃ lo desplaza en el paso siguiente. La diferencia está en la electrofilia del cloruro de acilo.\nDescartamos la D: El cloruro de ácido reacciona por adición–eliminación en el C=O, no por SN2; la diferencia es la electrofilia.\n\nReferencia: Apuntes, Ejercicio 5.1: síntesis del prazepam."
  }
];

// MODELO 3: Valproato, flumazenil, oxazepam y barbitúricos de acción ultracorta
// Clave: D, B, A, C, B, D, C, A, D, C, A, B, D, A, B
export const TEMA5_MODELO_3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t05-m3-q01",
    topicId: "tema-05",
    block: "Bioquímica · PLP",
    badge: "Modelo 3 · P1 · Bioquímica · PLP",
    question: "La GABA-AT transamina el GABA con PLP. ¿Cuál es el orden correcto de los pasos, desde el enzima en reposo hasta la regeneración del cofactor?",
    questionStructures: [{ name: "Fosfato de piridoxamina (PMP)", smiles: "Cc1ncc(COP(=O)(O)O)c(CN)c1O" }],
    options: [
      { text: "aldimina externa → aldimina interna → cetimina → hidrólisis a PMP → α-cetoglutarato" },
      { text: "aldimina interna → aldimina externa → hidrólisis a PMP → cetimina → α-cetoglutarato" },
      { text: "aldimina interna → cetimina → aldimina externa → hidrólisis a PMP → α-cetoglutarato" },
      { text: "aldimina interna → aldimina externa → cetimina → hidrólisis a PMP → α-cetoglutarato" },
    ],
    correctIndex: 3,
    explanation: "El PLP parte unido a la lisina (aldimina interna). El amino del GABA la desplaza y da la aldimina externa; al mover un protón se forma la cetimina, y su hidrólisis libera el semialdehído succínico y deja el PMP. El PMP cede el amino al α-cetoglutarato, que pasa a glutamato, y se regenera el PLP.\n\nDescartamos la A: El PLP empieza unido a la lisina (aldimina interna); el sustrato la desplaza después para dar la aldimina externa.\nDescartamos la B: La hidrólisis solo es posible cuando la cetimina ya se ha formado; el orden está alterado.\nDescartamos la C: La cetimina sale de la aldimina externa tras mover el protón; no puede formarse antes que ella.\n\nReferencia: Apuntes, El PLP, cofactor de las enzimas del GABA (pasos de la transaminación)."
  },
  {
    id: "t05-m3-q02",
    topicId: "tema-05",
    block: "Bioquímica · Valproato",
    badge: "Modelo 3 · P2 · Bioquímica · Valproato",
    question: "El valproato sódico es antiepiléptico y sube el GABA de forma indirecta. ¿Qué describe mejor su mecanismo?",
    questionStructures: [{ name: "Ácido valproico", smiles: "CCCC(CCC)C(=O)O" }],
    options: [
      { text: "Inhibe sobre todo la GABA-AT (PLP) y bloquea canales de Na⁺ y de Ca²⁺ tipo T" },
      { text: "Inhibe sobre todo la SSADH (NAD⁺) y bloquea canales de Na⁺ y de Ca²⁺ tipo T" },
      { text: "Inhibe sobre todo la GAD (PLP) y se une al sitio α/γ2 del GABA-A" },
      { text: "Inhibe sobre todo la GAD (PLP) y bloquea canales de Na⁺ y de Ca²⁺ tipo T" },
    ],
    correctIndex: 1,
    explanation: "El valproato inhibe sobre todo la SSADH, que oxida el semialdehído succínico con NAD⁺; al acumularse este, la degradación del GABA va más lenta. Además bloquea canales de Na⁺ y de Ca²⁺ tipo T, de modo que no todo su efecto antiepiléptico pasa por el GABA.\n\nDescartamos la A: Sobre la GABA-AT actúa solo débilmente; esa es la diana de la vigabatrina.\nDescartamos la C: Inhibir la GAD bajaría el GABA (sus inhibidores son convulsivantes), y el valproato no se une al sitio de las benzodiazepinas: inhibe la SSADH y bloquea canales de Na⁺ y de Ca²⁺ tipo T.\nDescartamos la D: Inhibir la GAD bajaría el GABA: los inhibidores de la GAD son convulsivantes, y el valproato sube el GABA frenando la SSADH.\n\nReferencia: Apuntes, Valproato sódico."
  },
  {
    id: "t05-m3-q03",
    topicId: "tema-05",
    block: "SAR · Benzodiazepinas",
    badge: "Modelo 3 · P3 · SAR · Benzodiazepinas",
    question: "¿Cuál de las siguientes estructuras es el clordiazepóxido?",
    options: [
      { text: "Estructura A", smiles: "CNC1=Nc2ccc(Cl)cc2C(c2ccccc2)=[N+]([O-])C1", revealedName: "Clordiazepóxido" },
      { text: "Estructura B", smiles: "O=C1C[N+]([O-])=C(c2ccccc2)c2cc(Cl)ccc2N1", revealedName: "Demoxepam" },
      { text: "Estructura C", smiles: "CN1C(=O)CN=C(c2ccccc2)c2cc(Cl)ccc21", revealedName: "Diazepam" },
      { text: "Estructura D", smiles: "CNC1=Nc2ccc(Cl)cc2C(c2ccccc2)=NC1", revealedName: "Amidina con metilamina, sin N-óxido" },
    ],
    correctIndex: 0,
    explanation: "El clordiazepóxido reúne dos rasgos: la amidina C2–NHCH₃ y el N-óxido en N4. El demoxepam conserva el N-óxido pero lleva una lactama en C2; el diazepam no tiene ninguno de los dos, y el análogo sin N-óxido conserva solo la amidina.\n\nDescartamos la B: Conserva el N-óxido, pero en C2 lleva una lactama (C=O) en lugar de la amidina con metilamina.\nDescartamos la C: Tiene C=O en C2, un N1–CH₃ y no lleva N-óxido.\nDescartamos la D: Conserva la amidina con metilamina en C2, pero no lleva el N-óxido.\n\nReferencia: Apuntes, Descubrimiento de las benzodiazepinas y claves para reconocer estructuras."
  },
  {
    id: "t05-m3-q04",
    topicId: "tema-05",
    block: "Síntesis · Benzodiazepinas",
    badge: "Modelo 3 · P4 · Síntesis · Benzodiazepinas",
    question: "El 3-acetoxinordazepam, que se obtiene al tratar el demoxepam con Ac₂O, se hidroliza con H₂O y OH⁻. ¿Qué productos se forman?",
    questionStructures: [{ name: "3-Acetoxinordazepam", smiles: "CC(=O)OC1N=C(c2ccccc2)c2cc(Cl)ccc2NC1=O" }],
    options: [
      { text: "Nordazepam y etanol: el acetato del C3 se reduce y el C3 queda como CH₂" },
      { text: "Demoxepam y ácido acético: el oxígeno del C3 vuelve al N4 como N-óxido" },
      { text: "Oxazepam (OH en C3) y ácido acético, por saponificación del éster" },
      { text: "Oxazepam y etanol: el acetato del C3 se hidroliza y sale como etanol" },
    ],
    correctIndex: 2,
    explanation: "El 3-acetoxinordazepam es un éster del alcohol de C3. Su hidrólisis básica (saponificación) da el alcohol en C3, que es el oxazepam, y ácido acético. La lactama no se abre y el C=N se conserva.\n\nDescartamos la A: Una hidrólisis no reduce: el éster da un alcohol y un ácido; el C3 queda con OH y el subproducto es ácido acético.\nDescartamos la B: La saponificación rompe el enlace entre el carbonilo del acetato y el oxígeno; ese oxígeno se queda en el C3 como OH (oxazepam) y no vuelve al N4.\nDescartamos la D: El acetato es la parte ácida del éster: da ácido acético, no etanol; el alcohol del éster es el propio oxazepam.\n\nReferencia: Apuntes, Síntesis del diazepam y del oxazepam."
  },
  {
    id: "t05-m3-q05",
    topicId: "tema-05",
    block: "Bioquímica · Metabolismo de benzodiazepinas",
    badge: "Modelo 3 · P5 · Bioquímica · Metabolismo de benzodiazepinas",
    question: "¿Qué le ocurre al flurazepam en el hígado y cuál es la consecuencia?",
    questionStructures: [{ name: "Flurazepam", smiles: "CCN(CC)CCN1C(=O)CN=C(c2ccccc2F)c2cc(Cl)ccc21" }],
    options: [
      { text: "Descarboxilación, con un metabolito inactivo de eliminación rápida" },
      { text: "N-desalquilación, con un metabolito activo de semivida muy larga" },
      { text: "Glucuronidación directa, con un conjugado inactivo de eliminación rápida" },
      { text: "Descarboxilación, con un metabolito activo de semivida muy larga" },
    ],
    correctIndex: 1,
    explanation: "El hígado quita la cadena de dietilaminoetilo por N-desalquilación y deja un metabolito activo de semivida muy larga. La actividad del flurazepam es la suma de la del compuesto original y la de sus metabolitos activos.\n\nDescartamos la A: El flurazepam no tiene ningún carboxilo que perder; la cadena de N1 se quita por N-desalquilación y el metabolito sigue siendo activo.\nDescartamos la C: La glucuronidación directa es propia de los 3-OH; el flurazepam no tiene OH y su cadena se elimina por desalquilación.\nDescartamos la D: El flurazepam no tiene ningún carboxilo que perder; la cadena de N1 se quita por N-desalquilación.\n\nReferencia: Apuntes, Variaciones: el flurazepam."
  },
  {
    id: "t05-m3-q06",
    topicId: "tema-05",
    block: "SAR · Benzodiazepinas",
    badge: "Modelo 3 · P6 · SAR · Benzodiazepinas",
    question: "Respecto al sustituyente en C5 de las 1,4-benzodiazepinas, ¿qué afirmación es correcta?",
    options: [
      { text: "Conviene un alquilo o un cicloalquilo; el fenilo resta potencia, y el bromazepam lleva un ciclohexilo." },
      { text: "Conviene un fenilo o un arilo; los alquilos aumentan la potencia, y el bromazepam lleva un ciclohexilo." },
      { text: "Conviene solo el fenilo; cualquier otro arilo anula la actividad, y el bromazepam lleva un 2-piridilo." },
      { text: "Conviene un fenilo o un arilo; los alquilos restan potencia, y el bromazepam lleva un 2-piridilo." },
    ],
    correctIndex: 3,
    explanation: "En C5 conviene un fenilo o un arilo, y los alquilos y cicloalquilos restan potencia. El bromazepam lleva un 2-piridilo, que es un arilo, y mantiene la actividad.\n\nDescartamos la A: Se invierte la regla (en C5 conviene un fenilo o un arilo) y el bromazepam lleva un 2-piridilo, no un ciclohexilo.\nDescartamos la B: Los alquilos y cicloalquilos restan potencia en C5, no la aumentan; además el bromazepam lleva un 2-piridilo.\nDescartamos la C: El bromazepam, con un 2-piridilo (un arilo), es activo: el C5 admite arilos distintos del fenilo.\n\nReferencia: Apuntes, SAR de las benzodiazepinas."
  },
  {
    id: "t05-m3-q07",
    topicId: "tema-05",
    block: "SAR · Benzodiazepinas",
    badge: "Modelo 3 · P7 · SAR · Benzodiazepinas",
    question: "¿Cuál de las siguientes estructuras corresponde al antídoto de las benzodiazepinas, que se une a su sitio sin actividad intrínseca?",
    options: [
      { text: "Estructura A", smiles: "Cc1ncc2n1-c1ccc(Cl)cc1C(c1ccccc1F)=NC2", revealedName: "Midazolam" },
      { text: "Estructura B", smiles: "CCOC(=O)c1ncn2c1CN=C(c1ccccc1)c1cc(F)ccc1-2", revealedName: "Imidazobenzodiazepina con éster etílico y 5-fenilo" },
      { text: "Estructura C", smiles: "CCOC(=O)c1ncn2c1CN(C)C(=O)c1cc(F)ccc1-2", revealedName: "Flumazenilo" },
      { text: "Estructura D", smiles: "Cc1nnc2n1-c1ccc(Cl)cc1C(c1ccccc1Cl)=NC2", revealedName: "Triazolam" },
    ],
    correctIndex: 2,
    explanation: "El flumazenilo es una imidazobenzodiazepina sin arilo en C5. Se une al mismo sitio que las benzodiazepinas, pero sin actividad intrínseca: las desplaza del receptor y se usa como antídoto en las sobredosis.\n\nDescartamos la A: Es un modulador alostérico positivo con 5-arilo, no un antagonista.\nDescartamos la B: Comparte el éster y el F del flumazenilo, pero lleva un fenilo en C5; el antídoto es la imidazobenzodiazepina sin arilo en C5.\nDescartamos la D: Es una triazolobenzodiazepina con 5-arilo e hipnótica, no un antagonista.\n\nReferencia: Apuntes, Anillos fusionados: triazolo-, imidazo- y pirazolodiazepinas."
  },
  {
    id: "t05-m3-q08",
    topicId: "tema-05",
    block: "SAR · Neuroesteroides",
    badge: "Modelo 3 · P8 · SAR · Neuroesteroides",
    question: "Se muestran la alopregnanolona y la ganaxolona. ¿Qué diferencia estructural tiene la ganaxolona y qué consecuencia farmacológica se deriva de ella?",
    questionStructures: [{ name: "Alopregnanolona", smiles: "CC(=O)[C@H]1CC[C@H]2[C@@H]3CC[C@H]4C[C@H](O)CC[C@]4(C)[C@H]3CC[C@]12C" }, { name: "Ganaxolona", smiles: "CC(=O)[C@H]1CC[C@H]2[C@@H]3CC[C@H]4C[C@](C)(O)CC[C@]4(C)[C@H]3CC[C@]12C" }],
    options: [
      { text: "Un 3β-metilo junto al 3α-OH, que impide oxidar el 3α-OH a cetona y permite la vía oral." },
      { text: "Un 3β-metilo junto al 3α-OH, que impide reducir el C4=C5 y permite la vía oral." },
      { text: "Un 3α-metilo en lugar del 3α-OH, que elimina la oxidación y permite su uso por vía oral." },
      { text: "Un 3β-OH en lugar del 3α-OH, que impide su oxidación y permite su uso por vía oral." },
    ],
    correctIndex: 0,
    explanation: "La alopregnanolona lleva un 3α-OH. La ganaxolona añade un 3β-metilo sobre el mismo carbono, que impide que el organismo oxide el 3α-OH a cetona y permite administrarla por vía oral.\n\nDescartamos la B: En el pregnano 5α el anillo A ya está reducido; el metilo protege el 3α-OH frente a la oxidación.\nDescartamos la C: La ganaxolona conserva el 3α-OH; el metilo va en 3β, no en lugar del hidroxilo.\nDescartamos la D: La ganaxolona conserva el 3α-OH, necesario para la actividad; la protección la da el 3β-metilo.\n\nReferencia: Apuntes, Esteroides neuroactivos."
  },
  {
    id: "t05-m3-q09",
    topicId: "tema-05",
    block: "Bioquímica · Barbitúricos",
    badge: "Modelo 3 · P9 · Bioquímica · Barbitúricos",
    question: "El metarbital es un barbitúrico N-metilado (trisustituido). Solo la forma neutra cruza la barrera hematoencefálica. ¿Qué propiedades describen a estos compuestos a pH 7,4?",
    questionStructures: [{ name: "Metarbital", smiles: "CCC1(CC)C(=O)NC(=O)N(C)C1=O" }],
    options: [
      { text: "pKa 4,1, 0,05 % ionizado, con inicio más lento y acción más prolongada" },
      { text: "pKa 7,6, 61 % neutro, con inicio más rápido y acción más corta" },
      { text: "pKa 8,5, 93 % ionizado, con inicio más lento y acción más prolongada" },
      { text: "pKa 8,5, 93 % neutro, con inicio más rápido y acción más corta" },
    ],
    correctIndex: 3,
    explanation: "Con pKa 8,5, la fracción neutra a pH 7,4 es 100 / (1 + 10 elevado a (7,4 − 8,5)), cerca del 93 %. Al haber más forma neutra, cruza antes la barrera hematoencefálica: el inicio es más rápido y la acción, más corta.\n\nDescartamos la A: Ese pKa es el del ácido barbitúrico sin sustituir, ionizado casi por completo e inactivo; no es el de un N-alquilado.\nDescartamos la B: pKa 7,6 y 61 % neutro son los valores de los 5,5-disustituidos; el N-alquilo sube el pKa a 8,5 y la fracción neutra al 93 %.\nDescartamos la C: Con pKa 8,5 a pH 7,4 la mayor parte está neutra, no ionizada.\n\nReferencia: Apuntes, El pKa decide cuánta forma activa hay a pH 7,4."
  },
  {
    id: "t05-m3-q10",
    topicId: "tema-05",
    block: "Bioquímica · Barbitúricos",
    badge: "Modelo 3 · P10 · Bioquímica · Barbitúricos",
    question: "El tiopental, con C=S en C2, tiene acción ultracorta y se usa como anestésico general intravenoso. ¿Por qué pierde el efecto a los pocos minutos de la inyección?",
    questionStructures: [{ name: "Tiopental", smiles: "CCCC(C)C1(CC)C(=O)NC(=S)NC1=O" }],
    options: [
      { text: "Se glucuronida directamente y se elimina por vía renal" },
      { text: "Se descarboxila en el estómago a un compuesto inactivo" },
      { text: "Se redistribuye del cerebro al músculo y a la grasa" },
      { text: "Se N-desalquila en el hígado a un metabolito inactivo" },
    ],
    correctIndex: 2,
    explanation: "El tiopental es muy liposoluble: entra rápido en el cerebro y, al repartirse después hacia el músculo y la grasa, su concentración cerebral baja y el efecto termina en minutos. Por eso solo los barbitúricos de acción ultracorta sirven como anestésicos generales.\n\nDescartamos la A: La pérdida del efecto en minutos se debe a la redistribución, no a una eliminación metabólica.\nDescartamos la B: No lleva carboxilo y se da por vía intravenosa, sin paso por el estómago.\nDescartamos la D: No lleva sustituyentes en los nitrógenos; el efecto se acaba por redistribución, no por metabolismo.\n\nReferencia: Apuntes, Duración de acción."
  },
  {
    id: "t05-m3-q11",
    topicId: "tema-05",
    block: "SAR · Barbitúricos",
    badge: "Modelo 3 · P11 · SAR · Barbitúricos",
    question: "El barbital (R + R′ = 4 carbonos) y el secobarbital (R + R′ = 8 carbonos) difieren en la duración de su efecto. ¿Qué relación con su polaridad es correcta?",
    options: [
      { text: "El barbital, más polar, es de acción prolongada; el secobarbital, más lipófilo, es de acción corta." },
      { text: "El barbital, más lipófilo, es de acción corta; el secobarbital, más polar, es de acción prolongada." },
      { text: "El barbital y el secobarbital son ambos de acción prolongada, porque comparten el anillo barbitúrico." },
      { text: "El barbital, más polar, es de acción ultracorta; el secobarbital, más lipófilo, es de acción prolongada." },
    ],
    correctIndex: 0,
    explanation: "Los barbitúricos de acción prolongada son los más polares (R + R′ = 4 en el barbital). Al aumentar la liposolubilidad (R + R′ de 7 a 9, como en el secobarbital) se absorben, se distribuyen y se metabolizan antes, y el efecto dura menos.\n\nDescartamos la B: Se invierte la relación: el barbital, con menos carbonos, es el más polar.\nDescartamos la C: La duración cambia con R + R′ y la lipofilia: a más carbonos, el efecto es más corto.\nDescartamos la D: La acción ultracorta es la de los tiobarbitúricos lipófilos, no la de un barbitúrico polar como el barbital.\n\nReferencia: Apuntes, Duración de acción."
  },
  {
    id: "t05-m3-q12",
    topicId: "tema-05",
    block: "Síntesis · Barbitúricos",
    badge: "Modelo 3 · P12 · Síntesis · Barbitúricos",
    question: "Un malonato de dietilo disustituido se calienta con urea y NaOEt para cerrar el anillo de un barbitúrico. ¿Qué ocurre y qué cambia si se usa tiourea?",
    options: [
      { text: "Los N de la urea atacan los dos ésteres y salen dos H₂O; con tiourea, C=S en C4" },
      { text: "Los N de la urea atacan los dos ésteres y salen dos EtOH; con tiourea, C=S en C2" },
      { text: "Los N de la urea atacan los dos ésteres y salen dos EtOH; con tiourea, C=S en C4" },
      { text: "Los N de la urea atacan un éster y el otro se hidroliza; con tiourea, C=S en C2" },
    ],
    correctIndex: 1,
    explanation: "En medio básico con NaOEt, los dos nitrógenos de la urea atacan sendos ésteres y salen dos moléculas de etanol: se cierra la pirimidina-2,4,6-triona. Con tiourea, el C=S entre los dos nitrógenos pasa a ser el C2 del anillo y se obtienen los tiobarbitúricos, como el tiopental.\n\nDescartamos la A: Los grupos que salen son los etóxidos de los ésteres: se pierden como etanol, no como agua; y el C=S de la tiourea queda entre los dos nitrógenos, es decir, en el C2 y no en el C4.\nDescartamos la C: La tiourea aporta el C=S entre los dos nitrógenos, que en el anillo es el C2; C4 y C6 son los carbonilos del malonato.\nDescartamos la D: Los dos nitrógenos de la urea atacan cada uno un éster y salen dos moléculas de etanol; no hay hidrólisis.\n\nReferencia: Apuntes, Retrosíntesis: malonato disustituido y urea."
  },
  {
    id: "t05-m3-q13",
    topicId: "tema-05",
    block: "Síntesis · Metilación",
    badge: "Modelo 3 · P13 · Síntesis · Metilación",
    question: "Se comparan tres métodos de N-metilación: yoduro de metilo, sulfato de dimetilo y la reacción de Eschweiler–Clarke (formaldehído y ácido fórmico). ¿Qué afirmación es correcta?",
    options: [
      { text: "Eschweiler–Clarke puede llegar a la sal cuaternaria; CH₃I y Me₂SO₄ quedan en la terciaria" },
      { text: "CH₃I y Me₂SO₄ pueden llegar a la sal cuaternaria; el Me₂SO₄ no metila el N1 amídico" },
      { text: "Los tres métodos pueden llegar a la sal cuaternaria si hay exceso de reactivo" },
      { text: "CH₃I y Me₂SO₄ pueden llegar a la cuaternaria; Eschweiler–Clarke se queda en la terciaria" },
    ],
    correctIndex: 3,
    explanation: "El yoduro de metilo y el sulfato de dimetilo son electrófilos metilantes que pueden seguir alquilando hasta la sal de amonio cuaternario. El sulfato de dimetilo es lo bastante fuerte para metilar el N1 amídico del nordazepam, último paso del diazepam. Eschweiler–Clarke y la aminación reductora se detienen en la amina terciaria.\n\nDescartamos la A: Está invertido: sin N–H la amina terciaria no forma otro ion iminio, así que Eschweiler–Clarke se detiene ahí.\nDescartamos la B: El Me₂SO₄ es un metilante fuerte y metila el N1 amídico del nordazepam en el último paso del diazepam.\nDescartamos la C: Eschweiler–Clarke, como la aminación reductora, se detiene en la amina terciaria aunque haya exceso.\n\nReferencia: Apuntes, Agentes metilantes y reacción de Eschweiler–Clarke."
  },
  {
    id: "t05-m3-q14",
    topicId: "tema-05",
    block: "Síntesis · Benzodiazepinas",
    badge: "Modelo 3 · P14 · Síntesis · Benzodiazepinas",
    question: "Para alquilar el N1 del nordazepam con un haluro de alquilo se añade primero NaH. ¿Cuál es su función?",
    questionStructures: [{ name: "Nordazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1" }],
    options: [
      { text: "Desprotona la lactama para que el anión de N1, más nucleófilo, ataque" },
      { text: "Reduce el C=O de la lactama para que el N1 quede como amina nucleófila" },
      { text: "Convierte el haluro de alquilo en carbocatión para que ataque el N1 neutro" },
      { text: "Desprotona el C3 para que el haluro de alquilo ataque el carbono y no el N1" },
    ],
    correctIndex: 0,
    explanation: "El N1 está conjugado con el anillo aromático y con el C=O de C2: su par de electrones está deslocalizado y no es nucleófilo. El NaH arranca el protón del N–H (sale H₂) y deja un anión en N1, mucho más nucleófilo, que ataca al haluro de alquilo.\n\nDescartamos la B: El NaH es una base, no un reductor de amidas; el C=O de C2 se conserva en el producto.\nDescartamos la C: El NaH no activa al electrófilo: actúa sobre el N–H. Un N1 neutro conjugado con el anillo y el C=O no es nucleófilo.\nDescartamos la D: El protón que se arranca es el N–H de la lactama y el producto buscado es el N1-alquilado, no el C3.\n\nReferencia: Apuntes, Ejercicio 5.1: síntesis del prazepam."
  },
  {
    id: "t05-m3-q15",
    topicId: "tema-05",
    block: "Síntesis · Barbitúricos",
    badge: "Modelo 3 · P15 · Síntesis · Barbitúricos",
    question: "El secobarbital lleva en el C5 un alilo y un 1-metilbutilo. El resto secundario se introduce por condensación de Knoevenagel del malonato de dietilo con una cetona, seguida de deshidratación e hidrogenación. ¿Qué cetona hay que emplear?",
    questionStructures: [{ name: "Secobarbital", smiles: "C=CCC1(C(C)CCC)C(=O)NC(=O)NC1=O" }],
    options: [
      { text: "Estructura A", smiles: "CCC(C)=O", revealedName: "2-Butanona (daría sec-butilo: talbutal)" },
      { text: "Estructura B", smiles: "CCCC(C)=O", revealedName: "2-Pentanona" },
      { text: "Estructura C", smiles: "CCC(=O)CC", revealedName: "3-Pentanona (daría 1-etilpropilo)" },
      { text: "Estructura D", smiles: "CCCCC(C)=O", revealedName: "2-Hexanona (daría 1-metilpentilo)" },
    ],
    correctIndex: 1,
    explanation: "El 1-metilbutilo es un resto de cinco carbonos con el C secundario unido a un CH₃ y a un propilo; sale de la 2-pentanona por Knoevenagel, deshidratación e hidrogenación. El alilo, primario y alílico, entra después por SN2 con bromuro de alilo. Con otra cetona el resto cambia: la 2-butanona lleva al talbutal.\n\nDescartamos la A: Con 2-butanona el resto sería sec-butilo, un carbono menos: sale el talbutal.\nDescartamos la C: Tiene los cinco carbonos, pero el C=O central da un resto 1-etilpropilo y no 1-metilbutilo.\nDescartamos la D: Tiene un carbono de más: el resto sería 1-metilpentilo en lugar de 1-metilbutilo.\n\nReferencia: Apuntes, Ejercicio 5.6: síntesis del secobarbital."
  }
];
