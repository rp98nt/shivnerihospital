import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";

const LOGO_SLOT_CLASS =
  "relative h-10 w-10 shrink-0 sm:h-14 sm:w-14 lg:h-[4.25rem] lg:w-[4.25rem]";

const LABEL_SLOT_CLASS =
  "flex h-[2.25rem] w-full shrink-0 items-center justify-center px-0.5 text-center text-[9px] font-semibold leading-tight line-clamp-3 sm:h-[3rem] sm:text-[11px] sm:leading-snug lg:h-[3.25rem] lg:text-xs lg:font-medium";

const LOGO_IMAGE_SIZES =
  "(max-width: 640px) 40px, (max-width: 1024px) 56px, 68px";

export function OurSpecialties() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Specialities</span>
        </h2>

        <div
          className="mt-8 grid grid-cols-4 items-start gap-1.5 sm:mt-10 sm:gap-4 lg:grid-cols-8 lg:gap-3"
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
    <Link href={specialty.href} className="specialty-card-frame">
      <span className="specialty-card">
        <span className="relative mt-1 flex flex-col items-center gap-0 px-1 sm:mt-2.5 sm:px-1.5 lg:mt-3">
          <span className={`relative block ${LOGO_SLOT_CLASS} -mb-0.5 sm:-mb-1.5 lg:-mb-2`}>
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
