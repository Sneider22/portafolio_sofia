import React from 'react';
import { full, srcSet } from '../lib/images';

// Imagen que elige sola el tamaño adecuado según la pantalla
export const Img = ({ path, alt, sizes = '100vw', eager = false, className = '', style }) => (
  <img
    src={full(path)}
    srcSet={srcSet(path)}
    sizes={sizes}
    alt={alt}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    className={className}
    style={style}
  />
);

export default Img;
