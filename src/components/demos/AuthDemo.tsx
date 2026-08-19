import { useState } from 'react'

type Step = 'idle' | 'login' | 'token' | 'request' | 'response'

const jwtHeader = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '')
const jwtPayload = btoa(JSON.stringify({ sub: 'usr_8f2a1', email: 'user@app.io', role: 'admin', iat: 1723000000, exp: 1723086400 })).replace(/=/g, '')
const jwtSig = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const token = `${jwtHeader}.${jwtPayload}.${jwtSig}`

export default function AuthDemo() {
  const [step, setStep] = useState<Step>('idle')
  const [email, setEmail] = useState('user@app.io')
  const [password, setPassword] = useState('••••••••')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const advance = (to: Step, delay = 700) => setTimeout(() => setStep(to), delay)

  const login = () => {
    if (!email || !password) { setError('Completa los campos'); return }
    setError('')
    setLoading(true)
    setStep('login')
    setTimeout(() => { setLoading(false); advance('token', 0) }, 1000)
  }

  const makeRequest = () => {
    setStep('request')
    advance('response', 800)
  }

  const reset = () => { setStep('idle'); setError('') }

  const S = { fontFamily: 'JetBrains Mono', fontSize: 11 }
  const inputStyle: React.CSSProperties = {
    fontFamily: 'Manrope', fontSize: 13, background: '#0D0F14',
    border: '1px solid #252A35', borderRadius: 6, padding: '8px 12px', color: '#E2E8F0',
    outline: 'none', width: '100%',
  }

  return (
    <div>
      <div style={{ ...S, color: '#4F46E5', marginBottom: 16 }}>JWT Authentication Flow</div>

      {/* Step 1: Login form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {(['login', 'token', 'request', 'response'] as Step[]).map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: step === s ? '#4F46E5' :
                    (['login', 'token', 'request', 'response'] as Step[]).indexOf(step) > i ? '#34D399' : '#252A35',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono', fontSize: 9, color: '#fff', transition: 'background 0.3s',
                }}>
                  {(['login', 'token', 'request', 'response'] as Step[]).indexOf(step) > i ? '✓' : i + 1}
                </div>
                {i < 3 && <div style={{ width: 16, height: 1, background: ['login', 'token', 'request', 'response'].indexOf(step) > i ? '#34D399' : '#252A35', transition: 'background 0.3s' }} />}
              </div>
            ))}
          </div>

          {/* Login panel */}
          <div style={{ background: '#161A22', borderRadius: 10, padding: '16px', border: '1px solid #252A35', marginBottom: 10 }}>
            <div style={{ ...S, color: '#4B5563', marginBottom: 10, fontSize: 10 }}>POST /api/auth/login</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={inputStyle} disabled={step !== 'idle'} />
              <input type="password" value={password} onChange={() => {}} placeholder="Password" style={inputStyle} disabled={step !== 'idle'} />
            </div>
            {error && <div style={{ fontFamily: 'Manrope', fontSize: 12, color: '#F87171', marginBottom: 8 }}>{error}</div>}
            <div style={{ display: 'flex', gap: 8 }}>
              {step !== 'idle' && <button onClick={reset} style={{ fontFamily: 'Manrope', fontSize: 12, color: '#626873', background: 'none', border: '1px solid #252A35', padding: '7px 12px', borderRadius: 6, cursor: 'pointer' }}>Reset</button>}
              <button
                onClick={step === 'idle' ? login : undefined}
                disabled={step !== 'idle'}
                style={{ flex: 1, fontFamily: 'Manrope', fontWeight: 600, fontSize: 12, color: '#fff', background: step !== 'idle' ? '#252A35' : '#4F46E5', border: 'none', padding: '8px', borderRadius: 6, cursor: step === 'idle' ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
              >
                {loading ? 'Autenticando...' : step === 'idle' ? 'Iniciar sesión →' : 'Autenticado ✓'}
              </button>
            </div>
          </div>

          {/* Protected request */}
          {(step === 'token' || step === 'request' || step === 'response') && (
            <div style={{ background: '#161A22', borderRadius: 10, padding: '14px', border: '1px solid #252A35', animation: 'fadeUp 0.3s ease' }}>
              <div style={{ ...S, color: '#4B5563', marginBottom: 8, fontSize: 10 }}>Petición protegida</div>
              <div style={{ ...S, color: '#94A3B8', marginBottom: 10, fontSize: 10, background: '#0D0F14', padding: '6px 10px', borderRadius: 5 }}>
                GET /api/users/me<br />
                Authorization: Bearer [JWT]
              </div>
              <button
                onClick={makeRequest}
                disabled={step === 'request'}
                style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: 12, color: '#fff', background: step === 'response' ? '#34D399' : '#818CF8', border: 'none', padding: '7px 14px', borderRadius: 6, cursor: 'pointer', transition: 'background 0.3s', color: step === 'response' ? '#0D0F14' : '#fff' }}
              >
                {step === 'response' ? '✓ 200 OK' : step === 'request' ? 'Enviando...' : 'Enviar request →'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Token / Response */}
        <div>
          {(step === 'token' || step === 'request' || step === 'response') && (
            <div style={{ animation: 'slideLeft 0.35s ease' }}>
              <div style={{ background: '#161A22', borderRadius: 10, padding: '14px', border: '1px solid #4F46E5', marginBottom: 10 }}>
                <div style={{ ...S, color: '#4F46E5', marginBottom: 8, fontSize: 10 }}>JWT Token generado</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, lineHeight: 1.8, wordBreak: 'break-all' }}>
                  <span style={{ color: '#F472B6' }}>{jwtHeader}</span>
                  <span style={{ color: '#E2E8F0' }}>.</span>
                  <span style={{ color: '#34D399' }}>{jwtPayload}</span>
                  <span style={{ color: '#E2E8F0' }}>.</span>
                  <span style={{ color: '#818CF8' }}>{jwtSig}</span>
                </div>
              </div>

              <div style={{ background: '#161A22', borderRadius: 10, padding: '14px', border: '1px solid #252A35' }}>
                <div style={{ ...S, color: '#4B5563', marginBottom: 8, fontSize: 10 }}>Payload decodificado</div>
                <pre style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#94A3B8', margin: 0, lineHeight: 1.7 }}>
{`{
  "sub": "usr_8f2a1",
  "email": "user@app.io",
  "role": "admin",
  "iat": 1723000000,
  "exp": 1723086400
}`}
                </pre>
              </div>
            </div>
          )}

          {step === 'response' && (
            <div style={{ marginTop: 10, background: 'rgba(52,211,153,0.06)', borderRadius: 10, padding: '14px', border: '1px solid rgba(52,211,153,0.2)', animation: 'fadeUp 0.3s ease' }}>
              <div style={{ ...S, color: '#34D399', marginBottom: 8, fontSize: 10 }}>200 OK — application/json</div>
              <pre style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#94A3B8', margin: 0, lineHeight: 1.7 }}>
{`{
  "id": "usr_8f2a1",
  "email": "user@app.io",
  "name": "Admin User",
  "role": "admin",
  "createdAt": "2026-01-15"
}`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
