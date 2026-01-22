import admin from "./firebaseAdmin.js";
export const sendNotification = async (token, title, body) => {
    if (!token)
        return;
    try {
        await admin.messaging().send({
            token,
            data: {
                title,
                body,
                url: "/provider/menu"
            }
        });
    }
    catch (err) {
        console.error("FCM Error:", err.message);
    }
};
//# sourceMappingURL=SendNotification.js.map