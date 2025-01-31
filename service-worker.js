// service-worker.js
self.addEventListener('push', function (event) {
    const data = event.data.json();
    const options = {
        body: data.body || "Tienes una nueva notificación",
    };
    const title = data.title || "Notificación";
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
