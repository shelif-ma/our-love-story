import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDsgm1cTaZLOPxtaA_lr1t_G1tTFUP4pnk",
  authDomain: "expense-tracker-62c53.firebaseapp.com",
  projectId: "expense-tracker-62c53",
  storageBucket: "expense-tracker-62c53.firebasestorage.app",
  messagingSenderId: "329080282609",
  appId: "1:329080282609:web:7ca3e3e2019dd62d0a3850",
  measurementId: "G-1C53V379SX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
