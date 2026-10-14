// ==========================================================================
// QFDOS - Exámenes del Tema 03: Sistema Dopaminérgico
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Generado desde Exámenes modelo jev/Tema 3/fuente (examen_consensuado1,
// examen_consolidado2 y examen_consolidado3), certificados con Jev el 14/10/2026.
// Tipografía científica: Unicode directo, sin LaTeX crudo.
// ==========================================================================

import type { TestQuestion } from './qfdosData';

// ==========================================================================
// MODELO 1: Examen consensuado 1 · Dopamina, profármacos y síntesis de neurolépticos
// 15 preguntas · Clave: B, D, D, C, A, C, D, C, A, B, C, D, B, A, B
// ==========================================================================
export const TEMA3_MODELO_1_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t03-m1-q01",
    topicId: "tema-03",
    block: "Profármacos de depósito",
    badge: "Modelo 1 · P1 (Decanoato de flufenazina)",
    question: "Para mejorar el cumplimiento posológico en pacientes esquizofrénicos se diseñan formas farmacéuticas de liberación prolongada mediante derivatización química de la flufenazina. Respecto al decanoato de flufenazina, señale la afirmación correcta:",
    imagePath: "tests/tema-03/argon1_P02_alumno.png",
    options: [
      { text: "La esterificación con decanoato genera un derivado polar que bloquea de modo irreversible la captación hepática del fármaco." },
      { text: "La esterificación lipófila con decanoato genera una forma de depósito hidrolizada lentamente por las esterasas tisulares." },
      { text: "El grupo decanoato incrementa la solubilidad acuosa facilitando la absorción oral rápida sin requerir hidrólisis por esterasas." },
      { text: "El residuo graso decanoato se une covalentemente al receptor dopaminérgico prolongando el efecto sin precisar bioactivación." },
    ],
    correctIndex: 1,
    explanation: "El decanoato de flufenazina se obtiene esterificando el hidroxilo terminal de la flufenazina con ácido decanoico. La mayor lipofilia favorece su permanencia en el depósito, y la hidrólisis gradual del éster libera flufenazina activa. Es, por tanto, un profármaco de depósito: la forma administrada libera el fármaco de manera prolongada tras la hidrólisis.\n\nDescartamos la A: La esterificación con un ácido graso aumenta la lipofilia; no genera un derivado polar.\nDescartamos la C: El éster de cadena larga es más lipófilo, forma un depósito de liberación lenta y necesita la hidrólisis para regenerar el fármaco.\nDescartamos la D: El éster no actúa sobre el receptor: la hidrólisis gradual es la que libera la flufenazina activa.\n\nReferencia en los apuntes: p. 6, §4.2 y glosario (p. 13)."
  },
  {
    id: "t03-m1-q02",
    topicId: "tema-03",
    block: "Agonistas dopaminérgicos",
    badge: "Modelo 1 · P2 (Identificación de la apomorfina)",
    question: "Al tratar la morfina con HCl se obtiene un agonista dopaminérgico de estructura rígida que activa el receptor sin necesidad de convertirse en dopamina. Señale su estructura.",
    options: [
      { text: "Estructura A", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5", revealedName: "Morfina" },
      { text: "Estructura B", smiles: "CCOC(=O)C1(c2ccccc2)CCN(C)CC1", revealedName: "Petidina" },
      { text: "Estructura C", smiles: "CN1CCc2cccc3c2[C@H]1Cc1ccccc1-3", revealedName: "Aporfina sin hidroxilos (análogo rígido sin catecol)" },
      { text: "Estructura D", smiles: "CN1CCc2cccc3c2[C@H]1Cc1ccc(O)c(O)c1-3", revealedName: "Apomorfina" },
    ],
    correctIndex: 3,
    explanation: "En el esquema de la morfina con HCl vemos que el alcohol se protona, sale agua, se abre el puente éter y el sistema se reorganiza hasta aromatizar un anillo. El producto es la apomorfina, un esqueleto aporfínico rígido que conserva el N-metilo y presenta un catecol, el mismo grupo que reconoce el receptor en la dopamina. Es un agonista de activación directa: a diferencia de la levodopa, no necesita transformarse en dopamina.\n\nDescartamos la A: Es la morfina de partida, con el puente éter y el alcohol alílico intactos; todavía no ha sufrido la transposición en medio ácido.\nDescartamos la B: Es la petidina, una 4-fenilpiperidina analgésica de la que parten las butirofenonas; no procede de la transposición de la morfina.\nDescartamos la C: Tiene el esqueleto aporfínico pero le falta el catecol, de modo que no reproduce el patrón de hidroxilos de la dopamina que sí conserva la apomorfina.\n\nReferencia en los apuntes: p. 7, §5.1 y figura 4."
  },
  {
    id: "t03-m1-q03",
    topicId: "tema-03",
    block: "Fisiología dopaminérgica",
    badge: "Modelo 1 · P3 (Biosíntesis de la dopamina)",
    question: "El esquema muestra el aminoácido de partida de la ruta neuronal que conduce a la dopamina. ¿Qué secuencia describe correctamente esa biosíntesis?",
    imagePath: "tests/tema-03/argon1_P04_alumno.png",
    options: [
      { text: "La descarboxilasa actúa primero sobre la tirosina y da tiramina, que la tirosina hidroxilasa convierte después en dopamina." },
      { text: "La COMT hidroxila la tirosina a L-DOPA y la MAO-B la descarboxila a dopamina con desprendimiento de CO₂ en la neurona." },
      { text: "La tirosina se descarboxila directamente a dopamina en un solo paso catalizado por la tirosina hidroxilasa con O₂ y NADH." },
      { text: "La tirosina hidroxilasa (con O₂) da L-DOPA, y la descarboxilasa de aminoácidos aromáticos la convierte en dopamina y CO₂." },
    ],
    correctIndex: 3,
    explanation: "En la ruta neuronal, la L-tirosina se hidroxila a L-DOPA por acción de la tirosina hidroxilasa, que utiliza O₂, y la descarboxilasa de aminoácidos aromáticos convierte después la L-DOPA en dopamina con liberación de CO₂. La dopamina es a su vez precursora de la noradrenalina y la adrenalina.\n\nDescartamos la A: Invierte el orden: primero actúa la tirosina hidroxilasa y después la descarboxilasa sobre la L-DOPA.\nDescartamos la B: La COMT y la MAO participan en el metabolismo de las catecolaminas, no en su biosíntesis.\nDescartamos la C: La ruta tiene dos pasos enzimáticos distintos: hidroxilación a L-DOPA y descarboxilación a dopamina.\n\nReferencia en los apuntes: p. 3, §2.1."
  },
  {
    id: "t03-m1-q04",
    topicId: "tema-03",
    block: "Levodopa",
    badge: "Modelo 1 · P4 (Acceso de la levodopa al SNC)",
    question: "La dopamina no es útil por vía oral para actuar en el cerebro, mientras que la L-dopa sí alcanza el SNC. ¿Cuál es la explicación fisicoquímica y de transporte correcta?",
    options: [
      { text: "La dopamina cruza la BHE pero se oxida en el plasma, mientras la L-dopa resiste esa oxidación y llega intacta al receptor del estriado." },
      { text: "La dopamina se absorbe bien pero carece de afinidad D₂, y la L-dopa actúa directamente sobre el receptor sin transformarse en el encéfalo." },
      { text: "La dopamina es polar y catiónica a pH 7,4 y no cruza la BHE; la L-dopa, aminoácido, entra por LAT1 y la AADC la descarboxila en el SNC." },
      { text: "La dopamina se degrada por la COMT intestinal, y la L-dopa evita la barrera gracias a su mayor lipofilia y a la difusión pasiva endotelial." },
    ],
    correctIndex: 2,
    explanation: "La dopamina es polar y a pH fisiológico tiene la amina mayoritariamente protonada, de modo que su difusión pasiva a través de la BHE es muy limitada. La levodopa, en cambio, es reconocida por los transportadores de aminoácidos neutros grandes (LAT1 en la figura 2), entra en el SNC y allí la descarboxilasa de aminoácidos aromáticos la transforma en dopamina.\n\nDescartamos la A: La dopamina no atraviesa la BHE, y la levodopa no llega al receptor intacta: se descarboxila a dopamina en el SNC.\nDescartamos la B: La levodopa genera dopamina en el SNC por descarboxilación; no actúa como agonista directo sin transformarse.\nDescartamos la D: La levodopa entra por un transportador de aminoácidos, no por difusión pasiva ligada a su lipofilia.\n\nReferencia en los apuntes: p. 4–5, §3.1 y figura 2."
  },
  {
    id: "t03-m1-q05",
    topicId: "tema-03",
    block: "Inhibidores de AADC",
    badge: "Modelo 1 · P5 (Identificación de la carbidopa)",
    question: "En el tratamiento con levodopa se asocia un inhibidor periférico de la AADC derivado directamente del esqueleto de la levodopa, que no atraviesa la BHE. Señale la carbidopa.",
    options: [
      { text: "Estructura A", smiles: "C[C@](NN)(Cc1ccc(O)c(O)c1)C(=O)O", revealedName: "Carbidopa" },
      { text: "Estructura B", smiles: "N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O", revealedName: "L-dopa (levodopa)" },
      { text: "Estructura C", smiles: "C[C@](N)(Cc1ccc(O)c(O)c1)C(=O)O", revealedName: "alfa-metildopa" },
      { text: "Estructura D", smiles: "NC(CO)C(=O)NNCc1ccc(O)c(O)c1O", revealedName: "Benserazida" },
    ],
    correctIndex: 0,
    explanation: "En la figura de la levodopa y sus inhibidores reconocemos la carbidopa por su hidrazina (-NH-NH₂) sobre el carbono α, que además lleva un metilo, unida al mismo esqueleto catecólico de la levodopa. Carbidopa y benserazida inhiben la descarboxilasa de aminoácidos aromáticos en la periferia y, como no penetran de forma significativa en el SNC, permiten que llegue más levodopa al cerebro.\n\nDescartamos la B: Es la levodopa, con amina primaria y sin metilo en α; es el sustrato de la descarboxilasa, no su inhibidor.\nDescartamos la C: Es la α-metildopa: conserva el metilo en α pero lleva una amina normal en lugar de la hidrazina de la carbidopa.\nDescartamos la D: Es la benserazida, el otro inhibidor periférico de la figura, que no deriva del esqueleto de la levodopa.\n\nReferencia en los apuntes: p. 5, §3.2 y figura 3."
  },
  {
    id: "t03-m1-q06",
    topicId: "tema-03",
    block: "Difenilbutilpiperidinas",
    badge: "Modelo 1 · P6 (Pimozida y el carbonilo de las butirofenonas)",
    question: "La pimozida pertenece a la familia de las difenilbutilpiperidinas, relacionada con las butirofenonas. ¿Qué conclusión de relación estructura-actividad ilustra este fármaco?",
    imagePath: "tests/tema-03/argon1_P05_alumno.png",
    options: [
      { text: "El carbonilo es un requisito esencial para el bloqueo D₂, de modo que la pimozida carece de acción antipsicótica central." },
      { text: "Al suprimir el carbonilo, la molécula pasa a ser agonista dopaminérgico y se emplea como antiparkinsoniano de rescate." },
      { text: "El carbonilo de la butirofenona no es imprescindible, ya que la pimozida conserva la actividad antipsicótica sin él." },
      { text: "La pimozida conserva el carbonilo de la butirofenona y solo cambia el sustituyente unido al nitrógeno de la piperidina." },
    ],
    correctIndex: 2,
    explanation: "La pimozida es una difenilbutilpiperidina: en lugar del carbonilo de la butirofenona lleva un segundo anillo fluorado sobre el carbono terminal de la cadena. Ilustra que el carbonilo de la butirofenona no es imprescindible para obtener actividad antipsicótica.\n\nDescartamos la A: La pimozida es un antipsicótico activo, precisamente el ejemplo de que el carbonilo no es imprescindible.\nDescartamos la B: La pimozida sigue siendo un antagonista dopaminérgico con actividad antipsicótica, no un agonista.\nDescartamos la D: La pimozida no conserva el carbonilo: es una difenilbutilpiperidina.\n\nReferencia en los apuntes: p. 10, §6.4."
  },
  {
    id: "t03-m1-q07",
    topicId: "tema-03",
    block: "Profármacos",
    badge: "Modelo 1 · P7 (Retención en el SNC por carga)",
    question: "Una estrategia de profármaco para el SNC emplea un precursor lipófilo que, una vez en el cerebro, sufre una transformación química. ¿En qué se basa la retención local del fármaco?",
    options: [
      { text: "El precursor se reduce en el SNC a una especie neutra y más lipófila, que se acumula en las membranas neuronales del estriado." },
      { text: "El precursor se une de forma covalente a la albúmina cerebral, y el complejo resultante es demasiado grande para salir de la BHE." },
      { text: "El precursor se esterifica en el SNC con ácidos grasos y forma un depósito oleoso del que se libera despacio la especie activa." },
      { text: "El precursor se oxida en el SNC a una especie cargada e hidrófila, y esa carga dificulta su salida a través de las membranas." },
    ],
    correctIndex: 3,
    explanation: "Partimos de un precursor más lipófilo, capaz de alcanzar el SNC. Una vez allí se oxida a una especie cargada e hidrófila, y es esa carga la que dificulta su salida a través de las membranas y favorece la retención local. La estrategia funciona si la conversión es selectiva y si el compuesto de partida tiene propiedades de transporte adecuadas.\n\nDescartamos la A: Una especie neutra y más lipófila saldría con más facilidad; la retención exige lo contrario, una especie cargada e hidrófila.\nDescartamos la B: La retención se explica por la carga que adquiere la molécula tras oxidarse, no por una unión covalente a proteínas.\nDescartamos la C: Confunde esta estrategia con los ésteres de depósito, que se preparan antes de administrar el fármaco y no se forman en el cerebro.\n\nReferencia en los apuntes: p. 6, §4.2."
  },
  {
    id: "t03-m1-q08",
    topicId: "tema-03",
    block: "Metabolismo de catecolaminas",
    badge: "Modelo 1 · P8 (Inhibidores de MAO-B y COMT)",
    question: "En el tratamiento sintomático del Parkinson se emplean inhibidores de la MAO-B y de la COMT. ¿Qué describe correctamente su papel?",
    options: [
      { text: "Ambos aumentan la síntesis de dopamina al activar la tirosina hidroxilasa, de modo que sustituyen a la levodopa en el tratamiento." },
      { text: "La MAO-B metila los catecoles y la COMT oxida las aminas, de modo que su inhibición conjunta bloquea la descarboxilación central." },
      { text: "Inhibir la MAO-B reduce una ruta de degradación central de dopamina e inhibir la COMT puede alargar la disponibilidad de levodopa." },
      { text: "Ambos son antagonistas de los receptores D₂ presinápticos y aumentan la liberación de dopamina al suprimir la autorregulación." },
    ],
    correctIndex: 2,
    explanation: "La MAO y la COMT participan en el metabolismo de las catecolaminas y de la levodopa. Cuando inhibimos la MAO-B reducimos una ruta de degradación de la dopamina en el SNC, y cuando inhibimos la COMT modificamos el metabolismo de los catecoles y podemos prolongar la disponibilidad de levodopa. Son estrategias complementarias de modulación metabólica, no mecanismos de síntesis de dopamina.\n\nDescartamos la A: Ninguno de los dos actúa sobre la síntesis: reducen la degradación y complementan a la levodopa, no la sustituyen.\nDescartamos la B: Invierte las funciones: la COMT actúa sobre los catecoles y la MAO sobre las aminas, y ninguna interviene en la descarboxilación.\nDescartamos la D: Son inhibidores enzimáticos del metabolismo, no antagonistas de receptores dopaminérgicos.\n\nReferencia en los apuntes: p. 4, §2.2 (tabla) y p. 6, §4.1."
  },
  {
    id: "t03-m1-q09",
    topicId: "tema-03",
    block: "Tioxantenos",
    badge: "Modelo 1 · P9 (Síntesis del clorprotixeno e isomería E/Z)",
    question: "La síntesis del clorprotixeno parte de la 2-clorotioxanten-9-ona y culmina con la formación de un doble enlace exocíclico. Respecto a la secuencia de transformaciones químicas y a la estereoquímica del producto, señale la opción correcta:",
    imagePath: "tests/tema-03/argon1_P06_alumno.png",
    options: [
      { text: "La adición de Grignard al carbonilo y la deshidratación dan una mezcla E/Z, en la que se destaca como activo el isómero Z." },
      { text: "La reducción catalítica genera un único estereoisómero trans con el grupo amino alejado del anillo clorado para acoplarse con D₂." },
      { text: "La deshidratación intramolecular rinde solo el isómero E, cuya geometría rígida y extendida es la que activa el receptor dopaminérgico." },
      { text: "La sustitución electrofílica directa sobre el anillo produce el isómero cis inactivo, requiriendo isomerización térmica a la forma E." },
    ],
    correctIndex: 0,
    explanation: "Sobre el carbonilo de la 2-clorotioxantona actúa el reactivo de Grignard cloruro de 3-(dimetilamino)propilmagnesio y se forma un alcohol terciario. La deshidratación crea el doble enlace que conecta el sistema tricíclico con la cadena lateral, y ese doble enlace genera isomería geométrica: obtenemos una mezcla E/Z en la que se destaca como activo el (Z)-clorprotixeno, acompañado del isómero E, menos activo.\n\nDescartamos la B: No hay reducción catalítica: la secuencia es adición de Grignard al carbonilo y deshidratación, y el isómero activo es el Z.\nDescartamos la C: La deshidratación da una mezcla de isómeros E y Z, y el que se destaca como activo es el Z.\nDescartamos la D: El doble enlace se forma por deshidratación del alcohol, no por sustitución electrofílica, y la forma activa es la Z.\n\nReferencia en los apuntes: p. 8, §6.3 y p. 9, figura 6."
  },
  {
    id: "t03-m1-q10",
    topicId: "tema-03",
    block: "Síntesis",
    badge: "Modelo 1 · P10 (Fragmento A: acilación de Friedel-Crafts)",
    question: "En la ruta del haloperidol, el fragmento A electrófilo se prepara acilando fluorobenceno con un cloruro de acilo apropiado, el cloruro de 4-clorobutanoílo. ¿Qué tipo de reacción tiene lugar y qué justifica su regioselectividad?",
    imagePath: "tests/tema-03/argon1_P07_alumno.png",
    options: [
      { text: "La acilación con cloruro de acilo y AlCl₃ orienta a meta debido al fuerte efecto desactivante e inductivo del sustituyente de flúor." },
      { text: "La acilación de Friedel-Crafts con AlCl₃ rinde el isómero para por impedimento estérico y la orientación electrónica del halógeno." },
      { text: "La sustitución nucleofílica aromática desplaza al flúor generando una butirofenona fenilada no sustituida en el carbono aromático." },
      { text: "La condensación aldólica del fluorobenceno con ácido butanoico catalizada por AlCl₃ genera el aducto orto como producto mayoritario." },
    ],
    correctIndex: 1,
    explanation: "El fragmento A se prepara por acilación de Friedel-Crafts del fluorobenceno con un cloruro de acilo apropiado: el anillo aromático ataca al electrófilo acilio. El flúor orienta a orto y para, y predomina el producto para por impedimento estérico.\n\nDescartamos la A: El flúor orienta a orto y para, no a meta.\nDescartamos la C: No es una sustitución nucleófila aromática: el anillo actúa como nucleófilo frente al acilio y el flúor se conserva.\nDescartamos la D: Es una acilación de Friedel-Crafts con un cloruro de acilo, y predomina el producto para por impedimento estérico.\n\nReferencia en los apuntes: p. 11, §7.1."
  },
  {
    id: "t03-m1-q11",
    topicId: "tema-03",
    block: "Síntesis",
    badge: "Modelo 1 · P11 (Retrosíntesis del haloperidol)",
    question: "En el análisis retrosintético del haloperidol, ¿qué desconexión resulta útil y qué papel cumple cada fragmento en la reacción directa?",
    questionStructures: [{ name: "Haloperidol", smiles: "O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1" }],
    options: [
      { text: "Se desconecta el enlace C–C del carbonilo: el arilo actúa como electrófilo y la cadena como nucleófilo en una acilación final." },
      { text: "Se desconecta el enlace C–O del alcohol: el piperidinol se forma al final por hidratación de una tetrahidropiridina en ácido." },
      { text: "Se desconecta el enlace C–N: la piperidina secundaria es nucleófilo y el haluro de alquilo primario el electrófilo en una SN2." },
      { text: "Se desconecta el enlace C–N: la amina actúa como electrófilo y la cadena halogenada como nucleófilo en una sustitución SN1." },
    ],
    correctIndex: 2,
    explanation: "La desconexión útil es el enlace C–N que une el nitrógeno de la piperidina con la cadena de la butirofenona. En la reacción directa la piperidina secundaria actúa como nucleófilo y el carbono primario unido al halógeno de la cadena actúa como electrófilo; el acoplamiento por SN2 forma el enlace C–N y libera el haluro como grupo saliente.\n\nDescartamos la A: La acilación de Friedel-Crafts construye el fragmento de la butirofenona, pero no es la desconexión que une los dos fragmentos, y en ella el anillo actúa como nucleófilo.\nDescartamos la B: El alcohol del piperidinol se forma por adición de un Grignard a la piperidona, antes del acoplamiento, y no es la desconexión útil.\nDescartamos la D: Los papeles están invertidos: la amina es el nucleófilo y el carbono primario halogenado el electrófilo, en una SN2.\n\nReferencia en los apuntes: p. 11, §7.1."
  },
  {
    id: "t03-m1-q12",
    topicId: "tema-03",
    block: "Síntesis",
    badge: "Modelo 1 · P12 (Fragmento B del trifluperidol)",
    question: "La construcción del Fragmento B del trifluperidol (4-(3-(trifluorometil)fenil)piperidin-4-ol) implica una secuencia multietapa para formar el heterociclo y funcionalizar la posición 4. ¿Cuál es el orden secuencial correcto de transformaciones?",
    imagePath: "tests/tema-03/argon1_P08_alumno.png",
    options: [
      { text: "La condensación de Mannich entre bencilamina y acetona genera la piperidona, que se alquila con fluorobenceno en medio alcalino." },
      { text: "La aminación reductora con bencilamina forma una tetrahidropiridina cíclica que incorpora el grupo arilo mediante reacción Heck." },
      { text: "La adición 1,2 directa de bencilamina al carbonilo rinde una imina cíclica que se reduce con borohidruro sódico y se trifluorometila." },
      { text: "La adición de Michael 1,4, la ciclación intramolecular, la descarboxilación y el Grignard construyen el anillo sustituido en C-4." },
    ],
    correctIndex: 3,
    explanation: "La ruta del fragmento B empieza con la doble adición de Michael 1,4 de la bencilamina sobre el acrilato de etilo. El diéster se cierra por condensación intramolecular con NaOEt, el β-cetoéster se hidroliza con NaOH y, tras acidificar y calentar, pierde CO₂ y da la N-bencil-4-piperidona. La adición del Grignard de 3-(trifluorometil)fenilo al carbonilo forma el alcohol terciario, y la hidrogenólisis con H₂/Pd elimina el bencilo y libera la piperidina secundaria.\n\nDescartamos la A: La ruta de los apuntes no usa una reacción de Mannich ni alquila con fluorobenceno: construye el anillo por adición de Michael y ciclación intramolecular.\nDescartamos la B: El arilo se introduce con un reactivo de Grignard sobre la piperidona, no con una reacción de Heck.\nDescartamos la C: La bencilamina se adiciona en 1,4 al sistema conjugado del acrilato, no en 1,2 sobre un carbonilo.\n\nReferencia en los apuntes: p. 11, §7.1 y p. 12, figura 8."
  },
  {
    id: "t03-m1-q13",
    topicId: "tema-03",
    block: "Estereoquímica",
    badge: "Modelo 1 · P13 (Configuración absoluta de la L-DOPA)",
    question: "La levodopa (L-DOPA) que atraviesa la BHE por el transportador de aminoácidos es el enantiómero de configuración S. Asigne la configuración CIP de las estructuras que tengan un centro estereogénico y señale la L-DOPA.",
    options: [
      { text: "Estructura A", smiles: "N[C@H](Cc1ccc(O)c(O)c1)C(=O)O", revealedName: "D-DOPA (R)" },
      { text: "Estructura B", smiles: "N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O", revealedName: "L-DOPA (S)" },
      { text: "Estructura C", smiles: "N[C@@H](Cc1ccc(O)cc1)C(=O)O", revealedName: "L-Tirosina (S)" },
      { text: "Estructura D", smiles: "NCCc1ccc(O)c(O)c1", revealedName: "Dopamina (sin estereocentro)" },
    ],
    correctIndex: 1,
    explanation: "La L-DOPA tiene el catecol en 3,4 y un carbono α estereogénico con NH₂, COOH, CH₂Ar y H. Aplicando las reglas CIP (NH₂ > COOH > CH₂Ar > H) la estructura b es S. La designación L/D no equivale por sí sola a S/R: la configuración absoluta se asigna con las reglas CIP en cada estructura, y los transportadores y enzimas que procesan la levodopa son estereoselectivos.\n\nDescartamos la A: Es el enantiómero R (D-DOPA): mismo catecol y misma conectividad, pero configuración invertida en el carbono α.\nDescartamos la C: Tiene configuración S, pero le falta el segundo hidroxilo del catecol: es la L-tirosina, el aminoácido de partida de la biosíntesis.\nDescartamos la D: Es la dopamina, que carece de carboxilo y de centro estereogénico; es el producto de la descarboxilación.\n\nReferencia en los apuntes: p. 3, §1.1 y §2.1; p. 6, §3.3; p. 5, figura 2."
  },
  {
    id: "t03-m1-q14",
    topicId: "tema-03",
    block: "Difenilbutilpiperidinas",
    badge: "Modelo 1 · P14 (Identificación de la pimozida)",
    question: "Entre los antipsicóticos derivados de la petidina encontramos butirofenonas y difenilbutilpiperidinas. Señale la estructura de la difenilbutilpiperidina presente.",
    options: [
      { text: "Estructura A", smiles: "O=c1[nH]c2ccccc2n1C1CCN(CCCC(c2ccc(F)cc2)c2ccc(F)cc2)CC1", revealedName: "Pimozida" },
      { text: "Estructura B", smiles: "O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1", revealedName: "Haloperidol" },
      { text: "Estructura C", smiles: "O=C(CCCN1CC=C(n2c(=O)[nH]c3ccccc32)CC1)c1ccc(F)cc1", revealedName: "Droperidol" },
      { text: "Estructura D", smiles: "O=C(CCCN1CCC(O)(c2cccc(C(F)(F)F)c2)CC1)c1ccc(F)cc1", revealedName: "Trifluperidol" },
    ],
    correctIndex: 0,
    explanation: "La pimozida es una difenilbutilpiperidina: le falta el carbonilo de la butirofenona y en su lugar lleva un segundo anillo fluorado sobre el carbono terminal de la cadena. Ilustra que el carbonilo de la butirofenona no es imprescindible para obtener actividad antipsicótica.\n\nDescartamos la B: Es el haloperidol, que conserva el carbonilo de la butirofenona y el piperidinol con un anillo clorado.\nDescartamos la C: Es una butirofenona con heterociclo sustituido (droperidol), que mantiene el carbonilo.\nDescartamos la D: Es el trifluperidol, una butirofenona con un anillo CF₃ en el piperidinol que también conserva el carbonilo.\n\nReferencia en los apuntes: p. 10, §6.4."
  },
  {
    id: "t03-m1-q15",
    topicId: "tema-03",
    block: "Fenotiazinas",
    badge: "Modelo 1 · P15 (Cadena entre el nitrógeno del núcleo y la amina terminal)",
    question: "Las estructuras I y II del esquema son fenotiazinas que difieren en la cadena que une el nitrógeno del núcleo con la amina terminal. ¿Qué relación estructura-actividad recogen correctamente los apuntes?",
    imagePath: "tests/tema-03/argon1_P01_alumno.png",
    options: [
      { text: "La cadena de dos carbonos de II es la característica de los neurolépticos, y la de tres carbonos de I define a los antihistamínicos." },
      { text: "La cadena de unos tres carbonos de I es propia de muchos neurolépticos; su relación con el perfil antihistamínico es de tendencia." },
      { text: "El número de carbonos de la cadena basta por sí solo para clasificar cada fenotiazina como neuroléptica o como antihistamínica." },
      { text: "La cadena de tres carbonos de I solo influye en la absorción oral, y la actividad depende del azufre del triciclo y no de la cadena." },
    ],
    correctIndex: 1,
    explanation: "En la serie de las fenotiazinas, una cadena de aproximadamente tres átomos de carbono entre el nitrógeno del núcleo y la amina terminal es característica de numerosos neurolépticos, como vemos en la estructura I (clorpromazina). La relación entre estructura, actividad antipsicótica y actividad antihistamínica es una tendencia de serie, no una regla universal que permita clasificar una molécula solo por el número de carbonos.\n\nDescartamos la A: Invierte la tendencia: la cadena de unos tres carbonos es la característica de los neurolépticos fenotiazínicos.\nDescartamos la C: Los apuntes advierten que la relación es una tendencia de serie y no una regla que permita clasificar una molécula solo por el número de carbonos.\nDescartamos la D: La cadena lateral sí contribuye a la interacción con el receptor, junto con la forma plegada del triciclo.\n\nReferencia en los apuntes: p. 7, §6.2 y p. 8, figura 5."
  },
];

// ==========================================================================
// MODELO 2: Examen consolidado 2 · Modelo 2 con preguntas del modelo Argón 1
// 15 preguntas · Clave: C, A, D, B, C, D, A, B, A, C, B, D, C, B, A
// ==========================================================================
export const TEMA3_MODELO_2_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t03-m2-q01",
    topicId: "tema-03",
    block: "Fisiología y Parkinson",
    badge: "Modelo 2 · P1 (Estrategias terapéuticas sintomáticas)",
    question: "La degeneración de la sustancia negra reduce la dopamina estriatal en la enfermedad de Parkinson. ¿Qué formulación resume las estrategias farmacológicas sintomáticas del tema?",
    options: [
      { text: "Regenerar las neuronas dopaminérgicas perdidas de la sustancia negra y restaurar la síntesis endógena de dopamina en el estriado." },
      { text: "Bloquear los receptores D₂ estriatales para elevar la dopamina sináptica y reforzar de paso la transmisión colinérgica central." },
      { text: "Reponer dopamina con levodopa, favorecer su liberación, estimular receptores dopaminérgicos y atenuar el tono colinérgico relativo." },
      { text: "Aumentar la acetilcolina central para compensar el déficit motor y frenar la degradación de dopamina mediante agonistas muscarínicos." },
    ],
    correctIndex: 2,
    explanation: "El tratamiento farmacológico del Parkinson es sintomático: buscamos restaurar la señal dopaminérgica o modular el circuito, no regenerar las neuronas perdidas. Aportamos un precursor (levodopa), favorecemos la liberación presináptica (amantadina), activamos los receptores con agonistas directos, reducimos la degradación con inhibidores de MAO-B o COMT y, de forma limitada, disminuimos la señal colinérgica con anticolinérgicos.\n\nDescartamos la A: El tratamiento es sintomático y no regenera las neuronas dopaminérgicas perdidas.\nDescartamos la B: Bloquear receptores dopaminérgicos agravaría el déficit, y reforzar la transmisión colinérgica va en contra del objetivo.\nDescartamos la D: La estrategia colinérgica consiste en disminuir la señal de la acetilcolina, no en aumentarla.\n\nReferencia en los apuntes: p. 4, §2.2 (tabla de estrategias)."
  },
  {
    id: "t03-m2-q02",
    topicId: "tema-03",
    block: "Agonistas directos",
    badge: "Modelo 2 · P2 (Transposición ácida morfina→apomorfina)",
    question: "La apomorfina se obtiene tratando morfina con ácido fuerte. ¿Qué describe el cambio químico y farmacológico que ocurre en esa transposición?",
    questionStructures: [{ name: "Morfina", smiles: "CN1CC[C@]23c4c5ccc(O)c4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5" }],
    options: [
      { text: "Se abre el puente éter, hay deshidratación y aromatización del anillo C: surge un catecol y pasa a ser agonista dopaminérgico." },
      { text: "Se mantiene el puente éter 4,5 y la molécula conserva su afinidad por el receptor opioide μ sumando una nueva acción sobre D₁/D₂." },
      { text: "El anillo C se reduce con retención del hidroxilo alílico, generando un aminoalcohol que estimula de forma selectiva el receptor D₃." },
      { text: "La N-desmetilación del nitrógeno es el cambio central que convierte el morfinano en un catecol agonista de los receptores D₁ y D₂." },
    ],
    correctIndex: 0,
    explanation: "En el esquema de la morfina con HCl, el alcohol se protona y sale como agua, se abre el puente éter y el sistema se reorganiza hasta aromatizar el anillo; aparece así el catecol de la apomorfina. El producto conserva el N-metilo y se comporta como agonista dopaminérgico de estructura rígida, que activa el receptor sin convertirse en dopamina.\n\nDescartamos la B: En la transposición el puente éter se abre; la apomorfina ya no conserva el esqueleto de la morfina.\nDescartamos la C: El anillo no se reduce: pierde agua y aromatiza, y el producto es un catecol.\nDescartamos la D: El nitrógeno conserva su metilo en la apomorfina; el cambio procede de la deshidratación y la aromatización en medio ácido.\n\nReferencia en los apuntes: p. 7, §5.1 y figura 4."
  },
  {
    id: "t03-m2-q03",
    topicId: "tema-03",
    block: "Síntesis",
    badge: "Modelo 2 · P3 (Doble adición de Michael 1,4 sobre acrilato de etilo)",
    question: "En la preparación del fragmento piperidínico del trifluperidol, la bencilamina reacciona con dos equivalentes de acrilato de etilo por adición conjugada. Señale el producto de esa etapa, previo a la ciclación con NaOEt.",
    questionStructures: [{ name: "Bencilamina", smiles: "NCc1ccccc1" }, { name: "Acrilato de etilo", smiles: "C=CC(=O)OCC" }],
    options: [
      { text: "Estructura A", smiles: "CCOC(=O)CCNCc1ccccc1", revealedName: "Monoaducto (una sola adición 1,4)" },
      { text: "Estructura B", smiles: "C=CC(=O)NCc1ccccc1", revealedName: "N-Bencilacrilamida (ataque al carbonilo del éster)" },
      { text: "Estructura C", smiles: "CCOC(=O)C1CN(Cc2ccccc2)CCC1=O", revealedName: "β-Cetoéster cíclico (producto de la ciclación posterior)" },
      { text: "Estructura D", smiles: "CCOC(=O)CCN(CCC(=O)OCC)Cc1ccccc1", revealedName: "Diéster de doble adición de Michael" },
    ],
    correctIndex: 3,
    explanation: "En la adición de Michael 1,4 el nitrógeno de la bencilamina, nucleófilo, ataca el carbono β del acrilato, que es el extremo electrófilo del sistema conjugado. Con dos equivalentes de acrilato la amina se adiciona dos veces y obtenemos el diéster N,N-disustituido, que en la etapa siguiente cierra el anillo por condensación intramolecular con NaOEt.\n\nDescartamos la A: Es el producto de una sola adición; la amina secundaria resultante sigue siendo nucleófila y adiciona el segundo equivalente de acrilato.\nDescartamos la B: Corresponde a un ataque 1,2 sobre el carbonilo del éster con pérdida de etanol; la etapa descrita es una adición conjugada 1,4.\nDescartamos la C: Es el β-cetoéster cíclico que se forma después, al tratar el diéster con NaOEt; todavía no corresponde a esta etapa.\n\nReferencia en los apuntes: p. 11, §7.1 y p. 12, figura 8."
  },
  {
    id: "t03-m2-q04",
    topicId: "tema-03",
    block: "Síntesis",
    badge: "Modelo 2 · P4 (Fragmento A del haloperidol: acilación de Friedel-Crafts)",
    question: "En la ruta del haloperidol, el fragmento A electrófilo se prepara acilando fluorobenceno con un cloruro de acilo apropiado, el cloruro de 4-clorobutanoílo. ¿Qué describe correctamente esa etapa y su regioselectividad?",
    questionStructures: [{ name: "Fluorobenceno", smiles: "Fc1ccccc1" }, { name: "Cloruro de 4-clorobutanoílo", smiles: "O=C(Cl)CCCCl" }],
    options: [
      { text: "Es una sustitución nucleófila aromática: el acilo desplaza al flúor y se obtiene una butirofenona sin halógeno en el anillo." },
      { text: "Es una acilación de Friedel-Crafts; el flúor orienta a orto y para, y predomina el isómero para por impedimento estérico." },
      { text: "Es una acilación de Friedel-Crafts, pero el flúor, desactivante por efecto inductivo, dirige el acilo a la posición meta." },
      { text: "Es una adición de Grignard del fluorobenceno al cloruro de acilo, y predomina el orto por coordinación del flúor al magnesio." },
    ],
    correctIndex: 1,
    explanation: "El fragmento A se obtiene por acilación de Friedel-Crafts: el anillo del fluorobenceno ataca al electrófilo acilio generado a partir del cloruro de acilo. El flúor orienta a las posiciones orto y para, y predomina el producto para por impedimento estérico, de modo que obtenemos la 4-cloro-1-(4-fluorofenil)butan-1-ona, el haluro de alquilo que luego N-alquila a la piperidina.\n\nDescartamos la A: No es una sustitución nucleófila aromática: el anillo actúa como nucleófilo frente al acilio y el flúor se conserva en el producto.\nDescartamos la C: El flúor orienta a orto y para, no a meta; en el producto el acilo queda en para.\nDescartamos la D: No interviene ningún organomagnesiano: es una sustitución electrófila aromática, y predomina el isómero para.\n\nReferencia en los apuntes: p. 11, §7.1 (tabla, fragmento A)."
  },
  {
    id: "t03-m2-q05",
    topicId: "tema-03",
    block: "Tioxantenos",
    badge: "Modelo 2 · P5 (Isomería E/Z del clorprotixeno)",
    question: "La deshidratación final de la síntesis del clorprotixeno da una mezcla de isómeros geométricos alrededor del doble enlace exocíclico. Señale el isómero que se destaca como activo.",
    options: [
      { text: "Estructura A", smiles: "CN(C)CC/C=C1\\c2ccccc2Sc2ccc(Cl)cc21", revealedName: "(E)-Clorprotixeno" },
      { text: "Estructura B", smiles: "CN(C)CCCC1(O)c2ccccc2Sc2ccc(Cl)cc21", revealedName: "Alcohol terciario previo a la deshidratación" },
      { text: "Estructura C", smiles: "CN(C)CC/C=C1/c2ccccc2Sc2ccc(Cl)cc21", revealedName: "(Z)-Clorprotixeno" },
      { text: "Estructura D", smiles: "O=C1c2ccccc2Sc2ccc(Cl)cc21", revealedName: "2-Clorotioxantona" },
    ],
    correctIndex: 2,
    explanation: "El doble enlace que conecta el sistema tricíclico con la cadena lateral genera isomería geométrica E/Z, y la geometría condiciona la orientación de los grupos del farmacóforo. En el isómero Z la cadena con la dimetilamina queda del mismo lado que el anillo que lleva el cloro; es la forma que se destaca como activa, acompañada del isómero E, menos activo.\n\nDescartamos la A: Es el isómero E, con la cadena orientada hacia el anillo sin cloro; aparece en la mezcla pero es el menos activo.\nDescartamos la B: Es el alcohol terciario formado en el Grignard; todavía no tiene el doble enlace y no presenta isomería E/Z.\nDescartamos la D: Es la 2-clorotioxantona, la cetona sobre la que actúa el Grignard; carece de cadena lateral.\n\nReferencia en los apuntes: p. 8, §6.3 y p. 9, figura 6."
  },
  {
    id: "t03-m2-q06",
    topicId: "tema-03",
    block: "Profármacos",
    badge: "Modelo 2 · P6 (Concepto de profármaco doble)",
    question: "Un compuesto se presenta como profármaco doble. ¿Qué análisis exige esa denominación al estudiar su estructura?",
    options: [
      { text: "Basta con comprobar que es más lipófilo que el fármaco de partida, ya que la lipofilia define por sí sola al profármaco doble." },
      { text: "Implica que se administra a dosis doble, porque la mitad de la molécula se pierde en la primera transformación metabólica." },
      { text: "Indica que la molécula une dos fármacos activos distintos por un enlace éster y que ambos actúan sobre el mismo receptor." },
      { text: "Requiere más de una transformación para dar la especie activa: hay que ver qué grupos se enmascaran y qué pasos los liberan." },
    ],
    correctIndex: 3,
    explanation: "Un profármaco doble es una forma enmascarada que necesita más de una transformación para liberar o generar la especie activa. Al analizarlo identificamos qué grupos funcionales se enmascaran, qué pasos metabólicos los eliminan y cuál es el producto final; no basta con llamar profármaco a un análogo más lipófilo.\n\nDescartamos la A: La lipofilia por sí sola no define un profármaco doble: lo que lo define es la secuencia de transformaciones que regenera la especie activa.\nDescartamos la B: El término no se refiere a la dosis, sino al número de transformaciones necesarias para liberar el fármaco.\nDescartamos la C: No describe la unión de dos fármacos distintos, sino un mismo fármaco con varios grupos enmascarados.\n\nReferencia en los apuntes: p. 6, §4.2 (recuadro «Profármaco doble»)."
  },
  {
    id: "t03-m2-q07",
    topicId: "tema-03",
    block: "Síntesis",
    badge: "Modelo 2 · P7 (Acoplamiento SN2 de los fragmentos)",
    question: "El acoplamiento final entre la 4-cloro-1-(4-fluorofenil)butan-1-ona (Fragmento A) y el 4-(4-clorofenil)piperidin-4-ol (Fragmento B) para obtener haloperidol transcurre bajo un mecanismo orgánico fundamental. ¿De qué transformación se trata?",
    imagePath: "tests/tema-03/argon1_P09_alumno.png",
    options: [
      { text: "Sustitución nucleófila bimolecular SN2: el nitrógeno secundario de B ataca el carbono primario clorado de A y forma el enlace C–N." },
      { text: "Acoplamiento oxidativo radicalario entre los dos fragmentos promovido por sales de cobre en condiciones térmicas de alta presión." },
      { text: "Ataque electrofílico del carbonilo del fragmento A sobre el anillo bencénico del fragmento B catalizado por un ácido de Lewis fuerte." },
      { text: "Adición nucleofílica del nitrógeno de la piperidina al grupo carbonilo para formar un enlace imina estable con pérdida de agua." },
    ],
    correctIndex: 0,
    explanation: "La desconexión útil del haloperidol es el enlace C–N entre el nitrógeno de la piperidina y la cadena de la butirofenona. En la reacción directa, la piperidina secundaria es el nucleófilo y el carbono primario unido al halógeno es el electrófilo; el acoplamiento por SN2 forma el enlace C–N.\n\nDescartamos la B: No es un acoplamiento radicalario: es una sustitución nucleófila bimolecular.\nDescartamos la C: El enlace que se forma es C–N alifático por ataque de la amina, no una sustitución electrofílica sobre el anillo.\nDescartamos la D: La amina ataca al carbono primario que lleva el halógeno, no al carbonilo.\n\nReferencia en los apuntes: p. 11, §7.1."
  },
  {
    id: "t03-m2-q08",
    topicId: "tema-03",
    block: "Fisiología y Parkinson",
    badge: "Modelo 2 · P8 (Amantadina)",
    question: "Entre las estrategias sintomáticas frente al Parkinson figura la amantadina. ¿Qué la caracteriza dentro de esas estrategias?",
    options: [
      { text: "Es un precursor que entra por el transportador de aminoácidos y se descarboxila a dopamina en el estriado, igual que la levodopa." },
      { text: "Favorece la liberación o la disponibilidad presináptica de dopamina, con un mecanismo que no es idéntico al de la levodopa." },
      { text: "Es un agonista directo de estructura rígida que se obtiene de la morfina y activa el receptor sin convertirse en dopamina." },
      { text: "Inhibe la COMT periférica y prolonga la disponibilidad de levodopa, por lo que se clasifica como modulador metabólico." },
    ],
    correctIndex: 1,
    explanation: "En la clasificación de estrategias, la amantadina ocupa el apartado de liberación presináptica: favorece la liberación o la disponibilidad de dopamina, con un mecanismo que no es idéntico al de la levodopa, que actúa como precursor.\n\nDescartamos la A: Esa es la estrategia del precursor, que corresponde a la levodopa.\nDescartamos la C: Describe a la apomorfina, agonista de activación directa obtenido a partir de la morfina.\nDescartamos la D: La inhibición de la COMT es una estrategia de modulación metabólica distinta, no la de la amantadina.\n\nReferencia en los apuntes: p. 4, §2.2 (tabla de estrategias)."
  },
  {
    id: "t03-m2-q09",
    topicId: "tema-03",
    block: "Tioxantenos",
    badge: "Modelo 2 · P9 (Síntesis del clorprotixeno e isomería E/Z)",
    question: "La síntesis del clorprotixeno parte de la 2-clorotioxanten-9-ona y culmina con la formación de un doble enlace exocíclico. Respecto a la secuencia de transformaciones químicas y a la estereoquímica del producto, señale la opción correcta:",
    imagePath: "tests/tema-03/argon1_P06_alumno.png",
    options: [
      { text: "La adición de Grignard al carbonilo y la deshidratación dan una mezcla E/Z, en la que se destaca como activo el isómero Z." },
      { text: "La reducción catalítica genera un único estereoisómero trans con el grupo amino alejado del anillo clorado para acoplarse con D₂." },
      { text: "La deshidratación intramolecular rinde solo el isómero E, cuya geometría rígida y extendida es la que activa el receptor dopaminérgico." },
      { text: "La sustitución electrofílica directa sobre el anillo produce el isómero cis inactivo, requiriendo isomerización térmica a la forma E." },
    ],
    correctIndex: 0,
    explanation: "Sobre el carbonilo de la 2-clorotioxantona actúa el reactivo de Grignard cloruro de 3-(dimetilamino)propilmagnesio y se forma un alcohol terciario. La deshidratación crea el doble enlace que conecta el sistema tricíclico con la cadena lateral, y ese doble enlace genera isomería geométrica: obtenemos una mezcla E/Z en la que se destaca como activo el (Z)-clorprotixeno, acompañado del isómero E, menos activo.\n\nDescartamos la B: No hay reducción catalítica: la secuencia es adición de Grignard al carbonilo y deshidratación, y el isómero activo es el Z.\nDescartamos la C: La deshidratación da una mezcla de isómeros E y Z, y el que se destaca como activo es el Z.\nDescartamos la D: El doble enlace se forma por deshidratación del alcohol, no por sustitución electrofílica, y la forma activa es la Z.\n\nReferencia en los apuntes: p. 8, §6.3 y p. 9, figura 6."
  },
  {
    id: "t03-m2-q10",
    topicId: "tema-03",
    block: "Fenotiazinas",
    badge: "Modelo 2 · P10 (Forma del núcleo y amina terminal)",
    question: "Sobre la forma del núcleo de las fenotiazinas neurolépticas y la naturaleza de su amina terminal, ¿qué afirmación es correcta?",
    questionStructures: [{ name: "Clorpromazina", smiles: "CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21" }],
    options: [
      { text: "El triciclo es plano y aromático en su conjunto, y la amina terminal tiene que ser una dimetilamina para conservar la actividad." },
      { text: "El triciclo contiene dos átomos de nitrógeno y carece de azufre, y su planaridad facilita la unión al receptor dopaminérgico." },
      { text: "El triciclo con S y N no es plano sino plegado, y la amina terminal puede formar parte de una piperidina o de una piperazina." },
      { text: "El triciclo se pliega al protonarse el azufre, y en los compuestos más activos la amina terminal es un amonio cuaternario." },
    ],
    correctIndex: 2,
    explanation: "Las fenotiazinas son sistemas tricíclicos con azufre y nitrógeno cuyo anillo central no es completamente plano. Esa forma plegada, junto con la cadena lateral, contribuye a las interacciones con el receptor. La amina terminal puede formar parte de una piperidina o de una piperazina, y la identidad del grupo y de sus sustituyentes modifica la potencia y el perfil farmacológico.\n\nDescartamos la A: El anillo central no es plano, y la amina terminal admite piperidinas y piperazinas además de la dimetilamina.\nDescartamos la B: El triciclo lleva un azufre y un nitrógeno, y su forma es plegada, no plana.\nDescartamos la D: El plegamiento es propio del triciclo, y una carga permanente en la amina dificultaría el paso de la BHE y la acción central.\n\nReferencia en los apuntes: p. 7–8, §6.1 y §6.2."
  },
  {
    id: "t03-m2-q11",
    topicId: "tema-03",
    block: "Neurolépticos: SAR",
    badge: "Modelo 2 · P11 (Cadena lateral y sustituyente en posición 2)",
    question: "En las fenotiazinas neurolépticas, la cadena que separa el nitrógeno del núcleo de la amina terminal y el sustituyente del anillo condicionan el perfil. ¿Qué relación estructura-actividad es la correcta?",
    options: [
      { text: "Dos carbonos lineales entre el N del núcleo y la amina maximizan el bloqueo D₂, con el halógeno en posición 4." },
      { text: "Unos tres carbonos entre el N del núcleo y la amina son propios de muchos neurolépticos; con halógeno en posición 2." },
      { text: "Cuaternizar la amina terminal potencia el bloqueo D₂ central, pues la carga permanente fija la molécula al receptor." },
      { text: "Cuatro carbonos entre el N del núcleo y la amina refuerzan la actividad, con el halógeno en el anillo opuesto." },
    ],
    correctIndex: 1,
    explanation: "Una cadena de aproximadamente tres átomos de carbono entre el nitrógeno del núcleo y la amina terminal es característica de numerosos neurolépticos fenotiazínicos. A ello se suma un sustituyente atractor de electrones, como cloro o trifluorometilo, en la posición 2 del tricíclico (la de la clorpromazina), que suele aumentar la actividad en la serie. La relación con la actividad antihistamínica es una tendencia, no una regla universal.\n\nDescartamos la A: La cadena característica de los neurolépticos de la serie tiene unos tres carbonos, y el sustituyente atractor se sitúa en la posición 2.\nDescartamos la C: Una carga formal permanente dificulta mucho el paso de la BHE, de modo que la cuaternización perjudica la acción central.\nDescartamos la D: La cadena característica tiene unos tres carbonos, y el sustituyente atractor va en la posición 2, no en el anillo opuesto.\n\nReferencia en los apuntes: p. 8, §6.2 y figura 5."
  },
  {
    id: "t03-m2-q12",
    topicId: "tema-03",
    block: "Fenotiazinas SAR",
    badge: "Modelo 2 · P12 (Aplicar la SAR para predecir el neuroléptico más activo)",
    question: "Aplique las relaciones estructura-actividad de las fenotiazinas y el requisito de acceso al SNC. ¿Cuál de estas estructuras cabe esperar que sea el neuroléptico de acción central más activo?",
    options: [
      { text: "Estructura A", smiles: "CN(C)CCCN1c2ccccc2Sc2ccccc21", revealedName: "Promazina (tres carbonos, sin atractor en C-2)" },
      { text: "Estructura B", smiles: "CC(CN1c2ccccc2Sc2ccccc21)N(C)C", revealedName: "Prometazina (dos carbonos ramificados, sin atractor)" },
      { text: "Estructura C", smiles: "C[N+](C)(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21", revealedName: "Sal de amonio cuaternario de la clorpromazina" },
      { text: "Estructura D", smiles: "CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21", revealedName: "Clorpromazina" },
    ],
    correctIndex: 3,
    explanation: "La estructura d reúne los rasgos que la serie asocia a la actividad neuroléptica: una cadena de tres carbonos entre el nitrógeno del núcleo y la amina terminal, un grupo atractor de electrones (Cl) en la posición X de la figura (C-2) y una amina terciaria sin carga permanente, capaz de alcanzar el SNC.\n\nDescartamos la A: Tiene la cadena de tres carbonos pero le falta el grupo atractor en C-2, que en la serie aumenta la actividad.\nDescartamos la B: Carece del grupo atractor y su cadena es de dos carbonos, un rasgo que en la serie se relaciona con la actividad antihistamínica.\nDescartamos la C: Conserva el triciclo clorado y los tres carbonos, pero la carga formal permanente del amonio cuaternario dificulta mucho el paso de la BHE.\n\nReferencia en los apuntes: p. 7, §6.1; p. 8, §6.2 y figura 5."
  },
  {
    id: "t03-m2-q13",
    topicId: "tema-03",
    block: "Síntesis de neurolépticos",
    badge: "Modelo 2 · P13 (Síntesis del clorprotixeno (tioxanteno))",
    question: "La síntesis del clorprotixeno parte de los reactivos mostrados y encadena cuatro transformaciones para construir el tioxanteno y su cadena lateral. ¿Qué secuencia y conclusión estereoquímica son correctas?",
    questionStructures: [{ name: "Ácido 2-bromobenzoico", smiles: "OC(=O)c1ccccc1Br" }, { name: "4-Clorotiofenol", smiles: "Sc1ccc(Cl)cc1" }, { name: "Clorprotixeno (geometría sin asignar)", smiles: "CN(C)CCC=C1c2ccccc2Sc2ccc(Cl)cc21" }],
    options: [
      { text: "Acilación de Friedel-Crafts, luego SNAr para unir los anillos, adición de Grignard y deshidratación; el isómero E resulta ser el más activo y estable." },
      { text: "SNAr que une los dos anillos, oxidación del puente a sulfóxido, condensación aldólica y deshidratación; el isómero E resulta el más activo." },
      { text: "SNAr para unir los anillos, acilación de Friedel-Crafts, adición de Grignard al carbonilo y deshidratación al alqueno; el isómero Z es el más activo." },
      { text: "Sustitución radicalaria para cerrar el tricíclico, acilación de Friedel-Crafts, reducción del carbonilo y eliminación; el isómero E es el más activo." },
    ],
    correctIndex: 2,
    explanation: "La secuencia une primero los dos anillos por sustitución nucleófila aromática (Cu/K₂CO₃), cierra el sistema central por acilación intramolecular de Friedel-Crafts en medio ácido hasta la 2-clorotioxantona, añade un reactivo de Grignard al carbonilo y termina con una deshidratación (Ac₂O) que forma el doble enlace. El producto es una mezcla de isómeros geométricos en la que se destaca como activo el (Z)-clorprotixeno.\n\nDescartamos la A: Invierte el orden de la SNAr y la acilación de Friedel-Crafts y atribuye la actividad al isómero E, cuando el activo es el Z.\nDescartamos la B: La secuencia no incluye oxidación a sulfóxido ni condensación aldólica, y el isómero activo es el Z.\nDescartamos la D: El triciclo no se cierra por vía radicalaria ni se reduce el carbonilo; sobre él actúa el Grignard, y el isómero activo es el Z.\n\nReferencia en los apuntes: p. 8, §6.3 y p. 9, figura 6."
  },
  {
    id: "t03-m2-q14",
    topicId: "tema-03",
    block: "Síntesis de neurolépticos",
    badge: "Modelo 2 · P14 (Fragmento nucleófilo del haloperidol)",
    question: "En la síntesis del haloperidol, la 4-cloro-4'-fluorobutirofenona N-alquila a un fragmento piperidínico. Señale el nucleófilo que incorpora el farmacóforo 4-aril-4-piperidinol.",
    questionStructures: [{ name: "4-cloro-4'-fluorobutirofenona", smiles: "O=C(CCCCl)c1ccc(F)cc1" }],
    options: [
      { text: "Estructura A", smiles: "Clc1ccc(C2=CCNCC2)cc1", revealedName: "4-(4-clorofenil)-1,2,3,6-tetrahidropiridina" },
      { text: "Estructura B", smiles: "OC1(c2ccc(Cl)cc2)CCNCC1", revealedName: "4-(4-clorofenil)piperidin-4-ol" },
      { text: "Estructura C", smiles: "C=C(C)c1ccc(Cl)cc1", revealedName: "alfa-metil-p-cloroestireno" },
      { text: "Estructura D", smiles: "OC1(c2ccc(Cl)cc2)CCCNC1", revealedName: "3-(4-clorofenil)piperidin-3-ol" },
    ],
    correctIndex: 1,
    explanation: "En la retrosíntesis del haloperidol desconectamos el enlace C–N: el haluro de la butirofenona es el electrófilo y una piperidina secundaria, el nucleófilo. Esa piperidina es el alcohol piperidínico que se forma por adición de un Grignard a la piperidona: un nitrógeno N-H y, en C-4, el arilo y el hidroxilo que conserva el haloperidol.\n\nDescartamos la A: Es una tetrahidropiridina, con un doble enlace en el anillo y sin el hidroxilo en C-4 que lleva el haloperidol.\nDescartamos la C: Es un alqueno sin nitrógeno, de modo que no puede actuar como la amina nucleófila de la SN2.\nDescartamos la D: Lleva el arilo y el hidroxilo en C-3, mientras que en el haloperidol ambos están sobre C-4 de la piperidina.\n\nReferencia en los apuntes: p. 9, §6.4 y p. 11, §7.1."
  },
  {
    id: "t03-m2-q15",
    topicId: "tema-03",
    block: "Profármacos",
    badge: "Modelo 2 · P15 (Retención en el SNC por carga)",
    question: "Una estrategia de profármaco para el SNC parte de un precursor lipófilo, como el del esquema, que sufre una oxidación una vez en el cerebro. ¿En qué se basa la retención local del fármaco?",
    imagePath: "tests/tema-03/argon1_P13_alumno.png",
    options: [
      { text: "El precursor lipófilo cruza la BHE y se oxida en el SNC a una especie cargada e hidrófila, cuya carga dificulta su salida." },
      { text: "El precursor se reduce en el SNC a una especie neutra y más lipófila, que se acumula en las membranas de las neuronas estriatales." },
      { text: "El precursor se une de forma covalente a la albúmina cerebral, y el complejo resultante es demasiado grande para salir de la BHE." },
      { text: "El precursor polimeriza en el estriado y forma una matriz de depósito que libera el fármaco activo de forma lenta y continua." },
    ],
    correctIndex: 0,
    explanation: "Partimos de un precursor más lipófilo, capaz de alcanzar el SNC. Una vez allí se oxida a una especie cargada e hidrófila, y es esa carga la que dificulta su salida a través de las membranas y favorece la retención local. La utilidad depende de que la conversión sea selectiva y de que el compuesto inicial tenga propiedades de transporte adecuadas.\n\nDescartamos la B: Una especie neutra y más lipófila saldría con más facilidad; la retención exige una especie cargada e hidrófila.\nDescartamos la C: La retención se debe a la carga que adquiere la molécula tras oxidarse, no a una unión covalente a proteínas.\nDescartamos la D: No hay polimerización: la estrategia se basa en la oxidación a una especie cargada que queda retenida.\n\nReferencia en los apuntes: p. 6, §4.2."
  },
];

// ==========================================================================
// MODELO 3: Examen consolidado 3 · Modelo 3 con preguntas del modelo Argón 3
// 15 preguntas · Clave: D, B, C, A, B, C, A, A, D, B, C, D, C, A, B
// ==========================================================================
export const TEMA3_MODELO_3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t03-m3-q01",
    topicId: "tema-03",
    block: "Bio/Metab · Estereoquímica",
    badge: "Modelo 3 · P1 (Identificación de L-dopa (S))",
    question: "Entre las cuatro estructuras siguientes, señale la que corresponde a la levodopa (L-dopa), el profármaco de la dopamina que se transporta al SNC y allí se descarboxila a dopamina.",
    options: [
      { text: "Estructura A", smiles: "N[C@H](Cc1ccc(O)c(O)c1)C(=O)O", revealedName: "D-dopa (R)" },
      { text: "Estructura B", smiles: "N[C@@H](Cc1ccc(O)cc1)C(=O)O", revealedName: "L-tirosina (S)" },
      { text: "Estructura C", smiles: "C[C@](N)(Cc1ccc(O)c(O)c1)C(=O)O", revealedName: "alfa-metildopa (S)" },
      { text: "Estructura D", smiles: "N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O", revealedName: "L-dopa (S)" },
    ],
    correctIndex: 3,
    explanation: "La L-dopa es el ácido (S)-2-amino-3-(3,4-dihidroxifenil)propanoico. Si observamos la molécula reconocemos el catecol, una cadena con un centro quiral de configuración S y la función aminoácido que la hace sustrato del transportador de aminoácidos neutros. La opción d es la única que reúne el catecol junto a ese carbono S.\n\nDescartamos la A: La opción a es la D-dopa, el enantiómero R: ni el transportador ni la descarboxilasa lo reconocen, de modo que se elimina sin efecto.\nDescartamos la B: La opción b es la L-tirosina, a la que le falta el segundo hidroxilo fenólico; no es un catecol y actúa como precursora de dopamina, no como su profármaco.\nDescartamos la C: La opción c es la alfa-metildopa, con un metilo en el carbono alfa; es un antihipertensivo y no el profármaco de dopamina que buscamos.\n\nReferencia en los apuntes: p. 5-6, §3.3 y figura 2."
  },
  {
    id: "t03-m3-q02",
    topicId: "tema-03",
    block: "Bio/Metab · Estereoquímica",
    badge: "Modelo 3 · P2 (Conformación frente a configuración)",
    question: "Conformación y configuración son conceptos distintos. ¿Qué enunciado aplica correctamente esa diferencia a la cadena de la dopamina y al centro quiral de la L-DOPA?",
    options: [
      { text: "Cambiar la conformación de la dopamina obliga a romper y rehacer enlaces, igual que invertir la configuración del centro estereogénico de la L-DOPA." },
      { text: "La dopamina adopta su forma antiperiplanar girando enlaces sencillos, pero invertir la configuración R/S de la L-DOPA exige romper enlaces." },
      { text: "La disposición antiperiplanar de la dopamina sería una configuración fija, mientras que el par R/S de la L-DOPA sería de tipo conformacional." },
      { text: "Ambas se interconvierten por rotación de enlaces sencillos, de modo que invertir el centro quiral de la L-DOPA tampoco exige romper enlaces." },
    ],
    correctIndex: 1,
    explanation: "La tabla del §3.3 separa los dos conceptos. La conformación cambia por giro alrededor de enlaces sencillos y no requiere romperlos: así la cadena flexible de la dopamina adopta la disposición antiperiplanar. La configuración, en cambio, es fija y para invertir un centro estereogénico, como el de la L-DOPA, hay que romper y volver a formar enlaces. Son planos distintos y no deben confundirse.\n\nDescartamos la A: Girar la cadena de la dopamina no rompe enlaces; solo la inversión del centro quiral los rompe, así que no son equiparables.\nDescartamos la C: Está intercambiado: lo antiperiplanar es conformación y el par R/S es configuración, justo al revés de lo que afirma.\nDescartamos la D: Solo la conformación cambia por rotación; invertir el centro estereogénico de la L-DOPA exige romper y rehacer enlaces.\n\nReferencia en los apuntes: p. 6, §3.3."
  },
  {
    id: "t03-m3-q03",
    topicId: "tema-03",
    block: "Bio/Metab · Biosíntesis",
    badge: "Modelo 3 · P3 (Ruta L-tirosina a dopamina)",
    question: "En la ruta neuronal, la dopamina se genera a partir de la L-tirosina en dos pasos enzimáticos. ¿Qué secuencia describe correctamente esa biosíntesis?",
    options: [
      { text: "La tirosina hidroxilasa descarboxila la L-tirosina hasta L-DOPA y la COMT la convierte después en dopamina liberando una molécula de CO₂." },
      { text: "La L-tirosina se descarboxila primero a dopamina y luego la tirosina hidroxilasa le añade el segundo hidroxilo del catecol." },
      { text: "La tirosina hidroxilasa pasa la L-tirosina a L-DOPA con O₂ y la descarboxilasa de aminoácidos aromáticos da dopamina y CO₂." },
      { text: "La MAO-B oxida la L-tirosina a L-DOPA y una descarboxilasa la transforma a continuación en dopamina sin pérdida de carbono." },
    ],
    correctIndex: 2,
    explanation: "El §2.1 fija la ruta: la L-tirosina se hidroxila a L-DOPA por la tirosina hidroxilasa con O₂, y luego la descarboxilasa de aminoácidos aromáticos retira el grupo carboxilo y libera CO₂ para dar dopamina. Vemos que el primer paso instala el segundo hidroxilo fenólico y el segundo elimina el carboxilato.\n\nDescartamos la A: La tirosina hidroxilasa hidroxila, no descarboxila, y la COMT metila catecoles; no interviene en esta ruta de síntesis.\nDescartamos la B: El orden está invertido: primero se hidroxila a L-DOPA y después se descarboxila; la L-tirosina no se descarboxila a dopamina.\nDescartamos la D: La MAO-B degrada catecolaminas, no hidroxila la tirosina, y la descarboxilación sí libera CO₂.\n\nReferencia en los apuntes: p. 3, §2.1."
  },
  {
    id: "t03-m3-q04",
    topicId: "tema-03",
    block: "Bio/Metab · Profármacos",
    badge: "Modelo 3 · P4 (Decanoato de flufenazina como profármaco de depósito)",
    question: "La flufenazina se administra también como decanoato en preparados de liberación prolongada. ¿Qué describe correctamente el diseño de este profármaco de depósito?",
    options: [
      { text: "Se esterifica el hidroxilo terminal con ácido decanoico; la mayor lipofilia retiene el depósito y la hidrólisis libera flufenazina." },
      { text: "Se acila la amina terciaria con ácido decanoico; la carga que adquiere fija el fármaco al músculo y prolonga así su acción central." },
      { text: "Se une el ácido decanoico al anillo de fenotiazina; el éster resiste las esterasas y bloquea por sí mismo el receptor dopaminérgico D₂." },
      { text: "Se esterifica el hidroxilo terminal con ácido decanoico; la mayor polaridad acelera la absorción y el éster se excreta sin hidrolizar." },
    ],
    correctIndex: 0,
    explanation: "La flufenazina lleva un hidroxilo terminal en la cadena de la piperazina, que esterificamos con ácido decanoico. El éster de cadena larga es mucho más lipófilo, permanece en el depósito oleoso del punto de inyección y las esterasas lo hidrolizan de forma gradual, de modo que liberan flufenazina activa durante un periodo prolongado.\n\nDescartamos la B: El ácido decanoico se une como éster al hidroxilo terminal, no a la amina terciaria, y el depósito se basa en la lipofilia, no en una carga.\nDescartamos la C: El éster se forma sobre el hidroxilo de la cadena lateral; además, para actuar debe hidrolizarse y regenerar la flufenazina.\nDescartamos la D: La cadena decanoílo aumenta la lipofilia, no la polaridad, y el éster tiene que hidrolizarse para liberar el fármaco activo.\n\nReferencia en los apuntes: p. 6, §4.2."
  },
  {
    id: "t03-m3-q05",
    topicId: "tema-03",
    block: "Síntesis · Trifluperidol",
    badge: "Modelo 3 · P5 (Fragmento A del trifluperidol)",
    question: "El fragmento A del trifluperidol se prepara acilando fluorobenceno con γ-butirolactona y AlCl₃ y tratando después el alcohol con SOCl₂. Señale la estructura del fragmento A.",
    options: [
      { text: "Estructura A", smiles: "O=C(CCCO)c1ccc(F)cc1", revealedName: "4-hidroxi-1-(4-fluorofenil)butan-1-ona (precursor)" },
      { text: "Estructura B", smiles: "O=C(CCCCl)c1ccc(F)cc1", revealedName: "4-cloro-1-(4-fluorofenil)butan-1-ona (fragmento A)" },
      { text: "Estructura C", smiles: "O=C(CCCCl)c1ccccc1F", revealedName: "isómero orto-fluoro" },
      { text: "Estructura D", smiles: "ClC(=O)CCCc1ccc(F)cc1", revealedName: "cloruro de 4-(4-fluorofenil)butanoílo" },
    ],
    correctIndex: 1,
    explanation: "La acilación de Friedel-Crafts con γ-butirolactona abre el anillo y deja la 4-hidroxi-1-(4-fluorofenil)butan-1-ona; el SOCl₂ transforma ese alcohol primario en cloruro de alquilo. El fragmento A es, por tanto, la 4-cloro-1-(4-fluorofenil)butan-1-ona, con el flúor en para y el cloruro primario en el extremo de la cadena. La opción b reúne ambos rasgos.\n\nDescartamos la A: La opción a es el alcohol precursor, anterior al SOCl₂; todavía no se ha formado el cloruro de alquilo que necesita la SN2.\nDescartamos la C: La opción c coloca el flúor en orto; la acilación del fluorobenceno da el producto para, no el orto.\nDescartamos la D: La opción d es un cloruro de ácido: el cloro está sobre el carbonilo, no en el extremo de la cadena como exige el fragmento A.\n\nReferencia en los apuntes: p. 11, §7.1–7.2 y p. 12, figura 8."
  },
  {
    id: "t03-m3-q06",
    topicId: "tema-03",
    block: "SAR · Butirofenonas",
    badge: "Modelo 3 · P6 (Pimozida: el carbonilo no es imprescindible)",
    question: "Al comparar el haloperidol con la pimozida, una difenilbutilpiperidina, ¿qué conclusión estructura-actividad se extrae sobre el carbonilo de la cadena butirofenónica?",
    questionStructures: [{ name: "Haloperidol", smiles: "O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1" }, { name: "Pimozida", smiles: "O=c1[nH]c2ccccc2n1C1CCN(CCCC(c2ccc(F)cc2)c2ccc(F)cc2)CC1" }],
    options: [
      { text: "El carbonilo es imprescindible para la unión, y por eso la pimozida se comporta como agonista D₂ en lugar de antagonista." },
      { text: "La pimozida conserva el carbonilo y debe su actividad a sustituir la amina básica por un grupo amida sin carga." },
      { text: "El carbonilo de la butirofenona no es imprescindible: la pimozida carece de él y conserva la actividad antipsicótica." },
      { text: "Al carecer del carbonilo, la pimozida pierde la actividad antipsicótica y se emplea solo como antiemético periférico." },
    ],
    correctIndex: 2,
    explanation: "El haloperidol combina el carbonilo, la cadena de tres carbonos y la amina básica de la piperidina. La pimozida, una difenilbutilpiperidina, sustituye el carbonilo por un carbono que soporta dos anillos de 4-fluorofenilo y mantiene la actividad antipsicótica, lo que muestra que el carbonilo de la butirofenona no es imprescindible.\n\nDescartamos la A: La pimozida carece de carbonilo y sigue siendo antagonista D₂ con actividad antipsicótica.\nDescartamos la B: La pimozida no tiene el carbonilo y conserva la amina básica de la piperidina.\nDescartamos la D: La pimozida mantiene la actividad antipsicótica pese a no tener el carbonilo.\n\nReferencia en los apuntes: p. 10, §6.4."
  },
  {
    id: "t03-m3-q07",
    topicId: "tema-03",
    block: "Síntesis · Trifluperidol",
    badge: "Modelo 3 · P7 (Adición de Grignard a la N-bencil-4-piperidona)",
    question: "En la preparación del fragmento piperidínico del trifluperidol se añade bromuro de 3-(trifluorometil)fenilmagnesio a la N-bencil-4-piperidona en condiciones anhidras. Señale el producto de esa etapa.",
    questionStructures: [{ name: "N-Bencil-4-piperidona", smiles: "O=C1CCN(Cc2ccccc2)CC1" }],
    options: [
      { text: "Estructura A", smiles: "OC1(c2cccc(C(F)(F)F)c2)CCN(Cc2ccccc2)CC1", revealedName: "1-Bencil-4-[3-(trifluorometil)fenil]piperidin-4-ol" },
      { text: "Estructura B", smiles: "OC1(c2cccc(C(F)(F)F)c2)CCNCC1", revealedName: "4-[3-(Trifluorometil)fenil]piperidin-4-ol (tras H₂/Pd)" },
      { text: "Estructura C", smiles: "O=C1CCN(Cc2ccccc2)CC1", revealedName: "N-Bencil-4-piperidona sin reaccionar" },
      { text: "Estructura D", smiles: "FC(F)(F)c1cccc(C2=CCN(Cc3ccccc3)CC2)c1", revealedName: "Tetrahidropiridina deshidratada" },
    ],
    correctIndex: 0,
    explanation: "El carbono unido al magnesio actúa como nucleófilo y ataca el carbono electrofílico del carbonilo de la piperidona; tras el tratamiento acuoso queda un alcohol terciario en C-4 que lleva el anillo con CF₃ en meta. El nitrógeno sigue protegido con el bencilo, que se eliminará en la etapa siguiente con H₂/Pd.\n\nDescartamos la B: Es el fragmento B ya desprotegido; la eliminación del bencilo con H₂/Pd es una etapa posterior a la adición del Grignard.\nDescartamos la C: Es la cetona de partida; el Grignard la transforma en un alcohol terciario.\nDescartamos la D: Es un alqueno que resultaría de deshidratar el alcohol; la adición de Grignard al carbonilo da el alcohol, que el haloperidol y el trifluperidol conservan.\n\nReferencia en los apuntes: p. 11, §7.1 y p. 12, figura 8."
  },
  {
    id: "t03-m3-q08",
    topicId: "tema-03",
    block: "Síntesis · Butirofenonas",
    badge: "Modelo 3 · P8 (Obtención de la 4-cloro-4'-fluorobutirofenona por Friedel-Crafts)",
    question: "La 4-cloro-4'-fluorobutirofenona es el agente alquilante común de las butirofenonas neurolépticas. ¿Cómo se obtiene en una sola etapa y qué explica su regioselectividad?",
    questionStructures: [{ name: "Fluorobenceno", smiles: "Fc1ccccc1" }, { name: "Cloruro de 4-clorobutanoílo", smiles: "O=C(Cl)CCCCl" }],
    options: [
      { text: "Acilación de Friedel-Crafts entre fluorobenceno y cloruro de 4-clorobutanoílo con AlCl₃, dirigida a para por impedimento en orto." },
      { text: "Alquilación de Friedel-Crafts entre 4-fluorofenil-litio y 1,4-diclorobutano catalizada por cloruro de cobre en THF anhidro." },
      { text: "Condensación de Claisen entre 4-fluorobenzoato de etilo y cloroacetato de etilo con etóxido sódico y una descarboxilación térmica." },
      { text: "Reacción de Darzens entre 4-fluorobenzaldehído y 1-cloro-3-bromopropano en medio básico, con un éster glicídico intermedio." },
    ],
    correctIndex: 0,
    explanation: "Es una acilación de Friedel-Crafts: el AlCl₃ genera el ion acilio del cloruro de 4-clorobutanoílo, que ataca al fluorobenceno. El flúor es desactivante débil por inducción, pero orientador orto/para por donación de su par libre; como la posición orto está impedida por el voluminoso complejo acilio–AlCl₃, el producto es casi exclusivamente el isómero para, la 4-cloro-4'-fluorobutirofenona.\n\nDescartamos la B: El cloruro de acilo se acila directamente; no hace falta generar un organolítico pirofórico como el 4-fluorofenil-litio.\nDescartamos la C: La condensación de Claisen daría un β-cetoéster que exigiría varias etapas redox más para llegar a la butirofenona.\nDescartamos la D: La reacción de Darzens conduce a ésteres glicídicos (epóxidos α,β), incompatibles con la cetona alifática buscada.\n\nReferencia en los apuntes: p. 11, §7.1."
  },
  {
    id: "t03-m3-q09",
    topicId: "tema-03",
    block: "Bio/Metab · Profármacos",
    badge: "Modelo 3 · P9 (Doble profármaco de Bodor: retención por inversión de polaridad)",
    question: "El sistema de transporte al SNC de Bodor aplicado a la dopamina usa un doble profármaco con dos ésteres piválicos sobre el catecol y una 1,4-dihidropiridina. ¿En qué principio se basa la retención selectiva de la forma intermedia en el cerebro?",
    questionStructures: [{ name: "Doble profármaco (dihidropiridina + dipivalato)", smiles: "CN1C=CCC(C(=O)NCCc2ccc(OC(=O)C(C)(C)C)c(OC(=O)C(C)(C)C)c2)=C1" }, { name: "Sal de piridinio retenida", smiles: "C[n+]1cccc(C(=O)NCCc2ccc(O)c(O)c2)c1" }],
    options: [
      { text: "La unión covalente por puentes disulfuro a las proteínas de membrana del plexo coroideo tras hidrolizarse los pivalatos." },
      { text: "La protonación de la dihidropiridina al pH neuronal, que la precipita en forma de microcristales en el líquido cefalorraquídeo." },
      { text: "La polimerización del derivado lipófilo por radicales libres mitocondriales, que bloquea su difusión de vuelta al plasma." },
      { text: "La oxidación por NAD(P)⁺ cerebral a un catión piridinio permanente, cuya carga impide la salida por inversión de polaridad." },
    ],
    correctIndex: 3,
    explanation: "El doble profármaco entra en el SNC como una molécula neutra y lipófila. Allí las oxidorreductasas dependientes de NAD(P)⁺ oxidan la 1,4-dihidropiridina a un catión 1-metilpiridinio permanente: la molécula pasa de neutra a cargada e hidrófila (inversión de polaridad) y esa carga le impide atravesar de nuevo las membranas, de modo que queda retenida. La hidrólisis posterior de los ésteres piválicos y de la amida libera dopamina en el tejido.\n\nDescartamos la A: La retención no se debe a enlaces covalentes con proteínas, sino a la insolubilidad en lípidos de la forma cargada.\nDescartamos la B: La 1,4-dihidropiridina no se protona de forma reversible para precipitar: se oxida por vía enzimática.\nDescartamos la C: El sistema es monomérico y soluble; no polimeriza ni forma depósitos de radicales libres.\n\nReferencia en los apuntes: p. 6, §4.2."
  },
  {
    id: "t03-m3-q10",
    topicId: "tema-03",
    block: "SAR · Fenotiazinas",
    badge: "Modelo 3 · P10 (Cuaternización del nitrógeno básico)",
    question: "Sobre una fenotiazina neuroléptica activa se cuaterniza con yoduro de metilo el nitrógeno básico terminal de la cadena lateral. ¿Qué consecuencia tiene esta modificación y por qué?",
    questionStructures: [{ name: "Estructura general de una fenotiazina neuroléptica", smiles: "CN(C)CCCN1c2ccccc2Sc2ccccc21" }],
    options: [
      { text: "La cuaternización refuerza el puente salino con el receptor D2 y, por tanto, potencia la acción antipsicótica central." },
      { text: "La carga positiva permanente dificulta mucho el paso de la barrera hematoencefálica y compromete la acción central." },
      { text: "El nitrógeno cargado mejora el paso pasivo al SNC, de modo que la acción central resulta más rápida e intensa." },
      { text: "La pérdida del par libre bloquea el metabolismo hepático y alarga mucho la semivida sin modificar la diana D2." },
    ],
    correctIndex: 1,
    explanation: "Un antipsicótico de acción central necesita una estructura capaz de alcanzar el SNC. Al cuaternizar el nitrógeno terminal con yoduro de metilo creamos una carga formal permanente, que suele dificultar mucho el paso pasivo de la BHE y, con ello, compromete la acción antipsicótica central.\n\nDescartamos la A: No potencia nada: la carga fija dificulta el paso por la barrera, y sin llegar al SNC no hay acción antipsicótica central.\nDescartamos la C: Es al contrario: una carga permanente dificulta el paso pasivo por la barrera en lugar de facilitarlo, y no acelera la acción.\nDescartamos la D: El problema no es metabólico ni de semivida, sino que el catión permanente no alcanza el cerebro.\n\nReferencia en los apuntes: p. 7, §6.1."
  },
  {
    id: "t03-m3-q11",
    topicId: "tema-03",
    block: "Síntesis · Trifluperidol",
    badge: "Modelo 3 · P11 (Papel de H₂/Pd en la desprotección)",
    question: "En la síntesis del trifluperidol, ¿qué función cumple la etapa de H₂/Pd aplicada sobre el fragmento B?",
    questionStructures: [{ name: "Trifluperidol", smiles: "O=C(CCCN1CCC(O)(c2cccc(C(F)(F)F)c2)CC1)c1ccc(F)cc1" }, { name: "Fragmento B", smiles: "OC1(c2cccc(C(F)(F)F)c2)CCNCC1" }],
    options: [
      { text: "Hidrogena el anillo aromático que soporta el trifluorometilo y lo convierte en un ciclohexano saturado antes del acoplamiento final." },
      { text: "Reduce el grupo hidroxilo terciario de la piperidina y lo transforma en un metileno justo antes de la N-alquilación final del esquema." },
      { text: "Retira el grupo bencilo del nitrógeno y deja libre el NH secundario de la piperidina, que queda listo para la etapa final." },
      { text: "Satura el carbonilo de la cadena de butirofenona y lo convierte en el alcohol secundario correspondiente dentro de la molécula." },
    ],
    correctIndex: 2,
    explanation: "En la figura 8, el H₂/Pd realiza la desprotección bencílica: retira el bencilo del nitrógeno y deja libre el NH de la piperidina. Ese nitrógeno secundario es el nucleófilo que luego desplaza el cloruro primario del fragmento A en la SN2 final que une las dos piezas.\n\nDescartamos la A: El H₂/Pd no hidrogena el anillo aromático del fragmento, sino que corta el enlace bencilo-nitrógeno.\nDescartamos la B: El hidroxilo terciario permanece; lo que se elimina es el grupo bencilo que protegía el nitrógeno.\nDescartamos la D: El carbonilo de la butirofenona no se reduce aquí: la etapa libera el NH para el acoplamiento SN2.\n\nReferencia en los apuntes: p. 11, §7.2 y p. 12, figura 8."
  },
  {
    id: "t03-m3-q12",
    topicId: "tema-03",
    block: "SAR · Fenotiazinas",
    badge: "Modelo 3 · P12 (Posición del cloro en el núcleo de fenotiazina)",
    question: "En el núcleo de fenotiazina, un sustituyente atractor como el cloro en la posición apropiada aumenta la actividad de la serie. Señale la 2-clorofenotiazina.",
    options: [
      { text: "Estructura A", smiles: "Clc1cccc(Nc2ccccc2)c1", revealedName: "3-Clorodifenilamina" },
      { text: "Estructura B", smiles: "c1ccc2c(c1)Nc1ccccc1S2", revealedName: "Fenotiazina" },
      { text: "Estructura C", smiles: "Clc1ccc2Nc3ccccc3Sc2c1", revealedName: "3-Clorofenotiazina" },
      { text: "Estructura D", smiles: "Clc1ccc2Sc3ccccc3Nc2c1", revealedName: "2-Clorofenotiazina" },
    ],
    correctIndex: 3,
    explanation: "La fenotiazina es el triciclo con azufre y nitrógeno; la figura 5 marca la posición 2 (la X del esquema) como el lugar donde un grupo atractor de electrones, el cloro, refuerza la actividad neuroléptica. La opción d sitúa el cloro en esa posición 2 respecto al nitrógeno N-10 del anillo.\n\nDescartamos la A: La opción a es la 3-clorodifenilamina, el sustrato abierto previo; todavía no tiene cerrado el anillo central de fenotiazina.\nDescartamos la B: La opción b es la fenotiazina sin sustituir: le falta el cloro en la posición 2 que marca la figura 5.\nDescartamos la C: La opción c es el regioisómero con el cloro en la posición 3, no en la posición 2 que optimiza la actividad.\n\nReferencia en los apuntes: p. 8, §6.2 y figura 5."
  },
  {
    id: "t03-m3-q13",
    topicId: "tema-03",
    block: "SAR · Restricción conformacional",
    badge: "Modelo 3 · P13 (Rigidez y pérdida de actividad)",
    question: "El derivado tetracíclico adjunto cierra la cadena trimetilénica sobre un anillo bencénico del núcleo. Conserva el triciclo N–S, la amina terciaria y los tres carbonos, pero carece de actividad neuroléptica. ¿Por qué?",
    questionStructures: [{ name: "Fenotiazina rígida (estructura 1)", smiles: "CN(C)C1CCN2c3ccccc3Sc3cccc1c32" }],
    options: [
      { text: "El anillo extra retira densidad del triciclo y rebaja la basicidad de la amina por debajo del umbral de unión a D2." },
      { text: "El cierre adicional cuaterniza el nitrógeno terminal y su carga fija le impide cruzar la barrera hematoencefálica." },
      { text: "La fusión rígida congela la molécula y la amina no logra la geometría antiperiplanar de la dopamina activa." },
      { text: "La rigidez acerca en exceso los dos nitrógenos y crea un impedimento que bloquea el metabolismo oxidativo hepático." },
    ],
    correctIndex: 2,
    explanation: "Aunque la molécula reúne los requisitos bidimensionales del farmacóforo, el anillo fusionado congela la cadena e impide que adopte la conformación extendida y activa. Como muestra la figura 9, si la cabeza amínica no se superpone a la disposición activa de la dopamina, no encaja en el receptor D2 y la actividad se pierde.\n\nDescartamos la A: La basicidad apenas cambia y la amina sigue siendo terciaria y protonable; el problema es geométrico, no electrónico.\nDescartamos la B: El nitrógeno sigue siendo una amina terciaria neutra protonable, no un amonio cuaternario, así que sí podría cruzar la barrera.\nDescartamos la D: Ni la distancia entre los nitrógenos es la cuestión ni hay bloqueo metabólico: lo que falla es la superposición conformacional con el D2.\n\nReferencia en los apuntes: p. 12-13, §7.3 y figura 9."
  },
  {
    id: "t03-m3-q14",
    topicId: "tema-03",
    block: "Síntesis · Trifluperidol",
    badge: "Modelo 3 · P14 (Acoplamiento del trifluperidol)",
    question: "El trifluperidol se obtiene uniendo una 4-aril-piperidina sustituida con la cadena de butirofenona. ¿Qué fragmentos y qué reacción forman el enlace C–N final de la molécula?",
    options: [
      { text: "El 4-[3-(trifluorometil)fenil]piperidin-4-ol y la butirofenona con cloro terminal (fragmento A) se unen por una N-alquilación SN2." },
      { text: "El 4-(4-clorofenil)piperidin-4-ol y la butirofenona con cloro terminal (fragmento A) se acoplan por adición de Grignard al carbonilo." },
      { text: "El 4-[3-(trifluorometil)fenil]piperidin-4-ol y el cloruro de butirilo reaccionan por una acilación de Friedel-Crafts en frío." },
      { text: "La 4-aril-1,2,3,6-tetrahidropiridina y el bromobenceno fluorado se combinan por una sustitución nucleófila aromática directa." },
    ],
    correctIndex: 0,
    explanation: "Desconectamos el enlace entre el nitrógeno heterocíclico y la cadena butirofenónica: la piperidina secundaria, 4-[3-(trifluorometil)fenil]piperidin-4-ol, actúa como nucleófilo y desplaza el cloro primario de la 4-cloro-4'-fluorobutirofenona en una SN2. El CF₃ en meta es lo que distingue el trifluperidol del haloperidol.\n\nDescartamos la B: El arilo es erróneo: el 4-clorofenilo corresponde al haloperidol, y la unión es una SN2 sobre el cloruro, no una adición de Grignard.\nDescartamos la C: El enlace C–N no se forma por Friedel-Crafts; esa acilación prepara la cetona del fragmento, no une las dos piezas.\nDescartamos la D: No hay sustitución nucleófila aromática: la unión es una N-alquilación alifática SN2 sobre un cloruro primario.\n\nReferencia en los apuntes: p. 11, §7.2 y p. 12, figura 8."
  },
  {
    id: "t03-m3-q15",
    topicId: "tema-03",
    block: "SAR · Butirofenonas",
    badge: "Modelo 3 · P15 (Identificación del droperidol)",
    question: "El droperidol es una butirofenona con un heterociclo sustituido y acción antiemética. Porta una 1,2,3,6-tetrahidropiridina que lleva en su carbono 4 una bencimidazolinona. Señale su estructura.",
    options: [
      { text: "Estructura A", smiles: "O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1", revealedName: "Haloperidol" },
      { text: "Estructura B", smiles: "O=C(CCCN1CC=C(n2c(=O)[nH]c3ccccc32)CC1)c1ccc(F)cc1", revealedName: "Droperidol" },
      { text: "Estructura C", smiles: "O=C(CCCN1CCC(n2c(=O)[nH]c3ccccc32)CC1)c1ccc(F)cc1", revealedName: "Benperidol" },
      { text: "Estructura D", smiles: "O=C(CCCN1CC=C(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1", revealedName: "Análogo tetrahidropiridínico 4-(p-clorofenilo)" },
    ],
    correctIndex: 1,
    explanation: "El droperidol combina la p-fluorobutirofenona con una 1,2,3,6-tetrahidropiridina, que lleva un doble enlace en el anillo, y en su carbono 4 porta una 2-oxobencimidazolina unida por el nitrógeno. La opción b muestra ese anillo insaturado junto a la bencimidazolinona, los dos rasgos que lo separan del resto.\n\nDescartamos la A: La opción a es el haloperidol: piperidina saturada con 4-(p-clorofenilo) y 4-OH, sin la tetrahidropiridina ni la bencimidazolinona.\nDescartamos la C: La opción c lleva la bencimidazolinona pero sobre una piperidina saturada, sin el doble enlace del anillo del droperidol.\nDescartamos la D: La opción d tiene la tetrahidropiridina pero con un 4-(p-clorofenilo) en lugar de la bencimidazolinona característica.\n\nReferencia en los apuntes: p. 10, §6.4."
  },
];
