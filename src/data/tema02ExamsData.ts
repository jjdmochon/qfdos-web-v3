// ==========================================================================
// QFDOS - Exámenes Calibrados Tema 02: Sistema Adrenérgico
// Asignatura: Química Farmacéutica II (2627 QFDOS E) - Universidad de Granada
// Modelo 1: Clasificación de Receptores, Síntesis, Farmacóforo β₂, CIP y Eudismia
// Modelo 2: Antagonistas (Beta y Alfa), Estereoquímica CIP y Reactividad Covalente
// Modelo 3: Farmacóforo β₂, Síntesis Orgánica, Bioisosterismo y Eudismia
// Tipografía Científica: Texto plano y caracteres Unicode directos (cero LaTeX crudo)
// Revisión v3.43.0: la opción correcta nunca es la más larga, justificaciones
// certificadas por Jev pregunta a pregunta y estructuras verificadas con RDKit.
// ==========================================================================

import type { TestQuestion } from './qfdosData';

// ==========================================================================
// MODELO 1: Clasificación de Receptores, Síntesis, Farmacóforo β₂, CIP y Eudismia
// 15 Preguntas · Clave: C, A, D, B, C, D, A, B, D, C, A, B, D, C, A
// ==========================================================================
// Ids con sufijo -v2 desde v3.43.0: las claves cambiaron y el servidor no debe
// corregir con las anteriores. Hay que volver a publicar las claves desde el panel.
export const TEMA2_MODELO_1_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t02-m1-q01-v2",
    topicId: "tema-02",
    block: "Clasificación de Receptores & Escalera del N",
    badge: "Modelo 1 · P1 (Clasificación de Ahlquist)",
    question: "La clasificación clásica de Ahlquist ordena los receptores adrenérgicos por su sensibilidad relativa a tres agonistas de referencia. ¿Qué orden de potencia caracteriza al receptor β frente al α?",
    options: [
      { text: "β: noradrenalina > adrenalina > isoprenalina; α: isoprenalina > adrenalina > noradrenalina." },
      { text: "β y α comparten el orden adrenalina > isoprenalina > noradrenalina en los dos receptores." },
      { text: "β: isoprenalina > adrenalina > noradrenalina; α: noradrenalina ≥ adrenalina > isoprenalina." },
      { text: "β: adrenalina > noradrenalina > isoprenalina; α: isoprenalina > noradrenalina > adrenalina." },
    ],
    correctIndex: 2,
    explanation: "En cuanto a la clasificación de Ahlquist (1948), hemos comprobado en clase que el receptor β responde antes a la isoprenalina, luego a la adrenalina y por último a la noradrenalina, y que en el α el orden se invierte y la isoprenalina se queda casi sin efecto. Lo leemos con la escalera del nitrógeno: H en la noradrenalina, metilo en la adrenalina e isopropilo en la isoprenalina, y cada escalón suma actividad β y resta α.\n\nProponemos descartar la A porque invierte los dos órdenes, la B porque supone que los dos receptores responden igual, que es justo lo que Ahlquist desmintió, y la D porque cambia el orden β y pone la isoprenalina en cabeza del α.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m1-q02-v2",
    topicId: "tema-02",
    block: "Síntesis Química: Transposición de Fries",
    badge: "Modelo 1 · P2 (Síntesis de Salbutamol)",
    question: "La síntesis del salbutamol arranca en el ácido acetilsalicílico (aspirina). El primer paso, con AlCl₃ en nitrobenceno, transpone el acetilo del oxígeno fenólico al anillo aromático. ¿A qué posición migra el acilo y qué producto se obtiene?",
    questionSmiles: "CC(=O)Oc1ccccc1C(=O)O",
    options: [
      { text: "A la posición para respecto al OH fenólico, la menos impedida: se obtiene el ácido 5-acetil-2-hidroxibenzoico." },
      { text: "A la posición orto respecto al carboxilo, que se desplaza y cierra un anhídrido cíclico intramolecular de seis miembros." },
      { text: "Al nitrógeno del nitrobenceno, que actúa como aceptor del acilo en una aminólisis catalizada por el ácido de Lewis." },
      { text: "A la cadena del carboxilo, formando un β-cetoácido que se descarboxila de forma espontánea al calentar la mezcla." },
    ],
    correctIndex: 0,
    explanation: "En cuanto a la transposición de Fries, hemos comprobado en clase que el AlCl₃ (1,1 equivalentes o más) se coordina al oxígeno del éster fenólico, libera el ion acilio y este ataca el propio anillo, activado por el oxígeno. Una de las posiciones orto ya la ocupa el carboxilo y la para es la menos impedida, así que el acilo entra en para y obtenemos el ácido 5-acetilsalicílico con el fenol libre. Es el arranque de la ruta del salbutamol, porque ese acetilo es el que después bromamos y aminamos.\n\nProponemos descartar la B porque no se forma ningún anhídrido, la C porque el nitrobenceno solo es el disolvente y la D porque la Fries acila el anillo y no la cadena del carboxilo.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m1-q03-v2",
    topicId: "tema-02",
    block: "Interacción Ligando-Receptor β₂",
    badge: "Modelo 1 · P3 (Farmacóforo β₂ Salbutamol)",
    question: "Sobre la estructura del (R)-salbutamol, identifique la correspondencia tridimensional correcta entre cada grupo farmacofórico y el residuo del receptor β₂ con el que interacciona:",
    questionSmiles: "CC(C)(C)NC[C@H](O)c1ccc(O)c(CO)c1",
    options: [
      { text: "Amina → Ser203 (enlace de H); OH bencílico → Asp113 (iónico); 4-OH y 3-CH₂OH → Asn293 (apilamiento π)." },
      { text: "Amina → Asn293 (enlace de H); OH bencílico → Ser207 (iónico); 4-OH y 3-CH₂OH → Asp113 (catión-π)." },
      { text: "Amina → Trp86 (catión-π); OH bencílico → Ser203 (enlace de H); 4-OH y 3-CH₂OH → Asp113 (puente salino bidentado)." },
      { text: "Amina → Asp113 (TM3, iónico); OH bencílico → Asn293 (TM6, enlace de H); 4-OH y 3-CH₂OH → Ser203/207 (TM5)." },
    ],
    correctIndex: 3,
    explanation: "Sobre el farmacóforo β₂, hemos comprobado en clase sobre la estructura del receptor que el salbutamol se ancla en tres puntos. La amina protonada forma el par iónico con el Asp113 de TM3, el OH bencílico (R) da un enlace de hidrógeno con la Asn293 de TM6, y el 4-OH y el 3-CH₂OH se unen a las serinas 203, 204 y 207 de TM5, que son las que disparan la activación. El enantiómero (S) solo cumple dos de los tres contactos y por eso es unas 100 veces menos potente.\n\nProponemos descartar la A, la B y la C porque reparten mal los residuos: el Asp113 no hace enlaces de hidrógeno con fenoles sino el puente salino con el amonio, y el Trp86 de la C es de la acetilcolinesterasa.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m1-q04-v2",
    topicId: "tema-02",
    block: "Metabolismo por COMT vs Selectividad β₂",
    badge: "Modelo 1 · P4 (Isoetarina vs Salbutamol)",
    question: "Tanto la isoetarina como el salbutamol son agonistas β₂-selectivos, pero solo uno posee duración de acción prolongada. ¿Cuál de las siguientes estructuras corresponde a la isoetarina, que conserva el anillo catecólico 3,4-dihidroxilado intacto y por ello sufre rápida inactivación metabólica por la COMT?",
    options: [
      { text: "Estructura A", smiles: "CC(C)(C)NCC(O)c1ccc(O)c(CO)c1", revealedName: "Salbutamol (saligenina 3-CH₂OH, 4-OH con N-terc-butilo; resiste a la COMT)" },
      { text: "Estructura B", smiles: "CCC(NC(C)C)C(O)c1ccc(O)c(O)c1", revealedName: "Isoetarina (catecol 3,4-(OH)₂ con grupo etilo en posición α)" },
      { text: "Estructura C", smiles: "COc1ccc(CC(C)NCC(O)c2ccc(O)c(NC=O)c2)cc1", revealedName: "Formoterol (3-formamido, 4-OH con N-arilalquilo; LABA de 12 h)" },
      { text: "Estructura D", smiles: "CC(C)(C)NCC(O)c1cc(O)cc(O)c1", revealedName: "Terbutalina (resorcinol 3,5-(OH)₂ con N-terc-butilo; resiste a la COMT)" },
    ],
    correctIndex: 1,
    explanation: "Respecto a la isoetarina (B), hemos comprobado en clase que el etilo en el carbono α de la cadena y el N-isopropilo le dan preferencia por β₂, pero conserva el catecol 3,4-dihidroxilado. La COMT metila ese 3-OH en minutos y su acción dura de 1 a 3 horas. Nos sirve para ver que selectividad y estabilidad metabólica dependen de zonas distintas de la molécula: la selectividad la marca la cadena y la resistencia a la COMT, el anillo.\n\nProponemos descartar la A, la C y la D porque las tres resisten a la COMT: el salbutamol con el 3-CH₂OH saligenínico, el formoterol con un 3-formamido y 12 horas de acción, y la terbutalina con el resorcinol 3,5-dihidroxilado.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m1-q05-v2",
    topicId: "tema-02",
    block: "Génesis de las Ariloxipropanolaminas",
    badge: "Modelo 1 · P5 (Puente Oximetilénico)",
    question: "El propranolol inauguró la clase de las ariloxipropanolaminas, el molde estructural de los β-bloqueantes modernos. ¿Cuál de las siguientes estructuras corresponde al propranolol, que incorpora un puente oximetilénico (-O-CH₂-) intercalado entre el anillo aromático y la cadena de propanolamina?",
    options: [
      { text: "Estructura A", smiles: "CC(C)NCC(O)c1ccc2ccccc2c1", revealedName: "Pronetalol (ariletanolamina naftílica directa sin puente oximetilénico)" },
      { text: "Estructura B", smiles: "CC(C)NCC(O)c1ccc(O)c(O)c1", revealedName: "Isoprenalina (ariletanolamina catecólica directa)" },
      { text: "Estructura C", smiles: "CC(C)NCC(O)COc1cccc2ccccc12", revealedName: "Propranolol (puente oximetilénico -O-CH₂- entre naftaleno y cadena)" },
      { text: "Estructura D", smiles: "CC(C)NCC(O)c1ccc(Cl)c(Cl)c1", revealedName: "Dicloroisoproterenol / DCI (ariletanolamina diclorada)" },
    ],
    correctIndex: 2,
    explanation: "En cuanto al propranolol (C), hemos comprobado en clase que lo reconocemos por el puente -O-CH₂- entre el naftaleno y la cadena. El arilo ya no va unido directamente al carbono del OH, como en las ariletanolaminas, sino a través de un oxígeno, y la cadena gana un átomo. Ese cambio nos da la ariloxipropanolamina, el molde de casi todos los β-bloqueantes que llegaron después de 1964.\n\nProponemos descartar la A, la B y la D porque son ariletanolaminas sin el oxígeno intercalado: el pronetalol (naftilo directo), la isoprenalina (agonista con catecol) y el dicloroisoproterenol, con dos cloros en lugar de los OH.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m1-q06-v2",
    topicId: "tema-02",
    block: "Estereoquímica & CIP: Propranolol",
    badge: "Modelo 1 · P6 (Asignación CIP Propranolol)",
    question: "La estructura mostrada corresponde al enantiómero activo (eutómero) del propranolol. Sobre su centro estereogénico (el carbono carbinólico que porta el hidroxilo), ordene los sustituyentes según las reglas de Cahn-Ingold-Prelog (CIP) y asigne su configuración absoluta:",
    questionSmiles: "CC(C)NC[C@H](O)COc1cccc2ccccc12",
    options: [
      { text: "-OH > -CH₂-O-naftilo > -CH₂-NH-iPr > -H; con el H hacia atrás, 1→2→3 gira en sentido horario: (R)." },
      { text: "-CH₂-NH-iPr > -OH > -CH₂-O-naftilo > -H; el nitrógeno manda por ser el átomo más básico: configuración (R)." },
      { text: "No es estereogénico: sus dos sustituyentes -CH₂- se consideran equivalentes por la simetría de la molécula." },
      { text: "-OH > -CH₂-O-naftilo > -CH₂-NH-iPr > -H; con el H hacia atrás, 1→2→3 gira en sentido antihorario: (S)." },
    ],
    correctIndex: 3,
    explanation: "Respecto al centro del propranolol, hemos practicado este caso en clase porque es el que más se equivoca. El -OH va primero (oxígeno, Z = 8). Para desempatar los dos metilenos comparamos sus átomos unidos: el -CH₂-O-naftilo lleva (O, H, H) y el -CH₂-NH-iPr lleva (N, H, H), así que gana el oxígeno y el -CH₂-O- es el 2. El -CH₂-N- es el 3 y el H el 4. Con el H hacia atrás, el recorrido 1→2→3 va en sentido antihorario y el eutómero es (S).\n\nDescartamos la A porque acierta las prioridades pero lee mal el giro, la B porque la CIP no atiende a la basicidad sino al número atómico, y la C porque los dos -CH₂- llevan sustituyentes distintos.",
    difficulty: 'Avanzado'
  },
  {
    id: "t02-m1-q07-v2",
    topicId: "tema-02",
    block: "Estereoquímica & CIP: Salbutamol",
    badge: "Modelo 1 · P7 (Asignación CIP Salbutamol)",
    question: "La estructura mostrada corresponde al eutómero activo del salbutamol (levalbuterol). Sobre el carbono bencílico que porta el grupo hidroxilo, ordene los sustituyentes por las reglas CIP y asigne su configuración absoluta:",
    questionSmiles: "CC(C)(C)NC[C@H](O)c1ccc(O)c(CO)c1",
    options: [
      { text: "-OH > -CH₂-NH-tBu > arilo > -H; con el H hacia atrás, 1→2→3 gira en sentido horario: (R)." },
      { text: "-OH > -CH₂-NH-tBu > arilo > -H; con el H hacia atrás, 1→2→3 gira en sentido antihorario: (S)." },
      { text: "-OH > arilo > -CH₂-NH-tBu > -H, porque el anillo pesa más que el metileno: configuración (S)." },
      { text: "No es estereogénico: el arilo y la cadena aminada empatan en número atómico en la primera esfera." },
    ],
    correctIndex: 0,
    explanation: "Sobre el carbono bencílico del salbutamol, hemos comprobado en clase que el -OH es el 1 y que el desempate llega en la primera esfera. El -CH₂-NH-tBu lleva (N, H, H) y el carbono ipso del anillo lleva (C, C, C); comparamos átomo a átomo empezando por el de mayor número atómico, y el N (Z = 7) gana al C (Z = 6). La cadena aminada es el 2 y el arilo el 3. Con el H atrás, 1→2→3 gira en sentido horario y el levalbuterol es (R), el enantiómero que comercializamos puro.\n\nProponemos descartar la B porque lee el giro al revés, la C porque decide por peso molecular, que la CIP no usa, y la D porque el nitrógeno deshace el empate en el primer punto.",
    difficulty: 'Avanzado'
  },
  {
    id: "t02-m1-q08-v2",
    topicId: "tema-02",
    block: "Agonistas Indirectos: Feniletilaminas",
    badge: "Modelo 1 · P8 (Metanfetamina)",
    question: "La dexanfetamina ((S)-(+)-anfetamina) es el eutómero estimulante central entre los simpaticomiméticos indirectos. ¿Cuál de las siguientes estructuras corresponde a la metanfetamina, su homólogo N-metilado de mayor lipofilia y penetración en el SNC?",
    options: [
      { text: "Estructura A", smiles: "CC(N)Cc1ccccc1", revealedName: "Anfetamina (amina primaria sin sustitución en nitrógeno)" },
      { text: "Estructura B", smiles: "CNC(C)Cc1ccccc1", revealedName: "Metanfetamina (amina secundaria monometilada en nitrógeno)" },
      { text: "Estructura C", smiles: "C[C@H](NC)[C@H](O)c1ccccc1", revealedName: "Efedrina (1R,2S): amina secundaria N-metilada con OH bencílico" },
      { text: "Estructura D", smiles: "CC(C)(N)Cc1ccccc1", revealedName: "Fentermina (amina primaria con dos metilos en C-alfa)" },
    ],
    correctIndex: 1,
    explanation: "En cuanto a la metanfetamina (B), hemos comprobado en clase que es la N-metilanfetamina, una amina secundaria con un metilo sobre el nitrógeno. Ese metilo quita un donador de enlace de hidrógeno, sube el logP de 1,8 a 2,1 y acelera el paso por la barrera hematoencefálica; de ahí su mayor potencia central como liberador de dopamina y noradrenalina.\n\nProponemos descartar la A porque es la anfetamina, amina primaria; la C porque es la efedrina, también N-metilada pero con un OH bencílico y dos centros quirales; y la D porque es la fentermina, con los dos metilos en el carbono α y no en el nitrógeno.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m1-q09-v2",
    topicId: "tema-02",
    block: "Estereoquímica de la Dexanfetamina",
    badge: "Modelo 1 · P9 (CIP Dexanfetamina)",
    question: "La estructura mostrada corresponde a la dexanfetamina (dextroanfetamina), el enantiómero dextrorrotatorio (+) y eutómero psicoestimulante de la anfetamina. Sobre su carbono quiral alfa, asigne la configuración absoluta según las reglas CIP:",
    questionSmiles: "C[C@H](N)Cc1ccccc1",
    options: [
      { text: "-NH₂ > -CH₂C₆H₅ > -CH₃ > -H; con el H hacia delante, 1→2→3 gira en sentido horario: (R)." },
      { text: "-CH₂C₆H₅ > -NH₂ > -CH₃ > -H, porque el bencilo pesa más que el grupo amino: configuración (R)." },
      { text: "No hay estereocentro: el bencilo y el metilo son los dos cadenas hidrocarbonadas y se igualan." },
      { text: "-NH₂ > -CH₂C₆H₅ > -CH₃ > -H; con el H delante, el giro horario se invierte: (S)." },
    ],
    correctIndex: 3,
    explanation: "Respecto al carbono α de la dexanfetamina, hemos trabajado este caso en clase junto al del salbutamol. El -NH₂ es el 1 (N, Z = 7). Entre los dos carbonos, el del bencilo lleva (C, H, H) y el del metilo (H, H, H), así que el bencilo es el 2, el metilo el 3 y el H el 4. En el dibujo el metilo va hacia atrás y el H queda hacia delante: el giro 1→2→3 se ve en sentido horario, pero como miramos con el H hacia nosotros, la configuración real es (S), la (S)-(+)-anfetamina, el eutómero estimulante.\n\nDescartamos la A porque da la (R), que es la levanfetamina, varias veces menos activa en el SNC; la B porque decide por peso molecular en lugar de número atómico; y la C porque el carbono lleva cuatro sustituyentes distintos.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m1-q10-v2",
    topicId: "tema-02",
    block: "REA de Agonistas Indirectos",
    badge: "Modelo 1 · P10 (Lipofilia & Acceso SNC)",
    question: "Los agonistas adrenérgicos indirectos actúan promoviendo la liberación de noradrenalina vesicular en lugar de activar directamente el receptor. ¿Cuál de las siguientes estructuras representa el prototipo de agonista indirecto que carece totalmente de hidroxilos fenólicos y bencílicos, lo que maximiza su lipofilia y penetración al SNC?",
    options: [
      { text: "Estructura A", smiles: "NC[C@H](O)c1ccc(O)c(O)c1", revealedName: "Noradrenalina (conserva catecol 3,4-(OH)₂ y OH bencílico)" },
      { text: "Estructura B", smiles: "CC(C)(C)NCC(O)c1ccc(O)c(CO)c1", revealedName: "Salbutamol (conserva alcohol saligenínico polar)" },
      { text: "Estructura C", smiles: "CC(N)Cc1ccccc1", revealedName: "Anfetamina (carece de hidroxilos fenólicos y de OH bencílico)" },
      { text: "Estructura D", smiles: "Clc1cccc(Cl)c1NC1=NCCN1", revealedName: "Clonidina (derivado 2,6-dicloroanilino-imidazolina)" },
    ],
    correctIndex: 2,
    explanation: "En cuanto a la anfetamina (C), hemos comprobado en clase que no tiene ni los OH fenólicos ni el OH bencílico. Sin esos tres donadores de enlace de hidrógeno su logP sube hasta 1,8 y cruza la barrera hematoencefálica por difusión pasiva, mientras que la noradrenalina se queda por debajo de -1. En la terminal entra por el NET y saca la noradrenalina del citoplasma hacia la sinapsis por transporte inverso, sin activar ella misma el receptor.\n\nProponemos descartar la A porque es la noradrenalina, muy polar y sin acceso al SNC; la B porque es el salbutamol, agonista β₂ directo; y la D porque es la clonidina, agonista α₂ directo.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m1-q11-v2",
    topicId: "tema-02",
    block: "Síntesis Química: Apertura de Epóxidos",
    badge: "Modelo 1 · P11 (Regioquímica Epóxidos)",
    question: "La apertura regioespecífica de epóxidos aromáticos (arilglicidil éteres) es la reacción nuclear en la síntesis de ariloxipropanolaminas. ¿Qué principio rige la diferencia de regioquímica en la apertura de un epóxido asimétrico en medio básico frente a medio ácido?",
    options: [
      { text: "En medio básico, SN2 en el carbono menos impedido con inversión; en ácido, ataque en el más sustituido, que soporta mejor la carga." },
      { text: "En medio básico, ataque en el carbono más impedido; en ácido, en el menos sustituido, y en ambos casos con retención de configuración." },
      { text: "En los dos medios el nucleófilo va al carbono más sustituido, guiado solo por la densidad electrónica del anillo de tres miembros." },
      { text: "En los dos medios el nucleófilo va al carbono menos impedido, porque el factor estérico pesa siempre más que cualquier efecto electrónico." },
    ],
    correctIndex: 0,
    explanation: "Respecto a la apertura de epóxidos, hemos visto que el mecanismo decide la regioquímica. En medio básico, o con una amina como la isopropilamina, tenemos una SN2 en la que manda el impedimento estérico, y el nucleófilo entra por el CH₂ terminal con inversión. En medio ácido protonamos primero el oxígeno, el enlace C-O se alarga y la carga positiva parcial se acumula en el carbono más sustituido, que es el que recibe al nucleófilo. En la síntesis de las ariloxipropanolaminas usamos la amina, y por eso el OH secundario queda en C2.\n\nDescartamos la B porque cambia los dos casos y habla de retención, y la C y la D porque aplican un único criterio a los dos medios.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m1-q12-v2",
    topicId: "tema-02",
    block: "Antagonistas α₁: Núcleo Quinazolínico",
    badge: "Modelo 1 · P12 (Prazosina)",
    question: "Entre los fármacos antagonistas adrenérgicos, uno destaca como antagonista competitivo altamente selectivo de los receptores α₁ postsinápticos vasculares, de estructura quinazolínica con núcleo piperazina y furoílo, utilizado en la hipertensión arterial y en la hiperplasia benigna de próstata (HBP). ¿Cuál es?",
    options: [
      { text: "Estructura A", smiles: "CC(COc1ccccc1)N(CCCl)Cc1ccccc1", revealedName: "Fenoxibenzamina (β-cloroetilamina que forma un ion aziridinio)" },
      { text: "Estructura B", smiles: "COc1cc2nc(N3CCN(C(=O)c4ccco4)CC3)nc(N)c2cc1OC", revealedName: "Prazosina (quinazolina 6,7-dimetoxilada con piperazina y furoílo)" },
      { text: "Estructura C", smiles: "Cc1ccc(N(CC2=NCCN2)c2cccc(O)c2)cc1", revealedName: "Fentolamina (imidazolina reversible no selectiva)" },
      { text: "Estructura D", smiles: "COC(=O)[C@@H]1[C@H]2C[C@H]3c4[nH]c5ccccc5c4CCN3C[C@@H]2CC[C@@H]1O", revealedName: "Yohimbina (alcaloide indólico antagonista α₂)" },
    ],
    correctIndex: 1,
    explanation: "En cuanto a la prazosina (B), la identificamos por la 4-amino-6,7-dimetoxiquinazolina unida a una piperazina acilada con 2-furoílo. Hemos visto que bloquea de forma competitiva los α₁ postsinápticos del músculo liso vascular y deja libres los α₂ presinápticos, de modo que el freno sobre la liberación de noradrenalina sigue funcionando y la taquicardia refleja es pequeña. La usamos en hipertensión y en hiperplasia benigna de próstata.\n\nDescartamos la A porque es la fenoxibenzamina, una β-cloroetilamina irreversible; la C porque es la fentolamina, imidazolina reversible no selectiva; y la D porque es la yohimbina, alcaloide indólico antagonista α₂.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m1-q13-v2",
    topicId: "tema-02",
    block: "Eudismia en Ariloxipropanolaminas",
    badge: "Modelo 1 · P13 ((S)-Propranolol Eutómero)",
    question: "En las ariloxipropanolaminas, el enantiómero más potente (eutómero) posee configuración absoluta (S), a diferencia de las ariletanolaminas donde el eutómero es (R). ¿Cuál de las siguientes estructuras representa al eutómero biológicamente activo (S)-propranolol?",
    options: [
      { text: "Estructura A", smiles: "CC(C)NC[C@@H](O)COc1cccc2ccccc12", revealedName: "(R)-Propranolol (distómero, unas 100 veces menos afín)" },
      { text: "Estructura B", smiles: "CC(C)NCCCOc1cccc2ccccc12", revealedName: "Desoxipropranolol (análogo sin OH y sin estereocentro)" },
      { text: "Estructura C", smiles: "CC(C)NCC(O)c1ccc2ccccc2c1", revealedName: "Pronetalol (ariletanolamina naftílica directa)" },
      { text: "Estructura D", smiles: "CC(C)NC[C@H](O)COc1cccc2ccccc12", revealedName: "(S)-Propranolol (eutómero activo)" },
    ],
    correctIndex: 3,
    explanation: "Respecto al eutómero, el propranolol activo es el (S) (D), y hemos insistido en clase en que el cambio de letra frente a las ariletanolaminas es solo de nomenclatura. Al intercalar el oxígeno, el -CH₂-O-Ar, que ocupa el lugar del arilo, lleva (O, H, H) y pasa por delante del -CH₂-NH-R, que lleva (N, H, H). Se intercambian los puestos 2 y 3, pero el OH apunta en el receptor al mismo sitio que en la noradrenalina, y el (S) es unas 100 veces más afín que el (R).\n\nDescartamos la A porque es el (R)-propranolol, el distómero; la B porque es el desoxipropranolol, sin el OH del enlace de hidrógeno; y la C porque es el pronetalol, una ariletanolamina.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m1-q14-v2",
    topicId: "tema-02",
    block: "Transporte Activo & BHE: L-DOPA",
    badge: "Modelo 1 · P14 (Transporte por LAT1)",
    question: "La dopamina administrada por vía periférica no cruza la barrera hematoencefálica (BHE), pero su precursor biosintético L-DOPA sí accede al SNC para el tratamiento del párkinson. Sobre la estructura mostrada de la L-DOPA, ¿qué rasgo químico explica su transporte facilitado activo al cerebro?",
    questionSmiles: "N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O",
    options: [
      { text: "Su catecol dihidroxilado le da la lipofilia necesaria para atravesar el endotelio por difusión pasiva transcelular." },
      { text: "Su carga catiónica neta a pH fisiológico le permite pasar por los canales de potasio del endotelio cerebral." },
      { text: "Conserva el esqueleto de α-aminoácido neutro, que reconoce el transportador LAT1 (SLC7A5) del endotelio cerebral." },
      { text: "Al no tener centros quirales, la reconocen sin restricción los transportadores de glucosa GLUT1 de la barrera." },
    ],
    correctIndex: 2,
    explanation: "Sobre la L-DOPA, hemos comprobado en clase que lo decisivo es el esqueleto de L-α-aminoácido. Con el amino y el carboxilo sobre el mismo carbono la reconoce LAT1 (SLC7A5), el transportador de aminoácidos neutros grandes del endotelio cerebral, y entra al SNC como la fenilalanina o la tirosina. Ya dentro, la AADC la descarboxila a dopamina. La dopamina ha perdido el carboxilo y LAT1 no la reconoce, por eso, dada por vía periférica, se queda fuera. En clínica la damos con carbidopa, que frena esa descarboxilación en la periferia y nos permite reducir la dosis de L-DOPA en torno a un 75 %.\n\nProponemos descartar la A porque la L-DOPA es zwitteriónica y muy polar, la B porque a pH 7,4 no tiene carga catiónica neta y la D porque sí tiene un carbono quiral α.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m1-q15-v2",
    topicId: "tema-02",
    block: "Dualidad Agonista vs Antagonista β₂",
    badge: "Modelo 1 · P15 (Agonismo vs Antagonismo β₂)",
    question: "El receptor adrenérgico β₂ bronquial ilustra de forma ejemplar la dualidad farmacológica entre agonistas y antagonistas sobre una misma diana terapéutica. ¿Qué pareja de fármacos refleja con precisión esta oposición de efectos clínicos sobre el receptor β₂ pulmonar?",
    options: [
      { text: "Salbutamol, agonista β₂ que broncodilata en el asma, frente a propranolol, bloqueante β₁/β₂ que puede provocar broncoespasmo." },
      { text: "Clonidina, agonista α₂ central, frente a prazosina, antagonista α₁ periférico; ninguno de los dos actúa sobre el bronquio." },
      { text: "Fenoxibenzamina, antagonista α irreversible, frente a fentolamina, antagonista α reversible; los dos ajenos al árbol bronquial." },
      { text: "Reserpina, que vacía las vesículas, frente a guanetidina, que bloquea la exocitosis; ninguna toca de forma directa el receptor β₂." },
    ],
    correctIndex: 0,
    explanation: "En cuanto al receptor β₂ bronquial, hemos visto que está acoplado a Gs: sube el AMPc, la PKA fosforila e inactiva la cinasa de la cadena ligera de miosina y el músculo liso se relaja. El salbutamol activa esa vía y alivia el broncoespasmo en minutos. El propranolol bloquea β₁ y β₂ por igual, deja sin oposición el tono constrictor y puede desencadenar una crisis grave en el asmático; por eso los β-bloqueantes no selectivos están contraindicados en el asma.\n\nDescartamos la B, la C y la D porque esas parejas actúan sobre receptores α o sobre la liberación presináptica de noradrenalina, sin efecto directo sobre el β₂ bronquial.",
    difficulty: 'Medio'
  }
];

// ==========================================================================
// MODELO 2: Antagonistas (Beta y Alfa), Estereoquímica CIP y Reactividad Covalente
// 15 Preguntas · Clave: C, A, D, B, C, D, B, A, D, C, B, D, A, B, C
// ==========================================================================
export const TEMA2_MODELO_2_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t02-m2-q01",
    topicId: "tema-02",
    block: "Génesis de Beta-Bloqueantes",
    badge: "Modelo 2 · P1 (Estructura 2D)",
    question: "¿Cuál de las siguientes estructuras corresponde al dicloroisoproterenol (DCI), primer β-bloqueante sintetizado en 1958 donde se reemplazaron los dos OH catecólicos por átomos de cloro, mostrando agonismo parcial?",
    options: [
      { text: "Estructura A", smiles: "CC(C)NCC(O)c1ccc(O)c(O)c1", revealedName: "Isoprenalina (catecolamina agonista beta clásica completa)" },
      { text: "Estructura B", smiles: "CC(C)NCC(O)c1ccc2ccccc2c1", revealedName: "Pronetalol (primer antagonista beta puro con núcleo de naftilo)" },
      { text: "Estructura C", smiles: "CC(C)NCC(O)c1ccc(Cl)c(Cl)c1", revealedName: "Dicloroisoproterenol / DCI (3,4-diclorofenil feniletanolamina con agonismo parcial)" },
      { text: "Estructura D", smiles: "CC(C)NCC(O)COc1cccc2ccccc12", revealedName: "Propranolol (ariloxipropanolamina prototipo no selectivo)" },
    ],
    correctIndex: 2,
    explanation: "Respecto al dicloroisoproterenol (C), hemos visto que se obtuvo en 1958 cambiando los dos OH del catecol de la isoprenalina por cloros. Sin esos donadores de enlace de hidrógeno el compuesto conserva afinidad por el receptor β pero ya no lo activa del todo: bloquea la respuesta a la adrenalina y mantiene una actividad simpaticomimética intrínseca que impidió llevarlo a la clínica.\n\nDescartamos la A porque es la isoprenalina, el agonista completo con catecol; la B porque es el pronetalol, con naftilo y ya sin agonismo residual; y la D porque es el propranolol, con el puente -O-CH₂- entre el naftilo y la cadena.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m2-q02",
    topicId: "tema-02",
    block: "Pronetalol & Retirada Clínica",
    badge: "Modelo 2 · P2 (Toxicología Preclínica)",
    question: "En 1962, James Black sustituyó el anillo diclorofenilo por un núcleo condensado de naftilo, dando origen al pronetalol. Se convirtió en el primer bloqueador beta puro sin actividad agonista residual, pero fue retirado tempranamente de la investigación clínica. ¿Cuál fue la causa de su retirada?",
    questionSmiles: "CC(C)NCC(O)c1ccc2ccccc2c1",
    options: [
      { text: "Se observó que inducía tumores tímicos y linfosarcomas en los ensayos de toxicidad crónica en ratón." },
      { text: "Provocaba hipotensión ortostática grave porque el hígado lo convertía en un agonista α₂ de acción central." },
      { text: "Bloqueaba de forma irreversible los canales hERG y desencadenaba taquicardias ventriculares tipo torsade." },
      { text: "Era sustrato del transportador LAT1 y se acumulaba de forma tóxica en las neuronas dopaminérgicas." },
    ],
    correctIndex: 0,
    explanation: "En cuanto al pronetalol, hemos contado en clase que James Black lo llevó a la clínica en 1962 como β-bloqueante puro para angina y arritmias, pero en los ensayos toxicológicos produjo tumores de timo en ratón y se retiró. Esa retirada empujó a buscar análogos y dos años después llegó el propranolol.\n\nDescartamos la B porque le inventa un metabolito α₂ central, la C porque su retirada no tuvo que ver con hERG ni con el QT, y la D porque LAT1 transporta aminoácidos y el pronetalol no lo es.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m2-q03",
    topicId: "tema-02",
    block: "Ariloxipropanolaminas & Propranolol",
    badge: "Modelo 2 · P3 (Estructura 2D)",
    question: "¿Qué estructura corresponde al propranolol, el prototipo que inaugura la familia de las ariloxipropanolaminas al intercalar un puente oximetileno (-O-CH₂-) entre el naftilo y la cadena de propanolamina?",
    options: [
      { text: "Estructura A", smiles: "CC(C)NCC(O)c1ccc2ccccc2c1", revealedName: "Pronetalol (ariletanolamina naftílica directa sin oxígeno etéreo)" },
      { text: "Estructura B", smiles: "CC(=O)Nc1ccc(OCC(O)CNC(C)C)cc1", revealedName: "Practolol (ariloxipropanolamina monocíclica p-acetamido)" },
      { text: "Estructura C", smiles: "NC(=O)Cc1ccc(OCC(O)CNC(C)C)cc1", revealedName: "Atenolol (ariloxipropanolamina p-acetamida cardioselectiva β₁)" },
      { text: "Estructura D", smiles: "CC(C)NCC(O)COc1cccc2ccccc12", revealedName: "Propranolol (1-naftil ariloxipropanolamina no selectiva)" },
    ],
    correctIndex: 3,
    explanation: "Sobre el propranolol (D), hemos comprobado en clase que lo distinguimos por el 1-naftilo unido a la cadena -O-CH₂-CH(OH)-CH₂-NH-iPr. Frente al pronetalol, el oxígeno intercalado multiplica la potencia bloqueante β entre 10 y 20 veces, y el nuevo compuesto, que Black presentó en 1964, no reprodujo la carcinogenicidad tímica de su predecesor.\n\nProponemos descartar la A porque es el pronetalol, con el naftilo directamente sobre el C-OH; la B porque es el practolol, monocíclico con p-acetamido; y la C porque es el atenolol, con la acetamida -CH₂-CO-NH₂ en para.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m2-q04",
    topicId: "tema-02",
    block: "Estereoquímica & Reglas CIP",
    badge: "Modelo 2 · P4 (Inversión Formal CIP)",
    question: "El eutómero de los β-bloqueantes de la serie ariloxipropanolamina (ej. propranolol) posee configuración formal (S), mientras que en las ariletanolaminas (ej. noradrenalina, pronetalol) el eutómero es la forma (R). ¿Cómo se explica que cambie la letra de configuración si ambos interactúan con la MISMA disposición tridimensional en el receptor?",
    questionSmiles: "CC(C)NC[C@H](O)COc1cccc2ccccc12",
    options: [
      { text: "Las dos familias adoptan conformaciones opuestas en el bolsillo de unión y forman enlaces de hidrógeno cruzados." },
      { text: "El oxígeno etéreo cambia las prioridades CIP en torno al carbono quiral; la disposición espacial es la misma." },
      { text: "El (S)-propranolol se invierte in vivo a la forma (R) por acción de las enzimas microsomales hepáticas." },
      { text: "El anillo naftilo ejerce un efecto anisotrópico que cambia la hibridación del carbono quiral de sp3 a sp2." },
    ],
    correctIndex: 1,
    explanation: "Respecto a este cambio de letra, hemos comprobado en clase que es un efecto de la nomenclatura CIP y no de la geometría. En las ariletanolaminas el orden es -OH > -CH₂-NH-R > arilo > H, porque el N gana al C. En las ariloxipropanolaminas el grupo que ocupa el sitio del arilo es -CH₂-O-Ar, con (O, H, H), y ese oxígeno le hace ganar al -CH₂-NH-R, con (N, H, H). Se intercambian los puestos 2 y 3 y la letra pasa de (R) a (S), aunque el OH apunte al mismo sitio del receptor.\n\nProponemos descartar la A porque el OH se orienta igual en las dos familias, la C porque no hay inversión metabólica y la D porque el carbono sigue siendo sp3.",
    difficulty: 'Avanzado'
  },
  {
    id: "t02-m2-q05",
    topicId: "tema-02",
    block: "Cardioselectividad Beta-1",
    badge: "Modelo 2 · P5 (Estructura 2D)",
    question: "¿Cuál de las siguientes estructuras representa al atenolol, antagonista cardioselectivo β₁ que posee una función acetamida terminal en la posición para del anillo bencénico?",
    options: [
      { text: "Estructura A", smiles: "CC(C)NCC(O)COc1cccc2ccccc12", revealedName: "Propranolol (bloqueante no cardioselectivo muy lipófilo)" },
      { text: "Estructura B", smiles: "COc1ccccc1OCCNCC(O)COc2cccc3[nH]c4ccccc4c23", revealedName: "Carvedilol (bloqueante mixto beta y alfa-1 con carbazol)" },
      { text: "Estructura C", smiles: "NC(=O)Cc1ccc(OCC(O)CNC(C)C)cc1", revealedName: "Atenolol (ariloxipropanolamina p-acetamida cardioselectiva β₁)" },
      { text: "Estructura D", smiles: "COCCc1ccc(OCC(O)CNC(C)C)cc1", revealedName: "Metoprolol (beta-1 selectivo con p-metoxietilo)" },
    ],
    correctIndex: 2,
    explanation: "En cuanto al atenolol (C), hemos visto que lo reconocemos por la acetamida -CH₂-CO-NH₂ en para sobre un benceno, unido a la cadena de ariloxipropanolamina. Ese sustituyente polar en para es el rasgo que asociamos a la cardioselectividad β₁, y además hace al atenolol muy hidrófilo (logP en torno a 0,2), con poco paso al SNC.\n\nDescartamos la A porque es el propranolol, con naftilo, lipófilo y no selectivo; la B porque es el carvedilol, con carbazol y bloqueo α₁ añadido; y la D porque es el metoprolol, β₁ selectivo pero con un éter -CH₂-CH₂-OCH₃ en para, más lipófilo que el atenolol.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m2-q06",
    topicId: "tema-02",
    block: "Síntesis Asimétrica con Epiclorhidrina",
    badge: "Modelo 2 · P6 (Mecanismo SN2)",
    question: "En la síntesis de los β-bloqueantes de la familia ariloxipropanolamina (como el propranolol), ¿qué electrófilo bifuncional aporta la unidad -O-CH₂-CH(OH)-CH₂- y cómo se abre después?",
    questionSmiles: "CC(C)NCC(O)COc1cccc2ccccc12",
    options: [
      { text: "Cloruro de oxalilo, que hace una acilación electrofílica directa sobre el naftaleno activado por el OH." },
      { text: "Glicerol anhidro, que condensa con el naftol en ácido sulfúrico concentrado y a temperatura elevada." },
      { text: "Anhídrido acético, que acetila el fenol a reflujo y luego transpone el acetilo a la cadena lateral." },
      { text: "Epiclorhidrina: el naftóxido da el éter glicídico y la amina abre el epóxido por el carbono terminal." },
    ],
    correctIndex: 3,
    explanation: "Respecto a la síntesis de las ariloxipropanolaminas, hemos comprobado en clase que usamos epiclorhidrina (1-cloro-2,3-epoxipropano), un electrófilo con dos puntos reactivos. El 1-naftóxido, generado con base, ataca el carbono terminal del epóxido o desplaza el cloruro y, tras el cierre del anillo, nos queda el glicidil 1-naftil éter. En el segundo paso la isopropilamina abre ese epóxido por el carbono menos impedido, en SN2, y aparece el β-aminoalcohol del propranolol. Si partimos de un glicidilo enantiopuro obtenemos un solo enantiómero.\n\nProponemos descartar la A porque no puede construir la cadena de propanolamina, la B porque el glicerol no tiene ningún carbono electrófilo activado y la C porque solo daría acetato de naftilo.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m2-q07",
    topicId: "tema-02",
    block: "Contraindicación en Asma Bronquial",
    badge: "Modelo 2 · P7 (Farmacodinamia Bronquial)",
    question: "Un paciente de 58 años diagnosticado de hipertensión arterial esencial y angina de esfuerzo acude a urgencias por una crisis asmática grave tras iniciar tratamiento antihipertensivo con propranolol. ¿Cuál es el mecanismo fisiopatológico y farmacodinámico de esta reacción adversa potencialmente fatal?",
    questionSmiles: "CC(C)NCC(O)COc1cccc2ccccc12",
    options: [
      { text: "Estimula la síntesis de leucotrienos en los mastocitos bronquiales al activar directamente la 5-lipoxigenasa." },
      { text: "Bloquea β₁ y β₂ sin distinción; en el bronquio anula la relajación mediada por adrenalina: broncoespasmo." },
      { text: "Desencadena la desgranulación masiva de histamina al unirse de forma directa a la IgE fijada en los mastocitos." },
      { text: "Inhibe la fosfodiesterasa 4 bronquial y reduce el AMPc de la vía aérea, de modo que contrae el músculo liso." },
    ],
    correctIndex: 1,
    explanation: "En cuanto a esta reacción, hemos visto que el músculo liso bronquial depende de receptores β₂ acoplados a Gs: la adrenalina sube el AMPc, la PKA inactiva la cinasa de la cadena ligera de miosina y el bronquio se relaja. El propranolol bloquea β₁ y β₂ con afinidad parecida, así que en el asmático elimina ese tono dilatador, deja sin oposición el tono colinérgico y aparece un broncoespasmo grave. Por eso en estos pacientes proponemos un β₁ selectivo o, mejor, otra familia de antihipertensivos.\n\nDescartamos la A porque no actúa sobre la 5-lipoxigenasa, la C porque no es una reacción mediada por IgE y la D porque los inhibidores de la PDE4 suben el AMPc.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m2-q08",
    topicId: "tema-02",
    block: "Antagonistas Alfa Irreversibles",
    badge: "Modelo 2 · P8 (Estructura 2D)",
    question: "¿Qué estructura corresponde a la fenoxibenzamina, antagonista alfa-adrenérgico irreversible que forma espontáneamente un ion aziridinio cíclico altamente electrófilo que alquila al receptor?",
    options: [
      { text: "Estructura A", smiles: "CC(COc1ccccc1)N(CCCl)Cc1ccccc1", revealedName: "Fenoxibenzamina (β-cloroetilamina alquilante irreversible)" },
      { text: "Estructura B", smiles: "COc1cc2nc(N3CCN(C(=O)c4ccco4)CC3)nc(N)c2cc1OC", revealedName: "Prazosina (quinazolina antagonista selectivo α₁)" },
      { text: "Estructura C", smiles: "Cc1ccc(N(CC2=NCCN2)c2cccc(O)c2)cc1", revealedName: "Fentolamina (imidazolina, antagonista α competitivo reversible)" },
      { text: "Estructura D", smiles: "c1ccc(CC2=NCCN2)cc1", revealedName: "Tolazolina (bencilimidazolina, antagonista α sencillo)" },
    ],
    correctIndex: 0,
    explanation: "Respecto a la fenoxibenzamina (A), hemos visto que es una β-cloroetilamina terciaria: un nitrógeno con un bencilo, la cadena -CH₂-CH₂-Cl y el grupo 1-fenoxipropan-2-ilo. A pH fisiológico el par libre del nitrógeno desplaza al cloruro dentro de la propia molécula y se forma un ion aziridinio de tres miembros que alquila de forma covalente un nucleófilo del receptor α. El bloqueo dura hasta que la célula sintetiza receptores nuevos, del orden de 3 a 4 días.\n\nDescartamos la B porque es la prazosina, quinazolina selectiva α₁; la C porque es la fentolamina, imidazolina no selectiva; y la D porque es la tolazolina, una bencilimidazolina sencilla.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m2-q09",
    topicId: "tema-02",
    block: "Antagonistas Selectivos Alfa-1",
    badge: "Modelo 2 · P9 (Estructura 2D)",
    question: "Observe las siguientes estructuras. ¿Cuál corresponde a la prazosina, antagonista selectivo α₁ postsináptico constituido por un núcleo heterocíclico de quinazolina fusionado a un anillo de piperazina acilada con 2-furoilo?",
    options: [
      { text: "Estructura A", smiles: "Cc1ccc(N(CC2=NCCN2)c2cccc(O)c2)cc1", revealedName: "Fentolamina (antagonista no selectivo α₁/α₂)" },
      { text: "Estructura B", smiles: "Clc1cccc(Cl)c1NC2=NCCN2", revealedName: "Clonidina (derivado 2,6-dicloroanilino-imidazolínico)" },
      { text: "Estructura C", smiles: "c1ccccc1CN(CCCl)C(C)COc2ccccc2", revealedName: "Fenoxibenzamina (β-haloetilamina alquilante)" },
      { text: "Estructura D", smiles: "COc1cc2nc(nc(N)c2cc1OC)N3CCN(C(=O)c4ccco4)CC3", revealedName: "Prazosina (4-amino-6,7-dimetoxiquinazolina α₁ selectiva)" },
    ],
    correctIndex: 3,
    explanation: "Sobre la prazosina (D), hemos comprobado en clase que la reconocemos por tres piezas: la 4-amino-6,7-dimetoxiquinazolina, la piperazina central y el 2-furoílo que acila esa piperazina. Bloquea los α₁ vasculares con una selectividad de unas 1000 veces frente a los α₂ presinápticos, así que vasodilata sin la taquicardia refleja intensa que dan los bloqueantes no selectivos.\n\nProponemos descartar la A porque es la fentolamina, imidazolina no selectiva α₁/α₂; la B porque es la clonidina, agonista α₂ con el 2,6-dicloroanilino; y la C porque es la fenoxibenzamina, β-cloroetilamina irreversible.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m2-q10",
    topicId: "tema-02",
    block: "Taquicardia Refleja & Autorreceptores",
    badge: "Modelo 2 · P10 (Fentolamina vs Prazosina)",
    question: "La fentolamina es un antagonista competitivo de receptores adrenérgicos alfa no selectivo (bloquea tanto α₁ como α₂). ¿Por qué produce una intensa taquicardia refleja indeseable en clínica en comparación con antagonistas selectivos como la prazosina?",
    questionSmiles: "Cc1ccc(N(CC2=NCCN2)c3cccc(O)c3)cc1",
    options: [
      { text: "Porque estimula de forma directa los receptores β₁ del nodo sinusal y genera descargas adrenérgicas ectópicas." },
      { text: "Porque inhibe la acetilcolinesterasa en las terminaciones vagales del corazón y anula el control parasimpático." },
      { text: "Porque bloquea también los α₂ presinápticos, quita el freno a la liberación de noradrenalina y esta estimula los β₁." },
      { text: "Porque abre de forma covalente los canales de calcio tipo L del miocardio y mantiene una entrada de calcio sostenida." },
    ],
    correctIndex: 2,
    explanation: "En cuanto a la fentolamina, hemos comprobado en clase que el bloqueo α₁ dilata los vasos, baja la presión y activa el reflejo barorreceptor. Como además bloquea los autorreceptores α₂ presinápticos, la terminal pierde el freno que limita la salida de noradrenalina, y esa noradrenalina extra actúa sobre los β₁ cardíacos, que siguen libres. Con la prazosina, que respeta los α₂, la frecuencia apenas sube.\n\nProponemos descartar la A porque la fentolamina no tiene agonismo β₁, la B porque no es un anticolinesterásico y la D porque no actúa de forma covalente sobre canales de calcio.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m2-q11",
    topicId: "tema-02",
    block: "Bioisosterismo & Clonidina",
    badge: "Modelo 2 · P11 (Deslocalización Electrónica)",
    question: "La clonidina es un antihipertensivo de acción central agonista α₂ presináptico. En su diseño estructural, el puente metileno de la nafazolina se sustituyó por un grupo amino (-NH-). ¿Qué trascendencia electrónica y conformacional tuvo esta modificación bioisóstera?",
    questionSmiles: "Clc1cccc(Cl)c1NC2=NCCN2",
    options: [
      { text: "La convirtió en un electrófilo que alquila de forma covalente el canal de sodio epitelial (ENaC) del riñón." },
      { text: "El par libre del N puente se deslocaliza en la amidina: el pKa baja a ≈ 8 y queda fracción neutra que cruza la BHE." },
      { text: "Subió el pKa hasta 13,5, de modo que la molécula queda siempre ionizada y confinada en el compartimento vascular." },
      { text: "Indujo la hidrólisis espontánea del anillo de imidazolina, que da una urea inactiva incluso a temperatura ambiente." },
    ],
    correctIndex: 1,
    explanation: "Respecto a la clonidina, hemos comprobado en clase que en la nafazolina el -CH₂- aísla la imidazolina, cuyo pKa ronda 10-11, y a pH 7,4 casi toda la molécula está protonada. Al poner un -NH- en su lugar, el par libre de ese nitrógeno entra en conjugación con el C=N de la imidazolina y la basicidad baja hasta un pKa de 8,05. A pH 7,4 queda en torno a un 18 % de forma neutra, que es la que atraviesa la barrera hematoencefálica y llega al centro vasomotor.\n\nProponemos descartar la A porque la clonidina es un ligando reversible, la C porque el pKa baja en lugar de subir y la D porque es una molécula muy estable en agua.",
    difficulty: 'Avanzado'
  },
  {
    id: "t02-m2-q12",
    topicId: "tema-02",
    block: "Dopamina Beta-Hidroxilasa & Quelación",
    badge: "Modelo 2 · P12 (Cofactor Cobre)",
    question: "La dopamina β-hidroxilasa (DBH) es una metaloenzima dependiente de ascorbato y oxígeno molecular que cataliza la hidroxilación estereoselectiva de dopamina a noradrenalina. ¿Qué catión metálico cofactor esencial coordina su centro activo y qué fármaco es capaz de inhibirla mediante quelación directa de este cofactor?",
    questionSmiles: "CCN(CC)C(=S)SSC(=S)N(CC)CC",
    options: [
      { text: "Fe²⁺ hémico en el centro activo; la inhibe de forma selectiva el monóxido de carbono que se une al hierro." },
      { text: "Mg²⁺ coordinado por aspartatos; la inhibe de forma irreversible el EDTA administrado por vía intravenosa." },
      { text: "Zn²⁺ catalítico en geometría tetraédrica; la inhibe el sulfametoxazol al coordinarse con el ion metálico." },
      { text: "Cobre (Cu²⁺/Cu⁺); la inhibe el disulfiram, que in vivo da dietilditiocarbamato, un quelante del cobre." },
    ],
    correctIndex: 3,
    explanation: "En cuanto a la dopamina β-hidroxilasa, hemos comprobado en clase que su centro activo lleva dos cobres, que alternan entre Cu²⁺ y Cu⁺ para activar el O₂ e hidroxilar el carbono bencílico de la dopamina, con ascorbato como reductor. El disulfiram, que usamos en el alcoholismo, se reduce in vivo a dietilditiocarbamato, cuyos dos azufres quelan el cobre, y la enzima deja de convertir dopamina en noradrenalina. El ácido fusárico, derivado del picolínico, actúa también sobre ese cobre.\n\nProponemos descartar la A porque la DBH no tiene hemo, la B porque el Mg²⁺ es el cofactor de la COMT y la C porque el Zn²⁺ es propio de la anhidrasa carbónica.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m2-q13",
    topicId: "tema-02",
    block: "Marcadores Urinarios & VMA",
    badge: "Modelo 2 · P13 (Diagnóstico Feocromocitoma)",
    question: "En el diagnóstico del feocromocitoma (tumor secretor de catecolaminas) cuantificamos el ácido vanililmandélico (VMA) en orina de 24 horas. ¿Qué enzimas llevan la noradrenalina hasta el VMA?",
    questionSmiles: "NC[C@H](O)c1ccc(O)c(O)c1",
    options: [
      { text: "La MAO (desaminación oxidativa) y la COMT (O-metilación del 3-OH), más una deshidrogenasa que oxida hasta el ácido." },
      { text: "Una carboxilasa dependiente de biotina carboxila el anillo fenólico y una sulfotransferasa citoplasmática lo sulfata." },
      { text: "La dopamina β-hidroxilasa trabaja en sentido inverso y devuelve la noradrenalina a dopamina y después a L-DOPA." },
      { text: "Una UDP-glucuronosiltransferasa conjuga el OH bencílico sin modificar el catecol ni el grupo amino de la cadena." },
    ],
    correctIndex: 0,
    explanation: "Respecto al VMA (ácido 4-hidroxi-3-metoximandélico), hemos visto que necesitamos dos cambios sobre la noradrenalina: quitar el nitrógeno, que lo hace la MAO por desaminación oxidativa, y metilar el 3-OH, que lo hace la COMT. El orden puede variar: si actúa antes la MAO pasamos por el DHPG y el MHPG, y si actúa antes la COMT pasamos por la normetanefrina. En los dos casos una deshidrogenasa oxida hasta el ácido, y en el feocromocitoma medimos en orina de 24 horas valores muy por encima de los 7-8 mg diarios que consideramos normales.\n\nDescartamos la B porque esas carboxilaciones no existen en este catabolismo, la C porque la DBH no es reversible y la D porque la glucuronidación no da VMA.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m2-q14",
    topicId: "tema-02",
    block: "Antagonistas Selectivos Alfa-2",
    badge: "Modelo 2 · P14 (Yohimbina)",
    question: "La yohimbina es un alcaloide pentacíclico obtenido de Pausinystalia johimbe. ¿Cuál es su perfil farmacológico principal sobre los receptores adrenérgicos y qué consecuencia fisiológica periférica y central produce su administración?",
    questionSmiles: "COC(=O)[C@@H]1[C@H]2C[C@H]3c4[nH]c5ccccc5c4CCN3C[C@@H]2CC[C@@H]1O",
    options: [
      { text: "Agonista irreversible β₃ que activa la lipólisis en el tejido adiposo pardo sin modificar la presión arterial." },
      { text: "Antagonista selectivo α₂: al bloquear los autorreceptores sube la liberación de noradrenalina y el tono simpático." },
      { text: "Agonista inverso de los receptores muscarínicos M2 que reduce el gasto cardíaco y produce bradicardia intensa." },
      { text: "Inhibidor selectivo de la recaptación de dopamina (DAT), sin afinidad por receptores adrenérgicos ni por los 5-HT." },
    ],
    correctIndex: 1,
    explanation: "En cuanto a la yohimbina, hemos comprobado en clase que es el antagonista α₂ de referencia. Al bloquear los autorreceptores α₂, en el SNC y en la periferia, quita el freno a la liberación de noradrenalina y sube el tono simpático: aumentan la presión arterial y la frecuencia cardíaca, aparece estimulación central y en los cuerpos cavernosos favorece la erección, que es su uso tradicional.\n\nProponemos descartar la A porque la yohimbina no es agonista β₃, la C porque no es un fármaco muscarínico y da taquicardia en lugar de bradicardia, y la D porque su diana es el receptor α₂ y no el transportador de dopamina.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m2-q15",
    topicId: "tema-02",
    block: "Beta-Bloqueantes Mixtos de 3ª Generación",
    badge: "Modelo 2 · P15 (Carvedilol & Labetalol)",
    question: "Fármacos como el carvedilol y el labetalol se clasifican como β-bloqueantes de tercera generación dotados de actividad vasodilatadora adicional. ¿Qué singularidad molecular les confiere esta doble acción farmacodinámica (antagonismo beta + vasodilatación)?",
    questionSmiles: "COc1ccccc1OCCNCC(O)COc2cccc3[nH]c4ccccc4c23",
    options: [
      { text: "Liberan monóxido de carbono tras su metabolismo por el CYP2D6 en las células endoteliales de la pared vascular." },
      { text: "Bloquean a la vez los receptores AT1 de la angiotensina II gracias al núcleo indólico de su estructura química." },
      { text: "Reúnen en una molécula motivos que reconocen los receptores β y los α₁ vasculares: vasodilatan sin taquicardia." },
      { text: "Polimerizan de forma covalente en la membrana del miocito cardíaco y sellan los canales de potasio del sarcolema." },
    ],
    correctIndex: 2,
    explanation: "Respecto al carvedilol y el labetalol, hemos comprobado en clase que los dos bloquean β sin selectividad y suman bloqueo α₁. En el carvedilol la ariloxipropanolamina con carbazol aporta el bloqueo β y el 2-(2-metoxifenoxi)etilamino le da afinidad α₁. El labetalol lleva dos centros quirales y se usa como mezcla de 4 estereoisómeros: el (R,R), dilevalol, bloquea β y el (S,R) bloquea α₁. Al bloquear α₁ baja la resistencia periférica y, con el β también bloqueado, no aparece taquicardia refleja; por eso el labetalol es de primera línea en la hipertensión del embarazo.\n\nProponemos descartar la A porque no liberan CO, la B porque la afinidad AT1 es propia de los sartanes y la D porque su unión es reversible.",
    difficulty: 'Medio'
  }
];

// ==========================================================================
// MODELO 3: Farmacóforo β₂, Síntesis Orgánica, Bioisosterismo y Eudismia
// 15 Preguntas · Clave: A, B, C, B, A, D, C, A, B, D, A, C, B, D, A
// ==========================================================================
export const TEMA2_MODELO_3_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t02-m3-q01",
    topicId: "tema-02",
    block: "Escalera del Nitrógeno & Selectividad β₂",
    badge: "Modelo 3 · P1 (REA Nitrógeno)",
    question: "El volumen del sustituyente sobre el nitrógeno amínico gobierna el tránsito de la actividad α a la β y, en su extremo, la discriminación β₂ frente a β₁. ¿Cuál de las siguientes catecolaminas o análogos presenta el sustituyente que confiere selectividad β₂ junto con resistencia a la desaminación por MAO?",
    questionSmiles: "CC(C)(C)NCC(O)c1ccc(O)c(CO)c1",
    options: [
      { text: "Salbutamol: el terc-butilo sobre el N orienta hacia β₂ y su volumen dificulta el ataque de la MAO." },
      { text: "Noradrenalina: su amina primaria sin sustituir da la mejor selectividad β₂ y una semivida prolongada." },
      { text: "Adrenalina: el N-metilo le da preferencia por β₂ e impide por completo su metabolismo por la COMT." },
      { text: "Isoprenalina: el N-isopropilo da selectividad β₂ pura y resiste la desaminación oxidativa de la MAO." },
    ],
    correctIndex: 0,
    explanation: "En cuanto a la escalera del nitrógeno, hemos comprobado en clase que cada escalón de volumen sobre el N suma actividad β y resta α: H en la noradrenalina, metilo en la adrenalina, isopropilo en la isoprenalina y terc-butilo en el salbutamol. Con el terc-butilo, junto con el anillo saligenínico, la selectividad β₂ frente a β₁ ya es clara y el salbutamol dura de 4 a 6 horas. Ese volumen también nos protege de la MAO.\n\nProponemos descartar la B y la C porque ni la noradrenalina ni la adrenalina son selectivas β₂. La D se queda a medias: el isopropilo frena a la MAO, pero la isoprenalina activa β₁ y β₂ por igual y sube la frecuencia cardíaca.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m3-q02",
    topicId: "tema-02",
    block: "Resistencia a COMT: Saligenina",
    badge: "Modelo 3 · P2 (Alcohol Saligenínico)",
    question: "El salbutamol presenta una semivida plasmática marcadamente superior a la de la isoprenalina gracias a una modificación en el anillo aromático. ¿Qué grupo funcional sustituye al hidroxilo fenólico en posición 3 del catecol y cuál es la razón por la que no es metabolizado por la catecol-O-metiltransferasa (COMT)?",
    questionSmiles: "CC(C)(C)NCC(O)c1ccc(O)c(CO)c1",
    options: [
      { text: "Un metoxilo (-OCH₃), aceptor de enlace de hidrógeno que la S-adenosilmetionina ya no puede metilar." },
      { text: "Un hidroximetilo (-CH₂OH): el CH₂ aleja ese oxígeno del anillo y no hay quelato con el Mg²⁺ de la COMT." },
      { text: "Un carboxilo (-COOH), cuya carga negativa a pH fisiológico repele de forma electrostática a la COMT." },
      { text: "Un cloro electroatractor, que empobrece el anillo fenólico y lo desactiva frente a las metiltransferasas." },
    ],
    correctIndex: 1,
    explanation: "En cuanto al salbutamol, cambia el 3-OH fenólico del catecol por un 3-CH₂OH, el alcohol saligenínico. La COMT necesita los dos OH vecinos del catecol sobre el anillo para formar un quelato con el Mg²⁺ y metilar uno de ellos con la SAM. Con el metileno intercalado, ese oxígeno ya no está en el anillo y el quelato no se forma. Por eso el salbutamol dura de 4 a 6 horas y la isoprenalina, minutos.\n\nLas demás: A describe en realidad un producto de la COMT, como la metanefrina, con mucha menos afinidad β; C pondría una carga negativa donde el receptor necesita un donador de enlace de hidrógeno; D corresponde al dicloroisoproterenol.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q03",
    topicId: "tema-02",
    block: "Easson-Stedman & Eutómero R",
    badge: "Modelo 3 · P3 (Ajuste en 3 Puntos)",
    question: "El modelo de ajuste en tres puntos de Easson-Stedman describe la complementariedad entre los agonistas adrenérgicos y el receptor. ¿Qué configuración absoluta en el carbono bencílico carbinólico (C1) exhibe mayor potencia farmacológica (eutómero) y qué grupo farmacofórico se sitúa en la orientación requerida?",
    questionSmiles: "NC[C@H](O)c1ccc(O)c(O)c1",
    options: [
      { text: "(S), con el -OH bencílico orientado hacia la cavidad hidrofóbica del receptor." },
      { text: "(S), porque la CIP da la máxima prioridad al anillo de catecol de ese carbono." },
      { text: "(R), con el -OH bencílico dirigido a un enlace de hidrógeno con el receptor." },
      { text: "No hay eudismia en ese carbono: la interacción depende solo del grupo amonio." },
    ],
    correctIndex: 2,
    explanation: "Respecto al modelo de Easson-Stedman, hemos comprobado en clase que el eutómero de las feniletanolaminas agonistas (noradrenalina, adrenalina, salbutamol) es (R) en el carbono bencílico. Con esa configuración el receptor encuentra a la vez los tres puntos: el anillo frente a TM5 y TM6, el amonio frente al Asp113 de TM3 y el OH bencílico frente a la Asn293. En el (S) el OH apunta al lado contrario, perdemos ese tercer contacto y la potencia cae entre 10 y 100 veces.\n\nProponemos descartar la A y la B porque dan la (S), que es el distómero, y la B además pone el anillo por delante del OH en la CIP; la D porque niega una eudismia muy marcada.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q04",
    topicId: "tema-02",
    block: "Síntesis de Guanetidina: Beckmann",
    badge: "Modelo 3 · P4 (Expansión de Anillo)",
    question: "La guanetidina es un antihipertensivo que bloquea la transmisión adrenérgica presináptica. En su ruta sintética, la cicloheptanona oxima se somete a una transposición de Beckmann con ácido sulfúrico. ¿Qué producto cíclico se genera en este paso y qué reactivo se emplea a continuación para reducirlo a la amina secundaria precursora?",
    questionSmiles: "NC(=N)NCCN1CCCCCCC1",
    options: [
      { text: "Una amida lineal abierta, que después se cicla con NaH para dar un anillo de piperidina sustituida." },
      { text: "Una lactama de ocho miembros (azocan-2-ona), que el LiAlH₄ reduce a la amina secundaria azocano." },
      { text: "Un nitrilo aromático, que se hidrogena directamente con níquel Raney hasta la amina primaria." },
      { text: "Un derivado de pirrolidina, que contrae su anillo por catálisis con triflato de trimetilsililo." },
    ],
    correctIndex: 1,
    explanation: "En cuanto a la guanetidina, hemos visto que la transposición de Beckmann de la oxima de la cicloheptanona inserta el nitrógeno en el anillo y lo expande de 7 a 8 eslabones, de modo que obtenemos la azocan-2-ona, una lactama. El LiAlH₄ reduce el carbonilo de la lactama y llegamos al azocano (heptametilenimina). Después lo alquilamos con cloroacetonitrilo, reducimos el nitrilo a la etilamina y la guanilamos, por ejemplo con S-metilisotiourea, hasta la guanetidina.\n\nDescartamos la A porque la Beckmann de una oxima cíclica da lactama, la C porque no aparece ningún nitrilo aromático y la D porque el anillo se expande, no se contrae.",
    difficulty: 'Avanzado'
  },
  {
    id: "t02-m3-q05",
    topicId: "tema-02",
    block: "Bioisosterismo en Ultra-LABAs",
    badge: "Modelo 3 · P5 (Indacaterol)",
    question: "Los agonistas β₂ de acción ultralarga (ultra-LABAs) como el indacaterol han incorporado bioisósteros no clásicos del catecol para prolongar su efecto terapéutico. ¿Qué núcleo heterocíclico condensado reemplaza al anillo de catecol en el indacaterol y qué ventajas confiere frente al salbutamol?",
    questionSmiles: "CCc1cc2c(cc1CC)CC(NC[C@H](O)c1ccc(O)c3[nH]c(=O)ccc13)C2",
    options: [
      { text: "Una 8-hidroxiquinolin-2(1H)-ona: rígida, con enlaces de hidrógeno estables y sin catecol que metile la COMT." },
      { text: "Un indol-3-carboxamida, que se fosforila in vivo por proteína cinasas endoteliales y queda retenido en el tejido." },
      { text: "Una metanosulfonamida aromática idéntica a la del sotalol, que además bloquea la captación neuronal por el NET." },
      { text: "Un benzodioxano idéntico al de la doxazosina, que le añade un antagonismo selectivo α₁ de forma concomitante." },
    ],
    correctIndex: 0,
    explanation: "Sobre el indacaterol, hemos comprobado en clase que el catecol se sustituye por una 8-hidroxiquinolin-2(1H)-ona, un carbostirilo. El NH lactámico y el 8-OH reproducen los enlaces de hidrógeno de los dos oxígenos del catecol con las serinas de TM5, y sin catecol la COMT no tiene sustrato. Sumamos el 2-aminoindano con dos etilos, voluminoso y lipófilo, que alarga la permanencia en el pulmón y nos deja una dosis cada 24 horas, frente a las 12 del formoterol.\n\nProponemos descartar la B porque no corresponde a ningún LABA, la C porque describe al sotalol, antiarrítmico de clase III, y la D porque describe a la doxazosina, antagonista α₁.",
    difficulty: 'Avanzado'
  },
  {
    id: "t02-m3-q06",
    topicId: "tema-02",
    block: "Antagonismo Covalente: Aziridinio",
    badge: "Modelo 3 · P6 (Fenoxibenzamina)",
    question: "La fenoxibenzamina es un antagonista adrenérgico alfa irreversible. Su mecanismo de acción implica la formación espontánea de un intermedio reactivo a pH fisiológico. ¿Cuál es la estructura y naturaleza de este intermedio y cómo reacciona con el receptor adrenérgico?",
    questionSmiles: "CC(COc1ccccc1)N(CCCl)Cc1ccccc1",
    options: [
      { text: "Un carbocatión bencílico estabilizado por resonancia, que alquila los residuos de tirosina del receptor." },
      { text: "Un radical nitrogenado libre, que desencadena la peroxidación de los lípidos de membrana en la sinapsis." },
      { text: "Un complejo de coordinación con el ion calcio, que precipita en el poro y bloquea el acceso al receptor." },
      { text: "Un ion aziridinio de tres miembros, electrófilo por su tensión, que alquila un nucleófilo del receptor." },
    ],
    correctIndex: 3,
    explanation: "Respecto a la fenoxibenzamina, hemos visto que es una β-cloroetilamina terciaria, de la familia de las mostazas nitrogenadas. A pH fisiológico el par libre del nitrógeno desplaza al cloruro desde dentro de la molécula y cierra un ion aziridinio de tres miembros, con ángulos de unos 60° y mucha tensión. Un nucleófilo del receptor, un tiol de cisteína o un carboxilato, abre ese anillo y queda unido de forma covalente, y el bloqueo dura hasta que la célula sintetiza receptores nuevos.\n\nDescartamos la A porque la reacción pasa por el aziridinio y no por un carbocatión libre, la B porque el mecanismo es heterolítico y la C porque no coordina calcio.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q07",
    topicId: "tema-02",
    block: "Síntesis de Propranolol: Epiclorhidrina",
    badge: "Modelo 3 · P7 (Éter Glicídico)",
    question: "En la síntesis clásica del propranolol (ariloxipropanolamina), el 1-naftol se hace reaccionar con epiclorhidrina en medio básico. ¿Cuál es el producto intermedio resultante de este paso y con qué amina debe tratarse para completar el fármaco?",
    questionSmiles: "CC(C)NCC(O)COc1cccc2ccccc12",
    options: [
      { text: "1-cloro-3-(naftalen-1-iloxi)propan-2-ona, que se trata después con terc-butilamina en medio anhidro." },
      { text: "Ácido naftoxiacético activado con DCC, que se trata con isopropilamina para dar la amida correspondiente." },
      { text: "El glicidil 1-naftil éter, que la isopropilamina abre después por el carbono menos impedido del epóxido." },
      { text: "Acrilato de naftilo, que se trata con isopropilamina para que tenga lugar una adición de Michael conjugada." },
    ],
    correctIndex: 2,
    explanation: "En cuanto a la síntesis del propranolol, hemos comprobado en clase que con NaOH el 1-naftol pasa a naftóxido, que desplaza el cloro de la epiclorhidrina o abre el epóxido y lo vuelve a cerrar. Obtenemos el 1-(naftalen-1-iloxi)-2,3-epoxipropano, un éter glicídico. En el segundo paso la isopropilamina, en exceso, ataca en SN2 el carbono terminal del oxirano, el menos impedido, y queda el OH secundario en C2, que es la cadena del propranolol.\n\nProponemos descartar la A porque introduce una cetona y la amina equivocada, la B porque construye una amida que no está en el fármaco y la D porque esta ruta no pasa por una adición de Michael.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q08",
    topicId: "tema-02",
    block: "Bioactivación de Alfa-Metildopa",
    badge: "Modelo 3 · P8 (Falso Neurotransmisor)",
    question: "La α-metildopa es un profármaco antihipertensivo de acción central. Para ejercer su efecto terapéutico, debe penetrar en el SNC y sufrir una transformación biosintética. ¿Qué secuencia enzimática conduce al principio activo real y cuál es este metabolito?",
    questionSmiles: "C[C@](N)(Cc1ccc(O)c(O)c1)C(=O)O",
    options: [
      { text: "Descarboxilación por la AADC y β-hidroxilación por la DBH, que dan la (1R,2S)-α-metilnoradrenalina." },
      { text: "O-metilación masiva por la COMT en el citoplasma neuronal, seguida de una hidrólisis ácida lisosomal." },
      { text: "N-acetilación microsomal hepática, que da un metabolito liposoluble con acción agonista β₂ periférica." },
      { text: "Desaminación oxidativa por la MAO-A, que da un ácido carboxílico con acción antagonista α₁ central." },
    ],
    correctIndex: 0,
    explanation: "Sobre la alfa-metildopa, hemos comprobado en clase que entra en el cerebro por LAT1 porque es un aminoácido. Dentro de las neuronas noradrenérgicas sigue la ruta de la L-DOPA: la AADC la descarboxila a alfa-metildopamina y la DBH la hidroxila en el carbono bencílico hasta la alfa-metilnoradrenalina. Esa amina se almacena en las vesículas como falso neurotransmisor, activa los receptores alfa-2 del tronco encefálico y baja la salida simpática. Seguimos usándola en la hipertensión del embarazo, con 250 a 500 mg dos o tres veces al día.\n\nProponemos descartar la B porque la COMT inactivaría el fármaco, la C porque esa conjugación hepática no interviene y la D porque el alfa-metilo protege precisamente de la MAO.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q09",
    topicId: "tema-02",
    block: "Conformación & pKa de Clonidina",
    badge: "Modelo 3 · P9 (Conformación Ortogonal)",
    question: "La clonidina actúa como agonista α₂ adrenérgico central reduciendo el tono simpático. ¿Qué características estructurales explican su selectividad α₂ y su capacidad para cruzar la barrera hematoencefálica a pesar de contener una función guanidina?",
    questionSmiles: "Clc1cccc(Cl)c1NC2=NCCN2",
    options: [
      { text: "La ausencia de sustituyentes en el fenilo, que deja libre la rotación completa entre los dos anillos." },
      { text: "Los cloros 2,6 fuerzan anillos perpendiculares y el N puente baja el pKa a ≈ 8, con fracción neutra." },
      { text: "Un grupo sulfonamida que acidifica la molécula y la vuelve impermeable a las membranas celulares." },
      { text: "Un nitrógeno cuaternario con carga permanente que entra al cerebro por el transportador de colina." },
    ],
    correctIndex: 1,
    explanation: "En cuanto a la clonidina, reúne dos rasgos. Los cloros en 2 y 6 chocan con la imidazolina y obligan a los dos anillos a quedar casi perpendiculares, la conformación que reconoce el receptor α₂. Y el -NH- puente cede su par libre al sistema amidínico de la imidazolina: el pKa baja de ≈ 10-11 (el de la nafazolina) a ≈ 8,05. A pH 7,4 cerca de un 18 % está sin protonar, y esa fracción cruza la barrera hematoencefálica.\n\nLas demás: A va al revés, porque los cloros orto restringen la rotación; C le pone una sulfonamida que no tiene; D le pone un nitrógeno cuaternario que tampoco tiene.",
    difficulty: 'Avanzado'
  },
  {
    id: "t02-m3-q10",
    topicId: "tema-02",
    block: "Síntesis de Feniletanolaminas",
    badge: "Modelo 3 · P10 (Ruta Alfa-Bromocetona)",
    question: "Una de las estrategias clásicas para la síntesis de feniletanolaminas (como adrenalina o isoprenalina) implica la halogenación alfa de una cetona aromática seguida de aminación y reducción. Si se parte de 3,4-dihidroxi-α-cloroacetofenona, ¿con qué amina debe tratarse y qué reductor se emplea para obtener isoprenalina?",
    questionSmiles: "CC(C)NCC(O)c1ccc(O)c(O)c1",
    options: [
      { text: "Amoniaco gaseoso a presión para desplazar el cloro y después un reactivo de Grignard metílico." },
      { text: "Metilamina en metanol anhidro y después cianoborohidruro sódico a reflujo para la reducción." },
      { text: "terc-Butilamina para desplazar el cloro y después hidrólisis alcalina con hidróxido de litio." },
      { text: "Isopropilamina para desplazar el cloro y después NaBH₄ o H₂/Pd-C para reducir la aminocetona." },
    ],
    correctIndex: 3,
    explanation: "Respecto a esta ruta, hemos visto que la isopropilamina desplaza el cloruro de la 3,4-dihidroxi-α-cloroacetofenona en SN2 y nos da la aminocetona. Después reducimos el carbonilo a alcohol bencílico con NaBH₄ o con H₂ y Pd/C y obtenemos la isoprenalina racémica. La amina que elegimos decide el producto: con amoniaco llegamos a la noradrenalina, con metilamina a la adrenalina y con terc-butilamina al colterol.\n\nDescartamos la A porque daría la noradrenalina y un Grignard no tolera la cetona ni los fenoles libres, la B porque daría la adrenalina y la C porque daría el colterol sin reducir la cetona.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q11",
    topicId: "tema-02",
    block: "Saligenina vs Resorcinol: COMT",
    badge: "Modelo 3 · P11 (Geometría del Quelato)",
    question: "El diseño de agonistas β₂ selectivos estables frente a la COMT condujo a dos soluciones estructurales principales: la saligenina (salbutamol) y el resorcinol (terbutalina). ¿Qué diferencia estructural existe en la disposición de los hidroxilos fenólicos entre ambas estrategias y qué impacto tiene en la afinidad β?",
    questionSmiles: "CC(C)(C)NCC(O)c1cc(O)cc(O)c1",
    options: [
      { text: "El salbutamol aleja el 3-OH con un CH₂ y la terbutalina pone los OH en 3,5: sin quelato con Mg²⁺ y con afinidad β₂." },
      { text: "La terbutalina elimina todos los OH fenólicos y queda como una feniletilamina neutra, sin donadores en el anillo." },
      { text: "El salbutamol esterifica el catecol con ácido acético y funciona como un profármaco blando que se hidroliza en plasma." },
      { text: "Las dos estrategias hacen perder casi toda la afinidad β y ambas moléculas quedan como broncodilatadores indirectos." },
    ],
    correctIndex: 0,
    explanation: "Sobre las dos soluciones a la COMT, hemos comprobado en clase que la enzima necesita un catecol, dos OH en orto sobre el anillo, para formar el quelato con el Mg²⁺. El salbutamol mueve el 3-OH a un -CH₂OH y lo saca del anillo; la terbutalina, como el fenoterol, coloca los dos OH en 3 y 5, en meta entre sí, y a esa distancia no pueden quelar el metal. En ninguno de los dos casos hay metilación, el receptor β₂ admite los dos patrones de enlace de hidrógeno y pasamos de minutos de acción con la isoprenalina a 4-6 horas.\n\nProponemos descartar la B porque la terbutalina conserva sus dos OH, la C porque el salbutamol no es un profármaco y la D porque los dos son agonistas directos β₂.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q12",
    topicId: "tema-02",
    block: "Anclaje Iónico con TM3: Asp113",
    badge: "Modelo 3 · P12 (Reconocimiento Molecular)",
    question: "En el receptor β₂ adrenérgico, el anclaje del grupo amino de la catecolamina o feniletanolamina es un paso crítico para la afinidad. ¿Qué aminoácido conservado en la tercera hélice transmembrana (TM3) establece la interacción iónica fundamental y qué forma química del fármaco participa?",
    questionSmiles: "CC(C)(C)NCC(O)c1ccc(O)c(CO)c1",
    options: [
      { text: "Ser204 de TM5, que forma con la amina un enlace covalente transitorio de tipo éster en la activación." },
      { text: "Phe290 de TM6, que establece con el nitrógeno una interacción hidrofóbica de apilamiento π-π." },
      { text: "Asp113 de TM3, cuyo carboxilato ionizado forma un par iónico con el amonio protonado del ligando." },
      { text: "Asn312 de TM7, que forma con la amina un puente disulfuro mediado por una molécula de agua." },
    ],
    correctIndex: 2,
    explanation: "Respecto al anclaje de la amina, hemos visto que todos los receptores de aminas biógenas de la clase A de GPCR tienen un aspártico conservado en la posición 3.32, que en el β₂ humano es el Asp113. A pH 7,4 su carboxilato está desprotonado (pKa en torno a 4) y forma un puente salino con el amonio protonado del ligando. Es la interacción que fija la molécula en el sitio ortostérico y la razón por la que no hay agonismo sin un nitrógeno básico.\n\nDescartamos la A porque la Ser204 da enlaces de hidrógeno con los OH del anillo, la B porque la Phe290 interacciona con el anillo aromático y la D porque una amina no forma puentes disulfuro.",
    difficulty: 'Fácil'
  },
  {
    id: "t02-m3-q13",
    topicId: "tema-02",
    block: "Doble Reducción con LiAlH4 en Salbutamol",
    badge: "Modelo 3 · P13 (Química Sintética)",
    question: "En la síntesis del salbutamol a partir de 5-(cloroacetil)-2-hidroxibenzoato de metilo, tras la aminación con terc-butilamina se obtiene una cetoamina con función éster metílico en orto al fenol. ¿Qué agente reductor se emplea para reducir simultáneamente el carbonilo de la cetona a alcohol secundario y el éster a alcohol primario?",
    questionSmiles: "CC(C)(C)NCC(O)c1ccc(O)c(CO)c1",
    options: [
      { text: "NaBH₄, que reduce el éster aromático y la cetona con la misma velocidad en metanol a temperatura ambiente." },
      { text: "LiAlH₄ en THF anhidro, que reduce a la vez la cetona a alcohol secundario y el éster a alcohol primario." },
      { text: "H₂ con catalizador de Lindlar envenenado con quinolina, para evitar la sobrerreducción de los dos grupos." },
      { text: "Amalgama de cinc y ácido clorhídrico concentrado en caliente, es decir, una reducción de Clemmensen." },
    ],
    correctIndex: 1,
    explanation: "En cuanto a este paso, hemos comprobado en clase que necesitamos un reductor que alcance al éster. El NaBH₄, en condiciones normales, reduce aldehídos y cetonas pero deja el éster intacto. El LiAlH₄, en THF o éter anhidros y con exceso de hidruro, reduce las dos funciones en una sola operación: la cetona arílica pasa a alcohol secundario bencílico y el -COOCH₃ pasa a -CH₂OH, el alcohol saligenínico. Así llegamos al salbutamol.\n\nProponemos descartar la A porque el NaBH₄ no reduce ésteres en estas condiciones, la C porque el catalizador de Lindlar sirve para llevar alquinos a alquenos cis y la D porque la Clemmensen dejaría -CH₂- donde necesitamos los alcoholes.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q14",
    topicId: "tema-02",
    block: "DCI & Descubrimiento de Beta-Bloqueantes",
    badge: "Modelo 3 · P14 (Agonismo Parcial)",
    question: "El dicloroisoproterenol (DCI, 1958) fue el punto de inflexión histórico en el descubrimiento de los antagonistas beta. ¿Qué modificación estructural se realizó sobre la isoprenalina para transformar al agonista en un antagonista y cuál fue su limitación clínica principal?",
    questionSmiles: "CC(C)NCC(O)c1ccc(Cl)c(Cl)c1",
    options: [
      { text: "Se cambió el N-isopropilo por un metilo; produjo una necrosis hepática centrolobulillar fulminante." },
      { text: "Se oxidó el alcohol secundario a cetona aromática; el compuesto se hidrolizaba en minutos en agua." },
      { text: "Se añadió un metileno a la cadena alifática; causó bloqueo neuromuscular irreversible en la placa motora." },
      { text: "Se cambiaron los dos OH del catecol por cloros; conservaba agonismo parcial y no era un antagonista puro." },
    ],
    correctIndex: 3,
    explanation: "Respecto al dicloroisoproterenol, hemos comprobado en clase que Powell y Slater, en Lilly, cambiaron en 1958 los dos OH del catecol de la isoprenalina por cloros. Los cloros mantienen el volumen y el carácter electroatractor, pero no pueden donar enlaces de hidrógeno a las serinas de TM5, que completan la activación. El DCI demostró por primera vez que se podía bloquear el efecto de la adrenalina, pero conservaba una actividad simpaticomimética intrínseca importante y estimulaba el corazón.\n\nProponemos descartar la A porque el DCI conserva el N-isopropilo, la B porque mantiene el alcohol bencílico y la C porque sigue siendo una feniletanolamina.",
    difficulty: 'Medio'
  },
  {
    id: "t02-m3-q15",
    topicId: "tema-02",
    block: "Cardioselectividad Beta-1 & Seguridad en Asma",
    badge: "Modelo 3 · P15 (Atenolol vs Propranolol)",
    question: "Los antagonistas β₁-cardioselectivos (como atenolol o metoprolol) son preferibles a los no selectivos (propranolol) en pacientes con hipertensión arterial que padecen concomitantemente asma o EPOC. ¿Qué rasgo estructural confiere cardioselectividad β₁ y por qué es más seguro en el paciente asmático?",
    questionSmiles: "NC(=O)Cc1ccc(OCC(O)CNC(C)C)cc1",
    options: [
      { text: "Un sustituyente polar en para del anillo de la ariloxipropanolamina; respeta los β₂ y la broncodilatación." },
      { text: "La sustitución del nitrógeno secundario por un carbono cuaternario, que vuelve la molécula insoluble en sangre." },
      { text: "La isomerización a la forma trans de la cadena lateral, que impide su acceso a los receptores cardiovasculares." },
      { text: "La adición de un grupo nitroaromático, que induce una tolerancia farmacológica aguda y selectiva en el bronquio." },
    ],
    correctIndex: 0,
    explanation: "En cuanto a la cardioselectividad, hemos comprobado en clase que los bloqueantes β₁ (atenolol, metoprolol, bisoprolol) comparten un benceno monocíclico con un sustituyente en para capaz de formar enlaces de hidrógeno, como la acetamida del atenolol o el metoxietilo del metoprolol. Ese sustituyente se acomoda mejor en el β₁ cardíaco que en el β₂, y a dosis habituales el bronquio conserva el tono dilatador de la adrenalina. La selectividad es relativa y se pierde a dosis altas, así que en el asmático empezamos siempre con dosis bajas.\n\nProponemos descartar la B porque la amina es imprescindible para el anclaje con el Asp113, la C porque una cadena saturada no tiene isomería cis/trans y la D porque ninguno lleva un grupo nitro.",
    difficulty: 'Fácil'
  }
];
