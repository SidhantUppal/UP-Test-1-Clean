import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
      <div className="text-center space-y-4">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-base-content">Loading...</p>
          <p className="text-sm text-base-content/60">Please wait while we prepare your content</p>
        </div>
        <div className="flex justify-center gap-1 mt-4">
          <span className="loading loading-dots loading-xs"></span>
        </div>
      </div>
    </div>
  );
}