import admin from "firebase-admin";
import path from "path";
import { readFileSync } from "fs";
const serviceAccountPath = path.resolve("./src/firebase/serviceAccountKey.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
export default admin;
//# sourceMappingURL=firebaseAdmin.js.map