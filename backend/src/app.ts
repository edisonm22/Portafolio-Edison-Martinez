import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import projectRoutes from './routes/projects'
import skillRoutes from './routes/skills'
import messageRoutes from './routes/messages'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }))
app.use(morgan('dev'))
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: 'Too many requests' }))

app.get('/api/health', (_req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }))

app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/messages', messageRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

async function startServer() {
  try {
    const uri = process.env.MONGODB_URI
    if (uri) {
      await mongoose.connect(uri)
      console.log('Connected to MongoDB Atlas')
    } else {
      const { MongoMemoryServer } = await import('mongodb-memory-server')
      const mem = await MongoMemoryServer.create()
      await mongoose.connect(mem.getUri())
      console.log('Using MongoDB in-memory server (dev)')
    }

    await seedDatabase()

    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`))
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

async function seedDatabase() {
  const { Project } = await import('./models/Project')
  const { Skill } = await import('./models/Skill')

  const skillsCount = await Skill.countDocuments()
  if (skillsCount === 0) {
    await Skill.insertMany([
      { name: 'React', category: 'frontend', level: 95 },
      { name: 'TypeScript', category: 'frontend', level: 90 },
      { name: 'Node.js', category: 'backend', level: 90 },
      { name: 'Express', category: 'backend', level: 88 },
      { name: 'MongoDB', category: 'database', level: 85 },
      { name: 'PostgreSQL', category: 'database', level: 80 },
      { name: 'Docker', category: 'devops', level: 80 },
      { name: 'AWS', category: 'devops', level: 75 },
      { name: 'Git', category: 'tools', level: 95 },
      { name: 'Testing (Jest/Vitest)', category: 'tools', level: 85 },
    ])
    console.log('Skills seeded')
  }

  const projectsCount = await Project.countDocuments()
  if (projectsCount === 0) {
    await Project.insertMany([
      {
        title: 'E-commerce Full-Stack',
        description: 'Complete online store with cart, payments, and admin panel using MERN stack.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
        featured: true,
      },
      {
        title: 'Landing Page Startup',
        description: 'High-conversion single-page landing page for a SaaS startup.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        featured: true,
      },
      {
        title: 'Analytics Dashboard',
        description: 'Real-time dashboard with charts and user authentication.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
        featured: false,
      },
    ])
    console.log('Projects seeded')
  }
}

startServer()