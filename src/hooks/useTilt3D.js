import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion.js'

/**
 * useTilt3D — Aplica una rotación 3D perspective a un elemento siguiendo el ratón.
 * Incluye glare dinámico (reflejo que sigue el ángulo del ratón).
 *
 * @param {Object} options
 * @param {number} options.maxTilt   — Grados máximos de inclinación (defecto 8)
 * @param {number} options.perspective — Valor de perspective CSS (defecto 1000)
 * @param {number} options.scale    — Escala al hacer hover (defecto 1.02)
 * @param {number} options.speed    — Duración de la transición al reset (ms)
 * @param {boolean} options.gyro    — Usa deviceorientation como fallback táctil
 * @param {boolean} options.glare   — Activar efecto de brillo angular (defecto true)
 * @returns {React.RefObject} ref   — Ref a pegar en el elemento
 */
export function useTilt3D({
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  gyro = false,
  glare = true,
} = {}) {
  const ref = useRef(null)
  const state = useRef({ rect: null, isHovering: false, rafId: null })
  const reduced = useReducedMotion()

  /* ── Calcula rotación + glare desde coordenadas ── */
  const applyTilt = useCallback((x, y) => {
    const el = ref.current
    if (!el) return

    const { rect } = state.current
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (x - centerX) / (rect.width / 2)   // -1..1
    const deltaY = (y - centerY) / (rect.height / 2)  // -1..1

    const tiltY = deltaX * maxTilt
    const tiltX = -deltaY * maxTilt

    // Glare: ángulo desde el centro + intensidad basada en distancia
    if (glare) {
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90
      const intensity = Math.min(1, Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 1.2)
      el.style.setProperty('--glare-angle', `${angle}deg`)
      el.style.setProperty('--glare-intensity', intensity.toString())
    }

    const transform = `
      perspective(${perspective}px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `

    el.style.transform = transform
  }, [maxTilt, perspective, scale, glare])

  /* ── Resetea la posición ── */
  const resetTilt = useCallback(() => {
    const el = ref.current
    if (!el) return

    el.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`
    el.style.transform = `
      perspective(${perspective}px)
      rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)
    `

    setTimeout(() => {
      if (el) el.style.transition = ''
    }, speed)
  }, [perspective, speed])

  /* ── Mouse move ── */
  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const refreshRect = () => {
      state.current.rect = el.getBoundingClientRect()
    }

    const onEnter = () => {
      refreshRect()
      state.current.isHovering = true
    }

    const onMove = (e) => {
      if (!state.current.isHovering) return
      applyTilt(e.clientX, e.clientY)
    }

    const onLeave = () => {
      state.current.isHovering = false
      resetTilt()
    }

    // Re-calcular rect si hay scroll mientras se hace hover
    window.addEventListener('scroll', refreshRect, { passive: true })

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('scroll', refreshRect)
    }
  }, [reduced, applyTilt, resetTilt])

  /* ── Gyroscope (opcional, para móvil) ── */
  useEffect(() => {
    if (!gyro || reduced) return
    const el = ref.current
    if (!el) return

    let listening = false
    const handleOrientation = (e) => {
      if (!el) return
      const gamma = (e.gamma || 0) / 45   // -45..45 → -1..1
      const beta  = ((e.beta  || 0) - 45) / 45  // centrado

      if (!listening) {
        el.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`
        listening = true
      }

      const tiltY = gamma * maxTilt
      const tiltX = -beta * maxTilt

      el.style.transform = `
        perspective(${perspective}px)
        rotateX(${tiltX}deg) rotateY(${tiltY}deg)
        scale3d(1, 1, 1)
      `
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [gyro, reduced, maxTilt, perspective, speed])

  return ref
}
