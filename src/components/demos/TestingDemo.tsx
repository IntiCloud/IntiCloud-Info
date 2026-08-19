import { useState, useRef } from 'react'

type TestResult = { name: string; status: 'pending' | 'running' | 'pass' | 'fail'; duration?: number; file: string }

const suites: TestResult[] = [
  { name: 'should create a new user', file: 'users.test.ts', status: 'pending' },
  { name: 'should return 401 without token', file: 'auth.test.ts', status: 'pending' },
  { name: 'should validate email format', file: 'validation.test.ts', status: 'pending' },
  { name: 'should hash password on save', file: 'users.test.ts', status: 'pending' },
  { name: 'should generate JWT on login', file: 'auth.test.ts', status: 'pending' },
  { name: 'should paginate results correctly', file: 'api.test.ts', status: 'pending' },
  { name: 'should handle 404 gracefully', file: 'api.test.ts', status: 'pending' },
  { name: 'should invalidate expired tokens', file: 'auth.test.ts', status: 'pending' },
  { name: 'renders Button with correct props', file: 'Button.test.tsx', status: 'pending' },
  { name: 'applies hover styles correctly', file: 'Button.test.tsx', status: 'pending' },
  { name: 'calls onClick handler once', file: 'Button.test.tsx', status: 'pending' },
]

const outcomes: ('pass' | 'fail')[] = ['pass','pass','pass','pass','pass','pass','pass','pass','pass','fail','pass']

export default function TestingDemo() {
  const [tests, setTests] = useState<TestResult[]>(suites)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [coverage, setCoverage] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runTests = () => {
    if (running) return
    setRunning(true)
    setDone(false)
    setCoverage(0)
    setTests(suites.map(t => ({ ...t, status: 'pending', duration: undefined })))

    suites.forEach((_, i) => {
      const delay = i * 320
      timerRef.current = setTimeout(() => {
        setTests(prev => prev.map((t, j) => j === i ? { ...t, status: 'running' } : t))
        setTimeout(() => {
          const dur = 40 + Math.round(Math.random() * 180)
          setTests(prev => prev.map((t, j) => j === i ? { ...t, status: outcomes[i], duration: dur } : t))
          if (i === suites.length - 1) {
            setRunning(false)
            setDone(true)
            let cov = 0
            const covTimer = setInterval(() => {
              cov = Math.min(cov + 2, 94)
              setCoverage(cov)
              if (cov >= 94) clearInterval(covTimer)
            }, 20)
          }
        }, 200 + Math.random() * 100)
      }, delay)
    })
  }

  const reset = () => {
    setTests(suites.map(t => ({ ...t, status: 'pending', duration: undefined })))
    setDone(false)
    setCoverage(0)
  }

  const passed = tests.filter(t => t.status === 'pass').length
  const failed = tests.filter(t => t.status === 'fail').length
  const S = { fontFamily: 'JetBrains Mono', fontSize: 11 }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ ...S, color: '#34D399', marginBottom: 4 }}>vitest run --coverage</div>
          <div style={{ fontFamily: 'Manrope', fontSize: 13, color: '#94A3B8' }}>
            {suites.length} tests · 3 suites
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {done && <button onClick={reset} style={{ fontFamily: 'Manrope', fontSize: 12, color: '#626873', background: 'none', border: '1px solid #252A35', padding: '7px 14px', borderRadius: 6, cursor: 'pointer' }}>Reset</button>}
          <button
            onClick={runTests}
            disabled={running}
            style={{
              fontFamily: 'Manrope', fontWeight: 600, fontSize: 12,
              color: '#fff', background: running ? '#252A35' : '#34D399', border: 'none',
              padding: '8px 16px', borderRadius: 6, cursor: running ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s', color: running ? '#4B5563' : '#0D0F14',
            }}
          >
            {running ? '● Running...' : '▶ Run Tests'}
          </button>
        </div>
      </div>

      {/* Test list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 280, overflowY: 'auto', paddingRight: 4 }}>
        {tests.map((test, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 6,
              background: test.status === 'running' ? 'rgba(79,70,229,0.08)' :
                test.status === 'pass' ? 'rgba(52,211,153,0.04)' :
                test.status === 'fail' ? 'rgba(248,113,113,0.06)' : 'transparent',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ fontSize: 13, minWidth: 16, textAlign: 'center' }}>
              {test.status === 'pending' ? <span style={{ color: '#252A35' }}>○</span> :
               test.status === 'running' ? <span style={{ color: '#F59E0B', animation: 'pulse-slow 0.8s infinite' }}>◌</span> :
               test.status === 'pass' ? <span style={{ color: '#34D399' }}>✓</span> :
               <span style={{ color: '#F87171' }}>✕</span>}
            </span>
            <span style={{ flex: 1, fontFamily: 'Manrope', fontSize: 12, color: test.status === 'fail' ? '#F87171' : test.status === 'pass' ? '#E2E8F0' : '#4B5563' }}>
              {test.name}
            </span>
            <span style={{ ...S, color: '#2D3748', fontSize: 10 }}>{test.file}</span>
            {test.duration && <span style={{ ...S, color: '#4B5563', fontSize: 10, minWidth: 40, textAlign: 'right' }}>{test.duration}ms</span>}
          </div>
        ))}
      </div>

      {/* Summary */}
      {done && (
        <div style={{ marginTop: 14, padding: '12px 14px', background: '#161A22', borderRadius: 8, border: `1px solid ${failed > 0 ? '#F87171' : '#34D399'}30`, animation: 'fadeUp 0.3s ease' }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
            <span style={{ ...S, color: '#34D399' }}>✓ {passed} passed</span>
            {failed > 0 && <span style={{ ...S, color: '#F87171' }}>✕ {failed} failed</span>}
            <span style={{ ...S, color: '#4B5563' }}>Time: {(suites.length * 0.32).toFixed(2)}s</span>
          </div>
          <div style={{ ...S, color: '#94A3B8', marginBottom: 6 }}>Coverage</div>
          <div style={{ height: 4, background: '#252A35', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${coverage}%`, background: 'linear-gradient(90deg, #34D399, #059669)', borderRadius: 4, transition: 'width 0.05s linear' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
            <span style={{ ...S, color: coverage >= 80 ? '#34D399' : '#F59E0B', fontSize: 10 }}>{coverage}% statements</span>
          </div>
        </div>
      )}
    </div>
  )
}
