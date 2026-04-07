import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fetches real total download count from GitHub Releases API
async function fetchTotalDownloads(): Promise<number> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/anishishotasff/CodeWhisper-Software/releases',
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) return 0;
    const releases = await res.json();
    if (!Array.isArray(releases) || releases.length === 0) return 0;
    let total = 0;
    for (const release of releases) {
      for (const asset of release.assets || []) {
        total += asset.download_count || 0;
      }
    }
    return total;
  } catch {
    return 0;
  }
}

function useCountUp(target: number, duration = 1200) {
  const [display, setDisplay] = useState(0);
  const start = useRef(0);
  const startTime = useRef<number | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (target === 0) return;
    start.current = display;
    startTime.current = null;

    const animate = (now: number) => {
      if (!startTime.current) startTime.current = now;
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start.current + (target - start.current) * eased));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line
  }, [target]);

  return display;
}

export default function DownloadCounter() {
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [prevLive, setPrevLive] = useState(0);
  const displayTotal = useCountUp(totalDownloads);

  // Fetch real total on mount
  useEffect(() => {
    fetchTotalDownloads().then(n => setTotalDownloads(n));
  }, []);

  // Simulate "people downloading right now" — fluctuates between 2–9
  useEffect(() => {
    const initial = Math.floor(Math.random() * 5) + 2;
    setLiveCount(initial);

    const interval = setInterval(() => {
      setPrevLive(prev => prev);
      setLiveCount(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(2, Math.min(9, prev + delta));
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 32, flexWrap: 'wrap',
      margin: '0 auto 48px',
      maxWidth: 700,
    }}>

      {/* Total downloads */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'rgba(15,15,26,0.7)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: 16, padding: '16px 24px',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span style={{ fontSize: 28 }}>📦</span>
        <div>
          <div style={{
            fontSize: 28, fontWeight: 900, color: '#f1f5f9',
            letterSpacing: '-1px', lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {totalDownloads === 0 ? (
              <span style={{ fontSize: 16, color: 'rgba(241,245,249,0.5)' }}>Loading...</span>
            ) : (
              displayTotal.toLocaleString()
            )}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(241,245,249,0.4)', marginTop: 3 }}>
            {totalDownloads === 0 ? 'Fetching from GitHub...' : 'Total downloads'}
          </div>
        </div>
      </motion.div>

      {/* Live counter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'rgba(15,15,26,0.7)',
          border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: 16, padding: '16px 24px',
          backdropFilter: 'blur(12px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Pulse glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Live dot */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: -4,
              borderRadius: '50%',
              background: 'rgba(16,185,129,0.4)',
            }}
          />
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981',
          }} />
        </div>

        <div>
          <div style={{
            fontSize: 28, fontWeight: 900, lineHeight: 1,
            letterSpacing: '-1px',
            display: 'flex', alignItems: 'baseline', gap: 6,
          }}>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={liveCount}
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ color: '#10b981', display: 'inline-block' }}
              >
                {liveCount}
              </motion.span>
            </AnimatePresence>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(241,245,249,0.4)', marginTop: 3 }}>
            Downloading right now
          </div>
        </div>
      </motion.div>

    </div>
  );
}
