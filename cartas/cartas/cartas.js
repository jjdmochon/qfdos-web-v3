/* QFDOS · Cartas de fármacos — módulo ES, sin dependencias.
   Uso:
     import { montarCartas } from './cartas.js';
     montarCartas(document.querySelector('#cartas'), './cartas/farmacos-tema01.json');
*/

const ORDEN = ['AFI', 'SEL', 'EST', 'ORA', 'SNC', 'DUR'];

const TRAMA = `<svg class="qf-trama" viewBox="0 0 240 340" aria-hidden="true"><defs>
<pattern id="qf-hex" width="52" height="45" patternUnits="userSpaceOnUse">
<polygon points="13,0 39,0 52,22.5 39,45 13,45 0,22.5" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="1.2"/>
</pattern></defs><rect width="240" height="340" fill="url(#qf-hex)"/></svg>`;

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function fila(clave, valor) {
  const texto = valor === null || valor === undefined ? '—' : String(valor).padStart(2, '0');
  const ancho = valor === null || valor === undefined ? 0 : valor;
  return `<div class="qf-indice"><b>${clave}</b><i><span style="width:${ancho}%"></span></i><em>${texto}</em></div>`;
}

function plantilla(f, base) {
  const indices = ORDEN.map((k) => fila(k, f.indices[k])).join('');
  const src = base + f.estructura;
  return `<button class="qf-carta" type="button" aria-pressed="false" data-grupo="${f.grupo}" data-id="${f.id}" aria-label="${esc(f.nombre)}, ver detalle">
  <div class="qf-carta__inner">
    <div class="qf-cara qf-cara--frente">${TRAMA}
      <div class="qf-cabecera">
        <div><div class="qf-rel">${f.relevancia}</div><div class="qf-rol">${esc(f.rol)}</div></div>
        <span class="qf-badge">${esc(f.badge)}</span>
      </div>
      <div class="qf-estructura"><img src="${src}" alt="Estructura de ${esc(f.nombre)}" loading="lazy"></div>
      <div class="qf-nombre">${esc(f.nombre)}</div>
      <div class="qf-clase">${esc(f.clase)}</div>
      <div class="qf-regla"></div>
      <div class="qf-indices">${indices}</div>
      <div class="qf-pie">${esc(f.formula)} · ${Number(f.masa).toFixed(2)} Da</div>
    </div>
    <div class="qf-cara qf-cara--dorso">${TRAMA}
      <div class="qf-nombre">${esc(f.nombre)}</div>
      <div class="qf-smiles">${esc(f.smiles)}</div>
      <h3>Acción farmacológica</h3><p>${esc(f.accion)}</p>
      <h3>Indicación clínica</h3><p>${esc(f.indicacion)}</p>
      <h3>Clave de diseño</h3><p>${esc(f.diseno)}</p>
      <div class="qf-examen">${esc(f.examen)}</div>
    </div>
  </div>
</button>`;
}

export async function montarCartas(contenedor, urlDatos, opciones = {}) {
  const datos = await fetch(urlDatos).then((r) => r.json());
  const base = opciones.baseEstructuras ?? urlDatos.replace(/[^/]+$/, '');
  contenedor.classList.add('qf-cartas');
  contenedor.innerHTML = datos.farmacos.map((f) => plantilla(f, base)).join('');

  contenedor.addEventListener('click', (e) => {
    const carta = e.target.closest('.qf-carta');
    if (!carta) return;
    carta.setAttribute('aria-pressed', carta.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
  });

  return {
    datos,
    filtrar(grupo) {
      Array.from(contenedor.children).forEach((c) => {
        c.hidden = !(grupo === "todos" || c.dataset.grupo === grupo);
      });
    },
    cerrarTodas() {
      Array.from(contenedor.children).forEach((c) => c.setAttribute('aria-pressed', 'false'));
    },
  };
}

export function montarFiltros(contenedor, api) {
  contenedor.classList.add('qf-filtros');
  const grupos = [['todos', 'Todos'], ['agonista', 'Agonistas'], ['ache', 'Anticolinesterásicos'], ['antidoto', 'Antídoto'], ['antagonista', 'Antagonistas']];
  contenedor.innerHTML = grupos
    .map(([v, t], i) => `<button class="qf-filtro" type="button" data-grupo="${v}" aria-pressed="${i === 0}">${t}</button>`)
    .join('');
  contenedor.addEventListener('click', (e) => {
    const b = e.target.closest('.qf-filtro');
    if (!b) return;
    Array.from(contenedor.children).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    api.filtrar(b.dataset.grupo);
  });
}
