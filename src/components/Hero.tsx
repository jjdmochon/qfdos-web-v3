import React, { useRef, useEffect, useState } from 'react';
import { QFDOS_INFO } from '../data/qfdosData';
import { BookOpen, Award, CheckCircle2, FlaskConical, Sparkles, ChevronRight, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  onNavigateToTemas: () => void;
  onNavigateToSimulador: () => void;
  onOpenDrugSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigateToTemas,
  onNavigateToSimulador,
  onOpenDrugSearch
}) => {
  const { user, isProfesor } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const posterUrl = `${baseUrl}video-header-poster.webp`;
  const webmUrl = `${baseUrl}video-header.webm`;
  const mp4Url = `${baseUrl}video-header.mp4`;

  useEffect(() => {
    // Respetar preferencia de reducción de movimiento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // IntersectionObserver: pausa el vídeo al hacer scroll para no consumir GPU/batería
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="qfdos-hero-section" ref={heroRef}>
      {/* Background Ambient Molecular Video Loop */}
      <div className="qfdos-hero-video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className={`qfdos-hero-bg-video ${videoLoaded ? 'is-loaded' : ''}`}
          autoPlay
          loop
          muted
          playsInline
          poster={posterUrl}
          preload="metadata"
          onCanPlayThrough={() => setVideoLoaded(true)}
        >
          <source src={webmUrl} type="video/webm" />
          <source src={mp4Url} type="video/mp4" />
        </video>
        {/* Filtro de color y contraste para máxima legibilidad del texto */}
        <div className="qfdos-hero-video-overlay" />
      </div>

      {/* Dynamic structural background grid */}
      <div className="qfdos-hero-bg-grid" />
      <div className="qfdos-hero-glow-orb" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="qfdos-hero-layout">

          {/* Left Column: Subject identity, typography and primary actions */}
          <div className="qfdos-hero-main">
            {/* Context Badge row */}
            <div className="qfdos-hero-badges">
              <span className="qfdos-hero-pill pill-cyan">
                CURSO ACADÉMICO {QFDOS_INFO.year}
              </span>
              <span className="qfdos-hero-pill pill-translucent">
                GRUPO E · FACULTAD DE FARMACIA (UGR)
              </span>
              {isProfesor && (
                <span className="qfdos-hero-pill pill-prof">
                  <GraduationCap size={13} /> MODO PROFESOR
                </span>
              )}
            </div>

            <h1 className="qfdos-hero-title">
              Química<br />
              <span className="qfdos-hero-title-accent">
                Farmacéutica II
              </span>
            </h1>

            {user && (
              <p className="qfdos-hero-welcome">
                Bienvenido/a, <strong>{user.name.split(' ')[0]}</strong>
              </p>
            )}

            <p className="qfdos-hero-description">
              Diseño racional de fármacos, afinidad termodinámica (ΔG°, Kd, Ki), relaciones SAR, quimioinformática 2D/3D y evaluación continua.
            </p>

            <div className="qfdos-hero-cta-group">
              <button onClick={onNavigateToTemas} className="btn-hero-primary">
                <BookOpen size={17} />
                <span>Explorar 11 Temas</span>
                <ChevronRight size={15} style={{ opacity: 0.8 }} />
              </button>
              <button onClick={onNavigateToSimulador} className="btn-hero-secondary">
                <Award size={17} />
                <span>Simulador Biofísico</span>
              </button>
              <button
                onClick={onOpenDrugSearch}
                className="btn-hero-tertiary"
                title="Buscador inteligente con PubChem y DrugBank"
              >
                <FlaskConical size={16} />
                <span>Buscar Fármaco</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-affinity evaluation matrix card */}
          <div className="qfdos-hero-matrix-card">
            <div className="qfdos-matrix-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--mint)" />
                <span className="qfdos-matrix-title">
                  Evaluación Continua UGR
                </span>
              </div>
              <span className="qfdos-matrix-pct-total">100%</span>
            </div>

            <div className="qfdos-matrix-items">
              {[
                { label: 'Examen Final Oficial (Obligatorio, mín. 5)', pct: 70, barClass: 'bar-final' },
                { label: 'Examen Parcial (No eliminatorio)', pct: 20, barClass: 'bar-parcial' },
                { label: 'Prácticas de Laboratorio (Obligatorio)', pct: 5, barClass: 'bar-practicas' },
                { label: 'Trabajos y/o Seminarios', pct: 5, barClass: 'bar-seminarios' }
              ].map(item => (
                <div key={item.label} className="qfdos-matrix-row">
                  <div className="qfdos-matrix-label-row">
                    <span className="qfdos-matrix-item-name">{item.label}</span>
                    <span className="qfdos-matrix-item-pct">{item.pct}%</span>
                  </div>
                  <div className="qfdos-matrix-track">
                    <div className={`qfdos-matrix-fill ${item.barClass}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="qfdos-matrix-features">
              {[
                '11 Temas Completos', 'Quimioinformática 2D/3D',
                'Podcasts & NotebookLM', 'Quiz & Flashcards IA'
              ].map(feat => (
                <div key={feat} className="qfdos-matrix-feature-pill">
                  <CheckCircle2 size={13} color="var(--mint)" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
