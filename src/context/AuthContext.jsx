import { createContext, useState, useEffect } from "react";

import { auth } from "../services/firebase.js";
import { db } from "../services/firebase.js";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  async function signUp(email, password) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        await addUserToFirestore(user);
      }
    } catch (error) {
      console.error(error.code);
      console.error(error);
    }
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      if (user) {
        setUser(user);
        await addUserToFirestore(user);
      }
    } catch (error) {
      console.error(error.code);
      console.error(error);
    }
  }

  async function signIn(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        await addUserToFirestore(user);
      }
    } catch (error) {
      console.error(error.code);
      console.error(error);
    }
  }

  async function addUserToFirestore(user) {
    const userRef = doc(db, "Users", user.uid);
    const userObj = {
      userID: user.uid,
      email: user.email,
      name: user.displayName || "Anonymous",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      favourites: [],
      shoppingBasket: [],
    };
    await setDoc(userRef, userObj);
  }

  async function signOutUser() {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const providerValue = {
    signUp,
    signIn,
    signInWithGoogle,
    signOutUser,
    user,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
