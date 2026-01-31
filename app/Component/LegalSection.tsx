"use client";

import React, { useMemo } from "react";

export default function LegalSection() {
  const fontStyle = useMemo(
    () => ({ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }),
    []
  );

  return (
    <section className="bg-white px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10" style={fontStyle}>
          <h1 className="text-3xl sm:text-4xl font-semibold text-black">Legal</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Important information and guidelines.
          </p>
        </div>

        <div
          className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-4"
          style={fontStyle}
        >
          <p>
            ImageVerse is an AI-powered image generation platform designed to help
            users explore creativity through artificial intelligence. By accessing or
            using ImageVerse, you agree to comply with and be bound by the terms
            outlined on this page. These terms apply to all users of the platform,
            including visitors, registered users, and subscribers.
          </p>

          <p>
            ImageVerse collects limited personal information such as email addresses,
            basic account details, and usage-related data solely for the purpose of
            operating, maintaining, and improving the platform. We do not sell, rent,
            or trade your personal data to third parties. All data is handled
            responsibly and used to enhance platform functionality, provide support,
            and ensure a secure user experience.
          </p>

          <p>
            The images generated using ImageVerse are created by artificial
            intelligence based on user-provided prompts. While we strive to deliver
            high-quality results, we do not guarantee that generated content will be
            accurate, original, unique, or suitable for commercial use. Users are
            solely responsible for reviewing, verifying, and determining how
            generated images are used. ImageVerse is not responsible for any misuse
            of generated content or for violations of intellectual property rights.
          </p>

          <p>
            ImageVerse is provided on an “as is” and “as available” basis. We make
            no warranties or guarantees regarding service availability, performance,
            or reliability. We reserve the right to modify, suspend, or discontinue
            any part of the platform at any time without prior notice. Misuse of the
            service, including attempts to generate illegal, harmful, or abusive
            content, may result in suspension or termination of access.
          </p>

          <p>
            To the fullest extent permitted by law, ImageVerse and its team shall not
            be liable for any direct, indirect, incidental, or consequential damages
            arising from the use of or inability to use the platform, including but
            not limited to loss of data, loss of profits, or service interruptions.
          </p>

          <p>
            If you have any questions, legal concerns, or requests related to these
            terms or your data, please contact us through the Contact Us page. We
            will make reasonable efforts to respond in a timely manner.
          </p>
        </div>
      </div>
    </section>
  );
}

