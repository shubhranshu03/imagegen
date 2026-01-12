import React from "react";
import Image from "next/image";

const HEADSHOTS = ["/h1.jpg", "/h2.jpg", "/h3.jpg", "/h4.jpg"];

export default function Headshot() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Headshot grid */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            {HEADSHOTS.map((src, idx) => (
              <div key={src} className="rounded-xl overflow-hidden shadow-md w-full h-36 sm:h-40 md:h-44 relative">
                <Image
                  src={src}
                  alt={`Headshot ${idx + 1}`}
                  fill
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Right: Text content */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-black">Professional Headshots</h3>
            <p className="text-lg text-gray-700">
              Showcase your team with consistent, high-quality headshots. Our AI-powered
              headshot tools automatically enhance lighting, remove background noise, and
              deliver polished images for websites, bios, and press materials.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Uniform background and crop</li>
              <li>Natural skin tones and subtle retouch</li>
              <li>Fast batch processing for teams</li>
            </ul>
            <div className="mt-4">
              <a
                href="#headshot"
                className="inline-block px-5 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
              >
                Get Headshots
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

