import { useState } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const endpoints: Record<Method, { path: string; body?: string; response: object; status: number }[]> = {
  GET: [
    { path: '/api/users', status: 200, response: { data: [{ id: 1, name: 'Omaly Aguilar' }, { id: 2, name: 'Fabrizio León' }], total: 2, page: 1 } },
    { path: '/api/users/1', status: 200, response: { id: 1, name: 'Omaly Aguilar', email: 'omaly@inticloud.io', role: 'admin', active: true } },
    { path: '/api/products', status: 200, response: { data: [{ id: 'p1', name: 'Plan Pro', price: 49 }], total: 1 } },
  ],
  POST: [
    { path: '/api/users', status: 201, body: '{\n  "name": "Nuevo Usuario",\n  "email": "nuevo@io",\n  "role": "developer"\n}', response: { id: 4, name: 'Nuevo Usuario', email: 'nuevo@io', created: true } },
    { path: '/api/auth/login', status: 200, body: '{\n  "email": "user@io",\n  "password": "secret"\n}', response: { token: 'eyJhbGciOiJIUzI1...', expires_in: 86400 } },
  ],
  PUT: [
    { path: '/api/users/1', status: 200, body: '{\n  "name": "Omaly Aguilar",\n  "role": "superadmin"\n}', response: { id: 1, name: 'Omaly Aguilar', updated: true } },
  ],
  PATCH: [
    { path: '/api/users/1/status', status: 200, body: '{\n  "status": "inactive"\n}', response: { id: 1, status: 'inactive', updated_at: '2026-08-13T12:00:00Z' } },
  ],
  DELETE: [
    { path: '/api/users/3', status: 204, response: {} },
  ],
}

const methodColors: Record<Method, string> = { GET: '#34D399', POST: '#818CF8', PUT: '#F59E0B', PATCH: '#06B6D4', DELETE: '#F87171' }

export default function ApiDemo() {
  const [method, setMethod] = useState<Method>('GET')
  const [endpointIdx, setEndpointIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<{ status: number; body: string } | null>(null)
  const [body, setBody] = useState('')
  const { isMobile } = useResponsive()

  const selectedEndpoints = endpoints[method]
  const selected = selectedEndpoints[Math.min(endpointIdx, selectedEndpoints.length - 1)]

  const changeMethod = (m: Method) => { setMethod(m); setEndpointIdx(0); setResponse(null); setBody(endpoints[m][0]?.body || '') }
  const changeEndpoint = (i: number) => { setEndpointIdx(i); setResponse(null); setBody(selectedEndpoints[i]?.body || '') }

  const send = () => {
    setLoading(true)
    setResponse(null)
    setTimeout(() => {
      setLoading(false)
      setResponse({ status: selected.status, body: JSON.stringify(selected.response, null, 2) })
    }, 600)
  }

  const S = { fontFamily: 'JetBrains Mono', fontSize: 11 }

  return (
    <div>
      <div style={{ ...S, color: '#4F46E5', marginBottom: 14 }}>REST API Explorer</div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        {(Object.keys(endpoints) as Method[]).map(m => (
          <button key={m} onClick={() => changeMethod(m)} style={{ fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 600, color: method === m ? '#0D0F14' : methodColors[m], background: method === m ? methodColors[m] : `${methodColors[m]}15`, border: `1px solid ${methodColors[m]}30`, padding: '5px 12px', borderRadius: 5, cursor: 'pointer', transition: 'all 0.15s' }}>{m}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: methodColors[method], background: `${methodColors[method]}15`, padding: '8px 12px', borderRadius: 6, fontWeight: 700, flexShrink: 0 }}>{method}</div>
        <select value={endpointIdx} onChange={e => changeEndpoint(Number(e.target.value))} style={{ flex: 1, minWidth: 140, fontFamily: 'JetBrains Mono', fontSize: 11, background: '#161A22', border: '1px solid #252A35', color: '#E2E8F0', padding: '8px 12px', borderRadius: 6, outline: 'none' }}>
          {selectedEndpoints.map((ep, i) => <option key={i} value={i}>{ep.path}</option>)}
        </select>
        <button onClick={send} disabled={loading} style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 12, color: '#fff', background: loading ? '#252A35' : '#4F46E5', border: 'none', padding: '8px 18px', borderRadius: 6, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.15s', whiteSpace: 'nowrap' }}>
          {loading ? '...' : 'Send →'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
        <div style={{ background: '#161A22', borderRadius: 8, padding: '12px', border: '1px solid #252A35' }}>
          <div style={{ ...S, color: '#4B5563', marginBottom: 8, fontSize: 10 }}>REQUEST HEADERS</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#94A3B8', lineHeight: 1.8, marginBottom: 12 }}>
            <div><span style={{ color: '#818CF8' }}>Content-Type:</span> application/json</div>
            <div><span style={{ color: '#818CF8' }}>Authorization:</span> Bearer eyJhbGci...</div>
            <div><span style={{ color: '#818CF8' }}>Accept:</span> application/json</div>
          </div>
          {selected.body && (
            <>
              <div style={{ ...S, color: '#4B5563', marginBottom: 6, fontSize: 10 }}>REQUEST BODY</div>
              <textarea value={body || selected.body} onChange={e => setBody(e.target.value)} rows={4} style={{ width: '100%', fontFamily: 'JetBrains Mono', fontSize: 10, background: '#0D0F14', border: '1px solid #252A35', color: '#E2E8F0', borderRadius: 5, padding: '8px', resize: 'vertical', outline: 'none', lineHeight: 1.7, boxSizing: 'border-box' }} />
            </>
          )}
        </div>

        <div style={{ background: '#161A22', borderRadius: 8, padding: '12px', border: `1px solid ${response ? (response.status < 300 ? '#34D399' : '#F87171') + '30' : '#252A35'}` }}>
          <div style={{ ...S, color: '#4B5563', marginBottom: 8, fontSize: 10 }}>RESPONSE</div>
          {loading && <div style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '20px 0' }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F46E5', animation: `pulse-slow 0.8s ${i*0.15}s infinite` }} />)}</div>}
          {response && !loading && (
            <div style={{ animation: 'fadeIn 0.25s ease' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ ...S, color: response.status < 300 ? '#34D399' : '#F87171', fontSize: 10, fontWeight: 700 }}>{response.status}</span>
                <span style={{ ...S, color: '#4B5563', fontSize: 10 }}>{response.status < 300 ? 'OK' : 'ERROR'}</span>
              </div>
              <pre style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#94A3B8', margin: 0, lineHeight: 1.7, overflowX: 'auto', wordBreak: 'break-word' }}>{response.body}</pre>
            </div>
          )}
          {!response && !loading && <div style={{ ...S, color: '#2D3748', fontSize: 10, padding: '20px 0' }}>Presiona Send para ver la respuesta</div>}
        </div>
      </div>
    </div>
  )
}
