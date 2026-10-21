// ==========================================================================
// QFDOS - Flashcards Tema 04: Serotonina e inhibidores de la recaptación de aminas biógenas
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// fc-04-01 a fc-04-15: contenido de la presentación final del Tema 4 (los apuntes
// publicados todavía no existen: borrador provisional), reforzado con lo que preguntan
// los exámenes de otros grupos. Esas partes van en un párrafo «Ampliación».
// SMILES de estructuras_qfdos.csv (contrastados con ChEMBL); pirenzepina CHEMBL9967.
// Tipografía Científica: texto plano y caracteres Unicode directos (cero LaTeX crudo)
// ==========================================================================

import type { Flashcard } from './qfdosData';

export const TEMA4_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-04-01',
    topicId: 'tema-04',
    concept: 'Biosíntesis y Distribución de la Serotonina',
    front: '¿Cómo fabrica el organismo la serotonina a partir del triptófano, qué paso limita la velocidad y por qué la 5-HT del intestino no llega al cerebro?',
    back: 'En cuanto a la biosíntesis, partimos del aminoácido esencial **L-triptófano**. La **triptófano hidroxilasa (TPH)**, con **BH₄** como cofactor, lo hidroxila en la posición 5 del indol y da el **5-hidroxi-L-triptófano (5-HTP)**: es la **etapa limitante**. La **AADC** descarboxila el 5-HTP y forma la **serotonina (5-hidroxitriptamina, 5-HT)**. No es una catecolamina: lleva un solo OH, en el C-5 del indol, y por eso no se une a los receptores de catecolaminas.\n\nRespecto a la distribución, **alrededor del 90 %** de la 5-HT está en las **células enterocromafines del intestino**, y las plaquetas la captan y almacenan. La 5-HT periférica **no cruza la BHE**: el cerebro sintetiza la suya en los **núcleos del rafe**, racimos de neuronas de la línea media del tronco del encéfalo. Por eso la serotonina circulante no sirve para subir el nivel central.',
    structures: [
      { name: 'L-Triptófano', smiles: 'N[C@@H](Cc1c[nH]c2ccccc12)C(=O)O', badge: 'Precursor esencial' },
      { name: '5-Hidroxi-L-triptófano', smiles: 'N[C@@H](Cc1c[nH]c2ccc(O)cc12)C(=O)O', badge: 'Etapa limitante · TPH, BH₄' },
      { name: 'Serotonina', smiles: 'NCCc1c[nH]c2ccc(O)cc12', badge: 'AADC · no cruza la BHE' }
    ],
    difficulty: 'easy',
    category: 'Biosíntesis y Metabolismo'
  },
  {
    id: 'fc-04-02',
    topicId: 'tema-04',
    concept: 'Catabolismo por MAO y Melatonina',
    front: '¿Qué hace la MAO con la serotonina, cuál es su primer producto y cómo llega la 5-HT a melatonina en la glándula pineal?',
    back: 'Sobre el catabolismo, la **MAO-A** oxida la amina primaria de la serotonina a un **aldehído**, el **5-hidroxiindolacetaldehído (5-HIAL)**, a través de un ion iminio. Una aldehído deshidrogenasa lo pasa a **ácido 5-hidroxiindolacético (5-HIAA)**, inactivo, que se excreta por la orina. El producto inmediato de la MAO es el **aldehído**, no el ácido. El 5-HIAA urinario es el marcador diagnóstico de los **tumores carcinoides**.\n\nEn la **glándula pineal** hay dos pasos. La **N-acetilación** (**AANAT**) da **N-acetilserotonina**; después, la **O-metilación del 5-OH** con **SAM** (**ASMT**) da **melatonina**, que es la **N-acetil-5-metoxitriptamina**. La N-acetilserotonina es el intermedio, no la hormona: quien la dibuja con el 5-OH libre se equivoca de molécula.',
    structures: [
      { name: 'Serotonina', smiles: 'NCCc1c[nH]c2ccc(O)cc12', badge: 'Sustrato de MAO-A' },
      { name: 'Ácido 5-hidroxiindolacético', smiles: 'OC(=O)Cc1c[nH]c2ccc(O)cc12', badge: 'Metabolito inactivo · carcinoide' },
      { name: 'N-Acetilserotonina', smiles: 'CC(=O)NCCc1c[nH]c2ccc(O)cc12', badge: 'Intermedio · AANAT' },
      { name: 'Melatonina', smiles: 'COc1ccc2[nH]cc(CCNC(C)=O)c2c1', badge: '5-OMe · ASMT, SAM' }
    ],
    difficulty: 'medium',
    category: 'Biosíntesis y Metabolismo'
  },
  {
    id: 'fc-04-03',
    topicId: 'tema-04',
    concept: 'Las Siete Familias de Receptores 5-HT',
    front: '¿Cuántas familias de receptores 5-HT hay, cómo se transducen y cuál es la excepción que conviene saberse?',
    back: 'Respecto a los receptores, hay **siete familias (5-HT1 a 5-HT7)**. **Seis son GPCR** y el **5-HT3 es un canal iónico catiónico pentamérico**, de la familia del nicotínico: la única excepción. En cuanto a la transducción, **5-HT1 y 5-HT5 acoplan a Gi/o** (↓ AMPc), **5-HT2 a Gq** (↑ IP₃/DAG y Ca²⁺) y **5-HT4, 5-HT6 y 5-HT7 a Gs** (↑ AMPc).\n\nLos fármacos del tema por familia: **buspirona** (5-HT1A), **triptanes** (5-HT1B/1D), **lasmiditán** (5-HT1F), **LSD** (agonista 5-HT2A), **metisergida y ciproheptadina** (antagonistas 5-HT2), **setrones** (antagonistas 5-HT3) y **metoclopramida** (agonista 5-HT4). El antiguo «5-HT1C» es hoy el **5-HT2C**.\n\nLos **ISRS, los tricíclicos y los IMAO no actúan sobre receptores**: aumentan la 5-HT sináptica al frenar su recaptación o su metabolismo.',
    structures: [
      { name: 'Buspirona', smiles: 'O=C1CC2(CCCC2)CC(=O)N1CCCCN1CCN(c2ncccn2)CC1', badge: '5-HT1A · GPCR Gi/o' },
      { name: 'Sumatriptán', smiles: 'CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1', badge: '5-HT1B/1D · GPCR Gi/o' },
      { name: 'Ondansetrón', smiles: 'Cc1nccn1CC1CCc2c(C1=O)c1ccccc1n2C', badge: '5-HT3 · canal iónico' }
    ],
    difficulty: 'medium',
    category: 'Receptores'
  },
  {
    id: 'fc-04-04',
    topicId: 'tema-04',
    concept: 'ISRS: Farmacóforo, Seguridad y Estereoquímica',
    front: '¿Qué comparten los ISRS en la estructura, por qué son más seguros que los tricíclicos y qué significa el cambio quiral del citalopram?',
    back: 'En cuanto a los ISRS, el farmacóforo común es una **fenilalquilamina**: arilo o diarilo, cadena corta y **amina básica**. La cadena está abierta en la **fluoxetina** y cerrada en un anillo en la **sertralina** y el **citalopram**. Bloquean **SERT** con poca afinidad por los receptores **muscarínicos, H₁ y α₁**, así que dan menos efectos adversos que los tricíclicos y son **mucho más seguros en sobredosis**.\n\nSobre la estereoquímica, el **Prozac®** es **fluoxetina racémica**. El **escitalopram** es el **(S)-citalopram**, el eutómero: un cambio quiral. La **sertralina** es **(1S,4S)**. Por su efecto sobre el QT, la dosis máxima de citalopram es de **40 mg/día** (20 mg/día por encima de los 65 años).\n\n**Ampliación:** en los V/F de otros grupos aparece «los inhibidores de la recaptación de serotonina tienen efecto serotoninérgico indirecto», y es **verdadero**: no se unen al receptor, aumentan la 5-HT sináptica.',
    structures: [
      { name: 'Fluoxetina', smiles: 'CNCCC(Oc1ccc(cc1)C(F)(F)F)c1ccccc1', badge: 'Racémica · cadena abierta' },
      { name: 'Escitalopram', smiles: 'CN(C)CCC[C@]1(OCc2cc(C#N)ccc21)c1ccc(F)cc1', badge: '(S) · eutómero' },
      { name: 'Sertralina', smiles: 'CN[C@H]1CC[C@H](C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl', badge: '(1S,4S) · cadena en anillo' }
    ],
    difficulty: 'medium',
    category: 'ISRS y Tricíclicos'
  },
  {
    id: 'fc-04-05',
    topicId: 'tema-04',
    concept: 'De la Clorpromazina a la Imipramina: Antidepresivos Tricíclicos',
    front: '¿Cómo pasamos de la clorpromazina a la imipramina y qué ocurre con la desipramina, la amitriptilina y el opipramol?',
    back: 'Respecto al origen, la mayoría de los antidepresivos tricíclicos (ATC) nacen de modificar neurolépticos. Geigy sintetizó la imipramina en **1951** como análogo de la clorpromazina y se ensayó como antihistamínico, sedante, analgésico y antiparkinsoniano; **Kuhn** describió su efecto antidepresivo en 1956-1957. Conservamos la cadena de **tres carbonos con dimetilamina** y cambiamos el anillo central: el puente **–S–** pasa a **–CH₂–CH₂–** (dibenzoazepina). La actividad pasa de antagonista D₂ a **inhibidor de la recaptación de 5-HT y noradrenalina** (SERT y NET).\n\nLa **N-desmetilación hepática** de la imipramina da **desipramina**, amina secundaria **más selectiva por NET**. La imipramina ya es activa, así que no es un profármaco en sentido estricto. En la **amitriptilina** el N del anillo se cambia por un **carbono sp²** (metilideno exocíclico). El **opipramol**, con un doble enlace C10=C11 y una cadena de hidroxietilpiperazina, es un **ansiolítico que actúa sobre receptores sigma**, sin carácter neuroléptico.\n\n**Ampliación:** en el final de otros grupos preguntan por la importancia de la N-desalquilación en los ATC y esperan que las **aminas terciarias** (imipramina, amitriptilina) se traten como **profármacos lipófilos** que cruzan la BHE y se N-desmetilan a la amina secundaria activa (**desipramina**, **nortriptilina**). Para esa respuesta lo escribimos así, con el matiz de que la imipramina ya inhibe SERT y NET por sí misma. El FIR 2024 (P9) enseña cuatro tricíclicos y pregunta cuál actúa sobre todo por receptores muscarínicos: la respuesta oficial es la **pirenzepina**, antagonista M1 selectivo, y no ninguno de los antidepresivos.',
    structures: [
      { name: 'Clorpromazina', smiles: 'CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21', badge: 'Neuroléptico · puente –S–' },
      { name: 'Imipramina', smiles: 'CN(C)CCCN1c2ccccc2CCc2ccccc21', badge: 'Puente –CH₂–CH₂–' },
      { name: 'Desipramina', smiles: 'CNCCCN1c2ccccc2CCc2ccccc21', badge: 'Metabolito · más NET' },
      { name: 'Amitriptilina', smiles: 'CN(C)CCC=C1c2ccccc2CCc2ccccc21', badge: 'Carbono sp² exocíclico' },
      { name: 'Pirenzepina', smiles: 'CN1CCN(CC(=O)N2c3ccccc3C(=O)Nc3cccnc32)CC1', badge: 'FIR 2024 · muscarínico M1' }
    ],
    difficulty: 'hard',
    category: 'ISRS y Tricíclicos'
  },
  {
    id: 'fc-04-06',
    topicId: 'tema-04',
    concept: 'Síntesis de la Imipramina',
    front: '¿Cómo se sintetiza la imipramina a partir del o-nitrotolueno y por qué el primer paso funciona con una base tan suave como el etóxido?',
    back: 'En la síntesis de la imipramina, el **metilo del o-nitrotolueno** es ácido: al perder un protón, el **carbanión bencílico** deslocaliza la carga sobre el **NO₂** a través del anillo, y basta **EtONa**. El **aire oxida** el anión a un **radical bencílico** que **dimeriza** y da el **2,2′-dinitrobibencilo**.\n\nReducimos los dos nitro a amina (**2,2′-diaminobibencilo**) y, **en caliente, la diamina cicla con pérdida de NH₃** al **iminodibencilo**. Su N–H es el de una diarilamina, poco básica: lo desprotonamos con **NaNH₂** y hacemos una **SN2** con la **3-cloro-N,N-dimetilpropilamina**, la misma cadena de la clorpromazina. Salen la imipramina y NaCl.',
    structures: [
      { name: 'o-Nitrotolueno', smiles: 'Cc1ccccc1[N+](=O)[O-]', badge: 'Material de partida' },
      { name: '2,2′-Dinitrobibencilo', smiles: '[O-][N+](=O)c1ccccc1CCc1ccccc1[N+](=O)[O-]', badge: 'Dímero radicalario' },
      { name: '2,2′-Diaminobibencilo', smiles: 'Nc1ccccc1CCc1ccccc1N', badge: 'Reducción' },
      { name: 'Iminodibencilo', smiles: 'C1Cc2ccccc2Nc2ccccc21', badge: '– NH₃ · diarilamina' },
      { name: 'Imipramina', smiles: 'CN(C)CCCN1c2ccccc2CCc2ccccc21', badge: 'NaNH₂ + SN2' }
    ],
    difficulty: 'hard',
    category: 'Síntesis Orgánica'
  },
  {
    id: 'fc-04-07',
    topicId: 'tema-04',
    concept: 'Generaciones de IMAO: de la Iproniazida a la Moclobemida',
    front: '¿Cómo evolucionan los IMAO desde la iproniazida hasta la moclobemida y qué ganamos en cada generación?',
    back: 'Respecto a la enzima, la **MAO** es una **flavoenzima (FAD)** de la membrana mitocondrial externa. La **MAO-A** prefiere **serotonina y noradrenalina**; la **MAO-B**, feniletilamina y bencilamina. **Dopamina y tiramina** son sustratos de **ambas**. Los antidepresivos son iMAO-A; los antiparkinsonianos del tema 3 (selegilina, rasagilina), iMAO-B.\n\nEn la **primera generación** (irreversibles y no selectivos), la **iproniazida** es una hidrazida diseñada a partir del tuberculostático **isoniazida**; se retiró por **hepatotoxicidad**. La **pargilina** es el prototipo de las **propargilaminas**. En la **segunda generación** modificamos la pargilina: la **clorgilina** inhibe la **MAO-A** de forma irreversible y selectiva, pero nunca llegó a comercializarse; es la herramienta que define la MAO-A. En la **tercera generación**, la **moclobemida** (4-clorobenzamida) es un **RIMA**, inhibidor **reversible** de la MAO-A, y su **cadena de etilendiamina** es esencial para la actividad.\n\n**Ampliación:** en el parcial de 2024 de otros grupos, «hidrazida antidepresiva» es la respuesta para la **iproniazida**, y en la extraordinaria de noviembre piden reconocer como IMAO la molécula con un **triple enlace** (una propargilamina).',
    structures: [
      { name: 'Isoniazida', smiles: 'NNC(=O)c1ccncc1', badge: 'Tuberculostático · origen' },
      { name: 'Iproniazida', smiles: 'CC(C)NNC(=O)c1ccncc1', badge: 'Hidrazida · retirada' },
      { name: 'Pargilina', smiles: 'CN(CC#C)Cc1ccccc1', badge: 'Propargilamina' },
      { name: 'Clorgilina', smiles: 'CN(CCCOc1ccc(Cl)cc1Cl)CC#C', badge: 'MAO-A · no comercializada' },
      { name: 'Moclobemida', smiles: 'O=C(NCCN1CCOCC1)c1ccc(Cl)cc1', badge: 'RIMA · etilendiamina' }
    ],
    difficulty: 'medium',
    category: 'Inhibidores de la MAO'
  },
  {
    id: 'fc-04-08',
    topicId: 'tema-04',
    concept: 'Efecto Queso y Mecanismo de las Propargilaminas',
    front: '¿Por qué los IMAO irreversibles provocan el «efecto queso» y cómo inactiva una propargilamina a la MAO?',
    back: 'Sobre el efecto queso, la **tiramina** de quesos curados, embutidos y vino se forma por **descarboxilación de la tirosina**. Con un IMAO irreversible, la MAO del intestino y del hígado no la degrada: pasa a la circulación, **libera noradrenalina** de las terminaciones y provoca **crisis hipertensivas**. Con un **RIMA**, la tiramina a dosis elevadas **desplaza** al inhibidor reversible y sí se degrada, así que el riesgo baja.\n\nRespecto al mecanismo de la propargilamina, el grupo **–CH₂–C≡CH** (carbono **sp**, cadena lineal rígida) lo oxida el **FAD** de la enzima y la **inactiva de forma covalente e irreversible**, el mismo mecanismo suicida de la selegilina del tema 3. La actividad solo vuelve cuando la neurona sintetiza **enzima nueva**, unas **dos semanas** después.\n\n**Ampliación:** en el parcial de 2024 de otros grupos piden el mecanismo de acción de una propargilamina y dan el cofactor: es el **FAD**.',
    structures: [
      { name: 'Tiramina', smiles: 'NCCc1ccc(O)cc1', badge: 'Sustrato de MAO-A y MAO-B' },
      { name: 'Pargilina', smiles: 'CN(CC#C)Cc1ccccc1', badge: '–C≡CH · irreversible' }
    ],
    difficulty: 'medium',
    category: 'Inhibidores de la MAO'
  },
  {
    id: 'fc-04-09',
    topicId: 'tema-04',
    concept: 'Migraña, Triptanes y Lasmiditán',
    front: '¿Cómo alivian los triptanes la migraña, por qué están contraindicados en la cardiopatía isquémica y qué mejora de un triptán a otro?',
    back: 'En cuanto a la migraña, es un trastorno **neurovascular**: el sistema **trigeminovascular libera CGRP** y dilata los vasos **meníngeos**. Los **triptanes** son agonistas **5-HT1B/1D**: vía **5-HT1B contraen los vasos meníngeos** dilatados (extracerebrales) y vía **5-HT1D inhiben la liberación de CGRP** en el trigémino. Por eso están **contraindicados en la cardiopatía isquémica**, donde el **lasmiditán**, agonista **5-HT1F** que no contrae los vasos, es la alternativa.\n\nRespecto a la evolución, el **sumatriptán** (Glaxo, 1991) tiene una biodisponibilidad oral de ≈**14 %**. Desde 1995 llegan triptanes más **lipófilos**: **zolmitriptán** (≈40 %) y **almotriptán** (Almirall, ≈**70 %**, de las más altas del grupo junto con el naratriptán). Más lipofilia, más absorción oral.',
    structures: [
      { name: 'Sumatriptán', smiles: 'CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1', badge: '≈14 % · 5-HT1B/1D' },
      { name: 'Zolmitriptán', smiles: 'CN(C)CCc1c[nH]c2ccc(C[C@H]3COC(=O)N3)cc12', badge: '≈40 % · más lipófilo' },
      { name: 'Almotriptán', smiles: 'CN(C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12', badge: '≈70 % · Almirall' },
      { name: 'Lasmiditán', smiles: 'CN1CCC(CC1)C(=O)c1cccc(NC(=O)c2c(F)cc(F)cc2F)n1', badge: '5-HT1F · sin vasoconstricción' }
    ],
    difficulty: 'medium',
    category: 'Agonistas 5-HT1'
  },
  {
    id: 'fc-04-10',
    topicId: 'tema-04',
    concept: 'Diseño del Sumatriptán: de la 5-HT al Fármaco',
    front: '¿Cómo llegamos de la serotonina al sumatriptán y qué reglas de SAR hay que respetar?',
    back: 'Partimos de la **serotonina** y retocamos el **OH de C-5**: sin sustituyente en C-5 **desaparece la actividad antimigraña**, y las posiciones **1, 2 y β no admiten sustitución**. El primer intento, la **5-carboxamidotriptamina (5-CT)** (OH → CONH₂), es potente pero **no selectiva** y produce **hipotensión** (5-HT7 y otros subtipos). Con el **N-metilcarbamoilmetilo** (+CH₂, N-Me) ganamos selectividad, pero el compuesto no sirve por vía oral. El bioisóstero **N-metilsulfamoilmetilo** (SO₂NH) conserva la selectividad, pero la amina primaria se **desamina**. La **amina terciaria (NMe₂)** frena esa desaminación por la MAO: nace el **sumatriptán**.\n\n**Ampliación:** en los V/F del parcial de 2024 de otros grupos aparece «en el sumatriptán, el resto dimetilamino es necesario para la interacción con el receptor 5-HT1D», y es **falso**: el NMe₂ está para proteger de la MAO. Los análogos de amina primaria ya eran selectivos y lo que fallaba era la desaminación.',
    structures: [
      { name: 'Serotonina', smiles: 'NCCc1c[nH]c2ccc(O)cc12', badge: 'Punto de partida' },
      { name: '5-Carboxamidotriptamina (5-CT)', smiles: 'NCCc1c[nH]c2ccc(C(N)=O)cc12', badge: 'Potente · hipotensión' },
      { name: '5-(N-Metilcarbamoilmetil)triptamina', smiles: 'CNC(=O)Cc1ccc2[nH]cc(CCN)c2c1', badge: 'Selectiva · no oral' },
      { name: 'N,N-Didesmetilsumatriptán', smiles: 'CNS(=O)(=O)Cc1ccc2[nH]cc(CCN)c2c1', badge: 'SO₂NH · se desamina' },
      { name: 'Sumatriptán', smiles: 'CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1', badge: 'NMe₂ · frena la MAO' }
    ],
    difficulty: 'hard',
    category: 'Agonistas 5-HT1'
  },
  {
    id: 'fc-04-11',
    topicId: 'tema-04',
    concept: 'Síntesis de Fischer, Sumatriptán y Aminación Reductora',
    front: '¿Cómo construye la síntesis de Fischer el anillo de indol y cómo la aplicamos al sumatriptán, incluida la doble metilación final?',
    back: 'Sobre el mecanismo de Fischer, la **arilhidrazina** condensa con el aldehído o la cetona (**–H₂O**) y da la **hidrazona**; tautomeriza a **enhidrazina**; protonada, sufre una **transposición sigmatrópica [3,3]** que **rompe el N–N y forma el C–C**; la ciclación y la **pérdida de NH₃** dan el **indol**. Hace falta **ácido fuerte y calor** (ZnCl₂ fundido o ácido polifosfórico) y **el carbonilo fija R₁ y R₂**. Falla con la hidrazona del acetaldehído: no da el indol sin sustituir.\n\nEn el sumatriptán, la **anilina** con el N-metilsulfamoilmetilo en para se diazota (**HNO₂**) y se reduce con **SnCl₂** a **arilhidrazina**. Con **3-cianopropanal** da la **hidrazona**, que en **HCl, Δ** hace Fischer y da el **indol-3-acetonitrilo**. Reducimos el nitrilo (H₂, cat.) a **amina primaria** y la metilamos con **exceso de HCHO y NaBH₄**: la amina forma el hemiaminal, que pierde H₂O y da el **ion iminio**; el **hidruro reduce el iminio**, no el hemiaminal. **Dos ciclos** llevan de R–NH₂ a R–N(CH₃)₂. En la práctica se prefieren NaBH₃CN o NaBH(OAc)₃, y la alternativa clásica es **Eschweiler-Clarke** (HCHO/HCOOH), que se detiene en la amina terciaria.\n\n**Ampliación:** el FIR 2023 (P178) pregunta cuál es un compuesto de partida adecuado para la síntesis de indoles de Fischer, y la respuesta oficial es un derivado de **fenilhidrazina**.',
    structures: [
      { name: 'Arilhidrazina', smiles: 'CNS(=O)(=O)Cc1ccc(NN)cc1', badge: 'HNO₂ y SnCl₂' },
      { name: 'Hidrazona', smiles: 'CNS(=O)(=O)Cc1ccc(NN=CCCC#N)cc1', badge: '+ 3-cianopropanal' },
      { name: 'Indol-3-acetonitrilo', smiles: 'CNS(=O)(=O)Cc1ccc2[nH]cc(CC#N)c2c1', badge: 'Fischer · – NH₃' },
      { name: 'Sumatriptán', smiles: 'CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1', badge: 'HCHO / NaBH₄ × 2' }
    ],
    difficulty: 'hard',
    category: 'Síntesis Orgánica'
  },
  {
    id: 'fc-04-12',
    topicId: 'tema-04',
    concept: 'Ergolinas: LSD y Metisergida',
    front: '¿Qué aporta el esqueleto ergolínico, qué son el LSD y la metisergida y por qué se restringió esta última?',
    back: 'En cuanto a las ergolinas, el esqueleto contiene una **triptamina rígida** (receptores 5-HT) y una **feniletilamina** (receptores **D₂ y α**), de ahí su farmacología mezclada. El **LSD** es la **dietilamida del ácido lisérgico**, agonista **5-HT2A** y alucinógeno (sustancia controlada). La **metisergida** es **antagonista 5-HT2** y se usó en la profilaxis de la migraña hasta que la **fibrosis retroperitoneal y valvular** restringió su uso (EMA, 2014).\n\n**Ampliación:** en los V/F de otros grupos aparece «los derivados de ergolina y ergotamina presentan distintos mecanismos farmacológicos, que incluyen agonismo y antagonismo de receptores dopaminérgicos y serotoninérgicos», y es **verdadero**: es la consecuencia de llevar los dos farmacóforos en un mismo esqueleto.',
    structures: [
      { name: 'Ergolina', smiles: 'C1C[C@H]2[C@@H](Cc3c[nH]c4cccc2c34)NC1', badge: 'Triptamina + feniletilamina' },
      { name: 'LSD (lisergida)', smiles: 'CCN(CC)C(=O)[C@H]1CN([C@@H]2CC3=CNC4=CC=CC(=C34)C2=C1)C', badge: 'Dietilamida · 5-HT2A' },
      { name: 'Metisergida', smiles: 'CC[C@@H](CO)NC(=O)[C@H]1CN([C@@H]2CC3=CN(C4=CC=CC(=C34)C2=C1)C)C', badge: 'Antagonista 5-HT2 · fibrosis' }
    ],
    difficulty: 'medium',
    category: 'Agonistas 5-HT1'
  },
  {
    id: 'fc-04-13',
    topicId: 'tema-04',
    concept: 'Azapironas y 8-OH-DPAT: Agonistas 5-HT1A',
    front: '¿Qué es una azapirona, por qué la buspirona es ansiolítica sin sedar y qué aporta el 8-OH-DPAT?',
    back: 'Respecto a la ansiedad, los receptores **5-HT1A** abundan en el **hipocampo y en los núcleos del rafe**. Las **benzodiazepinas** (moduladores alostéricos positivos del GABA-A) son eficaces, pero sedan y producen **tolerancia y dependencia**. Las **azapironas** unen una **pirimidinilpiperazina** a una **imida** por un **puente de cuatro carbonos** y son **agonistas parciales 5-HT1A**. La **buspirona** (imida de 8-azaspiro[4.5]decano-7,9-diona) es además **antagonista débil D₂**, su metabolito **1-PP** bloquea los receptores **α₂** y el efecto ansiolítico tarda **2-4 semanas**. La ipsapirona nunca se comercializó.\n\nEl **8-OH-DPAT** es un agonista 5-HT1A de afinidad **nanomolar**, con poca afinidad por 5-HT1B, 5-HT2C y 5-HT2A, y una **herramienta farmacológica**. Su **estereoselectividad es baja**: el (R) es solo unas **dos veces** más afín que el (S).',
    structures: [
      { name: 'Buspirona', smiles: 'O=C1CC2(CCCC2)CC(=O)N1CCCCN1CCN(c2ncccn2)CC1', badge: 'Agonista parcial 5-HT1A' },
      { name: '1-(2-Pirimidinil)piperazina (1-PP)', smiles: 'C1CN(CCN1)c1ncccn1', badge: 'Metabolito · bloquea α₂' },
      { name: '8-OH-DPAT', smiles: 'CCCN(CCC)C1CCc2cccc(O)c2C1', badge: 'Herramienta · baja estereoselectividad' }
    ],
    difficulty: 'medium',
    category: 'Agonistas 5-HT1'
  },
  {
    id: 'fc-04-14',
    topicId: 'tema-04',
    concept: 'Setrones: de la Cocaína al Ondansetrón',
    front: '¿Cómo nacen los setrones de la cocaína y qué diferencia al tropisetrón, el granisetrón, el ondansetrón y el palonosetrón?',
    back: 'Los antagonistas **5-HT3** (canal iónico) se usan como **antieméticos** frente a las náuseas y los vómitos de la quimioterapia. La **metoclopramida** es antiemética por bloqueo **D₂** y, a dosis altas, **5-HT3**. En **1979**, Fozard vio que la **cocaína** bloquea débilmente los 5-HT3, y se ensayaron **ésteres y amidas del tropano** con ácidos aromáticos.\n\nEl **tropisetrón** es el éster del ácido **indol-3-carboxílico** con la **tropina**, sin el CO₂Me de la cocaína. El **granisetrón** es la **indazolcarboxamida** del **granatano**, homólogo superior del tropano. El **ondansetrón** es otra estructura: la **base de Mannich** de la **carbazolona** N-metilada con **formaldehído** y **2-metilimidazol**. El **palonosetrón** destaca por su semivida de ≈**40 h**.\n\n**Ampliación:** en el parcial de 2024 de otros grupos piden clasificar un fármaco como «**setrón antiemético**»: antagonista del canal 5-HT3. En los V/F, «la domperidona actúa sobre los receptores de serotonina» es **falso**: bloquea D₂ periféricos (tarjeta fc-03-17).',
    structures: [
      { name: 'Cocaína', smiles: 'CN1[C@H]2CC[C@@H]1[C@H]([C@H](C2)OC(=O)C3=CC=CC=C3)C(=O)OC', badge: 'Origen · 5-HT3 débil' },
      { name: 'Tropisetrón', smiles: 'CN1[C@@H]2CC[C@H]1C[C@H](C2)OC(=O)c1c[nH]c2ccccc12', badge: 'Éster indol-3-carboxílico' },
      { name: 'Granisetrón', smiles: 'CN1[C@@H]2CCC[C@H]1C[C@H](C2)NC(=O)c1nn(C)c2ccccc12', badge: 'Granatano · indazolcarboxamida' },
      { name: 'Ondansetrón', smiles: 'Cc1nccn1CC1CCc2c(C1=O)c1ccccc1n2C', badge: 'Base de Mannich' },
      { name: 'Palonosetrón', smiles: 'O=C1N([C@@H]2CN3CCC2CC3)C[C@H]2CCCc3cccc1c32', badge: 't½ ≈ 40 h' }
    ],
    difficulty: 'hard',
    category: 'Antagonistas 5-HT3'
  },
  {
    id: 'fc-04-15',
    topicId: 'tema-04',
    concept: 'Ejercicios 4.4 (Ciproheptadina) y 4.7 (Almotriptán)',
    front: '¿Cómo se resuelven los ejercicios 4.4 de la ciproheptadina y 4.7 del almotriptán?',
    back: 'En el **ejercicio 4.4**, la **ciproheptadina** es un **antihistamínico H₁ con antagonismo 5-HT2** (Periactin: indicación antialérgica), no un antidepresivo. Partimos del **ácido 2-(2-feniletil)benzoico**. La **acilación de Friedel-Crafts intramolecular** con ácido polifosfórico da la **dibenzosuberona** (3). La **bromación bencílica radicalaria** con NBS da el bromuro (4) y la **eliminación E2** de HBr con Et₃N, la dibenzosuberenona (5). El **Grignard de la 4-cloro-1-metilpiperidina** ataca el carbonilo y da el **alcohol terciario** (6), y la **deshidratación E1** (el carbocatión es **doblemente bencílico**) da la ciproheptadina (1).\n\nEn el **ejercicio 4.7**, del **almotriptán**, el compuesto 16 es la **sulfonamida de pirrolidina**, la **reducción del nitro** (H₂, Ni Raney) da la anilina (17) y la **diazotación** da la sal de diazonio (18). El reactivo a) es **SnCl₂**, que da la arilhidrazina. Con **4-clorobutanal**, la **variante de Grandberg** de Fischer da directamente la **triptamina 19**, y el reactivo b) es una **aminación reductora**: HCHO/NaBH₄ (o NaBH₃CN).',
    structures: [
      { name: 'Dibenzosuberona (3)', smiles: 'O=C1c2ccccc2CCc2ccccc21', badge: 'Friedel-Crafts · PPA' },
      { name: 'Dibenzosuberenona (5)', smiles: 'O=C1c2ccccc2C=Cc2ccccc21', badge: 'NBS y E2' },
      { name: 'Ciproheptadina (1)', smiles: 'CN1CCC(CC1)=C1c2ccccc2C=Cc2ccccc21', badge: 'H₁ + 5-HT2 · Grignard y E1' },
      { name: 'Triptamina primaria (19)', smiles: 'NCCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12', badge: 'Grandberg · 4-clorobutanal' },
      { name: 'Almotriptán', smiles: 'CN(C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12', badge: 'Aminación reductora' }
    ],
    difficulty: 'hard',
    category: 'Ejercicios'
  }
];
