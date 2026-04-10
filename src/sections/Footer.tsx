import React from 'react';
import { motion } from 'framer-motion';

import Logo from '../components/Logo';

const GITHUB_PROFILE = 'https://github.com/anishishotasff';
const PORTFOLIO = 'http://anishishotasf.vercel.app/';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '48px 0 32px',
      position: 'relative',
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Logo size={28} id="footer" />
              <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>
                Code<span className="gradient-text">Whisper</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.4)', lineHeight: 1.6, marginBottom: 20 }}>
              AI-powered coding assistant for developers who want to understand any codebase instantly.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(241,245,249,0.6)',
                  textDecoration: 'none', fontSize: 13, fontWeight: 500,
                }}
                whileHover={{ color: '#f1f5f9', background: 'rgba(255,255,255,0.1)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
              <motion.a
                href={PORTFOLIO}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  color: '#a855f7',
                  textDecoration: 'none', fontSize: 13, fontWeight: 500,
                }}
                whileHover={{ color: '#c084fc', background: 'rgba(124,58,237,0.2)' }}
              >
                🌐 Portfolio
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
                Product
              </div>
              {[
                { label: 'Features', href: '#features' },
                { label: 'How it works', href: '#how-it-works' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Download', href: '#download' },
                { label: 'Blog', href: '#blog' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Roadmap', href: '#roadmap' },
              ].map(l => (
                <div key={l.label} style={{ marginBottom: 10 }}>
                  <motion.a
                    href={l.href}
                    style={{ fontSize: 14, color: 'rgba(241,245,249,0.5)', textDecoration: 'none' }}
                    whileHover={{ color: '#f1f5f9' }}
                  >
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
                Developer
              </div>
              {[
                { label: 'GitHub Profile', href: GITHUB_PROFILE },
                { label: 'Portfolio', href: PORTFOLIO },
                { label: 'App Repo', href: 'https://github.com/anishishotasff/CodeWhisper-Software' },
                { label: 'Releases', href: 'https://github.com/anishishotasff/CodeWhisper-Software/releases' },
                { label: 'Report Issue', href: 'https://github.com/anishishotasff/CodeWhisper-Software/issues' },
              ].map(l => (
                <div key={l.label} style={{ marginBottom: 10 }}>
                  <motion.a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 14, color: 'rgba(241,245,249,0.5)', textDecoration: 'none' }}
                    whileHover={{ color: '#f1f5f9' }}
                  >
                    {l.label} ↗
                  </motion.a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: 13, color: 'rgba(241,245,249,0.3)' }}>
            © 2025 CodeWhisper · Built by{' '}
            <motion.a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#a855f7', textDecoration: 'none' }}
              whileHover={{ color: '#c084fc' }}
            >
              Anish Debnath
            </motion.a>
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['🖥 Windows', '🍎 macOS', '🐧 Linux'].map(p => (
              <span key={p} style={{ fontSize: 12, color: 'rgba(241,245,249,0.3)' }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
