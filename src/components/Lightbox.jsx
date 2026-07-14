import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const Lightbox = ({ isOpen, images = [], currentIndex = 0, onPrev, onNext, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onPrev, onNext, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{ backgroundColor: 'rgba(9, 9, 11, 0.98)' }}
          className="fixed inset-0 z-[100000] lightbox-overlay flex items-center justify-center p-4 hover-target cursor-zoom-out select-none"
        >
          {/* Top Panel (Counter & Close) */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
            {/* Monospace Counter */}
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase select-none">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="pointer-events-auto text-[10px] font-mono tracking-widest uppercase bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 transition-colors rounded-full"
              aria-label="Cerrar"
            >
              Cerrar [ESC]
            </button>
          </div>

          {/* Left Arrow Button (Only if multiple images) */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="pointer-events-auto absolute left-6 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-lg transition-colors z-20"
              aria-label="Anterior"
            >
              ←
            </button>
          )}

          {/* Right Arrow Button (Only if multiple images) */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="pointer-events-auto absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-lg transition-colors z-20"
              aria-label="Siguiente"
            >
              →
            </button>
          )}

          {/* Image Display */}
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl h-full flex items-center justify-center pointer-events-none"
          >
            <img
              src={currentImage}
              alt={`Imagen ${currentIndex + 1}`}
              className="max-w-[85%] max-h-[82vh] md:max-w-[80%] md:max-h-[80vh] object-contain pointer-events-auto shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
