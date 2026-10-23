import React from 'react';
import { profile, activeSocials } from '../data/profile';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 eyebrow text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${profile.email}`} className="hover-target link-line normal-case tracking-normal">{profile.email}</a>
          {activeSocials.map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="hover-target link-line">{name}</a>
          ))}
        </div>
        <p className="opacity-70">Luz · Materia · Entorno</p>
      </div>
    </footer>
  );
};
export default Footer;
