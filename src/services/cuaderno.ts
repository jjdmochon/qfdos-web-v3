// ==========================================================================
// Cuaderno de parejas: lectura y calificación (profesorado)
//
// Las entregas del alumnado llegan a la pestaña «Cuaderno de parejas» de la
// hoja de entregas. Este servicio las lee y guarda la nota y el comentario del
// profesor en la misma fila, a través de Codigo.gs. Nada de esto vive ya en el
// navegador: cambiar de equipo o limpiar los datos no pierde las notas.
// ==========================================================================

import { tokenSesion, renovarSiHaceFalta, esSesionInvalida } from './sesion';
import type { LabPairReport } from '../data/practicasData';

const WEBAPP_URL = (import.meta.env.VITE_PRACTICAS_WEBAPP_URL ?? '').trim();

/** Informe tal y como lo entendía el panel, más lo necesario para calificarlo. */
export interface InformeCuaderno extends LabPairReport {
  /** Fila de la hoja (base 1) */
  fila: number;
  /** Marca de la entrega; el servidor la comprueba antes de calificar */
  recibidoEn: string;
  /** Observaciones del cuaderno (la hoja las guarda juntas, sin separar por etapa) */
  observaciones: string;
  /** Cuántas veces ha entregado esta pareja (se muestra la última) */
  entregas: number;
}

export type Resultado<T> = { ok: true; datos: T } | { ok: false; error: string };

const SESION_CADUCADA = 'Tu sesión ha caducado. Cierra sesión y vuelve a entrar.';
const SCRIPT_ANTIGUO =
  'El script de Apps Script todavía es una versión anterior (falta publicar la última versión de Codigo.gs). No se ha guardado ni leído nada.';

async function llamar<T>(accion: string, extraer: (c: Record<string, unknown>) => T, cuerpo?: unknown): Promise<Resultado<T>> {
  if (!WEBAPP_URL) return { ok: false, error: 'Falta configurar VITE_PRACTICAS_WEBAPP_URL.' };
  await renovarSiHaceFalta();
  const sesion = tokenSesion();
  if (!sesion) return { ok: false, error: SESION_CADUCADA };
  try {
    const resp = await fetch(
      `${WEBAPP_URL}?accion=${accion}&sesion=${encodeURIComponent(sesion)}&t=${Date.now()}`,
      cuerpo === undefined
        ? { method: 'GET', redirect: 'follow' }
        : {
            method: 'POST',
            // text/plain evita la petición previa de CORS, que Apps Script no atiende
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(cuerpo),
            redirect: 'follow'
          }
    );
    const c = await resp.json().catch(() => null);
    if (c?.ok) {
      try {
        return { ok: true, datos: extraer(c) };
      } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : String(e) };
      }
    }
    if (esSesionInvalida(c)) return { ok: false, error: SESION_CADUCADA };
    return { ok: false, error: c?.error ?? `El servidor respondió ${resp.status}.` };
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servidor. Revisa la conexión.' };
  }
}

/** «3,65 g» → 3.65 ; «87,6 %» → 87.6 ; vacío → 0 */
function numero(v: string | undefined): number {
  const n = parseFloat(String(v ?? '').replace(/[^\d,.-]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

function fechaLocal(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

type Fila = Record<string, string>;

/** Una fila de la hoja (claves planas) → el informe que pinta el panel. */
export function filaAInforme(f: Fila): InformeCuaderno {
  const puesto = parseInt(f.puesto, 10) || 0;
  const turno = f.turno || '';
  const base = `P${String(puesto).padStart(2, '0')}-${turno.replace(':', '').replace('-', '_')}`;
  const nota = f.notaProfesor !== undefined && f.notaProfesor !== '' ? Number(f.notaProfesor) : undefined;
  const compuesto = f.etapa3Compuesto === 'Nifedipina' ? 'Nifedipina' : 'DHPP';

  return {
    fila: Number(f._fila),
    recibidoEn: f.recibidoEn || '',
    observaciones: f.observaciones || '',
    entregas: 1,
    id: f.fechaSesion ? `${base} · ${f.fechaSesion}` : base,
    puesto,
    turno,
    fecha: f.fechaSesion || '',
    student1: { nombre: f.alumno1 || '', email: f.email1 || '' },
    student2: { nombre: f.alumno2 || '', email: f.email2 || '' },
    step1: {
      mass1Naftol: numero(f.etapa1Naftol),
      volEpiclorhidrina: 0,
      massNaOH: 0,
      massProductCrude: numero(f.etapa1Crudo),
      yieldPercentage: numero(f.etapa1Rendimiento),
      aspect: f.etapa1Aspecto || '',
      observations: ''
    },
    step2: {
      massOxirane: numero(f.etapa2Oxirano),
      volIsopropilamina: 0,
      massProductBase: numero(f.etapa2Propranolol),
      yieldStage: numero(f.etapa2RendEtapa),
      yieldAccumulated: numero(f.etapa2RendGlobal),
      meltingPointObserved: f.etapa2PuntoFusion || '',
      meltingPointReference: '94 - 96 °C',
      tlcRf: '',
      observations: ''
    },
    step3: {
      compoundType: compuesto,
      amountAldehyde: f.etapa3Aldehido || '',
      volMethylAcetoacetate: 0,
      volNH3Conc: 0,
      massProduct: numero(f.etapa3Producto),
      yieldPercentage: numero(f.etapa3Rendimiento),
      meltingPointObserved: f.etapa3PuntoFusion || '',
      meltingPointReference: compuesto === 'DHPP' ? '194 - 196 °C' : '172 - 174 °C',
      crystalHabit: f.etapa3Cristales || '',
      observations: ''
    },
    cuestiones: {
      q1_dcm_density: f.cuestion1 || '',
      q2_nmr_c4_proton: f.cuestion2 || '',
      q3_reflux_safety: f.cuestion3 || ''
    },
    status: nota !== undefined && Number.isFinite(nota) ? 'Calificado' : 'Entregado',
    submittedAt: fechaLocal(f.recibidoEn) || f.entregadoEn,
    profesorGrade: nota !== undefined && Number.isFinite(nota) ? nota : undefined,
    profesorFeedback: f.comentarioProfesor || '',
    gradedAt: fechaLocal(f.calificadoEn)
  };
}

/**
 * Las entregas de la hoja, una por pareja: si una pareja ha entregado varias
 * veces (puesto, turno y fecha de sesión iguales) se queda la más reciente.
 */
export function cargarCuaderno(): Promise<Resultado<{ informes: InformeCuaderno[]; notasPublicadas: boolean }>> {
  return llamar('cuaderno', c => {
    if (!Array.isArray(c.filas)) throw new Error(SCRIPT_ANTIGUO);
    const filas = c.filas as Fila[];
    const porPareja = new Map<string, InformeCuaderno>();
    for (const f of filas) {
      const informe = filaAInforme(f);
      const clave = `${informe.puesto}|${informe.turno}|${informe.fecha}`;
      const previo = porPareja.get(clave);
      const entregas = (previo?.entregas ?? 0) + 1;
      // Se conserva la entrega más reciente, sea cual sea el orden de las filas
      if (previo && previo.recibidoEn > informe.recibidoEn) previo.entregas = entregas;
      else porPareja.set(clave, { ...informe, entregas });
    }
    return {
      informes: Array.from(porPareja.values()).sort((a, b) => b.recibidoEn.localeCompare(a.recibidoEn)),
      notasPublicadas: c.notasPublicadas === true
    };
  });
}

export function calificarInforme(
  informe: Pick<InformeCuaderno, 'fila' | 'recibidoEn'>,
  nota: number,
  comentario: string
): Promise<Resultado<{ calificadoEn: string }>> {
  return llamar(
    'calificarCuaderno',
    c => {
      if (!c.calificadoEn) throw new Error(SCRIPT_ANTIGUO);
      return { calificadoEn: String(c.calificadoEn) };
    },
    { fila: informe.fila, recibidoEn: informe.recibidoEn, nota, comentario }
  );
}

/** Publica u oculta las notas del cuaderno para el alumnado. Solo profesorado. */
export function publicarNotas(publicadas: boolean): Promise<Resultado<boolean>> {
  return llamar(
    'publicarNotasCuaderno',
    c => {
      // Un script anterior a la v9 contesta ok sin confirmar el estado
      if (typeof c.notasPublicadas !== 'boolean') throw new Error(SCRIPT_ANTIGUO);
      return c.notasPublicadas;
    },
    { publicadas }
  );
}
