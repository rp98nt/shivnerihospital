"use client";

import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SPECIALTIES_CAROUSEL_CYCLE_SECONDS = 60;
const SPECIALTIES_CAROUSEL_LOOP_SETS = 3;

const LOGO_SIZE_CLASS = {
  default: "h-20 w-20 sm:h-[6.75rem] sm:w-[6.75rem]",
  large: "h-[4.75rem] w-[4.75rem] sm:h-[6.14rem] sm:w-[6.14rem]",
} as const;

const LOGO_IMAGE_SIZES = {
  default: "(max-width: 640px) 80px, 108px",
  large: "(max-width: 640px) 76px, 98px",
} as const;

export function OurSpecialties() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselSpecialties = [
    ...OUR_SPECIALTIES,
    ...OUR_SPECIALTIES,
    ...OUR_SPECIALTIES,
  ];

  function getCardStep(container: HTMLDivElement) {
    const firstCard = container.querySelector("a");
    const gap = window.matchMedia("(min-width: 640px)").matches ? 20 : 16;
    return firstCard
      ? firstCard.clientWidth + gap
      : container.clientWidth * 0.85;
  }

  function getSetWidth(container: HTMLDivElement) {
    return container.scrollWidth / SPECIALTIES_CAROUSEL_LOOP_SETS;
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
      Math.round(loopPosition / Math.max(step, 1)) % OUR_SPECIALTIES.length;

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
      return setWidth / SPECIALTIES_CAROUSEL_CYCLE_SECONDS;
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

  function scrollSpecialties(direction: "left" | "right") {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -getCardStep(container) : getCardStep(container),
      behavior: "smooth",
    });
  }

  function scrollToSpecialty(index: number) {
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
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Specialities</span>
        </h2>

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
            aria-label="Scroll specialities left"
            onClick={() => scrollSpecialties("left")}
          >
            <SpecialtiesScrollArrow direction="left" />
          </button>

          <div className="doctors-carousel-mask">
            <div
              ref={scrollRef}
              className="doctors-carousel-scroll"
              tabIndex={0}
              aria-label="Specialities carousel"
            >
              <div className="flex w-max gap-4 sm:gap-5">
                {carouselSpecialties.map((specialty, index) => (
                  <SpecialtyCard
                    key={`${specialty.name}-${index}`}
                    specialty={specialty}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="doctors-scroll-control doctors-scroll-control--right"
            aria-label="Scroll specialities right"
            onClick={() => scrollSpecialties("right")}
          >
            <SpecialtiesScrollArrow direction="right" />
          </button>

          <div
            className="doctors-carousel-pagination"
            role="tablist"
            aria-label="Specialities carousel position"
          >
            {OUR_SPECIALTIES.map((specialty, index) => (
              <button
                key={specialty.name}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${specialty.name}`}
                className={`doctors-carousel-dot${
                  index === activeIndex ? " is-active" : ""
                }`}
                onClick={() => scrollToSpecialty(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecialtyCard({ specialty }: { specialty: OurSpecialty }) {
  const logoSize = specialty.largeLogo ? "large" : "default";

  return (
    <Link
      href={specialty.href}
      className={`group flex aspect-square w-[11rem] shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-teal-700 bg-white px-2.5 py-3.5 text-teal-800 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-3 sm:py-5 ${
        specialty.largeLogo ? "gap-2 sm:gap-2.5" : "gap-1.5 sm:gap-1"
      }`}
    >
      <div className={`relative shrink-0 ${LOGO_SIZE_CLASS[logoSize]}`}>
        <Image
          src={specialty.imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes={LOGO_IMAGE_SIZES[logoSize]}
        />
      </div>
      <p
        className={`flex min-h-[2.5rem] w-full items-center justify-center px-1 text-center text-xs font-semibold leading-snug line-clamp-3 sm:min-h-0 sm:font-medium lg:text-sm${
          specialty.extraLabelGap ? " mt-1.5 sm:mt-2" : ""
        }`}
      >
        {specialty.name}
      </p>
    </Link>
  );
}

function SpecialtiesScrollArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <div className={`doctors-scroll-arrow doctors-scroll-arrow--${direction}`}>
      <span />
      <span />
      <span />
    </div>
  );
}
