import { QfdosAnnouncement, QfdosResourceLink } from '../data/qfdosData';

// ==========================================================================
// Enlaces y avisos nuevos que viajan con la aplicación
//
// El contenido publicado desde el CMS sustituye por completo a los enlaces y
// avisos del fichero de datos, así que uno añadido al código nunca llegaba a
// Gestión Docente y no había forma de publicarlo. Para el profesorado, los
// que figuran como «nuevos» se añaden a la lista mientras no estén publicados.
//
// Solo se dejan de ofrecer si el profesor los borra desde el CMS: el borrado
// anota el identificador (anotarDescartados). No se usa «ya se ofreció una
// vez»: la lista se recalcula en cada arranque y la copia local se pisa antes
// de poder consultarla, así que aquello perdía el aviso en la segunda carga.
//
// Enlaces: los de fecha igual o posterior a SEMBRAR_DESDE (la fecha corta el
// paso a enlaces antiguos que se retiraron a propósito).
// Avisos: los que se listan en AVISOS_A_OFRECER (las fechas son texto libre).
// ==========================================================================

export const SEMBRAR_DESDE = '2026-09-30';

const CLAVE_AVISOS_DESCARTADOS = 'qfdos_v3_avisos_descartados';
const CLAVE_LINKS_DESCARTADOS = 'qfdos_v3_links_descartados';

function leerIds(clave: string): Set<string> {
  try {
    const raw = localStorage.getItem(clave);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

/** Anota como descartados los elementos que estaban en `antes` y ya no están en `despues`. */
function anotarDescartados(clave: string, antes: { id: string }[], despues: { id: string }[]): void {
  const siguen = new Set(despues.map(x => x.id));
  const borrados = antes.filter(x => !siguen.has(x.id)).map(x => x.id);
  if (borrados.length === 0) return;
  const ids = leerIds(clave);
  borrados.forEach(id => ids.add(id));
  try {
    localStorage.setItem(clave, JSON.stringify([...ids]));
  } catch { /* sin almacenamiento: el elemento puede volver a ofrecerse */ }
}

export const anotarAvisosDescartados = (antes: QfdosAnnouncement[], despues: QfdosAnnouncement[]) =>
  anotarDescartados(CLAVE_AVISOS_DESCARTADOS, antes, despues);

export const anotarEnlacesDescartados = (antes: QfdosResourceLink[], despues: QfdosResourceLink[]) =>
  anotarDescartados(CLAVE_LINKS_DESCARTADOS, antes, despues);

function ofrecer<T extends { id: string }>(publicados: T[], nuevos: T[], claveDescartados: string): T[] {
  const descartados = leerIds(claveDescartados);
  const presentes = new Set(publicados.map(x => x.id));
  const candidatos = nuevos.filter(x => !presentes.has(x.id) && !descartados.has(x.id));
  return candidatos.length === 0 ? publicados : [...candidatos, ...publicados];
}

export function conEnlacesNuevos(publicados: QfdosResourceLink[], iniciales: QfdosResourceLink[]): QfdosResourceLink[] {
  return ofrecer(publicados, iniciales.filter(l => l.addedAt >= SEMBRAR_DESDE), CLAVE_LINKS_DESCARTADOS);
}

export function conAvisosNuevos(
  publicados: QfdosAnnouncement[],
  iniciales: QfdosAnnouncement[],
  idsAOfrecer: string[]
): QfdosAnnouncement[] {
  return ofrecer(publicados, iniciales.filter(a => idsAOfrecer.includes(a.id)), CLAVE_AVISOS_DESCARTADOS);
}

/**
 * Completa con la imagen y el crédito del código los enlaces publicados que
 * aún no los llevan (se publicaron antes de que existiera la ilustración).
 * Nunca pisa lo que el profesor haya puesto a mano.
 */
export function conMediosDelCodigo(enlaces: QfdosResourceLink[], iniciales: QfdosResourceLink[]): QfdosResourceLink[] {
  const porId = new Map(iniciales.map(l => [l.id, l]));
  let cambiado = false;
  const res = enlaces.map(l => {
    const base = porId.get(l.id);
    if (!base || l.imageUrl || !base.imageUrl) return l;
    cambiado = true;
    return { ...l, imageUrl: base.imageUrl, imageCredit: l.imageCredit ?? base.imageCredit };
  });
  return cambiado ? res : enlaces;
}

/**
 * Avisos que ve cada cual.
 *
 * El alumnado solo recibía los avisos publicados desde el CMS, así que un
 * aviso nuevo del código (AVISOS_A_OFRECER) no le llegaba hasta que el
 * profesor lo publicaba a mano: el del Tema 3 nunca salió en las Historias.
 * Ahora los avisos de AVISOS_A_OFRECER llegan a todo el mundo mientras sigan
 * en esa lista (para retirarlos, se quitan de ella). Además, si el código
 * marca un aviso para las Historias (enHistorias y temaId) y la copia
 * publicada no lo lleva, se completa con esas marcas.
 */
export function conAvisosDelCodigo(
  publicados: QfdosAnnouncement[],
  iniciales: QfdosAnnouncement[],
  idsAOfrecer: string[],
  esProfesor: boolean
): QfdosAnnouncement[] {
  let base: QfdosAnnouncement[];
  if (esProfesor) {
    base = conAvisosNuevos(publicados, iniciales, idsAOfrecer);
  } else {
    const presentes = new Set(publicados.map(a => a.id));
    const faltan = iniciales.filter(a => idsAOfrecer.includes(a.id) && !presentes.has(a.id));
    base = faltan.length ? [...faltan, ...publicados] : publicados;
  }
  const porId = new Map(iniciales.map(a => [a.id, a]));
  let cambiado = false;
  const res = base.map(a => {
    const c = porId.get(a.id);
    if (!c?.enHistorias || a.enHistorias) return a;
    cambiado = true;
    return { ...a, enHistorias: true, temaId: a.temaId ?? c.temaId, imageUrl: a.imageUrl ?? c.imageUrl };
  });
  return cambiado ? res : base;
}
