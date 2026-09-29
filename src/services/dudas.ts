// ==========================================================================
// Buzón de dudas
//
// Las dudas viven en la pestaña oculta `_Dudas` de la hoja de entregas, a
// través de Codigo.gs. El correo de quien pregunta lo pone el servidor a
// partir de la sesión verificada; el alumno sólo ve sus propias dudas y el
// profesorado, todas.
// ==========================================================================

import { tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();

export interface Duda {
  id: string;
  recibidaEn: string;
  correo: string;
  nombre: string;
  temaId: string;
  temaTitulo: string;
  pregunta: string;
  estado: 'pendiente' | 'respondida';
  respuesta: string;
  respondidaEn: string;
}

export type Resultado<T> = { ok: true; datos: T } | { ok: false; error: string };

const SESION_CADUCADA = 'Tu sesión ha caducado. Cierra sesión y vuelve a entrar.';

async function llamar<T>(
  accion: string,
  extraer: (cuerpo: Record<string, unknown>) => T,
  cuerpoPost?: unknown
): Promise<Resultado<T>> {
  if (!WEBAPP_URL) return { ok: false, error: 'El buzón no está configurado (falta VITE_PRACTICAS_WEBAPP_URL).' };
  await renovarSiHaceFalta();
  const sesion = tokenSesion();
  if (!sesion) return { ok: false, error: SESION_CADUCADA };

  const url = `${WEBAPP_URL}?accion=${accion}&sesion=${encodeURIComponent(sesion)}&t=${Date.now()}`;
  try {
    const resp = await fetch(
      url,
      cuerpoPost === undefined
        ? { method: 'GET', redirect: 'follow' }
        : {
            method: 'POST',
            // text/plain evita la petición previa de CORS, que Apps Script no atiende
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(cuerpoPost),
            redirect: 'follow'
          }
    );
    const cuerpo = await resp.json().catch(() => null);
    if (cuerpo?.ok) return { ok: true, datos: extraer(cuerpo) };
    if (esSesionInvalida(cuerpo)) return { ok: false, error: SESION_CADUCADA };
    return { ok: false, error: cuerpo?.error ?? `El servidor respondió ${resp.status}.` };
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servidor. Revisa la conexión.' };
  }
}

/** Estudiante: sus dudas. Profesor: todas. La más reciente primero. */
export function cargarDudas(): Promise<Resultado<Duda[]>> {
  return llamar('misDudas', c => (Array.isArray(c.dudas) ? (c.dudas as Duda[]) : []));
}

export function enviarDuda(d: {
  nombre: string;
  temaId: string;
  temaTitulo: string;
  pregunta: string;
}): Promise<Resultado<Duda>> {
  return llamar('enviarDuda', c => c.duda as Duda, d);
}

export function responderDuda(id: string, respuesta: string): Promise<Resultado<Duda>> {
  return llamar('responderDuda', c => c.duda as Duda, { id, respuesta });
}

export function borrarDuda(id: string): Promise<Resultado<null>> {
  return llamar('borrarDuda', () => null, { id });
}

/** Fecha legible en español para las tarjetas del buzón. */
export function fechaDuda(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/** Claves de versiones anteriores, cuando el buzón sólo vivía en el navegador. */
export function limpiarDudasLocales(): void {
  localStorage.removeItem('qfdos_v2_student_questions');
  localStorage.removeItem('qfdos_v3_student_questions');
}

/**
 * Título del tema sin el «: » que quedaba delante cuando el tema no tiene
 * número (por ejemplo, la presentación del curso).
 */
export function tituloTema(t: string | undefined | null): string {
  return (t ?? '').replace(/^\s*:\s*/, '').trim() || 'Tema General';
}
