import type { QfdosAnnouncement } from '../data/qfdosData';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/**
 * Fecha de un aviso como número (ms). Los avisos guardan la fecha como texto
 * libre («28 Septiembre 2026», «2026-09-28»); lo que no se pueda leer queda
 * en 0 y se ordena al final, conservando su orden relativo.
 */
export function fechaAviso(texto: string): number {
  const t = (texto || '').trim().toLowerCase();
  const iso = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) return Date.UTC(+iso[1], +iso[2] - 1, +iso[3]);
  const es = t.match(/^(\d{1,2})\s+(?:de\s+)?([a-záéíóú]+)\s+(?:de\s+)?(\d{4})/);
  if (es) {
    const mes = MESES.indexOf(es[2].replace('setiembre', 'septiembre'));
    if (mes !== -1) return Date.UTC(+es[3], mes, +es[1]);
  }
  const barras = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (barras) return Date.UTC(+barras[3], +barras[2] - 1, +barras[1]);
  return 0;
}

/** Más recientes primero; a igualdad de fecha se respeta el orden en que están. */
export function avisosRecientesPrimero(avisos: QfdosAnnouncement[]): QfdosAnnouncement[] {
  return avisos
    .map((a, i) => ({ a, i, f: fechaAviso(a.date) }))
    .sort((x, y) => y.f - x.f || x.i - y.i)
    .map(x => x.a);
}
