/**
 * Recepción y consulta de autoevaluaciones · QFDOS (Universidad de Granada)
 * Profesor: Dr. Juan José Díaz-Mochón
 *
 * Hoja: Respuestas_QFDOS
 *
 * Por qué hay un doGet
 * --------------------
 * La versión anterior sólo escribía. El alumno hacía el test, la nota llegaba
 * a la hoja, pero «Mis Calificaciones» leía el localStorage del navegador: al
 * entrar desde otro equipo con la misma cuenta no veía nada. Aquí se añade la
 * lectura, filtrada por correo, para que el historial viaje con la cuenta y no
 * con el navegador.
 *
 * Identidad
 * ---------
 * Cada petición lleva la sesión que emite Codigo.gs al iniciar sesión. Aquí
 * se comprueba su firma con el MISMO secreto, así que en este proyecto hay que
 * añadir también la propiedad SESION_SECRETO con idéntico valor:
 *   Configuración del proyecto (⚙️) → Propiedades de la secuencia de comandos
 *   Nombre: SESION_SECRETO   Valor: <el mismo que en Codigo.gs>
 *
 * Despliegue
 * ----------
 * Este script va vinculado a la hoja de calificaciones (Extensiones → Apps
 * Script desde la propia hoja). No se crea otro proyecto: se sustituye el
 * código del que ya existe, que conserva sus propiedades.
 *
 * Primera vez: Implementar > Nueva implementación > Aplicación web
 *   Ejecutar como:      Yo
 *   Quién tiene acceso: Cualquier usuario
 *
 * Al cambiar el código: Implementar > Gestionar implementaciones > ✏️ Editar
 *   > Versión: «Nueva versión» > Implementar. Así la URL /exec no cambia.
 *   Una «Nueva implementación» genera OTRA URL, y la web (que lleva la URL
 *   fija en googleSheetsService.ts) seguiría enviando a la antigua.
 * Guardar no basta: sin versión nueva, /exec sigue sirviendo el código viejo.
 */

var NOMBRE_HOJA = 'Respuestas_QFDOS';

var CABECERAS = [
  'Marca Temporal',
  'Apellidos y Nombre',
  'Correo UGR',
  'DNI / Matrícula',
  'Tema',
  'Título del Tema',
  'Modelo de Examen',
  'Nota Final (/10)',
  'Aciertos',
  'Total Preguntas',
  'Modo Evaluación',
  'Evaluador',
  'Detalle de Respuestas',
  'Cuenta verificada',
  'Corrección',
  'Id intento',
  'Respuestas'
];

// Posición (desde 0) de las columnas que se consultan por número
var COL_CORRECCION = 14;
var COL_ID_INTENTO = 15;
var COL_RESPUESTAS = 16;

/* ------------------------------------------------------------------ */
/* Sesión (misma lógica y mismo secreto que en Codigo.gs)              */
/* ------------------------------------------------------------------ */

function firmar_(texto) {
  var secreto = (PropertiesService.getScriptProperties().getProperty('SESION_SECRETO') || '').trim();
  if (secreto.length < 32) throw new Error('SESION_SECRETO no está configurado (mínimo 32 caracteres).');
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(texto, secreto)).replace(/=+$/, '');
}

/** { e: correo, r: rol, i: institucional, x: caducidad } o null. */
function verificarSesion_(sesion) {
  try {
    var partes = String(sesion || '').split('.');
    if (partes.length !== 2) return null;
    if (firmar_(partes[0]) !== partes[1]) return null;
    var relleno = partes[0] + '===='.slice(0, (4 - partes[0].length % 4) % 4);
    var datos = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(relleno)).getDataAsString('UTF-8'));
    if (!datos.e || !datos.x || datos.x < Math.floor(Date.now() / 1000)) return null;
    return datos;
  } catch (err) {
    return null;
  }
}

var SESION_INVALIDA = { ok: false, codigo: 'sesion_invalida', error: 'Sesión caducada o no válida. Vuelve a iniciar sesión.' };

/** Evita que Sheets interprete como fórmula lo que escribe el alumno. */
function textoSeguro_(v) {
  var t = String(v === undefined || v === null ? '' : v).slice(0, 50000);
  if (/^[=+@]/.test(t) || (/^-/.test(t) && isNaN(Number(t)))) return "'" + t;
  return t;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function hoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(NOMBRE_HOJA);
  if (!sheet) {
    sheet = ss.insertSheet(NOMBRE_HOJA);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(CABECERAS);
    sheet.getRange(1, 1, 1, CABECERAS.length)
      .setFontWeight('bold')
      .setBackground('#1e3a8a')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  } else if (sheet.getLastColumn() < CABECERAS.length) {
    // Hojas creadas antes de añadir «Cuenta verificada», «Id intento» o «Respuestas»
    sheet.getRange(1, 1, 1, CABECERAS.length).setValues([CABECERAS]).setFontWeight('bold');
  }
  return sheet;
}

/**
 * Devuelve los intentos de un correo concreto.
 *
 * Se exige el correo siempre: sin él no se devuelve nada. Así esta ruta no
 * sirve para volcar la clase entera, sólo para que cada cual recupere lo suyo.
 */
function misCalificaciones_(email) {
  var norm = String(email || '').toLowerCase().trim();
  if (!norm) return { ok: false, error: 'falta_email', intentos: [] };

  var sheet = hoja_();
  var ultima = sheet.getLastRow();
  if (ultima < 2) return { ok: true, intentos: [] };

  var filas = sheet.getRange(2, 1, ultima - 1, CABECERAS.length).getValues();
  var intentos = [];

  for (var i = 0; i < filas.length; i++) {
    var f = filas[i];
    if (String(f[2] || '').toLowerCase().trim() !== norm) continue;

    var detalle = [];
    try {
      detalle = JSON.parse(f[12] || '[]');
    } catch (err) {
      detalle = [];
    }

    intentos.push({
      // La fila identifica el intento de forma estable entre navegadores, que
      // es lo que permite fusionar con lo guardado en local sin duplicar.
      id: 'sheet_' + (i + 2),
      fila: i + 2,
      timestamp: String(f[0] || ''),
      studentName: String(f[1] || ''),
      studentEmail: String(f[2] || ''),
      studentDni: String(f[3] || ''),
      topicId: String(f[4] || ''),
      topicTitle: String(f[5] || ''),
      modelName: String(f[6] || ''),
      score: Number(f[7]) || 0,
      correctCount: Number(f[8]) || 0,
      totalQuestions: Number(f[9]) || 0,
      evaluationMode: String(f[10] || ''),
      evaluator: String(f[11] || ''),
      answersDetail: detalle,
      // Con esto el navegador sabe que su intento en cola ya consta
      idIntento: String(f[COL_ID_INTENTO] || ''),
      verificacionPendiente: /^pendiente/.test(String(f[COL_CORRECCION] || ''))
    });
  }

  intentos.reverse(); // el más reciente primero
  return { ok: true, intentos: intentos };
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.accion === 'misCalificaciones') {
    // El correo sale de la sesión; sólo el profesorado puede pedir el de otro
    var s = verificarSesion_(p.sesion);
    if (!s) return json_(SESION_INVALIDA);
    var correo = (s.r === 'profesor' && p.email) ? p.email : s.e;
    return json_(misCalificaciones_(correo));
  }
  if (p.accion === 'estadoClaves') {
    var sp = verificarSesion_(p.sesion);
    if (!sp) return json_(SESION_INVALIDA);
    if (sp.r !== 'profesor') return json_({ ok: false, error: 'Sólo el profesorado.' });
    return json_(estadoClaves_());
  }
  return json_({ ok: true, servicio: 'QFDOS · Calificaciones', version: 3, acciones: ['misCalificaciones', 'estadoClaves', 'publicar_claves', 'record_quiz_attempt'] });
}

/**
 * Modos de evaluación que puede registrar cada rol. «docente_sesion» es una
 * sesión dirigida por el profesor y solo lo puede escribir el profesorado:
 * antes cualquier alumno podía enviarlo y su intento aparecía como sesión
 * docente en la hoja. Cualquier valor desconocido se trata como intento de
 * alumno (o queda vacío si lo envía el profesorado).
 */
var MODOS_ALUMNO = ['alumno_evaluado', 'flashcards_autoevaluacion'];
var MODOS_PROFESOR = ['docente_sesion', 'alumno_evaluado', 'flashcards_autoevaluacion'];

function modoPermitido_(pedido, esProfesor) {
  var m = String(pedido || '');
  if (esProfesor) return MODOS_PROFESOR.indexOf(m) !== -1 ? m : '';
  return MODOS_ALUMNO.indexOf(m) !== -1 ? m : 'alumno_evaluado';
}


/* ------------------------------------------------------------------ */
/* Corrección en el servidor                                           */
/* ------------------------------------------------------------------ */

/**
 * Hasta ahora la nota la calculaba el navegador y el servidor se limitaba a
 * anotarla: cualquiera con la consola abierta podía enviar un 10. Ahora el
 * navegador manda además qué opción marcó en cada pregunta (`respuestas`:
 * [{ id, opcion }], con opcion = -1 si la dejó en blanco) y el servidor
 * corrige contra las claves que el profesor publica desde el panel
 * (pestaña oculta `_Claves`). La nota, los aciertos y el total que se anotan
 * son los del servidor; los del navegador se ignoran.
 *
 * Límite conocido: las preguntas se sirven con sus soluciones (el alumnado ve
 * la explicación al responder), así que un alumno decidido podría leer la
 * clave del código y enviar todas las respuestas correctas. Esto impide
 * falsificar la nota sin haber respondido, no sabérsela de antemano.
 *
 * Despliegue gradual con la propiedad EXIGIR_CORRECCION_SERVIDOR:
 *   ausente / distinta de '1' → si el intento no se puede corregir (navegador
 *     antiguo) se acepta como antes y la columna «Corrección» dice
 *     «cliente (sin verificar)».
 *   '1' → el alumnado solo puede registrar intentos corregidos aquí.
 *
 * Claves sin publicar
 * -------------------
 * Antes, con la corrección obligatoria, un test cuyas claves aún no estaban
 * publicadas se rechazaba y la nota se perdía: el alumno la veía en su
 * navegador y, al sincronizar el historial, desaparecía. Ahora el intento se
 * anota como «pendiente (faltan claves)» con sus respuestas (columna
 * «Respuestas») y se recorrige solo al publicar las claves. Hasta entonces la
 * nota que figura es la del navegador, marcada como pendiente.
 */
var HOJA_CLAVES = '_Claves';
var MAX_CLAVES = 5000;
var MAX_PREGUNTAS_INTENTO = 200;

function hojaClaves_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(HOJA_CLAVES);
  if (!hoja) {
    hoja = ss.insertSheet(HOJA_CLAVES);
    hoja.getRange(1, 1, 1, 3).setValues([['id', 'correcta', 'actualizadoEn']]).setFontWeight('bold');
    hoja.setFrozenRows(1);
    hoja.hideSheet();
  }
  return hoja;
}

/** { id: índice de la opción correcta } */
function leerClaves_() {
  var hoja = hojaClaves_();
  var claves = {};
  if (hoja.getLastRow() < 2) return claves;
  hoja.getRange(2, 1, hoja.getLastRow() - 1, 2).getValues().forEach(function (f) {
    if (f[0] !== '') claves[String(f[0])] = Number(f[1]);
  });
  return claves;
}

function exigirCorreccion_() {
  return (PropertiesService.getScriptProperties().getProperty('EXIGIR_CORRECCION_SERVIDOR') || '').trim() === '1';
}

function estadoClaves_() {
  var hoja = hojaClaves_();
  var n = Math.max(0, hoja.getLastRow() - 1);
  var cuando = '';
  if (n > 0) {
    var v = hoja.getRange(2, 3).getValue();
    cuando = (v instanceof Date) ? v.toISOString() : String(v || '');
  }
  return { ok: true, claves: n, actualizadoEn: cuando, exigir: exigirCorreccion_(), pendientes: contarPendientes_() };
}

/** Intentos anotados a la espera de que se publiquen sus claves. */
function contarPendientes_() {
  var sheet = hoja_();
  var ultima = sheet.getLastRow();
  if (ultima < 2) return 0;
  var n = 0;
  sheet.getRange(2, COL_CORRECCION + 1, ultima - 1, 1).getValues().forEach(function (f) {
    if (/^pendiente/.test(String(f[0] || ''))) n++;
  });
  return n;
}

/**
 * Corrige los intentos «pendiente» con las claves recién publicadas. Los que
 * siguen sin poder corregirse (pregunta que no está en las claves) se quedan
 * como estaban. Se llama con el cerrojo ya tomado.
 */
function recorregirPendientes_() {
  var sheet = hoja_();
  var ultima = sheet.getLastRow();
  if (ultima < 2) return { recorregidos: 0, pendientes: 0 };
  var filas = sheet.getRange(2, 1, ultima - 1, CABECERAS.length).getValues();
  var claves = leerClaves_();
  var hechos = 0;
  var quedan = 0;
  for (var i = 0; i < filas.length; i++) {
    var f = filas[i];
    if (!/^pendiente/.test(String(f[COL_CORRECCION] || ''))) continue;
    var respuestas = null;
    try { respuestas = JSON.parse(f[COL_RESPUESTAS] || 'null'); } catch (err) { respuestas = null; }
    var c = corregir_(respuestas, claves);
    if (!c.ok) { quedan++; continue; }
    var nota = Number((c.aciertos / c.total * 10).toFixed(1));
    var detalle = [];
    try { detalle = JSON.parse(f[12] || '[]'); } catch (err) { detalle = []; }
    if (Array.isArray(detalle) && detalle.length === c.aciertosPorPregunta.length) {
      detalle = detalle.map(function (d, j) {
        var copia = (d && typeof d === 'object') ? d : {};
        copia.isCorrect = c.aciertosPorPregunta[j];
        return copia;
      });
    }
    var fila = i + 2;
    var navegador = f[7];
    sheet.getRange(fila, 8, 1, 3).setValues([[nota, c.aciertos, c.total]]);
    sheet.getRange(fila, 13).setValue(textoSeguro_(JSON.stringify(detalle)));
    sheet.getRange(fila, COL_CORRECCION + 1).setValue(
      'servidor (recorregido' + (Number(navegador) !== nota ? '; el navegador decía ' + navegador : '') + ')'
    );
    hechos++;
  }
  return { recorregidos: hechos, pendientes: quedan };
}

/** Fila (desde 2) donde ya consta este intento, o 0. Evita duplicar al reenviar. */
function filaDeIntento_(sheet, idIntento) {
  if (!idIntento) return 0;
  var ultima = sheet.getLastRow();
  if (ultima < 2) return 0;
  var celda = sheet.getRange(2, COL_ID_INTENTO + 1, ultima - 1, 1)
    .createTextFinder(idIntento).matchEntireCell(true).findNext();
  return celda ? celda.getRow() : 0;
}

/** [{ id, opcion }] tal y como se guarda en «Respuestas», o '' si no vale. */
function respuestasParaGuardar_(respuestas) {
  if (!Array.isArray(respuestas) || !respuestas.length || respuestas.length > MAX_PREGUNTAS_INTENTO) return '';
  return JSON.stringify(respuestas.map(function (r) {
    r = r || {};
    return { id: String(r.id === undefined || r.id === null ? '' : r.id).slice(0, 80), opcion: Number(r.opcion) };
  }));
}

/**
 * Cerrojo sin excepción: con toda la clase entregando a la vez, waitLock
 * lanzaba «Lock timeout» y Apps Script devolvía una página de error en lugar
 * de JSON; el navegador no sabía si la nota había entrado.
 */
function tomarCerrojo_() {
  var lock = LockService.getScriptLock();
  return lock.tryLock(25000) ? lock : null;
}

var OCUPADO = { ok: false, status: 'error', codigo: 'ocupado', error: 'El servidor está ocupado. Se reintentará en unos segundos.' };

/** Sustituye todas las claves. Solo profesorado. */
function publicarClaves_(s, data) {
  if (s.r !== 'profesor') return json_({ ok: false, error: 'Sólo el profesorado puede publicar las claves.' });
  var claves = data.claves;
  if (!claves || typeof claves !== 'object' || Array.isArray(claves)) {
    return json_({ ok: false, error: 'Faltan las claves.' });
  }
  var ids = Object.keys(claves);
  if (!ids.length || ids.length > MAX_CLAVES) {
    return json_({ ok: false, error: 'Número de claves no válido (entre 1 y ' + MAX_CLAVES + ').' });
  }
  var ahora = new Date();
  var filas = [];
  for (var i = 0; i < ids.length; i++) {
    var idx = Number(claves[ids[i]]);
    if (!/^[\w.:\-]{1,80}$/.test(ids[i]) || idx !== Math.floor(idx) || idx < 0 || idx > 9) {
      return json_({ ok: false, error: 'Clave no válida en la pregunta «' + String(ids[i]).slice(0, 40) + '».' });
    }
    filas.push([ids[i], idx, ahora]);
  }
  var lock = tomarCerrojo_();
  if (!lock) return json_(OCUPADO);
  try {
    var hoja = hojaClaves_();
    if (hoja.getLastRow() > 1) hoja.getRange(2, 1, hoja.getLastRow() - 1, 3).clearContent();
    hoja.getRange(2, 1, filas.length, 3).setValues(filas);
    SpreadsheetApp.flush();
    var r = recorregirPendientes_();
    return json_({
      ok: true, claves: filas.length, actualizadoEn: ahora.toISOString(),
      recorregidos: r.recorregidos, pendientes: r.pendientes
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Corrige `respuestas` contra las claves. Devuelve
 *   { ok: true, aciertos, total, aciertosPorPregunta: [bool] }
 * o { ok: false, motivo: 'sin_respuestas' | 'respuestas_no_validas' | 'clave_desconocida' }.
 */
function corregir_(respuestas, clavesYaLeidas) {
  if (!Array.isArray(respuestas) || !respuestas.length) return { ok: false, motivo: 'sin_respuestas' };
  if (respuestas.length > MAX_PREGUNTAS_INTENTO) return { ok: false, motivo: 'respuestas_no_validas' };
  var claves = clavesYaLeidas || leerClaves_();
  var vistos = {};
  var aciertos = 0;
  var porPregunta = [];
  for (var i = 0; i < respuestas.length; i++) {
    var r = respuestas[i] || {};
    var id = String(r.id === undefined || r.id === null ? '' : r.id);
    var op = Number(r.opcion);
    if (!id || vistos.hasOwnProperty(id) || isNaN(op) || op !== Math.floor(op) || op < -1 || op > 9) {
      return { ok: false, motivo: 'respuestas_no_validas' };
    }
    vistos[id] = true;
    if (!claves.hasOwnProperty(id)) return { ok: false, motivo: 'clave_desconocida' };
    var acierto = op === claves[id];
    if (acierto) aciertos++;
    porPregunta.push(acierto);
  }
  return { ok: true, aciertos: aciertos, total: respuestas.length, aciertosPorPregunta: porPregunta };
}

var MENSAJES_CORRECCION = {
  sin_respuestas: 'Este intento no se puede corregir en el servidor. Recarga la página (Ctrl+F5) e inténtalo de nuevo.',
  respuestas_no_validas: 'Las respuestas enviadas no son válidas. Recarga la página (Ctrl+F5) e inténtalo de nuevo.'
};

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, status: 'error', error: 'JSON no válido.' });
  }

  // Sin sesión válida no se escribe nada. Antes se aceptaba el studentEmail
  // del cuerpo, y cualquiera podía anotar notas a nombre de otra persona.
  var s = verificarSesion_(data.sesion);
  if (!s) return json_(SESION_INVALIDA);
  if (data.action === 'publicar_claves') return publicarClaves_(s, data);

  // Un estudiante sólo registra intentos a su nombre. El profesorado puede
  // anotar el de otra persona (modo «Sesión docente»).
  var esProfesor = s.r === 'profesor';
  var correo = esProfesor && data.studentEmail ? String(data.studentEmail).toLowerCase().trim() : s.e;
  var modo = modoPermitido_(data.evaluationMode, esProfesor);

  var score = Number(data.score);
  var aciertos = Number(data.correctCount);
  var total = Number(data.totalQuestions);
  var detalle = data.answersDetail || [];
  var correccion = '';
  var idIntento = /^[\w.:\-]{1,80}$/.test(String(data.idIntento || '')) ? String(data.idIntento) : '';

  // Test (no autoevaluación de flashcards): la nota es la que sale de corregir aquí
  if (modo !== 'flashcards_autoevaluacion') {
    var c = corregir_(data.respuestas);
    if (c.ok) {
      var notaServidor = Number((c.aciertos / c.total * 10).toFixed(1));
      correccion = 'servidor';
      if (!isNaN(score) && Math.abs(score - notaServidor) > 0.05) correccion += ' (el navegador decía ' + score + ')';
      score = notaServidor;
      aciertos = c.aciertos;
      total = c.total;
      // El detalle también se ajusta a lo corregido, no a lo que afirme el navegador
      if (Array.isArray(detalle) && detalle.length === c.aciertosPorPregunta.length) {
        detalle = detalle.map(function (d, i) {
          var copia = (d && typeof d === 'object') ? d : {};
          copia.isCorrect = c.aciertosPorPregunta[i];
          return copia;
        });
      }
    } else if (c.motivo === 'clave_desconocida') {
      // Se anota y se recorrige al publicar las claves (ver recorregirPendientes_)
      correccion = 'pendiente (faltan claves)';
    } else if (!esProfesor && exigirCorreccion_()) {
      return json_({
        ok: false,
        status: 'error',
        codigo: 'correccion_no_verificable',
        error: MENSAJES_CORRECCION[c.motivo]
      });
    } else {
      correccion = 'cliente (sin verificar)';
    }
  }

  if (isNaN(score) || score < 0 || score > 10 || isNaN(aciertos) || isNaN(total) || aciertos < 0 || aciertos > total) {
    return json_({ ok: false, status: 'error', error: 'Calificación fuera de rango.' });
  }

  var lock = tomarCerrojo_();
  if (!lock) return json_(OCUPADO);

  try {
    var sheet = hoja_();

    // Reenvío de un intento que ya entró (respuesta perdida, cola del navegador)
    var yaEsta = filaDeIntento_(sheet, idIntento);
    if (yaEsta) {
      var previa = sheet.getRange(yaEsta, 1, 1, CABECERAS.length).getValues()[0];
      return json_({
        ok: true, status: 'success', fila: yaEsta, duplicado: true,
        correccion: String(previa[COL_CORRECCION] || ''),
        score: Number(previa[7]) || 0, correctCount: Number(previa[8]) || 0, totalQuestions: Number(previa[9]) || 0
      });
    }

    sheet.appendRow([
      textoSeguro_(data.timestamp || new Date().toLocaleString('es-ES')),
      textoSeguro_(data.studentName || 'Anónimo'),
      correo,
      textoSeguro_(data.studentDni || ''),
      textoSeguro_(data.topicId || ''),
      textoSeguro_(data.topicTitle || ''),
      textoSeguro_(data.modelName || ''),
      score,
      aciertos,
      total,
      modo,
      textoSeguro_(esProfesor ? (data.evaluator || '') : ''),
      textoSeguro_(JSON.stringify(detalle)),
      s.e,
      correccion,
      idIntento,
      modo !== 'flashcards_autoevaluacion' ? respuestasParaGuardar_(data.respuestas) : ''
    ]);

    return json_({
      ok: true, status: 'success', fila: sheet.getLastRow(),
      correccion: correccion, score: score, correctCount: aciertos, totalQuestions: total
    });
  } catch (err) {
    return json_({ ok: false, status: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
