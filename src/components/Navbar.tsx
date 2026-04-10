import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  { label: 'Roadmap', href: '#roadmap', external: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  // Need user.photoURL and user.displayName for avatar

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="28" height="28" style={{ flexShrink: 0 }}>
            <defs>
              <linearGradient id="navbg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb"/>
                <stop offset="50%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#7c3aed"/>
              </linearGradient>
            </defs>
            <rect x="8" y="8" width="72" height="52" rx="14" ry="14" fill="url(#navbg)"/>
            <path d="M28 60 L22 76 L42 64 Z" fill="url(#navbg)"/>
            <polyline points="28,28 20,34 28,40" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="40" y1="22" x2="48" y2="46" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <polyline points="60,28 68,34 60,40" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="86" cy="18" r="4" fill="#06b6d4" opacity="0.9"/>
            <circle cx="78" cy="10" r="3" fill="#3b82f6" opacity="0.8"/>
          </svg>
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

        {/* Auth buttons */}
        {user ? (
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/dashboard"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 12px 5px 5px', borderRadius: 100,
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.25)',
                textDecoration: 'none',
                marginRight: 4,
              }}
            >
              {/* Avatar */}
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: user.photoURL ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 900, color: '#fff',
                overflow: 'hidden', flexShrink: 0,
              }}>
                {user.photoURL
                  ? <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : (user.email || '?')[0].toUpperCase()
                }
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#a855f7' }}>
                {user.displayName?.split(' ')[0] || 'Profile'}
              </span>
            </Link>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', gap: 6, marginRight: 4 }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                style={{
                  padding: '7px 14px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(241,245,249,0.7)', textDecoration: 'none',
                  fontSize: 13, fontWeight: 500,
                }}
              >
                Sign in
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                style={{
                  padding: '7px 14px', borderRadius: 8,
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#a855f7', textDecoration: 'none',
                  fontSize: 13, fontWeight: 600,
                }}
              >
                Sign up free
              </Link>
            </motion.div>
          </div>
        )}

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
