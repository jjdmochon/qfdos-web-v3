// ==========================================================================
// Materiales en Drive (profesorado)
//
// El fichero sale del navegador en fragmentos y Codigo.gs los reenvía a una
// sesión de subida reanudable de Drive: no hay límite práctico del tamaño de
// petición de Apps Script y el script nunca tiene el fichero entero en
// memoria. El resultado es un enlace de Drive listo para ponerlo en un módulo.
// ==========================================================================

import { tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();

export const MAX_SUBIDA_BYTES = 50 * 1024 * 1024;
export const EXTENSIONES_PERMITIDAS = [
  'pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt',
  'png', 'jpg', 'jpeg', 'webp', 'svg', 'zip', 'mp3', 'm4a', 'wav'
];

export interface ArchivoDrive {
  id: string;
  nombre: string;
  mime: string;
  tamano: number;
  url: string;
  /** false si se subió pero no se pudo poner «cualquiera con el enlace» */
  compartido?: boolean;
  creado?: string;
}

export type Resultado<T> = { ok: true; datos: T } | { ok: false; error: string };

const SESION_CADUCADA = 'Tu sesión ha caducado. Cierra sesión y vuelve a entrar.';
const SCRIPT_ANTIGUO =
  'El script de Apps Script todavía es una versión anterior (falta publicar Codigo.gs v7). No se ha subido nada.';
const SIN_CONEXION = 'No se pudo conectar con el servidor. Revisa la conexión.';

const extension = (nombre: string): string => (nombre.toLowerCase().match(/\.([a-z0-9]{1,5})$/)?.[1] ?? '');

/** Comprobación previa en el navegador; el servidor vuelve a comprobarla. */
export function validarFichero(f: File): string | null {
  if (!EXTENSIONES_PERMITIDAS.includes(extension(f.name))) {
    return `«${f.name}»: tipo de fichero no admitido. Admitidos: ${EXTENSIONES_PERMITIDAS.join(', ')}.`;
  }
  if (f.size === 0) return `«${f.name}» está vacío.`;
  if (f.size > MAX_SUBIDA_BYTES) {
    return `«${f.name}» pesa ${(f.size / 1048576).toFixed(1)} MB; el máximo es ${MAX_SUBIDA_BYTES / 1048576} MB.`;
  }
  return null;
}

async function post(accion: string, query: Record<string, string | number>, cuerpo: string): Promise<Record<string, unknown> | null> {
  const params = new URLSearchParams({ accion, sesion: tokenSesion(), ...Object.fromEntries(Object.entries(query).map(([k, v]) => [k, String(v)])) });
  const resp = await fetch(`${WEBAPP_URL}?${params.toString()}`, {
    method: 'POST',
    // text/plain evita la petición previa de CORS, que Apps Script no atiende
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: cuerpo,
    redirect: 'follow'
  });
  return resp.json().catch(() => null);
}

/** Base64 de un trozo del fichero, sin el prefijo «data:…;base64,». */
function aBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(String(lector.result).split(',')[1] ?? '');
    lector.onerror = () => reject(lector.error ?? new Error('No se pudo leer el fichero'));
    lector.readAsDataURL(blob);
  });
}

/**
 * Sube un fichero a la carpeta de materiales de Drive. `onProgreso` recibe
 * una fracción entre 0 y 1. Un fragmento que falla por la red se reintenta
 * dos veces; si el servidor indica que ya tiene otro punto de la subida, se
 * retoma desde ahí.
 */
export async function subirADrive(file: File, onProgreso: (fraccion: number) => void): Promise<Resultado<ArchivoDrive>> {
  if (!WEBAPP_URL) return { ok: false, error: 'Falta configurar VITE_PRACTICAS_WEBAPP_URL.' };
  const invalido = validarFichero(file);
  if (invalido) return { ok: false, error: invalido };
  await renovarSiHaceFalta();
  if (!tokenSesion()) return { ok: false, error: SESION_CADUCADA };

  try {
    const ini = await post('iniciarSubida', {}, JSON.stringify({
      nombre: file.name, mime: file.type || 'application/octet-stream', tamano: file.size
    }));
    if (esSesionInvalida(ini)) return { ok: false, error: SESION_CADUCADA };
    if (!ini?.ok) return { ok: false, error: String(ini?.error ?? 'El servidor no ha aceptado la subida.') };
    if (typeof ini.subida !== 'string' || typeof ini.fragmento !== 'number') return { ok: false, error: SCRIPT_ANTIGUO };

    const subida = ini.subida;
    const tam = ini.fragmento;
    let inicio = 0;
    let fallos = 0;
    onProgreso(0);

    while (inicio < file.size) {
      const trozo = file.slice(inicio, Math.min(inicio + tam, file.size));
      let c: Record<string, unknown> | null = null;
      try {
        c = await post('subirFragmento', { subida, inicio }, await aBase64(trozo));
      } catch {
        c = null;
      }

      if (c === null) {
        if (++fallos > 2) return { ok: false, error: SIN_CONEXION };
        continue;                                   // mismo fragmento otra vez
      }
      if (esSesionInvalida(c)) return { ok: false, error: SESION_CADUCADA };
      if (c.codigo === 'fuera_de_orden' && typeof c.offset === 'number') {
        // El servidor ya tiene más (o menos) de lo que creíamos: se retoma desde ahí
        if (++fallos > 6) return { ok: false, error: 'La subida se ha desincronizado. Inténtalo de nuevo.' };
        inicio = c.offset;
        onProgreso(inicio / file.size);
        continue;
      }
      if (!c.ok) return { ok: false, error: String(c.error ?? 'El servidor rechazó el fragmento.') };

      fallos = 0;
      if (c.completo === true) {
        const a = c.archivo as ArchivoDrive | undefined;
        if (!a?.id) return { ok: false, error: SCRIPT_ANTIGUO };
        onProgreso(1);
        return { ok: true, datos: a };
      }
      if (typeof c.offset !== 'number') return { ok: false, error: SCRIPT_ANTIGUO };
      inicio = c.offset;
      onProgreso(inicio / file.size);
    }
    return { ok: false, error: 'La subida terminó sin que Drive devolviera el fichero.' };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : SIN_CONEXION };
  }
}

/** Ficheros ya subidos a la carpeta de materiales, los más recientes primero. */
export async function listarMaterialesDrive(): Promise<Resultado<{ carpeta: string; archivos: ArchivoDrive[] }>> {
  if (!WEBAPP_URL) return { ok: false, error: 'Falta configurar VITE_PRACTICAS_WEBAPP_URL.' };
  await renovarSiHaceFalta();
  const sesion = tokenSesion();
  if (!sesion) return { ok: false, error: SESION_CADUCADA };
  try {
    const resp = await fetch(
      `${WEBAPP_URL}?accion=materiales&sesion=${encodeURIComponent(sesion)}&t=${Date.now()}`,
      { method: 'GET', redirect: 'follow' }
    );
    const c = await resp.json().catch(() => null);
    if (c?.ok) {
      if (!Array.isArray(c.archivos)) return { ok: false, error: SCRIPT_ANTIGUO };
      return { ok: true, datos: { carpeta: String(c.carpeta ?? ''), archivos: c.archivos as ArchivoDrive[] } };
    }
    if (esSesionInvalida(c)) return { ok: false, error: SESION_CADUCADA };
    return { ok: false, error: c?.error ?? `El servidor respondió ${resp.status}.` };
  } catch {
    return { ok: false, error: SIN_CONEXION };
  }
}
