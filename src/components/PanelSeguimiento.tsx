import React, { useEffect, useMemo, useState } from 'react';
import { QfdosTopic, testHabilitado } from '../data/qfdosData';
import { AlumnoSeguimiento, Seguimiento, cargarSeguimiento } from '../services/seguimiento';
import { enviarRecordatorio } from '../services/correo';
import { AlertTriangle, Check, Clock, Copy, Download, Mail, RefreshCw, Search, Send } from 'lucide-react';

interface PanelSeguimientoProps {
  topics: QfdosTopic[];
}

/** Qué se considera «pendiente» al filtrar y al preparar el recordatorio. */
type Filtro = 'todos' | 'cualquiera' | 'normas' | 'cuaderno' | `test:${string}`;

const fechaCorta = (iso: string): string => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
};

const plural = (n: number, uno: string, varios: string): string => `${n} ${n === 1 ? uno : varios}`;

const num = (n: number | null): string => (n === null ? '—' : n.toLocaleString('es-ES', { maximumFractionDigits: 1 }));

/* `.qfdos-card` es una columna: sin `flexDirection: 'row'` el `flex: 1 1 220px` de abajo se aplica a la altura */
const fila: React.CSSProperties = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '10px' };
const campo: React.CSSProperties = {
  padding: '6px 10px', fontSize: '0.82rem', border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-main)'
};

const celdaOk: React.CSSProperties = { color: 'var(--ok-ink)', fontWeight: 700 };
const celdaPend: React.CSSProperties = { color: 'var(--warn-ink)', fontWeight: 600 };

/**
 * Qué ha hecho cada estudiante y qué le falta. Los datos los calcula Codigo.gs
 * a partir de las hojas; aquí solo se filtran, se exportan y se usan para
 * preparar un recordatorio por correo (el profesor lo envía desde su cuenta).
 */
export const PanelSeguimiento: React.FC<PanelSeguimientoProps> = ({ topics }) => {
  const [datos, setDatos] = useState<Seguimiento | null>(null);
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [grupo, setGrupo] = useState('todos');
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [copiado, setCopiado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultadoEnvio, setResultadoEnvio] = useState<{ ok: boolean; texto: string } | null>(null);

  // Columnas de test: los temas publicados con test habilitado. Los que están
  // «Próximamente» no se pueden hacer todavía, así que no cuentan como pendientes.
  const temasConTest = useMemo(
    () => topics.filter(t => t.id !== 'tema-00' && t.status === 'Publicado' && testHabilitado(t)),
    [topics]
  );

  const recargar = async () => {
    setCargando(true);
    const r = await cargarSeguimiento();
    if (r.ok) {
      setDatos(r.datos);
      setAviso(null);
    } else {
      setAviso(r.error);
    }
    setCargando(false);
  };

  useEffect(() => { recargar(); }, []);

  const alumnos = datos?.alumnos ?? [];
  const grupos = useMemo(
    () => Array.from(new Set(alumnos.map(a => a.grupo).filter(Boolean))).sort(),
    [alumnos]
  );

  /** Lo que le falta a un estudiante según el filtro elegido. */
  const pendientes = (a: AlumnoSeguimiento, f: Filtro): string[] => {
    const falta: string[] = [];
    const revisa = (clave: Filtro) => f === 'cualquiera' || f === 'todos' || f === clave;
    if (revisa('normas') && !a.normas) falta.push('normas de seguridad');
    if (revisa('cuaderno') && !a.cuaderno) falta.push('cuaderno de prácticas');
    for (const t of temasConTest) {
      if (revisa(`test:${t.id}`) && !a.tests[t.id]) falta.push(`test ${t.number || t.title}`);
    }
    return falta;
  };

  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return alumnos.filter(a => {
      if (grupo !== 'todos' && a.grupo !== grupo) return false;
      if (q && !`${a.nombre} ${a.email}`.toLowerCase().includes(q)) return false;
      if (filtro !== 'todos' && pendientes(a, filtro).length === 0) return false;
      return true;
    });
  }, [alumnos, busqueda, grupo, filtro, temasConTest]);

  const total = alumnos.length;
  const fueraDeLista = datos?.hayLista ? alumnos.filter(a => !a.enLista).length : 0;
  const conNormas = alumnos.filter(a => a.normas).length;
  const conCuaderno = alumnos.filter(a => a.cuaderno).length;
  const cuadernoCalificado = alumnos.filter(a => a.cuaderno && a.cuaderno.nota !== null).length;
  const conAlgunTest = alumnos.filter(a => Object.keys(a.tests).length > 0).length;

  // Recordatorio: a quienes siguen en pantalla y tienen algo pendiente según el filtro
  const paraRecordar = visibles.filter(a => pendientes(a, filtro === 'todos' ? 'cualquiera' : filtro).length > 0);
  const correos = paraRecordar.map(a => a.email);

  const textoRecordatorio = (): { asunto: string; cuerpo: string } => {
    const qué =
      filtro === 'normas' ? 'firmar las normas de seguridad del laboratorio'
      : filtro === 'cuaderno' ? 'entregar el cuaderno de prácticas'
      : filtro.startsWith('test:') ? `hacer el test del ${temasConTest.find(t => `test:${t.id}` === filtro)?.number || 'tema'}`
      : 'completar lo que tienes pendiente (normas de seguridad, cuaderno de prácticas o tests)';
    return {
      asunto: '[QFDOS] Recordatorio de tareas pendientes',
      cuerpo:
        `Hola,\n\nTe escribo para recordarte que te falta ${qué} en la plataforma de Química Farmacéutica II.\n` +
        `Puedes ver qué te falta en Prácticas → «Mi progreso».\n\nUn saludo,\nJuan José Díaz-Mochón`
    };
  };

  const enlaceCorreo = (): string => {
    const { asunto, cuerpo } = textoRecordatorio();
    return `mailto:?bcc=${encodeURIComponent(correos.join(','))}&subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  };
  // Muchos clientes de correo recortan los enlaces mailto muy largos
  const correoAbrible = correos.length > 0 && enlaceCorreo().length < 1900;

  /** Envía el recordatorio desde la plataforma (un correo por persona, con vuestra dirección como respuesta). */
  const enviarAhora = async () => {
    const { asunto, cuerpo } = textoRecordatorio();
    const n = correos.length;
    if (!n || enviando) return;
    if (!window.confirm(`Se enviará ahora «${asunto}» a ${plural(n, 'estudiante', 'estudiantes')} desde tu cuenta. Cada persona recibe su propio correo y podrá responderte. ¿Enviar?`)) return;
    setEnviando(true);
    setResultadoEnvio(null);
    const r = await enviarRecordatorio({
      destinatarios: correos,
      asunto,
      cuerpo,
      tipo: filtro === 'todos' ? 'cualquiera' : filtro.startsWith('test:') ? 'test' : filtro
    });
    setEnviando(false);
    if (!r.ok) {
      setResultadoEnvio({ ok: false, texto: r.error });
      return;
    }
    const { enviados, fallidos, descartados, cuotaRestante } = r.datos;
    const extra = [
      fallidos.length ? `no se pudo enviar a ${fallidos.join(', ')}` : '',
      descartados.length ? `${plural(descartados.length, 'correo descartado', 'correos descartados')} por no ser válidos` : ''
    ].filter(Boolean).join('; ');
    setResultadoEnvio({
      ok: fallidos.length === 0,
      texto: `Enviados ${enviados} de ${n}${extra ? ` (${extra})` : ''}. Hoy te quedan ${cuotaRestante} correos.`
    });
  };

  const copiarCorreos = async () => {
    try {
      await navigator.clipboard.writeText(correos.join(', '));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt('Copia los correos:', correos.join(', '));
    }
  };

  const exportarCsv = () => {
    const comilla = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const cab = [
      'Nombre', 'Correo', 'Grupo', 'En_lista', 'Normas_firmadas', 'Cuaderno_entregas', 'Cuaderno_nota',
      ...temasConTest.flatMap(t => [`Test_${t.number || t.id}_mejor`, `Test_${t.number || t.id}_intentos`]),
      'Flashcards', 'Ultima_actividad'
    ];
    const filas = visibles.map(a => [
      comilla(a.nombre), comilla(a.email), comilla(a.grupo), a.enLista ? 'si' : 'no',
      comilla(a.normas ? fechaCorta(a.normas) || 'si' : ''),
      a.cuaderno ? a.cuaderno.entregas : 0,
      a.cuaderno && a.cuaderno.nota !== null ? a.cuaderno.nota : '',
      ...temasConTest.flatMap(t => [a.tests[t.id]?.mejor ?? '', a.tests[t.id]?.intentos ?? 0]),
      a.flashcards, comilla(fechaCorta(a.ultima))
    ]);
    const csv = '﻿' + [cab.join(','), ...filas.map(f => f.join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `Seguimiento_QFDOS_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  };

  const tarjeta = (titulo: string, valor: string, detalle: string, color: string) => (
    <div className="qfdos-card" style={{ padding: '0.9rem 1rem', borderLeft: `4px solid ${color}` }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>{titulo}</span>
      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-title)', lineHeight: 1.2 }}>{valor}</div>
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{detalle}</span>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>Seguimiento del alumnado</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
            Qué ha hecho cada estudiante y qué le falta, leído de las hojas de cálculo
            {datos?.generado ? ` · actualizado ${new Date(datos.generado).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}` : ''}.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" onClick={recargar} disabled={cargando} className="btn btn-sm btn-outline" style={{ fontSize: '0.76rem' }}>
            <RefreshCw size={13} className={cargando ? 'spin' : undefined} /> Recargar
          </button>
          <button type="button" onClick={exportarCsv} disabled={!visibles.length} className="btn btn-sm btn-outline" style={{ fontSize: '0.76rem' }}>
            <Download size={13} /> Exportar CSV ({visibles.length})
          </button>
        </div>
      </div>

      {aviso && (
        <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--accent-red)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle size={14} /> {aviso}
        </div>
      )}

      {datos && !datos.hayLista && (
        <div style={{ padding: '8px 12px', background: 'var(--warn-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--warn-ink)', fontSize: '0.8rem', lineHeight: 1.45 }}>
          <strong>La hoja de evaluación no tiene alumnado.</strong> Esta lista solo incluye a quien ya ha enviado algo, así que no se
          puede saber quién no ha hecho nada. Añadid los correos de la clase (y, si queréis filtrar, una columna «Grupo») a la hoja de evaluación.
        </div>
      )}
      {datos && !datos.hayTests && (
        <div style={{ padding: '8px 12px', background: 'var(--warn-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--warn-ink)', fontSize: '0.8rem' }}>
          No se ha podido leer la hoja de calificaciones de los tests: las columnas de test aparecerán vacías.
        </div>
      )}

      {datos && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(170px, 100%), 1fr))', gap: '10px' }}>
          {tarjeta('ALUMNADO', String(total), fueraDeLista ? plural(fueraDeLista, 'fuera de la lista', 'fuera de la lista') : datos.hayLista ? 'según la hoja de evaluación' : 'con actividad', 'var(--navy)')}
          {tarjeta('NORMAS FIRMADAS', `${conNormas}/${total}`, plural(total - conNormas, 'pendiente', 'pendientes'), '#10b981')}
          {tarjeta('CUADERNO ENTREGADO', `${conCuaderno}/${total}`, plural(cuadernoCalificado, 'calificado', 'calificados'), 'var(--teal)')}
          {tarjeta('ALGÚN TEST HECHO', `${conAlgunTest}/${total}`, plural(temasConTest.length, 'tema con test', 'temas con test'), '#f59e0b')}
        </div>
      )}

      <div className="qfdos-card" style={{ padding: '0.75rem 1rem', ...fila }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', flex: '1 1 220px' }}>
          <Search size={15} color="var(--text-muted)" />
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o correo…"
            style={{ ...campo, width: '100%' }}
            aria-label="Buscar alumno"
          />
        </div>
        {grupos.length > 0 && (
          <select value={grupo} onChange={e => setGrupo(e.target.value)} style={campo} aria-label="Grupo">
            <option value="todos">Todos los grupos</option>
            {grupos.map(g => <option key={g} value={g}>Grupo {g}</option>)}
          </select>
        )}
        <select value={filtro} onChange={e => setFiltro(e.target.value as Filtro)} style={campo} aria-label="Pendientes">
          <option value="todos">Todos</option>
          <option value="cualquiera">Con algo pendiente</option>
          <option value="normas">Sin firmar las normas</option>
          <option value="cuaderno">Sin entregar el cuaderno</option>
          {temasConTest.map(t => <option key={t.id} value={`test:${t.id}`}>Sin test del {t.number || t.title}</option>)}
        </select>
      </div>

      <div className="qfdos-card" style={{ padding: '0.75rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ background: 'var(--surface-muted)', borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '0.6rem' }}>Alumno/a</th>
              <th style={{ padding: '0.6rem' }}>Normas</th>
              <th style={{ padding: '0.6rem' }}>Cuaderno</th>
              {temasConTest.map(t => (
                <th key={t.id} style={{ padding: '0.6rem', whiteSpace: 'nowrap' }} title={`Test: ${t.title}`}>Test {t.number || t.title}</th>
              ))}
              <th style={{ padding: '0.6rem' }} title="Sesiones de autoevaluación con flashcards">Flashcards</th>
              <th style={{ padding: '0.6rem' }}>Última actividad</th>
            </tr>
          </thead>
          <tbody>
            {cargando && !datos && (
              <tr><td colSpan={5 + temasConTest.length} style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando seguimiento…</td></tr>
            )}
            {!cargando && !visibles.length && (
              <tr><td colSpan={5 + temasConTest.length} style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                {aviso ? 'Sin datos: revisa el aviso de arriba.' : total === 0 ? 'Todavía no hay actividad registrada.' : 'Ningún estudiante coincide con los filtros.'}
              </td></tr>
            )}
            {visibles.map(a => (
              <tr key={a.email} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.6rem' }}>
                  <strong>{a.nombre || a.email}</strong>
                  {a.grupo && <span className="qfdos-badge badge-navy" style={{ fontSize: '0.62rem', marginLeft: 6 }}>{a.grupo}</span>}
                  {datos?.hayLista && !a.enLista && <span className="qfdos-badge badge-amber" style={{ fontSize: '0.62rem', marginLeft: 6 }} title="No figura en la hoja de evaluación">fuera de la lista</span>}
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{a.email}</div>
                </td>
                <td style={{ padding: '0.6rem' }}>
                  {a.normas
                    ? <span style={celdaOk}><Check size={13} style={{ verticalAlign: '-2px' }} /> {fechaCorta(a.normas)}</span>
                    : <span style={celdaPend}><Clock size={13} style={{ verticalAlign: '-2px' }} /> Pendiente</span>}
                </td>
                <td style={{ padding: '0.6rem' }}>
                  {a.cuaderno
                    ? <span style={celdaOk}>
                        <Check size={13} style={{ verticalAlign: '-2px' }} /> {a.cuaderno.nota !== null ? `${num(a.cuaderno.nota)}/10` : 'Sin calificar'}
                        {a.cuaderno.entregas > 1 && <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}> ({a.cuaderno.entregas} env.)</span>}
                      </span>
                    : <span style={celdaPend}><Clock size={13} style={{ verticalAlign: '-2px' }} /> Pendiente</span>}
                </td>
                {temasConTest.map(t => {
                  const r = a.tests[t.id];
                  return (
                    <td key={t.id} style={{ padding: '0.6rem', whiteSpace: 'nowrap' }}>
                      {r
                        ? <span style={celdaOk}>{num(r.mejor)} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>({r.intentos})</span></span>
                        : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                  );
                })}
                <td style={{ padding: '0.6rem', textAlign: 'center' }}>{a.flashcards || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                <td style={{ padding: '0.6rem', whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{a.ultima ? fechaCorta(a.ultima) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="qfdos-card" style={{ padding: '0.85rem 1rem', ...fila, justifyContent: 'space-between' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '520px', lineHeight: 1.45 }}>
          <strong style={{ color: 'var(--text-title)' }}>Recordatorio:</strong> {correos.length
            ? `${plural(correos.length, 'estudiante en pantalla tiene', 'estudiantes en pantalla tienen')} algo pendiente${filtro === 'todos' ? '' : ' según el filtro'}. «Enviar ahora» manda un correo a cada persona desde tu cuenta; «Preparar en mi correo» lo deja listo con copia oculta para que lo envíes tú.`
            : 'No hay estudiantes con pendientes en pantalla.'}
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" onClick={copiarCorreos} disabled={!correos.length} className="btn btn-sm btn-outline" style={{ fontSize: '0.76rem' }}>
            <Copy size={13} /> {copiado ? 'Copiados ✓' : `Copiar correos (${correos.length})`}
          </button>
          <button type="button" onClick={enviarAhora} disabled={!correos.length || enviando} className="btn btn-sm btn-primary" style={{ fontSize: '0.76rem' }}
            title="Envía el recordatorio ahora desde la plataforma, un correo por persona">
            <Send size={13} /> {enviando ? 'Enviando…' : `Enviar ahora (${correos.length})`}
          </button>
          {correoAbrible ? (
            <a href={enlaceCorreo()} className="btn btn-sm btn-primary" style={{ fontSize: '0.76rem', textDecoration: 'none' }}>
              <Mail size={13} /> Preparar en mi correo
            </a>
          ) : (
            <button type="button" disabled className="btn btn-sm btn-primary" style={{ fontSize: '0.76rem' }}
              title={correos.length ? 'Demasiados destinatarios para un enlace de correo: copia los correos y pégalos en tu cliente' : undefined}>
              <Mail size={13} /> Preparar en mi correo
            </button>
          )}
        </div>
      </div>
      {resultadoEnvio && (
        <div className={resultadoEnvio.ok ? 'status-msg status-msg--ok' : 'status-msg status-msg--bad'} role={resultadoEnvio.ok ? 'status' : 'alert'}>
          <span>{resultadoEnvio.texto}</span>
        </div>
      )}
    </div>
  );
};
