
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   "projectId": "artisan-direct",
//   "appId": "1:246039021194:web:fe0a3b2ee02e406dd88f73",
//   "storageBucket": "artisan-direct.firebasestorage.app",
//   "apiKey": "AIzaSyBJNy9HhHaWD0xnsLzl9K8x-TY_e48ZtRg",
//   "authDomain": "artisan-direct.firebaseapp.com",
//   "measurementId": "",
//   "messagingSenderId": "246039021194"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAoWbSmXcNq5kwx9K1pb5vGATnEkUiWEdE",
  authDomain: "new-prototype-ocd9i.firebaseapp.com",
  projectId: "new-prototype-ocd9i",
  storageBucket: "new-prototype-ocd9i.firebasestorage.app",
  messagingSenderId: "640402609378",
  appId: "1:640402609378:web:c60da0030075891aebbabb"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log(db);
console.log(auth);

export { auth, db };
export default app