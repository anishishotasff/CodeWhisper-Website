import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    num: '01',
    icon: '📂',
    title: 'Open any project',
    desc: 'Click "Open Project" and select any folder on your computer. CodeWhisper reads the entire structure instantly.',
    color: '#a855f7',
  },
  {
    num: '02',
    icon: '🔍',
    title: 'Analyze & understand',
    desc: 'Click Analyze to get a full project summary — type detection, key files, folder structure, and dependencies.',
    color: '#06b6d4',
  },
  {
    num: '03',
    icon: '🤖',
    title: 'Ask AI anything',
    desc: 'Chat with the AI about your code. Ask "What does this file do?", "Find bugs", or "Explain this function".',
    color: '#10b981',
  },
  {
    num: '04',
    icon: '🔧',
    title: 'Fix & improve',
    desc: 'Let AI auto-fix bugs, improve code quality, and rewrite functions — with before/after comparison.',
    color: '#f59e0b',
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="how-it-works" style={{ padding: '120px 0', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.04) 50%, transparent)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 100, padding: '5px 16px',
            fontSize: 13, color: '#10b981', fontWeight: 500, marginBottom: 16,
          }}>
            Simple workflow
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 16 }}>
            Up and running in <span className="gradient-text">60 seconds</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(241,245,249,0.55)', maxWidth: 480, margin: '0 auto' }}>
            No setup, no config files, no learning curve. Just open and go.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute', top: 40, left: '12.5%', right: '12.5%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)',
            display: 'none',
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ textAlign: 'center', position: 'relative' }}
              >
                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                    style={{
                      position: 'absolute', top: 40, right: -12, width: 24,
                      color: 'rgba(255,255,255,0.2)', fontSize: 18,
                    }}
                  >
                    →
                  </motion.div>
                )}

                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: `0 0 40px ${step.color}50` }}
                  style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: `${step.color}15`,
                    border: `2px solid ${step.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32, margin: '0 auto 20px',
                    boxShadow: `0 0 20px ${step.color}20`,
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  {step.icon}
                </motion.div>

                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 2,
                  color: step.color, marginBottom: 8, fontFamily: 'JetBrains Mono, monospace',
                }}>
                  STEP {step.num}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#f1f5f9' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.5)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
