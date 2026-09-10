import React, { useState, useEffect } from 'react';
import { PracticasProtocols } from './PracticasProtocols';
import { PracticasYieldCalculator } from './PracticasYieldCalculator';
import { PracticasSolutionsCalculator } from './PracticasSolutionsCalculator';
import { PracticasSpectroscopyWorkshop } from './PracticasSpectroscopyWorkshop';
import { PracticasLabEquipment } from './PracticasLabEquipment';
import { PracticasExamSimulator } from './PracticasExamSimulator';
import { PracticasPairReport } from './PracticasPairReport';
import { PracticasSafetyRules } from './PracticasSafetyRules';
import { PracticasProgreso } from './PracticasProgreso';
import { LimiteDeError } from '../LimiteDeError';
import {
  FlaskConical, Layers, Calculator, Droplets, Activity,
  Settings, GraduationCap, Sparkles, BookOpen, ExternalLink, Users,
  ShieldAlert, CheckCircle2, Lock, X, ClipboardCheck, Download, ShieldCheck, ChevronRight,
  Pause, Play
} from 'lucide-react';
interface PracticasSectionProps {
  currentSubTab?: string;
  onSubTabChange?: (subTab: string) => void;
}

export const PracticasSection: React.FC<PracticasSectionProps> = ({
  currentSubTab,
  onSubTabChange
}) => {
  const [isSafetyAccepted, setIsSafetyAccepted] = useState<boolean>(() => {
    return !!localStorage.getItem('qfdos_practicas_safety_accepted');
  });

  const [showLockNotice, setShowLockNotice] = useState(false);

  const [activeSubTab, setActiveSubTab] = useState<
    'progreso' | 'safety' | 'protocols' | 'yields' | 'solutions' | 'spectroscopy' | 'equipment' | 'exam' | 'pair_report'
  >(() => {
    if (currentSubTab && ['progreso', 'safety', 'protocols', 'yields', 'solutions', 'spectroscopy', 'equipment', 'exam', 'pair_report'].includes(currentSubTab)) {
      return currentSubTab as any;
    }
    const accepted = !!localStorage.getItem('qfdos_practicas_safety_accepted');
    return accepted ? 'progreso' : 'safety';
  });

  const heroRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const userPausedRef = React.useRef(false);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const posterUrl = `${baseUrl}video-header-poster.webp`;
  const mp4Url = `${baseUrl}video-header-practicas.mp4`;

  useEffect(() => {
    const applyPlaybackRate = () => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.55;
      }
    };
    applyPlaybackRate();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
      userPausedRef.current = true;
      return;
    }

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

  const togglePlayback = React.useCallback(() => {
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

  React.useEffect(() => {
    if (currentSubTab && ['progreso', 'safety', 'protocols', 'yields', 'solutions', 'spectroscopy', 'equipment', 'exam', 'pair_report'].includes(currentSubTab)) {
      setActiveSubTab(currentSubTab as any);
    }
  }, [currentSubTab]);

  const SUB_TABS = [
    {
      id: 'progreso',
      label: 'Mi progreso',
      icon: <ClipboardCheck size={15} />,
      desc: 'Qué has entregado y qué te falta',
      locked: !isSafetyAccepted
    },
    {
      id: 'safety',
      label: '0. Normas de Seguridad',
      icon: <ShieldAlert size={15} />,
      desc: 'Checklist obligatorio y precauciones',
      badge: isSafetyAccepted ? 'FIRMADO' : 'OBLIGATORIO',
      badgeClass: isSafetyAccepted ? 'badge-mint' : 'badge-red'
    },
    {
      id: 'protocols',
      label: '1. Protocolos de Síntesis',
      icon: <Layers size={15} />,
      desc: 'Guía paso a paso y esquemas 400 DPI',
      locked: !isSafetyAccepted
    },
    {
      id: 'yields',
      label: '2. Calculadora de Rendimientos',
      icon: <Calculator size={15} />,
      desc: 'Estequiometría y cuaderno digital',
      locked: !isSafetyAccepted
    },
    {
      id: 'solutions',
      label: '3. Preparación de Disoluciones',
      icon: <Droplets size={15} />,
      desc: 'Sólidos, ácidos y diluciones V₁M₁=V₂M₂',
      locked: !isSafetyAccepted
    },
    {
      id: 'spectroscopy',
      label: '4. Taller de Espectroscopia',
      icon: <Activity size={15} />,
      desc: 'Visor ¹H, ¹³C RMN, DEPT y HR-MS',
      locked: !isSafetyAccepted
    },
    {
      id: 'equipment',
      label: '5. Material y Montajes',
      icon: <Settings size={15} />,
      desc: 'Puesto de trabajo y operaciones',
      locked: !isSafetyAccepted
    },
    {
      id: 'exam',
      label: '6. Simulador de Examen',
      icon: <GraduationCap size={15} />,
      desc: 'Examen con estructuras y PM',
      locked: !isSafetyAccepted
    },
    {
      id: 'pair_report',
      label: '7. Cuaderno Parejas y Recepción',
      icon: <Users size={15} />,
      desc: 'Informe conjunto y panel profesor',
      locked: !isSafetyAccepted
    }
  ];

  const handleSafetyAccepted = () => {
    setIsSafetyAccepted(true);
    setActiveSubTab('protocols');
    onSubTabChange?.('protocols');
  };

  return (
    <>
      {/* Top Hero Section matching Hub with 3D Molecular Video Loop (Full-bleed) */}
      <section className="qfdos-hero-section" ref={heroRef} aria-label="Módulo de Prácticas y Laboratorio">
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
          {/* Filtro cinemático de color y contraste con tinte de laboratorio */}
          <div className="qfdos-hero-video-overlay overlay-practicas" />
        </div>

        {/* Dynamic structural background grid & ambient lighting */}
        <div className="qfdos-hero-bg-grid" aria-hidden="true" />
        <div className="qfdos-hero-glow-orb" aria-hidden="true" />

        <div className="qfdos-hero-container">
          <div className="qfdos-hero-layout">

            {/* Left Column: Subject identity, typography and primary actions */}
            <div className="qfdos-hero-main">
              {/* Context Badge row */}
              <div className="qfdos-hero-badges">
                <span className="qfdos-hero-pill pill-cyan">
                  MÓDULO INTERACTIVO DE LABORATORIO
                </span>
                <span className="qfdos-hero-pill pill-translucent">
                  QUÍMICA FARMACÉUTICA II · UGR
                </span>
                {isSafetyAccepted ? (
                  <span className="qfdos-hero-pill pill-prof" style={{ color: '#5eead4', borderColor: 'rgba(45, 212, 191, 0.4)' }}>
                    <CheckCircle2 size={13} /> NORMAS ACEPTADAS
                  </span>
                ) : (
                  <span className="qfdos-hero-pill" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                    <Lock size={13} /> LECTURA PENDIENTE
                  </span>
                )}
              </div>

              <h1 className="qfdos-hero-title">
                Cuaderno de<br />
                <span className="qfdos-hero-title-accent">
                  Prácticas & Examen
                </span>
              </h1>

              <p className="qfdos-hero-description">
                Plataforma integral para preparar y registrar tus prácticas de laboratorio: comprométete con las normas oficiales de seguridad, 
                visualiza las síntesis de Propranolol y DHPP, calcula reactivos limitantes y rendimientos en vivo, elucida espectros de RMN/MS y prepara el examen.
              </p>

              <div className="qfdos-hero-cta-group">
                <a
                  href="https://drive.google.com/file/d/1zHi7DsEEQ9TsXbelODcG5hcy8_pMl4Bl/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-pill-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <Download size={16} />
                  <span>Descargar Cuaderno (PDF)</span>
                  <ChevronRight size={15} className="cta-arrow" />
                </a>
                <button
                  onClick={() => {
                    setActiveSubTab('protocols');
                    onSubTabChange?.('protocols');
                  }}
                  className="btn-hero-pill-secondary"
                >
                  <FlaskConical size={16} />
                  <span>Protocolos de Síntesis</span>
                </button>
                <button
                  onClick={() => {
                    setActiveSubTab('safety');
                    onSubTabChange?.('safety');
                  }}
                  className="btn-hero-pill-tertiary"
                >
                  <ShieldCheck size={16} />
                  <span>Normas de Seguridad</span>
                </button>
              </div>
            </div>

            {/* Right Column: Laboratory matrix card with ultra-glassmorphism */}
            <div className="qfdos-hero-matrix-card">
              <div className="qfdos-matrix-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="var(--mint, #5eead4)" />
                  <span className="qfdos-matrix-title">
                    Resumen de Laboratorio
                  </span>
                </div>
                <span className="qfdos-matrix-pct-total">100%</span>
              </div>

              <div className="qfdos-matrix-items">
                {[
                  { label: '16 Normas de Seguridad Oficiales', pct: 100, barClass: 'bar-practicas' },
                  { label: '3 Reacciones (Propranolol I, II & DHPP)', pct: 100, barClass: 'bar-final' },
                  { label: '12 Espectros (¹H, ¹³C, DEPT, HRMS)', pct: 100, barClass: 'bar-parcial' },
                  { label: 'Cuaderno Conjunto por Parejas', pct: 100, barClass: 'bar-seminarios' }
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
                  'Reactivos Líquidos & Sólidos', 'Rendimientos en Vivo',
                  'Simulador de Examen', 'Entrega Digital'
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

      <div className="container" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Sub-Navigation Navigation Bar */}
      <div className="qfdos-card" style={{ padding: '0.6rem 0.8rem', background: 'var(--surface)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.5rem' }}>
          {SUB_TABS.map(tab => {
            const isActive = activeSubTab === tab.id;
            const isLocked = tab.locked;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (isLocked) {
                    setShowLockNotice(true);
                    setActiveSubTab('safety');
                    onSubTabChange?.('safety');
                  } else {
                    setShowLockNotice(false);
                    setActiveSubTab(tab.id as any);
                    onSubTabChange?.(tab.id);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  background: isActive ? 'var(--navy)' : (isLocked ? 'rgba(0,0,0,0.02)' : 'transparent'),
                  color: isActive ? '#ffffff' : (isLocked ? 'var(--text-muted)' : 'var(--text-main)'),
                  border: isActive ? '1px solid var(--navy)' : '1px solid transparent',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.78rem',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  opacity: isLocked ? 0.65 : 1
                }}
              >
                <div style={{ color: isActive ? 'var(--mint)' : (isLocked ? 'var(--text-muted)' : 'var(--teal)'), display: 'flex', alignItems: 'center' }}>
                  {isLocked ? <Lock size={14} /> : tab.icon}
                </div>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {tab.label}
                </div>
                {tab.badge && (
                  <span className={`qfdos-badge ${tab.badgeClass}`} style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content Area */}
      {showLockNotice && !isSafetyAccepted && (
        <div className="lock-notice no-print" role="status">
          <ShieldAlert size={17} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong>Antes de entrar al laboratorio hay que firmar las normas.</strong>{' '}
            Marca las {SUB_TABS.length > 0 ? '16' : ''} normas de seguridad y firma abajo: el resto
            del módulo se desbloquea al instante.
          </div>
          <button onClick={() => setShowLockNotice(false)} className="btn btn-sm btn-ghost" aria-label="Cerrar aviso">
            <X size={15} />
          </button>
        </div>
      )}

      <div>
        {activeSubTab === 'progreso' && (
          <LimiteDeError zona="Mi progreso">
            <PracticasProgreso onIr={(d) => setActiveSubTab(d as any)} />
          </LimiteDeError>
        )}
        {activeSubTab === 'safety' && (
          <PracticasSafetyRules
            onAcceptAndProceed={handleSafetyAccepted}
            isUnlocked={isSafetyAccepted}
          />
        )}
        {activeSubTab === 'protocols' && (
          <LimiteDeError zona="Protocolos de sintesis"><PracticasProtocols /></LimiteDeError>
        )}
        {activeSubTab === 'yields' && (
          <LimiteDeError zona="Calculadora de rendimientos"><PracticasYieldCalculator /></LimiteDeError>
        )}
        {activeSubTab === 'solutions' && (
          <LimiteDeError zona="Preparacion de disoluciones"><PracticasSolutionsCalculator /></LimiteDeError>
        )}
        {activeSubTab === 'spectroscopy' && (
          <LimiteDeError zona="Taller de espectroscopia"><PracticasSpectroscopyWorkshop /></LimiteDeError>
        )}
        {activeSubTab === 'equipment' && (
          <LimiteDeError zona="Material y montajes"><PracticasLabEquipment /></LimiteDeError>
        )}
        {activeSubTab === 'exam' && (
          <LimiteDeError zona="Simulador de examen"><PracticasExamSimulator /></LimiteDeError>
        )}
        {activeSubTab === 'pair_report' && (
          <LimiteDeError zona="Cuaderno de parejas"><PracticasPairReport /></LimiteDeError>
        )}
      </div>

    </div>
    </>
  );
};
