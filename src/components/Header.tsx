import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useInstalarApp } from '../utils/instalarApp';
import { BARAJAS } from './cartas/CartasDeckView';
import {
  Sun, Moon, Search, FileText, HelpCircle, Settings,
  GraduationCap, BookOpen, Activity, Award, Layers,
  LogOut, ChevronDown, ShieldCheck, Compass, FlaskConical, Menu, X
, Download } from 'lucide-react';

/** Atajo de búsqueda con la tecla modificadora de cada plataforma */
const ES_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
const ATAJO_BUSCAR = ES_MAC ? '⌘K' : 'Ctrl K';

/** Pestañas fijas de la barra inferior en móvil; el resto vive en «Menú» */
const TABBAR_IDS = ['hub', 'temas', 'practicas', 'evaluacion'];

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenExamGenerator: () => void;
  onOpenFirSimulator: () => void;
  onOpenStudentQuestion: () => void;
  onOpenAdminCms: () => void;
  onOpenCartas?: () => void;
  /** Profesorado: dudas sin responder. */
  dudasPendientes?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenExamGenerator,
  onOpenFirSimulator,
  onOpenStudentQuestion,
  onOpenAdminCms,
  onOpenCartas,
  dudasPendientes = 0
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isProfesor, isInstitucional, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { opcion: opcionInstalar, instalar } = useInstalarApp();
  const [ayudaIOS, setAyudaIOS] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLButtonElement>(null);

  /* Regla de ocupación: una barra que se acopla bajo la pestaña activa.
     Se mide sobre el DOM en vez de calcularse, porque el ancho de cada
     pestaña depende de la fuente ya cargada y del zoom del navegador. */
  const navRef = useRef<HTMLElement>(null);
  const [occ, setOcc] = useState({ x: 0, w: 0, on: 0 });

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const medir = () => {
      const el = nav.querySelector<HTMLElement>('.nav-tab.active');
      if (!el) { setOcc(o => ({ ...o, on: 0 })); return; }
      setOcc({ x: el.offsetLeft, w: el.offsetWidth, on: 1 });
      // Desplaza solo la tira de pestañas (scrollIntoView movía también el punto de
      // partida del foco: el primer Tab saltaba el enlace «Saltar al contenido»)
      if (nav.scrollWidth > nav.clientWidth) {
        nav.scrollTo({ left: el.offsetLeft - nav.clientWidth / 2 + el.offsetWidth / 2 });
      }
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(nav);
    nav.querySelectorAll('.nav-tab').forEach(t => ro.observe(t));
    // Montserrat llega después del primer pintado y cambia los anchos
    document.fonts?.ready.then(medir).catch(() => {});
    return () => ro.disconnect();
  }, [activeTab]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuRef.current?.querySelector('.user-dropdown')) {
        setMenuOpen(false);
        chipRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // El menú móvil se cierra al cambiar de sección (también con Atrás)
  useEffect(() => { setDrawerOpen(false); }, [activeTab]);

  const irA = (tab: string) => { setActiveTab(tab); setDrawerOpen(false); };
  const abrirDesdeMenu = (fn: () => void) => () => { setDrawerOpen(false); fn(); };

  const NAV_ITEMS = [
    { id: 'hub',        label: 'Hub',             icon: <Layers size={14} /> },
    { id: 'info',       label: 'Curso & Horarios', icon: <GraduationCap size={14} /> },
    { id: 'temas',      label: 'Temario',          icon: <BookOpen size={14} /> },
    { id: 'practicas',  label: 'Prácticas',        icon: <FlaskConical size={14} /> },
    { id: 'simulador',  label: 'Simulador',        icon: <Award size={14} /> },
    { id: 'admet',      label: 'ADMET',            icon: <Activity size={14} /> },
    { id: 'glosario',   label: 'Glosario',         icon: <BookOpen size={14} /> },
    { id: 'enlaces',    label: 'Enlaces',          icon: <Compass size={14} /> },
    { id: 'evaluacion', label: 'Evaluación',       icon: <ShieldCheck size={14} /> },
  ];

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <header className="qfdos-header-root">
      <div className="container">
        {/* Fila Superior: Marca Principal + Búsqueda Inteligente + Herramientas */}
        <div className="header-fila">
          {/* Brand */}
          <button
            onClick={() => setActiveTab('hub')}
            className="header-brand"
          >
            <div className="header-logo-badge">
              <img
                src={`${import.meta.env.BASE_URL}assets/Marca/qfdos-isotipo.png`}
                alt="QFDOS"
                className="header-logo-img"
                onError={e => {
                  const target = e.currentTarget;
                  if (!target.src.includes('i.ibb.co')) {
                    target.src = 'https://i.ibb.co/HLCYDc3c/Logo-primario-QFDOS.png';
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
            </div>
            <div style={{ lineHeight: 1.15, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="brand-title">QFDOS</span>
                <span className="brand-version-badge">2026/27</span>
                <span className="qfdos-badge badge-teal" style={{ fontSize: '0.62rem', padding: '1px 6px', fontWeight: 800 }}>Grupo E</span>
              </div>
              <span className="brand-sub">Química Farmacéutica II · Fac. Farmacia UGR</span>
            </div>
          </button>

          {/* Buscador: ocupa el espacio central */}
          <button
            onClick={onOpenSearch}
            className="header-search"
            title={`Búsqueda global (${ATAJO_BUSCAR})`}
            aria-label="Buscar en la plataforma"
          >
            <Search size={15} className="header-search-icon" />
            <span className="header-search-texto">Buscar dianas, fármacos, cinética, RMN…</span>
            <kbd className="header-search-kbd">{ATAJO_BUSCAR}</kbd>
          </button>

          {/* Right tools */}
          <div className="header-tools">
            {/* Baraja Coleccionable de todos los temas (Accesible a todos) */}
            {onOpenCartas && (
              <button
                onClick={onOpenCartas}
                className="btn btn-sm btn-header-action btn-header-cartas"
                title={`Baraja Coleccionable de Fármacos · Temas ${Object.keys(BARAJAS).join(', ')}`}
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.12) 0%, rgba(13, 148, 136, 0.12) 100%)',
                  border: '1px solid rgba(45, 212, 191, 0.35)',
                  color: 'var(--text-title)'
                }}
              >
                <Layers size={14} color="var(--teal-ink)" />
                <span className="tool-label">Cartas</span>
                <span className="qfdos-badge badge-mint tool-badge" style={{ fontSize: '0.58rem', padding: '1px 5px', marginLeft: 3, fontWeight: 800 }}>
                  {Object.values(BARAJAS).reduce((n, b) => n + b.farmacos.length, 0)} Cartas
                </span>
              </button>
            )}

            {/* Generador Examen (Solo para profesores) */}
            {isProfesor && (
              <button
                onClick={onOpenExamGenerator}
                className="btn btn-sm btn-header-action"
                title="Generador de Examen"
              >
                <FileText size={14} /><span className="tool-label">Generador Examen</span>
              </button>
            )}

            {/* Simulador FIR */}
            <button
              onClick={onOpenFirSimulator}
              className="btn btn-sm btn-header-fir"
              title="Simulador Oficial Examen FIR (2020-2025)"
            >
              <Award size={14} /><span className="tool-label">Simulador FIR</span>
            </button>

            {/* Buzón de dudas: con etiqueta, porque el icono «?» solo no se reconocía */}
            <button
              onClick={onOpenStudentQuestion}
              className="btn btn-sm btn-ghost-clean btn-header-buzon"
              title={isProfesor ? 'Buzón de dudas: responde a tu alumnado' : 'Buzón de dudas: pregunta al profesor y consulta sus respuestas'}
              aria-label={isProfesor && dudasPendientes > 0 ? `Buzón de dudas, ${dudasPendientes} sin responder` : 'Buzón de dudas'}
            >
              <HelpCircle size={16} />
              <span className="tool-label">Buzón de dudas</span>
              {isProfesor && dudasPendientes > 0 && (
                <span className="buzon-aviso" aria-hidden="true">{dudasPendientes}</span>
              )}
            </button>

            {/* Admin (sólo profesorado) */}
            {isProfesor && (
              <button
                onClick={onOpenAdminCms}
                className="btn btn-sm btn-header-admin"
                title="Subir materiales y administrar el curso"
              >
                <Settings size={14} />
                <span className="admin-btn-label">Gestión Docente</span>
              </button>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-ghost-clean"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark'
                ? <Sun size={16} color="#fbbf24" />
                : <Moon size={16} color="currentColor" />
              }
            </button>

            {/* User chip with dropdown */}
            <div
              ref={menuRef}
              className="user-menu-wrap"
              style={{ position: 'relative' }}
              onBlur={e => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenuOpen(false);
              }}
            >
              <button
                ref={chipRef}
                onClick={() => setMenuOpen(o => !o)}
                className="user-chip"
                style={{ cursor: 'pointer' }}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls="menu-usuario"
                aria-label={`Cuenta de ${user?.name || 'usuario'}`}
              >
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="avatar" className="user-avatar" />
                ) : (
                  <div className="user-avatar-fallback">{initials}</div>
                )}
                <div className="user-chip-text">
                  <div className="user-chip-name">{user?.name?.split(' ')[0] || ''}</div>
                  <div className="user-chip-role">
                    {!isInstitucional && (
                      <span
                        title="Has entrado con una cuenta personal de Google"
                        style={{ color: 'var(--accent-amber)', fontWeight: 700, marginRight: 4 }}
                      >
                        Personal ·
                      </span>
                    )}
                    {isProfesor
                      ? <span style={{ color: 'var(--teal-ink)', fontWeight: 700 }}>Prof. Responsable</span>
                      : <span>Estudiante (Gr. E)</span>
                    }
                  </div>
                </div>
                <ChevronDown size={13} color="var(--text-muted)" style={{ transition: 'transform 200ms', transform: menuOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {menuOpen && (
                <div id="menu-usuario" className="user-dropdown" style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  minWidth: 230,
                  overflow: 'hidden',
                  animation: 'dropIn 160ms var(--ease-out)',
                  zIndex: 200
                }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-alt)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-title)' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{user?.email}</div>
                    {isProfesor && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                        <ShieldCheck size={13} color="var(--teal-ink)" />
                        <span style={{ fontSize: '0.72rem', color: 'var(--teal-ink)', fontWeight: 800 }}>Profesor Responsable (Grupo E)</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="menu-item menu-item--danger"
                  >
                    <LogOut size={15} /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fila Inferior: Navegación de Pestañas con micro-indicadores */}
        <nav className="header-nav" aria-label="Secciones del curso" ref={navRef}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-tab ${activeTab === item.id ? 'active' : ''}`}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <span
            className="nav-occupancy"
            aria-hidden="true"
            style={{
              ['--occ-x' as string]: `${occ.x}px`,
              ['--occ-w' as string]: `${occ.w}px`,
              ['--occ-o' as string]: occ.on,
            } as React.CSSProperties}
          />
        </nav>
      </div>

      {/* Fuera de la cabecera: position:fixed no debe depender de sus estilos */}
      {createPortal(<>
      {/* ---------- Móvil (<= 768 px): barra inferior + hoja «Menú» ---------- */}
      <nav className="mobile-tabbar" aria-label="Secciones principales">
        {NAV_ITEMS.filter(i => TABBAR_IDS.includes(i.id)).map(item => (
          <button
            key={item.id}
            onClick={() => irA(item.id)}
            className={`mobile-tab ${activeTab === item.id ? 'active' : ''}`}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            {React.cloneElement(item.icon, { size: 20 })}
            <span>{item.id === 'evaluacion' ? 'Notas' : item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`mobile-tab ${!TABBAR_IDS.includes(activeTab) ? 'active' : ''}`}
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
        >
          <Menu size={20} />
          <span>Menú</span>
        </button>
      </nav>

      {drawerOpen && (
        <div className="modal-overlay mobile-drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="modal-container mobile-drawer" onClick={e => e.stopPropagation()} aria-label="Menú">
            <div className="mobile-drawer-head">
              <h2>Menú</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú">
                <X size={20} />
              </button>
            </div>
            <div className="mobile-drawer-body">
              <p className="eyebrow">Secciones</p>
              <ul className="mobile-drawer-list">
                {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <button
                      className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                      aria-current={activeTab === item.id ? 'page' : undefined}
                      onClick={() => irA(item.id)}
                    >
                      {React.cloneElement(item.icon, { size: 18 })} {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="eyebrow">Herramientas</p>
              <ul className="mobile-drawer-list">
                <li><button className="menu-item" onClick={abrirDesdeMenu(onOpenSearch)}><Search size={18} /> Buscar</button></li>
                <li><button className="menu-item" onClick={abrirDesdeMenu(onOpenFirSimulator)}><Award size={18} /> Simulador FIR</button></li>
                {opcionInstalar && (
                  <li>
                    <button className="menu-item" onClick={() => { setDrawerOpen(false); opcionInstalar === 'nativa' ? instalar() : setAyudaIOS(true); }}>
                      <Download size={18} /> Instalar la app
                    </button>
                  </li>
                )}
                <li><button className="menu-item" onClick={abrirDesdeMenu(onOpenStudentQuestion)}><HelpCircle size={18} /> Buzón de dudas{isProfesor && dudasPendientes > 0 ? ` (${dudasPendientes})` : ''}</button></li>
                <li>
                  <button className="menu-item" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                  </button>
                </li>
                {onOpenCartas && (
                  <li><button className="menu-item" onClick={abrirDesdeMenu(onOpenCartas)}><Layers size={18} /> Cartas de los temas</button></li>
                )}
                {isProfesor && (
                  <li><button className="menu-item" onClick={abrirDesdeMenu(onOpenExamGenerator)}><FileText size={18} /> Generador de examen</button></li>
                )}
                {isProfesor && (
                  <li><button className="menu-item" onClick={abrirDesdeMenu(onOpenAdminCms)}><Settings size={18} /> Gestión docente</button></li>
                )}
              </ul>
              <button className="menu-item menu-item--danger" onClick={() => { setDrawerOpen(false); logout(); }}>
                <LogOut size={18} /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
      </>, document.body)}
      {ayudaIOS && createPortal(
        <div className="modal-overlay" onClick={() => setAyudaIOS(false)}>
          <div className="modal-container" style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>Instalar en iPhone o iPad</h3>
              <button onClick={() => setAyudaIOS(false)} className="btn btn-sm btn-outline" aria-label="Cerrar"><X size={18} /></button>
            </div>
            <div className="modal-body" style={{ lineHeight: 1.6, fontSize: '0.92rem' }}>
              <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Abre esta página en <strong>Safari</strong> (desde otro navegador no aparece la opción).</li>
                <li>Pulsa el botón <strong>Compartir</strong> (el cuadrado con la flecha hacia arriba).</li>
                <li>Elige <strong>Añadir a pantalla de inicio</strong> y confirma.</li>
              </ol>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 0 }}>
                Se abrirá a pantalla completa, como una app, y tendrás el temario disponible sin conexión.
              </p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setAyudaIOS(false)} className="btn btn-primary">Entendido</button>
            </div>
          </div>
        </div>, document.body)}
    </header>
  );
};

