import React from "react";
import Image from "next/image";

const ComparisonSection: React.FC = () => {
  const badPoints = [
    "Plain, boring background",
    "No visual depth or shadows",
    "Looks unprofessional",
    "Lacks modern design appeal",
    "Hard to grab attention",
    "Not social media ready",
  ];

  const goodPoints = [
    "Beautiful gradient background",
    "Professional device frame",
    "Eye-catching shadows & depth",
    "Modern, polished look",
    "Instantly shareable",
    "Stands out on social media",
  ];

  return (
    <section className="py-8 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 lg:order-1">
            
            <div className="mx-auto w-[180px] sm:w-[220px] md:w-[260px]">
              <div className="relative w-full" style={{ aspectRatio: "1024/1536" }}>
                <div className="gradient-border rounded-md">
                  <div className="inner w-full h-full overflow-hidden rounded-sm">
                    <Image
                      src="/p15.png"
                      alt="Bad Image"
                      width={1024}
                      height={1536}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
                Why Your Images Fail
              </h2>
              <p className="text-lg text-gray-600">
                Plain screenshots don't convert. Here's why:
              </p>
            </div>

            <div className="space-y-4">
              {badPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 flex-1">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 whitespace-nowrap">
                Why This Works Better
              </h2>
              <p className="text-lg text-gray-600">Professional images that actually convert:</p>
            </div>

            <div className="space-y-4">
              {goodPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 flex-1">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            
            <div className="mx-auto w-[180px] sm:w-[220px] md:w-[260px]">
              <div className="relative w-full" style={{ aspectRatio: "1024/1536" }}>
                <div className="gradient-border rounded-md">
                  <div className="inner w-full h-full overflow-hidden rounded-sm">
                    <Image
                      src="/a9.png"
                      alt="Good Image"
                      width={1024}
                      height={1536}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* badge removed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;