import { DoctorCard } from "@/components/doctor-card";
import { SORTED_DOCTORS } from "@/lib/doctors";

type TeamOfDoctorsGridProps = {
  photoUrls?: Record<string, string>;
};

export function TeamOfDoctorsGrid({ photoUrls = {} }: TeamOfDoctorsGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {SORTED_DOCTORS.map((doctor) => (
        <DoctorCard
          key={doctor.slug}
          doctor={doctor}
          photoUrl={photoUrls[doctor.slug]}
          layout="grid"
        />
      ))}
    </div>
  );
}
