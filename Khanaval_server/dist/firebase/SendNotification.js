import admin from "./firebaseAdmin.js";
export const sendNotification = async (token, title, body) => {
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
    }
    catch (err) {
        console.error("FCM Error:", err.message, err.code);
    }
};
//# sourceMappingURL=SendNotification.js.map