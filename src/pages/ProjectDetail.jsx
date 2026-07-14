import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { Lightbox } from '../components/Lightbox';

// A modular inline carousel for renders, blueprints, and concept sketches
const DetailCarousel = ({ images, filterStyle = {}, onImageClick, aspectRatio = 'aspect-[16/8]' }) => {
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
    <div className={`relative w-full ${aspectRatio} border border-zinc-150 dark:border-zinc-900 overflow-hidden group bg-zinc-50 dark:bg-zinc-900/10`}>
      {/* Slides */}
      <div 
        className="absolute inset-0 w-full h-full cursor-zoom-in hover-target"
        data-cursor="zoom"
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
              x: { duration: 0.4, ease: customEase },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[index]}
              alt={`Slide ${index + 1}`}
              style={filterStyle}
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
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
  const [lightboxState, setLightboxState] = useState({ isOpen: false, images: [], index: 0 });

  const openLightbox = (imagesList, src) => {
    const idx = imagesList.indexOf(src);
    setLightboxState({
      isOpen: true,
      images: imagesList,
      index: idx >= 0 ? idx : 0
    });
  };

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
      className="pt-20 pb-12 w-full min-h-screen"
    >
      {/* Back to projects */}
      <div className="max-w-7xl mx-auto px-5 pt-6 pb-2">
        <Link
          to="/proyectos"
          className="hover-target inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
          <span>Proyectos</span>
        </Link>
      </div>

      {/* Project Header */}
      <section className="max-w-7xl mx-auto px-5 py-8 md:py-14 flex flex-col justify-center items-start min-h-[35vh]">
        <div className="space-y-4 max-w-4xl">
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest block">
            {project.category} &mdash; Proyecto
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-light tracking-tight text-zinc-950 dark:text-white leading-tight">
            {project.title}
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={handleScrollToContent}
          className="hover-target mt-6 flex items-center space-x-4 cursor-pointer text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-widest font-mono">Ver Obras</span>
          <div className="w-12 h-[1px] bg-zinc-200 dark:bg-zinc-800 transition-all duration-300 relative">
            <span className="absolute right-0 -top-[3px] text-[8px]">↓</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div id="project-gallery" className="max-w-7xl mx-auto px-5 space-y-10 md:space-y-16 scroll-mt-20">
        {/* Description Section */}
        <section className="border-t border-zinc-100 dark:border-zinc-900 pt-6">
          <h3 className="text-sm sm:text-[15px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest mb-4">
            Descripción
          </h3>
          <p className="text-zinc-700 dark:text-zinc-200 text-sm leading-[1.85] font-light max-w-3xl">
            {project.longDesc}
          </p>
        </section>

        {/* Renders Section */}
        <section className="space-y-4">
          <h3 className="text-sm sm:text-[15px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-3">
            Renders Fotorrealistas
          </h3>
          <DetailCarousel 
            images={project.renders}
            aspectRatio="aspect-[4/3] md:aspect-[16/8]"
            onImageClick={(src) => openLightbox(project.renders, src)} 
          />
          <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest text-right">
            Perspectivas Exteriores e Interiores
          </p>
        </section>

        {/* Technical / Conceptual Dual View */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Blueprints / Planos */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-[15px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-3">
              Planos Arquitectónicos
            </h3>
            <DetailCarousel 
              images={project.blueprints}
              aspectRatio="aspect-[4/3]"
              filterStyle={{}}
              onImageClick={(src) => openLightbox(project.blueprints, src)}
            />
            <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest text-left">
              Plantas Arquitectónicas y Cortes Generales
            </p>
          </div>

          {/* Concept sketches */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-[15px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-3">
              Concepto Generador
            </h3>
            <DetailCarousel 
              images={project.concepts}
              aspectRatio="aspect-[4/3]"
              filterStyle={{}}
              onImageClick={(src) => openLightbox(project.concepts, src)}
            />
            <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest text-right">
              Exploración Volumétrica y Esquemas de Luz
            </p>
          </div>
        </section>

        {/* Video Recorrido Section (If available) */}
        {project.video && (
          <section className="space-y-3 border-t border-zinc-100 dark:border-zinc-900 pt-8">
            <h3 className="text-sm sm:text-[15px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest mb-3">
              Video Recorrido
            </h3>
            <div className="aspect-video w-full border border-zinc-150 dark:border-zinc-900 overflow-hidden bg-black relative">
              <video 
                controls 
                poster={project.video.poster}
                className="w-full h-full object-cover"
              >
                <source src={project.video.url} type="video/mp4" />
                Tu navegador no soporta el formato de video mp4.
              </video>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest text-right">
              {project.video.caption}
            </p>
          </section>
        )}

        {/* Navigation between projects */}
        <div className="flex items-center justify-between border-t border-zinc-150 dark:border-zinc-900 pt-6 text-[10px] font-mono tracking-widest uppercase">
          <Link
            to={`/proyecto/${prevProject.slug}`}
            className="hover-target group inline-flex items-center gap-2 whitespace-nowrap text-zinc-500 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 py-2"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
            <span>Proyecto Anterior</span>
          </Link>
          <Link
            to={`/proyecto/${nextProject.slug}`}
            className="hover-target group inline-flex items-center gap-2 whitespace-nowrap text-zinc-500 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 py-2"
          >
            <span>Siguiente Proyecto</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>

      {/* Lightbox for image clicks with full slideshow support */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        currentIndex={lightboxState.index}
        onPrev={() => setLightboxState(prev => ({ ...prev, index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1 }))}
        onNext={() => setLightboxState(prev => ({ ...prev, index: prev.index === prev.images.length - 1 ? 0 : prev.index + 1 }))}
        onClose={() => setLightboxState(prev => ({ ...prev, isOpen: false }))}
      />
    </motion.div>
  );
};
export default ProjectDetail;
