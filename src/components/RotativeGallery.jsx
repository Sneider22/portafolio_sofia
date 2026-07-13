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
    enter: (dir) => {
      if (dir === 0) return { rotateY: 0, opacity: 1, scale: 1, zIndex: 1 };
      return {
        rotateY: dir > 0 ? 0 : -180,
        scale: dir > 0 ? 0.96 : 1,
        opacity: dir > 0 ? 0.8 : 1,
        zIndex: dir > 0 ? 1 : 2,
        transformOrigin: 'left center',
      };
    },
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 2,
      transformOrigin: 'left center',
    },
    exit: (dir) => {
      return {
        rotateY: dir > 0 ? -180 : 0,
        scale: dir > 0 ? 1 : 0.96,
        opacity: dir > 0 ? 1 : 0.8,
        zIndex: dir > 0 ? 2 : 1,
        transformOrigin: 'left center',
      };
    },
  };

  const imageVariants = {
    enter: { scale: 1.05 },
    center: { scale: 1 },
    exit: { scale: 1.05 },
  };

  // Easing curve: easeOutExpo [0.16, 1, 0.3, 1]
  const customEase = [0.16, 1, 0.3, 1];

  const textTransition = {
    duration: 0.5,
    ease: customEase,
  };

  return (
    <div 
      className="w-full relative py-12 md:py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 2200 }}
    >
      {/* Horizontal grid top line */}
      <div className="arch-grid-line mb-10" />

      {/* Slider Viewport Container */}
      <div className="relative min-h-[580px] lg:min-h-[500px] w-full" style={{ transformStyle: "preserve-3d" }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { duration: 1.3, ease: customEase },
              scale: { duration: 1.3, ease: customEase },
              opacity: { duration: 0.8, ease: "easeInOut" }
            }}
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full absolute top-0 left-0"
          >
            {/* Left Side: Cinematic Image Viewport (Cols 1-7) */}
            <Link 
              to={`/proyecto/${project.slug}`}
              data-cursor="ver"
              style={{ transformStyle: "preserve-3d" }}
              className="lg:col-span-7 w-full overflow-hidden relative border border-zinc-150 dark:border-zinc-900 aspect-[16/10] bg-zinc-50 dark:bg-zinc-900/10 group block hover-target"
            >
              {/* Architectural Technical Annotations overlay */}
              <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 select-none tracking-widest flex items-center gap-1.5 pointer-events-none uppercase">
                <span className="w-1.5 h-1.5 bg-red-500/80 rounded-full animate-pulse" />
                <span>SLIDE_0{activeIndex + 1} // VIEW_PORT_A</span>
              </div>
              <div className="absolute top-4 right-4 z-10 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 select-none tracking-widest pointer-events-none uppercase">
                SYS: ACTIVE // 60Hz
              </div>
              <div className="absolute bottom-4 left-4 z-10 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 select-none tracking-widest pointer-events-none uppercase">
                DIM: 1920x1200 // EPSILON
              </div>
              <div className="absolute bottom-4 right-4 z-10 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 select-none tracking-widest pointer-events-none uppercase">
                STUDIO © 2026
              </div>

              {/* Technical Corner Crosshairs */}
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-zinc-200 dark:border-zinc-800 pointer-events-none z-10" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-zinc-200 dark:border-zinc-800 pointer-events-none z-10" />
              <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-zinc-200 dark:border-zinc-800 pointer-events-none z-10" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-zinc-200 dark:border-zinc-800 pointer-events-none z-10" />

              <motion.img
                variants={imageVariants}
                transition={{ duration: 1.3, ease: customEase }}
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover select-none filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </Link>

            {/* Vertical Separator Line (Only visible on large screens) */}
            <div className="hidden lg:block lg:col-span-1 h-[320px] flex justify-center">
              <div className="arch-vertical-line" />
            </div>

            {/* Right Side: Architectural Info & Details (Cols 9-12) */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6 py-2 min-h-[350px]">
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed Controls & Monospace technical counters (placed outside the rotating grid) */}
      <div className="border-t border-zinc-100 dark:border-zinc-900/60 pt-6 mt-8 flex items-center justify-between max-w-7xl mx-auto">
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

      {/* Horizontal bottom line */}
      <div className="arch-grid-line mt-10" />
    </div>
  );
};
export default RotativeGallery;
