import { useEffect } from 'react'
import { useResponsive } from '../hooks/useResponsive'
import { projectDetails } from '../data/projectDetails'

type Props = {
  projectId: number
  projectName: string
  projectColor: string
  onClose: () => void
}

export default function ProjectModal({ projectId, projectName, projectColor, onClose }: Props) {
  const { isMobile } = useResponsive()
  const detail = projectDetails[projectId]

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  if (!detail) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '16px' : '32px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0D0F14',
          border: '1px solid #252A35',
          borderRadius: 18,
          width: '100%',
          maxWidth: 780,
          maxHeight: isMobile ? '92vh' : '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
          animation: 'scaleIn 0.25s ease',
        }}
      >
        {/* Header */}
        <div style={{
          padding: isMobile ? '20px 20px 16px' : '28px 36px 20px',
          borderBottom: '1px solid #252A35',
          flexShrink: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: projectColor, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 8 }}>
              DETALLES DEL PROYECTO
            </div>
            <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: isMobile ? 18 : 24, color: '#E2E8F0', letterSpacing: '-0.5px', lineHeight: 1.25, margin: 0 }}>
              {projectName}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#161A22', border: '1px solid #252A35',
              borderRadius: 8, width: 36, height: 36, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#626873', fontSize: 18, flexShrink: 0,
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#E2E8F0'; e.currentTarget.style.borderColor = '#4F46E5' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#626873'; e.currentTarget.style.borderColor = '#252A35' }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', flex: 1, padding: isMobile ? '20px' : '28px 36px' }}>
          {/* Description */}
          <p style={{
            fontFamily: 'Manrope', fontSize: 15, color: '#94A3B8', lineHeight: 1.75,
            marginBottom: 32, borderLeft: `3px solid ${projectColor}`,
            paddingLeft: 16,
          }}>
            {detail.description}
          </p>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {detail.sections.map((section, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 600,
                  color: projectColor, letterSpacing: '0.08em',
                  marginBottom: 12, textTransform: 'uppercase',
                }}>
                  {section.title}
                </div>
                {section.content && (
                  <p style={{ fontFamily: 'Manrope', fontSize: 14, color: '#94A3B8', lineHeight: 1.7, marginBottom: section.items ? 12 : 0 }}>
                    {section.content}
                  </p>
                )}
                {section.items && (
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{
                        fontFamily: 'Manrope', fontSize: 13, color: '#94A3B8', lineHeight: 1.6,
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '8px 12px', background: '#161A22', borderRadius: 8,
                        border: '1px solid #1E2330',
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Stack */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #252A35' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 600, color: '#4B5563', letterSpacing: '0.08em', marginBottom: 12 }}>
              STACK TECNOLÓGICO
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {detail.stack.split(' · ').map(tag => (
                <span key={tag} style={{
                  fontFamily: 'JetBrains Mono', fontSize: 11, color: projectColor,
                  background: `${projectColor}12`, border: `1px solid ${projectColor}30`,
                  padding: '4px 10px', borderRadius: 5,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        {detail.link && (
          <div style={{
            padding: isMobile ? '16px 20px' : '20px 36px',
            borderTop: '1px solid #252A35', flexShrink: 0,
            display: 'flex', justifyContent: 'flex-end', gap: 12,
          }}>
            <button
              onClick={onClose}
              style={{
                fontFamily: 'Manrope', fontWeight: 600, fontSize: 14,
                color: '#626873', background: 'none', border: '1px solid #252A35',
                padding: '10px 20px', borderRadius: 9, cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#4B5563'; e.currentTarget.style.color = '#94A3B8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#252A35'; e.currentTarget.style.color = '#626873' }}
            >
              Cerrar
            </button>
            <a
              href={detail.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Manrope', fontWeight: 700, fontSize: 14,
                color: '#fff', background: projectColor,
                padding: '10px 24px', borderRadius: 9, textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.15s',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Ver página ↗
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
