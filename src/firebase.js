// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgTAjItJrbosiN78GpqZFoK3lj2yUiIqY",
  authDomain: "instagramclonedif.firebaseapp.com",
  projectId: "instagramclonedif",
  storageBucket: "instagramclonedif.appspot.com", // ✅ FIXED HERE
  messagingSenderId: "1093723267308",
  appId: "1:1093723267308:web:c69eb0eab746df899245c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
