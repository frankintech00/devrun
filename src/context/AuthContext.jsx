import { createContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const isLoggedIn = Boolean(user);

  async function addUserToFirestore(user) {
    try {
      const userRef = doc(db, "Users", user.uid);
      const userObj = {
        userID: user.uid,
        email: user.email,
        name: user.displayName || "Anonymous",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        recentlyViewed: [],
        shoppingBasket: [],
      };
      await setDoc(userRef, userObj);
    } catch (error) {
      setError(`Failed to add user to Firestore: ${error.message}`);
      console.error(error);
    }
  }

  async function signUp(email, password) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        setUser(user);
        await addUserToFirestore(user);
      }
    } catch (error) {
      setError(error.message);
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
      setError(error.message);
      console.error(error);
    }
  }

  async function signIn(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        setUser(user);
        await addUserToFirestore(user);
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  async function forgotPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (error) {
      setError(error.message);
      console.error("Error sending password reset email: ", error);
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error.message);
      console.error("Error signing out: ", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("user: ", user);
      console.log("isLoggedIn: ", isLoggedIn);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const providerValue = {
    signUp,
    signIn,
    signInWithGoogle,
    forgotPassword,
    signOutUser,
    user,
    isLoggedIn,
    error,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
