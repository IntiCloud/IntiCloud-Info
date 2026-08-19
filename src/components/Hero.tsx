import { useEffect, useRef, useState } from 'react'
import { useParallax } from '../hooks/useParallax'
import { useResponsive } from '../hooks/useResponsive'
import logoIntiCloud from '../imports/LOGOINTICLOUD.png'

const codeLines = [
  { indent: 0, content: 'const studio = {', color: '#E2E8F0' },
  { indent: 1, content: 'name: "IntiCloud",', color: '#94A3B8' },
  { indent: 1, content: 'focus: "digital products",', color: '#94A3B8' },
  { indent: 1, content: 'stack: ["React", "Next.js", "Node"],', color: '#94A3B8' },
  { indent: 1, content: 'design: "minimal & precise",', color: '#94A3B8' },
  { indent: 1, content: 'performance: "optimized",', color: '#94A3B8' },
  { indent: 1, content: 'responsive: true,', color: '#94A3B8' },
  { indent: 0, content: '}', color: '#E2E8F0' },
  { indent: 0, content: '', color: '' },
  { indent: 0, content: 'export default studio', color: '#818CF8' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const bgRef = useParallax(0.18)
  const [counts, setCounts] = useState([0, 0, 0])
  const { isMobile } = useResponsive()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.1s'
      el.style.opacity = '1'
    })
    const targets = [12, 2, 100]
    targets.forEach((target, i) => {
      const duration = 1200 + i * 200
      const start = performance.now() + 600
      const tick = (now: number) => {
        if (now < start) { requestAnimationFrame(tick); return }
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setCounts(prev => { const next = [...prev]; next[i] = Math.round(ease * target); return next })
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
  }, [])

  return (
    <section
      id="inicio"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '100px 20px 64px' : '120px 24px 80px',
        background: '#F8F9FB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div ref={bgRef as React.RefObject<HTMLDivElement>} style={{
        position: 'absolute', inset: '-10%', pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(79,70,229,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        willChange: 'transform',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isMobile ? '48px' : '64px 80px',
          alignItems: 'center',
        }}>
          {/* Left content */}
          <div style={{ animation: 'fadeUp 0.8s ease both' }}>
            {/* Logo grande */}
            <div style={{ marginBottom: 28 }}>
              <img
                src={logoIntiCloud}
                alt="IntiCloud"
                style={{
                  height: isMobile ? 180 : 260,
                  maxWidth: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.1em', color: '#4F46E5',
              background: '#EEF2FF', padding: '6px 12px', borderRadius: 6,
              marginBottom: 24, flexWrap: 'wrap',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F46E5', flexShrink: 0 }} />
              DESARROLLO WEB · DISEÑO · TECNOLOGÍA
            </div>

            <h1 style={{
              fontFamily: 'Manrope',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: '#111318',
              marginBottom: 20,
            }}>
              Construimos experiencias digitales que hacen crecer ideas.
            </h1>

            <p style={{
              fontFamily: 'Manrope',
              fontSize: 'clamp(15px, 2vw, 18px)',
              lineHeight: 1.7,
              color: '#626873',
              marginBottom: 36,
            }}>
              Somos dos desarrolladores web enfocados en crear sitios, aplicaciones y experiencias digitales modernas, rápidas y funcionales.
            </p>

            <div className="hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 52 }}>
              <a
                href="#proyectos"
                style={{
                  fontFamily: 'Manrope', fontWeight: 600, fontSize: 15,
                  color: '#111318', background: '#fff', border: '1.5px solid #E5E7EB',
                  padding: '13px 24px', borderRadius: 10, textDecoration: 'none',
                  transition: 'border-color 0.2s, transform 0.15s', flex: isMobile ? '1' : 'none',
                  textAlign: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4F46E5'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Ver nuestros proyectos
              </a>
              <a
                href="#contacto"
                style={{
                  fontFamily: 'Manrope', fontWeight: 600, fontSize: 15,
                  color: '#fff', background: '#4F46E5',
                  padding: '13px 24px', borderRadius: 10, textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.15s', flex: isMobile ? '1' : 'none',
                  textAlign: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4338CA'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Trabajemos juntos →
              </a>
            </div>

            <div className="counter-row" style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
              {[
                [counts[0] + '+', 'Proyectos'],
                [counts[1], 'Developers'],
                [counts[2] + '%', 'Responsive'],
              ].map(([num, label]) => (
                <div key={label as string}>
                  <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 22, color: '#111318', letterSpacing: '-0.5px' }}>{num}</div>
                  <div style={{ fontFamily: 'Manrope', fontSize: 12, color: '#626873', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code window — hidden on mobile */}
          {!isMobile && (
            <div className="hero-code-col" style={{ animation: 'fadeUp 0.8s ease 0.2s both', position: 'relative' }}>
              <div style={{
                background: '#0D0F14',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderBottom: '1px solid #252A35', background: '#161A22' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
                  <span style={{ marginLeft: 12, fontFamily: 'JetBrains Mono', fontSize: 12, color: '#4B5563' }}>studio.ts</span>
                </div>
                <div style={{ padding: '24px', fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.8 }}>
                  {codeLines.map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16 }}>
                      <span style={{ color: '#2D3748', minWidth: 20, textAlign: 'right', userSelect: 'none' }}>{i + 1}</span>
                      <span style={{ color: line.color, paddingLeft: line.indent * 16 }}>{line.content}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                    <span style={{ color: '#2D3748', minWidth: 20, textAlign: 'right', userSelect: 'none' }}>{codeLines.length + 1}</span>
                    <span><span className="cursor-blink" style={{ display: 'inline-block', width: 8, height: 15, background: '#4F46E5', verticalAlign: 'middle' }} /></span>
                  </div>
                </div>
                <div style={{ margin: '0 20px 20px', background: '#161A22', borderRadius: 10, padding: '16px', border: '1px solid #252A35' }}>
                  <div style={{ fontFamily: 'Manrope', fontSize: 11, color: '#4B5563', marginBottom: 10, fontWeight: 600, letterSpacing: '0.08em' }}>PREVIEW</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    {['React', 'TypeScript', 'Tailwind'].map(tag => (
                      <span key={tag} style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#818CF8', background: 'rgba(79,70,229,0.12)', padding: '3px 8px', borderRadius: 4 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ height: 4, background: '#252A35', borderRadius: 4, marginBottom: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '92%', background: 'linear-gradient(90deg, #4F46E5, #818CF8)', borderRadius: 4 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#4B5563' }}>Performance</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#34D399' }}>98 / 100</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="floating-badge float-anim" style={{
                position: 'absolute', right: -16, top: '30%',
                background: '#fff', border: '1px solid #E5E7EB',
                borderRadius: 10, padding: '10px 14px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', gap: 8,
                pointerEvents: 'none',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399' }} />
                <span style={{ fontFamily: 'Manrope', fontSize: 12, fontWeight: 600, color: '#111318' }}>Deploy en producción</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48, animation: 'fadeIn 1s 1s ease both' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#626873', letterSpacing: '0.08em' }}>Scroll para explorar ↓</span>
        </div>
      </div>
    </section>
  )
}
