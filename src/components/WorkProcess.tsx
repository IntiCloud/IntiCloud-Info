import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

const steps = [
  {
    num: '01', label: 'Idea',
    desc: 'Escuchamos tu visión, entendemos el problema y definimos el alcance del proyecto.',
    preview: (
      <div style={{ fontFamily: 'Manrope', fontSize: 13, color: '#94A3B8', lineHeight: 1.8 }}>
        <div style={{ background: '#161A22', borderRadius: 8, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', marginBottom: 8 }}>Brief inicial</div>
          <div style={{ color: '#E2E8F0', fontSize: 14 }}>¿Cuál es el objetivo principal?</div>
          <div style={{ marginTop: 8, background: '#0D0F14', borderRadius: 6, padding: '8px 12px', color: '#626873', fontSize: 13 }}>
            Crear una plataforma para gestión de clientes...
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Alcance', 'Audiencia', 'Objetivos', 'Timeline'].map(t => (
            <span key={t} style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#818CF8', background: 'rgba(79,70,229,0.12)', padding: '4px 8px', borderRadius: 4 }}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '02', label: 'Diseño',
    desc: 'Diseñamos wireframes, prototipos y el sistema visual en Figma antes de escribir código.',
    preview: (
      <div>
        <div style={{ background: '#161A22', borderRadius: 8, padding: '16px' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', marginBottom: 12 }}>Figma — Mockup</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8, marginBottom: 8 }}>
            <div style={{ background: '#252A35', borderRadius: 6, height: 60 }} />
            <div style={{ background: '#252A35', borderRadius: 6, height: 60 }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ flex: 1, height: 4, background: '#4F46E5', borderRadius: 4 }} />
            <div style={{ flex: 2, height: 4, background: '#252A35', borderRadius: 4 }} />
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            <div style={{ width: 32, height: 16, background: '#4F46E5', borderRadius: 3 }} />
            <div style={{ width: 48, height: 16, background: '#252A35', borderRadius: 3 }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '03', label: 'Desarrollo',
    desc: 'Implementamos con las mejores tecnologías y buenas prácticas de código.',
    preview: (
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.8 }}>
        <div><span style={{ color: '#818CF8' }}>const</span> <span style={{ color: '#34D399' }}>App</span> <span style={{ color: '#E2E8F0' }}>= () =&gt; {'{'}</span></div>
        <div style={{ paddingLeft: 12 }}><span style={{ color: '#818CF8' }}>return</span> <span style={{ color: '#F472B6' }}>&lt;Dashboard</span></div>
        <div style={{ paddingLeft: 24 }}><span style={{ color: '#94A3B8' }}>data</span>=<span style={{ color: '#E2E8F0' }}>{'{data}'}</span></div>
        <div style={{ paddingLeft: 12 }}><span style={{ color: '#F472B6' }}>/&gt;</span></div>
        <div><span style={{ color: '#E2E8F0' }}>{'}'}</span></div>
        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
          {['✓ Tests passing', '✓ Build OK'].map(t => (
            <span key={t} style={{ fontSize: 10, color: '#34D399', background: 'rgba(52,211,153,0.1)', padding: '2px 8px', borderRadius: 4 }}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '04', label: 'Testing',
    desc: 'Pruebas exhaustivas en distintos dispositivos y navegadores antes del lanzamiento.',
    preview: (
      <div>
        {[
          { label: 'Unit Tests', val: 100, color: '#34D399' },
          { label: 'Integration', val: 94, color: '#818CF8' },
          { label: 'Performance', val: 98, color: '#F59E0B' },
          { label: 'Accessibility', val: 100, color: '#34D399' },
        ].map(item => (
          <div key={item.label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>
              <span>{item.label}</span>
              <span style={{ color: item.color }}>{item.val}%</span>
            </div>
            <div style={{ height: 4, background: '#252A35', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${item.val}%`, background: item.color, borderRadius: 4, transition: 'width 0.6s' }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '05', label: 'Deploy',
    desc: 'Desplegamos en producción con CI/CD, monitoreo y documentación lista.',
    preview: (
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 2, color: '#94A3B8' }}>
        <div><span style={{ color: '#34D399' }}>✓</span> Build completed</div>
        <div><span style={{ color: '#34D399' }}>✓</span> Tests passed (48/48)</div>
        <div><span style={{ color: '#34D399' }}>✓</span> Deployed to Vercel</div>
        <div style={{ marginTop: 8, background: '#161A22', borderRadius: 6, padding: '8px 12px' }}>
          <span style={{ color: '#4F46E5' }}>https://</span><span style={{ color: '#E2E8F0' }}>proyecto.vercel.app</span>
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399', marginTop: 2 }} />
          <span style={{ color: '#34D399' }}>Live in production</span>
        </div>
      </div>
    ),
  },
]

export default function WorkProcess() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#F8F9FB' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 04 — PROCESO</span>
        </div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 56 }}>
          Así trabajamos.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
          {/* Step selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: active === i ? '#fff' : 'transparent',
                  boxShadow: active === i ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s', textAlign: 'left',
                  borderLeft: `3px solid ${active === i ? '#4F46E5' : 'transparent'}`,
                }}
              >
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: active === i ? '#4F46E5' : '#626873', fontWeight: 600, minWidth: 24 }}>{step.num}</span>
                <span style={{ fontFamily: 'Manrope', fontSize: 16, fontWeight: active === i ? 700 : 500, color: active === i ? '#111318' : '#626873', transition: 'color 0.2s' }}>{step.label}</span>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div style={{ background: '#0D0F14', borderRadius: 16, padding: '36px', border: '1px solid #252A35', animation: 'fadeIn 0.25s ease' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', marginBottom: 12 }}>{steps[active].num} — {steps[active].label.toUpperCase()}</div>
            <p style={{ fontFamily: 'Manrope', fontSize: 15, color: '#94A3B8', lineHeight: 1.7, marginBottom: 28 }}>{steps[active].desc}</p>
            <div style={{ borderTop: '1px solid #252A35', paddingTop: 24 }}>
              {steps[active].preview}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
