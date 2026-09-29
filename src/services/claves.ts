// ==========================================================================
// Claves de corrección de los tests
//
// La nota de un test la calcula el servidor (Calificaciones.gs) contra estas
// claves, que el profesor publica desde el panel. Sirven todas las preguntas
// que existen en la web: los modelos de examen fijos y las preguntas de cada
// tema, incluidas las que se hayan añadido desde el panel.
// ==========================================================================

import {
  MODELO_A_TEST_QUESTIONS, MODELO_B_TEST_QUESTIONS, MODELO_C_TEST_QUESTIONS,
  MODELO_E_TEST_QUESTIONS, MODELO_FIR_TEST_QUESTIONS, RETROSINTESIS_TEST_QUESTIONS,
  type QfdosTopic, type TestQuestion
} from '../data/qfdosData';
import { getGoogleSheetsUrl } from './googleSheetsService';
import { tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';

export interface EstadoClaves {
  claves: number;
  actualizadoEn: string;
  exigir: boolean;
}

export type ResultadoClaves<T> = { ok: true; datos: T } | { ok: false; error: string };

const SESION_CADUCADA = 'Tu sesión ha caducado. Cierra sesión y vuelve a entrar.';
const SCRIPT_ANTIGUO =
  'El script de Calificaciones todavía es una versión anterior: falta publicar la última versión de Calificaciones.gs.';

/**
 * Clave de cada pregunta por id. Si el mismo id aparece con dos soluciones
 * distintas no se publica ninguno de los dos y se avisa: el servidor no puede
 * saber cuál vale.
 */
export function construirClaves(topics: QfdosTopic[]): { claves: Record<string, number>; conflictos: string[] } {
  const bancos: TestQuestion[][] = [
    MODELO_A_TEST_QUESTIONS, MODELO_B_TEST_QUESTIONS, MODELO_C_TEST_QUESTIONS,
    MODELO_E_TEST_QUESTIONS, MODELO_FIR_TEST_QUESTIONS, RETROSINTESIS_TEST_QUESTIONS,
    ...topics.map(t => t.testQuestions ?? [])
  ];
  const claves: Record<string, number> = {};
  const conflictos = new Set<string>();
  for (const banco of bancos) {
    for (const q of banco) {
      if (!q?.id || !Number.isInteger(q.correctIndex)) continue;
      if (q.id in claves && claves[q.id] !== q.correctIndex) conflictos.add(q.id);
      else claves[q.id] = q.correctIndex;
    }
  }
  for (const id of conflictos) delete claves[id];
  return { claves, conflictos: [...conflictos] };
}

async function llamar<T>(
  accion: string,
  extraer: (c: Record<string, unknown>) => T,
  cuerpo?: unknown
): Promise<ResultadoClaves<T>> {
  const url = getGoogleSheetsUrl();
  if (!url) return { ok: false, error: 'No hay URL de Calificaciones configurada.' };
  await renovarSiHaceFalta();
  const sesion = tokenSesion();
  if (!sesion) return { ok: false, error: SESION_CADUCADA };
  try {
    const resp = cuerpo === undefined
      ? await fetch(`${url}?accion=${accion}&sesion=${encodeURIComponent(sesion)}&t=${Date.now()}`, { method: 'GET', redirect: 'follow' })
      : await fetch(url, {
          method: 'POST',
          // text/plain evita la petición previa de CORS, que Apps Script no atiende
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: accion, sesion, ...(cuerpo as object) }),
          redirect: 'follow'
        });
    const c = await resp.json().catch(() => null);
    if (c?.ok) {
      try { return { ok: true, datos: extraer(c) }; } catch { return { ok: false, error: SCRIPT_ANTIGUO }; }
    }
    if (esSesionInvalida(c)) return { ok: false, error: SESION_CADUCADA };
    return { ok: false, error: c?.error ?? `El servidor respondió ${resp.status}.` };
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servidor. Revisa la conexión.' };
  }
}

export function estadoClaves(): Promise<ResultadoClaves<EstadoClaves>> {
  return llamar('estadoClaves', c => {
    // Un script anterior contesta ok a cualquier acción, sin `claves`
    if (typeof c.claves !== 'number') throw new Error('antiguo');
    return { claves: c.claves, actualizadoEn: String(c.actualizadoEn ?? ''), exigir: c.exigir === true };
  });
}

export function publicarClaves(claves: Record<string, number>): Promise<ResultadoClaves<number>> {
  return llamar(
    'publicar_claves',
    c => {
      if (typeof c.claves !== 'number') throw new Error('antiguo');
      return c.claves;
    },
    { claves }
  );
}
