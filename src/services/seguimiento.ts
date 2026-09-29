// ==========================================================================
// Seguimiento del alumnado (profesorado)
//
// Una fila por estudiante con lo que ha hecho: normas de seguridad firmadas,
// cuaderno de prácticas, tests por tema y flashcards. Lo calcula Codigo.gs
// cruzando la hoja de evaluación (lista de matriculados), la de entregas y la
// de calificaciones de los tests; aquí solo se pide y se interpreta.
// ==========================================================================

import { tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();

export interface ResultadoTema {
  intentos: number;
  mejor: number | null;
  ultima: string;
}

export interface AlumnoSeguimiento {
  email: string;
  nombre: string;
  grupo: string;
  /** Figura en la hoja de evaluación (la lista de matriculados) */
  enLista: boolean;
  /** Fecha de la firma de las normas, o null si no las ha firmado */
  normas: string | null;
  cuaderno: { entregas: number; ultima: string; nota: number | null } | null;
  tests: Record<string, ResultadoTema>;
  flashcards: number;
  /** Última actividad de cualquier tipo (ISO), vacío si ninguna */
  ultima: string;
}

export interface Seguimiento {
  generado: string;
  /** La hoja de evaluación tiene alumnado; sin ella no se sabe quién NO ha hecho nada */
  hayLista: boolean;
  /** Se ha podido leer la hoja de calificaciones de los tests */
  hayTests: boolean;
  alumnos: AlumnoSeguimiento[];
}

export type Resultado<T> = { ok: true; datos: T } | { ok: false; error: string };

const SESION_CADUCADA = 'Tu sesión ha caducado. Cierra sesión y vuelve a entrar.';
const SCRIPT_ANTIGUO =
  'El script de Apps Script todavía es una versión anterior (falta publicar Codigo.gs v6). No se ha leído nada.';

export async function cargarSeguimiento(): Promise<Resultado<Seguimiento>> {
  if (!WEBAPP_URL) return { ok: false, error: 'Falta configurar VITE_PRACTICAS_WEBAPP_URL.' };
  await renovarSiHaceFalta();
  const sesion = tokenSesion();
  if (!sesion) return { ok: false, error: SESION_CADUCADA };
  try {
    const resp = await fetch(
      `${WEBAPP_URL}?accion=seguimiento&sesion=${encodeURIComponent(sesion)}&t=${Date.now()}`,
      { method: 'GET', redirect: 'follow' }
    );
    const c = await resp.json().catch(() => null);
    if (c?.ok) {
      // Un script antiguo responde «ok» a cualquier acción que no conoce
      if (!Array.isArray(c.alumnos)) return { ok: false, error: SCRIPT_ANTIGUO };
      return {
        ok: true,
        datos: {
          generado: String(c.generado ?? ''),
          hayLista: c.hayLista === true,
          hayTests: c.hayTests !== false,
          alumnos: c.alumnos as AlumnoSeguimiento[]
        }
      };
    }
    if (esSesionInvalida(c)) return { ok: false, error: SESION_CADUCADA };
    return { ok: false, error: c?.error ?? `El servidor respondió ${resp.status}.` };
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servidor. Revisa la conexión.' };
  }
}
