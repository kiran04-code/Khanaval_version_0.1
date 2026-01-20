import { messaging, getToken } from "./firebase";

export const requestPushPermission = async (): Promise<string | null> => {
  try {
    // Ask permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("User denied notifications");
      return null;
    }

    // Register the service worker first
    const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

    // Make sure registration is active
    if (!swRegistration.active) {
      console.error("Service worker not active yet");
      return null;
    }

    // Get FCM token
    const fcmToken = await getToken(messaging, {
      vapidKey: "BDDHGefXMx5PWUhOiipmUKZAZTuhnX7cREPCce1tw3Yy-7WcG2GRc-LJPQCdCrr1ln4xgogAz9IStzVcoieMYP0",
      serviceWorkerRegistration: swRegistration,
    });
    console.log(fcmToken)
    return fcmToken || null;
  } catch (err) {
    console.error("Error getting FCM token:", err);
    return null;
  }
};
