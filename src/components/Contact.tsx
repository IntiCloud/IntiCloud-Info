import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useResponsive } from '../hooks/useResponsive'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const { ref, visible } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [apiError, setApiError] = useState<string | null>(null)
  const { isMobile } = useResponsive()

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Email inválido'
    if (!form.message.trim()) e.message = 'Cuéntanos sobre tu proyecto'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); setStatus('error'); return }
    setErrors({})
    setStatus('submitting')
    setApiError(null)

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '5435c691-1102-495c-8831-1c2cc51893e2'

    try {
      if (accessKey) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            name: form.name,
            email: form.email,
            phone: form.phone || 'No especificado',
            company: form.company || 'No especificado',
            message: form.message,
            subject: `Nueva Propuesta de Proyecto de ${form.name} (${form.company || 'IntiCloud'})`,
            from_name: 'IntiCloud Contact Form',
            autoresponder_subject: '¡Hemos recibido tu proyecto en IntiCloud!',
          }),
        })
        const data = await res.json()
        if (data.success) {
          setStatus('success')
        } else {
          setApiError(data.message || 'Error al enviar el formulario')
          setStatus('error')
        }
      } else {
        // Fallback demo submission when access key is pending configuration
        await new Promise(r => setTimeout(r, 1000))
        setStatus('success')
      }
    } catch {
      setApiError('Error de red al enviar la propuesta. Inténtalo nuevamente.')
      setStatus('error')
    }
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
                <div style={{ fontSize: 44, marginBottom: 16, color: '#10B981' }}>✓</div>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 22, color: '#111318', marginBottom: 12 }}>¡Propuesta enviada con éxito!</div>
                <p style={{ fontFamily: 'Manrope', fontSize: 15, color: '#4B5563', lineHeight: 1.6, marginBottom: 8 }}>
                  Hemos recibido la información de tu proyecto. Revisaremos los detalles con calma y te responderemos por correo con una propuesta personalizada.
                </p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', company: '', message: '' }) }} style={{ marginTop: 24, fontFamily: 'Manrope', fontWeight: 600, fontSize: 14, color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  Enviar otra propuesta
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
                      style={fieldStyle(f.key)} disabled={status === 'submitting'} />
                    {errors[f.key] && <div style={{ fontFamily: 'Manrope', fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors[f.key]}</div>}
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: 'Manrope', fontSize: 13, fontWeight: 600, color: '#111318', display: 'block', marginBottom: 8 }}>Cuéntanos sobre tu proyecto *</label>
                  <textarea value={form.message} rows={5} placeholder="Describe brevemente lo que quieres construir..."
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle('message'), resize: 'vertical' }} disabled={status === 'submitting'} />
                  {errors.message && <div style={{ fontFamily: 'Manrope', fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.message}</div>}
                </div>

                {apiError && (
                  <div style={{ fontFamily: 'Manrope', fontSize: 13, color: '#EF4444', background: '#FEE2E2', padding: '12px 16px', borderRadius: 8 }}>
                    {apiError}
                  </div>
                )}

                <button type="submit" disabled={status === 'submitting'} style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, color: '#fff', background: status === 'submitting' ? '#9CA3AF' : '#4F46E5', border: 'none', padding: '16px', borderRadius: 10, cursor: status === 'submitting' ? 'not-allowed' : 'pointer', transition: 'background 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                  onMouseEnter={e => { if (status !== 'submitting') e.currentTarget.style.background = '#4338CA' }}
                  onMouseLeave={e => { if (status !== 'submitting') e.currentTarget.style.background = '#4F46E5' }}>
                  {status === 'submitting' ? 'Enviando propuesta...' : 'Enviar propuesta →'}
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
                { label: 'GitHub', value: 'github.com/IntiCloud', href: 'https://github.com/IntiCloud' },
                { label: 'LinkedIn — Omaly', value: 'linkedin.com/in/omalyaguilardev', href: 'https://www.linkedin.com/in/omalyaguilardev/' },
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
