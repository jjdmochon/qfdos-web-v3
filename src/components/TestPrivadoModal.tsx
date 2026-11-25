import React, { useMemo, useState } from 'react';
import { X, CheckCircle2, XCircle } from 'lucide-react';
import type { TemaPrivado } from '../services/temaPrivado';

/**
 * Test interactivo del Tema 7, solo para la vista docente privada. Las preguntas
 * llegan del servidor y viven en el estado del componente: no se guardan ni se
 * envían a ninguna hoja de calificaciones.
 */
export const TestPrivadoModal: React.FC<{ datos: TemaPrivado; onClose: () => void }> = ({ datos, onClose }) => {
  const [modelo, setModelo] = useState(0);
  const [resp, setResp] = useState<Record<string, number>>({});
  const [corregido, setCorregido] = useState<Record<string, boolean>>({});
  const m = datos.modelos[modelo];

  const clave = (n: number) => `${m.id}-${n}`;
  const { aciertos, errores, blancos } = useMemo(() => {
    let a = 0, e = 0, b = 0;
    for (const p of m.preguntas) {
      const r = resp[`${m.id}-${p.n}`];
      if (r === undefined) b++; else if (r === p.correcta) a++; else e++;
    }
    return { aciertos: a, errores: e, blancos: b };
  }, [m, resp]);
  const nota = aciertos - 0.25 * errores;
  const todoCorregido = m.preguntas.every(p => corregido[clave(p.n)]);

  const reiniciar = () => { setResp({}); setCorregido({}); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '860px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Test Tema 7 · vista docente privada</h3>
          <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
        </div>
        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {datos.modelos.map((x, i) => (
              <button key={x.id} className={`btn btn-sm ${i === modelo ? 'btn-primary' : 'btn-outline'}`} onClick={() => { setModelo(i); }}>
                {x.titulo}
              </button>
            ))}
            <button className="btn btn-sm btn-outline" onClick={reiniciar}>Reiniciar</button>
          </div>
          <p style={{ fontSize: '0.8rem', margin: '0 0 1rem' }}>
            Acierto +1,0 · error −0,25 · en blanco 0. Nada de esto se guarda ni se registra.
          </p>
          {m.preguntas.map(p => {
            const k = clave(p.n);
            const r = resp[k];
            const hecho = !!corregido[k];
            return (
              <div key={k} className="qfdos-card" style={{ padding: '1rem 1.25rem', marginBottom: '0.9rem' }}>
                <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem' }}>Pregunta {p.n}</h4>
                <p style={{ margin: '0.3rem 0', lineHeight: 1.5 }}>{p.enunciado}</p>
                {p.imagen && <img src={p.imagen} alt="Estructuras del enunciado" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0.5rem 0' }} />}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: '0.5rem' }}>
                  {p.opciones.map((o, i) => {
                    const sel = r === i;
                    const buena = hecho && i === p.correcta;
                    const mala = hecho && sel && i !== p.correcta;
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={hecho}
                        onClick={() => setResp(prev => ({ ...prev, [k]: i }))}
                        className="btn btn-outline"
                        style={{
                          textAlign: 'left', justifyContent: 'flex-start', whiteSpace: 'normal', height: 'auto',
                          borderColor: buena ? 'var(--ok-ink)' : mala ? 'var(--danger, #b91c1c)' : sel ? 'var(--primary, #1e3a8a)' : undefined,
                          borderWidth: sel || buena ? 2 : undefined
                        }}
                      >
                        <strong>{'abcd'[i]})</strong>&nbsp;{o}
                        {buena && <CheckCircle2 size={16} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                        {mala && <XCircle size={16} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
                {!hecho ? (
                  <button className="btn btn-sm btn-primary" style={{ marginTop: '0.6rem' }} onClick={() => setCorregido(prev => ({ ...prev, [k]: true }))}>
                    Corregir
                  </button>
                ) : (
                  <div style={{ marginTop: '0.7rem', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    <p style={{ margin: '0 0 0.3rem' }}><strong>Correcta: {'abcd'[p.correcta]})</strong> · Nivel {p.nivel}{p.apuntes ? ` · ${p.apuntes}` : ''}</p>
                    <p style={{ margin: '0 0 0.3rem' }}>{p.justificacion}</p>
                    {Object.entries(p.distractores).map(([l, t]) => (
                      <p key={l} style={{ margin: '0.1rem 0' }}><strong>{l})</strong> {t}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.85rem' }}>
            {aciertos} aciertos · {errores} errores · {blancos} en blanco · {todoCorregido ? 'Nota' : 'Nota provisional'}: {nota.toFixed(2).replace('.', ',')}
          </span>
          <button onClick={onClose} className="btn btn-primary">Cerrar</button>
        </div>
      </div>
    </div>
  );
};
