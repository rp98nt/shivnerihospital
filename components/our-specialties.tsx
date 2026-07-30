import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Specialty = {
  name: string;
  href: string;
  imageSrc?: string;
  icon?: ReactNode;
};

const LOGO_SIZE_CLASS = "h-[4.2rem] w-[4.2rem] sm:h-[5.6rem] sm:w-[5.6rem]";

const SPECIALTIES: Specialty[] = [
  {
    name: "Cardiac Sciences",
    href: "#",
    imageSrc: "/our-specialties/cardiac-sciences.jpeg",
  },
  {
    name: "Neuro Sciences",
    href: "#",
    imageSrc: "/our-specialties/neuro-sciences.jpeg",
  },
  {
    name: "Pulmonology",
    href: "#",
    imageSrc: "/our-specialties/pulmonology.jpeg",
  },
  {
    name: "Endoscopy",
    href: "#",
    icon: <EndoscopyIcon />,
  },
  {
    name: "Ophthalmology",
    href: "#",
    imageSrc: "/our-specialties/ophthalmology.jpeg",
  },
  {
    name: "Robotic Assisted Total Knee Replacement",
    href: "#",
    icon: <RoboticSurgeryIcon />,
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
      <div
        className={`relative shrink-0 ${LOGO_SIZE_CLASS} ${
          specialty.icon ? "flex items-center justify-center" : ""
        }`}
      >
        {specialty.imageSrc ? (
          <Image
            src={specialty.imageSrc}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 67px, 90px"
          />
        ) : (
          specialty.icon
        )}
      </div>
      <p className="min-w-0 text-left text-sm font-medium leading-snug sm:mt-3 sm:px-1 sm:text-center sm:text-xs lg:text-sm">
        {specialty.name}
      </p>
    </Link>
  );
}

function EndoscopyIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M8 6c0 2 1 3 4 3s4-1 4-3" />
      <path d="M12 9v8" />
      <path d="M9 17h6" />
      <path d="M10 20h4" />
      <path d="M16 7l3-2M18 9l2 1" />
    </svg>
  );
}

function RoboticSurgeryIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 3v4" />
      <path d="M10 3h4" />
      <path d="M12 7v3" />
      <path d="M8 10h8" />
      <path d="M9 10v2l-3 8h3l1-4" />
      <path d="M15 10v2l3 8h-3l-1-4" />
      <circle cx="12" cy="18" r="2" />
    </svg>
  );
}
