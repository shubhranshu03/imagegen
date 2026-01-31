"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import { AuthModal } from "@/app/Component/AuthModal";
import { useAuth } from "@/lib/useAuth";
import {
  clearGallery,
  loadGallery,
  removeFromGallery,
  type GalleryItem,
} from "@/lib/gallery";

function getExtFromDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);/);
  if (!match?.[1]) return "png";
  const ext = match[1].toLowerCase();
  if (ext === "jpeg") return "jpg";
  return ext;
}

function makeSafeFileName(base: string, ext: string) {
  const cleaned = (base || "imageverse")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
  return `${cleaned || "imageverse"}-${Date.now()}.${ext}`;
}

async function downloadSrc(src: string, fileName: string) {
  const a = document.createElement("a");
  a.download = fileName;
  if (src.startsWith("data:")) {
    a.href = src;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }

  const res = await fetch(src);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  a.href = url;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function GalleryPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const userKey = user?.id || user?.email || "anon";

  useEffect(() => {
    setItems(loadGallery(userKey));
  }, [userKey]);

  const count = items.length;

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => b.createdAt - a.createdAt);
  }, [items]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-gray-100 transition text-black"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-black">
                My Gallery
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {count} saved {count === 1 ? "image" : "images"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!user && !loading ? (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 sm:px-4 py-2 bg-black text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-800 transition"
              >
                Sign in
              </button>
            ) : (
              <div className="text-xs sm:text-sm text-gray-600 max-w-[180px] sm:max-w-[260px] truncate">
                {user?.email}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                clearGallery(userKey);
                setItems([]);
              }}
              className="px-3 sm:px-4 py-2 bg-gray-100 text-black rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-200 transition"
              disabled={items.length === 0}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {sorted.length === 0 ? (
          <div className="border border-gray-200 rounded-xl p-6 sm:p-10 text-center bg-gray-50">
            <h2 className="text-base sm:text-lg font-semibold text-black">
              No saved images yet
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Download an image from the dashboard — it will appear here automatically.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex mt-5 px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {sorted.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={item.src}
                    alt={item.prompt || "Downloaded image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-3">
                  <p className="text-xs sm:text-sm font-semibold text-black line-clamp-2">
                    {item.prompt || "Downloaded image"}
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const ext = item.src.startsWith("data:")
                          ? getExtFromDataUrl(item.src)
                          : "png";
                        const fileName =
                          item.fileName ||
                          makeSafeFileName(item.prompt || "image", ext);
                        await downloadSrc(item.src, fileName);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-black text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-800 transition"
                    >
                      <Download size={16} />
                      Download
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const next = removeFromGallery(userKey, item.id);
                        setItems(next);
                      }}
                      className="inline-flex items-center justify-center p-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auth modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

