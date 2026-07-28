import { DoctorAvatar } from "@/components/doctor-avatar";
import {
  DashboardCard,
  DashboardEmptyState,
} from "@/components/personnel/dashboard/dashboard-card";
import type { PersonnelAccount } from "@/lib/db/schema";

type DashboardDoctorAvailabilityProps = {
  doctors: PersonnelAccount[];
};

export function DashboardDoctorAvailability({
  doctors,
}: DashboardDoctorAvailabilityProps) {
  return (
    <DashboardCard title="Doctor Availability" actionHref="/personnel/doctors">
      {doctors.length === 0 ? (
        <DashboardEmptyState message="Doctor accounts will appear here once they are added." />
      ) : (
        <ul className="divide-y divide-slate-100">
          {doctors.map((doctor) => (
            <li
              key={doctor.id}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <DoctorAvatar
                name={doctor.name}
                photoUrl={doctor.photoUrl}
                size="sm"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {doctor.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {doctor.specialty ?? "Specialty not set"}
                </p>
              </div>
              <AvailabilityBadge available={false} />
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}

function AvailabilityBadge({ available }: { available: boolean }) {
  if (available) {
    return (
      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
        Available
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700">
      Unavailable
    </span>
  );
}
