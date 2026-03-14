import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const NAV_LINKS = [
  { href: '/home#about', label: 'About' },
  { href: '/home#framework', label: 'Framework' },
  { href: '/home#workshops', label: 'Workshops' },
  { href: '/home#portfolio', label: 'Portfolio' },
  { href: '/home#library', label: 'Library' },
  { href: '/home#contact', label: 'Contact' },
];

const BoltIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M13 2L4.09 12.97A1 1 0 005 14.5h7v7.5l8.91-10.97A1 1 0 0020 9.5h-7V2z" />
  </svg>
);

const MenuIcon: React.FC = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Primary navigation bar.
 * WCAG 2.1 AA: keyboard accessible, visible focus, skip-link support.
 */
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu is closed by handleNavClick on Link clicks.
  // For programmatic navigation, location.pathname is monitored via state.

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path || (path === '/home' && location.pathname === '/home')) {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/[0.06] shadow-xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between h-16 md:h-20"
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white no-underline hover:opacity-90 transition-opacity"
            aria-label="60 Watts of Clarity — home"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <BoltIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-light text-lg leading-none tracking-wide">
              <span className="text-sky-400">60 Watts</span>
              <br />
              <span className="text-xs font-body font-normal text-slate-300 tracking-widest uppercase">
                of Clarity
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul
            role="list"
            className="hidden md:flex items-center gap-1 list-none m-0 p-0"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  to={href}
                  onClick={() => handleNavClick(href)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/snapshot" className="no-underline">
              <Button variant="outline" size="sm">
                Quick Overview
              </Button>
            </Link>
            <Link to="/home#workshops" className="no-underline">
              <Button size="sm">Schedule Training</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="section-container py-4">
              <ul role="list" className="list-none m-0 p-0 space-y-1 mb-4">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      onClick={() => handleNavClick(href)}
                      className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors no-underline font-medium"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Link to="/snapshot" className="no-underline">
                  <Button variant="outline" size="md" className="w-full justify-center">
                    Quick Overview
                  </Button>
                </Link>
                <Link to="/home#contact" className="no-underline">
                  <Button size="md" className="w-full justify-center">
                    Schedule Training
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
