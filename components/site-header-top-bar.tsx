"use client";

import { DirectionsMarkerIcon } from "@/components/directions-marker-icon/directions-marker-icon";
import { MobileNav } from "@/components/mobile-nav";
import {
  APPOINTMENT_PHONE,
  APPOINTMENT_PHONE_TEL,
  EMERGENCY_MOBILE,
  EMERGENCY_MOBILE_TEL,
  VISIT_LOCATION,
} from "@/lib/hospital-contact";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useMobileHeaderCompact() {
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateCompactState = () => {
      if (mediaQuery.matches) {
        setIsCompact(false);
        lastScrollY.current = window.scrollY;
        return;
      }

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;

      if (scrollY <= 12) {
        setIsCompact(false);
      } else if (delta > 2) {
        setIsCompact(true);
      } else if (delta < -2) {
        setIsCompact(false);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", updateCompactState, { passive: true });
    mediaQuery.addEventListener("change", updateCompactState);
    updateCompactState();

    return () => {
      window.removeEventListener("scroll", updateCompactState);
      mediaQuery.removeEventListener("change", updateCompactState);
    };
  }, []);

  return isCompact;
}

export function SiteHeaderTopBar() {
  const isCompact = useMobileHeaderCompact();

  return (
    <div
      className={`mx-auto max-w-6xl px-4 transition-[padding] duration-300 ease-in lg:flex lg:items-center lg:justify-between lg:px-6 lg:py-2.5 ${
        isCompact ? "py-2" : "py-3"
      }`}
    >
      <div className="flex items-center justify-between gap-2 lg:gap-3 lg:flex-initial lg:justify-start">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 text-teal-900 transition-opacity hover:opacity-90"
        >
          <Image
            src="/shivneri-logo.png"
            alt=""
            width={44}
            height={44}
            className="h-10 w-auto shrink-0 object-contain lg:h-11"
            priority
          />
          <span
            className="h-8 w-px shrink-0 bg-slate-300 lg:h-9"
            aria-hidden
          />
          <span className="truncate text-base font-bold tracking-tight sm:text-lg">
            Shivneri Hospital
          </span>
        </Link>

        <div
          className={`flex flex-1 items-center justify-center gap-1.5 overflow-hidden transition-all duration-300 ease-in lg:hidden ${
            isCompact
              ? "pointer-events-auto max-w-none scale-100 opacity-100"
              : "pointer-events-none max-w-0 scale-95 opacity-0"
          }`}
          aria-hidden={!isCompact}
        >
          <TopBarDirectionsContact compact />
          <TopBarPhoneContact
            compact
            icon={<EmergencyIcon className="h-4 w-4 text-red-600" />}
            iconRingClassName="border-red-500"
            title="For Emergency"
            phone={EMERGENCY_MOBILE}
            phoneTel={EMERGENCY_MOBILE_TEL}
            phoneClassName="hover:text-red-600"
          />
          <TopBarPhoneContact
            compact
            icon={<AppointmentIcon className="h-4 w-4 text-teal-700" />}
            iconRingClassName="border-green-600"
            title="For Appointment"
            phone={APPOINTMENT_PHONE}
            phoneTel={APPOINTMENT_PHONE_TEL}
            phoneClassName="hover:text-teal-800"
          />
        </div>

        <MobileNav />
      </div>

      <div
        className={`grid transition-[grid-template-rows,margin,opacity] duration-300 ease-in lg:mt-0 lg:w-auto lg:shrink-0 lg:justify-end ${
          isCompact
            ? "pointer-events-none mt-0 grid-rows-[0fr] opacity-0"
            : "mt-3 grid-rows-[1fr] opacity-100"
        } lg:pointer-events-auto lg:grid-rows-[1fr] lg:opacity-100`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex w-full justify-start lg:flex lg:w-auto lg:justify-end">
            <TopBarContactGroup />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBarContactGroup() {
  return (
    <div className="flex w-full flex-col gap-1.5 pl-1.5 lg:inline-flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:pl-0">
      <TopBarDirectionsContact />

      <TopBarPhoneContact
        icon={<EmergencyIcon className="h-4 w-4 text-red-600" />}
        iconRingClassName="border-red-500"
        title="For Emergency"
        phone={EMERGENCY_MOBILE}
        phoneTel={EMERGENCY_MOBILE_TEL}
        phoneClassName="hover:text-red-600"
      />

      <TopBarPhoneContact
        icon={<AppointmentIcon className="h-4 w-4 text-teal-700" />}
        iconRingClassName="border-green-600"
        title="For Appointment"
        phone={APPOINTMENT_PHONE}
        phoneTel={APPOINTMENT_PHONE_TEL}
        phoneClassName="hover:text-teal-800"
      />
    </div>
  );
}

const TOP_BAR_ROW_CLASS =
  "grid w-full grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-2.5 rounded-xl py-1 transition-opacity duration-300 ease-in hover:opacity-80 lg:flex lg:w-auto";

const TOP_BAR_ICON_SLOT_CLASS =
  "flex h-7 w-7 shrink-0 items-center justify-center";

const TOP_BAR_TEXT_CLASS =
  "min-w-0 text-[11px] font-medium leading-tight text-slate-700 transition-all duration-300 ease-in sm:text-sm sm:leading-none";

const TOP_BAR_COMPACT_LINK_CLASS =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-opacity duration-300 ease-in hover:opacity-80";

function TopBarDirectionsContact({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <a
        href={VISIT_LOCATION.mapsDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={TOP_BAR_COMPACT_LINK_CLASS}
        aria-label="Get Directions"
      >
        <span className="flex h-7 w-7 items-center justify-center overflow-visible [&_.directions-marker-icon-shell]:!m-0 [&_.directions-marker-icon-shell]:!h-7 [&_.directions-marker-icon-shell]:!w-7 [&_.directions-marker-icon-shell]:!-translate-y-1.5">
          <DirectionsMarkerIcon />
        </span>
      </a>
    );
  }

  return (
    <a
      href={VISIT_LOCATION.mapsDirectionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={TOP_BAR_ROW_CLASS}
    >
      <span
        className={`${TOP_BAR_ICON_SLOT_CLASS} overflow-visible [&_.directions-marker-icon-shell]:!m-0 [&_.directions-marker-icon-shell]:!h-7 [&_.directions-marker-icon-shell]:!w-7 [&_.directions-marker-icon-shell]:!-translate-y-1.5 lg:[&_.directions-marker-icon-shell]:!-translate-y-1`}
      >
        <DirectionsMarkerIcon />
      </span>
      <span className={TOP_BAR_TEXT_CLASS}>
        Get{" "}
        <span className="text-slate-600 transition-colors hover:text-teal-800">
          Directions
        </span>
      </span>
    </a>
  );
}

function TopBarPhoneContact({
  compact = false,
  icon,
  iconRingClassName,
  title,
  phone,
  phoneTel,
  phoneClassName,
}: {
  compact?: boolean;
  icon: React.ReactNode;
  iconRingClassName: string;
  title: string;
  phone: string;
  phoneTel: string;
  phoneClassName: string;
}) {
  if (compact) {
    return (
      <a
        href={`tel:${phoneTel}`}
        className={TOP_BAR_COMPACT_LINK_CLASS}
        aria-label={`${title}: ${phone}`}
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white shadow-sm ${iconRingClassName}`}
        >
          {icon}
        </span>
      </a>
    );
  }

  return (
    <a href={`tel:${phoneTel}`} className={TOP_BAR_ROW_CLASS}>
      <span
        className={`${TOP_BAR_ICON_SLOT_CLASS} rounded-full border-2 bg-white shadow-sm ${iconRingClassName}`}
      >
        {icon}
      </span>
      <span className={TOP_BAR_TEXT_CLASS}>
        {title}{" "}
        <span className={`text-slate-600 transition-colors ${phoneClassName}`}>
          {phone}
        </span>
      </span>
    </a>
  );
}

function EmergencyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

function AppointmentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  );
}
