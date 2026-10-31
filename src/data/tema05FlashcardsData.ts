// ==========================================================================
// QFDOS - Flashcards Tema 05: Aminoácidos como neurotransmisores
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// fc-05-01 a fc-05-24: contenido de los apuntes publicados del Tema 5
// (QFDOS Tema 5 Apuntes.pdf). Lo que va más allá de los apuntes se marca en un
// párrafo «Ampliación».
// fc-05-25 a fc-05-31: ampliación de temario, con `ampliacion: true`.
// SMILES de estructuras_qfdos.csv (Tema 5), contrastados con ChEMBL; validados con RDKit.
// Tipografía Científica: texto plano y caracteres Unicode directos (cero LaTeX crudo)
// ==========================================================================

import type { Flashcard } from './qfdosData';

export const TEMA5_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-05-01",
    topicId: 'tema-05',
    concept: "Aminoácidos Neurotransmisores y su Estereoquímica",
    front: "¿Qué separa a los aminoácidos excitadores de los inhibidores, por qué casi todos los L-aminoácidos son (S) y cuáles son las dos excepciones que hay que saberse?",
    back: "En cuanto a la carga, los **excitadores** son ácidos: llevan **dos grupos ácidos** frente a un solo amino. Son el **ácido L-glutámico** (cinco carbonos) y el **ácido L-aspártico** (cuatro). Los **inhibidores** son neutros, con un ácido y un amino: el **GABA**, principal inhibidor del encéfalo; la **glicina**, que predomina en la médula espinal y el tronco del encéfalo; y la **taurina**, con un ácido sulfónico en lugar del carboxilo.\n\nRespecto a la estereoquímica, todos los aminoácidos naturales son de la **serie L**, y con las reglas CIP casi todos son **(S)**. La **L-cisteína** es **(R)**: el primer átomo de su cadena es un carbono unido a azufre, que pesa más que el oxígeno del carboxilo y cambia el orden de prioridades. La **glicina** no tiene estereocentro, porque su Cα lleva dos hidrógenos. En el examen asignamos R/S con las reglas CIP cada vez: el dibujo puede venir girado.",
    structures: [
      { name: "Ácido L-glutámico", smiles: "N[C@@H](CCC(=O)O)C(=O)O", badge: "Excitador · 5 C" },
      { name: "Ácido L-aspártico", smiles: "N[C@@H](CC(=O)O)C(=O)O", badge: "Excitador · 4 C" },
      { name: "GABA", smiles: "NCCCC(=O)O", badge: "Inhibidor · encéfalo" },
      { name: "Glicina", smiles: "NCC(=O)O", badge: "Sin estereocentro" },
      { name: "Taurina", smiles: "NCCS(=O)(=O)O", badge: "Ácido sulfónico" }
    ],
    difficulty: 'easy',
    category: "Aminoácidos y Metabolismo del GABA"
  },
  {
    id: "fc-05-02",
    topicId: 'tema-05',
    concept: "Biosíntesis y Degradación del GABA",
    front: "¿Qué tres enzimas fabrican y destruyen el GABA, con qué cofactor trabaja cada una y cuántos carbonos tiene cada intermedio de la ruta?",
    back: "En la biosíntesis, la **glutamato descarboxilasa (GAD)**, con **PLP**, quita como CO₂ el carboxilo en **α** respecto al amino del ácido L-glutámico. Si quitara el de la cadena lateral no saldría GABA: la enzima distingue dos grupos iguales dentro de la misma molécula.\n\nEn la degradación, la **GABA transaminasa (GABA-AT)**, también con **PLP**, pasa el amino del GABA al **α-cetoglutarato** (que vuelve a glutamato) y deja el **semialdehído succínico**. La **SSADH**, con **NAD⁺**, lo oxida a **ácido succínico**, que entra en el ciclo de Krebs. Es la lógica de la MAO del tema 4: amina primaria → aldehído → ácido.\n\nContamos carbonos: glutámico **5**, GABA **4**, semialdehído succínico **4** y succínico **4**. Una opción con 3 o 5 carbonos en esa ruta está mal. Inhibir la GAD baja el GABA y es convulsivante; inhibir la GABA-AT lo sube.",
    structures: [
      { name: "Ácido L-glutámico", smiles: "N[C@@H](CCC(=O)O)C(=O)O", badge: "GAD · PLP · −CO₂" },
      { name: "GABA", smiles: "NCCCC(=O)O", badge: "GABA-AT · PLP" },
      { name: "Semialdehído succínico", smiles: "O=CCCC(=O)O", badge: "SSADH · NAD⁺" },
      { name: "Ácido succínico", smiles: "O=C(O)CCC(=O)O", badge: "Ciclo de Krebs" }
    ],
    difficulty: 'easy',
    category: "Aminoácidos y Metabolismo del GABA"
  },
  {
    id: "fc-05-03",
    topicId: 'tema-05',
    concept: "Por qué el GABA no Sirve como Fármaco",
    front: "Las crisis epilépticas cesan si inyectamos GABA en el cerebro. ¿Por qué no funciona darlo por vía oral o intravenosa y qué estrategia usamos en su lugar?",
    back: "Respecto al GABA como fármaco, a pH 7,4 el amino está protonado (–NH₃⁺) y el carboxilo ionizado (–COO⁻): es un **zwitterión**, muy polar, que **no cruza la barrera hematoencefálica** por difusión pasiva. Por vía oral o intravenosa no tiene efecto anticonvulsivo.\n\nLa estrategia es no aportar GABA desde fuera sino **frenar la destrucción del que ya fabrica el cerebro**, con moléculas que sí atraviesen la barrera. La diana es la **GABA-AT**: al bloquearla el GABA cerebral sube. La **GAD** no se toca, porque es la que lo fabrica y sus inhibidores dan convulsiones. El otro camino del tema es potenciar el receptor GABA-A desde sitios alostéricos (benzodiazepinas, fármacos Z, neuroesteroides, barbitúricos).\n\n**Ampliación:** la GAD también depende del **PLP**, así que un compuesto que atrape el cofactor frena las dos enzimas a la vez. Es lo que pasa con las **hidrazinas**: una sobredosis de **isoniazida** agota el PLP, baja el GABA y produce convulsiones, que se tratan con **piridoxina** (vitamina B6). Por eso buscamos inhibidores que solo procese la GABA-AT, como la vigabatrina.",
    structures: [
      { name: "GABA", smiles: "NCCCC(=O)O", badge: "Zwitterión a pH 7,4" },
      { name: "Vigabatrina", smiles: "C=CC(N)CCC(=O)O", badge: "Cruza la BHE · GABA-AT" }
    ],
    difficulty: 'easy',
    category: "Aminoácidos y Metabolismo del GABA"
  },
  {
    id: "fc-05-04",
    topicId: 'tema-05',
    concept: "El PLP y la Transaminación",
    front: "¿Qué grupo del fosfato de piridoxal trabaja en la GABA-AT y por qué pasos va el GABA hasta salir como semialdehído succínico?",
    back: "En cuanto al cofactor, el **fosfato de piridoxal (PLP)** es la forma activa de la vitamina B6. La proteína sola es la **apoenzima**; con el cofactor, la **holoenzima** activa. El grupo clave es el **aldehído del C4** de la piridina: una **lisina** del centro activo lo ataca, sale agua y se forma una **base de Schiff** (C=N).\n\nLa transaminación sigue cinco pasos. (1) **Aldimina interna**: PLP unido a la lisina. (2) **Aldimina externa**: el amino del GABA desplaza a la lisina. (3) Se arranca un protón y se protona el C4′: **cetimina**, favorecida porque la piridina deslocaliza la carga. (4) **Hidrólisis**: sale el semialdehído succínico y queda el **fosfato de piridoxamina (PMP)**, con –CH₂–NH₂ en lugar del aldehído. (5) El PMP cede el amino al **α-cetoglutarato** (que pasa a glutamato) y se regenera el PLP.",
    structures: [
      { name: "PLP", smiles: "Cc1ncc(COP(=O)(O)O)c(C=O)c1O", badge: "Aldehído en C4" },
      { name: "PMP", smiles: "Cc1ncc(COP(=O)(O)O)c(CN)c1O", badge: "CH₂–NH₂ en C4" },
      { name: "α-Cetoglutarato", smiles: "O=C(O)CCC(=O)C(=O)O", badge: "Acepta el amino" }
    ],
    difficulty: 'medium',
    category: "Aminoácidos y Metabolismo del GABA"
  },
  {
    id: "fc-05-05",
    topicId: 'tema-05',
    concept: "Adición 1,4 de Michael: Reconocer el Sistema",
    front: "Te dan dos cetonas insaturadas: CH₃–CH=CH–CO–CH₃ y CH₂=CH–CH₂–CO–CH₃. ¿Cuál puede sufrir una adición de Michael y qué nucleófilos de una proteína la hacen?",
    back: "En cuanto a la reactividad, en un carbonilo aislado el nucleófilo ataca el carbono del C=O (**adición 1,2**). Si el C=O está **directamente conjugado** con un C=C, las formas resonantes dejan una carga parcial positiva en el **carbono β**, y un nucleófilo blando ataca ahí: es la **adición 1,4** o **de Michael**. El aducto inicial es un enol que tautomeriza al carbonilo.\n\nLa **pent-3-en-2-ona** (O=C–CH=CH–CH₃) sí la da: doble, sencillo, doble. La **pent-4-en-2-ona** (O=C–CH₂–CH=CH₂) no: el CH₂ sp³ corta la conjugación. El carbonilo puede ser de ácido, éster, amida, aldehído o cetona, y también vale una **imina** conjugada. En una proteína atacan el –SH de una **cisteína** o el –NH₂ de una **lisina**, que es lo que pasa con la vigabatrina.",
    structures: [
      { name: "Pent-3-en-2-ona", smiles: "CC=CC(C)=O", badge: "α,β-insaturada · sí" },
      { name: "Pent-4-en-2-ona", smiles: "C=CCC(C)=O", badge: "CH₂ sp³ · no" }
    ],
    difficulty: 'medium',
    category: "Aminoácidos y Metabolismo del GABA"
  },
  {
    id: "fc-05-06",
    topicId: 'tema-05',
    concept: "Vigabatrina: Inhibidor Suicida de la GABA-AT",
    front: "¿Qué es la vigabatrina, por qué decimos que la GABA-AT «se suicida» al procesarla y qué efecto adverso obliga a vigilar a quien la toma?",
    back: "Respecto a la estructura, la **vigabatrina** es el **γ-vinil-GABA** (ácido 4-aminohex-5-enoico): el GABA con un **vinilo** en el C4. Se vende como racémico y el enantiómero activo es el **(S)**. El vinilo es un electrófilo latente que no reacciona hasta que la enzima lo activa.\n\nEl mecanismo tiene tres pasos. Su amino forma la **aldimina externa** con el PLP, igual que el GABA. La enzima arranca un protón y el doble enlace queda conjugado con la imina: una **imina α,β-insaturada**. La **lisina** del centro activo ataca en **1,4** y forma un **aducto covalente**. La enzima la trata como sustrato y genera ella misma el grupo que la destruye: **inhibidor suicida**, irreversible. La actividad solo vuelve cuando la célula fabrica GABA-AT nueva.\n\nSe usa en los **espasmos infantiles** y la **epilepsia focal refractaria**. Produce **defectos irreversibles del campo visual**, así que exige controles oftalmológicos.",
    structures: [
      { name: "GABA", smiles: "NCCCC(=O)O", badge: "Sustrato natural" },
      { name: "Vigabatrina", smiles: "C=CC(N)CCC(=O)O", badge: "γ-Vinil · (S) activo" }
    ],
    difficulty: 'medium',
    category: "Antiepilépticos GABAérgicos"
  },
  {
    id: "fc-05-07",
    topicId: 'tema-05',
    concept: "Valproato Sódico",
    front: "¿Sobre qué enzima de la degradación del GABA actúa sobre todo el valproato y qué otros mecanismos explican su efecto antiepiléptico?",
    back: "En cuanto al valproato, sube el GABA de forma **indirecta**. Inhibe sobre todo la **SSADH**, el paso siguiente a la GABA-AT, y a esta solo débilmente. El semialdehído succínico se acumula y la degradación del GABA va más lenta. No es un inhibidor de la GABA-AT como la vigabatrina.\n\nAdemás bloquea canales de **Na⁺** y de **Ca²⁺ tipo T**, así que no todo su efecto pasa por el GABA. Estructuralmente es un ácido de **ocho carbonos con dos propilos en el C2** (ácido 2-propilpentanoico), sin grupo amino. Es **teratógeno**: se prescribe dentro de un programa de prevención de embarazos.",
    structures: [
      { name: "Valproato sódico", smiles: "CCCC(CCC)C(=O)[O-].[Na+]", badge: "C8 · dos propilos en C2" },
      { name: "Semialdehído succínico", smiles: "O=CCCC(=O)O", badge: "Se acumula · SSADH" }
    ],
    difficulty: 'easy',
    category: "Antiepilépticos GABAérgicos"
  },
  {
    id: "fc-05-08",
    topicId: 'tema-05',
    concept: "El Receptor GABA-A y sus Sitios de Unión",
    front: "¿Cómo es el receptor GABA-A, qué pasa en la neurona cuando se abre y dónde se unen el GABA, las benzodiazepinas, los barbitúricos y los neuroesteroides?",
    back: "Respecto a la estructura, el **GABA-A** es un **pentámero**, habitualmente con **dos α, dos β y una γ**, que forma un **canal de Cl⁻**. En reposo está cerrado. Cuando el GABA se une, el canal se abre, entra Cl⁻ y la membrana se **hiperpolariza**: la neurona se vuelve menos excitable.\n\nEn cuanto a los sitios, el **GABA** se une en las interfases **β/α**, el sitio **ortostérico**. Las **benzodiazepinas** y los fármacos Z se unen en la interfase **α/γ2**, un sitio **alostérico**: no compiten con el GABA, cambian la conformación del receptor. Los **barbitúricos**, los **neuroesteroides** y los anestésicos generales se unen en el **dominio transmembrana**, cada uno en su sitio. Varios sitios con un mismo efecto inhibidor: por eso hablamos de un **receptor plástico**.",
    structures: [
      { name: "GABA", smiles: "NCCCC(=O)O", badge: "Ortostérico · β/α" },
      { name: "Diazepam", smiles: "CN1C(=O)CN=C(c2ccccc2)c2cc(Cl)ccc21", badge: "Alostérico · α/γ2" },
      { name: "Fenobarbital", smiles: "CCC1(c2ccccc2)C(=O)NC(=O)NC1=O", badge: "Transmembrana" }
    ],
    difficulty: 'easy',
    category: "Receptores del GABA"
  },
  {
    id: "fc-05-09",
    topicId: 'tema-05',
    concept: "Benzodiazepinas frente a Barbitúricos",
    front: "Las dos familias son moduladores alostéricos positivos del GABA-A. ¿En qué se diferencian sobre el canal, en seguridad y en el antídoto?",
    back: "En cuanto al canal, las **benzodiazepinas** aumentan la **frecuencia** de apertura y los **barbitúricos** alargan la **duración** de cada apertura. Una benzodiazepina **sin GABA no tiene efecto**, porque es un modulador alostérico positivo; los barbitúricos, a dosis altas, **abren el canal sin GABA**.\n\nRespecto a la seguridad, las benzodiazepinas tienen un **margen amplio** y los barbitúricos uno **estrecho**: al subir la dosis aparece la **depresión respiratoria**. El **flumazenilo** revierte las benzodiazepinas (y los fármacos Z), pero **no** los barbitúricos, que no tienen antídoto.",
    structures: [
      { name: "Diazepam", smiles: "CN1C(=O)CN=C(c2ccccc2)c2cc(Cl)ccc21", badge: "↑ frecuencia · necesita GABA" },
      { name: "Fenobarbital", smiles: "CCC1(c2ccccc2)C(=O)NC(=O)NC1=O", badge: "↑ duración · sin antídoto" },
      { name: "Flumazenilo", smiles: "CCOC(=O)c1ncn2c1CN(C)C(=O)c1cc(F)ccc1-2", badge: "Antídoto de BZD" }
    ],
    difficulty: 'easy',
    category: "Receptores del GABA"
  },
  {
    id: "fc-05-10",
    topicId: 'tema-05',
    concept: "Sternbach y el Clordiazepóxido",
    front: "Sternbach esperaba benzoxadiazepinas y obtuvo quinazolina 3-óxidos. ¿Por qué con aminas secundarias salieron productos inactivos y con metilamina un hipnótico potente?",
    back: "En cuanto a la historia, a partir de la **oxima de una benzofenona** y **cloruro de cloroacetilo**, Sternbach preparó unos heterociclos que creyó 3,1,4-benzoxadiazepinas. Años después, en Roche, vio que eran **quinazolina 3-óxidos** con un **clorometilo en el C2**. Con **aminas secundarias** dieron aminometilderivados **inactivos**: la amina voluminosa hace una **SN2 sobre el CH₂Cl** y el anillo de seis se conserva.\n\nEn **1957** se ensayó el único derivado preparado con una **amina primaria**, la **metilamina**, y resultó un hipnótico-sedante potente. La metilamina, poco impedida, ataca el **C2** de la quinazolina 3-óxido (con carga parcial positiva), se **abre el anillo de seis** y el nitrógeno ataca el clorometilo y **cierra uno de siete**. Era una **1,4-benzodiazepina**: el **clordiazepóxido** (Librium, 1960). Un hallazgo por **serendipia**.\n\n**Ampliación:** el derivado de metilamina llevaba unos dos años guardado sin ensayar cuando apareció al ordenar el laboratorio en 1957. Se mandó a ensayar y fue el único activo de toda la serie.",
    structures: [
      { name: "Oxima cloroacetilada", smiles: "ClCC(=O)Nc1ccc(Cl)cc1C(=NO)c1ccccc1", badge: "Producto de partida" },
      { name: "Quinazolina 3-óxido", smiles: "ClCc1nc2ccc(Cl)cc2c(-c2ccccc2)[n+]1[O-]", badge: "CH₂Cl en C2" },
      { name: "Clordiazepóxido", smiles: "CNC1=Nc2ccc(Cl)cc2C(c2ccccc2)=[N+]([O-])C1", badge: "Anillo de siete · amidina" }
    ],
    difficulty: 'hard',
    category: "Benzodiazepinas: Descubrimiento y Síntesis"
  },
  {
    id: "fc-05-11",
    topicId: 'tema-05',
    concept: "Del Clordiazepóxido a las Benzodiazepin-2-onas",
    front: "¿Qué le hace el organismo al clordiazepóxido y qué conclusión sacó Roche de esos metabolitos para diseñar la segunda generación?",
    back: "En cuanto al metabolismo, el clordiazepóxido pierde la metilamina: entra agua en el **C2** y la **amidina** pasa a **lactama**. El producto es el **demoxepam**, igual de potente o más y más fácil de sintetizar. Si además se **reduce el N-óxido**, queda el **nordazepam**, que también es activo.\n\nLa conclusión fue que ni la metilamina ni el N-óxido son imprescindibles. Así nacieron las **1,4-benzodiazepin-2-onas**, con un **C=O en el C2**: la segunda generación, con el **diazepam** (Valium, Roche, 1963) a la cabeza. El diazepam es el nordazepam con un **N1–CH₃**.",
    structures: [
      { name: "Clordiazepóxido", smiles: "CNC1=Nc2ccc(Cl)cc2C(c2ccccc2)=[N+]([O-])C1", badge: "Amidina + N-óxido" },
      { name: "Demoxepam", smiles: "O=C1C[N+]([O-])=C(c2ccccc2)c2cc(Cl)ccc2N1", badge: "Lactama + N-óxido" },
      { name: "Nordazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1", badge: "Lactama · activo" },
      { name: "Diazepam", smiles: "CN1C(=O)CN=C(c2ccccc2)c2cc(Cl)ccc21", badge: "N1–CH₃" }
    ],
    difficulty: 'medium',
    category: "Benzodiazepinas: Descubrimiento y Síntesis"
  },
  {
    id: "fc-05-12",
    topicId: 'tema-05',
    concept: "Síntesis del Diazepam y del Oxazepam",
    front: "Partiendo de la oxima de la 2-amino-5-clorobenzofenona, ¿qué reactivo y qué tipo de reacción hay en cada paso hasta el diazepam y, desde el demoxepam, hasta el oxazepam?",
    back: "En la síntesis del diazepam: (1) **ClCH₂COCl** acila el NH₂ y da la cloroacetamida: es una **acilación**, no una alquilación, porque el cloruro de ácido reacciona por el carbonilo. (2) **NaOH**: el N de la oxima ataca el CH₂Cl y cierra el anillo de siete con N-óxido, el **demoxepam** (alquilación intramolecular). (3) **H₂, Pd**: reducción suave que quita el O del N-óxido sin tocar el C=O del C2 y da el **nordazepam**. (4) **Me₂SO₄, NaOEt**: metilación en N1 y **diazepam**.\n\nPara el oxazepam volvemos al demoxepam. (5) **Ac₂O**: **transposición de Polonovski**, que lleva el oxígeno del N-óxido al **C3** como acetato (el mecanismo no entra). (6) **H₂O, OH⁻**: hidrólisis del éster; queda el **3-OH** del **oxazepam** y sale ácido acético.\n\nPara no ganar ni perder átomos, numeramos del 1 al 7 los átomos que van a formar el anillo.",
    structures: [
      { name: "Demoxepam", smiles: "O=C1C[N+]([O-])=C(c2ccccc2)c2cc(Cl)ccc2N1", badge: "Ciclación · NaOH" },
      { name: "Nordazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1", badge: "H₂, Pd" },
      { name: "Diazepam", smiles: "CN1C(=O)CN=C(c2ccccc2)c2cc(Cl)ccc21", badge: "Me₂SO₄" },
      { name: "3-Acetoxinordazepam", smiles: "CC(=O)OC1N=C(c2ccccc2)c2cc(Cl)ccc2NC1=O", badge: "Polonovski · Ac₂O" },
      { name: "Oxazepam", smiles: "O=C1Nc2ccc(Cl)cc2C(c2ccccc2)=NC1O", badge: "Hidrólisis · 3-OH" }
    ],
    difficulty: 'hard',
    category: "Benzodiazepinas: Descubrimiento y Síntesis"
  },
  {
    id: "fc-05-13",
    topicId: 'tema-05',
    concept: "Flurazepam y Prazepam: Alquilar el N1",
    front: "¿Por qué hace falta NaH para alquilar el N1 de una benzodiazepin-2-ona y qué le pasa en el hígado a la cadena del flurazepam?",
    back: "En cuanto a la alquilación, el **N1** está conjugado con el anillo aromático y con el **C=O del C2**: su par de electrones está deslocalizado y no es nucleófilo. El **NaH** arranca el protón del N–H (sale **H₂**) y deja un **anión** en N1, mucho más nucleófilo, que se alquila con el haluro. Así entran el **dietilaminoetilo** del **flurazepam** (Cl–CH₂–CH₂–NEt₂) y el **ciclopropilmetilo** del **prazepam** ((clorometil)ciclopropano).\n\nEn la ruta del flurazepam, la benzofenona con **2′-F** sale de una **acilación de Friedel–Crafts** (4-cloroanilina y cloruro de 2-fluorobenzoílo, AlCl₃). Sigue una **acilación** con **BrCH₂COBr**, la formación de la imina con **NH₃** y el cierre del anillo de siete. En el hígado, la **N-desalquilación** quita la cadena de N1 y deja un **metabolito activo de semivida muy larga**. La actividad de un fármaco es la suma de la suya y la de sus metabolitos activos.",
    structures: [
      { name: "Flurazepam", smiles: "CCN(CC)CCN1C(=O)CN=C(c2ccccc2F)c2cc(Cl)ccc21", badge: "N1-dietilaminoetilo · 2′-F" },
      { name: "N1-Desalquilflurazepam", smiles: "O=C1CN=C(c2ccccc2F)c2cc(Cl)ccc2N1", badge: "Metabolito activo" },
      { name: "Prazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1CC1CC1", badge: "N1-ciclopropilmetilo" }
    ],
    difficulty: 'hard',
    category: "Benzodiazepinas: Descubrimiento y Síntesis"
  },
  {
    id: "fc-05-14",
    topicId: 'tema-05',
    concept: "Síntesis General: Ejercicio del Prazepam",
    front: "En la síntesis general de las 1,4-benzodiazepin-2-onas acilamos una o-aminobenzofenona con cloruro de cloroacetilo y tratamos con amoníaco. ¿Por qué la amina ataca primero el cloruro de ácido y cómo se cierra el anillo?",
    back: "En cuanto al primer paso, el **cloruro de acilo** es mucho más electrófilo que el cloruro de alquilo: el NH₂ de la 2-amino-5-clorobenzofenona ataca el carbonilo (**adición–eliminación**) y forma la **cloroacetamida**. El CH₂Cl queda libre.\n\nDespués, el **NH₃** desplaza al cloro por **SN2** y da la **aminoacetamida**. Al calentar, esa amina primaria **condensa con la cetona** de la benzofenona (formación de imina, sale H₂O) y cierra el anillo de siete: el **nordazepam**. Para el **prazepam** desprotonamos la lactama con **NaH** y alquilamos el N1 con **(clorometil)ciclopropano**.",
    structures: [
      { name: "Cloroacetamida", smiles: "ClCC(=O)Nc1ccc(Cl)cc1C(=O)c1ccccc1", badge: "Acilación · ClCH₂COCl" },
      { name: "Aminoacetamida", smiles: "NCC(=O)Nc1ccc(Cl)cc1C(=O)c1ccccc1", badge: "SN2 · NH₃" },
      { name: "Nordazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1", badge: "Imina · −H₂O" },
      { name: "Prazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1CC1CC1", badge: "NaH; R–Cl" }
    ],
    difficulty: 'medium',
    category: "Benzodiazepinas: Descubrimiento y Síntesis"
  },
  {
    id: "fc-05-15",
    topicId: 'tema-05',
    concept: "Numeración y SAR de las 1,4-Benzodiazepinas",
    front: "Te dan cuatro benzodiazepinas y una no tiene actividad. ¿Cómo numeramos el sistema y qué buscamos en los anillos A, B y C para encontrarla?",
    back: "En cuanto a la numeración, el **N1** es el nitrógeno unido al carbono de fusión con el benceno. Seguimos por el anillo de siete: **C2** (el carbonilo de las 2-onas), **C3**, **N4** y **C5**, que lleva el anillo C; después el benceno fusionado, **C6 a C9**. El fenilo del C5 se numera con primas, **1′ a 6′**. El anillo **A** es el benceno fusionado, el **B** la diazepina y el **C** el fenilo del C5.\n\nRespecto a la SAR: en **C7**, un grupo **atrayente de electrones** (Cl, NO₂, CF₃, Br, CN), como el 7-NO₂ del **nitrazepam**; en C6, C8 y C9, nada. En **N1**, un CH₃ suele aumentar la potencia. En **C3**, un **OH** se glucuronida directamente y acorta la semivida (**oxazepam**, **lorazepam**), y un **COOH** se descarboxila en el estómago a nordazepam (**clorazepato**, profármaco). En **C5**, un arilo (el 2-piridilo del **bromazepam**); los alquilos restan potencia. En **2′**, F o Cl aumentan la actividad; en meta o para, la reducen.\n\nLa inactiva suele ser la que lleva un **dador** (–NH₂, –OH) en C7.\n\n**Ampliación:** el **3-COOH** da derivados **hidrosolubles**: el clorazepato se formula como **sal dipotásica**. Y el 3-OH no cambia la actividad ansiolítica: cambia la eliminación, que es más rápida.",
    structures: [
      { name: "Nitrazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc([N+](=O)[O-])ccc2N1", badge: "7-NO₂" },
      { name: "Lorazepam", smiles: "O=C1Nc2ccc(Cl)cc2C(c2ccccc2Cl)=NC1O", badge: "3-OH · 2′-Cl" },
      { name: "Ácido clorazépico", smiles: "O=C(O)C1N=C(c2ccccc2)c2cc(Cl)ccc2NC1=O", badge: "3-COOH · profármaco" },
      { name: "Bromazepam", smiles: "O=C1CN=C(c2ccccn2)c2cc(Br)ccc2N1", badge: "5-(2-piridilo)" }
    ],
    difficulty: 'medium',
    category: "SAR de Benzodiazepinas"
  },
  {
    id: "fc-05-16",
    topicId: 'tema-05',
    concept: "Anillos Fusionados y Flumazenilo",
    front: "¿Qué ganamos al fusionar un triazol o un imidazol sobre el enlace N1–C2 y por qué el flumazenilo, que se une al mismo sitio, es un antídoto?",
    back: "En cuanto a los anillos fusionados, salen compuestos **potentes y de semivida corta**. El **triazolam** es una triazolobenzodiazepina con **2′-Cl**, hipnótica; el **alprazolam**, la misma sin 2′-Cl, ansiolítica. El **midazolam** es una **imidazobenzodiazepina** con 2′-F: el imidazol es básico y forma **sales hidrosolubles**, por eso se usa en sedación **intravenosa**. También se puede cambiar el anillo A por un heterociclo: el **ripazepam** lleva un pirazol y nunca se comercializó.\n\nEl **flumazenilo** es una imidazobenzodiazepina **sin 5-arilo** y con un éster etílico. Se une al sitio **α/γ2** pero **no tiene actividad intrínseca**: es el **antagonista** que desplaza a las benzodiazepinas y a los fármacos Z en las sobredosis. Ocupar el sitio no es activarlo.\n\n**Ampliación:** el **estazolam** es otra triazolobenzodiazepina hipnótica, el alprazolam sin el metilo del triazol. A las triazolo- e imidazobenzodiazepinas se las agrupa a veces como **tercera generación**, después del clordiazepóxido y de las 2-onas.",
    structures: [
      { name: "Triazolam", smiles: "Cc1nnc2n1-c1ccc(Cl)cc1C(c1ccccc1Cl)=NC2", badge: "Triazol · 2′-Cl" },
      { name: "Alprazolam", smiles: "Cc1nnc2n1-c1ccc(Cl)cc1C(c1ccccc1)=NC2", badge: "Triazol · ansiolítico" },
      { name: "Midazolam", smiles: "Cc1ncc2n1-c1ccc(Cl)cc1C(c1ccccc1F)=NC2", badge: "Imidazol · IV" },
      { name: "Flumazenilo", smiles: "CCOC(=O)c1ncn2c1CN(C)C(=O)c1cc(F)ccc1-2", badge: "Sin 5-arilo · antagonista" }
    ],
    difficulty: 'medium',
    category: "SAR de Benzodiazepinas"
  },
  {
    id: "fc-05-17",
    topicId: 'tema-05',
    concept: "Neuroesteroides: de la Progesterona a la Ganaxolona",
    front: "¿Qué dos reducciones convierten la progesterona en alopregnanolona y qué truco estructural permite dar la ganaxolona por vía oral?",
    back: "En cuanto a la ruta, la **5α-reductasa** reduce el doble enlace **C4=C5** del anillo A y la **3α-HSD** reduce la cetona del **C3** a un alcohol **3α**. El resultado, la **alopregnanolona**, se une al **dominio transmembrana** del GABA-A, en un sitio distinto del de las benzodiazepinas y del de los barbitúricos.\n\nLa **brexanolona** es la alopregnanolona por vía intravenosa, para la depresión posparto (retirada). En la **ganaxolona**, un **3β-metilo** impide que el organismo oxide el 3α-OH, y así se puede dar por **vía oral**. La **zuranolona** es oral, para la depresión posparto (2023). No se fabrican por síntesis total: con seis a ocho estereocentros no compensa, así que se parte de otro esteroide (**semisíntesis**) o de microorganismos y enzimas.",
    structures: [
      { name: "Progesterona", smiles: "CC(=O)[C@H]1CC[C@H]2[C@@H]3CCC4=CC(=O)CC[C@]4(C)[C@H]3CC[C@]12C", badge: "C4=C5 · 3-ceto" },
      { name: "Alopregnanolona", smiles: "CC(=O)[C@H]1CC[C@H]2[C@@H]3CC[C@H]4C[C@H](O)CC[C@]4(C)[C@H]3CC[C@]12C", badge: "5α · 3α-OH" },
      { name: "Ganaxolona", smiles: "CC(=O)[C@H]1CC[C@H]2[C@@H]3CC[C@H]4C[C@](C)(O)CC[C@]4(C)[C@H]3CC[C@]12C", badge: "3β-CH₃ · oral" }
    ],
    difficulty: 'medium',
    category: "Receptor Plástico: Neuroesteroides y Fármacos Z"
  },
  {
    id: "fc-05-18",
    topicId: 'tema-05',
    concept: "Fármacos Z: Zopiclona y Zolpidem",
    front: "Los fármacos Z no son benzodiazepinas. ¿Dónde se unen, por qué los revierte el flumazenilo y por qué el zolpidem es más hipnótico que ansiolítico?",
    back: "En cuanto a la estructura, la **zopiclona** es una **ciclopirrolona** (se vende como racémico) y el **zolpidem**, una **imidazopiridina** con una dimetilacetamida. Se unen al **mismo sitio que las benzodiazepinas** (α/γ2) y son moduladores alostéricos positivos, así que el **flumazenilo** también los revierte.\n\nEl **zolpidem** prefiere los receptores con subunidad **α1**: por eso es hipnótico y apenas ansiolítico. La zopiclona no es selectiva. Los dos se usan en el **insomnio** y los dos producen **tolerancia y dependencia**.",
    structures: [
      { name: "Zopiclona", smiles: "CN1CCN(C(=O)OC2c3nccnc3C(=O)N2c2ccc(Cl)cn2)CC1", badge: "Ciclopirrolona · racémica" },
      { name: "Zolpidem", smiles: "Cc1ccc(-c2nc3ccc(C)cn3c2CC(=O)N(C)C)cc1", badge: "Imidazopiridina · α1" }
    ],
    difficulty: 'easy',
    category: "Receptor Plástico: Neuroesteroides y Fármacos Z"
  },
  {
    id: "fc-05-19",
    topicId: 'tema-05',
    concept: "Barbitúricos: Numeración, Tautomería y pKa",
    front: "¿Por qué el ácido barbitúrico es inactivo y los 5,5-disustituidos son hipnóticos? Calcula la fracción neutra a pH 7,4 de cada uno.",
    back: "En cuanto a la estructura, el **ácido barbitúrico** es una **pirimidina-2,4,6-triona** que sale de una urea y un malonato. Numeramos por el camino corto entre nitrógenos (**N1, C2, N3**) y seguimos por **C4, C5 y C6**: los carbonilos van en C2, C4 y C6 y el **C5** lleva los sustituyentes. Tiene **tautomería ceto-enólica y lactama-lactima**, como el uracilo. En los 5,5-disustituidos ya no queda H en C5, así que el equilibrio que cuenta es el **lactama-lactima** del N–H: al desprotonarlo preparamos **sales sódicas** solubles para uso parenteral, como el fenobarbital sódico. Los tautómeros son isómeros reales; las formas resonantes, dibujos de una sola especie.\n\nSolo la forma **neutra** cruza la BHE. Con % neutra = 100 / (1 + 10 elevado a (pH − pKa)): el ácido barbitúrico (**pKa 4,1**) está neutro en un **0,05 %** y es inactivo, porque su anión se deslocaliza sobre los tres carbonilos. Los **5,5-disustituidos** (**pKa 7,6**) están neutros en un **61 %**: activos. Los **N-alquilados** (**pKa 8,5**), en un **93 %**: inicio más rápido y acción más corta.",
    structures: [
      { name: "Ácido barbitúrico", smiles: "O=C1CC(=O)NC(=O)N1", badge: "pKa 4,1 · inactivo" },
      { name: "Barbital", smiles: "CCC1(CC)C(=O)NC(=O)NC1=O", badge: "pKa 7,6 · 61 % neutro" },
      { name: "Metarbital", smiles: "CCC1(CC)C(=O)NC(=O)N(C)C1=O", badge: "N-metilo · pKa 8,5" }
    ],
    difficulty: 'hard',
    category: "Barbitúricos"
  },
  {
    id: "fc-05-20",
    topicId: 'tema-05',
    concept: "Postulado de Sandberg y Duración de Acción",
    front: "¿Qué requisitos pide el postulado de Sandberg a un barbitúrico activo y cómo cambia la duración de acción con la suma de carbonos en C5 y con un C=S en C2?",
    back: "En cuanto a Sandberg, el barbitúrico activo es un **ácido débil** con un reparto lípido/agua acotado (**log P ≈ 2**), **disustituido en C5**, con cada sustituyente de **6 carbonos como máximo** y la suma **no mayor de 10**.\n\nRespecto a la duración: **prolongada** (≥ 6 h) con R + R′ = 4 o fenilo y etilo, como el **barbital** y el **fenobarbital** (sedantes y anticonvulsivantes); **intermedia** (3–6 h) con 5–7 carbonos, como el **pentobarbital**; **corta** (≤ 3 h) con 7–9, como el **hexobarbital** y el **secobarbital**; **ultracorta** (minutos) con 7–9 y **C=S en C2**, el **tiopental**, anestésico IV. Más liposolubilidad significa absorción, distribución y metabolismo más rápidos, y menos duración. El tiopental deja de actuar porque se **redistribuye** del cerebro al músculo y la grasa. El **fenilo** del fenobarbital le da la actividad anticonvulsiva.",
    structures: [
      { name: "Fenobarbital", smiles: "CCC1(c2ccccc2)C(=O)NC(=O)NC1=O", badge: "Prolongada · Ph y Et" },
      { name: "Pentobarbital", smiles: "CCCC(C)C1(CC)C(=O)NC(=O)NC1=O", badge: "Intermedia" },
      { name: "Secobarbital", smiles: "C=CCC1(C(C)CCC)C(=O)NC(=O)NC1=O", badge: "Corta" },
      { name: "Tiopental", smiles: "CCCC(C)C1(CC)C(=O)NC(=S)NC1=O", badge: "Ultracorta · C=S" }
    ],
    difficulty: 'medium',
    category: "Barbitúricos"
  },
  {
    id: "fc-05-21",
    topicId: 'tema-05',
    concept: "Síntesis del Fenobarbital: Claisen, SN2 y Urea",
    front: "¿Por qué no podemos meter el fenilo del fenobarbital alquilando el malonato y cómo se resuelve con una condensación de Claisen?",
    back: "En cuanto a la retrosíntesis, si rompemos los dos enlaces C–N del anillo quedan un **malonato disustituido** y una **urea** (tiourea para los tiobarbitúricos). Usamos el **diéster** con **NaOEt**, porque el dicloruro de malonilo polimerizaría.\n\nUn haluro de **arilo** no da SN: el halógeno está sobre un carbono **sp²** y su par libre refuerza el enlace C–X. Por eso invertimos los papeles. (1) **Condensación de Claisen**: el **fenilacetato de etilo** pone el nucleófilo y el **carbonato de dietilo** el electrófilo; sale el fenilmalonato de dietilo. (2) **NaOEt y cloruro de etilo**: el etilo sí entra por **SN2**, porque es un haluro primario. (3) **Urea y NaOEt**: los dos nitrógenos atacan los dos ésteres, salen **dos EtOH** y se cierra el **fenobarbital**.",
    structures: [
      { name: "Fenilacetato de etilo", smiles: "CCOC(=O)Cc1ccccc1", badge: "Nucleófilo · Claisen" },
      { name: "Fenilmalonato de dietilo", smiles: "CCOC(=O)C(C(=O)OCC)c1ccccc1", badge: "Carbonato de dietilo" },
      { name: "Etil(fenil)malonato de dietilo", smiles: "CCOC(=O)C(CC)(C(=O)OCC)c1ccccc1", badge: "SN2 · EtCl" },
      { name: "Fenobarbital", smiles: "CCC1(c2ccccc2)C(=O)NC(=O)NC1=O", badge: "Urea · −2 EtOH" }
    ],
    difficulty: 'hard',
    category: "Síntesis de Barbitúricos"
  },
  {
    id: "fc-05-22",
    topicId: 'tema-05',
    concept: "Restos Secundarios: Knoevenagel y Secobarbital",
    front: "¿Por qué los restos alquilo secundarios no se introducen en el malonato con un haluro y cómo se sintetiza el secobarbital?",
    back: "En cuanto a los haluros, los **primarios** dan bien la SN2, los **alílicos y bencílicos** son muy reactivos, y los **secundarios**, más impedidos, sufren sobre todo **eliminación E2** con la base del medio. Para un resto secundario hacemos una **condensación de Knoevenagel** con una **cetona** y después hidrogenamos el C=C.\n\nEl **secobarbital** (5-alil-5-(1-metilbutil)) sale así: (1) malonato de dietilo, **NaOEt y 2-pentanona**, con pérdida de agua: alquilidenmalonato. (2) **H₂, catalizador**: (1-metilbutil)malonato. (3) **NaOEt y bromuro de alilo**: el alilo es primario y alílico, y entra por SN2. (4) **Urea, NaOEt**: ciclación. Con 2-butanona saldría el talbutal (5-alil-5-sec-butil). El 1-metilbutilo del **pentobarbital** entra igual.",
    structures: [
      { name: "Alquilidenmalonato", smiles: "CCCC(C)=C(C(=O)OCC)C(=O)OCC", badge: "Knoevenagel · 2-pentanona" },
      { name: "(1-Metilbutil)malonato", smiles: "CCCC(C)C(C(=O)OCC)C(=O)OCC", badge: "H₂, cat." },
      { name: "Secobarbital", smiles: "C=CCC1(C(C)CCC)C(=O)NC(=O)NC1=O", badge: "Alilo · SN2; urea" }
    ],
    difficulty: 'hard',
    category: "Síntesis de Barbitúricos"
  },
  {
    id: "fc-05-23",
    topicId: 'tema-05',
    concept: "Agentes Metilantes y Eschweiler–Clarke",
    front: "Para N-metilar tenemos yoduro de metilo, sulfato de dimetilo y formaldehído con ácido fórmico. ¿Cuál se detiene en la amina terciaria, por qué, y cuál usamos con el N1 del nordazepam?",
    back: "En cuanto a los reactivos, el **yoduro de metilo** y el **sulfato de dimetilo** pueden **sobrealquilar** hasta la sal de amonio cuaternario. La reacción de **Eschweiler–Clarke** (**HCHO + HCOOH**) no: la amina condensa con el formaldehído, pierde agua y forma un **ion iminio**; el formiato le cede un **hidruro** y sale **CO₂**. Se detiene en la **amina terciaria**, como la aminación reductora del tema 4.\n\nLa **aminación reductora** (HCHO con NaBH₃CN o H₂/Pd) metila de forma selectiva, y con otros aldehídos mete etilos o propilos. El **sulfato de dimetilo** es el metilante fuerte para nitrógenos poco nucleófilos, como el **N1 amídico del nordazepam**: es el reactivo del último paso del diazepam.",
    structures: [
      { name: "Nordazepam", smiles: "O=C1CN=C(c2ccccc2)c2cc(Cl)ccc2N1", badge: "N1 amídico" },
      { name: "Diazepam", smiles: "CN1C(=O)CN=C(c2ccccc2)c2cc(Cl)ccc21", badge: "Me₂SO₄" }
    ],
    difficulty: 'medium',
    category: "Benzodiazepinas: Descubrimiento y Síntesis"
  },
  {
    id: "fc-05-24",
    topicId: 'tema-05',
    concept: "Remimazolam: un Punto Débil Diseñado",
    front: "El remimazolam es la única benzodiazepina nueva aprobada en este siglo. ¿Qué grupo lleva a propósito y por qué su acción es ultracorta?",
    back: "En cuanto al diseño, el **remimazolam** lleva un **éster metílico** puesto a propósito como punto débil. La **carboxilesterasa hepática CES1** lo hidroliza a un **ácido inactivo** (CNS 7054), y por eso su acción es **ultracorta**. Tampoco depende del **CYP3A4**, como sí le pasa al midazolam. Está aprobado para **sedación** en procedimientos cortos (FDA 2020, UE 2021).\n\nFuera de él, lo nuevo son formulaciones: la película bucal de **diazepam**, el **midazolam** oromucosal y el **fenobarbital** sódico IV, que es la molécula de 1912. La ansiedad, la epilepsia y la depresión se tratan de forma sintomática porque sus causas moleculares no se conocen bien.",
    structures: [
      { name: "Remimazolam", smiles: "COC(=O)CC[C@@H]1N=C(c2ccccn2)c2cc(Br)ccc2-n2c(C)cnc21", badge: "Éster metílico · CES1" },
      { name: "Midazolam", smiles: "Cc1ncc2n1-c1ccc(Cl)cc1C(c1ccccc1F)=NC2", badge: "CYP3A4" }
    ],
    difficulty: 'medium',
    category: "SAR de Benzodiazepinas"
  },
  {
    id: "fc-05-25",
    topicId: 'tema-05',
    concept: "Receptores del Glutamato y Excitotoxicidad",
    front: "¿Qué familias de receptores tiene el glutamato, qué agonista da nombre a cada receptor ionotrópico y qué es la excitotoxicidad?",
    back: "En cuanto a los receptores, el glutamato actúa sobre dos familias. Los **ionotrópicos** son canales catiónicos y llevan el nombre del agonista selectivo con el que se identificaron: **NMDA** (N-metil-D-aspartato), **AMPA** y **kainato**. El canal NMDA deja pasar sobre todo **Ca²⁺** y en reposo lo tapona un ion **Mg²⁺**, que sale cuando la membrana se despolariza. Los **metabotrópicos (mGlu)** son receptores acoplados a proteína G; los del grupo I activan la vía Gq y generan **IP₃**.\n\nRespecto a la **excitotoxicidad**, un exceso de glutamato mantiene abiertos los canales, el Ca²⁺ se acumula dentro de la neurona y activa enzimas que la destruyen. Se relaciona con la epilepsia, la isquemia cerebral y enfermedades neurodegenerativas como el Huntington o el Alzheimer. Es el reverso del GABA: uno excita y el otro frena.",
    structures: [
      { name: "Ácido L-glutámico", smiles: "N[C@@H](CCC(=O)O)C(=O)O", badge: "Agonista endógeno" },
      { name: "NMDA", smiles: "CN[C@H](CC(=O)O)C(=O)O", badge: "Ionotrópico · Ca²⁺" },
      { name: "AMPA", smiles: "CC1=C(C(=O)NO1)CC(C(=O)O)N", badge: "Ionotrópico" },
      { name: "Ácido kaínico", smiles: "CC(=C)[C@H]1CN[C@@H]([C@H]1CC(=O)O)C(=O)O", badge: "Ionotrópico" }
    ],
    difficulty: 'medium',
    ampliacion: true,
    category: "Aminoácidos y Metabolismo del GABA"
  },
  {
    id: "fc-05-26",
    topicId: 'tema-05',
    concept: "Receptor GABA-B y Baclofeno",
    front: "Si una pregunta dice «GABA» y pide el tipo de receptor y su mecanismo, hay dos respuestas posibles. ¿En qué se diferencian el GABA-A y el GABA-B y qué fármaco actúa sobre el segundo?",
    back: "En cuanto a los dos receptores, el **GABA-A** es **ionotrópico**: un canal de Cl⁻ que hiperpolariza en milisegundos. El **GABA-B** es **metabotrópico**: un receptor acoplado a **proteína Gi/o**. En la neurona postsináptica abre canales de **K⁺**, sale potasio y la membrana se **hiperpolariza**. En el terminal presináptico **cierra canales de Ca²⁺** y reduce la liberación de neurotransmisor. Las dos vías frenan, pero el GABA-B lo hace de forma más lenta y sostenida.\n\nEl **baclofeno** es el GABA con un **4-clorofenilo en el C3** (posición β). El arilo lo hace bastante lipófilo para cruzar la BHE, cosa que el GABA no consigue. Es **agonista GABA-B**, y el eutómero es el **(R)**. Se usa como **relajante muscular de acción central** en la espasticidad. Las benzodiazepinas y los barbitúricos no actúan sobre el GABA-B.",
    structures: [
      { name: "GABA", smiles: "NCCCC(=O)O", badge: "GABA-A y GABA-B" },
      { name: "Baclofeno", smiles: "NCC(CC(=O)O)c1ccc(Cl)cc1", badge: "Agonista GABA-B · (R)" }
    ],
    difficulty: 'medium',
    ampliacion: true,
    category: "Receptores del GABA"
  },
  {
    id: "fc-05-27",
    topicId: 'tema-05',
    concept: "Agonistas y Antagonistas del Sitio del GABA",
    front: "¿Qué tienen en común el muscimol, el gaboxadol y la isoguvacina con el GABA y qué hacen la bicuculina y la estricnina?",
    back: "En cuanto a los agonistas, los tres se unen al sitio **ortostérico** del GABA-A. El **muscimol**, de la seta *Amanita muscaria*, cambia el carboxilo por un **3-hidroxiisoxazol**, un **bioisóstero ácido** que también está ionizado a pH 7,4. El **gaboxadol** (THIP) cierra la cadena en un biciclo: es un **análogo rígido**. La **isoguvacina** es también un análogo rígido del GABA, con la cadena dentro de una tetrahidropiridina. Fijar la conformación nos dice qué forma reconoce el receptor, como hicimos con la dopamina y el ADTN.\n\nRespecto a los antagonistas, la **bicuculina** es un alcaloide que compite con el GABA en el GABA-A y produce **convulsiones**. La **estricnina** bloquea el **receptor de glicina**, el canal de Cl⁻ inhibidor de la médula espinal: también es convulsivante. Bloquear la inhibición equivale a excitar.",
    structures: [
      { name: "Muscimol", smiles: "NCc1cc(O)no1", badge: "Hidroxiisoxazol · agonista" },
      { name: "Gaboxadol", smiles: "Oc1noc2c1CCNC2", badge: "Análogo rígido" },
      { name: "Isoguvacina", smiles: "C1CNCC=C1C(=O)O", badge: "Análogo rígido" },
      { name: "Bicuculina", smiles: "CN1CCC2=CC3=C(C=C2[C@H]1[C@H]4C5=C(C6=C(C=C5)OCO6)C(=O)O4)OCO3", badge: "Antagonista GABA-A" }
    ],
    difficulty: 'medium',
    ampliacion: true,
    category: "Receptores del GABA"
  },
  {
    id: "fc-05-28",
    topicId: 'tema-05',
    concept: "Inhibir la Recaptación del GABA: Tiagabina",
    front: "El ácido nipecótico inhibe la recaptación del GABA in vitro, pero no protege de las convulsiones. ¿Por qué, y cómo lo resuelve la tiagabina?",
    back: "En cuanto a la recaptación, los transportadores **GAT** devuelven el GABA de la sinapsis a la neurona y a la glía; si los bloqueamos, el GABA dura más en la hendidura. El **ácido nipecótico** (piperidina-3-carboxílico) es un análogo cíclico del GABA que inhibe el transportador. Pero tiene el mismo problema que el GABA: a pH 7,4 es un **zwitterión** y **no cruza la BHE**.\n\nLa **tiagabina** es el **(R)**-ácido nipecótico con una cadena muy lipófila en el nitrógeno: un **4,4-bis(3-metil-2-tienil)but-3-enilo**. Ese anclaje le permite cruzar la barrera y llegar al GAT-1. Es un **antiepiléptico** para las crisis focales. Es la tercera forma de subir el GABA, junto a frenar su degradación (vigabatrina) y potenciar el receptor (benzodiazepinas).",
    structures: [
      { name: "GABA", smiles: "NCCCC(=O)O", badge: "Sustrato de GAT" },
      { name: "Ácido nipecótico", smiles: "C1CC(CNC1)C(=O)O", badge: "Zwitterión · no cruza" },
      { name: "Tiagabina", smiles: "Cc1ccsc1C(=CCCN1CCC[C@@H](C(=O)O)C1)c1sccc1C", badge: "Ancla lipófila · GAT-1" }
    ],
    difficulty: 'medium',
    ampliacion: true,
    category: "Antiepilépticos GABAérgicos"
  },
  {
    id: "fc-05-29",
    topicId: 'tema-05',
    concept: "Benzodiazepinas que Rompen las Reglas: Medazepam, Tetrazepam y Clotiazepam",
    front: "Las reglas de SAR piden C=O en C2, arilo en C5 y benceno como anillo A. ¿Qué cambia en el medazepam, el tetrazepam y el clotiazepam y por qué siguen siendo activos?",
    back: "En cuanto al **medazepam**, no tiene **C=O en C2**: el C2 es un CH₂. En el hígado se oxida en esa posición y da **diazepam** y nordazepam, que son los responsables de buena parte del efecto. Funciona como un profármaco.\n\nEl **tetrazepam** lleva en C5 un **ciclohexenilo** en lugar del fenilo. La regla dice que los alquilos y cicloalquilos restan potencia, y el tetrazepam es una excepción que conserva la actividad. Se usó como **relajante muscular** y se retiró en la UE en 2013 por reacciones cutáneas graves.\n\nEl **clotiazepam** cambia el anillo A por un **tiofeno**: es una **tienodiazepina**, con 2′-Cl y N1-CH₃. Como el pirazol del ripazepam, muestra que el benceno fusionado admite un heterociclo aromático.",
    structures: [
      { name: "Medazepam", smiles: "CN1CCN=C(c2ccccc2)c2cc(Cl)ccc21", badge: "Sin C=O en C2" },
      { name: "Tetrazepam", smiles: "CN1C(=O)CN=C(C2=CCCCC2)c2cc(Cl)ccc21", badge: "5-Ciclohexenilo" },
      { name: "Clotiazepam", smiles: "CCc1cc2c(s1)N(C)C(=O)CN=C2c1ccccc1Cl", badge: "Tiofeno en anillo A" }
    ],
    difficulty: 'hard',
    ampliacion: true,
    category: "SAR de Benzodiazepinas"
  },
  {
    id: "fc-05-30",
    topicId: 'tema-05',
    concept: "Profármacos y Velocidad de Eliminación de las Benzodiazepinas",
    front: "Entre flurazepam, lorazepam, camazepam y bromazepam, ¿cuál se elimina más deprisa y cuáles necesitan un paso metabólico antes de actuar del todo?",
    back: "En cuanto a la eliminación, el **lorazepam** lleva un **3-OH** que se **glucuronida directamente**, sin pasar por la oxidación del CYP y sin metabolitos activos: es el que se elimina por la vía más directa y el que menos se acumula en ancianos y en insuficiencia hepática. El **flurazepam** es el extremo contrario: la **N-desalquilación** deja un metabolito activo de semivida muy larga, con sedación al día siguiente. El **bromazepam** (5-(2-piridilo)) queda en medio.\n\nRespecto a los profármacos, el **camazepam** es el **carbamato de dimetilo del 3-OH** del temazepam (N1-CH₃): hay que hidrolizar el carbamato para liberar el alcohol. El **ketazolam** lleva un anillo de oxazina fusionado que se abre en el organismo y libera **diazepam** y nordazepam. El **clorazepato** (3-COOH) se descarboxila en el estómago. Son tres formas de esconder la benzodiazepina activa detrás de un grupo que se pierde.",
    structures: [
      { name: "Lorazepam", smiles: "O=C1Nc2ccc(Cl)cc2C(c2ccccc2Cl)=NC1O", badge: "3-OH · glucuronidación" },
      { name: "Camazepam", smiles: "CN(C)C(=O)OC1N=C(c2ccccc2)c2cc(Cl)ccc2N(C)C1=O", badge: "Carbamato en C3" },
      { name: "Ketazolam", smiles: "CC1=CC(=O)N2CC(=O)N(C)c3ccc(Cl)cc3C2(c2ccccc2)O1", badge: "Libera diazepam" }
    ],
    difficulty: 'hard',
    ampliacion: true,
    category: "SAR de Benzodiazepinas"
  },
  {
    id: "fc-05-31",
    topicId: 'tema-05',
    concept: "Barbitúricos: Tolerancia, Dependencia e Inducción Enzimática",
    front: "Además del margen terapéutico estrecho, ¿qué otros problemas explican que las benzodiazepinas desplazaran a los barbitúricos, y qué le hace el fenobarbital a otros fármacos?",
    back: "En cuanto al uso continuado, los barbitúricos producen **tolerancia** rápida, **dependencia física** y un **síndrome de abstinencia** parecido al del alcohol, que puede llegar a **convulsiones**. Sumado a la depresión respiratoria y a la falta de antídoto, explica que en ansiedad e insomnio se sustituyeran por las benzodiazepinas.\n\nRespecto a las interacciones, el **fenobarbital** es un potente **inductor enzimático**: aumenta la síntesis de enzimas del **CYP** en el hígado. Acelera el metabolismo de otros fármacos, como los **anticonceptivos orales** o los anticoagulantes cumarínicos, y les quita eficacia. El alcohol y otros depresores del SNC suman su efecto al del barbitúrico. El primer barbitúrico usado como hipnótico fue el **barbital** (1903) y el **fenobarbital** llegó en 1912.",
    structures: [
      { name: "Barbital", smiles: "CCC1(CC)C(=O)NC(=O)NC1=O", badge: "Primer hipnótico · 1903" },
      { name: "Fenobarbital", smiles: "CCC1(c2ccccc2)C(=O)NC(=O)NC1=O", badge: "Inductor del CYP · 1912" }
    ],
    difficulty: 'medium',
    ampliacion: true,
    category: "Barbitúricos"
  }
];
