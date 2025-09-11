// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
      setError("❌ Failed to send OTP. Please check your phone number.");
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

      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken();
        localStorage.setItem("authToken", idToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ uid: user.uid, phoneNumber: user.phoneNumber })
        );
        navigate("/");
      } else {
        setError("Login failed. No user found.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-deep-green mb-6">
          {otpSent ? "Enter OTP 🔑" : "Login with Phone 📱"}
        </h2>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-deep-green"
                placeholder="+919876543210"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-deep-green text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        {/* ✅ Add register link below forms */}
 <p className="mt-6 text-center text-sm text-gray-600">
  Not a member yet?{" "}
  <a
    href="/register"
    className="text-deep-green font-semibold hover:underline"
  >
    Register as Salon Owner
  </a>
</p>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-center tracking-widest focus:ring-2 focus:ring-deep-green"
                placeholder="••••••"
                maxLength={6}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-deep-green text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
          </form>
        )}
      </motion.div>
      

      {/* Invisible reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPage;
