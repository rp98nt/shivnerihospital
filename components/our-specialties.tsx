import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";

const LOGO_SLOT_CLASS =
  "relative h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-[4.25rem] lg:w-[4.25rem]";

const LABEL_SLOT_CLASS =
  "flex h-[2.75rem] w-full shrink-0 items-center justify-center px-0.5 text-center text-[10px] font-semibold leading-tight line-clamp-3 sm:h-[3rem] sm:text-[11px] lg:h-[3.25rem] lg:text-xs lg:font-medium";

const LOGO_IMAGE_SIZES =
  "(max-width: 640px) 48px, (max-width: 1024px) 56px, 68px";

/** Closed rounded-rect track aligned to the 2px card border. */
const SPECIALTY_BORDER_TRACK =
  "M 13 1 H 87 A 10 10 0 0 1 99 13 V 87 A 10 10 0 0 1 87 99 H 13 A 10 10 0 0 1 1 87 V 13 A 10 10 0 0 1 13 1 Z";

/** Short strip length along the track (~12% of perimeter). */
const RUNNER_LENGTH = 11;

const BORDER_ANIMATION_DURATION = "2.4s";

function specialtyTrackId(name: string) {
  return `specialty-border-${name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
}

export function OurSpecialties() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Specialities</span>
        </h2>

        <div
          className="mt-8 grid grid-cols-2 items-start gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8 lg:gap-3"
          aria-label="Hospital specialities"
        >
          {OUR_SPECIALTIES.map((specialty) => (
            <SpecialtyCard key={specialty.name} specialty={specialty} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecialtyCard({ specialty }: { specialty: OurSpecialty }) {
  const trackId = specialtyTrackId(specialty.name);

  return (
    <Link
      href={specialty.href}
      className="specialty-card-frame relative block aspect-square w-full rounded-xl bg-teal-700 p-[2px] transition-[background-color] duration-200 hover:bg-transparent sm:rounded-2xl"
    >
      <svg
        className="specialty-card__border pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path id={trackId} d={SPECIALTY_BORDER_TRACK} fill="none" stroke="none" />

        <g className="specialty-card__runner">
          <line
            x1="0"
            y1="0"
            x2={RUNNER_LENGTH}
            y2="0"
            className="specialty-card__runner-line"
          />
          <animateMotion
            dur={BORDER_ANIMATION_DURATION}
            repeatCount="indefinite"
            rotate="auto"
            calcMode="linear"
          >
            <mpath href={`#${trackId}`} />
          </animateMotion>
        </g>

        <g className="specialty-card__runner">
          <line
            x1="0"
            y1="0"
            x2={RUNNER_LENGTH}
            y2="0"
            className="specialty-card__runner-line"
          />
          <animateMotion
            dur={BORDER_ANIMATION_DURATION}
            repeatCount="indefinite"
            rotate="auto"
            calcMode="linear"
            begin="-1.2s"
          >
            <mpath href={`#${trackId}`} />
          </animateMotion>
        </g>
      </svg>

      <span className="specialty-card relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[10px] bg-white text-teal-800 sm:rounded-[14px]">
        <span className="relative z-[1] mt-2 flex flex-col items-center gap-0 px-1.5 sm:mt-2.5 lg:mt-3">
          <span className={`relative block ${LOGO_SLOT_CLASS} -mb-1 sm:-mb-1.5 lg:-mb-2`}>
            <Image
              src={specialty.imageSrc}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes={LOGO_IMAGE_SIZES}
            />
          </span>
          <span className={LABEL_SLOT_CLASS}>{specialty.name}</span>
        </span>
      </span>
    </Link>
  );
}
