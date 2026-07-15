import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion.js'

/**
 * Efecto magnético: el elemento se desplaza suavemente hacia el cursor.
 * Sólo en desktop (pointer:fine).
 *
 * @param {React.RefObject} ref - Ref al elemento wrapper
 * @param {Object} options
 * @param {number} options.maxDist - Distancia máxima de activación (px)
 * @param {number} options.maxTranslate - Desplazamiento máximo (px)
 * @param {number} options.lerp - Factor de interpolación (0-1)
 */
export function useMagnetic(ref, {
  maxDist = 160,
  maxTranslate = 8,
  lerp = 0.12,
} = {}) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || matchMedia('(pointer: coarse)').matches) return

    let rafId = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < maxDist && dist > 0) {
        const strength = 1 - dist / maxDist
        const angle = Math.atan2(dy, dx)
        targetX = Math.cos(angle) * strength * maxTranslate
        targetY = Math.sin(angle) * strength * maxTranslate
      } else {
        targetX = 0
        targetY = 0
      }
    }

    const animate = () => {
      currentX += (targetX - currentX) * lerp
      currentY += (targetY - currentY) * lerp

      el.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`

      if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
        rafId = requestAnimationFrame(animate)
      } else {
        rafId = null
      }
    }

    const handleLeave = () => {
      targetX = 0
      targetY = 0
      if (!rafId) rafId = requestAnimationFrame(animate)
    }

    el.addEventListener('mousemove', handleMove, { passive: true })
    el.addEventListener('mouseleave', handleLeave, { passive: true })

    /* ── Limpiar transform al redimensionar (evita desalineación) ── */
    const handleResize = () => {
      targetX = 0; targetY = 0
      currentX = 0; currentY = 0
      el.style.transform = ''
      if (rafId) { cancelAnimationFrame(rafId); rafId = null }
    }
    window.addEventListener('resize', handleResize, { passive: true })

    rafId = requestAnimationFrame(animate)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
      el.style.transform = ''
    }
  }, [ref, maxDist, maxTranslate, lerp, reduced])
}
