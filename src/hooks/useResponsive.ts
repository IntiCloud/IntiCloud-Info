import { useEffect, useState } from 'react'

export function useResponsive() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    isMobile: width < 640,
    isTablet: width < 1024,
    width,
  }
}
