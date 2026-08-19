import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

const metrics = [
  { value: '98', label: 'Performance', unit: '/100', color: '#34D399' },
  { value: '100%', label: 'Responsive', unit: '', color: '#818CF8' },
  { value: '0.8s', label: 'Load Time', unit: '', color: '#F59E0B' },
  { value: 'A+', label: 'Accessibility', unit: '', color: '#4F46E5' },
]

export default function FeaturedProject() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()

  return (
    <section ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#F8F9FB' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 06 — DESTACADO</span>
        </div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 48, maxWidth: 600 }}>
          Un vistazo a lo que podemos construir.
        </h2>

        {/* Big preview */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid #E5E7EB', marginBottom: 32, background: '#0D0F14', position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&auto=format"
            alt="Featured project preview"
            style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block', opacity: 0.7 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,15,20,0.8) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 32, left: 40 }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#818CF8', marginBottom: 8 }}>Dashboard Pro — [PROYECTO 1]</div>
            <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-0.3px' }}>Diseño + Desarrollo + Performance</div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 36, color: m.color, letterSpacing: '-1px', marginBottom: 4 }}>
                {m.value}<span style={{ fontSize: 18 }}>{m.unit}</span>
              </div>
              <div style={{ fontFamily: 'Manrope', fontSize: 13, color: '#626873', fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
