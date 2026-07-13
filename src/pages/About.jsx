import React from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-24 pb-12 px-5 max-w-7xl mx-auto w-full min-h-screen"
    >
      {/* Page Header */}
      <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-8 border-b border-zinc-150 dark:border-zinc-900 pb-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-900/10">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">
              Sobre mí
            </h1>
            <p className="text-zinc-400 dark:text-zinc-500 text-xs font-mono tracking-widest uppercase">
              Curriculum Vitae
            </p>
          </div>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md leading-relaxed md:text-right">
          Arquitecta apasionada por la creación de espacios atemporales y la atención minuciosa al detalle.
        </p>
      </header>

      {/* CV Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column (Experience & Education) (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Experience */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="border-b border-zinc-100 dark:border-zinc-900 pb-4">
              <h2 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Experiencia Profesional
              </h2>
            </div>

            <div className="space-y-4">
              {/* Job 1 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="text-md font-normal text-zinc-950 dark:text-white">
                    Arquitecta Proyectista
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Estudio de Arquitectura / 2021 — Presente
                  </span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                  Desarrollo conceptual, modelado 3D BIM, y planimetría para proyectos residenciales y comerciales de alto perfil.
                </p>
              </div>

              {/* Job 2 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="text-md font-normal text-zinc-950 dark:text-white">
                    Arquitecta Junior
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Firma Creativa SRL / 2019 — 2021
                  </span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                  Asistencia en la elaboración de proyectos ejecutivos y renderizado fotorrealista. Coordinación con proveedores.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="border-b border-zinc-100 dark:border-zinc-900 pb-4">
              <h2 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Educación Académica
              </h2>
            </div>

            <div className="space-y-4">
              {/* Degree 1 */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="text-md font-normal text-zinc-950 dark:text-white">
                    Máster en Diseño Arquitectónico
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Univ. de Arquitectura Europea / 2022 — 2023
                  </span>
                </div>
              </div>

              {/* Degree 2 */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="text-md font-normal text-zinc-950 dark:text-white">
                    Licenciatura en Arquitectura
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Universidad Nacional / 2014 — 2019
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Software & Languages) (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-8 lg:border-l lg:border-zinc-100 lg:dark:border-zinc-900 lg:pl-8">
          {/* Software */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-4">
              Software & Herramientas
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Revit', color: '065279', logo: 'autodeskrevit' },
                { name: 'AutoCAD', color: 'E23E3E', logo: 'autodesk' },
                { name: 'SketchUp', color: '005F9E', logo: 'sketchup' },
                { name: 'Twinmotion', color: '111111', logo: 'epicgames' },
                { name: 'D5 Render', color: '76B900', logo: 'nvidia' },
              ].map((soft) => (
                <img
                  key={soft.name}
                  src={`https://img.shields.io/badge/${soft.name}-${soft.color}?style=for-the-badge&logo=${soft.logo}&logoColor=white`}
                  alt={soft.name}
                  className="h-7 opacity-85 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-4">
              Idiomas
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="space-y-0.5">
                <span className="font-medium text-zinc-950 dark:text-white block">Español</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs block">Nativo</span>
              </li>
              <li className="space-y-0.5">
                <span className="font-medium text-zinc-950 dark:text-white block">Inglés</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs block">
                  Avanzado (C1) — Fluidez para equipos multidisciplinares globales.
                </span>
              </li>
              <li className="space-y-0.5">
                <span className="font-medium text-zinc-950 dark:text-white block">Italiano</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs block">Básico (A2)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default About;
