// ==========================================================================
// Audio que el reproductor de la web puede cargar
//
// Lo que se sube desde «Gestionar curso» queda en Drive con un enlace del
// tipo drive.google.com/file/d/ID/view: es una página web, no un MP3, y el
// elemento <audio> no puede reproducirlo. Aquí se traduce a la descarga
// directa del fichero y, si aun así falla, el reproductor cae en el visor
// de Drive, que trae su propio reproductor.
// ==========================================================================

/** Id del fichero en un enlace de Drive, o null si no es de Drive. */
export function idDeDrive(url?: string): string | null {
  if (!url || !/(^|\/\/)(drive|docs)\.google\.com\//.test(url)) return null;
  const m = url.match(/\/file\/d\/([\w-]{10,})/) ?? url.match(/[?&]id=([\w-]{10,})/);
  return m ? m[1] : null;
}

/** URL que puede ir en el src de un <audio>. Las rutas relativas cuelgan de BASE_URL. */
export function fuenteAudio(url?: string): string | undefined {
  if (!url) return undefined;
  const id = idDeDrive(url);
  if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
  if (/^(https?:|data:|blob:|\/)/i.test(url)) return url;
  return `${import.meta.env.BASE_URL}${url}`;
}

/** Visor de Drive con reproductor propio, para cuando la descarga directa no suena. */
export const vistaPreviaDrive = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
