"use client";

const APPOINTMENT_PHONE = "+91XXXXXXXXXX";

type Doctor = {
  name: string;
  specialty: string;
  qualifications: string;
  isGuest?: boolean;
};

const DOCTORS: Doctor[] = [
  {
    name: "Dr. Sanjay Khillare",
    specialty: "Medicine",
    qualifications: "MBBS, FCPS (Medicine)",
  },
  {
    name: "Dr. Govind Pawade Patil",
    specialty: "Medicine",
    qualifications: "MBBS, MD (Medicine)",
  },
  {
    name: "Dr. Sanjyot Gajendra Giri",
    specialty: "Chest Medicine",
    qualifications: "MBBS, MD (Chest Medicine), MICS, MERS, CCCDM",
  },
  {
    name: "Dr. Rahul Tengase Patil",
    specialty: "Nephrology",
    qualifications: "MBBS, MD Medicine, DM Nephrology",
  },
  {
    name: "Dr. Pooja Tengase Khupase",
    specialty: "Chest Medicine",
    qualifications: "MBBS, MD (Chest Medicine)",
  },
  {
    name: "Dr. Ninad Suryatale",
    specialty: "Orthopaedics",
    qualifications: "MBBS, D.Ortho",
  },
  {
    name: "Dr. Prakash Chavan",
    specialty: "Oncosurgery",
    qualifications: "MBBS, FCPS Surgery, FMAS (Laproscopy Oncosurgery)",
  },
  {
    name: "Dr. Kailas Giri",
    specialty: "Critical Care",
    qualifications: "MBBS, FCPS (Medicine), IDCCM",
  },
  {
    name: "Dr. Anvesh Sattepar Jain",
    specialty: "Neuro-Surgery",
    qualifications: "D.N.B. (Gen. Surgery), D.N.B. (Neuro-Surgery)",
    isGuest: true,
  },
  {
    name: "Dr. Varsha Sanjay Killare",
    specialty: "Physiotherapy",
    qualifications: "B.P.Th., M.P.Th. (Neuro)",
    isGuest: true,
  },
  {
    name: "Dr. Ashok Bun",
    specialty: "General Surgery",
    qualifications: "MBBS, MS",
    isGuest: true,
  },
];

export function OurDoctors() {
  const carouselItems = [...DOCTORS, ...DOCTORS];

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl">
          Our <span className="text-teal-700">Doctors</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
          Meet our experienced consultants and visiting guest faculty.
        </p>

        <div className="doctors-carousel-mask relative mt-8 sm:mt-10">
          <div className="doctors-carousel-track flex w-max gap-4 sm:gap-5">
            {carouselItems.map((doctor, index) => (
              <DoctorCard key={`${doctor.name}-${index}`} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const phoneHref = `tel:${APPOINTMENT_PHONE.replace(/\s/g, "")}`;

  return (
    <article
      className={`flex w-[19.5rem] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[21rem] ${
        doctor.isGuest
          ? "ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-50"
          : "border border-slate-100"
      }`}
    >
      <div className="flex min-h-[9.5rem]">
        <div className="relative w-[7.5rem] shrink-0 bg-linear-to-b from-teal-50 to-slate-100 sm:w-[8rem]">
          <DoctorPhotoPlaceholder />
          {doctor.isGuest ? (
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950 shadow-sm">
              <StarIcon className="h-3 w-3" />
              Guest
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-3 py-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="flex items-start gap-1 text-sm font-bold leading-snug text-slate-900 sm:text-[15px]">
                {doctor.isGuest ? (
                  <StarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                ) : null}
                <span>{doctor.name}</span>
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">{doctor.specialty}</p>
            </div>
            <ShareIcon className="h-4 w-4 shrink-0 text-slate-400" />
          </div>

          <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
            {doctor.qualifications}
          </p>

          <div className="mt-auto pt-3">
            <div className="h-px w-full bg-slate-200">
              <div className="h-px w-1/4 bg-teal-600" />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 sm:text-xs">
              <LocationIcon className="h-3.5 w-3.5 shrink-0 text-teal-700" />
              Shivneri Hospital
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-slate-200">
        <a
          href="#"
          className="inline-flex items-center justify-center gap-1.5 bg-amber-400 px-3 py-3 text-xs font-semibold text-teal-900 transition hover:bg-amber-300 sm:text-sm"
        >
          Book Appointment
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>
        <a
          href={phoneHref}
          className="inline-flex items-center justify-center gap-1.5 border-l border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-teal-800 transition hover:bg-slate-50 sm:text-sm"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          Call Now
        </a>
      </div>
    </article>
  );
}

function DoctorPhotoPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-teal-700/70">
      <svg
        className="h-14 w-14 sm:h-16 sm:w-16"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
      >
        <circle cx="32" cy="22" r="10" fill="currentColor" opacity="0.25" />
        <path
          d="M14 54c2.5-10 8.5-14 18-14s15.5 4 18 14"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M20 58h24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />
        <rect
          x="18"
          y="34"
          width="28"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.35"
        />
      </svg>
      <span className="text-[10px] font-medium uppercase tracking-wide">
        Photo soon
      </span>
    </div>
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

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
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
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
