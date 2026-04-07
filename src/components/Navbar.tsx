import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RELEASES = 'https://github.com/anishishotasff/CodeWhisper-Software/releases/latest';

const downloadOptions = [
  {
    icon: '🖥',
    label: 'Windows',
    sub: 'Windows 10 / 11 · 64-bit · .exe',
    href: RELEASES,
    color: '#0078d4',
  },
  {
    icon: '🍎',
    label: 'macOS',
    sub: 'Intel & Apple Silicon · .dmg',
    href: RELEASES,
    color: '#a855f7',
  },
  {
    icon: '🐧',
    label: 'Linux',
    sub: 'AppImage · 64-bit',
    href: RELEASES,
    color: '#f97316',
  },
];

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog', external: false },
  { label: 'FAQ', href: '#faq', external: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        background: scrolled ? 'rgba(10,10,15,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 4 }}>

        {/* Logo */}
        <motion.a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 16 }}
          whileHover={{ scale: 1.03 }}
        >
          <span style={{ fontSize: 22 }}>🪄</span>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
            Code<span className="gradient-text">Whisper</span>
          </span>
        </motion.a>

        {/* Nav links */}
        {navLinks.map(link => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            style={{
              color: 'rgba(241,245,249,0.6)',
              textDecoration: 'none',
              fontSize: 14, fontWeight: 500,
              padding: '6px 12px', borderRadius: 8,
            }}
            whileHover={{ color: '#f1f5f9', backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            {link.label}
          </motion.a>
        ))}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* GitHub profile link */}
        <motion.a
          href="https://github.com/anishishotasff"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: 'rgba(241,245,249,0.55)',
            textDecoration: 'none',
            fontSize: 13, fontWeight: 500,
            padding: '6px 12px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)',
            marginRight: 4,
          }}
          whileHover={{ color: '#f1f5f9', borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.04)' }}
          whileTap={{ scale: 0.96 }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </motion.a>

        {/* Download dropdown */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <motion.button
            onClick={() => setDropOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: '#fff', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 700,
              padding: '9px 18px', borderRadius: 10,
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
              fontFamily: 'inherit',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(124,58,237,0.6)' }}
            whileTap={{ scale: 0.96 }}
          >
            ⬇ Download
            <motion.span
              animate={{ rotate: dropOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: 10, display: 'inline-block' }}
            >
              ▼
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {dropOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: 'rgba(15,15,26,0.97)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  minWidth: 260,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.2)',
                  backdropFilter: 'blur(20px)',
                  zIndex: 200,
                }}
              >
                <div style={{
                  padding: '10px 16px 8px',
                  fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  color: 'rgba(241,245,249,0.3)',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  Choose your platform
                </div>

                {downloadOptions.map((opt, i) => (
                  <motion.a
                    key={opt.label}
                    href={opt.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setDropOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px',
                      textDecoration: 'none',
                      borderBottom: i < downloadOptions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}
                    whileHover={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: `${opt.color}18`,
                      border: `1px solid ${opt.color}35`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                    }}>
                      {opt.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: 'rgba(241,245,249,0.4)', marginTop: 1 }}>{opt.sub}</div>
                    </div>
                    <span style={{ fontSize: 14, color: opt.color }}>↓</span>
                  </motion.a>
                ))}

                <div style={{
                  padding: '8px 16px 10px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                }}>
                  <motion.a
                    href="https://github.com/anishishotasff/CodeWhisper-Software/releases"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 11, color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}
                    whileHover={{ color: '#c084fc' }}
                  >
                    All releases ↗
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
