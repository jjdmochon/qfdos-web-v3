// ==========================================================================
// Contenido del curso compartido
//
// Sin esto, lo que el profesor edita vive sólo en SU navegador: el alumnado
// abre la web y ve el temario que venía compilado, no los cambios. Aquí el
// contenido se publica en la hoja de cálculo y todos lo leen de allí.
//
// El reparto de papeles es deliberado:
//   · leer     — público, sin clave, en cada arranque
//   · publicar — sólo el profesor, con una clave que teclea él y que queda
//                en su navegador, nunca en el código distribuido
// ==========================================================================

import { QfdosTopic, QfdosAnnouncement, QfdosGlossaryTerm, QfdosResourceLink, COURSE_BUILD_TIMESTAMP, INITIAL_TOPICS } from '../data/qfdosData';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();
const CLAVE_KEY = 'qfdos_v3_clave_publicacion';
const CACHE_KEY = 'qfdos_v3_contenido_remoto';

export interface ContenidoCurso {
  topics: QfdosTopic[];
  announcements: QfdosAnnouncement[];
  glossary: QfdosGlossaryTerm[];
  resourceLinks: QfdosResourceLink[];
}

export interface ContenidoPublicado extends ContenidoCurso {
  publicadoEn: string;
}

export function publicacionDisponible(): boolean {
  return WEBAPP_URL.startsWith('https://script.google.com/macros/s/') && WEBAPP_URL.length > 60;
}

export function getClavePublicacion(): string {
  return localStorage.getItem(CLAVE_KEY) ?? '';
}

export function setClavePublicacion(clave: string): void {
  localStorage.setItem(CLAVE_KEY, clave.trim());
}

export function limpiarCacheRemota(): void {
  localStorage.removeItem(CACHE_KEY);
}

/**
 * Sanitiza la lista de temas para garantizar que Tema 00 nunca quede
 * atrapado en una versión obsoleta de la hoja remota o enlaces caídos.
 */
export function normalizarTemas(topics: QfdosTopic[]): QfdosTopic[] {
  if (!Array.isArray(topics) || !topics.length) return INITIAL_TOPICS;
  return topics.map(t => {
    if (t.id === 'tema-00' && (t.title !== 'Presentación del Curso' || !t.geminiNotebookUrl || t.geminiNotebookUrl.includes('qfdos-2627-tema00'))) {
      return INITIAL_TOPICS[0];
    }
    return t;
  });
}

/**
 * Descarga el contenido publicado. Devuelve null si no hay nada publicado
 * todavía o si no se puede alcanzar la hoja — en ambos casos la aplicación
 * sigue con el contenido que trae compilado.
 */
export async function descargarContenido(): Promise<ContenidoPublicado | null> {
  if (!publicacionDisponible()) return null;

  try {
    const resp = await fetch(`${WEBAPP_URL}?accion=leerContenido&t=${Date.now()}`, {
      method: 'GET',
      redirect: 'follow'
    });
    if (!resp.ok) return null;

    const cuerpo = await resp.json();
    if (!cuerpo?.ok || cuerpo.vacio || !cuerpo.contenido) return null;

    const publicadoEn = cuerpo.publicadoEn ?? '';
    // Si la publicación en la hoja remota es más antigua que la versión oficial compilada,
    // se descarta para no pisar el código nuevo con datos históricos obsoletos de la hoja.
    if (publicadoEn && publicadoEn < COURSE_BUILD_TIMESTAMP) {
      limpiarCacheRemota();
      return null;
    }

    const topicsNormalizados = normalizarTemas(cuerpo.contenido.topics);
    const publicado: ContenidoPublicado = { 
      ...cuerpo.contenido, 
      topics: topicsNormalizados,
      publicadoEn 
    };

    // Se guarda una copia para poder arrancar sin conexión
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(publicado)); } catch { /* cuota */ }

    return publicado;
  } catch {
    return null;
  }
}

/** Última copia descargada, para arrancar sin esperar a la red. */
export function contenidoEnCache(): ContenidoPublicado | null {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;
  try { 
    const data = JSON.parse(raw) as ContenidoPublicado;
    if (data.publicadoEn && data.publicadoEn < COURSE_BUILD_TIMESTAMP) {
      limpiarCacheRemota();
      return null;
    }
    data.topics = normalizarTemas(data.topics);
    return data;
  } catch { 
    return null; 
  }
}

export interface ResultadoPublicacion {
  ok: boolean;
  mensaje: string;
}

/**
 * Publica el contenido para todo el mundo. Va por POST porque el temario
 * completo no cabe en una URL.
 */
export async function publicarContenido(
  contenido: ContenidoCurso,
  clave: string
): Promise<ResultadoPublicacion> {
  if (!publicacionDisponible()) {
    return { ok: false, mensaje: 'Falta configurar VITE_PRACTICAS_WEBAPP_URL en .env.local.' };
  }
  if (!clave.trim()) {
    return { ok: false, mensaje: 'Hace falta la clave de publicación.' };
  }

  try {
    const resp = await fetch(
      `${WEBAPP_URL}?accion=guardarContenido&clave=${encodeURIComponent(clave.trim())}`,
      {
        method: 'POST',
        // text/plain evita la petición previa de CORS, que Apps Script no atiende
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(contenido),
        redirect: 'follow'
      }
    );

    const cuerpo = await resp.json().catch(() => null);
    if (cuerpo?.ok) {
      const kb = Math.round((cuerpo.bytes ?? 0) / 1024);
      return {
        ok: true,
        mensaje: `Publicado para todo el curso (${kb} KB). El alumnado lo verá al recargar.`
      };
    }
    return { ok: false, mensaje: cuerpo?.error ?? 'La hoja rechazó la publicación.' };
  } catch (err) {
    return {
      ok: false,
      mensaje: `No se pudo publicar: ${err instanceof Error ? err.message : String(err)}`
    };
  }
}

// ==========================================================================
// Entregas de un estudiante
// ==========================================================================

export interface EntregaPropia {
  hoja: string;
  fila: number;
  datos: Record<string, string>;
}

const ENTREGAS_CACHE_PREFIX = 'qfdos_v3_entregas_';

export function getCachedEntregas(email: string): EntregaPropia[] | null {
  if (!email) return null;
  const key = `${ENTREGAS_CACHE_PREFIX}${email.toLowerCase().trim()}`;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setCachedEntregas(email: string, entregas: EntregaPropia[]): void {
  if (!email || !Array.isArray(entregas)) return;
  const key = `${ENTREGAS_CACHE_PREFIX}${email.toLowerCase().trim()}`;
  try {
    localStorage.setItem(key, JSON.stringify(entregas));
  } catch {
    // cuota
  }
}

export function addCachedEntrega(email: string, entrega: EntregaPropia): void {
  if (!email || !entrega) return;
  const current = getCachedEntregas(email) || [];
  const filtered = current.filter(e => !(e.hoja === entrega.hoja && e.fila === entrega.fila));
  setCachedEntregas(email, [entrega, ...filtered]);
}

const inFlightMisEntregas = new Map<string, Promise<EntregaPropia[] | null>>();

/**
 * Lo que esa persona ha entregado, buscando su correo en todas las hojas.
 * Con deduplicación de peticiones concurrentes y persistencia en caché local
 * para reconocimiento instantáneo entre dispositivos y sesiones.
 */
export async function misEntregas(email: string): Promise<EntregaPropia[] | null> {
  const normEmail = (email || '').toLowerCase().trim();
  if (!publicacionDisponible() || !normEmail) return null;

  if (inFlightMisEntregas.has(normEmail)) {
    return inFlightMisEntregas.get(normEmail)!;
  }

  const promesa = (async () => {
    try {
      const resp = await fetch(
        `${WEBAPP_URL}?accion=misEntregas&email=${encodeURIComponent(normEmail)}&t=${Date.now()}`,
        { method: 'GET', redirect: 'follow' }
      );
      if (!resp.ok) {
        return getCachedEntregas(normEmail);
      }
      const cuerpo = await resp.json();
      if (cuerpo?.ok && Array.isArray(cuerpo.entregas)) {
        setCachedEntregas(normEmail, cuerpo.entregas);
        return cuerpo.entregas;
      }
      return getCachedEntregas(normEmail);
    } catch {
      return getCachedEntregas(normEmail);
    } finally {
      inFlightMisEntregas.delete(normEmail);
    }
  })();

  inFlightMisEntregas.set(normEmail, promesa);
  return promesa;
}
