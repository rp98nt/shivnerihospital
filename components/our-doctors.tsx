"use client";

import {
  SORTED_DOCTORS,
  getDoctorAppointmentPath,
  getDoctorProfilePath,
  type Doctor,
} from "@/lib/doctors";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DOCTORS_CAROUSEL_CYCLE_SECONDS = 60;
const DOCTORS_CAROUSEL_LOOP_SETS = 3;

export function OurDoctors() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselDoctors = [
    ...SORTED_DOCTORS,
    ...SORTED_DOCTORS,
    ...SORTED_DOCTORS,
  ];

  function getCardStep(container: HTMLDivElement) {
    const firstCard = container.querySelector("article");
    const gap = window.matchMedia("(min-width: 640px)").matches ? 20 : 16;
    return firstCard
      ? firstCard.clientWidth + gap
      : container.clientWidth * 0.85;
  }

  function getSetWidth(container: HTMLDivElement) {
    return container.scrollWidth / DOCTORS_CAROUSEL_LOOP_SETS;
  }

  function getLoopPosition(container: HTMLDivElement, setWidth: number) {
    let position = container.scrollLeft - setWidth;

    while (position < 0) {
      position += setWidth;
    }

    while (position >= setWidth) {
      position -= setWidth;
    }

    return position;
  }

  function syncPagination(container: HTMLDivElement) {
    const setWidth = getSetWidth(container);
    if (setWidth <= 0) return;

    const step = getCardStep(container);
    const loopPosition = getLoopPosition(container, setWidth);
    const nextIndex =
      Math.round(loopPosition / Math.max(step, 1)) % SORTED_DOCTORS.length;

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  }

  function normalizeScroll(container: HTMLDivElement) {
    const setWidth = getSetWidth(container);
    if (setWidth <= 0) return;

    while (container.scrollLeft >= setWidth * 2) {
      container.scrollLeft -= setWidth;
    }

    while (container.scrollLeft < setWidth) {
      container.scrollLeft += setWidth;
    }
  }

  function initializeScrollPosition(container: HTMLDivElement) {
    const setWidth = getSetWidth(container);
    if (setWidth <= 0) return;

    container.scrollLeft = setWidth;
    syncPagination(container);
  }

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let lastTime = performance.now();

    const getScrollSpeed = () => {
      const setWidth = getSetWidth(container);
      return setWidth / DOCTORS_CAROUSEL_CYCLE_SECONDS;
    };

    const onScroll = () => {
      normalizeScroll(container);
      syncPagination(container);
    };

    const tick = (now: number) => {
      const elapsed = (now - lastTime) / 1000;
      lastTime = now;

      if (!reducedMotion.matches && !isPausedRef.current) {
        container.scrollLeft += getScrollSpeed() * elapsed;
        normalizeScroll(container);
        syncPagination(container);
      }

      frameId = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (container.scrollLeft === 0) {
        initializeScrollPosition(container);
      } else {
        normalizeScroll(container);
        syncPagination(container);
      }
    });

    resizeObserver.observe(container);
    container.addEventListener("scroll", onScroll, { passive: true });
    initializeScrollPosition(container);

    if (!reducedMotion.matches) {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  function scrollDoctors(direction: "left" | "right") {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -getCardStep(container) : getCardStep(container),
      behavior: "smooth",
    });
  }

  function scrollToDoctor(index: number) {
    const container = scrollRef.current;
    if (!container) return;

    const setWidth = getSetWidth(container);
    const step = getCardStep(container);
    const targetLeft = setWidth + index * step;

    container.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Doctors</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
          Meet our experienced consultants and visiting guest faculty.
        </p>

        <div
          className="doctors-carousel-shell mt-8 px-8 sm:mt-10 sm:px-10"
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
        >
          <button
            type="button"
            className="doctors-scroll-control doctors-scroll-control--left"
            aria-label="Scroll doctors left"
            onClick={() => scrollDoctors("left")}
          >
            <DoctorsScrollArrow direction="left" />
          </button>

          <div className="doctors-carousel-mask">
            <div
              ref={scrollRef}
              className="doctors-carousel-scroll"
              tabIndex={0}
              aria-label="Doctors carousel"
            >
              <div className="flex w-max gap-4 sm:gap-5">
                {carouselDoctors.map((doctor, index) => (
                  <DoctorCard key={`${doctor.slug}-${index}`} doctor={doctor} />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="doctors-scroll-control doctors-scroll-control--right"
            aria-label="Scroll doctors right"
            onClick={() => scrollDoctors("right")}
          >
            <DoctorsScrollArrow direction="right" />
          </button>

          <div
            className="doctors-carousel-pagination"
            role="tablist"
            aria-label="Doctors carousel position"
          >
            {SORTED_DOCTORS.map((doctor, index) => (
              <button
                key={doctor.slug}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${doctor.name}`}
                className={`doctors-carousel-dot${
                  index === activeIndex ? " is-active" : ""
                }`}
                onClick={() => scrollToDoctor(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorsScrollArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <div className={`doctors-scroll-arrow doctors-scroll-arrow--${direction}`}>
      <span />
      <span />
      <span />
    </div>
  );
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article
      className={`flex min-h-[35.625rem] w-[19.5rem] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[21rem] ${
        doctor.isGuest
          ? "ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-50"
          : "border border-slate-100"
      }`}
    >
      <div className="relative min-h-0 flex-[7] bg-linear-to-b from-teal-50 to-slate-100">
        <DoctorPhotoPlaceholder />
        {doctor.isGuest ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950 shadow-sm">
            <StarIcon className="h-3 w-3" />
            Guest
          </span>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-[3] flex-col border-t border-slate-100 px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="flex items-start gap-1 text-sm font-bold leading-snug text-slate-900">
              {doctor.isGuest ? (
                <StarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
              ) : null}
              <Link
                href={getDoctorProfilePath(doctor.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-teal-700"
              >
                {doctor.name}
              </Link>
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">{doctor.specialty}</p>
          </div>
          <ShareIcon className="h-4 w-4 shrink-0 text-slate-400" />
        </div>

        <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
          {doctor.qualifications}
        </p>
      </div>

      <Link
        href={getDoctorAppointmentPath(doctor.slug)}
        className="flex w-full items-center justify-center gap-2 bg-amber-400 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
      >
        Book Appointment
        <ArrowUpRightIcon className="h-4 w-4" />
      </Link>
    </article>
  );
}

function DoctorPhotoPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-teal-700/70">
      <svg
        className="h-24 w-24 sm:h-28 sm:w-28"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
      >
        <circle cx="32" cy="22" r="10" fill="currentColor" opacity="0.25" />
        <path
          d="M14 54c2.5-10 8.5-14 18-14s15.5 4 18 14"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M20 58h24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />
        <rect
          x="18"
          y="34"
          width="28"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.35"
        />
      </svg>
      <span className="text-[10px] font-medium uppercase tracking-wide">
        Photo soon
      </span>
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.2L12 18.8 7.6 21.6l1.7-7.2-5.6-4.9 7.4-.6L12 2z" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M7 17 17 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}
