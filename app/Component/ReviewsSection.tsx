 "use client";

import React from "react";

interface Review {
  id: number;
  name: string;
  country: string;
  rating: number;
  text: string;
  image: string;
  socialSource?: "instagram" | "x" | "facebook";
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Maureen",
    country: "Canada",
    rating: 5,
    text: "This is the best app for creating a consistent image, I also enjoyed the free lumen given.",
    image: "/review/n1.jpg",
    socialSource: "instagram",
  },
  {
    id: 2,
    name: "Ericka",
    country: "United States",
    rating: 5,
    text: "Piclumen is great, you get a lot of options and generations with a free plan which is amazing.",
    image: "/review/n2.jpg",
    socialSource: "x",
  },
  {
    id: 3,
    name: "Ferdinand Cristobal",
    country: "Australia",
    rating: 5,
    text: "Easy to use, so many options for creating projects...",
    image: "/review/n3.jpg",
    socialSource: "facebook",
  },
  {
    id: 4,
    name: "Kavee",
    country: "Sri Lanka",
    rating: 5,
    text: "Easy to use, affordable, and produces high-quality AI images with great customer support.",
    image: "/review/p4.jpg",
    socialSource: "instagram",
  },
  {
    id: 5,
    name: "Ankit Jaiswal",
    country: "India",
    rating: 5,
    text: "Very nice and very important app for me this was amazing",
    image: "/review/n5.jpg",
    socialSource: "x",
  },
  {
    id: 6,
    name: "Feng",
    country: "United States",
    rating: 5,
    text: "Very good image creator, really helpful problem. Thank you!",
    image: "/review/n6.jpg",
    socialSource: "facebook",
  },
  {
    id: 7,
    name: "Sarah Mitchell",
    country: "United Kingdom",
    rating: 5,
    text: "Imageverse saves me hours on social content. The quality is consistently great.",
    image: "/review/p1.jpg",
    socialSource: "instagram",
  },
  {
    id: 8,
    name: "James Chen",
    country: "Singapore",
    rating: 5,
    text: "Clean interface and fast generation. Exactly what I needed for my brand.",
    image: "/review/n8.jpg",
    socialSource: "x",
  },
  {
    id: 9,
    name: "Elena Rodriguez",
    country: "Spain",
    rating: 5,
    text: "I use it for blog covers and ads. Results are professional every time.",
    image: "/review/n9.jpg",
    socialSource: "facebook",
  },
  {
    id: 10,
    name: "David Park",
    country: "South Korea",
    rating: 5,
    text: "Best AI image tool I have tried. Great for thumbnails and marketing.",
    image: "/review/n10.jpg",
    socialSource: "instagram",
  },
  {
    id: 11,
    name: "Olivia Brown",
    country: "Canada",
    rating: 5,
    text: "So easy to use. My whole team now uses Imageverse for visuals.",
    image: "/review/p5.jpg",
    socialSource: "x",
  },
  {
    id: 12,
    name: "Marcus Weber",
    country: "Germany",
    rating: 5,
    text: "Fast, affordable, and the output quality is impressive. Highly recommend.",
    image: "/review/n12.jpg",
    socialSource: "facebook",
  },
];

// Review Card Component
function ReviewCard({ review }: { review: Review }) {
  const getSocialIcon = (source?: string) => {
    switch (source) {
      case "instagram":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
          </svg>
        );
      case "x":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h3.3L11.98 9.46 22 22h-7.08l-5.55-7.25L5.08 22H1.7l6.65-7.93L0 2h7.25l5.05 6.63L18 2z" />
          </svg>
        );
      case "facebook":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-shrink-0 w-[280px] xs:w-[300px] sm:w-[320px] md:w-[340px] lg:w-[360px] bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl">
      {/* Header with Name and Social Icons */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          {/* Avatar */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-full overflow-hidden bg-gray-800 ring-2 ring-gray-700">
            <img
              src={review.image}
              alt={review.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Country */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-semibold text-white truncate">
              {review.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {review.country}
            </p>
          </div>
        </div>

        {/* Social Icons */}
        {review.socialSource && (
          <div className="text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0 ml-2">
            {getSocialIcon(review.socialSource)}
          </div>
        )}
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-base sm:text-lg">
            ★
          </span>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
        {review.text}
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  // Duplicate reviews for infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Join thousands of creators who are already using Imageverse to bring their ideas to life
          </p>
        </div>

        {/* Scrolling Reviews Container */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
          <style jsx>{`
            @keyframes scrollLeft {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-50%));
              }
            }

            @keyframes scrollRight {
              0% {
                transform: translateX(calc(-50%));
              }
              100% {
                transform: translateX(0);
              }
            }

            .reviews-row-left {
              display: flex;
              gap: 0.75rem;
              animation: scrollLeft 40s linear infinite;
              width: fit-content;
            }

            .reviews-row-right {
              display: flex;
              gap: 0.75rem;
              animation: scrollRight 40s linear infinite;
              width: fit-content;
            }

            .reviews-row-left:hover,
            .reviews-row-right:hover {
              animation-play-state: paused;
            }

            @media (min-width: 640px) {
              .reviews-row-left,
              .reviews-row-right {
                gap: 1rem;
                animation-duration: 50s;
              }
            }

            @media (min-width: 1024px) {
              .reviews-row-left,
              .reviews-row-right {
                gap: 1.25rem;
                animation-duration: 60s;
              }
            }

            .review-container {
              -webkit-mask-image: linear-gradient(
                to right,
                transparent,
                black 5%,
                black 95%,
                transparent
              );
              mask-image: linear-gradient(
                to right,
                transparent,
                black 5%,
                black 95%,
                transparent
              );
            }
          `}</style>

          {/* Row 1 - Scroll Left (Always Visible) */}
          <div className="w-full overflow-hidden review-container">
            <div className="reviews-row-left">
              {duplicatedReviews.map((review, index) => (
                <ReviewCard key={`row1-${index}`} review={review} />
              ))}
            </div>
          </div>

          {/* Row 2 - Scroll Right (Hidden on Mobile) */}
          <div className="hidden sm:block w-full overflow-hidden review-container">
            <div className="reviews-row-right">
              {duplicatedReviews.map((review, index) => (
                <ReviewCard key={`row2-${index}`} review={review} />
              ))}
            </div>
          </div>

          {/* Row 3 - Scroll Left (Hidden on Mobile and Tablet) */}
          <div className="hidden lg:block w-full overflow-hidden review-container">
            <div className="reviews-row-left">
              {duplicatedReviews.map((review, index) => (
                <ReviewCard key={`row3-${index}`} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA removed */}
      </div>
    </section>
  );
}