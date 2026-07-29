import {
  getDoctorAppointmentPath,
  type Doctor,
} from "@/lib/doctors";
import {
  getDoctorServices,
  getDoctorServicesSubtitle,
  type DoctorServiceIcon,
} from "@/lib/doctor-services";
import Link from "next/link";

type DoctorProfileServicesProps = {
  doctor: Doctor;
};

export function DoctorProfileServices({ doctor }: DoctorProfileServicesProps) {
  const services = getDoctorServices(doctor);
  const appointmentPath = getDoctorAppointmentPath(doctor.slug);

  return (
    <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            What I Offer
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
            Medical{" "}
            <em className="not-italic text-teal-700">Services</em>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {getDoctorServicesSubtitle(doctor)}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md sm:p-7"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <ServiceIcon icon={service.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                {service.description}
              </p>

              <Link
                href={appointmentPath}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-700 transition hover:text-teal-800"
              >
                Schedule Now
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({
  icon,
  className,
}: {
  icon: DoctorServiceIcon;
  className?: string;
}) {
  switch (icon) {
    case "heart-pulse":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
          <path d="M8 11h2l1.5 2.5L13 9l1 2h2" />
        </svg>
      );
    case "activity":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M3 12h4l2-7 4 14 2-7h6" />
        </svg>
      );
    case "shield-heart":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 11v4M10 13h4" />
        </svg>
      );
    case "bone":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M8 8a3 3 0 1 0-4 4 3 3 0 0 0 4-4zM16 16a3 3 0 1 0 4-4 3 3 0 0 0-4 4z" />
          <path d="M8 11l8 2M11 8l2 8" />
        </svg>
      );
    case "stethoscope":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M6 4v8a4 4 0 0 0 8 0V4" />
          <path d="M10 4h4M8 12v2a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4v-1" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      );
    case "brain":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M9 5a3 3 0 0 0-3 3v1a2 2 0 0 0-2 2 2 2 0 0 0 0 4 2 2 0 0 0 2 2h1" />
          <path d="M15 5a3 3 0 0 1 3 3v1a2 2 0 0 1 2 2 2 2 0 0 1 0 4 2 2 0 0 1-2 2h-1" />
          <path d="M12 5v14" />
        </svg>
      );
    case "kidney":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M12 4c-4 0-7 3-7 7 0 3 2 5 4 6 1 .5 2 .5 3 0 2-1 4-3 4-6 0-4-3-7-7-7z" />
          <path d="M12 10v4" />
        </svg>
      );
    case "lungs":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M12 4v16" />
          <path d="M12 8C8 8 5 11 5 15s3 5 7 5M12 8c4 0 7 3 7 7s-3 5-7 5" />
        </svg>
      );
  }
}
