import { PersonnelDoctorsGrid } from "@/components/personnel/personnel-doctors-grid";
import { PersonnelShell } from "@/components/personnel/personnel-shell";
import { getPersonnelAccountsByRole } from "@/lib/personnel-accounts";

export default async function PersonnelDoctorsPage() {
  const doctors = await getPersonnelAccountsByRole("doctor");

  return (
    <PersonnelShell title="Doctors">
      <PersonnelDoctorsGrid doctors={doctors} />
    </PersonnelShell>
  );
}
