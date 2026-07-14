import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">
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
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-black font-semibold rounded-lg"
    >
      Saltar al contenido principal
    </a>
  )
}
