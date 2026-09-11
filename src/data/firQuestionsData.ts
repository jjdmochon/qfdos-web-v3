// ==========================================================================
// Banco de Preguntas Oficiales FIR (2020-2025) — Química & Química Farmacéutica
// Ministerio de Sanidad del Gobierno de España / QFDOS v3 Master Repository
// Cero LaTeX crudo: tipografía científica Unicode limpia y estructuras RDKit.
// ==========================================================================

import { TestQuestion } from './qfdosData';

export interface FirQuestion {
  id: string;
  origYear: '2020' | '2021' | '2022' | '2023' | '2024' | '2025';
  origId: number;
  badge: string;
  category: 'Química Farmacéutica' | 'Química Orgánica';
  qfdosTopicId: string;
  qfdosTopicName: string;
  block: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Fácil' | 'Medio' | 'Avanzado';
  hasImage: boolean;
  imagePath?: string;
  smiles?: string;
}

export const FIR_QUESTIONS: FirQuestion[] = [
  {
    "id": "fir-2020-p01",
    "origYear": "2020",
    "origId": 1,
    "badge": "FIR 2020 · P1 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-03",
    "qfdosTopicName": "Tema 03: Sistema Dopaminérgico",
    "block": "Neurolépticos & Vía Dopaminérgica",
    "question": "Las ortopramidas son un grupo de antipsicóticos que se caracterizan estructuralmente por ser:",
    "options": [
      "Benzamidas con un grupo metoxilo en orto.",
      "Benzoatos con un grupo metoxilo en orto.",
      "Benzamidas con un grupo amino en orto.",
      "Benzoatos con un grupo amino en orto."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Benzamidas con un grupo metoxilo en orto.\". Pregunta oficial de la convocatoria 2020 (P1). Módulo: Neurolépticos & Vía Dopaminérgica.",
    "difficulty": "Fácil",
    "hasImage": false
  },
  {
    "id": "fir-2020-p02",
    "origYear": "2020",
    "origId": 2,
    "badge": "FIR 2020 · P2 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "Las moléculas que tienen propiedades físicas y químicas semejantes y que producen efectos fisiológicos similares, se denominan:",
    "options": [
      "Isómeros estructurales.",
      "Isómeros conformacionales.",
      "Bioisósteros.",
      "Enantiómeros."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Bioisósteros.\". Pregunta oficial de la convocatoria 2020 (P2). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Fácil",
    "hasImage": false
  },
  {
    "id": "fir-2020-p03",
    "origYear": "2020",
    "origId": 3,
    "badge": "FIR 2020 · P3 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál es la especie reactiva que se forma durante el proceso de bioactivación del fármaco antitumoral dacarbazina (derivado de triazenoimidazol)?:",
    "options": [
      "Radical hidroxilo.",
      "Catión aziridinio.",
      "Catión metildiazonio.",
      "Un grupo imino."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Catión metildiazonio.\". Pregunta oficial de la convocatoria 2020 (P3). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CN(C)/N=N/c1c[nH]c(=O)n1"
  },
  {
    "id": "fir-2020-p04",
    "origYear": "2020",
    "origId": 4,
    "badge": "FIR 2020 · P4 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-01",
    "qfdosTopicName": "Tema 01: Sistema Colinérgico",
    "block": "Neurotransmisión Colinérgica & Bloqueantes",
    "question": "¿Qué es el suxametonio (succinilcolina) respecto al decametonio?:",
    "options": [
      "Un profármaco.",
      "Un análogo blando.",
      "Un antagonista competitivo.",
      "Un análogo más lipófilo."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Un análogo blando.\". Pregunta oficial de la convocatoria 2020 (P4). Módulo: Neurotransmisión Colinérgica & Bloqueantes.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "C[N+](C)(C)CCOC(=O)CCC(=O)OCC[N+](C)(C)C"
  },
  {
    "id": "fir-2020-p05",
    "origYear": "2020",
    "origId": 5,
    "badge": "FIR 2020 · P5 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "El captopril, primer inhibidor comercializado de la enzima conversora de angiotensina (ECA), tiene un grupo tiol (mercapto). ¿Por qué razón este grupo no se ha conservado en los análogos diseñados con posterioridad?:",
    "options": [
      "No es importante para la actividad del captopril.",
      "Un grupo carboxílico interacciona mejor con el catión zinc de la metaloenzima.",
      "Su presencia se asocia con efectos secundarios, tales como la aparición de erupciones cutáneas.",
      "Porque se mejoran las propiedades organolépticas de los análogos."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Su presencia se asocia con efectos secundarios, tales como la aparición de erupciones cutáneas.\". Pregunta oficial de la convocatoria 2020 (P5). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Avanzado",
    "hasImage": false,
    "smiles": "CC(CS)C(=O)N1CCCC1C(=O)O"
  },
  {
    "id": "fir-2020-p06",
    "origYear": "2020",
    "origId": 6,
    "badge": "FIR 2020 · P6 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "El cloroformiato de bencilo, también denominado cloruro de benciloxicarbonilo (Cl-Cbz), es un reactivo muy utilizado en síntesis de péptidos. ¿Cuál es su finalidad?:",
    "options": [
      "Proteger un grupo amino.",
      "Proteger un grupo carboxílico.",
      "Activar un grupo carboxílico.",
      "Acoplar un grupo amino con un grupo carboxílico."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Proteger un grupo amino.\". Pregunta oficial de la convocatoria 2020 (P6). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p07",
    "origYear": "2020",
    "origId": 7,
    "badge": "FIR 2020 · P7 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-02",
    "qfdosTopicName": "Tema 02: Sistema Adrenérgico",
    "block": "Agonistas & Antagonistas Adrenérgicos",
    "question": "Señale la respuesta correcta en relación con las ariloxipropanolaminas que actúan de manera selectiva en receptores adrenérgicos beta-1:",
    "options": [
      "Presentan un sustituyente pequeño sobre el nitrógeno.",
      "El grupo arilo debe ser un ciclo condensado para establecer una fuerte interacción hidrofóbica con la diana.",
      "Presentan un sustituyente en posición para del anillo aromático, que establece un enlace de hidrógeno adicional con la diana.",
      "La amina debe ser terciaria."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Presentan un sustituyente en posición para del anillo aromático, que establece un enlace de hidrógeno adicional con la diana.\". Pregunta oficial de la convocatoria 2020 (P7). Módulo: Agonistas & Antagonistas Adrenérgicos.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p08",
    "origYear": "2020",
    "origId": 8,
    "badge": "FIR 2020 · P8 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Qué requisito estructural debe estar presente en los derivados de testosterona para que sean activos por vía oral?:",
    "options": [
      "Un grupo éster en la posición 17 beta.",
      "Un átomo de flúor en la posición 9 alfa.",
      "Un sustituyente en la posición 17 alfa.",
      "Un heteroátomo en la posición 2."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Un sustituyente en la posición 17 alfa.\". Pregunta oficial de la convocatoria 2020 (P8). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p09",
    "origYear": "2020",
    "origId": 9,
    "badge": "FIR 2020 · P9 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-06",
    "qfdosTopicName": "Tema 06: Sistema Opioide & Manejo del Dolor",
    "block": "Analgésicos Opioides & Análogos Rígidos",
    "question": "¿Cuál de las siguientes relaciones estructura-actividad NO es correcta para la morfina?:",
    "options": [
      "La presencia de un grupo ciclopropilmetilo en el nitrógeno conduce a compuestos con actividad agonista parcial.",
      "La N-fenetilnormorfina tiene una acción analgésica más potente que la morfina.",
      "La alquilación del hidroxilo fenólico reduce la actividad analgésica.",
      "La reducción del doble enlace reduce la actividad analgésica."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"La reducción del doble enlace reduce la actividad analgésica.\". Pregunta oficial de la convocatoria 2020 (P9). Módulo: Analgésicos Opioides & Análogos Rígidos.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CN1CCC23C4C1CC5=C2C(=C(C=C5)O)OC3C(C=C4)O"
  },
  {
    "id": "fir-2020-p10",
    "origYear": "2020",
    "origId": 10,
    "badge": "FIR 2020 · P10 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-02",
    "qfdosTopicName": "Tema 02: Sistema Adrenérgico",
    "block": "Agonistas & Antagonistas Adrenérgicos",
    "question": "¿Cuál de los siguientes compuestos puede considerarse un profármaco?:",
    "options": [
      "Omeprazol.",
      "Tolazamida.",
      "Fentanilo.",
      "Salbutamol."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Omeprazol.\". Pregunta oficial de la convocatoria 2020 (P10). Módulo: Agonistas & Antagonistas Adrenérgicos.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "COc1ccc2[nH]c(S(=O)Cc3ncc(C)c(OC)c3C)nc2c1"
  },
  {
    "id": "fir-2020-p11",
    "origYear": "2020",
    "origId": 11,
    "badge": "FIR 2020 · P11 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "¿Cuál es el papel del grupo ciano en la cimetidina?:",
    "options": [
      "Disminuye la basicidad del fragmento de guanidina, facilitando el paso del fármaco a través de membranas.",
      "Dificulta su metabolismo hepático de primer paso.",
      "Contribuye al carácter aceptor electrónico de la cadena lateral frente al anillo de imidazol.",
      "Aumenta su afinidad por proteínas de transporte, ayudando a su paso a través de membranas."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Disminuye la basicidad del fragmento de guanidina, facilitando el paso del fármaco a través de membranas.\". Pregunta oficial de la convocatoria 2020 (P11). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "Cc1c[nH]c(CSCCN=C(NC)NC#N)n1"
  },
  {
    "id": "fir-2020-p12",
    "origYear": "2020",
    "origId": 12,
    "badge": "FIR 2020 · P12 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de las siguientes afirmaciones sobre el mecanismo antitumoral de las 2-cloroetilnitrosoureas es INCORRECTA?:",
    "options": [
      "Inhiben la topoisomerasa II, enzima asociada al ADN.",
      "Provocan la fragmentación del ADN.",
      "Provocan la despurinización del ADN.",
      "Establecen un enlace cruzado entre hebras complementarias del ADN."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Inhiben la topoisomerasa II, enzima asociada al ADN.\". Pregunta oficial de la convocatoria 2020 (P12). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p13",
    "origYear": "2020",
    "origId": 13,
    "badge": "FIR 2020 · P13 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿De qué naturaleza es el metabolito electrófilo formado por metabolismo oxidativo de la aflatoxina B1 que es responsable de su hepatotoxicidad?:",
    "options": [
      "Imina.",
      "Cetona alfa,beta-insaturada.",
      "Hemiacetal.",
      "Epóxido."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Epóxido.\". Pregunta oficial de la convocatoria 2020 (P13). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p14",
    "origYear": "2020",
    "origId": 14,
    "badge": "FIR 2020 · P14 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "Las siguientes especies son dermatofitos, EXCEPTO:",
    "options": [
      "Microsporum canis.",
      "Trichophyton rubrum.",
      "Trichosporon asahii.",
      "Epidermophyton floccosum."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Trichosporon asahii.\". Pregunta oficial de la convocatoria 2020 (P14). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p15",
    "origYear": "2020",
    "origId": 15,
    "badge": "FIR 2020 · P15 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "El biomarcador 1-3-beta-D-glucano es útil para el diagnóstico de las infecciones fúngicas invasivas EXCEPTO las causadas por:",
    "options": [
      "Aspergillus terreus.",
      "Candida albicans.",
      "Cryptococcus neoformans.",
      "Pneumocystis jirovecii."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Cryptococcus neoformans.\". Pregunta oficial de la convocatoria 2020 (P15). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p16",
    "origYear": "2020",
    "origId": 16,
    "badge": "FIR 2020 · P16 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "En el cultivo de un exudado ótico, tras 24 horas de incubación a 35 °C, existe crecimiento en placas de agar chocolate, pero NO en agar sangre NI en agar MacConkey. Las colonias son oxidasa positivas y en la tinción de Gram se observan cocobacilos gram-negativos. ¿Cuál sería la identificación más probable?:",
    "options": [
      "Klebsiella pneumoniae.",
      "Pseudomonas aeruginosa.",
      "Haemophilus influenzae.",
      "Staphylococcus aureus."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Haemophilus influenzae.\". Pregunta oficial de la convocatoria 2020 (P16). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2020-p17",
    "origYear": "2020",
    "origId": 17,
    "badge": "FIR 2020 · P17 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál es el mecanismo de resistencia a quinolonas más frecuente en bacterias gramnegativas?:",
    "options": [
      "Mutaciones en el gen de la ADN girasa (gyrA).",
      "Mutaciones en el gen de la ARN polimerasa (rpoB).",
      "Modificación de la diana por metilación del ribosoma (genes erm).",
      "Beta-lactamasas de clase C de Ambler."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Mutaciones en el gen de la ADN girasa (gyrA).\". Pregunta oficial de la convocatoria 2020 (P17). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p18",
    "origYear": "2020",
    "origId": 18,
    "badge": "FIR 2020 · P18 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Qué característica de las siguientes NO es propia de neumococo?:",
    "options": [
      "Puede causar neumonía, meningitis, bacteriemia y otitis, entre otras infecciones.",
      "En la tinción de Gram se observan diplococos grampositivos.",
      "La colistina es el fármaco de elección para el tratamiento de la meningitis por neumococo.",
      "La detección de antígeno polisacárido C de neumococo en orina es útil en el diagnóstico de neumonía en población adulta."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"La colistina es el fármaco de elección para el tratamiento de la meningitis por neumococo.\". Pregunta oficial de la convocatoria 2020 (P18). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2020-p176",
    "origYear": "2020",
    "origId": 176,
    "badge": "FIR 2020 · P176 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "La susceptibilidad a desarrollar una reacción alérgica puede ser hereditaria debido a una predisposición genética que favorece la producción de anticuerpos IgE. Sin embargo, el antígeno al que un individuo es alérgico no se hereda. ¿Cuál de las afirmaciones siguientes explica mejor esta aparente contradicción?:",
    "options": [
      "El repertorio de linfocitos B del progenitor no se hereda; el reordenamiento del BCR es al azar e independiente del antígeno.",
      "Se heredan las moléculas del MHC, que son las que presentan el alérgeno a las células B.",
      "El repertorio de linfocitos B en individuos atópicos es sesgado y por ello siempre habrá IgEs específicas para el alérgeno.",
      "En respuesta al alérgeno, los individuos atópicos producen más IL-4, que induce el cambio de isotipo a IgE."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"En respuesta al alérgeno, los individuos atópicos producen más IL-4, que induce el cambio de isotipo a IgE.\". Pregunta oficial de la convocatoria 2020 (P176). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2020-p177",
    "origYear": "2020",
    "origId": 177,
    "badge": "FIR 2020 · P177 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "Señale cuál de estas afirmaciones NO es cierta con respecto al coeficiente de correlación de Spearman:",
    "options": [
      "Se utiliza para comprobar relaciones lineales.",
      "Se utiliza para comparar variables cuantitativas.",
      "Está muy afectado por los valores anormalmente alejados de los valores centrales.",
      "Se calcula a partir de ordenaciones de valores."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Está muy afectado por los valores anormalmente alejados de los valores centrales.\". Pregunta oficial de la convocatoria 2020 (P177). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2020-p179",
    "origYear": "2020",
    "origId": 179,
    "badge": "FIR 2020 · P179 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "El metronidazol es un derivado del nitroimidazol que se emplea como antiparasitario y contra bacterias anaerobias y cuyo mecanismo de acción, una vez dentro de la célula bacteriana, se basa en:",
    "options": [
      "Su reducción y la posterior formación de radicales libres, que actúan sobre el ADN.",
      "Su oxidación y formación de especies electrófilas, que actúan sobre el ADN.",
      "Su actuación como intercalante del ADN.",
      "La inhibición de la aromatasa."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Su reducción y la posterior formación de radicales libres, que actúan sobre el ADN.\". Pregunta oficial de la convocatoria 2020 (P179). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2021-p01",
    "origYear": "2021",
    "origId": 1,
    "badge": "FIR 2021 · P1 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Qué ventaja tiene el empleo de aciloximetilésteres en lugar de ésteres simples en el diseño de profármacos de ácidos carboxílicos?:",
    "options": [
      "Disminuye la velocidad de hidrólisis.",
      "Aumenta la estabilidad del profármaco.",
      "El grupo éster externo es más accesible al centro activo de las esterasas.",
      "Facilita la bioactivación selectiva en el lugar de acción."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"El grupo éster externo es más accesible al centro activo de las esterasas.\". Pregunta oficial de la convocatoria 2021 (P1). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p02",
    "origYear": "2021",
    "origId": 2,
    "badge": "FIR 2021 · P2 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Qué inconveniente presenta el empleo de bases de Mannich como profármacos de amidas?:",
    "options": [
      "Son inestables in vitro.",
      "Aumentan excesivamente la lipofilia.",
      "Son demasiado estables in vivo.",
      "Forman con facilidad redes cristalinas muy estables."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Son inestables in vitro.\". Pregunta oficial de la convocatoria 2021 (P2). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p03",
    "origYear": "2021",
    "origId": 3,
    "badge": "FIR 2021 · P3 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "¿Cuál de los siguientes sustituyentes presentes en la estructura de los antagonistas de los receptores de angiotensina II es ácido y aporta lipofilia?:",
    "options": [
      "Bifenilo.",
      "Hidroximetilo.",
      "Tetrazol.",
      "n-Butilo."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Tetrazol.\". Pregunta oficial de la convocatoria 2021 (P3). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p04",
    "origYear": "2021",
    "origId": 4,
    "badge": "FIR 2021 · P4 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Qué papel desempeñan los fragmentos de beta-hidroxicarbonilo de las antraciclinas en su actividad biológica?:",
    "options": [
      "Establecen enlaces covalentes con el ADN.",
      "Establecen enlaces de hidrógeno con la topoisomerasa I.",
      "Fijan la conformación activa a través de enlaces de hidrógeno intramoleculares.",
      "Forman quelatos con el Fe3+ favoreciendo la formación de radicales hidroxilo."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Forman quelatos con el Fe3+ favoreciendo la formación de radicales hidroxilo.\". Pregunta oficial de la convocatoria 2021 (P4). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p05",
    "origYear": "2021",
    "origId": 5,
    "badge": "FIR 2021 · P5 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-02",
    "qfdosTopicName": "Tema 02: Sistema Adrenérgico",
    "block": "Agonistas & Antagonistas Adrenérgicos",
    "question": "¿Qué consecuencia tiene el cambio de posición de uno de los grupos hidroxilo del anillo de catecol en los derivados de ariletanolamina que actúan en los receptores adrenérgicos?:",
    "options": [
      "Se favorece la degradación por la catecol-O-metil-transferasa.",
      "Se pierde actividad al disminuir la analogía con el ligando endógeno.",
      "Aumenta la estabilidad metabólica.",
      "Se favorece la degradación por monoamino oxidasas."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Aumenta la estabilidad metabólica.\". Pregunta oficial de la convocatoria 2021 (P5). Módulo: Agonistas & Antagonistas Adrenérgicos.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p06",
    "origYear": "2021",
    "origId": 6,
    "badge": "FIR 2021 · P6 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "El catión metildiazonio es un metabolito activo de:",
    "options": [
      "Procarbazina.",
      "Ciclofosfamida.",
      "Mecloretamina.",
      "Busulfán."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Procarbazina.\". Pregunta oficial de la convocatoria 2021 (P6). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p07",
    "origYear": "2021",
    "origId": 7,
    "badge": "FIR 2021 · P7 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "¿Cuál de los siguientes fármacos se considera un inhibidor suicida?:",
    "options": [
      "Lopinavir.",
      "Captopril.",
      "Selegilina.",
      "Rivastigmina."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Selegilina.\". Pregunta oficial de la convocatoria 2021 (P7). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p08",
    "origYear": "2021",
    "origId": 8,
    "badge": "FIR 2021 · P8 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Cuál de las siguientes reacciones metabólicas de fase II NO conduce a un metabolito de mayor polaridad?:",
    "options": [
      "Glucuronidación.",
      "Acetilación.",
      "Conjugación con sulfato.",
      "Conjugación con glutatión."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Acetilación.\". Pregunta oficial de la convocatoria 2021 (P8). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p09",
    "origYear": "2021",
    "origId": 9,
    "badge": "FIR 2021 · P9 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-05",
    "qfdosTopicName": "Tema 05: Sistema GABAérgico",
    "block": "Modulación Alostérica del Receptor GABAA",
    "question": "Un método general para obtener derivados del ácido barbitúrico consiste en la reacción entre:",
    "options": [
      "Fenilhidrazina y un compuesto carbonílico enolizable.",
      "Una 1,3-diamina y carbonato de etilo.",
      "Acetilacetato de etilo, amoniaco y aldehídos aromáticos.",
      "Un éster malónico convenientemente sustituido y urea."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Un éster malónico convenientemente sustituido y urea.\". Pregunta oficial de la convocatoria 2021 (P9). Módulo: Modulación Alostérica del Receptor GABAA.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p10",
    "origYear": "2021",
    "origId": 10,
    "badge": "FIR 2021 · P10 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "Las sulfonilureas ejercen su efecto hipoglucemiante al interaccionar con:",
    "options": [
      "Canales de calcio dependientes de potencial.",
      "Canales de sodio dependientes de potencial.",
      "Bombas iónicas dependientes de ATP.",
      "Canales de potasio dependientes de ATP."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Canales de potasio dependientes de ATP.\". Pregunta oficial de la convocatoria 2021 (P10). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p11",
    "origYear": "2021",
    "origId": 11,
    "badge": "FIR 2021 · P11 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "La síntesis de péptidos a partir de un aminoácido anclado sobre un soporte polimérico insoluble en el medio de reacción se denomina síntesis de:",
    "options": [
      "Hantzsch.",
      "Corey.",
      "Merrifield.",
      "Skraup."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Merrifield.\". Pregunta oficial de la convocatoria 2021 (P11). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p12",
    "origYear": "2021",
    "origId": 12,
    "badge": "FIR 2021 · P12 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-09",
    "qfdosTopicName": "Tema 09: AINEs & Coxibs",
    "block": "Inhibidores de COX & Fármacos Antiinflamatorios",
    "question": "La toxicidad del paracetamol [N-(4-hidroxifenil)acetamida] a dosis elevadas, se debe a la formación de un metabolito altamente electrófilo. ¿De qué naturaleza química es este metabolito?:",
    "options": [
      "Epóxido.",
      "Catión aziridinio.",
      "Iminoquinona.",
      "Isocianato."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Iminoquinona.\". Pregunta oficial de la convocatoria 2021 (P12). Módulo: Inhibidores de COX & Fármacos Antiinflamatorios.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CC(=O)Nc1ccc(O)cc1"
  },
  {
    "id": "fir-2021-p13",
    "origYear": "2021",
    "origId": 13,
    "badge": "FIR 2021 · P13 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "En las relaciones cuantitativas entre la estructura química y la actividad biológica, el parámetro de Hammett se relaciona con:",
    "options": [
      "La lipofilia de la molécula.",
      "El efecto estérico de los sustituyentes.",
      "La fracción de fármaco que alcanza la diana.",
      "El efecto electrónico de los sustituyentes."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"El efecto electrónico de los sustituyentes.\". Pregunta oficial de la convocatoria 2021 (P13). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p14",
    "origYear": "2021",
    "origId": 14,
    "badge": "FIR 2021 · P14 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "El carbacol es un análogo de acetilcolina que tiene en su estructura un grupo carbamato en lugar del grupo éster. ¿Qué consecuencias tiene esta sustitución?:",
    "options": [
      "El carbacol se hidroliza en medio ácido con mayor facilidad que la acetilcolina debido a la presencia del grupo carbamato.",
      "El grupo carbamato confiere al carbacol estabilidad química y metabólica.",
      "El grupo carbamato permite incrementar la afinidad por el receptor a través de una interacción π-π.",
      "La sustitución bioisostérica del metilo por el grupo amino en el carbacol incrementa el efecto estérico, aumentando la afinidad por su diana terapéutica."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"El grupo carbamato confiere al carbacol estabilidad química y metabólica.\". Pregunta oficial de la convocatoria 2021 (P14). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p15",
    "origYear": "2021",
    "origId": 15,
    "badge": "FIR 2021 · P15 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de las siguientes características estructurales es típica de los agentes alquilantes pertenecientes al grupo de las mostazas nitrogenadas?:",
    "options": [
      "La presencia de grupos capaces de formar enlaces de hidrógeno.",
      "La presencia de un grupo capaz de formar un catión aziridinio.",
      "La presencia de una cadena peptídica corta y cargada positivamente.",
      "La presencia de una estructura aromática plana y pobre en electrones."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"La presencia de un grupo capaz de formar un catión aziridinio.\". Pregunta oficial de la convocatoria 2021 (P15). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p16",
    "origYear": "2021",
    "origId": 16,
    "badge": "FIR 2021 · P16 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-01",
    "qfdosTopicName": "Tema 01: Sistema Colinérgico",
    "block": "Neurotransmisión Colinérgica & Bloqueantes",
    "question": "Para el diseño de los antídotos frente a los gases neurotóxicos sarín y tabún, se utilizó la siguiente estrategia:",
    "options": [
      "Diseñar compuestos derivados de hidroxilamina capaces de hidrolizar la posición fosforilada en la acetilcolinesterasa y reactivar así la enzima rápidamente.",
      "Diseñar compuestos derivados de hidroxilamina capaces de hidrolizar el residuo acetilado en la acetilcolinesterasa y reactivar así la enzima de forma controlada.",
      "Diseñar compuestos derivados de hidroxicloroquina que debido a su elevada electrofilia son capaces de hidrolizar el residuo carbamoilado en la acetilcolinesterasa reactivando rápidamente la enzima.",
      "Diseñar compuestos derivados de hidrazina capaces de hidrolizar la posición carbamoilada en la acetilcolinesterasa y reactivar la enzima rápidamente."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Diseñar compuestos derivados de hidroxilamina capaces de hidrolizar la posición fosforilada en la acetilcolinesterasa y reactivar así la enzima rápidamente.\". Pregunta oficial de la convocatoria 2021 (P16). Módulo: Neurotransmisión Colinérgica & Bloqueantes.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p17",
    "origYear": "2021",
    "origId": 17,
    "badge": "FIR 2021 · P17 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "La anfotericina B es un antifúngico que pertenece al siguiente grupo:",
    "options": [
      "Polienos.",
      "Triazoles.",
      "Candinas.",
      "Sulfamidas."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Polienos.\". Pregunta oficial de la convocatoria 2021 (P17). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p18",
    "origYear": "2021",
    "origId": 18,
    "badge": "FIR 2021 · P18 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "Respecto a los hongos Mucorales:",
    "options": [
      "Son sensibles a voriconazol.",
      "Causan infecciones diagnosticables mediante la detección de ß-1-3-D-glucano.",
      "Causan infección sinusal, rino-órbito-cerebral, broncopulmonar, cutánea o diseminada.",
      "Tienen afinidad por tejidos queratinizados."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Causan infección sinusal, rino-órbito-cerebral, broncopulmonar, cutánea o diseminada.\". Pregunta oficial de la convocatoria 2021 (P18). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2021-p173",
    "origYear": "2021",
    "origId": 173,
    "badge": "FIR 2021 · P173 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de los siguientes ciclohexanos sustituidos tiene mayor preferencia por situar el sustituyente en posición ecuatorial en la conformación silla?:",
    "options": [
      "Metilciclohexano.",
      "Ter-butilciclohexano.",
      "Clorociclohexano.",
      "Hidroxiciclohexano."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Ter-butilciclohexano.\". Pregunta oficial de la convocatoria 2021 (P173). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2021-p174",
    "origYear": "2021",
    "origId": 174,
    "badge": "FIR 2021 · P174 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "La formación de carbocationes como intermedios de reacción se produce en reacciones de:",
    "options": [
      "Sustitución nucleofílica bimolecular sobre derivados halogenados.",
      "Adición nucleofílica a cetonas.",
      "Adición tipo Michael.",
      "Adición electrofílica a alquenos."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Adición electrofílica a alquenos.\". Pregunta oficial de la convocatoria 2021 (P174). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2021-p176",
    "origYear": "2021",
    "origId": 176,
    "badge": "FIR 2021 · P176 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "Para la síntesis del aminoácido alanina, en su forma racémica, mediante un proceso de aminación reductora, ¿cuál de los ácidos que se indican ha de emplearse como material de partida?:",
    "options": [
      "Ácido 2-oxopropanoico.",
      "Ácido 2-cloropropanoico.",
      "Ácido 2-hidroxipropanoico.",
      "Ácido 2-oxobutanoico."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Ácido 2-oxopropanoico.\". Pregunta oficial de la convocatoria 2021 (P176). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2021-p177",
    "origYear": "2021",
    "origId": 177,
    "badge": "FIR 2021 · P177 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de los siguientes alcoholes es más ácido?:",
    "options": [
      "Etanol.",
      "2,2,2-Trifluoroetanol.",
      "p-Clorofenol.",
      "p-Aminofenol."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"p-Clorofenol.\". Pregunta oficial de la convocatoria 2021 (P177). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2022-p01",
    "origYear": "2022",
    "origId": 1,
    "badge": "FIR 2022 · P1 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "Saquinavir y ritonavir son fármacos utilizados en el tratamiento del SIDA que son además un ejemplo de diseño racional basado en la estructura. ¿Cuál de las siguientes afirmaciones describe correctamente a estos compuestos?:",
    "options": [
      "Son peptidomiméticos diseñados para inhibir la proteasa del VIH y actuar como análogos del estado de transición.",
      "Son análogos de los ácidos nucleicos y actúan como inhibidores competitivos de la transcriptasa inversa.",
      "Son peptidomiméticos diseñados para inhibir la integrasa del VIH y actuar como inhibidores reversibles.",
      "Son compuestos que contienen en su estructura un sistema de didesoxiribosa, diseñados para actuar como inhibidores de una proteasa del VIH."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Son peptidomiméticos diseñados para inhibir la proteasa del VIH y actuar como análogos del estado de transición.\". Pregunta oficial de la convocatoria 2022 (P1). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": false,
    "smiles": "CC(C)(C)NC(=O)C1CC2CCCCC2CN1CC(O)C(Cc3ccccc3)NC(=O)C(NC(=O)c4nc5ccccc5cc4)C(=O)N"
  },
  {
    "id": "fir-2022-p02",
    "origYear": "2022",
    "origId": 2,
    "badge": "FIR 2022 · P2 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "Las penicilinas poseen una estructura bicíclica que contiene una β-lactama fundamental para su actividad antibacteriana. Este sistema bicíclico:",
    "options": [
      "Confiere una elevada tensión que dificulta su apertura por las β-lactamasas bacterianas, confiriéndole así resistencia a estas enzimas.",
      "Mimetiza el enlace glicosídico entre N-acetilmurámico y N-acetilglucosamina impidiendo así la síntesis del peptidoglicano presente en la pared celular bacteriana.",
      "Mimetiza el dímero de D-Ala-D-Ala presente en el peptidoglicano, inhibiendo irreversiblemente la transpeptidasa.",
      "Puede ser modificado bioisostéricamente, sustituyendo el nitrógeno por un oxígeno y dando lugar a una β-lactona química y enzimáticamente más estable."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Mimetiza el dímero de D-Ala-D-Ala presente en el peptidoglicano, inhibiendo irreversiblemente la transpeptidasa.\". Pregunta oficial de la convocatoria 2022 (P2). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p03",
    "origYear": "2022",
    "origId": 3,
    "badge": "FIR 2022 · P3 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-02",
    "qfdosTopicName": "Tema 02: Sistema Adrenérgico",
    "block": "Agonistas & Antagonistas Adrenérgicos",
    "question": "Los β-bloqueantes fueron diseñados para actuar como antagonistas de los receptores β-1 del corazón. Estructuralmente son ariloxipropanolaminas y su selectividad cardiaca se consigue:",
    "options": [
      "Introduciendo un grupo pequeño (H, metilo) en el grupo amino.",
      "Introduciendo un grupo moderadamente voluminoso (isopropilo) en el grupo amino.",
      "Eliminando el grupo catecol y sustituyéndolo por un arilo más voluminoso.",
      "Epimerizando el grupo hidroxilo."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Introduciendo un grupo moderadamente voluminoso (isopropilo) en el grupo amino.\". Pregunta oficial de la convocatoria 2022 (P3). Módulo: Agonistas & Antagonistas Adrenérgicos.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p04",
    "origYear": "2022",
    "origId": 4,
    "badge": "FIR 2022 · P4 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "El sistema de quinolina forma parte de la estructura de muchos fármacos. Su síntesis se puede llevar a cabo mediante el método de Skraup, que implica hacer reaccionar derivados de:",
    "options": [
      "Anilina con ácido sulfúrico y glicerina en presencia de nitrobenceno.",
      "Piridina con malonato de dietilo en medio básico.",
      "Fenilpropilamina en condiciones de ciclación.",
      "Anilina con propanol en condiciones de sustitución nucleófila aromática."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Anilina con ácido sulfúrico y glicerina en presencia de nitrobenceno.\". Pregunta oficial de la convocatoria 2022 (P4). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p05",
    "origYear": "2022",
    "origId": 5,
    "badge": "FIR 2022 · P5 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de los siguientes antagonistas de los canales NMDA del ácido glutámico es además un agente antiviral?:",
    "options": [
      "Ketamina.",
      "Amantadina.",
      "Ganciclovir.",
      "Dextrometorfano."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Amantadina.\". Pregunta oficial de la convocatoria 2022 (P5). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p06",
    "origYear": "2022",
    "origId": 6,
    "badge": "FIR 2022 · P6 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-06",
    "qfdosTopicName": "Tema 06: Sistema Opioide & Manejo del Dolor",
    "block": "Analgésicos Opioides & Análogos Rígidos",
    "question": "¿Con qué nombre se describen los fármacos que mantienen la actividad opioide de la morfina y carecen del anillo de epóxido y del anillo C de esta?:",
    "options": [
      "Morfinanos.",
      "Fenilpiperidinas.",
      "Anilinopiperidinas.",
      "Benzomorfanos."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Benzomorfanos.\". Pregunta oficial de la convocatoria 2022 (P6). Módulo: Analgésicos Opioides & Análogos Rígidos.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CN1CCC23C4C1CC5=C2C(=C(C=C5)O)OC3C(C=C4)O"
  },
  {
    "id": "fir-2022-p07",
    "origYear": "2022",
    "origId": 7,
    "badge": "FIR 2022 · P7 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "En el diseño de las estatinas, ¿qué fragmento de la estructura se considera esencial para realizar la actividad inhibidora del enzima HMG-CoA reductasa?:",
    "options": [
      "El fragmento de decalina.",
      "El fragmento de β-hidroxi-δ-lactona o su correspondiente dihidroxiácido.",
      "El anillo aromático halogenado.",
      "El grupo isopropilo."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"El fragmento de β-hidroxi-δ-lactona o su correspondiente dihidroxiácido.\". Pregunta oficial de la convocatoria 2022 (P7). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p08",
    "origYear": "2022",
    "origId": 8,
    "badge": "FIR 2022 · P8 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de las siguientes ecuaciones define al coeficiente de partición (P) de un fármaco, siendo [fármaco] la concentración de dicho fármaco en el disolvente indicado?:",
    "options": [
      "P = [fármaco]agua/[fármaco]octanol.",
      "P = Log[fármaco]agua.",
      "P = [fármaco]octanol/[fármaco]agua.",
      "P = Log[fármaco]octanol."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"P = [fármaco]octanol/[fármaco]agua.\". Pregunta oficial de la convocatoria 2022 (P8). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p09",
    "origYear": "2022",
    "origId": 9,
    "badge": "FIR 2022 · P9 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Qué tipo de intermedio reactivo se forma en el metabolismo oxidativo de los anillos aromáticos y es responsable de su toxicidad?:",
    "options": [
      "Quinona.",
      "1,2-Diol.",
      "Epóxido.",
      "Radical hidroxilo."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Epóxido.\". Pregunta oficial de la convocatoria 2022 (P9). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p10",
    "origYear": "2022",
    "origId": 10,
    "badge": "FIR 2022 · P10 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "La metodología utilizada para preparar, en un proceso único y eficiente, una mezcla o colección de compuestos estructuralmente relacionados, se denomina:",
    "options": [
      "Química supramolecular.",
      "Química combinatoria.",
      "Química divergente.",
      "Química sostenible."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Química combinatoria.\". Pregunta oficial de la convocatoria 2022 (P10). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p11",
    "origYear": "2022",
    "origId": 11,
    "badge": "FIR 2022 · P11 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-07",
    "qfdosTopicName": "Tema 07: Sistema Histaminérgico & Antiulcerosos",
    "block": "Antihistamínicos & Antisecretores Gástricos",
    "question": "¿Cuál es el papel fundamental del grupo metoxilo en la posición 4 del anillo de piridina del omeprazol?:",
    "options": [
      "Aumentar su estabilidad metabólica.",
      "Disminuir su lipofilia para disminuir su absorción.",
      "Aumentar la nucleofilia del nitrógeno piridínico para su bioactivación.",
      "Aumentar su lipofilia para favorecer su absorción."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Aumentar la nucleofilia del nitrógeno piridínico para su bioactivación.\". Pregunta oficial de la convocatoria 2022 (P11). Módulo: Antihistamínicos & Antisecretores Gástricos.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "COc1ccc2[nH]c(S(=O)Cc3ncc(C)c(OC)c3C)nc2c1"
  },
  {
    "id": "fir-2022-p12",
    "origYear": "2022",
    "origId": 12,
    "badge": "FIR 2022 · P12 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-02",
    "qfdosTopicName": "Tema 02: Sistema Adrenérgico",
    "block": "Agonistas & Antagonistas Adrenérgicos",
    "question": "El atracurio es un bloqueante neuromuscular análogo sintético de la tubocurarina que se inactiva rápidamente en la sangre (pH= 7,4) por una reacción de:",
    "options": [
      "Hidrólisis de un grupo carbamato.",
      "Desmetilación de la sal de amonio cuaternario.",
      "Oxidación del heterociclo nitrogenado.",
      "Eliminación de Hofmann."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Eliminación de Hofmann.\". Pregunta oficial de la convocatoria 2022 (P12). Módulo: Agonistas & Antagonistas Adrenérgicos.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p13",
    "origYear": "2022",
    "origId": 13,
    "badge": "FIR 2022 · P13 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-01",
    "qfdosTopicName": "Tema 01: Sistema Colinérgico",
    "block": "Neurotransmisión Colinérgica & Bloqueantes",
    "question": "¿Cuáles de los siguientes fragmentos deben estar presentes en la estructura de los antagonistas nicotínicos?:",
    "options": [
      "Dos restos de acetilcolina situados a una determinada distancia el uno del otro.",
      "Un átomo de nitrógeno cuaternario, una función oxigenada, y dos grupos apolares próximos a esta última.",
      "Dos átomos de nitrógeno cargados unidos por un espaciador, de manera que estén situados a una distancia determinada el uno del otro.",
      "Un nitrógeno cuaternario y anillos aromáticos con grupos aceptores de electrones."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Dos átomos de nitrógeno cargados unidos por un espaciador, de manera que estén situados a una distancia determinada el uno del otro.\". Pregunta oficial de la convocatoria 2022 (P13). Módulo: Neurotransmisión Colinérgica & Bloqueantes.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p14",
    "origYear": "2022",
    "origId": 14,
    "badge": "FIR 2022 · P14 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Qué consecuencia tiene la introducción de un grupo etinilo en la posición 17-a del estradiol?:",
    "options": [
      "Aumenta la selectividad al facilitar la unión al receptor a y al impedir la interacción con el receptor β.",
      "Prolonga la actividad del fármaco por inhibición de su metabolismo.",
      "Aumenta la unión al receptor al incrementar la acidez del grupo OH en la posición 17-β.",
      "Cambia la actividad del fármaco de agonista a antagonista."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Prolonga la actividad del fármaco por inhibición de su metabolismo.\". Pregunta oficial de la convocatoria 2022 (P14). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p15",
    "origYear": "2022",
    "origId": 15,
    "badge": "FIR 2022 · P15 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Qué parte de la estructura de la eritromicina es responsable de su inestabilidad química?:",
    "options": [
      "El fragmento de β-hidroxicarbonilo.",
      "El resto de aminoazúcar.",
      "El grupo lactona.",
      "Los dos fragmentos de y-hidroxicarbonilo."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Los dos fragmentos de y-hidroxicarbonilo.\". Pregunta oficial de la convocatoria 2022 (P15). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p16",
    "origYear": "2022",
    "origId": 16,
    "badge": "FIR 2022 · P16 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-06",
    "qfdosTopicName": "Tema 06: Sistema Opioide & Manejo del Dolor",
    "block": "Analgésicos Opioides & Análogos Rígidos",
    "question": "Las oripavinas son análogos rígidos de la morfina. Se obtienen a partir del alcaloide tebaína, aprovechando la presencia en su estructura de un sistema de dos dobles enlaces conjugados, por medio de la siguiente reacción:",
    "options": [
      "Cicloadición [4+2].",
      "Expansión de anillo.",
      "Cicloadición [3+2].",
      "Contracción de anillo."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Cicloadición [4+2].\". Pregunta oficial de la convocatoria 2022 (P16). Módulo: Analgésicos Opioides & Análogos Rígidos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2022_16.jpg",
    "smiles": "CN1CCC23C4C1CC5=C2C(=C(C=C5)O)OC3C(C=C4)O"
  },
  {
    "id": "fir-2022-p17",
    "origYear": "2022",
    "origId": 17,
    "badge": "FIR 2022 · P17 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "En el diseño de fármacos, la sustitución de una función éster por un grupo carbamato, ¿qué consecuencia tiene?:",
    "options": [
      "Un aumento de la lipofilia y, por tanto, mejor absorción.",
      "Una disminución de la vida media.",
      "Un aumento de la estabilidad metabólica.",
      "Un incremento del impedimento estérico."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Un aumento de la estabilidad metabólica.\". Pregunta oficial de la convocatoria 2022 (P17). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p18",
    "origYear": "2022",
    "origId": 18,
    "badge": "FIR 2022 · P18 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Qué característica estructural es común en los agentes intercalantes del ADN?:",
    "options": [
      "Una cadena peptídica.",
      "Un anillo de aziridina.",
      "Un sistema plano de anillos aromáticos o heteroaromáticos.",
      "Un fragmento de β-hidroxicarbonilo."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Un sistema plano de anillos aromáticos o heteroaromáticos.\". Pregunta oficial de la convocatoria 2022 (P18). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2022-p171",
    "origYear": "2022",
    "origId": 171,
    "badge": "FIR 2022 · P171 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de las siguientes enfermedades NO ocurre como consecuencia de la exposición crónica a asbestos?:",
    "options": [
      "Mesotelioma pleural.",
      "Fibrosis.",
      "Cáncer de pulmón.",
      "Enfisema."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Enfisema.\". Pregunta oficial de la convocatoria 2022 (P171). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2022-p175",
    "origYear": "2022",
    "origId": 175,
    "badge": "FIR 2022 · P175 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "En relación con la tautomería, indique cuál de las afirmaciones siguientes es correcta:",
    "options": [
      "Los tautómeros de las cetonas son formas resonantes.",
      "Los tautómeros de las cetonas presentan similar estabilidad.",
      "La tautomería de las cetonas puede ser catalizada por ácidos y bases.",
      "La reactividad de los tautómeros de una cetona es similar."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"La tautomería de las cetonas puede ser catalizada por ácidos y bases.\". Pregunta oficial de la convocatoria 2022 (P175). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2022-p176",
    "origYear": "2022",
    "origId": 176,
    "badge": "FIR 2022 · P176 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de los compuestos siguientes podría dar una reacción de sustitución nucleofílica aromática al ser tratado con NaOH acuoso?:",
    "options": [
      "2,4,6-Trinitroclorobenceno.",
      "2,4,6-Trimetilbromobenceno.",
      "3,5-Dimetoxifluorobenceno.",
      "3-Amino-5-nitroclorobenceno."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"2,4,6-Trinitroclorobenceno.\". Pregunta oficial de la convocatoria 2022 (P176). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2022-p177",
    "origYear": "2022",
    "origId": 177,
    "badge": "FIR 2022 · P177 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "La síntesis de Strecker de a-aminoácidos (tratamiento con NH3 y HCN seguido de hidrólisis) parte de:",
    "options": [
      "Ácidos a-bromocarboxílicos.",
      "Acilaminomalonatos de dietilo.",
      "Alfa-cetoácidos.",
      "Aldehídos."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Aldehídos.\". Pregunta oficial de la convocatoria 2022 (P177). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2022-p180",
    "origYear": "2022",
    "origId": 180,
    "badge": "FIR 2022 · P180 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de las siguientes afirmaciones referentes a la molécula de trifluoruro de boro es correcta?:",
    "options": [
      "La molécula es polar.",
      "La geometría molecular es piramidal trigonal.",
      "Todos los enlaces de esta molécula son polares.",
      "El BF3 es una base de Lewis."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Todos los enlaces de esta molécula son polares.\". Pregunta oficial de la convocatoria 2022 (P180). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2022-p201",
    "origYear": "2022",
    "origId": 201,
    "badge": "FIR 2022 · P201 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de las siguientes modificaciones en la estructura de las tetraciclinas aumenta su estabilidad sin pérdida de actividad biológica?:",
    "options": [
      "Sustitución del grupo amida en posición 2 por un nitrilo.",
      "Eliminación del grupo hidroxilo en la posición 6.",
      "Introducción de grupos alquilo voluminosos en el nitrógeno amídico.",
      "Eliminación de un agrupamiento β-hidroxicarbonilo."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Eliminación del grupo hidroxilo en la posición 6.\". Pregunta oficial de la convocatoria 2022 (P201). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p01",
    "origYear": "2023",
    "origId": 1,
    "badge": "FIR 2023 · P1 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-03",
    "qfdosTopicName": "Tema 03: Sistema Dopaminérgico",
    "block": "Neurolépticos & Vía Dopaminérgica",
    "question": "Teniendo en cuenta la relación estructuraactividad general de los agentes neurolépticos derivados de butirofenona, ¿cuál de las modificaciones propuestas conduciría a compuestos más activos?:",
    "options": [
      "Sustitución del grupo carbonilo B por un tiocarbonilo.",
      "Eliminación del átomo de flúor en el anillo aromático A.",
      "Introducción de un anillo de piperidina, tetrahidropiridina o piperazina sustituidos como fragmento D.",
      "Alargamiento de la cadena C."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Introducción de un anillo de piperidina, tetrahidropiridina o piperazina sustituidos como fragmento D.\". Pregunta oficial de la convocatoria 2023 (P1). Módulo: Neurolépticos & Vía Dopaminérgica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2023_1.jpg"
  },
  {
    "id": "fir-2023-p02",
    "origYear": "2023",
    "origId": 2,
    "badge": "FIR 2023 · P2 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "La siguiente reacción es un proceso de semisíntesis para la obtención de derivados de bases nitrogenadas. ¿Qué producto resultará de la siguiente secuencia de reacciones?:",
    "options": [
      "Adenina.",
      "Guanina.",
      "8-amino-9H-purina.",
      "2-amino-9H-purin-8-ol."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Guanina.\". Pregunta oficial de la convocatoria 2023 (P2). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2023_2.jpg"
  },
  {
    "id": "fir-2023-p03",
    "origYear": "2023",
    "origId": 3,
    "badge": "FIR 2023 · P3 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "¿Qué representa el símbolo 𝝅 (pi) en una ecuación QSAR (Quantitative Structure Activity Relationship) de tipo Hansch-Fujita?:",
    "options": [
      "El coeficiente de partición octanol/agua de la molécula.",
      "Los efectos electrónicos de un sustituyente.",
      "Los efectos estéricos de un sustituyente.",
      "La constante de hidrofobicidad de un sustituyente."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"La constante de hidrofobicidad de un sustituyente.\". Pregunta oficial de la convocatoria 2023 (P3). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p04",
    "origYear": "2023",
    "origId": 4,
    "badge": "FIR 2023 · P4 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "Un compuesto inactivo que necesita ser activado por procesos metabólicos para tener efecto terapéutico, se denomina:",
    "options": [
      "Fármaco huérfano.",
      "Fármaco bioequivalente.",
      "Profármaco.",
      "Antimetabolito."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Profármaco.\". Pregunta oficial de la convocatoria 2023 (P4). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p05",
    "origYear": "2023",
    "origId": 5,
    "badge": "FIR 2023 · P5 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "¿Cuál de los siguientes grupos funcionales se considera bioisóstero del grupo carboxílico?:",
    "options": [
      "Grupo nitrilo.",
      "Tetrazol.",
      "Tiofeno.",
      "Fenol."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Tetrazol.\". Pregunta oficial de la convocatoria 2023 (P5). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p06",
    "origYear": "2023",
    "origId": 6,
    "badge": "FIR 2023 · P6 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-05",
    "qfdosTopicName": "Tema 05: Sistema GABAérgico",
    "block": "Modulación Alostérica del Receptor GABAA",
    "question": "¿Qué efecto tiene en la actividad de las 1,4benzodiazepinas la presencia de un grupo hidroxilo en la posición C-3, frente a su análogo sin hidroxilar?:",
    "options": [
      "Conduce a compuestos que se eliminan más rápidamente.",
      "Conduce a compuestos de vida media más larga.",
      "Conduce a compuestos antagonistas del GABA.",
      "Conduce a compuestos sin actividad ansiolítica."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Conduce a compuestos que se eliminan más rápidamente.\". Pregunta oficial de la convocatoria 2023 (P6). Módulo: Modulación Alostérica del Receptor GABAA.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p07",
    "origYear": "2023",
    "origId": 7,
    "badge": "FIR 2023 · P7 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "La conjugación con aminoácidos es una reacción metabólica de fase II. ¿Sobre cuál de los siguientes grupos puede tener lugar la reacción?:",
    "options": [
      "Ácidos carboxílicos activados como tioésteres.",
      "Aminas primarias aromáticas.",
      "Fenoles.",
      "Hidroxilaminas aromáticas, procedentes de la reducción del correspondiente nitroderivado."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Ácidos carboxílicos activados como tioésteres.\". Pregunta oficial de la convocatoria 2023 (P7). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p08",
    "origYear": "2023",
    "origId": 8,
    "badge": "FIR 2023 · P8 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "La hidrólisis de la amida en la posición 7 de la cefalosporina C permite obtener el ácido 7aminocefalosporánico (7-ACA). Para ello, una vez protegido el grupo ácido carboxílico de la cefalosporina, se trata con pentacloruro de fósforo y después con metanol. ¿En qué grupo sensible a la hidrólisis se ha convertido la amida de la posición 7?:",
    "options": [
      "Enamina.",
      "Cloruro de ácido.",
      "Hemiacetal.",
      "Iminoéter."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Iminoéter.\". Pregunta oficial de la convocatoria 2023 (P8). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2023-p09",
    "origYear": "2023",
    "origId": 9,
    "badge": "FIR 2023 · P9 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "La siguiente estructura corresponde al antitumoral mitomicina C. ¿Cuál es el paso inicial del proceso de activación de la mitomicina C que la convierte en un agente alquilante?:",
    "options": [
      "Apertura del anillo de aziridina.",
      "Hidrólisis del carbamato.",
      "Formación de una enamina por pérdida de metanol.",
      "Reducción del anillo de quinona."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Reducción del anillo de quinona.\". Pregunta oficial de la convocatoria 2023 (P9). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2023_9.jpg",
    "smiles": "COC1=C(C)C(=O)C2=C(C1=O)N3CC4C(C3(C2COC(=O)N)OC)N4"
  },
  {
    "id": "fir-2023-p10",
    "origYear": "2023",
    "origId": 10,
    "badge": "FIR 2023 · P10 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-03",
    "qfdosTopicName": "Tema 03: Sistema Dopaminérgico",
    "block": "Neurolépticos & Vía Dopaminérgica",
    "question": "¿Qué relación tiene el siguiente compuesto con el neuroléptico flufenazina?:",
    "options": [
      "Es un análogo que establece interacciones adicionales con el receptor y prolonga su acción neuroléptica.",
      "Es un profármaco más lipófilo para su uso en tratamientos prolongados.",
      "Es un análogo blando que se metaboliza por hidrólisis de una manera predecible.",
      "Es un análogo de acción corta porque la cadena voluminosa dificulta su unión al receptor."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Es un profármaco más lipófilo para su uso en tratamientos prolongados.\". Pregunta oficial de la convocatoria 2023 (P10). Módulo: Neurolépticos & Vía Dopaminérgica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2023_10.jpg",
    "smiles": "OCCN1CCN(CCCN2c3ccccc3Sc4ccc(cc24)C(F)(F)F)CC1"
  },
  {
    "id": "fir-2023-p11",
    "origYear": "2023",
    "origId": 11,
    "badge": "FIR 2023 · P11 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "¿Qué relación tiene la isoguvacina con el GABA (ácido gamma-aminobutírico)?:",
    "options": [
      "Es un isóstero.",
      "Es un homólogo.",
      "Es un análogo rígido.",
      "Es un vinílogo."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Es un análogo rígido.\". Pregunta oficial de la convocatoria 2023 (P11). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "C1CNCC=C1C(=O)O"
  },
  {
    "id": "fir-2023-p12",
    "origYear": "2023",
    "origId": 12,
    "badge": "FIR 2023 · P12 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-06",
    "qfdosTopicName": "Tema 06: Sistema Opioide & Manejo del Dolor",
    "block": "Analgésicos Opioides & Análogos Rígidos",
    "question": "¿Qué tipo de interacción se establece entre el grupo fenólico de la molécula de morfina y el receptor opioide?:",
    "options": [
      "Enlace iónico.",
      "Enlace de hidrógeno.",
      "Interacción pi-catión.",
      "Interacción dipolo-dipolo."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Enlace de hidrógeno.\". Pregunta oficial de la convocatoria 2023 (P12). Módulo: Analgésicos Opioides & Análogos Rígidos.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CN1CCC23C4C1CC5=C2C(=C(C=C5)O)OC3C(C=C4)O"
  },
  {
    "id": "fir-2023-p13",
    "origYear": "2023",
    "origId": 13,
    "badge": "FIR 2023 · P13 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de las siguientes afirmaciones en relación con el antioxidante natural ácido ascórbico es correcta?:",
    "options": [
      "Es un antioxidante preventivo por su efecto quelante.",
      "Es un antioxidante preventivo como agente que absorbe en el UV.",
      "Es un antioxidante estabilizador de membranas.",
      "Es un antioxidante captador de radicales."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Es un antioxidante captador de radicales.\". Pregunta oficial de la convocatoria 2023 (P13). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p14",
    "origYear": "2023",
    "origId": 14,
    "badge": "FIR 2023 · P14 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "La acción antitumoral de la dacarbazina se debe a la formación de:",
    "options": [
      "Una sal de metildiazonio.",
      "Un catión aziridinio.",
      "Un radical hidroxilo.",
      "Una quinonimina."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Una sal de metildiazonio.\". Pregunta oficial de la convocatoria 2023 (P14). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CN(C)/N=N/c1c[nH]c(=O)n1"
  },
  {
    "id": "fir-2023-p15",
    "origYear": "2023",
    "origId": 15,
    "badge": "FIR 2023 · P15 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de las siguientes afirmaciones sobre el mecanismo de acción de las antraciclinas NO es correcta?:",
    "options": [
      "Son agentes intercalantes del ADN.",
      "Generan radicales hidroxilo.",
      "Son agentes quelantes.",
      "Se unen al sitio A de la subunidad 30S del ribosoma."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Se unen al sitio A de la subunidad 30S del ribosoma.\". Pregunta oficial de la convocatoria 2023 (P15). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p16",
    "origYear": "2023",
    "origId": 16,
    "badge": "FIR 2023 · P16 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-05",
    "qfdosTopicName": "Tema 05: Sistema GABAérgico",
    "block": "Modulación Alostérica del Receptor GABAA",
    "question": "¿Con qué molécula endógena guarda relación estructural el siguiente fármaco?:",
    "options": [
      "Es un agonista del receptor de encefalinas.",
      "Es un agonista del receptor de GABA.",
      "Es un antagonista del receptor de angiotensina II.",
      "Es un antagonista de receptores de ADP."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Es un antagonista del receptor de angiotensina II.\". Pregunta oficial de la convocatoria 2023 (P16). Módulo: Modulación Alostérica del Receptor GABAA.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2023_16.jpg"
  },
  {
    "id": "fir-2023-p17",
    "origYear": "2023",
    "origId": 17,
    "badge": "FIR 2023 · P17 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de las siguientes manipulaciones estructurales incrementa la acción anabólica de las hormonas masculinas?:",
    "options": [
      "Introducción de un hidroxilo en la posición 11β.",
      "Sustitución del carbono 2 por oxígeno.",
      "Aromatización del anillo A.",
      "Introducción de un metilo en la posición 16α."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Sustitución del carbono 2 por oxígeno.\". Pregunta oficial de la convocatoria 2023 (P17). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p18",
    "origYear": "2023",
    "origId": 18,
    "badge": "FIR 2023 · P18 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Cuál de las siguientes estrategias aumentará la solubilidad en agua de una molécula candidata a fármaco?:",
    "options": [
      "La introducción de un grupo hidroxilo.",
      "La sustitución de un grupo hidroxilo por un metilo.",
      "La reducción de un grupo cetona a alcano.",
      "La introducción de un anillo aromático."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"La introducción de un grupo hidroxilo.\". Pregunta oficial de la convocatoria 2023 (P18). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2023-p157",
    "origYear": "2023",
    "origId": 157,
    "badge": "FIR 2023 · P157 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "Un compuesto se disuelve primero en etanol y se registra su espectro de absorción. A continuación, dicho compuesto se disuelve en agua y se registra su espectro. A la vista de la figura, ¿qué efecto se observa en el máximo de absorción del compuesto en agua respecto a etanol?:",
    "options": [
      "Hipercrómico.",
      "Hipocrómico.",
      "Batocrómico.",
      "Hipsocrómico."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Hipsocrómico.\". Pregunta oficial de la convocatoria 2023 (P157). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2023_157.jpg"
  },
  {
    "id": "fir-2023-p161",
    "origYear": "2023",
    "origId": 161,
    "badge": "FIR 2023 · P161 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "Al comparar las estructuras químicas de bifenilo y fluoreno cabe esperar que la emisión de fluorescencia:",
    "options": [
      "Sea mayor en el caso del fluoreno por tratarse de una estructura aromática y rígida.",
      "Sea mayor en el caso del bifenilo debido a la presencia de dos anillos bencénicos.",
      "Sea mayor en el caso del bifenilo debido a que la energía del segundo estado de singulete excitado es mayor que en el fluoreno.",
      "Sea mayor en el caso del fluoreno debido a que la energía del segundo estado de singulete excitado es mayor que en el bifenilo."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Sea mayor en el caso del fluoreno por tratarse de una estructura aromática y rígida.\". Pregunta oficial de la convocatoria 2023 (P161). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2023_161.jpg"
  },
  {
    "id": "fir-2023-p175",
    "origYear": "2023",
    "origId": 175,
    "badge": "FIR 2023 · P175 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de los ácidos de la figura es un compuesto meso?:",
    "options": [
      "III.",
      "II.",
      "I.",
      "IV."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"II.\". Pregunta oficial de la convocatoria 2023 (P175). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2023_175.jpg"
  },
  {
    "id": "fir-2023-p176",
    "origYear": "2023",
    "origId": 176,
    "badge": "FIR 2023 · P176 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de los compuestos carbonílicos siguientes NO puede tener un tautómero?:",
    "options": [
      "Ciclohexanona.",
      "Fenilmetilcetona (acetofenona).",
      "2-Pentanona.",
      "Difenilcetona."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Difenilcetona.\". Pregunta oficial de la convocatoria 2023 (P176). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2023-p177",
    "origYear": "2023",
    "origId": 177,
    "badge": "FIR 2023 · P177 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de los siguientes derivados del ácido benzoico presenta menor valor de pKa?:",
    "options": [
      "Ácido orto-metilbenzoico.",
      "Ácido para-nitrobenzoico.",
      "Ácido meta-metoxibenzoico.",
      "Ácido para-clorobenzoico."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Ácido para-nitrobenzoico.\". Pregunta oficial de la convocatoria 2023 (P177). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2023-p178",
    "origYear": "2023",
    "origId": 178,
    "badge": "FIR 2023 · P178 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "La síntesis de indoles de Fischer es la etapa clave de la preparación de algunos fármacos. ¿Cuál de los siguientes es un compuesto de partida adecuado para esta reacción?:",
    "options": [
      "Un derivado de anilina.",
      "Un derivado de 2-feniletilamina.",
      "Un derivado de pirrol.",
      "Un derivado de fenilhidrazina."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Un derivado de fenilhidrazina.\". Pregunta oficial de la convocatoria 2023 (P178). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2024-p01",
    "origYear": "2024",
    "origId": 1,
    "badge": "FIR 2024 · P1 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-07",
    "qfdosTopicName": "Tema 07: Sistema Histaminérgico & Antiulcerosos",
    "block": "Antihistamínicos & Antisecretores Gástricos",
    "question": "¿En cuál de las posiciones marcadas en la molécula de omeprazol tiene lugar la protonación que inicia el proceso de activación de este profármaco?:",
    "options": [
      "Posición A.",
      "Posición B.",
      "Posición C.",
      "Posición D."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Posición D.\". Pregunta oficial de la convocatoria 2024 (P1). Módulo: Antihistamínicos & Antisecretores Gástricos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_1.jpg",
    "smiles": "COc1ccc2[nH]c(S(=O)Cc3ncc(C)c(OC)c3C)nc2c1"
  },
  {
    "id": "fir-2024-p02",
    "origYear": "2024",
    "origId": 2,
    "badge": "FIR 2024 · P2 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "Los fármacos que se absorben por vía oral tienden a cumplir lo que se conoce como reglas de Lipinski. ¿Cuál de los siguientes requisitos NO se ajusta a dichas reglas?:",
    "options": [
      "Peso molecular inferior a 500.",
      "Logaritmo de P inferior a 5.",
      "Número de grupos donadores de enlaces de H inferior a 5.",
      "Número de grupos aceptores de enlaces de H inferior a 5."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Número de grupos aceptores de enlaces de H inferior a 5.\". Pregunta oficial de la convocatoria 2024 (P2). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2024-p03",
    "origYear": "2024",
    "origId": 3,
    "badge": "FIR 2024 · P3 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "El orlistat se utiliza para combatir la obesidad. Actúa inhibiendo la lipasa pancreática y acila uno de los aminoácidos del centro activo. ¿De qué aminoácido se trata?:",
    "options": [
      "Serina.",
      "Histidina.",
      "Ácido aspártico.",
      "Lisina."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Serina.\". Pregunta oficial de la convocatoria 2024 (P3). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CCCCCCCCCCCC(CC1OC(=O)C1CCCCCC)OC(=O)C(CC(C)C)NC=O"
  },
  {
    "id": "fir-2024-p04",
    "origYear": "2024",
    "origId": 4,
    "badge": "FIR 2024 · P4 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-07",
    "qfdosTopicName": "Tema 07: Sistema Histaminérgico & Antiulcerosos",
    "block": "Antihistamínicos & Antisecretores Gástricos",
    "question": "Ciertos efectos secundarios de la ciclofosfamida derivan de la acroleína que se forma en el proceso de su activación. ¿Cuál de los siguientes fármacos, administrados conjuntamente con la ciclofosfamida, puede disminuir su toxicidad?:",
    "options": [
      "Omeprazol.",
      "N-acetilcisteína.",
      "Hidrocortisona.",
      "Vitamina C."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"N-acetilcisteína.\". Pregunta oficial de la convocatoria 2024 (P4). Módulo: Antihistamínicos & Antisecretores Gástricos.",
    "difficulty": "Avanzado",
    "hasImage": false,
    "smiles": "O=P1(NCCCO1)N(CCCl)CCCl"
  },
  {
    "id": "fir-2024-p05",
    "origYear": "2024",
    "origId": 5,
    "badge": "FIR 2024 · P5 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál es el efecto de la sustitución del grupo bencilo de la bencilpenicilina por un grupo atractor de electrones?:",
    "options": [
      "Espectro antibacteriano ampliado.",
      "Mayor actividad.",
      "Mayor estabilidad frente a beta-lactamasas.",
      "Mayor estabilidad frente a los ácidos."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Mayor estabilidad frente a los ácidos.\". Pregunta oficial de la convocatoria 2024 (P5). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CC1(C)SC2C(NC(=O)Cc3ccccc3)C(=O)N2C1C(=O)O"
  },
  {
    "id": "fir-2024-p06",
    "origYear": "2024",
    "origId": 6,
    "badge": "FIR 2024 · P6 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "El captopril es un inhibidor de la enzima conversora de angiotensina, que se diseñó modificando la estructura de la succinilprolina, por introducción de un metilo en la cadena carbonada, y sustitución del grupo CO2H. ¿Qué grupo X hay en su lugar en el captopril?:",
    "options": [
      "Un grupo hidroxilo.",
      "Un grupo mercapto.",
      "Un grupo acetilo.",
      "Un grupo amino."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Un grupo mercapto.\". Pregunta oficial de la convocatoria 2024 (P6). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_6.jpg",
    "smiles": "CC(CS)C(=O)N1CCCC1C(=O)O"
  },
  {
    "id": "fir-2024-p07",
    "origYear": "2024",
    "origId": 7,
    "badge": "FIR 2024 · P7 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-06",
    "qfdosTopicName": "Tema 06: Sistema Opioide & Manejo del Dolor",
    "block": "Analgésicos Opioides & Análogos Rígidos",
    "question": "¿Qué nombre reciben los análogos de morfina que carecen del puente oxigenado entre las posiciones 4 y 5?:",
    "options": [
      "Benzomorfanos.",
      "Morfinanos.",
      "Fenilpiperidinas.",
      "Oripavinas."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Morfinanos.\". Pregunta oficial de la convocatoria 2024 (P7). Módulo: Analgésicos Opioides & Análogos Rígidos.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CN1CCC23C4C1CC5=C2C(=C(C=C5)O)OC3C(C=C4)O"
  },
  {
    "id": "fir-2024-p08",
    "origYear": "2024",
    "origId": 8,
    "badge": "FIR 2024 · P8 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Cuál de las siguientes modificaciones resulta útil para disminuir el metabolismo por hidroxilación aromática de fármacos que incluyen algún arilo en su estructura?:",
    "options": [
      "Introducir un grupo metoxilo en posición para.",
      "Introducir un halógeno en posición para.",
      "Introducir un grupo metilo en posición para.",
      "El metabolismo de los grupos arilo no se ve afectado por los sustituyentes."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Introducir un halógeno en posición para.\". Pregunta oficial de la convocatoria 2024 (P8). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2024-p09",
    "origYear": "2024",
    "origId": 9,
    "badge": "FIR 2024 · P9 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-04",
    "qfdosTopicName": "Tema 04: Sistema Serotoninérgico",
    "block": "Moduladores Serotoninérgicos & Antidepresivos",
    "question": "¿Cuál de los siguientes fármacos tricíclicos ejerce su acción principalmente por interacción con receptores muscarínicos?:",
    "options": [
      "El compuesto A.",
      "El compuesto B.",
      "El compuesto C.",
      "El compuesto D."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"El compuesto D.\". Pregunta oficial de la convocatoria 2024 (P9). Módulo: Moduladores Serotoninérgicos & Antidepresivos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_9.jpg"
  },
  {
    "id": "fir-2024-p10",
    "origYear": "2024",
    "origId": 10,
    "badge": "FIR 2024 · P10 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál es el papel del fragmento marcado en la estructura del siguiente fármaco?:",
    "options": [
      "Mejorar la interacción del grupo guanidina con la diana.",
      "Disminuir la duración de acción del fármaco.",
      "Aumentar la duración de acción del fármaco.",
      "Disminuir la basicidad del grupo guanidina."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Disminuir la basicidad del grupo guanidina.\". Pregunta oficial de la convocatoria 2024 (P10). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_10.jpg"
  },
  {
    "id": "fir-2024-p11",
    "origYear": "2024",
    "origId": 11,
    "badge": "FIR 2024 · P11 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál es la finalidad de la modificación marcada en el fármaco B, diseñado por manipulación estructural de A?:",
    "options": [
      "Aumentar la lipofilia del fármaco para facilitar su acceso al interior de las células.",
      "Dificultar la formación de un catión alílico capaz de alquilar bases del ADN.",
      "Mejorar el carácter antagonista del fármaco.",
      "Establecer una interacción adicional que refuerza la unión al receptor."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Dificultar la formación de un catión alílico capaz de alquilar bases del ADN.\". Pregunta oficial de la convocatoria 2024 (P11). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_11.jpg"
  },
  {
    "id": "fir-2024-p12",
    "origYear": "2024",
    "origId": 12,
    "badge": "FIR 2024 · P12 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "Las antraciclinas son agentes antitumorales que poseen en su estructura un fragmento de beta-hidroxicarbonilo capaz de formar complejos con Fe3+. ¿Por qué estos complejos refuerzan la acción antitumoral de dichos fármacos?:",
    "options": [
      "Favorecen reacciones de alquilación de bases del ADN.",
      "Favorecen la intercalación entre las bases del ADN.",
      "Promueven la formación de radicales hidroxilo.",
      "Estimulan la despolimerización de los microtúbulos."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Promueven la formación de radicales hidroxilo.\". Pregunta oficial de la convocatoria 2024 (P12). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2024-p13",
    "origYear": "2024",
    "origId": 13,
    "badge": "FIR 2024 · P13 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "El peróxido de hidrógeno puede generar en el organismo especies reactivas de oxígeno a través de la reacción de Fenton. Indique cuál de los siguientes compuestos es capaz de prevenir dicha reacción:",
    "options": [
      "Ácido ascórbico.",
      "Alfa-tocoferol.",
      "Dexrazoxano.",
      "Alfa-caroteno."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Dexrazoxano.\". Pregunta oficial de la convocatoria 2024 (P13). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2024-p14",
    "origYear": "2024",
    "origId": 14,
    "badge": "FIR 2024 · P14 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-09",
    "qfdosTopicName": "Tema 09: AINEs & Coxibs",
    "block": "Inhibidores de COX & Fármacos Antiinflamatorios",
    "question": "Teniendo en cuenta la estructura general de los glucocorticoides, y su relación estructura-actividad, ¿cuál de las modificaciones propuestas conduciría a compuestos con mayor actividad antiinflamatoria?:",
    "options": [
      "Introducción de un átomo de flúor en la posición 9-alfa.",
      "La oxidación del hidroxilo en posición 11.",
      "La acetilación del hidroxilo en posición 21.",
      "La introducción de un doble enlace entre las posiciones 15 y 16."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Introducción de un átomo de flúor en la posición 9-alfa.\". Pregunta oficial de la convocatoria 2024 (P14). Módulo: Inhibidores de COX & Fármacos Antiinflamatorios.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_14.jpg"
  },
  {
    "id": "fir-2024-p15",
    "origYear": "2024",
    "origId": 15,
    "badge": "FIR 2024 · P15 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Cuál de las siguientes reacciones metabólicas de fase II ayuda a eliminar del organismo metabolitos electrófilos?:",
    "options": [
      "Conjugación con glutatión.",
      "Conjugación con sulfato.",
      "Acetilación.",
      "Glucuronidación."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Conjugación con glutatión.\". Pregunta oficial de la convocatoria 2024 (P15). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2024-p16",
    "origYear": "2024",
    "origId": 16,
    "badge": "FIR 2024 · P16 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "El compuesto cuya estructura se representa a continuación es:",
    "options": [
      "Un agente antiviral que actúa incorporándose como falso nucleósido e inhibiendo la ARN-polimerasa.",
      "Un agente antifúngico que actúa como inhibidor de la timidilato sintasa.",
      "Un agente antineoplásico.",
      "Un agente antibacteriano que actúa como inhibidor competitivo reversible de la dihidrofolato reductasa."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Un agente antineoplásico.\". Pregunta oficial de la convocatoria 2024 (P16). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_16.jpg"
  },
  {
    "id": "fir-2024-p17",
    "origYear": "2024",
    "origId": 17,
    "badge": "FIR 2024 · P17 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de los reactivos que se indican son adecuados como materiales de partida para la síntesis del norfloxacino?:",
    "options": [
      "Un derivado de benzofenona y glicinato de etilo.",
      "Un derivado de anilina y un haluro de benzoílo.",
      "Un derivado de anilina y etoximetilenmalonato de dietilo.",
      "Un derivado de anilina y acroleína."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Un derivado de anilina y etoximetilenmalonato de dietilo.\". Pregunta oficial de la convocatoria 2024 (P17). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_17.jpg"
  },
  {
    "id": "fir-2024-p18",
    "origYear": "2024",
    "origId": 18,
    "badge": "FIR 2024 · P18 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de los fragmentos marcados en la estructura de este agente antimalárico permite que se acumule en el interior de la vacuola digestiva de Plasmodium?:",
    "options": [
      "Los fragmentos c y e.",
      "Los fragmentos b y d.",
      "Los fragmentos a y b.",
      "Los fragmentos a y d."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Los fragmentos b y d.\". Pregunta oficial de la convocatoria 2024 (P18). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_18.jpg"
  },
  {
    "id": "fir-2024-p127",
    "origYear": "2024",
    "origId": 127,
    "badge": "FIR 2024 · P127 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Qué molécula de 20 átomos de carbono representa la siguiente estructura?:",
    "options": [
      "Una prostaglandina.",
      "Una prostaciclina.",
      "Una lipoxina.",
      "Un leucotrieno."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Un leucotrieno.\". Pregunta oficial de la convocatoria 2024 (P127). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_127.jpg"
  },
  {
    "id": "fir-2024-p175",
    "origYear": "2024",
    "origId": 175,
    "badge": "FIR 2024 · P175 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál es el producto mayoritario que se obtiene al calentar la 2,5-hexanodiona en presencia de hidróxido de sodio en metanol?:",
    "options": [
      "El compuesto I.",
      "El compuesto II.",
      "El compuesto III.",
      "El compuesto IV."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"El compuesto III.\". Pregunta oficial de la convocatoria 2024 (P175). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_175.jpg"
  },
  {
    "id": "fir-2024-p176",
    "origYear": "2024",
    "origId": 176,
    "badge": "FIR 2024 · P176 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál o cuáles de los siguientes compuestos presentan quiralidad?:",
    "options": [
      "A.",
      "A y E.",
      "B, C y E.",
      "A, C y E."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"A.\". Pregunta oficial de la convocatoria 2024 (P176). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_176.jpg"
  },
  {
    "id": "fir-2024-p178",
    "origYear": "2024",
    "origId": 178,
    "badge": "FIR 2024 · P178 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "El proceso que se representa es:",
    "options": [
      "Una reacción de Diels-Alder.",
      "Una anelación de Robinson.",
      "Una condensación de Claisen.",
      "Una ciclación de Dieckmann."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Una anelación de Robinson.\". Pregunta oficial de la convocatoria 2024 (P178). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2024_178.jpg"
  },
  {
    "id": "fir-2024-p205",
    "origYear": "2024",
    "origId": 205,
    "badge": "FIR 2024 · P205 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "El dietilestilbestrol es un estrógeno no esteroídico útil en el tratamiento de trastornos menopáusicos y postmenopáusicos. El trans-dietilestilbestrol es 14 veces más activo que el cis-dietilestilbestrol. Estos compuestos son:",
    "options": [
      "Enantiómeros.",
      "Diastereómeros.",
      "Epímeros.",
      "Fármacos me-too."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Diastereómeros.\". Pregunta oficial de la convocatoria 2024 (P205). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": false,
    "smiles": "CC/C(=C(/CC)c1ccc(O)cc1)c2ccc(O)cc2"
  },
  {
    "id": "fir-2024-p209",
    "origYear": "2024",
    "origId": 209,
    "badge": "FIR 2024 · P209 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Cuál de las siguientes estrategias disminuirá la solubilidad en agua de un candidato a fármaco?:",
    "options": [
      "La introducción de un grupo hidroxilo.",
      "La sustitución de un grupo hidroxilo por un metilo.",
      "La reducción de un grupo cetona a alcohol.",
      "La oxidación de un grupo aldehído a ácido."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"La sustitución de un grupo hidroxilo por un metilo.\". Pregunta oficial de la convocatoria 2024 (P209). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2025-p01",
    "origYear": "2025",
    "origId": 1,
    "badge": "FIR 2025 · P1 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "¿Con qué reactivo se tiene que tratar A para obtener hidroclorotiazida?:",
    "options": [
      "Ácido fórmico.",
      "Formaldehído.",
      "Diclorometano.",
      "Fosgeno."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Formaldehído.\". Pregunta oficial de la convocatoria 2025 (P1). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_1.jpg",
    "smiles": "NS(=O)(=O)c1cc2c(cc1Cl)NCNS2(=O)=O"
  },
  {
    "id": "fir-2025-p02",
    "origYear": "2025",
    "origId": 2,
    "badge": "FIR 2025 · P2 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "¿Cómo pueden sintetizarse las sulfonamidas antibacterianas indicadas a continuación?:",
    "options": [
      "Mediante clorosulfonación de la anilina seguida de aminólisis.",
      "Mediante nitración de la bencenosulfonamida seguida de reducción.",
      "Mediante clorosulfonación de la acetanilida seguida de aminólisis y posterior hidrólisis.",
      "Mediante clorosulfonación del nitrobenceno seguida de aminólisis y reducción."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Mediante clorosulfonación de la acetanilida seguida de aminólisis y posterior hidrólisis.\". Pregunta oficial de la convocatoria 2025 (P2). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_2.jpg"
  },
  {
    "id": "fir-2025-p03",
    "origYear": "2025",
    "origId": 3,
    "badge": "FIR 2025 · P3 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "¿Qué afirmación relativa al compuesto cuya estructura se representa a continuación es cierta?:",
    "options": [
      "Es un profármaco del cloruro de cetilpiridinio.",
      "Es un análogo blando del cloruro de cetilpiridinio.",
      "Es un homólogo estructural del cloruro de cetilpiridinio.",
      "Es un bioisóstero del cloruro de cetilpiridinio."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Es un análogo blando del cloruro de cetilpiridinio.\". Pregunta oficial de la convocatoria 2025 (P3). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_3.jpg"
  },
  {
    "id": "fir-2025-p04",
    "origYear": "2025",
    "origId": 4,
    "badge": "FIR 2025 · P4 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-03",
    "qfdosTopicName": "Tema 03: Sistema Dopaminérgico",
    "block": "Neurolépticos & Vía Dopaminérgica",
    "question": "¿Qué afirmación referida al fármaco A es correcta?:",
    "options": [
      "No puede atravesar la barrera hematoencefálica.",
      "Posee actividad analgésica.",
      "Es un antihistamínico H1.",
      "Es un antagonista de los receptores D1 dopaminérgicos."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Posee actividad analgésica.\". Pregunta oficial de la convocatoria 2025 (P4). Módulo: Neurolépticos & Vía Dopaminérgica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_4.jpg"
  },
  {
    "id": "fir-2025-p05",
    "origYear": "2025",
    "origId": 5,
    "badge": "FIR 2025 · P5 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "¿A través de qué reacción metabólica se activa el enalaprilo?:",
    "options": [
      "Oxidación aromática.",
      "Oxidación bencílica.",
      "Hidrólisis de la amida.",
      "Hidrólisis del éster."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Hidrólisis del éster.\". Pregunta oficial de la convocatoria 2025 (P5). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_5.jpg",
    "smiles": "CCOC(=O)C(CCc1ccccc1)NC(C)C(=O)N2CCCC2C(=O)O"
  },
  {
    "id": "fir-2025-p06",
    "origYear": "2025",
    "origId": 6,
    "badge": "FIR 2025 · P6 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-03",
    "qfdosTopicName": "Tema 03: Sistema Dopaminérgico",
    "block": "Neurolépticos & Vía Dopaminérgica",
    "question": "¿Qué tipo de fármaco es la carbidopa?:",
    "options": [
      "Un antiinflamatorio.",
      "Un agonista directo dopaminérgico.",
      "Un precursor de la dopamina.",
      "Un inhibidor de la biosíntesis periférica de dopamina."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Un inhibidor de la biosíntesis periférica de dopamina.\". Pregunta oficial de la convocatoria 2025 (P6). Módulo: Neurolépticos & Vía Dopaminérgica.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_6.jpg",
    "smiles": "CC(Cc1ccc(O)c(O)c1)(C(=O)O)NN"
  },
  {
    "id": "fir-2025-p07",
    "origYear": "2025",
    "origId": 7,
    "badge": "FIR 2025 · P7 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-00",
    "qfdosTopicName": "Tema 00: Introducción & Afinidad Estructural",
    "block": "Afinidad, SAR & Bioisosterismo",
    "question": "¿Por qué los inhibidores nucleosídicos de la transcriptasa inversa, como la zidovudina, deben fosforilarse intracelularmente?:",
    "options": [
      "Para aumentar su liposolubilidad y facilitar el paso a través de membranas celulares.",
      "Para aumentar la afinidad por la ADN polimerasa viral.",
      "Para convertirse en sus formas trifosfato activas que compiten con los nucleótidos naturales.",
      "Para ser degradados y eliminados más rápidamente, reduciendo la toxicidad."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Para convertirse en sus formas trifosfato activas que compiten con los nucleótidos naturales.\". Pregunta oficial de la convocatoria 2025 (P7). Módulo: Afinidad, SAR & Bioisosterismo.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CC1=CN(C(=O)NC1=O)[C@H]2C[C@@H](N=[N+]=[N-])[C@H](CO)O2"
  },
  {
    "id": "fir-2025-p08",
    "origYear": "2025",
    "origId": 8,
    "badge": "FIR 2025 · P8 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál es el mecanismo de acción de los inhibidores de las histonas desacetilasas (HDACs) utilizados como agentes antineoplásicos?:",
    "options": [
      "Inhiben la metilación de las histonas, promoviendo la compactación del ADN.",
      "Impiden la eliminación de los grupos acetilo de las histonas, favoreciendo la transcripción génica.",
      "Desfosforilan residuos de serina en histonas, reduciendo la expresión génica.",
      "Inhiben la acetilación de histonas, bloqueando ADN. la replicación del"
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Impiden la eliminación de los grupos acetilo de las histonas, favoreciendo la transcripción génica.\". Pregunta oficial de la convocatoria 2025 (P8). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2025-p09",
    "origYear": "2025",
    "origId": 9,
    "badge": "FIR 2025 · P9 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-02",
    "qfdosTopicName": "Tema 02: Sistema Adrenérgico",
    "block": "Agonistas & Antagonistas Adrenérgicos",
    "question": "¿Qué función tiene la catecol-O- metiltransferasa (COMT) en el metabolismo de fármacos?:",
    "options": [
      "Oxida un grupo metilo presente en derivados catecólicos.",
      "Metila un grupo hidroxilo presente en derivados catecólicos.",
      "Desamina fármacos derivados de catecolaminas.",
      "Hidroxila el anillo aromático de derivados catecólicos."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Metila un grupo hidroxilo presente en derivados catecólicos.\". Pregunta oficial de la convocatoria 2025 (P9). Módulo: Agonistas & Antagonistas Adrenérgicos.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2025-p10",
    "origYear": "2025",
    "origId": 10,
    "badge": "FIR 2025 · P10 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-08",
    "qfdosTopicName": "Tema 08: Sistema Renina-Angiotensina & Diuréticos",
    "block": "Inhibidores ECA, ARA-II & Diuréticos Tiazídicos",
    "question": "¿Cuál es el grupo funcional clave responsable Zn2+ de la unión al ion en los inhibidores de la enzima convertidora de angiotensina (ECA) como el captopril?:",
    "options": [
      "Grupo carboxilato.",
      "Grupo tiol.",
      "Grupo amida.",
      "Grupo éster."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Grupo tiol.\". Pregunta oficial de la convocatoria 2025 (P10). Módulo: Inhibidores ECA, ARA-II & Diuréticos Tiazídicos.",
    "difficulty": "Medio",
    "hasImage": false,
    "smiles": "CC(CS)C(=O)N1CCCC1C(=O)O"
  },
  {
    "id": "fir-2025-p11",
    "origYear": "2025",
    "origId": 11,
    "badge": "FIR 2025 · P11 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Qué evento ocurre tras la activación de un receptor acoplado a proteína G (GPCR)?:",
    "options": [
      "La subunidad α intercambia GDP por GTP y se disocia del complejo βγ, iniciando la señalización.",
      "La proteína G se fosforila directamente sin activar ninguna vía.",
      "El receptor se internaliza sin activar ninguna vía.",
      "Se une ATP al receptor, lo que produce la apertura de un canal iónico."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"La subunidad α intercambia GDP por GTP y se disocia del complejo βγ, iniciando la señalización.\". Pregunta oficial de la convocatoria 2025 (P11). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2025-p12",
    "origYear": "2025",
    "origId": 12,
    "badge": "FIR 2025 · P12 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Cuál es la función principal del glutatión (GSH) en el metabolismo de xenobióticos?:",
    "options": [
      "Oxidar compuestos lipofílicos para aumentar su solubilidad en agua.",
      "Servir como cofactor redox para las monooxigenasas del citocromo P450.",
      "Conjugar compuestos electrófilos mediante su grupo sulfhidrilo, favoreciendo su detoxificación y excreción como ácidos mercaptúricos.",
      "Reducir intermediarios radicalarios generados durante la β-oxidación de ácidos grasos."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Conjugar compuestos electrófilos mediante su grupo sulfhidrilo, favoreciendo su detoxificación y excreción como ácidos mercaptúricos.\". Pregunta oficial de la convocatoria 2025 (P12). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2025-p13",
    "origYear": "2025",
    "origId": 13,
    "badge": "FIR 2025 · P13 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Cuál de las siguientes reacciones metabólicas es de Fase II?:",
    "options": [
      "Metilación.",
      "N-hidroxilación.",
      "Reducción de nitrocompuestos.",
      "Hidrólisis de ésteres."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Metilación.\". Pregunta oficial de la convocatoria 2025 (P13). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2025-p14",
    "origYear": "2025",
    "origId": 14,
    "badge": "FIR 2025 · P14 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿A través de qué reacción metabólica se bioactiva el fármaco sulfasalacina?:",
    "options": [
      "Oxidación.",
      "Reducción.",
      "Hidrólisis.",
      "Conjugación."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Reducción.\". Pregunta oficial de la convocatoria 2025 (P14). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_14.jpg",
    "smiles": "O=C(O)c1cc(/N=N/c2ccc(cc2)S(=O)(=O)Nc3ccccn3)ccc1O"
  },
  {
    "id": "fir-2025-p15",
    "origYear": "2025",
    "origId": 15,
    "badge": "FIR 2025 · P15 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-02",
    "qfdosTopicName": "Tema 02: Sistema Adrenérgico",
    "block": "Agonistas & Antagonistas Adrenérgicos",
    "question": "¿Qué fragmento estructural de la L-dopa permite que se absorba por transporte activo?:",
    "options": [
      "El grupo catecol.",
      "El anillo bencénico.",
      "El fragmento de α-aminoácido tirosina.",
      "El grupo feniletilamina."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"El fragmento de α-aminoácido tirosina.\". Pregunta oficial de la convocatoria 2025 (P15). Módulo: Agonistas & Antagonistas Adrenérgicos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_15.jpg",
    "smiles": "N[C@@H](Cc1ccc(O)c(O)c1)C(=O)O"
  },
  {
    "id": "fir-2025-p16",
    "origYear": "2025",
    "origId": 16,
    "badge": "FIR 2025 · P16 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-02",
    "qfdosTopicName": "Tema 02: Sistema Adrenérgico",
    "block": "Agonistas & Antagonistas Adrenérgicos",
    "question": "¿A través de qué diana biológica ejerce la tetracaína su acción anestésica local?:",
    "options": [
      "Receptores β-adrenérgicos.",
      "Dihidropteroato sintasa.",
      "Lípidos de membrana.",
      "Canales de sodio dependientes de potencial."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Canales de sodio dependientes de potencial.\". Pregunta oficial de la convocatoria 2025 (P16). Módulo: Agonistas & Antagonistas Adrenérgicos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_16.jpg",
    "smiles": "CCCCNc1ccc(cc1)C(=O)OCCN(C)C"
  },
  {
    "id": "fir-2025-p17",
    "origYear": "2025",
    "origId": 17,
    "badge": "FIR 2025 · P17 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-10",
    "qfdosTopicName": "Tema 10: Transporte de Membrana & Perfil ADMET",
    "block": "Diseño de Profármacos, Metabolismo & Reglas Ro5",
    "question": "¿Qué aporta el grupo marcado en la estructura del siguiente fármaco?:",
    "options": [
      "Aumenta la relación antagonista β1/β2.",
      "Aumenta la relación agonista β2/β1.",
      "Impide el metabolismo por MAO.",
      "Facilita el metabolismo por COMT."
    ],
    "correctIndex": 1,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 2): \"Aumenta la relación agonista β2/β1.\". Pregunta oficial de la convocatoria 2025 (P17). Módulo: Diseño de Profármacos, Metabolismo & Reglas Ro5.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_17.jpg"
  },
  {
    "id": "fir-2025-p18",
    "origYear": "2025",
    "origId": 18,
    "badge": "FIR 2025 · P18 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "quimica-farmaceutica-general",
    "qfdosTopicName": "Química Farmacéutica General FIR",
    "block": "Quimioterapia & Farmacología Molecular",
    "question": "¿Cuál de los siguientes fármacos es un inhibidor enzimático análogo del estado de transición?:",
    "options": [
      "Donepezilo.",
      "Metotrexato.",
      "Ketoprofeno.",
      "Atorvastatina."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"Atorvastatina.\". Pregunta oficial de la convocatoria 2025 (P18). Módulo: Quimioterapia & Farmacología Molecular.",
    "difficulty": "Medio",
    "hasImage": false
  },
  {
    "id": "fir-2025-p171",
    "origYear": "2025",
    "origId": 171,
    "badge": "FIR 2025 · P171 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "tema-07",
    "qfdosTopicName": "Tema 07: Sistema Histaminérgico & Antiulcerosos",
    "block": "Antihistamínicos & Antisecretores Gástricos",
    "question": "¿Cuál de las siguientes bases es la adecuada para que el equilibrio de la reacción ácido-base representada se desplace completamente hacia la derecha?:",
    "options": [
      "NaOH.",
      "H2O.",
      "EtONa.",
      "NaNH2."
    ],
    "correctIndex": 3,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 4): \"NaNH2.\". Pregunta oficial de la convocatoria 2025 (P171). Módulo: Antihistamínicos & Antisecretores Gástricos.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_171.jpg"
  },
  {
    "id": "fir-2025-p172",
    "origYear": "2025",
    "origId": 172,
    "badge": "FIR 2025 · P172 · Química Orgánica",
    "category": "Química Orgánica",
    "qfdosTopicId": "quimica-organica",
    "qfdosTopicName": "Química Orgánica FIR",
    "block": "Reactividad, Mecanismos & Estereoquímica",
    "question": "¿Cuál de las siguientes afirmaciones es cierta en relación al efecto de un sustituyente activante en las reacciones de sustitución electrófila aromática?:",
    "options": [
      "Dirige en orto y para.",
      "Dirige en meta.",
      "Dirige en orto y para si es un sustituyente activante débil y en meta si es un activante fuerte.",
      "Disminuye la reactividad del anillo."
    ],
    "correctIndex": 0,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 1): \"Dirige en orto y para.\". Pregunta oficial de la convocatoria 2025 (P172). Módulo: Reactividad, Mecanismos & Estereoquímica.",
    "difficulty": "Avanzado",
    "hasImage": false
  },
  {
    "id": "fir-2025-p201",
    "origYear": "2025",
    "origId": 201,
    "badge": "FIR 2025 · P201 · Química Farmacéutica",
    "category": "Química Farmacéutica",
    "qfdosTopicId": "tema-05",
    "qfdosTopicName": "Tema 05: Sistema GABAérgico",
    "block": "Modulación Alostérica del Receptor GABAA",
    "question": "La introducción de un grupo ácido carboxílico en la posición C-3 de las 1,4-benzodiazepinas conduce a derivados:",
    "options": [
      "Con mayor actividad ansiolítica.",
      "Inactivos.",
      "Hidrosolubles.",
      "Con más efectos secundarios."
    ],
    "correctIndex": 2,
    "explanation": "Respuesta oficial del Ministerio de Sanidad (Opción 3): \"Hidrosolubles.\". Pregunta oficial de la convocatoria 2025 (P201). Módulo: Modulación Alostérica del Receptor GABAA.",
    "difficulty": "Avanzado",
    "hasImage": true,
    "imagePath": "fir-images/FIR2025_201.jpg"
  }
];

export function getAllFirQuestions(): FirQuestion[] {
  return FIR_QUESTIONS;
}

export function getFirQuestionsByTopic(topicId: string): FirQuestion[] {
  return FIR_QUESTIONS.filter(q => q.qfdosTopicId === topicId);
}

export function getFirQuestionsByYear(year: string): FirQuestion[] {
  return FIR_QUESTIONS.filter(q => q.origYear === year);
}

export function searchFirQuestions(query: string): FirQuestion[] {
  if (!query?.trim()) return FIR_QUESTIONS;
  const qLower = query.toLowerCase().trim();
  return FIR_QUESTIONS.filter(q => 
    q.question.toLowerCase().includes(qLower) ||
    q.options.some(o => o.toLowerCase().includes(qLower)) ||
    q.badge.toLowerCase().includes(qLower) ||
    q.block.toLowerCase().includes(qLower) ||
    q.origYear.includes(qLower)
  );
}

/**
 * Convierte una pregunta oficial FIR en formato estándar TestQuestion de QFDOS
 */
export function convertFirToTestQuestion(fir: FirQuestion): TestQuestion {
  return {
    id: fir.id,
    topicId: fir.qfdosTopicId,
    block: fir.block,
    question: fir.question,
    questionSmiles: fir.smiles,
    options: fir.options,
    correctIndex: fir.correctIndex,
    explanation: fir.explanation,
    difficulty: fir.difficulty
  };
}

/**
 * Genera un conjunto de preguntas tipo test seleccionadas de los exámenes FIR
 */
export function generateFirExamSlice(count: number = 5, topicId?: string, year?: string): TestQuestion[] {
  let pool = FIR_QUESTIONS;
  if (topicId) pool = pool.filter(q => q.qfdosTopicId === topicId);
  if (year) pool = pool.filter(q => q.origYear === year);
  
  if (pool.length === 0) pool = FIR_QUESTIONS;

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(convertFirToTestQuestion);
}
