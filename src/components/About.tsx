import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

const tags = ['2 Developers', 'Web Development', 'UI / UX', 'Modern Stack', 'Responsive by default', 'Performance First']

export default function About() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()

  return (
    <section id="nosotros" ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 01 — NOSOTROS</span>
        </div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 64, maxWidth: 640 }}>
          Dos desarrolladores. Una misma obsesión: construir bien.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <p style={{ fontFamily: 'Manrope', fontSize: 17, lineHeight: 1.75, color: '#626873', marginBottom: 24 }}>
              Somos un equipo de dos desarrolladores con una visión compartida: crear productos digitales que no solo funcionen bien, sino que se vean y sientan excepcionales.
            </p>
            <p style={{ fontFamily: 'Manrope', fontSize: 17, lineHeight: 1.75, color: '#626873', marginBottom: 40 }}>
              Combinamos nuestra experiencia en frontend, backend y diseño de interfaces para entregar soluciones completas, desde la idea inicial hasta el producto en producción.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="#proyectos" style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: 14, color: '#4F46E5', textDecoration: 'none', borderBottom: '1.5px solid #4F46E5', paddingBottom: 2, transition: 'opacity 0.2s' }}>
                Ver nuestro trabajo →
              </a>
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
              {tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'Manrope', fontSize: 13, fontWeight: 600, color: '#111318',
                  background: '#F8F9FB', border: '1.5px solid #E5E7EB',
                  padding: '8px 14px', borderRadius: 8,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Developer cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  name: 'Omaly Aguilar', role: 'Arquitecto y Desarrollador Full-Stack', initials: 'OA',
                  github: 'https://github.com/icarius4iu',
                  linkedin: 'https://www.linkedin.com/in/omalyaguilardev/',
                },
                {
                  name: 'Fabrizio León', role: 'Desarrollador Full-Stack', initials: 'FL',
                  github: 'https://github.com/FabrizeOo',
                  linkedin: 'https://www.linkedin.com/in/fabrizioleonp',
                },
              ].map(dev => (
                <div
                  key={dev.name}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    background: '#F8F9FB', border: '1.5px solid #E5E7EB',
                    borderRadius: 12, padding: '16px 20px',
                    transition: 'border-color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4F46E5'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Manrope', fontWeight: 700, fontSize: 14, color: '#fff',
                    flexShrink: 0,
                  }}>
                    {dev.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 14, color: '#111318' }}>{dev.name}</div>
                    <div style={{ fontFamily: 'Manrope', fontSize: 12, color: '#626873', marginTop: 2 }}>{dev.role}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600,
                      color: '#626873', background: '#fff', border: '1px solid #E5E7EB',
                      padding: '4px 8px', borderRadius: 5, cursor: 'pointer', textDecoration: 'none',
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#4F46E5'; e.currentTarget.style.borderColor = '#4F46E5' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#626873'; e.currentTarget.style.borderColor = '#E5E7EB' }}
                    >
                      GitHub
                    </a>
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600,
                      color: '#626873', background: '#fff', border: '1px solid #E5E7EB',
                      padding: '4px 8px', borderRadius: 5, cursor: 'pointer', textDecoration: 'none',
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#0077B5'; e.currentTarget.style.borderColor = '#0077B5' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#626873'; e.currentTarget.style.borderColor = '#E5E7EB' }}
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
