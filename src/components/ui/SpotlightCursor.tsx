import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/useScrollAnimation';

/**
 * Mouse-tracking spotlight effect.
 * Renders a soft ambient glow that follows the cursor.
 * Hidden when prefers-reduced-motion is active.
 * Uses requestAnimationFrame for smooth 60fps tracking.
 */
const SpotlightCursor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return <div ref={ref} className="spotlight-cursor" aria-hidden="true" />;
};

export default SpotlightCursor;
