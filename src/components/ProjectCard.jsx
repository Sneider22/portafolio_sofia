import React from 'react';
import { Link } from 'react-router-dom';
import { Img } from './Img';
import { Reveal } from './Reveal';

export const ProjectCard = ({ project, index }) => {
  return (
    <Reveal delay={(index % 3) * 0.08} className="group">
      <Link to={`/proyecto/${project.slug}`} data-cursor="ver" className="hover-target block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Img
            path={project.heroImage}
            alt={project.title}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-fluid group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 font-serif text-3xl italic text-white drop-shadow">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-2xl font-medium leading-tight">
              <span className="link-line">{project.title}</span>
            </h3>
            <span className="shrink-0 eyebrow text-muted">
              {project.category}
            </span>
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg/75 line-clamp-2">
            {project.shortDesc}
          </p>
        </div>
      </Link>
    </Reveal>
  );
};

export default ProjectCard;
