import React from 'react';
import { projectsData } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';
import { LineReveal, Reveal } from '../components/Reveal';

export const Projects = () => {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-5 pb-20 pt-32 md:px-8 md:pt-40">
      <header className="mb-12 flex flex-col justify-between gap-4 border-b border-line pb-8 md:mb-16 md:flex-row md:items-end">
        <h1 className="font-serif text-6xl font-medium tracking-tight md:text-8xl">
          <LineReveal animateOnMount lines={[<>Obras <em className="italic text-accent">selectas</em></>]} />
        </h1>
        <Reveal delay={0.3}>
          <p className="eyebrow text-muted">
            Proyectos académicos · {String(projectsData.length).padStart(2, '0')}
          </p>
        </Reveal>
      </header>

      <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
};
export default Projects;
