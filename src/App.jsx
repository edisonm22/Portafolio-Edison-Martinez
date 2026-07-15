import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Sidebar from './components/Sidebar.jsx'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const lenisRef = useRef(null)

  /* ── Lenis smooth scroll (desactivado si prefers-reduced-motion) ── */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: reduced ? 0 : 1.2,
      easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)),
      orientation: 'vertical',
      smoothWheel: !reduced,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis

    // Bridge: re-dispatch Lenis scroll como evento nativo con progress
    lenis.on('scroll', (e) => {
      window.dispatchEvent(
        new CustomEvent('lenis-scroll', {
          detail: { scroll: e.scroll, limit: e.limit, progress: e.progress },
        })
      )
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  /* ── Section title parallax ── */
  useEffect(() => {
    const handleScroll = () => {
      const titles = document.querySelectorAll('[data-parallax-speed]')
      titles.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.05
        const rect = el.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        const elCenter = rect.top + rect.height / 2
        const offset = (elCenter - viewportCenter) * speed
        el.style.transform = `translateY(${offset.toFixed(1)}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {!loaderDone && <Loader onFinish={() => setLoaderDone(true)} />}
      <Sidebar />
      <Cursor />
      <SkipLink />
      <div className="noise-overlay" />
      <main id="main" className="lg:ml-72 min-h-screen pt-16 lg:pt-0 max-w-full overflow-x-hidden">
        <Hero />
        <Projects />
        <Skills />
        <Services />
        <Contact />
      </main>
    </>
  )
}

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-black font-semibold rounded-lg"
    >
      Saltar al contenido principal
    </a>
  )
}
