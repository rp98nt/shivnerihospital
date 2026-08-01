import { HOSPITAL_NAME } from "@/lib/hospital-contact";
import Image from "next/image";
import Link from "next/link";

const HOSPITAL_INTERIOR_IMAGE =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80";

type AboutUsHeroSectionProps = {
  /** Use h2 on the homepage where the main hero already provides the page h1. */
  titleAs?: "h1" | "h2";
  /** Prioritise the interior image when rendered above the fold on the homepage. */
  priorityImage?: boolean;
};

export function AboutUsHeroSection({
  titleAs = "h1",
  priorityImage = false,
}: AboutUsHeroSectionProps) {
  const TitleTag = titleAs;

  return (
    <section className="relative overflow-hidden bg-[#eef6fc] py-10 sm:py-14 md:py-16">
      <AboutHexPattern className="pointer-events-none absolute inset-0 text-teal-700/5" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          <div className="lg:col-span-5 lg:pt-4">
            <TitleTag className="max-w-md text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.35rem]">
              <span className="text-teal-600">About</span>{" "}
              <span className="text-slate-900">Shivneri Hospital</span>
            </TitleTag>

            <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base lg:mx-0 lg:mt-6 lg:max-w-md lg:text-left lg:hidden">
              {HOSPITAL_NAME} is a trusted multispecialty hospital serving
              families across Parbhani and surrounding regions with
              compassionate, professional healthcare.
            </p>

            <p className="mt-6 hidden max-w-md text-sm leading-relaxed text-slate-600 lg:block">
              {HOSPITAL_NAME} is a trusted multispecialty hospital serving
              families across Parbhani and surrounding regions with
              compassionate, professional healthcare.
            </p>
          </div>

          <article className="relative overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-[0_20px_60px_rgb(15_23_42_/_0.08)] sm:p-8 lg:col-span-7 lg:col-start-6">
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
              {HOSPITAL_NAME} is a trusted multispecialty hospital that combines
              advanced medical technologies with a warm human approach.{" "}
              <strong className="font-semibold text-slate-900">
                The main goal of the institution is to create a space of trust
                where every patient feels calm and confident
              </strong>{" "}
              at every stage of treatment.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-[0_20px_60px_rgb(15_23_42_/_0.08)] sm:p-8 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
                <MissionIcon className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Our Mission
                </h2>
                <p className="text-xs font-medium text-slate-400">
                  — {HOSPITAL_NAME}
                </p>
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
              Create a hospital experience that{" "}
              <strong className="font-semibold text-slate-900">
                reflects Shivneri Hospital&apos;s philosophy
              </strong>
              : caring, professional, and modern.{" "}
              <strong className="font-semibold text-slate-900">
                Care had to remain accessible
              </strong>{" "}
              for all age groups, with easy access to appointments, information
              about specialities, services, and doctors.
            </p>

            <Link
              href="/team-of-doctors"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-900"
            >
              Trusted care in Parbhani
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </article>

          <div className="relative min-h-[260px] overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgb(15_23_42_/_0.12)] sm:min-h-[320px] lg:col-span-7 lg:min-h-[360px]">
            <Image
              src={HOSPITAL_INTERIOR_IMAGE}
              alt={`${HOSPITAL_NAME} campus interior`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority={priorityImage}
            />
            <div className="absolute inset-0 bg-linear-to-t from-teal-950/35 via-teal-900/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <span className="rounded-2xl bg-teal-700/90 px-6 py-4 text-lg font-semibold text-white shadow-lg backdrop-blur-sm sm:text-2xl">
                Take a look inside
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutHexPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="about-hex-pattern"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.2)"
        >
          <path
            d="M28 0 52 14v28L28 56 4 42V14Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#about-hex-pattern)" />
    </svg>
  );
}

function MissionIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
