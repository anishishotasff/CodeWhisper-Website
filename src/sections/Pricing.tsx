import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Everything you need to get started.',
    color: '#06b6d4',
    features: [
      '✅ Open unlimited projects',
      '✅ Built-in code editor',
      '✅ Live file watcher',
      '✅ Project Map (D3 graph)',
      '✅ Bug Risk Detector (static)',
      '✅ Live Preview',
      '✅ Smart Notepad',
      '✅ Windows, Mac & Linux',
    ],
    cta: 'Download Free',
    href: 'https://github.com/anishishotasff/CodeWhisper-Software/releases',
    highlight: false,
  },
  {
    name: 'AI Powered',
    price: 'Your Key',
    period: 'OpenAI or Ollama',
    desc: 'Unlock all AI features with your own API key.',
    color: '#a855f7',
    features: [
      '✅ Everything in Free',
      '✅ AI Chat Assistant',
      '✅ Auto-Fix Errors',
      '✅ AI Deep Bug Scan',
      '✅ Intelligence Panel',
      '✅ Smart Action Popup',
      '✅ Code Improve & Rewrite',
      '✅ Semantic Search',
      '🔒 Local AI (Ollama) — FREE',
    ],
    cta: 'Download & Add Key',
    href: 'https://github.com/anishishotasff/CodeWhisper-Software/releases',
    highlight: true,
  },
];

export default function Pricing() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="pricing" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: 100, padding: '5px 16px',
            fontSize: 13, color: '#a855f7', fontWeight: 500, marginBottom: 16,
          }}>
            Simple pricing
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 16 }}>
            Free forever. <span className="gradient-text">No tricks.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(241,245,249,0.55)', maxWidth: 480, margin: '0 auto' }}>
            CodeWhisper is free and open source. AI features use your own API key — you pay OpenAI directly, or run Ollama locally for free.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))'
                  : 'rgba(15,15,26,0.6)',
                border: plan.highlight
                  ? '1px solid rgba(124,58,237,0.4)'
                  : '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '36px 32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                }} />
              )}
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '3px 10px', borderRadius: 100,
                }}>
                  RECOMMENDED
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: plan.color, marginBottom: 8 }}>{plan.name}</div>
                <div style={{ fontSize: 40, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1 }}>
                  {plan.price}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(241,245,249,0.4)', marginTop: 4 }}>{plan.period}</div>
                <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.55)', marginTop: 12 }}>{plan.desc}</p>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'rgba(241,245,249,0.75)', lineHeight: 1.4 }}>{f}</li>
                ))}
              </ul>

              <motion.a
                href={plan.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block', textAlign: 'center', textDecoration: 'none',
                  padding: '13px 24px', borderRadius: 12,
                  fontSize: 15, fontWeight: 700,
                  background: plan.highlight
                    ? 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                    : 'rgba(255,255,255,0.07)',
                  color: '#fff',
                  border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  boxShadow: plan.highlight ? '0 0 30px rgba(124,58,237,0.4)' : 'none',
                }}
                whileHover={{ scale: 1.03, boxShadow: plan.highlight ? '0 0 50px rgba(124,58,237,0.6)' : undefined }}
                whileTap={{ scale: 0.97 }}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Open source note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: 'rgba(241,245,249,0.35)' }}
        >
          🔓 Open source · MIT License ·{' '}
          <a href="https://github.com/anishishotasff/CodeWhisper-Software" target="_blank" rel="noreferrer"
            style={{ color: '#a855f7', textDecoration: 'none' }}>
            View on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
