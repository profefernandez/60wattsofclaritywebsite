import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ChatBot from '../components/chatbot/ChatBot';
import AnimatedSection from '../components/ui/AnimatedSection';
import Button from '../components/ui/Button';
import { COMPANY, STATS, FRAMEWORK_PILLARS } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';

const ArrowLeftIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 5 5 12 12 19" />
  </svg>
);

const BoltIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M13 2L4.09 12.97A1 1 0 005 14.5h7v7.5l8.91-10.97A1 1 0 0020 9.5h-7V2z" />
  </svg>
);

/**
 * Strategic Snapshot + AI Chatbot page.
 * Provides a quick overview of the company and an interactive AI assistant.
 */
const SnapshotPage: React.FC = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Company Snapshot | 60 Watts of Clarity</title>
        <meta
          name="description"
          content="Get a quick strategic overview of 60 Watts of Clarity and chat with our AI assistant Clara to learn about programs and scheduling."
        />
      </Helmet>

      <a href="#snapshot-main" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0b1e]/95 backdrop-blur-md border-b border-white/10">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-white no-underline hover:opacity-90 transition-opacity"
              aria-label="60 Watts of Clarity home"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center">
                <BoltIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-heading font-bold text-sm text-sky-400">60 Watts of Clarity</span>
            </Link>

            <nav aria-label="Snapshot page navigation" className="flex items-center gap-3">
              <Link to="/home" className="no-underline">
                <Button variant="ghost" size="sm" icon={<ArrowLeftIcon />} iconPosition="left">
                  Full Website
                </Button>
              </Link>
              <Link to="/" className="no-underline">
                <Button variant="outline" size="sm">
                  Entry Page
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main id="snapshot-main" className="pt-16 min-h-screen hero-bg">
        <div className="section-container py-12">
          {/* Page header */}
          <AnimatedSection className="text-center mb-12">
            <span className="section-eyebrow">Strategic Snapshot</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              <span className="gradient-text-primary">60 Watts of Clarity</span>
              <br />
              <span className="text-slate-300 text-2xl sm:text-3xl font-normal">at a Glance</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {COMPANY.tagline}. Here&apos;s everything you need to know — or chat with Clara for personalized answers.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
            {/* Left: Snapshot content */}
            <div className="xl:col-span-3 space-y-8">
              {/* Mission */}
              <AnimatedSection>
                <div className="glass-card border border-sky-400/20 p-6">
                  <h2 className="text-lg font-heading font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" aria-hidden="true" />
                    Mission
                  </h2>
                  <p className="text-slate-300 leading-relaxed">{COMPANY.mission}</p>
                </div>
              </AnimatedSection>

              {/* Key stats */}
              <AnimatedSection delay={0.1}>
                <h2 className="text-lg font-heading font-bold text-white mb-4">
                  Impact Numbers
                </h2>
                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  role="list"
                  aria-label="Impact statistics"
                >
                  {STATS.map(({ value, label }, i) => (
                    <motion.div
                      key={label}
                      role="listitem"
                      initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="glass-card border border-white/10 p-4 text-center"
                    >
                      <p className="text-2xl font-heading font-bold gradient-text-primary mb-1">
                        {value}
                      </p>
                      <p className="text-xs text-slate-400">{label}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Framework quick view */}
              <AnimatedSection delay={0.2}>
                <h2 className="text-lg font-heading font-bold text-white mb-4">
                  The EEAEIE Framework
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {FRAMEWORK_PILLARS.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="glass-card border border-white/5 p-3 flex items-center gap-2"
                    >
                      <span className="text-xl flex-shrink-0" aria-hidden="true">{pillar.icon}</span>
                      <span className="text-sm text-white font-medium">{pillar.title}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* What we offer quick cards */}
              <AnimatedSection delay={0.3}>
                <h2 className="text-lg font-heading font-bold text-white mb-4">
                  What We Offer
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: '🎓',
                      title: 'Workshops & Training',
                      desc: '4 core programs from foundational to advanced leadership.',
                    },
                    {
                      icon: '📖',
                      title: 'Intelligence Library',
                      desc: '600+ ethical AI resources, free to access.',
                    },
                    {
                      icon: '🏗️',
                      title: 'EEAEIE Framework',
                      desc: 'Open-source ethical AI practice model.',
                    },
                    {
                      icon: '🤝',
                      title: 'Custom Partnerships',
                      desc: 'Bespoke curricula for your organization.',
                    },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="glass-card border border-white/10 p-4 flex gap-3">
                      <span className="text-2xl flex-shrink-0" aria-hidden="true">{icon}</span>
                      <div>
                        <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* CTA back to full website */}
              <AnimatedSection delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/home" className="no-underline flex-1">
                    <Button size="lg" className="w-full justify-center">
                      Explore Full Website
                    </Button>
                  </Link>
                  <Link to="/home#contact" className="no-underline flex-1">
                    <Button variant="outline" size="lg" className="w-full justify-center">
                      Contact Our Team
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: AI Chatbot */}
            <div className="xl:col-span-2">
              <AnimatedSection delay={0.15}>
                <div className="sticky top-24">
                  <h2 className="text-lg font-heading font-bold text-white mb-4">
                    Ask Clara — AI Assistant
                  </h2>
                  <div style={{ height: '580px' }}>
                    <ChatBot />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>

      {/* Footer mini */}
      <footer
        role="contentinfo"
        className="bg-[#08091a] border-t border-white/10 py-8"
      >
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <Link to="/home" className="no-underline">
            <Button variant="ghost" size="sm" icon={<ArrowLeftIcon />} iconPosition="left">
              Back to Full Website
            </Button>
          </Link>
        </div>
      </footer>
    </HelmetProvider>
  );
};

export default SnapshotPage;
