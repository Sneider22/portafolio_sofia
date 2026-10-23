import React from 'react';
import { motion } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1];

// Aparece suavemente (sube y se hace visible) cuando entra en pantalla
export const Reveal = ({ children, delay = 0, y = 28, className = '', as = 'div' }) => {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Component>
  );
};

const lineVariants = {
  hidden: { y: '105%' },
  visible: (i) => ({ y: 0, transition: { duration: 1.1, delay: i, ease: EASE } }),
};

// Texto que sube desde detrás de una "máscara", línea por línea.
// Se observa el contenedor y no el texto: el texto empieza oculto por la máscara y,
// si ocupa dos renglones (en el teléfono), el navegador nunca lo detectaría en pantalla.
export const LineReveal = ({ lines, className = '', delay = 0, animateOnMount = false }) => {
  const props = animateOnMount
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, margin: '-40px' } };
  return (
    <motion.span initial="hidden" {...props} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span variants={lineVariants} custom={delay + i * 0.12} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default Reveal;
