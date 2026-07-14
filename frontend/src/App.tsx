import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navbar } from './components/Navbar'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Services } from './components/sections/Services'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import CVLayout from './components/CVLayout'
import { ThemeProvider } from './context/ThemeContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

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
  const [, setSkills] = useState(FALLBACK_SKILLS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          axios.get(API_URL + '/api/projects'),
          axios.get(API_URL + '/api/skills')
        ])
        setProjects(projectsRes.data)
        setSkills(skillsRes.data)
      } catch {
        console.log('Using fallback data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Navbar />
      <Hero />
      <Projects projects={projects} loading={loading} />
      <Skills loading={loading} />
      <Services />
      <Contact />
      <CVLayout />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}