/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBRS823rhYyDBS6ahSTt2HWNix2pUritGA",
  authDomain: "kahanaval-cf8a4.firebaseapp.com",
  projectId: "kahanaval-cf8a4",
  messagingSenderId: "1070988548217",
  appId: "1:1070988548217:web:56f227920ce9f72a6b9ca8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Received background message", payload);

  // ✅ HARD SAFETY (prevents ALL crashes)
  if (!payload || !payload.data || !payload.data.title) {
    console.warn("[SW] Invalid or empty payload, ignoring");
    return;
  }

  const title = payload.data.title;
  const body = payload.data.body || "You have a new message";

  self.registration.showNotification(title, {
    body,
    icon: "/logo.png",
    badge: "/badge.png",
    data: {
      url: payload.data.url || "/"
    }
  });
});
