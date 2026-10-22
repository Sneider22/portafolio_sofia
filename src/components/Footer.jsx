import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-zinc-400 dark:text-zinc-500 text-xs tracking-widest uppercase font-mono">
        <p>© 2026 SOFIA STUDIO. Todos los derechos reservados.</p>
        <p className="mt-4 md:mt-0 text-[10px] opacity-60">Atemporalidad · Luz · Materia</p>
      </div>
    </footer>
  );
};
export default Footer;
