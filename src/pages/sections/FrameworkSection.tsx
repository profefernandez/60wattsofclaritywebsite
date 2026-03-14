import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { FRAMEWORK_PILLARS } from '../../data/content';
import { usePrefersReducedMotion } from '../../hooks/useScrollAnimation';

const colorVariants: Record<string, string> = {
  primary: 'border-sky-400/40 hover:border-sky-400 bg-sky-400/5 hover:bg-sky-400/10',
  secondary: 'border-amber-400/40 hover:border-amber-400 bg-amber-400/5 hover:bg-amber-400/10',
  green: 'border-emerald-400/40 hover:border-emerald-400 bg-emerald-400/5 hover:bg-emerald-400/10',
  warm: 'border-rose-400/40 hover:border-rose-400 bg-rose-400/5 hover:bg-rose-400/10',
};

const FrameworkSection: React.FC = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="framework"
      aria-labelledby="framework-heading"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Background radial gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Our Approach</span>
          <h2
            id="framework-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-white mb-4 tracking-tight"
          >
            The EEAEIE{' '}
            <span className="gradient-text-primary">Framework</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            A six-pillar, full-cycle model for ethical AI practice in community and organizational settings.
            Built by and for human services professionals.
          </p>
        </AnimatedSection>

        {/* Pillars grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Framework pillars"
        >
          {FRAMEWORK_PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              role="listitem"
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
              whileHover={reduceMotion ? {} : { y: -4 }}
              className={`glass-card p-6 border transition-all duration-300 ${colorVariants[pillar.color]}`}
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center text-xl">
                  {pillar.icon}
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {String(pillar.id).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-white font-heading font-medium text-xl mb-2 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Framework overview callout */}
        <AnimatedSection delay={0.4} className="mt-16">
          <div className="glass-card p-8 md:p-10 border border-sky-400/20 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-sky-400" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-sky-400 font-semibold text-sm uppercase tracking-widest">
                Open Source
              </span>
            </div>
            <h3 className="text-xl font-heading font-medium text-white mb-3 tracking-tight">
              Free for Human Services Organizations
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              The EEAEIE Framework is available at no cost to non-profits, social work agencies, and community organizations.
              Download the full implementation guide and start your ethical AI journey today.
            </p>
            <button
              className="mt-6 px-6 py-2.5 rounded-lg border border-sky-400/40 text-sky-400 hover:bg-sky-400/10 transition-colors font-medium text-sm cursor-pointer"
              type="button"
              aria-label="Download the EEAEIE Framework guide (PDF)"
            >
              Download Framework Guide
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FrameworkSection;
