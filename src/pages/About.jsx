import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  const [imageError, setImageError] = useState(false);
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
          <div className="w-32 h-32 border border-zinc-200 dark:border-zinc-700 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/10 overflow-hidden">
            {!imageError ? (
              <img
                src="/assets/perfil.jpeg"
                alt="Sofia Sneider"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">
              Sofía Sánchez
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300 text-xs font-mono tracking-widest uppercase">
              Sobre mí &mdash; Curriculum Vitae
            </p>
          </div>
        </div>
        <p className="text-zinc-700 dark:text-zinc-200 text-sm max-w-md leading-relaxed md:text-right">
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
              <h2 className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest">
                Perfil Profesional
              </h2>
            </div>

            <div className="space-y-4">
              {/* Job 1 */}
              <div className="space-y-2">
                <p className="text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed max-w-2xl">
                  Estudiante de último semestre de Arquitectura en la Universidad Santa Maria sede La Florencia, con fuerte interés en el desarrollo técnico de proyectos y la metodología BIM.

                  Durante mi etapa académica he desarrollado una sólida base en el diseño de proyectos residenciales, comerciales, recreativos, entre otros, destacando por mi capacidad de organización, trabajo bajo presión y atención al detalle en la documentación técnica. Dominio de herramientas como AutoCAD, Revit, SketchUp y D5.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="border-b border-zinc-100 dark:border-zinc-900 pb-4">
              <h2 className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest">
                Educación Académica
              </h2>
            </div>

            <div className="space-y-4">
              {/* Degree 1 */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <div className="space-y-2">
                    <h4 className="text-md font-normal text-zinc-950 dark:text-white">
                      Arquitectura - Estudiante 10mo Semestre
                    </h4>
                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest">
                      Universidad Santa María / 2021 - Presente
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-200 text-sm max-w-xl leading-relaxed mt-2">
                      Desarrollo conceptual, modelado 3D BIM, creación de renders y planimetría para proyectos residenciales y comerciales de alto perfil. Integro criterios de diseño sostenible y bienestar espacial, asegurando que cada propuesta sea estéticamente impecable y viable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Software & Languages) (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-8 lg:border-l lg:border-zinc-100 lg:dark:border-zinc-900 lg:pl-8">
          {/* Software */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-4">
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
            <h2 className="text-xs font-mono text-zinc-500 dark:text-zinc-300 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-4">
              Idiomas
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="space-y-0.5">
                <span className="font-medium text-zinc-950 dark:text-white block">Español</span>
                <span className="text-zinc-600 dark:text-zinc-300 text-xs block">Nativo</span>
              </li>
              <li className="space-y-0.5">
                <span className="font-medium text-zinc-950 dark:text-white block">Inglés</span>
                <span className="text-zinc-600 dark:text-zinc-300 text-xs block">
                  Intermedio Alto (B2)
                </span>
              </li>
              <li className="space-y-0.5">
                <span className="font-medium text-zinc-950 dark:text-white block">Portugués</span>
                <span className="text-zinc-600 dark:text-zinc-300 text-xs block">Básico (A2)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default About;
