require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Message = require('./models/Message');

async function seed() {
  let uri = process.env.MONGODB_URI;
  if (!uri) {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mem = await MongoMemoryServer.create();
    uri = mem.getUri();
  }
  await mongoose.connect(uri);

  await Project.deleteMany({});
  await Skill.deleteMany({});
  await Message.deleteMany({});

  const skills = await Skill.insertMany([
    { name: 'HTML5', category: 'frontend', level: 95 },
    { name: 'CSS3', category: 'frontend', level: 92 },
    { name: 'JavaScript', category: 'frontend', level: 90 },
    { name: 'React', category: 'frontend', level: 88 },
    { name: 'Node.js', category: 'backend', level: 85 },
    { name: 'Express.js', category: 'backend', level: 85 },
    { name: 'MongoDB', category: 'database', level: 82 },
    { name: 'Git', category: 'tool', level: 80 }
  ]);

  const projects = await Project.insertMany([
    {
      title: 'E-commerce Full-Stack',
      description: 'Tienda en linea completa con carrito, pagos y panel admin usando MERN stack.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      featured: true
    },
    {
      title: 'Landing Page Startup',
      description: 'Pagina de aterrizaje de una sola pagina con alta tasa de conversion.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      featured: true
    },
    {
      title: 'Dashboard Analitico',
      description: 'Panel de control con graficas en tiempo real y autenticacion de usuarios.',
      technologies: ['React', 'Express', 'MongoDB'],
      featured: false
    }
  ]);

  console.log('Seed completado: ' + skills.length + ' skills, ' + projects.length + ' proyectos');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
