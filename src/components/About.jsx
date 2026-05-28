import { motion } from 'framer-motion';
import { Terminal, Code2, Coffee, Image } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-retro-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex items-center justify-between border-b-4 border-retro-gray pb-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-retro-gray uppercase tracking-tighter"
          >
            Sobre <span className="text-retro-accent">Mim_</span>
          </motion.h2>
          <div className="hidden md:flex gap-2">
            <div className="w-4 h-4 rounded-full bg-retro-cream-dark border-2 border-retro-gray"></div>
            <div className="w-4 h-4 rounded-full bg-retro-accent border-2 border-retro-gray"></div>
            <div className="w-4 h-4 rounded-full bg-retro-teal border-2 border-retro-gray"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-lg text-retro-gray font-mono leading-relaxed p-6 md:p-10 border-4 border-retro-teal bg-white shadow-[8px_8px_0_var(--color-retro-accent)] relative"
          >
            <div className="absolute top-0 left-0 w-full h-8 bg-retro-teal flex items-center px-4 gap-2">
              <div className="w-3 h-3 bg-retro-accent rounded-full"></div>
            </div>
            <div className="pt-4">
              <p>
                <span className="text-retro-teal font-bold mr-2">{">"}</span>
                Sou um desenvolvedor apaixonado por dar vida a ideias através de código. Minha jornada na tecnologia começou com a curiosidade de entender como a web funcionava por baixo dos panos.
              </p>
              <br />
              <p>
                <span className="text-retro-teal font-bold mr-2">{">"}</span>
                Hoje, foco em construir aplicações web modernas, acessíveis e focadas na experiência do usuário, combinando UI arrojada com código limpo e eficiente.
              </p>
              <br />
              <p>
                <span className="text-retro-teal font-bold mr-2">{">"}</span>
                Estou sempre em busca de novos desafios e adoro explorar tendências de design. Procuro sempre diversificar meus projetos e aprender coisas novas para crescer como desenvolvedor e me manter atualizado.
                <span className="animate-pulse inline-block ml-1 w-2 h-5 bg-retro-teal translate-y-1"></span>
              </p>

            </div>
          </motion.div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="max-w-[360px] w-full bg-white border-4 border-retro-teal p-3 pb-8 shadow-[8px_8px_0_var(--color-retro-accent)]">
              <div className="aspect-square w-full border-4 border-retro-teal overflow-hidden mb-6 bg-retro-cream-dark">
                <img src="/me.png" alt="foto de perfil" className="w-full h-full object-cover" />
              </div>
              <p className="font-mono text-center text-sm md:text-base text-retro-teal font-bold leading-relaxed px-2">
                <span className="text-retro-accent font-black mr-1">{">"}</span>
                23 anos, Desenvolvedor Web e apaixonado por tecnologia e inovações.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Torn Paper effect transitioning to next section */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] rotate-180 transform translate-y-[99%] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px]" fill="#f2e7dc">
          <path d="M0,0 L1200,0 L1200,120 L0,120 Z" fill="none"></path>
          <path d="M0,80 C150,120 250,20 400,80 C600,160 800,0 1200,80 L1200,120 L0,120 Z"></path>
          <path d="M0,80 C150,120 250,20 400,80 C600,160 800,0 1200,80" fill="none" stroke="#1a1a1a" strokeWidth="4"></path>
        </svg>
      </div>
    </section>
  );
}
