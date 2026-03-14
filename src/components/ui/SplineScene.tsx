import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  url: string;
  ariaLabel?: string;
  className?: string;
  fallback?: React.ReactNode;
}

const DefaultFallback: React.FC = () => (
  <div
    className="w-full h-full flex items-center justify-center"
    aria-hidden="true"
  >
    {/* Animated placeholder representing a 3D scene loading */}
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-sky-400/20 animate-pulse" />
      {/* Middle ring */}
      <div
        className="absolute inset-4 rounded-full border border-sky-400/30"
        style={{ animation: 'spin 4s linear infinite' }}
      />
      {/* Inner ring */}
      <div
        className="absolute inset-8 rounded-full border border-amber-400/30"
        style={{ animation: 'spin 2s linear infinite reverse' }}
      />
      {/* Core glow */}
      <div className="absolute inset-[40%] rounded-full bg-sky-400/40 blur-sm" />
      {/* Floating dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-sky-400/60"
          style={{
            top: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
            left: `${50 + 42 * Math.cos((deg * Math.PI) / 180)}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  </div>
);

/**
 * Spline 3D scene component with lazy loading and accessible fallback.
 * WCAG 2.1 SC 1.1.1 — Non-text Content: decorative 3D scenes use aria-hidden.
 */
const SplineScene: React.FC<SplineSceneProps> = ({
  url,
  ariaLabel,
  className = '',
  fallback,
}) => {
  return (
    <div
      className={`spline-container ${className}`}
      role="img"
      aria-label={ariaLabel ?? 'Decorative 3D illustration'}
    >
      <Suspense fallback={fallback ?? <DefaultFallback />}>
        <Spline scene={url} />
      </Suspense>
    </div>
  );
};

export default SplineScene;
