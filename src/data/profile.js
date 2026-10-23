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
  // Color de marca de cada programa (se ve al tocar su etiqueta)
  softwareColors: {
    Revit: '#186BFF',
    AutoCAD: '#E51050',
    SketchUp: '#D52B1E',
    Twinmotion: '#00A0DF',
    'D5 Render': '#7B5CFF',
  },
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio alto (B2)' },
    { name: 'Portugués', level: 'Básico (A2)' },
  ],
}

export const activeSocials = Object.entries(profile.socials).filter(([, url]) => url)
