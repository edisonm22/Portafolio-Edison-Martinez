import { useEffect, useRef } from 'react'

/**
 * Custom hook para animaciones scroll-reveal.
 * Usa IntersectionObserver — zero libraries.
 *
 * @param {Object} options
 * @param {number} options.threshold - 0-1, qué % del elemento debe ser visible (default 0.15)
 * @param {string} options.rootMargin - margen extra (default '0px 0px -60px 0px')
 * @param {boolean} options.triggerOnce - si se desactiva después de la primera vez (default true)
 * @returns {React.RefObject} ref para asignar al contenedor padre
 *
 * Uso:
 *   const ref = useScrollReveal({ threshold: 0.1 })
 *   return <section ref={ref}>...</section>
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Si el usuario ya está viendo el elemento (scroll cargado), lo mostramos
    const alreadyVisible = () => {
      const rect = node.getBoundingClientRect()
      return rect.top < window.innerHeight * (1 - threshold)
    }
    if (alreadyVisible()) {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Activar reveal en hijos con data-reveal-delay
          const children = node.querySelectorAll('[data-reveal-delay]')
          children.forEach((child, i) => {
            const delay = child.dataset.revealDelay || i * 80
            child.style.setProperty('--reveal-delay', delay)
            child.classList.add('is-visible')
          })
          // También activar el propio contenedor si tiene clase 'reveal'
          node.classList.add('is-visible')

          if (triggerOnce) observer.unobserve(node)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return ref
}

/**
 * Hook simplificado que retorna ref y clase isVisible para un solo elemento.
 */
export function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Cache: si ya estaba visible, no hacemos observer
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * (1 - threshold)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
