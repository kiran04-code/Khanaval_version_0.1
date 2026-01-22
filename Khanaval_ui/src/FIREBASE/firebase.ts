// firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {

    apiKey: "AIzaSyBRS823rhYyDBS6ahSTt2HWNix2pUritGA",

    authDomain: "kahanaval-cf8a4.firebaseapp.com",

    projectId: "kahanaval-cf8a4",

    storageBucket: "kahanaval-cf8a4.firebasestorage.app",

    messagingSenderId: "1070988548217",

    appId: "1:1070988548217:web:56f227920ce9f72a6b9ca8",

    measurementId: "G-2DJRLBSY1L"

};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken };
