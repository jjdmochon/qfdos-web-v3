// ==========================================================================
// Cola de intentos sin registrar
//
// Un test que no llega a la hoja (sin red, sesión caducada, servidor
// saturado, claves aún sin publicar) se queda aquí y se reenvía solo: al
// abrir la plataforma, al recuperar la conexión y al abrir un test. Antes
// quedaba únicamente en el historial local, y la siguiente sincronización
// con la hoja lo borraba: la nota se perdía sin aviso.
//
// Reenviar es seguro: cada intento lleva su id y el servidor no anota dos
// veces el mismo (columna «Id intento» de Calificaciones.gs).
// ==========================================================================

import type { QuizRegistrationRecord } from '../data/qfdosData';
import { submitAttemptToGoogleSheets, esIntentoDeTest, type GoogleSheetsSubmissionResult } from './googleSheetsService';
import { getSesion } from './sesion';

const CLAVE = 'qfdos_intentos_pendientes';
const MAX_PENDIENTES = 50;
const CADUCIDAD_MS = 60 * 24 * 60 * 60 * 1000; // 60 días

interface Pendiente {
  intento: QuizRegistrationRecord;
  /** Cuenta con la que se hizo: solo esa sesión lo reenvía */
  cuenta: string;
  creado: number;
  envios: number;
  ultimoError?: string;
}

export const EVENTO_PENDIENTES = 'qfdos:intentos-pendientes';

const norm = (c?: string) => (c || '').toLowerCase().trim();

function leer(): Pendiente[] {
  try {
    const raw = localStorage.getItem(CLAVE);
    const lista = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(lista)) return [];
    const limite = Date.now() - CADUCIDAD_MS;
    return lista.filter((p: Pendiente) => p?.intento?.id && p.creado > limite);
  } catch {
    return [];
  }
}

function escribir(lista: Pendiente[]): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista.slice(-MAX_PENDIENTES)));
  } catch {
    // cuota llena: el intento sigue en el historial local
  }
  try { window.dispatchEvent(new Event(EVENTO_PENDIENTES)); } catch { /* sin window */ }
}

/** Se llama antes de enviar: si el envío falla o la pestaña se cierra, el intento no se pierde. */
export function encolarIntento(intento: QuizRegistrationRecord, cuenta?: string): void {
  if (!esIntentoDeTest(intento)) return;
  const lista = leer();
  if (lista.some(p => p.intento.id === intento.id)) return;
  const { pendienteRegistro: _p, ...limpio } = intento;
  lista.push({ intento: limpio, cuenta: norm(cuenta || getSesion()?.email || intento.studentEmail), creado: Date.now(), envios: 0 });
  escribir(lista);
}

export function quitarIntento(id: string): void {
  const lista = leer();
  const resto = lista.filter(p => p.intento.id !== id);
  if (resto.length !== lista.length) escribir(resto);
}

/** Intentos en cola de una cuenta, marcados como pendientes de registro. */
export function intentosPendientes(cuenta: string): QuizRegistrationRecord[] {
  const c = norm(cuenta);
  return leer().filter(p => p.cuenta === c).map(p => ({ ...p.intento, pendienteRegistro: true }));
}

/** El resultado del envío decide si el intento sale de la cola. */
export function anotarResultado(id: string, res: GoogleSheetsSubmissionResult): void {
  // Registrado, o rechazado sin remedio (respuestas que el servidor no puede corregir)
  if (res.status === 'sent' || res.codigo === 'correccion_no_verificable') {
    quitarIntento(id);
    return;
  }
  const lista = leer();
  const p = lista.find(x => x.intento.id === id);
  if (!p) return;
  p.envios += 1;
  p.ultimoError = res.message;
  escribir(lista);
}

let enCurso: Promise<number> | null = null;

/**
 * Reenvía los intentos en cola de la cuenta con sesión abierta. Devuelve
 * cuántos quedaron registrados. «sent_unconfirmed» no saca el intento de la
 * cola: se reintenta y el servidor responde con la fila que ya existe.
 */
export function reenviarPendientes(): Promise<number> {
  if (enCurso) return enCurso;
  enCurso = (async () => {
    const cuenta = norm(getSesion()?.email);
    if (!cuenta || (typeof navigator !== 'undefined' && navigator.onLine === false)) return 0;
    let registrados = 0;
    for (const p of leer().filter(x => x.cuenta === cuenta)) {
      const res = await submitAttemptToGoogleSheets(p.intento);
      anotarResultado(p.intento.id, res);
      if (res.status === 'sent') registrados++;
      // Sin sesión o sin red no tiene sentido seguir con el resto ahora
      if (res.status === 'sesion_invalida' || (res.status === 'network_error' && res.codigo !== 'ocupado')) break;
    }
    return registrados;
  })().finally(() => { enCurso = null; });
  return enCurso;
}
