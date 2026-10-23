import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;

        // Smooth outline trailing effect
        outlineRef.current.animate(
          {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
          },
          { duration: 300, fill: 'forwards' }
        );
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;

      const customCursorElement = target.closest('[data-cursor]');
      if (customCursorElement) {
        setCursorText(customCursorElement.getAttribute('data-cursor'));
        setIsHovered(true);
        return;
      }

      setCursorText('');
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('hover-target') ||
        target.closest('.hover-target');

      if (isClickable) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot transition-transform duration-200 ${
          isHovered ? 'scale-[2.5]' : ''
        } ${isClicked ? 'scale-[0.8]' : ''} ${cursorText ? 'opacity-0 scale-0' : ''}`}
      />
      <div 
        ref={outlineRef} 
        className={`custom-cursor-outline flex items-center justify-center font-mono text-[8px] tracking-widest text-white uppercase transition-all duration-300 ${
          cursorText
            ? 'scale-[2.6] border-white bg-white/20'
            : isHovered 
              ? 'scale-[1.8] border-white bg-white/10' 
              : ''
        } ${isClicked ? 'scale-[0.9]' : ''}`}
      >
        {cursorText}
      </div>
    </>
  );
};
export default CustomCursor;
