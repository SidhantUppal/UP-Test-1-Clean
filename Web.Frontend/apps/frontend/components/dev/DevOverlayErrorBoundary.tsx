'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class DevOverlayErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('DevOverlay Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Silently fail - don't show error UI for dev overlay
      console.warn('DevOverlay disabled due to error:', this.state.error?.message);
      return null;
    }

    return this.props.children;
  }
}