import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import toast from "react-hot-toast";
import axios from "axios";
export const AuthContext = createContext();
const AuthProvidor = ({ children }) => {
  const providor = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const emailRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (updateData) => {
    setLoading(false);
    return updateProfile(auth.currentUser, updateData);
  };
  const emailLogin = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth).then(() => {
      toast.success("Logout successful");
    });
  };
  const authorizeWithGoogle = () => {
    return signInWithPopup(auth, providor);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
      if (currentUser?.email) {
        axios.post(
          "http://localhost:5000/jwt",
          { email: currentUser.email },
          { withCredentials: true }
        );
      }
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    authorizeWithGoogle,
    loading,
    setLoading,
    logout,
    emailLogin,
    user,
    updateUser,
    setUser,
    error,
    setError,
    emailRegister,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvidor;
