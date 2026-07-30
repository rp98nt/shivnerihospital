"use client";

import type { Doctor } from "@/lib/doctors";
import {
  getDoctorTestimonials,
  getDoctorTestimonialsSubtitle,
  type PatientTestimonial,
} from "@/lib/doctor-testimonials";
import { useCallback, useEffect, useMemo, useState } from "react";

type DoctorProfileTestimonialsProps = {
  doctor: Doctor;
};

function getCardsPerPage(width: number) {
  if (width >= 1024) {
    return 3;
  }

  if (width >= 640) {
    return 2;
  }

  return 1;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DoctorProfileTestimonials({
  doctor,
}: DoctorProfileTestimonialsProps) {
  const testimonials = getDoctorTestimonials(doctor);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const syncCardsPerPage = () => {
      setCardsPerPage(getCardsPerPage(window.innerWidth));
    };

    syncCardsPerPage();
    window.addEventListener("resize", syncCardsPerPage);

    return () => {
      window.removeEventListener("resize", syncCardsPerPage);
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(testimonials.length / cardsPerPage));

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages - 1));
  }, [totalPages]);

  const visibleTestimonials = useMemo(() => {
    const start = page * cardsPerPage;
    return testimonials.slice(start, start + cardsPerPage);
  }, [cardsPerPage, page, testimonials]);

  const goToPage = useCallback(
    (nextPage: number) => {
      setPage((nextPage + totalPages) % totalPages);
    },
    [totalPages],
  );

  return (
    <section className="overflow-x-clip border-t border-slate-200 bg-white py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Patient Voices
          </span>

          <h2 className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
            What Patients{" "}
            <em className="not-italic text-teal-700">Say</em>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {getDoctorTestimonialsSubtitle(doctor)}
          </p>
        </div>

        <div className="relative mt-8 sm:mt-10 lg:mt-12">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-teal-700 p-2.5 text-white shadow-md transition hover:bg-teal-600 sm:inline-flex"
            aria-label="Previous testimonials"
          >
            <ChevronIcon direction="left" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-teal-700 p-2.5 text-white shadow-md transition hover:bg-teal-600 sm:inline-flex"
            aria-label="Next testimonials"
          >
            <ChevronIcon direction="right" className="h-5 w-5" />
          </button>

          <div className="px-0 sm:px-12 lg:px-14">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {visibleTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              className="inline-flex rounded-full bg-teal-700 p-2 text-white shadow-sm transition hover:bg-teal-600 sm:hidden"
              aria-label="Previous testimonials"
            >
              <ChevronIcon direction="left" className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPage(index)}
                  aria-label={`Go to testimonial page ${index + 1}`}
                  aria-current={index === page ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === page
                      ? "w-8 bg-teal-700"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              className="inline-flex rounded-full bg-teal-700 p-2 text-white shadow-sm transition hover:bg-teal-600 sm:hidden"
              aria-label="Next testimonials"
            >
              <ChevronIcon direction="right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: PatientTestimonial }) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <QuoteIcon className="h-8 w-8 shrink-0 text-amber-500 sm:h-9 sm:w-9" />
        <StarRating />
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-5 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
            {getInitials(testimonial.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">
              {testimonial.name}
            </p>
            <p className="truncate text-xs text-slate-500 sm:text-sm">
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function StarRating() {
  return (
    <div className="flex shrink-0 gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} className="h-4 w-4 text-amber-400" />
      ))}
    </div>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 7.5c0-2.2 1.8-4 4-4 .8 0 1.5.2 2.1.6-.3.9-.5 1.8-.5 2.7 0 2.8 2.2 5 5 5v3c-3.9 0-7-3.1-7-7v-.3zm10 0c0-2.2 1.8-4 4-4 .8 0 1.5.2 2.1.6-.3.9-.5 1.8-.5 2.7 0 2.8 2.2 5 5 5v3c-3.9 0-7-3.1-7-7v-.3z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.2L12 18.8 7.6 21.6l1.7-7.2-5.6-4.9 7.4-.6L12 2z" />
    </svg>
  );
}

function ChevronIcon({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}
