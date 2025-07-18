// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyA52cqKhIVtbosIHHjvP8TZ3DQ1jBynuew",
  authDomain: "classic-vantage.firebaseapp.com",
  projectId: "classic-vantage",
  storageBucket: "classic-vantage.appspot.com",
  messagingSenderId: "85284573310",
  appId: "1:85284573310:web:1c9388fc2c61f93e0f082f",
  measurementId: "G-SY19MSEEHK"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Services
const db = getFirestore(app);
const storage = getStorage(app); // ✅ This line

// ✅ Export services
export { db, storage }; // ✅ Export both
