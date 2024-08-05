
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo-jqVjQ1dIbH7RJ6Vknh9JCENaqHa1lw",
  authDomain: "royality-5e0da.firebaseapp.com",
  projectId: "royality-5e0da",
  storageBucket: "royality-5e0da.appspot.com",
  messagingSenderId: "431673746969",
  appId: "1:431673746969:web:2ad7ccf4040c6ed3012c88",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
