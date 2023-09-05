import { createContext, useState } from "react";

import { auth } from "../services/firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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

  const providerValue = {
    signUp,
    user,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
