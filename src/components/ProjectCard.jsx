import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link to={`/proyecto/${project.slug}`} data-cursor="ver" className="block hover-target">
        {/* Image Frame */}
        <div className="card-img-wrapper overflow-hidden relative aspect-[4/3] border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/10">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover filter contrast-[1.02]"
            loading="lazy"
          />
          {/* Custom Overlay */}
          <div className="absolute inset-0 bg-zinc-950/20 dark:bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-white text-xs font-mono uppercase tracking-widest border border-white/20 bg-black/20 px-6 py-2.5 rounded-full transition-transform duration-500 translate-y-3 group-hover:translate-y-0">
              Ver detalles
            </span>
          </div>
        </div>

        {/* Content details */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between items-baseline">
            <h3 className="text-md font-light text-zinc-950 dark:text-white group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {project.category}
            </span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-sm line-clamp-2">
            {project.shortDesc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
export default ProjectCard;
