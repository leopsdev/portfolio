import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, GraduationCap } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-retro-teal border-t-4 border-retro-gray">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-retro-cream border-4 border-retro-gray shadow-[12px_12px_0_var(--color-retro-gray)] p-8 md:p-16 relative"
        >
          {/* Decorative screws/dots in corners */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-retro-gray rounded-full"></div>
          <div className="absolute top-4 right-4 w-3 h-3 bg-retro-gray rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-retro-gray rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-retro-gray rounded-full"></div>

          <h2 className="text-4xl md:text-5xl font-black text-retro-gray uppercase tracking-tighter mb-6">
            Vamos <span className="text-retro-accent">conversar?</span>
          </h2>

          <div className="w-full h-1 bg-retro-gray mb-8"></div>

          <p className="text-retro-gray font-mono font-bold text-lg mb-10 max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para me mandar um e-mail!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:leonardo.pereirasilva03@gmail.com"
              className="retro-btn text-lg w-full sm:w-auto"
            >
              <Mail className="mr-2 w-6 h-6" />
              Enviar E-mail
            </a>

            <div className="flex gap-4">
              <a
                href="https://github.com/leopsdev"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-retro-teal hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                aria-label="GitHub"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/ctrl-leo/"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-retro-teal hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-8 h-8" />
              </a>
              <a
                href="http://lattes.cnpq.br/9740244958701761"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-retro-teal hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none group"
                aria-label="Currículo Lattes"
                title="Currículo Lattes"
              >
                <GraduationCap className="w-8 h-8" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-24 text-center">
        <div className="inline-block bg-retro-gray text-retro-white font-mono font-bold px-6 py-2 border-2 border-retro-teal-dark">
          © {new Date().getFullYear()} Desenvolvido com React & Tailwind.
        </div>
      </footer>
    </section>
  );
}
