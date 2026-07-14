import { useState, useEffect } from 'react'

/**
 * Hook centralizado para prefers-reduced-motion.
 * Retorna `true` si el usuario prefiere animaciones reducidas.
 * También agrega/remueve la clase `reduced-motion` en <html>.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => {
      setReduced(e.matches)
      document.documentElement.classList.toggle('reduced-motion', e.matches)
    }

    // Estado inicial
    document.documentElement.classList.toggle('reduced-motion', mq.matches)
    mq.addEventListener('change', handler)

    return () => {
      mq.removeEventListener('change', handler)
      document.documentElement.classList.remove('reduced-motion')
    }
  }, [])

  return reduced
}

/**
 * Versión síncrona para usar fuera de React (efectos, Loader).
 */
export function reducedMotionNow() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
