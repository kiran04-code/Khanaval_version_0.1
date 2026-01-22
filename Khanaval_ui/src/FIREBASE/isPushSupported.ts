// Check if push notifications are supported in this browser/device
export const isPushSupported = (): boolean => {
  return (
    "serviceWorker" in navigator && // Service workers must be supported
    "PushManager" in window &&      // Push API must be supported
    "Notification" in window         // Notifications API must be supported
  );
};
