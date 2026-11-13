// ==========================================================================
// Convocatoria especial: nota y corrección por pregunta
//
// Las hojas de respuestas se leen en local y sus resultados viven en la
// pestaña «Convocatoria Especial» de la hoja de evaluación; las claves y su
// justificación, en la pestaña «_ClavesEspecial». Este servicio las pide a
// Codigo.gs (accion=evaluacionEspecial), que filtra por cuenta en el servidor:
// el alumno recibe solo su fila y las claves de su modelo, y solo cuando el
// profesorado ha publicado la convocatoria.
// ==========================================================================

import { tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';
import { senalConLimite } from './googleSheetsService';
import type { Resultado } from './cuaderno';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();

const SESION_CADUCADA = 'Tu sesión ha caducado. Cierra sesión y vuelve a entrar.';
export const MENSAJE_SCRIPT_ANTIGUO =
  'El script de Apps Script todavía es una versión anterior (falta publicar la última versión de Codigo.gs).';

/** acierto · error · blanco · doble (marca doble: se cuenta como en blanco) */
export type EstadoPregunta = 'acierto' | 'error' | 'blanco' | 'doble';

export interface PreguntaEspecial {
  n: number;
  /** Letra marcada (A–D), «-» si se dejó en blanco, «*» si hubo marca doble */
  marcada: string;
  /** Letra de la opción correcta */
  clave: string;
  estado: EstadoPregunta;
  tema: string;
  enunciado: string;
  /** Texto o nombre de la opción correcta */
  correcta: string;
  justificacion: string;
}

export interface ResumenEspecial {
  modelo: string;
  aciertos: number;
  errores: number;
  blancos: number;
  /** Sobre 10 */
  nota: number;
}

export interface ConvocatoriaEspecial {
  publicadas: boolean;
  /** Solo en la vista del alumno: su fila, o null si no hay hoja a su nombre */
  fila: ResumenEspecial | null;
  detalle: PreguntaEspecial[];
  /** Solo en la vista del profesor */
  profesor?: boolean;
  /** Hojas con examen corregido */
  total?: number;
  /** Filas de la pestaña sin examen (alumnado que no se presentó) */
  sinExamen?: number;
  sinCorreo?: number;
  /** Lista del alumnado de la pestaña (solo profesorado) */
  alumnos?: AlumnoEspecial[];
}

export interface AlumnoEspecial extends ResumenEspecial {
  correo: string;
  nombre: string;
  conExamen: boolean;
}

/** Lo que vería un alumno con su cuenta; el profesorado lo pide por correo. */
export interface VistaAlumnoEspecial {
  nombre: string;
  fila: ResumenEspecial | null;
  detalle: PreguntaEspecial[];
}

async function llamar<T>(
  accion: string,
  extraer: (c: Record<string, unknown>) => T,
  cuerpo?: unknown,
  consulta = ''
): Promise<Resultado<T>> {
  if (!WEBAPP_URL) return { ok: false, error: 'Falta configurar VITE_PRACTICAS_WEBAPP_URL.' };
  await renovarSiHaceFalta();
  const sesion = tokenSesion();
  if (!sesion) return { ok: false, error: SESION_CADUCADA };
  try {
    const resp = await fetch(
      `${WEBAPP_URL}?accion=${accion}&sesion=${encodeURIComponent(sesion)}${consulta}&t=${Date.now()}`,
      cuerpo === undefined
        ? { method: 'GET', redirect: 'follow', signal: senalConLimite(8000) }
        : {
            method: 'POST',
            // text/plain evita la petición previa de CORS, que Apps Script no atiende
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(cuerpo),
            redirect: 'follow',
            signal: senalConLimite(10000)
          }
    );
    const c = await resp.json().catch(() => null);
    if (c?.ok) {
      try {
        return { ok: true, datos: extraer(c) };
      } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : String(e) };
      }
    }
    if (esSesionInvalida(c)) return { ok: false, error: SESION_CADUCADA };
    return { ok: false, error: c?.error ?? `El servidor respondió ${resp.status}.` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

const texto = (v: unknown): string => (typeof v === 'string' ? v : v == null ? '' : String(v));
const numero = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const ESTADOS: EstadoPregunta[] = ['acierto', 'error', 'blanco', 'doble'];

function convertirResumen(f: Record<string, unknown> | null | undefined): ResumenEspecial | null {
  return f
    ? {
        modelo: texto(f.modelo),
        aciertos: numero(f.aciertos),
        errores: numero(f.errores),
        blancos: numero(f.blancos),
        nota: numero(f.nota)
      }
    : null;
}

function convertirDetalle(c: Record<string, unknown>): PreguntaEspecial[] {
  const detalle = Array.isArray(c.detalle) ? (c.detalle as Record<string, unknown>[]) : [];
  return detalle.map(d => ({
    n: numero(d.n),
    marcada: texto(d.marcada) || '-',
    clave: texto(d.clave),
    estado: (ESTADOS as string[]).includes(texto(d.estado)) ? (texto(d.estado) as EstadoPregunta) : 'error',
    tema: texto(d.tema),
    enunciado: texto(d.enunciado),
    correcta: texto(d.correcta),
    justificacion: texto(d.justificacion)
  }));
}

/** Pide la convocatoria especial. El servidor decide qué corresponde a esta cuenta. */
export function leerConvocatoriaEspecial(): Promise<Resultado<ConvocatoriaEspecial>> {
  return llamar('evaluacionEspecial', c => {
    // Un script anterior a la v11 no conoce la acción y contesta sin este campo
    if (typeof c.publicadas !== 'boolean') throw new Error(MENSAJE_SCRIPT_ANTIGUO);
    const lista = Array.isArray(c.alumnos) ? (c.alumnos as Record<string, unknown>[]) : undefined;
    return {
      publicadas: c.publicadas,
      fila: convertirResumen(c.fila as Record<string, unknown> | null | undefined),
      detalle: convertirDetalle(c),
      profesor: c.profesor === true,
      total: typeof c.total === 'number' ? c.total : undefined,
      sinExamen: typeof c.sinExamen === 'number' ? c.sinExamen : undefined,
      sinCorreo: typeof c.sinCorreo === 'number' ? c.sinCorreo : undefined,
      alumnos: lista?.map(a => ({
        modelo: texto(a.modelo),
        aciertos: numero(a.aciertos),
        errores: numero(a.errores),
        blancos: numero(a.blancos),
        nota: numero(a.nota),
        correo: texto(a.correo),
        nombre: texto(a.nombre),
        conExamen: a.conExamen === true
      }))
    };
  });
}

/** Solo profesorado: la corrección de un alumno, tal como la ve con su cuenta (script v12 o posterior). */
export function leerAlumnoEspecial(correo: string): Promise<Resultado<VistaAlumnoEspecial>> {
  return llamar(
    'evaluacionEspecial',
    c => {
      if (c.profesor !== true) throw new Error(MENSAJE_SCRIPT_ANTIGUO);
      return {
        nombre: texto(c.nombre),
        fila: convertirResumen(c.fila as Record<string, unknown> | null | undefined),
        detalle: convertirDetalle(c)
      };
    },
    undefined,
    `&correo=${encodeURIComponent(correo)}`
  );
}

/** Publica u oculta la convocatoria especial para el alumnado. Solo profesorado. */
export function publicarConvocatoriaEspecial(publicadas: boolean): Promise<Resultado<boolean>> {
  return llamar(
    'publicarNotasEspecial',
    c => {
      if (typeof c.notasPublicadas !== 'boolean') throw new Error(MENSAJE_SCRIPT_ANTIGUO);
      return c.notasPublicadas;
    },
    { publicadas }
  );
}
