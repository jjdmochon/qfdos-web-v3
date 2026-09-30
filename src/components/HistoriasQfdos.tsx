import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Bell, Headphones, X, Pause, Play, Volume2, VolumeX,
  ChevronLeft, ChevronRight, ExternalLink, FileText, Video, Sparkles
} from 'lucide-react';
import { QfdosAnnouncement, QfdosTopic } from '../data/qfdosData';
import { avisosRecientesPrimero } from '../utils/avisos';

// ==========================================================================
// Historias QFDOS
//
// Banda rotatoria en la portada + fila de círculos + visor a pantalla completa
// con el formato de las historias de Instagram. Se alimenta de los datos que ya
// existen (avisos y podcast de los módulos): no añade nada al CMS.
//
// v1: avisos y podcast. Solo visible para el profesorado (lo decide HubDashboard).
// ==========================================================================

type GrupoId = 'avisos' | 'podcast';

interface Historia {
  id: string;
  grupo: GrupoId;
  etiqueta: string;
  titulo: string;
  texto?: string;
  fecha?: string;
  video?: string;
  imagen?: string;
  audio?: string;
  acciones: { label: string; href: string; icono: 'pdf' | 'enlace' | 'video' | 'spotify' }[];
  duracionMs: number;
}

interface Grupo {
  id: GrupoId;
  nombre: string;
  historias: Historia[];
}

const CLAVE_VISTAS = 'qfdos_v3_historias_vistas';
const ROTACION_BANDA_S = 6;

const esVideoDirecto = (u: string) => /^data:video\//i.test(u) || /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(u);

function miniaturaYoutube(u: string): string | undefined {
  const m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : undefined;
}

/** Las rutas relativas (audio/x.mp3) cuelgan de BASE_URL; las absolutas y data: se dejan tal cual. */
const resolver = (u: string) => (/^(https?:|data:|blob:|\/)/i.test(u) ? u : `${import.meta.env.BASE_URL}${u}`);

const reduceMotion = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function leerVistas(): Set<string> {
  try {
    const raw = localStorage.getItem(CLAVE_VISTAS);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

function guardarVistas(v: Set<string>) {
  try {
    localStorage.setItem(CLAVE_VISTAS, JSON.stringify([...v].slice(-300)));
  } catch { /* sin almacenamiento: el anillo simplemente no se apaga entre visitas */ }
}

const duracionPorTexto = (t?: string) => Math.max(7000, Math.min(15000, (t?.length ?? 0) * 55));

function construirGrupos(announcements: QfdosAnnouncement[], topics: QfdosTopic[]): Grupo[] {
  const avisos: Historia[] = avisosRecientesPrimero(announcements).map(a => {
    const acciones: Historia['acciones'] = [];
    if (a.pdfUrl) acciones.push({ label: a.pdfName || 'Ver PDF', href: resolver(a.pdfUrl), icono: 'pdf' });
    if (a.videoUrl && !esVideoDirecto(a.videoUrl)) acciones.push({ label: 'Ver vídeo', href: a.videoUrl, icono: 'video' });
    if (a.linkUrl) acciones.push({ label: a.linkLabel || 'Más información', href: a.linkUrl, icono: 'enlace' });
    return {
      id: `aviso-${a.id}`,
      grupo: 'avisos',
      etiqueta: 'Aviso',
      titulo: a.title,
      texto: a.content,
      fecha: a.date,
      video: a.videoUrl && esVideoDirecto(a.videoUrl) ? resolver(a.videoUrl) : undefined,
      imagen: a.imageUrl ? resolver(a.imageUrl) : (a.videoUrl ? miniaturaYoutube(a.videoUrl) : undefined),
      audio: a.audioUrl ? resolver(a.audioUrl) : undefined,
      acciones: acciones.slice(0, 2),
      duracionMs: duracionPorTexto(a.content)
    };
  });

  const podcast: Historia[] = topics
    .filter(t => t.audioPodcastUrl?.trim() || t.spotifyPodcastUrl?.startsWith('http'))
    .map(t => {
      const acciones: Historia['acciones'] = [];
      if (t.spotifyPodcastUrl?.startsWith('http')) {
        acciones.push({ label: 'Escuchar en Spotify', href: t.spotifyPodcastUrl, icono: 'spotify' });
      }
      return {
        id: `podcast-${t.id}`,
        grupo: 'podcast',
        etiqueta: 'Podcast',
        titulo: `${t.number} · ${t.title}`,
        texto: t.audioPodcastName || t.subtitle,
        imagen: resolver('assets/Podcast/qfdos-podcast-portada-vertical.png'),
        audio: t.audioPodcastUrl?.trim() ? resolver(t.audioPodcastUrl.trim()) : undefined,
        acciones,
        duracionMs: 8000
      };
    });

  const grupos: Grupo[] = [
    { id: 'avisos', nombre: 'Avisos', historias: avisos },
    { id: 'podcast', nombre: 'Podcast', historias: podcast }
  ];
  return grupos.filter(g => g.historias.length > 0);
}

const IconoAccion: React.FC<{ tipo: Historia['acciones'][number]['icono'] }> = ({ tipo }) =>
  tipo === 'pdf' ? <FileText size={15} /> : tipo === 'video' ? <Video size={15} /> :
  tipo === 'spotify' ? <Headphones size={15} /> : <ExternalLink size={15} />;

// --------------------------------------------------------------------------
// Visor a pantalla completa
// --------------------------------------------------------------------------

interface VisorProps {
  grupos: Grupo[];
  inicio: { g: number; i: number };
  onClose: () => void;
  onVista: (id: string) => void;
}

const Visor: React.FC<VisorProps> = ({ grupos, inicio, onClose, onVista }) => {
  const [g, setG] = useState(inicio.g);
  const [i, setI] = useState(inicio.i);
  const [held, setHeld] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(typeof document !== 'undefined' && document.hidden);
  const [muted, setMuted] = useState(false);
  const [failedId, setFailedId] = useState<string | null>(null);

  const autoplay = useMemo(() => !reduceMotion(), []);
  const grupo = grupos[g];
  const historia = grupo.historias[i];
  const mediaFailed = failedId === historia.id;
  const paused = held || userPaused || hidden;

  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLElement | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const siguiente = useCallback(() => {
    if (i < grupo.historias.length - 1) setI(i + 1);
    else if (g < grupos.length - 1) { setG(g + 1); setI(0); }
    else onClose();
  }, [i, g, grupo, grupos.length, onClose]);

  const anterior = useCallback(() => {
    if (i > 0) setI(i - 1);
    else if (g > 0) { setG(g - 1); setI(grupos[g - 1].historias.length - 1); }
    else setI(0);
  }, [i, g, grupos]);

  const siguienteGrupo = () => { if (g < grupos.length - 1) { setG(g + 1); setI(0); } else onClose(); };
  const anteriorGrupo = () => { if (g > 0) { setG(g - 1); setI(0); } };

  useEffect(() => { onVista(historia.id); }, [historia.id, onVista]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Precarga de la imagen de la historia siguiente
  useEffect(() => {
    const sig = grupo.historias[i + 1] ?? grupos[g + 1]?.historias[0];
    if (sig?.imagen) { const img = new Image(); img.src = sig.imagen; }
  }, [g, i, grupo, grupos]);

  // Reproducción sincronizada con pausa / silencio
  useEffect(() => {
    const m = mediaRef.current;
    if (!m) return;
    m.muted = muted;
    if (!autoplay || paused) { m.pause(); return; }
    m.play()?.catch(() => {
      // Sin permiso para sonido: se reintenta en silencio y, si tampoco, temporizador
      if (!m.muted) setMuted(true); else setFailedId(historia.id);
    });
  }, [paused, muted, autoplay, historia.id]);

  // Motor de progreso: sigue al medio si lo hay, y a un temporizador si no
  useEffect(() => {
    if (!autoplay) return;
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let waited = 0;
    let done = false;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      if (!pausedRef.current && !done) {
        const m = mediaRef.current;
        let p: number;
        if (m && !mediaFailed) {
          if (Number.isFinite(m.duration) && m.duration > 0) {
            p = m.ended ? 1 : m.currentTime / m.duration;
          } else {
            waited += dt;
            p = 0;
            if (waited > 8000) setFailedId(historia.id);
          }
        } else {
          elapsed += dt;
          p = elapsed / historia.duracionMs;
        }
        if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, p)})`;
        if (p >= 1) { done = true; siguiente(); return; }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [historia.id, historia.duracionMs, mediaFailed, autoplay, siguiente]);

  // Teclado (Escape lo gestiona modalA11y con un clic en el fondo)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); siguiente(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); anterior(); }
      else if (e.key === ' ' && !(e.target as HTMLElement | null)?.closest('button, a, audio, video')) {
        e.preventDefault();
        setUserPaused(p => !p);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [siguiente, anterior]);

  // Gestos sobre las zonas táctiles: toque = navegar, mantener = pausa, deslizar abajo = cerrar
  const gesto = useRef<{ t: number; y: number; timer: number; held: boolean } | null>(null);
  const alPulsar = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    const timer = window.setTimeout(() => {
      if (gesto.current) { gesto.current.held = true; setHeld(true); }
    }, 220);
    gesto.current = { t: performance.now(), y: e.clientY, timer, held: false };
  };
  const alSoltar = (e: React.PointerEvent, accion: () => void) => {
    const s = gesto.current;
    gesto.current = null;
    if (!s) return;
    window.clearTimeout(s.timer);
    setHeld(false);
    if (e.clientY - s.y > 90) { onClose(); return; }
    if (!s.held) accion();
  };
  const alCancelar = () => {
    if (gesto.current) window.clearTimeout(gesto.current.timer);
    gesto.current = null;
    setHeld(false);
  };
  const zona = (accion: () => void) => ({
    onPointerDown: alPulsar,
    onPointerUp: (e: React.PointerEvent) => alSoltar(e, accion),
    onPointerCancel: alCancelar,
    // Enter/Espacio sobre el botón (detail 0) navegan; el clic de ratón ya lo cubre onPointerUp
    onClick: (e: React.MouseEvent) => { if (e.detail === 0) accion(); },
    onContextMenu: (e: React.MouseEvent) => e.preventDefault()
  });

  const tieneMedio = !!(historia.video || historia.audio) && !mediaFailed;
  const hayAudio = !!historia.audio && !historia.video;
  const fondoClase = historia.grupo === 'podcast' ? 'hist-bg-podcast' : 'hist-bg-aviso';

  const visor = (
    <div
      className="modal-overlay hist-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="hist-stage" aria-label="Historias QFDOS" aria-roledescription="carrusel">
        {/* Fondo: vídeo, imagen o degradado */}
        <div className={`hist-bg ${fondoClase}`} aria-hidden="true">
          {historia.video && !mediaFailed ? (
            <video
              key={historia.id}
              ref={el => { mediaRef.current = el; }}
              className="hist-media"
              src={historia.video}
              playsInline
              preload="auto"
              controls={!autoplay}
              onError={() => setFailedId(historia.id)}
            />
          ) : historia.imagen ? (
            <img
              key={historia.id}
              className="hist-media"
              src={historia.imagen}
              alt=""
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          ) : null}
          {historia.audio && !historia.video && !mediaFailed && (
            <audio
              key={historia.id}
              ref={el => { mediaRef.current = el; }}
              src={historia.audio}
              preload="auto"
              controls={false}
              onError={() => setFailedId(historia.id)}
            />
          )}
        </div>
        <div className="hist-scrim" aria-hidden="true" />

        {/* Zonas táctiles: izquierda = atrás, derecha = adelante */}
        <button type="button" className="hist-zona hist-zona-prev" aria-label="Historia anterior" {...zona(anterior)} />
        <button type="button" className="hist-zona hist-zona-next" aria-label="Historia siguiente" {...zona(siguiente)} />

        {/* Cabecera: progreso + controles */}
        <div className="hist-top">
          <div className="hist-segs" role="presentation">
            {grupo.historias.map((h, j) => (
              <span key={h.id} className="hist-seg">
                <i
                  ref={j === i ? (el => { barRef.current = el; }) : undefined}
                  style={j === i ? undefined : { transform: `scaleX(${j < i ? 1 : 0})` }}
                />
              </span>
            ))}
          </div>
          <div className="hist-bar">
            <span className="hist-quien">
              <span className={`hist-avatar ${historia.grupo}`} aria-hidden="true">
                {historia.grupo === 'podcast' ? <Headphones size={14} /> : <Bell size={14} />}
              </span>
              <strong>{grupo.nombre}</strong>
              {historia.fecha && <span className="hist-fecha">{historia.fecha}</span>}
            </span>
            <span className="hist-ctrls">
              {(tieneMedio || hayAudio) && (
                <button type="button" className="hist-icon" onClick={() => setMuted(m => !m)} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              )}
              <button type="button" className="hist-icon" onClick={() => setUserPaused(p => !p)} aria-label={userPaused ? 'Reanudar' : 'Pausar'} aria-pressed={userPaused}>
                {userPaused ? <Play size={18} /> : <Pause size={18} />}
              </button>
              <button type="button" className="hist-icon" onClick={onClose} aria-label="Cerrar historias" title="Cerrar (Esc)">
                <X size={20} />
              </button>
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className="hist-body">
          {hayAudio && !mediaFailed && (
            <div className={`hist-onda${paused ? ' is-paused' : ''}`} aria-hidden="true">
              {Array.from({ length: 28 }, (_, k) => <i key={k} style={{ animationDelay: `${(k * 97) % 700}ms` }} />)}
            </div>
          )}
          <span className="hist-chip">
            {historia.grupo === 'podcast' ? <Headphones size={12} /> : <Sparkles size={12} />} {historia.etiqueta}
          </span>
          <h2 className="hist-titulo">{historia.titulo}</h2>
          {historia.texto && <p className="hist-texto">{historia.texto}</p>}
          {historia.acciones.length > 0 && (
            <div className="hist-acciones">
              {historia.acciones.map(a => (
                <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" className="hist-cta">
                  <IconoAccion tipo={a.icono} /> {a.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Saltar de grupo en escritorio */}
      <button type="button" className="hist-nav hist-nav-prev" onClick={anteriorGrupo} disabled={g === 0} aria-label="Grupo anterior">
        <ChevronLeft size={22} />
      </button>
      <button type="button" className="hist-nav hist-nav-next" onClick={siguienteGrupo} aria-label={g === grupos.length - 1 ? 'Cerrar' : 'Grupo siguiente'}>
        <ChevronRight size={22} />
      </button>
    </div>
  );

  return createPortal(visor, document.body);
};

// --------------------------------------------------------------------------
// Banda rotatoria + círculos
// --------------------------------------------------------------------------

interface HistoriasQfdosProps {
  announcements: QfdosAnnouncement[];
  topics: QfdosTopic[];
}

export const HistoriasQfdos: React.FC<HistoriasQfdosProps> = ({ announcements, topics }) => {
  const grupos = useMemo(() => construirGrupos(announcements, topics), [announcements, topics]);
  const [vistas, setVistas] = useState<Set<string>>(leerVistas);
  const [abierto, setAbierto] = useState<{ g: number; i: number } | null>(null);
  const [banda, setBanda] = useState(0);
  const [bandaPausada, setBandaPausada] = useState(false);

  const planas = useMemo(
    () => grupos.flatMap((gr, g) => gr.historias.map((h, i) => ({ h, g, i }))),
    [grupos]
  );

  const marcarVista = useCallback((id: string) => {
    setVistas(prev => {
      if (prev.has(id)) return prev;
      const n = new Set(prev);
      n.add(id);
      guardarVistas(n);
      return n;
    });
  }, []);

  if (grupos.length === 0) return null;

  const actual = planas[banda % planas.length];
  const avanzarBanda = () => setBanda(b => (b + 1) % planas.length);
  const retrocederBanda = () => setBanda(b => (b - 1 + planas.length) % planas.length);

  return (
    <section className="hist-seccion" aria-labelledby="hist-titulo-seccion">
      <div className="hist-cabecera">
        <h3 id="hist-titulo-seccion">
          <Sparkles size={16} aria-hidden="true" /> Historias
        </h3>
        <span className="qfdos-badge badge-teal" style={{ fontSize: '0.62rem' }}>Vista previa · solo profesorado</span>
      </div>

      {/* Círculos */}
      <div className="hist-circulos" role="list">
        {grupos.map((gr, g) => {
          const todasVistas = gr.historias.every(h => vistas.has(h.id));
          const portada = gr.id === 'podcast'
            ? resolver('assets/Podcast/qfdos-podcast-portada-cuadrada.png')
            : gr.historias.find(h => h.imagen)?.imagen;
          const pendientes = gr.historias.filter(h => !vistas.has(h.id)).length;
          const primera = Math.max(0, gr.historias.findIndex(h => !vistas.has(h.id)));
          return (
            <button
              key={gr.id}
              type="button"
              role="listitem"
              className={`hist-circulo${todasVistas ? ' vista' : ''}`}
              onClick={() => setAbierto({ g, i: todasVistas ? 0 : primera })}
              aria-label={`${gr.nombre}: ${gr.historias.length} historia${gr.historias.length === 1 ? '' : 's'}${pendientes ? `, ${pendientes} sin ver` : ''}`}
            >
              <span className="hist-anillo">
                <span className={`hist-foto ${gr.id}`} style={portada ? { backgroundImage: `url("${portada}")` } : undefined}>
                  {!portada && (gr.id === 'podcast' ? <Headphones size={26} /> : <Bell size={26} />)}
                </span>
              </span>
              <span className="hist-etiqueta">{gr.nombre}</span>
            </button>
          );
        })}
      </div>

      {/* Banda rotatoria */}
      <div
        className={`hist-banda${bandaPausada ? ' is-paused' : ''}`}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Novedades destacadas"
        onMouseEnter={() => setBandaPausada(true)}
        onMouseLeave={() => setBandaPausada(false)}
        onFocus={() => setBandaPausada(true)}
        onBlur={() => setBandaPausada(false)}
      >
        <button
          type="button"
          key={actual.h.id}
          className={`hist-banda-slide ${actual.h.grupo === 'podcast' ? 'hist-bg-podcast' : 'hist-bg-aviso'}`}
          onClick={() => setAbierto({ g: actual.g, i: actual.i })}
          aria-label={`Abrir historia: ${actual.h.titulo}`}
        >
          {actual.h.imagen && <img src={actual.h.imagen} alt="" className="hist-banda-img" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />}
          <span className="hist-banda-scrim" aria-hidden="true" />
          <span className="hist-banda-texto">
            <span className="hist-chip">
              {actual.h.grupo === 'podcast' ? <Headphones size={12} /> : <Bell size={12} />} {actual.h.etiqueta}
            </span>
            <strong>{actual.h.titulo}</strong>
            {actual.h.texto && <span className="hist-banda-sub">{actual.h.texto}</span>}
          </span>
          <span className="hist-banda-play" aria-hidden="true"><Play size={18} /></span>
        </button>

        {planas.length > 1 && (
          <>
            <button type="button" className="hist-banda-flecha izq" onClick={retrocederBanda} aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <button type="button" className="hist-banda-flecha der" onClick={avanzarBanda} aria-label="Siguiente">
              <ChevronRight size={18} />
            </button>
            <div className="hist-banda-puntos">
              {planas.map((p, k) => (
                <button
                  key={p.h.id}
                  type="button"
                  className={`hist-punto${k === banda % planas.length ? ' activo' : ''}`}
                  aria-label={`Ir a ${p.h.titulo}`}
                  aria-current={k === banda % planas.length}
                  onClick={() => setBanda(k)}
                >
                  <i
                    style={k === banda % planas.length ? { animationDuration: `${ROTACION_BANDA_S}s` } : undefined}
                    onAnimationEnd={k === banda % planas.length
                      ? (e => { if (!e.pseudoElement) avanzarBanda(); })
                      : undefined}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {abierto && (
        <Visor
          grupos={grupos}
          inicio={abierto}
          onClose={() => setAbierto(null)}
          onVista={marcarVista}
        />
      )}
    </section>
  );
};
