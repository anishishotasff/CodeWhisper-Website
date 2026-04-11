import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#f1f5f9', fontSize: 14, outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit', marginBottom: 14,
};

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try { await signup(email, password); navigate('/dashboard'); }
    catch (err: any) { setError(err.message?.replace('Firebase: ', '').replace(/\(auth.*\)/, '') || 'Signup failed'); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setError(''); setGoogleLoading(true);
    try { await loginWithGoogle(); navigate('/dashboard'); }
    catch (err: any) {
      const msg = err.message || '';
      if (msg.includes('unauthorized-domain')) {
        setError('Domain not authorized. Add your Vercel URL to Firebase authorized domains.');
      } else if (msg.includes('popup-closed')) {
        setError('Sign-in popup was closed. Please try again.');
      } else if (msg.includes('network')) {
        setError('Network error. Check your connection.');
      } else {
        setError(msg.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '').trim() || 'Google sign-in failed. Try email/password instead.');
      }
    }
    finally { setGoogleLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: '24px' }}>
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 420, background: 'rgba(15,15,26,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '40px 36px', backdropFilter: 'blur(20px)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><Logo size={52} id="signup" /></div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
            Code<span style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Whisper</span>
          </div>
          <div style={{ fontSize: 14, color: 'rgba(241,245,249,0.4)', marginTop: 6 }}>Create your free account</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '5px 14px', borderRadius: 100, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', fontSize: 12, color: '#a855f7', fontWeight: 600 }}>
            🎁 100 free credits on signup
          </div>
        </div>

        {/* Google */}
        <motion.button onClick={handleGoogle} disabled={googleLoading}
          style={{ width: '100%', padding: '12px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#f1f5f9', cursor: googleLoading ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: googleLoading ? 0.7 : 1, marginBottom: 20 }}
          whileHover={!googleLoading ? { background: 'rgba(255,255,255,0.1)', scale: 1.02 } : {}} whileTap={!googleLoading ? { scale: 0.98 } : {}}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: 12, color: 'rgba(241,245,249,0.3)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Email', type: 'email', val: email, set: setEmail, ph: 'you@example.com' },
            { label: 'Password', type: 'password', val: password, set: setPassword, ph: '••••••••' },
            { label: 'Confirm Password', type: 'password', val: confirm, set: setConfirm, ph: '••••••••' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(241,245,249,0.6)', display: 'block', marginBottom: 6 }}>{f.label}</label>
              <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} required placeholder={f.ph} style={{ ...inputStyle, marginBottom: 0 }} />
            </div>
          ))}
          {error && <div style={{ marginBottom: 14, padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', fontSize: 13, color: '#f87171' }}>{error}</div>}
          <motion.button type="submit" disabled={loading}
            style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', opacity: loading ? 0.7 : 1, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
            whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
          >{loading ? 'Creating account...' : 'Create Free Account'}</motion.button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'rgba(241,245,249,0.4)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Link to="/" style={{ fontSize: 13, color: 'rgba(241,245,249,0.3)', textDecoration: 'none' }}>← Back to home</Link>
        </div>
      </motion.div>
    </div>
  );
}
