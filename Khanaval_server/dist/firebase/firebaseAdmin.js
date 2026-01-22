import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };
console.log("🔥 Initializing Firebase Admin...");
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
console.log("✅ Firebase Admin Apps:", admin.apps.length);
export default admin;
//# sourceMappingURL=firebaseAdmin.js.map