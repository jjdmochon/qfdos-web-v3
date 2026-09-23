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
 * Implementar > Nueva implementación > Aplicación web
 *   Ejecutar como:      Yo
 *   Quién tiene acceso: Cualquier usuario
 * Guardar no basta: hay que crear una implementación nueva para que el cambio
 * salga a la URL /exec.
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
  'Cuenta verificada'
];

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
    // Hojas creadas antes de añadir «Cuenta verificada»
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
      answersDetail: detalle
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
  return json_({ ok: true, servicio: 'QFDOS · Calificaciones', acciones: ['misCalificaciones'] });
}

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, status: 'error', error: 'JSON no válido.' });
  }

  var s = verificarSesion_(data.sesion);
  if (!s) return json_(SESION_INVALIDA);

  // Un estudiante sólo registra intentos a su nombre. El profesorado puede
  // anotar el de otra persona (modo «Sesión docente»).
  var esProfesor = s.r === 'profesor';
  var correo = esProfesor && data.studentEmail ? String(data.studentEmail).toLowerCase().trim() : s.e;
  var modo = esProfesor ? (data.evaluationMode || '') : 'alumno_evaluado';

  var score = Number(data.score);
  var aciertos = Number(data.correctCount);
  var total = Number(data.totalQuestions);
  if (isNaN(score) || score < 0 || score > 10 || isNaN(aciertos) || isNaN(total) || aciertos < 0 || aciertos > total) {
    return json_({ ok: false, status: 'error', error: 'Calificación fuera de rango.' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var sheet = hoja_();
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
      textoSeguro_(JSON.stringify(data.answersDetail || [])),
      s.e
    ]);

    return json_({ ok: true, status: 'success', fila: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, status: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
