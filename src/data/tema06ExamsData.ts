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
    block: "Bioquímica · Farmacogenética",
    badge: "Modelo 1 · P1 · Bioquímica · Farmacogenética",
    question: "¿Qué riesgo clínico presentan los pacientes clasificados como metabolizadores ultrarrápidos de la CYP2D6 al recibir codeína?",
    options: [
      { text: "Transformación masiva a morfina libre con riesgo letal de depresión respiratoria" },
      { text: "Falta total de respuesta analgésica por incapacidad para bioactivar el fármaco" },
      { text: "Precipitación tubular renal del fármaco inalterado provocando fracaso renal agudo" },
      { text: "Bloqueo masivo del canal cardiaco hERG con prolongación extrema del intervalo QT" },
    ],
    correctIndex: 0,
    explanation: "La CYP2D6 cataliza la O-desmetilación de codeína a morfina. En metabolizadores ultrarrápidos (con duplicaciones del gen CYP2D6), la tasa de conversión es tan acelerada que se alcanzan picos plasmáticos tóxicos de morfina libre tras dosis estándar, desencadenando depresión respiratoria potencialmente mortal.\n\nDescartamos la B: El fracaso terapéutico ocurre en los metabolizadores lentos (poor metabolizers), no en los ultrarrápidos.\nDescartamos la C: La codeína y la morfina son solubles a concentraciones terapéuticas y no causan cristaluria.\nDescartamos la D: La toxicidad primaria mortal por sobredosis de morfina en estos pacientes es la depresión del centro respiratorio bulbar.\n\nReferencia: Apuntes, Relaciones estructura–actividad (SAR) de la morfina."
  },
  {
    id: "t06-m1-q02",
    topicId: "tema-06",
    block: "SAR · Morfina",
    badge: "Modelo 1 · P2 · SAR · Morfina",
    question: "¿Qué efecto produce sobre la afinidad directa por el receptor opioide mu la eterificación del hidroxilo fenólico en C3 frente a la del hidroxilo alílico en C6?",
    options: [
      { text: "Eterificar C3 incrementa la afinidad; eterificar C6 la anula de forma completa" },
      { text: "Eterificar C3 destruye la afinidad directa; eterificar C6 la conserva o eleva" },
      { text: "Ambas eterificaciones anulan por completo la interacción con el receptor mu" },
      { text: "Ambas eterificaciones incrementan de modo sinérgico la afinidad por el receptor" },
    ],
    correctIndex: 1,
    explanation: "El grupo fenólico C3-OH actúa como dador de enlace de hidrógeno esencial con el receptor mu. Su eterificación en la codeína o etilmorfina abate la afinidad intrínseca directa, requiriendo bioactivación por CYP2D6. En cambio, el C6-OH alílico no forma interacciones clave; su bloqueo reduce la polaridad local y facilita la penetración tisular, aumentando la potencia unas 5 veces en la heterocodeína.\n\nDescartamos la A: El C3-OH libre es indispensable para donar un enlace de hidrógeno esencial al receptor; su bloqueo destruye la afinidad directa.\nDescartamos la C: El C6-OH no es indispensable; enmascararlo en la heterocodeína aumenta la potencia unas 5 veces.\nDescartamos la D: La metilación de C3 genera codeína, cuya afinidad directa es apenas una fracción menor que la morfina.\n\nReferencia: Apuntes, Relaciones estructura–actividad (SAR) de la morfina."
  },
  {
    id: "t06-m1-q03",
    topicId: "tema-06",
    block: "Bioquímica · Metabolismo",
    badge: "Modelo 1 · P3 · Bioquímica · Metabolismo",
    question: "¿Qué secuencia de hidrólisis enzimática transforma la heroína en metabolitos activos en el encéfalo humano?",
    options: [
      { text: "Se hidroliza primero a 3-acetilmorfina y posteriormente se metila a codeína" },
      { text: "Se desmetila primero a norheroína y se excreta directamente sin hidrolizarse" },
      { text: "Se hidroliza primero a 6-acetilmorfina (muy activa) y luego a morfina libre" },
      { text: "Sufre glucuronidación directa en C6 rindiendo un derivado completamente inactivo" },
    ],
    correctIndex: 2,
    explanation: "Las esterasas tisulares hidrolizan con gran selectividad y rapidez el éster fenólico de C3 (más lábil), rindiendo 6-acetilmorfina (6-MAM), una molécula lipófila de altísima afinidad intrínseca por MOR. Más lentamente, las esterasas hidrolizan el éster secundario de C6 liberando morfina libre para una analgesia sostenida.\n\nDescartamos la A: El éster fenólico en C3 es mucho más reactivo y se rompe primero; la 6-MAM es el intermediario real, no la codeína.\nDescartamos la B: Las esterasas plasmáticas y cerebrales hidrolizan los grupos éster con enorme rapidez antes de cualquier desalquilación.\nDescartamos la D: Para glucuronidarse se requiere un hidroxilo libre; la heroína tiene ambos bloqueados como ésteres.\n\nReferencia: Apuntes, La heroína como profármaco de penetración rápida."
  },
  {
    id: "t06-m1-q04",
    topicId: "tema-06",
    block: "SAR · Farmacóforo",
    badge: "Modelo 1 · P4 · SAR · Farmacóforo",
    question: "En el modelo farmacofórico de Beckett–Casy, ¿qué residuo aminoacídico del receptor opioide mu establece el enlace iónico determinante con el nitrógeno protonado?",
    options: [
      { text: "Un residuo neutro de serina mediante enlace covalente reversible tipo éster" },
      { text: "Un residuo aromático de triptófano mediante un apilamiento de tipo pi neutro" },
      { text: "Un residuo básico de histidina que actúa como catalizador ácido y base general" },
      { text: "Un residuo aniónico de aspartato mediante interacción de enlace electrostático" },
    ],
    correctIndex: 3,
    explanation: "A pH fisiológico (7,4), el nitrógeno terciario de los opioides se encuentra protonado en forma de catión amonio. Este catión forma un enlace electrostático o iónico fundamental con el carboxilato cargado negativamente del residuo Asp147 (Aspartato de la tercera hélice transmembrana TM3 del receptor mu).\n\nDescartamos la A: La serina catalítica es característica de colinesterasas y serín-proteasas, no del centro de fijación catiónica de receptores opioides GPCR.\nDescartamos la B: Aunque existen residuos aromáticos circundantes, la interacción primaria determinante con el nitrógeno protonable es electrostática con aspartato.\nDescartamos la C: La histidina catalítica actúa en tríadas enzimáticas, pero no es la contraparte aniónica carboxilato que ancla al catión amonio.\n\nReferencia: Apuntes, El farmacóforo opioide y el modelo de interacción con el receptor."
  },
  {
    id: "t06-m1-q05",
    topicId: "tema-06",
    block: "Síntesis · Semisíntesis",
    badge: "Modelo 1 · P5 · Síntesis · Semisíntesis",
    question: "¿Qué intermedio reactivo se genera y qué gas se desprende al tratar una amina terciaria con cloroformiato de etilo en la desmetilación de opioides?",
    options: [
      { text: "Se genera una oxima terciaria inestable desprendiendo monóxido de carbono tóxico" },
      { text: "Se forma un carbamato en el nitrógeno y se desprende cloruro de metilo gaseoso" },
      { text: "Se aísla una sal de amonio cuaternario estable sin pérdida de carbono metílico" },
      { text: "Se produce la oxidación a imina cíclica con expulsión de cianuro de hidrógeno" },
    ],
    correctIndex: 1,
    explanation: "El nitrógeno terciario ataca al carbonilo del cloroformiato de etilo rindiendo un carbamato cuaternario transitorio; el anión cloruro liberado ataca vía SN2 al grupo metilo, expulsando cloruro de metilo (CH3Cl) gaseoso y dejando un carbamato neutro sobre el nitrógeno, que se hidroliza posteriormente a amina secundaria.\n\nDescartamos la A: El reactivo es un cloroformiato formador de carbamatos, no un derivado de hidroxilamina.\nDescartamos la C: La sal cuaternaria inicial se descompone térmicamente por ataque de cloruro sobre el metilo.\nDescartamos la D: El cloroformiato no genera cianuro ni oxida la amina a imina.\n\nReferencia: Apuntes, Semisíntesis: N-desmetilación con cloroformiatos."
  },
  {
    id: "t06-m1-q06",
    topicId: "tema-06",
    block: "Bioquímica · PAMORA",
    badge: "Modelo 1 · P6 · Bioquímica · PAMORA",
    question: "¿Por qué la metilnaltrexona alivia el estreñimiento inducido por opioides sin revertir el efecto analgésico de la morfina en el paciente?",
    options: [
      { text: "Su catión de amonio cuaternario impide por completo que atraviese la barrera BHE" },
      { text: "Penetra al cerebro pero es degradada por enzimas cerebrales antes de unirse a mu" },
      { text: "Es un antagonista exclusivo de receptores kappa que carece de afinidad por MOR" },
      { text: "Se absorbe por vía oral pero el ácido clorhídrico gástrico la inactiva al instante" },
    ],
    correctIndex: 0,
    explanation: "La metilnaltrexona contiene un grupo metilo adicional en el nitrógeno, formando una sal de amonio cuaternario con carga positiva permanente. Al ser un catión hidrófilo incapaz de difusión pasiva por la barrera hematoencefálica, bloquea los receptores mu del tracto digestivo sin neutralizar la analgesia central.\n\nDescartamos la B: La metilnaltrexona no cruza la BHE; su restricción es físico-química por carga iónica neta permanente.\nDescartamos la C: La metilnaltrexona es un antagonista mu selectivo en el plexo mientérico gastrointestinal.\nDescartamos la D: Se administra por vía subcutánea o formulación oral protegida; la sal cuaternaria es químicamente estable.\n\nReferencia: Apuntes, Antagonistas periféricos (PAMORA)."
  },
  {
    id: "t06-m1-q07",
    topicId: "tema-06",
    block: "SAR · Morfinanos",
    badge: "Modelo 1 · P7 · SAR · Morfinanos",
    question: "¿Qué repercusión química y farmacológica tiene la eliminación formal del puente éter 4,5-epóxido (anillo E) en el andamiaje del levorfanol?",
    options: [
      { text: "Destruye totalmente la unión al receptor por pérdida del oxígeno aceptor de H" },
      { text: "Transforma al compuesto en un antagonista puro de acción periférica exclusiva" },
      { text: "Desplaza de forma selectiva la activación hacia receptores dopaminérgicos D2" },
      { text: "Mantiene o incrementa la afinidad por mu, demostrando que el éter no es vital" },
    ],
    correctIndex: 3,
    explanation: "La eliminación del anillo E (puente éter 4,5) conduce a los morfinanos. El levorfanol posee mayor flexibilidad conformacional y lipofilia que la morfina, exhibiendo una potencia analgésica de 4 a 8 veces superior. Esto demuestra fehacientemente que el oxígeno del puente éter no forma interacciones esenciales de fijación con el receptor.\n\nDescartamos la A: El levorfanol es entre 4 y 8 veces más potente que la morfina, lo que prueba que el puente 4,5-epóxido no es indispensable.\nDescartamos la B: El levorfanol es un agonista potente con plena penetración en el SNC, no un antagonista periférico.\nDescartamos la C: Los morfinanos conservan afinidad primaria por receptores opioides mu y carecen de afinidad por receptores dopaminérgicos.\n\nReferencia: Apuntes, Morfinanos: levorfanol y dextrometorfano."
  },
  {
    id: "t06-m1-q08",
    topicId: "tema-06",
    block: "SAR · 4-Fenilpiperidinas",
    badge: "Modelo 1 · P8 · SAR · 4-Fenilpiperidinas",
    question: "¿Qué grupos funcionales diferencian la estructura de la cetobemidona frente a la petidina?",
    options: [
      { text: "Presenta un éster etílico en C4 sin hidroxilos en el anillo aromático" },
      { text: "Presenta un éster propanoílico en C4 y un hidroxilo alcohólico alílico" },
      { text: "Presenta una cetona propanoílica en C4 y un hidroxilo fenólico en meta" },
      { text: "Presenta un enlace amida en C4 sin sustituyentes fenólicos aromáticos" },
    ],
    correctIndex: 2,
    explanation: "La petidina contiene un éster etílico en C4 y carece de fenol. La cetobemidona sustituye el éster por una cetona (grupo propanoílo) e incorpora un hidroxilo fenólico en la posición meta del anillo aromático. Este fenol restaura el enlace de hidrógeno complementario en el receptor mu, aumentando significativamente su potencia analgésica.\n\nDescartamos la A: Esa descripción corresponde a la petidina, no a la cetobemidona.\nDescartamos la B: La cetobemidona lleva una cetona y un fenol, no un éster con alcohol alílico.\nDescartamos la D: La cetobemidona no es una amida; las amidas caracterizan a la serie del fentanilo.\n\nReferencia: Apuntes, 4-Fenilpiperidinas: petidina y cetobemidona."
  },
  {
    id: "t06-m1-q09",
    topicId: "tema-06",
    block: "SAR · Cinamilo",
    badge: "Modelo 1 · P9 · SAR · Cinamilo",
    question: "¿Qué comportamiento paradójico se observa al incorporar un grupo N-cinamilo en la norpetidina en comparación con la normorfina?",
    options: [
      { text: "En norpetidina aumenta la potencia 30 veces; en normorfina resulta inactiva" },
      { text: "En norpetidina anula la actividad; en normorfina multiplica la potencia analgésica" },
      { text: "En ambas moléculas transforma el perfil farmacológico hacia antagonismo puro" },
      { text: "En ambas moléculas la voluminosa cadena cinamílica impide la unión al receptor" },
    ],
    correctIndex: 0,
    explanation: "El grupo N-cinamilo demuestra el impacto de la flexibilidad conformacional. En la petidina (más flexible), el anillo aromático distal del cinamilo alcanza un bolsillo hidrofóbico accesorio suplementario, elevando la potencia 30 veces. En cambio, en la morfina (esqueleto rígido pentacíclico), la orientación forzada del cinamilo choca estéricamente con las paredes del receptor, anulando la actividad.\n\nDescartamos la B: El efecto real es exactamente el inverso: la N-cinamilnormorfina es completamente inactiva.\nDescartamos la C: La N-cinamilnorpetidina es un agonista analgésico potente, no un antagonista.\nDescartamos la D: La flexibilidad de la 4-fenilpiperidina permite que el cinamilo alcance un bolsillo lipófilo muy favorable, ganando 30 veces potencia.\n\nReferencia: Apuntes, 4-Fenilpiperidinas: petidina y cetobemidona."
  },
  {
    id: "t06-m1-q10",
    topicId: "tema-06",
    block: "Síntesis · Petidina",
    badge: "Modelo 1 · P10 · Síntesis · Petidina",
    question: "¿Qué reactivos de partida se emplean en el primer paso de la síntesis clásica de la petidina para construir el anillo de piperidina?",
    options: [
      { text: "Anilina y acrilamida mediante adición 1,4 conjugada con catálisis ácida de Lewis" },
      { text: "Benzaldehído y dietilamina mediante condensación aldólica seguida de reducción" },
      { text: "Fenilacetonitrilo y mecloretamina en presencia de una base fuerte como sodamida" },
      { text: "Benceno y 4-piperidona mediante sustitución electrófila aromática de Friedel" },
    ],
    correctIndex: 2,
    explanation: "La síntesis parte de fenilacetonitrilo (PhCH2CN). La sodamida (NaNH2) desprotona el carbono alfa formando un carbanión estabilizado que realiza una doble alquilación consecutiva sobre la mecloretamina (mostaza nitrogenada: bis(2-cloroetil)metilamina), cerrando la 4-fenilpiperidina.\n\nDescartamos la A: Esa reacción no introduce el carbono cuaternario con fenilo y nitrilo de la petidina.\nDescartamos la B: Una condensación con benzaldehído no cierra un anillo de piperidina sustituido en C4.\nDescartamos la D: El benceno no ataca a una piperidona directamente en Friedel–Crafts sin grupos activantes.\n\nReferencia: Apuntes, Síntesis de la petidina."
  },
  {
    id: "t06-m1-q11",
    topicId: "tema-06",
    block: "Síntesis · Cetobemidona",
    badge: "Modelo 1 · P11 · Síntesis · Cetobemidona",
    question: "¿Qué transformación sintética introduce el grupo propanoílo a partir del nitrilo intermedio en la síntesis de la cetobemidona?",
    options: [
      { text: "Acilación de Friedel–Crafts del anillo fenílico con cloruro de propanoílo y AlCl3" },
      { text: "Adición de bromuro de etilmagnesio al nitrilo e hidrólisis de la imina formada" },
      { text: "Oxidación con reactivo de Jones de un alcohol secundario introducido con etil-litio" },
      { text: "Ozonólisis oxidativa de una cadena terminal de buteno unida al carbono central" },
    ],
    correctIndex: 1,
    explanation: "El intermedio 4-(3-metoxifenil)-1-metilpiperidina-4-carbonitrilo se trata con el reactivo de Grignard bromuro de etilmagnesio (CH3CH2MgBr). El ataque nucleófilo sobre el carbono del nitrilo genera una sal de imina intermedia que, al hidrolizarse con ácido acuoso, rinde la etilcetona (propanoílo).\n\nDescartamos la A: La acilación sobre el fenilo daría una arilcetona en el anillo, no la sustitución alifática en C4 de la piperidina.\nDescartamos la C: La adición de Grignard sobre nitrilos genera directamente la cetona tras hidrólisis, sin pasar por alcohol secundario.\nDescartamos la D: La ruta oficial no emplea ozonólisis sino adición organometálica al nitrilo.\n\nReferencia: Apuntes, Síntesis de la cetobemidona."
  },
  {
    id: "t06-m1-q12",
    topicId: "tema-06",
    block: "Síntesis · Diels-Alder",
    badge: "Modelo 1 · P12 · Síntesis · Diels-Alder",
    question: "¿Qué reactivos y tipo de cicloadición permiten transformar la tebaína en el aducto 6,14-endo-eteno (tevinona)?",
    options: [
      { text: "Cicloadición fotoquímica [2+2] empleando acetileno gaseoso y luz ultravioleta" },
      { text: "Adición 1,4 de Michael empleando el anión enolato del acetoacetato de etilo en base" },
      { text: "Reacción electrofílica de Prins condensando formaldehído en medio sulfúrico anhidro" },
      { text: "Cicloadición [4+2] de Diels–Alder con metilvinilcetona sobre el dieno conjugado" },
    ],
    correctIndex: 3,
    explanation: "La tebaína posee un dieno conjugado C6=C7–C8=C14 con 4 electrones pi. Reacciona térmicamente con un dienófilo deficiente en electrones (metilvinilcetona, 2 electrones pi) mediante una cicloadición concerted [4+2] de Diels–Alder para formar el aducto bicíclico rígido 6,14-endo-eteno conocido como tevinona.\n\nDescartamos la A: La reacción es térmica tipo Diels–Alder [4+2] con un alqueno conjugado activado (filodieno).\nDescartamos la B: El dieno de la tebaína no es aceptor de Michael; actúa como componente diénico de 4 electrones pi.\nDescartamos la C: La reacción de Prins forma 1,3-dioxanos o alcoholes alílicos, no el puente bicíclico 6,14-endo-eteno.\n\nReferencia: Apuntes, Cicloadición de Diels–Alder sobre la tebaína."
  },
  {
    id: "t06-m1-q13",
    topicId: "tema-06",
    block: "Bioquímica · Receptores",
    badge: "Modelo 1 · P13 · Bioquímica · Receptores",
    question: "¿A qué familia de proteínas G se acoplan los receptores opioides y qué cascada efectora desencadenan en la neurona?",
    options: [
      { text: "Proteínas Gi/Go: inhiben adenilato ciclasa y abren canales K+ postsinápticos" },
      { text: "Proteínas Gs: activan adenilato ciclasa y estimulan la fosforilación por PKA" },
      { text: "Proteínas Gq: activan fosfolipasa C y estimulan la entrada de iones de calcio" },
      { text: "Proteínas G12/13: activan fosfolipasa C y estimulan la cascada RhoA celular" },
    ],
    correctIndex: 0,
    explanation: "Los receptores opioides (mu, kappa, delta) se acoplan a proteínas Gi/Go heterotriméricas. La subunidad alfa-i inhibe a la adenilato ciclasa disminuyendo el AMPc celular; a nivel presináptico frena la entrada de Ca2+ impidiendo la exocitosis de neurotransmisores del dolor, y a nivel postsináptico abre canales de K+ rectificadores entrantes (GIRK), provocando hiperpolarización e inhibición.\n\nDescartamos la B: El acoplamiento a Gs es activador (como en receptores beta-adrenérgicos), mientras que los opioides deprimen la excitabilidad neuronal.\nDescartamos la C: La vía Gq/IP3 eleva el calcio intracelular (propia de receptores M1/M3 o alfa1), lo contrario de la acción opioide.\nDescartamos la D: La vía G12/13 regula el citoesqueleto celular mediante RhoA y no media la inhibición neuronal de los receptores opioides.\n\nReferencia: Apuntes, Cuatro familias de receptores opioides acoplados a proteína G."
  },
  {
    id: "t06-m1-q14",
    topicId: "tema-06",
    block: "Bioquímica · Péptidos",
    badge: "Modelo 1 · P14 · Bioquímica · Péptidos",
    question: "¿Qué enzima fisiológica hidroliza el enlace Gly3–Phe4 de las encefalinas y qué cambio en DAMGO previene este corte?",
    options: [
      { text: "La acetilcolinesterasa; se evita mediante la eliminación total del grupo carboxilo" },
      { text: "La neprilisina (encefalinasa); se bloquea mediante la N-metilación de la Phe4" },
      { text: "La monoaminooxidasa mitocondrial; se impide mediante la sustitución por D-alanina" },
      { text: "La triptasa de mastocitos; se inhibe formando un enlace disulfuro intramolecular" },
    ],
    correctIndex: 1,
    explanation: "La neprilisina (endopeptidasa neutra, NEP o encefalinasa) escinde internamente el enlace peptídico Gly3–Phe4. En el análogo estabilizado DAMGO ([D-Ala2, N-MePhe4, Gly-ol5]-encefalina), la N-metilación del nitrógeno de Phe4 impide el reconocimiento y catálisis por neprilisina, mientras que D-Ala2 bloquea a las aminopeptidasas.\n\nDescartamos la A: Las encefalinas son péptidos, sustratos de proteasas y peptidasas, no de la acetilcolinesterasa.\nDescartamos la C: La MAO desamina aminas alifáticas de monoaminas (serotonina, dopamina), no endopeptidasas de enlaces internos.\nDescartamos la D: La enzima fisiológica clave de degradación de encefalinas en la sinapsis es la neprilisina (NEP).\n\nReferencia: Apuntes, Estrategia de estabilización: introducción de D-aminoácidos."
  },
  {
    id: "t06-m1-q15",
    topicId: "tema-06",
    block: "Síntesis · Fentanilo",
    badge: "Modelo 1 · P15 · Síntesis · Fentanilo",
    question: "¿Cómo se prepara el intermedio clave 4-ANPP en la síntesis industrial del fentanilo?",
    options: [
      { text: "Alquilación nucleófila de la anilina con 4-cloropiperidona en medio de etanol" },
      { text: "Transposición de Beckmann sobre la oxima de la piperidona en medio de etanol" },
      { text: "Aminación reductora de 1-fenetil-4-piperidona con anilina empleando NaBH4" },
      { text: "Reacción de Mannich entre formaldehído, anilina y una piperidona heterocíclica" },
    ],
    correctIndex: 2,
    explanation: "La síntesis de Janssen condensa la 1-fenetil-4-piperidona (NPP) con anilina mediante catálisis ácida para formar la base de Schiff (imina). La reducción de esta imina con borohidruro de sodio (NaBH4) rinde selectivamente la 4-anilino-N-fenetilpiperidina (4-ANPP).\n\nDescartamos la A: La 4-cloropiperidina daría reacciones secundarias de eliminación; la vía elegida es una aminación reductora.\nDescartamos la B: La transposición de Beckmann expandiría el anillo de 6 a 7 miembros (diazepanona), no una piperidina.\nDescartamos la D: La ruta Janssen oficial es la condensación imínica de NPP con anilina y reducción.\n\nReferencia: Apuntes, La síntesis del fentanilo: aminación reductora."
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
    question: "¿Qué reactivo y condiciones permiten transformar cuantitativamente la morfina en 3,6-diacetilmorfina (heroína)?",
    options: [
      { text: "Tratamiento con ácido acético acuoso diluido en presencia de acetato sódico" },
      { text: "Tratamiento con acetato de etilo anhidro en presencia de metóxido de sodio" },
      { text: "Calentamiento con anhídrido acético en presencia de piridina o trietilamina" },
      { text: "Reacción con cloruro de acetilo gas en ausencia de bases a baja temperatura" },
    ],
    correctIndex: 2,
    explanation: "La morfina reacciona con exceso de anhídrido acético ((CH3CO)2O) a reflujo o en presencia de trietilamina/piridina. El anhídrido acila tanto el hidroxilo fenólico en C3 como el hidroxilo secundario alílico en C6 mediante sustitución nucleófila acílica, liberando ácido acético y produciendo heroína.\n\nDescartamos la A: El ácido acético acuoso no es un reactivo de acetilación suficiente y el equilibrio favorece la hidrólisis.\nDescartamos la B: La transesterificación con acetato de etilo es ineficaz sobre los hidroxilos impedidos de la morfina.\nDescartamos la D: La ruta clásica y reproducible emplea anhídrido acético líquido (o cloruro de acetilo con base).\n\nReferencia: Apuntes, La heroína como profármaco de penetración rápida."
  },
  {
    id: "t06-m2-q02",
    topicId: "tema-06",
    block: "SAR · Estereoquímica",
    badge: "Modelo 2 · P2 · SAR · Estereoquímica",
    question: "Respecto a la estereoquímica de la morfina natural y su imagen especular sintética, ¿cuál de las siguientes afirmaciones es correcta?",
    options: [
      { text: "El enantiómero levógiro (−) es activo; la ent-morfina (+) es totalmente inactiva" },
      { text: "El enantiómero dextrógiro (+) es activo; la morfina natural (−) actúa como distómero" },
      { text: "Ambos enantiómeros son equipotentes al interactuar con el residuo de aspartato" },
      { text: "El enantiómero levógiro es agonista y el dextrógiro actúa como antagonista puro" },
    ],
    correctIndex: 0,
    explanation: "La morfina natural del opio posee 5 estereocentros quirales y existe como un único enantiómero levógiro (−). La (+)-morfina sintética (ent-morfina), obtenida en el laboratorio, carece por completo de afinidad analgésica por receptores opioides, evidenciando el estricto requerimiento estereoquímico del receptor GPCR.\n\nDescartamos la B: La morfina natural extraída del opio es exclusivamente levógira (−) y es el eutómero activo.\nDescartamos la C: El receptor es un entorno quiral estricto; la imagen especular no encaja en la disposición tridimensional multipuntual requerida.\nDescartamos la D: La ent-morfina (+) carece por completo de afinidad por el receptor opioide analgésico.\n\nReferencia: Apuntes, Estereoquímica: enantiómero especular y 14-epimorfina."
  },
  {
    id: "t06-m2-q03",
    topicId: "tema-06",
    block: "SAR · Extensión N",
    badge: "Modelo 2 · P3 · SAR · Extensión N",
    question: "¿Qué sustituyentes sobre el nitrógeno terciario transforman a los agonistas morfínicos en antagonistas puros o de gran utilidad clínica?",
    options: [
      { text: "Cadenas hidrófobas lineales cortas como el grupo metilo o el grupo fenetilo" },
      { text: "Grupos polares fuertemente oxigenados como el resto carboxilo o metoxilo" },
      { text: "Cadenas intermedias saturadas normales como el grupo etilo o grupo n-propilo" },
      { text: "Cadenas de tres carbonos como el grupo alilo o el grupo ciclopropilmetilo" },
    ],
    correctIndex: 3,
    explanation: "El reemplazo del N-metilo por grupos insaturados o tensionados de tres carbonos, como el N-alilo (–CH2–CH=CH2 en nalorfina y naloxona) o el N-ciclopropilmetilo (–CH2–cPr en naltrexona y buprenorfina), induce antagonismo competitivo selectivo en receptores mu.\n\nDescartamos la A: El metilo y el fenetilo generan agonistas potentes, no antagonistas.\nDescartamos la B: La unión de grupos carboxilo formaría amidas o carbamatos sin basicidad, impidiendo el anclaje iónico.\nDescartamos la C: Las cadenas alquílicas saturadas etilo y propilo reducen drásticamente la afinidad sin conferir antagonismo clínico eficaz.\n\nReferencia: Apuntes, SAR del nitrógeno: tamaño de la cadena y transición a antagonistas."
  },
  {
    id: "t06-m2-q04",
    topicId: "tema-06",
    block: "Bioquímica · Electrónica",
    badge: "Modelo 2 · P4 · Bioquímica · Electrónica",
    question: "¿Por qué un grupo vinilo unido al nitrógeno terciario en un opioide impide la formación del enlace electrostático con el receptor?",
    options: [
      { text: "El doble enlace polimeriza espontáneamente en agua formando agregados insolubles" },
      { text: "Forma una enamina cuyo par libre se deslocaliza, impidiendo protonarse a pH 7,4" },
      { text: "Actúa como un nucleófilo blando que ataca covalentemente a residuos de serina" },
      { text: "Genera una carga formal negativa en el nitrógeno que repele al aspartato de mu" },
    ],
    correctIndex: 1,
    explanation: "La unión directa del alqueno al nitrógeno forma un sistema tipo enamina (–N–CH=CH2). La resonancia desplaza la densidad del par solitario hacia el carbono terminal, reduciendo drásticamente el pKa del nitrógeno. A pH 7,4, el nitrógeno no puede captar un protón, carece de carga catiónica fija y no puede establecer el enlace iónico con el Asp147 del receptor.\n\nDescartamos la A: A escala molecular un grupo vinilamino no polimeriza espontáneamente; el problema radica en su basicidad.\nDescartamos la C: Un grupo vinilo simple no es un aceptor electrofílico de Michael salvo que esté conjugado con carbonilo.\nDescartamos la D: El nitrógeno retiene carga neutra deslocalizada, pero nunca se carga negativamente en medio biológico.\n\nReferencia: Apuntes, Justificación electrónica: grupo alilo frente a grupo vinilo."
  },
  {
    id: "t06-m2-q05",
    topicId: "tema-06",
    block: "Bioquímica · PAMORA",
    badge: "Modelo 2 · P5 · Bioquímica · PAMORA",
    question: "¿Qué mecanismos farmacocinéticos impiden que el naloxegol atraviese la barrera hematoencefálica?",
    options: [
      { text: "La cadena PEG añade volumen polar y actúa como sustrato de la bomba P-gp" },
      { text: "Presenta una carga cuaternaria permanente que impide atravesar membranas" },
      { text: "Se une de forma covalente a proteínas séricas impidiendo toda filtración" },
      { text: "Sufre hidrólisis inmediata por esterasas de la mucosa intestinal a naloxona" },
    ],
    correctIndex: 0,
    explanation: "El naloxegol conjuga el andamiaje del naloxol con una cadena de polietilenglicol (PEG-7). Esta cadena polar aumenta el área de superficie polar y el peso molecular, frenando la difusión pasiva; además, la molécula se convierte en sustrato activo de la glicoproteína P (P-gp), que bombea fuera del endotelio cerebral cualquier fracción residual.\n\nDescartamos la B: El naloxegol es una amina terciaria conjugada con PEG, no una sal de amonio cuaternario.\nDescartamos la C: El naloxegol no forma enlaces covalentes con albúmina.\nDescartamos la D: La unión del PEG al naloxol es un enlace éter estable que resiste a esterasas.\n\nReferencia: Apuntes, Antagonistas periféricos (PAMORA)."
  },
  {
    id: "t06-m2-q06",
    topicId: "tema-06",
    block: "SAR · Benzomorfanos",
    badge: "Modelo 2 · P6 · SAR · Benzomorfanos",
    question: "¿Qué elementos estructurales caracterizan a los benzomorfanos (como la metazocina) tras la supresión de los anillos C y E de la morfina?",
    options: [
      { text: "Presentan un anillo de piperidona con dos sustituyentes etilo en relación trans" },
      { text: "Contienen un anillo de piridina aromática fusionado directamente al fenol" },
      { text: "Conservan dos metilos cis que actúan como restos del anillo ciclohexénico" },
      { text: "Mantienen un puente oxigenado que conecta el carbono C9 con el anillo bencénico" },
    ],
    correctIndex: 2,
    explanation: "Los 6,7-benzomorfanos retienen los anillos A, B y D. Los dos grupos metilo en cis presentes en la metazocina y pentazocina representan los restos («muñones») de los carbonos de unión del anillo C eliminado, estabilizando la orientación conformacional de la piperidina.\n\nDescartamos la A: Los benzomorfanos no son piperidonas y sus metilos característicos se sitúan en cis.\nDescartamos la B: El nitrógeno forma parte de un ciclo saturado piperidínico, nunca de una piridina aromática.\nDescartamos la D: El puente oxigenado (anillo E) se elimina en morfinanos y benzomorfanos.\n\nReferencia: Apuntes, Benzomorfanos: metazocina y pentazocina."
  },
  {
    id: "t06-m2-q07",
    topicId: "tema-06",
    block: "Síntesis · Petidina",
    badge: "Modelo 2 · P7 · Síntesis · Petidina",
    question: "¿Cuál es la función química específica de la mecloretamina en la construcción del esqueleto de la petidina?",
    options: [
      { text: "Actúa como catalizador básico de transferencia de fase regenerando la sodamida" },
      { text: "Actúa como electrófilo bifuncional para cerrar el ciclo por doble alquilación" },
      { text: "Aporta los hidrógenos necesarios para saturar el anillo aromático del reactivo" },
      { text: "Funciona como grupo protector temporal del nitrilo impidiendo su hidratación" },
    ],
    correctIndex: 1,
    explanation: "La mecloretamina (mostaza nitrogenada alifática) cuenta con dos cadenas 2-cloroetilo unidas a un nitrógeno metilado. Al contener dos carbonos electrófilos con excelentes grupos salientes (cloruros), actúa como agente de doble alquilación que cicla con el carbanión del fenilacetonitrilo para formar la piperidina.\n\nDescartamos la A: La mecloretamina se incorpora estequiométricamente al producto; es un reactivo, no un catalizador.\nDescartamos la C: El anillo aromático de la petidina no se reduce durante la síntesis.\nDescartamos la D: La mecloretamina es el fragmento que aporta la unidad piperidínica completa.\n\nReferencia: Apuntes, Síntesis de la petidina."
  },
  {
    id: "t06-m2-q08",
    topicId: "tema-06",
    block: "Síntesis · Cetobemidona",
    badge: "Modelo 2 · P8 · Síntesis · Cetobemidona",
    question: "¿Qué reactivo se utiliza en el último paso de la síntesis de la cetobemidona para desproteger el éter metílico aromático y liberar el fenol?",
    options: [
      { text: "Hidrogenación catalítica con paladio sobre carbón a temperatura ambiente neutra" },
      { text: "Disolución diluida de hidróxido de sodio para hidrolizar el grupo metoxilo" },
      { text: "Borohidruro de sodio en metanol anhidro para reducir el enlace oxígeno y metilo" },
      { text: "Ácido bromhídrico acuoso concentrado a reflujo para escindir el éter arílico" },
    ],
    correctIndex: 3,
    explanation: "La ruptura de un éter metílico aromático (desalquilación del anisol) requiere condiciones ácidas fuertes y nucleófilos blandos eficaces. El tratamiento con ácido bromhídrico (HBr concentrado al 48%) a ebullición protona el oxígeno del éter y el ion bromuro desplaza el grupo metilo vía SN2 (liberando bromuro de metilo volátil) para generar el fenol libre.\n\nDescartamos la A: La hidrogenólisis desprotege éteres bencílicos (–OBn), pero los éteres metílicos arílicos (–OMe) son inertes a H2/Pd.\nDescartamos la B: Los éteres no se hidrolizan en medio básico porque el ion metóxido es un grupo saliente pésimo.\nDescartamos la C: El NaBH4 es un reductor de carbonilos que no rompe éteres aromáticos.\n\nReferencia: Apuntes, Síntesis de la cetobemidona."
  },
  {
    id: "t06-m2-q09",
    topicId: "tema-06",
    block: "Bioquímica · Fármaco Blando",
    badge: "Modelo 2 · P9 · Bioquímica · Fármaco Blando",
    question: "¿Qué enzima metaboliza al remifentanilo y por qué su duración de acción no se prolonga en pacientes con cirrosis o fallo renal?",
    options: [
      { text: "Isoenzima CYP3A4 microsómica hepática mediante N-desalquilación oxidativa rápida" },
      { text: "Glutatión S-transferasa citosólica conjugando el resto propanoato en el riñón" },
      { text: "Esterasas inespecíficas sanguíneas y tisulares que hidrolizan el éster metílico" },
      { text: "Butilcolinesterasa plasmática exclusiva que depende de polimorfismos atípicos" },
    ],
    correctIndex: 2,
    explanation: "El remifentanilo se diseñó incorporando un éster metílico lábil en la cadena N-propanoato. Este éster es hidrolizado en segundos por esterasas inespecíficas sanguíneas y tisulares a un metabolito ácido carboxílico unas 4600 veces menos potente. Su vida media context-sensitive (3–5 min) es independiente de la función hepática o renal.\n\nDescartamos la A: La CYP3A4 metaboliza al fentanilo, pero el remifentanilo fue diseñado para escapar del aclaramiento hepático mediante esterasas.\nDescartamos la B: El remifentanilo no sufre conjugación con glutatión como vía metabólica primaria.\nDescartamos la D: A diferencia del suxametonio o mivacurio, el remifentanilo es hidrolizado por esterasas inespecíficas generales y no depende de pseudocolinesterasa.\n\nReferencia: Apuntes, 4-Anilidopiperidinas: fentanilo y análogos."
  },
  {
    id: "t06-m2-q10",
    topicId: "tema-06",
    block: "SAR · 4-Anilidopiperidinas",
    badge: "Modelo 2 · P10 · SAR · 4-Anilidopiperidinas",
    question: "¿Qué variaciones moleculares introducidas en el sufentanilo explican su extraordinaria potencia frente al fentanilo?",
    options: [
      { text: "La sustitución bioisostérica por tiofeno y el grupo 4-metoximetilo en C4" },
      { text: "La reintroducción de un fenol en meta y un grupo carboxilato en el nitrógeno" },
      { text: "La incorporación de un éster etílico lábil y la eliminación de la amida aromática" },
      { text: "La presencia de dos átomos de cloro orto en el anillo fenílico de la propionamida" },
    ],
    correctIndex: 0,
    explanation: "El sufentanilo sustituye el fenilo de la cadena fenetilo por un anillo de tiofeno (bioisostería aromática) e incorpora un grupo metoximetilo (–CH2–O–CH3) en la posición 4 de la piperidina. Estas modificaciones optimizan las interacciones hidrofóbicas con MOR, alcanzando una potencia de 500 a 1000 veces la de la morfina.\n\nDescartamos la B: El sufentanilo no posee fenol ni carboxilato en el nitrógeno; conserva una amida y una cadena fenetilo modificada con tiofeno.\nDescartamos la C: El éster lábil es propio del remifentanilo, no del sufentanilo.\nDescartamos la D: El sufentanilo no contiene sustituyentes clorados en la anilina.\n\nReferencia: Apuntes, 4-Anilidopiperidinas: fentanilo y análogos."
  },
  {
    id: "t06-m2-q11",
    topicId: "tema-06",
    block: "SAR · Metadona",
    badge: "Modelo 2 · P11 · SAR · Metadona",
    question: "¿Cómo logra la metadona adoptar la conformación activa en el receptor y cuál de sus enantiómeros es el responsable de la analgesia?",
    options: [
      { text: "Adopta una conformación lineal extendida en solución siendo eutómero el (S)-(+)" },
      { text: "Adopta una conformación helicoidal rígida en solución siendo eutómero el (S)-(−)" },
      { text: "Genera una conformación planar fija en solución siendo ambos racémicos activos" },
      { text: "Se pliega en conformación pseudocíclica C=O···N+ siendo eutómero el (R)-(−)" },
    ],
    correctIndex: 3,
    explanation: "A pesar de ser acíclica, la metadona adopta una conformación plegada pseudocíclica de seis miembros en disolución mediante una interacción electrostática dipolar entre el nitrógeno básico protonado y el oxígeno carbonílico. El enantiómero (R)-(−) (levometadona) es el eutómero responsable de la actividad agonista mu.\n\nDescartamos la A: La metadona no actúa en forma extendida lineal y el enantiómero (S) es el distómero.\nDescartamos la B: La unión es puramente reversible no covalente y existe una fuerte eudismia a favor del enantiómero (R).\nDescartamos la C: La interacción C=O···N+ es electrostática intramolecular, no una conformación planar fija.\n\nReferencia: Apuntes, Difenilpropilaminas: metadona."
  },
  {
    id: "t06-m2-q12",
    topicId: "tema-06",
    block: "Bioquímica · Metabolismo",
    badge: "Modelo 2 · P12 · Bioquímica · Metabolismo",
    question: "¿Qué diferencia metabólica confiere al tapentadol una respuesta analgésica mucho más predecible que la del tramadol?",
    options: [
      { text: "Requiere una oxidación previa por la CYP2D6 para generar un metabolito activo" },
      { text: "Posee el fenol libre y no requiere activación por CYP2D6; se glucuroniza directo" },
      { text: "Se excreta íntegramente por vía biliar sin experimentar transformación metabólica" },
      { text: "Resiste la glucuronidación hepática gracias a una barrera de átomos de flúor" },
    ],
    correctIndex: 1,
    explanation: "El tramadol es un profármaco que requiere O-desmetilación por CYP2D6 para liberar el metabolito M1 (O-desmetiltramadol), activo sobre MOR. El tapentadol ya cuenta de partida con el hidroxilo fenólico libre en meta, poseyendo actividad analgésica directa mu y noradrenérgica sin depender de la variabilidad genética de CYP2D6.\n\nDescartamos la A: Esa dependencia de CYP2D6 es el defecto del tramadol, no del tapentadol.\nDescartamos la C: El tapentadol se metaboliza casi en un 97%, principalmente por glucuronidación directa de Fase II.\nDescartamos la D: El tapentadol no lleva átomos de flúor y su vía principal es la glucuronidación de su fenol.\n\nReferencia: Apuntes, Aminociclohexanoles: tramadol y tapentadol."
  },
  {
    id: "t06-m2-q13",
    topicId: "tema-06",
    block: "Síntesis · Buprenorfina",
    badge: "Modelo 2 · P13 · Síntesis · Buprenorfina",
    question: "¿Qué reactivo organometálico se hace reaccionar con la cetona de la dihidrotevinona para introducir el grupo tert-butilo característico de la buprenorfina?",
    options: [
      { text: "Metil-litio en éter dietílico anhidro para generar un alcohol dimetílico plano" },
      { text: "Bromuro de n-propilmagnesio rindiendo el derivado alifático lineal de etorfina" },
      { text: "Bromuro de fenilmagnesio para introducir un anillo aromático adicional en C7" },
      { text: "Cloruro de tert-butilmagnesio para generar el alcohol terciario voluminoso" },
    ],
    correctIndex: 3,
    explanation: "La dihidrotevinona porta una metilcetona en C7 (–COCH3). La adición nucleófila del reactivo de Grignard impedido cloruro de tert-butilmagnesio (t-BuMgCl) ataca al carbonilo para generar un alcohol terciario diastereoméricamente puro dotado del voluminoso grupo lipófilo tert-butilo.\n\nDescartamos la A: El metil-litio generaría la cadena de diprenorfina (con dos metilos), no el grupo tert-butilo en paraguas.\nDescartamos la B: El n-propilmagnesio se utiliza en la síntesis de la etorfina, no de la buprenorfina.\nDescartamos la C: La buprenorfina no contiene un fenilo en C7, sino el grupo tert-butilo alifático.\n\nReferencia: Apuntes, Extensión sobre la cetona: adición organometálica de Grignard."
  },
  {
    id: "t06-m2-q14",
    topicId: "tema-06",
    block: "Bioquímica · Difelikefalina",
    badge: "Modelo 2 · P14 · Bioquímica · Difelikefalina",
    question: "¿Qué combinación de diana y características farmacocinéticas explica la eficacia de la difelikefalina en el prurito urémico sin disforia?",
    options: [
      { text: "Es un tetrapéptido D hidrófilo que estimula receptores kappa periféricos" },
      { text: "Es un antagonista de receptores mu centrales con penetración cerebral rápida" },
      { text: "Es un inhibidor potente de la neprilisina que eleva encefalinas circulantes" },
      { text: "Es un agonista de receptores delta periféricos que libera histamina tisular" },
    ],
    correctIndex: 0,
    explanation: "La difelikefalina es un tetrapéptido sintético integrado exclusivamente por D-aminoácidos (D-Phe-D-Phe-D-Leu-D-Lys) unido a ácido 4-aminopiperidina-4-carboxílico. Resiste proteasas y es muy hidrófilo, impidiéndole el acceso al SNC. Al activar selectivamente receptores kappa periféricos en la piel, suprime el picor sin provocar disforia ni psicotomimesis central.\n\nDescartamos la B: La difelikefalina no atraviesa la BHE y su diana es el receptor kappa periférico.\nDescartamos la C: La difelikefalina es un agonista directo de receptores opioides kappa, no un inhibidor enzimático.\nDescartamos la D: La liberación de histamina agravaría el prurito; su efecto anti-picor se debe a la estimulación de KOR en neuronas sensitivas.\n\nReferencia: Apuntes, Estrategia de estabilización: introducción de D-aminoácidos."
  },
  {
    id: "t06-m2-q15",
    topicId: "tema-06",
    block: "Síntesis · Fentanilo",
    badge: "Modelo 2 · P15 · Síntesis · Fentanilo",
    question: "¿Qué reactivo se emplea en el paso final de la síntesis del fentanilo para acilar el grupo anilino de la 4-ANPP?",
    options: [
      { text: "Anhídrido acético con catálisis de piridina rindiendo una acetamida aromática" },
      { text: "Cloruro de benzoílo para generar una benzamida aromática de elevada lipofilia" },
      { text: "Cloruro de propionilo en presencia de una base para formar la amida terciaria" },
      { text: "Formiato de etilo en medio básico para introducir un grupo formilo terminal" },
    ],
    correctIndex: 2,
    explanation: "La amina secundaria aromática 4-ANPP (4-anilino-N-fenetilpiperidina) se acila mediante adición-eliminación con cloruro de propionilo (CH3CH2COCl) en presencia de una base que neutraliza el HCl generado, rindiendo la amida fentanilo.\n\nDescartamos la A: El anhídrido acético introduciría un grupo acetilo generando acetilfentanilo, no fentanilo (que lleva propanoílo).\nDescartamos la B: El fentanilo lleva una cadena de tres carbonos alifática (propanoilamida), no una benzamida.\nDescartamos la D: La formilación generaría formilfentanilo, mientras que la molécula oficial incorpora propionilo.\n\nReferencia: Apuntes, La síntesis del fentanilo: aminación reductora."
  }
];

// MODELO 3: Rigidez molecular, orvinoles, benzomorfanos, síntesis de fentanilo y análogos peptídicos DAMGO
// Clave: D, B, A, C, B, D, C, A, D, C, A, B, D, A, B
export const TEMA6_MODELO_3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t06-m3-q01",
    topicId: "tema-06",
    block: "Bioquímica · Antagonistas",
    badge: "Modelo 3 · P1 · Bioquímica · Antagonistas",
    question: "¿Qué propiedad farmacocinética diferencia crucialmente el uso de la naloxona del uso de la naltrexona?",
    options: [
      { text: "Naloxona se administra por vía oral diaria; naltrexona se degrada en el estómago" },
      { text: "Ambas son incapaces de cruzar la barrera hematoencefálica actuando solo en intestino" },
      { text: "Naltrexona requiere ser hidrolizada por esterasas cerebrales para poder actuar" },
      { text: "Naloxona tiene nula absorción oral y vida corta; naltrexona es activa oral y larga" },
    ],
    correctIndex: 3,
    explanation: "La naloxona experimenta un metabolismo de primer paso hepático casi absoluto (biodisponibilidad oral <2%) y vida media corta (30–90 min), ideal como antídoto parenteral o nasal en sobredosis. La naltrexona, con grupo ciclopropilmetilo, presenta buena biodisponibilidad oral y vida media larga (4–10 h, y hasta 13 h su metabolito activo), idónea para deshabituación.\n\nDescartamos la A: La naloxona oral tiene una biodisponibilidad <2% por intenso primer paso; la naltrexona es el fármaco de elección por vía oral.\nDescartamos la B: Ambas cruzan la BHE con enorme facilidad para revertir la depresión respiratoria o evitar la adicción.\nDescartamos la C: La naltrexona es un antagonista activo directo por sí misma, cuyo metabolito 6-beta-naltrexol también es activo.\n\nReferencia: Apuntes, SAR del nitrógeno: tamaño de la cadena y transición a antagonistas."
  },
  {
    id: "t06-m3-q02",
    topicId: "tema-06",
    block: "SAR · Extensión N",
    badge: "Modelo 3 · P2 · SAR · Extensión N",
    question: "¿Por qué la sustitución del N-metilo por un grupo N-fenetilo dispara la afinidad en análogos morfínicos y en las 4-anilidopiperidinas?",
    options: [
      { text: "Aumenta la basicidad del nitrógeno forzando una carga permanente de amonio" },
      { text: "El anillo aromático distal accede a una subcavidad hidrofóbica suplementaria" },
      { text: "Establece un enlace covalente irreversible con residuos de cisteína del sitio" },
      { text: "Reduce de forma acusada la lipofilia mejorando la solubilidad en medio acuoso" },
    ],
    correctIndex: 1,
    explanation: "La cadena etilénica espaciadora sitúa al anillo fenilo del grupo N-fenetilo a la distancia exacta para interactuar favorablemente con un bolsillo aromático e hidrofóbico accesorio en el receptor mu, multiplicando la potencia analgésica.\n\nDescartamos la A: El fenetilo no forma un amonio cuaternario permanente; la basicidad no cambia drásticamente respecto al metilo.\nDescartamos la C: El anillo aromático del fenetilo no es un electrófilo ni forma enlaces covalentes.\nDescartamos la D: El anillo bencénico del fenetilo incrementa marcadamente la lipofilia.\n\nReferencia: Apuntes, SAR del nitrógeno: tamaño de la cadena y transición a antagonistas."
  },
  {
    id: "t06-m3-q03",
    topicId: "tema-06",
    block: "SAR · 14-OH",
    badge: "Modelo 3 · P3 · SAR · 14-OH",
    question: "¿Qué ventaja farmacológica aporta la inserción de un grupo hidroxilo terciario en C14 (como en oximorfona y oxicodona)?",
    options: [
      { text: "Aumenta la afinidad intrínseca y mejora la selectividad por el receptor mu" },
      { text: "Fuerza una selectividad periférica absoluta impidiendo por completo el paso BHE" },
      { text: "Induce hidrólisis metabólica por esterasas transformándola en fármaco blando" },
      { text: "Transforma el mecanismo de acción hacia el bloqueo de canales iónicos NaV1.8" },
    ],
    correctIndex: 0,
    explanation: "La presencia de un grupo hidroxilo terciario en posición 14 (14β-OH) introduce un centro aceptor y dador de enlace de hidrógeno complementario en el receptor, aumentando significativamente la afinidad y la selectividad por el receptor mu frente a receptores kappa y delta.\n\nDescartamos la B: La oximorfona y oxicodona cruzan perfectamente la BHE y actúan en el SNC.\nDescartamos la C: Un alcohol terciario no es sustrato de esterasas; esa propiedad corresponde a los ésteres.\nDescartamos la D: El bloqueo de NaV1.8 corresponde a la suzetrigina, una molécula completamente no opioide.\n\nReferencia: Apuntes, El sustituyente 14-OH: oximorfona y oxicodona."
  },
  {
    id: "t06-m3-q04",
    topicId: "tema-06",
    block: "Síntesis · Tebaína a 14-OH",
    badge: "Modelo 3 · P4 · Síntesis · Tebaína a 14-OH",
    question: "¿Qué reactivo oxidante se utiliza para introducir el hidroxilo en C14 sobre la tebaína para la semisíntesis de oxicodona y naloxona?",
    options: [
      { text: "Tetróxido de osmio estequiométrico en piridina anhidra a baja temperatura" },
      { text: "Clorocromato de piridinio (PCC) en diclorometano anhidro bajo atmósfera inerte" },
      { text: "Perácidos orgánicos o peróxido de hidrógeno en medio ácido fórmico o acético" },
      { text: "Ozonólisis del dieno conjugado seguida de reducción suave con dimetilsulfuro" },
    ],
    correctIndex: 2,
    explanation: "La tebaína se oxida mediante perácidos orgánicos (como ácido peracético o m-CPBA) o peróxido de hidrógeno en ácido fórmico. El perácido ataca al dieno conjugado generando un endoperóxido o epóxido intermedio que sufre apertura y transposición para formar 14-hidroxicodeinona, precursora directa de oxicodona, naloxona y naltrexona.\n\nDescartamos la A: El tetróxido de osmio rinde 1,2-dioles syn alifáticos, no la introducción estereoespecífica del 14-hidroxi-6-oxo.\nDescartamos la B: El PCC oxida alcoholes a carbonilos, pero no funcionaliza el dieno conjugado de la tebaína a 14-hidroxicetona.\nDescartamos la D: El ozono escindiría destructivamente el anillo ciclohexénico abriendo el esqueleto fenantrénico.\n\nReferencia: Apuntes, El sustituyente 14-OH: oximorfona y oxicodona."
  },
  {
    id: "t06-m3-q05",
    topicId: "tema-06",
    block: "Bioquímica · PAMORA",
    badge: "Modelo 3 · P5 · Bioquímica · PAMORA",
    question: "¿Qué estrategia molecular impide el paso a través de la barrera hematoencefálica en la naldemedina?",
    options: [
      { text: "La cuaternización del nitrógeno básico con dos grupos metilo catiónicos fijos" },
      { text: "Una carboxamida voluminosa unida a un heterociclo de 1,2,4-oxadiazol en C7" },
      { text: "La unión a un polímero de polietilenglicol lineal de veinte unidades de etilenglicol" },
      { text: "La formación de un quelato metálico bidentado con cinc que precipita en la sangre" },
    ],
    correctIndex: 1,
    explanation: "La naldemedina es un derivado de naltrexona que incorpora en C7 una cadena lateral voluminosa que contiene un heterociclo de 1,2,4-oxadiazol y un grupo fenilo. Este sustituyente aumenta el peso molecular y el impedimento estérico, impidiendo la permeabilidad a través de las uniones estrechas de la BHE.\n\nDescartamos la A: La cuaternización es la estrategia de la metilnaltrexona, no de la naldemedina.\nDescartamos la C: La pegilación corresponde al naloxegol.\nDescartamos la D: La naldemedina no actúa mediante quelación de metales.\n\nReferencia: Apuntes, Antagonistas periféricos (PAMORA)."
  },
  {
    id: "t06-m3-q06",
    topicId: "tema-06",
    block: "SAR · Benzomorfanos",
    badge: "Modelo 3 · P6 · SAR · Benzomorfanos",
    question: "¿Qué perfil farmacodinámico caracteriza a la pentazocina y qué consecuencias clínicas origina?",
    options: [
      { text: "Agonista mu puro de alta eficacia analgésica desprovisto de efectos adversos" },
      { text: "Antagonista puro de todos los receptores opioides utilizado en sobredosis aguda" },
      { text: "Bloqueante selectivo de canales de potasio sin tocar receptores acoplados a Gi" },
      { text: "Agonista kappa con menor depresión respiratoria pero con riesgo de disforia" },
    ],
    correctIndex: 3,
    explanation: "La pentazocina es un agonista mixto: activa receptores kappa y bloquea o activa débilmente los receptores mu. Proporciona analgesia espinal con efecto techo en depresión respiratoria, pero su activación kappa central puede ocasionar disforia, sedación y alucinaciones psicotomiméticas.\n\nDescartamos la A: La pentazocina actúa primordialmente por activación de receptores kappa y antagonismo débil mu.\nDescartamos la B: Ese perfil corresponde a la naloxona; la pentazocina es un analgésico agonista mixto.\nDescartamos la C: La pentazocina actúa a través de receptores GPCR opioides acoplados a proteínas Gi/Go.\n\nReferencia: Apuntes, Benzomorfanos: metazocina y pentazocina."
  },
  {
    id: "t06-m3-q07",
    topicId: "tema-06",
    block: "Síntesis · Petidina",
    badge: "Modelo 3 · P7 · Síntesis · Petidina",
    question: "¿Cómo se convierte el grupo nitrilo de la 4-fenil-4-cianopiperidina en el éster etílico final de la petidina?",
    options: [
      { text: "Reducción con DIBAL a aldehído y posterior condensación ácida con ortoformiato" },
      { text: "Tratamiento directo con yoduro de etilo en tetrahidrofurano anhidro a reflujo" },
      { text: "Hidrólisis a ácido carboxílico y posterior esterificación ácida con etanol" },
      { text: "Reacción con etóxido de sodio en anhídrido trifluoroacético a ebullición suave" },
    ],
    correctIndex: 2,
    explanation: "El grupo nitrilo cuaternario (–CN) se hidroliza por ebullición en medio ácido mineral (H2SO4 acuoso) pasando por amida hasta ácido 4-fenilpiperidina-4-carboxílico. La posterior reacción con etanol en presencia de ácido sulfúrico concentrado conduce al éster etílico petidina.\n\nDescartamos la A: La ruta hacia el éster no pasa por un aldehído sino por hidrólisis del nitrilo a ácido.\nDescartamos la B: El yoduro de etilo no esterifica nitrilos; alquilaría preferentemente el nitrógeno amínico.\nDescartamos la D: La alcoholisis de Pinner o hidrólisis se lleva a cabo en medio ácido mineral fuerte.\n\nReferencia: Apuntes, Síntesis de la petidina."
  },
  {
    id: "t06-m3-q08",
    topicId: "tema-06",
    block: "SAR · 4-Anilidopiperidinas",
    badge: "Modelo 3 · P8 · SAR · 4-Anilidopiperidinas",
    question: "¿Qué modificación presenta el carfentanilo en la posición 4 de la piperidina frente al fentanilo que fundamenta su uso veterinario?",
    options: [
      { text: "Un grupo éster metílico en C4 que confiere una potencia diez mil veces mayor" },
      { text: "Un grupo hidroxilo fenólico libre que disminuye drásticamente su toxicidad aguda" },
      { text: "Una cadena monodispersa de polietilenglicol que bloquea la entrada al cerebro" },
      { text: "Un anillo de ciclopropilo en el nitrógeno que lo transforma en antagonista puro" },
    ],
    correctIndex: 0,
    explanation: "El carfentanilo incorpora un éster metílico (–COOCH3) en la posición C4 de la 4-anilidopiperidina. Este sustituyente encaja a la perfección en un bolsillo específico de MOR, multiplicando la potencia por ~10.000 respecto a la morfina, lo que restringe su uso a la inmovilización de megafauna.\n\nDescartamos la B: El carfentanilo carece de fenol y es uno de los opioides más letales conocidos.\nDescartamos la C: El derivado pegilado es el naloxegol; el carfentanilo penetra instantáneamente al encéfalo.\nDescartamos la D: El carfentanilo conserva el grupo N-fenetilo y es un agonista mu hiperpotente.\n\nReferencia: Apuntes, 4-Anilidopiperidinas: fentanilo y análogos."
  },
  {
    id: "t06-m3-q09",
    topicId: "tema-06",
    block: "Síntesis · Hidromorfona",
    badge: "Modelo 3 · P9 · Síntesis · Hidromorfona",
    question: "¿Qué dos transformaciones sintéticas permiten convertir la morfina en hidromorfona?",
    options: [
      { text: "Reducción del fenol C3 con sodio metálico y deshidratación ácida en C6" },
      { text: "Metilación del nitrógeno a sal cuaternaria seguida de epoxidación del alqueno" },
      { text: "Alquilación con diazometano del C6-OH y ruptura oxidativa del puente éter" },
      { text: "Oxidación del alcohol en C6 a cetona e hidrogenación del doble enlace C7=C8" },
    ],
    correctIndex: 3,
    explanation: "La hidromorfona es la dihidromorfinona. Se prepara mediante la oxidación selectiva del alcohol alílico secundario C6 a grupo carbonilo (=O) combinada con la reducción catalítica (hidrogenación con H2/Pd o transposición catalítica) del doble enlace C7=C8.\n\nDescartamos la A: La hidromorfona conserva el fenol C3 intacto y posee un carbonilo, no un doble enlace adicional.\nDescartamos la B: La hidromorfona es una amina terciaria y su enlace 7,8 está saturado sin epóxido.\nDescartamos la C: La hidromorfona conserva el puente éter 4,5 intacto y tiene una cetona en C6.\n\nReferencia: Apuntes, Relaciones estructura–actividad (SAR) de la morfina."
  },
  {
    id: "t06-m3-q10",
    topicId: "tema-06",
    block: "Síntesis · Oripavinas",
    badge: "Modelo 3 · P10 · Síntesis · Oripavinas",
    question: "¿Qué condiciones se emplean comúnmente en la etapa final de obtención de buprenorfina para liberar el fenol C3-OH?",
    options: [
      { text: "Hidrogenólisis catalítica con paladio sobre carbón en disolución de metanol puro" },
      { text: "Reducción selectiva con borohidruro de sodio en disolución de metanol anhidro" },
      { text: "Tratamiento con hidróxido potásico en dietilenglicol a temperatura elevada" },
      { text: "Oxidación destructiva con permanganato potásico en medio sulfúrico concentrado" },
    ],
    correctIndex: 2,
    explanation: "La desmetilación del éter metílico aromático C3-OMe en las oripavinas avanzadas se logra mediante el tratamiento con hidróxido de potasio (KOH) en dietilenglicol a temperaturas elevadas (alrededor de 200–220 °C), rindiendo buprenorfina libre.\n\nDescartamos la A: Los éteres metílicos arílicos resisten la hidrogenólisis con Pd/C.\nDescartamos la B: El NaBH4 no rompe éteres metílicos aromáticos.\nDescartamos la D: El permanganato oxidaría y destruiría el esqueleto polifuncional de la buprenorfina.\n\nReferencia: Apuntes, Extensión sobre la cetona: adición organometálica de Grignard."
  },
  {
    id: "t06-m3-q11",
    topicId: "tema-06",
    block: "Bioquímica · Buprenorfina",
    badge: "Modelo 3 · P11 · Bioquímica · Buprenorfina",
    question: "¿Por qué las sobredosis por buprenorfina son difícilmente reversibles con las dosis clínicas habituales de naloxona?",
    options: [
      { text: "Presenta una constante de disociación (koff) extraordinariamente lenta de MOR" },
      { text: "Forma un enlace covalente irreversible con una cisteína del sitio activo de mu" },
      { text: "Inhibe a las enzimas que activan a la naloxona impidiendo su acción biológica" },
      { text: "Desplaza su mecanismo hacia el bloqueo de receptores GABA-A provocando coma" },
    ],
    correctIndex: 0,
    explanation: "La buprenorfina posee una afinidad subnanomolar por MOR y su voluminoso sustituyente tert-butilo en C7 crea un apantallamiento lipófilo en paraguas que retrasa la entrada de agua. Su disociación del receptor es extraordinariamente lenta (cinética pseudoirreversible), impidiendo que la naloxona a dosis estándar la desplace competitivamente.\n\nDescartamos la B: La unión es de naturaleza no covalente; su lentitud se debe al blindaje hidrofóbico estérico del grupo tert-butilo.\nDescartamos la C: La naloxona no requiere bioactivación; es un antagonista directo inalterado.\nDescartamos la D: La buprenorfina es un opioide altamente selectivo y carece de afinidad relevante por receptores GABA-A.\n\nReferencia: Apuntes, Etorfina, diprenorfina y buprenorfina."
  },
  {
    id: "t06-m3-q12",
    topicId: "tema-06",
    block: "SAR · Rigidez",
    badge: "Modelo 3 · P12 · SAR · Rigidez",
    question: "¿Qué características confieren a la etorfina una potencia miles de veces superior a la morfina?",
    options: [
      { text: "Un anillo de diazepina fusionado que activa selectivamente el receptor GABA-A" },
      { text: "El puente 6,14-endo-eteno y una cadena lipófila alifática voluminosa en C7" },
      { text: "Una carga permanente de amonio cuaternario que retiene al fármaco en sangre" },
      { text: "La ausencia de sustituyentes aromáticos combinada con la apertura del ciclo B" },
    ],
    correctIndex: 1,
    explanation: "La etorfina es un orvinol obtenido por cicloadición de Diels–Alder sobre tebaína. Posee el puente 6,14-endo-eteno rígido, el fenol C3 libre y un alcohol terciario en C7 portador de grupos metilo y n-propilo, logrando un ajuste hidrófobo casi perfecto y una potencia 1000–8000 veces superior a morfina.\n\nDescartamos la A: La etorfina es un opioide puro derivado de oripavina, sin relación con benzodiazepinas.\nDescartamos la C: La etorfina es una amina terciaria muy lipófila que penetra al encéfalo de inmediato.\nDescartamos la D: La etorfina conserva el fenol C3 aromático y una estructura pentacíclica rígida con puente eteno.\n\nReferencia: Apuntes, Etorfina, diprenorfina y buprenorfina."
  },
  {
    id: "t06-m3-q13",
    topicId: "tema-06",
    block: "Síntesis · Fiscalización",
    badge: "Modelo 3 · P13 · Síntesis · Fiscalización",
    question: "¿Qué dos intermedios químicos de la síntesis del fentanilo se encuentran estrictamente fiscalizados a nivel internacional?",
    options: [
      { text: "La anilina común pura y el cloruro de propionilo de uso general en polímeros" },
      { text: "El fenilacetonitrilo y la mostaza mecloretamina para formulación oncológica" },
      { text: "La tebaína natural y la oripavina extraídas directamente de la adormidera" },
      { text: "La 1-fenetil-4-piperidona (NPP) y la 4-anilino-N-fenetilpiperidina (4-ANPP)" },
    ],
    correctIndex: 3,
    explanation: "Para frenar la producción clandestina de fentanilo, los convenios internacionales y la Convención de la ONU fiscalizan en Lista I de precursores a la NPP (1-fenetil-4-piperidona) y a la 4-ANPP (despropionilfentanilo).\n\nDescartamos la A: La anilina y el cloruro de propionilo son reactivos químicos industriales no específicos de opioides.\nDescartamos la B: Estos reactivos corresponden a la síntesis de la petidina, no del fentanilo.\nDescartamos la C: La tebaína es un alcaloide de partida para oripavinas y oxicodona, pero no intermedio del fentanilo sintético.\n\nReferencia: Apuntes, La síntesis del fentanilo: aminación reductora."
  },
  {
    id: "t06-m3-q14",
    topicId: "tema-06",
    block: "Bioquímica · Novedades",
    badge: "Modelo 3 · P14 · Bioquímica · Novedades",
    question: "¿Qué hipótesis molecular fundamentó el diseño de la oliceridina como agonista sesgado en receptores mu?",
    options: [
      { text: "Activar la vía analgésica Gi minimizando el reclutamiento de beta-arrestina-2" },
      { text: "Promover la internalización por beta-arrestina suprimiendo la activación de Gi" },
      { text: "Bloquear la conductancia de cloruro en las sinapsis espinales inhibitorias" },
      { text: "Inducir la degradación lisosomal selectiva del receptor mu en tejido adiposo" },
    ],
    correctIndex: 0,
    explanation: "La oliceridina se concibió bajo la hipótesis de que la vía de la proteína Gi media la analgesia, mientras que el reclutamiento de beta-arrestina-2 es el causante de la depresión respiratoria, tolerancia y estreñimiento. El ligando activa preferencialmente la proteína G, aunque en ensayos clínicos humanos la ganancia en ventana terapéutica fue modesta.\n\nDescartamos la B: La vía de la proteína Gi es la mediadora directa de la analgesia opioide.\nDescartamos la C: La oliceridina no actúa sobre canales de cloruro.\nDescartamos la D: El diseño de la oliceridina buscaba señalización sesgada intracelular funcional, no proteólisis lisosomal.\n\nReferencia: Apuntes, Situación regulatoria de los principales fármacos citados."
  },
  {
    id: "t06-m3-q15",
    topicId: "tema-06",
    block: "Bioquímica · Novedades",
    badge: "Modelo 3 · P15 · Bioquímica · Novedades",
    question: "¿Por qué la suzetrigina (VX-548) es un analgésico eficaz en dolor agudo que carece por completo de potencial de abuso o depresión respiratoria?",
    options: [
      { text: "Es un antagonista selectivo de receptores cannabinoides CB1 en el hipotálamo" },
      { text: "Bloquea selectivamente el canal NaV1.8 de nociceptores periféricos sin tocar MOR" },
      { text: "Inhibe de forma irreversible la ciclooxigenasa COX-2 por acetilación serínica" },
      { text: "Bloquea el canal central del receptor NMDA impidiendo la transmisión por glutamato" },
    ],
    correctIndex: 1,
    explanation: "La suzetrigina (aprobada por la FDA en enero de 2025) es un bloqueante alostérico selectivo del canal de sodio dependiente de voltaje NaV1.8, expresado casi exclusivamente en neuronas nociceptivas periféricas del ganglio de la raíz dorsal. Al frenar los potenciales de acción del dolor sin unirse a ningún receptor opioide, carece por completo de riesgo adictivo o depresión respiratoria.\n\nDescartamos la A: La suzetrigina no tiene actividad sobre el sistema endocannabinoide.\nDescartamos la C: Ese mecanismo corresponde a los AINE, no a los bloqueantes selectivos de canales de sodio.\nDescartamos la D: La suzetrigina actúa periféricamente sobre canales de sodio y no sobre receptores NMDA.\n\nReferencia: Apuntes, Situación regulatoria de los principales fármacos citados."
  }
];
