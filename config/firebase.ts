// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth,getReactNativePersistence} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
// Your in app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_4Z-Pn9us2c1kBelbBG-mjZlchfb2slQ",
  authDomain: "expanse-tracker-8ad6c.firebaseapp.com",
  projectId: "expanse-tracker-8ad6c",
  storageBucket: "expanse-tracker-8ad6c.firebasestorage.app",
  messagingSenderId: "1058140130799",
  appId: "1:1058140130799:web:80a7921c1bf648916aba1a",
  measurementId: "G-4180T5X0J5"
};


// Initialize Firebase Auth

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
export const auth = initializeAuth(app,{

    persistence:getReactNativePersistence(AsyncStorage)})
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

