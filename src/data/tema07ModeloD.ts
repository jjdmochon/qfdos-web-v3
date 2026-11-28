// Modelo D, tema 7. Datos estáticos en el formato de los Modelos 1-3.
import type { TestQuestion } from './qfdosData';

export const TEMA7_MODELO_4_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: "t07-mD-q01",
    topicId: "tema-07",
    block: "SAR",
    badge: "Modelo D · P1 · SAR",
    question: "Al analizar mediante espectrometría y nomenclatura dos derivados metilados del anillo de imidazol, una muestra de 4(5)-metilimidazol se comporta como mezcla de dos especies interconvertibles en equilibrio mientras el 1-metilimidazol corresponde a un compuesto único. ¿Qué diferencia química explica ambos casos?",
    options: [
      {
        text: "En el 4(5)-metilimidazol el grupo metilo se desplaza y en el 1-metilimidazol permanece fijo en un nitrógeno",
      },
      {
        text: "Ambos presentan dos tautómeros en equilibrio y su diferencia reside únicamente en las formas de resonancia pi",
      },
      {
        text: "En el 4(5)-metilimidazol migran electrones sin átomos y en el 1-metilimidazol alternan dos formas protónicas",
      },
      {
        text: "En el 4(5)-metilimidazol migra el H entre nitrógenos y en el 1-metilimidazol no queda protón migratorio",
      },
    ],
    correctIndex: 3,
    explanation: "En la tele-tautomería del imidazol, mientras un nitrógeno lleve hidrógeno (N-H), el protón puede migrar de un nitrógeno al otro originando dos moléculas distintas en equilibrio (por la doble numeración desde N1 se nombra 4(5)-metilimidazol). En el 1-metilimidazol, al sustituir el protón de N1 por un metilo, no puede migrar ningún hidrógeno y existe como una única especie química definida.\n\nDescartamos la A porque el sustituyente que migra en la tautomería del imidazol es el átomo de hidrógeno (H), nunca el grupo metilo de C4/C5, la B porque el 1-metilimidazol carece de equilibrio tautomérico y confunde tautomería (movimiento de un átomo) con resonancia (movimiento solo de electrones) y la C porque invierte por completo tautomería y resonancia entre ambos compuestos.",
    difficulty: "Fácil",
  },
  {
    id: "t07-mD-q02",
    topicId: "tema-07",
    block: "Síntesis",
    badge: "Modelo D · P2 · Síntesis",
    question: "En una secuencia sintética de antihistamínicos H1 de primera generación, se parte de piridina tratada con amiduro sódico en amoniaco líquido anhidro; el producto se condensa con benzaldehído y se reduce con cianoborohidruro sódico antes de reaccionar con 2-cloroetildimetilamina. ¿Qué fármaco se obtiene al final de la ruta?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-07/tema07_mD_p02_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-07/tema07_mD_p02_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-07/tema07_mD_p02_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-07/tema07_mD_p02_op_d.png",
      },
    ],
    correctIndex: 0,
    explanation: "La reacción de Chichibabin (piridina + NaNH2 en condiciones anhidras) rinde 2-aminopiridina. Su condensación con benzaldehído seguida de reducción con NaBH3CN y alquilación con 2-cloroetildimetilamina proporciona la tripelenamina (A), con un anillo 2-piridilo y un grupo bencilo.\n\nDescartamos la B porque es la mepiramina: contiene el sustituyente p-metoxibencilo, que procedería de condensar con p-metoxibenzaldehído, la C porque es el metapirileno: lleva un grupo 2-tienilmetilo procedente de condensar con tiofeno-2-carbaldehído y la D porque es la fenbenzamina: posee el grupo bencilo procedente del benzaldehído, pero lleva un anillo fenilo en lugar de la 2-piridina formada por Chichibabin.",
    difficulty: "Avanzado",
  },
  {
    id: "t07-mD-q03",
    topicId: "tema-07",
    block: "Síntesis",
    badge: "Modelo D · P3 · Síntesis",
    question: "La figura muestra la fenotiazina y dos agentes alquilantes isómeros: 2-cloro-N,N-dimetilpropan-1-amina y 1-cloro-N,N-dimetilpropan-2-amina. En dos ensayos separados se genera el anión de la fenotiazina con NaNH₂ y se añade, en uno, el primer agente y, en el otro, el segundo. ¿Qué cabe esperar?",
    imagePath: "estructuras/tema-07/tema07_mD_p03_enun.png",
    options: [
      {
        text: "Ambos dan el mismo producto, prometazina, N-CH₂-CH(CH₃)-NMe₂: los dos cloruros ciclan por desplazamiento intramolecular a la misma sal de aziridinio y el anión la abre por el carbono menos sustituido.",
      },
      {
        text: "Dan dos productos distintos: cada cloruro sufre SN2 directo, de modo que el 1-cloro da prometazina y el 2-cloro el isómero N-CH(CH₃)-CH₂-NMe₂.",
      },
      {
        text: "Ambos dan el mismo producto, pero el isómero ramificado N-CH(CH₃)-CH₂-NMe₂, porque la sal de aziridinio se abre por el carbono más sustituido.",
      },
      {
        text: "Solo reacciona el 2-cloro, que es secundario; el 1-cloro, con la amina terciaria vecina, no forma intermedio cíclico y no alquila al anión.",
      },
    ],
    correctIndex: 0,
    explanation: "Dos pasos según el temario: (1) el N-H de la fenotiazina es poco básico y algo ácido, por eso NaNH₂ genera el anión nucleófilo; (2) en ambos isómeros el N de la amina terciaria desplaza al cloro de forma intramolecular y los dos convergen en la misma sal de aziridinio, el verdadero agente alquilante; el anión la abre por el carbono menos sustituido (CH₂) y se obtiene prometazina, N-CH₂-CH(CH₃)-NMe₂, en los dos ensayos. Lo que decide la respuesta no es dónde está el cloro en cada isómero sino el intermedio común.\n\nDescartamos la B porque supone SN2 directo sobre cada C-Cl; contradice que el verdadero agente alquilante es el aziridinio y que los isómeros convergen, la C porque acierta el intermedio común pero invierte la regioquímica: el temario dice que la apertura ocurre por el carbono menos sustituido y la D porque niega que el 1-cloro forme el aziridinio; el temario dice que converge en la misma sal.",
    difficulty: "Avanzado",
  },
  {
    id: "t07-mD-q04",
    topicId: "tema-07",
    block: "Síntesis",
    badge: "Modelo D · P4 · Síntesis",
    question: "En el tramo final de la síntesis que lleva desde el triciclo N-metilado hasta la desloratadina (metabolito activo de la loratadina), si se omitiera el tratamiento con cloroformiato de etilo (ClCO₂Et) y se calentara directamente el precursor N-metilado con KOH a reflujo, ¿qué ocurriría con el grupo N-metilo y qué producto se obtendría?",
    imagePath: "estructuras/tema-07/tema07_mD_p04_enun.png",
    options: [
      {
        text: "KOH desplaza directo el N-metilo por SN2 y forma desloratadina sin pasar por carbamato",
      },
      {
        text: "Sin formar el carbamato el N-metilo resiste a KOH y no da loratadina ni desloratadina",
      },
      {
        text: "KOH hidroliza el doble enlace exocíclico abriendo el anillo central de siete eslabones",
      },
      {
        text: "Sin formar el carbamato KOH oxida el N-metilo a imina y rinde loratadina tras acidificar",
      },
    ],
    correctIndex: 1,
    explanation: "Se resuelve en tres pasos según el temario: (1) la N-desmetilación requiere previamente acilar la amina terciaria con ClCO₂Et formando el carbamato (loratadina, expulsando CH₃Cl); (2) posteriormente, KOH a reflujo hidroliza dicho grupo carbamato liberando la amina secundaria (desloratadina); y (3) al omitir ClCO₂Et y calentar directamente una amina terciaria N-CH₃ con KOH, el enlace C–N alquílico no es hidrolizable por álcali (a diferencia de un carbamato), por lo que no se forma ni loratadina ni desloratadina.\n\nDescartamos la A porque supone erróneamente que OH⁻ puede desplazar una amina secundaria por SN2 directa sobre el N-metilo, cuando en medio básico una amina no es grupo saliente sin activación previa como carbamato, la C porque un alqueno exocíclico no conjugado ni protonable no sufre hidrólisis básica con apertura del anillo tricíclico de siete miembros y la D porque KOH acuoso/alcohólico es una base no oxidante y tampoco aporta el grupo etoxicarbonilo del carbamato presente en la loratadina.",
    difficulty: "Avanzado",
  },
  {
    id: "t07-mD-q05",
    topicId: "tema-07",
    block: "SAR",
    badge: "Modelo D · P5 · SAR",
    question: "En el programa racional que condujo desde la Nα-guanilhistamina hasta la metiamida, el alargamiento de la cadena hidrocarbonada previo disminuyó la fracción del tautómero activo en H2; antes de incorporar un metilo en el anillo, se corrigió ese desplazamiento sustituyendo un metileno por otro fragmento divalente más electronegativo que devuelve el carácter electrón-atrayente a la cadena. ¿Cuál de las siguientes estructuras corresponde a dicho compuesto intermedio?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-07/tema07_mD_p05_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-07/tema07_mD_p05_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-07/tema07_mD_p05_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-07/tema07_mD_p05_op_d.png",
      },
    ],
    correctIndex: 3,
    explanation: "Descartada la guanidina protonada inicial (A) y el alargamiento hidrocarbonado previo SK&F 91581 → burimamida (b → c), sustituir un -CH2- por su isóstero electronegativo de radio y ángulos similares (-S-) antes de metilar C5 selecciona la tiaburimamida (D).\n\nDescartamos la A porque es la Nα-guanilhistamina, punto de partida con grupo guanidino cargado y cadena corta de dos carbonos, la B porque es SK&F 91581 (norburimamida), con cadena puramente hidrocarbonada de tres metilenos sin azufre tioéter y la C porque es la burimamida, primer antagonista puro con cuatro metilenos cuya cadena saturada desplazaba el equilibrio fuera de Nτ-H.",
    difficulty: "Medio",
  },
  {
    id: "t07-mD-q06",
    topicId: "tema-07",
    block: "Síntesis",
    badge: "Modelo D · P6 · Síntesis",
    question: "Al intentar preparar el precursor aminado de la tripelenamina tratando piridina con amiduro sódico (NaNH₂) en un medio acuoso en lugar de amoniaco líquido anhidro, ¿qué transformación ácido-base ocurre primero con el agua y qué consecuencia tiene sobre la obtención de la 2-aminopiridina?",
    imagePath: "estructuras/tema-07/tema07_mD_p06_enun.png",
    options: [
      {
        text: "El agua destruye NaNH₂ a NH₃ y NaOH impidiendo el aducto en C2 y la 2-aminopiridina",
      },
      {
        text: "El agua destruye NaNH₂ a NH₃ y NaOH pero el OH⁻ ataca C2 dando 2-aminopiridina igual",
      },
      {
        text: "El agua protona la piridina activando C3 y redirige el ataque de NaNH₂ a 3-aminopiridina",
      },
      {
        text: "El agua facilita la salida del hidruro como H₂ y acelera el paso hacia 2-aminopiridina",
      },
    ],
    correctIndex: 0,
    explanation: "Se resuelve en tres pasos según el temario: (1) el NaNH₂ reacciona violentamente con cualquier traza de agua mediante protonación rápida formando NH₃ y NaOH; (2) al consumirse el amiduro (NH₂⁻), desaparece el nucleófilo fuerte imprescindible para atacar C2 del anillo π-deficiente y formar el complejo aniónico de Meisenheimer; y (3) no ocurre la posterior aromatización con pérdida de H₂, fracasando la obtención de 2-aminopiridina (razón de exigir condiciones anhidras y atmósfera inerte).\n\nDescartamos la B porque reconoce la destrucción del NaNH₂ por agua, pero supone erróneamente que el OH⁻ restante genera 2-aminopiridina en C2 (sin aportar el grupo nitrogenado necesario ni vencer la barrera nucleófila en medio acuoso), la C porque el agua neutra no convierte a la piridina en piridinio estable reactivo en C3 frente a un amiduro destruido en el propio medio y la D porque invierte el efecto del agua: el agua destruye el reactivo NaNH₂ antes de formarse el complejo de Meisenheimer y nunca acelera la sustitución nucleófila aromática.",
    difficulty: "Medio",
  },
  {
    id: "t07-mD-q07",
    topicId: "tema-07",
    block: "Bio/Metab",
    badge: "Modelo D · P7 · Bio/Metab",
    question: "En los antihistamínicos H1 de segunda generación como cetirizina, fexofenadina y bilastina, la sedación central resulta mucho menor que con la difenhidramina pese a mantener eficacia antialérgica periférica. ¿Qué combinación de propiedades fisicoquímicas y biológicas justifica simultáneamente ese comportamiento?",
    options: [
      {
        text: "Portan un sulfonato junto al imidazol a pH 7,4 y evitan la unión a proteínas plasmáticas frente a los carbamatos",
      },
      {
        text: "Son éteres neutros sin grupos ácidos ionizables y bloquean la histidina descarboxilasa periférica sin cruzar BHE",
      },
      {
        text: "Forman zwitteriones con carboxilato y amina a pH 7,4 y sufren expulsión cerebral activa por la glicoproteína P",
      },
      {
        text: "Circulan como amonios cuaternarios permanentes a pH 7,4 y carecen de afinidad por transportadores de expulsión cerebral",
      },
    ],
    correctIndex: 2,
    explanation: "Según el temario, cetirizina, levocetirizina, fexofenadina y bilastina reducen su entrada al SNC por un mecanismo doble: químicamente son zwitteriones a pH 7,4 al llevar un ácido carboxílico junto a la amina (difunden mal pasivamente), y biológicamente actúan como sustratos de la glicoproteína P (P-gp) en la barrera hematoencefálica, que los expulsa de vuelta hacia la sangre.\n\nDescartamos la A porque ninguno de esos fármacos contiene imidazol ni grupo sulfonato, la B porque poseen precisamente un ácido carboxílico ionizable y actúan como antagonistas H1, no como inhibidores de la histidina descarboxilasa y la D porque son aminas terciarias protonables en equilibrio con carboxilato (no amonios cuaternarios permanentes) y sí son sustratos de la P-gp.",
    difficulty: "Medio",
  },
  {
    id: "t07-mD-q08",
    topicId: "tema-07",
    block: "Bio/Metab",
    badge: "Modelo D · P8 · Bio/Metab",
    question: "Al diseñar análogos conformacionalmente restringidos sobre el grupo polar de los antagonistas H2 con diaminonitroetileno, un derivado cíclico que se superpone bien geométricamente en el espacio frente al prototipo abierto muestra una caída drástica de potencia. ¿Qué factor explica ese fracaso funcional pese a la buena superposición estérica?",
    options: [
      {
        text: "El cierre cíclico convierte la cabeza neutra en catión básico que repele el dipolo H2",
      },
      {
        text: "El cierre cíclico fija la conformación Z,Z que impide acercarse al sitio del receptor H2",
      },
      {
        text: "El cierre cíclico dispara la solvatación acuosa anulando el reparto hacia la biofase H2",
      },
      {
        text: "El cierre cíclico desalinea el vector dipolar y debilita el enlace H en el sitio H2",
      },
    ],
    correctIndex: 3,
    explanation: "Según el temario, los cetenaminales abiertos como el diaminonitroetileno alinean su dipolo con el del receptor H2 formando un enlace de hidrógeno fuerte; aunque un análogo cíclico rígido se superponga geométricamente bien, si desalinea la dirección del vector dipolar respecto al receptor debilita el enlace de hidrógeno y cae drásticamente su potencia.\n\nDescartamos la A porque el cierre en pirrol/heterociclo plano neutro no transforma el grupo polar en un catión protonable básico, la B porque la conformación Z,Z desfavorecida se discutió para descartar la quelación del carboxilato en la cimetidina abierta, no es lo que fija el derivado cíclico frente al cetenaminal y la C porque en la serie de análogos planos, el grupo nitro precisamente reduce la penalización de desolvatación frente a guanidina/tiourea; el fallo aquí es vectorial, no excesiva solvatación.",
    difficulty: "Medio",
  },
  {
    id: "t07-mD-q09",
    topicId: "tema-07",
    block: "SAR",
    badge: "Modelo D · P9 · SAR",
    question: "Tras abandonar un análogo H2 por neutropenia clínica asociada a su cabeza polar, se ensayaron bioisósteros sobre la misma cadena tioéter hasta hallar el primer compuesto guanidínico que eliminó toda actividad agonista residual (antagonista puro), aunque mostró menor potencia que el fármaco definitivo al presentar un pKa próximo a 13–14 antes de introducir un sustituyente electrón-atrayente fuerte. ¿Qué estructura corresponde a ese derivado?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-07/tema07_mD_p09_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-07/tema07_mD_p09_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-07/tema07_mD_p09_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-07/tema07_mD_p09_op_d.png",
      },
    ],
    correctIndex: 1,
    explanation: "Descartada la tiourea asociada a neutropenia (metiamida, C) y la cianoguanidina definitiva con -CN (cimetidina, D), distinguir la urea neutra (A) del análogo de guanidina no sustituido (B, pKa de 13–14, primer antagonista H2 puro con estructura guanidínica antes de introducir -CN) selecciona B.\n\nDescartamos la A porque es el análogo de urea (C=O): también fue menos activo, pero es un grupo neutro, no una base fuerte con pKa de 13–14, la C porque es la metiamida (C=S, tiourea), precisamente el compuesto retirado por neutropenia cuyo grupo polar se buscaba reemplazar y la D porque es la cimetidina (=N–CN): incorpora ya el sustituyente ciano electrón-atrayente que reduce el pKa por debajo de 1 y recupera la potencia clínica plena.",
    difficulty: "Medio",
  },
  {
    id: "t07-mD-q10",
    topicId: "tema-07",
    block: "SAR",
    badge: "Modelo D · P10 · SAR",
    question: "En el diseño racional de la cimetidina a partir de la metiamida, si en la cabeza polar de cianoguanidina se sustituyera el grupo ciano (–CN) por un grupo metilo electrón-donante (conservando el 5-metilimidazol y la cadena metiltioetílica), ¿cómo cambiarían el pKa y la ionización a pH 7,4, y qué efecto tendría sobre la potencia antagonista H2?",
    options: [
      {
        text: "El pKa sigue por debajo de 1 en forma neutra y mantiene intacta la potencia frente a H2",
      },
      {
        text: "El pKa sube quedando protonada a pH 7,4 y eleva la potencia al reforzar el enlace iónico",
      },
      {
        text: "El pKa sube quedando protonada a pH 7,4 y cae la potencia al perder la cabeza neutra",
      },
      {
        text: "El pKa baja aún más en forma aniónica a pH 7,4 y cae la potencia por repulsión con Asp",
      },
    ],
    correctIndex: 2,
    explanation: "Se resuelve en tres pasos según el temario: (1) en la cimetidina, el sustituyente fuertemente electrón-atrayente -CN (alto σI) rebaja el pKa del grupo guanidino por debajo de 1 manteniendo neutra la cabeza polar a pH fisiológico; (2) sustituir -CN por un grupo metilo electrón-donante devuelve la basicidad alta típica de la guanidina (pKa ≈ 13–14), de modo que el grupo vuelve a estar protonado con carga positiva a pH 7,4; y (3) como el sitio antagonista del receptor H2 requiere un grupo polar neutro donador de puentes de hidrógeno (no una guanidina catiónica), cae la potencia antagonista respecto a la cimetidina.\n\nDescartamos la A porque ignora que un grupo metilo donante no ejerce el efecto inductivo atractor (σI) del grupo ciano necesario para mantener pKa < 1, la B porque predice bien el aumento del pKa y la protonación a pH 7,4, pero invierte el SAR del antagonista H2 (el enlace iónico corresponde al farmacóforo agonista o al H1, no a la cabeza antagonista H2 neutra) y la D porque un grupo electrón-donante sube la basicidad (no acidifica ni genera aniones por debajo de pH 7,4).",
    difficulty: "Avanzado",
  },
  {
    id: "t07-mD-q11",
    topicId: "tema-07",
    block: "Síntesis",
    badge: "Modelo D · P11 · Síntesis",
    question: "En la síntesis industrial de la cimetidina, el alcohol heteroaromático obtenido al reducir el éster de Bredereck reacciona primero con 2-aminoetanotiol en medio ácido y después con N-cianoditioiminocarbonato de dimetilo en etanol a temperatura ambiente, liberando un único equivalente de metanotiol. ¿Qué intermedio se aísla antes de la etapa final con metilamina?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-07/tema07_mD_p11_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-07/tema07_mD_p11_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-07/tema07_mD_p11_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-07/tema07_mD_p11_op_d.png",
      },
    ],
    correctIndex: 0,
    explanation: "En la etapa 4 de la síntesis de la cimetidina, el tioéter-amina (C, formado en la etapa 3 a partir del alcohol D y cisteamina) ataca al reactivo (MeS)2C=N-CN desplazando un único equivalente de metanotiol (MeSH) para rendir la S-metilisotiourea (A), que conserva el segundo grupo -SMe hasta ser desplazado con metilamina en la etapa 5 dando la cimetidina (B).\n\nDescartamos la B porque es el producto final (cimetidina), que ya ha perdido el segundo grupo metiltio por reacción con metilamina, la C porque es el tioéter-amina de la etapa 3, previo a la condensación con (MeS)2C=N-CN y la D porque es el alcohol imidazólico de la etapa 2 obtenido tras la reducción del éster de Bredereck.",
    difficulty: "Medio",
  },
  {
    id: "t07-mD-q12",
    topicId: "tema-07",
    block: "Síntesis",
    badge: "Modelo D · P12 · Síntesis",
    question: "En la ruta hacia difenhidramina y dimenhidrinato a partir de benceno, si se omitiera el tratamiento previo de la benzofenona intermedia con Zn(Hg)/HCl antes de irradiar con bromo bajo luz ultravioleta y añadir 2-(dimetilamino)etanol, ¿qué etapa fallaría y qué consecuencia tendría sobre la formación del éter?",
    imagePath: "estructuras/tema-07/tema07_mD_p12_enun.png",
    options: [
      {
        text: "Fallaría la formación del anillo bencénico y no habría densidad aromática para el ataque nucleófilo alcohólico",
      },
      {
        text: "Fallaría la deshidratación de un alcohol secundario y no se generaría el alqueno requerido para adicionar bromuro",
      },
      {
        text: "Fallaría la activación ácida del carbonilo y el oxígeno cetónico atacaría al etanol impidiendo formar el éter",
      },
      {
        text: "Faltaría el metileno para estabilizar el radical difenilmetílico y fracasaría la sustitución SN2 del éter",
      },
    ],
    correctIndex: 3,
    explanation: "Se resuelve en tres pasos: (1) si se omite la reducción de Clemmensen (Zn(Hg)/HCl), el carbonilo de la benzofenona permanece sin reducirse a metileno (difenilmetano), por lo que no existen hidrógenos bencílicos; (2) al irradiar con Br2/UV no puede formarse el radical bencílico estabilizado por los dos fenilos ni aislarse bromodifenilmetano; (3) sin el haluro bencílico reactivo fracasa la sustitución SN2 del 2-(dimetilamino)etanol para obtener difenhidramina (precursor del dimenhidrinato).\n\nDescartamos la A porque los anillos bencénicos ya están presentes en la benzofenona y no sufren ataque nucleófilo alcohólico en la formación del éter, la B porque Zn(Hg)/HCl reduce completamente la cetona a metileno -CH2-, no a alcohol secundario para deshidratación hacia alqueno y la C porque no interviene ninguna activación ácida cetónica ni el oxígeno carbonílico ataca al alcohol en esta secuencia radicalaria-SN2.",
    difficulty: "Avanzado",
  },
  {
    id: "t07-mD-q13",
    topicId: "tema-07",
    block: "Síntesis",
    badge: "Modelo D · P13 · Síntesis",
    question: "En la ruta sintética de un antagonista H2 con núcleo furánico 2,5-disustituido, el alcohol furfurílico experimenta primero aminometilación con un ion iminio generado in situ seguida de sustitución nucleófila en medio ácido con 2-aminoetanotiol. ¿Qué especie se obtiene inmediatamente antes de añadir 1,1-bis(metiltio)-2-nitroeteno?",
    options: [
      {
        text: "Estructura A",
        imagePath: "estructuras/tema-07/tema07_mD_p13_op_a.png",
      },
      {
        text: "Estructura B",
        imagePath: "estructuras/tema-07/tema07_mD_p13_op_b.png",
      },
      {
        text: "Estructura C",
        imagePath: "estructuras/tema-07/tema07_mD_p13_op_c.png",
      },
      {
        text: "Estructura D",
        imagePath: "estructuras/tema-07/tema07_mD_p13_op_d.png",
      },
    ],
    correctIndex: 1,
    explanation: "Tras la reacción de Mannich sobre C5 del alcohol furfurílico (A), el tratamiento con 2-aminoetanotiol (cisteamina) en medio ácido (HCl) provoca el ataque SN2 del azufre sobre el alcohol protonado rindiendo el tioéter-amina del furano (B), justo antes de la adición sobre 1,1-bis(metiltio)-2-nitroeteno que da el intermedio S-metil (C) y finalmente la ranitidina (D).\n\nDescartamos la A porque es el producto de la primera etapa (Mannich) que conserva aún el grupo -CH2OH previo a la sustitución con cisteamina, la C porque es el intermedio S-metil obtenido ya tras reaccionar la amina con 1,1-bis(metiltio)-2-nitroeteno y la D porque es el producto final (ranitidina) tras desplazar el segundo tiometilo con metilamina.",
    difficulty: "Medio",
  },
  {
    id: "t07-mD-q14",
    topicId: "tema-07",
    block: "Bio/Metab",
    badge: "Modelo D · P14 · Bio/Metab",
    question: "Al estudiar agonistas selectivos de la histamina, la 4-metilhistamina activa de forma selectiva el receptor H2 mientras que derivados heterocíclicos sin protón migratorio como el 2-(2-aminoetil)tiazol y la 2-(2-aminoetil)piridina son agonistas selectivos H1. ¿Qué exigencia farmacofórica distinta pone de manifiesto esta comparación?",
    options: [
      {
        text: "El receptor H1 requiere migración prototrópica en el heterociclo mientras el receptor H2 prescinde de tautomería en el anillo",
      },
      {
        text: "Los agonistas H1 carecen de amina básica protonable mientras los agonistas H2 se unen mediante especies catiónicas permanentes",
      },
      {
        text: "Los agonistas H2 eficaces exigen sistema tautomérico en el anillo mientras los ligandos selectivos H1 no lo necesitan",
      },
      {
        text: "Tanto H1 como H2 exigen anillos tautoméricos idénticos y la selectividad depende solo de alargar la cadena hasta cuatro carbonos",
      },
    ],
    correctIndex: 2,
    explanation: "Según el temario, los agonistas H2 eficaces requieren un sistema tautomérico en el anillo heteroaromático (4-metilhistamina, con tautómero Nτ-H dominante), mientras que los agonistas selectivos H1 como el 2-(2-aminoetil)tiazol o la 2-(2-aminoetil)piridina carecen de tautomería prototrópica y conservan plena actividad sobre H1.\n\nDescartamos la A porque invierte el requisito tautomérico entre ambos subtipos de receptor, la B porque tanto los agonistas H1 como la histamina en H2 requieren la amina de la cadena protonada a pH fisiológico y la D porque la piridina y el tiazol carecen de equilibrio prototrópico y la selectividad obedece al requisito tautomérico y la sustitución, no a una cadena de cuatro carbonos.",
    difficulty: "Medio",
  },
  {
    id: "t07-mD-q15",
    topicId: "tema-07",
    block: "Bio/Metab",
    badge: "Modelo D · P15 · Bio/Metab",
    question: "En la fisiología y farmacología de los cuatro subtipos de receptores histaminérgicos (H1, H2, H3 y H4), ¿qué perfil de acoplamiento a proteínas G y respuesta celular caracteriza correctamente cada receptor?",
    options: [
      {
        text: "H1 acopla a Gq; H2 acopla a Gs elevando AMPc en la célula parietal; H3 y H4 acoplan a Gi/o",
      },
      {
        text: "H1 acopla a Gs; H2 acopla a Gq reduciendo el AMPc en la célula parietal; H3 y H4 acoplan a Gs",
      },
      {
        text: "H1 acopla a Gi/o; H2 inhibe la adenilil ciclasa gástrica; H3 estimula la liberación presináptica",
      },
      {
        text: "H1 y H2 acoplan ambos a Gi/o en el SNC y la secreción gástrica ácida depende sobre todo de Gq",
      },
    ],
    correctIndex: 0,
    explanation: "Según la tabla de receptores del temario, H1 está acoplado a Gq (piel, mucosas, músculo liso, vasos, SNC), H2 acopla a Gs aumentando el AMPc en la célula parietal gástrica para estimular la secreción de HCl por la H+/K+-ATPasa, y tanto H3 (autorreceptor/heterorreceptor presináptico del SNC) como H4 (células inmunitarias) se acoplan a Gi/o.\n\nDescartamos la B porque intercambia erróneamente Gq y Gs entre H1 y H2 y atribuye acoplamiento Gs a H3 y H4, la C porque asigna Gi/o a H1 e invierte la activación estimulante de H2 (Gs) y el papel inhibidor presináptico de H3 y la D porque ninguno de los receptores H1 o H2 acopla a Gi/o, y la vía histaminérgica gástrica actúa vía Gs/AMPc (no Gq).",
    difficulty: "Fácil",
  },
];
