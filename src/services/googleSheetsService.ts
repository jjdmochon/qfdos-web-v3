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
  status: 'sent' | 'no_url' | 'network_error';
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
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.info('[GoogleSheetsService] Registro enviado exitosamente a Google Sheets.');
    return {
      success: true,
      status: 'sent',
      message: 'Calificación registrada en Google Sheets y en tu historial local.'
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

/**
 * Código oficial de Google Apps Script listo para copiar y pegar en la hoja del docente.
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
/**
 * Servidor Webhook de Recepción de Exámenes · QFDOS (Universidad de Granada)
 * Profesor: Dr. Juan José Díaz-Mochón
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "Respuestas_QFDOS";
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Marca Temporal",
        "Apellidos y Nombre",
        "Correo UGR",
        "DNI / Matrícula",
        "Tema",
        "Título del Tema",
        "Modelo de Examen",
        "Nota Final (/10)",
        "Aciertos",
        "Total Preguntas",
        "Modo Evaluación",
        "Evaluador",
        "Detalle de Respuestas"
      ]);
      sheet.getRange(1, 1, 1, 13).setFontWeight("bold").setBackground("#1e3a8a").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("es-ES"),
      data.studentName || "Anónimo",
      data.studentEmail || "",
      data.studentDni || "",
      data.topicId || "",
      data.topicTitle || "",
      data.modelName || "",
      data.score !== undefined ? data.score : "",
      data.correctCount !== undefined ? data.correctCount : "",
      data.totalQuestions || "",
      data.evaluationMode || "",
      data.evaluator || "",
      JSON.stringify(data.answersDetail || [])
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", receivedAt: new Date() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
`.trim();
