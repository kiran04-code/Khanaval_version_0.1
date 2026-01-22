import admin from "firebase-admin";

// Define a helper to get credentials safely
const getCredentials = () => {
  // If we are in production (Vercel/Render/etc), use Environment Variables
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }

  // If we are local, try to require the file
  try {
    return require("./serviceAccountKey.json");
  } catch (error) {
    console.error("Firebase Service Account key missing!");
    return null;
  }
};

const serviceAccount = getCredentials();

if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export default admin;