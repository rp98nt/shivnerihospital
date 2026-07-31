import { OUR_SPECIALTIES, type OurSpecialty } from "@/lib/our-specialties-data";
import Image from "next/image";
import Link from "next/link";

const LOGO_SIZE_CLASS = "h-[5.88rem] w-[5.88rem] sm:h-[7.84rem] sm:w-[7.84rem]";

export function OurSpecialties() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Specialities</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
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
      className="group flex min-h-[5.5rem] flex-row items-center gap-4 rounded-2xl border-2 border-teal-700 bg-white px-4 py-4 text-teal-800 shadow-sm transition-[background-color,color,box-shadow,transform] duration-300 ease-in hover:-translate-y-1 hover:bg-teal-800 hover:text-white hover:shadow-xl sm:aspect-square sm:min-h-0 sm:flex-col sm:justify-center sm:px-3 sm:py-5"
    >
      <div className={`relative shrink-0 ${LOGO_SIZE_CLASS}`}>
        <Image
          src={specialty.imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 640px) 94px, 126px"
        />
      </div>
      <p className="min-w-0 text-left text-sm font-medium leading-snug transition-colors duration-300 ease-in group-hover:text-white sm:mt-3 sm:px-1 sm:text-center sm:text-xs lg:text-sm">
        {specialty.name}
      </p>
    </Link>
  );
}
