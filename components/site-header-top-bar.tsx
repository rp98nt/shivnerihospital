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
const FLIP_DURATION_MS = 320;
const FLIP_STAGGER_MS = 48;

function useMobileHeaderCompact(
  itemRefs: React.RefObject<(HTMLElement | null)[]>,
) {
  const [isCompact, setIsCompact] = useState(false);
  const isCompactRef = useRef(false);
  const lastScrollY = useRef(0);
  const flipCapture = useRef<(DOMRect | null)[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateCompactState = () => {
      if (mediaQuery.matches) {
        if (isCompactRef.current) {
          isCompactRef.current = false;
          setIsCompact(false);
        }
        lastScrollY.current = window.scrollY;
        return;
      }

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      let nextCompact = isCompactRef.current;

      if (scrollY <= 12) {
        nextCompact = false;
      } else if (delta > 2) {
        nextCompact = true;
      } else if (delta < -2) {
        nextCompact = false;
      }

      if (nextCompact !== isCompactRef.current) {
        flipCapture.current = itemRefs.current.map(
          (element) => element?.getBoundingClientRect() ?? null,
        );
        isCompactRef.current = nextCompact;
        setIsCompact(nextCompact);
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
  }, [itemRefs]);

  return { isCompact, flipCapture };
}

function useContactFlipAnimation(
  itemRefs: React.RefObject<(HTMLElement | null)[]>,
  isCompact: boolean,
  flipCapture: React.RefObject<(DOMRect | null)[]>,
) {
  const isInitialRender = useRef(true);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (mediaQuery.matches) {
      itemRefs.current.forEach((element) => {
        if (!element) return;
        element.style.transform = "";
        element.style.transition = "";
      });
      return;
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    itemRefs.current.forEach((element, index) => {
      if (!element) return;

      const first = flipCapture.current[index];
      if (!first) return;

      const last = element.getBoundingClientRect();
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;

      if (deltaX === 0 && deltaY === 0) return;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      element.style.transition = "none";

      requestAnimationFrame(() => {
        const delay = index * FLIP_STAGGER_MS;
        element.style.transition = `transform ${FLIP_DURATION_MS}ms ease-in ${delay}ms`;
        element.style.transform = "";
      });
    });

    flipCapture.current = [];
  }, [flipCapture, isCompact, itemRefs]);
}

export function SiteHeaderTopBar() {
  const itemRefs = useRef<(HTMLElement | null)[]>(
    Array.from({ length: MOBILE_CONTACT_COUNT }, () => null),
  );
  const { isCompact, flipCapture } = useMobileHeaderCompact(itemRefs);

  useContactFlipAnimation(itemRefs, isCompact, flipCapture);

  const registerItemRef = (index: number): Ref<HTMLAnchorElement> => {
    return (element) => {
      itemRefs.current[index] = element;
    };
  };

  return (
    <div
      className={`relative mx-auto max-w-6xl px-4 transition-[padding] duration-300 ease-in lg:flex lg:items-center lg:justify-between lg:px-6 lg:py-2.5 ${
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

        <MobileNav />
      </div>

      <div
        className={`w-full lg:mt-0 lg:w-auto lg:shrink-0 lg:justify-end ${
          isCompact
            ? "pointer-events-none absolute inset-x-4 top-0 flex h-14 items-center justify-center lg:pointer-events-auto lg:static lg:inset-auto lg:flex lg:h-auto [&_a]:pointer-events-auto"
            : "relative mt-3 lg:mt-0 lg:flex lg:justify-end"
        }`}
      >
        <TopBarContactGroup
          isCompact={isCompact}
          registerItemRef={registerItemRef}
        />
      </div>
    </div>
  );
}

function TopBarContactGroup({
  isCompact,
  registerItemRef,
}: {
  isCompact: boolean;
  registerItemRef: (index: number) => Ref<HTMLAnchorElement>;
}) {
  return (
    <div
      className={`flex w-full lg:inline-flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:pl-0 ${
        isCompact
          ? "flex-row items-center justify-center gap-1.5"
          : "flex-col gap-1.5 pl-1.5"
      }`}
    >
      <TopBarDirectionsContact
        itemRef={registerItemRef(0)}
        isCompact={isCompact}
        index={0}
      />

      <TopBarPhoneContact
        itemRef={registerItemRef(1)}
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
        itemRef={registerItemRef(2)}
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
  "flex h-7 w-7 shrink-0 items-center justify-center";

const TOP_BAR_TEXT_CLASS =
  "min-w-0 overflow-hidden whitespace-nowrap text-[11px] font-medium leading-tight text-slate-700 transition-[opacity,max-width] duration-300 ease-in sm:text-sm sm:leading-none lg:max-w-none lg:opacity-100";

function contactRowClass(isCompact: boolean) {
  return isCompact
    ? "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg lg:grid lg:h-auto lg:w-full lg:grid-cols-[1.75rem_minmax(0,1fr)] lg:gap-2.5 lg:rounded-xl lg:py-1"
    : TOP_BAR_ROW_CLASS;
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
      className={`${TOP_BAR_TEXT_CLASS} ${
        isCompact ? "max-w-0 opacity-0" : "max-w-[20rem] opacity-100"
      }`}
      style={{ transitionDelay: `${index * FLIP_STAGGER_MS}ms` }}
    >
      {children}
    </span>
  );
}

function TopBarDirectionsContact({
  itemRef,
  isCompact,
  index,
}: {
  itemRef: Ref<HTMLAnchorElement>;
  isCompact: boolean;
  index: number;
}) {
  return (
    <a
      ref={itemRef}
      href={VISIT_LOCATION.mapsDirectionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${contactRowClass(isCompact)} transition-opacity duration-300 ease-in hover:opacity-80`}
      aria-label={isCompact ? "Get Directions" : undefined}
    >
      <span
        className={`${TOP_BAR_ICON_SLOT_CLASS} overflow-visible [&_.directions-marker-icon-shell]:!m-0 [&_.directions-marker-icon-shell]:!h-7 [&_.directions-marker-icon-shell]:!w-7 [&_.directions-marker-icon-shell]:!-translate-y-1.5 lg:[&_.directions-marker-icon-shell]:!-translate-y-1`}
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
  itemRef,
  isCompact,
  index,
  icon,
  iconRingClassName,
  title,
  phone,
  phoneTel,
  phoneClassName,
}: {
  itemRef: Ref<HTMLAnchorElement>;
  isCompact: boolean;
  index: number;
  icon: React.ReactNode;
  iconRingClassName: string;
  title: string;
  phone: string;
  phoneTel: string;
  phoneClassName: string;
}) {
  return (
    <a
      ref={itemRef}
      href={`tel:${phoneTel}`}
      className={`${contactRowClass(isCompact)} transition-opacity duration-300 ease-in hover:opacity-80`}
      aria-label={isCompact ? `${title}: ${phone}` : undefined}
    >
      <span
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
