import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, firebaseReady } from '../firebase';

export interface UserCredits {
  plan: 'free' | 'premium';
  credits: number;
  maxCredits: number;
  resetDate: string; // ISO date string
}

interface AuthContextType {
  user: User | null;
  credits: UserCredits | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshCredits: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

function getNextResetDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toISOString();
}

async function initUserCredits(uid: string, plan: 'free' | 'premium' = 'free') {
  if (!firebaseReady) return { plan, credits: 100, maxCredits: 100, resetDate: getNextResetDate() };
  const max = plan === 'premium' ? 1000 : 100;
  await setDoc(doc(db, 'users', uid), {
    plan,
    credits: max,
    maxCredits: max,
    resetDate: getNextResetDate(),
    createdAt: new Date().toISOString(),
  });
  return { plan, credits: max, maxCredits: max, resetDate: getNextResetDate() };
}

async function getUserCredits(uid: string): Promise<UserCredits | null> {
  if (!firebaseReady) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const data = snap.data() as UserCredits;
  if (new Date() > new Date(data.resetDate)) {
    const max = data.plan === 'premium' ? 1000 : 100;
    const updated: UserCredits = { ...data, credits: max, resetDate: getNextResetDate() };
    await updateDoc(doc(db, 'users', uid), updated as any);
    return updated;
  }
  return data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshCredits = async () => {
    if (!firebaseReady || !auth?.currentUser) return;
    const c = await getUserCredits(auth.currentUser.uid);
    setCredits(c);
  };

  useEffect(() => {
    // If Firebase not configured, just mark as not loading
    if (!firebaseReady || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        let c = await getUserCredits(u.uid);
        if (!c) c = await initUserCredits(u.uid);
        setCredits(c);
      } else {
        setCredits(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signup = async (email: string, password: string) => {
    if (!firebaseReady) throw new Error('Auth not configured yet');
    const { user: u } = await createUserWithEmailAndPassword(auth, email, password);
    await initUserCredits(u.uid);
  };

  const login = async (email: string, password: string) => {
    if (!firebaseReady) throw new Error('Auth not configured yet');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!firebaseReady) throw new Error('Auth not configured yet');
    const provider = new GoogleAuthProvider();
    try {
      const { user: u } = await signInWithPopup(auth, provider);
      const existing = await getUserCredits(u.uid);
      if (!existing) await initUserCredits(u.uid);
    } catch (err: any) {
      // Re-throw with clean message
      const msg = err.message || '';
      if (msg.includes('unauthorized-domain')) {
        throw new Error('This domain is not authorized. Please add it to Firebase authorized domains.');
      }
      throw err;
    }
  };

  const logout = async () => {
    if (!firebaseReady) return;
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, credits, loading, signup, login, loginWithGoogle, logout, refreshCredits }}>
      {children}
    </AuthContext.Provider>
  );
}
