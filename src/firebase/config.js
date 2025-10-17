import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYBfwjw2FUYBbf33rJaW_wWayzk1IgX5w",
    authDomain: "retirei.firebaseapp.com",
    projectId: "retirei",
    storageBucket: "retirei.firebasestorage.app",
    messagingSenderId: "180803055027",
    appId: "1:180803055027:web:9fea1c5ed866cc94ba6fc6",
    measurementId: "G-1CHSWTHQP5"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
export const db = getFirestore(app);