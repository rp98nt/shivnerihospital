import { PersonnelDoctorsGrid } from "@/components/personnel/personnel-doctors-grid";
import { PersonnelShell } from "@/components/personnel/personnel-shell";
import { auth } from "@/lib/auth";
import { getPersonnelAccountsByRole } from "@/lib/personnel-accounts";

export default async function PersonnelDoctorsPage() {
  const session = await auth();
  const doctors = await getPersonnelAccountsByRole("doctor");
  const canUploadPhotos = session?.user?.role === "super_admin";

  return (
    <PersonnelShell title="Doctors">
      <PersonnelDoctorsGrid
        doctors={doctors}
        canUploadPhotos={canUploadPhotos}
      />
    </PersonnelShell>
  );
}
