"use client";

import React, { useRef, useState } from "react";

interface Testimonial {
  id: string;
  video: string;
  poster: string;
  author: string;
  designation: string;
  quote?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "v1",
    video: "/videos/testimonial-1.mp4",
    poster: "/images/testimonial-1.webp",
    author: "Parents of Vivan",
    designation: "Class 5th Student",
    quote: "NIMT transformed our child's confidence and learning path.",
  },
  {
    id: "v2",
    video: "/videos/testimonial-2.mp4",
    poster: "/images/testimonial-2.webp",
    author: "Parent Of Kavyansh",
    designation: "Class 11th Student",
    quote: "Best academic environment with dedicated faculty.",
  },
  {
    id: "v3",
    video: "/videos/testimonial-3.mp4",
    poster: "/images/testimonial-3.webp",
    author: "Parent Of Vani Kaushik",
    designation: "Class 5th Student",
    quote: "Comprehensive growth beyond traditional academics.",
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-slate-950 p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl hover:shadow-[#0041f5]/20 transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[23px] bg-slate-900">
        
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          src={item.video}
          controls={isPlaying}
          playsInline
          preload="auto"
          poster={item.poster}
          className="absolute inset-0 w-full h-full object-cover z-0"
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Interactive Overlay */}
        <button
          type="button"
          aria-label={`Play video testimonial from ${item.author}`}
          className={`absolute inset-0 z-20 w-full text-left cursor-pointer flex flex-col justify-between p-6 bg-transparent border-0 transition-all duration-500 ease-in-out ${
            isPlaying ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
          }`}
          onClick={handlePlay}
        >
          {/* Poster Image */}
          <img
            src={item.poster}
            alt={item.author}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out z-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* Premium Ambient Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 z-10 opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

          {/* Top Info Bar */}
          <div className="relative z-20 flex items-center justify-between w-full">
            {/* 5 Star Rating Tag */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-semibold shadow-md">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            {/* Reel Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0041f5]/80 backdrop-blur-md border border-blue-400/30 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-blue-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Video Reel
            </span>
          </div>

          {/* Center Pulsing Play Button */}
          <div className="relative z-20 my-auto self-center flex items-center justify-center">
            {/* Glowing Pulse Ring */}
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0041f5]/40 animate-ping opacity-75" />
            
            {/* Main Play Circle */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#0041f5] to-blue-700 text-white flex items-center justify-center shadow-2xl shadow-blue-600/60 group-hover:scale-110 transition-transform duration-300 border-2 border-white/40">
              <svg
                className="w-8 h-8 fill-white ml-1 filter drop-shadow-md"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-20 space-y-2.5 w-full">
            {/* Optional Quote Callout */}
            {item.quote && (
              <p className="text-slate-200 text-xs sm:text-sm font-medium italic line-clamp-2 bg-slate-950/50 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-inner">
                "{item.quote}"
              </p>
            )}

            <div className="pt-2 border-t border-white/15 flex items-center justify-between">
              <div>
                <h3 className="text-white font-extrabold text-base sm:text-lg leading-snug tracking-wide drop-shadow-md">
                  {item.author}
                </h3>
                <p className="text-blue-300/90 text-xs font-semibold">
                  {item.designation}
                </p>
              </div>

              {/* Audio Equalizer Icon Accent */}
              <div className="flex items-end gap-0.5 h-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="w-0.5 h-full bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-0.5 h-2/3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-0.5 h-4/5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        </button>

      </div>
    </div>
  );
}

export default function ParentsCorner() {
  return (
    <section
      id="parents-corner"
      className="py-20 lg:py-28 bg-[#f6eada] text-slate-900 relative font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0041f5]/10 border border-[#0041f5]/20 backdrop-blur-sm shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0041f5] animate-pulse" />
            <span className="text-[#0041f5] text-xs font-extrabold tracking-widest uppercase">
              Parent Testimonials
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            What Families Say About NIMT Beacon School
          </h2>

          <div className="w-20 h-1.5 bg-[#0041f5] mx-auto rounded-full" />
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}