import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Las imágenes entran desde el lado hacia el que se avanza, como en un carrusel de Instagram
const slide = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const navButton =
  'hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20';

export const Lightbox = ({ isOpen, images = [], currentIndex = 0, onPrev, onNext, onClose }) => {
  const [direction, setDirection] = useState(0);
  const multiple = images.length > 1;

  const prev = () => {
    setDirection(-1);
    onPrev();
  };
  const next = () => {
    setDirection(1);
    onNext();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && multiple) prev();
      if (e.key === 'ArrowRight' && multiple) next();
    };

    // Evita que la página de fondo se desplace mientras el visor está abierto
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ backgroundColor: 'rgba(9, 9, 11, 0.97)' }}
          className="fixed inset-0 z-[100000] lightbox-overlay flex flex-col select-none"
        >
          {/* Contador y cerrar */}
          <div className="flex items-center justify-between px-5 pt-5 md:px-8 md:pt-6">
            <div className="text-[11px] font-mono tracking-widest text-zinc-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          {/* Marco fijo: todas las imágenes ocupan el mismo espacio, sin importar su tamaño original */}
          <div className="relative flex-1 overflow-hidden my-4 md:my-6">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={currentImage}
                alt={`Imagen ${currentIndex + 1}`}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25 } }}
                drag={multiple ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 80 || info.velocity.x > 500) prev();
                  else if (info.offset.x < -80 || info.velocity.x < -500) next();
                }}
                onClick={(e) => e.stopPropagation()}
                draggable={false}
                className="absolute inset-0 m-auto w-full h-full px-4 md:px-24 object-contain touch-pan-y cursor-grab active:cursor-grabbing"
              />
            </AnimatePresence>

            {multiple && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className={`${navButton} left-6`}
                  aria-label="Anterior"
                >
                  <ChevronLeft size={22} strokeWidth={1.75} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className={`${navButton} right-6`}
                  aria-label="Siguiente"
                >
                  <ChevronRight size={22} strokeWidth={1.75} />
                </button>
              </>
            )}
          </div>

          {/* Puntos de posición */}
          {multiple && (
            <div className="flex justify-center gap-1.5 pb-6 md:pb-8">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
