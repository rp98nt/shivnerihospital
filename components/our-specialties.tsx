import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";

const LOGO_SIZE_CLASS = "h-[6.63rem] w-[6.63rem] sm:h-[8.775rem] sm:w-[8.775rem]";

export function OurSpecialties() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Specialities</span>
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-3 min-[420px]:grid-cols-3 sm:mt-10 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 lg:gap-5">
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
    <Link
      href={specialty.href}
      className="group flex min-h-[4.75rem] flex-row items-center gap-2 rounded-2xl border-2 border-teal-700 bg-white px-3 py-3 text-teal-800 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:aspect-square sm:min-h-0 sm:flex-col sm:justify-center sm:gap-1 sm:px-3 sm:py-5"
    >
      <div className={`relative shrink-0 ${LOGO_SIZE_CLASS}`}>
        <Image
          src={specialty.imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 640px) 82px, 108px"
        />
      </div>
      <p className="min-w-0 text-left text-sm font-medium leading-snug sm:px-1 sm:text-center sm:text-xs lg:text-sm">
        {specialty.name}
      </p>
    </Link>
  );
}
