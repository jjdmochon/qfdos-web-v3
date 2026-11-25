// ==========================================================================
// Exámenes privados del profesor
//
// Los documentos viven en una carpeta privada de Drive y los sirve Codigo.gs
// (acción `examenesPrivados`), que comprueba en el servidor que la sesión es la
// del profesor. Aquí no se guarda nada: ni en localStorage, ni en
// sessionStorage, ni en la caché del service worker. Todo vive en memoria del
// componente que lo pide y desaparece al cerrarlo. Ante cualquier respuesta que
// no sea la esperada se devuelve null y la interfaz no pinta nada.
// ==========================================================================

import { getSesion, tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';
import { senalConLimite } from './googleSheetsService';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();

export interface DocumentoPrivado {
  id: string;
  nombre: string;
  tamano: number;
}

const MIMES_IMAGEN = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);
const NOMBRE_IMAGEN = /^[A-Za-z0-9_.-]{1,120}\.(png|jpe?g|webp|gif)$/i;
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

async function llamar(cuerpo: Record<string, unknown>, ms: number): Promise<Record<string, unknown> | null> {
  // Solo con sesión de profesor; el servidor lo vuelve a comprobar
  if (!WEBAPP_URL || getSesion()?.rol !== 'profesor') return null;
  try {
    await renovarSiHaceFalta();
    const sesion = tokenSesion();
    if (!sesion) return null;
    const resp = await fetch(`${WEBAPP_URL}?accion=examenesPrivados`, {
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

/** Lista de documentos, o null si no es el profesor, no hay red o el script no tiene la acción. */
export async function listaExamenesPrivados(): Promise<DocumentoPrivado[] | null> {
  const c = await llamar({ op: 'lista' }, 15000);
  // Un script anterior contesta ok a cualquier acción, sin `documentos`
  if (!c || !Array.isArray(c.documentos)) return null;
  const docs: DocumentoPrivado[] = [];
  for (const d of c.documentos) {
    if (d && typeof d === 'object' && typeof (d as DocumentoPrivado).id === 'string' && typeof (d as DocumentoPrivado).nombre === 'string') {
      docs.push({
        id: (d as DocumentoPrivado).id,
        nombre: (d as DocumentoPrivado).nombre,
        tamano: Number.isFinite((d as DocumentoPrivado).tamano) ? Number((d as DocumentoPrivado).tamano) : 0
      });
    }
  }
  return docs;
}

export async function leerExamenPrivado(id: string): Promise<{ nombre: string; texto: string } | null> {
  const c = await llamar({ op: 'leer', id }, 20000);
  if (!c || typeof c.texto !== 'string' || typeof c.nombre !== 'string') return null;
  return { nombre: c.nombre, texto: c.texto };
}

/** Imagen como data URL (solo en memoria), o null. `nombre` es el nombre exacto, sin carpeta. */
export async function imagenExamenPrivado(nombre: string): Promise<string | null> {
  if (!NOMBRE_IMAGEN.test(nombre)) return null;
  const c = await llamar({ op: 'imagenNombre', nombre }, 30000);
  if (!c || typeof c.mime !== 'string' || typeof c.base64 !== 'string') return null;
  if (!MIMES_IMAGEN.has(c.mime) || !BASE64.test(c.base64)) return null;
  return `data:${c.mime};base64,${c.base64}`;
}
