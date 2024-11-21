import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCr6uOQKSAUlo2bJNSmd_xyTEBSr1tpPO8",
  authDomain: "aitripplaner.firebaseapp.com",
  projectId: "aitripplaner",
  storageBucket: "aitripplaner.firebasestorage.app",
  messagingSenderId: "969839068166",
  appId: "1:969839068166:web:82812fe39c29ac37d2ef87",
  measurementId: "G-MP2ZFK7H7B"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
