// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "capstone-project-944c9.firebaseapp.com",
    projectId: "capstone-project-944c9",
    storageBucket: "capstone-project-944c9.appspot.com",
    messagingSenderId: "455661891383",
    appId: "1:455661891383:web:65bbc812478ffda076b4b2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
