import React from 'react';
import { motion } from 'framer-motion';
import { useInView, usePrefersReducedMotion } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

/**
 * Wrapper that fades children in when they enter the viewport.
 * Respects prefers-reduced-motion for WCAG 2.1 SC 2.3.3 (AAA).
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  id,
}) => {
  const { ref, isInView } = useInView();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
