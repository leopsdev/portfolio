import React, { useState, useEffect, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ExternalLink, Github, Folder, X, PlusSquare, Figma, Image } from 'lucide-react';

// Error Boundary para capturar falhas de renderização do ReactMarkdown
class MarkdownErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro de renderização do ReactMarkdown capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Componente Wrapper Seguro para renderizar Markdown com Fallback em JS Puro
function SafeMarkdown({ content, className }) {
  // Renderizador simples de Markdown baseado em Regex
  const renderSimpleMarkdown = (text) => {
    if (!text) return null;

    // Separar por parágrafos
    const paragraphs = text.split(/\n\s*\n/);

    return paragraphs.map((p, idx) => {
      let htmlContent = p.trim();
      if (!htmlContent) return null;

      // Escapar caracteres HTML básicos por segurança contra XSS
      htmlContent = htmlContent
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Negrito (**texto** ou __texto__)
      htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      htmlContent = htmlContent.replace(/__(.*?)__/g, '<strong>$1</strong>');

      // Itálico (*texto* ou _texto_)
      htmlContent = htmlContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
      htmlContent = htmlContent.replace(/_(.*?)_/g, '<em>$1</em>');

      // Links simples ([texto](url))
      htmlContent = htmlContent.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-retro-teal underline font-bold hover:text-retro-accent">$1</a>');

      // Quebras de linha simples
      htmlContent = htmlContent.replace(/\n/g, '<br />');

      // foto ![alt](url)
      htmlContent = htmlContent.replace(/!\{(.*?)\}\((.*?)\)/g, '<img src="$2" alt="$1" class="bg-white border-4 border-retro-gray p-2 shadow-[4px_4px_0_var(--color-retro-gray)] hover:scale-[1.02] transition-transform" />');

      // h1, h2, h3 - processando cabeçalhos no início do parágrafo
      if (htmlContent.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg font-mono font-bold text-retro-gray mt-5 mb-2">
            <span dangerouslySetInnerHTML={{ __html: htmlContent.substring(4) }} />
          </h3>
        );
      } else if (htmlContent.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl font-mono font-bold text-retro-teal uppercase mt-7 mb-3 border-b-2 border-retro-teal pb-1">
            <span dangerouslySetInnerHTML={{ __html: htmlContent.substring(3) }} />
          </h2>
        );
      } else if (htmlContent.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-2xl font-mono font-black text-retro-accent uppercase mt-9 mb-4 border-b-4 border-retro-gray pb-2">
            <span dangerouslySetInnerHTML={{ __html: htmlContent.substring(2) }} />
          </h1>
        );
      }

      // Listas não ordenadas (- ou *)
      if (htmlContent.startsWith('- ') || htmlContent.startsWith('* ') || htmlContent.includes('<br />- ') || htmlContent.includes('<br />* ')) {
        const lines = htmlContent.split('<br />');
        const listItems = lines.map((line) => {
          const lineText = line.trim();
          if (lineText.startsWith('- ') || lineText.startsWith('* ')) {
            return `<li class="ml-6 list-disc mb-1">${lineText.substring(2)}</li>`;
          }
          return lineText;
        }).join('');

        return (
          <ul key={idx} className="mb-4 font-mono text-retro-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: listItems }} />
        );
      }

      return (
        <p
          key={idx}
          className="mb-4 text-justify"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    });
  };

  return (
    <div className={className}>
      {renderSimpleMarkdown(content)}
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setProjectsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setProjectsPerPage(2);
      } else {
        setProjectsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.map(p => ({
          ...p,
          screenshots: typeof p.screenshots === 'string' ? JSON.parse(p.screenshots) : p.screenshots
        })));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const visibleProjects = projects.filter(p => p.isVisible !== false);
  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage) || 1;
  const displayedProjects = visibleProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

  // Ajusta a página atual se ela ficar fora dos limites após o redimensionamento do viewport
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Escapar scroll quando modal estiver ativo
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-retro-cream-dark border-t-4 border-retro-gray">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex items-center justify-between border-b-4 border-retro-gray pb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-retro-gray uppercase tracking-tighter"
          >
            Meus <span className="text-retro-teal">Projetos_</span>
          </motion.h2>
          <div className="hidden md:flex gap-2">
            <div className="w-4 h-4 rounded-full bg-retro-cream border-2 border-retro-gray"></div>
            <div className="w-4 h-4 rounded-full bg-retro-accent border-2 border-retro-gray"></div>
            <div className="w-4 h-4 rounded-full bg-retro-teal border-2 border-retro-gray"></div>
          </div>
        </div>

        {loading ? (
          <div className="text-center font-mono font-bold text-retro-gray py-20 flex justify-center w-full min-h-[300px] items-center">
            [Carregando dados.exe...]
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id || project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-white border-4 border-retro-gray flex flex-col shadow-[8px_8px_0_var(--color-retro-gray)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_var(--color-retro-gray)] transition-all group relative"
                >
                  {/* Folder tab design element */}
                  <div className="absolute -top-4 left-4 bg-retro-white border-x-4 border-t-4 border-retro-gray px-4 py-1 font-bold font-mono text-sm uppercase flex items-center gap-2 z-10">
                    <Folder className="w-4 h-4 fill-retro-gray" strokeWidth={0} />
                    <p className="text-retro-gray">sys</p>
                  </div>

                  {/* Project Image Placeholder / Header */}
                  <div className={`h-40 w-full ${project.accentColor || 'bg-retro-accent'} border-b-4 border-retro-gray flex items-center justify-center relative overflow-hidden`}>
                    {project.coverImage ? (
                      <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute top-2 right-2 flex gap-1 z-10">
                          <div className="w-3 h-3 bg-white border-2 border-retro-gray rounded-full"></div>
                          <div className="w-3 h-3 bg-white border-2 border-retro-gray rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-black text-white px-2 text-center relative z-10" style={{ textShadow: "2px 2px 0 var(--color-retro-gray)" }}>{project.title}</h3>
                      </>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col bg-white">
                    <p className="text-retro-gray mb-6 flex-1 text-md font-medium leading-relaxed font-mono">
                      {">"} {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto mb-6">
                      {project.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-bold text-retro-gray bg-white border-2 border-retro-gray">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 border-t-4 border-retro-gray pt-4 mt-auto">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="cursor-pointer w-full flex items-center justify-center gap-2 bg-retro-cream-dark text-retro-gray font-bold py-2 border-2 border-retro-gray hover:bg-[#b0c0c9] transition-colors shadow-[2px_2px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none"
                      >
                        Detalhes <PlusSquare className="w-4 h-4" />
                      </button>
                      <div className="flex gap-3">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1 bg-retro-accent text-white font-bold py-2 border-2 border-retro-gray hover:bg-[#135d66] transition-colors shadow-[2px_2px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none text-sm">
                            Site <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1 bg-[#8534F3] text-white font-bold py-2 border-2 border-retro-gray hover:bg-[#8534F3] transition-colors shadow-[2px_2px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none text-sm">
                            Code <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.figma && (
                          <a href={project.figma} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1 bg-[#F24E1E] text-white font-bold py-2 border-2 border-retro-gray hover:bg-[#c23e18] transition-colors shadow-[2px_2px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none text-sm">
                            Design <Image className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="retro-btn-alt2 disabled:opacity-50"
                >
                  {'< Voltar'}
                </button>
                <div className="bg-white text-retro-gray border-2 border-retro-gray px-4 py-2 font-mono font-bold">
                  {currentPage} / {totalPages}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  // px-6 py-2 bg-retro-cream text-retro-gray font-bold font-mono border-4 border-retro-gray disabled:opacity-50 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_var(--color-retro-gray)] transition-all shadow-none
                  className="retro-btn-alt2 cursor-pointer disabled:opacity-50 "
                >
                  {'Avançar >'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-retro-teal/60 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="flex bg-white md:border-4 border-retro-gray md:shadow-[16px_16px_0_var(--color-retro-gray)] flex-col w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] relative overflow-hidden"
            >
              {/* Fake Window Header Bar */}
              <div className="bg-retro-teal px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Folder className="text-retro-accent fill-current w-5 h-5" />
                  <h3 className="text-white font-bold font-mono tracking-tight uppercase text-sm md:text-base">
                    VISÃO.EXE - {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-retro-accent border-2 border-retro-gray p-1 text-white hover:bg-retro-red hover:translate-y-[2px] transform transition-all shadow-[2px_2px_0_var(--color-retro-gray)] hover:shadow-none"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Core Layout Container - Now Single Scrollable Column */}
              <div className="flex-1 overflow-y-auto w-full bg-retro-cream p-4 md:p-8">
                <div className="flex flex-col gap-8 max-w-4xl mx-auto">

                  {/* Top Header */}
                  <div className="md:flex hidden flex-col md:flex-row md:items-end justify-between gap-4">
                    <h4 className="text-3xl md:text-5xl font-black text-retro-accent uppercase tracking-tight" style={{ textShadow: "3px 3px 0 var(--color-retro-gray)" }}>
                      {selectedProject.title}
                    </h4>
                  </div>

                  {/* Main Video Player */}

                  <div className="bg-retro-cream-dark border-4 border-retro-gray p-2 flex flex-col shadow-[6px_6px_0_var(--color-retro-gray)]">
                    {/* Fake inner window toolbar */}


                    {/* Video area */}
                    <div className="relative w-full bg-retro-gray flex items-center justify-center overflow-hidden border-2 border-retro-gray aspect-video">
                      <video
                        src={selectedProject.videoUrl}
                        controls
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full text-white font-mono">SEU VÍDEO AQUI</div>';
                        }}
                      />
                    </div>

                    <div className="border-b-4 border-retro-gray pb-2 mt-2 flex justify-center gap-2 ">
                      <div className="w-3 h-3 rounded-full bg-retro-teal border-2 border-retro-gray"></div>
                      <div className="w-3 h-3 rounded-full bg-retro-accent border-2 border-retro-gray"></div>
                      <div className="w-3 h-3 rounded-full bg-retro-accent border-2 border-retro-gray"></div>
                    </div>

                  </div>
                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 flex-wrap">
                    {selectedProject.live && (
                      <a href={selectedProject.live} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-retro-accent text-white font-bold md:py-3 md:px-4 py-2 px-3 border-4 border-retro-gray hover:bg-[#135d66] transition-colors shadow-[4px_4px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none md:text-lg text-xs">
                        Visite <ExternalLink className="md:w-5 md:h-5 w-3 h-3" />
                      </a>

                    )}
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#8534F3] text-white font-bold md:py-3 md:px-4 py-3 px-3 border-4 border-retro-gray hover:bg-[#8534F3] transition-colors shadow-[4px_4px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none md:text-lg text-xs">
                        Repositório <Github className="md:w-5 md:h-5 w-3 h-3" />
                      </a>
                    )}
                    {selectedProject.figma && (
                      <a href={selectedProject.figma} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#F24E1E] text-white font-bold md:py-3 md:px-4 py-3 px-3 border-4 border-retro-gray hover:bg-[#c23e18] transition-colors shadow-[4px_4px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none md:text-lg text-xs">
                        Design <Image className="md:w-5 md:h-5 w-3 h-3" />
                      </a>
                    )}
                  </div>


                  {/* Description area */}
                  <div className="md:border-l-4 border-retro-accent md:pl-4">
                    <SafeMarkdown
                      content={selectedProject.longDescription || '*Nenhuma descrição detalhada cadastrada para este projeto. Acesse a página Admin para editar e preencher!*'}
                      className="relative text-retro-gray font-mono font-medium leading-relaxed text-lg text-justify"
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-end gap-2 mt-4">
                    {selectedProject.tags?.map(tag => (
                      <span key={tag} className="px-4 py-2 text-sm font-bold text-white bg-retro-teal border-2 border-retro-gray shadow-[2px_2px_0_var(--color-retro-gray)]">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
