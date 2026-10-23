import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { profile } from '../data/profile';
import { Img } from './Img';
import { LineReveal, EASE } from './Reveal';

const DURATION = 6; // segundos por imagen

// Portada a pantalla completa: los renders van cambiando con un zoom lento
export const HeroSlideshow = () => {
  const [index, setIndex] = useState(0);
  const project = projectsData[index];

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % projectsData.length), DURATION * 1000);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black text-white">
      {/* Imágenes */}
      <AnimatePresence initial={false}>
        <motion.div
          key={project.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: DURATION + 1.5, ease: 'linear' }}
            className="h-full w-full"
          >
            <Img path={project.heroImage} alt={project.title} eager className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Oscurecer para que el texto se lea */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
      {/* Sombra extra arriba para que el menú se lea sobre cielos claros */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Nombre */}
      <div className="absolute inset-x-0 bottom-28 mx-auto max-w-7xl px-5 sm:bottom-32 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] sm:text-[15px]"
        >
          <span className="h-[2px] w-10 bg-accent" />
          Portafolio de arquitectura
        </motion.p>
        <h1 className="font-serif text-[clamp(3.6rem,13vw,10rem)] font-medium leading-[0.88] tracking-tight">
          <LineReveal
            animateOnMount
            delay={0.2}
            lines={[profile.name.split(' ')[0], <em key="l" className="font-normal italic">{profile.name.split(' ').slice(1).join(' ')}</em>]}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: EASE }}
          className="mt-5 max-w-md text-base leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-lg"
        >
          Espacios que dialogan con la luz, la materia y el entorno.
        </motion.p>
      </div>

      {/* Barra inferior: proyecto actual + progreso */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          <Link to={`/proyecto/${project.slug}`} className="hover-target group min-w-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={project.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="flex items-baseline gap-3"
              >
                <span className="font-serif text-xl italic text-accent">{String(index + 1).padStart(2, '0')}</span>
                <span className="link-line truncate text-sm font-semibold sm:text-base">{project.title}</span>
                <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
              </motion.span>
            </AnimatePresence>
          </Link>

          <div className="flex shrink-0 items-center gap-1.5">
            {projectsData.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => setIndex(i)}
                aria-label={`Ver ${p.title}`}
                className="hover-target flex h-8 items-center"
              >
                <span className="relative block h-[2px] w-6 overflow-hidden bg-white/30 sm:w-10">
                  {i === index && (
                    <motion.span
                      key={index}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: DURATION, ease: 'linear' }}
                      className="absolute inset-0 origin-left bg-white"
                    />
                  )}
                  {i < index && <span className="absolute inset-0 bg-white/70" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlideshow;
