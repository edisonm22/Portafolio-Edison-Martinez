import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

export default function Hero() {
  const revealRef = useScrollReveal()
  const reduced = useReducedMotion()
  const ctaRef = useRef(null)
  const projectsRef = useRef(null)

  useMagnetic(ctaRef, { maxTranslate: 6, lerp: 0.15 })
  useMagnetic(projectsRef, { maxTranslate: 6, lerp: 0.15 })

  /* ── Parallax sutil en los blobs ── */
  useEffect(() => {
    if (reduced) return
    const hero = revealRef.current
    if (!hero) return

    const blobs = hero.querySelectorAll('.parallax-blob')
    if (!blobs.length) return

    const update = () => {
      const rect = hero.getBoundingClientRect()
      const top = rect.top
      const height = rect.height
      const progress = Math.max(0, Math.min(1, (window.innerHeight - top) / (window.innerHeight + height)))

      blobs.forEach((blob, i) => {
        const speed = 0.15 + i * 0.08
        blob.style.transform = `translate3d(0, ${progress * 80 * speed}px, 0)`
      })
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  return (
    <header
      id="home"
      ref={revealRef}
      className="relative min-h-[80vh] lg:min-h-screen flex items-center px-6 sm:px-8 lg:px-12 pt-12 lg:pt-0 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 40% at 0% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 100% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 55%), var(--color-surface-950)',
      }}
    >
      {/* Blobs con parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="parallax-blob absolute -top-24 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
        />
        <div
          className="parallax-blob absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="relative z-10 max-w-[65ch]">
        <span
          className="font-mono text-[13px] text-primary tracking-[0.15em] uppercase mb-6 block reveal"
          data-reveal-delay="0"
        >
          &mdash;&nbsp; Intro
        </span>

        <h1 className="mb-6 reveal" data-reveal-delay="100">
          <span
            className="block font-display font-bold leading-[0.95] tracking-[-0.03em] text-light"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 6.5rem)' }}
          >
            Edison
            <br />
            <span className="relative inline-block mt-1">
              <span className="bg-gradient-to-r from-light via-primary to-accent bg-clip-text text-transparent">
                Martinez
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/60 to-accent/60 rounded-full blur-[1px]" />
            </span>
          </span>
        </h1>

        <p
          className="font-mono text-base sm:text-lg text-surface-500 mb-6 reveal"
          data-reveal-delay="200"
        >
          {'< Full-Stack Developer />'}
        </p>

        <p
          className="text-surface-400 text-base sm:text-lg leading-relaxed mb-10 reveal"
          style={{ maxWidth: '65ch' }}
          data-reveal-delay="250"
        >
          Construyo productos digitales escalables, performantes y con excelente
          experiencia de desarrollo. 5+ a&ntilde;os transformando ideas en soluciones
          robustas con React, Node.js y arquitectura cloud.
        </p>

        {/* CTAs magnéticos */}
        <div
          className="flex flex-col sm:flex-row gap-4 reveal"
          data-reveal-delay="350"
        >
          <div ref={ctaRef} className="inline-block">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-black font-bold text-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-button-glow active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Contratarme</span>
              <svg
                className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div ref={projectsRef} className="inline-block">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-surface-800 text-surface-500 font-semibold text-sm rounded-xl transition-all duration-300 hover:border-primary/30 hover:text-light hover:bg-primary/5 active:scale-[0.98]"
            >
              <span>Ver Proyectos</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-12 sm:mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm reveal"
          data-reveal-delay="450"
        >
          <div>
            <span className="font-bold text-light text-lg">5+</span>
            <span className="text-surface-700 ml-2">a&ntilde;os exp.</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-surface-800" />
          <div className="w-full sm:w-auto h-px sm:hidden bg-surface-800" />
          <div>
            <span className="font-bold text-light text-lg">15+</span>
            <span className="text-surface-700 ml-2">proyectos</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-surface-800" />
          <div>
            <span className="font-bold text-light text-lg">100%</span>
            <span className="text-surface-700 ml-2">satisf.</span>
          </div>
        </div>
      </div>
    </header>
  )
}
