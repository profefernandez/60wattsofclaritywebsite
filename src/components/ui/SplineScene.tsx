import React, { Suspense, lazy } from 'react';
import SplineErrorBoundary from './SplineErrorBoundary';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  url: string;
  ariaLabel?: string;
  className?: string;
  variant?: 'hero' | 'entry' | 'default';
}

/** Animated abstract 3D-style fallback using pure CSS + SVG */
const AbstractOrb: React.FC<{ variant?: 'hero' | 'entry' | 'default' }> = ({
  variant = 'default',
}) => {
  const colors =
    variant === 'entry'
      ? { primary: '#fbbf24', secondary: '#f87171', core: '#fbbf24' }
      : { primary: '#38bdf8', secondary: '#818cf8', core: '#38bdf8' };

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer atmospheric glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${colors.primary}18 0%, ${colors.secondary}10 40%, transparent 70%)`,
        }}
      />

      {/* Central orb */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        {/* Outer ring 1 */}
        <div
          className="absolute inset-0 rounded-full border opacity-20"
          style={{
            borderColor: colors.primary,
            animation: 'spin 20s linear infinite',
          }}
        />
        {/* Outer ring 2 — tilted */}
        <div
          className="absolute inset-4 rounded-full border opacity-15"
          style={{
            borderColor: colors.secondary,
            transform: 'rotate3d(1, 0, 0.5, 60deg)',
            animation: 'spin 14s linear infinite reverse',
          }}
        />
        {/* Middle orbit ring */}
        <div
          className="absolute inset-8 rounded-full border opacity-25"
          style={{
            borderColor: colors.primary,
            animation: 'spin 8s linear infinite',
          }}
        />
        {/* Inner pulsing sphere */}
        <div
          className="absolute inset-[30%] rounded-full"
          style={{
            background: `radial-gradient(ellipse at 35% 35%, ${colors.primary}cc, ${colors.secondary}88, ${colors.primary}44)`,
            boxShadow: `0 0 60px ${colors.primary}40, 0 0 120px ${colors.primary}20, inset 0 0 30px ${colors.secondary}30`,
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
        {/* Core bright point */}
        <div
          className="absolute inset-[44%] rounded-full"
          style={{
            background: `radial-gradient(circle, white 0%, ${colors.primary} 50%, transparent 100%)`,
            boxShadow: `0 0 20px ${colors.primary}80`,
          }}
        />

        {/* Orbiting particles */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full"
            style={{
              background: i % 2 === 0 ? colors.primary : colors.secondary,
              top: `${50 + 46 * Math.sin(((deg + 90) * Math.PI) / 180)}%`,
              left: `${50 + 46 * Math.cos(((deg + 90) * Math.PI) / 180)}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 8px ${i % 2 === 0 ? colors.primary : colors.secondary}`,
              animation: `float ${4 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
              opacity: 0.8,
            }}
          />
        ))}

        {/* Connection lines (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          {[0, 45, 90, 135].map((angle, i) => (
            <line
              key={i}
              x1={100 + 92 * Math.cos((angle * Math.PI) / 180)}
              y1={100 + 92 * Math.sin((angle * Math.PI) / 180)}
              x2={100 - 92 * Math.cos((angle * Math.PI) / 180)}
              y2={100 - 92 * Math.sin((angle * Math.PI) / 180)}
              stroke={colors.primary}
              strokeWidth="0.5"
            />
          ))}
          <circle cx="100" cy="100" r="40" stroke={colors.secondary} strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" stroke={colors.primary} strokeWidth="0.3" />
        </svg>
      </div>

      {/* Bottom label */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ color: colors.primary, opacity: 0.4 }}
      >
        <div className="h-px w-8" style={{ background: colors.primary }} />
        <span className="text-xs font-mono tracking-widest uppercase">60W</span>
        <div className="h-px w-8" style={{ background: colors.primary }} />
      </div>
    </div>
  );
};

/**
 * Spline 3D scene component with error boundary, lazy loading, and built-in fallback.
 * WCAG 2.1 SC 1.1.1 — Non-text Content: decorative 3D scenes use aria-hidden.
 */
const SplineScene: React.FC<SplineSceneProps> = ({
  url,
  ariaLabel,
  className = '',
  variant = 'default',
}) => {
  const fallback = <AbstractOrb variant={variant} />;

  return (
    <div
      className={`spline-container ${className}`}
      role="img"
      aria-label={ariaLabel ?? 'Decorative 3D illustration'}
    >
      <SplineErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <Spline scene={url} />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
};

export default SplineScene;
