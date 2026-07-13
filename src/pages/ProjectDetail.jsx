import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { Lightbox } from '../components/Lightbox';

// A modular inline carousel for renders, blueprints, and concept sketches
const DetailCarousel = ({ images, filterStyle = {}, onImageClick }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Reset index when images list changes
  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection(1);
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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

  const customEase = [0.16, 1, 0.3, 1];

  return (
    <div className="relative w-full aspect-[16/9] border border-zinc-150 dark:border-zinc-900 overflow-hidden group bg-zinc-50 dark:bg-zinc-900/10">
      {/* Slides */}
      <div 
        className="absolute inset-0 w-full h-full cursor-zoom-in"
        onClick={() => onImageClick(images[index])}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.6, ease: customEase },
              opacity: { duration: 0.3 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[index]}
              alt={`Slide ${index + 1}`}
              style={filterStyle}
              className="w-full h-full object-cover filter contrast-[1.02] hover:scale-[1.02] transition-transform duration-700 ease-fluid"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav Controls (Only show if multiple images exist) */}
      {images.length > 1 && (
        <>
          {/* Arrow Buttons */}
          <button
            onClick={handlePrev}
            className="hover-target absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-sm z-10 transition-colors"
            aria-label="Anterior"
          >
            &lsaquo;
          </button>
          <button
            onClick={handleNext}
            className="hover-target absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-sm z-10 transition-colors"
            aria-label="Siguiente"
          >
            &rsaquo;
          </button>

          {/* Slide Indicator Dots or text */}
          <div className="absolute bottom-4 right-4 bg-black/40 border border-white/10 px-3 py-1 font-mono text-[10px] text-white tracking-widest uppercase z-10">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </>
      )}
    </div>
  );
};

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  // Find project details
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
        <h1 className="text-2xl font-light text-zinc-950 dark:text-white mb-4">Proyecto No Encontrado</h1>
        <Link to="/proyectos" className="text-sm font-mono uppercase tracking-widest border-b border-zinc-900 dark:border-white pb-1">
          Volver a Proyectos
        </Link>
      </div>
    );
  }

  // Find previous and next projects
  const prevProject = projectsData.find((p) => p.slug === project.prevSlug) || projectsData[0];
  const nextProject = projectsData.find((p) => p.slug === project.nextSlug) || projectsData[0];

  const handleScrollToContent = () => {
    const scrollSection = document.getElementById('project-gallery');
    if (scrollSection) {
      scrollSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-24 pb-20 w-full min-h-screen"
    >
      {/* Project Header */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col justify-center items-start min-h-[50vh]">
        <div className="space-y-4 max-w-4xl">
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
            {project.category} &mdash; Proyecto
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-zinc-950 dark:text-white leading-tight">
            {project.title}
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={handleScrollToContent}
          className="hover-target mt-12 flex items-center space-x-4 cursor-pointer text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-widest font-mono">Ver Obras</span>
          <div className="w-12 h-[1px] bg-zinc-200 dark:bg-zinc-800 transition-all duration-300 relative">
            <span className="absolute right-0 -top-[3px] text-[8px]">↓</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div id="project-gallery" className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-24 scroll-mt-24">
        {/* Description Section */}
        <section className="max-w-3xl border-t border-zinc-100 dark:border-zinc-900 pt-10">
          <h3 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6">
            Descripción
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light leading-relaxed">
            {project.longDesc}
          </p>
        </section>

        {/* Renders Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-3">
            Renders Fotorrealistas
          </h3>
          <DetailCarousel 
            images={project.renders} 
            onImageClick={(src) => setActiveLightboxImage(src)} 
          />
          <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-right">
            Perspectivas Exteriores e Interiores
          </p>
        </section>

        {/* Technical / Conceptual Dual View */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Blueprints / Planos */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-3">
              Planos Arquitectónicos
            </h3>
            <DetailCarousel 
              images={project.blueprints} 
              filterStyle={project.blueprintFilter !== 'none' ? { filter: project.blueprintFilter } : {}}
              onImageClick={(src) => setActiveLightboxImage(src)}
            />
            <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-left">
              Plantas Arquitectónicas y Cortes Generales
            </p>
          </div>

          {/* Concept sketches */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-3">
              Concepto Generador
            </h3>
            <DetailCarousel 
              images={project.concepts} 
              filterStyle={project.conceptFilter !== 'none' ? { filter: project.conceptFilter } : {}}
              onImageClick={(src) => setActiveLightboxImage(src)}
            />
            <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-right">
              Exploración Volumétrica y Esquemas de Luz
            </p>
          </div>
        </section>

        {/* Video Recorrido Section (If available) */}
        {project.video && (
          <section className="space-y-4 border-t border-zinc-100 dark:border-zinc-900 pt-16">
            <h3 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6">
              Video Recorrido
            </h3>
            <div className="aspect-video w-full border border-zinc-150 dark:border-zinc-900 overflow-hidden bg-black relative">
              <video 
                controls 
                poster={project.video.poster}
                className="w-full h-full object-cover filter contrast-[1.02]"
              >
                <source src={project.video.url} type="video/mp4" />
                Tu navegador no soporta el formato de video mp4.
              </video>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-right">
              {project.video.caption}
            </p>
          </section>
        )}

        {/* Navigation between projects */}
        <div className="flex items-center justify-between border-t border-zinc-150 dark:border-zinc-900 pt-12 text-xs font-mono tracking-widest uppercase">
          <Link
            to={`/proyecto/${prevProject.slug}`}
            className="hover-target hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors py-2"
          >
            ← Proyecto Anterior
          </Link>
          <Link
            to={`/proyecto/${nextProject.slug}`}
            className="hover-target hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors py-2"
          >
            Siguiente Proyecto →
          </Link>
        </div>
      </div>

      {/* Lightbox for image clicks */}
      <Lightbox
        isOpen={!!activeLightboxImage}
        imageSrc={activeLightboxImage}
        onClose={() => setActiveLightboxImage(null)}
      />
    </motion.div>
  );
};
export default ProjectDetail;
