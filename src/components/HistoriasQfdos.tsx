import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Headphones, X, Pause, Play, Volume2, VolumeX, Link2, FolderOpen, GraduationCap, Bell,
  ChevronLeft, ChevronRight, ExternalLink, FileText, Video, Sparkles, Image as ImagenIcono
} from 'lucide-react';
import { CourseAttachment, QfdosAnnouncement, QfdosResourceLink, QfdosTopic } from '../data/qfdosData';
import { avisosRecientesPrimero } from '../utils/avisos';

// ==========================================================================
// Historias QFDOS
//
// Banda rotatoria en la portada + fila de círculos + visor a pantalla completa
// con el formato de las historias de Instagram. Se alimenta de lo que ya
// existe en la web (podcast del tema, enlaces de interés y materiales varios)
// más los medios de portada del Tema 1 que se guardan en /historias.
//
// Visible para todo el mundo desde el Hub.
// ==========================================================================

/** Id del tema (`tema-01`) o `recursos` */
type GrupoId = string;

interface Accion {
  label: string;
  icono: 'pdf' | 'enlace' | 'video' | 'spotify' | 'audio' | 'tema';
  href?: string;
  /** Sin href: se ejecuta al pulsar (el visor se cierra antes) */
  alPulsar?: () => void;
}

interface Historia {
  id: string;
  grupo: GrupoId;
  /** Fondo de marca de la historia cuando no hay imagen o vídeo a pantalla completa */
  fondo: 'marca' | 'podcast' | 'recursos';
  etiqueta: string;
  titulo: string;
  texto?: string;
  fecha?: string;
  video?: string;
  imagen?: string;
  audio?: string;
  /** Cómo encaja el vídeo en el 9:16: vertical = cubrir, apaisado = contener */
  ajuste?: 'cubrir' | 'contener';
  /** Tope de reproducción del medio, en segundos (por defecto, entero) */
  maxSegundos?: number;
  /** Ruta local (bajo BASE_URL) que hay que comprobar antes de enseñar la historia */
  requiere?: string;
  acciones: Accion[];
  duracionMs: number;
}

interface Grupo {
  id: GrupoId;
  nombre: string;
  /** Imagen del círculo */
  portada?: string;
  historias: Historia[];
}

const CLAVE_VISTAS = 'qfdos_v3_historias_vistas';
const ROTACION_BANDA_S = 6;
const SEGUNDOS_PODCAST = 30;

/**
 * Medios de portada por tema. Los vídeos se recortan y comprimen con
 * `scripts/preparar-historias.ps1` desde las carpetas de Drive; hasta que
 * estén en /historias la historia correspondiente no se muestra.
 */
const MEDIOS_TEMA: Record<string, { videoPodcast?: string; clip?: string; imagen?: string }> = {
  'tema-01': {
    videoPodcast: 'historias/tema-01-video-podcast.mp4',
    clip: 'historias/tema-01-clip.mp4',
    imagen: 'historias/tema-01-brag.jpg'
  },
  'tema-02': {
    videoPodcast: 'historias/tema-02-video-podcast.mp4',
    clip: 'historias/tema-02-clip.mp4',
    imagen: 'historias/tema-02-brag.jpg'
  }
};

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
const recortar = (t: string, n: number) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);

interface Callbacks {
  onAbrirReproductor?: (att: CourseAttachment) => void;
  onAbrirTema?: (topic: QfdosTopic) => void;
  /** Abre la ficha del enlace en la sección Enlaces de interés (resumen completo para el curso) */
  onAbrirEnlace?: (link: QfdosResourceLink) => void;
}

function construirGrupos(topics: QfdosTopic[], resourceLinks: QfdosResourceLink[], announcements: QfdosAnnouncement[], cb: Callbacks): Grupo[] {
  const portadaPodcast = resolver('assets/Podcast/qfdos-podcast-portada-vertical.png');
  const grupos: Grupo[] = [];

  // --- Novedades: avisos marcados para las Historias, siempre los primeros ---
  const novedades: Historia[] = avisosRecientesPrimero(announcements.filter(a => a.enHistorias)).map((a): Historia => {
    const tema = a.temaId ? topics.find(t => t.id === a.temaId) : undefined;
    const acciones: Accion[] = [];
    if (tema && cb.onAbrirTema) acciones.push({ label: `Ir al ${tema.number}`, icono: 'tema', alPulsar: () => cb.onAbrirTema?.(tema) });
    if (a.pdfUrl) acciones.push({ label: a.pdfName || 'Abrir el PDF', icono: 'pdf', href: resolver(a.pdfUrl) });
    if (a.linkUrl) acciones.push({ label: a.linkLabel || 'Más información', icono: 'enlace', href: resolver(a.linkUrl) });
    return {
      id: `aviso-${a.id}`, grupo: 'avisos', fondo: 'marca', etiqueta: 'Novedad',
      titulo: a.title, texto: recortar(a.content, 330), fecha: a.date,
      imagen: a.imageUrl ? resolver(a.imageUrl) : undefined,
      acciones: acciones.slice(0, 2),
      duracionMs: Math.max(9000, duracionPorTexto(a.content))
    };
  });
  if (novedades.length) {
    grupos.push({ id: 'avisos', nombre: 'Novedades del curso', portada: novedades.find(n => n.imagen)?.imagen, historias: novedades });
  }

  // --- Un grupo por tema: cartel, clip, píldora de audio y vídeo podcast ---
  for (const t of topics) {
    const m = MEDIOS_TEMA[t.id];
    const audio = t.audioPodcastUrl?.trim();
    const spotify = t.spotifyPodcastUrl?.startsWith('http') ? t.spotifyPodcastUrl : undefined;
    if (!m && !audio) continue;

    const abrirTema: Accion[] = cb.onAbrirTema
      ? [{ label: `Abrir el ${t.number}`, icono: 'tema', alPulsar: () => cb.onAbrirTema?.(t) }]
      : [];
    const historias: Historia[] = [];

    if (m?.imagen) {
      historias.push({
        id: `imagen-${t.id}`, grupo: t.id, fondo: 'marca', etiqueta: t.number,
        titulo: `${t.number} · ${t.title}`, imagen: resolver(m.imagen),
        acciones: abrirTema, duracionMs: 6000
      });
    }
    if (audio) {
      const reproductor: Accion[] = cb.onAbrirReproductor
        ? [{
            label: 'Escuchar la píldora completa',
            icono: 'audio',
            alPulsar: () => cb.onAbrirReproductor?.({
              id: `sp_${t.id}`,
              title: t.audioPodcastName || `Podcast Oficial: ${t.number} — ${t.title}`,
              type: 'audio',
              url: audio,
              audioUrl: audio,
              spotifyUri: t.spotifyPodcastUrl,
              date: 'Curso 2026/2027',
              isPodcastVideo: !!t.videoPodcastUrl
            })
          }]
        : [];
      historias.push({
        id: `podcast-audio-${t.id}`, grupo: t.id, fondo: 'podcast', etiqueta: 'Píldora de audio',
        titulo: `${t.number} · ${t.title}`, texto: t.audioPodcastName || t.subtitle,
        imagen: portadaPodcast, audio: resolver(audio), maxSegundos: SEGUNDOS_PODCAST,
        acciones: reproductor, duracionMs: SEGUNDOS_PODCAST * 1000
      });
    }
    if (m?.videoPodcast) {
      historias.push({
        id: `podcast-video-${t.id}`, grupo: t.id, fondo: 'podcast', etiqueta: 'Vídeo podcast',
        titulo: `${t.number} · ${t.title}`, texto: 'Resumen en vídeo del tema.',
        video: resolver(m.videoPodcast), imagen: resolver('assets/Podcast/qfdos-podcast-ep01-16x9.png'), ajuste: 'contener',
        maxSegundos: SEGUNDOS_PODCAST, requiere: m.videoPodcast,
        acciones: spotify ? [{ label: 'Ver el episodio en Spotify', icono: 'spotify', href: spotify }] : [],
        duracionMs: SEGUNDOS_PODCAST * 1000
      });
    }
    if (m?.clip) {
      historias.push({
        id: `clip-${t.id}`, grupo: t.id, fondo: 'marca', etiqueta: 'Clip',
        titulo: `${t.number} · ${t.title}`, texto: 'El clip completo del tema.',
        video: resolver(m.clip), imagen: m.imagen ? resolver(m.imagen) : undefined, ajuste: 'cubrir',
        requiere: m.clip, acciones: abrirTema, duracionMs: 12000
      });
    }
    grupos.push({
      id: t.id,
      nombre: t.number,
      portada: m?.imagen ? resolver(m.imagen) : portadaPodcast,
      historias
    });
  }

  // --- Noticias: los 2 enlaces de interés más recientes + Materiales varios ---
  const enlaces: Historia[] = resourceLinks
    .map((l, i) => ({ l, i }))
    .sort((a, b) => (b.l.addedAt ?? '').localeCompare(a.l.addedAt ?? '') || a.i - b.i)
    .slice(0, 2)
    .map(({ l }): Historia => {
      const video = l.videoUrl && /^data:video\/|\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(l.videoUrl) ? resolver(l.videoUrl) : undefined;
      return {
        id: `enlace-${l.id}`, grupo: 'recursos', fondo: 'recursos', etiqueta: 'Enlace de interés',
        titulo: l.title, texto: recortar(l.summary, video ? 240 : 320),
        fecha: [l.source, l.duration].filter(Boolean).join(' · ') || undefined,
        imagen: l.imageUrl ? resolver(l.imageUrl) : undefined,
        video, ajuste: video ? 'contener' : undefined, maxSegundos: video ? SEGUNDOS_PODCAST : undefined,
        acciones: [
          ...(cb.onAbrirEnlace ? [{ label: 'Leer la noticia completa', icono: 'tema' as const, alPulsar: () => cb.onAbrirEnlace?.(l) }] : []),
          { label: l.source && l.source.length <= 24 ? `Leer en ${l.source}` : 'Abrir el enlace', icono: 'enlace', href: resolver(l.url) }
        ],
        duracionMs: video ? SEGUNDOS_PODCAST * 1000 : duracionPorTexto(l.summary)
      };
    });

  const varios = topics.find(t => t.id === 'tema-varios');
  const materiales: Historia[] = (varios?.attachments ?? []).map(a => ({
    id: `material-${a.id}`, grupo: 'recursos', fondo: 'recursos' as const,
    etiqueta: a.type === 'pdf' ? 'Material · PDF' : 'Material',
    titulo: a.title, texto: [a.size, a.date].filter(Boolean).join(' · ') || undefined,
    acciones: [{
      label: a.type === 'pdf' ? 'Abrir el PDF' : 'Abrir el material',
      icono: (a.type === 'pdf' ? 'pdf' : 'enlace') as Accion['icono'],
      href: resolver(a.url)
    }],
    duracionMs: 7000
  }));

  const recursos = [...enlaces, ...materiales];
  if (recursos.length) {
    grupos.push({ id: 'recursos', nombre: 'Noticias', portada: resolver('icons/icon-192.png'), historias: recursos });
  }
  return grupos.filter(g => g.historias.length > 0);
}

const IconoAccion: React.FC<{ tipo: Accion['icono'] }> = ({ tipo }) =>
  tipo === 'pdf' ? <FileText size={15} /> : tipo === 'video' ? <Video size={15} /> :
  tipo === 'spotify' || tipo === 'audio' ? <Headphones size={15} /> :
  tipo === 'tema' ? <GraduationCap size={15} /> : <ExternalLink size={15} />;

const IconoGrupo: React.FC<{ id: GrupoId; size: number }> = ({ id, size }) =>
  id === 'recursos' ? <FolderOpen size={size} /> : id === 'avisos' ? <Bell size={size} /> : <GraduationCap size={size} />;

// --------------------------------------------------------------------------
// Visor a pantalla completa
// --------------------------------------------------------------------------

interface VisorProps {
  grupos: Grupo[];
  inicio: { g: number; i: number };
  onClose: () => void;
  onVista: (id: string) => void;
}

const fondoDe = (h: Historia) => `hist-bg-${h.fondo}`;

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
            // Hay medios que solo se enseñan un rato (los podcasts, 30 s)
            const tope = historia.maxSegundos ? Math.min(m.duration, historia.maxSegundos) : m.duration;
            p = m.ended ? 1 : m.currentTime / tope;
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
  }, [historia.id, historia.duracionMs, historia.maxSegundos, mediaFailed, autoplay, siguiente]);

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
  const fondoClase = fondoDe(historia);

  const visor = (
    <div
      className="modal-overlay hist-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="hist-stage" aria-label="Historias QFDOS" aria-roledescription="carrusel">
        {/* Fondo: vídeo, imagen o degradado */}
        <div className={`hist-bg ${fondoClase}`} aria-hidden="true">
          {historia.ajuste === 'contener' && historia.imagen && (
            <div className="hist-difuminado" style={{ backgroundImage: `url("${historia.imagen}")` }} />
          )}
          {historia.video && !mediaFailed ? (
            <video
              key={historia.id}
              poster={historia.imagen}
              ref={el => { mediaRef.current = el; }}
              className={`hist-media${historia.ajuste === 'contener' ? ' contener' : ''}`}
              src={historia.video}
              playsInline
              preload="auto"
              controls={!autoplay}
              onError={() => setFailedId(historia.id)}
            />
          ) : historia.imagen ? (
            <img
              key={historia.id}
              className={`hist-media${historia.ajuste === 'contener' ? ' contener' : ''}`}
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
              <span className={`hist-avatar${historia.grupo === 'recursos' ? ' recursos' : ''}`} aria-hidden="true">
                <IconoGrupo id={historia.grupo} size={14} />
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
            <Sparkles size={12} /> {historia.etiqueta}
          </span>
          <h2 className="hist-titulo">{historia.titulo}</h2>
          {historia.texto && <p className="hist-texto">{historia.texto}</p>}
          {historia.acciones.length > 0 && (
            <div className="hist-acciones">
              {historia.acciones.map(a => a.href ? (
                <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className="hist-cta">
                  <IconoAccion tipo={a.icono} /> {a.label}
                </a>
              ) : (
                <button
                  key={a.label}
                  type="button"
                  className="hist-cta"
                  onClick={() => { onClose(); a.alPulsar?.(); }}
                >
                  <IconoAccion tipo={a.icono} /> {a.label}
                </button>
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

interface HistoriasQfdosProps extends Callbacks {
  topics: QfdosTopic[];
  resourceLinks: QfdosResourceLink[];
  announcements?: QfdosAnnouncement[];
  /** Qué se pinta: los círculos (encima de la portada), la banda rotatoria (debajo) o ambos */
  partes?: 'circulos' | 'banda' | 'todo';
}

/** Aviso entre instancias (círculos y banda) de que se ha visto una historia */
const EVENTO_VISTAS = 'qfdos-historias-vistas';

export const HistoriasQfdos: React.FC<HistoriasQfdosProps> = ({ topics, resourceLinks, announcements = [], onAbrirReproductor, onAbrirTema, onAbrirEnlace, partes = 'todo' }) => {
  // Los medios locales que aún no se han subido (vídeos de /historias) se comprueban una vez
  const [ausentes, setAusentes] = useState<Set<string>>(new Set());
  useEffect(() => {
    const rutas = new Set<string>();
    for (const m of Object.values(MEDIOS_TEMA)) [m.videoPodcast, m.clip].forEach(r => r && rutas.add(r));
    let cancelado = false;
    Promise.all([...rutas].map(async r => {
      try {
        const resp = await fetch(resolver(r), { method: 'HEAD' });
        const tipo = resp.headers.get('content-type') || '';
        return resp.ok && !/text\/html/i.test(tipo) ? null : r;
      } catch {
        return r;
      }
    })).then(res => { if (!cancelado) setAusentes(new Set(res.filter((x): x is string => !!x))); });
    return () => { cancelado = true; };
  }, []);

  const grupos = useMemo(
    () => construirGrupos(topics, resourceLinks, announcements, { onAbrirReproductor, onAbrirTema, onAbrirEnlace })
      .map(g => ({ ...g, historias: g.historias.filter(h => !h.requiere || !ausentes.has(h.requiere)) }))
      .filter(g => g.historias.length > 0),
    [topics, resourceLinks, announcements, onAbrirReproductor, onAbrirTema, onAbrirEnlace, ausentes]
  );
  const [vistas, setVistas] = useState<Set<string>>(leerVistas);
  const [abierto, setAbierto] = useState<{ g: number; i: number } | null>(null);
  const [banda, setBanda] = useState(0);
  const [bandaPausada, setBandaPausada] = useState(false);

  const planas = useMemo(
    () => grupos.flatMap((gr, g) => gr.historias.map((h, i) => ({ h, g, i }))),
    [grupos]
  );

  const marcarVista = useCallback((id: string) => {
    const n = leerVistas();
    if (n.has(id)) return;
    n.add(id);
    guardarVistas(n);
    setVistas(n);
    window.dispatchEvent(new Event(EVENTO_VISTAS));
  }, []);

  // Círculos y banda son dos instancias: lo que se ve en una apaga el anillo en la otra
  useEffect(() => {
    const releer = () => setVistas(leerVistas());
    window.addEventListener(EVENTO_VISTAS, releer);
    return () => window.removeEventListener(EVENTO_VISTAS, releer);
  }, []);

  if (grupos.length === 0) return null;

  const actual = planas[banda % planas.length];
  const avanzarBanda = () => setBanda(b => (b + 1) % planas.length);
  const retrocederBanda = () => setBanda(b => (b - 1 + planas.length) % planas.length);

  const verCirculos = partes !== 'banda';
  const verBanda = partes !== 'circulos';

  return (
    <section
      className={`hist-seccion${verCirculos ? '' : ' hist-seccion-banda'}`}
      aria-labelledby={verCirculos ? 'hist-titulo-seccion' : undefined}
      aria-label={verCirculos ? undefined : 'Novedades destacadas'}
    >
      {verCirculos && (<>
      <div className="hist-cabecera">
        <h3 id="hist-titulo-seccion">
          <Sparkles size={16} aria-hidden="true" /> Historias
        </h3>
      </div>

      {/* Círculos */}
      <div className="hist-circulos" role="list">
        {grupos.map((gr, g) => {
          const todasVistas = gr.historias.every(h => vistas.has(h.id));
          const portada = gr.portada;
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
                <span className={`hist-foto${gr.id === 'recursos' ? ' recursos' : ''}`} style={portada ? { backgroundImage: `url("${portada}")` } : undefined}>
                  {!portada && <IconoGrupo id={gr.id} size={26} />}
                </span>
              </span>
              <span className="hist-etiqueta">{gr.nombre}</span>
            </button>
          );
        })}
      </div>
      </>)}

      {/* Banda rotatoria */}
      {verBanda && (
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
          className={`hist-banda-slide ${fondoDe(actual.h)}`}
          onClick={() => setAbierto({ g: actual.g, i: actual.i })}
          aria-label={`Abrir historia: ${actual.h.titulo}`}
        >
          {actual.h.imagen && <img src={actual.h.imagen} alt="" className={`hist-banda-img${actual.h.ajuste === 'contener' ? ' difuminada' : ''}`} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />}
          <span className="hist-banda-scrim" aria-hidden="true" />
          <span className="hist-banda-texto">
            <span className="hist-chip">
              <IconoGrupo id={actual.h.grupo} size={12} /> {actual.h.etiqueta}
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
      )}

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
