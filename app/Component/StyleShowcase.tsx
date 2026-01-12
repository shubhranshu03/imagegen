 "use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

const STYLES = [
  { key: "ghibli", label: "Ghibli Portrait", src: "/a1.jpg" },
  { key: "cartoon", label: "Cartoon", src: "/a2.jpg" },
  { key: "cyber", label: "Cyberpunk", src: "/a3.jpg" },
  { key: "painting", label: "Painting", src: "/a4.jpg" },
  { key: "pixar", label: "Pixar", src: "/a5.jpg" },
  { key: "sketch", label: "Sketch", src: "/a6.jpg" },
  { key: "render", label: "3D Render", src: "/a7.jpg" },
  { key: "anime", label: "Anime", src: "/a8.jpg" },
];

export default function StyleShowcase() {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [centeredKey, setCenteredKey] = useState<string | null>(null);

  function handleMove(key: string, e: React.MouseEvent<HTMLDivElement>) {
    const el = refs.current[key];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 .. 1
    const py = (y / rect.height) * 2 - 1;
    el.style.setProperty("--px", String(px));
    el.style.setProperty("--py", String(py));
  }

  function handleLeave(key: string) {
    const el = refs.current[key];
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  }

  function handleClickTarget(key: string) {
    // toggle off
    if (centeredKey === key) {
      // reset all
      Object.values(refs.current).forEach((r) => {
        if (!r) return;
        r.style.removeProperty("--tx");
        r.style.removeProperty("--ty");
      });
      setCenteredKey(null);
      return;
    }

    const target = refs.current[key];
    const container = containerRef.current;
    if (!target || !container) return;

    const crect = container.getBoundingClientRect();
    const tc = target.getBoundingClientRect();
    const tcx = tc.left + tc.width / 2;
    const tcy = tc.top + tc.height / 2;

    // for each card compute vector to target center
    Object.entries(refs.current).forEach(([k, el]) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = tcx - cx;
      const dy = tcy - cy;
      // set css vars
      el.style.setProperty("--tx", `${dx}px`);
      el.style.setProperty("--ty", `${dy}px`);
    });
    setCenteredKey(key);
  }

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Styles Showcase</h3>
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-6 ${centeredKey ? "showcase-centered" : ""}`}
          ref={containerRef}
        >
          {STYLES.map((s) => (
            <div
              key={s.key}
              ref={(el) => { refs.current[s.key] = el; }}
              onMouseMove={(e) => handleMove(s.key, e)}
              onMouseLeave={() => handleLeave(s.key)}
              onClick={() => handleClickTarget(s.key)}
              className={`style-card relative rounded-xl overflow-hidden ${centeredKey === s.key ? "active" : ""}`}
            >
              <div className="card-inner">
                <div className="card-media">
                  <Image src={s.src} alt={s.label} fill className="object-cover" />
                </div>
                <div className="card-label">
                  <span>{s.label}</span>
                </div>
                <div className="card-3d" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

