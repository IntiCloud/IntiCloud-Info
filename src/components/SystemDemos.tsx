import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'
import CrudDemo from './demos/CrudDemo'
import TestingDemo from './demos/TestingDemo'
import WebhooksDemo from './demos/WebhooksDemo'
import AuthDemo from './demos/AuthDemo'
import ApiDemo from './demos/ApiDemo'
import DatabaseDemo from './demos/DatabaseDemo'

const tabs = [
  { id: 'crud', label: 'CRUD', icon: '⊞', color: '#818CF8', desc: 'Gestión de entidades' },
  { id: 'testing', label: 'Testing', icon: '✓', color: '#34D399', desc: 'Suite de pruebas' },
  { id: 'webhooks', label: 'Webhooks', icon: '⚡', color: '#F59E0B', desc: 'Eventos en tiempo real' },
  { id: 'auth', label: 'Auth JWT', icon: '⟳', color: '#4F46E5', desc: 'Autenticación segura' },
  { id: 'api', label: 'REST API', icon: '↗', color: '#06B6D4', desc: 'Explorer interactivo' },
  { id: 'db', label: 'Database', icon: '⬡', color: '#F472B6', desc: 'Query runner SQL' },
]

export default function SystemDemos() {
  const { ref, visible } = useReveal()
  const [active, setActive] = useState('crud')
  const { isMobile } = useResponsive()
  const current = tabs.find(t => t.id === active)!

  return (
    <section ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#0D0F14' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// DEMOS DE SISTEMAS</span>
        </div>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#E2E8F0', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 12 }}>
            Sistemas que construimos.
          </h2>
          <p style={{ fontFamily: 'Manrope', fontSize: 16, color: '#4B5563', maxWidth: 480, lineHeight: 1.7 }}>
            Demos interactivos de los patrones técnicos más comunes. Pruébalos en tiempo real.
          </p>
        </div>

        {/* Tabs — scrollable row on mobile, grid on desktop */}
        {isMobile ? (
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 24, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  flexShrink: 0,
                  background: active === tab.id ? tab.color : '#161A22',
                  border: `1px solid ${active === tab.id ? tab.color : '#252A35'}`,
                  borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
                  transition: 'all 0.2s', textAlign: 'center',
                  boxShadow: active === tab.id ? `0 4px 12px ${tab.color}30` : 'none',
                }}
              >
                <div style={{ fontSize: 16, marginBottom: 4, color: active === tab.id ? '#0D0F14' : tab.color }}>{tab.icon}</div>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 12, color: active === tab.id ? '#0D0F14' : '#E2E8F0', whiteSpace: 'nowrap' }}>{tab.label}</div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 32 }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  background: active === tab.id ? tab.color : '#161A22',
                  border: `1px solid ${active === tab.id ? tab.color : '#252A35'}`,
                  borderRadius: 10, padding: '12px 10px', cursor: 'pointer',
                  transition: 'all 0.2s', textAlign: 'center',
                  transform: active === tab.id ? 'translateY(-2px)' : 'none',
                  boxShadow: active === tab.id ? `0 8px 20px ${tab.color}30` : 'none',
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 6, color: active === tab.id ? '#0D0F14' : tab.color }}>{tab.icon}</div>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 12, color: active === tab.id ? '#0D0F14' : '#E2E8F0', marginBottom: 3 }}>{tab.label}</div>
                <div style={{ fontFamily: 'Manrope', fontSize: 10, color: active === tab.id ? 'rgba(0,0,0,0.6)' : '#4B5563' }}>{tab.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* Demo panel */}
        <div style={{
          background: '#0D0F14', borderRadius: 16,
          border: `1px solid ${current.color}25`,
          overflow: 'hidden',
          boxShadow: `0 0 60px ${current.color}08`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: '#161A22', borderBottom: `1px solid ${current.color}20`, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
            </div>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: current.color }}>{current.icon}</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4B5563' }}>{current.label.toLowerCase()}-demo.tsx</span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', position: 'relative' }} className="ping-dot" />
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#34D399' }}>interactive</span>
            </div>
          </div>

          <div key={active} style={{ padding: isMobile ? '20px 16px' : '28px', animation: 'fadeIn 0.2s ease', position: 'relative', minHeight: 320 }}>
            {active === 'crud' && <CrudDemo />}
            {active === 'testing' && <TestingDemo />}
            {active === 'webhooks' && <WebhooksDemo />}
            {active === 'auth' && <AuthDemo />}
            {active === 'api' && <ApiDemo />}
            {active === 'db' && <DatabaseDemo />}
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {['Código real ejecutable', 'Patrones de producción', 'Stack moderno', 'Buenas prácticas'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#34D399', fontSize: 12 }}>✓</span>
              <span style={{ fontFamily: 'Manrope', fontSize: 13, color: '#4B5563' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
