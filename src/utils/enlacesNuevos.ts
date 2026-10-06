import { QfdosAnnouncement, QfdosResourceLink } from '../data/qfdosData';

// ==========================================================================
// Enlaces y avisos nuevos que viajan con la aplicación
//
// El contenido publicado desde el CMS sustituye por completo a los enlaces y
// avisos del fichero de datos, así que uno añadido al código nunca llegaba a
// Gestión Docente y no había forma de publicarlo. Para el profesorado, los
// que figuran como «nuevos» y no estén ya en lo publicado se añaden una sola
// vez. Si después se borran, no vuelven: el identificador queda anotado.
//
// Enlaces: los de fecha igual o posterior a SEMBRAR_DESDE (la fecha corta el
// paso a enlaces antiguos que se retiraron a propósito).
// Avisos: los que se listan en AVISOS_A_OFRECER (las fechas son texto libre).
// ==========================================================================

export const SEMBRAR_DESDE = '2026-09-30';

function leerSembrados(clave: string): Set<string> {
  try {
    const raw = localStorage.getItem(clave);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

/** Identificadores de la copia local del profesorado (la que escribe la app en cada cambio). */
function idsEnCopiaLocal(clave: string): Set<string> {
  try {
    const arr = JSON.parse(localStorage.getItem(clave) ?? '[]');
    return new Set(Array.isArray(arr) ? arr.map((x: { id?: unknown }) => String(x?.id)) : []);
  } catch {
    return new Set();
  }
}

/**
 * Se ofrece un elemento nuevo si nunca se había ofrecido, o si se ofreció y
 * sigue en la copia local (la carga publicada lo pisó, pero el profesor no lo
 * borró).
 */
function ofrecer<T extends { id: string }>(
  publicados: T[],
  nuevos: T[],
  claveSembrados: string,
  claveCopiaLocal: string
): T[] {
  const sembrados = leerSembrados(claveSembrados);
  const locales = idsEnCopiaLocal(claveCopiaLocal);
  const presentes = new Set(publicados.map(x => x.id));
  const candidatos = nuevos.filter(x => !presentes.has(x.id) && (!sembrados.has(x.id) || locales.has(x.id)));
  if (candidatos.length === 0) return publicados;

  candidatos.forEach(x => sembrados.add(x.id));
  try {
    localStorage.setItem(claveSembrados, JSON.stringify([...sembrados]));
  } catch { /* sin almacenamiento: volverá a ofrecerse en la próxima carga */ }

  return [...candidatos, ...publicados];
}

export function conEnlacesNuevos(publicados: QfdosResourceLink[], iniciales: QfdosResourceLink[]): QfdosResourceLink[] {
  return ofrecer(
    publicados,
    iniciales.filter(l => l.addedAt >= SEMBRAR_DESDE),
    'qfdos_v3_links_sembrados',
    'qfdos_v3_links'
  );
}

export function conAvisosNuevos(
  publicados: QfdosAnnouncement[],
  iniciales: QfdosAnnouncement[],
  idsAOfrecer: string[]
): QfdosAnnouncement[] {
  return ofrecer(
    publicados,
    iniciales.filter(a => idsAOfrecer.includes(a.id)),
    'qfdos_v3_avisos_sembrados',
    'qfdos_v3_announcements'
  );
}
