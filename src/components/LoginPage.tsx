import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, GraduationCap, FlaskConical, Atom, Layers, Eye, ExternalLink } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithGoogle, loginAsGuest } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSuccess = (credentialResponse: { credential?: string }) => {
    setLoading(true);
    setError(null);
    const result = loginWithGoogle(credentialResponse);
    if (!result.success) {
      setError(result.error || 'Error al iniciar sesión.');
    }
    setLoading(false);
  };

  const handleError = () => {
    setError('No se pudo completar el inicio de sesión con Google. Inténtalo de nuevo.');
  };

  return (
    <div className="login-root">
      {/* Background decorative grid */}
      <div className="login-bg-grid" aria-hidden="true" />

      {/* Floating molecules decoration */}
      <div className="login-deco" aria-hidden="true">
        <Atom size={120} strokeWidth={0.5} color="rgba(45,212,191,0.08)" style={{ position: 'absolute', top: '8%', left: '6%' }} />
        <FlaskConical size={80} strokeWidth={0.5} color="rgba(255,255,255,0.05)" style={{ position: 'absolute', bottom: '12%', right: '8%' }} />
        <Layers size={90} strokeWidth={0.5} color="rgba(59,130,246,0.07)" style={{ position: 'absolute', top: '55%', left: '3%' }} />
      </div>

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
              href="https://nexus-lab-antonio.netlify.app/"
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

        {/* Acceso para tribunales, evaluadores y revisores externos */}
        <div style={{ margin: '0.25rem 0 1.25rem 0', textAlign: 'center' }}>
          <button
            type="button"
            onClick={loginAsGuest}
            className="btn btn-sm btn-outline"
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '7px 16px',
              borderRadius: '8px',
              color: 'var(--text-title)',
              borderColor: 'var(--border-color)',
              background: 'var(--surface-alt)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Eye size={14} color="var(--teal)" /> Acceso de revisión / Modo demo
          </button>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '5px' }}>
            Para tribunales, evaluadores y revisores sin cuenta institucional UGR
          </div>
        </div>

        {/* Info boxes */}
        <div className="login-info-grid">
          <div className="login-info-box">
            <GraduationCap size={18} color="var(--teal-ink)" />
            <div>
              <strong>Estudiantes</strong>
              <p>
                Entra con tu cuenta institucional (<code>@go.ugr.es</code>) o con tu cuenta de <code>@gmail.com</code>.
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
            href="https://nexus-lab-antonio.netlify.app/"
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
