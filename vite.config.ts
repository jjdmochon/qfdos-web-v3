import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

/**
 * Ruta base de la aplicación.
 *
 * En local se sirve desde la raíz («/»), pero en GitHub Pages el sitio cuelga
 * de una subcarpeta con el nombre del repositorio. Si la base no lo refleja,
 * el HTML pide sus recursos a la raíz del dominio, Pages devuelve 404 y la
 * página sale en blanco sin ningún error visible.
 *
 * Se define con la variable PAGES_BASE al compilar (ver dev.ps1 -Pages).
 */
const base = process.env.PAGES_BASE || '/';

const DIA = 24 * 3600;

/** Hora de la compilación: va al bundle (__BUILD_TIME__) y a version.json */
const BUILD_TIME = new Date().toISOString();

/**
 * Publica version.json junto al index. Las pestañas abiertas lo consultan
 * (sin caché) y, si la compilación publicada no es la suya, recargan
 * (ver PwaUpdatePrompt). No entra en la precaché del service worker.
 */
const versionJson = {
  name: 'qfdos-version-json',
  generateBundle(this: { emitFile: (f: { type: 'asset'; fileName: string; source: string }) => void }) {
    this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ build: BUILD_TIME }) });
  }
};

/**
 * PWA: instalable y usable sin conexión.
 *
 * Al instalar solo se descarga la aplicación (JS, CSS, HTML, iconos: ~2 MB).
 * Las imágenes, modelos 3D y librerías externas se guardan la primera vez
 * que alguien los abre; así nadie paga 40 MB de datos móviles por entrar.
 * Apps Script (login, entregas, datos personales) y Gemini no pasan nunca
 * por la caché: van siempre a la red.
 */
const pwa = VitePWA({
  registerType: 'prompt',
  injectRegister: false,
  manifest: {
    id: base,
    name: 'Química Farmacéutica II · Grupo E (UGR)',
    short_name: 'QFDOS UGR',
    description:
      'Plataforma de Química Farmacéutica II (Grupo E) y cuaderno de prácticas interactivo, Universidad de Granada.',
    lang: 'es',
    start_url: base,
    scope: base,
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#070e18',
    theme_color: '#1e3a8a',
    categories: ['education', 'medical'],
    icons: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,woff2}', 'icons/*.png', '*.webp'],
    maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
    cleanupOutdatedCaches: true,
    // La versión nueva se activa sola en cuanto se descarga. La recarga de las
    // pestañas abiertas la fuerza PwaUpdatePrompt (version.json), esperando a que
    // se entregue el examen que esté en curso.
    skipWaiting: true,
    clientsClaim: true,
    navigateFallbackDenylist: [/\.[a-z0-9]{2,5}$/i],
    runtimeCaching: [
      {
        // Estructuras, diagramas y fotos de prácticas
        urlPattern: ({ request, sameOrigin }) => sameOrigin && request.destination === 'image',
        handler: 'CacheFirst',
        options: { cacheName: 'qfdos-imagenes', expiration: { maxEntries: 600, maxAgeSeconds: 60 * DIA } }
      },
      {
        // Modelos 3D y hojas de datos descargables
        urlPattern: ({ url, sameOrigin }) => sameOrigin && /\.(glb|gltf|csv|xlsx|sdf)$/i.test(url.pathname),
        handler: 'CacheFirst',
        options: { cacheName: 'qfdos-modelos', expiration: { maxEntries: 40, maxAgeSeconds: 60 * DIA } }
      },
      {
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          cacheableResponse: { statuses: [0, 200] },
          expiration: { maxEntries: 30, maxAgeSeconds: 365 * DIA }
        }
      },
      {
        // RDKit (estructuras 2D) y model-viewer (visor 3D)
        urlPattern: /^https:\/\/(unpkg\.com\/@rdkit|ajax\.googleapis\.com\/ajax\/libs\/model-viewer)\/.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'librerias-cdn',
          cacheableResponse: { statuses: [0, 200] },
          expiration: { maxEntries: 20, maxAgeSeconds: 90 * DIA }
        }
      },
      {
        // Logo e imágenes alojadas fuera
        urlPattern: /^https:\/\/i\.ibb\.co\/.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'imagenes-externas',
          cacheableResponse: { statuses: [0, 200] },
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * DIA }
        }
      },
      {
        // Búsquedas de fármacos: red primero, la última respuesta si no hay cobertura
        urlPattern: /^https:\/\/pubchem\.ncbi\.nlm\.nih\.gov\/.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pubchem',
          networkTimeoutSeconds: 8,
          cacheableResponse: { statuses: [0, 200] },
          expiration: { maxEntries: 200, maxAgeSeconds: 30 * DIA }
        }
      }
    ]
  }
});

export default defineConfig({
  base,
  // Hora real de la compilación: se muestra en el pie para saber qué versión se está ejecutando
  define: { __BUILD_TIME__: JSON.stringify(BUILD_TIME) },
  plugins: [react(), pwa, versionJson],
  css: {
    postcss: {
      plugins: []
    }
  },
  server: {
    host: '127.0.0.1',
    port: 3001,
    open: true,
    watch: {
      usePolling: true,
      interval: 800
    }
  }
});
