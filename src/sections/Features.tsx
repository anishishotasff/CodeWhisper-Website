import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: '🤖',
    title: 'AI Chat Assistant',
    desc: 'Ask anything about your code in plain English. Get precise, context-aware answers powered by GPT-4 or local Ollama.',
    color: '#a855f7',
    tag: 'AI Powered',
  },
  {
    icon: '🔧',
    title: 'Auto-Fix Errors',
    desc: 'AI detects bugs, syntax errors, and logic issues — then fixes them automatically. One click to apply.',
    color: '#10b981',
    tag: 'Auto',
  },
  {
    icon: '🗺',
    title: 'Project Map',
    desc: 'Visual D3 dependency graph showing how every file connects. Click any node to open the file.',
    color: '#06b6d4',
    tag: 'Visual',
  },
  {
    icon: '🐛',
    title: 'Bug Risk Detector',
    desc: 'Static + AI-powered analysis. Detects unused variables, infinite loops, missing error handling, and more.',
    color: '#f59e0b',
    tag: 'Analysis',
  },
  {
    icon: '👁',
    title: 'Live Preview',
    desc: 'Real-time rendering for HTML, CSS, Markdown, JSON, and SVG. Updates as you type.',
    color: '#ec4899',
    tag: 'Live',
  },
  {
    icon: '🔒',
    title: 'Local / Private Mode',
    desc: 'Run AI 100% offline with Ollama. Your code never leaves your machine. Zero data sent anywhere.',
    color: '#10b981',
    tag: 'Privacy',
  },
  {
    icon: '✏️',
    title: 'Built-in Editor',
    desc: 'Edit files directly with syntax highlighting, auto-indent, Tab support, and Ctrl+S to save.',
    color: '#a855f7',
    tag: 'Editor',
  },
  {
    icon: '🧠',
    title: 'Intelligence Panel',
    desc: 'Explain Flow, Impact Analysis, Code Improve, Quality Score, and Semantic Search — all in one panel.',
    color: '#06b6d4',
    tag: 'Smart',
  },
  {
    icon: '📝',
    title: 'Smart Notepad',
    desc: 'Link notes to files, auto-save, and ask AI to explain your notes in the context of the code.',
    color: '#f59e0b',
    tag: 'Notes',
  },
];

export default function Features() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="features" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Section glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: 100, padding: '5px 16px',
            fontSize: 13, color: '#a855f7', fontWeight: 500, marginBottom: 16,
          }}>
            Everything you need
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 16 }}>
            Packed with <span className="gradient-text">powerful features</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(241,245,249,0.55)', maxWidth: 520, margin: '0 auto' }}>
            Everything a developer needs to understand, improve, and ship code faster.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4, boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${f.color}30` }}
              style={{
                background: 'rgba(15,15,26,0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '28px 28px',
                cursor: 'default',
                transition: 'box-shadow 0.3s',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top glow line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)`,
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {f.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>{f.title}</h3>
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
                      color: f.color, background: `${f.color}15`,
                      border: `1px solid ${f.color}30`,
                      borderRadius: 4, padding: '2px 6px',
                    }}>{f.tag}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.55)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
