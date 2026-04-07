import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'per month',
    desc: 'Perfect for getting started.',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.2)',
    highlight: false,
    badge: null,
    credits: 100,
    creditColor: '#06b6d4',
    cta: 'Get Started Free',
    ctaHref: '/signup',
    features: [
      { text: '100 credits per month', highlight: true },
      { text: 'Credits reset every month', highlight: false },
      { text: 'AI chat assistant', highlight: false },
      { text: 'Bug scanner & auto-fix', highlight: false },
      { text: 'Project map visualization', highlight: false },
      { text: 'Smart notepad', highlight: false },
      { text: 'Works on Windows, Mac & Linux', highlight: false },
      { text: 'Local AI (Ollama) — unlimited', highlight: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9',
    period: 'per month',
    desc: 'For developers who need more power.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.25)',
    highlight: true,
    badge: 'Most Popular',
    credits: 1000,
    creditColor: '#a855f7',
    cta: 'Upgrade to Premium',
    ctaHref: '/signup',
    features: [
      { text: '1,000 credits per month', highlight: true },
      { text: 'Credits reset every month', highlight: false },
      { text: 'Everything in Free', highlight: false },
      { text: 'Priority AI processing', highlight: false },
      { text: 'Early access to v2, v3 features', highlight: false },
      { text: 'Advanced code rewrite', highlight: false },
      { text: 'Semantic search', highlight: false },
      { text: 'Premium support', highlight: false },
    ],
  },
];

const creditUsage = [
  { action: 'AI chat message', cost: 1, icon: '💬' },
  { action: 'Bug detection', cost: 1, icon: '🐛' },
  { action: 'Auto bug fix', cost: 2, icon: '🔧' },
  { action: 'Code rewrite', cost: 3, icon: '✨' },
  { action: 'Project analysis', cost: 5, icon: '🔍' },
  { action: 'Flow explanation', cost: 3, icon: '🗺' },
];

export default function Pricing() {
  const [ref, inView] = useInView(0.1);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="pricing" style={{ padding: '120px 0', position: 'relative' }}>

      {/* Background */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
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
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: 100, padding: '5px 16px',
            fontSize: 13, color: '#a855f7', fontWeight: 500, marginBottom: 16,
          }}>
            Pricing
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900, letterSpacing: '-2px', marginBottom: 16,
          }}>
            Simple, <span className="gradient-text">credit-based</span> pricing
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(241,245,249,0.5)', maxWidth: 480, margin: '0 auto' }}>
            Start free with 100 credits every month. Upgrade for 10× more power.
          </p>
        </motion.div>

        {/* Plans */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24, maxWidth: 820, margin: '0 auto 64px',
        }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.06))'
                  : 'rgba(15,15,26,0.7)',
                border: `1px solid ${hoveredPlan === plan.id || plan.highlight ? plan.color + '50' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 24, padding: '36px 32px',
                position: 'relative', overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.3s',
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)`,
                opacity: plan.highlight ? 1 : hoveredPlan === plan.id ? 0.8 : 0.3,
                transition: 'opacity 0.3s',
              }} />

              {/* Glow */}
              <motion.div
                animate={{ opacity: hoveredPlan === plan.id || plan.highlight ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 50% 0%, ${plan.glow} 0%, transparent 60%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  color: '#fff', fontSize: 10, fontWeight: 700,
                  padding: '3px 10px', borderRadius: 100, letterSpacing: 0.5,
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name + price */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: plan.color, marginBottom: 10, letterSpacing: 0.5 }}>
                  {plan.name.toUpperCase()}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 44, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-2px', lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 14, color: 'rgba(241,245,249,0.4)' }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.5)', marginTop: 8 }}>{plan.desc}</p>
              </div>

              {/* Credits highlight box */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px', borderRadius: 12, marginBottom: 24,
                background: `${plan.color}10`,
                border: `1px solid ${plan.color}30`,
              }}>
                <span style={{ fontSize: 24 }}>⚡</span>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: plan.creditColor, letterSpacing: '-0.5px' }}>
                    {plan.credits.toLocaleString()} credits
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(241,245,249,0.4)', marginTop: 1 }}>
                    per month · resets automatically
                  </div>
                </div>
              </div>

              {/* Features */}
              <div style={{ marginBottom: 28 }}>
                {plan.features.map(f => (
                  <div key={f.text} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontSize: 13,
                    color: f.highlight ? '#f1f5f9' : 'rgba(241,245,249,0.6)',
                    fontWeight: f.highlight ? 600 : 400,
                    marginBottom: 10,
                  }}>
                    <span style={{ color: plan.color, fontSize: 12, flexShrink: 0 }}>✓</span>
                    {f.text}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={plan.ctaHref}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <motion.div
                  style={{
                    textAlign: 'center',
                    padding: '13px 24px', borderRadius: 12,
                    fontSize: 15, fontWeight: 700, color: '#fff',
                    background: plan.highlight
                      ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
                      : 'rgba(255,255,255,0.07)',
                    border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.12)',
                    boxShadow: plan.highlight ? '0 0 30px rgba(124,58,237,0.4)' : 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: plan.highlight ? '0 0 50px rgba(124,58,237,0.6)' : '0 0 20px rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.cta}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Credit usage table — Kiro style */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ maxWidth: 820, margin: '0 auto 40px' }}
        >
          <div style={{
            background: 'rgba(15,15,26,0.7)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20, overflow: 'hidden',
            backdropFilter: 'blur(12px)',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto',
              padding: '14px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: 11, fontWeight: 700, letterSpacing: 1,
              color: 'rgba(241,245,249,0.3)', textTransform: 'uppercase',
            }}>
              <span>Action</span>
              <span style={{ textAlign: 'right', marginRight: 48 }}>Free</span>
              <span style={{ textAlign: 'right' }}>Premium</span>
            </div>

            {creditUsage.map((item, i) => (
              <div
                key={item.action}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto',
                  padding: '14px 24px',
                  borderBottom: i < creditUsage.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, color: 'rgba(241,245,249,0.7)' }}>{item.action}</span>
                </div>
                <div style={{ textAlign: 'right', marginRight: 48 }}>
                  <span style={{
                    fontSize: 13, fontWeight: 700,
                    color: '#06b6d4',
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px solid rgba(6,182,212,0.2)',
                    padding: '2px 10px', borderRadius: 100,
                  }}>
                    {item.cost} cr
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: 13, fontWeight: 700,
                    color: '#a855f7',
                    background: 'rgba(168,85,247,0.1)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    padding: '2px 10px', borderRadius: 100,
                  }}>
                    {item.cost} cr
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', fontSize: 13, color: 'rgba(241,245,249,0.3)' }}
        >
          No credit card required to start ·{' '}
          <a href="https://github.com/anishishotasff/CodeWhisper-Software" target="_blank" rel="noreferrer"
            style={{ color: '#a855f7', textDecoration: 'none' }}>
            View on GitHub
          </a>
        </motion.div>

      </div>
    </section>
  );
}
