import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

const stages = [
  { num: '01', title: 'Discovery', desc: 'Entendemos tu negocio, usuarios y objetivos para definir la dirección correcta.' },
  { num: '02', title: 'Planning', desc: 'Estructuramos el proyecto, definimos el stack y creamos el roadmap técnico.' },
  { num: '03', title: 'Design', desc: 'Diseñamos cada pantalla y componente en Figma con atención al detalle.' },
  { num: '04', title: 'Development', desc: 'Construimos el producto con código limpio, escalable y bien documentado.' },
  { num: '05', title: 'Launch', desc: 'Desplegamos en producción, monitorizamos y entregamos con documentación.' },
]

export default function ProcessTimeline() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()

  return (
    <section ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 07 — PROCESO</span>
        </div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 72 }}>
          De la idea al producto.
        </h2>

        {/* Desktop: horizontal | Mobile: vertical via flex-wrap */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line (desktop) */}
          <div className="hidden md:block" style={{ position: 'absolute', top: 28, left: '10%', right: '10%', height: 1, background: '#E5E7EB', zIndex: 0 }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
            {stages.map((stage, i) => (
              <div key={stage.num} style={{ flex: '1 1 160px', position: 'relative', zIndex: 1 }}>
                {/* Circle */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: i === 0 ? '#4F46E5' : '#fff',
                    border: `2px solid ${i === 0 ? '#4F46E5' : '#E5E7EB'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 600,
                    color: i === 0 ? '#fff' : '#626873',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.borderColor = '#4F46E5'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => {
                      if (i !== 0) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#626873' }
                    }}
                  >
                    {stage.num}
                  </div>
                </div>
                <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 18, color: '#111318', marginBottom: 10, letterSpacing: '-0.3px' }}>{stage.title}</h3>
                <p style={{ fontFamily: 'Manrope', fontSize: 14, color: '#626873', lineHeight: 1.65 }}>{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
