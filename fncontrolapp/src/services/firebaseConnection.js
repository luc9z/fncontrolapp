import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqo1NXjd76ZS-Zz5B_RN9ubwgdfJfuPsE",
  authDomain: "fncontrolapp.firebaseapp.com",
  projectId: "fncontrolapp",
  storageBucket: "fncontrolapp.appspot.com",
  messagingSenderId: "398319874891",
  appId: "1:398319874891:web:61a5b249f31bb94a18eece",
  measurementId: "G-7RN02F8LSF"
};

const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);