// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "artisan-direct",
  "appId": "1:246039021194:web:fe0a3b2ee02e406dd88f73",
  "storageBucket": "artisan-direct.firebasestorage.app",
  "apiKey": "AIzaSyBJNy9HhHaWD0xnsLzl9K8x-TY_e48ZtRg",
  "authDomain": "artisan-direct.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "246039021194"
};

// Initialize Firebase for SSR
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db };
