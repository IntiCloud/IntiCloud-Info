import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

const groups = [
  {
    label: 'Frontend',
    techs: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Astro', 'Svelte', 'Angular', 'Vue', 'Flutter', 'Tailwind CSS', 'GSAP', 'Three.js', 'WebXR'],
  },
  {
    label: 'Backend',
    techs: ['Node.js', 'Express', 'Laravel', 'Python', 'Spring Boot', 'Quarkus', 'APIs REST', 'Firebase Cloud Functions', 'WebSockets'],
  },
  {
    label: 'Base de datos',
    techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase Firestore', 'Supabase', 'Realtime Database', 'MariaDB', 'Oracle Database', 'Microsoft SQL Server'],
  },
  {
    label: 'Plataformas & CMS',
    techs: ['Shopify', 'WordPress', 'Elementor', 'Vercel', 'Netlify', 'Bunny.net CDN', 'AWS', 'Digital Ocean', 'VPS Propios', 'GCP', 'Firebase'],
  },
  {
    label: 'Testing & Herramientas',
    techs: ['Vitest', 'Playwright', 'Postman', 'Git', 'GitHub', 'Figma', 'VS Code', 'TypeScript'],
  },
]

export default function TechStack() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()

  return (
    <section id="tecnologias" ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 03 — TECNOLOGÍAS</span>
        </div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 16, maxWidth: 560 }}>
          Las herramientas detrás de nuestro trabajo.
        </h2>
        <p style={{ fontFamily: 'Manrope', fontSize: 17, color: '#626873', marginBottom: 64, maxWidth: 480, lineHeight: 1.7 }}>
          No solo las conocemos. Las utilizamos para construir productos reales.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {groups.map(group => (
            <div key={group.label}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 16 }}>
                {group.label.toUpperCase()}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.techs.map(tech => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'Manrope', fontSize: 13, fontWeight: 600,
                      color: '#111318',
                      background: '#F8F9FB',
                      border: '1.5px solid #E5E7EB',
                      padding: '8px 14px', borderRadius: 8,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
