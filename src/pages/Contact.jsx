import React, { useState } from 'react';
import { profile, activeSocials } from '../data/profile';
import { Reveal, LineReveal } from '../components/Reveal';

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-32 md:px-8">
      <p className="eyebrow text-muted">Contacto</p>
      <h1 className="mt-6 font-serif text-[clamp(3.5rem,11vw,9rem)] font-medium leading-[0.92] tracking-tight">
        <LineReveal animateOnMount lines={['Iniciemos un', <em key="d" className="italic text-accent">diálogo.</em>]} />
      </h1>

      <Reveal delay={0.4} className="mt-12 border-y border-line py-10 md:mt-16">
        <a
          href={`mailto:${profile.email}`}
          className="hover-target link-line inline-block break-all font-serif text-3xl sm:text-5xl md:text-6xl"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${profile.email}`}
            className="hover-target inline-flex min-h-12 items-center justify-center rounded-full bg-fg px-7 text-sm font-medium text-bg transition-colors hover:bg-accent"
          >
            Enviar correo
          </a>
          <button
            onClick={copyEmail}
            className="hover-target inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 text-sm font-medium transition-colors hover:border-fg"
          >
            {copied ? 'Correo copiado ✓' : 'Copiar correo'}
          </button>
        </div>
      </Reveal>

      {activeSocials.length > 0 && (
        <Reveal delay={0.5} className="mt-10 flex flex-wrap gap-x-10 gap-y-2 eyebrow !text-sm text-muted">
          {activeSocials.map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="hover-target link-line py-2 hover:text-fg">
              {name}
            </a>
          ))}
        </Reveal>
      )}

      <Reveal delay={0.5}>
        <p className="mt-10 text-muted">{profile.city}</p>
      </Reveal>
    </div>
  );
};
export default Contact;
