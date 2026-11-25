import React from 'react';

/**
 * Render mínimo de Markdown a elementos de React (sin HTML en bruto: el texto lo
 * escapa React). Cubre lo que llevan los documentos docentes: títulos, listas,
 * citas, tablas simples, código, negrita, cursiva, código en línea e imágenes.
 * Los enlaces se muestran solo como texto.
 */
export type RenderImagen = (src: string, alt: string, clave: string) => React.ReactNode;

const INLINE = /(!\[([^\]]*)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*|`([^`]+)`|\[([^\]]+)\]\([^)]*\))/g;

function inline(texto: string, renderImagen: RenderImagen, base: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let ultimo = 0;
  let n = 0;
  for (const m of texto.matchAll(INLINE)) {
    const i = m.index ?? 0;
    if (i > ultimo) out.push(texto.slice(ultimo, i));
    const k = `${base}-${n++}`;
    if (m[2] !== undefined) out.push(<React.Fragment key={k}>{renderImagen(m[3], m[2], k)}</React.Fragment>);
    else if (m[4] !== undefined) out.push(<strong key={k}>{m[4]}</strong>);
    else if (m[5] !== undefined) out.push(<em key={k}>{m[5]}</em>);
    else if (m[6] !== undefined) out.push(<code key={k}>{m[6]}</code>);
    else if (m[7] !== undefined) out.push(m[7]);
    ultimo = i + m[0].length;
  }
  if (ultimo < texto.length) out.push(texto.slice(ultimo));
  return out;
}

const esTabla = (l: string) => /^\s*\|.*\|\s*$/.test(l);
const celdas = (l: string) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());

export function renderMarkdownMinimo(md: string, renderImagen: RenderImagen): React.ReactNode[] {
  const lineas = md.replace(/\r\n?/g, '\n').split('\n');
  const out: React.ReactNode[] = [];
  let i = 0;
  let b = 0;
  while (i < lineas.length) {
    const l = lineas[i];
    const k = `b${b++}`;
    if (!l.trim()) { i++; continue; }
    if (l.startsWith('<!--')) { i++; continue; }
    if (/^```/.test(l)) {
      const cod: string[] = [];
      i++;
      while (i < lineas.length && !/^```/.test(lineas[i])) cod.push(lineas[i++]);
      i++;
      out.push(<pre key={k} style={{ overflowX: 'auto', background: 'var(--surface-raised)', padding: '0.75rem', borderRadius: 8 }}>{cod.join('\n')}</pre>);
      continue;
    }
    const h = /^(#{1,6})\s+(.*)$/.exec(l);
    if (h) {
      const nivel = Math.min(h[1].length + 1, 6);
      out.push(React.createElement(`h${nivel}`, { key: k, style: { margin: '1.1rem 0 0.4rem', color: 'var(--text-title)' } }, inline(h[2], renderImagen, k)));
      i++;
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(l)) { out.push(<hr key={k} />); i++; continue; }
    if (/^>/.test(l)) {
      const cita: string[] = [];
      while (i < lineas.length && /^>/.test(lineas[i])) cita.push(lineas[i++].replace(/^>\s?/, ''));
      out.push(<blockquote key={k} style={{ borderLeft: '3px solid var(--border-color)', margin: '0.5rem 0', padding: '0 0.9rem' }}>{inline(cita.join(' '), renderImagen, k)}</blockquote>);
      continue;
    }
    if (esTabla(l) && i + 1 < lineas.length && /^\s*\|[\s:|-]+\|\s*$/.test(lineas[i + 1])) {
      const cab = celdas(l);
      i += 2;
      const filas: string[][] = [];
      while (i < lineas.length && esTabla(lineas[i])) filas.push(celdas(lineas[i++]));
      out.push(
        <div key={k} style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', margin: '0.6rem 0' }}>
            <thead><tr>{cab.map((c, j) => <th key={j} style={{ border: '1px solid var(--border-color)', padding: '4px 8px', textAlign: 'left' }}>{inline(c, renderImagen, `${k}h${j}`)}</th>)}</tr></thead>
            <tbody>{filas.map((f, r) => <tr key={r}>{f.map((c, j) => <td key={j} style={{ border: '1px solid var(--border-color)', padding: '4px 8px' }}>{inline(c, renderImagen, `${k}r${r}c${j}`)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      continue;
    }
    const li = /^(\s*)([-*]|\d+[.)])\s+(.*)$/;
    if (li.test(l)) {
      const ordenada = /\d/.test(li.exec(l)![2]);
      const items: string[] = [];
      while (i < lineas.length && li.test(lineas[i])) items.push(li.exec(lineas[i++])![3]);
      const hijos = items.map((t, j) => <li key={j}>{inline(t, renderImagen, `${k}i${j}`)}</li>);
      out.push(ordenada ? <ol key={k}>{hijos}</ol> : <ul key={k}>{hijos}</ul>);
      continue;
    }
    const par: string[] = [l];
    i++;
    while (i < lineas.length && lineas[i].trim() && !/^(#{1,6}\s|>|```|\s*([-*]|\d+[.)])\s|\s*\|)/.test(lineas[i])) par.push(lineas[i++]);
    out.push(<p key={k} style={{ margin: '0.4rem 0', lineHeight: 1.55 }}>{inline(par.join(' '), renderImagen, k)}</p>);
  }
  return out;
}
