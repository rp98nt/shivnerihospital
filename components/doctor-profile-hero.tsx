import { DoctorAvatar } from "@/components/doctor-avatar";
import type { Doctor } from "@/lib/doctors";
import Image from "next/image";
import Link from "next/link";

type DoctorProfileHeroProps = {
  doctor: Doctor;
  photoUrl?: string;
};

export function DoctorProfileHero({
  doctor,
  photoUrl,
}: DoctorProfileHeroProps) {
  return (
    <section className="overflow-x-clip bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-12 lg:py-16">
        <Link
          href="/team-of-doctors"
          className="inline-flex min-h-11 items-center text-sm font-medium text-teal-700 transition hover:text-teal-800"
        >
          ← Back to Team of Doctors
        </Link>

        <div className="mt-6 grid items-center gap-8 sm:mt-8 sm:gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="min-w-0">
            {doctor.isGuest ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-900">
                <StarIcon className="h-4 w-4 text-amber-500" />
                Guest Faculty
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-900">
                <StarIcon className="h-4 w-4 text-amber-500" />
                Trusted care at Shivneri Hospital
              </span>
            )}

            <h1 className="mt-5 text-3xl font-bold leading-tight text-teal-900 sm:text-5xl">
              {doctor.name}
            </h1>

            <p className="mt-3 text-lg font-semibold leading-snug text-slate-900 sm:text-2xl">
              Experienced {doctor.specialty} Specialist in Parbhani
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              {doctor.qualifications}. Providing compassionate, evidence-based
              care for patients at Shivneri Hospital with a focus on clear
              communication and lasting recovery.
            </p>
          </div>

          <div className="relative mx-auto flex min-h-[18rem] w-full max-w-lg items-end justify-center sm:min-h-[22rem] md:min-h-[26rem] lg:mx-0 lg:max-w-none lg:justify-end">
            <div
              className="absolute right-0 top-6 h-[88%] w-[72%] rounded-2xl bg-linear-to-br from-teal-800 via-teal-900 to-slate-900 sm:w-[68%] lg:right-4"
              aria-hidden
            />

            <div className="relative z-10 aspect-[4/5] w-[68%] max-w-[18rem] overflow-hidden rounded-2xl bg-teal-50 shadow-2xl sm:max-w-[20rem] lg:w-[62%] lg:max-w-[22rem]">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={doctor.name}
                  fill
                  priority
                  className="object-cover object-[center_22%]"
                  sizes="(max-width: 1024px) 68vw, 22rem"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-b from-teal-50 to-slate-100">
                  <DoctorAvatar
                    name={doctor.name}
                    photoUrl={null}
                    size="lg"
                    tone="teal"
                    className="!h-36 !w-36 text-5xl sm:!h-40 sm:!w-40"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.2L12 18.8 7.6 21.6l1.7-7.2-5.6-4.9 7.4-.6L12 2z" />
    </svg>
  );
}
