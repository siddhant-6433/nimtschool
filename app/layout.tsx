import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script"; // Imported for safe script injection

import AdmissionsChatbot from "@/components/AdmissionsChatbot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  // "optional" avoids a late font swap that would re-fire (and delay) the LCP
  // on slow connections; the metric-matched fallback keeps CLS at zero.
  display: "optional",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NIMT Beacon School | Best CBSE Day & Boarding School in Ghaziabad",
  description:
    "Discover educational excellence at NIMT Beacon School, Ghaziabad. Offering Play School, Day Boarding, NEET/JEE foundation, and safe residential campus. Established 2001.",
  keywords: [
    "Best CBSE School in Ghaziabad",
    "Best Boarding School in Ghaziabad",
    "Top CBSE School in Ghaziabad",
    "Day Boarding School in Ghaziabad",
    "CBSE School Near Me",
    "School Admission 2026",
    "Best School for Holistic Development",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to third-party origins used on first paint */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="" />

        {/* 1. Google Tag Manager — loaded LAZILY (on first interaction or after a
            short idle fallback) instead of eagerly. GTM cascades into GA4, Google
            Ads and the Meta Pixel (~600KB of JS); loading those during the initial
            render saturates the main thread and pushes LCP out by ~1.8s. Deferring
            them keeps the hero paint fast while analytics still fires within a few
            seconds / as soon as the user engages. */}
        <Script
          id="gtm-lazy-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                var loaded=false;
                var events=['scroll','mousemove','touchstart','click','keydown'];
                function loadGTM(){
                  if(loaded)return; loaded=true;
                  events.forEach(function(e){w.removeEventListener(e,loadGTM);});
                  w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),
                      dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;
                  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                }
                events.forEach(function(e){w.addEventListener(e,loadGTM,{passive:true,once:true});});
                // Fallback so analytics still fires for users who never interact.
                w.setTimeout(loadGTM,4000);
              })(window,document,'script','dataLayer','GTM-M9J8RJ7V');
            `,
          }}
        />
      </head>
      
      <body className="font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        {/* 2. Google Tag Manager (noscript) - Placed immediately after the opening <body> tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9J8RJ7V"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <AdmissionsChatbot />
      </body>
    </html>
  );
}