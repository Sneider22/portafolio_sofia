import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';

export const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-24 pb-12 px-5 max-w-7xl mx-auto w-full min-h-screen"
    >
      {/* Page Header */}
      <header className="mb-8 border-b border-zinc-150 dark:border-zinc-900 pb-5">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-950 dark:text-white mb-2">
          Obras Selectas
        </h1>
        <p className="text-zinc-400 dark:text-zinc-500 text-xs font-mono tracking-widest uppercase">
          Proyectos Académicos · 01 / {String(projectsData.length).padStart(2, '0')}
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {projectsData.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};
export default Projects;
