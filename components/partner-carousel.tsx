"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export type PartnerCarouselItem = {
  name: string;
  logo?: string;
};

export const PARTNER_CAROUSEL_BASE_COUNT = 13;
export const PARTNER_CAROUSEL_BASE_DURATION = 45;

type PartnerCarouselProps = {
  heading: ReactNode;
  partners: PartnerCarouselItem[];
  direction?: "ltr" | "rtl";
  spacing?: "first" | "middle" | "last";
  grouped?: boolean;
  className?: string;
};

const SPACING_CLASSES = {
  first: "pt-10 pb-6 sm:pt-12 sm:pb-8",
  middle: "py-6 sm:py-8",
  last: "pt-6 pb-10 sm:pt-8 sm:pb-12",
} as const;

export function getPartnerCarouselDuration(partnerCount: number) {
  return (
    PARTNER_CAROUSEL_BASE_DURATION *
    (partnerCount / PARTNER_CAROUSEL_BASE_COUNT)
  );
}

export function PartnerCarousel({
  heading,
  partners,
  direction = "rtl",
  spacing = "middle",
  grouped = false,
  className = "",
}: PartnerCarouselProps) {
  const carouselItems = [...partners, ...partners];
  const trackDirectionClass =
    direction === "ltr"
      ? "partner-carousel-track--ltr"
      : "partner-carousel-track--rtl";
  const scrollDuration = getPartnerCarouselDuration(partners.length);

  const content = (
    <>
      <h2 className="text-center text-xl font-semibold text-slate-800 sm:text-2xl">
        {heading}
      </h2>

      <div className="partner-carousel-mask relative mt-8 sm:mt-10">
        <div
          className={`partner-carousel-track flex w-max gap-4 sm:gap-5 ${trackDirectionClass}`}
          style={{ animationDuration: `${scrollDuration}s` }}
        >
          {carouselItems.map((partner, index) => (
            <PartnerCarouselCard
              key={`${partner.name}-${index}`}
              partner={partner}
            />
          ))}
        </div>
      </div>
    </>
  );

  if (grouped) {
    return (
      <div
        className={`px-4 py-8 sm:px-6 sm:py-10 ${className}`.trim()}
      >
        {content}
      </div>
    );
  }

  return (
    <section className={`bg-white ${SPACING_CLASSES[spacing]} ${className}`.trim()}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{content}</div>
    </section>
  );
}

function PartnerCarouselCard({ partner }: { partner: PartnerCarouselItem }) {
  return (
    <article className="partner-carousel-card group flex shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white px-5 py-3 sm:px-6 sm:py-3.5">
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          width={208}
          height={128}
          className="partner-carousel-logo h-full w-full object-contain"
        />
      ) : (
        <p className="px-2 text-center text-sm font-semibold leading-snug text-slate-700 sm:text-base">
          {partner.name}
        </p>
      )}
    </article>
  );
}
