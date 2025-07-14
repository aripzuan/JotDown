// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCb9mlDQ1_PByaEKWvAtB_GAJFfa_FBog",
  authDomain: "backend-ed793.firebaseapp.com",
  projectId: "backend-ed793",
  storageBucket: "backend-ed793.firebasestorage.app",
  messagingSenderId: "877689698013",
  appId: "1:877689698013:web:f269642ebb984d386e8d34"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
