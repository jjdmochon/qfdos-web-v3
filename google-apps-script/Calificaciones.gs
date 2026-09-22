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
  'Detalle de Respuestas'
];

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
    return json_(misCalificaciones_(p.email));
  }
  return json_({ ok: true, servicio: 'QFDOS · Calificaciones', acciones: ['misCalificaciones'] });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = hoja_();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('es-ES'),
      data.studentName || 'Anónimo',
      data.studentEmail || '',
      data.studentDni || '',
      data.topicId || '',
      data.topicTitle || '',
      data.modelName || '',
      data.score !== undefined ? data.score : '',
      data.correctCount !== undefined ? data.correctCount : '',
      data.totalQuestions || '',
      data.evaluationMode || '',
      data.evaluator || '',
      JSON.stringify(data.answersDetail || [])
    ]);

    return json_({ ok: true, status: 'success', fila: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, status: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
