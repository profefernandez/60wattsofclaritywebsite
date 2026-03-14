import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useScrollAnimation';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-sky-400 text-[#0a0b1e] hover:bg-sky-300 active:bg-sky-500 shadow-lg shadow-sky-400/25 font-bold',
  secondary:
    'bg-amber-400 text-slate-900 hover:bg-amber-300 active:bg-amber-500 shadow-lg shadow-amber-400/25',
  outline:
    'bg-transparent text-sky-400 border-2 border-sky-400 hover:bg-sky-400/10 active:bg-sky-400/20',
  ghost:
    'bg-transparent text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

/**
 * Accessible, animated CTA button component.
 * - Uses <button> element (required by spec)
 * - WCAG 2.1 AA: 4.5:1+ contrast ratios for all variants on dark bg
 * - Focus visible ring for keyboard navigation (WCAG 2.4.7)
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const reduceMotion = usePrefersReducedMotion();

  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b1e] disabled:opacity-50 disabled:cursor-not-allowed';

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled && !reduceMotion ? { scale: 1.03, y: -1 } : undefined}
      whileTap={!isDisabled && !reduceMotion ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.15 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...(rest as object)}
    >
      {loading ? (
        <>
          <span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="flex-shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="flex-shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
