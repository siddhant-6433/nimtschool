import Image from "next/image";
import { Instagram, Play, ArrowUpRight } from "lucide-react";

/**
 * Instagram Reels showcase.
 *
 * This is a native, dependency-free section (no third-party embed script) so it
 * does not hurt page performance. To feature real reels, replace each entry's
 * `href` with the reel permalink (e.g. https://www.instagram.com/reel/XXXX/) and
 * `thumbnail` with a screenshot of that reel's cover frame placed in /public.
 */
const INSTAGRAM_HANDLE = "nimtschool";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
const REELS_URL = `${INSTAGRAM_URL}reels/`;

interface Reel {
  thumbnail: string;
  href: string;
  caption: string;
}

const REELS: Reel[] = [
  {
    thumbnail: "/campus1.webp",
    href: REELS_URL,
    caption: "A day on the NIMT Beacon campus",
  },
  {
    thumbnail: "/Football.webp",
    href: REELS_URL,
    caption: "Sports & athletics highlights",
  },
  {
    thumbnail: "/Robotics.webp",
    href: REELS_URL,
    caption: "Robotics & innovation lab",
  },
  {
    thumbnail: "/dance-studio.webp",
    href: REELS_URL,
    caption: "Cultural performances",
  },
];

export default function InstagramReels() {
  return (
    <section
      id="instagram-reels"
      className="py-20 bg-gradient-to-b from-white to-[#faf8f5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[#0041f5] text-xs font-black tracking-widest uppercase">
              <Instagram className="w-4 h-4" />
              @{INSTAGRAM_HANDLE}
            </span>
            <h2 className="text-3xl md:text-5xl font-tailwind font-extrabold tracking-tight text-slate-900 mt-2">
              Life at NIMT Beacon, in Reels
            </h2>
            <p className="text-slate-600 mt-3 text-sm md:text-base leading-relaxed">
              Follow us on Instagram for campus moments, student achievements,
              events and everyday life at NIMT Beacon School.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] shadow-lg shadow-pink-500/20 hover:opacity-95 hover:-translate-y-0.5 transition-all"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </div>

        {/* Reels grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {REELS.map((reel, i) => (
            <a
              key={i}
              href={reel.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch reel: ${reel.caption}`}
              className="group relative block aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <Image
                src={reel.thumbnail}
                alt={reel.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Play badge */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-xs font-semibold leading-snug line-clamp-2">
                  {reel.caption}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-[#fffc4d] uppercase tracking-wider">
                  Watch on Instagram
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <a
            href={REELS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0041f5] hover:text-slate-900 transition-colors uppercase tracking-wider"
          >
            View all reels
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
