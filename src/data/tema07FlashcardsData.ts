// ==========================================================================
// QFDOS - Flashcards Tema 07: Sistema histaminérgico (antihistamínicos H1 y antagonistas H2)
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Total tarjetas: 34 (revisadas por el profesor)
// ==========================================================================

import type { Flashcard } from './qfdosData';

export const TEMA7_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-07-01",
    topicId: 'tema-07',
    concept: "Tautomería de la histamina: Nτ-H y Nπ-H",
    front: "¿Qué diferencia hay entre tautomería y resonancia, y cómo se distinguen los tautómeros Nτ-H y Nπ-H de la histamina?",
    back: "En la **resonancia** solo se mueven electrones y hay una única molécula. En la **tautomería** migra un átomo (el H) y hay dos moléculas distintas en equilibrio.\n\nEn el imidazol de la histamina, el N que lleva el H se numera N1. En el **tautómero Nτ-H** (N-tau, de *tele*) el H está en el nitrógeno más alejado de la cadena lateral y la cadena queda en C4. En el **tautómero Nπ-H** (N-pi, de *pros*) el H está en el nitrógeno más cercano a la cadena y la cadena queda en C5. A pH 7,4 la histamina es un catión (amina protonada) y predomina el tautómero Nτ-H, probablemente la especie activa en H₁ y H₂ (Durant, Ganellin y Parsons, 1975).",
    structures: [{ name: "Histamina, tautómero Nτ-H", imagePath: "estructuras/tema-07/QFDOS-376_histamina_tautomero_n_h.png", badge: "Nτ-H · cadena en C4" }, { name: "Histamina, tautómero Nπ-H", imagePath: "estructuras/tema-07/QFDOS-377_histamina_tautomero_n_h.png", badge: "Nπ-H · cadena en C5" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-02",
    topicId: 'tema-07',
    concept: "4(5)-Metilimidazol frente a 1-metilimidazol",
    front: "¿Por qué el 4(5)-metilimidazol es una mezcla de dos compuestos y el 1-metilimidazol uno solo?",
    back: "En el **4(5)-metilimidazol** queda un N–H libre que migra entre N1 y N3: son dos tautómeros en equilibrio y por eso se usa el doble localizador **4(5)**. En el **1-metilimidazol** el metilo ocupa el nitrógeno N1: no hay protón que migre y existe una sola especie. Es una pregunta frecuente de reconocimiento.",
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-03",
    topicId: 'tema-07',
    concept: "Biosíntesis y almacenamiento de la histamina",
    front: "¿Cómo se forma la histamina, dónde se almacena y qué la retiene en los gránulos?",
    back: "Se forma por **descarboxilación de la L-histidina** con la **histidina descarboxilasa**, que usa **fosfato de piridoxal (PLP)** y una base de Schiff, igual que la serotonina y las catecolaminas. Se produce sobre todo en **mastocitos** y **basófilos**, y también en neuronas histaminérgicas.\n\nEn los gránulos queda retenida por la **heparina**, un polisacárido sulfatado muy aniónico (ácido glucurónico y glucosamina con O- y N-sulfatos, enlace α(1→4)): la histamina catiónica se une por fuerzas iónicas. Como fármaco, la heparina es anticoagulante porque actúa sobre la antitrombina III.",
    structures: [{ name: "L-Histidina", imagePath: "estructuras/tema-07/QFDOS-378_l_histidina.png", badge: "Sustrato" }, { name: "Histamina", imagePath: "estructuras/tema-07/QFDOS-375_histamina.png", badge: "Producto" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-04",
    topicId: 'tema-07',
    concept: "Los cuatro receptores de histamina",
    front: "¿Cuál es la proteína G, la localización y la diana terapéutica de cada receptor de histamina?",
    back: "- **H₁** (1966, Gq): piel, mucosas, músculo liso y vasos. Contrae el músculo liso y aumenta la permeabilidad capilar: alergia. Diana de los antialérgicos.\n- **H₂** (Black, 1972, Gs): célula parietal. Sube el AMPc y con él la secreción de HCl. Diana de los antiulcerosos.\n- **H₃** (1983, Gi/o): autorreceptor presináptico del SNC. Su agonista inverso, el pitolisant, se usa en la narcolepsia.\n- **H₄** (2000, Oda y Nakamura; Gi/o): células hematopoyéticas e inmunitarias. En investigación como diana antiinflamatoria.",
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-05",
    topicId: 'tema-07',
    concept: "Farmacóforo de los AH₁ y sus tres familias",
    front: "¿Cuáles son los cuatro elementos del farmacóforo de un antihistamínico H₁ clásico y cómo se clasifican según el átomo X?",
    back: "Dos anillos **Ar y Ar′** (uno puede ser heterociclo), un **átomo de conexión X**, una cadena **(CH₂)n** y una **amina terciaria básica**. Los arilos y la amina están separados por unos 5–6 Å: los arilos se apilan por π–π y la amina protonada hace el enlace iónico con el Asp del receptor.\n\n- **X = O**: ariloxietilaminas (éteres de aminoalquilo): difenhidramina.\n- **X = N**: etilendiaminas: tripelenamina.\n- **X = C**: propilaminas: clorfenamina.",
    structures: [{ name: "Difenhidramina", imagePath: "estructuras/tema-07/QFDOS-379_difenhidramina.png", badge: "X = O" }, { name: "Tripelenamina", imagePath: "estructuras/tema-07/QFDOS-381_tripelenamina.png", badge: "X = N" }, { name: "Clorfenamina", imagePath: "estructuras/tema-07/QFDOS-382_clorfenamina.png", badge: "X = C" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-06",
    topicId: 'tema-07',
    concept: "Del piperoxano a la difenhidramina",
    front: "¿Cómo se pasó de un bloqueante α-adrenérgico al primer éter de aminoalquilo con utilidad antihistamínica?",
    back: "El **piperoxano**, un bloqueante α-adrenérgico con anillo de benzodioxano, protegía a los animales del **broncoespasmo por histamina**. Su rasgo común es **Ar–O–CH₂CH₂–NR₂** (ariloxietilamina). Se investigaron entonces los éteres de aminoalquilo alquilando fenoles baratos como el carvacrol y el timol (terpenos del tomillo y el orégano). En 1946 se introdujo la **difenhidramina**.",
    structures: [{ name: "Piperoxano", imagePath: "estructuras/tema-07/QFDOS-476_piperoxano.png", badge: "Piperoxano" }, { name: "Difenhidramina", imagePath: "estructuras/tema-07/QFDOS-379_difenhidramina.png", badge: "Difenhidramina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-07",
    topicId: 'tema-07',
    concept: "Dimenhidrinato: la sal con 8-cloroteofilina",
    front: "¿Qué es el dimenhidrinato y por qué se asocia la difenhidramina con 8-cloroteofilina?",
    back: "El **dimenhidrinato** (Biodramina) es la **sal de difenhidramina con 8-cloroteofilina**. La xantina, estimulante, **compensa en parte la sedación** de la difenhidramina, y la sal se usa frente al **mareo por movimiento**.",
    structures: [{ name: "Difenhidramina", imagePath: "estructuras/tema-07/QFDOS-379_difenhidramina.png", badge: "Difenhidramina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-08",
    topicId: 'tema-07',
    concept: "Etilendiaminas: del O al N",
    front: "¿Qué cambios estructurales conducen de la fenbenzamina a la tripelenamina, la mepiramina y el metapirileno?",
    back: "Cambiar el O por N abrió las **etilendiaminas**: la **fenbenzamina** (1942) fue el primer AH₁ con utilidad clínica. Sustituir un fenilo por **2-piridilo** da la **tripelenamina**; usar p-metoxibenzaldehído da la **mepiramina**; cambiar el fenilo por **tiofeno (2-tienilmetilo)** da el **metapirileno** (retirado). Cuidado: el fenilo es C₆H₅– y el bencilo, C₆H₅CH₂–.",
    structures: [{ name: "Fenbenzamina", imagePath: "estructuras/tema-07/QFDOS-380_fenbenzamina.png", badge: "Fenbenzamina" }, { name: "Tripelenamina", imagePath: "estructuras/tema-07/QFDOS-381_tripelenamina.png", badge: "Tripelenamina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-09",
    topicId: 'tema-07',
    concept: "Clorfenamina: centro estereogénico y prioridades CIP",
    front: "¿Dónde está el estereocentro de la clorfenamina, qué enantiómero es el más potente y cuál es el orden CIP de sus sustituyentes?",
    back: "En las **propilaminas** el átomo X es un carbono, que es además el centro estereogénico. La **clorfenamina** se usa como racemato; el enantiómero dextrógiro **(S)-(+)** es el más potente y se comercializa como **dexclorfeniramina** (Polaramine).\n\nPrioridades CIP: **2-piridilo > 4-clorofenilo > cadena aminoetílica > H**. No hay que confundir (+)/(−) con R/S. Sin reactivo quiral, el producto sintético es racémico.",
    structures: [{ name: "Clorfenamina", imagePath: "estructuras/tema-07/QFDOS-382_clorfenamina.png", badge: "Clorfenamina · (S)-(+) = dexclorfeniramina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-10",
    topicId: 'tema-07',
    concept: "Por qué los AH₁ clásicos sedan",
    front: "¿Qué propiedad de los AH₁ de primera generación explica la sedación y los efectos anticolinérgicos?",
    back: "La **lipofilia de los dos arilos** y la amina básica les permiten atravesar la barrera hematoencefálica. En el SNC bloquean receptores **H₁ centrales** y **muscarínicos**: sedación, problemas de memoria y disfunción psicomotora.",
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-11",
    topicId: 'tema-07',
    concept: "Segunda generación: zwitterión y glicoproteína P",
    front: "¿Por qué la cetirizina sedó menos que la difenhidramina aunque ambas bloqueen el receptor H₁?",
    back: "Dos razones:\n\n1. **Química:** la cetirizina, la levocetirizina, la fexofenadina y la bilastina son **zwitteriones a pH 7,4**: un ácido carboxílico junto a la amina. Una especie con carga neta difunde mal por la membrana.\n2. **Biológica:** son sustratos de la **glicoproteína P (P-gp)**, que las devuelve a la sangre desde la barrera hematoencefálica. Está comprobado que la cetirizina, la loratadina y la desloratadina son sustratos de la P-gp y que la difenhidramina no lo es (Chen 2003). La presentación habla del «factor principal» y el profesor la comparó con un «Uber de salida» del SNC. Eso, y que el zwitterión explique la mala difusión, no lo hemos comprobado.",
    structures: [{ name: "Cetirizina", imagePath: "estructuras/tema-07/QFDOS-387_cetirizina.png", badge: "Cetirizina · zwitterión" }, { name: "Fexofenadina", imagePath: "estructuras/tema-07/QFDOS-389_fexofenadina.png", badge: "Fexofenadina · zwitterión" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-12",
    topicId: 'tema-07',
    concept: "Heterociclos π-excedentes y π-deficientes",
    front: "¿En qué se diferencian el pirrol o el furano de la piridina en cuanto a reactividad?",
    back: "Los **π-excedentes** (pirrol, furano, tiofeno, imidazol) son ricos en electrones y dan **sustitución electrófila aromática (SEAr)**. La **piridina** es **π-deficiente**: el par del nitrógeno es sp² y está en el plano, fuera del sexteto; el anillo es pobre en electrones y da **sustitución nucleófila aromática (SNAr)** en las posiciones **2, 4 y 6**.",
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-13",
    topicId: 'tema-07',
    concept: "Reacción de Chichibabin (1914)",
    front: "¿Qué ocurre al tratar la piridina con NaNH₂ y cómo se explica el gas que se desprende?",
    back: "La piridina reacciona con **amiduro sódico** (Na en NH₃ líquido) y da **2-aminopiridina**. El nucleófilo ataca C2 y forma un **aducto aniónico** (complejo de Meisenheimer); se restituye la aromaticidad **perdiendo hidruro**, que se desprende como **H₂**; la hidrólisis final libera la 2-aminopiridina y NaOH. Los reactivos reaccionan violentamente con agua: condiciones anhidras y atmósfera inerte.",
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-14",
    topicId: 'tema-07',
    concept: "Aminación reductora frente a alquilación",
    front: "¿Por qué las etilendiaminas N-bencílicas se preparan por aminación reductora y no por alquilación directa?",
    back: "La alquilación directa **sobrealquila**: la amina secundaria formada es más nucleófila que la primaria. En la **aminación reductora** la amina se condensa con el aldehído, forma una imina/iminio y se reduce **quimioselectivamente** con **NaBH₄ o NaBH₃CN** hasta la amina secundaria. Así se obtienen la **tripelenamina** (benzaldehído), la **mepiramina** (p-metoxibenzaldehído) y el **metapirileno** (tiofeno-2-carbaldehído) a partir de la 2-aminopiridina.",
    structures: [{ name: "Tripelenamina", imagePath: "estructuras/tema-07/QFDOS-381_tripelenamina.png", badge: "Tripelenamina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-15",
    topicId: 'tema-07',
    concept: "Síntesis del dimenhidrinato",
    front: "¿Qué cinco transformaciones llevan del benceno al dimenhidrinato?",
    back: "1. **Acilación de Friedel–Crafts** (cloruro de benzoílo, AlCl₃): benzofenona.\n2. **Reducción** a metileno (Clemmensen, Zn(Hg)/HCl): difenilmetano.\n3. **Bromación radicalaria bencílica** (Br₂, luz UV): bromodifenilmetano; el radical está estabilizado por los dos fenilos.\n4. **SN2** con 2-(dimetilamino)etanol: difenhidramina.\n5. **Formación de sal** con 8-cloroteofilina: dimenhidrinato.",
    structures: [{ name: "Difenhidramina", imagePath: "estructuras/tema-07/QFDOS-379_difenhidramina.png", badge: "Difenhidramina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-16",
    topicId: 'tema-07',
    concept: "Prometazina y la sal de aziridinio",
    front: "¿Por qué dos haluros de aminoalquilo isómeros dan la misma prometazina y por qué se usa NaNH₂?",
    back: "La **prometazina** (1945) es el primer tricíclico. La **fenotiazina** se obtiene de difenilamina con azufre y yodo catalítico (pérdida de H₂S). Su N–H es poco básico y algo ácido: se genera el anión con **NaNH₂**.\n\nEl haluro de aminoalquilo y su isómero **2-cloropropildimetilamina** convergen por desplazamiento intramolecular en la misma **sal de aziridinio**, el verdadero agente alquilante, que se abre por el **carbono menos sustituido**.",
    structures: [{ name: "Fenotiazina", imagePath: "estructuras/tema-07/QFDOS-384_fenotiazina.png", badge: "Fenotiazina" }, { name: "Ion aziridinio (1,1,2-trimetilaziridinio)", imagePath: "estructuras/tema-07/QFDOS-386_ion_aziridinio_1_1_2_trimetilaziridinio.png", badge: "Ion aziridinio" }, { name: "Prometazina", imagePath: "estructuras/tema-07/QFDOS-383_prometazina.png", badge: "Prometazina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-17",
    topicId: 'tema-07',
    concept: "Síntesis de la loratadina y la desloratadina",
    front: "¿Cuáles son las claves de la síntesis de la loratadina y cómo se obtiene la desloratadina?",
    back: "Claves de la síntesis, según la diapositiva y la clase del 17 de noviembre.\n\n1. **Ritter / POCl₃:** el nitrilo se protege como N-terc-butilamida y luego se regenera.\n2. **Grignard** sobre el nitrilo: cetona.\n3. **HF/BF₃** cierra el **anillo de siete miembros** a través del enol; deshidratación al doble enlace exocíclico.\n4. **ClCO₂Et** cambia el N-metilo por un carbamato: **loratadina**.\n5. **KOH a reflujo** hidroliza el carbamato: **desloratadina** (N–H libre; metabolito activo). Un hidruro reduciría el carbamato a N-metilo.",
    structures: [{ name: "Loratadina", imagePath: "estructuras/tema-07/QFDOS-388_loratadina.png", badge: "Loratadina · anillo de 7" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-18",
    topicId: 'tema-07',
    concept: "Historia y diseño racional de la cimetidina",
    front: "¿Quién diseñó la cimetidina y por qué se apostó por un receptor distinto del H₁?",
    back: "**Smith, Kline & French** con **James W. Black** y **C. Robin Ganellin**, unos dieciséis años de trabajo. Lanzada en el Reino Unido en 1976 y aprobada por la FDA en 1977. **Tagamet** = anTAGonist + ciMETidine. Black recibió el Nobel de Fisiología o Medicina de 1988 (con Elion y Hitchings).\n\nLos antihistamínicos conocidos **no inhibían la secreción ácida**, lo que sugería un receptor distinto del H₁. La burimamida, antagonista competitivo y específico, probó la existencia del **H₂**.",
    structures: [{ name: "Cimetidina", imagePath: "estructuras/tema-07/QFDOS-394_cimetidina.png", badge: "Cimetidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-19",
    topicId: 'tema-07',
    concept: "Tres estímulos y una bomba",
    front: "¿Qué tres señales recibe la célula parietal y por qué no basta con bloquear el H₂?",
    back: "La célula parietal recibe **acetilcolina** (receptor M₃), **gastrina** de las células G (CCK₂) e **histamina** de las células ECL (H₂). Las tres convergen en la **H⁺/K⁺-ATPasa**, que expulsa el HCl a la luz gástrica. Bloquear solo el H₂ reduce la secreción pero no la suprime; los inhibidores de la bomba son más eficaces.",
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-20",
    topicId: 'tema-07',
    concept: "Qué pide cada receptor",
    front: "¿Qué reconocen en común el H₁ y el H₂, y cómo cambió la idea sobre el imidazol en el H₂?",
    back: "**Para H₁ y H₂:** un nitrógeno catiónico en la cadena lateral **con al menos un protón** (las sales de amonio cuaternario no sirven), una cadena flexible y un anillo heteroaromático.\n\n**Solo para H₂:** el anillo debe contener una unidad de **amidina** (–HN–CH=N–), que el imidazol tiene; por eso la histamina sirve de cabeza de serie. El amino terminal interacciona por enlace iónico y los N del anillo por enlace de hidrógeno.",
    structures: [{ name: "Histamina", imagePath: "estructuras/tema-07/QFDOS-375_histamina.png", badge: "Cabeza de serie" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-21",
    topicId: 'tema-07',
    concept: "Nα-guanilhistamina y la isotiourea",
    front: "¿Qué se aprendió de la Nα-guanilhistamina y qué es el derivado de isotiourea?",
    back: "Tras **más de 200 análogos** sin un antagonista, se cambió la estrategia: grupos polares en lugar del α-NH₃⁺. La **Nα-guanilhistamina** resultó antagonista débil y agonista parcial. Los análogos con guanidino pero sin imidazol no tenían actividad: hacen falta los dos. La carga del guanidino se deslocaliza sobre tres N.\n\nEl **derivado de isotiourea** cambia por S el N del guanidino más próximo al imidazol; es el **IMETIT**. Aquí es solo un paso del diseño.",
    structures: [{ name: "Nα-Guanilhistamina", imagePath: "estructuras/tema-07/QFDOS-390_n_guanilhistamina.png", badge: "Nα-Guanilhistamina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-22",
    topicId: 'tema-07',
    concept: "Burimamida y norburimamida",
    front: "¿Por qué es relevante que la tiourea sea neutra y qué diferencia hay entre el SK&F 91581 y la burimamida?",
    back: "La **tiourea es neutra**: el C=S atrae electrones de los N vecinos y los deja no básicos. Que un grupo neutro se una al lugar antagonista y no al agonista sugiere que el agonista usa enlaces iónicos y el antagonista, de hidrógeno.\n\nLa **burimamida** es un antagonista H₂ competitivo y específico. La metiamida es unas diez veces más potente que la burimamida (Brimblecombe 1976). El **SK&F 91581** (norburimamida) ya lleva la N-metiltiourea; «nor» es un CH₂ menos (propilo en vez de butilo), de modo que el paso es solo alargar la cadena.",
    structures: [{ name: "Burimamida", imagePath: "estructuras/tema-07/QFDOS-391_burimamida.png", badge: "Burimamida" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-23",
    topicId: 'tema-07',
    concept: "Tiaburimamida y metiamida",
    front: "¿Qué hacen el S isóstero y el metilo en C5, y por qué se abandonó la metiamida?",
    back: "El **S** es isóstero del CH₂ (radio y ángulos parecidos) pero electronegativo: devuelve el carácter atrayente a la cadena y con él el tautómero **Nτ-H**. Un **metilo en C5** (donante) refuerza ese tautómero; se eligió porque la 5(4)-metilhistamina ya se sabía selectiva de H₂. Resultado: la **metiamida**, diez veces más potente.\n\nSe asoció a **neutropenia** (Forrest 1975). La presentación la atribuye a la tiourea, poco frecuente en la bioquímica humana, pero esa atribución no la hemos comprobado. Su desarrollo se abandonó.",
    structures: [{ name: "Tiaburimamida", imagePath: "estructuras/tema-07/QFDOS-392_tiaburimamida.png", badge: "Tiaburimamida" }, { name: "Metiamida", imagePath: "estructuras/tema-07/QFDOS-393_metiamida.png", badge: "Metiamida" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-24",
    topicId: 'tema-07',
    concept: "Tiourea, urea, guanidina y cianoguanidina",
    front: "¿Cuál fue el resultado de sustituir la tiourea de la metiamida por urea, guanidina y cianoguanidina?",
    back: "La **urea** fue menos activa. La **guanidina** también, pero **sin actividad agonista**: primer caso de guanidina antagonista pura. La **cianoguanidina** resultó **tan activa como la tiourea** y dio la **cimetidina**.",
    structures: [{ name: "Metiamida", imagePath: "estructuras/tema-07/QFDOS-393_metiamida.png", badge: "Metiamida" }, { name: "Cimetidina", imagePath: "estructuras/tema-07/QFDOS-394_cimetidina.png", badge: "Cimetidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-25",
    topicId: 'tema-07',
    concept: "El pKa manda sobre la carga",
    front: "¿Por qué la cianoguanidina imita a la tiourea y no a la guanidina?",
    back: "El pKa del grupo guanidino **baja al aumentar el poder electrón-atrayente** del sustituyente (σI). Con H el pKa es ~13–14 y la guanidina está protonada a pH fisiológico. Con **CN o NO₂** cae por debajo de 1 y el grupo queda **neutro**. Tiene la geometría del guanidino pero no la carga. De sus tres tautómeros domina el **N-ciano imínico**, muy parecido a la tiourea: por eso metiamida y cimetidina tienen actividades parecidas.",
    structures: [{ name: "Cimetidina", imagePath: "estructuras/tema-07/QFDOS-394_cimetidina.png", badge: "Cimetidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-26",
    topicId: 'tema-07',
    concept: "Conformación, dipolo y desolvatación",
    front: "¿Qué conformaciones adopta la cimetidina y qué papel tienen el dipolo y la desolvatación en la actividad?",
    back: "La cimetidina existe como mezcla de **E,Z y Z,E**; la Z,Z, necesaria para quelar un carboxilato con dos enlaces de hidrógeno, está desfavorecida. La explicación alternativa es que el guanidino forma dos enlaces de hidrógeno con dos puntos distintos del receptor. La cabeza neutra actúa como **donante de puente de hidrógeno**, no como catión.\n\n**Dipolo:** debe quedar alineado con el del receptor; un análogo cíclico con el dipolo desalineado da un enlace de hidrógeno débil. **Desolvatación:** guanidino y tiourea van solvatados y cuesta quitar el agua; **log(1/C)** (mayor = más potente) aumenta con **log P**, con el derivado nitro casi dos unidades por encima de la recta.",
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-27",
    topicId: 'tema-07',
    concept: "Síntesis de la cimetidina",
    front: "¿Cuáles son los pasos de la síntesis de la cimetidina desde el 2-cloroacetoacetato de etilo?",
    back: "1. **Bredereck:** 2-cloroacetoacetato de etilo + **formamida ×2** (−H₂O) → 5-metilimidazol-4-carboxilato de etilo.\n2. **Reducción** con LiAlH₄ o Na/NH₃ líq. → (5-metilimidazol-4-il)metanol.\n3. **Cisteamina/HCl:** SN2 del S (el nucleófilo más blando) → tioéter-amina.\n4. **(MeS)₂C=N–CN:** sale el primer MeSH → intermedio S-metil.\n5. **CH₃NH₂:** sale el segundo MeSH → **cimetidina**.",
    structures: [{ name: "4-Metilimidazol-5-carboxilato de etilo", imagePath: "estructuras/tema-07/QFDOS-399_4_metilimidazol_5_carboxilato_de_etilo.png", badge: "Éster del imidazol" }, { name: "2-{[(5-Metilimidazol-4-il)metil]tio}etilamina", imagePath: "estructuras/tema-07/QFDOS-401_2_5_metilimidazol_4_il_metil_tio_etilamina.png", badge: "Tioéter-amina" }, { name: "Cimetidina", imagePath: "estructuras/tema-07/QFDOS-394_cimetidina.png", badge: "Cimetidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-28",
    topicId: 'tema-07',
    concept: "Ranitidina: del imidazol al furano",
    front: "¿Qué cambios introduce la ranitidina frente a la cimetidina y qué SAR tiene el furano?",
    back: "Glaxo sustituyó el imidazol por un **furano** con un sustituyente nitrogenado y el extremo polar por el **nitroceténaminal**. Es más potente que la cimetidina y de acción más larga. SAR: el nitroceténaminal es óptimo; cambiar el S por CH₂ baja la actividad; la **2,5-disustitución** es la mejor; un **metilo en C3 anula** la actividad, al revés que en el imidazol.",
    structures: [{ name: "Cimetidina", imagePath: "estructuras/tema-07/QFDOS-394_cimetidina.png", badge: "Cimetidina" }, { name: "Ranitidina", imagePath: "estructuras/tema-07/QFDOS-395_ranitidina.png", badge: "Ranitidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-29",
    topicId: 'tema-07',
    concept: "Síntesis de la ranitidina",
    front: "¿Cuáles son los pasos de la síntesis de la ranitidina desde el alcohol furfurílico?",
    back: "1. **Mannich** sobre el alcohol furfurílico con el ion iminio **Me₂N⁺=CH₂** (se forma in situ), en C5.\n2. **Cisteamina/HCl:** tioéter-amina del furano.\n3. **1,1-Bis(metiltio)-2-nitroeteno:** sale un MeSH → intermedio S-metil.\n4. **CH₃NH₂:** sale el segundo MeSH → **ranitidina**.",
    structures: [{ name: "Alcohol furfurílico", imagePath: "estructuras/tema-07/QFDOS-404_alcohol_furfurilico.png", badge: "Alcohol furfurílico" }, { name: "Ion dimetilmetilenoiminio", imagePath: "estructuras/tema-07/QFDOS-405_ion_dimetilmetilenoiminio.png", badge: "Iminio de Mannich" }, { name: "Ranitidina", imagePath: "estructuras/tema-07/QFDOS-395_ranitidina.png", badge: "Ranitidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-30",
    topicId: 'tema-07',
    concept: "Famotidina, nizatidina y oxmetidina",
    front: "¿En qué se diferencian la famotidina, la nizatidina y la oxmetidina de la cimetidina?",
    back: "El heterociclo admite cambios: **tiazol** en la **famotidina** y la **nizatidina**. La famotidina lleva **sulfamoilamidina**; la nizatidina, el mismo nitroceténaminal que la ranitidina. La **oxmetidina** conserva el imidazol pero cambia el extremo polar por una **isocitosina** y no pasó de la fase 2.",
    structures: [{ name: "Famotidina", imagePath: "estructuras/tema-07/QFDOS-396_famotidina.png", badge: "Famotidina" }, { name: "Nizatidina", imagePath: "estructuras/tema-07/QFDOS-397_nizatidina.png", badge: "Nizatidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-31",
    topicId: 'tema-07',
    concept: "Antagonistas H₁ frente a H₂",
    front: "¿Qué farmacóforos opuestos tienen los antagonistas H₁ y H₂ y qué consecuencia tiene para el SNC?",
    back: "Los **H₁ clásicos** (primera generación) llevan dos arilos terminales y una amina básica: lipófilos y catiónicos a pH 7,4; entran en el SNC y sedan. Los de segunda generación (cetirizina, loratadina, fexofenadina) están diseñados para entrar poco. Los **H₂** típicos llevan un heterociclo, una cadena con azufre y un extremo polar con π deslocalizados (S, NCN, CHNO₂): hidrófilos, poco ionizados y con momento dipolar alto; por lo general apenas penetran en el SNC. Es la descripción típica, no una ley.",
    structures: [{ name: "Difenhidramina", imagePath: "estructuras/tema-07/QFDOS-379_difenhidramina.png", badge: "H₁ · difenhidramina" }, { name: "Cimetidina", imagePath: "estructuras/tema-07/QFDOS-394_cimetidina.png", badge: "H₂ · cimetidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-32",
    topicId: 'tema-07',
    concept: "Inhibidores de la bomba y P-CAB",
    front: "¿Por qué los antagonistas H₂ han sido desplazados y qué diferencia hay entre IBP y P-CAB?",
    back: "Los H₂ perdieron terreno frente a los **inhibidores de la bomba de protones** (omeprazol, pantoprazol), que se activan en medio ácido y la inhiben **de forma irreversible**, y ahora frente a los **P-CAB**. El **vonoprazán** bloquea la H⁺/K⁺-ATPasa **compitiendo con el K⁺**, sin necesidad de activarse en medio ácido, con acción más rápida y sostenida. La retirada de la ranitidina aceleró el cambio.",
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-33",
    topicId: 'tema-07',
    concept: "Ranitidina y NDMA",
    front: "¿Por qué se retiró la ranitidina?",
    back: "Se retiró del mercado entre 2019 y 2020 como medida preventiva tras detectarse **N-nitrosodimetilamina (NDMA)**, una impureza clasificada como probable carcinógeno en humanos. La UE abrió la revisión el 12 de septiembre de 2019, la FDA pidió la retirada el 1 de abril de 2020 y la Comisión Europea decidió la suspensión el 24 de noviembre de 2020. No se debió a una toxicidad del propio activo. El estado regulatorio es contexto de la presentación y puede cambiar.",
    structures: [{ name: "Ranitidina", imagePath: "estructuras/tema-07/QFDOS-395_ranitidina.png", badge: "Ranitidina" }],
    difficulty: "medium",
    category: "Tema 7"
  },
  {
    id: "fc-07-34",
    topicId: 'tema-07',
    concept: "H₃, H₄ y lo que viene",
    front: "¿Qué fármacos o dianas hay hoy para los receptores H₁–H₄ y hacia dónde va el bloque?",
    back: "**H₁:** la segunda generación resolvió la sedación; lo nuevo actúa sobre el mastocito (por ejemplo, el remibrutinib, inhibidor de la BTK, autorizado por la Comisión Europea el 23 de abril de 2026 en urticaria crónica que no responde a los AH₁). **H₂:** desplazados por IBP y P-CAB. **H₃:** el **pitolisant**, agonista inverso del autorreceptor, aumenta la histamina cerebral y se usa en la narcolepsia; está comercializado en España. **H₄:** en investigación; ningún fármaco aprobado.",
    difficulty: "medium",
    category: "Tema 7"
  },
];
