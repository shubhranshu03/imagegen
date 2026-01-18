import React from 'react';
import Image from 'next/image';

const MarketingBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-6" style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Create Perfect Marketing Images in Seconds
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Transform your product screenshots into stunning marketing visuals that grab attention and drive conversions. No design skills required.
            </p>

            <ul className="space-y-3 pt-4">
              <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-base sm:text-lg">AI-powered gradient backgrounds</span>
              </li>
              <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-base sm:text-lg">Professional device mockups</span>
              </li>
              <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-base sm:text-lg">Instant export for social media</span>
              </li>
            </ul>

            <div className="pt-6">
              <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow">
                Try Now
              </button>
            </div>
          </div>

          {/* Right Side - 3 Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Image 1 - Large (spans 2 rows) */}
              <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="relative w-full h-full">
                  <Image
                    src="/p1.jpg"
                    alt="Marketing Image 1"
                    width={400}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Image 2 - Top Right */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="relative w-full h-full" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src="/p2.jpg"
                    alt="Marketing Image 2"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Image 3 - Bottom Right */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="relative w-full h-full" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src="/p6.jpg"
                    alt="Marketing Image 3"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-30 -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MarketingBanner;