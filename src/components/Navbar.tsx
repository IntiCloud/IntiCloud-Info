import { useState, useEffect } from 'react'
import { useResponsive } from '../hooks/useResponsive'
import logoIntiCloud from '../imports/LOGOINTICLOUD.png'

const links = ['Inicio', 'Nosotros', 'Servicios', 'Tecnologías', 'Proyectos', 'Contacto']
const hrefs = ['#inicio', '#nosotros', '#servicios', '#tecnologias', '#proyectos', '#contacto']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isMobile, isTablet } = useResponsive()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile && !isTablet) setOpen(false)
  }, [isMobile, isTablet])

  const showHamburger = isMobile || isTablet

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'background 0.3s, box-shadow 0.3s',
    background: scrolled || open ? 'rgba(248,249,251,0.96)' : 'transparent',
    backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: scrolled || open ? 'blur(12px)' : 'none',
    borderBottom: scrolled || open ? '1px solid #E5E7EB' : '1px solid transparent',
  }

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <a href="#inicio" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <img
              src={logoIntiCloud}
              alt="IntiCloud"
              style={{ height: 52, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block' }}
            />
          </a>

          {/* Desktop nav links */}
          {!showHamburger && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {links.map((link, i) => (
                <a
                  key={link}
                  href={hrefs[i]}
                  style={{ fontFamily: 'Manrope', fontSize: 14, fontWeight: 500, color: '#626873', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#111318')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#626873')}
                >
                  {link}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTA */}
          {!showHamburger && (
            <a
              href="#contacto"
              style={{
                fontFamily: 'Manrope', fontSize: 14, fontWeight: 600,
                color: '#fff', background: '#4F46E5',
                padding: '10px 20px', borderRadius: 8, textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
                display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#4338CA'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Trabajemos juntos →
            </a>
          )}

          {/* Hamburger button */}
          {showHamburger && (
            <button
              onClick={() => setOpen(!open)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}
              aria-label="Toggle menu"
            >
              <span style={{ display: 'block', width: 24, height: 2, background: '#111318', borderRadius: 2, transition: 'transform 0.3s, opacity 0.3s', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: 24, height: 2, background: '#111318', borderRadius: 2, transition: 'opacity 0.3s', opacity: open ? 0 : 1 }} />
              <span style={{ display: 'block', width: 24, height: 2, background: '#111318', borderRadius: 2, transition: 'transform 0.3s', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          )}
        </div>

        {/* Mobile / Tablet menu drawer */}
        {showHamburger && (
          <div style={{
            overflow: 'hidden',
            maxHeight: open ? 480 : 0,
            transition: 'max-height 0.35s ease',
          }}>
            <div style={{ paddingTop: 8, paddingBottom: 20, display: 'flex', flexDirection: 'column' }}>
              {links.map((link, i) => (
                <a
                  key={link}
                  href={hrefs[i]}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: 'Manrope', fontSize: 16, fontWeight: 500,
                    color: '#111318', textDecoration: 'none',
                    padding: '14px 4px',
                    borderBottom: '1px solid #F0F1F4',
                    display: 'block',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#4F46E5')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#111318')}
                >
                  {link}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                style={{
                  marginTop: 16,
                  fontFamily: 'Manrope', fontSize: 15, fontWeight: 700,
                  color: '#fff', background: '#4F46E5',
                  padding: '14px 20px', borderRadius: 10,
                  textDecoration: 'none', textAlign: 'center',
                  display: 'block',
                }}
              >
                Trabajemos juntos →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
