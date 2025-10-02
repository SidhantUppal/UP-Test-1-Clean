/**
 * Initialize permission sync service on app startup
 * This can be imported in your app's root layout or custom _app file
 */

import { getPermissionSyncService } from './permission-sync-service';

let initialized = false;

export function initializePermissionSync() {
  if (initialized || typeof window === 'undefined') {
    return;
  }

  initialized = true;

  // Only run in development
  if (process.env.NODE_ENV !== 'development') {
    console.log('Permission sync service disabled in production');
    return;
  }

  const syncService = getPermissionSyncService();

  // Start auto-sync with 5 minute interval
  syncService.startAutoSync(5 * 60 * 1000);

  // Run initial sync
  syncService.syncAll().then(status => {
    console.log('Initial permission sync completed:', {
      modules: status.totalModules,
      pages: status.totalPages,
      elements: status.totalElements
    });
  });

  // Handle page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      // Sync when user returns to the page
      syncService.syncAll();
    }
  });

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    syncService.stopAutoSync();
  });

  console.log('Permission sync service initialized');
}