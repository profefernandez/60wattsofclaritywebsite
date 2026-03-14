import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { PORTFOLIO_ITEMS } from '../../data/content';
import { usePrefersReducedMotion } from '../../hooks/useScrollAnimation';

const CATEGORIES = ['All', 'Research & Advocacy', 'Training', 'Framework', 'Community Engagement'];

const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const reduceMotion = usePrefersReducedMotion();

  const filtered =
    activeCategory === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-24 lg:py-32 bg-[#0a0b1e] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10">
          <span className="section-eyebrow">Our Work</span>
          <h2
            id="portfolio-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
          >
            Impact{' '}
            <span className="gradient-text-warm">Portfolio</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Real-world projects where ethical AI education created measurable, lasting change.
          </p>
        </AnimatedSection>

        {/* Category filter */}
        <div
          role="group"
          aria-label="Filter portfolio by category"
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-sky-400 text-[#0a0b1e] border-sky-400 shadow-lg shadow-sky-400/25'
                  : 'bg-transparent text-slate-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Portfolio items"
          aria-live="polite"
          aria-atomic="false"
        >
          {filtered.map((item, index) => (
            <motion.article
              key={item.id}
              role="listitem"
              layout
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.08 }}
              className="glass-card border border-white/10 hover:border-amber-400/30 p-6 transition-all duration-300 hover:translate-y-[-2px]"
              aria-label={`${item.title} — ${item.category}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500">{item.year}</span>
                  </div>
                  <h3 className="text-white font-heading font-bold text-xl">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Outcome */}
              <div className="p-4 rounded-lg bg-emerald-400/5 border border-emerald-400/20 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Outcome</span>
                </div>
                <p className="text-sm text-emerald-300">{item.outcome}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p role="status" className="text-center text-slate-400 py-16">
            No portfolio items in this category yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
