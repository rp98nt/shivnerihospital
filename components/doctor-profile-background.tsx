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
import { useEffect, useRef, useState } from "react";

type DoctorProfileBackgroundProps = {
  doctor: Doctor;
};

export function DoctorProfileBackground({ doctor }: DoctorProfileBackgroundProps) {
  const background = getDoctorBackground(doctor);
  const [activeTab, setActiveTab] = useState<BackgroundTab>("experience");
  const entries = getBackgroundEntries(background, activeTab);

  return (
    <section className="border-t border-slate-200 bg-[#faf9f6] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Background
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
            Experience &amp;{" "}
            <em className="not-italic text-teal-700">Education</em>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {getDoctorBackgroundSubtitle(doctor)}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3 lg:mt-12">
          {BACKGROUND_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-6 ${
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

        <div className="mx-auto mt-10 max-w-3xl lg:mt-12">
          <div className="relative">
            <div
              className="absolute bottom-6 left-6 top-6 w-px bg-slate-200"
              aria-hidden
            />

            <ul className="space-y-8">
              {entries.map((entry) => (
                <TimelineRevealItem
                  key={`${activeTab}-${entry.title}-${entry.period}`}
                >
                  <div className="relative flex gap-5 sm:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-teal-700 bg-white text-teal-700 shadow-sm">
                      <TimelineIcon icon={entry.icon} className="h-5 w-5" />
                    </div>

                    <article className="w-full min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                        {entry.period}
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                        {entry.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-slate-700 sm:text-base">
                        {entry.organization}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                        {entry.description}
                      </p>
                    </article>
                  </div>
                </TimelineRevealItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRevealItem({ children }: { children: React.ReactNode }) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = itemRef.current;
    if (!node) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <li
      ref={itemRef}
      className={`transform transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
      }`}
    >
      {children}
    </li>
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
