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

export default function DashboardHome() {
  const [credits, setCredits] = useState(150);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("Photorealistic");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
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

  const handleGenerate = async () => {
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

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-300 transition-all duration-300 flex flex-col`}
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
            { icon: Wand2, label: "Create Now", active: true },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                item.active
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}

          {/* Settings section */}
          {sidebarOpen && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <p className="text-sm font-bold text-gray-600 px-3 py-2 uppercase">Settings</p>
              <div className="space-y-3 px-3">
                
                {/* Aspect Ratio */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenAspectRatio(!openAspectRatio)}
                    className="w-full px-4 py-3 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Aspect Ratio
                    <ChevronDown size={18} className={`transition-transform ${openAspectRatio ? "rotate-180" : ""}`} />
                  </button>
                  {openAspectRatio && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {["1:1 (Square)", "16:9 (Landscape)", "9:16 (Portrait)", "4:3 (Standard)"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setAspectRatio(opt);
                            setOpenAspectRatio(false);
                          }}
                          className={`w-full px-4 py-3 text-sm text-left transition ${
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
                    className="w-full px-4 py-3 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Photo Style
                    <ChevronDown size={18} className={`transition-transform ${openPhotoStyle ? "rotate-180" : ""}`} />
                  </button>
                  {openPhotoStyle && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {["Photorealistic", "Oil Painting", "Cartoon", "Sketch", "3D Render", "Cyberpunk"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setPhotoStyle(opt);
                            setOpenPhotoStyle(false);
                          }}
                          className={`w-full px-4 py-3 text-sm text-left transition ${
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
                    className="w-full px-4 py-3 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Quality
                    <ChevronDown size={18} className={`transition-transform ${openQuality ? "rotate-180" : ""}`} />
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
                          className={`w-full px-4 py-3 text-sm text-left transition ${
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
                    className="w-full px-4 py-3 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Model Selection
                    <ChevronDown size={18} className={`transition-transform ${openModelSelection ? "rotate-180" : ""}`} />
                  </button>
                  {openModelSelection && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {["DALL-E 3", "Midjourney", "Stable Diffusion", "Adobe Firefly"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setModelSelection(opt);
                            setOpenModelSelection(false);
                          }}
                          className={`w-full px-4 py-3 text-sm text-left transition ${
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
                    className="w-full px-4 py-3 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900 transition text-left flex justify-between items-center"
                  >
                    Lighting
                    <ChevronDown size={18} className={`transition-transform ${openLighting ? "rotate-180" : ""}`} />
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
                          className={`w-full px-4 py-3 text-sm text-left transition ${
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
        <div className="p-4 border-t border-gray-300 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <HelpCircle size={20} />
            {sidebarOpen && <span>Help</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">Welcome to Imageverse</h2>
          <div className="flex items-center gap-4">
            {/* Credits Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg">
              <Zap size={18} className="text-yellow-400" />
              <span className="font-semibold">{credits} Credits</span>
            </div>

            {/* Upgrade Button */}
            <button className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition">
              Upgrade
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition text-black">
              <Bell size={20} />
            </button>

            {/* Profile */}
            <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold hover:bg-gray-800 transition">
              U
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-auto p-6 space-y-6 bg-gray-50 flex flex-col">

          {/* Results Section */}
          {generatedImage && (
            <div className="bg-white border border-gray-300 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Generated Result</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <button className="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition flex items-center gap-2">
                    <Upload size={18} />
                    Download
                  </button>
                  <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-lg font-medium transition flex items-center gap-2">
                    <Share2 size={18} />
                    Share
                  </button>
                  <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-lg font-medium transition">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Templates Section - Infinite Scroll */}
          <div className="w-full overflow-hidden">
            <div className="template-scroll flex gap-4 w-fit">
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
                  <div className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-200 group-hover:border-gray-300">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 group-hover:text-black transition text-center leading-tight px-1 line-clamp-2 w-32">
                    {template.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt/Text Input Section — pushed to bottom */}
          <div className="mt-auto flex items-end gap-6">
            {/* Left Section — Upload area */}
            <div className="flex-1 max-w-xs">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-black transition">
                <Upload size={20} className="mx-auto text-gray-400 mb-1" />
                <p className="text-black font-medium text-xs">Click or drag</p>
                <p className="text-gray-600 text-xs">PNG, JPG, WebP</p>
              </div>
            </div>

            {/* Right Section — Text Input with Send Button Inside */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-xl relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how you want to transform the image..."
                  className="w-full px-4 py-3 pr-14 bg-white border border-gray-300 rounded-full text-sm text-black placeholder-gray-500 focus:outline-none focus:border-black resize-none"
                  rows={2}
                />
                <button
                  onClick={handleGenerate}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition shadow-md hover:shadow-lg"
                  title="Generate"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
