import { QfdosResourceLink } from '../data/qfdosData';

// ==========================================================================
// Enlaces de interés nuevos que viajan con la aplicación
//
// El contenido publicado desde el CMS sustituye por completo a los enlaces del
// fichero de datos, así que un enlace añadido al código nunca llegaba a
// Gestión Docente y no había forma de publicarlo. Para el profesorado, los
// enlaces del fichero con fecha igual o posterior a SEMBRAR_DESDE que no estén
// ya en lo publicado se añaden una sola vez. Si después se borran, no vuelven:
// el identificador queda anotado.
//
// La fecha corta el paso a enlaces antiguos que se retiraron a propósito.
// ==========================================================================

const CLAVE_SEMBRADOS = 'qfdos_v3_links_sembrados';
export const SEMBRAR_DESDE = '2026-09-30';

function leerSembrados(): Set<string> {
  try {
    const raw = localStorage.getItem(CLAVE_SEMBRADOS);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

/** Identificadores de la copia local del profesorado (la que escribe el CMS en cada cambio). */
function idsEnCopiaLocal(): Set<string> {
  try {
    const arr = JSON.parse(localStorage.getItem('qfdos_v3_links') ?? '[]');
    return new Set(Array.isArray(arr) ? arr.map((l: { id?: unknown }) => String(l?.id)) : []);
  } catch {
    return new Set();
  }
}

/**
 * Se ofrece un enlace nuevo si nunca se había ofrecido, o si se ofreció y sigue
 * en la copia local (la carga publicada lo pisó, pero el profesor no lo borró).
 */
export function conEnlacesNuevos(publicados: QfdosResourceLink[], iniciales: QfdosResourceLink[]): QfdosResourceLink[] {
  const sembrados = leerSembrados();
  const locales = idsEnCopiaLocal();
  const presentes = new Set(publicados.map(l => l.id));
  const candidatos = iniciales.filter(
    l => l.addedAt >= SEMBRAR_DESDE && !presentes.has(l.id) && (!sembrados.has(l.id) || locales.has(l.id))
  );
  if (candidatos.length === 0) return publicados;

  candidatos.forEach(l => sembrados.add(l.id));
  try {
    localStorage.setItem(CLAVE_SEMBRADOS, JSON.stringify([...sembrados]));
  } catch { /* sin almacenamiento: volverá a ofrecerse en la próxima carga */ }

  return [...candidatos, ...publicados];
}
