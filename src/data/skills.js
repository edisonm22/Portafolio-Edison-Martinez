export const levelMap = {
  React: 95,
  TypeScript: 92,
  JavaScript: 90,
  HTML5: 95,
  CSS3: 92,
  'Tailwind CSS': 88,
  'Next.js': 85,
  Vite: 90,
  'Node.js': 90,
  Express: 88,
  MongoDB: 85,
  PostgreSQL: 80,
  'REST APIs': 88,
  GraphQL: 82,
  'JWT Auth': 85,
  Git: 95,
  'GitHub Actions': 85,
  Docker: 82,
  AWS: 80,
  Vercel: 90,
  Linux: 85,
  'VS Code': 95,
  Postman: 88,
}

/* Helper: crea objeto skill con porcentaje desde levelMap */
function sk(name) {
  return { name, percentage: levelMap[name] || Math.floor(40 + Math.random() * 55) }
}

export const skillCategories = [
  {
    category: 'Frontend',
    icon: '\u269B\uFE0F',
    skills: [
      sk('React'),
      sk('TypeScript'),
      sk('JavaScript'),
      sk('HTML5'),
      sk('CSS3'),
      sk('Tailwind CSS'),
      sk('Vite'),
      sk('Next.js'),
    ],
  },
  {
    category: 'Backend',
    icon: '\uD83D\uDFE2',
    skills: [
      sk('Node.js'),
      sk('Express'),
      sk('MongoDB'),
      sk('PostgreSQL'),
      sk('REST APIs'),
      sk('GraphQL'),
      sk('JWT Auth'),
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: '\u2601\uFE0F',
    skills: [
      sk('Git'),
      sk('GitHub Actions'),
      sk('Docker'),
      sk('AWS'),
      sk('Vercel'),
      sk('Linux'),
      sk('VS Code'),
      sk('Postman'),
    ],
  },
]
