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

    /* ── Estado: arranca inactivo (cursor nativo visible) ── */
    let isActive = false
    let keyboardDetected = false
    let mouseEverMoved = false

    let mouseX = -100, mouseY = -100
    let cursorX = -100, cursorY = -100
    let rafId = null

    /* ── Activar cursor personalizado (oculta nativo, muestra puntito) ── */
    const activate = () => {
      if (isActive) return
      isActive = true
      keyboardDetected = false
      document.documentElement.classList.add('custom-cursor-active')
      el.classList.add('cursor-visible')
    }

    /* ── Desactivar cursor personalizado (restaura cursor nativo) ── */
    const deactivate = () => {
      if (!isActive) return
      isActive = false
      document.documentElement.classList.remove('custom-cursor-active')
      el.classList.remove('cursor-visible')
    }

    /* ── Interpolación lerp (siempre corre para mantener posición actualizada) ── */
    const lerp = () => {
      cursorX += (mouseX - cursorX) * 0.18
      cursorY += (mouseY - cursorY) * 0.18

      el.style.transform = `translate(${cursorX}px, ${cursorY}px)`

      rafId = requestAnimationFrame(lerp)
    }

    /* ── Mouse move: activar en primer movimiento + hover ── */
    const handleMouse = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Primer movimiento del mouse: activar cursor personalizado
      if (!mouseEverMoved) {
        mouseEverMoved = true
        activate()
      }

      // Si venía de teclado, reactivar cursor personalizado
      if (keyboardDetected) activate()

      const target = e.target
      const isHover = !!target.closest(
        'a, button, [data-cursor-hover], .card-spotlight, .service-card, .project-card'
      )
      el.classList.toggle('cursor-hover', isHover)
    }

    /* ── Teclado: detectar Tab → desactivar cursor personalizado ── */
    const handleKey = (e) => {
      if (e.key === 'Tab') {
        keyboardDetected = true
        deactivate()
      }
    }

    document.addEventListener('mousemove', handleMouse, { passive: true })
    document.addEventListener('keydown', handleKey, { passive: true })

    rafId = requestAnimationFrame(lerp)

    /* ── Cleanup ── */
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouse)
      document.removeEventListener('keydown', handleKey)
      document.documentElement.classList.remove('custom-cursor-active')
      el.remove()
    }
  }, [reduced])

  return null
}
