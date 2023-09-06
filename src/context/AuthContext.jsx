import { createContext, useState, useEffect } from "react";

import { auth } from "../services/firebase.js";

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

  async function signUp(email, password, confirmPassword) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        console.log(user);
        console.log(isLoggedIn);
        console.log("sign up successful");
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
      setUser(user);
      console.log("User Signed In with Google successfully.");
      console.log({ user });
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
        console.log(user);
        console.log(isLoggedIn);
        console.log("sign in successful");
      }
    } catch (error) {
      console.error(error.code);
      console.error(error);
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
    user,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
