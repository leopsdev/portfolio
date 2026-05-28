import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { div } from 'framer-motion/client';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const visibleSkills = skills.filter(s => s.isVisible !== false);
  const displayedSkills = showAll ? visibleSkills : visibleSkills.slice(0, 6);
  const hasMore = visibleSkills.length > 6;

  return (
    <section id="skills" className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Torn Paper transition layer pointing up */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -mt-[2px] z-10 rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px]" fill="#f2e7dc">
          <path d="M0,0 L1200,0 L1200,120 L0,120 Z" fill="none"></path>
          <path d="M0,80 C150,120 250,20 400,80 C600,160 800,0 1200,80 L1200,120 L0,120 Z"></path>
          <path d="M0,80 C150,120 250,20 400,80 C600,160 800,0 1200,80" fill="none" stroke="#003c43" strokeWidth="4"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="mb-16 flex items-center gap-4">
          {/* Decorative retro arrows */}
          <div className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter" style={{ textShadow: "4px 4px 0 var(--color-retro-gray)" }}>
            {">>>"}
          </div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
            style={{ textShadow: "4px 4px 0 var(--color-retro-gray)" }}
          >
            Stack de Habilidades
          </motion.h2>
        </div>

        {loading ? (
          <div className="text-center font-mono font-bold text-retro-cream py-10 flex justify-center w-full">
            [Carregando skills.exe...]
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {displayedSkills.map((skill, index) => {
                const IconComp = LucideIcons[skill.icon] || LucideIcons.FileJson;
                return (
                  <motion.div
                    key={skill.id || skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="bg-retro-cream border-4 border-retro-gray shadow-[6px_6px_0_var(--color-retro-gray)] p-6 flex flex-col items-center justify-center text-center cursor-default transition-transform"
                  >

                    {skill.icon && skill.icon.trim().startsWith('<svg') ? (
                      <div className="p-3 mb-4 text-retro-gray flex items-center justify-center h-16 w-16 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: skill.icon }}></div>
                    ) : skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('/')) ? (
                      <div className="p-3 mb-4 text-retro-gray flex items-center justify-center h-32 w-32">
                        <img src={skill.icon} alt={skill.name} className="max-w-full max-h-full object-contain" />
                      </div>
                    ) : (
                      <div className="p-3 mb-4 text-retro-gray flex items-center justify-center h-16 w-16">
                        <IconComp className="w-full h-full stroke-[2.5]" />
                      </div>
                    )}

                    <h3 className="font-bold text-retro-gray mb-1 uppercase text-sm tracking-wide">{skill.name}</h3>
                    <div className="w-full bg-retro-gray h-1 mt-2 mb-2"></div>
                    <span className="text-xs text-retro-gray font-mono font-bold">{skill.level}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Ver Mais Controls */}
            {hasMore && (
              <div className="mt-16 flex items-center justify-center gap-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="retro-btn-alt cursor-pointer"
                >
                  {showAll ? 'Mostrar Menos' : 'Ver mais habilidades'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
