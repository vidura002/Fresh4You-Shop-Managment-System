// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBcMHFQ0Zf1dFN-ywWkVkJoI6NsqyIPdq4",
  authDomain: "mern-estate-f3780.firebaseapp.com",
  projectId: "mern-estate-f3780",
  storageBucket: "mern-estate-f3780.appspot.com",
  messagingSenderId: "794187545086",
  appId: "1:794187545086:web:29a75b7e93ecba65f228af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);