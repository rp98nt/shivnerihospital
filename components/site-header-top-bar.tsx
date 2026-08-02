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
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Ref,
} from "react";

const MOBILE_CONTACT_COUNT = 3;
const FLOW_DURATION_MS = 320;
const FLOW_STAGGER_MS = 48;
const FLOW_LOCK_MS =
  FLOW_DURATION_MS + (MOBILE_CONTACT_COUNT - 1) * FLOW_STAGGER_MS;
const COMPACT_ENTER_SCROLL_Y = 40;
const COMPACT_EXIT_SCROLL_Y = 8;
const SCROLL_DOWN_THRESHOLD = 8;
const SCROLL_UP_THRESHOLD = 4;

function useMobileHeaderCompact(
  expandedIconRefs: React.RefObject<(HTMLElement | null)[]>,
  compactIconRefs: React.RefObject<(HTMLElement | null)[]>,
) {
  const [isCompact, setIsCompact] = useState(false);
  const isCompactRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const lastScrollY = useRef(0);
  const flowCapture = useRef<{
    compacting: boolean;
    rects: (DOMRect | null)[];
  } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateCompactState = () => {
      if (mediaQuery.matches) {
        if (isCompactRef.current) {
          isCompactRef.current = false;
          setIsCompact(false);
        }
        isAnimatingRef.current = false;
        lastScrollY.current = window.scrollY;
        return;
      }

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;

      if (isAnimatingRef.current) {
        lastScrollY.current = scrollY;
        return;
      }

      let nextCompact = isCompactRef.current;

      if (scrollY <= COMPACT_EXIT_SCROLL_Y) {
        nextCompact = false;
      } else if (
        isCompactRef.current &&
        delta <= -SCROLL_UP_THRESHOLD
      ) {
        nextCompact = false;
      } else if (
        !isCompactRef.current &&
        scrollY >= COMPACT_ENTER_SCROLL_Y &&
        delta >= SCROLL_DOWN_THRESHOLD
      ) {
        nextCompact = true;
      }

      if (nextCompact !== isCompactRef.current) {
        const sourceRefs = nextCompact ? expandedIconRefs : compactIconRefs;
        flowCapture.current = {
          compacting: nextCompact,
          rects: sourceRefs.current.map((element) => {
            if (!element) return null;
            const rect = element.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return null;
            return rect;
          }),
        };
        isCompactRef.current = nextCompact;
        isAnimatingRef.current = true;
        setIsCompact(nextCompact);

        window.setTimeout(() => {
          isAnimatingRef.current = false;
        }, FLOW_LOCK_MS);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", updateCompactState, { passive: true });
    mediaQuery.addEventListener("change", updateCompactState);
    lastScrollY.current = window.scrollY;
    updateCompactState();

    return () => {
      window.removeEventListener("scroll", updateCompactState);
      mediaQuery.removeEventListener("change", updateCompactState);
    };
  }, [compactIconRefs, expandedIconRefs]);

  return { isCompact, flowCapture };
}

function useContactFlowAnimation(
  expandedIconRefs: React.RefObject<(HTMLElement | null)[]>,
  compactIconRefs: React.RefObject<(HTMLElement | null)[]>,
  isCompact: boolean,
  flowCapture: React.RefObject<{
    compacting: boolean;
    rects: (DOMRect | null)[];
  } | null>,
) {
  const isInitialRender = useRef(true);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const clearInlineStyles = (refs: React.RefObject<(HTMLElement | null)[]>) => {
      refs.current.forEach((element) => {
        if (!element) return;
        element.style.transform = "";
        element.style.transition = "";
      });
    };

    if (mediaQuery.matches) {
      clearInlineStyles(expandedIconRefs);
      clearInlineStyles(compactIconRefs);
      flowCapture.current = null;
      return;
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      flowCapture.current = null;
      return;
    }

    const capture = flowCapture.current;
    if (!capture || prefersReducedMotion) {
      flowCapture.current = null;
      return;
    }

    const targetRefs = capture.compacting
      ? compactIconRefs
      : expandedIconRefs;

    targetRefs.current.forEach((element, index) => {
      if (!element) return;

      const first = capture.rects[index];
      if (!first) return;

      const last = element.getBoundingClientRect();
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;

      if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) return;

      element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      element.style.transition = "none";

      requestAnimationFrame(() => {
        const delay = index * FLOW_STAGGER_MS;
        element.style.transition = `transform ${FLOW_DURATION_MS}ms ease-in ${delay}ms`;
        element.style.transform = "translate3d(0, 0, 0)";
      });
    });

    flowCapture.current = null;
  }, [compactIconRefs, expandedIconRefs, flowCapture, isCompact]);
}

export function SiteHeaderTopBar() {
  const expandedIconRefs = useRef<(HTMLElement | null)[]>(
    Array.from({ length: MOBILE_CONTACT_COUNT }, () => null),
  );
  const compactIconRefs = useRef<(HTMLElement | null)[]>(
    Array.from({ length: MOBILE_CONTACT_COUNT }, () => null),
  );
  const { isCompact, flowCapture } = useMobileHeaderCompact(
    expandedIconRefs,
    compactIconRefs,
  );

  useContactFlowAnimation(
    expandedIconRefs,
    compactIconRefs,
    isCompact,
    flowCapture,
  );

  const registerExpandedIconRef = (index: number): Ref<HTMLSpanElement> => {
    return (element) => {
      expandedIconRefs.current[index] = element;
    };
  };

  const registerCompactIconRef = (index: number): Ref<HTMLAnchorElement> => {
    return (element) => {
      compactIconRefs.current[index] = element;
    };
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-3 lg:flex lg:items-center lg:justify-between lg:px-6 lg:py-2.5">
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
          className={`flex flex-1 items-center justify-center gap-1.5 overflow-hidden lg:hidden ${
            isCompact
              ? "visible max-w-none"
              : "invisible max-w-0 pointer-events-none"
          }`}
          aria-hidden={!isCompact}
        >
          <TopBarDirectionsContact
            compact
            iconRef={registerCompactIconRef(0)}
          />
          <TopBarPhoneContact
            compact
            iconRef={registerCompactIconRef(1)}
            icon={<EmergencyIcon className="h-4 w-4 text-red-600" />}
            iconRingClassName="border-red-500"
            title="For Emergency"
            phone={EMERGENCY_MOBILE}
            phoneTel={EMERGENCY_MOBILE_TEL}
            phoneClassName="hover:text-red-600"
          />
          <TopBarPhoneContact
            compact
            iconRef={registerCompactIconRef(2)}
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
        className={`grid lg:mt-0 lg:w-auto lg:shrink-0 lg:justify-end ${
          isCompact
            ? "pointer-events-none mt-0 grid-rows-[0fr]"
            : "mt-3 grid-rows-[1fr]"
        } lg:pointer-events-auto lg:grid-rows-[1fr]`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex w-full justify-start lg:flex lg:w-auto lg:justify-end">
            <TopBarContactGroup
              isCompact={isCompact}
              registerExpandedIconRef={registerExpandedIconRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBarContactGroup({
  isCompact,
  registerExpandedIconRef,
}: {
  isCompact: boolean;
  registerExpandedIconRef: (index: number) => Ref<HTMLSpanElement>;
}) {
  return (
    <div
      className={`flex w-full flex-col gap-1.5 pl-1.5 lg:inline-flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:pl-0 ${
        isCompact ? "invisible lg:visible" : "visible"
      }`}
    >
      <TopBarDirectionsContact
        iconRef={registerExpandedIconRef(0)}
        isCompact={isCompact}
        index={0}
      />

      <TopBarPhoneContact
        iconRef={registerExpandedIconRef(1)}
        isCompact={isCompact}
        index={1}
        icon={<EmergencyIcon className="h-4 w-4 text-red-600" />}
        iconRingClassName="border-red-500"
        title="For Emergency"
        phone={EMERGENCY_MOBILE}
        phoneTel={EMERGENCY_MOBILE_TEL}
        phoneClassName="hover:text-red-600"
      />

      <TopBarPhoneContact
        iconRef={registerExpandedIconRef(2)}
        isCompact={isCompact}
        index={2}
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
  "flex h-7 w-7 shrink-0 items-center justify-center will-change-transform";

const TOP_BAR_TEXT_CLASS =
  "min-w-0 overflow-hidden whitespace-nowrap text-[11px] font-medium leading-tight text-slate-700 sm:text-sm sm:leading-none lg:max-w-none";

const TOP_BAR_COMPACT_LINK_CLASS =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-opacity duration-300 ease-in hover:opacity-80 will-change-transform";

function TopBarDirectionsContact({
  compact = false,
  iconRef,
  isCompact = false,
  index = 0,
}: {
  compact?: boolean;
  iconRef?: Ref<HTMLAnchorElement> | Ref<HTMLSpanElement>;
  isCompact?: boolean;
  index?: number;
}) {
  if (compact) {
    return (
      <a
        ref={iconRef as Ref<HTMLAnchorElement>}
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
        ref={iconRef as Ref<HTMLSpanElement>}
        className={`${TOP_BAR_ICON_SLOT_CLASS} overflow-visible [&_.directions-marker-icon-shell]:!m-0 [&_.directions-marker-icon-shell]:!h-7 [&_.directions-marker-icon-shell]:!w-7 [&_.directions-marker-icon-shell]:!-translate-y-1.5 lg:[&_.directions-marker-icon-shell]:!translate-x-1 lg:[&_.directions-marker-icon-shell]:!-translate-y-1.5`}
      >
        <DirectionsMarkerIcon />
      </span>
      <ContactText isCompact={isCompact} index={index}>
        Get{" "}
        <span className="text-slate-600 transition-colors hover:text-teal-800">
          Directions
        </span>
      </ContactText>
    </a>
  );
}

function TopBarPhoneContact({
  compact = false,
  iconRef,
  isCompact = false,
  index = 0,
  icon,
  iconRingClassName,
  title,
  phone,
  phoneTel,
  phoneClassName,
}: {
  compact?: boolean;
  iconRef?: Ref<HTMLAnchorElement> | Ref<HTMLSpanElement>;
  isCompact?: boolean;
  index?: number;
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
        ref={iconRef as Ref<HTMLAnchorElement>}
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
        ref={iconRef as Ref<HTMLSpanElement>}
        className={`${TOP_BAR_ICON_SLOT_CLASS} rounded-full border-2 bg-white shadow-sm ${iconRingClassName}`}
      >
        {icon}
      </span>
      <ContactText isCompact={isCompact} index={index}>
        {title}{" "}
        <span className={`text-slate-600 transition-colors ${phoneClassName}`}>
          {phone}
        </span>
      </ContactText>
    </a>
  );
}

function ContactText({
  isCompact,
  index,
  children,
}: {
  isCompact: boolean;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`${TOP_BAR_TEXT_CLASS} transition-[opacity,max-width] duration-300 ease-in lg:opacity-100 ${
        isCompact ? "max-w-0 opacity-0" : "max-w-[20rem] opacity-100"
      }`}
      style={{ transitionDelay: `${index * FLOW_STAGGER_MS}ms` }}
    >
      {children}
    </span>
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
