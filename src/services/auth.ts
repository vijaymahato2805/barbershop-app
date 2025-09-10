// src/services/auth.ts
import { 
  getAuth, 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  signOut, 
  User 
} from "firebase/auth";
import { app } from "../firebase";

// Extend the Window interface to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export const auth = getAuth(app);

// ✅ Setup Recaptcha
export const setupRecaptcha = (containerId: string, size: "invisible" | "normal" = "invisible") => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size,
    callback: (response: any) => {
      // reCAPTCHA solved, proceed with sign-in
      console.log("reCAPTCHA verified:", response);
    },
  });
};

// ✅ Send OTP
export const sendOTP = async (phoneNumber: string) => {
  const recaptchaVerifier = window.recaptchaVerifier;
  if (!recaptchaVerifier) throw new Error("Recaptcha not set up");

  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  return confirmationResult; // Save this for verifyOTP
};

// ✅ Verify OTP
export const verifyOTP = async (confirmationResult: any, otp: string) => {
  const result = await confirmationResult.confirm(otp);
  const user: User = result.user;

  // Save to localStorage so AuthGuard can detect login
  localStorage.setItem("user", JSON.stringify({
    uid: user.uid,
    phoneNumber: user.phoneNumber,
  }));

  return user;
};

// ✅ Logout
export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("user");
};

// ✅ Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
