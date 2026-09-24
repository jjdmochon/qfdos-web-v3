# Estructuras químicas QFDOS — Tema 2: Sistema Adrenérgico

Base de datos molecular completa del **Tema 2 (Noradrenalina y Transmisión Adrenérgica)** de Química Farmacéutica II (QFDOS), correspondiente al curso 2026/2027.

---

## 1. Ficheros del Tema 2

| Fichero | Descripción |
| :--- | :--- |
| `estructuras_qfdos.csv` | **Fichero maestro**. 49 compuestos con id (`QFDOS-046` a `QFDOS-094`), nombres, tema, familia química, SMILES canónico neutro, especie mayoritaria a pH 7.4, CAS, ChEMBL ID y notas docentes mecanísticas. |
| `generar_tema2_completo.py` | Pipeline de cálculo con RDKit: valida SMILES, calcula 21 descriptores físico-químicos, dibuja estructuras 2D nítidas y compila las figuras compuestas de SAR. |
| `propiedades_qfdos.csv` | Tabla exhaustiva de descriptores físico-químicos (MW, exact mass, logP Crippen, MR, TPSA, HBD, HBA, enlaces rotables, anillos aromáticos, Fsp3, QED, estereocentros CIP, InChI, InChIKey, violaciones de Lipinski). |
| `estructuras_qfdos.xlsx` | Libro Excel formateado: hoja *Propiedades* (filtrable, cabecera azul marino institucional `#1F3864`) + hoja *Estructuras* con imágenes 2D incrustadas celda a celda. |
| `*.png` y `img/` | Depicciones 2D individuales de cada molécula en alta resolución. |
| `QFDOS_T2_*.png` | Paneles didácticos y collages comparativos de SAR para su integración directa en presentaciones y apuntes. |

---

## 2. Taxonomía de Bloques Cargados (QFDOS-046 a QFDOS-094)

### Bloque 1 — Biosíntesis adrenérgica y falsos transmisores (QFDOS-046 a 054, 094)
- **QFDOS-046 L-Tirosina**: Precursor de la biosíntesis. Hidroxilado por tirosina hidroxilasa (TH, paso limitante).
- **QFDOS-047 L-DOPA (Levodopa)**: Producto de la TH; atraviesa la BHE por transporte mediado por LAT1 (pro-fármaco en Parkinson).
- **QFDOS-048 Dopamina**: Precursor de la noradrenalina vía dopamina beta-hidroxilasa (DbH). Cation a pH 7.4; no cruza BHE.
- **QFDOS-049 Noradrenalina (Norepinefrina)**: Neurotransmisor prototipo de la sinapsis simpática. Agonista directo alfa > beta; eutómero (R)-(-).
- **QFDOS-050 Adrenalina (Epinefrina)**: Hormona medular N-metilada vía PNMT; agonista mixto alfa y beta potente. Eutómero (R)-(-).
- **QFDOS-051 a-Metiltirosina (Metirosina)**: Inhibidor competitivo de la tirosina hidroxilasa; suprime la síntesis global de catecolaminas.
- **QFDOS-052 a-Metildopa**: Antihipertensivo pro-fármaco en el embarazo. Sustrato de la AADC que origina el falso transmisor alfa-metilnoradrenalina.
- **QFDOS-053 a-Metildopamina**: Intermedio resistente a la MAO gracias al metilo en alfa.
- **QFDOS-054 a-Metilnoradrenalina (Corbasil)**: Falso neurotransmisor acumulado en vesículas sinápticas; agonista alfa2 presináptico que reduce el tono simpático central.
- **QFDOS-094 Carbidopa**: Inhibidor periférico de la L-DOPA descarboxilasa (AADC). Análogo alfa-hidrazínico de la alfa-metildopa; forma una base de Schiff / hidrazona con el piridoxal fosfato (PLP) inactivando la enzima. Administrado junto a levodopa (Sinemet) para prevenir su descarboxilación periférica. No cruza la BHE al ser un zwitterión polar (TPSA 115.8 Å²). Eutómero (S).

### Bloque 2 — Moduladores del almacenamiento, liberación y metabolismo (QFDOS-055 a 062)
- **QFDOS-055 Disulfiramo**: Inhibidor de la dopamina beta-hidroxilasa y de la aldehído deshidrogenasa (Antabus). Ditiocarbamato muy lipófilo.
- **QFDOS-056 Reserpina**: Alcaloide de *Rauwolfia serpentina*; inhibidor irreversible de VMAT-2 que agota las vesículas de catecolaminas. Hipotensor con marcada sedación central.
- **QFDOS-057 Mediodespidina (Deserpidina)**: 11-desmetoxireserpina. Mantiene la potencia hipotensora periférica sin inducir depresión central.
- **QFDOS-058 Rescinamina**: Éster trimetoxicinámico de Rauwolfia. Ejemplo de vinilogía natural frente a reserpina.
- **QFDOS-059 Guanidina**: Base orgánica fuerte (pKa 13.6). Catión guanidinio estabilizado por resonancia simétrica Y-aromática.
- **QFDOS-060 Guanetidina**: Bloqueante presináptico fuertemente básico (pKa > 12). 100% ionizado a pH 7.4: no cruza la BHE y carece de sedación central. Obtenida vía transposición de Beckmann.
- **QFDOS-061 Cloruro de S-metilisotiuronio**: Reactivo electrófilo sulfurado de guanidinación empleado en la síntesis de guanetidina.
- **QFDOS-062 3,4-Dihidroxifenilglicolaldehido (DOPEGAL)**: Metabolito aldehídico directo de la noradrenalina por la monoaminooxidasa (MAO).

### Bloque 3 — Agonistas indirectos y de acción mixta: feniletilaminas y anfetaminas (QFDOS-063 a 071)
- **QFDOS-063 (-)-Efedrina**: Alcaloide de *Ephedra*. Agonista mixto directo/indirecto (1R,2S)-(-)-eritro. Menor penetración central que anfetamina por el OH bencílico polar.
- **QFDOS-064 (+)-Pseudoefedrina**: Diastereoisómero (1S,2S)-(+)-treo; menor actividad agonista directa, empleado como descongestivo nasal oral.
- **QFDOS-065 Fenilpropanolamina (Norefedrina)**: Propadrina. Desmetilada en nitrógeno, de acción mixta.
- **QFDOS-066 Anfetamina**: Prototipo de estimulante indirecto puro. Sin OH fenólicos ni bencílico: lipofilia elevada y penetración masiva al SNC. El metilo en alfa bloquea a la MAO.
- **QFDOS-067 Dextroanfetamina**: Eutómero (S)-(+); de 3 a 4 veces más potente que el enantiómero (R) en el SNC.
- **QFDOS-068 Metanfetamina**: Derivado N-metilado de mayor lipofilia y cruce ultrarrápido de la BHE; altamente adictivo y neurotóxico.
- **QFDOS-069 Fentermina**: alfa,alfa-dimetilfeniletilamina. Dos metilos en alfa que bloquean estéricamente a la MAO; anorexígeno central.
- **QFDOS-070 Mefentermina**: N-metilfentermina. Vasopresor indirecto para hipotensión quirúrgica.
- **QFDOS-071 Hidroxianfetamina (Paredrina)**: 4-hidroxianfetamina. El OH fenólico incrementa la polaridad e impide el cruce de la BHE; estimulante periférico y midriático.

### Bloque 4 — Agonistas adrenérgicos directos: selectividad alfa y beta (QFDOS-072 a 079)
- **QFDOS-072 Isoprenalina (Isoproterenol)**: Agonista beta puro (beta1 = beta2). El sustituyente N-isopropilo elimina la afinidad alfa al encajar en el bolsillo hidrofóbico beta.
- **QFDOS-073 Isoetarina**: Primer agonista con selectividad beta2 > beta1; incorpora un resto etilo en posición alfa.
- **QFDOS-074 Salbutamol (Albuterol)**: Hito en el tratamiento del asma (Ventolin, 1969). Sustituye el 3-OH por un hidroximetilo (-CH2OH), bioisóstero resistente a la COMT. El grupo N-tert-butilo confiere alta selectividad beta2 bronquial.
- **QFDOS-075 (R)-Salbutamol (Levosalbutamol)**: Eutómero activo (R)-(-); afinidad beta2 unas 100 veces superior al distómero (S).
- **QFDOS-076 Normetanefrina**: Metabolito inactivo por O-metilación del fenol en C3 catalizada por COMT. Explica la rápida inactivación de las catecolaminas.
- **QFDOS-077 Salbutamol analogo hidroxietilico**: Análogo de estudio de REA (-CH2CH2OH). Demostró que el receptor tolera una región de unión tridimensional en volumen antes que un punto rígido.
- **QFDOS-078 Fenilefrina**: Agonista alfa1 selectivo directo. Conserva el 3-OH y el OH bencílico; no es sustrato de COMT al carecer del 4-OH. Descongestivo y vasopresor.
- **QFDOS-079 Nafazolina**: Agonista alfa directo heterocíclico (2-(1-naftilmetil)-2-imidazolina). Descongestivo tópico de acción prolongada.

### Bloque 5 — Antagonistas beta-adrenérgicos: evolución y cardioselectividad (QFDOS-080 a 084)
- **QFDOS-080 Dicloroisoproterenol (DCI)**: Primer bloqueante beta (Powell y Slater, 1958). Bioisóstero diclorado de la isoprenalina; agonista parcial con actividad simpaticomimética intrínseca (ASI).
- **QFDOS-081 Pronetalol**: Black (1962). Sustitución por 2-naftilo; bloqueante puro sin ASI, pero retirado por inducir tumores tímicos en ratones.
- **QFDOS-082 (S)-Propranolol**: Obra cumbre de James Black (1964; Premio Nobel 1988). Fundador de las ariloxipropanolaminas mediante el puente -OCH2-. Bloqueante puro, 10-20 veces más activo que pronetalol, no tumorígeno. Eutómero (S) debido a la inversión de prioridad CIP del oxímetilo. Bloqueante mixto beta1/beta2.
- **QFDOS-083 (R)-Propranolol**: Distómero. Baja afinidad beta pero conserva estabilización de membrana (efecto anestésico local/quinidínico).
- **QFDOS-084 Practolol**: Primer bloqueante beta1-cardioselectivo clínico (Eraldin). El grupo 4-acetamido (-NHCOCH3) establece enlaces de hidrógeno selectivos con el receptor beta1 cardíaco, seguro en pacientes con asma.

### Bloque 6 — Antagonistas alfa-adrenérgicos: heterociclos e inhibición irreversible (QFDOS-085 a 093)
- **QFDOS-085 Piperoxano**: Primer antagonista alfa sintético (Fourneau y Bovet, 1933; F 933). 1,4-benzodioxano con 2-piperidinometilo.
- **QFDOS-086 (S)-Prosimpal**: Eutómero activo (S)-(-) del 2-(dietilaminometil)-1,4-benzodioxano. Potencia 6 veces superior al distómero (R), demostrando estereoselectividad del bloqueo alfa.
- **QFDOS-087 (R)-Prosimpal**: Distómero (R)-(+).
- **QFDOS-088 Prazosina**: Antagonista alfa1 selectivo postsináptico (quinazolina dimetoxilada con furoilpiperazina). Vasodilatador sin taquicardia refleja (no bloquea alfa2 presinápticos).
- **QFDOS-089 Tolazolina**: 2-bencil-2-imidazolina vasodilatadora. Sorprendente par con la nafazolina (agonista naftílico frente a antagonista fenílico).
- **QFDOS-090 Fentolamina**: Antagonista alfa1/alfa2 competitivo potente. Fármaco diagnóstico de elección en feocromocitoma.
- **QFDOS-091 Yohimbina**: Alcaloide indólico pentacíclico. Antagonista selectivo prototipo de los autorreceptores alfa2 presinápticos; incrementa la liberación simpática de noradrenalina.
- **QFDOS-092 Fenoxibenzamina**: Antagonista alfa irreversible no competitivo de tipo beta-haloetilamina. Cicla espontáneamente a catión aziridinio electrofílico que alquila covalentemente el receptor alfa. Manejo del feocromocitoma.
- **QFDOS-093 Aziridinio de fenoxibenzamina**: Especie reactiva cuaternaria de 3 eslabones altamente tensionada; intermediario obligado del ataque nucleófilo irreversible.

---

## 3. Figuras Compuestas y Comparativas Didácticas (SAR)

Se han compilado 10 figuras compuestas para docencia y diapositivas:

1. `QFDOS_T2_bloque1_biosintesis_falsos_transmisores.png`: Panel 2x5 de la ruta biosintética desde L-tirosina hasta adrenalina, los falsos transmisores alfa-metilados y carbidopa.
2. `QFDOS_T2_bloque2_moduladores_almacenamiento_liberacion.png`: Panel comparativo de disulfiramo, reserpina, mediodespidina, rescinamina, guanidina y guanetidina.
3. `QFDOS_T2_bloque3_adrenergicos_indirectos_anfetaminas.png`: Panel 3x3 que ilustra el gradiente de lipofilia y penetración central (efedrinas frente a anfetaminas y fenterminas).
4. `QFDOS_T2_bloque4_agonistas_directos_salbutamol.png`: Serie de agonistas directos, bioisosterismo de salbutamol e imidazolinas.
5. `QFDOS_T2_bloque5_beta_bloqueantes_ariloxipropanolaminas.png`: Evolución histórica del bloqueo beta (DCI -> pronetalol -> propranolol -> practolol).
6. `QFDOS_T2_bloque6_alfa_bloqueantes.png`: Panorama integral de antagonistas alfa (benzodioxanos, prazosina, imidazolinas, yohimbina y fenoxibenzamina).
7. `QFDOS_T2_SAR_sustituyente_nitrogeno_alfa_vs_beta.png`: Noradrenalina (H) -> Adrenalina (Me) -> Isoprenalina (iPr) -> Salbutamol (tBu): el incremento del volumen sobre el nitrógeno como determinante de la selectividad beta frente a alfa.
8. `QFDOS_T2_estereoquimica_ariletanolaminas_vs_ariloxipropanolaminas.png`: Explicación estereoquímica de las reglas CIP: cómo (R)-noradrenalina y (S)-propranolol presentan idéntica conformación espacial activa en el receptor.
9. `QFDOS_T2_mecanismo_alquilacion_fenoxibenzamina.png`: Fenoxibenzamina y su catión aziridinio electrofílico responsable de la alquilación covalente irreversible.
10. `QFDOS_T2_moduladores_AADC_levodopa_carbidopa.png`: Moduladores e inhibidores de la DOPA descarboxilasa (AADC): sustrato fisiológico L-DOPA (QFDOS-047), sustrato/falso transmisor alfa-metildopa (QFDOS-052) e inhibidor suicida periférico carbidopa (QFDOS-094).

---

## 4. Verificación y Calidad

- **RDKit 2026.03.1**: Los 49 SMILES neutros y a pH 7.4 pasan validación estricta de valencia y kekulización sin advertencias.
- **ChEMBL v34**: Comprobación cruzada de identificadores oficiales, fórmulas y pesos moleculares.
- **Tipografía científica**: Notación limpia en Unicode (¹H RMN, α, β, Δ, pKa), sin delimitadores crudos de LaTeX.
