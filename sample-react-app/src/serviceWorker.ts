const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.\d+){0,2}\.\d+$/
    )
);

export function register(config?: {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
}) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(
      window.location.href
    ).pathname;
    if (publicUrl.startsWith('/')) {
      // The URL is relative, so we can use the default service worker path.
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          if (registration && registration.onupdatefound) {
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker == null) {
                return;
              }
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // At this point, the updated precached content has been fetched,
                    // but the previous service worker will still serve the older
                    // content until all clients are closed.
                    console.log(
                      'New content is available; please refresh.'
                    );
                    if (config && config.onUpdate) {
                      config.onUpdate(registration);
                    }
                  } else {
                    // At this point, everything has been precached.
                    console.log('Content is cached for offline use.');
                    if (config && config.onSuccess) {
                      config.onSuccess(registration);
                    }
                  }
                }
              };
            };
          }
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error);
        });
    }
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      })
      .catch((error) => {
        console.error('Error during service worker unregistration:', error);
      });
  }
}