import React, { useState } from 'react';
import { 
  GitBranch, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ExternalLink, 
  Eye, 
  BookOpen, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { RETROSINTHESIS_CASE_STUDIES, RetrosynthesisCaseStudy } from '../data/retrosintesisExercisesData';
import { Chem2DDrawer } from './Chem2DDrawer';
import { ImageLightboxModal, LightboxImagePayload } from './ImageLightboxModal';

interface RetrosintesisWorkshopProps {
  isProfesor: boolean;
}

const SLIDE_CARDS = [
  {
    slideNum: 28,
    title: 'Slide 28: Conceptos Fundamentales de Retrosíntesis',
    subtitle: 'Molécula Diana, Desconexión (⇒), Sintones y Equivalentes Sintéticos',
    image: '/retrosintesis/slide28_retrosintesis_conceptos.png',
    tag: 'Fundamento'
  },
  {
    slideNum: 29,
    title: 'Slide 29: Criterio de Selección de Corte en Bencilmalonatos',
    subtitle: 'Corte "a" (PhCH2-CH) viable vs Corte "b" (Ph-CH2) inviable',
    image: '/retrosintesis/slide29_bencilmalonato_desconexion.png',
    tag: 'Regioselectividad'
  },
  {
    slideNum: 30,
    title: 'Slide 30: Desconexión de Ésteres Acilo-Oxígeno en Colinérgicos',
    subtitle: 'Sintón catión acilio [R-CO]+ y sintón alcóxido [R\'-O]- (Adifenina)',
    image: '/retrosintesis/slide30_difenilmetano_carbonatacion.png',
    tag: 'Ésteres'
  },
  {
    slideNum: 31,
    title: 'Slide 31: Desconexión de Alcoholes Terciarios y Ácido Bencílico',
    subtitle: 'Transposición del ácido bencílico y derivados de difenilglicolato (Benactizina)',
    image: '/retrosintesis/slide31_alcoholes_cianhidrinas_acetilenicos.png',
    tag: 'Carbinoles 3º'
  },
  {
    slideNum: 32,
    title: 'Slide 32: Ciclopentolato y la Solución del Reactivo de Ivanov',
    subtitle: 'Control de enolización en ciclopentanona mediante el dianión de fenilacetato',
    image: '/retrosintesis/slide32_ciclopentolato_ivanov.png',
    tag: 'Organometálicos'
  },
  {
    slideNum: 33,
    title: 'Slide 33: Expansión de Heterociclos en Antiespasmódicos (Piperidolato)',
    subtitle: 'Transformación de furfural agroindustrial en 1-etilpiperidin-3-ol vía HBr/AcOH',
    image: '/retrosintesis/slide33_aminoesteres_piperidolato.png',
    tag: 'Heterociclos'
  },
  {
    slideNum: 34,
    title: 'Slide 34: Carbinoles Terciarios Lipófilos no Hidrolizables (Trihexifenidilo)',
    subtitle: 'Reacción multicomponente de Mannich y adición de Grignard para cruzar BHE',
    image: '/retrosintesis/slide34_trihexifenidilo_aminopropanol.png',
    tag: 'SNC / Mannich'
  },
  {
    slideNum: 35,
    title: 'Slide 35: Amidas Cuaternarias Periféricas de Acción Prolongada (Isopropamida)',
    subtitle: 'Hidratación selectiva de nitrilo a amida y cuaternización terminal excluyente de BHE',
    image: '/retrosintesis/slide35_isopropamida_amidoamonio.png',
    tag: 'Periférico'
  }
];

export const RetrosintesisWorkshop: React.FC<RetrosintesisWorkshopProps> = ({ isProfesor }) => {
  const [subTab, setSubTab] = useState<'cases' | 'slides'>('cases');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(RETROSINTHESIS_CASE_STUDIES[0].id);
  const [lightboxImage, setLightboxImage] = useState<LightboxImagePayload | null>(null);
  const [isHoveredScheme, setIsHoveredScheme] = useState(false);

  const currentCase = RETROSINTHESIS_CASE_STUDIES.find(c => c.id === selectedCaseId) || RETROSINTHESIS_CASE_STUDIES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Banner de Presentación Destacado */}
      <div 
        className="qfdos-card" 
        style={{ 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.12) 0%, rgba(30, 58, 138, 0.08) 100%)',
          border: '2px solid var(--teal)',
          boxShadow: '0 8px 24px -4px rgba(13, 148, 136, 0.22)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <GitBranch size={20} color="var(--navy-ink)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
              Taller de Retrosíntesis & Desconexiones (Slides 28-35)
            </h3>
            <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
              Módulo Especial
            </span>
            {isProfesor && (
              <span className="qfdos-badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                Modo Docente
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.5, maxWidth: '75ch' }}>
            Estudio sistemático de la desconexión heterolítica estratégica (⇒), selección de sintones, equivalentes sintéticos y quimioselectividad aplicada al diseño de fármacos colinérgicos y antimuscarínicos.
          </p>
        </div>

        {/* Selector de subvista */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--surface)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setSubTab('cases')}
            className={`btn btn-sm ${subTab === 'cases' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.78rem', padding: '6px 12px', fontWeight: 700 }}
          >
            <BookOpen size={13} /> 4 Casos Prácticos
          </button>
          <button
            onClick={() => setSubTab('slides')}
            className={`btn btn-sm ${subTab === 'slides' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.78rem', padding: '6px 12px', fontWeight: 700 }}
          >
            <Layers size={13} /> 8 Diapositivas RDKit
          </button>
        </div>
      </div>

      {/* SUBVISTA 1: CASOS PRÁCTICOS RETROSINTÉTICOS */}
      {subTab === 'cases' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Navegación entre casos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
            {RETROSINTHESIS_CASE_STUDIES.map((c, idx) => {
              const isSelected = c.id === selectedCaseId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--teal)' : '1px solid var(--border-color)',
                    background: isSelected ? 'var(--surface-raised)' : 'var(--surface)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    boxShadow: isSelected ? '0 2px 8px rgba(13, 148, 136, 0.15)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: isSelected ? 'var(--teal-ink)' : 'var(--text-muted)' }}>
                    CASO 0{idx + 1}
                  </span>
                  <strong style={{ fontSize: '0.84rem', color: isSelected ? 'var(--text-title)' : 'var(--text-main)', lineHeight: 1.3 }}>
                    {c.drugName.split('(')[0].trim()}
                  </strong>
                </button>
              );
            })}
          </div>

          {/* Ficha Completa del Caso Activo */}
          <div className="qfdos-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Cabecera del Caso */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem', fontWeight: 700, marginBottom: '6px' }}>
                  {currentCase.title.split(':')[0]}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', margin: '4px 0 6px' }}>
                  {currentCase.drugName}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--teal-ink)', fontWeight: 600, margin: 0 }}>
                  {currentCase.pharmacologicalRole}
                </p>
              </div>

              {/* Visor 2D interactivo del fármaco diana */}
              <div style={{ background: '#ffffff', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>Molécula Diana (TM)</span>
                <Chem2DDrawer smiles={currentCase.drugSmiles} width={200} height={90} />
              </div>
            </div>

            {/* Contexto Clínico & Reto del Problema */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--surface-alt)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--teal)' }}>
                <h4 style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--teal-ink)" /> Contexto Clínico & Aplicación
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                  {currentCase.clinicalContext}
                </p>
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--amber)' }}>
                <h4 style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--amber)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={14} color="var(--amber)" /> Reto Retrosintético
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                  {currentCase.challengeProblem}
                </p>
              </div>
            </div>

            {/* Figura Esquema RDKit si existe con interacción hover y click full screen */}
            {currentCase.imagePath && (
              <div 
                style={{ 
                  background: '#ffffff', 
                  padding: '12px 14px', 
                  borderRadius: 'var(--radius-md)', 
                  border: isHoveredScheme ? '1.5px solid var(--teal-ink)' : '1px solid var(--border-color)', 
                  textAlign: 'center',
                  position: 'relative',
                  cursor: 'zoom-in',
                  boxShadow: isHoveredScheme ? '0 12px 28px -6px rgba(13, 148, 136, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.25s ease',
                  overflow: 'hidden'
                }}
                onMouseEnter={() => setIsHoveredScheme(true)}
                onMouseLeave={() => setIsHoveredScheme(false)}
                onClick={() => {
                  const src = currentCase.imagePath!.startsWith('http') 
                    ? currentCase.imagePath! 
                    : `${import.meta.env.BASE_URL || '/'}${currentCase.imagePath!.replace(/^\//, '')}`;
                  setLightboxImage({
                    src,
                    title: `Esquema Retrosintético: ${currentCase.title}`,
                    subtitle: `Caso Práctico — Desconexión heterolítica y síntesis RDKit`,
                    tag: 'Caso Práctico'
                  });
                }}
                title="Haz clic para ampliar a pantalla completa"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Esquema Químico Vectorial RDKit (Oficial Diapositivas)
                  </span>
                  <span 
                    className="qfdos-badge badge-teal"
                    style={{ 
                      fontSize: '0.64rem', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <Maximize2 size={10} /> Clic para Pantalla Completa
                  </span>
                </div>

                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}>
                  <img 
                    src={currentCase.imagePath.startsWith('http') ? currentCase.imagePath : `${import.meta.env.BASE_URL || '/'}${currentCase.imagePath.replace(/^\//, '')}`} 
                    alt={currentCase.title}
                    style={{ 
                      maxHeight: '300px', 
                      maxWidth: '100%', 
                      objectFit: 'contain',
                      transform: isHoveredScheme ? 'scale(1.025)' : 'scale(1)',
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  
                  {/* Floating Action Badge on Hover */}
                  <div 
                    style={{
                      position: 'absolute',
                      right: '12px',
                      bottom: '12px',
                      background: isHoveredScheme ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.7)',
                      color: '#ffffff',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      transform: isHoveredScheme ? 'translateY(-2px)' : 'translateY(0)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Maximize2 size={12} /> Ampliar a Pantalla Completa
                  </div>
                </div>
              </div>
            )}

            {/* Análisis de Desconexión Paso a Paso */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <GitBranch size={16} color="var(--teal-ink)" /> Análisis Retrosintético Formal (Desconexiones ⇒)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentCase.disconnectionAnalysis.map((step) => (
                  <div 
                    key={step.stepNumber} 
                    style={{ 
                      padding: '12px 14px', 
                      borderRadius: 'var(--radius-md)', 
                      background: 'var(--surface-raised)', 
                      border: '1px solid var(--border-color)' 
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                      <strong style={{ fontSize: '0.86rem', color: 'var(--navy-ink)' }}>
                        Paso {step.stepNumber}: {step.targetBond}
                      </strong>
                      <span className="qfdos-badge badge-teal" style={{ fontSize: '0.64rem' }}>
                        {step.type}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px', fontSize: '0.82rem', marginBottom: '6px' }}>
                      <div>
                        <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>Sintones: </span>
                        <code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{step.synthons}</code>
                      </div>
                      <div>
                        <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>Equivalentes Sintéticos: </span>
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{step.syntheticEquivalents}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.45, margin: 0 }}>
                      <strong style={{ color: 'var(--teal-ink)' }}>Justificación: </strong>{step.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Síntesis Directa */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowRight size={16} color="var(--teal-ink)" /> Ruta de Síntesis Directa (Hacia Adelante →)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentCase.forwardSynthesis.map((step) => (
                  <div 
                    key={step.stepNumber} 
                    style={{ 
                      padding: '12px 14px', 
                      borderRadius: 'var(--radius-md)', 
                      background: 'var(--surface)', 
                      border: '1px solid var(--border-color)',
                      borderLeft: '3px solid var(--navy)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.86rem', color: 'var(--text-title)' }}>
                        Etapa {step.stepNumber} → {step.product}
                      </strong>
                      {step.yieldApprox && (
                        <span className="qfdos-badge badge-emerald" style={{ fontSize: '0.66rem' }}>
                          Rdto: {step.yieldApprox}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700 }}>Reactivos & Condiciones: </span>
                      {step.reagentsAndConditions}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--teal-ink)', background: 'rgba(13, 148, 136, 0.08)', padding: '6px 10px', borderRadius: '4px' }}>
                      <strong>Quimioselectividad: </strong>{step.chemoselectivityNote}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Errores Típicos del Alumnado & Conclusiones SAR */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.06)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <h4 style={{ fontSize: '0.84rem', fontWeight: 800, color: '#ef4444', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={14} color="#ef4444" /> Trampas Comunes en Exámenes de Retrosíntesis
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {currentCase.criticalStudentMistakes.map((m, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      <strong style={{ color: '#b91c1c' }}>{m.mistake}</strong>
                      <p style={{ margin: '2px 0 0', color: 'var(--text-muted)' }}>{m.chemicalReason}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <h4 style={{ fontSize: '0.84rem', fontWeight: 800, color: '#10b981', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#10b981" /> Relevancia SAR & Perfil Farmacocinético
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {currentCase.sarAndAdmetTakeaways.map((s, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUBVISTA 2: GALERÍA DE LAS 8 DIAPOSITIVAS RDKit */}
      {subTab === 'slides' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {SLIDE_CARDS.map((slide) => (
              <div 
                key={slide.slideNum}
                className="qfdos-card"
                style={{ 
                  padding: '1rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onClick={() => setLightboxImage({
                  src: `${import.meta.env.BASE_URL || '/'}${slide.image.replace(/^\//, '')}`,
                  title: slide.title,
                  subtitle: slide.subtitle,
                  tag: `Slide ${slide.slideNum} • ${slide.tag}`
                })}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="qfdos-badge badge-navy" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                      Slide {slide.slideNum}
                    </span>
                    <span className="qfdos-badge badge-teal" style={{ fontSize: '0.64rem' }}>
                      {slide.tag}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-title)', margin: '0 0 4px', lineHeight: 1.3 }}>
                    {slide.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 8px', lineHeight: 1.4 }}>
                    {slide.subtitle}
                  </p>
                </div>

                <div 
                  style={{ 
                    background: '#ffffff', 
                    padding: '6px', 
                    borderRadius: 'var(--radius-sm)', 
                    border: '1px solid var(--border-color)', 
                    textAlign: 'center', 
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage({
                      src: `${import.meta.env.BASE_URL || '/'}${slide.image.replace(/^\//, '')}`,
                      title: slide.title,
                      subtitle: slide.subtitle,
                      tag: `Slide ${slide.slideNum} • ${slide.tag}`
                    });
                  }}
                >
                  <img 
                    src={`${import.meta.env.BASE_URL || '/'}${slide.image.replace(/^\//, '')}`} 
                    alt={slide.title}
                    style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                  <span style={{ position: 'absolute', right: '8px', bottom: '8px', background: 'rgba(15, 23, 42, 0.85)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.66rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}>
                    <Maximize2 size={11} /> Pantalla Completa
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Zoom Lightbox a Pantalla Completa */}
      <ImageLightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

    </div>
  );
};
