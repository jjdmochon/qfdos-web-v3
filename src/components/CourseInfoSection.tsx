import React, { useState } from 'react';
import {
  COURSE_GENERAL_INFO,
  COURSE_EVALUATION_GUIDE,
  ACADEMIC_CALENDAR_EVENTS,
  AcademicCalendarEvent
} from '../data/courseInfoData';
import { descargarIcs } from '../services/calendarioIcs';
import { CalendarioClassroom } from './CalendarioClassroom';
import {
  Calendar, Clock, MapPin, Mail, ExternalLink, BookOpen,
  Sparkles, CheckCircle2, AlertCircle, FileText,
  HelpCircle, ChevronRight, UserCheck, ShieldCheck,
  Building, Video, Users, Info, Award, AlertTriangle, Scale, Download,
  GraduationCap
} from 'lucide-react';

export const CourseInfoSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedSemester, setSelectedSemester] = useState<string>('todos');
  const [activeTab, setActiveTab] = useState<'info' | 'evaluacion' | 'calendario' | 'tutorias'>('info');

  const { subject, teachingStaff, classSchedule, examSchedule, tutoring, links } = COURSE_GENERAL_INFO;

  // Filtrado de eventos de calendario
  const filteredEvents = ACADEMIC_CALENDAR_EVENTS.filter(event => {
    const matchCategory = selectedCategory === 'todos' || event.category === selectedCategory;
    const matchSemester =
      selectedSemester === 'todos' ||
      event.semester === 'anual' ||
      (selectedSemester === '1' && event.semester === 1) ||
      (selectedSemester === '2' && event.semester === 2);
    return matchCategory && matchSemester;
  })
    // Se ordena aquí y no en el fichero de datos: así añadir un evento nuevo
    // no obliga a colocarlo en su sitio exacto dentro del array.
    .sort((a, b) => a.date.localeCompare(b.date));

  const getCategoryBadge = (category: AcademicCalendarEvent['category']) => {
    switch (category) {
      case 'docencia':
        return <span className="qfdos-badge badge-teal" style={{ fontSize: '0.68rem' }}>Docencia</span>;
      case 'festivo':
        return <span className="qfdos-badge badge-red" style={{ fontSize: '0.68rem' }}>Festivo / No lectivo</span>;
      case 'examen':
        return <span className="qfdos-badge badge-purple" style={{ fontSize: '0.68rem', background: '#9333ea', color: '#fff' }}>Exámenes</span>;
      case 'sin_docencia':
        return <span className="qfdos-badge badge-amber" style={{ fontSize: '0.68rem' }}>Sin Docencia</span>;
      case 'acta':
        return <span className="qfdos-badge badge-mint" style={{ fontSize: '0.68rem' }}>Límite Actas</span>;
      default:
        return <span className="qfdos-badge badge-navy" style={{ fontSize: '0.68rem' }}>Evento</span>;
    }
  };

  const formatDate = (dateStr: string, endDateStr?: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const d1 = new Date(dateStr + 'T00:00:00');
    const formattedD1 = d1.toLocaleDateString('es-ES', options);

    if (endDateStr) {
      const d2 = new Date(endDateStr + 'T00:00:00');
      const formattedD2 = d2.toLocaleDateString('es-ES', options);
      return `${formattedD1} — ${formattedD2}`;
    }
    return formattedD1;
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span className="qfdos-badge badge-navy" style={{ fontSize: '0.74rem' }}>
              {subject.code}
            </span>
            <span className="qfdos-badge badge-teal" style={{ fontSize: '0.74rem' }}>
              {subject.credits} • {subject.year}
            </span>
            <span className="qfdos-badge" style={{ background: '#047857', color: '#ffffff', fontSize: '0.74rem', fontWeight: 700 }}>
              {subject.group}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <BookOpen size={24} color="var(--navy-ink)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-title)', letterSpacing: '-0.02em', margin: 0 }}>
              {subject.name}
            </h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.3rem 0 1rem 0', maxWidth: '720px' }}>
            {subject.degree} • {subject.faculty} • {subject.university}. 
            Coordinación e información docente oficial, horarios de aula, tutorías presenciales y online, y calendario académico completo.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={links.geminiNotebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-teal"
              style={{
                fontWeight: 800,
                fontSize: '0.82rem',
                padding: '8px 16px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
            >
              <Sparkles size={15} /> Gemini Notebook Oficial del Curso
            </a>
            <a
              href={links.teachingGuide}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline"
              style={{
                fontWeight: 700,
                fontSize: '0.82rem',
                padding: '8px 16px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
            >
              <BookOpen size={15} /> Guía Docente UGR
            </a>
          </div>
        </div>

        {/* Tarjeta de horario rápido */}
        <div className="qfdos-card" style={{
          padding: '1.1rem 1.25rem',
          minWidth: '260px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-color)',
          background: 'var(--surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            <Clock size={15} color="var(--teal)" /> HORARIO DE CLASE (GRUPO E)
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)' }}>
            {classSchedule.room}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '4px' }}>
            {classSchedule.frequency}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '6px', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
            📍 Facultad de Farmacia · Cartuja
          </div>
        </div>
      </div>

      {/* Selector de Pestañas Interiores */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--border-color)', marginBottom: '1.75rem', paddingBottom: '0.2rem', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveTab('info')}
          className={`btn ${activeTab === 'info' ? 'btn-navy' : 'btn-ghost'}`}
          style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <Info size={16} /> Información General & Horarios
        </button>
        <button
          onClick={() => setActiveTab('evaluacion')}
          className={`btn ${activeTab === 'evaluacion' ? 'btn-navy' : 'btn-ghost'}`}
          style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <FileText size={16} /> Sistema de Evaluación (Oficial)
        </button>
        <button
          onClick={() => setActiveTab('tutorias')}
          className={`btn ${activeTab === 'tutorias' ? 'btn-navy' : 'btn-ghost'}`}
          style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <Users size={16} /> Horarios de Tutorías
        </button>
        <button
          onClick={() => setActiveTab('calendario')}
          className={`btn ${activeTab === 'calendario' ? 'btn-navy' : 'btn-ghost'}`}
          style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <Calendar size={16} /> Calendario Académico & Fechas Clave
        </button>
      </div>

      {/* PESTAÑA 1: INFORMACIÓN GENERAL & HORARIOS */}
      {activeTab === 'info' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Card: Clases Teóricas */}
          <div className="qfdos-card card-navy">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={22} color="var(--navy-ink)" />
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                  Clases Teóricas Presenciales
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Grupo E · Turno de Tarde</span>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {classSchedule.sessions.map((s, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  background: 'var(--surface-alt)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="qfdos-badge badge-navy" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                      {s.day}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-title)' }}>
                      {s.time}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal-ink)' }}>
                    {s.room}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '0.5rem', background: 'var(--neutral-bg)', padding: '10px', borderRadius: '8px' }}>
              📌 <strong>Ubicación:</strong> Aula 7 (Edificio Principal de la Facultad de Farmacia, Campus de Cartuja).
            </div>
          </div>

          {/* Card: Profesorado y Contacto */}
          <div className="qfdos-card card-teal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UserCheck size={22} color="var(--teal-ink)" />
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                  Profesorado Responsable
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cátedra de Química Farmacéutica</span>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', padding: '12px 14px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-title)' }}>
                {teachingStaff.coordinator}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--teal-ink)', fontWeight: 600, marginTop: '2px' }}>
                {teachingStaff.role}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.84rem' }}>
                <Mail size={14} color="var(--text-muted)" />
                <a href={`mailto:${teachingStaff.email}`} style={{ color: 'var(--navy-ink)', fontWeight: 700 }}>
                  {teachingStaff.email}
                </a>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '0.25rem', background: 'var(--neutral-bg)', padding: '10px', borderRadius: '8px' }}>
              🔬 <strong>Cátedra e Investigación:</strong> Dpto. de Química Farmacéutica y Orgánica (Facultad de Farmacia, Cartuja) y Grupo de Investigación en Centro GENYO (PTS Granada).
            </div>
          </div>

          {/* Card: Desarrollo Tecnológico y Plataforma — NEXUS.LAB */}
          <div className="qfdos-card" style={{ borderLeft: '3px solid #00bcd4', background: 'var(--surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(0, 188, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00bcd4' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                  Desarrollo de la Plataforma
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ingeniería Digital & Algoritmia Biofísica</span>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', padding: '12px 14px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-title)' }}>
                  NEXUS<span style={{ color: 'var(--teal-ink)' }}>.LAB</span>
                </span>
                <span className="qfdos-badge badge-teal" style={{ fontSize: '0.65rem' }}>Tech Partner</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '4px' }}>
                Plataforma interactiva diseñada y desarrollada por <strong>NEXUS.LAB</strong>. Sinergia académico-industrial para la docencia en farmacia, algoritmia biofísica y quimioinformática.
              </div>
              <div style={{ marginTop: '10px' }}>
                <a
                  href="https://nexus-lab-team.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--navy-ink)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <span>Conocer más sobre NEXUS.LAB</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '0.25rem', background: 'var(--neutral-bg)', padding: '10px', borderRadius: '8px' }}>
              🌐 <strong>Web Oficial:</strong> <a href="https://nexus-lab-team.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-ink)', fontWeight: 700 }}>nexus-lab-team.netlify.app</a>
            </div>
          </div>

          {/* Card: Calendario Oficial de Exámenes (Teoría) - Rediseño Editorial de Alta Gama */}
          <div className="qfdos-card card-navy" style={{ gridColumn: '1 / -1', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.12), rgba(13, 148, 136, 0.12))', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '1px solid rgba(30, 58, 138, 0.2)'
                }}>
                  <Calendar size={26} color="var(--navy-ink)" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="qfdos-badge badge-navy" style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      CONVOCATORIAS OFICIALES
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Curso 2026/2027</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)', margin: '4px 0 0 0', letterSpacing: '-0.02em' }}>
                    Calendario Oficial de Exámenes (Teoría QFDOS)
                  </h3>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(13, 148, 136, 0.08)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(13, 148, 136, 0.25)' }}>
                <ShieldCheck size={16} color="var(--teal-ink)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal-ink)' }}>
                  Aprobación con mín. 5,0 en Bloque Teórico
                </span>
              </div>
            </div>

            {/* Grid de Eventos / Exámenes con diseño visual moderno */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {examSchedule.map((ex, idx) => {
                const isFinal = ex.tipo.includes('Ordinaria') || ex.tipo.includes('Final');
                const isParcial = ex.tipo.includes('Parcial');
                const isEspecial = ex.tipo.includes('Especial');
                const accentBorder = isFinal 
                  ? 'var(--navy)' 
                  : isParcial 
                  ? 'var(--teal)' 
                  : isEspecial 
                  ? '#d97706' 
                  : 'var(--purple-border, #9333ea)';
                const accentBg = isFinal 
                  ? 'rgba(30, 58, 138, 0.04)' 
                  : isParcial 
                  ? 'rgba(13, 148, 136, 0.04)' 
                  : isEspecial 
                  ? 'rgba(217, 119, 6, 0.05)' 
                  : 'rgba(147, 51, 234, 0.04)';

                return (
                  <div 
                    key={idx}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border-color)',
                      borderTop: `4px solid ${accentBorder}`,
                      borderRadius: '12px',
                      padding: '1.35rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    {/* Header de la tarjeta */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '0.75rem' }}>
                        <span 
                          className={`qfdos-badge badge-${ex.badgeColor}`} 
                          style={{ fontSize: '0.72rem', padding: '4px 10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}
                        >
                          {ex.caracter}
                        </span>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 800, 
                          color: 'var(--text-title)', 
                          background: accentBg, 
                          padding: '3px 8px', 
                          borderRadius: '6px',
                          border: `1px solid ${accentBorder}33`
                        }}>
                          Ponderación: {ex.ponderacion}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>
                        {ex.tipo}
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
                        {ex.observaciones}
                      </p>
                    </div>

                    {/* Footer con Fecha y Hora */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '6px', 
                      paddingTop: '0.85rem', 
                      borderTop: '1px dashed var(--border-color)',
                      fontSize: '0.84rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-title)' }}>
                        <Calendar size={15} color={accentBorder} />
                        <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          {ex.fecha}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                        <Clock size={15} color="var(--text-muted)" />
                        <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                          {ex.hora}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card: Gemini NotebookLM y Recursos IA */}
          <div className="qfdos-card card-purple" style={{ gridColumn: '1 / -1', padding: '1.5rem 1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', maxWidth: '820px' }}>
                <div style={{ background: '#f3e8ff', padding: '12px', borderRadius: '12px', flexShrink: 0, marginTop: '2px' }}>
                  <Sparkles size={26} color="#9333ea" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="qfdos-badge" style={{ background: '#9333ea', color: '#ffffff', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      ASISTENTE INTELIGENTE DOCENTE
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Grado en Farmacia · UGR</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', margin: '2px 0 6px 0', letterSpacing: '-0.01em' }}>
                    Gemini NotebookLM: Información General & Guía Docente QFDOS
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                    Espacio interactivo de consulta documental alimentado con la <strong>Información General (administrativa) del Grado de Farmacia (Curso 2026/2027)</strong> y la <strong>Guía Docente oficial de QFDOS</strong>: distribución de aulas, calendario académico y de patrona, códigos de asignaturas, convocatorias oficiales de exámenes y horarios de docencia.
                  </p>
                </div>
              </div>

              <a
                href={links.geminiNotebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
                style={{
                  background: '#9333ea',
                  borderColor: '#9333ea',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  padding: '10px 18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(147, 51, 234, 0.25)',
                  whiteSpace: 'nowrap'
                }}
              >
                <ExternalLink size={15} /> Abrir Gemini NotebookLM
              </a>
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA: SISTEMA DE EVALUACIÓN OFICIAL (GUÍA DOCENTE) */}
      {activeTab === 'evaluacion' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Criterio General Uniforme Banner */}
          <div className="qfdos-card" style={{
            background: 'linear-gradient(135deg, rgba(30,58,138,0.07) 0%, rgba(13,148,136,0.05) 100%)',
            borderLeft: '5px solid var(--navy)',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Scale size={24} color="var(--navy-ink)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                Criterios Generales de Evaluación y Calificación (UGR)
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, margin: '0 0 10px 0' }}>
              {COURSE_EVALUATION_GUIDE.criterioMinimoUniforme}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a
                href={COURSE_EVALUATION_GUIDE.normativaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <ExternalLink size={13} /> Normativa Oficial de Evaluación UGR
              </a>
              <span className="qfdos-badge badge-teal" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                Aprobación con nota mínima de 5 en cada bloque
              </span>
            </div>
          </div>

          {/* 1. MODALIDAD DE EVALUACIÓN CONTINUA (PREFERENTE) */}
          <div className="qfdos-card card-teal" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className="qfdos-badge badge-mint" style={{ fontSize: '0.74rem', fontWeight: 800, marginBottom: '4px' }}>
                  MODALIDAD PREFERENTE
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-title)', margin: 0 }}>
                  1. Evaluación Continua (Convocatoria Ordinaria)
                </h3>
              </div>
              <span style={{ fontSize: '0.84rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--teal-ink)' }}>
                TOTAL: 100%
              </span>
            </div>

            {/* Tabla 1: Desglose de Porcentajes */}
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)', margin: '0.5rem 0 0.75rem 0' }}>
              Tabla 1. Sistemas de evaluación y porcentajes sobre la calificación final:
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {COURSE_EVALUATION_GUIDE.tabla1Continua.map((item, idx) => {
                const cardAccentColors = ['#1a2b4c', '#0d9488', '#059669', '#7c3aed'];
                const accentColor = cardAccentColors[idx % cardAccentColors.length];
                const rawCodes = item.codigos.split(/,\s*|\s+y\s+/).filter(Boolean);

                return (
                  <div key={idx} style={{
                    padding: '1.2rem',
                    background: 'var(--surface-alt)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    borderTop: `4px solid ${accentColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minWidth: 0
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <strong style={{ fontSize: '0.98rem', color: 'var(--text-title)', lineHeight: 1.3 }}>{item.sistema}</strong>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: accentColor, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                          {item.porcentaje}%
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '6px 0 10px 0' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', marginRight: '2px' }}>
                          Códigos:
                        </span>
                        {rawCodes.map((cod, cIdx) => (
                          <span
                            key={cIdx}
                            style={{
                              fontSize: '0.66rem',
                              padding: '1px 5px',
                              borderRadius: '4px',
                              background: 'var(--surface)',
                              color: 'var(--text-title)',
                              fontWeight: 700,
                              border: '1px solid var(--border-color)'
                            }}
                          >
                            {cod.trim()}
                          </span>
                        ))}
                      </div>

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                        {item.descripcion}
                      </p>
                    </div>

                    <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '0.74rem', fontWeight: 700, color: accentColor }}>
                      • {item.caracter}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Normas Teóricas y Prácticas de Evaluación Continua */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--navy-ink)', marginBottom: '6px' }}>
                  I. Teoría (Examen Parcial + Examen Final):
                </h5>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                  {COURSE_EVALUATION_GUIDE.ordinariaDetalle.teoria}
                </p>
              </div>

              <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--teal-ink)', marginBottom: '6px' }}>
                  II. Prácticas de Laboratorio (Superación Obligatoria):
                </h5>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                  {COURSE_EVALUATION_GUIDE.ordinariaDetalle.practicas}
                </p>
              </div>
            </div>
          </div>

          {/* 2. CONVOCATORIAS OFICIALES: EXTRAORDINARIA, ÚNICA FINAL Y ESPECIAL DE NOVIEMBRE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            
            {/* 2. Convocatoria Extraordinaria */}
            <div className="qfdos-card card-purple" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Award size={20} color="#9333ea" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                    2. Evaluación Extraordinaria
                  </h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {COURSE_EVALUATION_GUIDE.extraordinariaDetalle.resumen}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  {/* Parte Teórica */}
                  <div style={{ padding: '10px', background: 'var(--surface-alt)', borderRadius: '6px', fontSize: '0.82rem' }}>
                    <strong style={{ color: 'var(--text-title)' }}>Parte Teórica (100% en Acta):</strong> {COURSE_EVALUATION_GUIDE.extraordinariaDetalle.teoria}
                  </div>

                  {/* Régimen de Prácticas según situación */}
                  <div style={{ padding: '10px', background: 'var(--surface-alt)', borderRadius: '6px' }}>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--text-title)', display: 'block', marginBottom: '6px' }}>
                      Parte Práctica (según situación previa del estudiante):
                    </strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {COURSE_EVALUATION_GUIDE.extraordinariaDetalle.casosPracticas.map((caso, idx) => (
                        <div key={idx} style={{
                          padding: '7px 9px',
                          background: 'var(--surface)',
                          borderRadius: '5px',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.78rem',
                          lineHeight: 1.4
                        }}>
                          <div style={{ fontWeight: 700, color: '#9333ea', marginBottom: '2px' }}>
                            {caso.titulo}:
                          </div>
                          <div style={{ color: 'var(--text-main)' }}>
                            {caso.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', background: 'rgba(147,51,234,0.06)', padding: '8px 10px', borderRadius: '6px', borderLeft: '3px solid #9333ea', marginTop: '12px' }}>
                ⚠️ <strong>Calificación en acta:</strong> {COURSE_EVALUATION_GUIDE.extraordinariaDetalle.calificacionFinal}
              </div>
            </div>

            {/* 3. Evaluación Única Final */}
            <div className="qfdos-card card-amber" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <AlertTriangle size={20} color="var(--accent-amber)" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                    3. Evaluación Única Final
                  </h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {COURSE_EVALUATION_GUIDE.unicaFinalDetalle.solicitud}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  {COURSE_EVALUATION_GUIDE.unicaFinalDetalle.partes.map((p, i) => (
                    <div key={i} style={{ padding: '10px', background: 'var(--surface-alt)', borderRadius: '6px', fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--text-title)' }}>{p.parte}:</strong> {p.desc}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', background: 'rgba(245,158,11,0.08)', padding: '8px 10px', borderRadius: '6px', borderLeft: '3px solid var(--accent-amber)', marginTop: '12px' }}>
                📌 <strong>Solicitud:</strong> Procedimiento electrónico al Director/a de Departamento en las 2 primeras semanas.
              </div>
            </div>

            {/* 4. Convocatoria Especial de Noviembre (Finalización de Estudios) */}
            <div className="qfdos-card card-teal" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={22} color="var(--teal-ink)" />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                      4. Especial de Noviembre
                    </h3>
                  </div>
                  <span className="qfdos-badge" style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontWeight: 800, fontSize: '0.72rem' }}>
                    Finalización Grado
                  </span>
                </div>

                <div style={{ background: 'rgba(13, 148, 136, 0.08)', border: '1px solid rgba(13, 148, 136, 0.25)', borderRadius: '6px', padding: '8px 10px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--teal-ink)' }}>
                    📅 Solicitud: {COURSE_EVALUATION_GUIDE.especialNoviembreDetalle.plazoSolicitud}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Vía Sede Electrónica UGR (sede.ugr.es)
                  </div>
                </div>

                <p style={{ fontSize: '0.81rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.45 }}>
                  {COURSE_EVALUATION_GUIDE.especialNoviembreDetalle.requisitos}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  {COURSE_EVALUATION_GUIDE.especialNoviembreDetalle.partes.map((p, i) => (
                    <div key={i} style={{ padding: '10px', background: 'var(--surface-alt)', borderRadius: '6px', fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--text-title)' }}>{p.parte}:</strong> {p.desc}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', background: 'rgba(13, 148, 136, 0.06)', padding: '8px 10px', borderRadius: '6px', borderLeft: '3px solid var(--teal-ink)', marginBottom: '10px', marginTop: '12px' }}>
                  🎓 <strong>Fecha examen oficial:</strong> {COURSE_EVALUATION_GUIDE.especialNoviembreDetalle.fechaExamen} (según llamamiento de Facultad).
                </div>

                <a
                  href={COURSE_EVALUATION_GUIDE.especialNoviembreDetalle.sedeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ExternalLink size={13} /> Sede Electrónica UGR · Convocatoria Noviembre
                </a>
              </div>
            </div>

          </div>

          {/* 5. EVALUACIÓN POR INCIDENCIAS (ART. 9 NORMATIVA UGR) */}
          <div className="qfdos-card card-navy" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={22} color="var(--navy-ink)" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                    5. Evaluación por Incidencias (Artículo 9 Normativa UGR)
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Procedimiento reglado mediante Registro Electrónico de la Universidad de Granada
                  </span>
                </div>
              </div>

              <a
                href={COURSE_EVALUATION_GUIDE.sedeIncidenciasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ExternalLink size={13} /> Sede Electrónica UGR · Solicitud de Incidencias
              </a>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              Las solicitudes se presentan por impreso en Secretaría o telemáticamente en Sede Electrónica. Tras la resolución positiva del Departamento, 
              el alumno/a dispone de un <strong>plazo máximo de 12 días naturales</strong> para contactar por correo electrónico con el profesor/a y el Director/a de Departamento.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
              {COURSE_EVALUATION_GUIDE.incidencias.map((inc, i) => (
                <div key={i} style={{ padding: '12px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  {/* «Incidencia N» es corto y fijo, así que se ancla él y es el
                      plazo el que envuelve. Sin gap las dos cadenas se tocaban. */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 10px', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.86rem', color: 'var(--navy-ink)', whiteSpace: 'nowrap', flexShrink: 0 }}>{inc.inc}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 0, overflowWrap: 'anywhere' }}>
                      Plazo: {inc.plazo}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-title)', fontWeight: 600, margin: '2px 0 4px 0' }}>
                    {inc.motivo}
                  </p>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    📄 Justificante: {inc.doc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. CÓDIGOS DE SISTEMAS DE EVALUACIÓN (TABLA 2) */}
          <div className="qfdos-card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '10px' }}>
              Tabla 2. Códigos informativos de los distintos sistemas de evaluación de la Guía Docente:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
              {COURSE_EVALUATION_GUIDE.tabla2Codigos.map((cod, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                  <span className="qfdos-badge badge-teal" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '1px 5px', flexShrink: 0 }}>
                    {cod.codigo}
                  </span>
                  <span style={{ color: 'var(--text-main)' }}>{cod.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA: HORARIOS DE TUTORÍAS */}
      {activeTab === 'tutorias' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="qfdos-card card-teal" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
              <Users size={24} color="var(--teal-ink)" />
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                  Horario Semanal de Tutorías (Dr. Juan José Díaz-Mochón)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Atención personalizada para resolución de dudas teóricas, estequiometría de laboratorio y seguimiento académico.
                </p>
              </div>
            </div>

            {/* Franjas Horarias */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {tutoring.hours.map((h, i) => (
                <div key={i} style={{
                  padding: '1.2rem',
                  background: 'var(--surface-alt)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}>
                  <span className="qfdos-badge badge-teal" style={{ fontSize: '0.78rem', fontWeight: 800, marginBottom: '6px' }}>
                    {h.day}
                  </span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--navy-ink)', marginTop: '4px' }}>
                    {h.time}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Franja Oficial de Atención</span>
                </div>
              ))}
            </div>

            {/* Sedes y Modalidades */}
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', marginTop: '1.75rem', marginBottom: '0.75rem' }}>
              Modalidades y Sedes de Realización:
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              
              {/* Sede 1: Farmacia */}
              <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Building size={18} color="var(--navy-ink)" />
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-title)' }}>1. Facultad de Farmacia</strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Departamento de Química Farmacéutica y Orgánica, Facultad de Farmacia, Campus Universitario de Cartuja, Granada.
                </p>
              </div>

              {/* Sede 2: Centro GENYO */}
              <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <MapPin size={18} color="var(--teal-ink)" />
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-title)' }}>2. Centro GENYO (PTS)</strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Centro de Genómica e Investigación Oncológica, Parque Tecnológico de la Salud (PTS), Avda. de la Ilustración 114, 18016 Granada.
                </p>
              </div>

              {/* Sede 3: Online */}
              <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Video size={18} color="#059669" />
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-title)' }}>3. Online (Google Meet)</strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Sesión telemática individual o en pequeño grupo mediante Google Meet previa concertación.
                </p>
              </div>

            </div>

            {/* Protocolo de Solicitud */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(217,119,6,0.04) 100%)',
              borderLeft: '4px solid var(--accent-amber)',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--accent-amber)', fontSize: '0.9rem', marginBottom: '4px' }}>
                <AlertCircle size={18} /> Protocolo de Organización de Tutorías
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', margin: '0 0 8px 0', lineHeight: 1.55 }}>
                {tutoring.instruction}
              </p>
              <a
                href={`mailto:${teachingStaff.email}?subject=Solicitud%20de%20Tutor%C3%ADa%20QFDOS%20-%20[Nombre%20y%20Apellidos]&body=Estimado%20Profesor%20Juan%20Jos%C3%A9%20D%C3%ADaz-Moch%C3%B3n,%0A%0ASoy%20estudiante%20de%20Qu%C3%ADmica%20Farmac%C3%A9utica%20II%20(Grupo%20E).%20Quisiera%20solicitar%20una%20tutor%C3%ADa%20para%20tratar%20la%20siguiente%20consulta:%0A%0A[Indicar%20brevemente%20el%20motivo]%0A%0AModalidad%20preferida:%20[Farmacia%20Cartuja%20/%20GENYO%20PTS%20/%20Google%20Meet]%0AD%C3%ADa%20y%20franja%20propuesta:%20[Lunes/Martes/Jueves%2015:00-17:00]%0A%0AMuchas%20gracias.`}
                className="btn btn-sm btn-outline"
                style={{ fontWeight: 700, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Mail size={14} /> Redactar Correo de Solicitud de Tutoría
              </a>
            </div>

          </div>

        </div>
      )}

      {/* PESTAÑA 3: CALENDARIO ACADÉMICO & FECHAS CLAVE */}
      {activeTab === 'calendario' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <CalendarioClassroom />
          
          {/* Cabecera y Filtros del Calendario */}
          <div className="qfdos-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>
                  Calendario Académico Grado en Farmacia (Curso 2026/2027)
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  Aprobado por el Consejo de Gobierno de la Universidad de Granada y adaptado a la Facultad de Farmacia.
                </p>

                {/* Consultar el calendario no basta: para que avise, tiene que
                    estar en la agenda que ya se mira cada dia. */}
                <button
                  onClick={() => descargarIcs(filteredEvents)}
                  className="btn btn-sm btn-secondary"
                  style={{ marginTop: 10, fontWeight: 700 }}
                  title="Descargar para Google Calendar, Outlook o el movil"
                >
                  <Download size={14} /> Añadir a mi calendario ({filteredEvents.length} eventos + clases)
                </button>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '5px 0 0 0', maxWidth: '56ch', lineHeight: 1.5 }}>
                  Descarga un fichero .ics y ábrelo: se añade a Google Calendar, Outlook o el móvil.
                  Incluye <strong>las clases de lunes, martes y jueves a las 17:00 h en el Aula 7</strong>,
                  ya descontados los festivos, y los exámenes con su hora oficial. Los exámenes avisan
                  el día antes y una hora antes; las clases, 30 minutos antes.
                </p>
              </div>

              {/* Filtros */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <select
                  value={selectedSemester}
                  onChange={e => setSelectedSemester(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.82rem', padding: '6px 10px', borderRadius: '6px' }}
                >
                  <option value="todos">Todos los Semestres</option>
                  <option value="1">1.er Semestre (QFDOS)</option>
                  <option value="2">2.º Semestre</option>
                </select>

                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.82rem', padding: '6px 10px', borderRadius: '6px' }}
                >
                  <option value="todos">Todas las Categorías</option>
                  <option value="docencia">Docencia & Clases</option>
                  <option value="festivo">Festivos & No Lectivos</option>
                  <option value="examen">Periodos de Exámenes</option>
                  <option value="sin_docencia">Sin Docencia (Vacaciones)</option>
                  <option value="acta">Límites de Actas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Timeline de Hitos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredEvents.map(event => (
              <div
                key={event.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '14px 18px',
                  background: event.important ? 'var(--surface)' : 'var(--surface-alt)',
                  borderRadius: 'var(--radius-md)',
                  border: event.important ? '2px solid var(--teal)' : '1px solid var(--border-color)',
                  boxShadow: event.important ? 'var(--shadow-sm)' : 'none',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: '130px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: event.important ? 'var(--teal)' : 'var(--text-title)',
                    paddingTop: '2px'
                  }}>
                    {formatDate(event.date, event.endDate)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '0.94rem', color: 'var(--text-title)' }}>
                        {event.title}
                      </strong>
                      {getCategoryBadge(event.category)}
                      {event.semester === 1 && (
                        <span className="qfdos-badge badge-navy" style={{ fontSize: '0.62rem' }}>1.er Semestre</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                      {event.description}
                    </p>
                  </div>
                </div>

                {event.important && (
                  <span className="qfdos-badge badge-teal" style={{ fontSize: '0.7rem', fontWeight: 800 }}>
                    ⭐ Fecha Clave QFDOS
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Enlaces de descarga oficiales */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Fuentes oficiales: DGE UGR, Calendario de Grado UGR 2026/2027 y Delegación de Estudiantes de Farmacia.
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={links.dgeCalendar}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.78rem' }}
              >
                <ExternalLink size={12} /> Calendario DGE Oficial
              </a>
              <a
                href={links.facultyCalendar}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.78rem' }}
              >
                <ExternalLink size={12} /> Web Facultad de Farmacia
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
