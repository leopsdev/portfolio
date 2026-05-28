import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Trash2, ArrowUp, ArrowDown, Save, Edit, Eye, EyeClosed } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  // States - Lists
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  // Form items
  const [newSkill, setNewSkill] = useState({ name: '', icon: 'Check', level: 'Básico', isVisible: true });
  const [newProject, setNewProject] = useState({
    title: '', description: '', longDescription: '', videoUrl: '',
    screenshots: '', coverImage: '', tags: '', github: '', live: '', figma: '', accentColor: 'bg-retro-accent',
    isVisible: true
  });

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    const [projRes, skillRes] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/skills')
    ]);
    const projData = await projRes.json();
    const skillData = await skillRes.json();
    setProjects(projData);
    setSkills(skillData);
  };

  const moveItem = (array, index, direction, setArray) => {
    const newArr = [...array];
    if (direction === 'up' && index > 0) {
      [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]];
    } else if (direction === 'down' && index < newArr.length - 1) {
      [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
    }
    setArray(newArr);
  };

  const handleSaveOrder = async (type) => {
    const itemsToSave = (type === 'projects' ? projects : skills).map((item, idx) => ({ id: item.id, order: idx }));
    await fetch(`/api/${type}/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: itemsToSave })
    });
    alert('Ordem salva com sucesso!');
    fetchData();
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (editingSkillId) {
      await fetch(`/api/skills/${editingSkillId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      });
      setEditingSkillId(null);
    } else {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      });
    }
    setNewSkill({ name: '', icon: 'Check', level: 'Básico', isVisible: true });
    fetchData();
  };

  const handleEditSkill = (id) => {
    const skill = skills.find(s => s.id === id);
    if (skill) {
      setNewSkill({
        name: skill.name || '',
        icon: skill.icon || 'Check',
        level: skill.level || 'Básico',
        isVisible: skill.isVisible !== false
      });
      setEditingSkillId(id);
      setActiveTab('skills');
      window.scrollTo(0, 0);
    }
  };

  const cancelEditSkill = () => {
    setEditingSkillId(null);
    setNewSkill({ name: '', icon: 'Check', level: 'Básico', isVisible: true });
  };

  const handleDeleteSkill = async (id) => {
    await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    // Parse tags and screenshots
    const tagsArray = newProject.tags.split(',').map(t => t.trim()).filter(Boolean);
    let screensArray = [];
    try {
      screensArray = typeof newProject.screenshots === 'string' ? newProject.screenshots.split(',').map(s => s.trim()).filter(Boolean) : [];
    } catch (e) { }

    const payload = { ...newProject, tags: tagsArray, screenshots: screensArray };

    if (editingProjectId) {
      await fetch(`/api/projects/${editingProjectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setEditingProjectId(null);
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    setNewProject({
      title: '', description: '', longDescription: '', videoUrl: '',
      screenshots: '', coverImage: '', tags: '', github: '', live: '', figma: '', accentColor: 'bg-retro-accent',
      isVisible: true
    });
    fetchData();
  };

  const handleDeleteProject = async (id) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleEditProject = (id) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      // Decode screenshots and tags
      let parsedScreenshots = '';
      try {
        parsedScreenshots = typeof project.screenshots === 'string' ? JSON.parse(project.screenshots).join(', ') : project.screenshots.join(', ');
      } catch (e) { }

      setNewProject({
        title: project.title || '',
        description: project.description || '',
        longDescription: project.longDescription || '',
        videoUrl: project.videoUrl || '',
        screenshots: parsedScreenshots,
        coverImage: project.coverImage || '',
        tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
        github: project.github || '',
        live: project.live || '',
        figma: project.figma || '',
        accentColor: project.accentColor || 'bg-retro-accent',
        isVisible: project.isVisible !== false
      });
      setEditingProjectId(id);
      setActiveTab('projects');
      window.scrollTo(0, 0); // scroll to top to see form
    }
  }

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setNewProject({
      title: '', description: '', longDescription: '', videoUrl: '',
      screenshots: '', coverImage: '', tags: '', github: '', live: '', figma: '', accentColor: 'bg-retro-accent',
      isVisible: true
    });
  }

  return (
    <div className="min-h-screen relative">
      {/* <Navbar /> */}

      <div className="max-w-6xl mx-auto pt-15 px-4 pb-20">
        <h1 className="text-4xl md:text-5xl font-black text-white pb-5" style={{ textShadow: "4px 4px 0 var(--color-retro-gray)" }}>PAINEL ADMIN</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-bold border-4 border-retro-gray uppercase ${activeTab === 'projects' ? 'bg-retro-accent text-white shadow-[4px_4px_0_var(--color-retro-gray)]' : 'bg-white text-retro-gray hover:bg-gray-100'}`}
          >
            Projetos
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 font-bold border-4 border-retro-gray uppercase ${activeTab === 'skills' ? 'bg-retro-accent text-white shadow-[4px_4px_0_var(--color-retro-gray)]' : 'bg-white text-retro-gray hover:bg-gray-100'}`}
          >
            Habilidades
          </button>
          <button
            onClick={() => { localStorage.removeItem('admin_token'); navigate('/'); }}
            className="px-6 py-3 ml-auto font-bold border-4 bg-[#ff4e4e] text-white border-retro-gray uppercase shadow-[4px_4px_0_var(--color-retro-gray)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
          >
            Sair
          </button>
        </div>

        {activeTab === 'skills' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-retro-cream p-6 border-4 border-retro-gray shadow-[8px_8px_0_var(--color-retro-gray)]">
              <h2 className="text-2xl font-bold mb-4 font-mono text-retro-teal">{editingSkillId ? '* Atualizar Skill' : '+ Add Skill'}</h2>
              <form onSubmit={handleAddSkill} className="flex flex-col gap-4">
                <input required placeholder="Nome (Ex: React)" value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })} className="retro-input" />
                <input required placeholder="Ícone Lucide ou URL da Imagem" value={newSkill.icon} onChange={e => setNewSkill({ ...newSkill, icon: e.target.value })} className="retro-input" />
                <select value={newSkill.level} onChange={e => setNewSkill({ ...newSkill, level: e.target.value })} className="retro-input">
                  <option value="Básico">Básico</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
                <div className="flex items-center gap-2 mt-1">
                  <input type="checkbox" id="isVisibleSkill" checked={newSkill.isVisible} onChange={e => setNewSkill({ ...newSkill, isVisible: e.target.checked })} className="w-5 h-5 accent-retro-teal" />
                  <label htmlFor="isVisibleSkill" className="font-bold font-mono text-retro-teal text-sm cursor-pointer">Visível na Home?</label>
                </div>
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="retro-btn-teal flex-1">{editingSkillId ? 'Salvar Edição' : 'Salvar Skill'}</button>
                  {editingSkillId && (
                    <button type="button" onClick={cancelEditSkill} className="retro-btn-red flex-1">Cancelar</button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-retro-cream p-6 border-4 border-retro-gray shadow-[8px_8px_0_var(--color-retro-gray)] h-[700px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-mono text-retro-gray">{'>>'} Skills Cadastradas</h2>
                <button onClick={() => handleSaveOrder('skills')} className="text-sm bg-retro-teal text-white px-3 py-1 border-2 border-retro-gray hover:opacity-80 flex items-center gap-1 font-bold">
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
              <div className="flex flex-col gap-2 max-h-[700px] overflow-y-auto pr-2">
                {skills.map((skill, index) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border-2 border-retro-gray bg-white">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1 items-center justify-center mr-2">
                        <button onClick={() => moveItem(skills, index, 'up', setSkills)} className="text-retro-gray hover:text-retro-teal"><ArrowUp className="w-4 h-4" /></button>
                        <button onClick={() => moveItem(skills, index, 'down', setSkills)} className="text-retro-gray hover:text-retro-teal"><ArrowDown className="w-4 h-4" /></button>
                      </div>
                      <span className="font-bold text-retro-gray">{skill.name}</span>
                      <span className="text-xs font-mono text-retro-gray ml-2">[{skill.level}]</span>
                      {skill.isVisible === false ? (
                        <EyeClosed className="w-4 h-4 text-retro-red" />
                      ) : (
                        <Eye className="w-4 h-4 text-retro-teal" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditSkill(skill.id)} className="text-blue-500 hover:scale-110">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDeleteSkill(skill.id)} className="text-[#ff4e4e] hover:scale-110">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-retro-cream p-6 border-4 border-retro-gray shadow-[8px_8px_0_var(--color-retro-gray)] h-fit">
              <h2 className="text-2xl font-bold mb-4 font-mono text-retro-teal">{editingProjectId ? '* Atualizar Projeto' : '+ Add Projeto'}</h2>
              <form onSubmit={handleAddProject} className="flex flex-col gap-3">
                <input required placeholder="Título do Projeto" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} className="retro-input" />
                <input required placeholder="Descrição Breve" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} className="retro-input" />
                <textarea required placeholder="Descrição Longa" value={newProject.longDescription} onChange={e => setNewProject({ ...newProject, longDescription: e.target.value })} className="retro-input min-h-[100px]" />
                <input placeholder="URL do Vídeo (.mp4)" value={newProject.videoUrl} onChange={e => setNewProject({ ...newProject, videoUrl: e.target.value })} className="retro-input" />
                <input placeholder="URL da Capa do Projeto" value={newProject.coverImage} onChange={e => setNewProject({ ...newProject, coverImage: e.target.value })} className="retro-input" />
                <input placeholder="URL das Prints (separadas por vírgula)" value={newProject.screenshots} onChange={e => setNewProject({ ...newProject, screenshots: e.target.value })} className="retro-input" />
                <input placeholder="Tags (separadas por vírgula, Ex: React, Node)" value={newProject.tags} onChange={e => setNewProject({ ...newProject, tags: e.target.value })} className="retro-input" />
                <input placeholder="Link GitHub" value={newProject.github} onChange={e => setNewProject({ ...newProject, github: e.target.value })} className="retro-input flex-1" />
                <input placeholder="Link Site Vivo" value={newProject.live} onChange={e => setNewProject({ ...newProject, live: e.target.value })} className="retro-input flex-1" />
                <input placeholder="Link Figma" value={newProject.figma} onChange={e => setNewProject({ ...newProject, figma: e.target.value })} className="retro-input flex-1" />
                <div className="flex items-center gap-2 mt-1">
                  <input type="checkbox" id="isVisibleProject" checked={newProject.isVisible} onChange={e => setNewProject({ ...newProject, isVisible: e.target.checked })} className="w-5 h-5 accent-retro-teal" />
                  <label htmlFor="isVisibleProject" className="font-bold font-mono text-retro-teal text-sm cursor-pointer">Visível na Home?</label>
                </div>
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="retro-btn-teal flex-1">{editingProjectId ? 'Salvar Edição' : 'Salvar Projeto'}</button>
                  {editingProjectId && (
                    <button type="button" onClick={cancelEditProject} className="retro-btn-red flex-1">Cancelar</button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-retro-cream p-6 border-4 border-retro-gray shadow-[8px_8px_0_var(--color-retro-gray)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-mono text-retro-gray">{'>>'} Projetos Cadastrados</h2>
                <button onClick={() => handleSaveOrder('projects')} className="text-sm bg-retro-teal text-white px-3 py-1 border-2 border-retro-gray hover:opacity-80 flex items-center gap-1 font-bold">
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
              <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2">
                {projects.map((project, index) => (
                  <div key={project.id} className="flex flex-col p-3 border-2 border-retro-gray bg-white relative group">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex flex-col gap-1 items-center justify-center mr-1">
                        {/* BOTÕES DE ORDENAÇÃO */}
                        {project.isVisible === false ? (
                          <EyeClosed className="w-4 h-4 text-retro-red" />
                        ) : (
                          <Eye className="w-4 h-4 text-retro-teal" />
                        )}

                        <button onClick={() => moveItem(projects, index, 'up', setProjects)} className="text-retro-gray hover:text-retro-teal"><ArrowUp className="w-4 h-4" /></button>
                        <button onClick={() => moveItem(projects, index, 'down', setProjects)} className="text-retro-gray hover:text-retro-teal"><ArrowDown className="w-4 h-4" /></button>
                      </div>
                      <span className="font-bold text-retro-teal truncate max-w-[350px]">{project.title}</span>

                    </div>
                    <span className="text-xs font-mono text-retro-teal line-clamp-1 ml-6">{project.description}</span>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="absolute top-2 right-10 text-blue-500"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
