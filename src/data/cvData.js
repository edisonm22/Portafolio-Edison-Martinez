export const cvData = {
  personal: {
    name: 'Edison Martinez',
    title: 'Desarrollador Web Full-Stack',
    tagline: 'Especialista en React, Node.js & Arquitectura Cloud',
    email: 'edison.martinez@email.com',
    phone: '+34 600 000 000',
    location: 'Madrid, España',
    website: 'edisonmartinez.dev',
    avatar: null,
  },
  summary:
    'Desarrollador Full-Stack con más de 5 años de experiencia construyendo aplicaciones web escalables y de alto rendimiento. Apasionado por la arquitectura limpia, las mejores prácticas de desarrollo y la experiencia de usuario. Especializado en el ecosistema JavaScript/TypeScript con React en el frontend y Node.js en el backend, con sólida experiencia en bases de datos tanto SQL como NoSQL.',
  experience: [
    {
      id: 1,
      role: 'Senior Full-Stack Developer',
      company: 'TechCorp Solutions',
      period: '2023 — Presente',
      description:
        'Lidero el desarrollo de aplicaciones web para clientes internacionales, trabajando en equipo con diseñadores y product managers.',
      achievements: [
        'Lideré la migración de una app monolítica a microservicios, reduciendo el tiempo de deploy en un 60%',
        'Implementé una arquitectura serverless en AWS que redujo costos en un 40%',
        'Mentor de 3 desarrolladores junior, acelerando su onboarding al equipo',
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    },
    {
      id: 2,
      role: 'Full-Stack Developer',
      company: 'WebStudio Digital',
      period: '2020 — 2023',
      description:
        'Desarrollé aplicaciones web completas para startups y pymes, desde la concepción hasta el despliegue.',
      achievements: [
        'Desarrollé y lancé 10+ proyectos web en 3 años, todos a tiempo y dentro del presupuesto',
        'Optimicé el rendimiento de un dashboard analítico, mejorando la velocidad de carga en un 70%',
        'Implementé integración con pasarela de pago Stripe para e-commerce con 500+ transacciones/mes',
      ],
      technologies: ['React', 'Express', 'MongoDB', 'Tailwind', 'Stripe'],
    },
    {
      id: 3,
      role: 'Junior Developer',
      company: 'CodeLab Agency',
      period: '2019 — 2020',
      description:
        'Inicié mi carrera profesional colaborando en el desarrollo de sitios web corporativos y landing pages.',
      achievements: [
        'Desarrollé 8 landing pages con alta tasa de conversión para campañas de marketing',
        'Automaticé tareas repetitivas con scripts Node.js, ahorrando 10h/semana al equipo',
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Node.js'],
    },
  ],
  skills: {
    technical: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Node.js / Express', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'CSS / Tailwind', level: 92 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Docker / AWS', level: 82 },
      { name: 'Git / CI/CD', level: 90 },
    ],
    soft: [
      { name: 'Liderazgo técnico' },
      { name: 'Comunicación efectiva' },
      { name: 'Resolución de problemas' },
      { name: 'Metodologías ágiles' },
      { name: 'Trabajo en equipo' },
    ],
  },
  projects: [
    {
      id: 1,
      name: 'E-commerce MERN',
      role: 'Full-Stack Developer',
      description:
        'Plataforma de comercio electrónico completa con autenticación, panel de administración, carrito de compras y pasarela de pago.',
      highlights: [
        'Arquitectura modular con patrones de diseño limpios',
        'Integración con Stripe para pagos seguros',
        'Panel admin con métricas en tiempo real',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
      demoUrl: '#',
      repoUrl: '#',
    },
    {
      id: 2,
      name: 'Dashboard Analítico',
      role: 'Full-Stack Developer',
      description:
        'Panel de control interactivo con visualización de datos en tiempo real, autenticación multirol y exportación de reportes.',
      highlights: [
        'Gráficas interactivas con Chart.js y D3.js',
        'Autenticación JWT con roles de usuario',
        'Optimizado para manejar 100k+ registros',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      demoUrl: '#',
      repoUrl: '#',
    },
  ],
  education: {
    education: [
      {
        id: 1,
        degree: 'Máster en Desarrollo Web Full-Stack',
        institution: 'Universidad Politécnica de Madrid',
        year: '2019',
        location: 'Madrid, España',
        details: [
          'Especialización en tecnologías web modernas y arquitectura cloud',
          'Proyecto final: Aplicación de gestión empresarial con React y Node.js',
        ],
      },
      {
        id: 2,
        degree: 'Grado en Ingeniería Informática',
        institution: 'Universidad Complutense de Madrid',
        year: '2014 - 2018',
        location: 'Madrid, España',
        details: [
          'Mención en Tecnologías de la Información',
          'Participación en hackathons universitarios (2 veces ganador)',
        ],
      },
    ],
    certifications: [
      {
        name: 'AWS Certified Developer – Associate',
        issuer: 'Amazon Web Services',
        date: '2024',
        credentialId: 'AWS-DEV-2024-1234',
      },
      {
        name: 'MongoDB Certified Developer',
        issuer: 'MongoDB University',
        date: '2023',
        credentialId: 'MDB-2023-5678',
      },
    ],
  },
}
