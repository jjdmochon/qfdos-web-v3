import React, { useState, useRef, useEffect } from 'react';
import { CourseAttachment } from '../data/qfdosData';
import {
  X,
  Radio,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Download,
  Headphones
} from 'lucide-react';

interface SpotifyPlayerModalProps {
  attachment: CourseAttachment | null;
  onClose: () => void;
}

export const SpotifyPlayerModal: React.FC<SpotifyPlayerModalProps> = ({
  attachment,
  onClose
}) => {
  if (!attachment) return null;

  // Determine available media sources
  const audioSource = attachment.audioUrl || (
    attachment.type === 'audio' ||
    (attachment.url && (attachment.url.endsWith('.mp3') || attachment.url.endsWith('.wav') || attachment.url.includes('audio/')))
      ? attachment.url
      : undefined
  );

  const spotifySource = attachment.spotifyUri || (
    attachment.type === 'spotify' ||
    (attachment.url && attachment.url.includes('spotify.com'))
      ? (attachment.spotifyUri || (attachment.url.includes('spotify.com') ? attachment.url : undefined))
      : undefined
  );

  const hasBoth = !!(audioSource && spotifySource);
  // Se abre en la pestaña que se pidió desde la tarjeta del tema
  const [activeMediaTab, setActiveMediaTab] = useState<'audio' | 'spotify'>(
    attachment.type === 'spotify' && spotifySource ? 'spotify' : audioSource ? 'audio' : 'spotify'
  );

  // Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Synchronize audio playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Synchronize audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Reset or pause on unmount/tab switch
  useEffect(() => {
    if (activeMediaTab === 'spotify' && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeMediaTab]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play prevented:', err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs <= 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Extract Spotify episode ID from URL or URI
  const getEmbedUrl = (url: string) => {
    if (url.includes('open.spotify.com/episode/')) {
      const epId = url.split('/episode/')[1]?.split('?')[0];
      return `https://open.spotify.com/embed/episode/${epId}?utm_source=generator&theme=0`;
    }
    return 'https://open.spotify.com/embed/show/3Kx9ColinQFDOS01?utm_source=generator&theme=0';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '680px', width: '92%' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={20} color="#1db954" />
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-title)' }}>
              {attachment.title || 'Podcast Oficial · QFDOS'}
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
        </div>

        {/* Media Selector Tabs (if both direct audio and Spotify are available) */}
        {hasBoth && (
          <div style={{
            display: 'flex',
            gap: '6px',
            padding: '10px 1.25rem 0',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--surface-alt)'
          }}>
            <button
              onClick={() => setActiveMediaTab('audio')}
              style={{
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                background: activeMediaTab === 'audio' ? 'var(--surface-card, #ffffff)' : 'transparent',
                color: activeMediaTab === 'audio' ? '#2563eb' : 'var(--text-muted)',
                borderBottom: activeMediaTab === 'audio' ? '3px solid #2563eb' : '3px solid transparent',
                borderRadius: '6px 6px 0 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Headphones size={15} /> Píldora de Audio Web (MP3)
            </button>
            <button
              onClick={() => setActiveMediaTab('spotify')}
              style={{
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                background: activeMediaTab === 'spotify' ? 'var(--surface-card, #ffffff)' : 'transparent',
                color: activeMediaTab === 'spotify' ? '#1db954' : 'var(--text-muted)',
                borderBottom: activeMediaTab === 'spotify' ? '3px solid #1db954' : '3px solid transparent',
                borderRadius: '6px 6px 0 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Radio size={15} /> Vídeo Podcast (Spotify)
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Subheader Badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span
              className="qfdos-badge"
              style={{
                fontSize: '0.72rem',
                background: activeMediaTab === 'audio' ? '#2563eb' : '#1db954',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '20px'
              }}
            >
              {activeMediaTab === 'audio' ? <Headphones size={12} /> : <Radio size={12} />}
              {activeMediaTab === 'audio' ? 'Píldora Docente de Audio · Streaming Directo' : 'Episodio Oficial de Vídeo · Spotify'}
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Facultad de Farmacia · UGR
            </span>
          </div>

          {/* TAB 1: Direct HTML5 Audio Player */}
          {activeMediaTab === 'audio' && audioSource && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(16,185,129,0.06))',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg, 12px)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {/* Hidden HTML5 Audio Element */}
              <audio
                ref={audioRef}
                src={audioSource}
                preload="metadata"
                onTimeUpdate={() => {
                  if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
                }}
                onLoadedMetadata={() => {
                  if (audioRef.current) setDuration(audioRef.current.duration);
                }}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Episode Info Banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #2563eb, #10b981)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
                }}>
                  <Headphones size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)' }}>
                    Tema 01: Sistema Colinérgico
                  </h4>
                  <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Transmisión colinérgica, inhibidores de AChE, organofosforados y oximas reactivadoras (2-PAM)
                  </p>
                </div>
              </div>

              {/* Progress Slider & Times */}
              <div>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.5}
                  value={currentTime}
                  onChange={handleSeek}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '4px',
                    accentColor: '#2563eb',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'monospace' }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Playback Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <button
                  onClick={() => skipTime(-15)}
                  className="btn btn-sm btn-ghost"
                  title="Retroceder 15 segundos"
                  style={{ padding: '8px', color: 'var(--text-main)' }}
                >
                  <RotateCcw size={18} />
                  <span style={{ fontSize: '0.68rem', marginLeft: '2px' }}>15s</span>
                </button>

                <button
                  onClick={togglePlay}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
                    transition: 'transform 0.15s ease'
                  }}
                  title={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
                </button>

                <button
                  onClick={() => skipTime(15)}
                  className="btn btn-sm btn-ghost"
                  title="Avanzar 15 segundos"
                  style={{ padding: '8px', color: 'var(--text-main)' }}
                >
                  <RotateCw size={18} />
                  <span style={{ fontSize: '0.68rem', marginLeft: '2px' }}>15s</span>
                </button>
              </div>

              {/* Playback Rate & Volume Controls */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(0,0,0,0.06)'
              }}>
                {/* Speed Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '4px' }}>
                    Velocidad:
                  </span>
                  {[0.8, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => setPlaybackRate(rate)}
                      style={{
                        padding: '2px 8px',
                        fontSize: '0.72rem',
                        fontWeight: playbackRate === rate ? 800 : 500,
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        background: playbackRate === rate ? '#2563eb' : 'var(--surface-alt)',
                        color: playbackRate === rate ? '#fff' : 'var(--text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Volume & Download */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={e => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    style={{ width: '60px', height: '4px', accentColor: '#2563eb' }}
                  />

                  <a
                    href={audioSource}
                    download="QFDOS_Tema01_Podcast_Colinergicos.mp3"
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.72rem', fontWeight: 600, padding: '4px 8px', gap: '4px', marginLeft: '6px' }}
                    title="Descargar audio para escuchar sin conexión"
                  >
                    <Download size={13} /> Descargar MP3
                  </a>
                </div>
              </div>

              {/* Synopsis Callout */}
              <div style={{
                background: 'var(--surface-card, #ffffff)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.78rem',
                color: 'var(--text-main)',
                lineHeight: 1.5
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-title)', marginBottom: '4px' }}>
                  💡 Contenidos clave del episodio:
                </div>
                Estudio del catión cuaternario en ACh (regla de los 5 átomos de Ing), agonistas directos (Metacolina, Betanecol), carbamatos pseudoirreversibles (Neostigmina, Rivastigmina), inhibidores para Alzheimer (Donepezilo) y rescate enzimático frente a organofosforados con Pralidoxima (2-PAM).
              </div>
            </div>
          )}

          {/* TAB 2: Spotify Video Podcast Embed */}
          {activeMediaTab === 'spotify' && (
            <>
              {spotifySource ? (
                <>
                  <iframe
                    src={getEmbedUrl(spotifySource)}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: 'var(--radius-lg, 12px)', boxShadow: 'var(--shadow-md)', minHeight: '232px', border: 'none' }}
                  />

                  <div style={{
                    background: 'var(--surface-alt)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '380px', lineHeight: 1.4 }}>
                      💡 <em>Vídeo en alta resolución:</em> El reproductor web embebido de Spotify transmite el audio del episodio. Para ver el <strong>vídeo sincronizado en HD</strong>, abre el episodio directamente en la app o web de Spotify.
                    </div>
                    <a 
                      href={spotifySource} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.75rem', fontWeight: 700, borderColor: '#1db954', color: '#1db954', whiteSpace: 'nowrap' }}
                    >
                      <ExternalLink size={13} /> Ver Vídeo en Spotify
                    </a>
                  </div>
                </>
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--surface-alt)', borderRadius: '8px' }}>
                  No hay enlace de Spotify configurado para este tema todavía.
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">
            Cerrar Reproductor
          </button>
        </div>

      </div>
    </div>
  );
};
