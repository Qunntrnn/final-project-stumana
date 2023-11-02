import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  applyActionCode,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

let forAuthProcessApp;

const initializeAuthProcessApp = () => {
  const firebaseConfig = JSON.parse(
    atob(process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_BASE64)
  );
  forAuthProcessApp = initializeApp(firebaseConfig, "for-auth-process");
  return forAuthProcessApp;
};

const resetPassword = async (email) => {
  await sendPasswordResetEmail(getAuth(), email);
};

const changePasswordWithResetEmail = async (actionCode, newPassword) => {
  await confirmPasswordReset(getAuth(), actionCode, newPassword);
};

const changePassword = async (newPassword) => {
  const { currentUser } = getAuth();
  if (!currentUser) {
    throw new Error("Please sign in first");
  }
  await updatePassword(currentUser, newPassword);
};

const requestEmailVerification = async () => {
  const { currentUser } = getAuth();
  if (!currentUser) {
    throw new Error("Please sign in first");
  }
  await sendEmailVerification(currentUser);
};

const verifyEmail = async (actionCode) => {
  await applyActionCode(getAuth(), actionCode);
};

const signUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(getAuth(forAuthProcessApp), provider);
    console.log("Google sign-in successful", result.user);
  } catch (error) {
    console.error("Google sign-in error", error);
  }
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(getAuth(forAuthProcessApp), provider);
    console.log("Google sign-in successful", result.user);
  } catch (error) {
    console.error("Google sign-in error", error);
  }
};

export const authService = {
  initializeAuthProcessApp,
  resetPassword,
  changePasswordWithResetEmail,
  requestEmailVerification,
  verifyEmail,
  changePassword,
  signInWithGoogle,
  signUpWithGoogle,
};
