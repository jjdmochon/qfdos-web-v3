// ==========================================================================
// Puente con la app nativa (Capacitor · Android, y más adelante iOS)
//
// En el navegador este módulo no hace nada. Dentro de la app resuelve lo que
// un WebView no hace por sí solo:
//   · Descargas: `<a download>` con blob: o data: no funciona en WebView. Se
//     interceptan, el fichero se guarda en la caché de la app y se abre la
//     hoja de compartir del sistema (Guardar en Archivos, Drive, correo…).
//   · Enlaces externos: se abren en el navegador del sistema (Custom Tabs).
//   · Botón atrás de Android: navega hacia atrás o cierra la app.
//   · Barra de estado y pantalla de bienvenida.
// ==========================================================================

import { Capacitor } from '@capacitor/core';

export const esNativo = Capacitor.isNativePlatform();
export const plataforma = Capacitor.getPlatform(); // 'android' | 'ios' | 'web'

/** Blobs creados con URL.createObjectURL, para poder leerlos aunque se revoquen al instante. */
const blobs = new Map<string, Blob>();

function nombreSeguro(nombre: string): string {
  return (nombre || 'descarga').replace(/[\\/:*?"<>|]+/g, '_').slice(0, 120);
}

function blobABase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(String(lector.result).split(',')[1] ?? '');
    lector.onerror = () => reject(lector.error);
    lector.readAsDataURL(blob);
  });
}

async function obtenerBlob(href: string): Promise<Blob> {
  const guardado = blobs.get(href);
  if (guardado) return guardado;
  const r = await fetch(href);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.blob();
}

/** Guarda un fichero en la caché de la app y abre la hoja de compartir. */
export async function guardarYCompartir(href: string, nombre: string): Promise<void> {
  const [{ Filesystem, Directory }, { Share }] = await Promise.all([
    import('@capacitor/filesystem'),
    import('@capacitor/share')
  ]);
  const fichero = nombreSeguro(nombre || href.split('/').pop()?.split('?')[0] || 'descarga');
  const blob = await obtenerBlob(href);
  const data = await blobABase64(blob);
  const { uri } = await Filesystem.writeFile({
    path: `descargas/${fichero}`,
    data,
    directory: Directory.Cache,
    recursive: true
  });
  await Share.share({ title: fichero, files: [uri], dialogTitle: `Guardar o compartir ${fichero}` });
}

function esExterno(url: URL): boolean {
  return url.origin !== window.location.origin && /^https?:$/.test(url.protocol);
}

async function abrirExterno(href: string): Promise<void> {
  const { Browser } = await import('@capacitor/browser');
  await Browser.open({ url: href, presentationStyle: 'popover' });
}

/** Devuelve true si el enlace se ha gestionado de forma nativa. */
function gestionarEnlace(a: HTMLAnchorElement): boolean {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('javascript:')) return false;

  if (a.hasAttribute('download')) {
    guardarYCompartir(a.href, a.getAttribute('download') || '').catch(err =>
      alert(`No se pudo guardar el fichero: ${err?.message ?? err}`)
    );
    return true;
  }

  if (/^(mailto|tel|sms|geo|intent):/i.test(href)) {
    window.location.href = href; // Capacitor lo delega en el sistema
    return true;
  }

  let url: URL;
  try {
    url = new URL(a.href);
  } catch {
    return false;
  }
  if (esExterno(url)) {
    abrirExterno(url.href);
    return true;
  }
  return false;
}

function instalarInterceptores(): void {
  // 1. Registro de blobs, para descargas que revocan la URL justo después del click
  const crear = URL.createObjectURL.bind(URL);
  const revocar = URL.revokeObjectURL.bind(URL);
  URL.createObjectURL = (obj: Blob | MediaSource) => {
    const url = crear(obj);
    if (obj instanceof Blob) blobs.set(url, obj);
    return url;
  };
  URL.revokeObjectURL = (url: string) => {
    // se libera más tarde: el guardado nativo es asíncrono
    setTimeout(() => {
      blobs.delete(url);
      revocar(url);
    }, 60_000);
  };

  // 2. Clicks del usuario en enlaces
  document.addEventListener(
    'click',
    ev => {
      if (ev.defaultPrevented) return;
      const a = (ev.target as Element | null)?.closest?.('a');
      if (a instanceof HTMLAnchorElement && gestionarEnlace(a)) ev.preventDefault();
    },
    true
  );

  // 3. Descargas programáticas: a.click() sobre un enlace creado por código
  const clickOriginal = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function (this: HTMLAnchorElement) {
    if (gestionarEnlace(this)) return;
    clickOriginal.call(this);
  };

  // 4. window.open hacia fuera → navegador del sistema
  const abrirOriginal = window.open.bind(window);
  window.open = (url?: string | URL, target?: string, features?: string) => {
    if (url) {
      try {
        const destino = new URL(String(url), window.location.href);
        if (esExterno(destino)) {
          abrirExterno(destino.href);
          return null;
        }
      } catch {
        /* se deja al comportamiento por defecto */
      }
    }
    return abrirOriginal(url, target, features);
  };
}

async function configurarSistema(): Promise<void> {
  const [{ App }, { StatusBar, Style }, { SplashScreen }] = await Promise.all([
    import('@capacitor/app'),
    import('@capacitor/status-bar'),
    import('@capacitor/splash-screen')
  ]);

  App.addListener('backButton', ({ canGoBack }) => {
    // Primero se cierra el modal superior: todos se cierran al pulsar su fondo
    const modales = document.querySelectorAll<HTMLElement>('.modal-overlay, .lightbox-overlay');
    const superior = modales[modales.length - 1];
    if (superior) {
      superior.click();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      return;
    }
    if (canGoBack) window.history.back();
    else App.exitApp();
  });

  try {
    await StatusBar.setStyle({ style: Style.Dark });
    if (plataforma === 'android') await StatusBar.setBackgroundColor({ color: '#070e18' });
  } catch {
    /* no disponible en todas las versiones */
  }
  await SplashScreen.hide();
}

/** Se llama una vez al arrancar. En web no hace nada. */
export function iniciarPuenteNativo(): void {
  if (!esNativo) return;
  document.documentElement.classList.add('app-nativa', `app-${plataforma}`);
  instalarInterceptores();
  configurarSistema().catch(err => console.warn('[nativo]', err));
}
