import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, firestore };
