import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1-7RaJkZfVoDiyHrbMcWHPV22PGBgrj0",
  authDomain: "assignment-46bee.firebaseapp.com",
  projectId: "assignment-46bee",
  storageBucket: "assignment-46bee.appspot.com",
  messagingSenderId: "401993038733",
  appId: "1:401993038733:ios:79c43ae29a09789284dbc4",
  measurementId: "G-YEJX4F991Q",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { db, storage };
