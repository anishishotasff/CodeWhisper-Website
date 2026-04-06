import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const GITHUB_BASE = 'https://github.com/anishishotasff/CodeWhisper-Software/releases/latest/download';

const platforms = [
  {
    id: 'windows',
    icon: '🖥',
    name: 'Windows',
    version: 'Windows 10 / 11',
    arch: '64-bit',
    file: 'CodeWhisper Setup 1.0.1.exe',
    size: '~85 MB',
    color: '#0078d4',
    glow: 'rgba(0,120,212,0.35)',
    badge: 'Most Popular',
    badgeColor: '#0078d4',
    extras: [
      { label: 'Portable (.exe)', href: `${GITHUB_BASE}/CodeWhisper%201.0.1.exe` },
    ],
    features: ['One-click installer', 'Start menu shortcut', 'Windows 10 & 11', '64-bit'],
  },
  {
    id: 'mac',
    icon: '🍎',
    name: 'macOS',
    version: 'macOS 11+',
    arch: 'Intel & Apple Silicon',
    file: 'CodeWhisper-1.0.1.dmg',
    size: '~90 MB',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.35)',
    badge: 'Universal',
    badgeColor: '#a855f7',
    extras: [
      { label: 'View all releases ↗', href: 'https://github.com/anishishotasff/CodeWhisper-Software/releases' },
    ],
    features: ['Universal binary', 'Intel + Apple Silicon', 'macOS 11 Big Sur+', 'Dark mode native'],
  },
];

export default function Download() {
  const [ref, inView] = useInView(0.1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="download"
      style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900, height: 500,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: 100, padding: '5px 16px',
            fontSize: 13, color: '#a855f7', fontWeight: 500, marginBottom: 16,
          }}>
            Free Download
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 900, letterSpacing: '-2px', marginBottom: 16,
          }}>
            Download <span className="gradient-text">CodeWhisper</span>
          </h2>
          <p style={{
            fontSize: 18, color: 'rgba(241,245,249,0.55)',
            maxWidth: 480, margin: '0 auto',
          }}>
            Free forever. No account required. Works on Windows and macOS.
          </p>
        </motion.div>

        {/* Download cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 28,
          maxWidth: 860,
          margin: '0 auto 48px',
        }}>
          {platforms.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              onHoverStart={() => setHoveredId(p.id)}
              onHoverEnd={() => setHoveredId(null)}
              style={{
                background: 'rgba(15,15,26,0.7)',
                border: `1px solid ${hoveredId === p.id ? p.color + '60' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 20,
                padding: '36px 32px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                opacity: hoveredId === p.id ? 1 : 0.4,
                transition: 'opacity 0.3s',
              }} />

              {/* Glow on hover */}
              <motion.div
                animate={{ opacity: hoveredId === p.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 50% 0%, ${p.glow} 0%, transparent 60%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Badge */}
              <div style={{
                position: 'absolute', top: 20, right: 20,
                background: `${p.badgeColor}20`,
                border: `1px solid ${p.badgeColor}40`,
                color: p.badgeColor,
                fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                padding: '3px 10px', borderRadius: 100,
              }}>
                {p.badge}
              </div>

              {/* Platform icon + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 30,
                  boxShadow: `0 0 20px ${p.color}20`,
                }}>
                  {p.icon}
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(241,245,249,0.45)', marginTop: 2 }}>
                    {p.version} · {p.arch}
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div style={{ marginBottom: 28 }}>
                {p.features.map(f => (
                  <div key={f} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 13, color: 'rgba(241,245,249,0.6)',
                    marginBottom: 8,
                  }}>
                    <span style={{ color: '#10b981', fontSize: 12 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              {/* File info */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 20,
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{ fontSize: 16 }}>📦</span>
                <span style={{ fontSize: 12, color: 'rgba(241,245,249,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {p.file}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(241,245,249,0.3)' }}>
                  {p.size}
                </span>
              </div>

              {/* Main download button */}
              <motion.a
                href={p.id === 'windows'
                ? `${GITHUB_BASE}/CodeWhisper%20Setup%201.0.1.exe`
                : `${GITHUB_BASE}/CodeWhisper-1.0.1.dmg`
              }
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  width: '100%', padding: '14px 24px',
                  borderRadius: 12, textDecoration: 'none',
                  fontSize: 15, fontWeight: 700, color: '#fff',
                  background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                  boxShadow: `0 0 30px ${p.glow}`,
                  marginBottom: 12,
                }}
                whileHover={{ scale: 1.03, boxShadow: `0 0 50px ${p.glow}` }}
                whileTap={{ scale: 0.97 }}
              >
                <span style={{ fontSize: 18 }}>⬇</span>
                Download for {p.name}
              </motion.a>

              {/* Extra download options */}
              {p.extras.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.extras.map(e => (
                    <motion.a
                      key={e.label}
                      href={e.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1, textAlign: 'center',
                        padding: '8px 12px', borderRadius: 8,
                        fontSize: 12, fontWeight: 500,
                        color: 'rgba(241,245,249,0.55)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                      whileHover={{ color: '#f1f5f9', background: 'rgba(255,255,255,0.08)' }}
                    >
                      {e.label}
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Linux + bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '12px 24px',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 20 }}>🐧</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Linux</div>
              <div style={{ fontSize: 12, color: 'rgba(241,245,249,0.45)' }}>AppImage · .deb · .rpm</div>
            </div>
            <motion.a
              href="https://github.com/anishishotasff/CodeWhisper-Software/releases"
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '7px 16px', borderRadius: 8,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f1f5f9', textDecoration: 'none',
                fontSize: 13, fontWeight: 600,
              }}
              whileHover={{ background: 'rgba(255,255,255,0.14)' }}
            >
              View Releases ↗
            </motion.a>
          </div>

          <div style={{ fontSize: 13, color: 'rgba(241,245,249,0.3)' }}>
            🔓 Free & Open Source · MIT License ·{' '}
            <a
              href="https://github.com/anishishotasff/CodeWhisper-Software"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#a855f7', textDecoration: 'none' }}
            >
              View source on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
