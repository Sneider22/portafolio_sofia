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

// Texto que sube desde detrás de una "máscara", línea por línea
export const LineReveal = ({ lines, className = '', delay = 0, animateOnMount = false }) => (
  <span className={className}>
    {lines.map((line, i) => {
      const props = animateOnMount
        ? { animate: { y: 0 } }
        : { whileInView: { y: 0 }, viewport: { once: true, margin: '-40px' } };
      return (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            initial={{ y: '105%' }}
            {...props}
            transition={{ duration: 1.1, delay: delay + i * 0.12, ease: EASE }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      );
    })}
  </span>
);

export default Reveal;
