// Las imágenes viven en public/assets como WebP, en dos tamaños:
//   <ruta>.webp     -> grande (2400px), para el visor y pantallas grandes
//   <ruta>-sm.webp  -> miniatura (1000px), para teléfonos y tarjetas
// Se generan con `npm run imagenes` a partir de assets-originales/.

export const full = (path) => `${path}.webp`
export const small = (path) => `${path}-sm.webp`
export const srcSet = (path) => `${small(path)} 1000w, ${full(path)} 2400w`
