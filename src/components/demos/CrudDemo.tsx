import { useState } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

type User = { id: number; name: string; email: string; role: string; status: 'active' | 'inactive' }

const initial: User[] = [
  { id: 1, name: 'Omaly Aguilar', email: 'omaly@inticloud.io', role: 'Admin', status: 'active' },
  { id: 2, name: 'Fabrizio León', email: 'fabrizio@inticloud.io', role: 'Developer', status: 'active' },
  { id: 3, name: 'María López', email: 'maria@cliente.io', role: 'Designer', status: 'inactive' },
]

let nextId = 4
const roles = ['Admin', 'Developer', 'Designer', 'Manager']

export default function CrudDemo() {
  const [users, setUsers] = useState<User[]>(initial)
  const [adding, setAdding] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Developer' })
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [editUser, setEditUser] = useState<Partial<User>>({})
  const [toast, setToast] = useState('')
  const { isMobile } = useResponsive()

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2200) }

  const addUser = () => {
    if (!newUser.name || !newUser.email) return
    setUsers(u => [...u, { id: nextId++, ...newUser as any, status: 'active' }])
    setAdding(false)
    setNewUser({ name: '', email: '', role: 'Developer' })
    showToast('Usuario creado ✓')
  }

  const deleteUser = (id: number) => {
    setDeletingId(id)
    setTimeout(() => { setUsers(u => u.filter(x => x.id !== id)); setDeletingId(null); showToast('Usuario eliminado') }, 350)
  }

  const saveEdit = () => {
    setUsers(u => u.map(x => x.id === editUser.id ? { ...x, ...editUser } as User : x))
    setEditUser({})
    showToast('Usuario actualizado ✓')
  }

  const toggleStatus = (id: number) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))
    showToast('Estado actualizado')
  }

  const S = { fontFamily: 'JetBrains Mono', fontSize: 12 }
  const inputStyle: React.CSSProperties = { fontFamily: 'Manrope', fontSize: 13, background: '#0D0F14', border: '1px solid #252A35', borderRadius: 6, padding: '6px 10px', color: '#E2E8F0', outline: 'none', width: '100%', boxSizing: 'border-box' }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div style={{ ...S, color: '#4F46E5', marginBottom: 4, fontSize: 11 }}>GET /api/users</div>
          <div style={{ fontFamily: 'Manrope', fontSize: 13, color: '#94A3B8' }}>{users.length} usuarios</div>
        </div>
        <button onClick={() => setAdding(!adding)} style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: 12, color: '#fff', background: '#4F46E5', border: 'none', padding: '8px 16px', borderRadius: 7, cursor: 'pointer' }}>
          + Nuevo usuario
        </button>
      </div>

      {adding && (
        <div style={{ background: '#161A22', border: '1px solid #4F46E5', borderRadius: 8, padding: '14px', marginBottom: 12, animation: 'scaleIn 0.18s ease' }}>
          <div style={{ ...S, color: '#4F46E5', marginBottom: 10, fontSize: 10 }}>POST /api/users</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
            <input placeholder="Nombre" value={newUser.name} onChange={e => setNewUser(n => ({ ...n, name: e.target.value }))} style={inputStyle} />
            <input placeholder="Email" value={newUser.email} onChange={e => setNewUser(n => ({ ...n, email: e.target.value }))} style={inputStyle} />
            <select value={newUser.role} onChange={e => setNewUser(n => ({ ...n, role: e.target.value }))} style={{ ...inputStyle, background: '#0D0F14' }}>
              {roles.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={() => setAdding(false)} style={{ fontFamily: 'Manrope', fontSize: 12, color: '#626873', background: 'none', border: '1px solid #252A35', padding: '6px 12px', borderRadius: 5, cursor: 'pointer' }}>Cancelar</button>
            <button onClick={addUser} style={{ fontFamily: 'Manrope', fontSize: 12, fontWeight: 600, color: '#fff', background: '#4F46E5', border: 'none', padding: '6px 14px', borderRadius: 5, cursor: 'pointer' }}>Crear</button>
          </div>
        </div>
      )}

      {editUser.id && (
        <div style={{ background: '#161A22', border: '1px solid #818CF8', borderRadius: 8, padding: '14px', marginBottom: 12, animation: 'scaleIn 0.18s ease' }}>
          <div style={{ ...S, color: '#818CF8', marginBottom: 10, fontSize: 10 }}>PUT /api/users/{editUser.id}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
            <input value={editUser.name || ''} onChange={e => setEditUser(u => ({ ...u, name: e.target.value }))} style={inputStyle} />
            <input value={editUser.email || ''} onChange={e => setEditUser(u => ({ ...u, email: e.target.value }))} style={inputStyle} />
            <select value={editUser.role || ''} onChange={e => setEditUser(u => ({ ...u, role: e.target.value }))} style={{ ...inputStyle, background: '#0D0F14' }}>
              {roles.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={() => setEditUser({})} style={{ fontFamily: 'Manrope', fontSize: 12, color: '#626873', background: 'none', border: '1px solid #252A35', padding: '6px 12px', borderRadius: 5, cursor: 'pointer' }}>Cancelar</button>
            <button onClick={saveEdit} style={{ fontFamily: 'Manrope', fontSize: 12, fontWeight: 600, color: '#fff', background: '#818CF8', border: 'none', padding: '6px 14px', borderRadius: 5, cursor: 'pointer' }}>Guardar</button>
          </div>
        </div>
      )}

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #252A35' }}>
              {['ID', 'Nombre', !isMobile && 'Email', 'Rol', 'Estado', ''].filter(Boolean).map(h => (
                <th key={h as string} style={{ ...S, color: '#4B5563', fontWeight: 600, padding: '8px 10px', textAlign: 'left', whiteSpace: 'nowrap', fontSize: 10 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover-row" style={{ borderBottom: '1px solid #1A1F2A', opacity: deletingId === user.id ? 0 : 1, transform: deletingId === user.id ? 'translateX(16px)' : 'none', transition: 'opacity 0.3s, transform 0.3s', background: 'transparent' }}>
                <td style={{ ...S, color: '#4B5563', padding: '10px', fontSize: 10 }}>#{user.id}</td>
                <td style={{ fontFamily: 'Manrope', fontSize: 13, color: '#E2E8F0', padding: '10px', fontWeight: 500, whiteSpace: 'nowrap' }}>{user.name}</td>
                {!isMobile && <td style={{ ...S, color: '#94A3B8', padding: '10px', fontSize: 10 }}>{user.email}</td>}
                <td style={{ padding: '10px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#818CF8', background: 'rgba(129,140,248,0.12)', padding: '2px 7px', borderRadius: 4 }}>{user.role}</span>
                </td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => toggleStatus(user.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: user.status === 'active' ? '#34D399' : '#4B5563', display: 'inline-block' }} />
                    {!isMobile && <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: user.status === 'active' ? '#34D399' : '#4B5563' }}>{user.status}</span>}
                  </button>
                </td>
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <button onClick={() => setEditUser({ ...user })} style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#818CF8', background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)', padding: '3px 7px', borderRadius: 4, cursor: 'pointer' }}>EDIT</button>
                    <button onClick={() => deleteUser(user.id)} style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#F87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', padding: '3px 7px', borderRadius: 4, cursor: 'pointer' }}>DEL</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#34D399', background: 'rgba(52,211,153,0.1)', padding: '2px 8px', borderRadius: 4 }}>200 OK</span>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#4B5563' }}>application/json · {users.length} items</span>
      </div>

      {toast && (
        <div style={{ position: 'absolute', bottom: 16, right: 0, background: '#4F46E5', color: '#fff', fontFamily: 'Manrope', fontWeight: 600, fontSize: 13, padding: '10px 18px', borderRadius: 8, animation: 'fadeUp 0.2s ease', boxShadow: '0 4px 16px rgba(79,70,229,0.4)' }}>
          {toast}
        </div>
      )}
    </div>
  )
}
