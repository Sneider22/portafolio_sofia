import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

export const RotativeGallery = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const activeIndex = (page % projectsData.length + projectsData.length) % projectsData.length;
  const project = projectsData[activeIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Autoplay functionality (stops on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [page, isHovered]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const imageVariants = {
    enter: (dir) => ({
      scale: 1.1,
      x: dir > 0 ? '-20%' : '20%',
    }),
    center: {
      scale: 1,
      x: 0,
    },
    exit: (dir) => ({
      scale: 1.1,
      x: dir < 0 ? '-20%' : '20%',
    }),
  };

  // Easing curve: easeOutExpo [0.16, 1, 0.3, 1]
  const customEase = [0.16, 1, 0.3, 1];

  const textTransition = {
    duration: 0.8,
    ease: customEase,
  };

  return (
    <div 
      className="w-full relative py-12 md:py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Horizontal grid top line */}
      <div className="arch-grid-line mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px] items-center">
        {/* Left Side: Cinematic Image Viewport (Cols 1-7) */}
        <div className="lg:col-span-7 w-full overflow-hidden relative border border-zinc-150 dark:border-zinc-900 aspect-[16/10] bg-zinc-50 dark:bg-zinc-900/10">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 0.8, ease: customEase },
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.img
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: customEase }}
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover select-none filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vertical Separator Line (Only visible on large screens) */}
        <div className="hidden lg:block lg:col-span-1 h-full py-10 flex justify-center">
          <div className="arch-vertical-line" />
        </div>

        {/* Right Side: Architectural Info & Details (Cols 9-12) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full py-2 min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={textTransition}
              className="space-y-6"
            >
              {/* Monospace Category Tag */}
              <div className="text-zinc-400 dark:text-zinc-500 text-xs font-mono tracking-widest uppercase flex items-center space-x-2">
                <span className="inline-block w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
                <span>{project.category}</span>
              </div>

              {/* Title */}
              <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
                {project.shortDesc}
              </p>

              {/* Detail link */}
              <div className="pt-4">
                <Link
                  to={`/proyecto/${project.slug}`}
                  className="hover-target inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-zinc-900 dark:text-white border-b border-zinc-900 dark:border-white pb-1 hover:opacity-75 transition-opacity"
                >
                  <span>Ver Obra</span>
                  <span className="text-[10px]">→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls & Monospace technical counters */}
          <div className="border-t border-zinc-100 dark:border-zinc-900/60 pt-6 mt-8 flex items-center justify-between">
            {/* Nav Arrows */}
            <div className="flex space-x-8 text-xs font-mono tracking-widest">
              <button
                onClick={() => paginate(-1)}
                className="hover-target hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors uppercase py-2"
              >
                ← PREV
              </button>
              <button
                onClick={() => paginate(1)}
                className="hover-target hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors uppercase py-2"
              >
                NEXT →
              </button>
            </div>

            {/* Technical Monospace Counter */}
            <div className="text-sm font-mono tracking-widest text-zinc-400 dark:text-zinc-500">
              <span className="text-zinc-950 dark:text-white font-medium">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-2">/</span>
              <span>{String(projectsData.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal bottom line */}
      <div className="arch-grid-line mt-10" />
    </div>
  );
};
export default RotativeGallery;
