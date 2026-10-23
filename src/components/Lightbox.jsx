import React, { useEffect, useRef, useState } from 'react';
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

const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Imagen que se amplía con dos dedos o doble toque, y se arrastra mientras está ampliada.
// Sin zoom, deslizar de lado pasa a la imagen anterior o siguiente.
const ZoomableImage = ({ src, alt, onSwipe }) => {
  const imgRef = useRef(null);
  const view = useRef({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const lastTap = useRef({ time: 0, x: 0, y: 0 });

  const render = (animate) => {
    const el = imgRef.current;
    if (!el) return;
    const { scale, x, y } = view.current;
    el.style.transition = animate ? 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    el.style.cursor = scale > 1 ? 'grab' : '';
  };

  // Centro de la caja de la imagen y cuánto se puede mover sin dejar ver el fondo
  const box = () => {
    const el = imgRef.current;
    const rect = el.parentElement.getBoundingClientRect();
    const w = el.clientWidth;
    const h = el.clientHeight;
    const ratio = Math.min(w / (el.naturalWidth || w), h / (el.naturalHeight || h));
    return {
      cx: rect.left + el.offsetLeft + w / 2,
      cy: rect.top + el.offsetTop + h / 2,
      w,
      h,
      contentW: (el.naturalWidth || w) * ratio,
      contentH: (el.naturalHeight || h) * ratio,
    };
  };

  const clampPan = (scale, x, y) => {
    const b = box();
    const maxX = Math.max(0, (b.contentW * scale - b.w) / 2);
    const maxY = Math.max(0, (b.contentH * scale - b.h) / 2);
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
  };

  // Lleva la imagen a una escala manteniendo fijo el punto (px, py) de la pantalla
  const zoomTo = (scale, px, py) => {
    const b = box();
    const v = view.current;
    const qx = (px - b.cx - v.x) / v.scale;
    const qy = (py - b.cy - v.y) / v.scale;
    view.current = { scale, ...clampPan(scale, px - b.cx - qx * scale, py - b.cy - qy * scale) };
    render(true);
  };

  const startGesture = () => {
    const pts = [...pointers.current.values()];
    const v = { ...view.current };
    if (pts.length >= 2) {
      const [a, b] = pts;
      const c = box();
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      gesture.current = {
        type: 'pinch',
        dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        scale: v.scale,
        qx: (mx - c.cx - v.x) / v.scale,
        qy: (my - c.cy - v.y) / v.scale,
        cx: c.cx,
        cy: c.cy,
      };
    } else if (pts.length === 1) {
      const p = pts[0];
      gesture.current = {
        type: v.scale > 1 ? 'pan' : 'swipe',
        startX: p.x,
        startY: p.y,
        x: v.x,
        y: v.y,
        moved: false,
        lastX: p.x,
        lastT: performance.now(),
        velocity: 0,
      };
    } else {
      gesture.current = null;
    }
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    startGesture();
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;

    if (g.type === 'pinch') {
      const [a, b] = [...pointers.current.values()];
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      // Se deja bajar un poco de 1 mientras se pellizca; al soltar vuelve a su tamaño
      const scale = clamp((g.scale * Math.hypot(a.x - b.x, a.y - b.y)) / g.dist, 0.8, MAX_SCALE);
      view.current = { scale, x: mx - g.cx - g.qx * scale, y: my - g.cy - g.qy * scale };
      render(false);
      return;
    }

    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (Math.hypot(dx, dy) > 6) g.moved = true;

    if (g.type === 'pan') {
      view.current = { ...view.current, ...clampPan(view.current.scale, g.x + dx, g.y + dy) };
      render(false);
    } else if (onSwipe) {
      const now = performance.now();
      g.velocity = ((e.clientX - g.lastX) / Math.max(1, now - g.lastT)) * 1000;
      g.lastX = e.clientX;
      g.lastT = now;
      view.current = { scale: 1, x: dx, y: 0 };
      render(false);
    }
  };

  const onPointerUp = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    const point = pointers.current.get(e.pointerId);
    pointers.current.delete(e.pointerId);
    const g = gesture.current;

    if (pointers.current.size > 0) {
      // Queda un dedo tras pellizcar: sigue arrastrando desde ahí
      if (view.current.scale < 1) view.current = { scale: 1, x: 0, y: 0 };
      startGesture();
      return;
    }
    gesture.current = null;
    if (!g) return;

    if (g.type === 'pinch') {
      const scale = view.current.scale < 1.05 ? 1 : view.current.scale;
      view.current = { scale, ...clampPan(scale, view.current.x, view.current.y) };
      render(true);
      return;
    }

    if (g.type === 'swipe' && g.moved && onSwipe) {
      const dx = point.x - g.startX;
      if (dx > 80 || g.velocity > 500) return onSwipe(-1);
      if (dx < -80 || g.velocity < -500) return onSwipe(1);
      view.current = { scale: 1, x: 0, y: 0 };
      render(true);
      return;
    }

    if (!g.moved) {
      const now = performance.now();
      const t = lastTap.current;
      const isDouble = now - t.time < 300 && Math.hypot(point.x - t.x, point.y - t.y) < 30;
      lastTap.current = isDouble ? { time: 0, x: 0, y: 0 } : { time: now, x: point.x, y: point.y };
      if (isDouble) {
        if (view.current.scale > 1) {
          view.current = { scale: 1, x: 0, y: 0 };
          render(true);
        } else {
          zoomTo(DOUBLE_TAP_SCALE, point.x, point.y);
        }
      }
    }
  };

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      draggable={false}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(e) => e.stopPropagation()}
      style={{ touchAction: 'none', willChange: 'transform' }}
      className="w-full h-full object-contain"
    />
  );
};

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
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25 } }}
                className="absolute inset-0 px-4 md:px-24"
              >
                <ZoomableImage
                  src={currentImage}
                  alt={`Imagen ${currentIndex + 1}`}
                  onSwipe={multiple ? (dir) => (dir > 0 ? next() : prev()) : undefined}
                />
              </motion.div>
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
