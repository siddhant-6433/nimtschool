"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import {
  getAdmissionPhase,
  ADMISSION_SESSION,
  type AdmissionPhase,
} from "@/lib/admissionsPhase";
import { useAdmissions } from "@/components/AdmissionsModal";

/**
 * Slim announcement bar shown at the very top of every page. The deadline and
 * phase are derived from the current date (see lib/admissionsPhase), so they
 * roll forward automatically every seven days with no redeploy.
 */
export default function AdmissionsBanner() {
  const { openApply } = useAdmissions();
  const [info, setInfo] = useState<AdmissionPhase>(() => getAdmissionPhase());

  // Recompute on mount (build-time render may be stale) and hourly thereafter,
  // so a long-open tab still crosses phase boundaries correctly.
  useEffect(() => {
    const update = () => setInfo(getAdmissionPhase());
    update();
    const id = setInterval(update, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-9 flex items-center justify-center gap-2 sm:gap-3">
        <Sparkles className="w-3.5 h-3.5 text-[#fffc4d] shrink-0" />
        <p
          className="min-w-0 truncate text-[11px] sm:text-xs font-medium tracking-wide text-center"
          suppressHydrationWarning
        >
          <span className="font-bold text-[#fffc4d]">
            Admissions Open · {ADMISSION_SESSION}
          </span>
          <span className="text-white/85">
            <span className="hidden sm:inline"> — Last date to apply: </span>
            <span className="sm:hidden"> · Apply by </span>
            <span className="font-semibold text-white">
              {info.deadlineLabel}
            </span>
            <span className="hidden sm:inline"> (Phase {info.phase})</span>
          </span>
        </p>
        <button
          type="button"
          onClick={openApply}
          className="inline-flex items-center gap-1 rounded-full bg-[#fffc4d] text-slate-950 px-3 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider hover:bg-yellow-300 transition-colors shrink-0 whitespace-nowrap"
        >
          Apply Now
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
