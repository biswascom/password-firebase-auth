// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhgYDpFD0wJWVxo6rY-5DWn8VDZIJM2Ys",
  authDomain: "password-firebase-auth.firebaseapp.com",
  projectId: "password-firebase-auth",
  storageBucket: "password-firebase-auth.appspot.com",
  messagingSenderId: "165886183794",
  appId: "1:165886183794:web:1c0510237d35919bde75eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;