import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useScrollAnimation';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wraps page content with a smooth Framer Motion fade-in transition.
 * Respects prefers-reduced-motion for WCAG compliance.
 */
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="page-transition"
      initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? {} : { opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
