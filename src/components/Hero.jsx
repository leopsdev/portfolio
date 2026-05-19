import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-retro-teal">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center z-10">

        {/* Left Content Area */}
        <div className="text-left order-2 lg:order-1">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className=" text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mt-4 mb-14 tracking-tight leading-tight mix-blend-difference"
            style={{ textShadow: "4px 4px 0 var(--color-retro-gray)" }}
          >
            Leonardo Pereira Silva <br />
            {/* <span className="text-retro-accent">digitais</span> */}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-retro-cream font-mono mb-10 max-w-2xl leading-relaxed bg-retro-gray p-4 border-retro-accent shadow-[4px_4px_0_var(--color-retro-accent)]"
          >
            <span className="text-retro-cream font-bold mr-2">&gt;</span> Sou Bacharel em Ciência da Computação na Universidade Federal do Cariri (UFCA) e venho construindo uma base sólida combinando desenvolvimento prático, engenharia de software e pesquisa acadêmica.
            <span className="animate-pulse inline-block ml-1 w-2 h-5 bg-retro-cream translate-y-1"></span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a href="#projects" className="retro-btn-alt">
              Ver meus projetos
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="https://drive.google.com/file/d/1ebvb7cgwKP1lOWuULmgm9Y5dmIU0ToPk/view?usp=drive_link" className="retro-btn-alt">
              Currículo Vitae
              <Download className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Art Area (Isometric Computer) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="order-1 lg:order-2 flex justify-center relative"
        >
          {/* Decorative abstract shape behind computer */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-retro-accent rounded-full border-4 border-retro-gray -z-10 shadow-[8px_8px_0_var(--color-retro-gray)]"></div>

          {/* New Computer Image from User */}
          <img
            src="/computer.png"
            alt="Retro Computer Setup"
            className="w-full max-w-[400px] drop-shadow-[12px_12px_0_var(--color-retro-gray)] relative z-10"
          />
        </motion.div>

      </div>

      {/* Torn Paper effect at the bottom */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px]" fill="#f2e7dc">
          <path d="M0,0 L1200,0 L1200,120 L0,120 Z" fill="none"></path>
          <path d="M0,80 C150,120 250,20 400,80 C600,160 800,0 1200,80 L1200,120 L0,120 Z"></path>
          {/* Subtle jagged edge stroke to simulate torn paper */}
          <path d="M0,80 C150,120 250,20 400,80 C600,160 800,0 1200,80" fill="none" stroke="#1a1a1a" strokeWidth="4"></path>
        </svg>
      </div>
    </section>
  );
}
