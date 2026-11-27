// ==========================================================================
// Vista docente privada del Tema 7 (tests, flashcards y podcast)
//
// El contenido vive en una carpeta privada de Drive y lo sirve Apps Script
// (acción `temaPrivado`) solo a la sesión del profesor titular; el servidor lo
// comprueba. Aquí no se guarda nada: ni localStorage, ni sessionStorage, ni
// caché del service worker. Todo vive en memoria mientras la pestaña esté
// abierta. Ante cualquier respuesta que no sea la esperada se devuelve null y
// la interfaz sigue mostrando lo público.
// ==========================================================================

import { getSesion, tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';
import { senalConLimite } from './googleSheetsService';
import type { Flashcard, TestQuestion } from '../data/qfdosData';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();
const NOMBRE_IMAGEN = /^[A-Za-z0-9_.-]{1,120}\.png$/i;
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

export interface PreguntaPrivada {
  n: number;
  titulo: string;
  enunciado: string;
  /** Data URL en memoria, o null */
  imagen: string | null;
  /** Estructura de cada opción (4 data URL) o null si las opciones son solo texto */
  opcionesImagen: (string | null)[] | null;
  opciones: string[];
  correcta: number;
  nivel: number;
  apuntes: string;
  justificacion: string;
  distractores: Record<string, string>;
}

export interface ModeloPrivado {
  id: string;
  titulo: string;
  preguntas: PreguntaPrivada[];
}

export interface TemaPrivado {
  temaId: string;
  modelos: ModeloPrivado[];
  flashcards: Flashcard[];
}

async function llamar(cuerpo: Record<string, unknown>, ms: number): Promise<Record<string, unknown> | null> {
  // Solo con sesión de profesor; el servidor decide si es el titular
  if (!WEBAPP_URL || getSesion()?.rol !== 'profesor') return null;
  try {
    await renovarSiHaceFalta();
    const sesion = tokenSesion();
    if (!sesion) return null;
    const resp = await fetch(`${WEBAPP_URL}?accion=temaPrivado`, {
      method: 'POST',
      // text/plain evita la petición previa de CORS, que Apps Script no atiende
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...cuerpo, sesion }),
      redirect: 'follow',
      cache: 'no-store',
      credentials: 'omit',
      signal: senalConLimite(ms)
    });
    const c = await resp.json().catch(() => null);
    if (!c || typeof c !== 'object' || esSesionInvalida(c)) return null;
    return (c as { ok?: unknown }).ok === true ? (c as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

const esTexto = (v: unknown): v is string => typeof v === 'string';

function dataUrl(imagenes: Record<string, { mime?: unknown; base64?: unknown }>, nombre: unknown): string | null {
  if (!esTexto(nombre) || !NOMBRE_IMAGEN.test(nombre)) return null;
  const i = imagenes[nombre];
  if (!i || i.mime !== 'image/png' || !esTexto(i.base64) || !BASE64.test(i.base64)) return null;
  return `data:image/png;base64,${i.base64}`;
}

/** Temas con modelos de examen privados (solo docente). El Tema 7 conserva además tests propios, flashcards y podcast. */
export const TEMAS_MODELOS_DOCENTE = ['tema-01', 'tema-02', 'tema-03', 'tema-04', 'tema-05', 'tema-06'];

/** Contenido privado de un tema (por defecto el 7) o null (no es el titular, no hay red, el script no tiene ese tema o el formato no es el esperado). */
export async function cargarTemaPrivado(temaId: string = 'tema-07'): Promise<TemaPrivado | null> {
  const c = await llamar({ op: 'datos', temaId }, 60000);
  const d = c?.datos as Record<string, unknown> | undefined;
  if (!d || d.version !== 1 || d.temaId !== temaId || !Array.isArray(d.tests) || !Array.isArray(d.flashcards)) return null;
  const imagenes = (d.imagenes && typeof d.imagenes === 'object' ? d.imagenes : {}) as Record<string, { mime?: unknown; base64?: unknown }>;
  try {
    const modelos: ModeloPrivado[] = (d.tests as Record<string, unknown>[]).map(m => ({
      id: String(m.id),
      titulo: String(m.titulo),
      preguntas: (m.preguntas as Record<string, unknown>[]).map(p => {
        const opciones = (p.opciones as unknown[]).map(String);
        const correcta = Number(p.correcta);
        if (opciones.length !== 4 || !(correcta >= 0 && correcta < 4)) throw new Error('formato');
        return {
          n: Number(p.n),
          titulo: String(p.titulo ?? ''),
          enunciado: String(p.enunciado ?? ''),
          imagen: dataUrl(imagenes, p.imagen),
          opcionesImagen: Array.isArray(p.opcionesImagen) && p.opcionesImagen.length === 4 ? (p.opcionesImagen as unknown[]).map(n => dataUrl(imagenes, n)) : null,
          opciones,
          correcta,
          nivel: Number(p.nivel) || 0,
          apuntes: String(p.apuntes ?? ''),
          justificacion: String(p.justificacion ?? ''),
          distractores: (p.distractores && typeof p.distractores === 'object' ? p.distractores : {}) as Record<string, string>
        };
      })
    }));
    if (!modelos.length || modelos.some(m => !m.preguntas.length)) return null;
    const aImagen = (r?: string) => (r ? dataUrl(imagenes, r) ?? undefined : undefined);
    const flashcards = (d.flashcards as Flashcard[]).map(f => ({
      ...f,
      imagePath: aImagen(f.imagePath),
      structures: f.structures?.map(s => ({ ...s, imagePath: aImagen(s.imagePath) }))
    }));
    return { temaId, modelos, flashcards };
  } catch {
    return null;
  }
}

/** Preguntas en el formato del resto de la web, solo para que los botones del tema se habiliten. */
export function preguntasComoTest(t: TemaPrivado): TestQuestion[] {
  return t.modelos.flatMap(m => m.preguntas.map(p => ({
    id: `${m.id}-q${String(p.n).padStart(2, '0')}`,
    topicId: 'tema-07',
    question: p.enunciado,
    options: p.opciones,
    correctIndex: p.correcta,
    explanation: p.justificacion
  })));
}

/**
 * Podcast: llega por trozos (Apps Script no sirve ficheros binarios) y se
 * monta como Blob en memoria. Devuelve una URL blob: o null.
 */
export type ResultadoAudio = { url: string } | { error: string };

/**
 * Descarga el audio por trozos. Informa del avance (`alProgreso(hechos, total)`) y, si
 * algo falla, devuelve un mensaje claro del paso que falló en lugar de un null mudo.
 */
export async function cargarAudioPrivado(alProgreso?: (hechos: number, total: number) => void): Promise<ResultadoAudio> {
  const info = await llamar({ op: 'audioInfo' }, 20000);
  if (!info) return { error: 'El servidor no ha devuelto los datos del audio (audioInfo): no ha respondido a tiempo, la sesión ha caducado o el audio no está disponible.' };
  const trozos = Number(info.trozos);
  const tamano = Number(info.tamano);
  if (!Number.isInteger(trozos) || trozos < 1 || trozos > 64 || !(tamano > 0)) return { error: 'Los datos del audio que devuelve el servidor no son válidos (audioInfo).' };
  alProgreso?.(0, trozos);
  const partes: Uint8Array[] = [];
  let total = 0;
  for (let n = 0; n < trozos; n++) {
    const c = await llamar({ op: 'audioTrozo', n }, 60000);
    if (!c) return { error: `Ha fallado la descarga del trozo ${n + 1} de ${trozos}: el servidor no ha respondido a tiempo o ha devuelto un error.` };
    if (!esTexto(c.base64) || !BASE64.test(c.base64)) return { error: `El trozo ${n + 1} de ${trozos} llegó con un formato no válido.` };
    const bin = atob(c.base64);
    const u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    partes.push(u);
    total += u.length;
    alProgreso?.(n + 1, trozos);
  }
  if (total !== tamano) return { error: 'El audio descargado está incompleto: el tamaño recibido no coincide con el esperado.' };
  // El blob vive solo en memoria; no se guarda en localStorage ni en la caché
  return { url: URL.createObjectURL(new Blob(partes as BlobPart[], { type: 'audio/mpeg' })) };
}
