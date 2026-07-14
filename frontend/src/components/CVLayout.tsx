import { CVHero } from './sections/CVHero'
import { CVAbout } from './sections/CVAbout'
import { CVExperience } from './sections/CVExperience'
import { CVSkills } from './sections/CVSkills'
import { CVProjects } from './sections/CVProjects'
import { CVEducation } from './sections/CVEducation'
import { CVContact } from './sections/CVContact'

const cvData = {
  personal: {
    name: 'Edison Martinez',
    title: 'Desarrollador Web Full-Stack',
    tagline: 'Especialista en React, Node.js & Arquitectura Cloud',
    email: 'edison.martinez@email.com',
    phone: '+34 600 000 000',
    location: 'Madrid, España',
    website: 'edisonmartinez.dev',
    linkedin: 'linkedin.com/in/edisonmartinez',
    github: 'github.com/edisonm22',
    avatar: null,
    summary: 'Desarrollador Full-Stack con 5+ años de experiencia construyendo aplicaciones web escalables y soluciones cloud-native. Experto en ecosistema JavaScript/TypeScript (React, Node.js, Next.js) y bases de datos modernas. Apasionado por el clean code, testing automatizado y DevOps. He liderado equipos de 3-8 desarrolladores entregando productos que sirven a 100K+ usuarios.',
  },
  experience: [
    {
      id: 1,
      role: 'Senior Full-Stack Developer',
      company: 'TechFlow Solutions',
      location: 'Madrid (Híbrido)',
      period: '2022 - Presente',
      description: 'Liderazgo técnico de equipo de 5 desarrolladores. Arquitectura y desarrollo de plataforma SaaS B2B.',
      achievements: [
        'Reducí tiempo de deployment 80% implementando CI/CD con GitHub Actions + Kubernetes',
        'Migración legacy (jQuery/PHP) → React/Node.js: +40% performance, -60% bugs',
        'Implementé micro-frontends con Module Federation escalando a 3 equipos paralelos',
        'Mentoring técnico: code reviews, pair programming, charlas internas mensuales',
      ],
      technologies: ['React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'Kubernetes', 'AWS', 'GraphQL'],
    },
    {
      id: 2,
      role: 'Full-Stack Developer',
      company: 'StartupHub',
      location: 'Barcelona (Remoto)',
      period: '2020 - 2022',
      description: 'Desarrollo end-to-end de MVP y evolución a producto escalable para marketplace B2C.',
      achievements: [
        'Construí arquitectura serverless (AWS Lambda + DynamoDB) reduciendo costes 70%',
        'Implementé pagos Stripe + sistema suscripciones: €120K ARR en 6 meses',
        'Diseñé API REST + GraphQL Gateway sirviendo 50K req/día con <100ms p95',
        'Automatización testing: 85% coverage (Jest + Cypress + Playwright)',
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'AWS', 'DynamoDB', 'Stripe', 'GraphQL'],
    },
    {
      id: 3,
      role: 'Frontend Developer',
      company: 'Digital Agency Pro',
      location: 'Valencia',
      period: '2018 - 2020',
      description: 'Desarrollo de interfaces complejas para clientes enterprise (banca, retail, telecom).',
      achievements: [
        'Migración AngularJS → React + Redux: mejora 3x en tiempo de carga',
        'Sistema de diseño compartido (Storybook) adoptado por 12 proyectos',
        'Accesibilidad WCAG 2.1 AA en 5 proyectos gubernamentales',
        'Performance: Lighthouse 95+ en todas las métricas core web vitals',
      ],
      technologies: ['React', 'Redux', 'TypeScript', 'SASS', 'Storybook', 'Jest', 'Webpack'],
    },
  ],
  skills: {
    technical: [
      { name: 'React / Next.js', level: 95, category: 'frontend' },
      { name: 'TypeScript / JavaScript', level: 95, category: 'frontend' },
      { name: 'Node.js / Express / NestJS', level: 90, category: 'backend' },
      { name: 'PostgreSQL / MongoDB / Redis', level: 85, category: 'database' },
      { name: 'GraphQL / REST APIs', level: 90, category: 'backend' },
      { name: 'AWS (Lambda, ECS, RDS, S3)', level: 85, category: 'cloud' },
      { name: 'Docker / Kubernetes', level: 80, category: 'cloud' },
      { name: 'CI/CD (GitHub Actions, GitLab)', level: 85, category: 'cloud' },
      { name: 'Testing (Jest, Cypress, Playwright)', level: 85, category: 'frontend' },
      { name: 'Git / GitFlow / Monorepos', level: 90, category: 'backend' },
    ],
    soft: [
      { name: 'Liderazgo Técnico', level: 90 },
      { name: 'Comunicación Efectiva', level: 95 },
      { name: 'Resolución de Problemas', level: 95 },
      { name: 'Mentoring & Coaching', level: 85 },
      { name: 'Gestión Proyectos Ágiles', level: 85 },
      { name: 'Inglés Técnico (C1)', level: 90 },
    ],
    languages: [
      { name: 'Español', level: 'Nativo', percent: 100 },
      { name: 'Inglés', level: 'Profesional (C1)', percent: 90 },
      { name: 'Francés', level: 'Intermedio (B2)', percent: 65 },
    ],
  },
  education: [
    {
      id: 1,
      degree: 'Máster en Ingeniería Web',
      institution: 'Universidad Politécnica de Madrid',
      year: '2017 - 2018',
      location: 'Madrid, España',
      honors: 'Matrícula de Honor',
      details: ['Especialización: Arquitectura de Software, Sistemas Distribuidos, Seguridad Web'],
    },
    {
      id: 2,
      degree: 'Grado en Ingeniería Informática',
      institution: 'Universidad de Valencia',
      year: '2013 - 2017',
      location: 'Valencia, España',
      honors: 'Notable (8.2/10)',
      details: ['Especialidad: Ingeniería del Software. Proyecto final: "Plataforma Colaborativa en Tiempo Real"'],
    },
  ],
  certifications: [
    { name: 'AWS Certified Solutions Architect - Associate', issuer: 'Amazon Web Services', date: '2023', credentialId: 'AWS-SAA-001' },
    { name: 'Kubernetes Administrator (CKA)', issuer: 'CNCF', date: '2023', credentialId: 'CKA-2023-004521' },
    { name: 'Professional Scrum Master I (PSM I)', issuer: 'Scrum.org', date: '2022', credentialId: 'PSM-1-123456' },
    { name: 'React Advanced Patterns', issuer: 'Frontend Masters', date: '2022', credentialId: 'FM-REACT-ADV' },
  ],
  projects: [
    {
      id: 1,
      name: 'TaskFlow Pro',
      description: 'Plataforma gestión de proyectos con tiempo real, Kanban, Gantt, reporting. 2K+ usuarios activos.',
      role: 'Tech Lead / Full-Stack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'AWS'],
      demoUrl: 'https://taskflow.demo',
      repoUrl: 'https://github.com/edisonm22/taskflow',
      highlights: ['Arquitectura event-driven', 'Colaboración tiempo real (Socket.io)', 'Export PDF/Excel reports'],
      featured: true,
    },
    {
      id: 2,
      name: 'DevMetrics Dashboard',
      description: 'Dashboard analítico para equipos de ingeniería: DORA metrics, cycle time, deployment frequency.',
      role: 'Full-Stack Developer',
      technologies: ['Next.js', 'TypeScript', 'ClickHouse', 'GraphQL', 'Vercel'],
      demoUrl: 'https://devmetrics.demo',
      repoUrl: 'https://github.com/edisonm22/devmetrics',
      highlights: ['Ingesta 1M+ eventos/día', 'Visualizaciones tiempo real', 'Alertas Slack/Email'],
      featured: true,
    },
    {
      id: 3,
      name: 'OpenSource: React-Query-Builder',
      description: 'Constructor de queries visual tipo SQL para React. 2.5K★ GitHub, usado en 50+ proyectos.',
      role: 'Creador / Maintainer',
      technologies: ['React', 'TypeScript', 'Vite', 'Vitest', 'npm'],
      demoUrl: undefined,
      repoUrl: 'https://github.com/edisonm22/react-query-builder',
      highlights: ['Tree-shaking optimized', 'Zero dependencies', 'Full TypeScript support'],
      featured: false,
    },
  ],
}

function CVLayout() {
  return (
    <section id="cv" className="cv-section">
      <div className="cv-container">
        <header className="cv-header">
          <CVHero data={cvData.personal} />
        </header>
        <div className="cv-inner">
          <aside className="cv-sidebar">
            <CVHero data={cvData.personal} />
            <CVSkills data={cvData.skills} />
          </aside>

          <main className="cv-main">
            <CVAbout data={cvData.personal} />
            <CVExperience data={cvData.experience} />
            <CVProjects data={cvData.projects} />
            <CVEducation data={cvData} />
            <CVContact data={cvData.personal} />
          </main>
        </div>
      </div>
    </section>
  )
}

export default CVLayout