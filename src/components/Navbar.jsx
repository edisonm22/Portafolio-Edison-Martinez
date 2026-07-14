import { useState, useEffect } from 'react'
import { navItems } from '../data/navData.js'
import { scrollToSection } from '../utils/helpers.js'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { dark, toggleTheme } = useTheme()

  /* ── Scroll spy: detecta qué sección está visible ── */
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
          ? 'bg-[#0a0f1a]/80 backdrop-blur-xl saturate-150 border-b border-[#1e293b] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo / Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
            className="relative group"
            aria-label="Edison Martinez — Inicio"
          >
            <span className="text-lg font-black tracking-tight text-[#f1f5f9] transition-colors duration-300">
              EM<span className="text-[#0ea5e9] ml-px">.</span>
            </span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0ea5e9] to-[#a855f7] transition-all duration-300 group-hover:w-full" />
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
                      ? 'text-[#f1f5f9] bg-[#1e293b]/80'
                      : 'text-[#64748b] hover:text-[#94a3b8] hover:bg-[#1e293b]/40'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#0ea5e9]" />
                  )}
                </a>
              )
            })}

            {/* Theme Toggle Desktop */}
            <div className="ml-4 pl-4 border-l border-[#1e293b]">
              <ThemeToggleButton dark={dark} toggleTheme={toggleTheme} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#1e293b] border border-[#2d3a4f] text-[#94a3b8] hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-all"
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

      {/* Mobile Menu Overlay + Panel */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0a0f1a]/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-[#0f172a] border-l border-[#1e293b] shadow-2xl transition-transform duration-500 ease-out-expo ${
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
                      ? 'bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20'
                      : 'text-[#64748b] hover:bg-[#1e293b] hover:text-[#94a3b8]'
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
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] shrink-0" />
                  )}
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Theme toggle in mobile */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-xl bg-[#1e293b] border border-[#2d3a4f] text-[#94a3b8] hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-all mt-4"
            >
              {dark ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Modo claro
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Modo oscuro
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

/* ── Theme Toggle (Desktop) ── */
function ThemeToggleButton({ dark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-[#1e293b] border border-[#2d3a4f] text-[#94a3b8] hover:border-[#0ea5e9] hover:text-[#0ea5e9] hover:shadow-[0_0_20px_rgba(14,165,233,0.08)] transition-all duration-200"
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {dark ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}
