import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

type Status = 'idle' | 'success' | 'error'

export default function Contact() {
  const { ref, visible } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const { isMobile } = useResponsive()

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Email inválido'
    if (!form.message.trim()) e.message = 'Cuéntanos sobre tu proyecto'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); setStatus('error'); return }
    setErrors({})
    setStatus('success')
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: '100%', background: '#F8F9FB',
    border: `1.5px solid ${errors[name] ? '#EF4444' : focused === name ? '#4F46E5' : '#E5E7EB'}`,
    borderRadius: 10, padding: '13px 16px',
    fontFamily: 'Manrope', fontSize: 14, color: '#111318',
    transition: 'border-color 0.2s', outline: 'none', boxSizing: 'border-box',
  })

  return (
    <section id="contacto" ref={ref} className={`section-reveal ${visible ? 'visible' : ''}`} style={{ padding: isMobile ? '80px 20px' : '120px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', letterSpacing: '0.12em', fontWeight: 600 }}>// CONTACTO</span>
        </div>
        <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', color: '#111318', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 56 }}>
          Hablemos de tu proyecto.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
          <div>
            {status === 'success' ? (
              <div style={{ background: 'rgba(52,211,153,0.08)', border: '1.5px solid #34D399', borderRadius: 14, padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 20, color: '#111318', marginBottom: 8 }}>¡Mensaje enviado!</div>
                <p style={{ fontFamily: 'Manrope', fontSize: 15, color: '#626873' }}>Nos pondremos en contacto contigo pronto.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', company: '', message: '' }) }} style={{ marginTop: 24, fontFamily: 'Manrope', fontWeight: 600, fontSize: 13, color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { key: 'name', label: 'Nombre *', type: 'text', placeholder: 'Tu nombre completo' },
                  { key: 'email', label: 'Email *', type: 'email', placeholder: 'tu@email.com' },
                  { key: 'phone', label: 'Teléfono', type: 'tel', placeholder: '+51 999 999 999' },
                  { key: 'company', label: 'Empresa / Proyecto', type: 'text', placeholder: 'Nombre de tu empresa o proyecto' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: 'Manrope', fontSize: 13, fontWeight: 600, color: '#111318', display: 'block', marginBottom: 8 }}>{f.label}</label>
                    <input type={f.type} value={form[f.key as keyof typeof form]} placeholder={f.placeholder}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      onFocus={() => setFocused(f.key)} onBlur={() => setFocused(null)}
                      style={fieldStyle(f.key)} />
                    {errors[f.key] && <div style={{ fontFamily: 'Manrope', fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors[f.key]}</div>}
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: 'Manrope', fontSize: 13, fontWeight: 600, color: '#111318', display: 'block', marginBottom: 8 }}>Cuéntanos sobre tu proyecto *</label>
                  <textarea value={form.message} rows={5} placeholder="Describe brevemente lo que quieres construir..."
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle('message'), resize: 'vertical' }} />
                  {errors.message && <div style={{ fontFamily: 'Manrope', fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.message}</div>}
                </div>
                <button type="submit" style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, color: '#fff', background: '#4F46E5', border: 'none', padding: '16px', borderRadius: 10, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#4338CA')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#4F46E5')}>
                  Enviar propuesta →
                </button>
              </form>
            )}
          </div>

          <div style={{ paddingTop: isMobile ? 0 : 8 }}>
            <p style={{ fontFamily: 'Manrope', fontSize: 16, color: '#626873', lineHeight: 1.75, marginBottom: 40 }}>
              ¿Prefieres contactarnos directamente? Estamos disponibles en las siguientes plataformas.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Email', value: 'aguilaromaly@gmail.com', href: 'mailto:aguilaromaly@gmail.com' },
                { label: 'Teléfono / WhatsApp', value: '+51 994 285 303', href: 'https://wa.me/51994285303' },
                { label: 'GitHub', value: 'github.com/icarius4iu', href: 'https://github.com/icarius4iu' },
                { label: 'LinkedIn — Omaly', value: 'linkedin.com/in/omalyaguilardev', href: 'https://www.linkedin.com/in/omalyaguilardev/' },
                { label: 'LinkedIn — Fabrizio', value: 'linkedin.com/in/fabrizioleonp', href: 'https://www.linkedin.com/in/fabrizioleonp' },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', background: '#F8F9FB', border: '1.5px solid #E5E7EB', borderRadius: 10, cursor: 'pointer', transition: 'border-color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#4F46E5')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E7EB')}>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#626873', marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: 14, color: '#111318' }}>{item.value}</div>
                  </div>
                  <span style={{ color: '#4F46E5', fontSize: 18 }}>→</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 32, padding: '20px', background: '#EEF2FF', borderRadius: 12 }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4F46E5', fontWeight: 600, marginBottom: 8 }}>HORARIO DE ATENCIÓN</div>
              <p style={{ fontFamily: 'Manrope', fontSize: 14, color: '#626873', lineHeight: 1.65 }}>Lunes a Viernes, 9:00 AM – 6:00 PM (UTC-5 Lima, Perú). Respondemos en menos de 24 horas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
