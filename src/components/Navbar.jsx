import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Inicio',     path: '/' },
    { name: 'Proyectos',  path: '/proyectos' },
    { name: 'Sobre mí',   path: '/sobre-mi' },
    { name: 'Contacto',   path: '/contacto' },
  ];

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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-100/80 dark:border-zinc-900/80 shadow-sm shadow-zinc-100/50 dark:shadow-zinc-950/50'
            : 'bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md border-b border-zinc-100/40 dark:border-zinc-900/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="hover-target group flex items-center gap-2.5 select-none"
          >
            {/* Architectural mark */}
            <div className="relative w-5 h-5 flex-shrink-0">
              <span className="absolute inset-0 border border-zinc-900 dark:border-white rotate-45 scale-75 group-hover:rotate-[60deg] transition-transform duration-500" />
              <span className="absolute inset-[3px] bg-zinc-950 dark:bg-white rotate-45 scale-50 group-hover:scale-75 group-hover:rotate-[60deg] transition-all duration-500" />
            </div>
            <span className="text-sm font-semibold tracking-[0.2em] font-mono text-zinc-950 dark:text-white uppercase">
              Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover-target relative px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-mono transition-colors duration-300 rounded-sm ${
                    isLinkActive(link.path)
                      ? 'text-zinc-950 dark:text-white'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  {link.name}
                  {isLinkActive(link.path) && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-4 right-4 h-[1px] bg-zinc-950 dark:bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Theme + Hamburger */}
          <div className="flex items-center gap-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hover-target group relative w-8 h-8 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4"
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
                    className="w-4 h-4"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover-target flex flex-col justify-center items-end gap-[5px] w-8 h-8 group"
              aria-label="Toggle menu"
            >
              <span className={`h-[1px] bg-zinc-950 dark:bg-white transition-all duration-400 ${
                mobileMenuOpen ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'
              }`} />
              <span className={`h-[1px] bg-zinc-950 dark:bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'w-0 opacity-0' : 'w-3 group-hover:w-5'
              }`} />
              <span className={`h-[1px] bg-zinc-950 dark:bg-white transition-all duration-400 ${
                mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-4 group-hover:w-5'
              }`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — Full overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 flex flex-col justify-center md:hidden overflow-hidden"
          >
            {/* Decorative vertical lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-5 top-0 bottom-0 border-l border-zinc-100 dark:border-zinc-900" />
              <div className="absolute right-5 top-0 bottom-0 border-r border-zinc-100 dark:border-zinc-900" />
            </div>

            <nav className="px-8 space-y-1">
              <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-300 dark:text-zinc-700 mb-8">
                Navegación
              </p>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`hover-target group flex items-baseline gap-4 py-3 border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-200 ${
                      isLinkActive(link.path)
                        ? 'text-zinc-950 dark:text-white'
                        : 'text-zinc-300 dark:text-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-zinc-300 dark:text-zinc-700 w-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-2xl font-light tracking-tight">
                      {link.name}
                    </span>
                    {isLinkActive(link.path) && (
                      <span className="ml-auto text-[9px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                        Activo
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="absolute bottom-8 left-8 right-8 flex items-center justify-between"
            >
              <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-300 dark:text-zinc-700">
                Portfolio © 2026
              </span>
              <button
                onClick={toggleTheme}
                className="hover-target text-[9px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
