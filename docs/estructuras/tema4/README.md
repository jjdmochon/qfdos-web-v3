# Estructuras químicas QFDOS: Tema 4, Serotonina

71 compuestos, `QFDOS-170` a `QFDOS-240`, extraídos de las diapositivas del borrador del Tema 4 (imágenes ChemDraw
de `QFII.04_assets`, exportadas en `Draft Presentaciones/Tema 04/assets`) y redibujados con RDKit.
Para regenerarlo todo: `python generar_tema4_completo.py` (RDKit, Pillow, openpyxl). La verificación contra
ChEMBL usa la caché `chembl_tema4.json` y solo consulta la red para InChIKey nuevos.

## En la web

Esta carpeta lleva el maestro (`estructuras_qfdos.csv`), las propiedades (`propiedades_qfdos.csv`), el Excel con las
estructuras embebidas, la caché de ChEMBL y el generador. Las carpetas `img/`, `svg/` y `slide/` y las figuras
`QFDOS_T4_*.png` se quedan en Drive: el generador las rehace en un minuto. En la plataforma, los tres primeros
ficheros y el script aparecen como adjuntos del Tema 4 visibles solo para el profesorado.

## Bloques

| Bloque | ids | Contenido |
|---|---|---|
| 1. Antidepresivos tricíclicos | 170-179 | síntesis de la imipramina (o-nitrotolueno → iminodibencilo), clorpromazina, imipramina, desipramina, opipramol, amitriptilina |
| 2. IMAO | 180-185 | isoniazida, iproniazida, pargilina, clorgilina, meclobemida, tiramina |
| 3. Serotonina | 186-191 | triptófano, 5-HTP, serotonina, 5-HIAA, N-acetilserotonina, melatonina |
| 4. ISRS | 192-195 | fluoxetina, citalopram, escitalopram, sertralina |
| 5. Ergolinas y triptanes | 196-205 | ergolina, LSD, metisergida, serie de diseño del sumatriptán (5-CT y dos intermedios), sumatriptán, zolmitriptán, almotriptán, lasmiditán |
| 6. Fischer y síntesis del sumatriptán | 206-211 | fenilhidrazina e intermedios |
| 7. Agonistas 5-HT1A | 212-215 | 8-OH-DPAT, buspirona, ipsapirona, 1-PP |
| 8. Antagonistas 5-HT3 | 216-224 | cocaína, tropina, tropisetrón, granisetrón, ondansetrón, palonosetrón, metoclopramida, intermedios del ondansetrón |
| 9. Ejercicio 4.4 | 225-231 | síntesis de la ciproheptadina (compuestos 1 a 6) |
| 10. Ejercicio 4.7 | 232-240 | síntesis del almotriptán (compuestos 16 a 19 e intermedios) |

Mismo criterio que en los Temas 2 y 3: cada tema es autónomo, así que clorpromazina (176) y metoclopramida (222)
se repiten con id nuevo y notas propias. Escitalopram, lasmiditán y palonosetrón no estaban en el borrador; se
añaden como referencia actual.

## Salidas

- `estructuras_qfdos.csv`: maestro del tema. Respecto al Tema 3 añade la columna `estado_regulatorio`.
- `propiedades_qfdos.csv` y `estructuras_qfdos.xlsx`: descriptores RDKit (MW, logP, TPSA, CIP, InChIKey, Lipinski,
  QED) y la columna `chembl_verificacion`.
- `img/`: PNG con rótulo; los acentos se ven bien porque el dibujo usa la fuente TTF del sistema.
- `svg/`: las mismas estructuras en vectorial.
- `slide/`: PNG transparentes, sin rótulo y con longitud de enlace fija, para que todas las diapositivas compartan escala.
  Paleta QFDOS: carbono y enlaces en azul marino, N teal oscuro.
- `QFDOS_T4_*.png`: figuras por bloque con el distintivo de estado regulatorio de cada fármaco.
- `estado_regulatorio_farmacos_tema4.md`: qué sigue en uso, qué se retiró y qué nunca llegó al mercado.

## Verificación

- ChEMBL respondió esta vez: 50 compuestos coinciden por InChIKey exacto, todos los fármacos incluidos. La
  estereoquímica queda así confirmada en sertralina (1S,4S), escitalopram (S), zolmitriptán (S), LSD (5R,8R),
  metisergida, cocaína, tropisetrón (endo) y palonosetrón (3aS,3S).
- La tropina (217) solo coincide por conectividad. Tiene la misma configuración endo que el tropisetrón, que sí
  coincide exactamente.
- Los intermedios de síntesis (200, 201, 207-211, 223, 227, 229, 230, 233-240) no están en ChEMBL. Se comprobaron por
  fórmula y CIP. Varios no tienen CAS.
- La ergolina (196) se guarda como (5R,10R), la configuración natural; ChEMBL no la recoge.
- En el palonosetrón, RDKit marca dos «centros sin definir»: son la cabeza de puente C4 y el N de la quinuclidina,
  que no son estereocentros reales.

## Errores del borrador corregidos en las estructuras

| Diapositiva | Error | Corrección |
|---|---|---|
| Serotonina | La «melatonina» era N-acetilserotonina (5-OH) | Melatonina = N-acetil-5-metoxitriptamina (191); se añade la N-acetilserotonina (190) |
| IMAO | Meclobemida con F | Lleva Cl: 4-cloro-N-(2-morfolinoetil)benzamida |
| Ergolinas | LSD dibujado como dimetilamida (CONMe₂) | Dietilamida |
| 5-HT1A | Buspirona sin los dos C=O de la imida | 8-azaspiro[4.5]decano-7,9-diona |
| 5-HT3 | Tropisetrón con el CO₂Me de la cocaína | Éster indol-3-carboxílico de la tropina, sin CO₂Me |
| Sumatriptán | Mecanismo de aminación reductora vía R–N(CH₂OH)₂ reducido por NaBH₄ | El hidruro reduce el ion iminio; dos ciclos |
