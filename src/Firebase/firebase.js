import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkrXcM-8lkCnXxnyGJLs-B5F0Xelpyphw",
  authDomain: "react-movies-course14.firebaseapp.com",
  databaseURL: "https://react-movies-course14-default-rtdb.firebaseio.com",
  projectId: "react-movies-course14",
  storageBucket: "react-movies-course14.appspot.com",
  messagingSenderId: "146274802064",
  appId: "1:146274802064:web:956576115330ea5e11bb15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
