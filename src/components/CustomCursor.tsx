import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const posRef = useRef({ x: -200, y: -200 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const hover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!el.closest('a, button, [role="button"]'));
    };

    // Smooth follow via RAF — 0.35 = fast, snappy
    const loop = () => {
      setPos(prev => ({
        x: prev.x + (posRef.current.x - prev.x) * 0.35,
        y: prev.y + (posRef.current.y - prev.y) * 0.35,
      }));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', hover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', hover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  const scale = clicked ? 0.82 : hovered ? 1.18 : 1;

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        @keyframes rainbowRotate {
          0%   { filter: hue-rotate(0deg)   drop-shadow(0 0 6px rgba(255,100,0,0.9)); }
          25%  { filter: hue-rotate(90deg)  drop-shadow(0 0 8px rgba(0,255,100,0.9)); }
          50%  { filter: hue-rotate(180deg) drop-shadow(0 0 8px rgba(0,100,255,0.9)); }
          75%  { filter: hue-rotate(270deg) drop-shadow(0 0 8px rgba(200,0,255,0.9)); }
          100% { filter: hue-rotate(360deg) drop-shadow(0 0 6px rgba(255,100,0,0.9)); }
        }

        .rainbow-cursor {
          animation: rainbowRotate 1.6s linear infinite;
        }
      `}</style>

      {/* Trailing glow */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: hovered ? 160 : 100,
          height: hovered ? 160 : 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9997,
          transition: 'width 0.3s, height 0.3s',
        }}
      />

      {/* Rainbow cursor SVG */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(0, 0) scale(${scale})`,
          transition: 'transform 0.12s ease',
          transformOrigin: '0 0',
        }}
      >
        <svg
          className="rainbow-cursor"
          width="32"
          height="38"
          viewBox="0 0 32 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#ff0000" />
              <stop offset="16%"  stopColor="#ff8800" />
              <stop offset="33%"  stopColor="#ffff00" />
              <stop offset="50%"  stopColor="#00ff00" />
              <stop offset="66%"  stopColor="#0088ff" />
              <stop offset="83%"  stopColor="#8800ff" />
              <stop offset="100%" stopColor="#ff00ff" />
            </linearGradient>
          </defs>

          {/* Dark fill — cursor arrow shape */}
          <path
            d="M2 2 L2 30 L9 23 L14 34 L18 32 L13 21 L22 21 Z"
            fill="rgba(10,10,15,0.92)"
            stroke="url(#rainbowGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
