import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'
import jneScreenshot from '../imports/image-1.png'
import puchismoScreenshot from '../imports/image-2.png'
import ProjectModal from './ProjectModal'

const projects = [
  {
    id: 1,
    name: 'Caja Fuerte',
    category: 'Plataforma SaaS · Educación',
    desc: 'Plataforma de educación digital con entrega segura de contenido en video, sistema de suscripción con planes diferenciados y arquitectura serverless escalable.',
    tags: ['Astro', 'Svelte', 'Firebase', 'Bunny.net CDN'],
    color: '#4F46E5',
    link: 'https://caja-fuerte-2aefe.web.app/',
    bg: 'https://images.unsplash.com/photo-1597933471507-1ca5765185d8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=800&h=500&q=80',
  },
  {
    id: 3,
    name: 'IEI037 Santa Rosa',
    category: 'Education Management System',
    desc: 'Sistema integral para institución de educación inicial. Paneles para admin, docentes y apoderados: matrícula, asistencia, calificaciones por competencias y 213 tests unitarios.',
    tags: ['React 19', 'TypeScript', 'Firebase', 'Vitest'],
    color: '#F59E0B',
    link: 'https://iei037santarosaaa.web.app/',
    bg: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=800&h=500&q=80',
  },
  {
    id: 4,
    name: 'Puchismo Streamer Platform',
    category: 'Gamificación · Tiempo Real',
    desc: 'Plataforma interactiva de gamificación para comunidad de streamer. Chat WebSocket, sistema de puntos automático, tienda de recompensas con stock dinámico y panel admin.',
    tags: ['Next.js 14', 'TypeScript', 'Supabase', 'WebSockets'],
    color: '#8B5CF6',
    link: 'https://puchismo.vercel.app/',
    bg: puchismoScreenshot,
  },
  {
    id: 5,
    name: 'Proyecto de Mejoramiento de Pagina del JNE - Perú, TuvotoInformado',
    category: 'EdTech · Simulador 3D / RA',
    desc: 'Plataforma bilingüe (ES/Quechua) de educación cívica con simulador 3D inmersivo, comparador de candidatos, reconocimiento de voz y Realidad Aumentada. WCAG 2.1 AA/AAA.',
    tags: ['React 18', 'Three.js', 'GSAP', 'WebXR'],
    color: '#EC4899',
    link: 'https://interaccionhm.vercel.app/',
    bg: jneScreenshot,
  },
]

export default function Projects() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()
  const [hovered, setHovered] = useState<number | null>(null)
  const [activeModal, setActiveModal] = useState<number | null>(null)

  const activeProject = activeModal !== null ? projects.find(p => p.id === activeModal) : null

  return (
    <>
      <section id="proyectos" ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 05 — PROYECTOS</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15 }}>
              Proyectos seleccionados.
            </h2>
            <a href="#contacto" style={{ fontFamily: 'Manrope', fontSize: 14, fontWeight: 600, color: '#4F46E5', textDecoration: 'none', borderBottom: '1.5px solid #4F46E5', paddingBottom: 2 }}>
              Trabajemos juntos →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="project-card"
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', cursor: 'pointer', border: `1.5px solid ${hovered === proj.id ? proj.color : '#E5E7EB'}`, background: '#F8F9FB', transition: 'border-color 0.2s' }}
              >
                {/* Image */}
                <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <img
                    className="project-img"
                    src={proj.bg}
                    alt={proj.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', display: 'block' }}
                  />
                  <div
                    className="project-overlay"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(13,15,20,0.78)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap',
                      opacity: 0, transition: 'opacity 0.3s',
                      padding: '0 16px',
                    }}
                  >
                    <button
                      onClick={() => setActiveModal(proj.id)}
                      style={{
                        fontFamily: 'Manrope', fontWeight: 700, fontSize: 13, color: '#fff',
                        background: proj.color, border: 'none',
                        padding: '9px 18px', borderRadius: 8, cursor: 'pointer',
                      }}
                    >
                      Ver detalles
                    </button>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 13, color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)', padding: '8px 16px', borderRadius: 8, textDecoration: 'none' }}>
                        Ver en vivo ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600,
                      color: proj.color, background: `${proj.color}15`,
                      padding: '3px 8px', borderRadius: 4, letterSpacing: '0.06em',
                    }}>
                      {proj.category}
                    </span>
                    {proj.link && (
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#34D399', background: 'rgba(52,211,153,0.1)', padding: '3px 8px', borderRadius: 4 }}>● live</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, color: '#111318', marginBottom: 8, letterSpacing: '-0.3px', lineHeight: 1.35 }}>{proj.name}</h3>
                  <p style={{ fontFamily: 'Manrope', fontSize: 13, color: '#626873', lineHeight: 1.65, marginBottom: 16 }}>{proj.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {proj.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#626873', background: '#F0F1F4', padding: '3px 8px', borderRadius: 4 }}>{tag}</span>
                    ))}
                  </div>
                  {/* Ver detalles button */}
                  <button
                    onClick={() => setActiveModal(proj.id)}
                    style={{
                      fontFamily: 'Manrope', fontWeight: 600, fontSize: 12,
                      color: proj.color, background: `${proj.color}0f`,
                      border: `1.5px solid ${proj.color}30`,
                      padding: '7px 14px', borderRadius: 7, cursor: 'pointer',
                      transition: 'background 0.2s, border-color 0.2s',
                      width: '100%',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${proj.color}1a`; e.currentTarget.style.borderColor = proj.color }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${proj.color}0f`; e.currentTarget.style.borderColor = `${proj.color}30` }}
                  >
                    Ver detalles →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeModal !== null && activeProject && (
        <ProjectModal
          projectId={activeModal}
          projectName={activeProject.name}
          projectColor={activeProject.color}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  )
}
