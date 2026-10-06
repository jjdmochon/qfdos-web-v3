# Estructuras químicas QFDOS — Tema 3: Dopamina

43 compuestos, `QFDOS-127` a `QFDOS-169`, extraídos de las 31 diapositivas del borrador del Tema 3.
Regenerar todo con `python generar_tema3_completo.py` (RDKit).

## Bloques

| Bloque | ids | Contenido |
|---|---|---|
| 1. Análogos conformacionalmente restringidos | 127–130 | epinina, ADTN, apomorfina, morfina (precursor de la transposición) |
| 2. Profármacos de la dopamina | 131–135 | benserazida, dipivaloildopamina, doble profármaco dihidropiridínico, piridinio retenido, trigonelina |
| 3. MAO-B, COMT y liberadores | 136–141 | (R)/(S)-selegilina, rasagilina, tolcapona, amantadina, N-(1-adamantil)acetamida (Ritter) |
| 4. Neurolépticos tricíclicos | 142–154 | fenotiazina, intermedios de síntesis, prometazina, clorpromazina, levomepromazina, carfenazina, flufenazina y sus ésteres depot, hidroxietilpiperazina, clorprotixeno (Z), estructura 1 del ej. 3.3 |
| 5. Butirofenonas y análogos | 155–164 | petidina, análogo butirofenónico, haloperidol y sus intermedios, droperidol, pimozida, trifluperidol |
| 6. Ortopramidas | 165–166 | o-metoxiprocainamida, metoclopramida |
| 7. Dopamina: fármaco y diana | 167–169 | dopamina, L-DOPA, carbidopa (repetidas de temas previos con notas propias del Tema 3) |

Criterio (igual que en Tema 2): cada tema es autónomo, así que las moléculas centrales se repiten con id nuevo y
notas propias: dopamina 167 (= 008/048), L-DOPA 168 (= 047), carbidopa 169 (= 094). α-Metildopa (052) y
metanfetamina (068) solo se citan; la metanfetamina entra por referencia en la figura de MAO-B.

## Convenios aplicados

- `smiles_ph74`: aminas alifáticas protonadas; piperazinas monoprotonadas (pKa2 ≈ 3–4); tolcapona como fenolato orto-nitro (pKa ≈ 4.5).
  Selegilina (pKa ≈ 7.5) y tetrahidropiridina del droperidol (≈ 7.6) quedan protonadas pero con fracción neutra relevante.
- Estereoquímica confirmada por CIP de RDKit: apomorfina (6aR), morfina natural, (R)-selegilina, (R)-rasagilina, (R)-levomepromazina, clorprotixeno (Z).
  Prometazina, ADTN, benserazida y estructura 1 se guardan sin definir (racémicos).
- Catión permanente (134) y betaína (135) siguen el convenio de amonios cuaternarios / zwitteriones.

## Verificación pendiente

ChEMBL devolvió error 500 durante toda la sesión (6-oct-2026) y PubChem no es accesible desde el entorno:
**`chembl_id` va vacío en las filas 127–166** (167–169 heredan los ids verificados en Tema 2). Los InChIKey de los fármacos principales (haloperidol, clorpromazina,
flufenazina, prometazina, levomepromazina, clorprotixeno, apomorfina, morfina, selegilina, rasagilina,
tolcapona, amantadina, droperidol, pimozida, metoclopramida) coinciden con los de referencia conocidos, pero
falta el cruce formal. CAS de intermedios a confirmar. **NADP+** (diapositiva 6) no se ha añadido: no se escribe
de memoria sin poder contrastarlo.

## Figuras `QFDOS_T3_*.png`

análogos restringidos · levodopa + inhibidores AADC · inversión de polaridad · MAO-B/COMT/amantadina ·
fenotiazinas y tioxantenos · síntesis de clorpromazina · ésteres depot · ejercicio 3.3 · de petidina a
haloperidol · síntesis del haloperidol · butirofenonas y difenilbutilpiperidinas · ortopramidas.
