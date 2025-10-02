'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', {
      message: error.message,
      digest: error.digest,
      pathname,
      stack: error.stack,
    });
  }, [error, pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="card-title text-2xl font-bold justify-center">
            Oops! Something went wrong
          </h2>
          <p className="text-base-content/70 mb-4">
            We encountered an unexpected error. Please try again.
          </p>
          {error.digest && (
            <div className="text-xs text-base-content/50 mb-4">
              Error ID: {error.digest}
            </div>
          )}
          <div className="card-actions justify-center gap-2">
            <button
              className="btn btn-primary"
              onClick={() => reset()}
            >
              Try again
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => window.location.href = '/'}
            >
              Go home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}