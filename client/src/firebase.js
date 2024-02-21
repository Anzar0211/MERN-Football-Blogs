// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-football-blog.firebaseapp.com",
  projectId: "mern-football-blog",
  storageBucket: "mern-football-blog.appspot.com",
  messagingSenderId: "522324796636",
  appId: "1:522324796636:web:a5e6f06a5d3fbe1c100019"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);