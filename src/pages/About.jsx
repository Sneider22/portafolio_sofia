import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { Img } from '../components/Img';
import { Reveal, LineReveal } from '../components/Reveal';

const Block = ({ title, children, delay = 0 }) => (
  <Reveal delay={delay} className="border-t border-line pt-6">
    <h2 className="mb-5 eyebrow text-muted">{title}</h2>
    {children}
  </Reveal>
);

export const About = () => {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-5 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Foto */}
        <Reveal className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-surface md:sticky md:top-28">
            <Img
              path={profile.photo}
              alt={profile.name}
              eager
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-full w-full object-cover object-[60%_center]"
            />
          </div>
        </Reveal>

        {/* Texto */}
        <div className="md:col-span-7">
          <p className="eyebrow text-muted">Sobre mí</p>
          <h1 className="mt-4 font-serif text-6xl font-medium leading-[0.95] tracking-tight md:text-8xl">
            <LineReveal animateOnMount lines={['Sofía', <em key="s" className="italic text-accent">Sánchez</em>]} />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 font-serif text-2xl leading-snug md:text-3xl">
              Arquitecta en formación, apasionada por crear espacios atemporales y por el detalle.
            </p>
          </Reveal>

          <div className="mt-14 space-y-12">
            <Block title="Perfil profesional">
              <div className="max-w-2xl space-y-4 leading-relaxed text-fg/80">
                <p>
                  Estudiante de último semestre de Arquitectura en la Universidad Santa María, sede
                  La Florencia, con fuerte interés en el desarrollo técnico de proyectos y la
                  metodología BIM.
                </p>
                <p>
                  Durante mi etapa académica he desarrollado una base sólida en el diseño de proyectos
                  residenciales, comerciales y recreativos, entre otros. Destaco por mi capacidad de
                  organización, el trabajo bajo presión y la atención al detalle en la documentación técnica.
                </p>
              </div>
            </Block>

            <Block title="Educación">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                <h3 className="font-serif text-2xl font-medium">Arquitectura · 10º semestre</h3>
                <span className="eyebrow text-muted">2021 — Presente</span>
              </div>
              <p className="mt-1 text-sm text-muted">Universidad Santa María, Caracas</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-fg/80">
                Desarrollo conceptual, modelado 3D BIM, renders y planimetría para proyectos
                residenciales y comerciales, integrando criterios de diseño sostenible y bienestar espacial.
              </p>
            </Block>

            <div className="grid gap-12 sm:grid-cols-2">
              <Block title="Software">
                <ul className="space-y-3">
                  {profile.software.map((s) => (
                    <li key={s} className="flex items-center justify-between border-b border-line pb-3">
                      <span>{s}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Idiomas" delay={0.1}>
                <ul className="space-y-3">
                  {profile.languages.map((l) => (
                    <li key={l.name} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                      <span>{l.name}</span>
                      <span className="text-sm text-muted">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            </div>

            <Reveal>
              <Link
                to="/contacto"
                className="hover-target inline-flex min-h-12 items-center gap-2 rounded-full bg-fg px-7 text-sm font-medium text-bg transition-colors hover:bg-accent"
              >
                Escríbeme <span>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
