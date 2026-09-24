'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { BookOpen, Quote, Smile, ShieldCheck } from 'lucide-react';

interface Leader {
  name: string;
  position: string;
  image: string;
  intro: string;
  qualifications: string;
}

const leaders: Leader[] = [
  {
    name: 'Mr. Jai Gopal Jindal',
    position: 'Principal',
    image: '/nimt-principle.jpeg',
    intro:
      'It is my privilege to be a part of NIMT Beacon School Ghaziabad as Principal. Established in 2012 under the benevolent patronage of Dr K.P. Singh, Chairman of the NIMT Group of Institutes, and with the right direction, visionary zeal and tireless efforts of our Director Mr Siddhant Singh, the name has become synonymous with quality education. We at NIMT Beacon School have a dream of moulding the young minds of our future global citizens with Hi-tech educational technology in the ambience of traditional values. The students are equipped academically, ethically, physically, socially, emotionally and spiritually to face challenges of the fast changing global environment. Our role is to develop the minds of our students in a stress-free, open, positive and joyful environment. Faculties of critical thinking, problem solving, creativity, innovation and intuition are developed. Last but not the least, I would also like to assure you that we shall work hand in hand with you for the holistic personality development of the children entrusted to our care.',
    qualifications: 'Principal, NIMT Beacon School',
  },
];

export default function LeadershipPage() {
  const principal = leaders[0];

  return (
    <>
      <Navbar />

      <main id="leadership-main" className="pt-24 min-h-screen bg-white">
        {/* Page Hero */}
        <section
          id="leadership-hero"
          className="relative h-[380px] bg-slate-900 flex items-center justify-center overflow-hidden"
        >
          <Image
            src={principal.image}
            alt="NIMT Beacon leadership in a campus environment"
            fill
            className="object-cover opacity-25"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

          <div className="relative max-w-4xl mx-auto text-center px-4 z-10">
            <span className="inline-block bg-accent text-slate-950 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
              School Leadership Team
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Experienced Minds, Warm Hearts
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Meet the educators, coordinators, and counselors who guide our classrooms with patience, care, and wisdom.
            </p>
          </div>
        </section>

        {/* Leadership Philosophy Section */}
        <section
          id="leadership-philosophy"
          className="py-20 bg-slate-50/60 border-b border-slate-100"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="text-primary text-xs font-bold uppercase tracking-wider block">
              How We Guide
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight">
              Our Leadership Philosophy
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At NIMT Beacon School, leadership does not mean standing behind a closed office door. Our principal, coordinators, and heads can be seen walking around the campus daily, chatting with students, listening to teachers, and greeting parents. We believe in leading by example, showing kindness, and making sure that every child feels safe and cared for.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                id="philosophy-pill-1"
              >
                <Smile className="h-5 w-5 text-primary mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-xs uppercase">
                  Approachable
                </h4>
                <p className="text-slate-500 text-[11px] mt-1">
                  Our doors are always open to hear parent and student feedback.
                </p>
              </div>
              <div
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                id="philosophy-pill-2"
              >
                <ShieldCheck className="h-5 w-5 text-primary mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-xs uppercase">
                  Supportive
                </h4>
                <p className="text-slate-500 text-[11px] mt-1">
                  We give students positive motivation rather than raw pressure.
                </p>
              </div>
              <div
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                id="philosophy-pill-3"
              >
                <BookOpen className="h-5 w-5 text-primary mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-xs uppercase">
                  Future-Focused
                </h4>
                <p className="text-slate-500 text-[11px] mt-1">
                  We plan our daily programs around real-world child development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Principal Detailed Section */}
        <section id="principal-special" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-alt-bg/30 rounded-[40px] p-8 sm:p-12 lg:p-16 border border-slate-100/50">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                {/* Principal image */}
                <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src={principal.image}
                    alt={`${principal.name} - ${principal.position} of NIMT Beacon School`}
                    fill
                    className="object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl text-white">
                    <p className="text-[10px] text-slate-300">{principal.qualifications}</p>
                  </div>
                </div>

                {/* Principal Message Copy */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider block">
                    Message From Our Principal
                  </span>
                  <h2 className="text-2xl sm:text-4.5xl font-bold text-slate-900 tracking-tight">
                    {principal.name}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                    {principal.position}, NIMT Beacon School Ghaziabad
                  </p>

                  <div className="relative">
                    <Quote className="h-10 w-10 text-primary/10 absolute -top-5 -left-4 pointer-events-none" />
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-4 italic">
                      &quot;We at NIMT Beacon School have a dream of moulding the young minds of our future global citizens with Hi-tech educational technology in the ambience of traditional values.&quot;
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    It is my privilege to be a part of NIMT Beacon School Ghaziabad as Principal. Established in 2012 under the benevolent patronage of Dr K.P. Singh, Chairman of the NIMT Group of Institutes, and with the right direction, visionary zeal and tireless efforts of our Director Mr Siddhant Singh, the name has become synonymous with quality education.
                  </p>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    The students are equipped academically, ethically, physically, socially, emotionally and spiritually to face challenges of the fast changing global environment. Our role is to develop the minds of our students in a stress-free, open, positive and joyful environment. Faculties of critical thinking, problem solving, creativity, innovation and intuition are developed.
                  </p>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Last but not the least, I would also like to assure you that we shall work hand in hand with you for the holistic personality development of the children entrusted to our care.
                  </p>

                  <div className="pt-4">
                    <span className="font-sans font-extrabold text-slate-950 block text-base">
                      {principal.name}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Principal, NIMT Beacon School
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}