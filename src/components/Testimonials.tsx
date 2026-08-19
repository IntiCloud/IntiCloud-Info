import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

const testimonials = [
  {
    text: "Trabajar con este equipo fue una experiencia excepcional. Entregaron el proyecto antes del plazo, con un nivel de detalle y calidad que superó todas nuestras expectativas.",
    name: '[NOMBRE DEL CLIENTE 1]',
    role: 'CEO',
    company: '[EMPRESA 1]',
    initials: 'C1',
    color: '#4F46E5',
  },
  {
    text: "La comunicación fue impecable durante todo el proceso. El producto final es exactamente lo que necesitábamos: rápido, elegante y perfectamente adaptado a nuestra marca.",
    name: '[NOMBRE DEL CLIENTE 2]',
    role: 'Product Manager',
    company: '[EMPRESA 2]',
    initials: 'C2',
    color: '#0EA5E9',
  },
  {
    text: "No solo construyeron el sitio, sino que también nos orientaron en las decisiones técnicas más importantes. Profesionales, creativos y muy buenos en lo que hacen.",
    name: '[NOMBRE DEL CLIENTE 3]',
    role: 'Fundador',
    company: '[EMPRESA 3]',
    initials: 'C3',
    color: '#10B981',
  },
]

export default function Testimonials() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()

  return (
    <section ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#F8F9FB' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 09 — TESTIMONIOS</span>
        </div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 64 }}>
          Lo que dicen nuestros clientes.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '32px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontFamily: 'Manrope', fontSize: 24, color: t.color, marginBottom: 20, lineHeight: 1 }}>"</div>
              <p style={{ fontFamily: 'Manrope', fontSize: 15, color: '#626873', lineHeight: 1.75, marginBottom: 28, fontStyle: 'italic' }}>
                {t.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #F0F1F4', paddingTop: 20 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}80 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Manrope', fontWeight: 700, fontSize: 13, color: '#fff', flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 14, color: '#111318' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Manrope', fontSize: 12, color: '#626873' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
