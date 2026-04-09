import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from '../components/PhoneInput';

declare global { interface Window { recaptchaVerifierSignup: any; } }

type AuthMethod = 'email' | 'phone';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#f1f5f9', fontSize: 14, outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit', marginBottom: 14,
};

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmResult, setConfirmResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try { await signup(email, password); navigate('/dashboard'); }
    catch (err: any) { setError(err.message?.replace('Firebase: ', '').replace(/\(auth.*\)/, '') || 'Signup failed'); }
    finally { setLoading(false); }
  };

  const handleSendOtp = async () => {
    if (!phone.trim()) { setError('Enter a phone number'); return; }
    setError(''); setLoading(true);
    try {
      const { getRecaptchaToken } = await import('../utils/recaptcha');
      const recaptchaToken = await getRecaptchaToken('SIGNUP_OTP');
      const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyAUM5eXoSob0rQQ3J8_kLTZNlAIdqu0OLI';
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=${FIREBASE_API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phoneNumber: phone, recaptchaToken }) }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setConfirmResult({ sessionInfo: data.sessionInfo });
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim() || !confirmResult) return;
    setError(''); setLoading(true);
    try {
      const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyAUM5eXoSob0rQQ3J8_kLTZNlAIdqu0OLI';
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=${FIREBASE_API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionInfo: confirmResult.sessionInfo, code: otp }) }
      );
      const data = await res.json();
      if (data.error) throw new Error('Invalid OTP. Please try again.');
      navigate('/dashboard');
    }
    catch (err: any) { setError(err.message || 'Invalid OTP. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setError(''); setGoogleLoading(true);
    try { await loginWithGoogle(); navigate('/dashboard'); }
    catch (err: any) { setError(err.message?.replace('Firebase: ', '').replace(/\(auth.*\)/, '') || 'Google sign-in failed'); }
    finally { setGoogleLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: '24px' }}>
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div id="recaptcha-signup-container" ref={recaptchaRef} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 420, background: 'rgba(15,15,26,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '40px 36px', backdropFilter: 'blur(20px)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🪄</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
            Code<span style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Whisper</span>
          </div>
          <div style={{ fontSize: 14, color: 'rgba(241,245,249,0.4)', marginTop: 6 }}>Create your free account</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '5px 14px', borderRadius: 100, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', fontSize: 12, color: '#a855f7', fontWeight: 600 }}>
            🎁 100 free credits on signup
          </div>
        </div>

        {/* Email / Phone tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(['email', 'phone'] as AuthMethod[]).map(m => (
            <button key={m} onClick={() => { setAuthMethod(m); setError(''); setOtpSent(false); setOtp(''); }}
              style={{ flex: 1, padding: '8px', borderRadius: 10, border: `1px solid ${authMethod === m ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', background: authMethod === m ? 'rgba(124,58,237,0.15)' : 'transparent', color: authMethod === m ? '#a855f7' : 'rgba(241,245,249,0.4)' }}
            >{m === 'email' ? '✉️ Email' : '📱 Phone OTP'}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {authMethod === 'email' ? (
            <motion.form key="email" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }} onSubmit={handleEmailSubmit}>
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
                style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', opacity: loading ? 0.7 : 1, boxShadow: '0 0 30px rgba(124,58,237,0.4)', marginBottom: 14 }}
                whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
              >{loading ? 'Creating account...' : 'Create Free Account'}</motion.button>
            </motion.form>
          ) : (
            <motion.div key="phone" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }}>
              {!otpSent ? (
                <>
                  <div style={{ fontSize: 12, color: 'rgba(241,245,249,0.5)', marginBottom: 8 }}>Enter with country code (e.g. +91 9876543210)</div>
                  <PhoneInput value={phone} onChange={setPhone} />
                  {error && <div style={{ marginBottom: 14, padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', fontSize: 13, color: '#f87171' }}>{error}</div>}
                  <motion.button onClick={handleSendOtp} disabled={loading}
                    style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', opacity: loading ? 0.7 : 1, marginBottom: 14 }}
                    whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
                  >{loading ? 'Sending OTP...' : 'Send OTP'}</motion.button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 13, color: 'rgba(241,245,249,0.6)', marginBottom: 14, textAlign: 'center' }}>
                    📱 OTP sent to <strong style={{ color: '#f1f5f9' }}>{phone}</strong>
                    <button onClick={() => { setOtpSent(false); setOtp(''); }} style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', fontSize: 12, marginLeft: 8 }}>Change</button>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    {[0,1,2,3,4,5].map(i => (
                      <input key={i} type="text" maxLength={1} value={otp[i] || ''} onChange={e => { const v = e.target.value.replace(/\D/g,''); const arr = otp.split(''); arr[i] = v; setOtp(arr.join('').slice(0,6)); if (v && i < 5) { const next = document.getElementById(`otp-s-${i+1}`); next?.focus(); } }} id={`otp-s-${i}`}
                        style={{ flex: 1, padding: '12px 0', textAlign: 'center', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: `1px solid ${otp[i] ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`, color: '#f1f5f9', fontSize: 18, fontWeight: 700, outline: 'none' }}
                      />
                    ))}
                  </div>
                  {error && <div style={{ marginBottom: 14, padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', fontSize: 13, color: '#f87171' }}>{error}</div>}
                  <motion.button onClick={handleVerifyOtp} disabled={loading || otp.length < 6}
                    style={{ width: '100%', padding: '13px', borderRadius: 12, background: otp.length === 6 ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', cursor: otp.length < 6 ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', opacity: loading ? 0.7 : 1, marginBottom: 14 }}
                    whileHover={otp.length === 6 && !loading ? { scale: 1.02 } : {}} whileTap={otp.length === 6 && !loading ? { scale: 0.98 } : {}}
                  >{loading ? 'Verifying...' : 'Verify & Create Account'}</motion.button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider + Google */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0 16px' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: 12, color: 'rgba(241,245,249,0.3)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>
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

        <div style={{ textAlign: 'center', fontSize: 14, color: 'rgba(241,245,249,0.4)' }}>
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
