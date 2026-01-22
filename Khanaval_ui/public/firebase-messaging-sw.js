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
  const title = payload.data?.title || "New Notification";
  const body = payload.data?.body || "You have a new message";

  self.registration.showNotification(title, {
    body,
    icon: "/logo.png",
    badge: "/badge.png",
    data: { url: payload.data?.url || "/" },
  });
});
