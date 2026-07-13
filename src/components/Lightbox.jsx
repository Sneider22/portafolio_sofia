import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const Lightbox = ({ isOpen, imageSrc, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-zinc-950/95 flex items-center justify-center p-4 hover-target cursor-zoom-out"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-xs tracking-widest font-mono uppercase bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 transition-colors rounded-full"
            aria-label="Cerrar"
          >
            Cerrar [ESC]
          </button>

          {/* Image */}
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            src={imageSrc}
            alt="Vista de Lightbox"
            className="max-w-full max-h-[90vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Lightbox;
