import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { profile } from '../data/profile';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { ProjectRow } from '../components/ProjectRow';
import { Img } from '../components/Img';
import { Reveal, LineReveal } from '../components/Reveal';

// Del boceto al render: muestra su proceso con un mismo proyecto
const PROCESS = [
  {
    label: 'Concepto',
    text: 'Volúmenes, recorridos, vientos y luz: la idea que organiza todo.',
    path: '/assets/mercado/concepto',
    contain: true,
  },
  {
    label: 'Planta',
    text: 'La idea se vuelve espacio medible: circulaciones, usos y estructura.',
    path: '/assets/mercado/plano1',
    contain: true,
  },
  {
    label: 'Render',
    text: 'El proyecto terminado, con su materialidad y su relación con la ciudad.',
    path: '/assets/mercado/render1',
  },
];

const SectionLabel = ({ children }) => (
  <p className="flex items-center gap-3 eyebrow text-muted">
    <span className="h-[2px] w-10 bg-accent" />
    {children}
  </p>
);

export const Home = () => {
  return (
    <div>
      <HeroSlideshow />

      {/* ── Presentación ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <Reveal>
          <SectionLabel>Sobre mi trabajo</SectionLabel>
        </Reveal>
        <h2 className="mt-8 max-w-5xl font-serif text-[clamp(2rem,5.2vw,4.25rem)] font-normal leading-[1.1] tracking-tight">
          <LineReveal
            lines={[
              <>Diseño espacios <em className="italic text-accent">públicos</em> pensados</>,
              <>para las personas que los recorren:</>,
              <>terminales, mercados y lugares de encuentro.</>,
            ]}
          />
        </h2>

        <div className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 md:mt-20">
          {[
            { value: String(projectsData.length).padStart(2, '0'), label: 'Proyectos en este portafolio' },
            { value: '10º', label: 'Semestre de Arquitectura, Universidad Santa María' },
            { value: 'BIM', label: profile.software.join(' · ') },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <p className="font-serif text-5xl md:text-6xl">{item.value}</p>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Proyectos ──────────────────────────────────── */}
      <section id="proyectos" className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-32">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
          <div>
            <Reveal><SectionLabel>Proyectos</SectionLabel></Reveal>
            <h2 className="mt-4 font-serif text-5xl font-medium tracking-tight md:text-7xl">
              <LineReveal lines={[<>Obras <em className="italic">selectas</em></>]} />
            </h2>
          </div>
          <Link
            to="/proyectos"
            className="hover-target group hidden min-h-11 items-center gap-2 text-sm font-medium sm:inline-flex"
          >
            <span className="link-line">Ver todos</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="space-y-24 md:space-y-40">
          {projectsData.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── Proceso ────────────────────────────────────── */}
      <section className="bg-surface py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal><SectionLabel>Proceso</SectionLabel></Reveal>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
              <LineReveal lines={['Del boceto', <em key="r" className="italic">al render</em>]} />
            </h2>
            <Reveal delay={0.2}>
              <p className="max-w-sm leading-relaxed text-muted">
                Así evolucionó el Mercado Municipal, desde la primera idea hasta la imagen final.
              </p>
            </Reveal>
          </div>
        </div>

        {/* En el teléfono se desliza de lado; en escritorio son tres columnas */}
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-auto md:mt-16 md:grid md:max-w-7xl md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8">
          {PROCESS.map((step, i) => (
            <Reveal key={step.label} delay={i * 0.12} className="w-[82%] shrink-0 snap-center md:w-auto">
              <Link to="/proyecto/mercado-municipal" className="hover-target group block">
                <div className={`aspect-[4/5] overflow-hidden ${step.contain ? 'bg-white p-4' : 'bg-bg'}`}>
                  <Img
                    path={step.path}
                    alt={`${step.label} del Mercado Municipal`}
                    sizes="(min-width: 768px) 33vw, 82vw"
                    className={`h-full w-full transition-transform duration-[1.2s] ease-fluid group-hover:scale-105 ${step.contain ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="font-serif text-4xl italic text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-medium">{step.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
          {/* Espacio al final para que la última tarjeta no quede pegada al borde */}
          <div className="w-1 shrink-0 md:hidden" />
        </div>
      </section>

      {/* ── Sobre mí ───────────────────────────────────── */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-12 md:gap-16 md:px-8 md:py-32">
        <Reveal className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-surface">
            <Img
              path={profile.photo}
              alt={profile.name}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-full w-full object-cover object-[60%_center]"
            />
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal><SectionLabel>Sobre mí</SectionLabel></Reveal>
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
            <LineReveal lines={['Hola, soy Sofía.', <em key="a" className="italic text-accent">Arquitecta en formación.</em>]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg/80">
              Estudio el último semestre de Arquitectura en la Universidad Santa María, en Caracas.
              Me interesan el desarrollo técnico de los proyectos y la metodología BIM, y disfruto
              llevar una idea desde el primer boceto hasta los planos y el render final.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {profile.software.map((s) => (
                <span key={s} className="rounded-full border border-line px-4 py-2 text-sm">{s}</span>
              ))}
            </div>
            <Link
              to="/sobre-mi"
              className="hover-target group mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium"
            >
              <span className="link-line">Conoce más sobre mí</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Contacto ───────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-32">
          <Reveal><p className="eyebrow text-muted">Contacto</p></Reveal>
          <h2 className="mt-6 font-serif text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-tight">
            <LineReveal lines={['Iniciemos un', <em key="d" className="italic text-accent">diálogo.</em>]} />
          </h2>
          <Reveal delay={0.2}>
            <a
              href={`mailto:${profile.email}`}
              className="hover-target link-line mt-10 inline-block break-all text-lg sm:text-2xl"
            >
              {profile.email}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
