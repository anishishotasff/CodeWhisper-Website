import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const faqs = [
  {
    q: 'Is CodeWhisper free to use?',
    a: 'Yes, CodeWhisper is completely free to download and use. You can run it locally with Ollama at zero cost, or connect your own OpenAI API key — you only pay OpenAI directly for what you use.',
  },
  {
    q: 'Does my code get sent to the internet?',
    a: 'Only if you use OpenAI mode. In Local AI mode (Ollama), everything runs 100% on your machine — no data leaves your computer. Your code stays private.',
  },
  {
    q: 'What operating systems does it support?',
    a: 'CodeWhisper runs on Windows 10/11, macOS 11+, and Linux. All three platforms get native installers — .exe for Windows, .dmg for macOS, and .AppImage for Linux.',
  },
  {
    q: 'What is Ollama and do I need it?',
    a: 'Ollama is a free tool that lets you run AI models locally on your machine. You don\'t need it — you can use OpenAI instead. But if you want full privacy and offline use, install Ollama from ollama.com and CodeWhisper will use it automatically.',
  },
  {
    q: 'Which AI models does CodeWhisper support?',
    a: 'With OpenAI mode it uses GPT-4o. With Ollama you can use any local model like Llama 3, Mistral, CodeLlama, Gemma, and more — just pull the model in Ollama and select it in the app.',
  },
  {
    q: 'Can CodeWhisper fix bugs automatically?',
    a: 'Yes. The built-in bug scanner detects issues like unused variables, missing error handling, and potential crashes. You can click "Fix" and CodeWhisper will rewrite the problematic code and apply the fix directly to the file.',
  },
  {
    q: 'What languages and frameworks does it support?',
    a: 'CodeWhisper works with any language — JavaScript, TypeScript, Python, Rust, Go, Java, C++, and more. It reads your files and understands the project structure regardless of the tech stack.',
  },
  {
    q: 'How is this different from GitHub Copilot or Cursor?',
    a: 'Copilot and Cursor are editor plugins focused on autocomplete. CodeWhisper is a standalone app focused on understanding — it explains entire projects, maps file relationships, detects bugs, and lets you chat about your codebase. It also works fully offline.',
  },
];

export default function FAQ() {
  const [ref, inView] = useInView(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: 100, padding: '5px 16px',
            fontSize: 13, color: '#a855f7', fontWeight: 500, marginBottom: 16,
          }}>
            FAQ
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900, letterSpacing: '-2px', marginBottom: 16,
          }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(241,245,249,0.5)', maxWidth: 480, margin: '0 auto' }}>
            Everything you need to know about CodeWhisper.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{ marginBottom: 12 }}
            >
              <motion.div
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  background: openIndex === i ? 'rgba(124,58,237,0.08)' : 'rgba(15,15,26,0.6)',
                  border: `1px solid ${openIndex === i ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{ borderColor: 'rgba(124,58,237,0.25)' }}
              >
                {/* Question row */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px', gap: 16,
                }}>
                  <span style={{
                    fontSize: 15, fontWeight: 600, color: '#f1f5f9',
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      flexShrink: 0,
                      width: 28, height: 28, borderRadius: '50%',
                      background: openIndex === i ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${openIndex === i ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, color: openIndex === i ? '#a855f7' : 'rgba(241,245,249,0.4)',
                      transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                    }}
                  >
                    +
                  </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 24px 20px',
                        fontSize: 14, color: 'rgba(241,245,249,0.6)',
                        lineHeight: 1.7,
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        paddingTop: 16,
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <p style={{ fontSize: 15, color: 'rgba(241,245,249,0.4)', marginBottom: 16 }}>
            Still have questions?
          </p>
          <motion.a
            href="https://github.com/anishishotasff/CodeWhisper-Software/issues"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f1f5f9', textDecoration: 'none',
              fontSize: 14, fontWeight: 600,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.09)', borderColor: 'rgba(124,58,237,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            Ask on GitHub ↗
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
