"use client";

import React, { useState } from "react";
import { X, Mail, Lock } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const msg = error.message.toLowerCase().includes("invalid login credentials")
          ? "Please enter your email and password correctly."
          : error.message;
        setError(msg);
        return;
      }

      setSuccess("Login successful!");
      setTimeout(() => {
        onAuthSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Use our API endpoint for registration (no email verification)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = (data.error || "Registration failed").toLowerCase().includes("invalid")
          ? "Please enter your email and password correctly."
          : data.error || "Registration failed";
        setError(msg);
        setLoading(false);
        return;
      }

      setSuccess("Registration successful! You can now sign in.");
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLogin(true);
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1 hover:bg-gray-100 rounded-full transition z-10"
        >
          <X size={20} className="text-gray-500 sm:w-6 sm:h-6" />
        </button>

        {/* Logo Section */}
        <div className="bg-gradient-to-r from-black to-gray-900 px-4 sm:px-6 py-5 sm:py-6 flex flex-col items-center gap-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <Image
              src="/favi1.png"
              alt="Imageverse"
              width={80}
              height={80}
              className="object-contain drop-shadow-lg"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-300 text-xs sm:text-xs text-center leading-relaxed">
            {isLogin
              ? "Sign in to your Imageverse account"
              : "Join Imageverse to start creating"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="px-4 sm:px-6 py-4 sm:py-5">
          {/* Email Input */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-black font-semibold text-xs sm:text-xs mb-1 sm:mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-2 sm:top-2.5 text-gray-400 sm:w-4 sm:h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 text-xs sm:text-sm text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-black font-semibold text-xs sm:text-xs mb-1 sm:mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-2 sm:top-2.5 text-gray-400 sm:w-4 sm:h-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 text-xs sm:text-sm text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {!isLogin && (
            <div className="mb-3 sm:mb-4">
              <label className="block text-black font-semibold text-xs sm:text-xs mb-1 sm:mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-2 sm:top-2.5 text-gray-400 sm:w-4 sm:h-4" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 text-xs sm:text-sm text-black placeholder-gray-400"
                  required
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-2 sm:mb-3 p-2 sm:p-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-2 sm:mb-3 p-2 sm:p-2.5 bg-green-50 border border-green-300 rounded-lg text-green-700 text-xs font-medium">
              ✅ {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed mt-4 sm:mt-5 text-xs sm:text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-gray-200 text-center bg-gray-50">
          <p className="text-gray-700 text-xs sm:text-xs">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccess(null);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-black font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
