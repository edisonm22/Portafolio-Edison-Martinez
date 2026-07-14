import { useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/**
 * Cursor personalizado con interpolación (lerp).
 * Sólo en desktop (pointer:fine). No interfiere con teclado/foco.
 */
export default function Cursor() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || matchMedia('(pointer: coarse)').matches) return

    /* ── Crear elemento DOM del cursor ── */
    const el = document.createElement('div')
    el.id = 'custom-cursor'
    document.body.appendChild(el)
    document.documentElement.classList.add('custom-cursor-active')

    let mouseX = -100, mouseY = -100
    let cursorX = -100, cursorY = -100
    let rafId = null

    /* ── Interpolación lerp ── */
    const lerp = () => {
      cursorX += (mouseX - cursorX) * 0.18
      cursorY += (mouseY - cursorY) * 0.18

      el.style.transform = `translate(${cursorX}px, ${cursorY}px)`

      // Mostrar cursor tras el primer movimiento
      if (!el.classList.contains('cursor-visible') && mouseX > 0) {
        el.classList.add('cursor-visible')
      }

      rafId = requestAnimationFrame(lerp)
    }

    /* ── Mouse move: posición + hover detection ── */
    const handleMouse = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const target = e.target
      const isHover = !!target.closest(
        'a, button, [data-cursor-hover], .card-spotlight, .service-card, .project-card'
      )
      el.classList.toggle('cursor-hover', isHover)
    }

    document.addEventListener('mousemove', handleMouse, { passive: true })

    rafId = requestAnimationFrame(lerp)

    /* ── Cleanup ── */
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouse)
      document.documentElement.classList.remove('custom-cursor-active')
      el.remove()
    }
  }, [reduced])

  return null
}
