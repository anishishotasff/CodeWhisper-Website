import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message?.replace('Firebase: ', '').replace(/\(auth.*\)/, '') || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0f', padding: '24px',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(15,15,26,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '40px 36px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
        }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🪄</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
            Code<span style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Whisper</span>
          </div>
          <div style={{ fontSize: 14, color: 'rgba(241,245,249,0.4)', marginTop: 6 }}>
            Sign in to your account
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(241,245,249,0.6)', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '11px 14px', borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f1f5f9', fontSize: 14, outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(241,245,249,0.6)', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '11px 14px', borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f1f5f9', fontSize: 14, outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {error && (
            <div style={{
              marginBottom: 16, padding: '10px 14px', borderRadius: 8,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
              fontSize: 13, color: '#f87171',
            }}>
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px', borderRadius: 12,
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 0 30px rgba(124,58,237,0.4)',
            }}
            whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 40px rgba(124,58,237,0.6)' } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'rgba(241,245,249,0.4)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}>
            Sign up free
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Link to="/" style={{ fontSize: 13, color: 'rgba(241,245,249,0.3)', textDecoration: 'none' }}>
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
