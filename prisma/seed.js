import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    title: 'SisMC',
    description: 'O Sistema de Monitoramento Clínico é uma plataforma digital interativa com o objetivo de monitorar, analisar e visualizar dados clínicos relacionados a doenças infecciosas e parasitárias atendidas na clínica-escola da universidade.',
    longDescription: 'O SisMC é uma plataforma de Business Intelligence (BI) voltada para a saúde pública, projetada para transformar dados brutos de doenças parasitárias e cardíacas em decisões estratégicas em tempo real. O foco principal do projeto foi criar uma interface de alta densidade de dados que fosse, ao mesmo tempo, intuitiva e extremamente performática.',
    videoUrl: '/sismc-demo.webm',
    screenshots: JSON.stringify(['/sismc-print1.png', '/sismc-print2.png']),
    tags: { create: [{ name: 'Angular' }, { name: 'TypeScript' }, { name: 'Bootstrap' }] },
    github: '#',
    live: '#',
    accentColor: 'bg-retro-accent'
  },
  {
    title: 'Task Manager Pro',
    description: 'Aplicação de gestão de tarefas inspirada no Kanban, com drag-and-drop fluido e persistência local.',
    longDescription: 'Um clone avançado de Kanban. Desenvolvido com foco absoluto em performance utilizando o dnd-kit para a mecânica de arrastar e soltar e estado global com Zustand. Possui temas nativos e salva tudo instantaneamente no seu navegador.',
    videoUrl: '/task-demo.mp4',
    screenshots: JSON.stringify(['/task-print1.png', '/task-print2.png']),
    tags: { create: [{ name: 'React' }, { name: 'Dnd-kit' }, { name: 'Zustand' }] },
    github: '#',
    live: '#',
    accentColor: 'bg-[#c5d3e2]'
  },
  {
    title: 'Finance Tracker',
    description: 'Plataforma para acompanhamento de gastos pessoais com categorização inteligente e exportação de relatórios.',
    longDescription: 'Gerencie seu dinheiro como um profissional. O Finance Tracker sincroniza transações, categoriza seus gastos mensais através de inteligência básica e exporta seus dados rapidamente para planilhas.',
    videoUrl: '/finance-demo.mp4',
    screenshots: JSON.stringify(['/finance-print1.png', '/finance-print2.png']),
    tags: { create: [{ name: 'Next.js' }, { name: 'Prisma' }, { name: 'PostgreSQL' }] },
    github: '#',
    live: '#',
    accentColor: 'bg-retro-teal'
  }
];

const skills = [
  { name: 'React', icon: 'Layout', level: 'Avançado' },
  { name: 'JavaScript', icon: 'FileJson', level: 'Avançado' },
  { name: 'Tailwind CSS', icon: 'Smartphone', level: 'Avançado' },
  { name: 'Next.js', icon: 'Globe', level: 'Intermediário' },
  { name: 'Node.js', icon: 'Database', level: 'Básico' },
  { name: 'UI/UX Design', icon: 'Figma', level: 'Intermediário' },
];

async function main() {
  console.log('Seeding database...');
  for (const proj of projects) {
    await prisma.project.create({ data: proj });
  }
  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log('Database seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
