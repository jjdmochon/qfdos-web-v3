// Modelo D, tema 6. Datos estáticos en el formato de los Modelos 1-3.
import type { TestQuestion } from './qfdosData';

export const TEMA6_MODELO_4_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t06-mD-q01",
    topicId: "tema-06",
    block: "SAR",
    badge: "Modelo D · P1 · SAR",
    question: "En la arquitectura pentacíclica natural de la (−)-morfina, ¿qué conjunto de centros estereogénicos y disposición de anillos determina la conformación tridimensional en «T» requerida por el receptor?",
    options: [
      {
        text: "Cuatro centros quirales, anillos A–D coplanares y puente etanoamina dispuesto en forma plana",
      },
      {
        text: "Cinco centros quirales, anillos A–C casi planos y puente etanoamina perpendicular en «T»",
      },
      {
        text: "Cuatro centros quirales, anillos B–E coplanares y anillo aromático A perpendicular en «T»",
      },
      {
        text: "Cinco centros quirales, anillos C–E coplanares y puente furánico dispuesto hacia atrás en «T»",
      },
    ],
    correctIndex: 1,
    explanation: "La (−)-morfina natural contiene cinco centros estereogénicos (C5, C6, C9, C13 y C14). Sus anillos A, B y C quedan aproximadamente en un plano mientras el puente etanoamina (anillo E, piperidina según Campos-Rosa) se proyecta perpendicularmente formando una «T» que posiciona el fenol C3 y el nitrógeno N17 en la geometría exacta requerida por el receptor.\n\nDescartamos la A porque reduce erróneamente los estereocentros a cuatro y describe una geometría plana incompatible con el eje perpendicular de la «T», la C porque reduce los estereocentros a cuatro y atribuye el giro perpendicular al anillo bencénico A en lugar del puente etanoamina y la D porque considera coplanares los anillos C–E cuando el puente etanoamina (E) se proyecta perpendicularmente sobre el plano A–B–C.",
    difficulty: "Fácil",
  },
  {
    id: "t06-mD-q02",
    topicId: "tema-06",
    block: "SAR",
    badge: "Modelo D · P2 · SAR",
    question: "Un agonista mu semisintético hidrogenado en el anillo C incorpora un punto adicional de enlace de hidrógeno que favorece la conformación activa y mantiene analgesia plena en metabolizadores lentos de CYP2D6 sin requerir bioactivación hepática. ¿Cuál de las siguientes estructuras corresponde a ese fármaco?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-06/tema06_mD_p02_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-06/tema06_mD_p02_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-06/tema06_mD_p02_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-06/tema06_mD_p02_op_d.png",
      },
    ],
    correctIndex: 3,
    explanation: "Se resuelve sobre la imagen: mantener analgesia plena sin CYP2D6 exige fenol libre en C3 capaz de interaccionar con His297, mientras incorporar el 14β-OH adicional sobre anillo C saturado (7,8-dihidro) con cetona en C6 selecciona la oximorfona (D).\n\nDescartamos la A porque es la dihidromorfina: tiene C3-OH libre y enlace 7–8 saturado, pero carece del grupo 14β-OH y conserva alcohol secundario en C6, la B porque es la hidromorfona: posee C3-OH libre y cetona en C6, pero tampoco incorpora el sustituyente 14β-OH y la C porque es la oxicodona: incorpora 14β-OH y cetona C6=O, pero tiene metilado el fenol en C3 (3-OMe), comportándose como profármaco dependiente de CYP2D6.",
    difficulty: "Medio",
  },
  {
    id: "t06-mD-q03",
    topicId: "tema-06",
    block: "Bio/Metab",
    badge: "Modelo D · P3 · Bio/Metab",
    question: "La diamorfina (3,6-diacetilmorfina) penetra rápido en el cerebro por su elevada lipofilia. Si por hipótesis las esterasas cerebrales hidrolizaran primero el éster alílico en C6 dejando intacto el éster fenólico en C3, ¿qué pasaría con la interacción en el receptor opioide mu y con la potencia intrínseca de ese primer metabolito?",
    options: [
      {
        text: "El fenol C3 sigue bloqueado sin enlace a His297 y mantiene afinidad directa muy baja",
      },
      {
        text: "El fenol C3 sigue bloqueado sin enlace a His297 pero cuadruplica la potencia en el SNC",
      },
      {
        text: "El alcohol C6 libre forma enlace con His297 y cuadruplica la potencia respecto a morfina",
      },
      {
        text: "El alcohol C6 libre bloquea el puente salino con Asp147 y anula la unión hasta perder C3",
      },
    ],
    correctIndex: 0,
    explanation: "Se resuelve en tres pasos según el temario: (1) al hidrolizarse primero C6 conservando el acetilo en C3, se formaría 3-acetilmorfina (no 6-acetilmorfina); (2) según el SAR del fenol C3, todo enmascaramiento de C3–OH impide formar el enlace de hidrógeno crítico con His297; y (3) al contrario que la 6-acetilmorfina real (que deja C3–OH libre y cuadruplica potencia), ese metabolito hipotético mantendría una afinidad directa muy baja actuando como profármaco hasta hidrolizar C3.\n\nDescartamos la B porque identifica bien que C3 sigue bloqueado frente a His297, pero le asigna la potencia cuádruple propia únicamente de la 6-acetilmorfina real (con fenol libre), la C porque atribuye al hidroxilo alílico C6 la función farmacofórica de His297, cuando C6–OH no es el grupo esencial con His297 sino un modulador de lipofilia y la D porque el puente salino con Asp147 depende del nitrógeno N17 protonado, no queda bloqueado por liberar C6–OH.",
    difficulty: "Avanzado",
  },
  {
    id: "t06-mD-q04",
    topicId: "tema-06",
    block: "SAR",
    badge: "Modelo D · P4 · SAR",
    question: "En la serie de derivados N-sustituidos de la normorfina, ¿por qué alargar la cadena hasta N-butilo suprime la actividad analgésica mientras la introducción del sustituyente N-fenetilo incrementa catorce veces la potencia respecto a la morfina?",
    options: [
      {
        text: "El resto butilo deslocaliza el par solitario nitrogenado y el fenetilo orienta el anillo hacia el sitio antagonista",
      },
      {
        text: "El resto butilo impide protonarse al nitrógeno básico y el fenetilo forma enlace covalente con un residuo próximo",
      },
      {
        text: "El resto butilo marca el punto de afinidad nula y el fenetilo proyecta su arilo a un bolsillo hidrófobo extra",
      },
      {
        text: "El resto butilo sufre O-desalquilación instantánea y el fenetilo aporta un segundo grupo dador para la histidina",
      },
    ],
    correctIndex: 2,
    explanation: "En el SAR del nitrógeno, el paso de metilo a etilo y propilo reduce la analgesia hasta anularse por completo en N-butilo (punto de inflexión de afinidad). Al introducir un N-fenetilo (-CH2CH2-Ph), la cadena de dos carbonos proyecta el anillo aromático terminal exactamente hacia un bolsillo hidrófobo accesorio del receptor y multiplica 14 veces la potencia respecto a la morfina.\n\nDescartamos la A porque ni el grupo butilo conjuga el par libre del nitrógeno (solo el vinilo lo deslocaliza en enamina) ni el fenetilo es antagonista, la B porque el butilo alquílico conserva la basicidad de amina terciaria y el fenetilo establece interacciones hidrófobas reversibles, no enlaces covalentes y la D porque no existe enlace éter para O-desalquilación en un grupo N-butilo ni el anillo bencénico terminal aporta un grupo dador de puente de hidrógeno para His297.",
    difficulty: "Medio",
  },
  {
    id: "t06-mD-q05",
    topicId: "tema-06",
    block: "SAR",
    badge: "Modelo D · P5 · SAR",
    question: "Al evaluar análogos simplificados carentes del puente éter C4–O–C5, un compuesto actúa como antagonista de los receptores mu, antídoto de los efectos de la morfina, sin perder el anillo ciclohexénico C ni su capacidad de interacción fenólica directa. ¿Qué estructura presenta ese perfil?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-06/tema06_mD_p05_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-06/tema06_mD_p05_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-06/tema06_mD_p05_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-06/tema06_mD_p05_op_d.png",
      },
    ],
    correctIndex: 1,
    explanation: "Perder el puente éter C4–O–C5 conservando el anillo C selecciona los morfinanos (A, B, C); exigir fenol libre C3 en serie (−) y antagonismo mu (antídoto de la morfina) fija el sustituyente N-alilo del levalorfano (B).\n\nDescartamos la A porque es el levorfanol: morfinano tetracíclico con 3-OH libre y serie (−), pero lleva N-metilo y actúa como agonista mu cinco veces más potente que la morfina, la C porque es el dextrometorfano: pertenece a la serie (+) dextrógira con metoxilo 3-OMe y N-metilo; carece de analgesia opioide y actúa como antitusígeno y antagonista NMDA y la D porque es la pentazocina: es un 6,7-benzomorfano tricíclico que ha perdido también el anillo ciclohexénico C y lleva N-prenilo.",
    difficulty: "Medio",
  },
  {
    id: "t06-mD-q06",
    topicId: "tema-06",
    block: "SAR",
    badge: "Modelo D · P6 · SAR",
    question: "En la nomenclatura sistemática IUPAC aplicada al esqueleto de los 6,7-benzomorfanos, ¿qué regla topológica determina la asignación numérica de la fusión aromática?",
    options: [
      {
        text: "Arranca en el fenol aromático como C1, cruza el anillo bencénico y asigna C6–C7 al nitrógeno básico",
      },
      {
        text: "Comienza en el carbono cuaternario central como C1, sigue el éter furánico y numera el benceno en C4–C5",
      },
      {
        text: "Parte del carbono aromático orto al puente metilénico, rodea la piperidina y fija el arilo en C6–C7",
      },
      {
        text: "Parte de una cabeza de puente en C1, pasa por el nitrógeno en C2 hasta C5 y fusiona el arilo en C6–C7",
      },
    ],
    correctIndex: 3,
    explanation: "El esqueleto de morfano es un biciclo [3.3.1] con nitrógeno. Por convención IUPAC, la numeración se inicia en una de las cabezas de puente (C1), recorre la cadena más larga pasando por el nitrógeno (C2) hasta la segunda cabeza de puente (C5) y deja la fusión del anillo bencénico aromático en las posiciones 6 y 7 (6,7-benzomorfanos).\n\nDescartamos la A porque inicia erróneamente la numeración en el carbono fenólico y relega el nitrógeno a las posiciones C6–C7, la B porque alude al puente furánico, ausente en los benzomorfanos tricíclicos y la C porque inicia la numeración sobre el anillo aromático en vez de partir de la cabeza de puente alicíclica del sistema bicíclico.",
    difficulty: "Medio",
  },
  {
    id: "t06-mD-q07",
    topicId: "tema-06",
    block: "Bio/Metab",
    badge: "Modelo D · P7 · Bio/Metab",
    question: "Un analgésico opioide sintético combina en una única entidad molecular actividad agonista mu directa e inhibición de la recaptación de noradrenalina, sin depender de bioactivación por CYP2D6. ¿Cuál de las siguientes estructuras corresponde a ese fármaco?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-06/tema06_mD_p07_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-06/tema06_mD_p07_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-06/tema06_mD_p07_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-06/tema06_mD_p07_op_d.png",
      },
    ],
    correctIndex: 0,
    explanation: "Según el temario, el tapentadol (A) incorpora directamente un fenol libre en posición meta y una cadena aminada abierta que le permiten actuar simultáneamente como agonista mu directo e inhibidor de la recaptación de noradrenalina sin requerir O-desmetilación previa por CYP2D6.\n\nDescartamos la B porque es el tramadol: aminociclohexanol metoxilado (3-OMe) que se comporta como profármaco parcial y depende de CYP2D6 para formar el metabolito M1, la C porque es la metadona: difenilpropilamina acíclica sin fenol libre que actúa como agonista mu y antagonista NMDA, sin mecanismo dual de recaptación monoaminérgica y la D porque es la cetobemidona: 4-fenilpiperidina con cetona y fenol meta que actúa como agonista opioide mu clásico sin inhibir la recaptación de noradrenalina.",
    difficulty: "Medio",
  },
  {
    id: "t06-mD-q08",
    topicId: "tema-06",
    block: "Síntesis",
    badge: "Modelo D · P8 · Síntesis",
    question: "En la ruta sintética de la cetobemidona se parte del 3-metoxifenilacetonitrilo antes de ciclar con NaNH2 y mecloretamina. Si se utilizara directamente 3-hidroxifenilacetonitrilo con el fenol libre en ese paso inicial, ¿qué ocurriría con la base y qué consecuencia tendría sobre el producto obtenido?",
    imagePath: "estructuras/tema-06/tema06_mD_p08_enun.png",
    options: [
      {
        text: "NaNH2 desprotona solo el carbono alfa y el grupo fenol libre acelera el cierre del anillo de piperidina",
      },
      {
        text: "NaNH2 reduce el nitrilo a amina primaria y el grupo fenol libre impide la adición del reactivo EtMgBr",
      },
      {
        text: "NaNH2 desprotona el fenol ácido y el fenolato compite como nucleófilo generando productos O-alquilados",
      },
      {
        text: "NaNH2 forma un complejo estable con el fenol que impide abrir el ion aziridinio y detiene la ciclación",
      },
    ],
    correctIndex: 2,
    explanation: "Se resuelve en tres pasos: (1) si no se enmascara el fenol como éter metílico, el hidroxilo ácido del 3-hidroxifenilacetonitrilo es desprotonado por NaNH2 compitiendo con el carbono α del nitrilo; (2) el anión fenolato formado actúa como nucleófilo competidor frente al ion aziridinio de la mecloretamina; (3) se obtienen productos indeseados de O-alquilación en lugar de cerrarse selectivamente la 4-aril-4-cianopiperidina.\n\nDescartamos la A porque el fenol ácido reacciona con la base fuerte NaNH2 en lugar de permanecer neutro ni acelerar el cierre piperidínico, la B porque NaNH2 actúa como base no reductora frente al nitrilo en esta etapa y la adición de EtMgBr ocurre más adelante en la ruta y la D porque la mostaza forma el ion aziridinio internamente en presencia de base y sufre el ataque competitivo del fenolato hacia O-alquilación.",
    difficulty: "Avanzado",
  },
  {
    id: "t06-mD-q09",
    topicId: "tema-06",
    block: "Síntesis",
    badge: "Modelo D · P9 · Síntesis",
    question: "En la síntesis de la etorfina a partir de tebaína (tras la cicloadición [4+2] con metilvinilcetona y la adición diastereoselectiva de n-PrMgBr sobre la cetona intermedia), si se omite el tratamiento final con KOH en dietilenglicol a alta temperatura, ¿qué grupo funcional queda sin transformar en el anillo A y qué efecto inmediato tiene sobre el receptor mu?",
    imagePath: "estructuras/tema-06/tema06_mD_p09_enun.png",
    options: [
      {
        text: "Permanece el alcohol terciario C20 sin deshidratar y se pierde el puente salino con Asp147",
      },
      {
        text: "Permanece el éter fenólico 3-OMe y eleva la afinidad directa al aumentar la lipofilia BHE",
      },
      {
        text: "Permanece la cetona C20 sin reducir y bloquea el apilamiento hidrófobo del anillo aromático",
      },
      {
        text: "Permanece el éter 3-OMe sin enlace a His297 y cae la afinidad directa como profármaco",
      },
    ],
    correctIndex: 3,
    explanation: "Se resuelve en tres pasos según el temario: (1) la tebaína parte con el fenol metilado (3-OMe) y tanto el aducto tevinona como el alcohol terciario C20 tras n-PrMgBr conservan ese metoxilo intacto; (2) el paso forzado con KOH en dietilenglicol a alta temperatura realiza precisamente la O-desmetilación fenólica hacia el orvinol libre (etorfina); y (3) al omitir dicha etapa permanece bloqueado el 3-OMe, impidiendo el enlace de hidrógeno con His297 y cayendo drásticamente la afinidad directa (comportamiento de profármaco como la codeína).\n\nDescartamos la A porque el alcohol terciario C20 producido tras Grignard sobre la tevinona no se deshidrata en la etapa con KOH, ni afecta al nitrógeno básico N17 unido a Asp147, la B porque acierta en que permanece el grupo 3-OMe, pero invierte el efecto sobre el receptor: enmascarar el fenol C3 hunde la afinidad intrínseca directa en lugar de aumentarla y la C porque la cetona ya había sido convertida previamente en alcohol terciario C20 por adición de n-PrMgBr (además el anillo A no pierde el apilamiento hidrófobo por conservar un metoxilo).",
    difficulty: "Avanzado",
  },
  {
    id: "t06-mD-q10",
    topicId: "tema-06",
    block: "Síntesis",
    badge: "Modelo D · P10 · Síntesis",
    question: "Un derivado rígido con puente bicíclico entre C6 y C14, obtenido tras el tratamiento final con KOH en dietilenglicol a alta temperatura, actúa en clínica como agonista parcial mu con efecto techo para la depresión respiratoria y antagonista kappa. ¿Qué estructura corresponde a este fármaco?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-06/tema06_mD_p10_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-06/tema06_mD_p10_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-06/tema06_mD_p10_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-06/tema06_mD_p10_op_d.png",
      },
    ],
    correctIndex: 1,
    explanation: "Reconocimiento estructural tras dos filtros: identificar el perfil clínico de la buprenorfina (N-ciclopropilmetilo + terc-butilo en C20) y verificar que el tratamiento final KOH/dietilenglicol ha liberado el fenol 3-OH frente al intermedio 3-OMe (C).\n\nDescartamos la A porque conserva el grupo metoxilo 3-OMe sin desmetilar y lleva N-metilo en lugar de N-ciclopropilmetilo, la C porque es la 3-O-metilbuprenorfina, intermedio previo que todavía mantiene protegido el éter fenólico 3-OMe antes del tratamiento con KOH en dietilenglicol y la D porque es la diprenorfina: aunque posee 3-OH libre y N-ciclopropilmetilo, lleva dos metilos en C20 (-C(OH)Me2) en lugar de terc-butilo y actúa como antagonista veterinario de la etorfina.",
    difficulty: "Medio",
  },
  {
    id: "t06-mD-q11",
    topicId: "tema-06",
    block: "Síntesis",
    badge: "Modelo D · P11 · Síntesis",
    question: "En la estrategia de rigidización molecular para obtener la cetona intermedia de los compuestos de Bentley (orvinoles), un químico intenta reemplazar la tebaína por codeína (ambas con el grupo 3-OMe) y calentarla con metilvinilcetona. ¿Qué limitación estructural presenta el sustituto y qué consecuencia tiene sobre la construcción del esqueleto?",
    imagePath: "estructuras/tema-06/tema06_mD_p11_enun.png",
    options: [
      {
        text: "Carece del dieno conjugado en C, impide la [4+2] y no forma el puente 6,14-endo-eteno",
      },
      {
        text: "Su éter 3-OMe desactiva el anillo C, impide la [4+2] y obliga a usar morfina sin metilar",
      },
      {
        text: "Su alqueno C7=C8 basta para la [4+2] pero el C6-OH impide el paso posterior de Grignard",
      },
      {
        text: "Su alqueno C7=C8 cierra la [4+2] dando el puente 6,14-endo-eteno pero sin cetona en C20",
      },
    ],
    correctIndex: 0,
    explanation: "Se resuelve en tres pasos según el temario: (1) aunque la codeína comparte el éter metílico 3-OMe con la tebaína, su anillo ciclohexénico C solo presenta un doble enlace aislado (C7=C8 junto a C6–OH), careciendo del dieno conjugado (C6=C7 y C8=C14) exclusivo de la tebaína; (2) la cicloadición [4+2] de Diels–Alder con la metilvinilcetona requiere 4 electrones π conjugados en el dieno frente a los 2 electrones π del dienófilo; y (3) al faltar el dieno conjugado fracasa la cicloadición [4+2] y no se forma el puente bicíclico rígido 6,14-endo-eteno ni la cetona tevinona necesaria para los orvinoles.\n\nDescartamos la B porque la propia tebaína también posee el éter fenólico 3-OMe en el anillo A (no desactiva al anillo C ni impide la Diels–Alder), la C porque un único enlace doble aislado C7=C8 aporta solo 2 electrones π y no puede experimentar cicloadición [4+2] con la metilvinilcetona y la D porque sin sistema diénico conjugado en C no hay cicloadición [4+2] capaz de construir el puente 6,14-endo-eteno.",
    difficulty: "Avanzado",
  },
  {
    id: "t06-mD-q12",
    topicId: "tema-06",
    block: "Bio/Metab",
    badge: "Modelo D · P12 · Bio/Metab",
    question: "Para proteger a la Met-encefalina frente a las peptidasas plasmáticas que escinden el enlace Tyr1–Gly2, un diseñador propone sustituir la L-tirosina N-terminal (Tyr1) por D-tirosina (D-Tyr1) en vez de reemplazar Gly2 por D-Ala2. ¿Cómo afectaría ese cambio a la proteólisis enzimática y a la unión sobre el receptor mu?",
    options: [
      {
        text: "Frena la hidrólisis L-estereoespecífica y conserva intacta la unión de Tyr1 con His297 y Asp147",
      },
      {
        text: "Acelera la hidrólisis por aminopeptidasas pero refuerza el anclaje del fenol sobre His297 y Asp147",
      },
      {
        text: "Frena la hidrólisis L-estereoespecífica pero desorienta el farmacóforo Tyr1 cayendo afinidad mu",
      },
      {
        text: "Acelera la hidrólisis por aminopeptidasas y desorienta el anillo de Phe4 perdiendo afinidad mu",
      },
    ],
    correctIndex: 2,
    explanation: "Se resuelve en tres pasos según el temario: (1) dado que las peptidasas plasmáticas son estereoespecíficas para enlaces entre L-aminoácidos (S), reemplazar L-Tyr1 por D-Tyr1 frena la hidrólisis del enlace Tyr1–Gly2; (2) sin embargo, L-Tyr1 aporta directamente el fenol para y la amina α protonada que mimetizan los centros quirales de la (-)-morfina frente a His297 y Asp147; y (3) al invertir la configuración de Tyr1, su proyección tridimensional deja de coincidir con el sitio activo mu cayendo la afinidad (razón por la cual la estabilización útil se hace en posición 2 con D-Ala2, manteniendo intacta L-Tyr1).\n\nDescartamos la A porque predice bien la resistencia proteolítica, pero ignora la estricta enantioselectividad del farmacóforo N-terminal Tyr1 frente a His297/Asp147, la B porque erróneo en ambos pasos: las aminopeptidasas no aceleran sobre un D-aminoácido N-terminal ni la inversión quiral mejora el anclaje en His297/Asp147 y la D porque invierte el efecto proteolítico de los D-aminoácidos y desplaza el fallo conformacional desde Tyr1 hacia Phe4.",
    difficulty: "Avanzado",
  },
  {
    id: "t06-mD-q13",
    topicId: "tema-06",
    block: "Síntesis",
    badge: "Modelo D · P13 · Síntesis",
    question: "En la ruta sintética del fentanilo a partir de 1-fenetilpiperidin-4-ona y anilina en catálisis ácida (p-TsOH), seguida de tratamiento con triacetoxiborohidruro sódico, ¿qué especie se aísla inmediatamente antes de incorporar el fragmento acilo de tres carbonos?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-06/tema06_mD_p13_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-06/tema06_mD_p13_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-06/tema06_mD_p13_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-06/tema06_mD_p13_op_d.png",
      },
    ],
    correctIndex: 3,
    explanation: "En la ruta del fentanilo, la condensación ácida entre 1-fenetilpiperidin-4-ona (A) y anilina forma una imina (B), cuya reducción selectiva con NaBH(OAc)3 o NaBH4 rinde la amina secundaria estable 4-ANPP (4-anilino-N-fenetilpiperidina, D) evitando la polialquilación; el paso posterior con cloruro de propanoílo añade el resto acilo de tres carbonos para obtener el fentanilo (C).\n\nDescartamos la A porque es el sustrato cetónico inicial previo a la condensación con la anilina, la B porque es la base de Schiff intermedia formada antes de la reducción selectiva del doble enlace C=N con hidruro y la C porque es el producto final ya acilado (fentanilo) tras hacer reaccionar el intermedio secundario con cloruro de propanoílo.",
    difficulty: "Medio",
  },
  {
    id: "t06-mD-q14",
    topicId: "tema-06",
    block: "Bio/Metab",
    badge: "Modelo D · P14 · Bio/Metab",
    question: "La difelikefalina y la pentazocina actúan ambas como agonistas de los receptores opioides kappa (KOP), pero la difelikefalina evita tanto la rápida hidrólisis plasmática propia de las encefalinas como la disforia central característica de la pentazocina. ¿Qué par de rasgos estructurales explica esa doble ventaja?",
    options: [
      {
        text: "Integra solo D-aminoácidos resistentes a proteasas y su polaridad impide cruzar la BHE",
      },
      {
        text: "Integra solo L-aminoácidos estables en plasma y su carga cuaternaria impide cruzar la BHE",
      },
      {
        text: "Integra solo D-aminoácidos resistentes a proteasas y bloquea receptores mu en el encéfalo",
      },
      {
        text: "Integra una cadena PEG sobre morfina y bloquea selectivamente canales NaV1.8 periféricos",
      },
    ],
    correctIndex: 0,
    explanation: "Según el temario, la difelikefalina es un tetrapéptido sintético compuesto íntegramente por D-aminoácidos [D-Phe–D-Phe–D-Leu–D-Lys] unido a un derivado de morfolina: su configuración D impide el reconocimiento estereoespecífico de las proteasas plasmáticas, mientras que su elevada polaridad peptídica le impide atravesar la BHE, actuando de forma exclusivamente periférica sobre KOP sin provocar disforia central.\n\nDescartamos la B porque si estuviera formado por L-aminoácidos sería degradado rápidamente por peptidasas plasmáticas, y además no es un amonio cuaternario permanente (ese rasgo corresponde a la metilnaltrexona), la C porque precisamente al no atravesar la BHE no actúa en el encéfalo ni bloquea receptores mu centrales y la D porque la pegilación corresponde al PAMORA naloxegol y el bloqueo selectivo periférico de canales NaV1.8 corresponde a la suzetrigina.",
    difficulty: "Medio",
  },
  {
    id: "t06-mD-q15",
    topicId: "tema-06",
    block: "Bio/Metab",
    badge: "Modelo D · P15 · Bio/Metab",
    question: "Los receptores opioides MOP, DOP, KOP y NOP pertenecen a la familia de receptores acoplados a proteínas Gi/o. ¿Qué cascada efectora intracelular desencadena de forma característica su activación por un agonista?",
    options: [
      {
        text: "Estimulan la adenilil ciclasa, abren canales de calcio presinápticos y cierran canales de potasio",
      },
      {
        text: "Inhiben la adenilil ciclasa, cierran canales de calcio presinápticos y abren canales de potasio",
      },
      {
        text: "Activan fosfolipasa C mediante Gq, elevan IP3 y despolarizan la membrana neuronal postsináptica",
      },
      {
        text: "Abren canales de sodio dependientes de voltaje NaV1.8 periféricos e inhiben canales de cloruro",
      },
    ],
    correctIndex: 1,
    explanation: "Todos los receptores opioides (MOP, DOP, KOP, NOP) están acoplados a proteínas inhibitorias Gi/o cuya activación inhibe la adenilil ciclasa, cierra canales de Ca2+ presinápticos y abre canales de K+ postsinápticos (hiperpolarización e inhibición de la transmisión nociceptiva).\n\nDescartamos la A porque invierte por completo las tres respuestas hacia el perfil activador típico de proteínas Gs, la C porque describe el acoplamiento a Gq/fosfolipasa C (característico de receptores como H1 o 5-HT2A, no de opioides Gi/o) y la D porque los canales periféricos NaV1.8 son bloqueados por el analgésico no opioide suzetrigina, no abiertos por agonistas opioides.",
    difficulty: "Fácil",
  },
];
