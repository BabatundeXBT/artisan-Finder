// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
