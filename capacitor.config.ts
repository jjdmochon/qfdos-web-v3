import type { CapacitorConfig } from '@capacitor/cli';

/**
 * App nativa de QFDOS (Android ahora, iOS en la siguiente fase).
 *
 * La app empaqueta la web compilada (dist/) y la sirve desde
 * https://localhost dentro del WebView: funciona sin conexión para todo lo
 * estático y pide a la red solo lo que ya pedía la web (Apps Script,
 * PubChem, RDKit, Gemini…). Compilar SIEMPRE sin PAGES_BASE: la base debe
 * ser «/».
 */
const config: CapacitorConfig = {
  appId: 'es.ugr.qfdos',
  appName: 'QFDOS UGR',
  webDir: 'dist',
  backgroundColor: '#070e18',
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  ios: {
    contentInset: 'automatic',
    scheme: 'QFDOS'
  },
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: false,
      backgroundColor: '#070e18',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP'
    },
    SystemBars: {
      insetsHandling: 'css',
      style: 'DARK'
    },
    SocialLogin: {
      providers: {
        google: true,
        facebook: false,
        apple: false,
        twitter: false
      },
      logLevel: 1
    }
  }
};

export default config;
