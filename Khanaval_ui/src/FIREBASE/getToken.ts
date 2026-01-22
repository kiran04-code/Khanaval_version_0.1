import { messaging, getToken } from "./firebase";
import { isPushSupported } from "./isPushSupported";

// ✅ Make sure isPushSupported is imported or defined in same file
export const requestPushPermission = async (): Promise<string | null> => {
  try {
    if (!isPushSupported()) {
      console.warn("Push notifications not supported on this device/browser");
      return null;
    }

    if (Notification.permission === "granted") {
      console.log("Notification already granted");
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("User denied notifications");
        return null;
      }
    } else {
      console.log("Notifications are blocked by user");
      return null;
    }

    const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    if (!swRegistration.active) {
      console.error("Service worker not active yet");
      return null;
    }

    const fcmToken = await getToken(messaging, {
      vapidKey: "BDDHGefXMx5PWUhOiipmUKZAZTuhnX7cREPCce1tw3Yy-7WcG2GRc-LJPQCdCrr1ln4xgogAz9IStzVcoieMYP0",
      serviceWorkerRegistration: swRegistration,
    });

    console.log("FCM Token:", fcmToken);
    return fcmToken || null;
  } catch (err) {
    console.error("Error getting FCM token:", err);
    return null;
  }
};
