import { useResponsive } from '../hooks/useResponsive'
import logoIntiCloud from '../imports/LOGOINTICLOUD.png'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Contacto', href: '#contacto' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/icarius4iu' },
  { label: 'LinkedIn — Omaly', href: 'https://www.linkedin.com/in/omalyaguilardev/' },
  { label: 'LinkedIn — Fabrizio', href: 'https://www.linkedin.com/in/fabrizioleonp' },
]

export default function Footer() {
  const { isMobile } = useResponsive()
  return (
    <footer style={{ background: '#0D0F14', padding: isMobile ? '48px 20px 24px' : '64px 24px 32px', borderTop: '1px solid #252A35' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <img
              src={logoIntiCloud}
              alt="IntiCloud"
              style={{ height: 80, width: 'auto', objectFit: 'contain', mixBlendMode: 'screen', display: 'block', marginBottom: 16 }}
            />
            <p style={{ fontFamily: 'Manrope', fontSize: 14, color: '#4B5563', lineHeight: 1.7, maxWidth: 260 }}>
              Diseñamos y desarrollamos productos digitales modernos.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.1em', marginBottom: 20, fontWeight: 600 }}>NAVEGACIÓN</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(link => (
                <a key={link.label} href={link.href} style={{ fontFamily: 'Manrope', fontSize: 14, color: '#4B5563', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.1em', marginBottom: 20, fontWeight: 600 }}>REDES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Manrope', fontSize: 14, color: '#4B5563', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.1em', marginBottom: 20, fontWeight: 600 }}>CONTACTO</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="mailto:aguilaromaly@gmail.com" style={{ fontFamily: 'Manrope', fontSize: 14, color: '#4B5563', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}>
                aguilaromaly@gmail.com
              </a>
              <a href="https://wa.me/51994285303" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Manrope', fontSize: 14, color: '#4B5563', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}>
                +51 994 285 303
              </a>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#34D399', marginTop: 8 }}>● Disponibles para proyectos</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #252A35', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'Manrope', fontSize: 13, color: '#4B5563' }}>
            © 2026 IntiCloud. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
