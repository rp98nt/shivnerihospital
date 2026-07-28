import { getDoctorBySlug } from "@/lib/doctors";
import type { PersonnelAccount } from "@/lib/db/schema";
import { getPersonnelAccountSlug } from "@/lib/personnel-accounts";

type PersonnelDoctorsGridProps = {
  doctors: PersonnelAccount[];
};

export function PersonnelDoctorsGrid({ doctors }: PersonnelDoctorsGridProps) {
  if (doctors.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-900">No doctors found</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Doctor accounts will appear here once they are added to the personnel database.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {doctors.map((doctor) => {
        const slug = getPersonnelAccountSlug(doctor);
        const profile = getDoctorBySlug(slug);

        return (
          <article
            key={doctor.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] bg-linear-to-b from-teal-50 to-slate-100">
              <PersonnelDoctorPhotoPlaceholder />
              {profile?.isGuest ? (
                <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950">
                  Guest
                </span>
              ) : null}
            </div>

            <div className="border-t border-slate-100 px-4 py-4">
              <h2 className="text-base font-semibold text-slate-900">{doctor.name}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {doctor.specialty ?? "Specialty not set"}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function PersonnelDoctorPhotoPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-teal-700/70">
      <svg
        className="h-20 w-20"
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
