// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCV6ltBz9siU993dlXud-pxGYc3028NP8E",
  authDomain: "coding-exercise-ddcf6.firebaseapp.com",
  projectId: "coding-exercise-ddcf6",
  storageBucket: "coding-exercise-ddcf6.firebasestorage.app",
  messagingSenderId: "770915735779",
  appId: "1:770915735779:web:c27d8c9582f49e863b8dd6",
  measurementId: "G-X0SC710QQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);