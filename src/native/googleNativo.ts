// ==========================================================================
// Inicio de sesión con Google dentro de la app nativa
//
// Google bloquea su botón web (GIS) dentro de un WebView. En la app se usa el
// selector de cuentas del sistema (Credential Manager en Android). Se pide el
// ID token para el Client ID *web* de la plataforma, de modo que el servidor
// (Apps Script) lo verifica exactamente igual que el del navegador: aud = el
// mismo Client ID. No hace falta tocar el backend.
// ==========================================================================

import { SocialLogin } from '@capgo/capacitor-social-login';

const WEB_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const IOS_CLIENT_ID = import.meta.env.VITE_GOOGLE_IOS_CLIENT_ID || '';

let iniciado: Promise<void> | null = null;

function iniciar(): Promise<void> {
  iniciado ??= SocialLogin.initialize({
    google: {
      webClientId: WEB_CLIENT_ID,
      ...(IOS_CLIENT_ID ? { iOSClientId: IOS_CLIENT_ID, iOSServerClientId: WEB_CLIENT_ID } : {}),
      mode: 'online'
    }
  });
  return iniciado;
}

/** Abre el selector de cuentas de Google y devuelve el ID token (JWT). */
export async function loginGoogleNativo(): Promise<string> {
  await iniciar();
  // Sin `scopes`: el ID token ya trae email y perfil, y pedir scopes extra
  // obligaría a modificar MainActivity
  const r = await SocialLogin.login({ provider: 'google', options: {} });
  const res = r.result as { idToken?: string | null };
  if (!res?.idToken) throw new Error('Google no devolvió el token de identidad.');
  return res.idToken;
}

export async function logoutGoogleNativo(): Promise<void> {
  try {
    await iniciar();
    await SocialLogin.logout({ provider: 'google' });
  } catch {
    /* sin sesión nativa abierta */
  }
}
