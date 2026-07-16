import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/**
 * CounterValue — Contador animado que incrementa de 0 a target.
 *
 * @param {Object}   props
 * @param {number}   props.target    — Valor final
 * @param {string}   props.suffix    — Sufijo (ej. "+", "%")
 * @param {number}   props.duration  — Duración en ms (defecto 1200)
 * @param {string}   props.className — Clases adicionales
 */
export default function CounterValue({
  target,
  suffix = '',
  duration = 1200,
  className = '',
}) {
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(false)
  const animated = useRef(false)
  const elRef = useRef(null)
  const reduced = useReducedMotion()

  /* ── IntersectionObserver para detectar entrada ── */
  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* ── Animar contador ── */
  useEffect(() => {
    if (!visible || animated.current) return
    animated.current = true

    if (reduced) {
      setValue(target)
      return
    }

    const start = performance.now()

    const update = (now) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      // Ease-out quad
      const eased = 1 - Math.pow(1 - progress, 2)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }, [visible, target, duration, reduced])

  return (
    <span
      ref={elRef}
      className={`font-bold text-light text-lg tabular-nums ${className}`}
    >
      {value}{suffix}
    </span>
  )
}
