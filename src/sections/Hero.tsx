import React from 'react';
import { motion } from 'framer-motion';

const floatVariants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const codeLines = [
  { indent: 0, color: '#a855f7', text: 'import CodeWhisper from "magic";' },
  { indent: 0, color: '#94a3b8', text: '' },
  { indent: 0, color: '#06b6d4', text: 'const project = await CodeWhisper.open();' },
  { indent: 0, color: '#10b981', text: 'const insight = await project.understand();' },
  { indent: 0, color: '#f59e0b', text: 'const fixed = await project.autoFix();' },
  { indent: 0, color: '#94a3b8', text: '' },
  { indent: 0, color: '#a855f7', text: '// Your code, understood instantly ✨' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
      }}
    >
      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Animated grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', width: '100%' }}>

        {/* Left — Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(124,58,237,0.12)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 100, padding: '6px 16px',
              fontSize: 13, color: '#a855f7', fontWeight: 500,
              marginBottom: 24,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            Now available — Free Download
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 24 }}
          >
            Understand any<br />
            <span className="gradient-text">codebase instantly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontSize: 18, color: 'rgba(241,245,249,0.65)', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}
          >
            CodeWhisper is an AI-powered desktop app that helps developers
            explore, understand, and improve any codebase — in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <motion.a
              href="https://github.com/anishishotasff/CodeWhisper-Software/releases"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                color: '#fff', textDecoration: 'none',
                fontSize: 16, fontWeight: 700,
                padding: '14px 32px', borderRadius: 12,
                boxShadow: '0 0 40px rgba(124,58,237,0.5)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(124,58,237,0.7)' }}
              whileTap={{ scale: 0.97 }}
            >
              ⬇ Download for Free
            </motion.a>

            <motion.a
              href="https://github.com/anishishotasff/CodeWhisper-Software"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f1f5f9', textDecoration: 'none',
                fontSize: 16, fontWeight: 600,
                padding: '14px 28px', borderRadius: 12,
              }}
              whileHover={{ background: 'rgba(255,255,255,0.1)', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ⭐ Star on GitHub
            </motion.a>
          </motion.div>

          {/* Platform badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}
          >
            {['🖥 Windows', '🍎 macOS', '🐧 Linux', '🔒 Privacy First', '⚡ Free'].map(b => (
              <span key={b} style={{
                fontSize: 12, color: 'rgba(241,245,249,0.5)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6, padding: '4px 10px',
              }}>{b}</span>
            ))}
          </motion.div>
        </div>

        {/* Right — Floating code window */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          style={{ position: 'relative' }}
        >
          {/* Glow behind window */}
          <div style={{
            position: 'absolute', inset: -40,
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          {/* Code window */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              background: 'rgba(15,15,26,0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Window chrome */}
            <div style={{
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: 12, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>
                main.ts — CodeWhisper
              </span>
            </div>

            {/* Code */}
            <div style={{ padding: '20px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.8 }}>
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }}
                  style={{ color: line.color, paddingLeft: line.indent * 16 }}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ display: 'inline-block', width: 2, height: 16, background: '#a855f7', marginLeft: 2, verticalAlign: 'middle' }}
              />
            </div>
          </motion.div>

          {/* Floating badges */}
          {[
            { text: '🔧 Bug Fixed', color: '#10b981', top: '10%', right: '-8%', delay: 1.0 },
            { text: '🧠 AI Explained', color: '#a855f7', bottom: '15%', left: '-10%', delay: 1.2 },
            { text: '📊 Score: A+', color: '#06b6d4', top: '55%', right: '-12%', delay: 1.4 },
          ].map((badge) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: badge.delay, type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute',
                top: badge.top, bottom: badge.bottom,
                left: badge.left, right: badge.right,
                background: 'rgba(15,15,26,0.95)',
                border: `1px solid ${badge.color}40`,
                borderRadius: 10,
                padding: '8px 14px',
                fontSize: 12, fontWeight: 600,
                color: badge.color,
                boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 12px ${badge.color}30`,
                whiteSpace: 'nowrap',
              }}
            >
              {badge.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
