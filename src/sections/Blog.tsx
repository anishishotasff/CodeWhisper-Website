import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const GITHUB = 'https://github.com/anishishotasff';
const PORTFOLIO = 'http://anishishotasf.vercel.app/';

const story = [
  {
    icon: '💡',
    title: 'The Problem',
    text: 'Every developer knows the pain — you open an unfamiliar codebase and spend hours just trying to understand what it does. Reading file by file, tracing functions, guessing logic. It kills momentum.',
  },
  {
    icon: '🪄',
    title: 'The Idea',
    text: 'What if your editor could just explain things to you? Not just autocomplete — but actually understand your project, answer your questions, detect bugs, and help you move faster.',
  },
  {
    icon: '🚀',
    title: 'What We Built',
    text: 'CodeWhisper is a free desktop app that brings AI directly into your workflow. Open any project, ask anything, fix bugs automatically, and visualize your codebase — all offline if you want.',
  },
];

export default function Blog() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="blog" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)',
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
            About CodeWhisper
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 900, letterSpacing: '-2px', marginBottom: 16,
          }}>
            The Story Behind <span className="gradient-text">CodeWhisper</span>
          </h2>
          <p style={{
            fontSize: 18, color: 'rgba(241,245,249,0.55)',
            maxWidth: 560, margin: '0 auto',
          }}>
            Built by a developer, for developers. Here's why CodeWhisper exists.
          </p>
        </motion.div>

        {/* Story cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          marginBottom: 80,
        }}>
          {story.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                background: 'rgba(15,15,26,0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '32px 28px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>
                {s.title}
              </div>
              <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.55)', lineHeight: 1.7, margin: 0 }}>
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* What makes it different */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            background: 'rgba(15,15,26,0.6)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            padding: '48px',
            marginBottom: 80,
            backdropFilter: 'blur(12px)',
          }}
        >
          <h3 style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', marginBottom: 24, letterSpacing: '-0.5px' }}>
            What makes CodeWhisper different?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: '🔒', title: 'Privacy first', desc: 'Run fully offline with Ollama. Your code never leaves your machine.' },
              { icon: '🆓', title: 'Free forever', desc: 'No subscriptions, no paywalls. Download and use it for free.' },
              { icon: '⚡', title: 'Instant answers', desc: 'Ask anything about your codebase and get answers in seconds.' },
              { icon: '🐛', title: 'Auto bug fix', desc: 'Detects and fixes errors automatically — not just highlights them.' },
              { icon: '🗺', title: 'Visual map', desc: 'See your entire project as an interactive graph of files and functions.' },
              { icon: '💻', title: 'Cross-platform', desc: 'Works on Windows, macOS, and Linux. One app, everywhere.' },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(241,245,249,0.5)', lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05))',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 24,
            padding: '48px',
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 96, height: 96, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40,
            boxShadow: '0 0 40px rgba(124,58,237,0.4)',
          }}>
            👨‍💻
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 1,
              color: '#a855f7', textTransform: 'uppercase', marginBottom: 8,
            }}>
              Founder & Developer
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px', marginBottom: 8 }}>
              Anish Debnath
            </div>
            <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.55)', lineHeight: 1.7, marginBottom: 20, maxWidth: 480 }}>
              Developer passionate about building tools that make coding faster and more intuitive.
              CodeWhisper started as a personal project to solve a real problem — and grew into something
              anyone can use for free.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <motion.a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 18px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#f1f5f9', textDecoration: 'none',
                  fontSize: 14, fontWeight: 600,
                }}
                whileHover={{ background: 'rgba(255,255,255,0.12)', scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
              <motion.a
                href={PORTFOLIO}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 18px', borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
                  border: '1px solid rgba(124,58,237,0.4)',
                  color: '#f1f5f9', textDecoration: 'none',
                  fontSize: 14, fontWeight: 600,
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                🌐 Portfolio
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
