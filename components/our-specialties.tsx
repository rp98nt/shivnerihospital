import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";

const LOGO_SLOT_CLASS =
  "relative h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-[4.25rem] lg:w-[4.25rem]";

const LABEL_SLOT_CLASS =
  "flex h-[2.75rem] w-full shrink-0 items-center justify-center px-0.5 text-center text-[10px] font-semibold leading-tight line-clamp-3 sm:h-[3rem] sm:text-[11px] lg:h-[3.25rem] lg:text-xs lg:font-medium";

const LOGO_IMAGE_SIZES =
  "(max-width: 640px) 48px, (max-width: 1024px) 56px, 68px";

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
  return (
    <div className="specialty-card-shell aspect-square w-full rounded-xl shadow-sm hover:shadow-lg sm:rounded-2xl">
      <svg
        className="specialty-card-border-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect
          className="specialty-card-border-track"
          x="1"
          y="1"
          width="98"
          height="98"
          rx="11"
          ry="11"
          pathLength="100"
        />
      </svg>
      <Link
        href={specialty.href}
        className="specialty-card-link group flex h-full w-full items-center justify-center overflow-hidden rounded-xl border-2 border-teal-700 bg-white text-teal-800 transition-[border-color] duration-300 sm:rounded-2xl"
      >
        <div className="mt-2 flex flex-col items-center gap-0 px-1.5 sm:mt-2.5 lg:mt-3">
          <div className={LOGO_SLOT_CLASS}>
            <Image
              src={specialty.imageSrc}
              alt=""
              fill
              className="object-contain"
              sizes={LOGO_IMAGE_SIZES}
            />
          </div>
          <p className={LABEL_SLOT_CLASS}>{specialty.name}</p>
        </div>
      </Link>
    </div>
  );
}
