// ==========================================================================
// Tema 6 · imágenes de opción del test sin la leyenda del nombre
//
// Las estructuras QFDOS-* del Tema 6 llevan impreso el nombre del fármaco en la
// franja inferior, y en las preguntas de identificar una estructura eso revela
// la respuesta. Para esas 31 hay una copia con esa franja en blanco
// (<nombre>-sin-leyenda.png: mismo tamaño y dibujo idéntico píxel a píxel).
// alfentanilo.png y dextropropoxifeno.png no llevan leyenda y se enseñan tal
// cual: nada de recortes por porcentaje, porque el anillo del
// dextropropoxifeno llega casi al borde inferior.
// ==========================================================================

const CON_LEYENDA = new Set([
  'QFDOS-299_morfina', 'QFDOS-302_3_acetilmorfina', 'QFDOS-304_6_acetilmorfina', 'QFDOS-305_heroina',
  'QFDOS-307_normorfina', 'QFDOS-311_hidromorfona', 'QFDOS-312_oximorfona', 'QFDOS-313_oxicodona',
  'QFDOS-315_nalorfina', 'QFDOS-316_naloxona', 'QFDOS-317_naltrexona', 'QFDOS-319_metilnaltrexona',
  'QFDOS-320_naloxegol', 'QFDOS-324_levorfanol', 'QFDOS-331_pentazocina', 'QFDOS-333_petidina',
  'QFDOS-334_cetobemidona', 'QFDOS-337_fentanilo', 'QFDOS-338_sufentanilo', 'QFDOS-339_remifentanilo',
  'QFDOS-341_metadona', 'QFDOS-343_tramadol', 'QFDOS-348_nitrilo_de_la_petidina', 'QFDOS-357_tebaina',
  'QFDOS-360_tevinona', 'QFDOS-365_etorfina', 'QFDOS-367_buprenorfina', 'QFDOS-369_met_encefalina',
  'QFDOS-370_leu_encefalina', 'QFDOS-371_damgo', 'QFDOS-372_difelikefalina'
]);

const SIN_LEYENDA_DE_ORIGEN = new Set(['alfentanilo', 'dextropropoxifeno']);

const CARPETA = 'estructuras/tema-06/';

/**
 * Imagen que se enseña de una opción del Tema 6 antes de responder: la copia
 * sin leyenda, o el original si no la llevaba. Para cualquier otra imagen
 * devuelve undefined y todo sigue como estaba.
 */
export function opcionTema6AntesDeResponder(ruta: string): string | undefined {
  const r = ruta.replace(/^\//, '');
  if (!r.startsWith(CARPETA) || !r.endsWith('.png')) return undefined;
  const nombre = r.slice(CARPETA.length, -'.png'.length);
  if (CON_LEYENDA.has(nombre)) return `${CARPETA}${nombre}-sin-leyenda.png`;
  if (SIN_LEYENDA_DE_ORIGEN.has(nombre)) return r;
  return undefined;
}
