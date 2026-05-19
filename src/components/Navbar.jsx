import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Quem sou', href: '#about' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Contato', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      // Substituimos 'glass' por um estilo bloqueado
      // fixed top-0 w-full z-50 bg-retro-cream border-b-4 border-retro-gray
      className={`fixed top-0 w-full z-50 bg-retro-cream border-b-4 border-retro-gray ${scrolled ? 'w-full max-w-[1250px] max-h-15 border-t-4 border-l-4 border-r-4 mt-2 -left-10 -right-10 m-auto shadow-[4px_4px_0_#0000004d] transition-all duration-200' : 'transition-all duration-200'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition duration-100 ${scrolled ? 'h-13' : 'h-20'}`}>
          <div className="flex-shrink-0">
            {/* Logo estilo texto command-line */}
            <a href="#" className={`font-bold tracking-tighter text-retro-gray flex items-center ${scrolled ? 'text-xl' : 'text-2xl'}`}>
              <span className="text-retro-teal mr-2">[</span>
              leo.dev
              <span className="text-retro-teal ml-2">]</span>
              <span className="animate-pulse ml-1 w-3 h-6 bg-retro-gray inline-block"></span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-retro-gray hover:bg-retro-teal hover:text-retro-cream border-2 border-transparent hover:border-retro-gray transition-colors px-4 rounded-none text-sm font-bold uppercase tracking-wider ${scrolled ? 'py-1' : 'py-2'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-1 text-retro-gray hover:bg-retro-teal hover:text-retro-cream border-2 border-transparent hover:border-retro-gray focus:outline-none"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7 stroke-2" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-retro-cream border-b-4 border-retro-gray absolute w-full"
        >
          <div className="px-4 pt-2 pb-6 space-y-2 sm:px-3 flex flex-col items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-retro-gray hover:bg-retro-teal hover:text-retro-cream border-2 border-transparent hover:border-retro-gray block px-6 py-3 w-full text-center text-lg font-bold uppercase tracking-wide transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
