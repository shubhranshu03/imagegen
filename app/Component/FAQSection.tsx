"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How does image generation work?",
    answer: "Our AI-powered image generator uses advanced machine learning models to analyze your text prompts and create stunning, unique images. Simply describe what you want to see, and our system will generate it in seconds.",
  },
  {
    id: 2,
    question: "What formats can I download?",
    answer: "You can download your generated images in multiple formats including PNG, JPG, and WebP. Each format has its own advantages - PNG for transparency, JPG for smaller file sizes, and WebP for modern web use.",
  },
  {
    id: 3,
    question: "Do I need design experience?",
    answer: "No design experience needed! Our platform is designed for everyone. Simply enter a detailed text description of what you want, and our AI handles all the creative work. The more specific your description, the better the results.",
  },
  {
    id: 4,
    question: "Can I use images commercially?",
    answer: "Yes! Images generated with your account can be used for personal projects, social media, presentations, marketing materials, and commercial use. Just make sure your prompts don't violate our usage guidelines.",
  },
  {
    id: 5,
    question: "How many images can I generate?",
    answer: "Your generation limit depends on your subscription plan. New users receive free credits to explore the platform. You can track your remaining credits from your dashboard and purchase more as needed.",
  },
  {
    id: 6,
    question: "Is my data private?",
    answer: "Yes, we take privacy seriously. Your generated images and personal data are protected with industry-standard encryption. We never share your data with third parties without your consent.",
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
      <button
        onClick={onToggle}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between text-left border-b border-gray-300"
      >
        <h3 className="text-sm sm:text-base font-semibold text-black pr-4">
          {item.question}
        </h3>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gray-50 border-t border-gray-300">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-4 sm:mb-6" style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}>
              Have questions about Imageverse? We've got answers! Below you'll find the most common questions from our users and detailed answers to help you get the most out of our AI-powered image generation platform.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}>
              Can't find what you're looking for? Visit our Help page or contact our support team for personalized assistance. We're here to help you create amazing images!
            </p>
            
            {/* CTA Button */}
            <div className="mt-8 sm:mt-10">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105">
                Contact Support
              </button>
            </div>
          </div>

          {/* Right Side - FAQ Items */}
          <div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
