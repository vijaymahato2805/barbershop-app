// src/services/auth.ts
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { app } from '../firebase'; // Import the initialized app instance

// Extend the Window interface to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

// Get the Authentication service instance for the app
export const auth = getAuth(app);

// This function creates a RecaptchaVerifier, which is needed for phone number sign-in
export const setupRecaptcha = (containerId: string) => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: (response: any) => {
      // reCAPTCHA solved, allows you to proceed with sign-in
    },
  });
};

// This function handles sending the OTP
export const sendOTP = async (phoneNumber: string) => {
  const recaptchaVerifier = window.recaptchaVerifier;
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  return confirmationResult;
};

// This function handles OTP verification
export const verifyOTP = async (confirmationResult: any, otp: string) => {
  await confirmationResult.confirm(otp);
};