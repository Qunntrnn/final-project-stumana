"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AppFirebase = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCYkG1ynKzkZrD0_DBSH7UJupQmEnGGZVg",
      authDomain: "final-nextjs.firebaseapp.com",
      projectId: "final-nextjs",
      storageBucket: "final-nextjs.appspot.com",
      messagingSenderId: "1045911343884",
      appId: "1:1045911343884:web:ece7bdf14416ae5193af29"
    };
    initializeApp(firebaseConfig);
    console.log("Firebase initialized");

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch.user.setUser({
          id: user.uid,
          email: user.email,
          displayName: user.displayName || user.email,
        });
      } else {
        dispatch.user.setUser({
          id: undefined,
          email: undefined,
          displayName: undefined,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return <>{children}</>;
};
