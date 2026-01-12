import React from "react";
import Image from "next/image";

export default function GenHero() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              Generate. Refine. Share.
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl">
              Create stunning, on-brand images in seconds — powered by AI. Choose a style,
              upload a photo or start from scratch, and get production-ready visuals for
              marketing, social, or product listings.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
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

          {/* Right: Preview / Decorative image - responsive and falls below on small screens */}
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
          </div>
        </div>
      </div>
    </section>
  );
}

