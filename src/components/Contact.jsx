import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, GraduationCap, Instagram } from 'lucide-react';
import { useState } from 'react';

function Behance(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' ou 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Email enviado com sucesso! Em breve entrarei em contato.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Erro ao enviar email');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Erro de conexão. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t-4 border-retro-gray">
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

          <p className="text-retro-gray font-mono font-bold md:text-xl mb-10 max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades e colaborações. Preencha o formulário abaixo ou me contacte através das minhas redes!
          </p>

          {/* Formulário de Contato */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-10 text-left">
            <div className="mb-6">
              <label htmlFor="name" className="block text-retro-gray font-mono font-bold mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full md:px-4 px-2 md:py-3 py-2 text-retro-teal border-2 border-retro-gray bg-white font-mono focus:outline-none focus:bg-retro-teal-light placeholder:text-retro-accent md:placeholder:text-md placeholder:text-sm"
                placeholder="Seu nome"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-retro-gray font-mono font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full md:px-4 px-2 md:py-3 py-2 text-retro-teal border-2 border-retro-gray bg-white font-mono focus:outline-none focus:bg-retro-teal-light placeholder:text-retro-accent md:placeholder:text-md placeholder:text-sm"
                placeholder="seu-email@exemplo.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-retro-gray font-mono font-bold mb-2">
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full md:px-4 px-2 md:py-3 py-2 text-retro-teal border-2 border-retro-gray bg-white font-mono focus:outline-none focus:bg-retro-teal-light placeholder:text-retro-accent md:placeholder:text-md placeholder:text-sm"
                placeholder="Sobre o quê?"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-retro-gray font-mono font-bold mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full md:px-4 px-2 md:py-3 py-2 text-retro-teal border-2 border-retro-gray bg-white font-mono focus:outline-none focus:bg-retro-teal-light resize-none placeholder:text-retro-accent md:placeholder:text-md placeholder:text-sm"
                placeholder="Digite sua mensagem aqui..."
              ></textarea>
            </div>

            {/* Mensagem de Status */}
            {status && (
              <div className={`mb-6 p-4 border-2 font-mono font-bold ${status === 'success'
                ? 'bg-retro-accent/30 border-retro-gray/50 text-retro-gray/70'
                : 'bg-retro-red/10 border-retro-red/50 text-retro-red/70'
                }`}>
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="retro-btn-teal text-lg w-full mb-6 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>

          {/* Redes Sociais */}
          <div className="w-full h-1 bg-retro-gray mb-8"></div>

          <p className="text-retro-gray font-mono font-bold md:text-xl mb-6">
            Ou entre em contato pelas minhas redes:
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex gap-4">
              <a
                href="https://github.com/leopsdev"
                target="_blank"
                rel="noreferrer"
                className="md:p-3 p-2 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-[#8534F3] hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                aria-label="GitHub"
              >
                <Github className="md:w-8 w-6 h-6 md:h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/ctrl-leo/"
                target="_blank"
                rel="noreferrer"
                className="md:p-3 p-2 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-[#0077B5] hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                aria-label="LinkedIn"
              >
                <Linkedin className="md:w-8 w-6 h-6 md:h-8" />
              </a>
              <a
                href="http://lattes.cnpq.br/9740244958701761"
                target="_blank"
                rel="noreferrer"
                className="md:p-3 p-2 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-retro-accent hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none group"
                aria-label="Currículo Lattes"
                title="Currículo Lattes"
              >
                <GraduationCap className="md:w-8 w-6 h-6 md:h-8" />
              </a>
              <a
                href="https://www.behance.net/ctrl_leo"
                target="_blank"
                rel="noreferrer"
                className="md:p-3 p-2 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-[#0057ff] hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none group"
                aria-label="Behance"
                title="Behance"
              >
                <Behance className="md:w-8 w-6 h-6 md:h-8" />
              </a>
              <a
                href="https://www.instagram.com/ctrl_leo/"
                target="_blank"
                rel="noreferrer"
                className="md:p-3 p-2 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-[#E1306C] hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none group"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="md:w-8 w-6 h-6 md:h-8" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-24 text-center">
        <div className="inline-block bg-retro-gray text-retro-white font-mono font-bold px-6 py-2 border-2 border-retro-gray">
          © {new Date().getFullYear()} Desenvolvido por Leonardo Pereira Silva - Todos os direitos reservados
        </div>
      </footer>
    </section>
  );
}
