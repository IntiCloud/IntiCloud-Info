import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 200, background: 'transparent' }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #4F46E5, #818CF8, #4F46E5)',
        backgroundSize: '200% 100%',
        transition: 'width 0.08s linear',
        boxShadow: '0 0 8px rgba(79,70,229,0.6)',
      }} />
    </div>
  )
}
