import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';

const CREDIT_COSTS = { CHAT: 1, BUG_SCAN: 1, BUG_FIX: 2, REWRITE: 3, ANALYZE: 5 };
const SECTIONS = ['Overview', 'Credits', 'Settings', 'Shortcuts'];

function CreditRing({ pct, color, size = 100 }: { pct: number; color: string; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={8} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      />
    </svg>
  );
}

export default function Dashboard() {
  const { user, credits, logout } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState('Overview');

  const handleLogout = async () => { await logout(); navigate('/'); };

  if (!user || !credits) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'rgba(241,245,249,0.4)', fontSize: 14 }}>Loading...</div>
    </div>
  );

  const pct = Math.round((credits.credits / credits.maxCredits) * 100);
  const used = credits.maxCredits - credits.credits;
  const resetDate = new Date(credits.resetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const isPremium = credits.plan === 'premium';
  const barColor = pct > 50 ? '#10b981' : pct > 20 ? '#f59e0b' : '#ef4444';
  const avatar = user.photoURL;
  const initials = (user.displayName || user.email || '?')[0].toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 800, height: 600, pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)',
      }} />

      {/* Nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: 960, margin: '0 auto', height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Logo size={28} id="dash" />
            <span style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9' }}>
              Code<span style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Whisper</span>
            </span>
          </Link>
          <motion.button
            onClick={handleLogout}
            style={{
              padding: '7px 16px', borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(241,245,249,0.6)', cursor: 'pointer',
              fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
            }}
            whileHover={{ color: '#f1f5f9' }}
          >
            Sign out
          </motion.button>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 20,
            padding: '24px', borderRadius: 20, marginBottom: 28,
            background: 'rgba(15,15,26,0.7)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
            background: avatar ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 900, color: '#fff',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(124,58,237,0.3)',
          }}>
            {avatar ? <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
              {user.displayName || 'Welcome back'} 👋
            </div>
            <div style={{ fontSize: 13, color: 'rgba(241,245,249,0.4)', marginTop: 2 }}>{user.email}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <div style={{
                padding: '3px 12px', borderRadius: 100,
                background: isPremium ? 'rgba(168,85,247,0.15)' : 'rgba(6,182,212,0.1)',
                border: `1px solid ${isPremium ? 'rgba(168,85,247,0.3)' : 'rgba(6,182,212,0.25)'}`,
                fontSize: 11, fontWeight: 700,
                color: isPremium ? '#a855f7' : '#06b6d4',
              }}>
                {isPremium ? '⭐ PREMIUM' : 'FREE PLAN'}
              </div>
              <span style={{ fontSize: 12, color: 'rgba(241,245,249,0.3)' }}>
                Credits reset {resetDate}
              </span>
            </div>
          </div>

          {/* Mini credit ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <CreditRing pct={pct} color={barColor} size={80} />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>{pct}%</span>
              <span style={{ fontSize: 9, color: 'rgba(241,245,249,0.4)' }}>credits</span>
            </div>
          </div>
        </motion.div>

        {/* Section tabs */}
        <div style={{
          display: 'flex', gap: 4, marginBottom: 24,
          background: 'rgba(15,15,26,0.6)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12, padding: 4,
          backdropFilter: 'blur(12px)',
        }}>
          {SECTIONS.map(s => (
            <button
              key={s}
              onClick={() => setSection(s)}
              style={{
                flex: 1, padding: '9px', borderRadius: 9, border: 'none',
                cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                background: section === s ? 'rgba(124,58,237,0.2)' : 'transparent',
                color: section === s ? '#a855f7' : 'rgba(241,245,249,0.4)',
                transition: 'all 0.15s',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Section content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
          >

            {/* ── OVERVIEW ── */}
            {section === 'Overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>

                {/* Credits card */}
                <div style={{
                  background: 'rgba(15,15,26,0.7)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '24px', backdropFilter: 'blur(12px)',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.4)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16 }}>
                    Monthly Credits
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <div style={{ position: 'relative' }}>
                      <CreditRing pct={pct} color={barColor} size={90} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 20, fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>{pct}%</span>
                        <span style={{ fontSize: 9, color: 'rgba(241,245,249,0.4)' }}>left</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>
                        {credits.credits.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(241,245,249,0.4)', marginTop: 4 }}>
                        of {credits.maxCredits.toLocaleString()} remaining
                      </div>
                      <div style={{ fontSize: 11, color: barColor, marginTop: 4 }}>
                        {used.toLocaleString()} used
                      </div>
                    </div>
                  </div>
                  <div style={{ height: 5, borderRadius: 100, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{ height: '100%', borderRadius: 100, background: barColor }}
                    />
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: 'Plan', value: isPremium ? 'Premium' : 'Free', color: isPremium ? '#a855f7' : '#06b6d4' },
                    { label: 'Credits Used', value: used.toLocaleString(), color: '#f59e0b' },
                    { label: 'Max Credits', value: credits.maxCredits.toLocaleString(), color: '#f1f5f9' },
                    { label: 'Reset Date', value: resetDate, color: 'rgba(241,245,249,0.5)' },
                  ].map(stat => (
                    <div key={stat.label} style={{
                      padding: '14px', borderRadius: 12,
                      background: 'rgba(15,15,26,0.7)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      <div style={{ fontSize: 11, color: 'rgba(241,245,249,0.4)', marginBottom: 6 }}>{stat.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Download app */}
                <div style={{
                  background: 'rgba(15,15,26,0.7)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '24px', backdropFilter: 'blur(12px)',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.4)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>
                    Download App
                  </div>
                  {[
                    { icon: '🖥', label: 'Windows', sub: '.exe installer' },
                    { icon: '🍎', label: 'macOS', sub: '.dmg file' },
                    { icon: '🐧', label: 'Linux', sub: '.AppImage' },
                  ].map(p => (
                    <motion.a
                      key={p.label}
                      href="https://github.com/anishishotasff/CodeWhisper-Software/releases/latest"
                      target="_blank" rel="noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 12px', borderRadius: 10, marginBottom: 8,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        textDecoration: 'none',
                      }}
                      whileHover={{ background: 'rgba(255,255,255,0.07)' }}
                    >
                      <span style={{ fontSize: 20 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{p.label}</div>
                        <div style={{ fontSize: 11, color: 'rgba(241,245,249,0.35)' }}>{p.sub}</div>
                      </div>
                      <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(241,245,249,0.3)' }}>↓</span>
                    </motion.a>
                  ))}
                </div>

                {/* Upgrade card — free only */}
                {!isPremium && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.06))',
                    border: '1px solid rgba(124,58,237,0.25)',
                    borderRadius: 20, padding: '24px',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#a855f7', marginBottom: 8 }}>⭐ Upgrade to Premium</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#f1f5f9', marginBottom: 4 }}>1,000 <span style={{ fontSize: 14, color: 'rgba(241,245,249,0.4)', fontWeight: 400 }}>credits/mo</span></div>
                    <p style={{ fontSize: 13, color: 'rgba(241,245,249,0.5)', marginBottom: 16, lineHeight: 1.6 }}>
                      10× more credits. Priority AI. Early access to new features.
                    </p>
                    <motion.a
                      href="/#pricing"
                      style={{
                        display: 'block', textAlign: 'center', padding: '11px',
                        borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                        color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700,
                        boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      Upgrade Now
                    </motion.a>
                  </div>
                )}
              </div>
            )}

            {/* ── CREDITS ── */}
            {section === 'Credits' && (
              <div style={{ maxWidth: 640 }}>
                <div style={{
                  background: 'rgba(15,15,26,0.7)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '32px', marginBottom: 16,
                  textAlign: 'center', backdropFilter: 'blur(12px)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <div style={{ position: 'relative' }}>
                      <CreditRing pct={pct} color={barColor} size={140} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 32, fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>{pct}%</span>
                        <span style={{ fontSize: 12, color: 'rgba(241,245,249,0.4)' }}>remaining</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>
                    {credits.credits.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(241,245,249,0.4)', marginTop: 6 }}>
                    of {credits.maxCredits.toLocaleString()} credits remaining
                  </div>
                  <div style={{ fontSize: 13, color: barColor, marginTop: 4 }}>
                    {used.toLocaleString()} used · resets {resetDate}
                  </div>
                </div>

                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.4)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
                  Credit Costs
                </div>
                {[
                  { icon: '💬', label: 'AI chat message', cost: CREDIT_COSTS.CHAT },
                  { icon: '🐛', label: 'Bug detection', cost: CREDIT_COSTS.BUG_SCAN },
                  { icon: '🔧', label: 'Auto bug fix', cost: CREDIT_COSTS.BUG_FIX },
                  { icon: '✨', label: 'Code rewrite', cost: CREDIT_COSTS.REWRITE },
                  { icon: '🔍', label: 'Project analysis', cost: CREDIT_COSTS.ANALYZE },
                  { icon: '🏗', label: 'Build project', cost: CREDIT_COSTS.ANALYZE },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: 10, marginBottom: 6,
                    background: 'rgba(15,15,26,0.7)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <span style={{ fontSize: 14, color: 'rgba(241,245,249,0.7)', display: 'flex', gap: 8 }}>
                      {item.icon} {item.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, color: 'rgba(241,245,249,0.3)' }}>
                        ~{Math.floor(credits.credits / item.cost)}x left
                      </span>
                      <span style={{
                        fontSize: 12, fontWeight: 700, color: '#a855f7',
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
            )}

            {/* ── SETTINGS ── */}
            {section === 'Settings' && (
              <div style={{ maxWidth: 560 }}>
                {[
                  { icon: '🔐', label: 'Account', sub: user.email || '', action: null },
                  { icon: '🔔', label: 'Notifications', sub: 'Email updates and alerts', action: null },
                  { icon: '🛡', label: 'Privacy', sub: 'Data and security settings', action: null },
                  { icon: '📦', label: 'App Version', sub: 'CodeWhisper v1.0.2', action: null },
                  { icon: '📖', label: 'Documentation', sub: 'How to use CodeWhisper', href: 'https://github.com/anishishotasff/CodeWhisper-Software' },
                  { icon: '🐛', label: 'Report a Bug', sub: 'Open a GitHub issue', href: 'https://github.com/anishishotasff/CodeWhisper-Software/issues' },
                ].map(item => (
                  <motion.div
                    key={item.label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px', borderRadius: 12, marginBottom: 8,
                      background: 'rgba(15,15,26,0.7)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      cursor: (item as any).href ? 'pointer' : 'default',
                      textDecoration: 'none',
                    }}
                    whileHover={(item as any).href ? { borderColor: 'rgba(124,58,237,0.3)' } : {}}
                    {...((item as any).href ? { as: 'a', href: (item as any).href, target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: 'rgba(241,245,249,0.4)', marginTop: 2 }}>{item.sub}</div>
                    </div>
                    {(item as any).href && <span style={{ color: 'rgba(241,245,249,0.3)', fontSize: 14 }}>↗</span>}
                  </motion.div>
                ))}

                <motion.button
                  onClick={handleLogout}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 12, marginTop: 8,
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#f87171', cursor: 'pointer',
                    fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                  }}
                  whileHover={{ background: 'rgba(239,68,68,0.15)' }}
                >
                  Sign Out
                </motion.button>
              </div>
            )}

            {/* ── SHORTCUTS ── */}
            {section === 'Shortcuts' && (
              <div style={{ maxWidth: 560 }}>
                <p style={{ fontSize: 13, color: 'rgba(241,245,249,0.4)', marginBottom: 16 }}>
                  Keyboard shortcuts in the CodeWhisper desktop app
                </p>
                {[
                  { keys: ['Ctrl', 'S'], label: 'Save file' },
                  { keys: ['Tab'], label: 'Indent code' },
                  { keys: ['Shift', 'Tab'], label: 'Unindent code' },
                  { keys: ['Enter'], label: 'Auto-indent new line' },
                  { keys: ['Ctrl', 'Enter'], label: 'Send chat message' },
                  { keys: ['Ctrl', 'Z'], label: 'Undo' },
                  { keys: ['Ctrl', 'C'], label: 'Copy code' },
                  { keys: ['Ctrl', 'A'], label: 'Select all' },
                  { keys: ['Esc'], label: 'Close panel / modal' },
                ].map(sc => (
                  <div key={sc.label} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: 10, marginBottom: 6,
                    background: 'rgba(15,15,26,0.7)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <span style={{ fontSize: 14, color: 'rgba(241,245,249,0.7)' }}>{sc.label}</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {sc.keys.map(k => (
                        <kbd key={k} style={{
                          padding: '3px 8px', borderRadius: 6,
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          fontSize: 11, fontWeight: 700,
                          color: '#f1f5f9', fontFamily: 'monospace',
                        }}>
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
