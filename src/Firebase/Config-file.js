// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9x4eA9em97oWpksWbdqp6JXzDubKQIZ8",
    authDomain: "news-projects-f55b6.firebaseapp.com",
    projectId: "news-projects-f55b6",
    storageBucket: "news-projects-f55b6.appspot.com",
    messagingSenderId: "541031019596",
    appId: "1:541031019596:web:d4edb58280d233bc8870e9",
    measurementId: "G-0977Q3FLPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const database = getFirestore(app);