import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, GraduationCap, Instagram } from 'lucide-react';
import { useState } from 'react';

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

          <p className="text-retro-gray font-mono font-bold text-xl mb-10 max-w-2xl mx-auto">
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
                className="w-full px-4 py-3 text-retro-accent border-2 border-retro-gray bg-white font-mono focus:outline-none focus:bg-retro-teal-light placeholder:text-retro-accent"
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
                className="w-full px-4 py-3 text-retro-accent border-2 border-retro-gray bg-white font-mono focus:outline-none focus:bg-retro-teal-light placeholder:text-retro-accent"
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
                className="w-full px-4 py-3 text-retro-accent border-2 border-retro-gray bg-white font-mono focus:outline-none focus:bg-retro-teal-light placeholder:text-retro-accent"
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
                className="w-full px-4 py-3 text-retro-accent border-2 border-retro-gray bg-white font-mono focus:outline-none focus:bg-retro-teal-light resize-none placeholder:text-retro-accent"
                placeholder="Digite sua mensagem aqui..."
              ></textarea>
            </div>

            {/* Mensagem de Status */}
            {status && (
              <div className={`mb-6 p-4 border-2 font-mono font-bold ${status === 'success'
                ? 'bg-retro-accent/30 border-retro-gray text-retro-gray'
                : 'bg-retro-red/10 border-retro-red text-retro-red'
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

          <p className="text-retro-gray font-mono font-bold text-xl mb-6">
            Ou entre em contato pelas minhas redes:
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex gap-4">
              <a
                href="https://github.com/leopsdev"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-[#8534F3] hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                aria-label="GitHub"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/ctrl-leo/"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-[#0077B5] hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-8 h-8" />
              </a>
              <a
                href="http://lattes.cnpq.br/9740244958701761"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-retro-accent hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none group"
                aria-label="Currículo Lattes"
                title="Currículo Lattes"
              >
                <GraduationCap className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com/ctrl_leo/"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border-4 border-retro-gray shadow-[4px_4px_0_var(--color-retro-gray)] text-retro-gray hover:bg-[#E1306C] hover:text-white transition-colors hover:translate-x-1 hover:translate-y-1 hover:shadow-none group"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-8 h-8" />
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
