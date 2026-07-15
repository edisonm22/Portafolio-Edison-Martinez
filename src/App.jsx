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

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)),
      orientation: 'vertical',
      smoothWheel: true,
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
