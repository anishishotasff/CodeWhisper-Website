import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const tabs = [
  {
    id: 'chat',
    label: '🤖 AI Chat',
    desc: 'Ask anything about your code',
    preview: [
      { role: 'user', text: 'What does the handleOpenFolder function do?' },
      { role: 'ai', text: 'The `handleOpenFolder` function opens a native OS folder picker dialog. When the user selects a folder, it:\n\n1. Reads the directory tree recursively\n2. Sets up file watchers for live reload\n3. Updates the sidebar with the file structure\n\nIt also handles cancellation gracefully.' },
      { role: 'user', text: 'Are there any bugs in this file?' },
      { role: 'ai', text: '✅ No critical bugs found. However I noticed:\n\n• Line 47: Missing error boundary around async call\n• Line 83: Potential memory leak in useEffect cleanup\n\nWant me to fix these automatically?' },
    ],
    isMap: false,
    isQuality: false,
  },
  {
    id: 'map',
    label: '🗺 Project Map',
    desc: 'Visual dependency graph',
    preview: null,
    isMap: true,
    isQuality: false,
  },
  {
    id: 'quality',
    label: '📊 Quality Score',
    desc: 'Instant code analysis',
    preview: null,
    isMap: false,
    isQuality: true,
  },
];

const mapNodes = [
  { id: 'App',        x: 50, y: 50, color: '#a855f7', size: 18 },
  { id: 'Sidebar',    x: 20, y: 75, color: '#06b6d4', size: 12 },
  { id: 'CodeViewer', x: 50, y: 80, color: '#10b981', size: 14 },
  { id: 'ChatPanel',  x: 80, y: 75, color: '#f59e0b', size: 12 },
  { id: 'aiProvider', x: 80, y: 45, color: '#ec4899', size: 10 },
  { id: 'bugDetector',x: 35, y: 35, color: '#f59e0b', size: 10 },
  { id: 'ProjectMap', x: 65, y: 25, color: '#06b6d4', size: 11 },
];

const mapLinks = [
  ['App', 'Sidebar'], ['App', 'CodeViewer'], ['App', 'ChatPanel'],
  ['ChatPanel', 'aiProvider'], ['CodeViewer', 'bugDetector'], ['App', 'ProjectMap'],
];

const scores = [
  { label: 'Complexity',  value: 82, color: '#3178c6' },
  { label: 'Cleanliness', value: 91, color: '#10b981' },
  { label: 'Structure',   value: 88, color: '#f59e0b' },
];

export default function Demo() {
  const [activeTab, setActiveTab] = useState('chat');
  const [ref, inView] = useInView(0.1);
  const tab = tabs.find(t => t.id === activeTab)!;

  return (
    <section id="demo" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(6,182,212,0.1)',
            border: '1px solid rgba(6,182,212,0.25)',
            borderRadius: 100, padding: '5px 16px',
            fontSize: 13, color: '#06b6d4', fontWeight: 500, marginBottom: 16,
          }}>
            See it in action
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 16 }}>
            Built for <span className="gradient-text">real developers</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(241,245,249,0.55)', maxWidth: 480, margin: '0 auto' }}>
            Explore the features that make CodeWhisper the smartest coding assistant.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
          {tabs.map(t => (
            <motion.button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600,
                background: activeTab === t.id ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'rgba(255,255,255,0.05)',
                color: activeTab === t.id ? '#fff' : 'rgba(241,245,249,0.6)',
                boxShadow: activeTab === t.id ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {t.label}
            </motion.button>
          ))}
        </div>

        {/* Demo window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(15,15,26,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.15)',
            backdropFilter: 'blur(20px)',
            maxWidth: 860, margin: '0 auto',
          }}
        >
          {/* Window chrome */}
          <div style={{
            padding: '14px 20px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: 12, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>
              CodeWhisper — {tab.desc}
            </span>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ minHeight: 380, padding: 24 }}
            >
              {/* Chat */}
              {tab.preview && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {tab.preview.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '75%',
                        padding: '12px 16px',
                        borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        background: msg.role === 'user' ? 'linear-gradient(135deg, #7c3aed, #5b21b6)' : 'rgba(255,255,255,0.06)',
                        border: msg.role === 'ai' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                        fontSize: 13, lineHeight: 1.6,
                        color: msg.role === 'user' ? '#fff' : 'rgba(241,245,249,0.85)',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Map */}
              {tab.isMap && (
                <svg width="100%" height="340" style={{ overflow: 'visible' }}>
                  {mapLinks.map(([a, b]) => {
                    const na = mapNodes.find(n => n.id === a)!;
                    const nb = mapNodes.find(n => n.id === b)!;
                    return (
                      <line
                        key={`${a}-${b}`}
                        x1={`${na.x}%`} y1={`${na.y}%`}
                        x2={`${nb.x}%`} y2={`${nb.y}%`}
                        stroke="rgba(255,255,255,0.12)" strokeWidth={1.5}
                      />
                    );
                  })}
                  {mapNodes.map((node, i) => (
                    <motion.g
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.08, type: 'spring' }}
                    >
                      <circle
                        cx={`${node.x}%`} cy={`${node.y}%`} r={node.size}
                        fill={node.color} fillOpacity={0.85}
                        stroke={node.color} strokeWidth={2} strokeOpacity={0.4}
                      />
                      <text
                        x={`${node.x}%`}
                        y={`${node.y}%`}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.7)"
                        fontSize={10}
                        fontFamily="JetBrains Mono, monospace"
                        dy={node.size + 14}
                      >
                        {node.id}
                      </text>
                    </motion.g>
                  ))}
                </svg>
              )}

              {/* Quality */}
              {tab.isQuality && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
                      style={{
                        width: 120, height: 120, borderRadius: '50%',
                        border: '4px solid #10b981',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(16,185,129,0.3)',
                      }}
                    >
                      <span style={{ fontSize: 36, fontWeight: 900, color: '#10b981' }}>A</span>
                      <span style={{ fontSize: 14, color: 'rgba(241,245,249,0.5)' }}>87/100</span>
                    </motion.div>
                    <span style={{ fontSize: 13, color: 'rgba(241,245,249,0.5)' }}>Overall Quality</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
                    {scores.map((s, i) => (
                      <div key={s.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                          <span style={{ color: 'rgba(241,245,249,0.6)' }}>{s.label}</span>
                          <span style={{ color: s.color, fontWeight: 600 }}>{s.value}%</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.value}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                            style={{ height: '100%', background: s.color, borderRadius: 3 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
