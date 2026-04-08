import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, credits, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user || !credits) return null;

  const pct = Math.round((credits.credits / credits.maxCredits) * 100);
  const resetDate = new Date(credits.resetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const isPremium = credits.plan === 'premium';
  const barColor = pct > 50 ? '#10b981' : pct > 20 ? '#f59e0b' : '#ef4444';
  const avatar = user.photoURL || null;
  const initials = (user.displayName || user.email || '?')[0].toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', padding: '24px' }}>
      {/* Nav */}
      <div style={{
        maxWidth: 900, margin: '0 auto 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>🪄</span>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#f1f5f9' }}>
            Code<span style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Whisper</span>
          </span>
        </Link>
        <motion.button
          onClick={handleLogout}
          style={{
            padding: '8px 18px', borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(241,245,249,0.6)', cursor: 'pointer',
            fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
          }}
          whileHover={{ color: '#f1f5f9', background: 'rgba(255,255,255,0.09)' }}
        >
          Sign out
        </motion.button>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 20 }}
        >
          {/* Avatar */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
            background: avatar ? 'transparent' : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 900, color: '#fff',
            overflow: 'hidden',
            boxShadow: '0 0 24px rgba(124,58,237,0.3)',
          }}>
            {avatar
              ? <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials
            }
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px', marginBottom: 4 }}>
              {user.displayName || 'Welcome back'} 👋
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(241,245,249,0.4)' }}>{user.email}</p>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>

          {/* Credits card — Kiro style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'rgba(15,15,26,0.8)',
              border: `1px solid ${isPremium ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 20, padding: '28px',
              position: 'relative', overflow: 'hidden',
              backdropFilter: 'blur(12px)',
            }}
          >
            {isPremium && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
              }} />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.4)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                  Monthly Credits
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 40, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-1px' }}>
                    {credits.credits.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 16, color: 'rgba(241,245,249,0.3)' }}>
                    / {credits.maxCredits.toLocaleString()}
                  </span>
                </div>
              </div>
              <div style={{
                padding: '4px 12px', borderRadius: 100,
                background: isPremium ? 'rgba(168,85,247,0.15)' : 'rgba(6,182,212,0.1)',
                border: `1px solid ${isPremium ? 'rgba(168,85,247,0.3)' : 'rgba(6,182,212,0.25)'}`,
                fontSize: 11, fontWeight: 700,
                color: isPremium ? '#a855f7' : '#06b6d4',
                letterSpacing: 0.5,
              }}>
                {isPremium ? '⭐ PREMIUM' : 'FREE'}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                height: 6, borderRadius: 100,
                background: 'rgba(255,255,255,0.06)',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  style={{
                    height: '100%', borderRadius: 100,
                    background: `linear-gradient(90deg, ${barColor}, ${barColor}aa)`,
                    boxShadow: `0 0 8px ${barColor}60`,
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 11, color: 'rgba(241,245,249,0.35)' }}>{pct}% remaining</span>
                <span style={{ fontSize: 11, color: 'rgba(241,245,249,0.35)' }}>Resets {resetDate}</span>
              </div>
            </div>

            {/* Credit breakdown */}
            <div style={{
              padding: '12px 14px', borderRadius: 10,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              fontSize: 12, color: 'rgba(241,245,249,0.45)',
              lineHeight: 1.8,
            }}>
              <div>1 AI chat message = <span style={{ color: '#f1f5f9' }}>1 credit</span></div>
              <div>1 bug fix = <span style={{ color: '#f1f5f9' }}>2 credits</span></div>
              <div>1 code rewrite = <span style={{ color: '#f1f5f9' }}>3 credits</span></div>
              <div>Project analysis = <span style={{ color: '#f1f5f9' }}>5 credits</span></div>
            </div>
          </motion.div>

          {/* Upgrade card */}
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.06))',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: 20, padding: '28px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
              }} />

              <div style={{ fontSize: 12, fontWeight: 700, color: '#a855f7', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
                ⭐ Upgrade to Premium
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-1px', marginBottom: 4 }}>
                1,000 <span style={{ fontSize: 16, color: 'rgba(241,245,249,0.4)', fontWeight: 400 }}>credits/mo</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(241,245,249,0.5)', marginBottom: 20, lineHeight: 1.6 }}>
                10× more credits. Priority AI responses. Early access to new features.
              </p>
              {[
                '1,000 credits per month',
                'Priority AI processing',
                'Early access to v2, v3 features',
                'Premium support',
              ].map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(241,245,249,0.65)', marginBottom: 8 }}>
                  <span style={{ color: '#a855f7' }}>✓</span> {f}
                </div>
              ))}
              <motion.a
                href="#pricing"
                style={{
                  display: 'block', textAlign: 'center', marginTop: 20,
                  padding: '12px', borderRadius: 10,
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  color: '#fff', textDecoration: 'none',
                  fontSize: 14, fontWeight: 700,
                  boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(124,58,237,0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                Upgrade to Premium
              </motion.a>
            </motion.div>
          )}

          {/* Download card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(15,15,26,0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '28px',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(241,245,249,0.4)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
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
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
