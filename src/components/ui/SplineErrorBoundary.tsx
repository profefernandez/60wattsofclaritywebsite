import React from 'react';

interface SplineErrorBoundaryState {
  hasError: boolean;
}

interface SplineErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Error boundary for Spline 3D scenes.
 * Shows a graceful fallback when the Spline runtime fails to load
 * (e.g., network unavailable, blocked CDN).
 */
class SplineErrorBoundary extends React.Component<
  SplineErrorBoundaryProps,
  SplineErrorBoundaryState
> {
  constructor(props: SplineErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SplineErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default SplineErrorBoundary;
