import { ThemeProvider } from './context/ThemeContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'
import CVLayout from './components/cv/CVLayout.jsx'
import { cvData } from './data/cvData.js'

export default function App() {
  return (
    <ThemeProvider>
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <Projects />
        <Skills />
        <Services />
        <Contact />
        <CVLayout cvData={cvData} />
      </main>
    </ThemeProvider>
  )
}

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0ea5e9] text-white font-semibold rounded-lg"
    >
      Saltar al contenido principal
    </a>
  )
}
