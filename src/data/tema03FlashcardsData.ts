// ==========================================================================
// QFDOS - Flashcards Tema 03: Sistema Dopaminérgico
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// fc-03-01 a fc-03-15: contenido de los apuntes del Tema 3, reforzado con lo
// que más se repite en los exámenes de otros profesores de la asignatura.
// fc-03-16 a fc-03-20: ampliación de temario (aparece en esos exámenes y no,
// o solo de pasada, en los apuntes). Se marcan con `ampliacion: true`.
// Tipografía Científica: texto plano y caracteres Unicode directos (cero LaTeX crudo)
// Estereoquímica de los SMILES verificada con RDKit (CIP).
// ==========================================================================

import type { Flashcard } from './qfdosData';

const PIVALOILO = 'OC(=O)C(C)(C)C';

export const TEMA3_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-03-01',
    topicId: 'tema-03',
    concept: 'Conformación Activa de la Dopamina: ADTN y Apomorfina',
    front: 'La dopamina gira libremente en disolución. ¿Cómo demostramos con análogos rígidos que la conformación que reconoce el receptor D2 es la antiperiplanar?',
    back: 'Respecto a la conformación activa, fijamos el puente etilénico dentro de un anillo y medimos la actividad. El **6,7-ADTN** (2-amino-6,7-dihidroxitetralina) bloquea el diedro N–C–C–Ar en **antiperiplanar (180°)** y reproduce el **rotámero β**: es un agonista D2 tan potente o más que la dopamina. Su isómero **5,6-ADTN** reproduce el rotámero α y es claramente menos activo.\n\nLa **apomorfina**, que obtenemos calentando morfina en **HCl concentrado** (transposición con pérdida del puente éter), lleva una catecolamina fija con el N a **≈5,4 Å** del centro del catecol y diedro antiperiplanar. Es agonista **D1/D2** directo y potente. Las dos moléculas dicen lo mismo: el receptor reconoce la dopamina **extendida (trans)**, no la gauche.',
    structures: [
      { name: 'Dopamina', smiles: 'NCCc1ccc(O)c(O)c1', badge: 'Flexible' },
      { name: '6,7-ADTN', smiles: 'NC1CCc2cc(O)c(O)cc2C1', badge: 'Rotámero β · activo' },
      { name: '(R)-Apomorfina', smiles: 'CN1CCC2=C3[C@H]1CC4=C(C3=CC=C2)C(=C(C=C4)O)O', badge: 'Antiperiplanar · D1/D2' }
    ],
    difficulty: 'medium',
    category: 'Conformación y SAR'
  },
  {
    id: 'fc-03-02',
    topicId: 'tema-03',
    concept: 'L-DOPA y Fármacos Centinela: Carbidopa y Benserazida',
    front: '¿Por qué damos L-DOPA y no dopamina en el Parkinson, y por qué la asociamos siempre a carbidopa o benserazida sin que estas frenen la síntesis de dopamina en el cerebro?',
    back: 'En cuanto a la L-DOPA, la dopamina es catiónica a pH 7,4 (pKa 8,9; logP ≈ –1), no cruza la BHE y la MAO y la COMT la destruyen en minutos. La **L-DOPA** es un α-aminoácido: el transportador **LAT1** la sube a través de la barrera y la **AADC** (DOPA-descarboxilasa, con **fosfato de piridoxal**) la convierte en dopamina dentro de la neurona.\n\nSola, más del 95 % se descarboxila en la periferia: llega poca al cerebro y la dopamina periférica estimula el **área postrema** (vómitos) y el corazón. Por eso la combinamos con **carbidopa** o **benserazida**, inhibidores de la AADC que **no cruzan la BHE**. La carbidopa es la L-DOPA con **α-metilo** y una **hidrazina** en lugar del NH₂: la hidrazina forma una **hidrazona** con el PLP y anula la enzima. Muy polar y sin reconocimiento por LAT1, se queda fuera; la AADC cerebral sigue trabajando.\n\n**Ampliación:** en el FIR la carbidopa se define como «inhibidor de la biosíntesis periférica de dopamina», y en los V/F como **inhibidor análogo de sustrato** (imita a la L-DOPA).',
    structures: [
      { name: 'L-DOPA', smiles: 'N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O', badge: 'Sustrato de LAT1 y AADC' },
      { name: '(S)-Carbidopa', smiles: 'NN[C@@](C)(Cc1ccc(O)c(O)c1)C(=O)O', badge: 'Hidrazina · periférica' },
      { name: 'Benserazida', smiles: 'NC(CO)C(=O)NNCc1ccc(O)c(O)c1O', badge: 'Hidrazida · periférica' }
    ],
    difficulty: 'easy',
    category: 'Profármacos y Antiparkinsonianos'
  },
  {
    id: 'fc-03-03',
    topicId: 'tema-03',
    concept: 'Profármaco Doble de Bodor: Dihidropiridina y Piridinio',
    front: 'La dipivaloildopamina cruza la BHE pero no se queda en el cerebro. ¿Cómo resuelve el sistema redox de Bodor ese problema y qué productos libera?',
    back: 'Sobre la latentización de la dopamina, la **dipivaloildopamina** enmascara los dos fenoles como **pivalatos**: el terc-butilo da lipofilia y frena a las esterasas. Cruza la BHE, pero vuelve a salir a favor de gradiente, y su hidrólisis periférica deja dopamina libre en sangre.\n\nBodor añade un segundo enmascaramiento: bloquea la amina como amida de **1-metil-1,4-dihidropiridina-3-carbonilo**. El profármaco, neutro y lipófilo, entra en el cerebro; allí el **NAD(P)⁺** de las oxidorreductasas le quita un hidruro y lo convierte en **sal de 1-metilpiridinio**, con carga permanente. Es la **inversión de polaridad**: el catión ya no sale por la BHE (queda atrapado) y el que se forma en la periferia lo elimina el riñón. Después las **esterasas** quitan los pivalatos y las **amidasas** liberan **dopamina** y **trigonelina**, un metabolito de la niacina sin toxicidad.',
    structures: [
      { name: 'Dipivaloildopamina', smiles: `NCCc1ccc(${PIVALOILO})c(${PIVALOILO})c1`, badge: 'Lipófila · no se retiene' },
      { name: 'Profármaco dihidropiridina', smiles: `CN1C=CCC(C(=O)NCCc2ccc(${PIVALOILO})c(${PIVALOILO})c2)=C1`, badge: 'Neutro · cruza la BHE' },
      { name: 'Sal de piridinio', smiles: `C[n+]1cccc(C(=O)NCCc2ccc(${PIVALOILO})c(${PIVALOILO})c2)c1`, badge: 'Cargada · atrapada' },
      { name: 'Trigonelina', smiles: 'C[n+]1cccc(C(=O)[O-])c1', badge: 'Subproducto inocuo' }
    ],
    difficulty: 'hard',
    category: 'Profármacos y Antiparkinsonianos'
  },
  {
    id: 'fc-03-04',
    topicId: 'tema-03',
    concept: 'Selegilina y Rasagilina: Propargilaminas Suicidas de la MAO-B',
    front: '¿Cómo inactiva la selegilina a la MAO-B, por qué usamos solo el enantiómero (R)-(−) y qué ventaja metabólica tiene la rasagilina?',
    back: 'En cuanto a los inhibidores de la MAO-B, la selegilina es una **propargilamina** (N,α-dimetil-N-propargilfenetilamina). La enzima la toma como sustrato: el **FAD** oxida el grupo **–CH₂–C≡CH** a un intermedio alénico electrófilo que alquila el **N-5 de la flavina**. Es un **inhibidor suicida** irreversible; la actividad solo vuelve cuando la neurona fabrica enzima nueva. A dosis terapéuticas es selectiva de la **MAO-B**, la isoforma que degrada la dopamina en el estriado.\n\nUsamos el eutómero **(R)-(−)**, nunca el racémico: el distómero (S)-(+) se N-desalquila en el hígado a **(S)-metanfetamina** y **(S)-anfetamina**, estimulantes centrales con insomnio, taquicardia e hipertensión. La **rasagilina**, (R)-N-propargil-1-aminoindano, es más potente y se metaboliza a **1-aminoindano**, sin efecto anfetamínico.',
    structures: [
      { name: '(R)-Selegilina', smiles: 'C#CCN(C)[C@H](C)Cc1ccccc1', badge: 'Propargilamina · MAO-B' },
      { name: '(R)-Rasagilina', smiles: 'C#CCN[C@@H]1CCc2ccccc21', badge: 'Aminoindano' }
    ],
    difficulty: 'medium',
    category: 'Inhibidores Enzimáticos'
  },
  {
    id: 'fc-03-05',
    topicId: 'tema-03',
    concept: 'Inhibidores de la COMT: Tolcapona frente a Entacapona',
    front: '¿Por qué conviene inhibir la COMT cuando ya damos L-DOPA con carbidopa, y qué diferencia estructural explica que la tolcapona sea central y hepatotóxica y la entacapona no?',
    back: 'Respecto a la COMT, con la AADC periférica bloqueada la L-DOPA se va por la otra ruta: la COMT metila su **3-OH** (con SAM y Mg²⁺) y forma **3-O-metildopa**. Ese metabolito no es activo y además **compite con la L-DOPA por LAT1**. Inhibir la COMT alarga la acción de cada dosis.\n\nTolcapona y entacapona son **nitrocatecoles**: el **–NO₂** atrae electrones, acidifica los fenoles y refuerza la quelación del Mg²⁺ del centro activo. La **tolcapona** lleva una benzofenona lipófila: cruza la BHE e inhibe la COMT central y periférica, pero actúa como **desacoplante mitocondrial** y su nitro se reduce a especies reactivas. De ahí la **hepatotoxicidad** que la sacó del mercado europeo entre 1998 y 2004; hoy va con control hepático. La **entacapona**, con una cadena de cianoacrilamida más polar, se queda en la **periferia** y no se asocia a daño hepático.',
    structures: [
      { name: '3-O-Metildopa', smiles: 'N[C@@H](Cc1ccc(O)c(OC)c1)C(=O)O', badge: 'Compite por LAT1' },
      { name: 'Tolcapona', smiles: 'Cc1ccc(C(=O)c2cc(O)c(O)c([N+](=O)[O-])c2)cc1', badge: 'Central · hepatotóxica' },
      { name: 'Entacapona', smiles: 'CCN(CC)C(=O)/C(C#N)=C/c1cc(O)c(O)c([N+](=O)[O-])c1', badge: 'Periférica' }
    ],
    difficulty: 'medium',
    category: 'Inhibidores Enzimáticos'
  },
  {
    id: 'fc-03-06',
    topicId: 'tema-03',
    concept: 'Amantadina y Reacción de Ritter',
    front: '¿Cómo actúa la amantadina en el Parkinson y por qué su síntesis pasa por una reacción de Ritter y no por una SN2?',
    back: 'Sobre la amantadina, su acción es doble: facilita la **liberación de dopamina** presináptica y es **antagonista no competitivo del receptor NMDA** (bloquea el canal), lo que reduce las **discinesias por L-DOPA**. El adamantano, globular y lipófilo, le da paso al SNC y resistencia metabólica.\n\nEl NH₂ va sobre un **carbono terciario en cabeza de puente**, donde una SN2 es imposible. La Ritter lo resuelve: en **H₂SO₄ concentrado**, el 1-adamantanol o el 1-bromoadamantano forma el **carbocatión 1-adamantilo**, muy estable; el **acetonitrilo** lo atrapa como **ion nitrilio**, el agua lo hidrata y tautomeriza a **N-(1-adamantil)acetamida**, y la hidrólisis básica (NaOH, dietilenglicol, 180 °C) libera la amantadina. Es la misma reacción que usamos en el Tema 2 para la fentermina.',
    structures: [
      { name: '1-Adamantanol', smiles: 'OC12CC3CC(CC(C3)C1)C2', badge: 'Precursor del carbocatión' },
      { name: 'N-(1-Adamantil)acetamida', smiles: 'CC(=O)NC12CC3CC(CC(C3)C1)C2', badge: 'Producto de Ritter' },
      { name: 'Amantadina', smiles: 'NC12CC3CC(CC(C3)C1)C2', badge: 'Liberador DA · NMDA' }
    ],
    difficulty: 'medium',
    category: 'Síntesis Orgánica'
  },
  {
    id: 'fc-03-07',
    topicId: 'tema-03',
    concept: 'Agonistas Directos: Ergolínicos frente a No Ergolínicos',
    front: '¿Por qué los agonistas ergolínicos (pergolida, cabergolina) han pasado a segunda línea en el Parkinson y qué aportan pramipexol, ropinirol y rotigotina?',
    back: 'En cuanto a los agonistas directos, su ventaja es que no necesitan neuronas capaces de descarboxilar L-DOPA. Los **ergolínicos** derivan del ácido lisérgico: la **bromocriptina** es la 2-bromo-α-ergocriptina, una ergopeptina, y la **cabergolina** tiene una semivida de más de 65 h. El problema es el receptor **5-HT2B**: pergolida y cabergolina lo activan en las válvulas cardíacas y producen **valvulopatía fibrótica**. La pergolida se retiró en EE. UU. en 2007; la cabergolina quedó como segunda línea con ecocardiograma. La **lisurida**, antagonista 5-HT2B, no da ese problema.\n\nLos **no ergolínicos** son selectivos **D2/D3** y no causan fibrosis. El **(S)-pramipexol** lleva un aminotiazol fusionado. El **ropinirol** cambia el catecol por un **oxindol**: el C=O de la lactama acepta el enlace de hidrógeno y la COMT no lo puede metilar. La **(S)-rotigotina** es una aminotetralina lipófila que damos en **parche de 24 h**.',
    structures: [
      { name: '(S)-Pramipexol', smiles: 'CCCN[C@H]1CCc2nc(N)sc2C1', badge: 'D3 > D2' },
      { name: 'Ropinirol', smiles: 'CCCN(CCC)CCc1cccc2c1CC(=O)N2', badge: 'Oxindol · sin catecol' },
      { name: '(S)-Rotigotina', smiles: 'CCCN(CCc1cccs1)[C@H]1CCc2c(O)cccc2C1', badge: 'Parche transdérmico' }
    ],
    difficulty: 'easy',
    category: 'Agonistas Dopaminérgicos'
  },
  {
    id: 'fc-03-08',
    topicId: 'tema-03',
    concept: 'SAR de las Fenotiazinas: de la Prometazina a la Flufenazina',
    front: 'La prometazina es antihistamínica y la clorpromazina neuroléptica. ¿Qué cuatro reglas estructurales convierten una fenotiazina en un buen neuroléptico?',
    back: 'Respecto a las fenotiazinas, partimos del modelo de Gordon y comprobamos cuatro reglas. Primera, un **grupo atractor en C-2** (–Cl, –CF₃): el triciclo no es plano, está plegado en **mariposa** sobre el eje N–S, y el C-2 sustituido atrae la cadena de N-10 hacia el anillo A. Así la amina queda a **≈5,4 Å** del anillo, igual que en la dopamina antiperiplanar. Potencia: **–CF₃ > –Cl >> –H**. Segunda, **tres carbonos** entre los dos nitrógenos: con dos carbonos tenemos un antihistamínico H1 (**prometazina**) y con cuatro se pierde la actividad. Tercera, **sin ramificar** la cadena (la levomepromazina es la excepción). Cuarta, **amina terciaria**: si la cuaternizamos no cruza la BHE.\n\nEl tipo de amina marca el perfil. Las **alifáticas** (clorpromazina) sedan más; las **piperidínicas** (tioridazina) dan menos EPS, pero alargan el QT; las **piperazínicas** (flufenazina, perfenazina) son las más potentes y las que más EPS producen.',
    structures: [
      { name: 'Prometazina', smiles: 'CC(CN1c2ccccc2Sc2ccccc21)N(C)C', badge: '2 C ramificados · H1' },
      { name: 'Clorpromazina', smiles: 'CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21', badge: '2-Cl · 3 C · D2' },
      { name: 'Flufenazina', smiles: 'OCCN1CCN(CCCN2c3ccccc3Sc3ccc(C(F)(F)F)cc32)CC1', badge: '2-CF₃ · piperazina' }
    ],
    difficulty: 'medium',
    category: 'SAR Neurolépticos'
  },
  {
    id: 'fc-03-09',
    topicId: 'tema-03',
    concept: 'Síntesis de la Clorpromazina',
    front: '¿Cómo se sintetiza la clorpromazina a partir de la 2-clorofenotiazina y por qué hace falta una base tan fuerte como el NaNH₂?',
    back: 'En la síntesis de la clorpromazina alquilamos el N-10 de la **2-clorofenotiazina**. Su N–H es poco ácido (pKa ≈ 22-24 en DMSO), porque el par libre está repartido entre los dos anillos, así que necesitamos una base fuerte y poco nucleófila: **NaNH₂** o **NaH** en tolueno o xileno a reflujo. Se desprende NH₃ o H₂ y queda el **anión fenotiazinilo**.\n\nEse anión hace una **SN2** sobre la **3-cloro-N,N-dimetilpropan-1-amina**, que preparamos antes con SOCl₂ desde el aminoalcohol. Sale el cloruro y aislamos la clorpromazina como **hidrocloruro**. El triciclo de partida se prepara por **tionación** de la difenilamina (S₈, I₂ cat., 180 °C), por **SNAr** (complejo de Meisenheimer) o por **transposición de Smiles**.',
    structures: [
      { name: '2-Clorofenotiazina', smiles: 'Clc1ccc2Sc3ccccc3Nc2c1', badge: 'N–H poco ácido' },
      { name: '3-Cloro-N,N-dimetilpropilamina', smiles: 'CN(C)CCCCl', badge: 'Electrófilo' },
      { name: 'Clorpromazina', smiles: 'CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21', badge: 'Producto (SN2)' }
    ],
    difficulty: 'easy',
    category: 'Síntesis Orgánica'
  },
  {
    id: 'fc-03-10',
    topicId: 'tema-03',
    concept: 'Neurolépticos Depot: Decanoato de Flufenazina',
    front: 'Si en lugar del OH de la flufenazina o la perfenazina ponemos un éster de ácido graso, ¿qué obtenemos y cómo consigue una acción de 2 a 4 semanas?',
    back: 'Sobre las formas depot, la flufenazina y la perfenazina llevan un **hidroxietilo** en el N-4 de la piperazina. Lo esterificamos con un ácido graso: **enántico** (C7) o **decanoico** (C10). El éster es un **profármaco** mucho más lipófilo; lo disolvemos en **aceite de sésamo** y lo inyectamos por vía **intramuscular profunda**. Desde ese depósito pasa muy despacio a la sangre, donde las **esterasas** liberan la flufenazina durante **2-4 semanas**. Así resolvemos la falta de adherencia del paciente psicótico crónico.\n\nNo vale para toda la familia: la trifluoperazina y la proclorperazina tienen un **N-metilo** donde las otras llevan el hidroxietilo, y sin OH no hay éster posible.\n\n**Ampliación:** este profármaco sale tal cual en el FIR (2023) y en los V/F («análogo de la perfenazina con un éster en vez del OH = profármaco», verdadero).',
    structures: [
      { name: 'Flufenazina', smiles: 'OCCN1CCN(CCCN2c3ccccc3Sc3ccc(C(F)(F)F)cc32)CC1', badge: 'OH libre' },
      { name: 'Decanoato de flufenazina', smiles: 'CCCCCCCCCC(=O)OCCN1CCN(CCCN2c3ccccc3Sc3ccc(C(F)(F)F)cc32)CC1', badge: 'Depot IM · 2-4 semanas' }
    ],
    difficulty: 'easy',
    category: 'Profármacos'
  },
  {
    id: 'fc-03-11',
    topicId: 'tema-03',
    concept: 'Tioxantenos: Isómero Z y Síntesis del Clorprotixeno',
    front: '¿Qué cambia al pasar de fenotiazina a tioxanteno, por qué el isómero (Z) es el activo y cuáles son los pasos de la síntesis del clorprotixeno?',
    back: 'En cuanto a los tioxantenos, cambiamos el N-10 por un **carbono sp² con doble enlace exocíclico** (=CH–CH₂–CH₂–NR₂). El doble enlace no gira, así que hay dos isómeros geométricos. En el **(Z)** la cadena queda del mismo lado que el anillo con el **Cl en C-2**, que es la geometría de Gordon; es **20-100 veces más potente** que el (E). El **zuclopentixol** es precisamente el isómero Z del clopentixol.\n\nLa síntesis del clorprotixeno tiene cuatro pasos:\n1. **SNAr:** el tiolato desplaza un halógeno aromático y forma el diaril sulfuro.\n2. **Friedel-Crafts** intramolecular: cerramos la **2-clorotioxantona**.\n3. **Grignard** con cloruro de 3-(dimetilamino)propilmagnesio: alcohol terciario. Es la inversión de polaridad del haluro de alquilo.\n4. **Deshidratación** ácida al alqueno: sale una mezcla Z/E. El **Z es el más activo**, aunque no el más favorecido energéticamente, y hay que separarlo.',
    structures: [
      { name: '2-Clorotioxantona', smiles: 'O=C1c2ccccc2Sc2ccc(Cl)cc21', badge: 'Friedel-Crafts' },
      { name: '(Z)-Clorprotixeno', smiles: 'CN(C)CC/C=C1/c2ccccc2Sc2ccc(Cl)cc21', badge: 'Isómero activo' }
    ],
    difficulty: 'hard',
    category: 'Estereoquímica'
  },
  {
    id: 'fc-03-12',
    topicId: 'tema-03',
    concept: 'Butirofenonas: de la Petidina al Haloperidol',
    front: 'Las butirofenonas nacieron buscando mejores analgésicos. ¿Qué cambios llevan de la petidina al haloperidol y qué reglas de SAR hay que respetar?',
    back: 'Sobre el origen de las butirofenonas, Janssen partió de la **petidina**, opioide 4-fenilpiperidínico (por eso los V/F dicen, con razón, que vienen «de un derivado de morfina»). Al cambiar el N-metilo por cadenas arilalquílicas y llegar a una **butirofenona**, desapareció la analgesia y apareció un efecto neuroléptico. Para aislarlo pusimos **F en para** del benzoílo y cambiamos el **éster por un OH** con un **p-clorofenilo** en C-4: así nace el **haloperidol**.\n\nLas reglas de SAR son estrictas. El **p-F** es óptimo y además bloquea la hidroxilación por CYP. La **cetona** es la mejor opción. Entre el C=O y el N tiene que haber **tres metilenos**, ni más ni menos y sin ramificar. El **N piperidínico** debe ser básico para unirse al **Asp114**. El **C-4 de la piperidina** admite grupos voluminosos: piperidinol (haloperidol), tetrahidropiridina con bencimidazolinona (**droperidol**) o un espiro (espiperona). Este último punto es la clave del FIR 2023.',
    structures: [
      { name: 'Petidina', smiles: 'CCOC(=O)C1(c2ccccc2)CCN(C)CC1', badge: 'Opioide de partida' },
      { name: 'Haloperidol', smiles: 'O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1', badge: 'p-F · 3 CH₂ · piperidinol' },
      { name: 'Droperidol', smiles: 'O=C(CCCN1CC=C(n2c(=O)[nH]c3ccccc32)CC1)c1ccc(F)cc1', badge: 'Tetrahidropiridina · antiemético' }
    ],
    difficulty: 'medium',
    category: 'SAR Neurolépticos'
  },
  {
    id: 'fc-03-13',
    topicId: 'tema-03',
    concept: 'Síntesis Convergente del Haloperidol',
    front: '¿Cuáles son los dos fragmentos de la síntesis del haloperidol, cómo se obtiene cada uno y para qué sirve el KI en el acoplamiento final?',
    back: 'En la síntesis del haloperidol preparamos dos fragmentos por separado. El **fragmento A** (electrófilo) sale de una **Friedel-Crafts**: fluorobenceno con **cloruro de 4-clorobutirilo** y **AlCl₃**. El F desactiva por efecto –I, pero orienta a orto/para por +M, y gana la **para** (>98 %) por razones estéricas: obtenemos la **4-cloro-1-(4-fluorofenil)butan-1-ona**.\n\nEl **fragmento B** (nucleófilo) lo hacemos con un **Grignard**: bromuro de 4-clorofenilmagnesio sobre la **N-bencil-4-piperidona**, que da el alcohol terciario; después quitamos el bencilo con **H₂, Pd/C**.\n\nEl acoplamiento es una **SN2** con **K₂CO₃** y **KI catalítico** en MIBK a reflujo. El yoduro desplaza al cloruro (**Finkelstein in situ**) y deja un yoduro de alquilo mucho más reactivo, que la piperidina desplaza enseguida. Con un arilo **3-CF₃** en lugar del 4-Cl y la misma ruta obtenemos el **trifluperidol** (ejercicio 3.6).',
    structures: [
      { name: 'Fragmento A', smiles: 'O=C(CCCCl)c1ccc(F)cc1', badge: 'Friedel-Crafts' },
      { name: 'Fragmento B', smiles: 'OC1(c2ccc(Cl)cc2)CCNCC1', badge: 'Grignard + desbencilación' },
      { name: 'Haloperidol', smiles: 'O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1', badge: 'SN2 · KI cat.' }
    ],
    difficulty: 'hard',
    category: 'Síntesis Orgánica'
  },
  {
    id: 'fc-03-14',
    topicId: 'tema-03',
    concept: 'Difenilbutilpiperidinas y Ortopramidas',
    front: '¿Qué demuestra la pimozida sobre el carbonilo de las butirofenonas, y qué rasgo estructural define a las ortopramidas como la metoclopramida?',
    back: 'Respecto a la **pimozida**, cambiamos el carbonilo de la butirofenona por un **segundo p-fluorofenilo** sobre un metino. El C=O resulta prescindible y la lipofilia sube mucho (logP > 5): semivida de unas 55 h y **una toma al día**. La pauta **semanal** es del **penfluridol**, otra difenilbutilpiperidina.\n\nLas **ortopramidas** derivan de la **procainamida**. Son benzamidas con un **metoxilo en orto** (respuesta del FIR 2020), un 4-NH₂ y un 5-Cl. El NH de la amida forma un **enlace de hidrógeno intramolecular** con el O del orto-metoxilo y cierra un pseudoanillo que fija la conformación activa, sin triciclo ni butirofenona. La **metoclopramida** bloquea D2 en el **área postrema** (antiemética) y en el plexo mientérico (procinética). La **sulpirida** se usa como neuroléptico.',
    structures: [
      { name: 'Pimozida', smiles: 'O=c1[nH]c2ccccc2n1C1CCN(CCCC(c2ccc(F)cc2)c2ccc(F)cc2)CC1', badge: 'Sin C=O · una toma diaria' },
      { name: 'Metoclopramida', smiles: 'CCN(CC)CCNC(=O)c1cc(Cl)c(N)cc1OC', badge: 'o-OCH₃ · antiemético D2' }
    ],
    difficulty: 'medium',
    category: 'Antagonistas D2'
  },
  {
    id: 'fc-03-15',
    topicId: 'tema-03',
    concept: 'Antipsicóticos Atípicos: Clozapina y Aripiprazol',
    front: '¿Qué hace «atípico» a un antipsicótico y por qué el aripiprazol, siendo agonista D2, funciona como antipsicótico?',
    back: 'En cuanto a los atípicos, los típicos bloquean D2 en todas las vías: alivian los síntomas positivos, pero dan **EPS**, discinesia tardía e **hiperprolactinemia**, y no mejoran los negativos. La **clozapina** (dibenzodiazepina) bloquea más **5-HT2A** que D2 y apenas da EPS ni sube la prolactina; a cambio puede causar **agranulocitosis** y exige controles hematológicos. La **olanzapina** es su análogo tiofénico sin cloro. La **risperidona** combina un bloqueo D2 potente con un bloqueo 5-HT2A marcado.\n\nEl **aripiprazol** es un **agonista parcial D2** con una eficacia intrínseca del **25-30 %**. En la vía **mesolímbica**, saturada de dopamina, desplaza al agonista completo y baja la señal: actúa como antagonista funcional. En la **nigroestriada** y la **mesocortical**, donde falta dopamina, mantiene ese 25-30 % de estímulo: no hay EPS y no empeoran los síntomas negativos. Por eso lo llamamos **estabilizador dopaminérgico**.',
    structures: [
      { name: 'Clozapina', smiles: 'CN1CCN(C2=Nc3cc(Cl)ccc3Nc3ccccc32)CC1', badge: '5-HT2A > D2' },
      { name: 'Olanzapina', smiles: 'Cc1cc2c(s1)Nc1ccccc1N=C2N1CCN(C)CC1', badge: 'Tienobenzodiazepina' },
      { name: 'Aripiprazol', smiles: 'Clc1cccc(N2CCN(CCCCOc3ccc4CCC(=O)Nc4c3)CC2)c1Cl', badge: 'Agonista parcial D2' }
    ],
    difficulty: 'medium',
    category: 'Antipsicóticos Atípicos'
  },
  {
    id: 'fc-03-16',
    topicId: 'tema-03',
    concept: 'Neuroléptico Depot con un Solo Nitrógeno: Decanoato de Haloperidol',
    front: 'Diseña un neuroléptico de acción prolongada que tenga un solo átomo de nitrógeno y propón su síntesis.',
    back: 'Para resolverla empezamos por el **número de nitrógenos**. Las fenotiazinas tienen como mínimo dos (el N-10 y la amina de la cadena), y las piperazínicas con hidroxietilo, que son las que admiten un éster, tienen cuatro. Las descartamos. La **butirofenona** sí cumple: el **haloperidol** solo tiene el **N piperidínico**, y su **OH terciario** en C-4 es el punto donde colgar un ácido graso.\n\nLa síntesis sigue la ruta convergente: **Friedel-Crafts** del fluorobenceno con cloruro de 4-clorobutirilo y AlCl₃; **SN2** con el 4-(4-clorofenil)piperidin-4-ol (K₂CO₃, KI cat.); y al final **esterificación** del OH con **cloruro de decanoílo en piridina** (la piridina neutraliza el HCl). El **decanoato de haloperidol** en aceite se inyecta por vía IM **cada 4 semanas**; las **esterasas** liberan el haloperidol poco a poco. Es la misma idea que la de la flufenazina, aplicada a otra familia.',
    structures: [
      { name: 'Haloperidol', smiles: 'O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1', badge: '1 N · OH terciario' },
      { name: 'Decanoato de haloperidol', smiles: 'CCCCCCCCCC(=O)OC1(c2ccc(Cl)cc2)CCN(CCCC(=O)c2ccc(F)cc2)CC1', badge: 'Depot IM · 4 semanas' }
    ],
    difficulty: 'hard',
    ampliacion: true,
    category: 'Profármacos'
  },
  {
    id: 'fc-03-17',
    topicId: 'tema-03',
    concept: 'Domperidona frente a Metoclopramida',
    front: 'Verdadero o falso: «la domperidona actúa sobre receptores de serotonina para ejercer su efecto antiemético». Justifica y compárala con la metoclopramida.',
    back: '**Falso.** La domperidona es un **antagonista D2**, igual que la metoclopramida. La diferencia está en la distribución. Es un derivado **bencimidazolónico** y es sustrato de la **glicoproteína P**, así que apenas cruza la BHE: actúa en el **área postrema**, que queda fuera de la barrera, y en el estómago (procinético). Por eso casi no produce **EPS** y la preferimos para las náuseas de los pacientes con Parkinson tratados con L-DOPA o agonistas. La hipófisis también está fuera de la BHE, así que sí puede subir la **prolactina**. Su riesgo es cardíaco: **prolongación del QT**, por lo que la EMA la restringió en 2014 a dosis bajas y pautas cortas.\n\nLa **metoclopramida** cruza la BHE y puede dar distonías y discinesia tardía. A dosis altas bloquea además el **5-HT3**: esa observación es la que llevó a los **setrones** (ondansetrón, granisetrón), que vemos en el Tema 4.',
    structures: [
      { name: 'Domperidona', smiles: 'O=c1[nH]c2ccccc2n1CCCN1CCC(n2c(=O)[nH]c3cc(Cl)ccc32)CC1', badge: 'D2 periférico · sin EPS' },
      { name: 'Metoclopramida', smiles: 'CCN(CC)CCNC(=O)c1cc(Cl)c(N)cc1OC', badge: 'D2 central · EPS' }
    ],
    difficulty: 'easy',
    ampliacion: true,
    category: 'Antagonistas D2'
  },
  {
    id: 'fc-03-18',
    topicId: 'tema-03',
    concept: 'Síntesis de la Carbidopa (Strecker con Hidrazina)',
    front: 'Nos dan el nombre «ácido 2-(3,4-dihidroxibencil)-2-hidrazinilpropanoico». ¿Qué fármaco es y cómo lo sintetizamos?',
    back: 'Es la **carbidopa**. La síntesis clásica es una **Strecker modificada**, con **hidrazina** en lugar de amoniaco. Partimos de la **3,4-dimetoxifenilacetona**, con los fenoles protegidos como metil éteres porque el catecol libre se oxida. La cetona condensa con **N₂H₄** y el **cianuro (KCN)** se adiciona a la hidrazona: obtenemos el **α-hidrazino-α-metil nitrilo**. El cuaternario con el metilo sale directamente de la metil cetona.\n\nDespués hidrolizamos el nitrilo a ácido en medio ácido fuerte y **desmetilamos los éteres con HBr concentrado**, que deja libre el catecol. La mezcla racémica se resuelve para quedarnos con el eutómero **(S)**, el de la misma serie que la L-DOPA. Si en lugar de hidrazina usamos amoniaco (Strecker clásica), la misma cetona nos lleva a la **α-metildopa** del Tema 2.',
    structures: [
      { name: '3,4-Dimetoxifenilacetona', smiles: 'COc1ccc(CC(C)=O)cc1OC', badge: 'Cetona de partida' },
      { name: 'α-Hidrazino nitrilo', smiles: 'COc1ccc(CC(C)(C#N)NN)cc1OC', badge: 'Strecker con N₂H₄' },
      { name: '(S)-Carbidopa', smiles: 'NN[C@@](C)(Cc1ccc(O)c(O)c1)C(=O)O', badge: 'Hidrólisis + HBr' }
    ],
    difficulty: 'hard',
    ampliacion: true,
    category: 'Síntesis Orgánica'
  },
  {
    id: 'fc-03-19',
    topicId: 'tema-03',
    concept: 'De la Pargilina a la Selegilina: Mejorar un iMAO sin Tocar el Propargilo',
    front: 'La pargilina es N-bencil-N-metilprop-2-in-1-amina. ¿Por qué no podemos tocar el propargilo y qué cambios la convierten en la selegilina? Propón la síntesis de ambas.',
    back: 'El **propargilo** es el que inhibe: el FAD lo oxida y queda unido al **N-5 de la flavina**. Si lo quitamos, perdemos la inhibición suicida. Lo que sí podemos cambiar es la parte que reconoce la enzima. La **pargilina** es un iMAO irreversible con preferencia moderada por la MAO-B. Con dosis que ya inhiben la **MAO-A** intestinal y hepática, la **tiramina** de la dieta (quesos curados, embutidos, vino) no se degrada y libera noradrenalina: la crisis hipertensiva del **«efecto queso»**.\n\nPara llegar a la selegilina cambiamos el **bencilo** por un **(R)-1-fenilpropan-2-ilo**: alargamos a **fenetilamina** y ponemos un **α-metilo**, que frena la desaminación. El resultado reconoce mejor el bolsillo de la **MAO-B** y, a ≤ 10 mg/día, no da efecto queso. Las dos se sintetizan igual, por **N-alquilación** de la amina secundaria con **bromuro de propargilo** y K₂CO₃: la N-metilbencilamina da la pargilina y la **(R)-metanfetamina** da la selegilina, que conserva la configuración.',
    structures: [
      { name: 'Pargilina', smiles: 'C#CCN(C)Cc1ccccc1', badge: 'iMAO poco selectivo' },
      { name: '(R)-Metanfetamina', smiles: 'CN[C@H](C)Cc1ccccc1', badge: 'Amina de partida' },
      { name: '(R)-Selegilina', smiles: 'C#CCN(C)[C@H](C)Cc1ccccc1', badge: 'iMAO-B selectivo' }
    ],
    difficulty: 'hard',
    ampliacion: true,
    category: 'Inhibidores Enzimáticos'
  },
  {
    id: 'fc-03-20',
    topicId: 'tema-03',
    concept: 'Biosíntesis y Catabolismo: Metirosina, DOPAC y HVA',
    front: '¿Qué efecto tendrá un inhibidor de la tirosina hidroxilasa como la (S)-α-metiltirosina, y en qué metabolitos acaba la dopamina?',
    back: 'Sobre la biosíntesis, la **tirosina hidroxilasa** (tirosina → L-DOPA) es el **paso limitante** común a dopamina, noradrenalina y adrenalina. La **(S)-α-metiltirosina** (metirosina) la inhibe compitiendo con la tirosina, como **análogo de sustrato**. El efecto es **antiadrenérgico y antidopaminérgico** a la vez: respuesta verdadera en los V/F y pregunta de «predice la actividad» en los extraordinarios. Clínicamente la reservamos para el **feocromocitoma** inoperable.\n\nEn cuanto al catabolismo, la **MAO** desamina la dopamina a **DOPAC** (ácido 3,4-dihidroxifenilacético) y la **COMT** metila el 3-OH, que da la **3-metoxitiramina**. Las dos rutas confluyen en el **HVA** (ácido homovanílico), el marcador del recambio de dopamina; los antagonistas D2 lo aumentan. Conviene distinguir los tipos de inhibidor del tema: la metirosina, la carbidopa y la entacapona son **análogos de sustrato**; la selegilina es un **inhibidor suicida**.',
    structures: [
      { name: '(S)-α-Metiltirosina', smiles: 'C[C@](N)(Cc1ccc(O)cc1)C(=O)O', badge: 'Inhibe la tirosina hidroxilasa' },
      { name: 'DOPAC', smiles: 'OC(=O)Cc1ccc(O)c(O)c1', badge: 'Producto de la MAO' },
      { name: 'HVA', smiles: 'COc1cc(CC(=O)O)ccc1O', badge: 'MAO + COMT' }
    ],
    difficulty: 'easy',
    ampliacion: true,
    category: 'Biosíntesis y Metabolismo'
  },
  {
    id: 'fc-03-21',
    topicId: 'tema-03',
    concept: 'Ejercicio: Neuroléptico y Antiparkinsoniano en una Misma Molécula',
    front: 'Hay ejercicios que preguntan por una molécula con actividad neuroléptica (antagonista D2) y antiparkinsoniana a la vez. ¿Por qué parecen incompatibles y cómo se diseña?',
    back: 'Sobre el conflicto de partida, el neuroléptico bloquea D2 también en la vía **nigroestriada**, rompe el equilibrio dopamina/acetilcolina a favor de la acetilcolina y provoca los **síntomas extrapiramidales**: un parkinsonismo yatrógeno. Si para corregirlo subimos la dopamina, el fármaco trabaja contra sí mismo, porque el agonismo D2 reactiva la psicosis. La salida no está en el eje dopaminérgico, sino en el **otro brazo del equilibrio**: la vía **anticolinérgica central**, que no toca D2. Descartamos así todas las estrategias dopaminérgicas (L-DOPA, agonistas, iMAO-B, iCOMT, amantadina).\n\nLa molécula que buscamos, entonces, es un **antagonista D2 que además sea antimuscarínico central**. Integramos dos farmacóforos del tema: la cadena **4-fluorobutirofenónica** del haloperidol (bloqueo D2, por el puente salino de la amina con el Asp114) y el **éter bencidrílico** de la benztropina (bloqueo M1), colgado de la piperidina. El componente anticolinérgico **atenúa los efectos extrapiramidales** del propio bloqueo D2, igual que ocurre de forma natural en la **tioridazina** y la **clozapina**. Una alternativa válida parte de la benztropina y le añade el flúor en para del benzoílo para reforzar el perfil D2.',
    structures: [
      { name: 'Haloperidol', smiles: 'O=C(CCCN1CCC(O)(c2ccc(Cl)cc2)CC1)c1ccc(F)cc1', badge: 'Farmacóforo D2' },
      { name: 'Benztropina', smiles: 'CN1C2CCC1CC(OC(c1ccccc1)c1ccccc1)C2', badge: 'Farmacóforo M1' },
      { name: 'Híbrido propuesto', smiles: 'O=C(CCCN1CCCC(OC(c2ccccc2)c2ccccc2)C1)c1ccc(F)cc1', badge: 'D2 + M1' }
    ],
    difficulty: 'hard',
    ampliacion: true,
    category: 'Ejercicio de Integración'
  }
];
