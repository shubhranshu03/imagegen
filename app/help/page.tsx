"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default function HelpPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Send feedback to your backend/email service
      console.log("Feedback submitted:", { email, feedback });
      setSubmitted(true);
      setFeedback("");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-black hover:text-gray-600 transition"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl font-bold text-black ml-auto">Help & Support</h1>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Help Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-black mb-6">How to Use Imageverse</h2>

            <div className="space-y-6 text-gray-700">
              {/* Section 1 */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-3">Getting Started</h3>
                <p className="leading-relaxed">
                  Our platform is designed to make AI-powered image creation easy for everyone. You don't need any design skills or technical knowledge to get started. Simply enter a detailed text prompt, and our AI will generate images based on your description within seconds. The more specific your prompt is, the better and more accurate the results will be.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-3">Understanding Credits</h3>
                <p className="leading-relaxed">
                  Each image generation uses a certain number of credits. New users receive free credits when they sign up, allowing them to explore the platform without any upfront cost. You can track your credit usage and remaining balance from your dashboard at any time.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-3">Using Your Generated Images</h3>
                <p className="leading-relaxed">
                  Generated images can be downloaded instantly and used for personal projects, social media, presentations, marketing materials, and more. Please make sure your prompts follow our usage guidelines and avoid generating harmful, illegal, or copyrighted content.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-3">Continuous Improvement</h3>
                <p className="leading-relaxed">
                  We continuously improve our system to provide better image quality, faster generation times, and a smoother user experience. If you face any issues or have questions while using the platform, our support team is always ready to help.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200 h-fit sticky top-8">
            <h3 className="text-xl font-bold text-black mb-6">Send Us Feedback</h3>

            {submitted ? (
              <div className="p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 text-center">
                ✅ Thank you! Your feedback has been sent successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 text-sm text-black placeholder-gray-400"
                  />
                </div>

                {/* Feedback Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you think... any suggestions, issues, or feedback?"
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 text-sm text-black placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? "Sending..." : "Send Feedback"}
                </button>
              </form>
            )}

            {/* Additional Help Text */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-700">
                <strong>💡 Tip:</strong> For faster support, include specific details about your issue or suggestion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
