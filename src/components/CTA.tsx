import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

export default function CTA() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()

  return (
    <section ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#0D0F14', position: 'relative', overflow: 'hidden' }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(79,70,229,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.06) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(79,70,229,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.12em', color: '#818CF8',
          background: 'rgba(79,70,229,0.12)', padding: '6px 12px', borderRadius: 6,
          marginBottom: 32,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399' }} />
          DISPONIBLES PARA NUEVOS PROYECTOS
        </div>

        <h2 style={{
          fontFamily: 'Manrope', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 64px)',
          color: '#F1F5F9', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 24,
        }}>
          ¿Tienes una idea?<br />Hagámosla realidad.
        </h2>

        <p style={{ fontFamily: 'Manrope', fontSize: 18, color: '#94A3B8', lineHeight: 1.7, marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
          Cuéntanos qué quieres construir y veamos cómo podemos convertirlo en una experiencia digital.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#contacto"
            style={{
              fontFamily: 'Manrope', fontWeight: 700, fontSize: 15,
              color: '#fff', background: '#4F46E5',
              padding: '16px 32px', borderRadius: 10, textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4338CA'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Empezar un proyecto →
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'Manrope', fontWeight: 600, fontSize: 15,
              color: '#94A3B8', background: 'transparent',
              padding: '16px 32px', borderRadius: 10, textDecoration: 'none',
              border: '1.5px solid #252A35',
              transition: 'border-color 0.2s, color 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#4F46E5'; e.currentTarget.style.color = '#E2E8F0'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#252A35'; e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Ver GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
