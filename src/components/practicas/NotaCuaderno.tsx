import React from 'react';
import { Award } from 'lucide-react';
import type { EntregaPropia } from '../../services/contenidoRemoto';

/** Nota con coma decimal y sin ceros de más: 8.5 → «8,5», 10 → «10». */
export function formatearNota(n: number): string {
  return String(Math.round(n * 100) / 100).replace('.', ',');
}

/** Las entregas del cuaderno ya calificadas y publicadas por el profesor. */
export function notasDelCuaderno(entregas: EntregaPropia[] | null | undefined) {
  return (entregas ?? [])
    .filter(e => /cuaderno/i.test(e.hoja) && e.datos.notaProfesor !== undefined && e.datos.notaProfesor !== '')
    .map(e => ({
      clave: `${e.hoja}-${e.fila}`,
      nota: Number(e.datos.notaProfesor),
      comentario: e.datos.comentarioProfesor || '',
      puesto: e.datos.puesto || '',
      turno: e.datos.turno || ''
    }))
    .filter(n => Number.isFinite(n.nota));
}

/**
 * Nota y comentario del cuaderno. Solo aparecen cuando el profesor ha
 * publicado las notas; mientras tanto el servidor no las envía.
 */
export const NotaCuaderno: React.FC<{ entregas: EntregaPropia[] | null | undefined }> = ({ entregas }) => {
  const notas = notasDelCuaderno(entregas);
  if (!notas.length) return null;
  return (
    <>
      {notas.map(n => (
        <div
          key={n.clave}
          role="status"
          style={{
            display: 'flex', gap: '12px', alignItems: 'flex-start',
            padding: '0.85rem 1rem', borderRadius: '10px',
            background: 'rgba(13,148,136,0.07)', borderLeft: '4px solid var(--teal)'
          }}
        >
          <Award size={20} color="var(--teal-ink)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, color: 'var(--text-title)', fontSize: '0.95rem' }}>
              Nota del cuaderno{n.puesto ? ` · Puesto ${n.puesto}` : ''}{n.turno ? ` · ${n.turno}` : ''}:{' '}
              <span className="tabular" style={{ color: 'var(--teal-ink)' }}>{formatearNota(n.nota)} / 10</span>
            </div>
            {n.comentario && (
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                {n.comentario}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
