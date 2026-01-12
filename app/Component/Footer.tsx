import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-start">
          <div className="text-lg font-semibold">ImageGen Ai</div>
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} ImageGen Ai — All rights reserved</div>
          <nav className="mt-2 flex space-x-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-white">Submit feedback</a>
            <a href="#" className="text-gray-400 hover:text-white">Legal</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact us</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a href="#" aria-label="Facebook" className="p-2 rounded hover:bg-white/10">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.5 3.3-3.5.96 0 1.97.17 1.97.17v2.2h-1.12c-1.1 0-1.44.68-1.44 1.37V12h2.45l-.39 2.9h-2.06v7A10 10 0 0022 12z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="p-2 rounded hover:bg-white/10">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 5.92c-.66.3-1.37.5-2.12.6a3.7 3.7 0 001.62-2.04 7.47 7.47 0 01-2.37.9A3.73 3.73 0 0016.11 4c-2.06 0-3.73 1.67-3.73 3.73 0 .29.03.57.1.84-3.1-.16-5.85-1.64-7.69-3.9a3.72 3.72 0 00-.5 1.88c0 1.29.66 2.43 1.67 3.1a3.7 3.7 0 01-1.69-.46v.05c0 1.8 1.28 3.3 2.98 3.64-.31.08-.64.12-.98.12-.24 0-.48-.02-.71-.07.48 1.49 1.87 2.56 3.52 2.59A7.48 7.48 0 013 19.53a10.54 10.54 0 005.7 1.66c6.84 0 10.58-5.66 10.58-10.57v-.48c.73-.53 1.36-1.2 1.86-1.96-.67.3-1.39.49-2.14.57z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="p-2 rounded hover:bg-white/10">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zm6.5-.9a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1zM12 9.5A2.5 2.5 0 1112 14.5 2.5 2.5 0 0112 9.5z"/>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="p-2 rounded hover:bg-white/10">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v11H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.8 3.6-1.8 3.8 0 4.5 2.5 4.5 5.8V20H18v-5.2c0-1.2-.02-2.8-1.7-2.8-1.7 0-2 1.4-2 2.7V20H9V9z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

