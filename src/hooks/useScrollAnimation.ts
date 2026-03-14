import { useEffect, useState, useSyncExternalStore } from 'react';

/**
 * Hook to detect if an element is in the viewport for scroll-triggered animations.
 */
export function useInView(threshold = 0.15) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isInView };
}

/**
 * Hook to detect reduced motion preference using useSyncExternalStore.
 * WCAG 2.1 SC 2.3.3 — Animation from Interactions (AAA)
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}
