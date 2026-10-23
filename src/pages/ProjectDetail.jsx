import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData, getProjectNeighbors } from '../data/projectsData';
import { full } from '../lib/images';
import { Lightbox } from '../components/Lightbox';
import { Img } from '../components/Img';
import { Reveal, LineReveal, EASE } from '../components/Reveal';

const SectionTitle = ({ index, title, count }) => (
  <Reveal className="mb-8 flex items-baseline justify-between gap-4 border-t border-line pt-6 md:mb-10">
    <h2 className="flex items-baseline gap-4 font-serif text-3xl font-medium md:text-5xl">
      <span className="font-serif text-2xl italic text-accent md:text-3xl">{index}</span>
      {title}
    </h2>
    <span className="eyebrow text-muted">
      {String(count).padStart(2, '0')} {count === 1 ? 'imagen' : 'imágenes'}
    </span>
  </Reveal>
);

// Cuadrícula de imágenes que abren el visor al tocarlas.
// `drawing` = planos y bocetos: fondo blanco y la imagen completa, sin recortar.
const Gallery = ({ images, title, onOpen, drawing = false, featureFirst = false }) => (
  <div className="grid grid-cols-2 gap-3 md:gap-5">
    {images.map((path, i) => {
      // La primera ocupa todo el ancho (si featureFirst) y, si sobra una suelta al final, también
      const rest = featureFirst ? images.length - 1 : images.length;
      const big = (featureFirst && i === 0) || (rest % 2 === 1 && i === images.length - 1);
      return (
        <Reveal key={path} delay={(i % 2) * 0.08} className={big ? 'col-span-2' : ''}>
          <button
            onClick={() => onOpen(i)}
            data-cursor="zoom"
            aria-label={`Ampliar ${title} ${i + 1}`}
            className={`hover-target group block w-full overflow-hidden ${
              drawing ? 'bg-white p-2 md:p-4' : 'bg-surface'
            } ${big ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
          >
            <Img
              path={path}
              alt={`${title} ${i + 1}`}
              sizes={big ? '100vw' : '50vw'}
              className={`h-full w-full transition-transform duration-[1.2s] ease-fluid group-hover:scale-[1.03] ${
                drawing ? 'object-contain' : 'object-cover'
              }`}
            />
          </button>
        </Reveal>
      );
    })}
  </div>
);

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <h1 className="mb-6 font-serif text-4xl">Proyecto no encontrado</h1>
        <Link to="/proyectos" className="hover-target link-line eyebrow !text-sm">
          Volver a proyectos
        </Link>
      </div>
    );
  }

  const { prev, next } = getProjectNeighbors(project.slug);
  const number = String(projectsData.indexOf(project) + 1).padStart(2, '0');

  const open = (list) => (index) =>
    setLightbox({ isOpen: true, images: list.map(full), index });

  const facts = [
    { label: 'Tipología', value: project.category },
    project.location && { label: 'Ubicación', value: project.location },
    { label: 'Renders', value: project.renders.length },
    { label: 'Planos', value: project.blueprints.length },
  ].filter(Boolean);

  return (
    <div key={project.slug}>
      {/* ── Portada del proyecto ───────────────────────── */}
      <section className="relative h-[80svh] min-h-[480px] w-full overflow-hidden bg-black pt-16 text-white">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0"
        >
          <Img path={project.heroImage} alt={project.title} eager className="h-full w-full object-cover" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-14">
          <Link
            to="/proyectos"
            className="hover-target group mb-6 inline-flex min-h-11 items-center gap-2 eyebrow text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] hover:text-white"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> Proyectos
          </Link>
          <p className="eyebrow text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            {number} — {project.category}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.8rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-tight">
            <LineReveal animateOnMount delay={0.3} lines={[project.title]} />
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* ── Descripción ──────────────────────────────── */}
        <section className="grid gap-10 py-16 md:grid-cols-12 md:gap-16 md:py-24">
          <Reveal className="md:col-span-4">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 py-4">
                  <dt className="eyebrow text-muted">{f.label}</dt>
                  <dd className="text-right text-sm">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-8">
            <p className="font-serif text-2xl leading-snug md:text-3xl">{project.shortDesc}</p>
            <p className="mt-6 max-w-2xl leading-[1.85] text-fg/80">{project.longDesc}</p>
          </Reveal>
        </section>

        {/* ── Renders ──────────────────────────────────── */}
        <section className="pb-16 md:pb-24">
          <SectionTitle index="01" title="Renders" count={project.renders.length} />
          <Gallery images={project.renders} title="Render" onOpen={open(project.renders)} featureFirst />
        </section>

        {/* ── Planos ───────────────────────────────────── */}
        <section className="pb-16 md:pb-24">
          <SectionTitle index="02" title="Planos" count={project.blueprints.length} />
          <Gallery images={project.blueprints} title="Plano" onOpen={open(project.blueprints)} drawing />
        </section>

        {/* ── Concepto ─────────────────────────────────── */}
        <section className="pb-16 md:pb-24">
          <SectionTitle index="03" title="Concepto" count={project.concepts.length} />
          <Gallery images={project.concepts} title="Concepto" onOpen={open(project.concepts)} drawing />
        </section>
      </div>

      {/* ── Siguiente proyecto ─────────────────────────── */}
      <Link
        to={`/proyecto/${next.slug}`}
        data-cursor="ver"
        className="hover-target group relative block h-[55svh] min-h-[360px] overflow-hidden bg-black text-white"
      >
        <Img
          path={next.heroImage}
          alt={next.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-[1.4s] ease-fluid group-hover:scale-105 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-14">
          <p className="eyebrow text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">Siguiente proyecto</p>
          <p className="mt-3 flex items-baseline gap-4 font-serif text-[clamp(2.5rem,8vw,6.5rem)] font-medium leading-none tracking-tight">
            {next.title}
            <span className="text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">→</span>
          </p>
        </div>
      </Link>
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <Link
          to={`/proyecto/${prev.slug}`}
          className="hover-target group inline-flex min-h-11 items-center gap-2 eyebrow text-muted hover:text-fg"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> {prev.title}
        </Link>
      </div>

      <Lightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        currentIndex={lightbox.index}
        onPrev={() => setLightbox((s) => ({ ...s, index: (s.index - 1 + s.images.length) % s.images.length }))}
        onNext={() => setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }))}
        onClose={() => setLightbox((s) => ({ ...s, isOpen: false }))}
      />
    </div>
  );
};

export default ProjectDetail;
