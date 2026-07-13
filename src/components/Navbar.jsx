import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Sobre mí', path: '/sobre-mi' },
    { name: 'Contacto', path: '/contacto' }
  ];

  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-widest hover-target font-mono">
            STUDIO.
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link) => (
              <li key={link.path} className="relative">
                <Link
                  to={link.path}
                  className={`text-sm tracking-widest uppercase hover-target hover:text-zinc-950 dark:hover:text-white transition-colors py-2 font-mono ${
                    isLinkActive(link.path) 
                      ? 'text-zinc-950 dark:text-white font-medium' 
                      : 'text-zinc-400 dark:text-zinc-500'
                  }`}
                >
                  {link.name}
                </Link>
                {isLinkActive(link.path) && (
                  <motion.div 
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-950 dark:bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Theme Toggle & Mobile Menu Toggle */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center border border-zinc-100 dark:border-zinc-900 rounded-full hover-target hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors text-zinc-600 dark:text-zinc-400"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col items-end space-y-1.5 p-2 hover-target group z-50"
              aria-label="Toggle Menu"
            >
              <span className={`h-[1px] bg-zinc-950 dark:bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
              }`} />
              <span className={`h-[1px] bg-zinc-950 dark:bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-6'
              }`} />
              <span className={`h-[1px] bg-zinc-950 dark:bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-5 group-hover:w-6'
              }`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 flex flex-col justify-center px-8 md:hidden"
          >
            <div className="text-zinc-300 dark:text-zinc-800 text-xs tracking-widest uppercase mb-10 font-mono">
              Navegación
            </div>
            <ul className="space-y-8 flex flex-col">
              {navLinks.map((link) => (
                <motion.li
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl font-light tracking-wide hover:opacity-100 transition-opacity font-mono ${
                      isLinkActive(link.path) 
                        ? 'text-zinc-950 dark:text-white' 
                        : 'text-zinc-400 dark:text-zinc-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
