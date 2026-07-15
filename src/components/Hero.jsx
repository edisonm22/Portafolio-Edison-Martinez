import { useEffect, useRef, useState, useCallback } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import HeroThreeScene from './HeroThreeScene.jsx'

export default function Hero() {
  const revealRef = useScrollReveal()
  const reduced = useReducedMotion()
  const ctaRef = useRef(null)
  const projectsRef = useRef(null)
  const depthLayersRef = useRef([])
  const [countersVisible, setCountersVisible] = useState(false)
  const countersRef = useRef(null)
  const [wordRevealDone, setWordRevealDone] = useState(false)
  const [typingDone, setTypingDone] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useMagnetic(ctaRef, { maxTranslate: 6, lerp: 0.15 })
  useMagnetic(projectsRef, { maxTranslate: 6, lerp: 0.15 })

  /* ── Word-by-word reveal del H1 ── */
  useEffect(() => {
    if (reduced) {
      setWordRevealDone(true)
      return
    }
    const t = setTimeout(() => setWordRevealDone(true), 800)
    return () => clearTimeout(t)
  }, [reduced])

  /* ── Mostrar scroll indicator tras typing ── */
  useEffect(() => {
    if (reduced) { setShowScrollIndicator(true); return }
    const t = setTimeout(() => setShowScrollIndicator(true), 2000)
    return () => clearTimeout(t)
  }, [reduced])

  /* ── Animated counters al entrar en viewport ── */
  useEffect(() => {
    const el = countersRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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

  /* ── Mouse parallax depth on text layers ── */
  useEffect(() => {
    if (reduced) return
    const hero = revealRef.current
    if (!hero) return

    const layers = hero.querySelectorAll('[data-depth]')
    depthLayersRef.current = layers

    let rafId = null
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0

    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      currentX += (mouseX - currentX) * 0.05
      currentY += (mouseY - currentY) * 0.05

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 1
        const x = currentX * 12 * depth
        const y = currentY * 8 * depth
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })

      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMouse, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMouse)
      if (rafId) cancelAnimationFrame(rafId)
    }
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
      {/* Blobs con parallax + morphing */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="parallax-blob blob-morph-1 absolute -top-24 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
        />
        <div
          className="parallax-blob blob-morph-2 absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
        />
        <div
          className="parallax-blob blob-morph-3 absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl"
          style={{ willChange: 'transform' }}
        />

        {/* Floating CSS particles */}
        <div className="hero-particle hero-particle-1" />
        <div className="hero-particle hero-particle-2" />
        <div className="hero-particle hero-particle-3" />
        <div className="hero-particle hero-particle-4" />
        <div className="hero-particle hero-particle-5" />

        {/* ── Hero Three.js Scene (desktop only) ── */}
        <div className="hidden lg:block absolute inset-0">
          <HeroThreeScene reduced={reduced} />
        </div>
      </div>

      <div className="relative z-10 max-w-[65ch]">
        <span
          className="font-mono text-[13px] text-primary tracking-[0.15em] uppercase mb-6 block reveal"
          data-reveal-delay="0"
          data-depth="2"
        >
          &mdash;&nbsp; Intro
        </span>

        <h1 className="mb-6 reveal" data-reveal-delay="100" data-depth="1.5">
          <span
            className="block font-display font-bold leading-[0.95] tracking-[-0.03em] text-light"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 6.5rem)' }}
          >
            <span className={`word-reveal-container ${wordRevealDone ? 'word-reveal-done' : ''}`}>
              <span className="word-reveal-word" style={{ '--word-delay': '0ms' }}>
                Edison
              </span>
            </span>
            <br />
            <span className="relative inline-block mt-1">
              <span className={`word-reveal-container ${wordRevealDone ? 'word-reveal-done' : ''}`}>
                <span className="word-reveal-word gradient-text-animated" style={{ '--word-delay': '120ms' }}>
                  Martinez
                </span>
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/60 to-accent/60 rounded-full blur-[1px]" />
            </span>
          </span>
        </h1>

        <TypedSubtitle reduced={reduced} onDone={() => setTypingDone(true)} />

        <p
          className="text-surface-400 text-base sm:text-lg leading-relaxed mb-10 reveal"
          style={{ maxWidth: '65ch' }}
          data-reveal-delay="250"
          data-depth="0.8"
        >
          Construyo productos digitales escalables, performantes y con excelente
          experiencia de desarrollo. 5+ a&ntilde;os transformando ideas en soluciones
          robustas con React, Node.js y arquitectura cloud.
        </p>

        {/* CTAs magnéticos */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 reveal"
          data-reveal-delay="350"
          data-depth="0.5"
        >
          <div ref={ctaRef} className="sm:flex-1">
            <a
              href="#contact"
              className="btn-gradient-border group relative w-full inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 bg-primary text-black font-bold text-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-button-glow active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative whitespace-nowrap">Contratarme</span>
              <svg
                className="relative w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div ref={projectsRef} className="sm:flex-1">
            <a
              href="#projects"
              className="group w-full inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 border border-surface-800 text-surface-500 font-semibold text-sm rounded-xl transition-all duration-300 hover:border-primary/30 hover:text-light hover:bg-primary/5 active:scale-[0.98]"
            >
              <span className="whitespace-nowrap">Ver Proyectos</span>
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats with animated counters */}
        <div
          ref={countersRef}
          className="mt-12 sm:mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm reveal"
          data-reveal-delay="450"
        >
          <div>
            <CounterValue target={5} suffix="+" visible={countersVisible} />
            <span className="text-surface-700 ml-2">a&ntilde;os exp.</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-surface-800" />
          <div className="w-full sm:w-auto h-px sm:hidden bg-surface-800" />
          <div>
            <CounterValue target={15} suffix="+" visible={countersVisible} />
            <span className="text-surface-700 ml-2">proyectos</span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-surface-800" />
          <div>
            <CounterValue target={100} suffix="%" visible={countersVisible} />
            <span className="text-surface-700 ml-2">satisf.</span>
          </div>
        </div>
      </div>

      {/* ── Scroll-down indicator (desktop only) ── */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 transition-all duration-1000 ${
          showScrollIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-[10px] font-mono text-surface-600 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 border-2 border-surface-700 rounded-full flex justify-center">
          <div className="w-1 h-2.5 bg-primary rounded-full mt-2 animate-scroll-dot" />
        </div>
      </div>
    </header>
  )
}

/* ── Typing effect for subtitle ── */
function TypedSubtitle({ reduced, onDone }) {
  const fullText = '< Full-Stack Developer />'
  const [displayed, setDisplayed] = useState(reduced ? fullText : '')
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    if (reduced) {
      setDisplayed(fullText)
      onDone?.()
      return
    }

    let idx = 0
    const interval = setInterval(() => {
      idx++
      setDisplayed(fullText.slice(0, idx))
      if (idx >= fullText.length) {
        clearInterval(interval)
        onDone?.()
      }
    }, 40)

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)

    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [reduced, onDone])

  return (
    <p
      className="font-mono text-base sm:text-lg text-surface-500 mb-6 reveal"
      data-reveal-delay="200"
      data-depth="1.2"
    >
      {displayed}
      <span
        className={`inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle transition-opacity duration-100 ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </p>
  )
}

/* ── Animated counter component ── */
function CounterValue({ target, suffix, visible }) {
  const [value, setValue] = useState(0)
  const animated = useRef(false)

  useEffect(() => {
    if (!visible || animated.current) return
    animated.current = true

    const duration = 1200
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
  }, [visible, target])

  return (
    <span className="font-bold text-light text-lg tabular-nums">
      {value}{suffix}
    </span>
  )
}
