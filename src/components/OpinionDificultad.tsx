import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { enviarAHoja, HOJA_OPINIONES } from '../services/entregaPracticas';

/**
 * Opinión del alumnado sobre la dificultad de un test o de una baraja de
 * flashcards. Es feedback para el profesor, no una calificación: va a la
 * pestaña «Opiniones» de la hoja de entregas, con la cuenta de quien la envía.
 */

const ESCALA = [
  { valor: 1, etiqueta: 'Muy fácil' },
  { valor: 2, etiqueta: 'Fácil' },
  { valor: 3, etiqueta: 'Adecuado' },
  { valor: 4, etiqueta: 'Difícil' },
  { valor: 5, etiqueta: 'Muy difícil' }
];

const MAX_COMENTARIO = 300;

interface Props {
  tipo: 'test' | 'flashcards';
  temaId: string;
  tema: string;
  /** Campos extra que acompañan a la opinión (modelo, nota, valoraciones…) */
  detalle?: Record<string, string>;
  /** Texto de la pregunta principal */
  pregunta?: string;
}

export const OpinionDificultad: React.FC<Props> = ({ tipo, temaId, tema, detalle = {}, pregunta }) => {
  const [dificultad, setDificultad] = useState<number | null>(null);
  const [comentario, setComentario] = useState('');
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'enviada' | 'error'>('idle');
  const [mensaje, setMensaje] = useState('');
  const [faltaDificultad, setFaltaDificultad] = useState(false);
  const idBase = `opinion-${tipo}-${temaId}`;

  const enviar = async () => {
    if (dificultad === null) {
      setFaltaDificultad(true);
      return;
    }
    setEstado('enviando');
    setMensaje('');
    const r = await enviarAHoja(HOJA_OPINIONES, {
      tipo,
      temaId,
      tema,
      dificultad: String(dificultad),
      dificultadTexto: ESCALA.find(e => e.valor === dificultad)?.etiqueta ?? '',
      comentario: comentario.trim().slice(0, MAX_COMENTARIO),
      fecha: new Date().toLocaleString('es-ES'),
      ...detalle
    });
    if (r.estado === 'confirmado' || r.estado === 'enviado-sin-confirmar') {
      setEstado('enviada');
      setMensaje(r.estado === 'confirmado' ? '¡Gracias! Tu opinión ha llegado al profesor.' : 'Enviada. No se ha podido confirmar la recepción.');
    } else {
      setEstado('error');
      setMensaje(r.mensaje);
    }
  };

  if (estado === 'enviada') {
    return (
      <div className="status-msg status-msg--ok opinion-box" role="status">
        <CheckCircle2 size={16} /> <span>{mensaje}</span>
      </div>
    );
  }

  return (
    <div className="opinion-box" role="group" aria-labelledby={`${idBase}-titulo`}>
      <div className="opinion-head">
        <MessageSquare size={16} color="var(--teal-ink)" aria-hidden="true" />
        <strong id={`${idBase}-titulo`}>
          {pregunta ?? (tipo === 'test' ? '¿Qué dificultad te ha parecido este test?' : '¿Qué te han parecido estas flashcards?')}
        </strong>
      </div>
      <p className="opinion-nota">No cuenta para la nota. El profesor la usa para ajustar el material.</p>

      <div className="opinion-escala" role="radiogroup" aria-label="Grado de dificultad" aria-invalid={faltaDificultad || undefined}
        aria-describedby={faltaDificultad ? `${idBase}-error` : undefined}>
        {ESCALA.map(op => (
          <button
            key={op.valor}
            type="button"
            role="radio"
            aria-checked={dificultad === op.valor}
            className="chip"
            onClick={() => { setDificultad(op.valor); setFaltaDificultad(false); }}
          >
            {op.valor} · {op.etiqueta}
          </button>
        ))}
      </div>
      {faltaDificultad && <p id={`${idBase}-error`} className="field-error">Elige un grado de dificultad antes de enviar.</p>}

      <label htmlFor={`${idBase}-comentario`} className="form-label" style={{ marginTop: 10 }}>
        Comentario (opcional)
      </label>
      <textarea
        id={`${idBase}-comentario`}
        className="form-textarea"
        rows={2}
        maxLength={MAX_COMENTARIO}
        value={comentario}
        onChange={e => setComentario(e.target.value)}
        placeholder={tipo === 'test' ? '¿Alguna pregunta confusa o que no esperabas?' : '¿Alguna tarjeta confusa o que falte?'}
        style={{ minHeight: 64 }}
        aria-describedby={`${idBase}-contador`}
      />
      <div className="opinion-pie">
        <span id={`${idBase}-contador`} className="opinion-contador">{comentario.length}/{MAX_COMENTARIO}</span>
        <button type="button" className="btn btn-sm btn-secondary" onClick={enviar} disabled={estado === 'enviando'} aria-busy={estado === 'enviando'}>
          <Send size={13} className={estado === 'enviando' ? 'spin' : undefined} />
          {estado === 'enviando' ? 'Enviando…' : estado === 'error' ? 'Reintentar' : 'Enviar opinión'}
        </button>
      </div>
      {estado === 'error' && (
        <div className="status-msg status-msg--bad" role="alert" style={{ marginTop: 8 }}>
          <AlertCircle size={15} /> <span>No se ha podido enviar tu opinión. {mensaje}</span>
        </div>
      )}
    </div>
  );
};
