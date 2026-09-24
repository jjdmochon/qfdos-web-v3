import React, { useState, useRef, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { esNativo } from '../native/nativeBridge';
import { AlertCircle, GraduationCap, FlaskConical, Atom, Layers, ExternalLink } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const posterUrl = `${baseUrl}video-header-poster.webp`;
  const mp4Url = `${baseUrl}video-header.mp4`;
  const webmUrl = `${baseUrl}video-header.webm`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55;
    }
  }, []);

  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    setLoading(true);
    setError(null);
    const result = await loginWithGoogle(credentialResponse);
    if (!result.success) {
      setError(result.error || 'Error al iniciar sesión.');
    }
    setLoading(false);
  };

  const handleNativo = async () => {
    setError(null);
    try {
      const { loginGoogleNativo } = await import('../native/googleNativo');
      const credential = await loginGoogleNativo();
      await handleSuccess({ credential });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/no credentials available/i.test(msg)) {
        setError('No hay ninguna cuenta de Google en este dispositivo. Añádela en Ajustes → Cuentas y vuelve a intentarlo.');
      } else if (!/cancel/i.test(msg)) {
        setError(`No se pudo iniciar sesión con Google: ${msg}`);
      }
    }
  };

  const handleError = () => {
    setError('No se pudo completar el inicio de sesión con Google. Inténtalo de nuevo.');
  };

  return (
    <div className="login-root">
      {/* Background Ambient Molecular Video Loop */}
      <div className="login-video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className={`login-bg-video ${videoLoaded ? 'is-loaded' : ''}`}
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
          {webmUrl && <source src={webmUrl} type="video/webm" />}
        </video>
        <div className="login-video-overlay" />
      </div>

      {/* Ambient breathing glow behind card */}
      <div className="login-ambient-orb" aria-hidden="true" />

      {/* Center card */}
      <div className="login-card">
        {/* Header */}
        <div className="login-card-header">
          <div className="login-logo-ring">
            <img
              src="https://i.ibb.co/HLCYDc3c/Logo-primario-QFDOS.png"
              alt="QFDOS"
              style={{ width: 52, height: 52, borderRadius: 10 }}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          <div className="login-badge-row">
            <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem' }}>2627 QFDOS E</span>
            <span className="qfdos-badge badge-mint" style={{ fontSize: '0.68rem' }}>Curso 2026/2027</span>
          </div>

          <h1 className="login-title">Química Farmacéutica II</h1>
          <p className="login-subtitle">
            Plataforma desarrollada por{' '}
            <a
              href="https://nexus-lab-team.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="nexus-login-link"
              style={{ color: '#0d9488', fontWeight: 800, textDecoration: 'none' }}
            >
              NEXUS.LAB
            </a>{' '}
            · Grado en Farmacia, UGR
          </p>
        </div>

        {/* Divider */}
        <div className="login-divider">
          <span>Acceso con @go.ugr.es o @gmail.com</span>
        </div>

        {/* Google login */}
        <div className="login-google-wrap">
          {loading ? (
            <div className="login-loading">
              <span className="login-spinner" />
              <span>Verificando credenciales UGR…</span>
            </div>
          ) : esNativo ? (
            <button type="button" className="login-google-native" onClick={handleNativo}>
              <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z" />
                <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.8-6.1z" />
                <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.2 1.5-5 2.3-8.2 2.3-6.2 0-11.5-4.2-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
              </svg>
              <span>Iniciar sesión con Google</span>
            </button>
          ) : (
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              theme="filled_blue"
              shape="rectangular"
              size="large"
              text="signin_with"
              locale="es"
              useOneTap={false}
              width="320"
            />
          )}

          {error && (
            <div className="login-error">
              <AlertCircle size={16} strokeWidth={2} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Info boxes */}
        <div className="login-info-grid">
          <div className="login-info-box">
            <GraduationCap size={18} color="var(--teal-ink)" />
            <div>
              <strong>Estudiantes</strong>
              <p>
                Entra con tu correo institucional (<code>@go.ugr.es</code>) o con tu cuenta de <code>@gmail.com</code>.
              </p>
            </div>
          </div>
          <div className="login-info-box login-info-box--professor">
            <Layers size={18} color="var(--navy-ink)" />
            <div>
              <strong>Profesorado</strong>
              <p>El panel de administración admite <code>juandiaz@go.ugr.es</code> o <code>juandiaz@ugr.es</code></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="login-footer-note" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div>Universidad de Granada · Departamento de Química Farmacéutica y Orgánica</div>
          <a
            href="https://nexus-lab-team.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="nexus-login-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              marginTop: '4px',
              padding: '3px 10px',
              borderRadius: '20px',
              background: 'rgba(13, 148, 136, 0.07)',
              border: '1px solid rgba(13, 148, 136, 0.18)'
            }}
          >
            <span>Desarrollado por</span>
            <strong style={{ color: 'var(--teal-ink)', letterSpacing: '-0.2px' }}>
              NEXUS<span style={{ color: '#00bcd4' }}>.LAB</span>
            </strong>
            <ExternalLink size={12} style={{ opacity: 0.7 }} />
          </a>
        </div>
      </div>
    </div>
  );
};
