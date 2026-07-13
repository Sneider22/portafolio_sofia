import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';
import { RotativeGallery } from '../components/RotativeGallery';

export const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const handleScrollDown = () => {
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 md:space-y-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-start pt-16 px-5 max-w-7xl mx-auto w-full">
        {/* Decorative Grid Lines */}
        <div className="absolute top-0 left-6 h-full border-l border-zinc-100 dark:border-zinc-900 -z-10 pointer-events-none" />
        <div className="absolute top-0 right-6 h-full border-r border-zinc-100 dark:border-zinc-900 -z-10 pointer-events-none" />

        <div className="space-y-4 max-w-4xl">
          {/* Main Title with Reveal Animation */}
          <h1 className="text-5xl md:text-8xl font-light tracking-tight text-zinc-950 dark:text-white leading-none">
            <span className="block overflow-hidden relative">
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                Arquitectura
              </motion.span>
            </span>
            <span className="block overflow-hidden relative">
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block italic font-serif text-zinc-500 dark:text-zinc-400"
              >
                Sensorial
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-zinc-700 dark:text-zinc-200 text-lg md:text-xl font-light max-w-xl leading-relaxed"
          >
            Diseñando espacios atemporales que dialogan con la luz, la materia y el entorno.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          onClick={handleScrollDown}
          className="absolute bottom-10 left-6 flex items-center space-x-4 hover-target group cursor-pointer text-zinc-500 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-widest font-mono">Descubrir</span>
          <div className="w-12 h-[1px] bg-zinc-200 dark:bg-zinc-800 group-hover:w-20 transition-all duration-300 relative">
            <span className="absolute right-0 -top-[3px] text-[8px] group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </motion.div>
      </section>

      {/* Cinematic Rotative Gallery Section */}
      <section id="gallery-section" className="px-5 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-300">
            Galería Cinemática
          </h2>
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 hidden md:block">
            Mover con controles / Autoplay
          </span>
        </div>
        <RotativeGallery />
      </section>

      {/* Selected Projects Grid */}
      <section className="px-5 max-w-7xl mx-auto w-full">
        <div className="mb-6 border-b border-zinc-150 dark:border-zinc-900 pb-4 flex items-baseline justify-between">
          <h2 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-white">
            Obras Selectas
          </h2>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest">
            Grid General
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </section>

      {/* About Me Section */}
      <section id="sobre-mi-inicio" className="px-5 max-w-7xl mx-auto w-full border-t border-zinc-150 dark:border-zinc-900 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Header */}
          <div className="lg:col-span-4 space-y-3">
            <div className="w-16 h-16 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 dark:text-zinc-600">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className="text-3xl font-light tracking-tight text-zinc-950 dark:text-white">
              Sobre mí
            </h2>
            <p className="text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed max-w-xs">
              Arquitecta apasionada por la creación de espacios atemporales y la atención minuciosa al detalle.
            </p>
          </div>

          {/* Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border-b border-zinc-100 dark:border-zinc-900/60 pb-4">
              <h3 className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest mb-3">
                Experiencia Reciente
              </h3>
              <div className="space-y-2">
                <h4 className="text-md font-normal text-zinc-950 dark:text-white">
                  Arquitecta Proyectista
                </h4>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest">
                  Estudio de Arquitectura / 2021 — Presente
                </p>
                <p className="text-zinc-700 dark:text-zinc-200 text-sm max-w-xl leading-relaxed mt-2">
                  Desarrollo conceptual, modelado 3D BIM, y planimetría para proyectos residenciales y comerciales de alto perfil.
                </p>
              </div>
            </div>

            {/* Software badges */}
            <div className="">
              <h3 className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest mb-3">
                Software & Herramientas
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Revit', color: '065279', logo: 'autodeskrevit' },
                  { name: 'AutoCAD', color: 'E23E3E', logo: 'autodesk' },
                  { name: 'SketchUp', color: '005F9E', logo: 'sketchup' },
                  { name: 'Twinmotion', color: '111111', logo: 'epicgames' },
                ].map((soft) => (
                  <img
                    key={soft.name}
                    src={`https://img.shields.io/badge/${soft.name}-${soft.color}?style=for-the-badge&logo=${soft.logo}&logoColor=white`}
                    alt={soft.name}
                    className="h-7 opacity-85 dark:opacity-75 hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto-inicio" className="px-5 max-w-7xl mx-auto w-full border-t border-zinc-150 dark:border-zinc-900 pt-10 pb-10">
        <div className="text-center space-y-5 py-6">
          <h2 className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest">
            Contacto
          </h2>
          <div className="space-y-2">
            <p className="text-xl font-light text-zinc-600 dark:text-zinc-300">
              Iniciemos un diálogo
            </p>
            <a
              href="mailto:hola@studio-arch.com"
              className="hover-target inline-block text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-1 hover:border-zinc-950 dark:hover:border-white transition-colors duration-500"
            >
              hola@studio-arch.com
            </a>
          </div>

          <div className="flex justify-center space-x-8 pt-4 text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-300">
            {['Instagram', 'LinkedIn', 'Behance'].map((social) => (
              <a
                key={social}
                href="#"
                className="hover-target hover:text-zinc-950 dark:hover:text-white transition-colors py-2"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
export default Home;
