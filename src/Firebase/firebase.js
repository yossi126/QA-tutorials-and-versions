// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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

export default app;
