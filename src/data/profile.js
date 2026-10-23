// Datos personales en un solo lugar
export const profile = {
  name: 'Sofía Sánchez',
  email: 'sofiavsh66@gmail.com',
  city: 'Caracas, Venezuela',
  photo: '/assets/perfil',

  // Pega aquí los enlaces reales. Los que queden vacíos no se muestran.
  socials: {
    Instagram: '',
    LinkedIn: '',
    Behance: '',
  },

  software: ['Revit', 'AutoCAD', 'SketchUp', 'Twinmotion', 'D5 Render'],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio alto (B2)' },
    { name: 'Portugués', level: 'Básico (A2)' },
  ],
}

export const activeSocials = Object.entries(profile.socials).filter(([, url]) => url)
