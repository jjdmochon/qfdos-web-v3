// ==========================================================================
// Correo desde la plataforma (profesorado)
//
// Codigo.gs envía los mensajes desde la cuenta del profesor (MailApp): uno a
// cada persona, con el profesor como dirección de respuesta. Sirve para los
// recordatorios del panel de seguimiento; el aviso al alumno cuando se
// responde una duda viaja con la propia respuesta (ver dudas.ts).
// ==========================================================================

import { tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();

export interface ResultadoEnvio {
  enviados: number;
  fallidos: string[];
  descartados: string[];
  cuotaRestante: number;
}

export type Resultado<T> = { ok: true; datos: T } | { ok: false; error: string };

const SESION_CADUCADA = 'Tu sesión ha caducado. Cierra sesión y vuelve a entrar.';
const SCRIPT_ANTIGUO =
  'El script de Apps Script todavía es una versión anterior (falta publicar la última versión de Codigo.gs). No se ha enviado nada.';

export async function enviarRecordatorio(d: {
  destinatarios: string[];
  asunto: string;
  cuerpo: string;
  tipo: string;
}): Promise<Resultado<ResultadoEnvio>> {
  if (!WEBAPP_URL) return { ok: false, error: 'Falta configurar VITE_PRACTICAS_WEBAPP_URL.' };
  await renovarSiHaceFalta();
  const sesion = tokenSesion();
  if (!sesion) return { ok: false, error: SESION_CADUCADA };
  try {
    const resp = await fetch(
      `${WEBAPP_URL}?accion=enviarRecordatorio&sesion=${encodeURIComponent(sesion)}&t=${Date.now()}`,
      {
        method: 'POST',
        // text/plain evita la petición previa de CORS, que Apps Script no atiende
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(d),
        redirect: 'follow'
      }
    );
    const c = await resp.json().catch(() => null);
    if (c?.ok) {
      // Un script antiguo responde «ok» a cualquier acción que no conoce
      if (typeof c.enviados !== 'number') return { ok: false, error: SCRIPT_ANTIGUO };
      return {
        ok: true,
        datos: {
          enviados: c.enviados,
          fallidos: Array.isArray(c.fallidos) ? c.fallidos.map(String) : [],
          descartados: Array.isArray(c.descartados) ? c.descartados.map(String) : [],
          cuotaRestante: Number(c.cuotaRestante) || 0
        }
      };
    }
    if (esSesionInvalida(c)) return { ok: false, error: SESION_CADUCADA };
    return { ok: false, error: c?.error ?? `El servidor respondió ${resp.status}.` };
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servidor. Revisa la conexión.' };
  }
}
