import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, X, PlusSquare, Figma } from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 3;

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

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const displayedProjects = projects.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE);

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
        <div className="mb-16 border-b-4 border-retro-gray pb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-retro-gray uppercase tracking-tighter"
          >
            Meus <span className="text-retro-teal">Projetos_</span>
          </motion.h2>
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
                      {project.tags.map(tag => (
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
                          <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1 bg-[#333] text-white font-bold py-2 border-2 border-retro-gray hover:bg-[#333] transition-colors shadow-[2px_2px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none text-sm">
                            Code <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.figma && (
                          <a href={project.figma} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1 bg-[#F24E1E] text-white font-bold py-2 border-2 border-retro-gray hover:bg-[#c23e18] transition-colors shadow-[2px_2px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none text-sm">
                            Figma <Figma className="w-4 h-4" />
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
                  className="retro-btn-alt2 disabled:opacity-50 "
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

      {/* Retro Neo-Brutalist Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
              className="bg-white border-4 border-retro-gray shadow-[16px_16px_0_var(--color-retro-gray)] flex flex-col w-full max-w-5xl max-h-[90vh] relative z-10 overflow-hidden"
            >
              {/* Fake Window Header Bar */}
              <div className="bg-retro-gray px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Folder className="text-retro-accent w-5 h-5" />
                  <h3 className="text-white font-bold font-mono tracking-tight uppercase text-sm md:text-base">
                    VIEWER.EXE - {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-retro-accent border-2 border-retro-gray p-1 text-white hover:bg-[#ff4e4e] hover:translate-y-[2px] transform transition-all shadow-[2px_2px_0_var(--color-retro-gray)] hover:shadow-none"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Core Layout Container - Now Single Scrollable Column */}
              <div className="flex-1 overflow-y-auto w-full bg-retro-cream p-4 md:p-8">
                <div className="flex flex-col gap-8 max-w-4xl mx-auto">

                  {/* Top Header & Tags */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <h4 className="text-3xl md:text-5xl font-black text-retro-gray uppercase tracking-tight" style={{ textShadow: "3px 3px 0 var(--color-retro-cream-dark)" }}>
                      {selectedProject.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-bold text-white bg-retro-teal border-2 border-retro-gray shadow-[2px_2px_0_var(--color-retro-gray)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Main Video Player */}
                  <div className="w-full bg-retro-cream-dark p-3 md:p-4 border-4 border-retro-gray shadow-[6px_6px_0_var(--color-retro-gray)]">
                    <div className="bg-white border-4 border-retro-gray p-2 flex flex-col">
                      {/* Fake inner window toolbar */}
                      <div className="border-b-4 border-retro-gray pb-2 mb-2 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-retro-accent border-2 border-retro-gray"></div>
                        <div className="w-3 h-3 rounded-full bg-retro-teal border-2 border-retro-gray"></div>
                      </div>

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
                    </div>
                  </div>

                  {/* Description area */}
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2 border-l-4 border-retro-accent pl-4">
                      <p className="text-retro-gray font-mono font-medium leading-relaxed text-lg text-justify">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4">
                      {selectedProject.live && (
                        <a href={selectedProject.live} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-retro-accent text-white font-bold py-3 px-4 border-4 border-retro-gray hover:bg-[#135d66] transition-colors shadow-[4px_4px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none text-lg">
                          Site Ao Vivo <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-retro-gray text-white font-bold py-3 px-4 border-4 border-retro-gray hover:bg-[#333] transition-colors shadow-[4px_4px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none text-lg">
                          Repositório <Github className="w-5 h-5" />
                        </a>
                      )}
                      {selectedProject.figma && (
                        <a href={selectedProject.figma} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#F24E1E] text-white font-bold py-3 px-4 border-4 border-retro-gray hover:bg-[#c23e18] transition-colors shadow-[4px_4px_0_var(--color-retro-gray)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none text-lg">
                          Figma <Figma className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Screenshots Grid View */}
                  {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                    <div className="mt-8 border-t-4 border-retro-gray pt-8">
                      <h5 className="font-bold font-mono text-retro-teal-dark mb-6 uppercase md:text-xl">{">>"} Galeria_</h5>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {selectedProject.screenshots.map((screenshot, idx) => (
                          <div key={idx} className="bg-white border-4 border-retro-gray p-2 shadow-[4px_4px_0_var(--color-retro-gray)] hover:scale-[1.02] transition-transform">
                            <img
                              src={screenshot}
                              alt={`${selectedProject.title} screenshot ${idx + 1}`}
                              className="w-full h-auto border-2 border-retro-gray"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x400/1a1a1a/f2e7dc?text=PRINT+AQUI&font=mono";
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
