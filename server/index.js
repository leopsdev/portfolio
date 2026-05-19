import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas de Auth
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  // Simples verificação fixa para ambiente local. Ideal seria verificar no db.
  if (password === 'admin123' || password === process.env.ADMIN_PASSWORD) {
    res.json({ token: 'fake-jwt-token-admin' });
  } else {
    res.status(401).json({ error: 'Senha incorreta' });
  }
});

// Rotas de Projetos
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { tags: true },
      orderBy: [
        { order: 'asc' },
        { id: 'desc' }
      ]
    });
    // Formatando tags para o formato original esperado pelo front
    const formatted = projects.map(p => ({
      ...p,
      tags: p.tags.map(t => t.name)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  const { title, description, longDescription, videoUrl, screenshots, coverImage, tags, github, live, figma, accentColor } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        longDescription,
        videoUrl,
        screenshots: JSON.stringify(screenshots || []),
        coverImage,
        github,
        live,
        figma,
        accentColor,
        tags: {
          create: tags?.map(tag => ({ name: tag })) || []
        }
      }
    });
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/reorder', async (req, res) => {
  const { items } = req.body;
  try {
    await prisma.$transaction(
      items.map(item => 
        prisma.project.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  const { title, description, longDescription, videoUrl, screenshots, coverImage, tags, github, live, figma, accentColor } = req.body;
  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        longDescription,
        videoUrl,
        screenshots: JSON.stringify(screenshots || []),
        coverImage,
        github,
        live,
        figma,
        accentColor,
        tags: {
          deleteMany: {},
          create: tags?.map(tag => ({ name: tag })) || []
        }
      }
    });
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Rotas de Habilidades (Skills)
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({ 
      orderBy: [
        { order: 'asc' },
        { id: 'desc' }
      ] 
    });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/skills', async (req, res) => {
  const { name, icon, level, isVisible } = req.body;
  try {
    const newSkill = await prisma.skill.create({
      data: { name, icon, level, isVisible: isVisible !== false }
    });
    res.json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await prisma.skill.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/skills/reorder', async (req, res) => {
  const { items } = req.body;
  try {
    await prisma.$transaction(
      items.map(item => 
        prisma.skill.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  const { name, icon, level, isVisible } = req.body;
  try {
    const updatedSkill = await prisma.skill.update({
      where: { id: Number(req.params.id) },
      data: { name, icon, level, isVisible: isVisible !== false }
    });
    res.json(updatedSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend rodando na porta ${PORT}`);
});
