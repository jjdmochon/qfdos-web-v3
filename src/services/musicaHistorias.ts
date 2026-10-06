// ==========================================================================
// Sonido de las Historias
//
// Mismo carácter que los vídeos de /brag: un groove luminoso y optimista de
// «business beats» (120 bpm, Do mayor, I–V–vi–IV) y efectos de interfaz suaves.
//
// · La música se sintetiza en el navegador con Web Audio: bombo suave, palmas,
//   charles, bajo con pluck, arpegio de teclas con eco y un colchón de acordes.
//   No hay ficheros ni derechos de terceros. La segunda vuelta del bucle añade
//   colchón y semicorcheas de charles para que no se haga monótono.
// · Los efectos (abrir, deslizar, toque) son los de Kenney (CC0) que usa brag,
//   convertidos a MP3 pequeños en public/historias/sfx.
//
// Todo arranca tras un gesto del usuario (abrir una historia), así que el
// navegador no lo bloquea. El visor decide cuándo suena la música: en las
// historias sin sonido propio, sin pausa y sin silencio.
// ==========================================================================

const BPM = 120;
const SEMICORCHEA = 60 / BPM / 4;
const PASOS_POR_COMPAS = 16;
const COMPASES = 4;
const VUELTAS = 2;
const VOLUMEN = 0.2;
const VOLUMEN_EFECTOS = 0.7;
const ANTICIPACION_S = 0.12;

/** Raíz MIDI de cada compás: C (Do3), G (Sol2), Am (La2), F (Fa2) */
const RAICES = [48, 43, 45, 41];
/** Notas del acorde (semitonos sobre la raíz) de cada compás: C, G, Am, F */
const ACORDES = [[0, 4, 7], [0, 4, 7], [0, 3, 7], [0, 4, 7]];
/** Pasos del bajo (sincopado) y el intervalo que toca en cada uno */
const PASOS_BAJO: Record<number, number> = { 0: 0, 3: 0, 6: 12, 8: 0, 10: 7, 12: 0, 14: 12 };

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let busTeclas: GainNode | null = null;
let ruido: AudioBuffer | null = null;
let temporizador = 0;
let siguiente = 0;
let paso = 0;
let sonando = false;
let parada = 0;
let ultimoEfecto = 0;
const efectos = new Map<string, AudioBuffer>();

const frecuencia = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

function preparar(): boolean {
  if (ctx) return true;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return false;
  ctx = new Ctor();

  const compresor = ctx.createDynamicsCompressor();
  compresor.threshold.value = -20;
  compresor.ratio.value = 3;
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(compresor).connect(ctx.destination);

  // Teclas con eco de corchea con puntillo (el brillo típico de estos temas)
  busTeclas = ctx.createGain();
  busTeclas.gain.value = 0.55;
  const eco = ctx.createDelay(1);
  eco.delayTime.value = (60 / BPM) * 0.75;
  const realimentacion = ctx.createGain();
  realimentacion.gain.value = 0.32;
  const humedo = ctx.createGain();
  humedo.gain.value = 0.35;
  busTeclas.connect(master);
  busTeclas.connect(eco);
  eco.connect(realimentacion).connect(eco);
  eco.connect(humedo).connect(master);

  ruido = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const datos = ruido.getChannelData(0);
  for (let i = 0; i < datos.length; i++) datos[i] = Math.random() * 2 - 1;
  return true;
}

function envolvente(g: GainNode, t: number, pico: number, ataque: number, duracion: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(pico, t + ataque);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duracion);
}

function bombo(t: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.setValueAtTime(130, t);
  o.frequency.exponentialRampToValueAtTime(48, t + 0.1);
  envolvente(g, t, 0.85, 0.003, 0.26);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.3);
}

function golpeRuido(t: number, tipo: BiquadFilterType, corte: number, pico: number, duracion: number, q = 0.7) {
  if (!ctx || !master || !ruido) return;
  const s = ctx.createBufferSource();
  s.buffer = ruido;
  const f = ctx.createBiquadFilter();
  f.type = tipo;
  f.frequency.value = corte;
  f.Q.value = q;
  const g = ctx.createGain();
  envolvente(g, t, pico, 0.002, duracion);
  s.connect(f).connect(g).connect(master);
  s.start(t);
  s.stop(t + duracion + 0.02);
}

/** Palmas: tres ráfagas muy cortas de ruido filtrado y una cola breve */
function palmas(t: number) {
  golpeRuido(t, 'bandpass', 1500, 0.5, 0.05, 1.2);
  golpeRuido(t + 0.012, 'bandpass', 1700, 0.45, 0.05, 1.2);
  golpeRuido(t + 0.024, 'bandpass', 1600, 0.5, 0.16, 1.2);
}

function bajo(t: number, midi: number, duracion: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator();
  o.type = 'sawtooth';
  o.frequency.value = frecuencia(midi);
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.Q.value = 6;
  f.frequency.setValueAtTime(1400, t);
  f.frequency.exponentialRampToValueAtTime(260, t + duracion);
  const g = ctx.createGain();
  envolvente(g, t, 0.34, 0.005, duracion);
  o.connect(f).connect(g).connect(master);
  o.start(t);
  o.stop(t + duracion + 0.02);
}

/** Pluck de teclas: dos osciladores (triángulo y seno una octava arriba) con ataque seco */
function tecla(t: number, midi: number, duracion: number, pico: number) {
  if (!ctx || !busTeclas) return;
  const g = ctx.createGain();
  envolvente(g, t, pico, 0.004, duracion);
  g.connect(busTeclas);
  for (const [tipo, mult] of [['triangle', 1], ['sine', 2]] as const) {
    const o = ctx.createOscillator();
    o.type = tipo;
    o.frequency.value = frecuencia(midi) * mult;
    o.connect(g);
    o.start(t);
    o.stop(t + duracion + 0.02);
  }
}

/** Colchón de acorde: senos suaves de un compás de duración */
function colchon(t: number, midiRaiz: number, notas: number[]) {
  if (!ctx || !master) return;
  const duracion = SEMICORCHEA * PASOS_POR_COMPAS;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.1, t + 0.25);
  g.gain.linearRampToValueAtTime(0.0001, t + duracion);
  g.connect(master);
  for (const n of notas) {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = frecuencia(midiRaiz + 12 + n);
    o.connect(g);
    o.start(t);
    o.stop(t + duracion + 0.05);
  }
}

function tocarPaso(p: number, t: number) {
  const compas = Math.floor(p / PASOS_POR_COMPAS) % COMPASES;
  const s = p % PASOS_POR_COMPAS;
  const vuelta = Math.floor(p / (PASOS_POR_COMPAS * COMPASES));
  const raiz = RAICES[compas];
  const acorde = ACORDES[compas];

  if (s % 4 === 0) bombo(t);
  if (s === 4 || s === 12) palmas(t);
  if (s % 4 === 2) golpeRuido(t, 'highpass', 8500, 0.2, 0.06);
  if (vuelta === 1 && s % 2 === 1) golpeRuido(t, 'highpass', 9000, 0.08, 0.03);

  if (s in PASOS_BAJO) bajo(t, raiz + PASOS_BAJO[s], SEMICORCHEA * 2.2);

  // Arpegio de corcheas con el acorde del compás, una octava y media por encima del bajo
  if (s % 2 === 0) {
    const nota = acorde[(s / 2) % acorde.length] + (s >= 8 ? 12 : 0);
    tecla(t, raiz + 24 + nota, SEMICORCHEA * 3, vuelta === 1 ? 0.2 : 0.15);
  }

  if (vuelta === 1 && s === 0) colchon(t, raiz, acorde);
}

function programar() {
  if (!ctx) return;
  while (siguiente < ctx.currentTime + ANTICIPACION_S) {
    tocarPaso(paso, siguiente);
    siguiente += SEMICORCHEA;
    paso = (paso + 1) % (PASOS_POR_COMPAS * COMPASES * VUELTAS);
  }
}

/** Arranca (o reanuda) la música con una entrada suave. */
export function sonarMusica(): void {
  if (!preparar() || !ctx || !master) return;
  window.clearTimeout(parada);
  sonando = true;
  void ctx.resume();
  if (!temporizador) {
    siguiente = ctx.currentTime + 0.05;
    temporizador = window.setInterval(programar, 25);
  }
  const ahora = ctx.currentTime;
  master.gain.cancelScheduledValues(ahora);
  master.gain.setValueAtTime(master.gain.value, ahora);
  master.gain.linearRampToValueAtTime(VOLUMEN, ahora + 0.8);
}

/** Baja la música hasta silencio y, si nadie la vuelve a pedir, detiene el reloj. */
export function silenciarMusica(fundido = 0.6): void {
  if (!ctx || !master || !sonando) return;
  sonando = false;
  const ahora = ctx.currentTime;
  master.gain.cancelScheduledValues(ahora);
  master.gain.setValueAtTime(master.gain.value, ahora);
  master.gain.linearRampToValueAtTime(0, ahora + fundido);
  window.clearTimeout(parada);
  parada = window.setTimeout(() => {
    if (sonando || !ctx) return;
    window.clearInterval(temporizador);
    temporizador = 0;
    // No se suspende el contexto si acaba de sonar un efecto: lo cortaría
    if (ctx.currentTime - ultimoEfecto > 1.5) void ctx.suspend();
  }, fundido * 1000 + 100);
}

export type EfectoHistoria = 'abrir' | 'deslizar' | 'toque';

/** Efecto de interfaz (CC0, Kenney). Se descarga la primera vez y se guarda en memoria. */
export async function efectoHistoria(nombre: EfectoHistoria): Promise<void> {
  try {
    if (!preparar() || !ctx) return;
    const contexto = ctx;
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
    ultimoEfecto = contexto.currentTime;
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
