import { getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Router, { useRouter } from "next/router";

//  Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCrDQB-Q-azf7CSp1g63-_u3dBdGgX09Zk",
  authDomain: "ventura-2-0.firebaseapp.com",
  projectId: "ventura-2-0",
  storageBucket: "ventura-2-0.appspot.com",
  messagingSenderId: "307487445108",
  appId: "1:307487445108:web:6ed9f88fa138e1c3eac121",
  measurementId: "G-TSRZ2QD49F",
};

const app = initializeApp({ ...firebaseConfig });
export default app;

const auth = getAuth(app);
auth.languageCode = "it";
// export const provider = new GoogleAuthProvider();

export { auth };

