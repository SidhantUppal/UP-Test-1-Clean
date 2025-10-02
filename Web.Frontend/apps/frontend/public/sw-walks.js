// Service Worker for Safety Walks - Offline Support
const CACHE_NAME = 'safety-walks-v1';
const DYNAMIC_CACHE = 'safety-walks-dynamic-v1';

// Resources to cache for offline use
const urlsToCache = [
  '/incidents/behaviour/walks',
  '/incidents/behaviour/walks/templates',
  '/incidents/behaviour/walks/builder',
  // Add walk execution paths dynamically
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Failed to cache:', error);
      })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // Claim all clients
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle walk-related API calls
  if (url.pathname.startsWith('/api/walks')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const responseToCache = response.clone();
          
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          
          return response;
        })
        .catch(() => {
          // If offline, try to serve from cache
          return caches.match(request).then((response) => {
            if (response) {
              console.log('[Service Worker] Serving from cache:', request.url);
              return response;
            }
            
            // Return a fallback response for API calls
            return new Response(
              JSON.stringify({
                error: 'Offline',
                message: 'This feature is not available offline'
              }),
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
              }
            );
          });
        })
    );
    return;
  }

  // Handle walk execution pages
  if (url.pathname.startsWith('/incidents/behaviour/walks/execute')) {
    event.respondWith(
      caches.match('/incidents/behaviour/walks/execute/[id]/page')
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
            return response;
          });
        })
        .catch(() => {
          // Return offline page if available
          return caches.match('/offline.html');
        })
    );
    return;
  }

  // Network-first strategy for HTML pages
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            if (response) {
              return response;
            }
            // Return offline page
            return caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // Cache-first strategy for assets (CSS, JS, images)
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }
      
      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        const responseToCache = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseToCache);
        });
        
        return response;
      });
    })
  );
});

// Background sync for walk data
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-walk-data') {
    event.waitUntil(syncWalkData());
  }
});

// Sync walk data when back online
async function syncWalkData() {
  try {
    // Get pending walk sessions from IndexedDB or localStorage
    const pendingSessions = await getPendingWalkSessions();
    
    for (const session of pendingSessions) {
      try {
        const response = await fetch('/api/walks/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(session)
        });
        
        if (response.ok) {
          // Remove synced session from pending
          await removePendingSession(session.sessionId);
          console.log('[Service Worker] Synced session:', session.sessionId);
        }
      } catch (error) {
        console.error('[Service Worker] Failed to sync session:', session.sessionId, error);
      }
    }
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

// Helper functions for IndexedDB operations
async function getPendingWalkSessions() {
  // This would interact with IndexedDB to get pending sessions
  // For now, return empty array
  return [];
}

async function removePendingSession(sessionId) {
  // Remove session from IndexedDB
  console.log('[Service Worker] Removing synced session:', sessionId);
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CACHE_WALK_TEMPLATE') {
    caches.open(DYNAMIC_CACHE).then((cache) => {
      cache.add(event.data.url);
    });
  }
});

// Push notifications for scheduled walks
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received');
  
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  
  const options = {
    body: data.body || 'You have a scheduled safety walk',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      walkId: data.walkId
    },
    actions: [
      {
        action: 'start',
        title: 'Start Walk',
        icon: '/images/checkmark.png'
      },
      {
        action: 'snooze',
        title: 'Snooze',
        icon: '/images/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Safety Walk Reminder', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'start') {
    // Open walk execution page
    event.waitUntil(
      clients.openWindow(`/incidents/behaviour/walks/execute/${event.notification.data.walkId}`)
    );
  } else if (event.action === 'snooze') {
    // Schedule reminder for 15 minutes later
    // This would interact with the notification API
    console.log('[Service Worker] Walk snoozed');
  } else {
    // Open walks dashboard
    event.waitUntil(
      clients.openWindow('/incidents/behaviour/walks')
    );
  }
});