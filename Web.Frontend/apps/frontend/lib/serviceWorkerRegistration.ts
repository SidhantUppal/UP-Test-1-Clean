// Service Worker Registration for Safety Walks
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw-walks.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration.scope);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log('New service worker available, refresh to update');
                  
                  // Optionally show a notification to the user
                  if (window.confirm('A new version is available. Refresh to update?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

// Request notification permission for scheduled walks
export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
      }
    });
  }
}

// Check if app is offline
export function isOffline(): boolean {
  return !navigator.onLine;
}

// Listen for online/offline events
export function setupNetworkListeners() {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      console.log('Back online - syncing data...');
      // Trigger background sync
      if ('serviceWorker' in navigator && 'sync' in registration) {
        navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
          return registration.sync.register('sync-walk-data');
        });
      }
    });
    
    window.addEventListener('offline', () => {
      console.log('App is offline - data will be synced when connection is restored');
    });
  }
}

// Cache a specific walk template for offline use
export function cacheWalkTemplate(templateId: number) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_WALK_TEMPLATE',
      url: `/api/walks/templates/${templateId}`
    });
  }
}

interface WalkSession {
  sessionId: string;
  [key: string]: unknown;
}

// Get cached walk sessions from localStorage
export function getCachedWalkSessions(): WalkSession[] {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('walkSessions');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (error) {
        console.error('Failed to parse cached sessions:', error);
        return [];
      }
    }
  }
  return [];
}

// Save walk session to localStorage for offline access
export function cacheWalkSession(session: WalkSession) {
  if (typeof window !== 'undefined') {
    const sessions = getCachedWalkSessions();
    const index = sessions.findIndex((s: WalkSession) => s.sessionId === session.sessionId);
    
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    
    localStorage.setItem('walkSessions', JSON.stringify(sessions));
  }
}

// Check if service worker is supported and registered
export function isServiceWorkerReady(): Promise<boolean> {
  return new Promise((resolve) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    } else {
      resolve(false);
    }
  });
}

// Schedule a walk notification
export function scheduleWalkNotification(walkTitle: string, time: Date, walkId: number) {
  if ('Notification' in window && Notification.permission === 'granted') {
    // Calculate delay
    const delay = time.getTime() - Date.now();
    
    if (delay > 0) {
      setTimeout(() => {
        new Notification('Safety Walk Reminder', {
          body: `Time for: ${walkTitle}`,
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          tag: `walk-${walkId}`,
          requireInteraction: true,
          data: { walkId }
        });
      }, delay);
    }
  }
}