import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'
import { useScrollSpy } from './hooks/useScrollSpy'

const API_URL = 'http://127.0.0.1:5000'

const SECTION_IDS = ['home', 'projects', 'skills', 'services', 'contact']

const FALLBACK_PROJECTS = [
  { _id: '1', title: 'E-commerce Full-Stack', description: 'Tienda en linea completa con carrito, pagos y panel admin usando MERN stack.', technologies: ['React', 'Node.js', 'Express', 'MongoDB'] },
  { _id: '2', title: 'Landing Page Startup', description: 'Pagina de aterrizaje de una sola pagina con alta tasa de conversion.', technologies: ['HTML5', 'CSS3', 'JavaScript'] },
  { _id: '3', title: 'Dashboard Analitico', description: 'Panel de control con graficas en tiempo real y autenticacion de usuarios.', technologies: ['React', 'Express', 'MongoDB'] }
]

const FALLBACK_SKILLS = [
  { _id: 's1', name: 'HTML5', level: 95 }, { _id: 's2', name: 'CSS3', level: 92 },
  { _id: 's3', name: 'JavaScript', level: 90 }, { _id: 's4', name: 'React', level: 88 },
  { _id: 's5', name: 'Node.js', level: 85 }, { _id: 's6', name: 'Express.js', level: 85 },
  { _id: 's7', name: 'MongoDB', level: 82 }, { _id: 's8', name: 'Git', level: 80 }
]

function AppContent() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [skills, setSkills] = useState(FALLBACK_SKILLS)
  const [loading, setLoading] = useState(true)
  const activeSection = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          axios.get(API_URL + '/api/projects'),
          axios.get(API_URL + '/api/skills')
        ])
        setProjects(projectsRes.data)
        setSkills(skillsRes.data)
      } catch (err) {
        console.log('Using fallback data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='app'>
      <Navbar activeSection={activeSection} />
      <Hero />
      <Projects projects={projects} loading={loading} />
      <Skills skills={skills} loading={loading} />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
