// ==========================================================================
// Progreso personal sincronizado entre dispositivos
//
// Las valoraciones de flashcards se guardan en el navegador (funciona sin
// conexión) y, si hay sesión, también en la pestaña oculta `_Progreso` de la
// hoja de entregas, a través de Codigo.gs. El servidor solo almacena; la
// fusión la hace el cliente con una marca de tiempo por tarjeta: gana la
// valoración más reciente en cualquiera de los dos dispositivos.
// ==========================================================================

import { tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();

export type Nivel = 'easy' | 'medium' | 'hard';
export type Valoraciones = Record<string, Nivel>;
export type Marcas = Record<string, number>;
/** Lo que viaja al servidor: id de tarjeta → [nivel, marca de tiempo en ms] */
export type ProgresoTarjetas = Record<string, [Nivel, number]>;

const NIVELES: Nivel[] = ['easy', 'medium', 'hard'];

export function claveFlashcards(temaId: string): string {
  return `flashcards_${temaId.toLowerCase().replace(/[^a-z0-9_-]/g, '_').slice(0, 40)}`;
}

async function llamar(accion: string, cuerpo?: unknown): Promise<Record<string, unknown> | null> {
  if (!WEBAPP_URL) return null;
  await renovarSiHaceFalta();
  const sesion = tokenSesion();
  if (!sesion) return null;
  const url = `${WEBAPP_URL}?accion=${accion}&sesion=${encodeURIComponent(sesion)}&t=${Date.now()}`;
  try {
    const resp = await fetch(
      url,
      cuerpo === undefined
        ? { method: 'GET', redirect: 'follow' }
        : {
            method: 'POST',
            // text/plain evita la petición previa de CORS, que Apps Script no atiende
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(cuerpo),
            redirect: 'follow'
          }
    );
    const c = await resp.json().catch(() => null);
    if (!c || esSesionInvalida(c)) return null;
    return c.ok ? c : null;
  } catch {
    return null;
  }
}

/** Progreso remoto de un tema, o null si no hay sesión, red o Codigo.gs v8. */
export async function leerProgresoTarjetas(temaId: string): Promise<ProgresoTarjetas | null> {
  const c = await llamar('leerProgreso');
  // Un script anterior a la v8 contesta ok a cualquier acción, sin `progreso`
  if (!c || typeof c.progreso !== 'object' || c.progreso === null) return null;
  const crudo = (c.progreso as Record<string, unknown>)[claveFlashcards(temaId)];
  const limpio: ProgresoTarjetas = {};
  if (crudo && typeof crudo === 'object') {
    for (const [id, v] of Object.entries(crudo as Record<string, unknown>)) {
      if (Array.isArray(v) && NIVELES.includes(v[0] as Nivel) && Number.isFinite(v[1])) {
        limpio[id] = [v[0] as Nivel, Number(v[1])];
      }
    }
  }
  return limpio;
}

export async function guardarProgresoTarjetas(temaId: string, valor: ProgresoTarjetas): Promise<boolean> {
  return !!(await llamar('guardarProgreso', { clave: claveFlashcards(temaId), valor }));
}

export function aProgreso(v: Valoraciones, m: Marcas): ProgresoTarjetas {
  const r: ProgresoTarjetas = {};
  for (const id of Object.keys(v)) r[id] = [v[id], m[id] ?? 0];
  return r;
}

/** Por tarjeta gana la marca más reciente; a igualdad, la local. */
export function fusionar(
  local: ProgresoTarjetas,
  remoto: ProgresoTarjetas
): { fusion: ProgresoTarjetas; cambiaLocal: boolean; cambiaRemoto: boolean } {
  const fusion: ProgresoTarjetas = { ...local };
  let cambiaLocal = false;
  let cambiaRemoto = false;
  for (const id of new Set([...Object.keys(local), ...Object.keys(remoto)])) {
    const l = local[id];
    const r = remoto[id];
    if (l && (!r || l[1] >= r[1])) {
      fusion[id] = l;
      if (!r || r[0] !== l[0] || r[1] !== l[1]) cambiaRemoto = true;
    } else if (r) {
      fusion[id] = r;
      cambiaLocal = true;
    }
  }
  return { fusion, cambiaLocal, cambiaRemoto };
}
