import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXhFDEjIVDnZ7rL86ajheZ9Fp31Kc4D34",
  authDomain: "rm-social-12d95.firebaseapp.com",
  projectId: "rm-social-12d95",
  storageBucket: "rm-social-12d95.appspot.com",
  messagingSenderId: "437612281342",
  appId: "1:437612281342:web:84edbc68b06d81632c54af",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
