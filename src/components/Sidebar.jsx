import { useState, useEffect } from 'react'
import { navItems } from '../data/navData.js'
import { scrollToSection } from '../utils/helpers.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const SECTION_NUMS = { home: '—', projects: '01', skills: '02', services: '03', contact: '04' }

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const reduced = useReducedMotion()

  /* ── Scroll spy ── */
  useEffect(() => {
    const sectionIds = navItems.map((i) => i.id)
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* ── Scroll progress bar ── */
  useEffect(() => {
    if (reduced) return

    const update = (virtualScroll) => {
      const docEl = document.documentElement
      // Si viene de Lenis, usar su scroll virtual; si no, usar scrollTop nativo
      const scrollTop = virtualScroll ?? docEl.scrollTop ?? document.body.scrollTop ?? 0
      const scrollHeight = docEl.scrollHeight - docEl.clientHeight
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    const onLenisScroll = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => { update(e.detail.scroll); ticking = false })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('lenis-scroll', onLenisScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('lenis-scroll', onLenisScroll)
    }
  }, [reduced])

  /* ── Cerrar menú al redimensionar a desktop ── */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = () => { if (mq.matches) setMobileOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleNav = (id) => {
    scrollToSection(id)
    setMobileOpen(false)
  }

  const currentNum = SECTION_NUMS[activeSection] || '—'

  return (
    <>
      {/* ───────────────── Desktop Sidebar ───────────────── */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-30 w-72 h-screen flex-col justify-between px-8 py-10 border-r border-white/5 bg-surface-950/70 backdrop-blur-2xl">
        {/* Scroll progress bar */}
        <div className="scroll-progress-track">
          <div
            className="scroll-progress-bar"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {/* Gradient accent line at top */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-primary/60 via-accent/40 to-transparent" />

        {/* Top: Brand + Nav */}
        <div className="flex flex-col gap-6">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('home') }}
            className="group"
            aria-label="Edison Martinez — Inicio"
          >
            <span className="text-2xl font-bold font-display tracking-tight text-light">
              EM<span className="text-primary">.</span>
            </span>
            <span className="block text-[11px] font-mono text-surface-600 mt-1 tracking-[0.15em] uppercase">
              Full-Stack Developer
            </span>
          </a>

          {/* Navigation */}
          <nav aria-label="Navegación principal">
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => { e.preventDefault(); handleNav(item.id) }}
                      className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-primary/8 text-light font-semibold'
                          : 'text-surface-500 hover:text-surface-300 hover:bg-surface-900/50'
                      }`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {/* Indicador activo */}
                      <span
                        className={`shrink-0 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'w-1.5 h-1.5 bg-primary shadow-[0_0_8px_rgba(14,165,233,0.5)]'
                            : 'w-1 h-1 bg-surface-700 group-hover:bg-surface-500'
                        }`}
                      />
                      <span className="text-sm tracking-wide">
                        {item.label}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom: Section number + Social + Footer */}
        <div className="space-y-4">
          {/* Section number (animated) */}
          <div className="overflow-hidden">
            <span
              key={currentNum}
              className="section-num-animate block font-mono text-[1.75rem] font-bold text-surface-800/80 leading-none tracking-tight"
            >
              {currentNum}
            </span>
          </div>

          <div className="h-px bg-gradient-to-r from-surface-800 via-surface-800/50 to-transparent" />

          {/* Social links */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/edisonm22"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-900/50 border border-surface-800/50 text-surface-600 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/edison-mart%C3%ADnez-0b7501276/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-900/50 border border-surface-800/50 text-surface-600 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <p className="font-mono text-[10px] text-surface-700 tracking-[0.1em] uppercase">
            &copy; {new Date().getFullYear()} Edison Martinez
          </p>
        </div>
      </aside>

      {/* ───────────────── Mobile Header ───────────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-70 flex items-center justify-between px-5 h-16 bg-surface-950/85 backdrop-blur-xl border-b border-surface-800/60">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav('home') }}
          className="text-lg font-bold font-display tracking-tight text-light"
          aria-label="Edison Martinez"
        >
          EM<span className="text-primary">.</span>
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-surface-900 border border-surface-800 text-surface-400 hover:text-primary hover:border-primary/40 transition-all"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <div className="relative w-5 h-4">
            <span className={`absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
              mobileOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
            }`} />
            <span className={`absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
            }`} />
            <span className={`absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
              mobileOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'
            }`} />
          </div>
        </button>
      </header>

      {/* ───────────────── Mobile Menu Overlay ───────────────── */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-60 transition-all duration-500 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-surface-950/70 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-surface-900 border-l border-surface-800 shadow-elevated transition-transform duration-500 ease-out-expo overflow-y-auto ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8 pb-8">
            <nav className="flex-1">
              <ul className="space-y-1">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => { e.preventDefault(); handleNav(item.id) }}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base transition-all duration-300 ${
                          isActive
                            ? 'bg-primary/8 text-primary border border-primary/20 font-semibold'
                            : 'text-surface-400 hover:bg-surface-800 hover:text-surface-300'
                        }`}
                        style={{
                          transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                          transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                          opacity: mobileOpen ? 1 : 0,
                        }}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        )}
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex gap-3 pt-6 border-t border-surface-800">
              <a
                href="https://github.com/edisonm22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-800 border border-surface-700 text-surface-500 transition-all hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/edison-mart%C3%ADnez-0b7501276/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-800 border border-surface-700 text-surface-500 transition-all hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
