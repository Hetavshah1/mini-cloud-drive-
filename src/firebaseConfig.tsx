// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeiTX6pSnq78FQZljM5UjCV5iGlL2mEss",
  authDomain: "mini-cloud-drive-2-a0392.firebaseapp.com",
  projectId: "mini-cloud-drive-2-a0392",
  storageBucket: "mini-cloud-drive-2-a0392.firebasestorage.app",
  messagingSenderId: "70787041032",
  appId: "1:70787041032:web:4d8462ee94ee81bafbcebd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
