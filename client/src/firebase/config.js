import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// import { getAuth } from "firebase/auth";

//EMERSON
const firebaseConfig = {   
  apiKey: "AIzaSyDrBeSsX6DKFoa2ANGwT2S4W-0x9O_c1WE",
  authDomain: "starcardsv2.firebaseapp.com",
  projectId: "starcardsv2",
  storageBucket: "starcardsv2.appspot.com",
  messagingSenderId: "8752167324",
  appId: "1:8752167324:web:ac739bbe5a51bb069df059"
};

//FABIAN
// const firebaseConfig = {  
//   apiKey: "AIzaSyC0l4EJNVsyf8UzuheYQX-nw76pjO4cxhw",
//   authDomain: "starcards-361220.firebaseapp.com",
//   projectId: "starcards-361220",
//   storageBucket: "starcards-361220.appspot.com",
//   messagingSenderId: "832028799556",
//   appId: "1:832028799556:web:09693d9c9194bf0ab44211",
//   measurementId: "G-N4TJF3W2FX"
// };

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp)
// export const auth = getAuth(firebaseApp);

