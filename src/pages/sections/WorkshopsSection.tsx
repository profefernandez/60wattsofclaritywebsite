import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../../components/ui/AnimatedSection';
import Button from '../../components/ui/Button';
import { WORKSHOPS } from '../../data/content';
import { usePrefersReducedMotion } from '../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const LEVEL_COLORS: Record<string, string> = {
  Foundational: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  Intermediate: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
  Advanced: 'text-violet-400 bg-violet-400/10 border-violet-400/30',
  Community: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
};

const CalendarIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const WorkshopsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="workshops"
      aria-labelledby="workshops-heading"
      className="py-24 lg:py-32 bg-[#0d0e22]"
    >
      <div className="section-container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Training Programs</span>
          <h2
            id="workshops-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
          >
            Workshops &{' '}
            <span className="gradient-text-warm">Training</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Hands-on, practitioner-led learning experiences designed for every level — from curious beginners
            to organizational change leaders.
          </p>
        </AnimatedSection>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Available workshops"
        >
          {WORKSHOPS.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              role="listitem"
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
              className="glass-card border border-white/10 hover:border-sky-400/30 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${LEVEL_COLORS[workshop.level]}`}
                    >
                      {workshop.level}
                    </span>
                    <h3 className="text-white font-heading font-bold text-xl leading-snug">
                      {workshop.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {workshop.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <ClockIcon />
                    {workshop.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    {workshop.format}
                  </span>
                </div>

                {/* Topics toggle */}
                <button
                  type="button"
                  onClick={() => setActiveId(activeId === workshop.id ? null : workshop.id)}
                  className="text-sky-400 text-sm font-medium hover:text-sky-300 transition-colors cursor-pointer flex items-center gap-1"
                  aria-expanded={activeId === workshop.id}
                  aria-controls={`topics-${workshop.id}`}
                >
                  {activeId === workshop.id ? 'Hide topics' : 'View topics'}
                  <motion.span
                    animate={{ rotate: activeId === workshop.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    ▼
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeId === workshop.id && (
                    <motion.div
                      id={`topics-${workshop.id}`}
                      initial={reduceMotion ? {} : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reduceMotion ? {} : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-4"
                    >
                      <ul
                        role="list"
                        className="list-none m-0 p-0 grid grid-cols-2 gap-2"
                        aria-label={`${workshop.title} topics`}
                      >
                        {workshop.topics.map((topic) => (
                          <li
                            key={topic}
                            className="text-xs text-slate-300 bg-white/5 rounded-lg px-3 py-2 border border-white/5"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card footer */}
              <div className="px-6 py-4 border-t border-white/5 bg-white/2">
                <Link to="/snapshot" className="no-underline">
                  <Button size="sm" variant="outline" className="w-full justify-center">
                    Schedule This Workshop
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <p className="text-slate-400 mb-6">
            Need a custom training program? We build bespoke curricula for your organization.
          </p>
          <Link to="/snapshot" className="no-underline">
            <Button size="lg" icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }>
              Talk to Our Team
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WorkshopsSection;
