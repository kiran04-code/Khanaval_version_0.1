import admin from "./firebaseAdmin.js";

export const sendNotification = async (token: string, title: string, body: string) => {
  if (!token || typeof token !== "string") {
    console.error("Invalid FCM token:", token);
    return;
  }

  try {
    await admin.messaging().send({
      token,
      notification: { title, body },
      data: { url: "/provider/menu" }
    });
    console.log("FCM sent to:", token);
  } catch (err: any) {
    console.error("FCM Error:", err.message, err.code);
  }
};
