import { useState } from 'react'
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
