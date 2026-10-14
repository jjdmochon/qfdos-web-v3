import React from 'react';
import type { QfdosTopic } from '../data/qfdosData';

/**
 * Imagen de la tarjeta «Presentación del Curso».
 *
 * Las tarjetas de los temas llevan la estructura de su fármaco; la
 * presentación no tiene fármaco, así que muestra el mapa del curso dibujado
 * como un policiclo de hexágonos fusionados: 00 (la presentación) y los temas
 * 01 a 10. Los temas publicados se rellenan en teal y el resto queda en
 * contorno, de modo que el mapa avanza solo según se publican los temas.
 * Mismo marco que Chem2DDrawer para que las tarjetas se vean parejas.
 */
const R = 19;                       // radio del hexágono (vértice arriba)
const W = Math.sqrt(3) * R;         // ancho de un hexágono
const ANCHO = 260;
const ALTO = 110;

const hexagono = (cx: number, cy: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 180) * (60 * k - 90);
    return `${(cx + R * Math.cos(a)).toFixed(2)},${(cy + R * Math.sin(a)).toFixed(2)}`;
  }).join(' ');

export const MapaCursoTarjeta: React.FC<{ topics: QfdosTopic[] }> = ({ topics }) => {
  const publicado = (n: number) => topics.find(t => t.id === `tema-${String(n).padStart(2, '0')}`)?.status === 'Publicado';
  const nPublicados = Array.from({ length: 10 }, (_, i) => i + 1).filter(publicado).length;

  // Fila superior 00–05 y fila inferior 06–10, desplazada medio hexágono: un panal fusionado
  const x0 = (ANCHO - 6 * W) / 2 + W / 2;
  const y1 = ALTO / 2 - 0.75 * R;
  const y2 = y1 + 1.5 * R;
  const nodos = [
    ...Array.from({ length: 6 }, (_, i) => ({ n: i, cx: x0 + i * W, cy: y1 })),
    ...Array.from({ length: 5 }, (_, i) => ({ n: i + 6, cx: x0 + W / 2 + i * W, cy: y2 }))
  ];

  return (
    <div className="chem-2d-container mapa-curso">
      <svg
        viewBox={`0 0 ${ANCHO} ${ALTO}`}
        width={ANCHO}
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label={`Mapa del curso: presentación y 10 temas, ${nPublicados} publicados`}
      >
        {nodos.map(({ n, cx, cy }) => {
          const tipo = n === 0 ? 'inicio' : publicado(n) ? 'publicado' : 'pendiente';
          return (
            <g key={n} className={`mapa-curso-nodo ${tipo}`}>
              <polygon points={hexagono(cx, cy)} />
              <text x={cx} y={cy} dy="0.35em" textAnchor="middle">{String(n).padStart(2, '0')}</text>
            </g>
          );
        })}
      </svg>
      <span className="mapa-curso-pie">Mapa del curso · {nPublicados}/10 temas publicados</span>
    </div>
  );
};
