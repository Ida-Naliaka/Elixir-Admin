// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4bI7sHbL5kj1cDntQky5ktXeKxoF9WMc",
  authDomain: "ecommerce-app-4dae1.firebaseapp.com",
  projectId: "ecommerce-app-4dae1",
  storageBucket: "ecommerce-app-4dae1.appspot.com",
  messagingSenderId: "172744097021",
  appId: "1:172744097021:web:378504a23479a0364f5294",
  measurementId: "G-275LEK1P9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;