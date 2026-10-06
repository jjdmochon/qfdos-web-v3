// ==========================================================================
// Música de fondo de las Historias
//
// Se sintetiza en el navegador con Web Audio: no hay ficheros ni derechos de
// terceros. Es un bucle de rock alternativo instrumental (La menor, Am–F–C–G,
// 130 bpm) con batería, bajo y guitarra distorsionada en quintas. La primera
// vuelta va con guitarra apagada (palm mute) y la segunda abre los acordes,
// para que el bucle crezca un poco y no canse.
//
// Solo arranca tras un gesto del usuario (abrir una historia), así que el
// navegador no lo bloquea. El visor decide cuándo suena: en las historias sin
// sonido propio, sin pausa y sin silencio.
// ==========================================================================

const BPM = 130;
const SEMICORCHEA = 60 / BPM / 4;
const PASOS_POR_COMPAS = 16;
const COMPASES = 4;
const VUELTAS = 2;
const VOLUMEN = 0.22;
const ANTICIPACION_S = 0.12;

/** Raíz MIDI de cada compás: Am (La2), F (Fa2), C (Do3), G (Sol2) */
const PROGRESION = [45, 41, 48, 43];

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let busGuitarra: GainNode | null = null;
let ruido: AudioBuffer | null = null;
let temporizador = 0;
let siguiente = 0;
let paso = 0;
let sonando = false;
let parada = 0;

const frecuencia = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

function curvaDistorsion(k: number): Float32Array {
  const n = 1024;
  const curva = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curva[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
  }
  return curva;
}

function preparar(): boolean {
  if (ctx) return true;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return false;
  ctx = new Ctor();

  const compresor = ctx.createDynamicsCompressor();
  compresor.threshold.value = -18;
  compresor.ratio.value = 4;
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(compresor).connect(ctx.destination);

  // Guitarra: las notas entran limpias y se distorsionan juntas, como en un amplificador
  busGuitarra = ctx.createGain();
  busGuitarra.gain.value = 0.5;
  const saturacion = ctx.createWaveShaper();
  saturacion.curve = curvaDistorsion(40);
  saturacion.oversample = '2x';
  const altavoz = ctx.createBiquadFilter();
  altavoz.type = 'lowpass';
  altavoz.frequency.value = 4200;
  busGuitarra.connect(saturacion).connect(altavoz).connect(master);

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
  o.frequency.setValueAtTime(150, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
  envolvente(g, t, 1, 0.003, 0.32);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.35);
}

function golpeRuido(t: number, tipo: BiquadFilterType, corte: number, pico: number, duracion: number) {
  if (!ctx || !master || !ruido) return;
  const s = ctx.createBufferSource();
  s.buffer = ruido;
  const f = ctx.createBiquadFilter();
  f.type = tipo;
  f.frequency.value = corte;
  const g = ctx.createGain();
  envolvente(g, t, pico, 0.002, duracion);
  s.connect(f).connect(g).connect(master);
  s.start(t);
  s.stop(t + duracion + 0.02);
}

function caja(t: number) {
  if (!ctx || !master) return;
  golpeRuido(t, 'highpass', 1200, 0.55, 0.18);
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.value = 185;
  envolvente(g, t, 0.35, 0.002, 0.1);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.12);
}

function bajo(t: number, midi: number, duracion: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator();
  o.type = 'sawtooth';
  o.frequency.value = frecuencia(midi - 12);
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 650;
  const g = ctx.createGain();
  envolvente(g, t, 0.32, 0.006, duracion);
  o.connect(f).connect(g).connect(master);
  o.start(t);
  o.stop(t + duracion + 0.02);
}

/** Acorde de quinta (raíz, quinta y octava) con dos osciladores ligeramente desafinados por nota */
function guitarra(t: number, midi: number, duracion: number, apagada: boolean) {
  if (!ctx || !busGuitarra) return;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = apagada ? 900 : 3200;
  const g = ctx.createGain();
  envolvente(g, t, apagada ? 0.5 : 0.42, 0.004, duracion);
  f.connect(g).connect(busGuitarra);
  for (const intervalo of [0, 7, 12]) {
    for (const cents of [-7, 7]) {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = frecuencia(midi + intervalo);
      o.detune.value = cents;
      o.connect(f);
      o.start(t);
      o.stop(t + duracion + 0.02);
    }
  }
}

function tocarPaso(p: number, t: number) {
  const compas = Math.floor(p / PASOS_POR_COMPAS) % COMPASES;
  const s = p % PASOS_POR_COMPAS;
  const vuelta = Math.floor(p / (PASOS_POR_COMPAS * COMPASES));
  const raiz = PROGRESION[compas];

  if (s === 0 || s === 8 || s === 10) bombo(t);
  if (s === 4 || s === 12) caja(t);
  if (s % 2 === 0) golpeRuido(t, 'highpass', 8000, s % 4 === 0 ? 0.22 : 0.12, 0.05);
  if (s % 2 === 0) bajo(t, s === 14 ? raiz + 12 : raiz, SEMICORCHEA * 1.8);

  if (vuelta === 0) {
    if (s % 2 === 0) guitarra(t, raiz, SEMICORCHEA * 1.5, true);
  } else {
    if (s === 0 && compas === 0) golpeRuido(t, 'highpass', 5000, 0.3, 1.2); // platillo al abrir
    if (s === 0 || s === 8) guitarra(t, raiz, SEMICORCHEA * 7.5, false);
    if (s === 14) guitarra(t, raiz, SEMICORCHEA * 1.5, true);
  }
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
    void ctx.suspend();
  }, fundido * 1000 + 100);
}

const CLAVE_SILENCIO = 'qfdos_v3_historias_silencio';

/** Preferencia de silencio del visor (se recuerda entre visitas). */
export function leerSilencio(): boolean {
  try { return localStorage.getItem(CLAVE_SILENCIO) === '1'; } catch { return false; }
}

export function guardarSilencio(silencio: boolean): void {
  try { localStorage.setItem(CLAVE_SILENCIO, silencio ? '1' : '0'); } catch { /* sin almacenamiento: dura la sesión */ }
}
