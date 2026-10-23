import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { profile, activeSocials } from '../data/profile';

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Proyectos', path: '/proyectos' },
  { name: 'Sobre mí', path: '/sobre-mi' },
  { name: 'Contacto', path: '/contacto' },
];

const ThemeIcon = ({ theme }) => (
  <AnimatePresence mode="wait" initial={false}>
    {theme === 'dark' ? (
      <motion.svg
        key="sun"
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.3 }}
        className="h-4 w-4"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
      </motion.svg>
    ) : (
      <motion.svg
        key="moon"
        initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.3 }}
        className="h-4 w-4"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </motion.svg>
    )}
  </AnimatePresence>
);

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    // En la portada, la barra es transparente mientras se ve la imagen grande
    const handleScroll = () => {
      const limit = isHome ? window.innerHeight - 80 : 20;
      setScrolled(window.scrollY > limit);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  const overImage = isHome && !scrolled && !mobileMenuOpen;

  const isLinkActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 top-0 z-50 w-full transition-colors duration-500 ${
          overImage
            ? 'bg-transparent text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]'
            : 'border-b border-line bg-bg/90 text-fg backdrop-blur-xl'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link to="/" className="hover-target group flex select-none items-center gap-3">
            <div className="relative h-5 w-5 shrink-0">
              <span className="absolute inset-0 rotate-45 scale-75 border border-current transition-transform duration-500 group-hover:rotate-[90deg]" />
              <span className="absolute inset-[3px] rotate-45 scale-50 bg-accent transition-all duration-500 group-hover:rotate-[90deg] group-hover:scale-75" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-tight">
              {profile.name}
            </span>
          </Link>

          {/* Escritorio */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover-target relative px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] transition-opacity duration-300 ${
                    isLinkActive(link.path) ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {link.name}
                  {isLinkActive(link.path) && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className="hover-target flex h-11 w-11 items-center justify-center opacity-75 transition-opacity hover:opacity-100"
            >
              <ThemeIcon theme={theme} />
            </button>

            {/* Menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover-target group flex h-11 w-11 flex-col items-end justify-center gap-[6px] md:hidden"
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`h-px w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`h-px w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-hidden bg-bg px-6 md:hidden"
          >
            <nav>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className="hover-target flex items-baseline gap-5 border-b border-line py-5"
                  >
                    <span className="w-8 shrink-0 font-serif text-xl italic text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-serif text-5xl leading-none tracking-tight ${isLinkActive(link.path) ? 'italic text-accent' : ''}`}>
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute inset-x-6 flex flex-wrap gap-x-6 gap-y-2 eyebrow text-muted"
              style={{ bottom: 'max(2rem, env(safe-area-inset-bottom))' }}
            >
              <a href={`mailto:${profile.email}`} className="py-2">{profile.email}</a>
              {activeSocials.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="py-2">{name}</a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
