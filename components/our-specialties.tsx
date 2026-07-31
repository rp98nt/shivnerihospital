import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";

const LOGO_SIZE_CLASS = "h-[3.822rem] w-[3.822rem] sm:h-[5.096rem] sm:w-[5.096rem]";

export function OurSpecialties() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Specialities</span>
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-2.5 min-[420px]:grid-cols-3 sm:mt-10 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 xl:grid-cols-8">
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
      className="group flex min-h-[3.575rem] flex-row items-center gap-2.5 rounded-xl border-2 border-teal-700 bg-white px-2.5 py-2.5 text-teal-800 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:aspect-square sm:min-h-0 sm:flex-col sm:justify-center sm:px-2.5 sm:py-4"
    >
      <div className={`relative shrink-0 ${LOGO_SIZE_CLASS}`}>
        <Image
          src={specialty.imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 640px) 47px, 63px"
        />
      </div>
      <p className="min-w-0 text-left text-[0.6875rem] font-medium leading-snug sm:mt-1.5 sm:px-0.5 sm:text-center sm:text-[0.625rem] lg:text-xs">
        {specialty.name}
      </p>
    </Link>
  );
}
