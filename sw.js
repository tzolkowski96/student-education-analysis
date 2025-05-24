// Service Worker for Progressive Web App functionality
// Version: 1.0

const CACHE_NAME = 'student-education-analysis-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/images/image_1.png',
    '/assets/images/image_2.png',
    '/assets/images/image_3.png',
    '/assets/images/image_4.png',
    '/assets/images/image_5.png',
    // Add more critical assets as needed
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Fira+Mono:wght@400;500&display=swap',
    'https://cdn.plot.ly/plotly-latest.min.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                
                // Clone the request because it's a one-time use stream
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(function(response) {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response because it's a one-time use stream
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(function() {
                    // Return offline page if available
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for offline form submissions
self.addEventListener('sync', function(event) {
    if (event.tag === 'prediction-sync') {
        event.waitUntil(
            // Handle offline prediction requests
            handleOfflinePredictions()
        );
    }
});

async function handleOfflinePredictions() {
    // Implementation for handling offline predictions
    // This would sync with server when connection is restored
    console.log('Handling offline prediction sync');
}

// Push notifications (future enhancement)
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        tag: 'education-analysis',
        actions: [
            {
                action: 'open',
                title: 'Open App'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Student Education Analysis', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
