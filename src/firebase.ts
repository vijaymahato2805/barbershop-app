// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIm4ZOduaD26BXFML4zslRLcnOZTpWnYc",
  authDomain: "barber-booking-a8978.firebaseapp.com",
  projectId: "barber-booking-a8978",
  storageBucket: "barber-booking-a8978.firebasestorage.app",
  messagingSenderId: "31529373743",
  appId: "1:31529373743:web:e807e30efe37b4521bb6da",
  measurementId: "G-FH66C6W7R0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize other Firebase services you might use
export const analytics = getAnalytics(app);

// Export the initialized app instance for use in other files
export { app };