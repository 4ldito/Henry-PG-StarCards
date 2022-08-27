// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrBeSsX6DKFoa2ANGwT2S4W-0x9O_c1WE",
  authDomain: "starcardsv2.firebaseapp.com",
  projectId: "starcardsv2",
  storageBucket: "starcardsv2.appspot.com",
  messagingSenderId: "8752167324",
  appId: "1:8752167324:web:ac739bbe5a51bb069df059"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp)
