import { useState, useEffect } from 'react'
import { navItems } from '../data/navData.js'
import { scrollToSection } from '../utils/helpers.js'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  /* ── Scroll spy ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })

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

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-950/80 backdrop-blur-xl saturate-150 border-b border-surface-800 shadow-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
            className="relative group"
            aria-label="Edison Martinez — Inicio"
          >
            <span className="text-lg font-black tracking-tight text-light transition-colors duration-300">
              EM<span className="text-primary ml-px">.</span>
            </span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-light bg-surface-800/80'
                      : 'text-muted hover:text-surface-400 hover:bg-surface-800/40'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-surface-800 border border-surface-700 text-muted hover:border-primary hover:text-primary transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
                }`}
              />
              <span
                className={`absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileOpen
                    ? 'bottom-1/2 translate-y-1/2 -rotate-45'
                    : 'bottom-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-surface-950/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-surface-850 border-l border-surface-800 shadow-elevated transition-transform duration-500 ease-out-expo ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-6 pb-8">
            <nav className="flex-1 space-y-1">
              {navItems.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                    setMobileOpen(false)
                  }}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted hover:bg-surface-800 hover:text-surface-400'
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                    transform: mobileOpen
                      ? 'translateX(0)'
                      : 'translateX(20px)',
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  )
}
