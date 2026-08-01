import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";

const LOGO_SLOT_CLASS =
  "relative h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-[4.25rem] lg:w-[4.25rem]";

const LABEL_SLOT_CLASS =
  "flex h-[2.75rem] w-full shrink-0 items-center justify-center px-0.5 text-center text-[10px] font-semibold leading-tight line-clamp-3 sm:h-[3rem] sm:text-[11px] lg:h-[3.25rem] lg:text-xs lg:font-medium";

const LOGO_IMAGE_SIZES =
  "(max-width: 640px) 48px, (max-width: 1024px) 56px, 68px";

/** Border centerline: rounded-xl outer (12px) minus 1px inset. */
const SPECIALTY_BORDER_TRACK_DEFAULT =
  "M 12 1 H 88 A 11 11 0 0 1 99 12 V 88 A 11 11 0 0 1 88 99 H 12 A 11 11 0 0 1 1 88 V 12 A 11 11 0 0 1 12 1 Z";

/** Border centerline: rounded-2xl outer (16px) minus 1px inset. */
const SPECIALTY_BORDER_TRACK_SM =
  "M 16 1 H 84 A 15 15 0 0 1 99 16 V 84 A 15 15 0 0 1 84 99 H 16 A 15 15 0 0 1 1 84 V 16 A 15 15 0 0 1 16 1 Z";

/** Strip length along the track (~66% of normalized perimeter). */
const RUNNER_LENGTH = 66;

const BORDER_ANIMATION_DURATION = "2.4s";

function specialtyTrackId(name: string, variant: "default" | "sm") {
  return `specialty-border-${name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}-${variant}`;
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
  const defaultTrackId = specialtyTrackId(specialty.name, "default");
  const smTrackId = specialtyTrackId(specialty.name, "sm");

  return (
    <Link
      href={specialty.href}
      className="specialty-card-frame relative block aspect-square w-full rounded-xl bg-teal-700 p-[2px] transition-[background-color] duration-200 hover:bg-transparent sm:rounded-2xl"
    >
      <SpecialtyBorderSvg
        trackId={defaultTrackId}
        trackPath={SPECIALTY_BORDER_TRACK_DEFAULT}
        className="sm:hidden"
      />

      <SpecialtyBorderSvg
        trackId={smTrackId}
        trackPath={SPECIALTY_BORDER_TRACK_SM}
        className="hidden sm:block"
      />

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

function SpecialtyBorderSvg({
  trackId,
  trackPath,
  className,
}: {
  trackId: string;
  trackPath: string;
  className?: string;
}) {
  return (
    <svg
      className={`specialty-card__border pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className ?? ""}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path id={trackId} d={trackPath} fill="none" stroke="none" />

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
  );
}
