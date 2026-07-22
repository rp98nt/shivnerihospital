"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export type PartnerCarouselItem = {
  name: string;
  logo?: string;
};

type PartnerCarouselProps = {
  heading: ReactNode;
  partners: PartnerCarouselItem[];
  direction?: "ltr" | "rtl";
  className?: string;
};

export function PartnerCarousel({
  heading,
  partners,
  direction = "rtl",
  className = "",
}: PartnerCarouselProps) {
  const carouselItems = [...partners, ...partners];
  const trackDirectionClass =
    direction === "ltr"
      ? "partner-carousel-track--ltr"
      : "partner-carousel-track--rtl";

  return (
    <section
      className={`border-b border-slate-200 bg-white py-10 sm:py-12 ${className}`.trim()}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-xl font-semibold text-slate-800 sm:text-2xl">
          {heading}
        </h2>

        <div className="partner-carousel-mask relative mt-8 sm:mt-10">
          <div
            className={`partner-carousel-track flex w-max gap-4 sm:gap-5 ${trackDirectionClass}`}
          >
            {carouselItems.map((partner, index) => (
              <PartnerCarouselCard
                key={`${partner.name}-${index}`}
                partner={partner}
              />
            ))}
          </div>
        </div>
      </div>
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
