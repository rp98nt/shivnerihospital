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
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {doctors.map((doctor) => {
        const slug = getPersonnelAccountSlug(doctor);
        const profile = getDoctorBySlug(slug);

        return (
          <article
            key={doctor.id}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:border-slate-300 hover:shadow"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-linear-to-b from-teal-50 to-slate-100">
              <PersonnelDoctorPhotoPlaceholder />
              {profile?.isGuest ? (
                <span className="absolute bottom-0 left-0 right-0 bg-amber-400 py-px text-center text-[7px] font-bold uppercase tracking-wide text-amber-950">
                  Guest
                </span>
              ) : null}
            </div>

            <div className="min-w-0 flex-1 py-0.5">
              <h2 className="truncate text-sm font-semibold leading-tight text-slate-900">
                {doctor.name}
              </h2>
              <p className="mt-0.5 truncate text-xs text-slate-500">
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
    <div className="flex h-full w-full items-center justify-center text-teal-700/60">
      <svg className="h-7 w-7" viewBox="0 0 64 64" fill="none" aria-hidden>
        <circle cx="32" cy="22" r="10" fill="currentColor" opacity="0.25" />
        <path
          d="M14 54c2.5-10 8.5-14 18-14s15.5 4 18 14"
          fill="currentColor"
          opacity="0.2"
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
    </div>
  );
}
