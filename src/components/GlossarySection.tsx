import React, { useState } from 'react';
import { QfdosGlossaryTerm } from '../data/qfdosData';
import { BookOpen, Search, Filter, Tag, Check, Copy, SearchX } from 'lucide-react';
import { normalizarBusqueda } from '../utils/a11y';

interface GlossarySectionProps {
  glossary: QfdosGlossaryTerm[];
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({ glossary }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyFailedId, setCopyFailedId] = useState<string | null>(null);

  // Las categorías salen de los propios términos: no se ofrece un filtro vacío
  const categories = ['todos', ...Array.from(new Set(glossary.map(t => t.category).filter(Boolean)))];

  const q = normalizarBusqueda(searchTerm).trim();
  const filtered = glossary.filter(term => {
    const matchesSearch = !q ||
      normalizarBusqueda(term.term).includes(q) ||
      normalizarBusqueda(term.definition).includes(q) ||
      normalizarBusqueda(term.clinicalRelevance).includes(q);

    const matchesCategory = selectedCategory === 'todos' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (t: QfdosGlossaryTerm) => {
    try {
      await navigator.clipboard.writeText(`${t.term}: ${t.definition} (Relevancia: ${t.clinicalRelevance})`);
      setCopiedId(t.id);
      setCopyFailedId(null);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopyFailedId(t.id);
      setTimeout(() => setCopyFailedId(null), 3000);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      
      {/* Title & Filter Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <BookOpen size={24} color="var(--navy-ink)" />
          <h1 className="page-title">
            Glosario Farmacológico & Biofísico Oficial
          </h1>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Términos clave, constantes cinético-termodinámicas, conceptos SAR y mecanismos moleculares de Química Farmacéutica II.
        </p>
      </div>

      {/* Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="chip"
              aria-pressed={selectedCategory === cat}
            >
              {cat === 'todos' ? 'Todas las Categorías' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: 'min(260px, 100%)', flex: '1 1 260px', maxWidth: 360 }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Filtrar conceptos..."
            aria-label="Filtrar conceptos del glosario"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <p className="eyebrow" role="status" style={{ marginBottom: '0.75rem' }}>
        {filtered.length} {filtered.length === 1 ? 'término' : 'términos'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '1.25rem' }}>
        {filtered.length === 0 && (
          <div className="state-panel">
            <SearchX size={28} />
            <h3>Ningún término coincide</h3>
            <p>Prueba con otra palabra o quita el filtro de categoría.</p>
            <button type="button" className="btn btn-sm btn-outline" onClick={() => { setSearchTerm(''); setSelectedCategory('todos'); }}>
              Ver todo el glosario
            </button>
          </div>
        )}
        {filtered.map(t => (
          <div key={t.id} className="qfdos-card card-teal" style={{ justifyContent: 'space-between', padding: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem' }}>
                  {t.category}
                </span>
                <button
                  onClick={() => handleCopy(t)}
                  className="btn btn-sm btn-outline"
                  style={{ padding: '6px', fontSize: '0.7rem' }}
                  title={copyFailedId === t.id ? 'No se pudo copiar' : 'Copiar definición'}
                  aria-label={copiedId === t.id ? 'Definición copiada' : copyFailedId === t.id ? 'No se pudo copiar la definición' : `Copiar definición de ${t.term}`}
                >
                  {copiedId === t.id ? <Check size={14} color="var(--ok-ink)" /> : <Copy size={14} color={copyFailedId === t.id ? 'var(--bad-ink)' : undefined} />}
                </button>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '6px' }}>
                {t.term}
              </h3>

              {t.technicalCode && !/^[A-Z]+(-[A-Z0-9]+)+$/.test(t.technicalCode) && (
                <div style={{
                  padding: '4px 8px',
                  background: 'var(--surface-alt)',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--navy-ink)',
                  fontWeight: 700,
                  marginBottom: '8px',
                  width: 'fit-content'
                }}>
                  {t.technicalCode}
                </div>
              )}

              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '10px' }}>
                {t.definition}
              </p>
            </div>

            <div style={{
              paddingTop: '8px',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}>
              <strong style={{ color: 'var(--teal-ink)' }}>Relevancia:</strong> {t.clinicalRelevance}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
