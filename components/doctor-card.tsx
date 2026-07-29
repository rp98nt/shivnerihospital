import { DoctorAvatar } from "@/components/doctor-avatar";
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
  const widthClassName =
    layout === "carousel"
      ? "w-[19.5rem] shrink-0 sm:w-[21rem]"
      : "w-full";

  return (
    <article
      className={`flex min-h-[35.625rem] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${widthClassName}`}
    >
      <div className="relative min-h-0 flex-[7] bg-linear-to-b from-teal-50 to-slate-100">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={doctor.name}
            fill
            className="object-cover object-[center_22%]"
            sizes={
              layout === "carousel"
                ? "(max-width: 640px) 80vw, 21rem"
                : "(max-width: 640px) 100vw, 33vw"
            }
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <DoctorAvatar
              name={doctor.name}
              photoUrl={null}
              size="lg"
              tone="teal"
            />
          </div>
        )}
        {doctor.isGuest ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950 shadow-sm">
            <StarIcon className="h-3 w-3" />
            Guest
          </span>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-[3] flex-col border-t border-slate-100 px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-2.5">
            <DoctorAvatar
              name={doctor.name}
              photoUrl={photoUrl}
              size="sm"
              tone="teal"
            />
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-snug text-slate-900">
                <Link
                  href={getDoctorProfilePath(doctor.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-teal-700"
                >
                  {doctor.name}
                </Link>
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">{doctor.specialty}</p>
            </div>
          </div>
          <ShareIcon className="h-4 w-4 shrink-0 text-slate-400" />
        </div>

        <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
          {doctor.qualifications}
        </p>
      </div>

      <Link
        href={getDoctorAppointmentPath(doctor.slug)}
        className="flex w-full items-center justify-center gap-2 bg-amber-400 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
      >
        Book Appointment
        <ArrowUpRightIcon className="h-4 w-4" />
      </Link>
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

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}
