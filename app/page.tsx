"use client";

import React, { useState, useEffect } from "react";
import ParentsCorner from "@/components/ParentsCorner";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import InstagramReels from "@/components/InstagramReels";
import { pushLeadToUniOs } from "@/lib/crm";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  Users,
  Award,
  ChevronRight,
  TrendingUp,
  Heart,
  Cpu,
  Tv,
  Music,
  Target,
  Clock,
  Coffee,
  CheckCircle2,
  Lock,
  ArrowRight,
  MapPin,
  Calendar,
  Phone,
  FileText,
  Star,
  Quote,
  Activity,
  Plus,
  Minus,
  Navigation,
} from "lucide-react";

export default function Home() {

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlay = (currentIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });
  };

  
  // Setup Admissions Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    phone: "",
    email: "",
    targetClass: "Nursery",
  });

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.parentName && formData.studentName && formData.phone) {
      pushLeadToUniOs({
        studentName: formData.studentName,
        guardianName: formData.parentName,
        phone: formData.phone,
        email: formData.email,
        course: formData.targetClass,
        source: "homepage-admissions-form",
      });
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          parentName: "",
          studentName: "",
          phone: "",
          email: "",
          targetClass: "Nursery",
        });
      }, 5000);
    }
  };

  // State for interactive Timeline/Curriculum Journey
  const [activeTimelineStage, setActiveTimelineStage] = useState("early");

  const timelineStages = [
    {
      id: "early",
      title: "Early Years",
      subtitle: "Play school to Nursery",
      image: "/Nursery.webp",
      highlights: [
        "Learning through fun and play-based activities",
        "Games that develop motor and coordination skills",
        "Personal attention with a 10:1 student-teacher ratio",
        "Safe day care facilities with comfortable nap areas",
      ],
      description:

        "A happy and caring environment where young children learn, explore, and grow through fun activities. Our Early Years program helps children build confidence, communication skills, and a love for learning in safe and engaging classrooms.",
      link: "/day-school",
    },
    {
      id: "primary",
      title: "Primary (Classes I-V)",
      subtitle: "The Foundation of Inquiry",
      image: "/primary.webp",
      highlights: [
        "Introduction to STEM through interactive learning",
        "Strong foundation in languages, reading, and logical thinking",
        "Music, theatre, and public speaking activities",
        "Project-based learning to encourage curiosity and confidence",
      ],
      description:
        "Building strong skills in language, mathematics, and environmental studies. Students learn teamwork, creativity, and problem-solving through fun and practical activities.",
      link: "/day-school",
    },
    {
      id: "middle",
      title: "Middle School (VI-VIII)",
      subtitle: "Nurturing Grit & Intellect",
      image: "/Middle.webp",
      highlights: [
        "Robotics and basic coding programs",
        "Professional training in rifle and pistol shooting",
        "Foreign language options: French, German, and Spanish",
        "Practical learning through projects and experiments",
      ],
      description:
        "Helping students turn classroom learning into real-world skills. Middle school encourages independent thinking, hands-on science learning, and specialized sports training.",
      link: "/day-school",
    },
    {
      id: "secondary",
      title: "Secondary (IX-X)",
      subtitle: "CBSE Prep & Future Shaping",
      image: "/secondary.webp",
      highlights: [
        "Comprehensive CBSE board exam preparation",
        "Foundation coaching for competitive exams",
        "Public speaking and debate participation",
        "Leadership seminars and career track profiling",
      ],
      description:
        "Focused on strong CBSE board exam preparation while helping students build confidence, leadership skills, and career awareness. Students receive personal guidance and mentorship to support their academic and future goals.",
      link: "/academics",
    },
    {
      id: "senior",
      title: "Senior Secondary (XI-XII)",
      subtitle: "Gateway to Elite Universities",
      image: "/SeniorSecondary.webp",
      highlights: [
        "Science, Commerce, and Humanities streams",
        "Integrated JEE & NEET preparation",
        "University admission and career guidance",
        "Innovation, research, and entrepreneurship projects",
      ],
      description:
        "Designed to help students excel in CBSE board exams and prepare for admission to leading universities in India and abroad. Expert faculty, focused guidance, and career planning help students achieve their future goals.",
      link: "/academics",
    },
  ];

  // State for World Class Campus Gallery filter
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("all");

  const campusGallery = [
    {
      title: "Physics Laboratory",
      category: "labs",
      image: "/physics-lab.webp",
    },
    {
      title: "Chemistry Laboratory",
      category: "labs",
      image: "/chemistry-lab.webp",
    },
    {
      title: "Biology Laboratory",
      category: "lab",
      image: "/bio-lab.webp",
    },
    {
      title: "School Library Resource Centre",
      category: "academics",
      image: "/library.webp",
    },
    {
      title: "Olympic Standard Indoor Shooting Range",
      category: "sports",
      image: "/Indoor.webp",
    },
    {
      title: " Air-Conditioned Dormitories",
      category: "residence",
      image: "/hostel-room.webp",
    },
    {
      title: "Nutritious Dining Hall",
      category: "residence",
      image: "/dining-hall.webp",
    },
    {
      title: "Football Field",
      category: "sports",
      image: "/Football.webp",
    },
    
  ];

  const filteredGallery =
    activeGalleryFilter === "all"
      ? campusGallery
      : campusGallery.filter((item) => item.category === activeGalleryFilter);

  // FAQ Accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mobile-first: the hero background video is decorative, so we never ship it
  // to phones, to users on a metered/slow connection, or to those who prefer
  // reduced motion — they get the optimized poster image only. On larger
  // screens we still defer the video until the browser is idle so it never
  // competes with LCP.
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = nav.connection?.saveData === true;
    const slowNetwork = /(^|-)2g$/.test(nav.connection?.effectiveType || "");
    if (isSmallScreen || prefersReducedMotion || saveData || slowNetwork) {
      return; // poster-only experience
    }
    const start = () => setHeroVideoReady(true);
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(start);
    } else {
      const t = setTimeout(start, 1500);
      return () => clearTimeout(t);
    }
  }, []);
  // Once the <source> is injected, tell the video element to load & play it.
  useEffect(() => {
    if (heroVideoReady && heroVideoRef.current) {
      heroVideoRef.current.load();
    }
  }, [heroVideoReady]);

  const faqs = [
    {
      question: "What is the admission procedure for the 2026-27 academic year?",
      answer:
        "The process starts by filling out our online Inquiry Form or visiting the school campus in Ghaziabad. Our admissions team will then guide you through a personalized campus tour, an interactive session with the parents, and a baseline skill assessment for your child to determine placement.",
    },
    {
      question: "What streams and integrated competitive coaching are offered?",
      answer:
        "NIMT Beacon School offers Science, Commerce, and Humanities. We provide an Integrated Foundation program for JEE (Engineering) & NEET (Medical) from Class VI onwards, taught by  coaching veterans, fully synchronized with CBSE hours.",
    },
    {
      question: "What is the structure and schedule of the Day Boarding program?",
      answer:
        "Our Day Boarding operates from 9:00 AM to 5:00 PM. From 9:00 AM to 2:00 PM, children follow academic cycles. From 2:00 PM onwards, they enjoy nutritious hot lunches, followed by mandatory supervised homework tutorials, foreign language classes, and specialized sports coaching.",
    },
    {
      question: "Can you describe the boarding and safety configurations on campus?",
      answer:
        "We maintain  air-conditioned separate wings for boys and girls, supervised by experienced resident house wardens. Security is absolute: 24/7 CCTV surveillance, biometric check-ins, a full-time residential nurse with ambulance access, and organic, healthy meals prepared under strict hygiene standards.",
    },
    {
      question: "Where is NIMT Beacon School situated, and is transportation available?",
      answer:
        "The campus is situated in Ansal Avantika-II, Ghaziabad, Uttar Pradesh. We operate a fleet of , fully air-conditioned GPS-enabled school buses with on-board cameras, male/female security guards, and real-time tracking apps for parents.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div id="school-homepage">
      {/* SECTION 1: HERO SECTION */}
<section
  id="cinematic-hero"
  className="relative min-h-screen flex items-center justify-center overflow-hidden text-white pt-24 font-sans"
>
  {/* Background Campus Video */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Optimized poster as the LCP element — served as a static asset with high
        fetch priority so it paints instantly. The video is deferred and layered
        on top, so it never delays LCP. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/hero-poster.webp"
      srcSet="/hero-poster-sm.webp 768w, /hero-poster.webp 1280w"
      sizes="100vw"
      alt="NIMT Beacon Campus"
      fetchPriority="high"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover object-top"
    />
    <video
      ref={heroVideoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 w-full h-full object-cover object-top"
    >
      {heroVideoReady && <source src="/campus-video.min.mp4" type="video/mp4" />}
      Your browser does not support the video tag.
    </video>

    {/* Refined Overlays for Ultimate Text Contrast */}
    <div className="absolute inset-0 bg-[#0041f5]/30" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40" />
  </div>

  {/* Hero Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center py-20">
    {/* Plain (non-motion) elements: this is the LCP region, so it must paint
        at first paint and never wait for framer-motion to hydrate. */}
    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0041f5]/90 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 shadow-xl">
      <Sparkles className="w-4 h-4 text-[#fffc4d] animate-pulse" />
      Ghaziabad's No.1 Boarding & Day Boarding Institution
    </div>

    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight leading-[1.15] max-w-5xl mx-auto mb-8 drop-shadow-md">
      Where{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-[#fffc4d]">
        Future Leaders
      </span>
      <br className="hidden md:inline" />
      Begin Their Journey
    </h1>

    <p className="text-base sm:text-xl text-blue-100 max-w-3xl mx-auto mb-12 font-medium">
      <strong className="text-white font-semibold">CBSE Affiliated</strong>{" "}
      <span className="text-blue-300/60 mx-2">•</span>{" "}
      <strong className="text-white font-semibold">Nursery to Class XII</strong>{" "}
      <span className="text-blue-300/60 mx-2">•</span>{" "}
      <strong className="text-white font-semibold">
        Day Boarding & Residential Boarding
      </strong>
    </p>
  </div>
</section>
      {/* SECTION 2: WHY PARENTS CHOOSE NIMT */}
  <section id="why-choose-us" className="py-24 bg-slate-50 font-sans relative overflow-hidden">
  {/* Ambient Decorative Background Glow */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0041f5] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#0041f5] animate-pulse" />
        The NIMT Edge
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-950 leading-tight">
        Why Parents Choose <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0041f5] to-blue-700">
          NIMT Beacon School
        </span>
      </h2>

      <p className="mt-4 text-slate-600 text-base md:text-lg font-normal max-w-2xl mx-auto">
        Empowering students with academic excellence, leadership skills, and world-class facilities in a nurturing environment.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: "Strong CBSE Academics", img: "/cbse.webp" },
        { title: "Safe & Comfortable Boarding", img: "/hostel.webp" },
        { title: "IIT & JEE Preparation", img: "/iit.webp" },
        { title: "Smart Digital Classrooms", img: "/smart-classroom.webp" },
        { title: "Robotics & AI Labs", img: "/Robotics.webp" },
        { title: "Indoor Shooting Facility", img: "/Indoor.webp" },
        { title: "Leadership Development", img: "/Leadership.webp" },
        { title: "Student Well-Being & Care", img: "/Care.webp" },
      ].map((item, idx) => (
        <div
          key={idx}
          className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#0041f5]/40 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
        >
          {/* Image & Gradient Container */}
          <div className="aspect-[4/3] sm:aspect-[1/1] relative overflow-hidden bg-slate-100">
            <Image
              src={item.img}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Top Index Badge */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider">
              {(idx + 1).toString().padStart(2, "0")}
            </div>

            {/* Overlay Text Content */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <h3 className="font-sans font-bold text-lg text-white leading-snug group-hover:text-yellow-300 transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* SECTION 3: NIMT IN NUMBERS */}
  <section id="academic-stats" className="py-20 bg-[#0041f5] text-white overflow-hidden relative font-sans">
  {/* Ambient Decorative Background Glows */}
  <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
      {[
        { num: "25+", label: "Years of Educational Excellence" },
        { num: "2000+", label: "Nurtured Global Scholars" },
        { num: "98%", label: "Verified Parent Satisfaction Rate" },
        { num: "100+", label: "Top National & Global Uni Placements" },
        { num: "85%+", label: "Consistent Class XII First Division Outcomes" },
      ].map((stat, idx) => (
        <div
          key={idx}
          className={`group bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-white/30 rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center ${
            idx === 4 ? "col-span-2 lg:col-span-1" : "col-span-1"
          }`}
        >
          {/* Stat Number */}
          <p className="text-4xl sm:text-5xl font-sans font-black text-[#fffc4d] tracking-tight leading-none mb-3 group-hover:scale-105 transition-transform duration-300">
            {stat.num}
          </p>

          {/* Accent Line */}
          <div className="w-8 h-0.5 bg-sky-200/50 rounded-full mb-3 group-hover:w-14 group-hover:bg-[#fffc4d] transition-all duration-300" />

          {/* Label */}
          <p className="text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-wider leading-snug">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* SECTION 4: CURRICULUM TIMELINE */}
  <section id="academic-journey" className="py-24 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden font-sans">
  {/* Ambient Background Glows */}
  <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-14">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0041f5] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#0041f5] animate-pulse" />
        The Scholastic Timeline
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-950 leading-tight">
        Our Multi-Stage <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0041f5] to-blue-700">
          Academic Journey
        </span>
      </h2>

      <p className="text-base text-slate-600 max-w-xl mx-auto mt-4 font-normal leading-relaxed">
        Explore how NIMT shapes character and unlocks peak academic potential from early childhood development up to competitive Class XII board prep.
      </p>
    </div>

    {/* Timeline Switch Controls */}
    <div className="flex flex-wrap justify-center gap-2.5 mb-12 p-2 bg-slate-200/50 backdrop-blur-md rounded-2xl sm:rounded-full max-w-fit mx-auto border border-slate-300/60 shadow-inner">
      {timelineStages.map((stage) => {
        const isActive = activeTimelineStage === stage.id;
        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveTimelineStage(stage.id)}
            className={`px-5 py-2.5 rounded-xl sm:rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
              isActive
                ? "bg-[#0041f5] text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                : "text-slate-700 hover:text-[#0041f5] hover:bg-white/60"
            }`}
          >
            {stage.title}
          </button>
        );
      })}
    </div>

    {/* Active Timeline Content Block */}
    <AnimatePresence mode="wait">
      {timelineStages.map(
        (stage) =>
          activeTimelineStage === stage.id && (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-blue-900/5 border border-slate-200/80"
            >
              {/* Image Container with Floating Badge */}
              <div className="h-[280px] sm:h-[380px] relative rounded-2xl overflow-hidden shadow-md group">
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#0041f5] text-xs font-bold tracking-wide shadow-sm border border-white/50">
                  <span className="w-2 h-2 rounded-full bg-[#0041f5]" />
                  <span>{stage.subtitle}</span>
                </div>
              </div>

              {/* Text & Curriculum Content */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block text-xs font-bold text-amber-800 bg-amber-100/80 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                    {stage.subtitle}
                  </span>
                  <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-950 leading-tight">
                    {stage.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {stage.description}
                </p>

                {/* Curriculum Highlights */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">
                    Curriculum Highlights
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {stage.highlights.map((hlt, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800 hover:bg-blue-50/50 hover:border-blue-100 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{hlt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explore Details Link Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center">
                  <Link
                    href={stage.link}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0041f5] hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <span>Explore Program Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )
      )}
    </AnimatePresence>
  </div>
</section>

      {/* SECTION 5: DAY SCHOOL */}
<section id="day-school" className="py-24 bg-white relative overflow-hidden font-sans">
  {/* Ambient Background Blur */}
  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
      {/* Content Column */}
      <div className="space-y-6 order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0041f5] text-xs font-bold tracking-widest uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#0041f5] animate-pulse" />
          Standard Cohort
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-tight">
          A Complete <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0041f5] to-blue-700">
            Day School Experience
          </span>
        </h2>

        <p className="text-base text-slate-600 leading-relaxed font-normal">
          Our Day School program helps students grow through quality CBSE academics, sports, creative activities, and teamwork. It is ideal for families looking for a balanced education in a safe and supportive environment.
        </p>

        {/* Features Grid */}
        <div id="day-school-features" className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {[
            { name: "Smart Learning Classrooms", icon: Tv },
            { name: "Astronomy & space workshops", icon: Sparkles },
            { name: "Modern Computer Labs", icon: Cpu },
            { name: "Music, Dance & Fine Art cycles", icon: Music },
          ].map((fea, i) => (
            <div
              key={i}
              className="bg-slate-50/80 hover:bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-[#0041f5]/30 hover:shadow-md transition-all duration-300 flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0041f5]/10 group-hover:bg-[#0041f5] flex items-center justify-center shrink-0 transition-colors duration-300">
                <fea.icon className="w-5 h-5 text-[#0041f5] group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-snug">
                {fea.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link
            href="/day-school"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0041f5] hover:bg-blue-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95"
          >
            <span>Explore Day School Features</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Image Column */}
      <div className="relative w-full max-w-[500px] mx-auto order-1 lg:order-2 group">
        {/* Glow Behind Card */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

        <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80">
          <Image
            src="/day-school-class.webp"
            alt="Active primary day school class"
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

          {/* Floating Glassmorphic Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#0041f5] border border-white/60 shadow-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0041f5]" />
            Nursery to Class XII
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* SECTION 6: DAY BOARDING */}
   <section id="day-boarding" className="py-20 lg:py-28 bg-[#0041f5] text-white relative overflow-hidden font-sans">
  {/* Subtle Background Glows */}
  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#fffc4d]/10 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* Left Column: Image Container */}
      <div className="lg:col-span-5 relative">
        <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/15 group">
          <Image
            src="/day-boarding.webp"
            alt="Active sports period under day boarding"
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          {/* Glassmorphism Badge */}
          <div className="absolute bottom-5 left-5 right-5 bg-slate-950/80 p-4 rounded-2xl backdrop-blur-md border border-white/15 text-center shadow-lg">
            <p className="text-xs font-extrabold text-[#fffc4d] uppercase tracking-wider">
              Ideal for Professional Dual-Working Parents
            </p>
            <p className="text-[12px] text-sky-100 mt-1 font-medium">
              Academics + Healthy Dining + Extra Sports + Supervised Tutoring
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Content Container */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Header Tag & Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#fffc4d] animate-pulse" />
            <span className="text-[#fffc4d] text-xs font-bold tracking-widest uppercase">
              The Ultimate Convenience
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Supervised Day Boarding Program <span className="text-[#fffc4d]">(9 AM – 5 PM)</span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-base text-sky-100/90 leading-relaxed font-normal">
          Designed especially for working and corporate parents, our Day Boarding Program provides a safe, structured, and productive environment for children throughout the day.
          Students attend regular classes, enjoy nutritious meals, complete their homework under teacher supervision, and participate in sports and activities before returning home.
          This means parents can focus on their professional commitments with peace of mind, knowing their child is learning, growing, and being cared for in a supportive environment.
        </p>

        {/* Daily Schedule Timeline Block */}
        <div className="bg-slate-950/40 rounded-2xl p-6 border border-white/15 backdrop-blur-md space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <p className="text-xs uppercase tracking-widest font-extrabold text-[#fffc4d]">
              Daily Chronology
            </p>
            <span className="text-[11px] text-sky-100/70 font-medium">Structured & Balanced</span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Slot 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <span className="font-semibold text-xs text-slate-100 flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                  <Clock className="w-4 h-4" />
                </div>
                09:00 AM – 02:00 PM
              </span>
              <span className="text-[#fffc4d] font-bold text-xs uppercase tracking-wide sm:text-right">
                Core Academic Sessions
              </span>
            </div>

            {/* Slot 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <span className="font-semibold text-xs text-slate-100 flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                  <Coffee className="w-4 h-4" />
                </div>
                02:00 PM – 03:00 PM
              </span>
              <span className="text-[#fffc4d] font-bold text-xs uppercase tracking-wide sm:text-right">
                Hot Lunch & Quiet Lounge
              </span>
            </div>

            {/* Slot 3 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <span className="font-semibold text-xs text-slate-100 flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                  <Target className="w-4 h-4" />
                </div>
                03:00 PM – 05:00 PM
              </span>
              <span className="text-[#fffc4d] font-bold text-xs uppercase tracking-wide sm:text-right">
                Creative Clubs & Sports Coaching
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/day-boarding"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#fffc4d] text-slate-950 hover:bg-yellow-300 hover:shadow-lg hover:shadow-[#fffc4d]/20 transition-all text-center transform hover:-translate-y-0.5"
          >
            Learn Day Boarding Secrets
          </Link>
        
        </div>

      </div>

    </div>
  </div>
</section>

      {/* SECTION 7: FULL RESIDENTIAL BOARDING */}
    <section id="full-boarding" className="py-20 lg:py-28 bg-[#f6eada] text-slate-900 relative font-sans">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0041f5]/10 border border-[#0041f5]/15">
        <span className="w-2 h-2 rounded-full bg-[#0041f5] animate-pulse" />
        <span className="text-[#0041f5] text-xs font-extrabold tracking-widest uppercase">
          Home Away From Home
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
        Safe & Comfortable Residential Boarding
      </h2>
      
      <p className="text-base text-slate-650 max-w-xl mx-auto leading-relaxed">
        Our separate boarding facilities for boys and girls provide a safe and supportive environment where students can learn and grow with confidence.
      </p>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* Left Column: Text & Features */}
      <div className="lg:col-span-7 space-y-8">
        
        <div className="space-y-4">
          <h3 className="font-extrabold text-2xl sm:text-3xl text-slate-950 leading-snug">
            A Place to Learn, Grow & Thrive
          </h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Inspired by international boarding school standards, NIMT Beacon's boarding program focuses on academics, personal growth, discipline, and student well-being. With dedicated mentors, caring wardens, medical support, and engaging activities, students enjoy a balanced and enriching residential experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            "Air-conditioned rooms with personal study desks",
            "Separate hostel facilities for boys and girls",
            "Caring residential wardens and mentors",
            "On-campus medical care & professional counselors",
            "Healthy and nutritious meals planned for student wellness",
            "Weekend activities, educational trips, workshops & recreation",
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-slate-900/5 shadow-sm hover:shadow-md hover:bg-white transition-all"
            >
              <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-800 leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/full-boarding"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0041f5] text-white hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5"
          >
            Tour Our Hostel Facilities
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Right Column: Image Container */}
      <div className="lg:col-span-5 relative">
        <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-900/10 group">
          <Image
            src="/hostel.webp"
            alt="Safe hostel study lounge"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />


        </div>
      </div>

    </div>
  </div>
</section>

      {/* SECTION 8: WORLD CLASS CAMPUS GALLERY */}
      <section id="campus-life" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#0041f5] text-xs font-black tracking-widest uppercase">The Campus Architecture</span>
            <h2 className="text-3xl md:text-5xl font-tailwind font-black tracking-tight text-slate-950 mt-2">
              Explore Our World Class Campus
            </h2>
            <div className="w-16 h-1 bg-[#0041f5] mx-auto mt-4" />
          </div>

          {/* Filter Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 pb-4 border-b border-light-200">
            {[
              { id: "all", name: "All Campus Facilities" },
              { id: "labs", name: "Science Labs" },
              { id: "academics", name: "Academics & Library" },
              { id: "sports", name: "Sports Complexes" },
              { id: "residence", name: "Hostel & Dining" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveGalleryFilter(btn.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeGalleryFilter === btn.id
                    ? "bg-[#0041f5] text-white shadow-md"
                    : "bg-slate-50 text-slate-650 hover:bg-slate-100 border border-slate-200/50"
                }`}
              >
                {btn.name}
              </button>
            ))}
          </div>

          {/* Responsive grid */}
          <motion.div layout id="campus-masonry-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-72 rounded-2xl overflow-hidden shadow-md border border-slate-150-10 flex flex-col justify-end p-4"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent z-10" />
                  <div className="relative z-20">
                    <span className="text-[9px] uppercase font-black text-[#fffc4d] tracking-widest bg-slate-900/70 border border-white/10 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="font-tailwind font-black text-sm text-white mt-1 leading-tight">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Detailed facilities route trigger */}

        </div>
      </section>

   

      {/* SECTION 10: SCHOLASTIC ACHIEVEMENTS */}
 <section id="achievements" className="py-20 lg:py-28 bg-white text-slate-900 relative font-sans">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* Left Column: Text & Award List */}
      <div className="lg:col-span-7 space-y-8">
        
        <div className="space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0041f5]/10 border border-[#0041f5]/15">
            <span className="w-2 h-2 rounded-full bg-[#0041f5] animate-pulse" />
            <span className="text-[#0041f5] text-xs font-extrabold tracking-widest uppercase">
              The Beacon Standard
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Celebrating Outstanding Scholastic Achievements
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl pt-1">
            Our young scholars consistently prove their dominance. Over 25 years, our students have secured top slots in Nationwide CBSE Board Assessments, cleared National Olympiads, and gained entries to premier competitive tracks like IIT-JEE and NEET foundation leagues.
          </p>
        </div>

        {/* School Awards List */}
        <div id="school-awards" className="space-y-3 pt-1">
          {[
            "100% Board Pass Rate (Consistent Class XII Results)",
            "Over 50+ students clearing Olympiad regional tiers in 2025",
            "2 IIT-JEE Top 500 selections from the senior batch in 2025",
            "Gold medals in the National Inter-School Rifle Shooting Tournament",
          ].map((aw) => (
            <div 
              key={aw} 
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100/80 transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-[#8a5506]/10 text-[#8a5506] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                {aw}
              </span>
            </div>
          ))}
        </div>

        {/* Call To Action */}
        <div className="pt-2">
          <Link
            href="/achievements"
            className="w-full sm:w-auto px-8 py-4 bg-[#0041f5] text-white text-xs font-extrabold uppercase tracking-wider rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/20 inline-flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            View Outstanding Success Stories
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Right Column: Dynamic Stat Grid */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
        
        <div className="space-y-4 sm:space-y-6">
          {/* Stat Box 1 */}
          <div className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-3xl text-center shadow-sm hover:shadow-md transition-all duration-300">
            <p className="text-4xl sm:text-5xl font-extrabold text-[#0041f5] tracking-tight">
              98.6%
            </p>
            <p className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-500 tracking-wider mt-2">
              Class XII Board Topper (2025)
            </p>
          </div>

          {/* Stat Box 2 */}
          <div className="p-6 sm:p-8 bg-[#0041f5] text-white rounded-3xl text-center shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-300">
            <p className="text-4xl sm:text-5xl font-extrabold text-[#fffc4d] tracking-tight">
              12+
            </p>
            <p className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-200 tracking-wider mt-2">
              JEE / NEET Scholars (2025)
            </p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-10">
          {/* Stat Box 3 */}
          <div className="p-6 sm:p-8 bg-[#8a5506]/10 hover:bg-[#8a5506]/15 transition-all duration-300 rounded-3xl text-center border border-[#8a5506]/20 shadow-sm">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#8a5506] uppercase tracking-tight">
              Gold
            </p>
            <p className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-600 tracking-wider mt-2">
              National Shooting Cup 2025
            </p>
          </div>

          {/* Stat Box 4 */}
          <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl text-center border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              100+
            </p>
            <p className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-500 tracking-wider mt-2">
              Olympiad Triumphs
            </p>
          </div>
        </div>

      </div>

    </div>
  </div>
</section>
      

      {/* SECTION 11: PARENTS' CORNER (TESTIMONIALS) */}
<ParentsCorner />
      {/* SECTION: INSTAGRAM REELS */}
      <InstagramReels />


      {/* SECTION 12: STUDENT SUCCESS STORIES */}
      {/* <section id="success-stories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0041f5] text-xs font-black tracking-widest uppercase">Success Profiles</span>
            <h2 className="text-3xl md:text-5xl font-tailwind font-black text-slate-950 mt-2">
              Transformative Student Growth Stories
            </h2>
            <div className="w-16 h-1 bg-[#0041f5] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Academic & Tech Innovation Path",
                student: "Aravind Murthy (Class of 2025)",
                desc: "Equipped with robotics skills and computer labs in high school, Aravind crafted a low-cost automated system for public water tracking, gaining direct admissions to NTU Singapore.",
                image: "https://picsum.photos/seed/successful_student/600/400",
              },
              {
                title: "Sports Mastery & National Title",
                student: "Divya Kaushik (Class of 2024)",
                desc: "By utilizing the Elite Indoor Shooting Range, Divya entered rifle coaching at NIMT, going on to clinch individual Gold in the National CBSE Youth Shooting Cup.",
                image: "https://picsum.photos/seed/athletic_champion/600/400",
              },
            ].map((story, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/50 flex flex-col sm:flex-row shadow"
              >
                <div className="w-full sm:w-1/2 h-56 sm:h-auto relative">
                  <Image
                    src={story.image}
                    alt={story.student}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 w-full sm:w-1/2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#0041f5] tracking-widest leading-none block mb-2">
                      {story.title}
                    </span>
                    <h4 className="font-tailwind font-bold text-sm text-slate-900 mb-2 leading-tight">
                      {story.student}
                    </h4>
                    <p className="text-xs text-slate-550 leading-relaxed font-sans">{story.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      href="/achievements"
                      className="text-xs font-bold text-[#0041f5] inline-flex items-center gap-1"
                    >
                      Read full profile <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* SECTION 13: ADMISSIONS 2026 CONVERSION BLOCK */}
  {/* SECTION 13: ADMISSIONS 2026 CONVERSION BLOCK */}
<section id="quick-admissions-form" className="py-20 lg:py-28 bg-gradient-to-r from-slate-900 to-slate-950 text-white relative overflow-hidden font-sans">
  {/* Background Accents */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
  <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />
  <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* Left Column: Information & Value Props */}
      <div className="lg:col-span-6 space-y-8">
        <div className="space-y-4">
          <span className="inline-block text-[#fffc4d] text-xs font-black tracking-widest uppercase font-sans bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
            Admission Guidelines 2027-28
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-sans">
            Take the First Step Towards Your Child's Bright Future
          </h2>
          <p className="text-base text-slate-300 leading-relaxed font-sans max-w-xl">
            Admissions are now open from Preschool to Class XII. Fill out the enquiry form, and our admissions team will guide you through the next steps, campus visits, and enrollment process.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-[#fffc4d]" />
            </div>
            <span className="text-sm font-medium text-slate-200 font-sans leading-snug pt-1">
              Student assessment and personalized academic guidance
            </span>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-[#fffc4d]" />
            </div>
            <span className="text-sm font-medium text-slate-200 font-sans leading-snug pt-1">
              Free school brochure and detailed admission information kit
            </span>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-[#fffc4d]" />
            </div>
            <span className="text-sm font-medium text-slate-200 font-sans leading-snug pt-1">
              Options available for Day School, Day Boarding, and Full Boarding
            </span>
          </div>
        </div>

        {/* WhatsApp Direct CTA */}
        <div className="pt-2">
          <a
            href="https://wa.me/919599931443?text=Hi%20NIMT,%20I%27m%20inquiring%20about%20Admissions%202026"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white hover:bg-emerald-600 transition-all font-sans shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
          >
            WhatsApp Admissions Desk
          </a>
        </div>
      </div>

      {/* Right Column: Lead Capture Form Card */}
      <div className="lg:col-span-6">
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-100 relative font-sans">
          
          {/* Badge */}
          <div className="absolute top-6 right-6 bg-red-50 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse border border-red-200/80">
            Admissions Open
          </div>

          <div className="mb-6 space-y-1">
            <h3 className="font-sans font-black text-2xl text-slate-950 tracking-tight">
              Request Admissions Kit
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Complete information details for rapid priority processing.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50/60 border border-emerald-500/20 p-8 rounded-2xl text-center space-y-4 my-4 font-sans">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-sans font-bold text-lg text-slate-900">
                Inquiry Received Successfully!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-sans">
                Thank you! Our lead admissions counselor will call you within 2 business hours with full pricing catalogs, prospectus sheets, and campus tour schedules.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1.5 font-sans">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  name="parentName"
                  required
                  value={formData.parentName}
                  onChange={handleFormInputChange}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0041f5] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1.5 font-sans">
                    Student's Full Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleFormInputChange}
                    placeholder="e.g. Aryan Malhotra"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0041f5] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1.5 font-sans">
                    Grade / Class Seeking *
                  </label>
                  <select
                    name="targetClass"
                    value={formData.targetClass}
                    onChange={handleFormInputChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0041f5] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all font-sans"
                  >
                    <option value="Nursery">Nursery / Play School</option>
                    <option value="Primary">Primary (I - V)</option>
                    <option value="Middle">Middle (VI - VIII)</option>
                    <option value="Secondary">Secondary (IX - X)</option>
                    <option value="SeniorSec">Senior Secondary (XI - XII)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1.5 font-sans">
                    Active Phone (WhatsApp) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-semibold font-sans">
                      +91
                    </span>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          setFormData({
                            ...formData,
                            phone: value,
                          });
                        }
                      }}
                      placeholder="9876543210"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#0041f5] focus:bg-white rounded-r-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all font-sans"
                    />
                  </div>
                  {formData.phone.length > 0 && formData.phone.length < 10 && (
                    <p className="mt-1 text-red-500 text-[11px] font-sans">
                      Mobile number must be exactly 10 digits
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1.5 font-sans">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormInputChange}
                    placeholder="e.g. parent@email.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0041f5] focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs font-extrabold tracking-wider uppercase bg-[#0041f5] text-white hover:bg-blue-600 transition-all font-sans shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 cursor-pointer text-center transform hover:-translate-y-0.5"
                >
                  Submit Official Admissions Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  </div>
</section>

      {/* SECTION 14: FAQ BLOCK */}
      <section id="faq-accordions" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0041f5] text-xs font-black tracking-widest uppercase">Answers & Support</span>
            <h2 className="text-3xl md:text-5xl font-tailwind font-extrabold tracking-tight text-slate-900 mt-2">
              Frequently Answered Admissions Questions
            </h2>
            <div className="w-16 h-1 bg-[#0041f5] mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-tailwind font-bold text-sm sm:text-base text-slate-950 focus:outline-none gap-4"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <Minus className="w-4 h-4 text-[#0041f5] shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#0041f5] shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-150-10 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: CAMPUS LOCATION AND MAP */}
 {/* SECTION: CAMPUS LOCATION */}
<section id="campus-location" className="py-20 lg:py-28 bg-[#f6eada] text-slate-900 font-sans relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* Left Column: Information & Address Details */}
      <div className="lg:col-span-6 space-y-8 font-sans">
        <div className="space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0041f5]/10 border border-[#0041f5]/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#0041f5] animate-pulse" />
            <span className="text-[#0041f5] text-xs font-black tracking-widest uppercase font-sans">
              Visit Ghaziabad Campus
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight font-sans">
            Our Landmark Ghaziabad Campus Site
          </h2>

          <p className="text-base text-slate-700 leading-relaxed font-sans max-w-xl">
            Located in the well-connected residential area of Ansal Avantika-II, Ghaziabad, NIMT Beacon School provides a safe, green, and student-friendly learning environment designed to support academic excellence and holistic development.
          </p>
        </div>

        {/* Location Info Cards */}
        <div id="school-location-details" className="space-y-4 font-sans">
          {/* Card 1: Main Location */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-[#0041f5]/30 hover:shadow-md transition-all duration-300 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#0041f5]/10 text-[#0041f5] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-sans font-bold text-sm text-slate-950">
                Campus Main Location
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Ansal, Avantika Ext Rd, Avantika Colony, Shastri Nagar, Ghaziabad, Uttar Pradesh 201002
              </p>
            </div>
          </div>

          {/* Card 2: Driving Directions */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:border-[#8a5506]/30 hover:shadow-md transition-all duration-300 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#8a5506]/10 text-[#8a5506] shrink-0">
              <Navigation className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-sans font-bold text-sm text-slate-950">
                Quick Driving Directions
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Easily accessible via NH-24 and the Delhi-Meerut Expressway. Just a 20-minute drive from Indirapuram and Noida Sector 62.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Map Placeholder Card */}
      <div className="lg:col-span-6 font-sans">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[440px] group">
          
          {/* Subtle Background Radial Pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] z-0" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-[#0041f5]/30 z-0" />

          {/* Card Content Container */}
          <div className="relative z-10 flex flex-col h-full justify-between space-y-6 font-sans">
            
            {/* Top Header */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-4 font-sans backdrop-blur-md">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                Central Campus Locator
              </span>
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                NIMT Beacon School Ghaziabad
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-sans max-w-lg leading-relaxed">
                Ansal Avantika-II, Ghaziabad, Uttar Pradesh, India - 201013
              </p>
            </div>

            {/* Middle Stats / Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 font-sans">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all group-hover:border-white/20">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold font-sans">
                  Expressway Connectivity
                </p>
                <p className="text-xs sm:text-sm text-[#fffc4d] font-bold mt-1 font-sans">
                  NH-24 Expressway (2.5 KM)
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all group-hover:border-white/20">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold font-sans">
                  Transit Time
                </p>
                <p className="text-xs sm:text-sm text-[#fffc4d] font-bold mt-1 font-sans">
                  20 Min from Indirapuram & Noida Sec 62
                </p>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=NIMT+Beacon+School+Ansal+Avantika-II+Ghaziabad"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#0041f5] hover:bg-blue-600 text-white text-center py-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 font-sans transform hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4" />
                Launch Live GPS Directions
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</section>
    </div>
  );
}





