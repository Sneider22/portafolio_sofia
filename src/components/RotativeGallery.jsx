import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

export const RotativeGallery = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const activeIndex = (page % projectsData.length + projectsData.length) % projectsData.length;
  const project = projectsData[activeIndex];

  const paginate = (newDirection) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setPage([page + newDirection, newDirection]);
    setTimeout(() => setIsFlipping(false), 900);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [page, isHovered]);

  // Cinematic page-turn: enters from right edge folded, unfolds to flat
  const slideVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 55 : -55,
      x: dir > 0 ? '12%' : '-12%',
      opacity: 0,
      scale: 0.94,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
    }),
    center: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -55 : 55,
      x: dir > 0 ? '-12%' : '12%',
      opacity: 0,
      scale: 0.94,
      transformOrigin: dir > 0 ? 'right center' : 'left center',
    }),
  };

  const pageTransition = {
    rotateY: { duration: 0.85, ease: [0.33, 1, 0.68, 1] },
    x:       { duration: 0.85, ease: [0.33, 1, 0.68, 1] },
    opacity: { duration: 0.45, ease: 'easeInOut' },
    scale:   { duration: 0.85, ease: [0.33, 1, 0.68, 1] },
  };

  const imageVariants = {
    enter: { scale: 1.06 },
    center: { scale: 1, transition: { duration: 0.85, ease: [0.33, 1, 0.68, 1] } },
    exit: { scale: 1.06 },
  };

  const infoVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 20 : -20 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.3 } },
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -20 : 20, transition: { duration: 0.2 } }),
  };

  return (
    <div
      className="w-full relative py-6 md:py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1800px' }}
    >
      {/* Top separator */}
      <div className="arch-grid-line mb-6" />

      {/* Slider Viewport */}
      <div
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d', minHeight: '420px' }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full absolute top-0 left-0"
          >
            {/* Left: Image (Cols 1–7) */}
            <Link
              to={`/proyecto/${project.slug}`}
              data-cursor="ver"
              style={{ transformStyle: 'preserve-3d' }}
              className="lg:col-span-7 w-full overflow-hidden relative border border-zinc-150 dark:border-zinc-900 aspect-[16/10] bg-zinc-50 dark:bg-zinc-900/10 group block hover-target"
            >
              {/* Corner crosshairs */}
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-zinc-200 dark:border-zinc-700 pointer-events-none z-10" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-zinc-200 dark:border-zinc-700 pointer-events-none z-10" />
              <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-zinc-200 dark:border-zinc-700 pointer-events-none z-10" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-zinc-200 dark:border-zinc-700 pointer-events-none z-10" />

              {/* Page-fold shadow overlay — animates with the flip */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background: 'linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 40%)',
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              />

              <motion.img
                variants={imageVariants}
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/15 transition-colors duration-500 flex items-center justify-center">
                <span className="text-white text-[10px] font-mono uppercase tracking-widest border border-white/20 bg-black/20 px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  Ver Obra
                </span>
              </div>
            </Link>

            {/* Vertical separator */}
            <div className="hidden lg:flex lg:col-span-1 justify-center h-[280px]">
              <div className="arch-vertical-line" />
            </div>

            {/* Right: Info (Cols 9–12) */}
            <motion.div
              custom={direction}
              variants={infoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="lg:col-span-4 flex flex-col justify-center space-y-4 py-2"
            >
              <div className="text-zinc-400 dark:text-zinc-500 text-[10px] font-mono tracking-widest uppercase flex items-center space-x-2">
                <span className="inline-block w-1 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
                <span>{project.category}</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
                {project.title}
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-sm">
                {project.shortDesc}
              </p>

              <div className="pt-2">
                <Link
                  to={`/proyecto/${project.slug}`}
                  className="hover-target inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-zinc-900 dark:text-white border-b border-zinc-300 dark:border-zinc-700 pb-0.5 hover:border-zinc-950 dark:hover:border-white transition-colors duration-300"
                >
                  <span>Ver Obra</span>
                  <span className="text-[9px]">→</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls Bar ─────────────────────────────────── */}
      <div className="border-t border-zinc-100 dark:border-zinc-900/60 pt-4 mt-4">
        <div className="flex flex-col items-center gap-3">

          {/* Prev / Counter / Next — all centered */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => paginate(-1)}
              disabled={isFlipping}
              className="hover-target group flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 disabled:opacity-40"
              aria-label="Anterior"
            >
              <span className="text-base leading-none group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Counter */}
            <div className="flex items-baseline gap-1 text-xs font-mono tracking-widest">
              <span className="text-zinc-950 dark:text-white font-medium tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 text-[10px]">/</span>
              <span className="text-zinc-400 dark:text-zinc-500 tabular-nums">
                {String(projectsData.length).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={() => paginate(1)}
              disabled={isFlipping}
              className="hover-target group flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 disabled:opacity-40"
              aria-label="Siguiente"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="text-base leading-none group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {projectsData.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i === activeIndex || isFlipping) return;
                  const dir = i > activeIndex ? 1 : -1;
                  if (isFlipping) return;
                  setIsFlipping(true);
                  setPage([page + (i - activeIndex), dir]);
                  setTimeout(() => setIsFlipping(false), 900);
                }}
                className={`hover-target rounded-full transition-all duration-400 ${
                  i === activeIndex
                    ? 'w-4 h-[3px] bg-zinc-950 dark:bg-white'
                    : 'w-[3px] h-[3px] bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-500 dark:hover:bg-zinc-400'
                }`}
                aria-label={`Ir a proyecto ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Bottom separator */}
      <div className="arch-grid-line mt-4" />
    </div>
  );
};
export default RotativeGallery;
