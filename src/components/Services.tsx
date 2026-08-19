import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

const services = [
  { num: '01', title: 'Sistemas Web', desc: 'Aplicaciones web escalables y personalizadas: plataformas SaaS, dashboards, intranets y portales a medida.', icon: '⬡' },
  { num: '02', title: 'Landing Pages', desc: 'Sitios de conversión optimizados para capturar leads y presentar tu propuesta de valor de forma impactante.', icon: '◈' },
  { num: '03', title: 'Prototipado', desc: 'Wireframes y MVPs rápidos para validar ideas antes de invertir en desarrollo completo.', icon: '◉' },
  { num: '04', title: 'Aplicaciones Móviles', desc: 'Apps iOS, Android e híbridas diseñadas para ofrecer la mejor experiencia en cualquier dispositivo.', icon: '◫' },
  { num: '05', title: 'Automatizaciones', desc: 'Flujos de trabajo automatizados, integraciones entre sistemas y bots que eliminan tareas repetitivas.', icon: '⬕' },
  { num: '06', title: 'Shopify · Laravel · WordPress', desc: 'Tiendas Shopify, backends robustos en Laravel y sitios CMS en WordPress + Elementor a medida.', icon: '◎' },
  { num: '07', title: 'E-commerce', desc: 'Tiendas online completas con pasarelas de pago, gestión de inventario y experiencia de compra optimizada.', icon: '⬢' },
  { num: '08', title: 'Consultoría Digital', desc: 'Asesoría técnica y estratégica en arquitectura, stack tecnológico, optimización y hoja de ruta de producto.', icon: '◑' },
  { num: '09', title: 'Mantenimiento & Soporte', desc: 'Soporte técnico continuo, actualizaciones, corrección de bugs y monitoreo de rendimiento de tus proyectos.', icon: '◐' },
]

export default function Services() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()
  const [hovered, setHovered] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible || !gridRef.current) return
    const children = gridRef.current.querySelectorAll('.stagger-child')
    children.forEach(el => el.classList.add('visible'))
  }, [visible])

  return (
    <section id="servicios" ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#F8F9FB' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 02 — SERVICIOS</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
          <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15, maxWidth: 480 }}>
            Lo que podemos construir.
          </h2>
          <p style={{ fontFamily: 'Manrope', fontSize: 16, color: '#626873', maxWidth: 340, lineHeight: 1.7 }}>
            Soluciones digitales completas, desde el concepto hasta el producto final.
          </p>
        </div>

        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0, border: '1.5px solid #E5E7EB', borderRadius: 16, overflow: 'hidden' }}>
          {services.map((s, i) => (
            <div
              className="stagger-child"
              key={s.num}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '36px 32px',
                borderRight: (i % 3 !== 2) ? '1px solid #E5E7EB' : 'none',
                borderBottom: (i < 6) ? '1px solid #E5E7EB' : 'none',
                background: hovered === i ? '#fff' : 'transparent',
                transition: 'background 0.2s',
                cursor: 'default',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: hovered === i ? '#4F46E5' : '#626873', fontWeight: 600, letterSpacing: '0.08em', transition: 'color 0.2s' }}>{s.num}</span>
                <span style={{ fontSize: 20, color: hovered === i ? '#4F46E5' : '#E5E7EB', transition: 'color 0.2s' }}>{s.icon}</span>
              </div>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 18, color: '#111318', marginBottom: 10, letterSpacing: '-0.3px' }}>{s.title}</h3>
              <p style={{ fontFamily: 'Manrope', fontSize: 14, color: '#626873', lineHeight: 1.65 }}>{s.desc}</p>
              {hovered === i && (
                <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 3, background: 'linear-gradient(90deg, #4F46E5, #818CF8)', borderRadius: '0 0 0 0' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
