import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../../data/content';

const BoltIcon: React.FC = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M13 2L4.09 12.97A1 1 0 005 14.5h7v7.5l8.91-10.97A1 1 0 0020 9.5h-7V2z" />
  </svg>
);

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', href: '/home#about' },
    { label: 'Our Framework', href: '/home#framework' },
    { label: 'Workshops', href: '/home#workshops' },
    { label: 'Portfolio', href: '/home#portfolio' },
  ],
  Resources: [
    { label: 'Intelligence Library', href: '/home#library' },
    { label: 'Strategic Snapshot', href: '/snapshot' },
    { label: 'AI Policy Navigator', href: '/home#library' },
    { label: 'Practitioner Toolkit', href: '/home#library' },
  ],
  Contact: [
    { label: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { label: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\D/g, '')}` },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      className="bg-[#08091a] border-t border-white/10 pt-16 pb-8"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-4 no-underline"
              aria-label="60 Watts of Clarity — home"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                <BoltIcon />
              </div>
              <span className="font-heading font-bold text-white">60 Watts of Clarity</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {COMPANY.tagline}. Ethical AI education for social workers and communities.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://twitter.com"
                aria-label="Follow us on Twitter (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors no-underline"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                aria-label="Connect on LinkedIn (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors no-underline"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                {section}
              </h3>
              <ul role="list" className="list-none m-0 p-0 space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    {href.startsWith('mailto') || href.startsWith('tel') ? (
                      <a
                        href={href}
                        className="text-slate-400 hover:text-sky-400 text-sm transition-colors no-underline"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className="text-slate-400 hover:text-sky-400 text-sm transition-colors no-underline"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/home" className="text-slate-500 hover:text-sky-400 text-sm transition-colors no-underline">
              Privacy Policy
            </Link>
            <Link to="/home" className="text-slate-500 hover:text-sky-400 text-sm transition-colors no-underline">
              Accessibility
            </Link>
            <span className="text-slate-600 text-xs flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-sky-400" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              WCAG 2.1 AAA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
