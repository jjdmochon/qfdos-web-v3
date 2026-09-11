import React, { useRef, useEffect, useState, useCallback } from 'react';
import { QFDOS_INFO } from '../data/qfdosData';
import {
  BookOpen, Award, CheckCircle2, FlaskConical, Sparkles,
  ChevronRight, GraduationCap, Pause, Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  onNavigateToTemas: () => void;
  onNavigateToSimulador: () => void;
  onOpenDrugSearch: () => void;
  onOpenFirSimulator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigateToTemas,
  onNavigateToSimulador,
  onOpenDrugSearch,
  onOpenFirSimulator
}) => {
  const { user, isProfesor } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const userPausedRef = useRef(false);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const posterUrl = `${baseUrl}video-header-poster.webp`;
  const mp4Url = `${baseUrl}video-header-hub.mp4`;

  useEffect(() => {
    // Ajustar velocidad de reproducción lenta (0.55x) para un movimiento molecular suave
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55;
    }

    // Respetar preferencia de reducción de movimiento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
      userPausedRef.current = true;
      return;
    }

    // IntersectionObserver: pausa el vídeo al hacer scroll para no consumir GPU
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!videoRef.current) return;
          if (entry.isIntersecting && !userPausedRef.current) {
            videoRef.current.play().then(() => {
              if (videoRef.current) videoRef.current.playbackRate = 0.55;
              setIsPlaying(true);
            }).catch(() => {});
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

  const togglePlayback = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      userPausedRef.current = true;
    } else {
      userPausedRef.current = false;
      videoRef.current.play().then(() => {
        if (videoRef.current) videoRef.current.playbackRate = 0.55;
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <section className="qfdos-hero-section" ref={heroRef} aria-label="Introducción a Química Farmacéutica II">
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
          onPlay={e => { e.currentTarget.playbackRate = 0.55; }}
          onLoadedMetadata={e => { e.currentTarget.playbackRate = 0.55; }}
          onCanPlayThrough={() => {
            if (videoRef.current) videoRef.current.playbackRate = 0.55;
            setVideoLoaded(true);
          }}
        >
          <source src={mp4Url} type="video/mp4" />
        </video>
        {/* Filtro cinemático de color y contraste para máxima legibilidad */}
        <div className="qfdos-hero-video-overlay" />
      </div>

      {/* Dynamic structural background grid & ambient lighting */}
      <div className="qfdos-hero-bg-grid" aria-hidden="true" />
      <div className="qfdos-hero-glow-orb" aria-hidden="true" />

      {/* Main Hero Content Container */}
      <div className="qfdos-hero-container">
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
              <button onClick={onNavigateToTemas} className="btn-hero-pill-primary">
                <BookOpen size={16} />
                <span>Explorar 11 Temas</span>
                <ChevronRight size={15} className="cta-arrow" />
              </button>
              <button onClick={onNavigateToSimulador} className="btn-hero-pill-secondary">
                <Award size={16} />
                <span>Simulador Biofísico</span>
              </button>
              {onOpenFirSimulator && (
                <button
                  onClick={onOpenFirSimulator}
                  className="btn-hero-pill-secondary"
                  style={{ background: 'rgba(13, 148, 136, 0.22)', borderColor: 'rgba(45, 212, 191, 0.45)', color: '#2dd4bf' }}
                  title="Simulador Oficial Examen FIR (2020-2025)"
                >
                  <Award size={16} />
                  <span>Simulador FIR</span>
                </button>
              )}
              <button
                onClick={onOpenDrugSearch}
                className="btn-hero-pill-tertiary"
                title="Buscador inteligente con PubChem y DrugBank"
              >
                <FlaskConical size={15} />
                <span>Buscar Fármaco</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-affinity evaluation matrix card with ultra-glassmorphism */}
          <div className="qfdos-hero-matrix-card">
            <div className="qfdos-matrix-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--mint, #5eead4)" />
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
                  <CheckCircle2 size={13} color="var(--mint, #5eead4)" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Floating Dompé-style Video Playback Control */}
        <div className="qfdos-hero-footer-ctrls">
          <button
            type="button"
            onClick={togglePlayback}
            className="btn-hero-video-ctrl"
            aria-label={isPlaying ? 'Pausar vídeo molecular de fondo' : 'Reanudar vídeo molecular de fondo'}
            aria-pressed={!isPlaying}
            title={isPlaying ? 'Pausar animación molecular' : 'Reanudar animación molecular'}
          >
            {isPlaying ? (
              <Pause size={13} className="ctrl-icon" />
            ) : (
              <Play size={13} className="ctrl-icon" />
            )}
            <span>{isPlaying ? 'Pausar vídeo' : 'Reanudar vídeo'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
