import { useEffect, useState, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

/**
 * BackToTop — Botón flotante en esquina inferior‑derecha.
 * - Aparece tras 30% de scroll.
 * - Anillo SVG circular que muestra el progreso de scroll.
 * - Usa lenis.scrollTo() si disponible, window.scrollTo como fallback.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()
  const btnRef = useRef(null)

  /* ── Scroll spy: progress + visibility ── */
  useEffect(() => {
    if (reduced) return

    const update = () => {
      const docEl = document.documentElement
      const scrollTop = docEl.scrollTop || document.body.scrollTop || 0
      const scrollHeight = docEl.scrollHeight - docEl.clientHeight

      if (scrollHeight > 0) {
        const pct = Math.min(1, scrollTop / scrollHeight)
        setProgress(pct)
        setVisible(pct > 0.3)
      }
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('lenis-scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('lenis-scroll', onScroll)
    }
  }, [reduced])

  /* ── Scroll to top ── */
  const scrollToTop = () => {
    const lenis = window.__lenis
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  /* ── Parámetros del círculo SVG ── */
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-surface-900 border border-surface-700/60 shadow-elevated transition-all duration-500 hover:border-primary/40 hover:shadow-glow-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 focus:outline-none ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Volver al inicio"
      title="Volver al inicio"
    >
      {/* SVG circular progress ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-surface-800"
        />
        {/* Progress arc */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="text-primary transition-[stroke-dashoffset] duration-200 ease-linear"
        />
      </svg>

      {/* Arrow icon */}
      <svg
        className="w-4 h-4 text-surface-300 relative z-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  )
}
