 "use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-4 py-2 bg-black text-white text-base font-medium border-2 border-white rounded-md hover:bg-white hover:text-black transition-all duration-300">
              Try Now
            </button>
          </div>

          {/* Mobile Menu Button — visible only on small screens, absolute to the right */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden absolute right-4 top-6 text-black p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden absolute left-0 top-full w-full bg-white shadow-md z-40">
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link href="/" className="text-black text-lg font-medium" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link href="/features" className="text-black text-lg font-medium" onClick={() => setMobileOpen(false)}>
                Features
              </Link>
              <Link href="/gallery" className="text-black text-lg font-medium" onClick={() => setMobileOpen(false)}>
                Gallery
              </Link>
              <Link href="#pricing" className="text-black text-lg font-medium" onClick={() => setMobileOpen(false)}>
                Pricing
              </Link>
              <div className="pt-2">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full px-4 py-2 bg-black text-white text-base font-medium rounded-md"
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;