import React from "react";
import Image from "next/image";

export default function GenHero() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left column: heading, paragraph, buttons (buttons visible on md+) */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight" style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}>
              Create Perfect Marketing Images in Seconds
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0" style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}>
              Transform your product screenshots into stunning marketing visuals that grab attention and drive conversions. No design skills required.
            </p>
            <ul className="mt-4 text-gray-600 max-w-2xl mx-auto md:mx-0 space-y-2" style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}>
              <li>• AI-powered gradient backgrounds</li>
              <li>• Professional device mockups</li>
              <li>• Instant export for social media</li>
            </ul>

            <div className="mt-8 hidden md:flex flex-row gap-4 items-center">
              <a
                href="#try"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Try Now
              </a>
              <a
                href="#styles"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-black rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Explore Styles
              </a>
            </div>
          </div>

          {/* Right column: image; on mobile show buttons after image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100">
                {/* Preview image */}
                <Image
                  src="/b1.jpg"
                  alt="Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="w-full max-w-md md:hidden mt-6 flex flex-col gap-4 items-center">
              <a
                href="#try"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Try Now
              </a>
              <a
                href="#styles"
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-200 text-black rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Explore Styles
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

