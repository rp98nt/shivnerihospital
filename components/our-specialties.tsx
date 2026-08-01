import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";

const LOGO_SIZE_CLASS = {
  default: "h-12 w-12 sm:h-14 sm:w-14 lg:h-[4.25rem] lg:w-[4.25rem]",
  large: "h-11 w-11 sm:h-[3.25rem] sm:w-[3.25rem] lg:h-[3.75rem] lg:w-[3.75rem]",
} as const;

const LOGO_IMAGE_SIZES = {
  default: "(max-width: 640px) 48px, (max-width: 1024px) 56px, 68px",
  large: "(max-width: 640px) 44px, (max-width: 1024px) 52px, 60px",
} as const;

export function OurSpecialties() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Specialities</span>
        </h2>

        <div
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8 lg:gap-3"
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
  const logoSize = specialty.largeLogo ? "large" : "default";

  return (
    <Link
      href={specialty.href}
      className={`group flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-teal-700 bg-white px-1.5 py-2.5 text-teal-800 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:rounded-2xl sm:px-2 sm:py-3 lg:px-2 lg:py-3.5 ${
        specialty.largeLogo ? "gap-1 sm:gap-1.5 lg:gap-2" : "gap-1 sm:gap-1.5"
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
        className={`flex min-h-[2.25rem] w-full items-center justify-center px-0.5 text-center text-[10px] font-semibold leading-snug line-clamp-3 sm:min-h-[2.5rem] sm:text-[11px] lg:min-h-0 lg:text-xs lg:font-medium${
          specialty.extraLabelGap ? " mt-1 sm:mt-1.5 lg:mt-2" : ""
        }`}
      >
        {specialty.name}
      </p>
    </Link>
  );
}
