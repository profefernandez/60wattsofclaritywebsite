import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import SplineScene from '../../components/ui/SplineScene';
import { COMPANY, STATS } from '../../data/content';
import { usePrefersReducedMotion } from '../../hooks/useScrollAnimation';

const ArrowIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const HERO_FEATURES = [
  'Ethical AI curriculum for social workers',
  'Community-centered, culturally responsive approach',
  'Open-source framework & intelligence library',
];

// Public Spline scene URL - brain/neural network theme
const SPLINE_HERO_URL = 'https://prod.spline.design/PiBCriVGRNBFwXCp/scene.splinecode';

// Pre-computed particle positions (avoids Math.random() during render)
const PARTICLES = [
  { w: 5.2, h: 5.2, top: 12, left: 23, delay: 1.2, dur: 7 },
  { w: 7.5, h: 7.5, top: 65, left: 8,  delay: 0.3, dur: 6 },
  { w: 4.0, h: 4.0, top: 33, left: 87, delay: 2.4, dur: 8 },
  { w: 8.8, h: 8.8, top: 78, left: 45, delay: 0.8, dur: 5 },
  { w: 5.5, h: 5.5, top: 10, left: 72, delay: 3.1, dur: 7 },
  { w: 6.1, h: 6.1, top: 50, left: 92, delay: 1.7, dur: 9 },
  { w: 4.4, h: 4.4, top: 88, left: 18, delay: 0.5, dur: 6 },
  { w: 7.0, h: 7.0, top: 42, left: 61, delay: 2.9, dur: 8 },
  { w: 5.8, h: 5.8, top: 22, left: 38, delay: 4.2, dur: 7 },
  { w: 9.2, h: 9.2, top: 71, left: 78, delay: 1.0, dur: 5 },
  { w: 4.7, h: 4.7, top: 55, left: 5,  delay: 3.6, dur: 9 },
  { w: 6.6, h: 6.6, top: 95, left: 55, delay: 0.1, dur: 6 },
];

const HeroSection: React.FC = () => {
  const reduceMotion = usePrefersReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      id="hero"
      aria-label="Hero — About 60 Watts of Clarity"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-bg"
    >
      {/* Background particles */}
      {!reduceMotion && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="particle-dot"
              style={{
                width: `${p.w}px`,
                height: `${p.h}px`,
                top: `${p.top}%`,
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col py-16"
          >
            <motion.div variants={itemVariants}>
              <span className="section-eyebrow">Ethical AI Education</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.05] mb-6"
            >
              <span className="text-white">Illuminating the</span>
              <br />
              <span className="gradient-text-primary">Path to Ethical AI</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-300 leading-relaxed mb-6 max-w-xl"
            >
              {COMPANY.mission}
            </motion.p>

            {/* Feature list */}
            <motion.ul
              variants={itemVariants}
              role="list"
              className="list-none m-0 p-0 space-y-2.5 mb-10"
            >
              {HERO_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/home#workshops" className="no-underline">
                <Button size="lg" icon={<ArrowIcon />} className="w-full sm:w-auto">
                  Explore Workshops
                </Button>
              </Link>
              <Link to="/snapshot" className="no-underline">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Quick Company Overview
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/10"
              role="list"
              aria-label="Company statistics"
            >
              {STATS.map(({ value, label }) => (
                <div key={label} role="listitem" className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-heading font-bold gradient-text-primary">
                    {value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Spline */}
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center h-[500px] xl:h-[600px]"
            aria-hidden="true"
          >
            {/* Glow behind scene */}
            <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-3xl scale-75" />
            <SplineScene
              url={SPLINE_HERO_URL}
              ariaLabel="3D neural network visualization representing AI connections"
              variant="hero"
              className="w-full h-full rounded-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-sky-400 opacity-80" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
