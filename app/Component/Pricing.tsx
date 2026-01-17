 "use client";
import React, { useMemo, useState } from "react";
import { Check } from 'lucide-react';

type Tier = {
  name: string;
  min: number;
  max: number;
  features: string[];
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    min: 3,
    max: 9,
    features: [
      "Up to 10 generated images / month",
      "Basic styles and filters",
      "Standard resolution exports",
    ],
  },
  {
    name: "Pro",
    min: 10,
    max: 19,
    features: [
      "Up to 100 generated images / month",
      "All styles + priority queue",
      "High resolution exports",
      "Batch headshot processing",
    ],
  },
  {
    name: "Scale",
    min: 20,
    max: 30,
    features: [
      "Unlimited images (fair use)",
      "All styles + custom models",
      "API access & SLAs",
      "Team seats & collaboration",
    ],
  },
];

function findTier(price: number): Tier {
  return (
    TIERS.find((t) => price >= t.min && price <= t.max) || TIERS[TIERS.length - 1]
  );
}

export default function Pricing() {
  const [price, setPrice] = useState<number>(10);

  const tier = useMemo(() => findTier(price), [price]);

  return (
    <section id="pricing" className="py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
            <span className="text-white/80 text-sm font-medium">Simple & Transparent</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}>
            Pay only for what you use. Customize your plan from $3 to $30.
          </h2>
          
        </div>

        {/* Main Pricing Card */}
        <div className="bg-black rounded-xl p-4 sm:p-6 shadow-md mx-auto max-w-xl">
          
          {/* Price Display */}
           <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="text-center sm:text-left">
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Your Price</div>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl sm:text-5xl font-bold text-white">${price}</span>
                 <span className="text-lg text-gray-400">/month</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Selected Plan</div>
              <div className="inline-block px-6 py-3 bg-white rounded-2xl">
                <div className="text-2xl sm:text-3xl font-bold text-black">{tier.name}</div>
              </div>
            </div>
          </div>

          {/* Slider */}
           <div className="mb-6">
            <div className="relative">
              <input
                type="range"
                min={3}
                max={30}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${((price - 3) / 27) * 100}%, rgb(55, 65, 81) ${((price - 3) / 27) * 100}%, rgb(55, 65, 81) 100%)`
                }}
              />
              <style jsx>{`
                .slider-thumb::-webkit-slider-thumb {
                  appearance: none;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: white;
                  cursor: pointer;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                  transition: transform 0.2s;
                }
                .slider-thumb::-webkit-slider-thumb:hover {
                  transform: scale(1.2);
                }
                .slider-thumb::-moz-range-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: white;
                  cursor: pointer;
                  border: none;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                  transition: transform 0.2s;
                }
                .slider-thumb::-moz-range-thumb:hover {
                  transform: scale(1.2);
                }
              `}</style>
              
              {/* Price markers */}
              <div className="flex justify-between mt-3 text-xs text-gray-500">
                <span>$3</span>
                <span>$10</span>
                <span>$20</span>
                <span>$30</span>
              </div>
            </div>
          </div>

          {/* Features and Summary Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Features */}
             <div className="bg-black/20 rounded-lg p-4">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                What's Included
              </h3>
               <ul className="space-y-2">
                 {tier.features.map((feature) => (
                   <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-black stroke-[3]" />
                      </div>
                    </div>
                    <span className="text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary & CTA */}
             <div className="flex flex-col justify-between">
               <div className="bg-black/20 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Plan Summary
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  At <span className="text-white font-bold">${price}/month</span>, you'll get full access to the{" "}
                  <span className="text-white font-bold">{tier.name}</span> plan with all its powerful features.
                </p>
              </div>

              {/* CTA Button */}
               <button className="group w-full px-4 py-2 bg-white hover:bg-gray-100 text-black font-bold text-sm rounded-md shadow transition-all duration-150 flex items-center justify-center gap-2">
                Get Started ${price}/mo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Trust Badge */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">No credit card required • Cancel anytime</p>
              </div>
            </div>

          </div>

          {/* Plan Tier Indicators */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-4">
              {TIERS.map((t) => (
                <div
                  key={t.name}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    t.name === tier.name
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-gray-400 border border-white/20'
                  }`}
                >
                  {t.name} (${t.min}-${t.max})
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}