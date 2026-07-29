import { DoctorAvatar } from "@/components/doctor-avatar";
import { DoctorAboutInsetOverlay } from "@/components/doctor-about-inset-overlay";
import type { ResolvedDoctorProfileSettings } from "@/lib/doctor-profile-settings";
import {
  getDoctorAppointmentPath,
  type Doctor,
} from "@/lib/doctors";
import Image from "next/image";
import Link from "next/link";

type DoctorProfileAboutProps = {
  doctor: Doctor;
  photoUrl?: string;
  profileDisplay?: ResolvedDoctorProfileSettings;
};

export function DoctorProfileAbout({
  doctor,
  photoUrl,
  profileDisplay,
}: DoctorProfileAboutProps) {
  const expertiseTags = profileDisplay?.expertiseTags ?? getExpertiseTags(doctor);
  const aboutInsetUrl = profileDisplay?.aboutInsetUrl;
  const languages =
    profileDisplay?.languages ?? "English, Hindi, Marathi";
  const availability = profileDisplay?.availability ?? "Mon - Sat";
  const roleLabel = doctor.isGuest ? "Guest Faculty" : "Consultant Surgeon";

  return (
    <section className="border-t border-slate-200 bg-[#faf9f6] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 overflow-visible lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div
            className={
              aboutInsetUrl ? "relative z-20 overflow-visible" : undefined
            }
          >
            <div className="hidden lg:block" aria-hidden>
              <span className="invisible inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                About Me
              </span>
              <div className="mt-5" />
            </div>
            <div className="lg:mt-4">
              <DoctorAboutVisuals
                doctor={doctor}
                photoUrl={photoUrl}
                aboutBackgroundUrl={profileDisplay?.aboutBackgroundUrl}
                aboutInsetUrl={aboutInsetUrl}
                aboutInsetX={profileDisplay?.aboutInsetX}
                aboutInsetY={profileDisplay?.aboutInsetY}
              />
            </div>
          </div>

          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
              About Me
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
              Committed To{" "}
              <em className="not-italic text-teal-700">Healing</em>{" "}
              With Science &amp; Heart
            </h2>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                {doctor.name} is a {doctor.specialty.toLowerCase()} specialist
                at Shivneri Hospital, Parbhani, with qualifications including{" "}
                {doctor.qualifications}. {roleLabel} care is focused on accurate
                diagnosis, thoughtful treatment planning, and follow-up that
                helps patients recover with confidence.
              </p>
              <p>
                From consultation through recovery, {doctor.name} works to
                explain every step clearly and provide care that is respectful,
                evidence-based, and aligned with the standards patients expect
                at Shivneri Hospital.
              </p>
            </div>

            <blockquote className="mt-6 border-l-4 border-teal-700 bg-teal-50/70 px-5 py-4 text-base italic leading-relaxed text-slate-700">
              &ldquo;My goal isn&apos;t just to treat illness &mdash; it&apos;s
              to partner with each patient on their journey to wellness.&rdquo;
            </blockquote>

            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <AboutDetail label="Full Name" value={doctor.name} />
              <AboutDetail label="Specialty" value={doctor.specialty} />
              <AboutDetail label="Hospital" value="Shivneri Hospital" />
              <AboutDetail label="Location" value="Parbhani, Maharashtra" />
              <div>
                <AboutDetail
                  label="Languages"
                  value={languages}
                />
                <AboutDetail
                  label="Availability"
                  value={availability}
                  highlight
                  className="mt-5"
                />
              </div>
              <AboutDetail
                label="Role"
                value={roleLabel}
                highlight={!doctor.isGuest}
              />
            </dl>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {expertiseTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-teal-50 px-3.5 py-1.5 text-sm font-medium text-teal-800 ring-1 ring-teal-100"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={getDoctorAppointmentPath(doctor.slug)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                <CalendarIcon className="h-4 w-4" />
                Book Appointment
              </Link>
              <Link
                href="/team-of-doctors"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-teal-700 bg-white px-6 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                View All Doctors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorAboutVisuals({
  doctor,
  photoUrl,
  aboutBackgroundUrl,
  aboutInsetUrl,
  aboutInsetX,
  aboutInsetY,
}: {
  doctor: Doctor;
  photoUrl?: string;
  aboutBackgroundUrl?: string;
  aboutInsetUrl?: string;
  aboutInsetX?: number;
  aboutInsetY?: number;
}) {
  const backgroundUrl = aboutBackgroundUrl ?? photoUrl;

  return (
    <div
      className={`relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none ${
        aboutInsetUrl ? "overflow-visible pr-6 sm:pr-10 lg:pr-14" : ""
      }`}
    >
      <div className="relative aspect-[4/5] overflow-visible">
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-linear-to-b from-teal-50 to-slate-100 shadow-lg">
          {backgroundUrl ? (
            <Image
              src={backgroundUrl}
              alt={doctor.name}
              fill
              className="object-cover object-[center_22%]"
              sizes="(max-width: 1024px) 100vw, 28rem"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <DoctorAvatar
                name={doctor.name}
                photoUrl={null}
                size="lg"
                tone="teal"
                className="!h-40 !w-40 text-5xl"
              />
            </div>
          )}
        </div>

        {aboutInsetUrl ? (
          <DoctorAboutInsetOverlay
            aboutInsetUrl={aboutInsetUrl}
            alt={`${doctor.name} in surgery`}
            position={{ x: aboutInsetX, y: aboutInsetY }}
            priority
          />
        ) : null}
      </div>
    </div>
  );
}

function AboutDetail({
  label,
  value,
  highlight = false,
  className = "",
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </dt>
      <dd
        className={`mt-1.5 text-base font-semibold ${
          highlight ? "text-teal-700" : "text-slate-900"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function getExpertiseTags(doctor: Doctor) {
  if (doctor.expertiseTags?.length) {
    return doctor.expertiseTags;
  }

  const qualificationTags = doctor.qualifications
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return [doctor.specialty, ...qualificationTags].filter(
    (tag, index, tags) => tags.indexOf(tag) === index,
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
