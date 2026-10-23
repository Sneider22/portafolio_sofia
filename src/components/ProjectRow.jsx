import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Img } from './Img';
import { Reveal, EASE } from './Reveal';

// Fila grande de proyecto para la portada: imagen con efecto de profundidad
// al hacer scroll y texto al lado. En escritorio alterna izquierda/derecha.
export const ProjectRow = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const flipped = index % 2 === 1;

  return (
    <article ref={ref} className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
      <Link
        to={`/proyecto/${project.slug}`}
        data-cursor="ver"
        className={`hover-target group block md:col-span-8 ${flipped ? 'md:order-last' : ''}`}
      >
        <motion.div
          initial={{ clipPath: 'inset(14% 6% 14% 6%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.3, ease: EASE }}
          className="relative aspect-[4/3] overflow-hidden bg-surface md:aspect-[16/10]"
        >
          <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
            <Img
              path={project.heroImage}
              alt={project.title}
              sizes="(min-width: 768px) 66vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-fluid group-hover:scale-[1.04]"
            />
          </motion.div>
        </motion.div>
      </Link>

      <Reveal delay={0.15} className="md:col-span-4 md:pb-4">
        <span className="font-serif text-6xl italic leading-none text-accent md:text-7xl">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-3 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          <Link to={`/proyecto/${project.slug}`} className="hover-target">{project.title}</Link>
        </h3>
        <p className="mt-3 eyebrow text-muted">
          {project.category}
          {project.location && <> · {project.location}</>}
        </p>
        <p className="mt-4 max-w-sm leading-relaxed text-fg/80">{project.shortDesc}</p>
        <Link
          to={`/proyecto/${project.slug}`}
          className="hover-target group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium"
        >
          <span className="link-line">Ver proyecto</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </Reveal>
    </article>
  );
};

export default ProjectRow;
