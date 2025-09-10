// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, sendOTP, verifyOTP, setupRecaptcha } from "../services/auth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  useEffect(() => {
    // reCAPTCHA setup on mount
    setupRecaptcha("recaptcha-container");
  }, []);

  // ✅ Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await sendOTP(phoneNumber);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please check your phone number.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await verifyOTP(confirmationResult, otp);

      // Get Firebase user
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken();

        // Store for AuthGuard
        localStorage.setItem("authToken", idToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            phoneNumber: user.phoneNumber,
          })
        );

        navigate("/"); // Redirect after login
      } else {
        setError("Login failed. No user found.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login with Phone
        </h2>

        {!otpSent ? (
          // Phone input form
          <form onSubmit={handleSendOtp}>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="+919876543210"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          // OTP form
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-center tracking-widest focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••"
                required
                maxLength={6}
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
          </form>
        )}
      </div>

      {/* Invisible recaptcha */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPage;
