import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseGradient() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);

  const smoothX = useSpring(x, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set((e.clientX / window.innerWidth) * 100);
      y.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background: `radial-gradient(ellipse 600px 500px at ${smoothX.get()}% ${smoothY.get()}%, rgba(124,58,237,0.07) 0%, transparent 70%)`,
      }}
      // Re-render on spring change
      animate={{}}
    >
      {/* We use a canvas-free approach with inline style update */}
      <FollowGradient smoothX={smoothX} smoothY={smoothY} />
    </motion.div>
  );
}

function FollowGradient({ smoothX, smoothY }: { smoothX: any; smoothY: any }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = smoothX.on('change', update);
    const unsub2 = smoothY.on('change', update);

    function update() {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(ellipse 700px 600px at ${smoothX.get()}% ${smoothY.get()}%, rgba(124,58,237,0.08) 0%, rgba(6,182,212,0.03) 40%, transparent 70%)`;
      }
    }

    return () => { unsub(); unsub2(); };
  }, [smoothX, smoothY]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 700px 600px at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)',
      }}
    />
  );
}
