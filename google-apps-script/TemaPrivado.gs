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
 * Falla cerrado: con la sesión inválida responde lo de siempre (`sesionInvalida_`);
 * con una sesión válida, cualquier fallo (no titular, ids sin configurar, error de
 * Drive, operación desconocida) devuelve la misma respuesta `no_disponible`.
 *
 * Nombres propios con prefijo temaPriv para no chocar con los del script vivo.
 * Usa del vivo solo: verificarSesion_, sesionInvalida_, propiedad_, json,
 * cuerpoJson_ (en la ruta) y examenesPrivadosAutorizado_.
 *
 * Operaciones (POST, cuerpo JSON { op, sesion, ... }):
 *   datos                 → { ok, datos: <contenido del JSON del Tema 7> }
 *   audioInfo             → { ok, tamano, trozos }
 *   audioTrozo { n }      → { ok, n, base64 }   (trozos de 1 MiB)
 */

var temaPrivTrozo_ = 1048576;

function temaPrivDenegado_() {
  return json({ ok: false, codigo: 'no_disponible', error: 'No disponible.' });
}

/**
 * PUNTO ÚNICO Y AISLADO de la decisión «¿es el titular?». Reutiliza la puerta de
 * `examenesPrivados` del script vivo (`examenesPrivadosAutorizado_`: sesión de
 * profesor institucional cuyo correo figura en la propiedad
 * EXAMENES_PRIVADOS_CORREOS). Esta acción no tiene lista ni propiedad de titular
 * propias. Si esa función no existe en el proyecto, falla cerrado.
 */
function esTitularTemaPrivado_(s) {
  return (typeof examenesPrivadosAutorizado_ === 'function') && examenesPrivadosAutorizado_(s) === true;
}

function temaPrivado(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (!esTitularTemaPrivado_(s)) return temaPrivDenegado_();

  var op = String(p.op || '');
  try {
    if (op === 'datos') {
      var idJson = propiedad_('TEMA7_PRIVADO_JSON_ID');
      if (!idJson) return temaPrivDenegado_();
      var texto = DriveApp.getFileById(idJson).getBlob().getDataAsString('UTF-8').trim();
      if (texto.charAt(0) !== '{') return temaPrivDenegado_();
      // Se compone el JSON a mano: evita parsear y volver a serializar ~1 MB
      return ContentService.createTextOutput('{"ok":true,"datos":' + texto + '}')
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (op === 'audioInfo' || op === 'audioTrozo') {
      var idMp3 = propiedad_('TEMA7_PRIVADO_MP3_ID');
      if (!idMp3) return temaPrivDenegado_();
      var bytes = DriveApp.getFileById(idMp3).getBlob().getBytes();
      var trozos = Math.ceil(bytes.length / temaPrivTrozo_);
      if (op === 'audioInfo') return json({ ok: true, tamano: bytes.length, trozos: trozos });
      var n = Number(p.n);
      if (!(n >= 0 && n < trozos) || n !== Math.floor(n)) return temaPrivDenegado_();
      var parte = bytes.slice(n * temaPrivTrozo_, (n + 1) * temaPrivTrozo_);
      return json({ ok: true, n: n, base64: Utilities.base64Encode(parte) });
    }
  } catch (err) {
    return temaPrivDenegado_();
  }
  return temaPrivDenegado_();
}
