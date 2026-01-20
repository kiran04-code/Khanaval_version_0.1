// import admin from "./firebaseAdmin.js";

// export const sendNotification = async (
//   token: string,
//   title: string,
//   body: string
// ) => {
//   if (!token) return;

//   try {
//     await admin.messaging().send({
//       // token,
//       data: {
//         title,
//         body,
//         url: "/provider/menu"
//       }
//     });
//   } catch (err: any) {
//     console.error("FCM Error:", err.message);
//   }
// };
