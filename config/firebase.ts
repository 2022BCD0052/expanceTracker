import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_4Z-Pn9us2c1kBelbBG-mjZlchfb2slQ",
  authDomain: "expanse-tracker-8ad6c.firebaseapp.com",
  projectId: "expanse-tracker-8ad6c",
  storageBucket: "expanse-tracker-8ad6c.firebasestorage.app",
  messagingSenderId: "1058140130799",
  appId: "1:1058140130799:web:80a7921c1bf648916aba1a",
  measurementId: "G-4180T5X0J5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, firestore };
