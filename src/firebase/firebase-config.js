import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVih0wJBodnJtuwJy3HjBZ6TNjXeOinho",
  authDomain: "jumibot-863e8.firebaseapp.com",
  projectId: "jumibot-863e8",
  storageBucket: "jumibot-863e8.firebasestorage.app",
  messagingSenderId: "778496598172",
  appId: "1:778496598172:web:1b8201720878e32b144d59",
  measurementId: "G-FH3WJFFPW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()