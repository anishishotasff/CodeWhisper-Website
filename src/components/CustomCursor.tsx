import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Smooth spring follow
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  // Slower trailing glow
  const glowX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const glowY = useSpring(cursorY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest('a, button, [role="button"]');
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Hide default cursor via style tag */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trailing glow blob */}
      <motion.div
        style={{
          position: 'fixed',
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
          width: hovered ? 180 : 120,
          height: hovered ? 180 : 120,
          borderRadius: '50%',
          background: hovered
            ? 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.3s, height 0.3s, background 0.3s',
        }}
      />

      {/* Outer ring */}
      <motion.div
        animate={{
          width: clicked ? 20 : hovered ? 44 : 32,
          height: clicked ? 20 : hovered ? 44 : 32,
          borderColor: hovered ? 'rgba(168,85,247,0.9)' : 'rgba(124,58,237,0.6)',
          borderWidth: hovered ? 2 : 1.5,
          boxShadow: hovered ? '0 0 16px rgba(168,85,247,0.4)' : '0 0 8px rgba(124,58,237,0.2)',
        }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(124,58,237,0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          pointerEvents: 'none',
          zIndex: 10000,
          borderRadius: '50%',
          background: hovered ? '#c084fc' : '#a855f7',
          boxShadow: hovered ? '0 0 10px #a855f7' : '0 0 6px rgba(168,85,247,0.6)',
        }}
        animate={{
          width: clicked ? 3 : hovered ? 6 : 5,
          height: clicked ? 3 : hovered ? 6 : 5,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
