 "use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {

  return (
    <nav className="site-navbar">
      <div className="max-w-7xl mx-auto px-6 py-6 relative">
        <div className="flex items-center justify-between">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              href="/"
              className="text-black text-lg font-medium hover:text-gray-600 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="text-black text-lg font-medium hover:text-gray-600 transition-colors duration-300"
            >
              Features
            </Link>
            <Link
              href="/gallery"
              className="text-black text-lg font-medium hover:text-gray-600 transition-colors duration-300"
            >
              Gallery
            </Link>
            <Link
              href="#pricing"
              className="text-black text-lg font-medium hover:text-gray-600 transition-colors duration-300"
            >
              Pricing
            </Link>
          </div>

          {/* Empty flex to push button to right */}
          <div className="flex-1"></div>

          {/* CTA Button — visible on all screens, aligned to right */}
          {/* COMMENTED OUT: Dashboard navigation
          <Link
            href="/dashboard"
            className="inline-block px-4 py-2 bg-black text-white text-base font-medium rounded-md hover:bg-gray-800 transition-all duration-300"
          >
            Try Now
          </Link>
          */}
          <button
            className="inline-block px-4 py-2 bg-black text-white text-base font-medium rounded-md hover:bg-gray-800 transition-all duration-300"
            onClick={() => console.log("Try Now clicked - Navigation commented out")}
          >
            Try Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;