import { useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

/**
 * Puntito decorativo que sigue al ratón.
 * NO oculta el cursor nativo — es solo un adorno visual.
 * Sólo en desktop (pointer:fine).
 */
export default function Cursor() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || matchMedia('(pointer: coarse)').matches) return

    const el = document.createElement('div')
    el.id = 'custom-cursor'
    el.classList.add('cursor-visible')
    document.body.appendChild(el)

    let mouseX = -100, mouseY = -100
    let cursorX = -100, cursorY = -100
    let rafId = null

    const lerp = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      el.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      rafId = requestAnimationFrame(lerp)
    }

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

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouse)
      el.remove()
    }
  }, [reduced])

  return null
}
