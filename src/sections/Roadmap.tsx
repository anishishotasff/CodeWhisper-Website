import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const milestones = [
  {
    version: 'v1',
    label: 'Current',
    title: 'AI Coding Assistant',
    status: 'live',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    icon: '✅',
    items: [
      'Open any project folder',
      'AI chat (OpenAI + Ollama)',
      'Bug scanner & auto-fix',
      'Project map visualization',
      'Live file watcher',
      'Smart notepad',
      'Works on Windows, macOS, Linux',
    ],
  },
  {
    version: 'v2',
    label: 'Live',
    title: 'AI Project Builder',
    status: 'live',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    icon: '🔨',
    items: [
      'Generate full projects from a prompt',
      'Scaffold boilerplate instantly',
      'AI-suggested file structure',
      'Auto-generate components & routes',
      'Smart code templates',
    ],
  },
  {
    version: 'v3',
    label: 'Coming Soon',
    title: 'Auto Deployment',
    status: 'next',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    icon: '🚀',
    items: [
      'One-click deploy to Vercel / Netlify',
      'GitHub Actions auto-setup',
      'Environment variable management',
      'CI/CD pipeline generation',
      'Live preview URLs',
    ],
  },
  {
    version: 'v4',
    label: 'Coming Soon',
    title: 'Voice Coding',
    status: 'next',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.3)',
    icon: '🎙',
    items: [
      'Talk to your codebase',
      'Voice-to-code generation',
      'Hands-free navigation',
      'Audio explanations of code',
      'Voice-triggered bug fixes',
    ],
  },
  {
    version: 'v5',
    label: 'Coming Soon',
    title: 'Team Collaboration',
    status: 'next',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    icon: '👥',
    items: [
      'Real-time shared sessions',
      'AI code review for PRs',
      'Team knowledge base',
      'Shared project maps',
      'Collaborative AI chat',
    ],
  },
];

const statusStyle: Record<string, { bg: string; text: string; border: string }> = {
  live:    { bg: 'rgba(16,185,129,0.12)',  text: '#10b981', border: 'rgba(16,185,129,0.3)' },
  next:    { bg: 'rgba(124,58,237,0.12)',  text: '#a855f7', border: 'rgba(124,58,237,0.3)' },
  planned: { bg: 'rgba(6,182,212,0.12)',   text: '#06b6d4', border: 'rgba(6,182,212,0.3)'  },
  future:  { bg: 'rgba(255,255,255,0.05)', text: 'rgba(241,245,249,0.4)', border: 'rgba(255,255,255,0.1)' },
};

export default function Roadmap() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="roadmap" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Background */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: 100, padding: '5px 16px',
            fontSize: 13, color: '#a855f7', fontWeight: 500, marginBottom: 16,
          }}>
            Roadmap
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900, letterSpacing: '-2px', marginBottom: 16,
          }}>
            Future <span className="gradient-text">Vision</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(241,245,249,0.5)', maxWidth: 500, margin: '0 auto' }}>
            Where CodeWhisper is headed. We're just getting started.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.3) 10%, rgba(124,58,237,0.3) 90%, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            const s = statusStyle[m.status];

            return (
              <motion.div
                key={m.version}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  marginBottom: 40,
                  position: 'relative',
                }}
              >
                {/* Card */}
                <div style={{
                  width: 'calc(50% - 40px)',
                  background: 'rgba(15,15,26,0.7)',
                  border: `1px solid ${m.color}25`,
                  borderRadius: 20,
                  padding: '28px 28px',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Top accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
                    opacity: 0.6,
                  }} />

                  {/* Version badge + status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 800,
                      color: m.color,
                      background: `${m.color}15`,
                      border: `1px solid ${m.color}30`,
                      padding: '3px 12px', borderRadius: 100,
                    }}>
                      {m.version}
                    </div>
                    <div style={{
                      fontSize: 11, fontWeight: 700,
                      color: s.text,
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      padding: '3px 10px', borderRadius: 100,
                      letterSpacing: 0.5,
                    }}>
                      {m.label}
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
                      {m.title}
                    </span>
                  </div>

                  {/* Items */}
                  <div>
                    {m.items.map(item => (
                      <div key={item} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: 13, color: 'rgba(241,245,249,0.55)',
                        marginBottom: 7,
                      }}>
                        <span style={{ color: m.color, fontSize: 10, flexShrink: 0 }}>◆</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: 28,
                  transform: 'translateX(-50%)',
                  width: 16, height: 16,
                  borderRadius: '50%',
                  background: m.color,
                  boxShadow: `0 0 16px ${m.glow}`,
                  border: '3px solid rgba(10,10,15,1)',
                  zIndex: 2,
                }} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: 24 }}
        >
          <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.3)' }}>
            Have a feature idea?{' '}
            <motion.a
              href="https://github.com/anishishotasff/CodeWhisper-Software/issues"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}
              whileHover={{ color: '#c084fc' }}
            >
              Suggest it on GitHub ↗
            </motion.a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
