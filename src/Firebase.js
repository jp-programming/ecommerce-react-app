import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAiQYxq4-kEU09V0veOq7mT8e-bB5-W-U",
  authDomain: "ecommerce-react-app-7e624.firebaseapp.com",
  projectId: "ecommerce-react-app-7e624",
  storageBucket: "ecommerce-react-app-7e624.appspot.com",
  messagingSenderId: "468863093576",
  appId: "1:468863093576:web:3503c7baf52d7e8829817d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);