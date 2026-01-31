"use client";

import React, { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactSection() {
  const fontStyle = useMemo(
    () => ({ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }),
    []
  );

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSent(false);
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(false);
    setIsSending(true);

    // No backend wired yet — keep UX smooth for now.
    await new Promise((r) => setTimeout(r, 700));

    setIsSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="bg-white px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-stretch">
          {/* Left: Text only */}
          <div className="flex items-start">
            <div style={fontStyle}>
              <h1 className="text-3xl sm:text-4xl font-semibold text-black">
                Contact Us
              </h1>
              <div className="mt-4 space-y-4 max-w-xl">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  At ImageVerse, we believe creativity should feel effortless, powerful,
                  and accessible to everyone. If you have any questions, feedback,
                  feature ideas, or need assistance with image generation, we’d love to
                  hear from you.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Whether you’re a creator experimenting with new visual styles, a
                  professional using ImageVerse for your projects, or someone exploring
                  AI-generated images for the first time, our team is here to support
                  you. We’re constantly improving the platform, and your input helps us
                  make ImageVerse faster, smarter, and more creative. Reach out using
                  the form below, and we’ll get back to you as quickly as possible.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Card */}
          <div className="lg:justify-self-end w-full">
            <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8">
              <div className="mb-6" style={fontStyle}>
                <h2 className="text-xl sm:text-2xl font-semibold text-black">
                  Send us a message
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Fill in the details and we’ll reply to your email.
                </p>
              </div>

              {sent && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-sm text-green-800 font-medium" style={fontStyle}>
                    Message sent! We’ll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-4" style={fontStyle}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">
                      Full Name
                    </label>
                    <input
                      value={form.name}
                      onChange={onChange("name")}
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">
                      Email
                    </label>
                    <input
                      value={form.email}
                      onChange={onChange("email")}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1.5">
                    Subject
                  </label>
                  <input
                    value={form.subject}
                    onChange={onChange("subject")}
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-1.5">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={onChange("message")}
                    placeholder="Write your message..."
                    rows={6}
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full rounded-xl bg-black text-white px-4 py-3 font-semibold text-sm sm:text-base hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Tip: include details like what you tried and screenshots if possible.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

