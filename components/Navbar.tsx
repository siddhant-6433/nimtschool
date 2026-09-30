"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import AdmissionsBanner from "@/components/AdmissionsBanner";
import { useAdmissions } from "@/components/AdmissionsModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { openApply } = useAdmissions();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Academics", href: "/academics" },
    {
      name: "Programs",
      dropdown: [
        { name: "Day School", href: "/day-school", desc: "Flexible daily learning" },
        { name: "Day Boarding", href: "/day-boarding", desc: "Extended study & activities" },
        { name: "Full Boarding", href: "/full-boarding", desc: "Complete residential care" },
      ],
    },
    {
      name: "About Us",
      dropdown: [
        { name: "Our Story", href: "/our-story", desc: "Legacy of excellence" },
        { name: "Leadership", href: "/leadership", desc: "Guided by visionaries" },
        { name: "Vision & Mission", href: "/vision-mission", desc: "Our core values" },
      ],
    },
    { name: "Campus", href: "/campus" },
    { name: "Admissions", href: "/admissions" },
    { name: "Achievements", href: "/achievements" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMobileSubmenu = (name: string) => {
    setExpandedMobileMenu(expandedMobileMenu === name ? null : name);
  };

  return (
    <>
      <header id="site-header" className="fixed top-0 left-0 right-0 z-50">
        {/* Top Admissions Alert Banner */}
        <AdmissionsBanner />

        {/* Main Navbar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-[#0038cb]/95 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border-b border-white/10 py-2"
              : "bg-[#0041f5] dark:bg-slate-900 border-b border-white/10 py-3.5"
          }`}
        >
          {/* Expanded Container Width to utilize left side space */}
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-2">
              {/* Brand Logo Shifted Left */}
              <Link
                id="navbar-logo"
                href="/"
                className="group flex items-center gap-2 shrink-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <Image
                  src="/nimt-beacon-logo.webp"
                  alt="NIMT Beacon Logo"
                  width={60}
                  height={60}
                  priority
                  className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Desktop Navigation Menu - Forced Single Line */}
              <nav id="desktop-nav" className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  // Dropdown Links
                  if (link.dropdown) {
                    const isDropdownActive = link.dropdown.some(
                      (sub) => pathname === sub.href
                    );

                    return (
                      <div key={link.name} className="relative group/menu">
                        <button
                          type="button"
                          className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                            isDropdownActive
                              ? "text-yellow-300 bg-white/10 font-semibold"
                              : "text-white/90 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span className="whitespace-nowrap">{link.name}</span>
                          <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover/menu:rotate-180 transition-transform duration-300 shrink-0" />
                        </button>

                        {/* Animated Dropdown Menu */}
                        <div className="absolute top-full left-0 w-60 pt-2 opacity-0 scale-95 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:scale-100 group-hover/menu:pointer-events-auto transition-all duration-200 ease-out">
                          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 space-y-1">
                            {link.dropdown.map((subItem) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`block p-2.5 rounded-xl transition-all ${
                                    isSubActive
                                      ? "bg-blue-50 dark:bg-slate-800/80 text-[#0041f5] dark:text-blue-400 font-semibold"
                                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                  }`}
                                >
                                  <div className="text-sm font-medium leading-tight whitespace-nowrap">
                                    {subItem.name}
                                  </div>
                                  {subItem.desc && (
                                    <div className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 font-normal">
                                      {subItem.desc}
                                    </div>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Regular Nav Links
                  return (
                    <Link
                      key={link.name}
                      href={link.href || "/"}
                      className={`relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-all rounded-lg whitespace-nowrap ${
                        isActive
                          ? "text-yellow-300 font-semibold bg-white/10"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="whitespace-nowrap">{link.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0.5 left-2.5 right-2.5 h-0.5 bg-yellow-300 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <Link
                  id="cta-parent-login"
                  href="https://uni.nimt.ac.in/students"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 xl:px-4 xl:py-2 rounded-full text-[11px] xl:text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white/20 text-white border border-white/20 active:scale-95 transition-all duration-200 whitespace-nowrap"
                >
                  <span>Parent Login</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </Link>

                <button
                  id="cta-apply-now"
                  type="button"
                  onClick={openApply}
                  className="flex items-center gap-1.5 px-4 py-1.5 xl:px-5 xl:py-2 rounded-full text-[11px] xl:text-xs font-bold tracking-wider uppercase bg-yellow-300 text-slate-950 hover:bg-yellow-400 active:scale-95 shadow-md hover:shadow-yellow-300/20 transition-all duration-200 whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>Apply Now</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-btn"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-[95px] inset-x-0 z-40 lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[calc(100vh-95px)] overflow-y-auto"
          >
            <div className="px-5 py-6 space-y-3">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  const isExpanded = expandedMobileMenu === link.name;
                  return (
                    <div key={link.name} className="border-b border-slate-100 dark:border-slate-800/80 pb-2">
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(link.name)}
                        className="flex items-center justify-between w-full py-2 text-base font-medium text-slate-800 dark:text-slate-100"
                      >
                        <span className="whitespace-nowrap">{link.name}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="pl-3 mt-1 space-y-1.5 border-l-2 border-blue-500/30">
                          {link.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-2 px-3 rounded-lg text-sm transition-all ${
                                pathname === subItem.href
                                  ? "bg-blue-50 dark:bg-slate-800 text-[#0041f5] font-semibold"
                                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href || "/"}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2.5 border-b border-slate-100 dark:border-slate-800/80 text-base font-medium transition-colors ${
                      pathname === link.href
                        ? "text-[#0041f5] font-semibold"
                        : "text-slate-800 dark:text-slate-200 hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Actions */}
              <div className="pt-4 space-y-2.5">
                <a
                  href="https://wa.me/919599931443"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Admissions</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    openApply();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0041f5] hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Apply Now — Session 2027-28</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}