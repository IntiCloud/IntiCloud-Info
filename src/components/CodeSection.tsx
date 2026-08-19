import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

const codeSnippet = `const project = {
  design: "minimal",
  performance: "optimized",
  responsive: true,
  accessible: true,
  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js"
  ],
  deploy: "vercel",
  tests: "passing",
}

export default project`

const indicators = [
  { label: 'Performance', val: 98, color: '#34D399' },
  { label: 'Responsive', val: 100, color: '#818CF8' },
  { label: 'Accessible', val: 100, color: '#F59E0B' },
  { label: 'Scalable', val: 95, color: '#4F46E5' },
]

function syntaxHighlight(line: string) {
  const key = line.match(/^(\s*)(\w+)(?=:)/)?.[0]
  const isConst = line.startsWith('const') || line.startsWith('export')
  const isString = line.includes('"')
  const isBracket = line.trim() === '{' || line.trim() === '}' || line.trim() === '];' || line.trim() === '],'

  if (isConst) {
    return (
      <span>
        {line.split(' ').map((word, i) => {
          if (word === 'const' || word === 'export' || word === 'default') return <span key={i} style={{ color: '#818CF8' }}>{word} </span>
          return <span key={i} style={{ color: '#34D399' }}>{word} </span>
        })}
      </span>
    )
  }
  if (isBracket) return <span style={{ color: '#E2E8F0' }}>{line}</span>
  if (isString) {
    return (
      <span>
        {line.replace(/("[^"]*")/g, '§$1§').split('§').map((part, i) =>
          part.startsWith('"') ? <span key={i} style={{ color: '#F59E0B' }}>{part}</span> : <span key={i} style={{ color: '#94A3B8' }}>{part}</span>
        )}
      </span>
    )
  }
  if (line.trim() === 'true,' || line.trim() === 'true') return <span><span style={{ color: '#94A3B8' }}>{line.split(':')[0]}: </span><span style={{ color: '#F472B6' }}>true</span>{line.includes(',') ? ',' : ''}</span>
  return <span style={{ color: '#94A3B8' }}>{line}</span>
}

export default function CodeSection() {
  const { ref, visible } = useReveal()
  const { isMobile } = useResponsive()
  const lines = codeSnippet.split('\n')

  return (
    <section ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#0D0F14' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// 08 — CÓDIGO</span>
        </div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#E2E8F0', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 64, maxWidth: 480 }}>
          Código limpio. Productos rápidos.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          {/* Code window */}
          <div style={{ background: '#161A22', borderRadius: 16, overflow: 'hidden', border: '1px solid #252A35', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderBottom: '1px solid #252A35', background: '#0D0F14' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
              <span style={{ marginLeft: 12, fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4B5563' }}>project.config.ts</span>
            </div>
            <div style={{ padding: '24px', fontFamily: 'JetBrains Mono', fontSize: 12.5, lineHeight: 2, overflowX: 'auto' }}>
              {lines.map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, whiteSpace: 'pre' }}>
                  <span style={{ color: '#2D3748', minWidth: 20, textAlign: 'right', userSelect: 'none', flexShrink: 0 }}>{i + 1}</span>
                  <span>{syntaxHighlight(line)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {indicators.map(ind => (
              <div key={ind.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: 15, color: '#E2E8F0' }}>{ind.label}</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: ind.color, fontWeight: 600 }}>{ind.val}</span>
                </div>
                <div style={{ height: 4, background: '#252A35', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${ind.val}%`, background: `linear-gradient(90deg, ${ind.color}80, ${ind.color})`, borderRadius: 4 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '20px', background: '#161A22', borderRadius: 12, border: '1px solid #252A35' }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#34D399', marginBottom: 8 }}>✓ All checks passing</div>
              <div style={{ fontFamily: 'Manrope', fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                Cada proyecto es revisado exhaustivamente antes de entrar en producción.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
