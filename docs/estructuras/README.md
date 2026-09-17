# Estructuras químicas QFDOS — base de datos del curso

Repositorio de estructuras del curso de Química Farmacéutica (QFDOS), pensado para
crecer bloque a bloque a lo largo del curso.

## Ficheros

| Fichero | Qué es | Se edita a mano |
|---|---|---|
| `estructuras_qfdos.csv` | **Fichero maestro** (el campo `notas` va entrecomillado porque lleva comas; si se edita a mano hay que conservar las comillas, y el pipeline avisa y recompone si faltan). Una fila por estructura: id, nombres, tema, familia, SMILES neutro, SMILES de la especie predominante a pH 7.4, CAS, ChEMBL ID y notas docentes. | **Sí** |
| `generar_propiedades.py` | Pipeline RDKit: valida SMILES, calcula descriptores, dibuja las estructuras y exporta CSV + XLSX. | No |
| `propiedades_qfdos.csv` | Salida: tabla completa de descriptores. | No (se regenera) |
| `estructuras_qfdos.xlsx` | Salida: hoja *Propiedades* (filtrable) + hoja *Estructuras* con las imágenes embebidas. | No (se regenera) |
| `img/` | Salida: PNG individual por estructura + collage por bloque, listos para diapositivas. | No (se regenera) |

## Flujo de trabajo para añadir estructuras

1. Añadir filas al final de `estructuras_qfdos.csv` respetando la numeración `QFDOS-0xx`.
2. Ejecutar:

   ```
   python generar_propiedades.py
   ```

3. Se regeneran `propiedades_qfdos.csv`, `estructuras_qfdos.xlsx` y las imágenes.

Requisitos: `pip install rdkit pandas openpyxl`

## Descriptores calculados

SMILES canónico, fórmula molecular, MW, masa monoisotópica exacta, carga formal,
carga neta a pH 7.4, logP (Crippen), refractividad molar, TPSA, HBD, HBA, enlaces
rotables, átomos pesados, anillos totales y aromáticos, fracción Csp3, QED,
estereocentros con descriptor CIP, InChI, InChIKey y violaciones de la regla de
Lipinski.

Sobre el recuento de centros sin definir: se excluye el fósforo, porque RDKit marca como
potencialmente estereogénicos los P de fosfatos y pirofosfatos (el par =O / -OH es
intercambiable por ionización y tautomería) y no son centros reales. Solo cuentan carbono y
nitrógeno.

Nota docente sobre el atracurio: con carga +2 permanente el logP de Crippen (8.07) carece de
sentido físico y las tres violaciones de Lipinski no predicen nada, porque el fármaco se
administra por vía intravenosa y actúa en la unión neuromuscular. Es el contraejemplo más
claro de la tabla frente a la lectura mecánica de los descriptores.

Nota docente: la regla de los cinco se incluye como referencia comparativa. Los
neurotransmisores endógenos son sustratos de transportadores y no fármacos orales,
de modo que su cumplimiento formal de Lipinski no predice biodisponibilidad oral
(dopamina cumple los cuatro criterios y no atraviesa la barrera hematoencefálica).

## Convenio de SMILES

- Columna `smiles`: forma neutra, con estereoquímica explícita cuando procede.
  Excepción: acetilcolina se almacena como catión, por ser amonio cuaternario permanente.
- Columna `smiles_ph74`: microespecie mayoritaria a pH 7.4 (zwitteriones, amonios
  protonados, carboxilatos y sulfonato desprotonados). Sirve para discutir en clase
  la diferencia entre la estructura "de libro" y la especie real en fluido biológico.

## Verificación

Cada bloque se contrasta contra ChEMBL v34 (SMILES, InChIKey, fórmula, MW, logP, TPSA) y la
estereoquímica se confirma con el descriptor CIP calculado por RDKit, no asumido.

- Bloque 1: coincidencia exacta en las nueve estructuras. CIP: L-Glu (S), L-Asp (S),
  noradrenalina (R).
- Bloque 2: MW, logP, TPSA y QED coinciden con ChEMBL en las cinco estructuras. CIP:
  metacolina (R) y (S) como imágenes especulares; muscarina (2S,4R,5S), la L-(+)-muscarina
  natural. Carbacol y betanecol se almacenan como catión (CHEMBL965 y CHEMBL1482); ChEMBL
  guarda además las sales de cloruro con id propio (CHEMBL14, CHEMBL1768).
- Bloque 3: atropina coincide exactamente con CHEMBL517712 (MW, logP, TPSA, QED, InChIKey),
  incluido el centro alfa sin definir que marca el racemato. La escopolamina no tiene en
  ChEMBL una entrada de base libre con la estereoquímica natural, así que su configuración se
  derivó mecánicamente de la (-)-N-metilescopolamina (CHEMBL376897) retirando un N-metilo con
  RDKit: el InChIKey resultante (STECJAGHUSJQJN-FWXGHANASA-N) coincide con el SMILES
  almacenado. Campo `chembl_id` vacío a propósito.

El campo `estereocentros_cip` señala los centros presentes pero sin configuración definida.
Cubre dos casos distintos: racematos de carbono (atropina, betanecol) y nitrógenos
estereogénicos que la fuente no resuelve (el N-óxido de la genatropina, el amonio cuaternario
de la butilescopolamina). El recuento no distingue entre ambos; la naturaleza del centro
está en la columna `notas`.

Derivados N del bloque 3: metilescopolamina, butilescopolamina, metilatropina y genatropina
coinciden exactamente con ChEMBL (MW, logP, TPSA, InChIKey). La genescopolamina no tiene
entrada en ChEMBL y se construyó añadiendo el N-óxido a la escopolamina con RDKit; el mismo
procedimiento aplicado a la atropina reproduce exactamente CHEMBL2146145, lo que valida el
método. Pendiente de confirmar que el nombre comercial Genescopolamina designa realmente al
N-óxido: se asume por analogía con Genatropina, cuyo sinónimo sí figura en ChEMBL.
  Aviso: ChEMBL almacena la metacolina sin estereoquímica (CHEMBL978 es el catión plano),
  de modo que ese id es común a los dos enantiómeros. Sin CAS enantiopuro verificado para
  (R)- y (S)-metacolina ni para muscarina: los campos quedan vacíos a propósito en lugar de
  rellenarse con un número no comprobado.

## Bloques cargados

- **Bloque 1 — Neurotransmisores (QFDOS-001 a 009)**: acetilcolina, ácido L-glutámico,
  ácido L-aspártico, GABA, glicina, taurina, noradrenalina, dopamina, serotonina.
- **Bloque 2 — Agonistas colinérgicos (QFDOS-010 a 014)**: (R)-metacolina, (S)-metacolina,
  muscarina, carbacol, betanecol.
  Figuras: `img/QFDOS_bloque2_agonistas_colinergicos.png` (acetilcolina frente a metacolina y
  muscarina) y `img/QFDOS_SAR_esteres_carbamatos_colina.png` (matriz 2 x 2 éster/carbamato
  frente a presencia o ausencia de metilo en beta).
- **Bloque 3 — Antagonistas muscarínicos (QFDOS-015 a 022)**: atropina, escopolamina,
  metilescopolamina, genescopolamina, butilescopolamina, metilatropina, genatropina, ipratropio.
  Figuras: `img/QFDOS_bloque3_antimuscarinicos_tropanicos.png` (atropina frente a
  escopolamina) y `img/QFDOS_bloque3_modificaciones_nitrogeno_tropanico.png` (las dos series
  con la misma modificación sobre el nitrógeno: amina terciaria, N-alquilo cuaternario, N-óxido).
- **Bloque 4 — Anticolinesterásicos, reactivadores y bloqueo neuromuscular (QFDOS-023 a 026)**:
  fisostigmina, neostigmina, pralidoxima, atracurio.
  Figura: `img/QFDOS_bloque4_anticolinesterasicos.png`.
- **Bloque 5 — Biosíntesis colinérgica (QFDOS-027)**: acetil coenzima A.
- **Bloque 6 — Antimuscarínicos sintéticos (QFDOS-028 a 035)**: adifenina, benactizina,
  propantelina, piperidolato, ciclopentolato, trihexifenidilo, isopropamida y su yoduro.
  Figuras: `img/QFDOS_bloque6_antimuscarinicos_sinteticos.png` (con la atropina como
  referencia) y `img/QFDOS_bloque6_variaciones_farmacoforo.png` (seis variaciones sobre el
  mismo farmacóforo: ciclar el aminoalcohol, añadir el OH, quitar el éster, cuaternizar).
- **Bloque 7 — Antimuscarínicos centrales (QFDOS-036, 039, 040)**: benztropina, biperideno,
  prociclidina. Figura: `img/QFDOS_aminopropanoles_antiparkinsonianos.png` (trihexifenidilo,
  prociclidina y biperideno: tres variaciones sobre el mismo aminopropanol, con TPSA idéntica).
- **Bloque 8 — Placa motora (QFDOS-037)**: succinilcolina.
- **QFDOS-038 pilocarpina** se suma al bloque 2 (agonistas colinérgicos). Figura:
  `img/QFDOS_agonistas_muscarinicos_naturales.png` (muscarina cuaternaria frente a pilocarpina,
  base terciaria: mismo efecto, distinto acceso). Figura:
  `img/QFDOS_placa_motora_despolarizante_vs_no.png` (acetilcolina, succinilcolina y atracurio:
  agonista fisiológico, bloqueante despolarizante y bloqueante competitivo).
  **Pendiente: tubocurarina** — no se ha añadido porque ChEMBL estaba caído el 2026-09-16 y
  no se escribe de memoria un esqueleto bis-bencilisoquinolínico con dos puentes éter y dos
  estereocentros. Ver el aviso del piperidolato más abajo. Figura:
  `img/QFDOS_antimuscarinicos_centrales.png` (atropina, benztropina y trihexifenidilo,
  con el gradiente de TPSA 49.77 → 12.47 → 23.47 que explica el acceso al SNC).
  Figuras: `img/QFDOS-027_acetil_coenzima_a.png` (apaisada) y
  `img/QFDOS_biosintesis_acetilcolina_colina_ach.png` (colina y acetilcolina, los dos extremos
  de la reacción de la ChAT).
