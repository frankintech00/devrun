import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA76_i0w5jlFrO2O_GYD1FuZe8jyEmuJJM",
  authDomain: "fps-projects.firebaseapp.com",
  projectId: "fps-projects",
  storageBucket: "fps-projects.appspot.com",
  messagingSenderId: "83998329168",
  appId: "1:83998329168:web:6de470f0881c0692dbc455",
  measurementId: "G-RDMLS7729S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const db = getFirestore(app);
export const storage = getStorage(app);
