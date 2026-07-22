import Link from "next/link";
import type { ReactNode } from "react";

type Specialty = {
  name: string;
  href: string;
  icon: ReactNode;
};

const SPECIALTIES: Specialty[] = [
  {
    name: "Cardiac Sciences",
    href: "#",
    icon: <HeartIcon />,
  },
  {
    name: "Neuro Sciences",
    href: "#",
    icon: <BrainIcon />,
  },
  {
    name: "Pulmonology",
    href: "#",
    icon: <LungsIcon />,
  },
  {
    name: "Endoscopy",
    href: "#",
    icon: <EndoscopyIcon />,
  },
  {
    name: "Ophthalmology",
    href: "#",
    icon: <EyeIcon />,
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
        <h2 className="text-center text-2xl font-bold text-blue-900 sm:text-3xl">
          Our Specialties
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
      className="group flex min-h-[5.5rem] flex-row items-center gap-4 rounded-2xl border-2 border-blue-800 bg-white px-4 py-4 text-blue-800 shadow-sm transition duration-300 hover:bg-blue-800 hover:text-white hover:shadow-lg sm:aspect-square sm:min-h-0 sm:flex-col sm:justify-center sm:px-3 sm:py-5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-16 sm:w-16">
        {specialty.icon}
      </div>
      <p className="min-w-0 text-left text-sm font-medium leading-snug sm:mt-3 sm:px-1 sm:text-center sm:text-xs lg:text-sm">
        {specialty.name}
      </p>
    </Link>
  );
}

function HeartIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 4c-2 0-3.5 1.2-4 3-1.5.3-2.5 1.5-2.5 3 0 .8.3 1.5.8 2-1 .5-1.8 1.5-1.8 2.8 0 2.2 2.5 4.2 5.5 4.2h3c3 0 5.5-2 5.5-4.2 0-1.3-.8-2.3-1.8-2.8.5-.5.8-1.2.8-2 0-1.5-1-2.7-2.5-3-.5-1.8-2-3-4-3z" />
      <path d="M9 10h6M10 13h4" />
    </svg>
  );
}

function LungsIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 4v16" />
      <path d="M12 8c-3 0-5 2-5 6s2 6 5 6" />
      <path d="M12 8c3 0 5 2 5 6s-2 6-5 6" />
    </svg>
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

function EyeIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M18 18l2 2" />
      <path d="M19 17v3h-3" />
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
