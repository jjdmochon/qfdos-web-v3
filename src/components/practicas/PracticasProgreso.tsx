import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { misEntregas, EntregaPropia, publicacionDisponible, getCachedEntregas } from '../../services/contenidoRemoto';
import { MisEntregas } from '../MisEntregas';
import { MiSemanaPracticas } from '../MiSemanaPracticas';

interface PracticasProgresoProps {
  /** Lleva a la subpestaña que resuelve cada pendiente */
  onIr: (destino: string) => void;
  onSafetyStatusKnown?: (accepted: boolean) => void;
}

/**
 * Lo que cada pareja ha entregado y lo que le falta.
 *
 * Va en primer lugar a propósito: al entrar en Prácticas, lo primero que
 * necesita saber un alumno no es el protocolo, sino si lo suyo ha llegado.
 */
export const PracticasProgreso: React.FC<PracticasProgresoProps> = ({ onIr, onSafetyStatusKnown }) => {
  const { user } = useAuth();
  const [entregas, setEntregas] = useState<EntregaPropia[] | null>(() => {
    return user?.email ? getCachedEntregas(user.email) : null;
  });
  const [cargando, setCargando] = useState<boolean>(() => {
    return user?.email ? !getCachedEntregas(user.email) : true;
  });
  const [error, setError] = useState(false);

  const cargar = async () => {
    if (!user?.email) return;
    if (!entregas) setCargando(true);
    setError(false);
    const r = await misEntregas(user.email);
    if (r === null && !entregas) {
      setError(true);
    } else if (r !== null) {
      setEntregas(r);
      const safetyAccepted = r.some(e => /normas/i.test(e.hoja));
      if (safetyAccepted) {
        try {
          localStorage.setItem('qfdos_practicas_safety_accepted', JSON.stringify({
            email: user.email,
            accepted: true,
            syncedFromRemote: true
          }));
        } catch {}
        onSafetyStatusKnown?.(true);
      }
    }
    setCargando(false);
  };

  useEffect(() => { cargar(); /* eslint-disable-next-line */ }, [user?.email]);

  const hayEn = (patron: RegExp) =>
    !!entregas?.some(e => patron.test(e.hoja));

  const firmadoEnEsteEquipo = (() => {
    try {
      const raw = localStorage.getItem('qfdos_practicas_safety_accepted');
      if (!raw) return false;
      if (raw === 'true') return true;
      const p = JSON.parse(raw);
      return !!p.accepted;
    } catch {
      return !!localStorage.getItem('qfdos_practicas_safety_accepted');
    }
  })();

  const tareas = [
    {
      id: 'safety',
      titulo: 'Firmar las normas de seguridad',
      detalle: 'Obligatorio antes de entrar al laboratorio.',
      hecho: hayEn(/normas/i) || firmadoEnEsteEquipo,
      soloLocal: !hayEn(/normas/i) && firmadoEnEsteEquipo,
      destino: 'safety'
    },
    {
      id: 'pair_report',
      titulo: 'Entregar el cuaderno de la pareja',
      detalle: 'Pesadas, rendimientos, puntos de fusión y cuestiones.',
      hecho: hayEn(/cuaderno/i),
      destino: 'pair_report'
    },
    {
      id: 'equipment',
      titulo: 'Parte de material del puesto',
      detalle: 'Sólo si falta o está roto algo en tu puesto.',
      hecho: hayEn(/material/i),
      opcional: true,
      destino: 'equipment'
    }
  ];

  const pendientes = tareas.filter(t => !t.hecho && !t.opcional);
  const completadas = tareas.filter(t => t.hecho).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: 4 }}>
          Mi progreso en las prácticas
        </h3>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55, maxWidth: '66ch' }}>
          Lo que consta entregado a nombre de <code style={{ fontFamily: 'var(--font-mono)' }}>{user?.email}</code>{' '}
          y lo que queda pendiente.
        </p>
      </div>

      {!publicacionDisponible() && (
        <div className="entrega-aviso entrega-aviso--info">
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            El registro central no está configurado, así que aquí sólo se ve lo hecho
            en este navegador. Pregunta al profesor si tu entrega le ha llegado.
          </span>
        </div>
      )}

      {cargando && (
        <div className="mis-entregas-estado" style={{ padding: '0.65rem 1rem', fontSize: '0.82rem', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <Loader2 size={15} className="spin" style={{ color: 'var(--teal-ink)' }} />
          <span>{entregas ? 'Sincronizando entregas con el registro central…' : 'Comprobando tus entregas en el registro central…'}</span>
        </div>
      )}

      {/* Lista de tareas */}
      <div className="progreso-lista">
        {tareas.map(t => (
          <div key={t.id} className={`progreso-item ${t.hecho ? 'is-hecho' : ''}`}>
            {t.hecho
              ? <CheckCircle2 size={19} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
              : <Circle size={19} color="var(--text-light)" style={{ flexShrink: 0 }} />}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="progreso-titulo">
                {t.titulo}
                {t.opcional && <span className="progreso-etiqueta">opcional</span>}
              </div>
              <p className="progreso-detalle">
                {t.soloLocal
                  ? 'Firmado en este navegador, pero no consta en el registro del profesor. Vuelve a enviarlo.'
                  : t.detalle}
              </p>
            </div>

            {!t.hecho && (
              <button onClick={() => onIr(t.destino)} className="btn btn-sm btn-outline" style={{ flexShrink: 0 }}>
                Ir <ArrowRight size={13} />
              </button>
            )}
          </div>
        ))}
      </div>

      {!cargando && !error && (
        <div className={`progreso-resumen ${pendientes.length === 0 ? 'is-completo' : ''}`}>
          {pendientes.length === 0
            ? <><CheckCircle2 size={17} /> Tienes entregado todo lo obligatorio.</>
            : <><AlertCircle size={17} /> Te falta por enviar: {pendientes.map(p => p.titulo.toLowerCase()).join(' y ')}.</>}
          <button onClick={cargar} className="btn btn-sm btn-ghost" style={{ marginLeft: 'auto' }}>
            <RefreshCw size={13} /> Actualizar
          </button>
        </div>
      )}

      <MiSemanaPracticas />

      {/* Detalle de cada entrega compartiendo estado para evitar peticiones redundantes */}
      <MisEntregas entregasProp={entregas} cargandoProp={cargando} onRecargar={cargar} />
    </div>
  );
};
