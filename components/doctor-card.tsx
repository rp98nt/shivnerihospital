import { DoctorAvatar } from "@/components/doctor-avatar";
import { DoctorShareButton } from "@/components/doctor-share-button";
import {
  getDoctorAppointmentPath,
  getDoctorProfilePath,
  type Doctor,
} from "@/lib/doctors";
import Image from "next/image";
import Link from "next/link";

type DoctorCardProps = {
  doctor: Doctor;
  photoUrl?: string;
  layout?: "carousel" | "grid";
};

export function DoctorCard({
  doctor,
  photoUrl,
  layout = "carousel",
}: DoctorCardProps) {
  const isCarousel = layout === "carousel";
  const widthClassName = isCarousel
    ? "w-[15.6rem] shrink-0 sm:w-[21rem]"
    : "w-full";
  const shellClassName = isCarousel
    ? "min-h-[28.5rem] rounded-xl sm:min-h-[35.625rem] sm:rounded-2xl"
    : "min-h-[35.625rem] rounded-2xl";
  const contentClassName = isCarousel
    ? "px-2.5 py-2 sm:px-4 sm:py-3"
    : "px-3 py-2.5 sm:px-4 sm:py-3";
  const nameClassName = isCarousel
    ? "text-xs font-bold leading-snug text-slate-900 sm:text-sm"
    : "text-sm font-bold leading-snug text-slate-900";
  const specialtyClassName = isCarousel
    ? "mt-0.5 text-[10px] text-slate-500 sm:text-xs"
    : "mt-0.5 text-xs text-slate-500";
  const qualificationsClassName = isCarousel
    ? "mt-1.5 mb-5 line-clamp-2 text-[10px] leading-relaxed text-slate-600 sm:mt-2 sm:text-xs"
    : "mt-2 mb-5 line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs";
  const actionClassName = isCarousel
    ? "flex w-full items-center justify-center gap-1.5 bg-amber-400 py-2.5 text-xs font-semibold text-slate-900 transition hover:bg-amber-300 sm:gap-2 sm:py-3.5 sm:text-sm"
    : "flex w-full items-center justify-center gap-2 bg-amber-400 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300";

  const photoAreaClassName = isCarousel
    ? "relative flex-1 bg-linear-to-b from-teal-50 to-slate-100 min-h-[12rem] sm:min-h-0"
    : "relative min-h-0 flex-1 bg-linear-to-b from-teal-50 to-slate-100";

  return (
    <article
      className={`flex flex-col overflow-hidden border border-slate-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${shellClassName} ${widthClassName}`}
    >
      <div
        className={`${photoAreaClassName}${
          !photoUrl ? " flex items-center justify-center" : ""
        }`}
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={doctor.name}
            fill
            className="object-cover object-[center_22%]"
            sizes={
              layout === "carousel"
                ? "(max-width: 640px) 250px, 21rem"
                : "(max-width: 640px) 100vw, 33vw"
            }
          />
        ) : (
          <DoctorAvatar
            name={doctor.name}
            photoUrl={null}
            size="lg"
            tone="teal"
            className={
              isCarousel
                ? "h-20 w-20 text-2xl sm:h-32 sm:w-32 sm:text-4xl"
                : undefined
            }
          />
        )}
        {doctor.isGuest ? (
          <span
            className={`absolute inline-flex items-center gap-1 rounded-full bg-amber-400 font-bold uppercase tracking-wide text-amber-950 shadow-sm ${
              isCarousel
                ? "left-2 top-2 px-1.5 py-0.5 text-[8px] sm:left-3 sm:top-3 sm:px-2 sm:text-[10px]"
                : "left-3 top-3 px-2 py-0.5 text-[10px]"
            }`}
          >
            <StarIcon className={isCarousel ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-3 w-3"} />
            Guest
          </span>
        ) : null}
      </div>

      <div className={`shrink-0 border-t border-slate-100 ${contentClassName}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className={nameClassName}>
              <Link
                href={getDoctorProfilePath(doctor.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-teal-700"
              >
                {doctor.name}
              </Link>
            </h3>
            <p className={specialtyClassName}>{doctor.specialty}</p>
          </div>
          <DoctorShareButton
            doctorName={doctor.name}
            profilePath={getDoctorProfilePath(doctor.slug)}
          />
        </div>

        <p className={qualificationsClassName}>
          {doctor.qualifications}
        </p>
      </div>

      {layout === "grid" ? (
        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
          <Link
            href={getDoctorProfilePath(doctor.slug)}
            className="doctor-learn-more-pulse flex w-full items-center justify-center gap-2 rounded-xl border-2 border-teal-700 bg-white py-3.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
          >
            Learn More
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <Link
          href={getDoctorAppointmentPath(doctor.slug)}
          className={actionClassName}
        >
          Book Appointment
          <ArrowUpRightIcon className={isCarousel ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-4 w-4"} />
        </Link>
      )}
    </article>
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

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M7 17 17 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
