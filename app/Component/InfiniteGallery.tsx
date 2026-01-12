"use client";

export default function InfiniteGallery() {
  // First row images
  const row1Images = [
    "/s1.jpg",
    "/s2.jpg",
    "/s3.jpg",
    "/s4.jpg",
    "/s5.jpg",
    "/s6.jpg",
  ];

  // Second row images
  const row2Images = [
    "/s12.jpg",
    "/s7.jpg",
    "/s8.jpg",
    "/s9.jpg",
    "/s10.jpg",
    "/s11.jpg",
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-900 overflow-hidden">
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .gallery-row:hover .animate-scroll-left,
        .gallery-row:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="space-y-4 sm:space-y-6">
        {/* First Row - Scrolling Left */}
        <div className="gallery-row relative">
          <div className="flex animate-scroll-left">
            {/* Duplicate images for seamless loop */}
            {[...row1Images, ...row1Images].map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-80 mx-2 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Scrolling Right */}
        <div className="gallery-row relative">
          <div className="flex animate-scroll-right">
            {/* Duplicate images for seamless loop */}
            {[...row2Images, ...row2Images].map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-80 mx-2 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}