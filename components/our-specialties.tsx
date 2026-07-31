import Image from "next/image";
import Link from "next/link";

type Specialty = {
  name: string;
  href: string;
  imageSrc: string;
};

const LOGO_SIZE_CLASS = "h-[4.2rem] w-[4.2rem] sm:h-[5.6rem] sm:w-[5.6rem]";

const SPECIALTIES: Specialty[] = [
  {
    name: "Cardiac Sciences",
    href: "#",
    imageSrc: "/our-specialties/cardiac-sciences.png",
  },
  {
    name: "Neuro Sciences",
    href: "#",
    imageSrc: "/our-specialties/neuro-sciences.png",
  },
  {
    name: "Pulmonology",
    href: "#",
    imageSrc: "/our-specialties/pulmonology.png",
  },
  {
    name: "Endoscopy",
    href: "#",
    imageSrc: "/our-specialties/endoscopy.png",
  },
  {
    name: "Ophthalmology",
    href: "#",
    imageSrc: "/our-specialties/ophthalmology.png",
  },
  {
    name: "Knee Replacement",
    href: "#",
    imageSrc: "/our-specialties/knee-replacement.png",
  },
];

export function OurSpecialties() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Specialties</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {SPECIALTIES.map((specialty) => (
            <SpecialtyCard key={specialty.name} specialty={specialty} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  return (
    <Link
      href={specialty.href}
      className="group flex min-h-[5.5rem] flex-row items-center gap-4 rounded-2xl border-2 border-teal-700 bg-white px-4 py-4 text-teal-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:aspect-square sm:min-h-0 sm:flex-col sm:justify-center sm:px-3 sm:py-5"
    >
      <div className={`relative shrink-0 ${LOGO_SIZE_CLASS}`}>
        <Image
          src={specialty.imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 640px) 67px, 90px"
        />
      </div>
      <p className="min-w-0 text-left text-sm font-medium leading-snug sm:mt-3 sm:px-1 sm:text-center sm:text-xs lg:text-sm">
        {specialty.name}
      </p>
    </Link>
  );
}
