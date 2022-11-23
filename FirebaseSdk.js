import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyDF7AHsY68P45PXsF6W2NurfnfylI-N_sU",
  
    authDomain: "alpha-platform-30502.firebaseapp.com",
  
    projectId: "alpha-platform-30502",
  
    storageBucket: "alpha-platform-30502.appspot.com",
  
    messagingSenderId: "347120858325",
  
    appId: "1:347120858325:web:f2fd84d88f952685511e5c",
  
    measurementId: "G-CV0H47TQ74"
  
  };
  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);