"use client";

import type { Doctor } from "@/lib/doctors";
import {
  BACKGROUND_TABS,
  getBackgroundEntries,
  getDoctorBackground,
  getDoctorBackgroundSubtitle,
  type BackgroundEntryIcon,
  type BackgroundTab,
} from "@/lib/doctor-background";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useState } from "react";

type DoctorProfileBackgroundProps = {
  doctor: Doctor;
};

export function DoctorProfileBackground({ doctor }: DoctorProfileBackgroundProps) {
  const background = getDoctorBackground(doctor);
  const [activeTab, setActiveTab] = useState<BackgroundTab>("experience");
  const entries = getBackgroundEntries(background, activeTab);

  return (
    <section className="overflow-x-clip border-t border-slate-200 bg-[#faf9f6] py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Background
          </span>

          <h2 className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
            Experience &amp;{" "}
            <em className="not-italic text-teal-700">Education</em>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {getDoctorBackgroundSubtitle(doctor)}
          </p>
        </div>

        <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mt-10 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 lg:mt-12">
          {BACKGROUND_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-6 ${
                  isActive
                    ? "bg-teal-700 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-teal-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10 lg:mt-12">
          <div className="relative min-w-0">
            <div
              className="absolute bottom-4 left-5 top-4 w-px bg-slate-200 sm:bottom-6 sm:left-6 sm:top-6"
              aria-hidden
            />

            <ul className="space-y-6 sm:space-y-8">
              {entries.map((entry) => (
                <ScrollReveal
                  key={`${activeTab}-${entry.title}-${entry.period}`}
                  as="li"
                  direction="up"
                >
                  <div className="relative flex min-w-0 gap-4 sm:gap-6">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-teal-700 bg-white text-teal-700 shadow-sm sm:h-12 sm:w-12">
                      <TimelineIcon icon={entry.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <article className="w-full min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-700 sm:text-xs sm:tracking-[0.16em]">
                        {entry.period}
                      </p>

                      <h3 className="mt-2 break-words text-base font-bold text-slate-900 sm:text-xl">
                        {entry.title}
                      </h3>

                      <p className="mt-1 break-words text-sm font-medium text-slate-700 sm:text-base">
                        {entry.organization}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                        {entry.description}
                      </p>
                    </article>
                  </div>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineIcon({
  icon,
  className,
}: {
  icon: BackgroundEntryIcon;
  className?: string;
}) {
  switch (icon) {
    case "building":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M4 21V7l8-4 8 4v14" />
          <path d="M9 21V12h6v9" />
          <path d="M9 9h.01M15 9h.01" />
        </svg>
      );
    case "hospital":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M3 21h18" />
          <path d="M6 21V7l6-4 6 4v14" />
          <path d="M12 10v4M10 12h4" />
        </svg>
      );
    case "graduation":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M12 3 2 8l10 5 10-5-10-5z" />
          <path d="M6 10v4c0 2 2.5 4 6 4s6-2 6-4v-4" />
          <path d="M22 8v6" />
        </svg>
      );
    case "award":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M8.5 13 6 21l6-3 6 3-2.5-8" />
        </svg>
      );
    case "user":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
        </svg>
      );
    case "clinical":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "research":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M6 18h12" />
          <path d="M8 18V9l4-3 4 3v9" />
          <path d="M10 13h4" />
          <circle cx="14" cy="6" r="2" />
        </svg>
      );
  }
}
