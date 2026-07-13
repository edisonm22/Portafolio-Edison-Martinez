import { Project } from '../models/Project'
import { Skill } from '../models/Skill'

export async function seedDatabase() {
  const projectsCount = await Project.countDocuments()
  const skillsCount = await Skill.countDocuments()

  if (projectsCount === 0) {
    await Project.insertMany([
      {
        title: 'E-commerce Full-Stack',
        description: 'Complete online store with cart, payments, and admin panel using MERN stack.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
        featured: true,
      },
      {
        title: 'Startup Landing Page',
        description: 'High-conversion single-page landing page with animations and forms.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        featured: true,
      },
      {
        title: 'Analytics Dashboard',
        description: 'Real-time dashboard with charts and user authentication.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Socket.io'],
        featured: false,
      },
    ])
    console.log('Projects seeded')
  }

  if (skillsCount === 0) {
    await Skill.insertMany([
      { name: 'React', category: 'frontend', level: 95 },
      { name: 'TypeScript', category: 'frontend', level: 92 },
      { name: 'Node.js', category: 'backend', level: 90 },
      { name: 'Express.js', category: 'backend', level: 88 },
      { name: 'MongoDB', category: 'database', level: 85 },
      { name: 'PostgreSQL', category: 'database', level: 80 },
      { name: 'Docker', category: 'devops', level: 82 },
      { name: 'AWS', category: 'devops', level: 80 },
      { name: 'Git', category: 'tools', level: 90 },
    ])
    console.log('Skills seeded')
  }
}