import { useState } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

const queries = [
  {
    label: 'SELECT JOIN',
    sql: `SELECT u.id, u.name, u.email,
       r.name AS role,
       COUNT(o.id) AS orders
FROM users u
JOIN roles r ON u.role_id = r.id
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.active = true
GROUP BY u.id, r.name
ORDER BY orders DESC
LIMIT 5;`,
    cols: ['id', 'name', 'role', 'orders'],
    rows: [['1', 'Omaly Aguilar', 'Admin', '24'], ['3', 'María López', 'Designer', '18'], ['2', 'Fabrizio León', 'Developer', '11'], ['5', 'Pedro Sanz', 'Manager', '9'], ['4', 'Laura Vega', 'Developer', '6']],
    time: '2.4ms', rows_returned: 5,
  },
  {
    label: 'INSERT',
    sql: `INSERT INTO users (name, email, role_id, active)
VALUES ('Nuevo Usuario', 'nuevo@io', 2, true)
RETURNING id, name, created_at;`,
    cols: ['id', 'name', 'created_at'],
    rows: [['7', 'Nuevo Usuario', '2026-08-13 14:23:00']],
    time: '0.8ms', rows_returned: 1,
  },
  {
    label: 'UPDATE',
    sql: `UPDATE orders
SET status = 'shipped',
    updated_at = NOW()
WHERE user_id = 1
  AND status = 'pending'
RETURNING id, status, updated_at;`,
    cols: ['id', 'status', 'updated_at'],
    rows: [['101', 'shipped', '2026-08-13 14:23:01'], ['108', 'shipped', '2026-08-13 14:23:01']],
    time: '1.2ms', rows_returned: 2,
  },
  {
    label: 'Aggregate',
    sql: `SELECT
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) AS users,
  SUM(revenue) AS revenue
FROM subscriptions
WHERE created_at >= NOW() - INTERVAL '6 months'
GROUP BY month
ORDER BY month ASC;`,
    cols: ['month', 'users', 'revenue'],
    rows: [['2026-03', '14', '$6,860'], ['2026-04', '19', '$9,310'], ['2026-05', '22', '$10,780'], ['2026-06', '31', '$15,190'], ['2026-07', '28', '$13,720'], ['2026-08', '17', '$8,330']],
    time: '4.1ms', rows_returned: 6,
  },
]

const kwColors: Record<string, string> = {
  SELECT: '#818CF8', FROM: '#818CF8', WHERE: '#818CF8', JOIN: '#818CF8', LEFT: '#818CF8',
  'GROUP': '#818CF8', ORDER: '#818CF8', LIMIT: '#818CF8', INSERT: '#818CF8', INTO: '#818CF8',
  VALUES: '#818CF8', RETURNING: '#818CF8', UPDATE: '#818CF8', SET: '#818CF8', COUNT: '#06B6D4',
  SUM: '#06B6D4', DATE_TRUNC: '#06B6D4', NOW: '#06B6D4', AND: '#818CF8', ON: '#818CF8', BY: '#818CF8',
}

export default function DatabaseDemo() {
  const [active, setActive] = useState(0)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<typeof queries[0] | null>(null)
  const { isMobile } = useResponsive()

  const run = () => { setRunning(true); setResult(null); setTimeout(() => { setRunning(false); setResult(queries[active]) }, 700) }

  const S = { fontFamily: 'JetBrains Mono', fontSize: 11 }

  const colorLine = (line: string) => line.split(' ').map((word, j) => {
    const clean = word.replace(/[(),;]/g, '')
    const color = kwColors[clean] ? kwColors[clean] : /^'.*'$/.test(word) ? '#F59E0B' : !isNaN(Number(clean)) && clean !== '' ? '#34D399' : '#94A3B8'
    return <span key={j} style={{ color }}>{word} </span>
  })

  return (
    <div>
      <div style={{ ...S, color: '#4F46E5', marginBottom: 14 }}>PostgreSQL Query Runner</div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {queries.map((q, i) => (
          <button key={i} onClick={() => { setActive(i); setResult(null) }} style={{ fontFamily: 'Manrope', fontSize: 12, fontWeight: active === i ? 700 : 400, color: active === i ? '#fff' : '#626873', background: active === i ? '#4F46E5' : 'transparent', border: `1px solid ${active === i ? '#4F46E5' : '#252A35'}`, padding: '6px 12px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s' }}>{q.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
        <div style={{ background: '#161A22', borderRadius: 8, border: '1px solid #252A35', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid #252A35' }}>
            <div style={{ ...S, color: '#4B5563', fontSize: 10 }}>SQL EDITOR</div>
            <button onClick={run} disabled={running} style={{ fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600, color: running ? '#4B5563' : '#34D399', background: running ? '#1A1F2A' : 'rgba(52,211,153,0.1)', border: `1px solid ${running ? '#252A35' : 'rgba(52,211,153,0.2)'}`, padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>
              {running ? '◌ Running...' : '▶ Execute'}
            </button>
          </div>
          <pre style={{ fontFamily: 'JetBrains Mono', fontSize: 11, padding: '14px', margin: 0, lineHeight: 1.9, overflowX: 'auto' }}>
            {queries[active].sql.split('\n').map((line, i) => <div key={i}>{colorLine(line)}</div>)}
          </pre>
        </div>

        <div style={{ background: '#161A22', borderRadius: 8, border: '1px solid #252A35', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid #252A35' }}>
            <div style={{ ...S, color: '#4B5563', fontSize: 10 }}>RESULTS</div>
            {result && <span style={{ ...S, color: '#34D399', fontSize: 10 }}>{result.rows_returned} row(s) · {result.time}</span>}
          </div>
          <div style={{ overflowX: 'auto' }}>
            {running && <div style={{ padding: '24px', display: 'flex', gap: 6 }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F46E5', animation: `pulse-slow 0.7s ${i*0.15}s infinite` }} />)}</div>}
            {result && !running && (
              <table style={{ width: '100%', borderCollapse: 'collapse', animation: 'fadeIn 0.25s ease' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #252A35', background: '#0D0F14' }}>
                    {result.cols.map(c => <th key={c} style={{ ...S, color: '#818CF8', fontSize: 10, fontWeight: 600, padding: '8px 10px', textAlign: 'left', whiteSpace: 'nowrap' }}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #1A1F2A' }}>
                      {row.map((cell, j) => <td key={j} style={{ ...S, color: j === 0 ? '#4B5563' : '#E2E8F0', fontSize: 10, padding: '8px 10px', whiteSpace: 'nowrap' }}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!result && !running && <div style={{ ...S, color: '#2D3748', fontSize: 10, padding: '24px' }}>Ejecuta una query para ver resultados</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
