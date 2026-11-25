/**
 * Vista docente privada del Tema 7: tests, flashcards y podcast.
 *
 * El contenido NO está en el repositorio ni en la web. Vive en dos ficheros de
 * una carpeta privada de Drive (sin enlace compartido) y este script solo los
 * entrega a la sesión del profesor titular.
 *
 * Fichero aparte para no pisar Codigo.gs al pegar: usa de Codigo.gs
 * `verificarSesion_`, `sesionInvalida_`, `cuerpoJson_`, `propiedad_` y `json`.
 *
 * Alta (una vez, en el proyecto de Apps Script):
 *   1. Pega este fichero como TemaPrivado.gs.
 *   2. En `manejar` de Codigo.gs, junto a las demás acciones, añade:
 *        if (accion === 'temaPrivado') return temaPrivado(cuerpoJson_(e));
 *      (y 'temaPrivado' en la lista `acciones` si quieres verla en el GET de estado).
 *   3. Propiedades del script (Configuración del proyecto → Propiedades):
 *        TEMA7_PRIVADO_JSON_ID  id del fichero JSON del Tema 7 en Drive
 *        TEMA7_PRIVADO_MP3_ID   id del MP3 del podcast en Drive
 *   4. Gestionar implementaciones → ✏️ → Nueva versión (nunca «Nueva implementación»).
 *
 * Falla cerrado: con una sesión inválida, un rol distinto de profesor, una cuenta no
 * institucional o sin los ids configurados, la respuesta no dice cuál falló
 * (sesión inválida: la de siempre; el resto: `no_disponible`).
 *
 * Operaciones (POST, cuerpo JSON { op, sesion, ... }):
 *   datos                 → { ok, datos: <contenido del JSON del Tema 7> }
 *   audioInfo             → { ok, tamano, trozos }
 *   audioTrozo { n }      → { ok, n, base64 }   (trozos de 1 MiB)
 */

var TEMA_PRIVADO_TROZO = 1048576;

function temaPrivadoNo_() {
  return json({ ok: false, codigo: 'no_disponible', error: 'No disponible.' });
}

/**
 * PUNTO ÚNICO Y AISLADO de la decisión «¿es el titular?». Es lo único que hay que
 * sustituir para igualar la comprobación de `examenesPrivados`; nada más del
 * fichero depende de cómo se decida.
 *
 * Lógica provisional, NO definitiva: la sesión firmada lleva rol 'profesor' si el
 * correo de Google figura en `listaProfesores_()` y la cuenta es institucional
 * (ver `emitirSesion_` en Codigo.gs). Eso admite a cualquier profesor.
 */
function esTitularTemaPrivado_(s) {
  return !!s && s.r === 'profesor' && s.i === true;
}

function temaPrivado(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (!esTitularTemaPrivado_(s)) return temaPrivadoNo_();

  var op = String(p.op || '');
  try {
    if (op === 'datos') {
      var idJson = propiedad_('TEMA7_PRIVADO_JSON_ID');
      if (!idJson) return temaPrivadoNo_();
      var texto = DriveApp.getFileById(idJson).getBlob().getDataAsString('UTF-8').trim();
      if (texto.charAt(0) !== '{') return temaPrivadoNo_();
      // Se compone el JSON a mano: evita parsear y volver a serializar ~1 MB
      return ContentService.createTextOutput('{"ok":true,"datos":' + texto + '}')
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (op === 'audioInfo' || op === 'audioTrozo') {
      var idMp3 = propiedad_('TEMA7_PRIVADO_MP3_ID');
      if (!idMp3) return temaPrivadoNo_();
      var bytes = DriveApp.getFileById(idMp3).getBlob().getBytes();
      var trozos = Math.ceil(bytes.length / TEMA_PRIVADO_TROZO);
      if (op === 'audioInfo') return json({ ok: true, tamano: bytes.length, trozos: trozos });
      var n = Number(p.n);
      if (!(n >= 0 && n < trozos) || n !== Math.floor(n)) return temaPrivadoNo_();
      var parte = bytes.slice(n * TEMA_PRIVADO_TROZO, (n + 1) * TEMA_PRIVADO_TROZO);
      return json({ ok: true, n: n, base64: Utilities.base64Encode(parte) });
    }
  } catch (err) {
    return temaPrivadoNo_();
  }
  return temaPrivadoNo_();
}
