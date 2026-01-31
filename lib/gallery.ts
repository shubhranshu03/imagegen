export type GalleryItem = {
  id: string;
  src: string;
  prompt?: string;
  createdAt: number;
  fileName?: string;
};

function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getGalleryStorageKey(userKey: string) {
  return `imageverse.gallery.${userKey || "anon"}`;
}

export function loadGallery(userKey: string): GalleryItem[] {
  if (typeof window === "undefined") return [];
  const key = getGalleryStorageKey(userKey);
  const items = safeJsonParse<GalleryItem[]>(window.localStorage.getItem(key), []);
  return Array.isArray(items) ? items : [];
}

export function saveGallery(userKey: string, items: GalleryItem[]) {
  if (typeof window === "undefined") return;
  const key = getGalleryStorageKey(userKey);
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function addToGallery(userKey: string, item: GalleryItem, maxItems = 80): GalleryItem[] {
  const existing = loadGallery(userKey);
  const withoutDup = existing.filter((x) => x.id !== item.id);
  const next = [item, ...withoutDup].slice(0, maxItems);
  saveGallery(userKey, next);
  return next;
}

export function removeFromGallery(userKey: string, id: string): GalleryItem[] {
  const existing = loadGallery(userKey);
  const next = existing.filter((x) => x.id !== id);
  saveGallery(userKey, next);
  return next;
}

export function clearGallery(userKey: string) {
  saveGallery(userKey, []);
}

