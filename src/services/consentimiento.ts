// ==========================================================================
// Consentimiento de cookies de analítica
//
// Google Analytics solo se carga si la persona lo acepta (RGPD / LSSI). Hasta
// entonces no se descarga gtag.js, no se crean cookies _ga y trackPageView no
// hace nada. Las únicas cookies/almacenamiento que funcionan sin preguntar son
// los técnicos: la sesión de acceso y las preferencias (tema, esta elección).
// ==========================================================================

const GA_ID = 'G-3EZ19PZN75';
const CLAVE = 'qfdos_consentimiento_analitica';
export const EVENTO_PREFERENCIAS = 'qfdos:preferencias-cookies';

export type Eleccion = 'aceptada' | 'rechazada';

export function leerEleccion(): Eleccion | null {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === 'aceptada' || v === 'rechazada' ? v : null;
  } catch {
    return null;
  }
}

export function guardarEleccion(e: Eleccion): void {
  try { localStorage.setItem(CLAVE, e); } catch { /* sin almacenamiento: se volverá a preguntar */ }
  if (e === 'aceptada') cargarAnalytics();
  else desactivarAnalytics();
}

/** Reabre el aviso (enlace «Preferencias de cookies» del pie). */
export function abrirPreferencias(): void {
  window.dispatchEvent(new Event(EVENTO_PREFERENCIAS));
}

let cargado = false;

function cargarAnalytics(): void {
  const w = window as any;
  w[`ga-disable-${GA_ID}`] = false;
  if (cargado) return;
  cargado = true;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', GA_ID, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

function desactivarAnalytics(): void {
  const w = window as any;
  w[`ga-disable-${GA_ID}`] = true;
  // Borra las cookies que Analytics hubiera dejado (_ga, _ga_XXXX, _gid)
  const dominio = location.hostname;
  document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(n => /^_ga|^_gid/.test(n)).forEach(n => {
    for (const d of [dominio, `.${dominio}`, '']) {
      document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
    }
  });
}

/** Al arrancar: si ya se aceptó en una visita anterior, se carga Analytics. */
export function iniciarConsentimiento(): void {
  if (leerEleccion() === 'aceptada') cargarAnalytics();
}
