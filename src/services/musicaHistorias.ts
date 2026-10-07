// ==========================================================================
// Sonido de las Historias
//
// Solo efectos de interfaz suaves, los de Kenney (CC0) que usa brag, en MP3
// pequeños dentro de public/historias/sfx: un golpe al abrir, una carta que se
// desliza al cambiar de historia y un toque al pausar o activar el sonido.
// Las historias con vídeo o audio propio suenan con su propio medio; las demás
// van en silencio (se retiró la música sintetizada de fondo).
//
// Todo arranca tras un gesto del usuario (abrir una historia), así que el
// navegador no lo bloquea.
// ==========================================================================

const VOLUMEN_EFECTOS = 0.7;

let ctx: AudioContext | null = null;
const efectos = new Map<string, AudioBuffer>();

function preparar(): AudioContext | null {
  if (ctx) return ctx;
  const Ctor = window.AudioContext
    ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  try { ctx = new Ctor(); } catch { return null; }
  return ctx;
}

export type EfectoHistoria = 'abrir' | 'deslizar' | 'toque';

/** Efecto de interfaz (CC0, Kenney). Se descarga la primera vez y se guarda en memoria. */
export async function efectoHistoria(nombre: EfectoHistoria): Promise<void> {
  try {
    const contexto = preparar();
    if (!contexto) return;
    if (contexto.state === 'suspended') await contexto.resume();
    let buffer = efectos.get(nombre);
    if (!buffer) {
      const resp = await fetch(`${import.meta.env.BASE_URL}historias/sfx/${nombre}.mp3`);
      if (!resp.ok) return;
      buffer = await contexto.decodeAudioData(await resp.arrayBuffer());
      efectos.set(nombre, buffer);
    }
    const fuente = contexto.createBufferSource();
    fuente.buffer = buffer;
    const g = contexto.createGain();
    g.gain.value = VOLUMEN_EFECTOS;
    fuente.connect(g).connect(contexto.destination);
    fuente.start();
  } catch {
    /* sin Web Audio o sin red: la historia sigue sin el efecto */
  }
}

const CLAVE_SILENCIO = 'qfdos_v3_historias_silencio';

/** Preferencia de silencio del visor (se recuerda entre visitas). */
export function leerSilencio(): boolean {
  try { return localStorage.getItem(CLAVE_SILENCIO) === '1'; } catch { return false; }
}

export function guardarSilencio(silencio: boolean): void {
  try { localStorage.setItem(CLAVE_SILENCIO, silencio ? '1' : '0'); } catch { /* sin almacenamiento: dura la sesión */ }
}
