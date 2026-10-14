import React from 'react';
import { ExternalLink, PenTool, Database, FlaskConical } from 'lucide-react';

/**
 * Editores de estructuras y bases de datos de consulta habitual.
 * Texto revisado con Jev (humanizer-juanjo-es), certificado el 2026-10-14.
 */
interface Herramienta {
  nombre: string;
  url: string;
  etiqueta: string;
  descripcion: string;
}

const EDITORES: Herramienta[] = [
  {
    nombre: 'ReShiki',
    url: 'https://github.com/Ameyanagi/reshiki',
    etiqueta: 'Código abierto · escritorio',
    descripcion:
      'En cuanto a ReShiki, es un editor de estructuras y esquemas de reacción de código abierto, con licencia MIT o Apache 2.0 y escrito en Rust. Lo instalamos en Windows, macOS o Linux y funciona sin conexión desde el primer día. Parte del estilo de las revistas de la ACS, exporta a SVG, PDF y PNG, genera el nombre químico de la molécula y predice su espectro de RMN, así que tenemos una alternativa libre a ChemDraw cuando necesitamos figuras con calidad de publicación.'
  },
  {
    nombre: 'MolDraw',
    url: 'https://www.moldraw.com/',
    etiqueta: 'Gratuito · navegador',
    descripcion:
      'Respecto a MolDraw, es un editor 2D gratuito que trabaja directamente en el navegador, sin instalar nada y sin crear cuenta. Dibujamos la molécula o la reacción, obtenemos su SMILES, la vemos en 3D y exportamos la imagen, lo que lo hace muy práctico para resolver ejercicios de SAR desde el móvil o desde un ordenador de la biblioteca.'
  },
  {
    nombre: 'MolView',
    url: 'https://molview.org/',
    etiqueta: 'Código abierto · navegador',
    descripcion:
      'Sobre MolView, es una aplicación web de código abierto que combina un editor 2D con un visor 3D. Buscamos un fármaco por su nombre, lo cargamos desde PubChem o abrimos una proteína de la PDB, y lo giramos en modelo de bolas y varillas, de esferas de van der Waals o de cintas para ver su conformación y cómo encaja en la diana.'
  }
];

const BASES_DE_DATOS: Herramienta[] = [
  {
    nombre: 'Protein Data Bank (RCSB PDB)',
    url: 'https://www.rcsb.org/',
    etiqueta: 'Estructuras 3D',
    descripcion:
      'En el caso de la PDB, tenemos el archivo mundial de estructuras tridimensionales de proteínas y ácidos nucleicos resueltas por cristalografía de rayos X, RMN y criomicroscopía electrónica. Cada entrada lleva un código de cuatro caracteres, como 1HXW para el ritonavir unido a la proteasa del VIH, y en ella vemos el fármaco dentro del sitio activo junto con las interacciones que explican su afinidad.'
  },
  {
    nombre: 'PubChem',
    url: 'https://pubchem.ncbi.nlm.nih.gov/',
    etiqueta: 'Compuestos químicos',
    descripcion:
      'Respecto a PubChem, es la base de datos pública del NCBI, en los NIH de Estados Unidos, y recoge más de 100 millones de compuestos. Para cada molécula encontramos estructura, SMILES, propiedades fisicoquímicas, bioactividad, datos de seguridad y bibliografía, y por eso es nuestro punto de partida cuando queremos identificar un compuesto y descargar su estructura.'
  },
  {
    nombre: 'DrugBank',
    url: 'https://go.drugbank.com/',
    etiqueta: 'Fármacos',
    descripcion:
      'Por último, DrugBank reúne fármacos aprobados y en investigación y conecta su química con la farmacología: mecanismo de acción, dianas, metabolismo, interacciones y parámetros farmacocinéticos. La consulta web es gratuita, mientras que la descarga completa de la base de datos exige una licencia académica.'
  }
];

function dominio(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

const Grupo: React.FC<{
  titulo: string;
  icono: React.ReactNode;
  items: Herramienta[];
  acento: string;
  tinta: string;
}> = ({ titulo, icono, items, acento, tinta }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h3 className="herr-grupo-titulo">
      {icono} {titulo}
    </h3>
    <div className="resource-grid">
      {items.map(h => (
        <a
          key={h.nombre}
          href={h.url}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card"
          style={{ borderTopColor: acento }}
        >
          <div className="resource-card-top">
            <span
              className="resource-cat"
              style={{ color: tinta, background: `color-mix(in srgb, ${acento} 12%, transparent)` }}
            >
              {h.etiqueta}
            </span>
          </div>
          <h3 className="resource-title">{h.nombre}</h3>
          <p className="resource-summary">{h.descripcion}</p>
          <div className="resource-foot">
            <span className="resource-domain">{dominio(h.url)}</span>
            <span className="resource-go">
              Abrir <ExternalLink size={12} />
            </span>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export const HerramientasEstructuras: React.FC = () => (
  <section className="herr-seccion" aria-labelledby="herr-titulo">
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
      <FlaskConical size={22} color="var(--navy-ink)" />
      <h2 id="herr-titulo" className="herr-titulo">Herramientas para dibujar y consultar estructuras</h2>
    </div>
    <p className="herr-intro">
      Para preparar un trabajo, repasar un tema o comprobar una estructura del examen nos basta con
      el navegador. Hemos reunido aquí tres editores gratuitos para dibujar moléculas y las tres bases
      de datos que usamos con más frecuencia en clase, y estoy seguro de que os van a ahorrar bastante
      tiempo a lo largo del curso.
    </p>

    <Grupo
      titulo="Dibujar estructuras químicas"
      icono={<PenTool size={16} />}
      items={EDITORES}
      acento="var(--teal)"
      tinta="var(--teal-ink)"
    />
    <Grupo
      titulo="Bases de datos"
      icono={<Database size={16} />}
      items={BASES_DE_DATOS}
      acento="var(--navy)"
      tinta="var(--navy-ink)"
    />
  </section>
);
