// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDhhHH2tK4y5oB9__yqJd_3yFUyy7ls5CM",
  authDomain: "elxproperties.firebaseapp.com",
  databaseURL: "https://elxproperties-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "elxproperties",
  storageBucket: "elxproperties.appspot.com",
  messagingSenderId: "250975584396",
  appId: "1:250975584396:web:a68528b30098952a313ba9",
  measurementId: "G-PYYQLQ34JY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

export { db, auth, storage };





