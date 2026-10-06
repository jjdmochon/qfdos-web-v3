import React, { useState, useMemo, useCallback, useEffect } from 'react';
import rawTema01 from '../../data/farmacosTema01.json';
import rawTema02 from '../../data/farmacosTema02.json';
import rawTema03 from '../../data/farmacosTema03.json';
import { MoleculeDrug } from '../../data/qfdosData';
import './cartas.css';
import {
  RotateCw,
  Search,
  Copy,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  Info,
  Sun,
  Moon
} from 'lucide-react';

export interface FarmacoCartaIndices {
  AFI: number | null;
  SEL: number | null;
  EST: number | null;
  ORA: number | null;
  SNC: number | null;
  DUR: number | null;
  [key: string]: number | null;
}

export interface FarmacoCarta {
  id: string;
  nombre: string;
  relevancia: number;
  rol: string;
  grupo: string;
  badge: string;
  clase: string;
  formula: string;
  masa: number;
  smiles: string;
  estructura: string;
  indices: FarmacoCartaIndices;
  accion: string;
  indicacion: string;
  diseno: string;
  examen: string;
}

export type TemaCartas = 1 | 2 | 3;

interface BarajaTema {
  tema: number;
  titulo: string;
  grupos: Record<string, string>;
  farmacos: FarmacoCarta[];
}

/** Barajas disponibles. Para añadir un tema: JSON en src/data, SVG en public/cartas/estructuras y una entrada aquí. */
export const BARAJAS: Record<TemaCartas, BarajaTema & { familia: string }> = {
  1: { ...(rawTema01 as unknown as BarajaTema), familia: 'Colinérgicos' },
  2: { ...(rawTema02 as unknown as BarajaTema), familia: 'Adrenérgicos' },
  3: { ...(rawTema03 as unknown as BarajaTema), familia: 'Dopaminérgicos' },
};

export interface CartasDeckViewProps {
  onOpenAdmet?: (drug: MoleculeDrug) => void;
  showDocenteBanner?: boolean;
  /** Tema cuya baraja se muestra (1 por defecto). */
  tema?: TemaCartas;
}

const ORDEN_INDICES = ['AFI', 'SEL', 'EST', 'ORA', 'SNC', 'DUR'] as const;

/**
 * Los rótulos en mayúsculas convierten α y β en Α y Β, idénticas a la A y la B latinas.
 * Las letras griegas se envuelven en un span que anula el text-transform.
 */
const conGriegas = (texto: string): React.ReactNode =>
  texto.split(/([\u0391-\u03A9\u03B1-\u03C9]+)/).map((trozo, i) =>
    /[\u0391-\u03A9\u03B1-\u03C9]/.test(trozo)
      ? <span key={i} className="qf-griega">{trozo}</span>
      : trozo
  );

export const CartasDeckView: React.FC<CartasDeckViewProps> = ({
  showDocenteBanner = true,
  tema = 1
}) => {
  const baraja = BARAJAS[tema] ?? BARAJAS[1];
  const [activeGroup, setActiveGroup] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cardTheme, setCardTheme] = useState<'clean' | 'dark'>('clean');

  const farmacos = useMemo(() => {
    return (baraja.farmacos || []) as FarmacoCarta[];
  }, [baraja]);

  // Al cambiar de baraja se reinician filtro, búsqueda y cartas volteadas
  useEffect(() => {
    setActiveGroup('todos');
    setSearchTerm('');
    setFlippedCards({});
  }, [tema]);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // Agrupaciones y conteos
  const gruposConteo = useMemo(() => {
    const counts: Record<string, number> = { todos: farmacos.length };
    Object.keys(baraja.grupos || {}).forEach(g => { counts[g] = 0; });
    farmacos.forEach(f => {
      if (counts[f.grupo] !== undefined) {
        counts[f.grupo]++;
      }
    });
    return counts;
  }, [farmacos, baraja]);

  // Fármacos filtrados
  const filteredFarmacos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return farmacos.filter(f => {
      const matchGrupo = activeGroup === 'todos' || f.grupo === activeGroup;
      if (!matchGrupo) return false;

      if (!term) return true;

      const n = (f.nombre || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const r = (f.rol || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const c = (f.clase || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const ind = (f.indicacion || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const acc = (f.accion || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const dis = (f.diseno || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const s = (f.smiles || '').toLowerCase();

      return n.includes(term) || r.includes(term) || c.includes(term) || ind.includes(term) || acc.includes(term) || dis.includes(term) || s.includes(term);
    });
  }, [farmacos, activeGroup, searchTerm]);

  // Manejo de giro individual
  const toggleFlip = useCallback((id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  // Girar todas las cartas
  const handleToggleAll = () => {
    const anyFlipped = Object.values(flippedCards).some(Boolean);
    if (anyFlipped) {
      setFlippedCards({});
    } else {
      const allFlipped: Record<string, boolean> = {};
      farmacos.forEach(f => {
        allFlipped[f.id] = true;
      });
      setFlippedCards(allFlipped);
    }
  };

  // Copiar SMILES
  const handleCopySmiles = (id: string, smiles: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(smiles);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const isAnyFlipped = Object.values(flippedCards).some(Boolean);

  return (
    <div className={`qf-deck-container qf-deck--theme-${cardTheme}`}>
      {/* Cabecera Docente */}
      {showDocenteBanner && (
        <div className="qf-deck-header-banner">
          <div className="qf-deck-header-info">
            <div
              className="qf-deck-header-icon"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(30, 58, 138, 0.15)',
                padding: 3,
                overflow: 'hidden'
              }}
            >
              <img
                src={`${cleanBase}assets/Marca/qfdos-isotipo.png`}
                alt="Logo QFDOS"
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('i.ibb.co')) {
                    target.src = 'https://i.ibb.co/HLCYDc3c/Logo-primario-QFDOS.png';
                  }
                }}
              />
            </div>
            <div className="qf-deck-header-titles">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2>Cartas Coleccionables de Fármacos · Tema {tema}</h2>
                <span className="qf-deck-badge-docente">
                  <Sparkles size={13} /> Material Oficial de Estudio · QFDOS
                </span>
              </div>
              <p>
                {farmacos.length} Fármacos {baraja.familia} · {baraja.titulo}. Sistema <strong>2627 QFDOS Structural Affinity Identity</strong>.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="qfdos-badge badge-teal" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
              QFDOS v3.0 · Curso 2026/27
            </span>
          </div>
        </div>
      )}

      {/* Nota Metodológica */}
      <div className="qf-deck-nota">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <Info size={16} color="var(--secondary, #0d9488)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>Aviso docente:</strong> Los índices de 0 a 99 (AFI, SEL, EST, ORA, SNC, DUR) constituyen una escala docente comparativa calibrada para la docencia de QFDOS, no constantes experimentales directas. Las fórmulas moleculares, masas isotópicas, SMILES, dianas moleculares, acciones farmacológicas e indicaciones clínicas sí son datos experimentales certificados.
          </div>
        </div>
      </div>

      {/* Barra de Herramientas: Filtros + Búsqueda + Giro */}
      <div className="qf-deck-toolbar">
        {/* Filtros de grupo */}
        <div className="qf-deck-filters">
          <button
            type="button"
            className={`qf-filtro-btn ${activeGroup === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveGroup('todos')}
          >
            Todos <span className="qf-filtro-count">{gruposConteo.todos}</span>
          </button>
          {Object.entries(baraja.grupos || {}).map(([clave, etiqueta]) => (
            <button
              key={clave}
              type="button"
              className={`qf-filtro-btn ${activeGroup === clave ? 'active' : ''}`}
              onClick={() => setActiveGroup(clave)}
            >
              {conGriegas(etiqueta)} <span className="qf-filtro-count">{gruposConteo[clave] ?? 0}</span>
            </button>
          ))}
        </div>

        {/* Acciones: Buscador y Flip All */}
        <div className="qf-deck-actions">
          <div className="qf-search-input-wrap">
            <Search size={14} className="qf-search-icon" />
            <input
              type="text"
              placeholder="Buscar fármaco, diana o SMILES..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="qf-theme-toggle-btn"
            onClick={() => setCardTheme(t => t === 'clean' ? 'dark' : 'clean')}
            title={cardTheme === 'clean' ? 'Cambiar a modo marino oscuro' : 'Cambiar a modo limpio'}
            aria-label="Alternar diseño limpio u oscuro de las cartas"
          >
            {cardTheme === 'clean' ? <Moon size={13} /> : <Sun size={13} />}
            <span>{cardTheme === 'clean' ? 'Modo Marino' : 'Modo Limpio'}</span>
          </button>

          <button
            type="button"
            className="qf-flip-all-btn"
            onClick={handleToggleAll}
            title="Girar todas las cartas al anverso o dorso"
          >
            <RotateCw size={13} />
            <span>{isAnyFlipped ? 'Ver Anverso' : 'Voltear Todas'}</span>
          </button>
        </div>
      </div>

      {/* Grid de Cartas */}
      {filteredFarmacos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            No se encontraron cartas que coincidan con el filtro &quot;{searchTerm}&quot;.
          </p>
        </div>
      ) : (
        <div className="qf-cartas-grid">
          {filteredFarmacos.map(f => {
            const isFlipped = !!flippedCards[f.id];
            const imgSrc = `${cleanBase}cartas/${f.estructura}`;

            return (
              <div
                key={f.id}
                className={`qf-carta-item ${isFlipped ? 'is-flipped' : ''}`}
                data-grupo={f.grupo}
                onClick={(e) => toggleFlip(f.id, e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(f.id);
                  }
                }}
                aria-pressed={isFlipped}
                aria-label={`Carta de ${f.nombre}, pulsar para ver reverso con acción y farmacóforo`}
              >
                <div className="qf-carta-inner">
                  {/* ANVERSO */}
                  <div className="qf-cara qf-cara--frente">
                    {/* Hexagon Mesh Pattern SVG */}
                    <svg className="qf-trama-mesh" viewBox="0 0 240 340" aria-hidden="true">
                      <defs>
                        <pattern id={`qf-hex-${f.id}`} width="52" height="45" patternUnits="userSpaceOnUse">
                          <polygon
                            points="13,0 39,0 52,22.5 39,45 13,45 0,22.5"
                            fill="none"
                            stroke={cardTheme === 'clean' ? '#1e3a8a' : '#ffffff'}
                            strokeOpacity={cardTheme === 'clean' ? '0.1' : '0.4'}
                            strokeWidth="1.2"
                          />
                        </pattern>
                      </defs>
                      <rect width="240" height="340" fill={`url(#qf-hex-${f.id})`} />
                    </svg>

                    {/* Cabecera: Relevancia, Rol y Badge con sello oficial QFDOS */}
                    <div className="qf-cabecera">
                      <div>
                        <div className="qf-rel">{f.relevancia}</div>
                        <div className="qf-rol">{conGriegas(f.rol)}</div>
                      </div>
                      <div className="qf-cabecera-der">
                        <span className="qf-badge">{f.badge}</span>
                        <div className="qf-card-brand-stamp" title="Química Farmacéutica II (Grupo E)">
                          <img
                            src={`${cleanBase}assets/Marca/qfdos-isotipo.png`}
                            alt="QFDOS"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.src.includes('i.ibb.co')) {
                                target.src = 'https://i.ibb.co/HLCYDc3c/Logo-primario-QFDOS.png';
                              }
                            }}
                          />
                          <span>QFDOS</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenedor Molecular con SVG de RDKit */}
                    <div className="qf-estructura">
                      <img
                        src={imgSrc}
                        alt={`Estructura molecular 2D de ${f.nombre}`}
                        loading="lazy"
                        onError={(e) => {
                          // Fallback si la ruta relativa falla
                          const target = e.currentTarget;
                          if (!target.src.includes('public')) {
                            target.src = `/cartas/${f.estructura}`;
                          }
                        }}
                      />
                    </div>

                    {/* Nombre y Clase Farmacológica */}
                    <div className="qf-nombre">{f.nombre}</div>
                    <div className="qf-clase">{f.clase}</div>

                    {/* Regla separadora */}
                    <div className="qf-regla" />

                    {/* Índices Comparativos */}
                    <div className="qf-indices">
                      {ORDEN_INDICES.map(key => {
                        const val = f.indices[key];
                        const text = val === null || val === undefined ? '—' : String(val).padStart(2, '0');
                        const widthPct = val === null || val === undefined ? 0 : val;
                        return (
                          <div key={key} className="qf-indice">
                            <b>{key}</b>
                            <i>
                              <span style={{ width: `${widthPct}%` }} />
                            </i>
                            <em>{text}</em>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pie: Fórmula y Masa Molecular */}
                    <div className="qf-pie">
                      <span>{f.formula} · {Number(f.masa).toFixed(2)} Da</span>
                      <span className="qf-flip-hint">
                        <RotateCw size={10} /> Girar
                      </span>
                    </div>
                  </div>

                  {/* DORSO */}
                  <div className="qf-cara qf-cara--dorso">
                    {/* Hexagon Mesh Pattern SVG */}
                    <svg className="qf-trama-mesh" viewBox="0 0 240 340" aria-hidden="true">
                      <rect width="240" height="340" fill={`url(#qf-hex-${f.id})`} />
                    </svg>

                    {/* Cabecera Dorso */}
                    <div className="qf-dorso-header" onClick={(e) => toggleFlip(f.id, e)} title="Pulsar para voltear al anverso">
                      <div className="qf-nombre">{f.nombre}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className="qf-badge" style={{ fontSize: '9px', padding: '2px 6px' }}>{f.badge}</span>
                        <div className="qf-card-brand-stamp" title="Química Farmacéutica II (Grupo E)">
                          <img
                            src={`${cleanBase}assets/Marca/qfdos-isotipo.png`}
                            alt="QFDOS"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.src.includes('i.ibb.co')) {
                                target.src = 'https://i.ibb.co/HLCYDc3c/Logo-primario-QFDOS.png';
                              }
                            }}
                          />
                          <span>QFDOS</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido Desplazable del Dorso */}
                    <div className="qf-dorso-scroll" onClick={(e) => e.stopPropagation()}>
                      {/* SMILES con botón de copiado */}
                      <div className="qf-smiles-box">
                        <span className="qf-smiles-text">{f.smiles}</span>
                        <button
                          type="button"
                          className="qf-smiles-copy-btn"
                          onClick={(e) => handleCopySmiles(f.id, f.smiles, e)}
                          title="Copiar código SMILES al portapapeles"
                        >
                          {copiedId === f.id ? <Check size={12} color="#0d9488" /> : <Copy size={12} />}
                        </button>
                      </div>

                      <h3>Acción Farmacológica</h3>
                      <p>{f.accion}</p>

                      <h3>Indicación Clínica</h3>
                      <p>{f.indicacion}</p>

                      <h3>Clave de Diseño Molecular</h3>
                      <p>{f.diseno}</p>

                      <div className="qf-examen">
                        <strong>
                          <Sparkles size={11} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                          Clave Examen QFDOS
                        </strong>
                        {f.examen}
                      </div>
                    </div>

                    {/* Botón de voltear en dorso */}
                    <div className="qf-dorso-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="qf-dorso-btn qf-dorso-btn--secondary"
                        onClick={(e) => toggleFlip(f.id, e)}
                        title="Voltear carta al anverso"
                        style={{ width: '100%', padding: '7px 12px', fontSize: '11px', gap: '6px' }}
                      >
                        <RotateCw size={12} /> Voltear al anverso
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
