import React, { useEffect, useState } from 'react';
import { QfdosTopic } from '../data/qfdosData';
import { useAuth } from '../context/AuthContext';
import { Duda, cargarDudas, enviarDuda, fechaDuda, limpiarDudasLocales, tituloTema } from '../services/dudas';
import { PanelDudasProfesor } from './PanelDudasProfesor';
import { 
  X, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  UserCheck,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface StudentQuestionModalProps {
  topics: QfdosTopic[];
  onClose: () => void;
  /** Profesorado: se avisa al cambiar el número de dudas sin responder. */
  onPendientes?: (n: number) => void;
}

const PROFESOR_EMAIL = 'juandiaz@ugr.es';

export const StudentQuestionModal: React.FC<StudentQuestionModalProps> = ({
  topics,
  onClose,
  onPendientes
}) => {
  const { user, isProfesor } = useAuth();

  // Las dudas se leen del servidor: cada alumno ve las suyas, con la
  // respuesta del profesor cuando la haya, desde cualquier dispositivo.
  const [questionsList, setQuestionsList] = useState<Duda[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);

  const recargar = async () => {
    setCargando(true);
    const r = await cargarDudas();
    if (r.ok) {
      setQuestionsList(r.datos);
      setErrorCarga(null);
    } else {
      setErrorCarga(r.error);
    }
    setCargando(false);
  };

  useEffect(() => {
    limpiarDudasLocales();
    if (!isProfesor) recargar();
  }, []);

  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || 'tema-00');
  const [studentName, setStudentName] = useState(user?.name ?? '');
  const [questionText, setQuestionText] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const topic = topics.find(t => t.id === selectedTopicId);
  const topicTitle = topic ? [topic.number, topic.title].filter(Boolean).join(': ') : 'Tema General';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || enviando) return;

    setEnviando(true);
    setErrorEnvio(null);
    const r = await enviarDuda({
      nombre: studentName.trim(),
      temaId: selectedTopicId,
      temaTitulo: topicTitle,
      pregunta: questionText.trim()
    });
    setEnviando(false);

    if (r.ok) {
      setQuestionsList(prev => [r.datos, ...prev]);
      setQuestionText('');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      // El texto se conserva en el formulario para no perderlo
      setErrorEnvio(r.error);
    }
  };

  /** Alternativa si el servidor falla: la duda, ya redactada, por correo. */
  const enviarPorCorreo = () => {
    const subject = encodeURIComponent(`[QFDOS E] Duda - ${topicTitle}`);
    const body = encodeURIComponent(`${questionText.trim()}\n\n${studentName.trim()} <${user?.email ?? ''}>`);
    window.location.href = `mailto:${PROFESOR_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '820px', height: '85vh' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={20} color="var(--teal-ink)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)' }}>
              {isProfesor ? 'Buzón de dudas · Panel docente' : 'Buzón de Dudas & Consultas Académicas'}
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-outline"><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {isProfesor ? (
            <>
              <PanelDudasProfesor onPendientes={onPendientes} />

              <details>
                <summary style={{ cursor: 'pointer', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Enviar una duda de prueba (como si fueras un alumno)
                </summary>
                <div style={{ marginTop: '10px' }}>
          {/* New Question Form */}
          <div className="qfdos-card card-teal" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '10px' }}>
              Plantear una nueva duda al profesorado de QFDOS
            </h4>

            {isSubmitted && (
              <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--ok-ink)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <CheckCircle2 size={16} /> Duda enviada. El profesor la verá en su panel y la respuesta aparecerá aquí abajo.
              </div>
            )}

            {errorEnvio && (
              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--accent-red)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <AlertTriangle size={16} /> No se ha podido enviar: {errorEnvio}
                <button type="button" onClick={enviarPorCorreo} className="btn btn-sm btn-outline" style={{ fontSize: '0.75rem' }}>
                  Enviar por correo
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2px' }}>
                    Unidad Temática:
                  </label>
                  <select
                    value={selectedTopicId}
                    onChange={e => setSelectedTopicId(e.target.value)}
                    className="form-select"
                  >
                    {topics.map(t => (
                      <option key={t.id} value={t.id}>
                        {[t.number, t.title].filter(Boolean).join(': ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2px' }}>
                    Nombre del Estudiante:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="form-input"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2px' }}>
                  Detalle de la consulta (mecanismo, SAR, examen, termodinámica):
                </label>
                <textarea
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                  className="form-textarea"
                  rows={3}
                  maxLength={4000}
                  placeholder="Escribe aquí tu duda de forma concisa..."
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-secondary" disabled={enviando}>
                  {enviando
                    ? <><RefreshCw size={14} className="spin" /> Enviando…</>
                    : <><Send size={14} /> Enviar Pregunta</>}
                </button>
              </div>
            </form>
          </div>

                </div>
              </details>
            </>
          ) : (
            <>
          {/* New Question Form */}
          <div className="qfdos-card card-teal" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '10px' }}>
              Plantear una nueva duda al profesorado de QFDOS
            </h4>

            {isSubmitted && (
              <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--ok-ink)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <CheckCircle2 size={16} /> Duda enviada. El profesor la verá en su panel y la respuesta aparecerá aquí abajo.
              </div>
            )}

            {errorEnvio && (
              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--accent-red)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <AlertTriangle size={16} /> No se ha podido enviar: {errorEnvio}
                <button type="button" onClick={enviarPorCorreo} className="btn btn-sm btn-outline" style={{ fontSize: '0.75rem' }}>
                  Enviar por correo
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2px' }}>
                    Unidad Temática:
                  </label>
                  <select
                    value={selectedTopicId}
                    onChange={e => setSelectedTopicId(e.target.value)}
                    className="form-select"
                  >
                    {topics.map(t => (
                      <option key={t.id} value={t.id}>
                        {[t.number, t.title].filter(Boolean).join(': ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2px' }}>
                    Nombre del Estudiante:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="form-input"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2px' }}>
                  Detalle de la consulta (mecanismo, SAR, examen, termodinámica):
                </label>
                <textarea
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                  className="form-textarea"
                  rows={3}
                  maxLength={4000}
                  placeholder="Escribe aquí tu duda de forma concisa..."
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-secondary" disabled={enviando}>
                  {enviando
                    ? <><RefreshCw size={14} className="spin" /> Enviando…</>
                    : <><Send size={14} /> Enviar Pregunta</>}
                </button>
              </div>
            </form>
          </div>

          {/* List of Previous Questions & Responses */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={16} color="var(--navy-ink)" />
              Mis consultas ({questionsList.length})
            </h4>

            {cargando && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={14} className="spin" /> Cargando tus consultas…
              </div>
            )}
            {!cargando && errorCarga && (
              <div style={{ fontSize: '0.82rem', color: 'var(--warn-ink)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <AlertTriangle size={14} /> No se han podido cargar tus consultas: {errorCarga}
                <button type="button" onClick={recargar} className="btn btn-sm btn-outline" style={{ fontSize: '0.72rem' }}>Reintentar</button>
              </div>
            )}
            {!cargando && !errorCarga && questionsList.length === 0 && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Todavía no has enviado ninguna consulta.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {questionsList.map(q => (
                <div key={q.id} className="qfdos-card" style={{ padding: '1rem', background: 'var(--surface-alt)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="qfdos-badge badge-navy" style={{ fontSize: '0.7rem' }}>
                      {tituloTema(q.temaTitulo)}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {fechaDuda(q.recibidaEn)}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '4px' }}>
                    «{q.pregunta}»
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    Planteada por: {q.nombre || q.correo}
                  </span>

                  {/* Professor Response */}
                  {q.respuesta ? (
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(30, 58, 138, 0.08)',
                      borderLeft: '3px solid var(--navy)',
                      fontSize: '0.82rem',
                      color: 'var(--text-main)',
                      lineHeight: 1.5
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--navy-ink)', fontWeight: 700, marginBottom: '2px', fontSize: '0.78rem' }}>
                        <UserCheck size={14} /> Respuesta del Profesor (Dr. Juan José Díaz-Mochón):
                      </div>
                      <span style={{ whiteSpace: 'pre-wrap' }}>{q.respuesta}</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warn-ink)', fontSize: '0.75rem' }}>
                      <Clock size={13} /> Pendiente de revisión docente
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

            </>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">
            Cerrar Buzón
          </button>
        </div>

      </div>
    </div>
  );
};
