require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const messagesRouter = require('./routes/messages');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'OK', name: 'Edison Martinez Portfolio API' }));

app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/messages', messagesRouter);

async function seedIfEmpty() {
  const projectsCount = await Project.countDocuments();
  const skillsCount = await Skill.countDocuments();
  if (skillsCount === 0) {
    await Skill.insertMany([
      { name: 'HTML5', category: 'frontend', level: 95 },
      { name: 'CSS3', category: 'frontend', level: 92 },
      { name: 'JavaScript', category: 'frontend', level: 90 },
      { name: 'React', category: 'frontend', level: 88 },
      { name: 'Node.js', category: 'backend', level: 85 },
      { name: 'Express.js', category: 'backend', level: 85 },
      { name: 'MongoDB', category: 'database', level: 82 },
      { name: 'Git', category: 'tool', level: 80 }
    ]);
  }
  if (projectsCount === 0) {
    await Project.insertMany([
      { title: 'E-commerce Full-Stack', description: 'Tienda en linea completa con carrito, pagos y panel admin usando MERN stack.', technologies: ['React', 'Node.js', 'Express', 'MongoDB'], featured: true },
      { title: 'Landing Page Startup', description: 'Pagina de aterrizaje de una sola pagina con alta tasa de conversion.', technologies: ['HTML5', 'CSS3', 'JavaScript'], featured: true },
      { title: 'Dashboard Analitico', description: 'Panel de control con graficas en tiempo real y autenticacion de usuarios.', technologies: ['React', 'Express', 'MongoDB'], featured: false }
    ]);
  }
  console.log('Seed verificado (proyectos: ' + (await Project.countDocuments()) + ', skills: ' + (await Skill.countDocuments()) + ')');
}

async function startServer() {
  try {
    let uri = process.env.MONGODB_URI;
    if (!uri) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mem = await MongoMemoryServer.create();
      uri = mem.getUri();
      console.log('Usando MongoDB en memoria (dev)');
    } else {
      console.log('Usando MongoDB Atlas / URI externa');
    }
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');
    await seedIfEmpty();
    app.listen(PORT, '0.0.0.0', () => console.log('Servidor en http://localhost:' + PORT));
  } catch (err) {
    console.error('Error al iniciar:', err);
    process.exit(1);
  }
}

startServer();
