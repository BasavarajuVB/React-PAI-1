// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9yWFh-28o5F4D7wQPPAFeJAfJrVK5RD0",
  authDomain: "react-photo-gallery-b293b.firebaseapp.com",
  databaseURL: "https://react-photo-gallery-b293b-default-rtdb.firebaseio.com",
  projectId: "react-photo-gallery-b293b",
  storageBucket: "react-photo-gallery-b293b.firebasestorage.app",
  messagingSenderId: "1026751929168",
  appId: "1:1026751929168:web:741e4e8e0050b30a2c6a55",
  measurementId: "G-NQTL163PB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;
