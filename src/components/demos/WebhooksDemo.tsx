import { useState, useEffect, useRef } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

type Event = { id: string; type: string; ts: string; method: string; status: number; payload: object; color: string }

const templates = [
  { type: 'user.created', method: 'POST', color: '#34D399', payload: { user_id: 'usr_8f2a1', email: 'new@user.io', plan: 'pro', created_at: '' } },
  { type: 'payment.succeeded', method: 'POST', color: '#818CF8', payload: { payment_id: 'pay_xc91b', amount: 4900, currency: 'USD', status: 'succeeded' } },
  { type: 'order.shipped', method: 'POST', color: '#F59E0B', payload: { order_id: 'ord_2m4k', tracking: 'ES842938291', carrier: 'DHL' } },
  { type: 'subscription.cancelled', method: 'POST', color: '#F87171', payload: { sub_id: 'sub_9z1p', reason: 'user_request', ends_at: '' } },
  { type: 'invoice.created', method: 'POST', color: '#4F46E5', payload: { invoice_id: 'inv_7y3n', total: 14900, due_date: '' } },
]

function randomEvent(): Event {
  const t = templates[Math.floor(Math.random() * templates.length)]
  const ts = new Date().toLocaleTimeString('es-ES', { hour12: false })
  return { id: Math.random().toString(36).slice(2, 8), type: t.type, method: t.method, status: 200, ts, color: t.color, payload: { ...t.payload, timestamp: new Date().toISOString() } }
}

export default function WebhooksDemo() {
  const [events, setEvents] = useState<Event[]>([randomEvent(), randomEvent()])
  const [active, setActive] = useState<Event | null>(null)
  const [streaming, setStreaming] = useState(false)
  const [endpoint] = useState('https://inticloud.io/webhooks/events')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useResponsive()

  const toggle = () => {
    if (streaming) { clearInterval(intervalRef.current!); setStreaming(false) }
    else {
      setStreaming(true)
      intervalRef.current = setInterval(() => {
        setEvents(prev => [randomEvent(), ...prev].slice(0, 12))
        if (listRef.current) listRef.current.scrollTop = 0
      }, 1400)
    }
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const S = { fontFamily: 'JetBrains Mono', fontSize: 11 }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ ...S, color: '#4B5563', marginBottom: 4, fontSize: 10 }}>Webhook endpoint</div>
          <div style={{ ...S, color: '#818CF8', background: '#161A22', padding: '6px 10px', borderRadius: 6, fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{endpoint}</div>
        </div>
        <button onClick={toggle} style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: 12, flexShrink: 0, color: streaming ? '#F87171' : '#fff', background: streaming ? 'rgba(248,113,113,0.1)' : '#4F46E5', border: streaming ? '1px solid rgba(248,113,113,0.3)' : 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s' }}>
          {streaming ? '⏹ Stop' : '▶ Start stream'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ ...S, color: '#4B5563', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            {streaming && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block', position: 'relative' }} className="ping-dot" />}
            INCOMING EVENTS
          </div>
          <div ref={listRef} style={{ maxHeight: 240, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {events.map(ev => (
              <div key={ev.id} onClick={() => setActive(ev)} style={{ padding: '8px 10px', borderRadius: 6, cursor: 'pointer', background: active?.id === ev.id ? '#161A22' : 'transparent', border: `1px solid ${active?.id === ev.id ? '#252A35' : 'transparent'}`, display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.15s', animation: 'fadeUp 0.25s ease' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                <span style={{ ...S, color: ev.color, flex: 1, fontSize: 10 }}>{ev.type}</span>
                <span style={{ ...S, color: '#2D3748', fontSize: 9 }}>{ev.ts}</span>
                <span style={{ ...S, color: '#34D399', fontSize: 9 }}>✓ {ev.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ ...S, color: '#4B5563', marginBottom: 8, fontSize: 10 }}>PAYLOAD</div>
          {active ? (
            <div style={{ background: '#161A22', borderRadius: 8, padding: '12px', border: `1px solid ${active.color}20`, animation: 'fadeIn 0.2s ease' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <span style={{ ...S, color: active.color, background: `${active.color}15`, padding: '2px 7px', borderRadius: 4, fontSize: 9 }}>{active.method}</span>
                <span style={{ ...S, color: '#4B5563', fontSize: 9 }}>id: {active.id}</span>
              </div>
              <pre style={{ ...S, color: '#94A3B8', fontSize: 10, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.7 }}>{JSON.stringify(active.payload, null, 2)}</pre>
            </div>
          ) : (
            <div style={{ background: '#161A22', borderRadius: 8, padding: '20px', border: '1px solid #252A35', textAlign: 'center' }}>
              <div style={{ ...S, color: '#2D3748', fontSize: 10 }}>Selecciona un evento</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[{ label: 'Received', value: events.length, color: '#818CF8' }, { label: 'Success', value: events.length, color: '#34D399' }, { label: 'Failed', value: 0, color: '#F87171' }, { label: 'Avg latency', value: '42ms', color: '#F59E0B' }].map(s => (
          <div key={s.label} style={{ background: '#161A22', borderRadius: 6, padding: '8px 12px', border: '1px solid #252A35' }}>
            <div style={{ ...S, color: '#4B5563', fontSize: 9, marginBottom: 2 }}>{s.label}</div>
            <div style={{ ...S, color: s.color, fontWeight: 600 }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
