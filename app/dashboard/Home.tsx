"use client";

import React, { useState } from "react";
import {
  Upload,
  Zap,
  Settings,
  LogOut,
  Bell,
  Search,
  Home,
  Image as ImageIcon,
  History,
  Share2,
  HelpCircle,
  Wand2,
  ChevronDown,
  Send,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthModal } from "@/app/Component/AuthModal";
import { useAuth } from "@/lib/useAuth";
import { addToGallery } from "@/lib/gallery";

export default function DashboardHome() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [credits, setCredits] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Dropdown states
  const [aspectRatio, setAspectRatio] = useState("1:1 (Square)");
  const [photoStyle, setPhotoStyle] = useState("Photorealistic");
  const [quality, setQuality] = useState("Standard");
  const [modelSelection, setModelSelection] = useState("DALL-E 3");
  const [lighting, setLighting] = useState("Natural");
  
  // Open/close states
  const [openAspectRatio, setOpenAspectRatio] = useState(false);
  const [openPhotoStyle, setOpenPhotoStyle] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  const [openModelSelection, setOpenModelSelection] = useState(false);
  const [openLighting, setOpenLighting] = useState(false);

  const styles = [
    "Photorealistic",
    "Sketch",
    "Oil Painting",
    "Cartoon",
    "3D Render",
    "Cyberpunk",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    // First show confirmation dialog
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    const { error } = await (await import("@/lib/supabase")).supabase.auth.signOut();
    if (!error) {
      setShowLogoutConfirm(false);
      setIsUserMenuOpen(false);
      setIsAuthModalOpen(true);
    }
  };

  const handleGenerate = async () => {
    // Check if user is authenticated
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!uploadedImage || !prompt) {
      alert("Please upload an image and enter a prompt");
      return;
    }
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      // Mock result — in real app, call your API
      setGeneratedImage(uploadedImage);
      setCredits(Math.max(0, credits - 10));
      setIsGenerating(false);
    }, 2000);
  };

  const userGalleryKey = user?.id || user?.email || "anon";

  const getExtFromDataUrl = (dataUrl: string) => {
    const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);/);
    if (!match?.[1]) return "png";
    const ext = match[1].toLowerCase();
    if (ext === "jpeg") return "jpg";
    return ext;
  };

  const makeSafeFileName = (base: string, ext: string) => {
    const cleaned = (base || "imageverse")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40);
    return `${cleaned || "imageverse"}-${Date.now()}.${ext}`;
  };

  const downloadSrc = async (src: string, fileName: string) => {
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
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    const ext = generatedImage.startsWith("data:")
      ? getExtFromDataUrl(generatedImage)
      : "png";
    const fileName = makeSafeFileName(prompt || "image", ext);

    // Save to Gallery (so user can see it later)
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    addToGallery(userGalleryKey, {
      id,
      src: generatedImage,
      prompt: prompt || undefined,
      createdAt: Date.now(),
      fileName,
    });

    // Trigger browser download
    await downloadSrc(generatedImage, fileName);
  };

  return (
    <div className="flex h-screen bg-white flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-300 transition-all duration-300 flex flex-col hidden md:flex`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <h1 className={`${!sidebarOpen && "hidden"} text-xl font-bold text-black`}>
            Imageverse
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <span className="text-black">☰</span>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-3">
          {/* Main navigation */}
          {[
            { icon: Wand2, label: "Create Now", href: "/dashboard" },
            { icon: ImageIcon, label: "Gallery", href: "/dashboard/gallery" },
          ].map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  active ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}

          {/* Settings section */}
          {sidebarOpen && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <p className="text-sm font-bold text-gray-600 px-3 py-2 uppercase">Settings</p>
              <div className="space-y-2 px-2">
                
                {/* Aspect Ratio */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenAspectRatio(!openAspectRatio)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Aspect Ratio
                    <ChevronDown size={16} className={`transition-transform ${openAspectRatio ? "rotate-180" : ""}`} />
                  </button>
                  {openAspectRatio && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      {["1:1 (Square)", "16:9 (Landscape)", "9:16 (Portrait)", "4:3 (Standard)"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setAspectRatio(opt);
                            setOpenAspectRatio(false);
                          }}
                          className={`w-full px-3 py-2 text-xs sm:text-sm text-left transition ${
                            aspectRatio === opt
                              ? "bg-black text-white font-semibold"
                              : "text-black hover:bg-gray-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Photo Style */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenPhotoStyle(!openPhotoStyle)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Photo Style
                    <ChevronDown size={16} className={`transition-transform ${openPhotoStyle ? "rotate-180" : ""}`} />
                  </button>
                  {openPhotoStyle && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      {["Photorealistic", "Oil Painting", "Cartoon", "Sketch", "3D Render", "Cyberpunk"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setPhotoStyle(opt);
                            setOpenPhotoStyle(false);
                          }}
                          className={`w-full px-3 py-2 text-xs sm:text-sm text-left transition ${
                            photoStyle === opt
                              ? "bg-black text-white font-semibold"
                              : "text-black hover:bg-gray-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quality */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenQuality(!openQuality)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Quality
                    <ChevronDown size={16} className={`transition-transform ${openQuality ? "rotate-180" : ""}`} />
                  </button>
                  {openQuality && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {["Standard", "High", "Ultra"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setQuality(opt);
                            setOpenQuality(false);
                          }}
                          className={`w-full px-3 py-2 text-xs sm:text-sm text-left transition ${
                            quality === opt
                              ? "bg-black text-white font-semibold"
                              : "text-black hover:bg-gray-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Model Selection */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenModelSelection(!openModelSelection)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Model Selection
                    <ChevronDown size={16} className={`transition-transform ${openModelSelection ? "rotate-180" : ""}`} />
                  </button>
                  {openModelSelection && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      {["DALL-E 3", "Midjourney", "Stable Diffusion", "Adobe Firefly"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setModelSelection(opt);
                            setOpenModelSelection(false);
                          }}
                          className={`w-full px-3 py-2 text-xs sm:text-sm text-left transition ${
                            modelSelection === opt
                              ? "bg-black text-white font-semibold"
                              : "text-black hover:bg-gray-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lighting */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenLighting(!openLighting)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Lighting
                    <ChevronDown size={16} className={`transition-transform ${openLighting ? "rotate-180" : ""}`} />
                  </button>
                  {openLighting && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {["Natural", "Studio", "Golden Hour", "Neon"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setLighting(opt);
                            setOpenLighting(false);
                          }}
                          className={`w-full px-3 py-2 text-xs sm:text-sm text-left transition ${
                            lighting === opt
                              ? "bg-black text-white font-semibold"
                              : "text-black hover:bg-gray-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-300 space-y-2">
          <Link
            href="/help"
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm"
          >
            <HelpCircle size={18} />
            {sidebarOpen && <span>Help</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full md:w-auto mb-20 md:mb-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-300 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-2 sm:gap-4">
          <h2 className="text-base sm:text-lg font-semibold text-black">Welcome to Imageverse</h2>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Credits Badge */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-lg text-xs sm:text-sm">
              <Zap size={16} className="text-yellow-400 hidden sm:inline" />
              <span className="font-semibold">{credits}</span>
              <span className="hidden sm:inline">Credits</span>
            </div>

            {/* Upgrade Button */}
            <button className="px-2 sm:px-4 py-1.5 sm:py-2 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition text-xs sm:text-sm">
              Upgrade
            </button>

            {/* Notifications */}
            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition text-black">
              <Bell size={18} />
            </button>

            {/* Gallery (mobile quick link since sidebar is hidden on mobile) */}
            <Link
              href="/dashboard/gallery"
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition text-black"
              aria-label="Open Gallery"
            >
              <ImageIcon size={18} />
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full flex items-center justify-center font-bold hover:bg-gray-800 transition text-xs sm:text-base"
              >
                {user?.email?.[0]?.toUpperCase() || "U"}
            </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  {/* Email */}
                  <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                    <p className="text-xs sm:text-sm font-medium text-black break-all">{user?.email || "User"}</p>
                    <p className="text-xs text-gray-500 mt-1">Logged in</p>
          </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 transition font-medium"
                  >
                    Logout
                  </button>
                  </div>
                )}
              </div>
            </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-auto p-3 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50 flex flex-col">

          {/* Post-sign-in message - Shows for 2 seconds after login/register */}
          {showWelcome && (
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
              <div className="bg-white text-black rounded-xl p-6 shadow-xl max-w-sm w-full animate-fade-in border border-gray-200">
                <p className="text-center font-semibold">Please upload an image and enter your prompt and start creating.</p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {generatedImage && (
            <div className="bg-white border border-gray-300 rounded-xl p-3 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">Generated Result</h3>
              <div className="flex flex-col md:flex-row gap-3 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-48 sm:h-80 object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Upload size={16} />
                    Download
                  </button>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-lg font-medium transition flex items-center gap-2 text-sm sm:text-base">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-lg font-medium transition text-sm sm:text-base">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Templates Section - Infinite Scroll */}
          <div className="w-full overflow-hidden">
            <div className="template-scroll flex gap-2 sm:gap-4 w-fit">
              {[
                { name: "YouTube Thumbnail", image: "/thumbnail.jpg" },
                { name: "Professional Headshot", image: "/headshot.jpg" },
                { name: "Portrait Enhance", image: "/enhance.jpg" },
                { name: "AI Avatar", image: "/avtar.jpg" },
                { name: "Product Image", image: "/p1.jpg" },
                { name: "Social Media Post", image: "/post.jpg" },
                { name: "Blog Cover", image: "/blog.jpg" },
                { name: "AI Art / Painting", image: "/art.jpg" },
                // Duplicate for infinite loop
                { name: "YouTube Thumbnail", image: "/thumbnail.jpg" },
                { name: "Professional Headshot", image: "/headshot.jpg" },
                { name: "Portrait Enhance", image: "/enhance.jpg" },
                { name: "AI Avatar", image: "/avtar.jpg" },
                { name: "Product Image", image: "/p1.jpg" },
                { name: "Social Media Post", image: "/post.jpg" },
                { name: "Blog Cover", image: "/blog.jpg" },
                { name: "AI Art / Painting", image: "/art.jpg" }
              ].map((template, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer group flex-shrink-0"
                  onClick={() => setPrompt(template.name)}
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-1 sm:mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-200 group-hover:border-gray-300">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 group-hover:text-black transition text-center leading-tight px-1 line-clamp-2 w-24 sm:w-32">
                    {template.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt/Text Input Section — pushed to bottom */}
          <div className="mt-auto flex flex-col md:flex-row items-stretch md:items-end gap-3 sm:gap-6">
            {/* Left Section — Upload area */}
            <div className="w-full md:flex-1 md:max-w-xs">
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 text-center cursor-pointer hover:border-black transition group h-full">
                <Upload size={18} className="mx-auto text-gray-400 mb-1 group-hover:text-black transition sm:w-5 sm:h-5" />
                <p className="text-black font-medium text-xs">Click or drag</p>
                <p className="text-gray-600 text-xs">PNG, JPG, WebP</p>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.parentElement?.classList.add("border-black", "bg-gray-50");
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.parentElement?.classList.remove("border-black", "bg-gray-50");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      handleImageUpload({ target: { files } } as any);
                    }
                  }}
                />
              </label>
              {uploadedImage && (
                <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                  <span>✅</span> Image uploaded
                </div>
              )}
            </div>

            {/* Right Section — Text Input with Send Button Inside */}
            <div className="w-full md:flex-1 flex justify-center">
              <div className="w-full max-w-xl relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how you want to transform the image..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-14 bg-white border border-gray-300 rounded-full text-xs sm:text-sm text-black placeholder-gray-400 placeholder-opacity-70 focus:outline-none focus:border-black resize-none"
                  rows={2}
              />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Generate"
                >
                  <Send size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => {
          setIsAuthModalOpen(false);
          setShowWelcome(true);
          setTimeout(() => setShowWelcome(false), 2000);
        }}
      />

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6 text-center">
              <h3 className="text-xl font-bold text-white">Confirm Logout</h3>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <p className="text-gray-700 text-center mb-6">
                Are you sure you want to logout? You will need to sign in again to access your account.
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
