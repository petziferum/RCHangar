import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGwO2YDTyZFJsiZlWgfgaqkXYUqCgHsHc",
  authDomain: "hangar-7334.firebaseapp.com",
  projectId: "hangar-7334",
  storageBucket: "hangar-7334.appspot.com",
  messagingSenderId: "599803437234",
  appId: "1:599803437234:web:9f1e65e4944f3579d8e9ab",
  measurementId: "G-WGCYMBND6Q",
};

const firebaseApp = initializeApp(firebaseConfig);
const fireStore = getFirestore(firebaseApp);
const fireBucket = getStorage(firebaseApp);
const fireAuth = getAuth(firebaseApp);

export { fireStore, fireBucket, fireAuth };
export default firebaseApp;
