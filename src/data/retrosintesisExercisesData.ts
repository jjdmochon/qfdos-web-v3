// ==========================================================================
// QFDOS Web v3 - Taller Práctico de Retrosíntesis & Desconexiones (Tema 01)
// Módulo: Slides 28-35 (Teoría de las Desconexiones en Fármacos Colinérgicos)
// Universidad de Granada - Grado en Farmacia (4º Curso)
// Tipografía Científica: Texto plano y caracteres Unicode directos (cero LaTeX crudo)
// ==========================================================================

export interface RetrosynthesisStep {
  stepNumber: number;
  type: 'Desconexión (⇒)' | 'Interconversión de Grupo Funcional (FGI)' | 'Adición / C-C';
  targetBond: string;
  synthons: string;
  syntheticEquivalents: string;
  rationale: string;
  intermediateSmiles?: string;
}

export interface ForwardReactionStep {
  stepNumber: number;
  reactants: string;
  reagentsAndConditions: string;
  product: string;
  productSmiles?: string;
  yieldApprox?: string;
  chemoselectivityNote: string;
}

export interface RetrosynthesisCaseStudy {
  id: string;
  title: string;
  drugName: string;
  drugSmiles: string;
  pharmacologicalRole: string;
  imagePath?: string;
  clinicalContext: string;
  challengeProblem: string;
  disconnectionAnalysis: RetrosynthesisStep[];
  forwardSynthesis: ForwardReactionStep[];
  criticalStudentMistakes: {
    mistake: string;
    chemicalReason: string;
  }[];
  sarAndAdmetTakeaways: string[];
}

export const RETROSINTHESIS_CASE_STUDIES: RetrosynthesisCaseStudy[] = [
  {
    id: 'case-01-bencilmalonato',
    title: 'Caso 1: Criterio de Selección de Corte Retrosintético en Derivados Bencílicos',
    drugName: 'Bencilmalonato de dietilo (Precursor modelo de aminoácidos colinérgicos)',
    drugSmiles: 'CCOC(=O)C(Cc1ccccc1)C(=O)OCC',
    imagePath: '/retrosintesis/slide29_bencilmalonato_desconexion.png',
    pharmacologicalRole: 'Bloque sintético clave para derivados anticolinérgicos alfa-bencílicos y alfa-aminoácidos no proteinogénicos.',
    clinicalContext: 'En el diseño de análogos de la acetilcolina y antagonistas muscarínicos, la introducción de grupos bencílicos voluminosos permite explorar cavidades hidrófobas periféricas del receptor muscarínico. El bencilmalonato es el intermedio fundacional para modular la distancia entre el anillo aromático y el centro de nitrógeno catiónico.',
    challengeProblem: 'Realice la desconexión retrosintética formal del bencilmalonato de dietilo evaluando las dos posibles rupturas de enlace carbono-carbono: corte "a" (enlace PhCH2-CH) frente a corte "b" (enlace Ph-CH2). Justifique mecanicísticamente por qué una de ellas es inviable y plantee la síntesis directa completa.',
    disconnectionAnalysis: [
      {
        stepNumber: 1,
        type: 'Desconexión (⇒)',
        targetBond: 'Corte "a": Enlace PhCH2-CH(CO2Et)2',
        synthons: '[PhCH2]+ (catión bencilo) + [-CH(CO2Et)2] (carbanión malonato diéster)',
        syntheticEquivalents: 'Bromuro de bencilo (PhCH2Br) + Malonato de dietilo (CH2(CO2Et)2 en presencia de NaOEt)',
        rationale: 'El catión bencilo [PhCH2]+ presenta alta estabilidad termodinámica por deslocalización de la carga positiva en las posiciones orto y para del anillo aromático. El carbanión malonato [-CH(CO2Et)2] está óptimamente estabilizado por efecto quelante de deslocalización entre los dos grupos carbonilo (pKa ≈ 13.3).',
        intermediateSmiles: 'CCOC(=O)CC(=O)OCC'
      },
      {
        stepNumber: 2,
        type: 'Desconexión (⇒)',
        targetBond: 'Corte "b" (INVIABLE): Enlace Ph-CH2CH(CO2Et)2',
        synthons: '[Ph]+ (catión fenilo) + [-CH2CH(CO2Et)2] (carbanión alifático no estabilizado)',
        syntheticEquivalents: 'Bromobenceno (PhBr) + anión alifático',
        rationale: 'El catión fenilo [Ph]+ posee la vacante electrónica en un orbital híbrido sp2 situado en el plano del anillo aromático, estrictamente ortogonal al sistema pi aromático. No se deslocaliza y su formación exige una energía prohibitiva (> 100 kcal/mol superior al catión bencilo). Por tanto, el corte "b" queda descartado.',
        intermediateSmiles: 'c1ccccc1Br'
      }
    ],
    forwardSynthesis: [
      {
        stepNumber: 1,
        reactants: 'Malonato de dietilo + Etóxido sódico (NaOEt) en etanol absoluto',
        reagentsAndConditions: 'NaOEt (1.05 equiv.), EtOH seco, 25 °C, 30 min (desprotonación cuantitativa del protón alfa malónico)',
        product: 'Enolato sódico de malonato de dietilo',
        productSmiles: 'CCOC(=O)[CH-]C(=O)OCC.[Na+]',
        yieldApprox: '98%',
        chemoselectivityNote: 'Se utiliza NaOEt en EtOH para evitar transesterificaciones parásitas que ocurrirían si se emplearan metóxido u otras bases alcóxido.'
      },
      {
        stepNumber: 2,
        reactants: 'Enolato sódico de malonato + Bromuro de bencilo (PhCH2Br)',
        reagentsAndConditions: 'Reflujo suave en EtOH (78 °C), 2 h, precipitación de NaBr',
        product: 'Bencilmalonato de dietilo',
        productSmiles: 'CCOC(=O)C(Cc1ccccc1)C(=O)OCC',
        yieldApprox: '88-92%',
        chemoselectivityNote: 'Sustitución bimolecular SN2 limpia sobre el centro bencílico primario no impedido, sin competencia de dialquilación cuando se controla la estequiometría 1:1.'
      }
    ],
    criticalStudentMistakes: [
      {
        mistake: 'Proponer el uso de bromobenceno (PhBr) y un nucleófilo carbaniónico mediante sustitución nucleófila alifática convencional.',
        chemicalReason: 'El carbono sp2 aromático no experimenta ataques SN2 debido a la repulsión electrónica de la nube pi y al impedimento geométrico dorsal de la caja aromática.'
      },
      {
        mistake: 'Usar hidróxido sódico acuoso (NaOH/H2O) en lugar de etóxido sódico en etanol anhidro.',
        chemicalReason: 'El agua y el hidróxido provocan la saponificación prematura de los enlaces éster etílico, arruinando la generación del enolato.'
      }
    ],
    sarAndAdmetTakeaways: [
      'El grupo bencilo confiere rigidez conformacional moderada y aporta 2.1 unidades de logP, incrementando la afinidad por subdominios lipófilos de receptores muscarínicos.',
      'A partir del bencilmalonato monoalquilado se puede realizar una hidrólisis parcial y descarboxilación térmica a 160-180 °C para obtener ácidos 3-fenilpropanoicos puros.'
    ]
  },
  {
    id: 'case-02-ciclopentolato',
    title: 'Caso 2: El Dilema del Carbonilo Enolizable en Ciclopentolato: La Solución de Ivanov',
    drugName: 'Ciclopentolato (Colirio midriático y ciclopléjico oftálmico)',
    drugSmiles: 'CN(C)CCOC(=O)C(c1ccccc1)C1(O)CCCC1',
    imagePath: '/retrosintesis/slide32_ciclopentolato_ivanov.png',
    pharmacologicalRole: 'Antagonista muscarínico de acción breve y potente penetración corneal para refracción y exploración de fondo de ojo.',
    clinicalContext: 'Fármaco de elección en oftalmología diagnóstica infantil y adultos debido a su inicio de acción rápido (25-75 min) y recuperación de la acomodación en menos de 24 horas, muy superior a la prolongada cicloplejía de la atropina (hasta 7-14 días).',
    challengeProblem: 'En la retrosíntesis del Ciclopentolato, la desconexión del éster acilo-oxígeno genera el ácido alfa-(1-hidroxiciclopentil)fenilacético. Analice por qué la adición nucleófila de fenilacetato de etilo o de reactivos de Grignard clásicos sobre ciclopentanona fracasa con rendimientos inferiores al 15%, y desarrolle la ruta sintética mediante el reactivo de Ivanov.',
    disconnectionAnalysis: [
      {
        stepNumber: 1,
        type: 'Desconexión (⇒)',
        targetBond: 'Enlace éster acilo-oxígeno: C(=O)-OCH2CH2NMe2',
        synthons: '[R-CO]+ (catión acilio del ácido sustituido) + [-OCH2CH2NMe2] (anión alcóxido)',
        syntheticEquivalents: 'Ácido alfa-(1-hidroxiciclopentil)fenilacético (o su éster metílico) + 2-(dimetilamino)etanol (HOCH2CH2NMe2)',
        rationale: 'Desconexión clásica y limpia de ésteres farmacológicos. Permite ensamblar por transesterificación catalizada por base el segmento aminoalcohólico sin comprometer el carbinol terciario.',
        intermediateSmiles: 'CN(C)CCO'
      },
      {
        stepNumber: 2,
        type: 'Desconexión (⇒)',
        targetBond: 'Enlace C(alfa)-C(1 ciclopentilo) del carbinol terciario',
        synthons: '[-CH(Ph)CO2H] (dianión carbaniónico en alfa) + [+C1(OH) ciclopentanona]',
        syntheticEquivalents: 'Reactivo de Ivanov (dianión del ácido fenilacético) + Ciclopentanona comercial',
        rationale: 'La ciclopentanona presenta protones alfa muy ácidos (pKa ≈ 16) y un ángulo de enlace comprimido en el anillo de 5 miembros que favorece la enolización competitiva frente a reactivos monocarbaniónicos. El dianión de Ivanov actúa como un nucleófilo blando con mínima basicidad desprotonante, permitiendo la adición 1,2 con rendimientos superiores al 80%.',
        intermediateSmiles: 'O=C1CCCC1'
      }
    ],
    forwardSynthesis: [
      {
        stepNumber: 1,
        reactants: 'Ácido fenilacético + 2 equivalentes de cloruro de isopropilmagnesio (i-PrMgCl) o NaNH2 en THF',
        reagentsAndConditions: 'THF anhidro, 0 °C a reflujo, desprotonación en cascada del carboxilato y del C-alfa',
        product: 'Dianión de fenilacetato magnésico (Reactivo de Ivanov)',
        productSmiles: '[O-]C(=O)[CH-]c1ccccc1.[Mg+2]',
        yieldApprox: '95%',
        chemoselectivityNote: 'El primer equivalente de reactivo de Grignard desprotona el carboxilo formando el carboxilato; el segundo equivalente desprotona el C-alfa estabilizado por resonancia aromática.'
      },
      {
        stepNumber: 2,
        reactants: 'Reactivo de Ivanov + Ciclopentanona',
        reagentsAndConditions: 'THF, adición gota a gota a -10 °C, calentamiento a reflujo, posterior hidrólisis ácida (HCl diluido)',
        product: 'Ácido alfa-(1-hidroxiciclopentil)fenilacético',
        productSmiles: 'O=C(O)C(c1ccccc1)C1(O)CCCC1',
        yieldApprox: '82%',
        chemoselectivityNote: 'Ataque nucleófilo 1,2 selectivo sobre el carbonilo ciclopentánico sin sufrir reacción aldólica cruzada ni enolización de la cetona.'
      },
      {
        stepNumber: 3,
        reactants: 'Ácido alfa-(1-hidroxiciclopentil)fenilacético + 2-(dimetilamino)cloroetano o transesterificación con éster metílico y 2-(dimetilamino)etanol',
        reagentsAndConditions: 'Isopropanol / K2CO3, reflujo térmico 6 h',
        product: 'Ciclopentolato (base libre) convertida a clorhidrato con HCl gas',
        productSmiles: 'CN(C)CCOC(=O)C(c1ccccc1)C1(O)CCCC1',
        yieldApprox: '85%',
        chemoselectivityNote: 'Esterificación limpia que conserva inalterado el hidroxilo terciario estéricamente protegido en el anillo ciclopentánico.'
      }
    ],
    criticalStudentMistakes: [
      {
        mistake: 'Proponer la reacción directa de fenilacetato de etilo con ciclopentanona usando etóxido sódico comercial.',
        chemicalReason: 'El etóxido desprotona a la ciclopentanona más rápidamente que al éster, desencadenando la autocondensación aldólica de la ciclopentanona (2-ciclopentilidenciclopentanona) como producto principal.'
      },
      {
        mistake: 'Intentar deshidratar el producto intermedio para eliminar el hidroxilo terciario.',
        chemicalReason: 'El hidroxilo terciario es un elemento farmacofórico indispensable que forma un enlace de hidrógeno clave con el subbolsillo de Asn507 / Tyr506 en el receptor muscarínico; su eliminación destruye la afinidad antimuscarínica.'
      }
    ],
    sarAndAdmetTakeaways: [
      'El anillo de ciclopentilo confiere una lipofilia óptima (logP = 2.18) para atravesar el epitelio corneal lipófilo sin acumularse indefinidamente en tejidos intraoculares.',
      'El enlace éster alifático es susceptible a la hidrólisis por carboxilesterasas corneales y plasmáticas, lo que garantiza su rápida inactivación sistémica y evita efectos adversos anticolinérgicos graves en niños.'
    ]
  },
  {
    id: 'case-03-piperidolato',
    title: 'Caso 3: Expansión de Heterociclos en Antiespasmódicos: Retrosíntesis y Síntesis de Piperidolato',
    drugName: 'Piperidolato (Antiespasmódico visceral / urológico)',
    drugSmiles: 'CCN1CCCC(C1)OC(=O)C(c1ccccc1)c1ccccc1',
    imagePath: '/retrosintesis/slide33_aminoesteres_piperidolato.png',
    pharmacologicalRole: 'Antagonista muscarínico sintético con conformación semicompacta para el espasmo de músculo liso gastrointestinal y vesical.',
    clinicalContext: 'Desarrollado durante la campaña de simplificación estructural del anillo de tropano (atropina). Al reemplazar el sistema bicíclico 8-metil-8-azabiciclo[3.2.1]octano por un anillo monocíclico de piperidina sustituida en C-3, se mantiene la distancia interatómica N-O óptima (≈ 3.0 Å) con menor toxicidad sobre el SNC.',
    challengeProblem: 'Diseñe la ruta retrosintética para el Piperidolato. El mayor reto sintético radica en la obtención del alcohol secundario heterocíclico 1-etilpiperidin-3-ol a partir de una materia prima agroindustrial económica: el furfural. Describa el mecanismo de transposición y expansión de ciclo.',
    disconnectionAnalysis: [
      {
        stepNumber: 1,
        type: 'Desconexión (⇒)',
        targetBond: 'Enlace éster: Difenilacetato con oxígeno piperidínico en C-3',
        synthons: '[Ph2CH-CO]+ (catión acilio) + [-O-Piperidina(Et)] (alcóxido heterocíclico)',
        syntheticEquivalents: 'Cloruro de difenilacetilo (Ph2CH-COCl) + 1-etilpiperidin-3-ol',
        rationale: 'Acoplamiento acilo-oxígeno cuantitativo en presencia de una base eliminadora de ácido (trietilamina o piridina).',
        intermediateSmiles: 'ClC(=O)C(c1ccccc1)c1ccccc1'
      },
      {
        stepNumber: 2,
        type: 'Interconversión de Grupo Funcional (FGI)',
        targetBond: 'Ciclo piperidínico sustituido: 1-etilpiperidin-3-ol a partir de furfural',
        synthons: 'Furfural (anillo de furan-2-carboxaldehído de 5 miembros) ⇒ 1-etil-3-hidroxipiridinio',
        syntheticEquivalents: 'Furfural + Etilamina (EtNH2) + HBr acuoso / AcOH caliente',
        rationale: 'La aminación reductiva del furfural con etilamina rinde furfuriletilamina. El tratamiento ácido fuerte con HBr/AcOH induce la protonación del oxígeno furánico, apertura hidrolítica del anillo (transposición de Achmatowicz/reordenamiento) y ataque intramolecular del nitrógeno etilamino para formar la sal de 1-etil-3-hidroxipiridinio, que se reduce selectivamente a 1-etilpiperidin-3-ol.',
        intermediateSmiles: 'CCN1CCCC(O)C1'
      }
    ],
    forwardSynthesis: [
      {
        stepNumber: 1,
        reactants: 'Furfural + Etilamina (EtNH2) en medio reductor (H2 / Ni Raney o NaBH3CN)',
        reagentsAndConditions: 'Metanol, 25-50 °C, 3 atm H2, aminación reductiva directa',
        product: 'N-(furfuril)etilamina',
        productSmiles: 'CCNCc1ccco1',
        yieldApprox: '90%',
        chemoselectivityNote: 'Formación in situ de la aldimina y reducción selectiva del doble enlace C=N sin hidrogenar los dobles enlaces conjugados del anillo de furano.'
      },
      {
        stepNumber: 2,
        reactants: 'N-(furfuril)etilamina + HBr acuoso (48%) en ácido acético glacial',
        reagentsAndConditions: 'Reflujo prolongado (120 °C), 4 h; transposición hidrolítica y expansión de anillo',
        product: 'Bromuro de 1-etil-3-hidroxipiridinio',
        productSmiles: 'CC[n+]1cccc(O)c1.[Br-]',
        yieldApprox: '75%',
        chemoselectivityNote: 'Apertura del furano protonado en C-5, ataque nucleófilo regioselectivo del grupo etilamino al carbono dicarbonílico terminal y deshidratación aromática hacia piridinio.'
      },
      {
        stepNumber: 3,
        reactants: 'Bromuro de 1-etil-3-hidroxipiridinio + Hidrógeno sobre PtO2 (catalizador de Adams) o Ru/C',
        reagentsAndConditions: 'Etanol, 60 psi H2, 25 °C, hidrogenación selectiva del anillo aromático de piridinio',
        product: '1-etilpiperidin-3-ol (mezcla racémica)',
        productSmiles: 'CCN1CCCC(O)C1',
        yieldApprox: '88%',
        chemoselectivityNote: 'Saturación completa del anillo heteroaromático sin escisión hidrogenolítica del enlace C(3)-OH ni del grupo etilamino.'
      },
      {
        stepNumber: 4,
        reactants: '1-etilpiperidin-3-ol + Cloruro de difenilacetilo (Ph2CH-COCl)',
        reagentsAndConditions: 'Diclorometano, trietilamina (1.2 equiv.), 0 °C a temperatura ambiente, 3 h',
        product: 'Piperidolato (base libre / clorhidrato)',
        productSmiles: 'CCN1CCCC(C1)OC(=O)C(c1ccccc1)c1ccccc1',
        yieldApprox: '91%',
        chemoselectivityNote: 'Esterificación nucleófila limpia del alcohol secundario con el haluro de acilo; la trietilamina atrapa el HCl generado evitando la protonación prematura de la piperidina.'
      }
    ],
    criticalStudentMistakes: [
      {
        mistake: 'Proponer la síntesis de 1-etilpiperidin-3-ol mediante halogenación directa de piperidina con bromo molecular.',
        chemicalReason: 'La halogenación directa de aminas heterocíclicas secundarias conduce a N-bromopiperidinas altamente inestables y oxidaciones destructivas del anillo, no a sustitución C-3.'
      },
      {
        mistake: 'Confundir la posición C-3 de la piperidina con C-4.',
        chemicalReason: 'La sustitución en C-3 imita con exactitud milimétrica la conformación ecuatorial/axial del hidroxilo tropánico en posición 3-alfa de la atropina; los derivados 4-piperidílicos presentan una geometría diferente que merma la afinidad muscarínica.'
      }
    ],
    sarAndAdmetTakeaways: [
      'El grupo etilo en el nitrógeno (1-etil) proporciona un balance óptimo de basicidad (pKa ≈ 8.8) y volumen estérico para anclarse en el bolsillo de aspartato del receptor muscarínico.',
      'Al ser una amina terciaria y no un amonio cuaternario, posee absorción oral adecuada, pero su elevada depuración hepática reduce drásticamente los efectos secundarios centrales no deseados.'
    ]
  },
  {
    id: 'case-04-trihexifenidilo-isopropamida',
    title: 'Caso 4: Modulación de Farmacóforo y Selectividad SNC vs Periférica: Trihexifenidilo e Isopropamida',
    drugName: 'Trihexifenidilo (Antiparkinsoniano central) vs Isopropamida (Antisecretor periférico)',
    drugSmiles: 'OC(CCN1CCCCC1)(c1ccccc1)C1CCCCC1',
    imagePath: '/retrosintesis/slide34_trihexifenidilo_aminopropanol.png',
    pharmacologicalRole: 'Estudio comparativo de dos estrategias antimuscarínicas opuestas: penetración masiva en SNC con carbinol resistente a esterasas vs exclusión completa de SNC mediante amonio cuaternario prolongado.',
    clinicalContext: 'El Trihexifenidilo cruza activamente la barrera hematoencefálica y reequilibra el tono colinérgico/dopaminérgico en los ganglios basales para aliviar el temblor en Parkinson. La Isopropamida, al portar una carga iónica permanente en el amonio cuaternario, está totalmente excluida del SNC y ejerce una potente inhibición periférica de la secreción ácida gástrica y de los espasmos duodenales.',
    challengeProblem: 'Compare las estrategias retrosintéticas de ambos fármacos. Para Trihexifenidilo, desarrolle la desconexión del carbinol terciario mediante adición de Grignard sobre una base de Mannich. Para Isopropamida, justifique por qué el grupo carbamoilo se genera por hidratación selectiva de nitrilo y no por amidación directa.',
    disconnectionAnalysis: [
      {
        stepNumber: 1,
        type: 'Desconexión (⇒)',
        targetBond: 'Trihexifenidilo: Enlace C(carbinol)-C(ciclohexilo)',
        synthons: '[c-Hex]- (carbanión ciclohexilo) + [Ph-C(=O)-CH2CH2-N(piperidina)]+ (catión electrofílico)',
        syntheticEquivalents: 'Bromuro de ciclohexilmagnesio (c-HexMgBr) + 1-fenil-3-(piperidin-1-il)propan-1-ona (Base de Mannich)',
        rationale: 'Desconexión de carbinol terciario asimétrico a cetona + reactivo organometálico.',
        intermediateSmiles: 'O=C(c1ccccc1)CCN2CCCCC2'
      },
      {
        stepNumber: 2,
        type: 'Desconexión (⇒)',
        targetBond: 'Trihexifenidilo: Enlace C-C de la propanona aminada (Base de Mannich)',
        synthons: 'Acetofenona + Formaldehído + Piperidina',
        syntheticEquivalents: 'Acetofenona (PhCOCH3) + Paraformaldehído ((CH2O)n) + Clorhidrato de piperidina en HCl acuoso',
        rationale: 'Reacción clásica de Mannich multicomponente catalizada por ácido.',
        intermediateSmiles: 'O=C(c1ccccc1)C'
      },
      {
        stepNumber: 3,
        type: 'Desconexión (⇒)',
        targetBond: 'Isopropamida: Desconexión del catión cuaternario N-metilo',
        synthons: '[Amina terciaria diisopropilo] + [CH3]+',
        syntheticEquivalents: '4-(diisopropilamino)-2,2-difenilbutanamida + Yoduro de metilo (MeI)',
        rationale: 'La cuaternización final con haluro de metilo se reserva como última etapa para evitar la insolubilidad y dificultades de purificación que causan las sales cuaternarias en reacciones intermedias.',
        intermediateSmiles: 'CC(C)N(CCC(C(N)=O)(c1ccccc1)c1ccccc1)C(C)C'
      },
      {
        stepNumber: 4,
        type: 'Interconversión de Grupo Funcional (FGI)',
        targetBond: 'Isopropamida: Amida primaria (-CONH2) a Nitrilo (-CN)',
        synthons: '4-(diisopropilamino)-2,2-difenilbutanamida ⇒ 4-(diisopropilamino)-2,2-difenilbutanonitrilo',
        syntheticEquivalents: 'Hidrólisis parcial selectiva con H2SO4 concentrado a 90 °C',
        rationale: 'La amidación directa de ácidos carboxílicos terciarios altamente impedidos como el ácido difenilacético sustituido genera problemas severos de descarboxilación y bajos rendimientos. La hidratación ácida controlada del nitrilo se detiene cuantitativamente en la amida primaria sin progresar a ácido.',
        intermediateSmiles: 'N#CC(c1ccccc1)(c1ccccc1)CCN(C(C)C)C(C)C'
      }
    ],
    forwardSynthesis: [
      {
        stepNumber: 1,
        reactants: 'Acetofenona + Paraformaldehído + Clorhidrato de piperidina + gota de HCl conc.',
        reagentsAndConditions: 'Etanol absoluto, reflujo 4 h (Reacción de Mannich)',
        product: 'Clorhidrato de 1-fenil-3-(piperidin-1-il)propan-1-ona',
        productSmiles: 'O=C(c1ccccc1)CCN2CCCCC2',
        yieldApprox: '87%',
        chemoselectivityNote: 'El ión iminio formado in situ entre el formaldehído y la piperidina reacciona exclusivamente con el enol de la acetofenona.'
      },
      {
        stepNumber: 2,
        reactants: '1-fenil-3-(piperidin-1-il)propan-1-ona (base libre) + Bromuro de ciclohexilmagnesio',
        reagentsAndConditions: 'Éter dietílico / THF anhidro, adición a 0 °C, calentamiento a reflujo 2 h, hidrólisis con NH4Cl acuoso',
        product: 'Trihexifenidilo (base libre y precipitación de clorhidrato)',
        productSmiles: 'OC(CCN1CCCCC1)(c1ccccc1)C1CCCCC1',
        yieldApprox: '79%',
        chemoselectivityNote: 'Ataque nucleófilo 1,2 del reactivo de Grignard voluminoso sobre el carbonilo cetónico sin desprotonación ni eliminación de Hofmann de la amina.'
      },
      {
        stepNumber: 3,
        reactants: '2,2-difenilacetonitrilo + Amida sódica (NaNH2) + 2-(diisopropilamino)cloroetano',
        reagentsAndConditions: 'Tolueno anhidro, 80 °C, 5 h',
        product: '4-(diisopropilamino)-2,2-difenilbutanonitrilo',
        productSmiles: 'N#CC(c1ccccc1)(c1ccccc1)CCN(C(C)C)C(C)C',
        yieldApprox: '84%',
        chemoselectivityNote: 'La amida sódica desprotona el carbono alfa del difenilacetonitrilo (pKa ≈ 17.5) generando un carbanión fuertemente deslocalizado por ambos fenilos que alquila con limpieza el cloroetano.'
      },
      {
        stepNumber: 4,
        reactants: '4-(diisopropilamino)-2,2-difenilbutanonitrilo + Ácido sulfúrico (85%)',
        reagentsAndConditions: 'Calentamiento a 95 °C durante 6 h, neutralización con NaOH e insolubilización',
        product: '4-(diisopropilamino)-2,2-difenilbutanamida',
        productSmiles: 'CC(C)N(CCC(C(N)=O)(c1ccccc1)c1ccccc1)C(C)C',
        yieldApprox: '92%',
        chemoselectivityNote: 'Hidratación parcial catalizada por ácido altamente selectiva; el impedimento estérico de los dos grupos fenilo protege a la amida primaria de la hidrólisis secundaria a ácido carboxílico.'
      },
      {
        stepNumber: 5,
        reactants: '4-(diisopropilamino)-2,2-difenilbutanamida + Yoduro de metilo (MeI)',
        reagentsAndConditions: 'Acetona / acetato de etilo, 25 °C, precipitación espontánea del precipitado cristalino',
        product: 'Yoduro de isopropamida',
        productSmiles: 'CC(C)[N+](C)(CCC(C(N)=O)(c1ccccc1)c1ccccc1)C(C)C.[I-]',
        yieldApprox: '96%',
        chemoselectivityNote: 'Cuaternización regioselectiva sobre la amina terciaria alifática; el nitrógeno amídico está deslocalizado con el carbonilo y no compite como nucleófilo.'
      }
    ],
    criticalStudentMistakes: [
      {
        mistake: 'Pensar que el Trihexifenidilo puede inactivarse por las esterasas sanguíneas igual que la acetilcolina o la atropina.',
        chemicalReason: 'El Trihexifenidilo no tiene función éster, sino un carbinol terciario unido directamente a cadenas hidrocarbonadas (C-C), por lo que es totalmente resistente a esterasas, otorgándole una semivida prolongada (10-12 h).'
      },
      {
        mistake: 'Proponer la cuaternización con ioduro de metilo en la primera etapa sobre el 2-(diisopropilamino)cloroetano.',
        chemicalReason: 'La sal de amonio cuaternario resultante es insoluble en tolueno y el halógeno cuaternario interferiría con la base fuerte amida sódica produciendo eliminaciones de Hofmann masivas.'
      }
    ],
    sarAndAdmetTakeaways: [
      'Trihexifenidilo: pKa = 9.3, logP = 4.33, TPSA = 23.5 Å². Cumple holgadamente las reglas de cruce pasivo de la BHE (TPSA < 70 Å², logP > 2.0, ausencia de carga fija).',
      'Isopropamida: Carga formal positiva permanente (+1), TPSA = 43.1 Å², logP aparente muy bajo en medio fisiológico por ionización permanente. Exclusión completa del SNC y afinidad periférica gastrointestinal superior a 24 horas.'
    ]
  }
];
