// ==========================================================================
// Sesión verificada por el servidor
//
// El cliente puede decodificar el ID token de Google, pero no demostrar a
// nadie quién es: cualquiera puede escribir un correo en una petición. Por
// eso el token se envía una vez a Apps Script (`iniciarSesion`), que lo
// comprueba contra Google y devuelve una sesión firmada. A partir de ahí,
// toda lectura o escritura de datos personales lleva esa sesión, y es el
// servidor quien decide el correo y el rol.
//
// La sesión dura 30 días y se renueva sola cuando ha pasado la mitad, así que
// quien usa la plataforma con normalidad no vuelve a ver la pantalla de login.
// ==========================================================================

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();
const SESION_KEY = 'qfdos_v3_sesion';

export interface SesionServidor {
  token: string;
  email: string;
  rol: 'profesor' | 'estudiante';
  institucional: boolean;
  /** Caducidad en segundos desde epoch */
  caduca: number;
}

export type ResultadoInicio =
  | { ok: true; sesion: SesionServidor }
  | { ok: false; error: string };

const ahora = () => Math.floor(Date.now() / 1000);

export function getSesion(): SesionServidor | null {
  try {
    const raw = localStorage.getItem(SESION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as SesionServidor;
    return s?.token && s.caduca > ahora() ? s : null;
  } catch {
    return null;
  }
}

function guardarSesion(s: SesionServidor): void {
  try {
    localStorage.setItem(SESION_KEY, JSON.stringify(s));
  } catch {
    // sin almacenamiento la sesión dura lo que la pestaña
  }
}

export function borrarSesion(): void {
  localStorage.removeItem(SESION_KEY);
}

/** Token para adjuntar a las peticiones, o cadena vacía si no hay sesión. */
export function tokenSesion(): string {
  return getSesion()?.token ?? '';
}

/** El servidor rechazó la sesión: caducada, secreto rotado o inexistente. */
export function esSesionInvalida(cuerpo: unknown): boolean {
  return !!cuerpo && typeof cuerpo === 'object' && (cuerpo as { codigo?: string }).codigo === 'sesion_invalida';
}

function aSesion(c: Record<string, unknown>): SesionServidor | null {
  if (!c?.ok || typeof c.sesion !== 'string' || typeof c.email !== 'string') return null;
  return {
    token: c.sesion,
    email: c.email,
    rol: c.rol === 'profesor' ? 'profesor' : 'estudiante',
    institucional: c.institucional === true,
    caduca: Number(c.caduca) || 0
  };
}

/** Cambia el ID token de Google por una sesión del servidor. */
export async function iniciarSesionServidor(idToken: string): Promise<ResultadoInicio> {
  if (!WEBAPP_URL) {
    return { ok: false, error: 'Falta configurar VITE_PRACTICAS_WEBAPP_URL: no se puede verificar la identidad.' };
  }
  try {
    const resp = await fetch(`${WEBAPP_URL}?accion=iniciarSesion`, {
      method: 'POST',
      // text/plain evita la petición previa de CORS, que Apps Script no atiende
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ idToken }),
      redirect: 'follow'
    });
    const cuerpo = await resp.json().catch(() => null);
    const sesion = cuerpo ? aSesion(cuerpo) : null;
    if (sesion) {
      guardarSesion(sesion);
      return { ok: true, sesion };
    }
    return { ok: false, error: cuerpo?.error ?? 'El servidor no ha podido verificar tu cuenta.' };
  } catch {
    return { ok: false, error: 'No se pudo contactar con el servidor para verificar tu cuenta. Revisa la conexión.' };
  }
}

let renovando: Promise<void> | null = null;

/**
 * Renueva la sesión si ya ha consumido la mitad de su vida. Se llama al
 * arrancar y antes de cada envío; si falla por red no pasa nada, la sesión
 * actual sigue valiendo hasta que caduque.
 */
export function renovarSiHaceFalta(): Promise<void> {
  const s = getSesion();
  if (!s || !WEBAPP_URL) return Promise.resolve();
  const quinceDias = 15 * 24 * 3600;
  if (s.caduca - ahora() > quinceDias) return Promise.resolve();
  if (renovando) return renovando;

  renovando = (async () => {
    try {
      const resp = await fetch(
        `${WEBAPP_URL}?accion=renovarSesion&sesion=${encodeURIComponent(s.token)}`,
        { method: 'GET', redirect: 'follow' }
      );
      const cuerpo = await resp.json().catch(() => null);
      const nueva = cuerpo ? aSesion(cuerpo) : null;
      if (nueva) guardarSesion(nueva);
      else if (esSesionInvalida(cuerpo)) borrarSesion();
    } catch {
      // sin red: se reintenta en la próxima ocasión
    } finally {
      renovando = null;
    }
  })();
  return renovando;
}
