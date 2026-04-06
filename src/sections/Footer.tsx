import React from 'react';
import { motion } from 'framer-motion';

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
              <span style={{ fontSize: 22 }}>🪄</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>
                Code<span className="gradient-text">Whisper</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.4)', lineHeight: 1.6 }}>
              AI-powered coding assistant for developers who want to understand any codebase instantly.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
                Product
              </div>
              {['Features', 'How it works', 'Pricing', 'Download'].map(l => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <motion.a
                    href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ fontSize: 14, color: 'rgba(241,245,249,0.5)', textDecoration: 'none' }}
                    whileHover={{ color: '#f1f5f9' }}
                  >
                    {l}
                  </motion.a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
                Resources
              </div>
              {[
                { label: 'GitHub', href: 'https://github.com/anishishotasff/CodeWhisper-Software' },
                { label: 'Releases', href: 'https://github.com/anishishotasff/CodeWhisper-Software/releases' },
                { label: 'Issues', href: 'https://github.com/anishishotasff/CodeWhisper-Software/issues' },
                { label: 'Ollama', href: 'https://ollama.com' },
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
            © 2024 CodeWhisper. MIT License. Free & Open Source.
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
