import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, type Variants } from 'framer-motion';
import SplineScene from '../components/ui/SplineScene';
import { COMPANY } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';

// Public Spline scene — abstract neural/brain visualization
const SPLINE_ENTRY_URL = 'https://prod.spline.design/kZDDjO5HlWTakXM6/scene.splinecode';

const BoltIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-white">
    <path d="M13 2L4.09 12.97A1 1 0 005 14.5h7v7.5l8.91-10.97A1 1 0 0020 9.5h-7V2z" />
  </svg>
);

const GlobeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const SnapIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="w-6 h-6">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

/**
 * Entry Hero Page — The first page users see.
 * Presents two choices:
 *   A) Explore the full website
 *   B) Go to strategic snapshot + AI chatbot
 */
const EntryHero: React.FC = () => {
  const navigate = useNavigate();
  const reduceMotion = usePrefersReducedMotion();
  const [hoveredChoice, setHoveredChoice] = useState<'A' | 'B' | null>(null);
  // Use a ref-based mount state to avoid effect-driven re-renders
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation after initial paint — OK as external DOM sync
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>60 Watts of Clarity | Welcome</title>
        <meta
          name="description"
          content="Welcome to 60 Watts of Clarity — an ethical AI education company for social workers and communities."
        />
      </Helmet>

      <a href="#entry-main" className="skip-link">
        Skip to main content
      </a>

      <div className="relative min-h-screen flex flex-col overflow-hidden hero-bg">
        {/* Full-screen Spline 3D background (decorative) */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{ opacity: 0.35 }}
        >
          <SplineScene
            url={SPLINE_ENTRY_URL}
            ariaLabel=""
            className="w-full h-full"
          />
        </div>

        {/* Overlay gradient for text readability — ensures WCAG AA+ contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-1"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,11,30,0.6) 0%, rgba(10,11,30,0.45) 40%, rgba(10,11,30,0.75) 100%)',
          }}
        />

        {/* Content */}
        <main
          id="entry-main"
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5 py-16 text-center"
        >
          {/* Brand mark */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/40">
                <BoltIcon />
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                60 Watts of Clarity
              </span>
            </motion.div>
          )}

          {/* Main headline */}
          {mounted && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl"
            >
              <motion.p
                variants={itemVariants}
                className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-5"
              >
                Ethical AI Education
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.05] mb-6"
              >
                Illuminating the Path{' '}
                <br className="hidden sm:block" />
                <span className="gradient-text-primary">to Ethical AI</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-14"
              >
                We train social workers and communities to navigate, understand,
                and shape artificial intelligence — with clarity, confidence, and ethics.
              </motion.p>

              {/* Choice cards */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
                role="group"
                aria-label="Choose how to explore 60 Watts of Clarity"
              >
                {/* Choice A — Full Website */}
                <motion.div
                  onHoverStart={() => setHoveredChoice('A')}
                  onHoverEnd={() => setHoveredChoice(null)}
                  whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`relative glass-card border transition-all duration-300 overflow-hidden cursor-pointer ${
                    hoveredChoice === 'A'
                      ? 'border-sky-400/60 shadow-2xl shadow-sky-500/20'
                      : 'border-white/15'
                  }`}
                >
                  {/* Glow bg */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 transition-opacity duration-300 ${hoveredChoice === 'A' ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.12) 0%, transparent 70%)' }}
                  />

                  <div className="relative z-10 p-7 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mb-4 text-sky-400">
                      <GlobeIcon />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">
                      Option A
                    </span>
                    <h2 className="text-white font-heading font-bold text-xl mb-3 leading-snug">
                      Explore Full Website
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Browse our framework, workshops, portfolio, intelligence library, and more.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate('/home')}
                      className="w-full px-6 py-3 rounded-xl bg-sky-400 text-[#0a0b1e] font-bold hover:bg-sky-300 active:bg-sky-500 transition-colors shadow-lg shadow-sky-400/30 cursor-pointer text-base focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b1e] focus-visible:outline-none"
                      aria-label="Explore the full 60 Watts of Clarity website"
                    >
                      Explore Website
                    </button>
                  </div>
                </motion.div>

                {/* Choice B — Snapshot + Chatbot */}
                <motion.div
                  onHoverStart={() => setHoveredChoice('B')}
                  onHoverEnd={() => setHoveredChoice(null)}
                  whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`relative glass-card border transition-all duration-300 overflow-hidden cursor-pointer ${
                    hoveredChoice === 'B'
                      ? 'border-amber-400/60 shadow-2xl shadow-amber-500/20'
                      : 'border-white/15'
                  }`}
                >
                  {/* Glow bg */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 transition-opacity duration-300 ${hoveredChoice === 'B' ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.10) 0%, transparent 70%)' }}
                  />

                  <div className="relative z-10 p-7 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-400">
                      <SnapIcon />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                      Option B
                    </span>
                    <h2 className="text-white font-heading font-bold text-xl mb-3 leading-snug">
                      Quick Overview + Chat
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Get a strategic snapshot and chat with our AI assistant Clara for instant answers.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate('/snapshot')}
                      className="w-full px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 active:bg-amber-500 transition-colors shadow-lg shadow-amber-400/30 cursor-pointer text-base focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b1e] focus-visible:outline-none"
                      aria-label="View strategic snapshot and chat with AI assistant"
                    >
                      Quick Overview
                    </button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Sub-text */}
              <motion.p
                variants={itemVariants}
                className="mt-10 text-sm text-slate-500"
              >
                You can always switch between views — it&apos;s the same great content.
              </motion.p>
            </motion.div>
          )}
        </main>

        {/* Scroll hint */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-slate-500 text-xs"
        >
          <div className="h-px w-12 bg-white/10" />
          {COMPANY.tagline}
          <div className="h-px w-12 bg-white/10" />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default EntryHero;
