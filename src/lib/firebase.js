import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHpwHff4W8p0HFNMtbdgu4bPDeMoJeL9o",
  authDomain: "sketcher-1.firebaseapp.com",
  projectId: "sketcher-1",
  storageBucket: "sketcher-1.firebasestorage.app",
  messagingSenderId: "800871188964",
  appId: "1:800871188964:web:191632e017364732619ff1",
  measurementId: "G-HHWLL99VMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
