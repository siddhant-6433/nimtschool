"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import ApplyNowModal from "@/components/ApplyNowModal";
import BookVisitModal from "@/components/BookVisitModal";

interface AdmissionsContextValue {
  openApply: () => void;
  openVisit: () => void;
}

const AdmissionsContext = createContext<AdmissionsContextValue | null>(null);

/**
 * Provides a single, app-wide Apply Now / Book Visit modal that any component
 * (Navbar, Footer, banner, CTAs) can trigger via `useAdmissions()`. Rendered
 * once in the root layout so the modal state is shared across every page.
 */
export function AdmissionsProvider({ children }: { children: React.ReactNode }) {
  const [applyOpen, setApplyOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);

  const openApply = useCallback(() => setApplyOpen(true), []);
  const openVisit = useCallback(() => setVisitOpen(true), []);

  return (
    <AdmissionsContext.Provider value={{ openApply, openVisit }}>
      {children}
      <ApplyNowModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} />
      <BookVisitModal isOpen={visitOpen} onClose={() => setVisitOpen(false)} />
    </AdmissionsContext.Provider>
  );
}

export function useAdmissions(): AdmissionsContextValue {
  const ctx = useContext(AdmissionsContext);
  if (!ctx) {
    // Safe no-op fallback if used outside the provider (keeps buttons from
    // throwing); in practice the provider wraps the whole app.
    return { openApply: () => {}, openVisit: () => {} };
  }
  return ctx;
}
