  "use client";
 import React, { useState } from "react";
 import Image from "next/image";
 import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, note }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Submission failed");
      } else {
        setShowThanks(true);
        setEmail("");
        setNote("");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-1 hero-upper">
        <div className="flex flex-col md:flex-row items-center gap-1">
          {/* Left: headline, description, waitlist textarea + button */}
          <div className="w-full md:w-1/2">
            <h1
              className={`${inter.className} text-4xl md:text-5xl font-semibold text-black leading-tight mb-6 inter-heading`}
              style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif", textTransform: "lowercase" }}
            >
              Transform your photos into beautiful aesthetic images — instantly.
            </h1>
            <p
              className={`${inter.className} text-lg text-gray-700 mb-8 inter-subtext`}
              style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif", textTransform: "none" }}
            >
              Upload any image and let AI redesign it with modern gradients, lighting, and clean visuals.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif", textTransform: "none" }}
                  className="px-3 py-3 border border-gray-200 rounded-md w-full sm:w-80 text-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-3 bg-black text-white rounded-md font-semibold hover:opacity-95 transition text-lg disabled:opacity-60"
                  style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif", textTransform: "none" }}
                >
                  {loading ? "Joining..." : "Join Wait"}
                </button>
              </div>
              <div className="mt-2">
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif", textTransform: "none" }}
                >
                  100+ people already on the waitlist.
                </p>
              </div>
            </form>
            {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
          </div>

          {/* Right: placeholder / preview area */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full p-2">
              <div className="hero-gallery grid grid-cols-3 gap-2">
                {(() => {
                  const images = [
                    "p13",
                    "p1",
                    "p2",
                    "p3",
                    "p4",
                    "p5",
                    "p6",
                    // p7 removed (duplicate)
                    "p8",
                    "p9",
                    "p10",
                    "p11",
                    "p12",
                  ];
                  return images.map((name, i) => (
                    <div
                      key={name}
                      className="hero-card rounded-md overflow-hidden transform transition hover:scale-105"
                    >
                      <Image
                        src={`/${name}.jpg`}
                        alt={name}
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                        priority={i < 4}
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank you popup */}
      {showThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowThanks(false)} />
          <div className="relative bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you! 💖</h3>
            <p className="text-gray-700 mb-4">You're on the waitlist — we'll email you when we launch.</p>
            <button
              className="px-4 py-2 bg-black text-white rounded-md"
              onClick={() => setShowThanks(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;

 