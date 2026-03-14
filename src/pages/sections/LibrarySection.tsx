import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { LIBRARY_RESOURCES } from '../../data/content';
import { usePrefersReducedMotion } from '../../hooks/useScrollAnimation';

const LibrarySection: React.FC = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="library"
      aria-labelledby="library-heading"
      className="py-24 lg:py-32 bg-[#0d0e22] relative"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 80%, rgba(129,140,248,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Knowledge Hub</span>
          <h2
            id="library-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
          >
            60 Watts Intelligence{' '}
            <span className="gradient-text-primary">Library</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            A curated, ever-growing repository of ethical AI resources — designed to be
            freely accessible to practitioners, advocates, and communities.
          </p>
        </AnimatedSection>

        {/* Resource cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          role="list"
          aria-label="Library resources"
        >
          {LIBRARY_RESOURCES.map((resource, index) => (
            <motion.div
              key={resource.id}
              role="listitem"
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
              className="glass-card border border-white/10 hover:border-violet-400/30 p-6 transition-all duration-300 hover:translate-y-[-2px] group"
            >
              <div className="text-3xl mb-4" aria-hidden="true">
                {resource.icon}
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-white font-heading font-bold text-lg leading-snug">
                  {resource.title}
                </h3>
              </div>
              <span className="inline-block text-xs text-violet-400 bg-violet-400/10 border border-violet-400/30 px-2.5 py-1 rounded-full mb-3">
                {resource.type}
              </span>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {resource.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-full">
                  {resource.count}
                </span>
                <button
                  type="button"
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer group-hover:text-sky-400"
                  aria-label={`Browse ${resource.title}`}
                >
                  Browse
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Library CTA banner */}
        <AnimatedSection delay={0.3}>
          <div
            className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-center"
            style={{
              background:
                'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(129,140,248,0.1) 50%, rgba(251,191,36,0.08) 100%)',
              border: '1px solid rgba(56,189,248,0.2)',
            }}
          >
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-sky-400/10 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-violet-400/10 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Access the Full Library — Free
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Create a free account to unlock all 600+ resources, save favorites, and receive
                curated digest recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  className="px-8 py-4 rounded-lg bg-sky-400 text-[#0a0b1e] font-bold hover:bg-sky-300 transition-colors shadow-lg shadow-sky-400/25 cursor-pointer text-base"
                  aria-label="Create your free library account"
                >
                  Create Free Account
                </button>
                <button
                  type="button"
                  className="px-8 py-4 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors cursor-pointer text-base"
                  aria-label="Browse library without account"
                >
                  Browse Without Account
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LibrarySection;
