import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/ui/PageTransition';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import FrameworkSection from './sections/FrameworkSection';
import WorkshopsSection from './sections/WorkshopsSection';
import PortfolioSection from './sections/PortfolioSection';
import LibrarySection from './sections/LibrarySection';
import ContactSection from './sections/ContactSection';

/**
 * Full website page — contains all major sections.
 * Dark cinematic aesthetic with Spline 3D elements.
 */
const FullWebsite: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>60 Watts of Clarity | Ethical AI Education for Social Workers</title>
        <meta
          name="description"
          content="60 Watts of Clarity trains social workers and communities for ethical AI. Explore our framework, workshops, portfolio, and intelligence library."
        />
      </Helmet>

      {/* Skip navigation — WCAG 2.4.1 */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <PageTransition>
        <main id="main-content">
          <HeroSection />

          <div className="section-divider" />
          <AboutSection />

          <div className="section-divider" />
          <FrameworkSection />

          <div className="section-divider" />
          <WorkshopsSection />

          <div className="section-divider" />
          <PortfolioSection />

          <div className="section-divider" />
          <LibrarySection />

          <div className="section-divider" />
          <ContactSection />
        </main>

        <Footer />
      </PageTransition>
    </HelmetProvider>
  );
};

export default FullWebsite;
