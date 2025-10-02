'use client';

import { useEffect } from 'react';

export default function IncidentsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-800 mb-4">Error in Incidents Module</h2>
        <p className="text-red-600 mb-6">{error.message || 'Something went wrong loading incidents.'}</p>
        <button
          className="btn btn-primary"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}