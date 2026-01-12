 "use client";
import { useEffect } from "react";

export default function ClearClientAttributes(): null {
  useEffect(() => {
    try {
      const attrs = Array.from(document.body.attributes);
      for (const attr of attrs) {
        const name = attr.name.toLowerCase();
        // remove known Grammarly / extension attributes and any data-gr* attributes
        if (
          name.startsWith("data-gr") ||
          name.startsWith("data-new-gr") ||
          name.includes("gr-ext") ||
          name.includes("gramm")
        ) {
          document.body.removeAttribute(attr.name);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return null;
}

