/**
 * Servicio de Integración con Google Sheets (Google Apps Script Web App)
 * Permite registrar de forma desatendida las calificaciones y respuestas de los alumnos
 * en una hoja de cálculo de Google Sheets oficial para evaluación continua.
 */

import { QuizRegistrationRecord } from '../data/qfdosData';

const STORAGE_KEY_WEBHOOK = 'qfdos_google_sheets_webhook_url';

/**
 * Hoja oficial de calificaciones del Grupo E (Tema 1 en adelante).
 *
 * El alumnado abre la web sin variables de entorno ni configuracion previa, asi
 * que el destino tiene que venir cocido en el propio bundle. Si esto queda
 * vacio, el examen se guarda solo en el navegador del alumno y el profesor no
 * recibe nada.
 */
export const OFICIAL_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbyUQO79DKtdayKwgysYIt1vodx2ZtZUOjSAV9U4QOpSNmFTF5340ek8jmwrfKW7EfVU/exec';

export const OFICIAL_SHEETS_DOC_ID = '1ha8QIAHQqK7PFm0wQJfeSsG3Y24_vovAlphvVfR7gME';

export const OFICIAL_SHEETS_DOC_URL =
  `https://docs.google.com/spreadsheets/d/${OFICIAL_SHEETS_DOC_ID}/edit`;

/**
 * Obtiene la URL configurada para Google Apps Script.
 */
export function getGoogleSheetsUrl(): string {
  const custom = localStorage.getItem(STORAGE_KEY_WEBHOOK);
  if (custom && custom.trim().length > 0) {
    return custom.trim();
  }
  return (import.meta.env.VITE_GOOGLE_SHEETS_URL as string) || OFICIAL_SHEETS_WEBHOOK_URL;
}

/**
 * Guarda una nueva URL de Webhook de Google Apps Script.
 */
export function setGoogleSheetsUrl(url: string): void {
  if (url && url.trim().length > 0) {
    localStorage.setItem(STORAGE_KEY_WEBHOOK, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_WEBHOOK);
  }
}

export interface GoogleSheetsSubmissionResult {
  success: boolean;
  message: string;
  /**
   * `sent` significa que la fila se ha visto en la hoja, no sólo que se envió.
   * `sent_unconfirmed` es lo que queda cuando el envío salió pero no se ha
   * podido releer: es el estado honesto mientras el despliegue no exponga la
   * lectura.
   */
  status: 'sent' | 'sent_unconfirmed' | 'no_url' | 'network_error';
}

/**
 * Envía el registro del intento a Google Sheets vía POST.
 * Emplea mode: 'no-cors' para garantizar compatibilidad con los 302 redirects de Google Apps Script.
 */
export async function submitAttemptToGoogleSheets(
  attempt: QuizRegistrationRecord
): Promise<GoogleSheetsSubmissionResult> {
  const url = getGoogleSheetsUrl();

  if (!url) {
    console.info('[GoogleSheetsService] No hay URL de Webhook configurada. El intento queda registrado solo en local.');
    return {
      success: false,
      status: 'no_url',
      message: 'No se ha configurado la URL de Google Sheets. El intento se ha guardado localmente en tu dispositivo.'
    };
  }

  const payload = {
    action: 'record_quiz_attempt',
    timestamp: attempt.timestamp,
    studentName: attempt.studentName,
    studentEmail: attempt.studentEmail,
    studentDni: attempt.studentDni,
    topicId: attempt.topicId,
    topicNumber: attempt.topicNumber,
    topicTitle: attempt.topicTitle,
    modelName: attempt.modelName,
    score: attempt.score,
    correctCount: attempt.correctCount,
    totalQuestions: attempt.totalQuestions,
    evaluator: attempt.evaluator,
    evaluationMode: attempt.evaluationMode,
    answersDetail: (attempt.answersDetail ?? []).map(a => ({
      num: a.questionNumber,
      question: a.questionText,
      selectedText: a.selectedOptionText,
      correctText: a.correctOptionText,
      isCorrect: a.isCorrect
    }))
  };

  try {
    // Se mantiene `no-cors` a propósito. En modo normal, si el navegador
    // rechaza la respuesta la petición YA ha llegado al servidor, y reintentar
    // escribiría la nota dos veces en la hoja del profesor. Duplicar una
    // calificación es peor que no poder leer la confirmación.
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    // La confirmación se obtiene releyendo, que no escribe nada.
    const registrados = await misCalificaciones(attempt.studentEmail);
    const parseMinutos = (ts?: string): number => {
      if (!ts) return 0;
      const match = ts.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
      if (match) {
        const [, d, m, y, h, min, s] = match;
        const dt = new Date(Number(y), Number(m) - 1, Number(d), Number(h || 0), Number(min || 0), Number(s || 0));
        return Math.floor(dt.getTime() / 60000);
      }
      const parsed = Date.parse(ts);
      return !isNaN(parsed) ? Math.floor(parsed / 60000) : 0;
    };

    const tAttempt = parseMinutos(attempt.timestamp);
    const consta = registrados?.some(r => {
      if (r.topicId !== attempt.topicId) return false;
      if (r.timestamp === attempt.timestamp) return true;
      const tR = parseMinutos(r.timestamp);
      return tR > 0 && tAttempt > 0 && Math.abs(tR - tAttempt) <= 1;
    });

    if (consta) {
      return {
        success: true,
        status: 'sent',
        message: 'Calificación registrada en la hoja oficial y en tu historial.'
      };
    }

    return {
      success: true,
      status: 'sent_unconfirmed',
      message: 'Calificación enviada. No se ha podido releer la hoja para confirmarlo.'
    };
  } catch (error) {
    console.error('[GoogleSheetsService] Error de red al enviar a Google Sheets:', error);
    return {
      success: false,
      status: 'network_error',
      message: 'No se pudo conectar con Google Sheets. El intento permanece guardado en tu dispositivo.'
    };
  }
}

// ==========================================================================
// Historial propio
//
// Sin esto, «Mis Calificaciones» sólo enseña lo hecho en ESTE navegador: el
// alumno entra desde el móvil con la misma cuenta y no ve los intentos que
// hizo en el portátil. Aquí se recuperan de la hoja, filtrados por correo.
// ==========================================================================

const CACHE_CALIFICACIONES = 'qfdos_calificaciones_remotas_';

export function getCachedCalificaciones(email: string): QuizRegistrationRecord[] | null {
  const norm = (email || '').toLowerCase().trim();
  if (!norm) return null;
  try {
    const raw = localStorage.getItem(`${CACHE_CALIFICACIONES}${norm}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function setCachedCalificaciones(email: string, registros: QuizRegistrationRecord[]): void {
  const norm = (email || '').toLowerCase().trim();
  if (!norm) return;
  try {
    localStorage.setItem(`${CACHE_CALIFICACIONES}${norm}`, JSON.stringify(registros));
  } catch {
    // cuota del navegador llena: se sigue funcionando sin caché
  }
}

/** Fila tal y como la devuelve el Apps Script. */
interface FilaCalificacion {
  id?: string;
  fila?: number;
  timestamp?: string;
  studentName?: string;
  studentEmail?: string;
  studentDni?: string;
  topicId?: string;
  topicTitle?: string;
  modelName?: string;
  score?: number;
  correctCount?: number;
  totalQuestions?: number;
  evaluationMode?: string;
  evaluator?: string;
  answersDetail?: unknown;
}

const enVuelo = new Map<string, Promise<QuizRegistrationRecord[] | null>>();

/**
 * Intentos registrados en la hoja a nombre de un correo.
 *
 * Devuelve `null` cuando no se ha podido hablar con la hoja, para poder
 * distinguir «no hay intentos» de «no lo sabemos». Si el despliegue todavía
 * no expone la lectura, cae en la última copia conocida.
 */
export async function misCalificaciones(email: string): Promise<QuizRegistrationRecord[] | null> {
  const norm = (email || '').toLowerCase().trim();
  const url = getGoogleSheetsUrl();
  if (!norm || !url) return null;

  const pendiente = enVuelo.get(norm);
  if (pendiente) return pendiente;

  const promesa = (async (): Promise<QuizRegistrationRecord[] | null> => {
    try {
      const resp = await fetch(
        `${url}?accion=misCalificaciones&email=${encodeURIComponent(norm)}&t=${Date.now()}`,
        { method: 'GET', redirect: 'follow' }
      );
      if (!resp.ok) return getCachedCalificaciones(norm);

      const cuerpo = await resp.json();
      if (!cuerpo?.ok || !Array.isArray(cuerpo.intentos)) {
        return getCachedCalificaciones(norm);
      }

      const registros: QuizRegistrationRecord[] = (cuerpo.intentos as FilaCalificacion[]).map(f => ({
        id: f.id || `sheet_${f.fila ?? Math.random()}`,
        studentEmail: f.studentEmail || norm,
        studentName: f.studentName || '',
        studentDni: f.studentDni || '',
        evaluator: f.evaluator || '',
        evaluationMode: f.evaluationMode === 'docente_sesion' ? 'docente_sesion' : 'alumno_evaluado',
        topicId: f.topicId || '',
        topicTitle: f.topicTitle || '',
        modelName: f.modelName || '',
        score: Number(f.score) || 0,
        correctCount: Number(f.correctCount) || 0,
        totalQuestions: Number(f.totalQuestions) || 0,
        timestamp: f.timestamp || '',
        // El desglose pregunta a pregunta queda reservado al profesorado, así
        // que no se reconstruye aquí aunque la hoja lo guarde.
        answersDetail: []
      }));

      setCachedCalificaciones(norm, registros);
      return registros;
    } catch {
      return getCachedCalificaciones(norm);
    } finally {
      enVuelo.delete(norm);
    }
  })();

  enVuelo.set(norm, promesa);
  return promesa;
}

/**
 * Código oficial de Google Apps Script listo para copiar y pegar en la hoja del docente.
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
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
`.trim();
