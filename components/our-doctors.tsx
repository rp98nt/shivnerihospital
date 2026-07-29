"use client";

import { DoctorCard } from "@/components/doctor-card";
import { SORTED_DOCTORS } from "@/lib/doctors";
import { useEffect, useRef, useState } from "react";

const DOCTORS_CAROUSEL_CYCLE_SECONDS = 60;
const DOCTORS_CAROUSEL_LOOP_SETS = 3;

export function OurDoctors({
  photoUrls = {},
}: {
  photoUrls?: Record<string, string>;
}) {
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
                  <DoctorCard
                    key={`${doctor.slug}-${index}`}
                    doctor={doctor}
                    photoUrl={photoUrls[doctor.slug]}
                    layout="carousel"
                  />
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
