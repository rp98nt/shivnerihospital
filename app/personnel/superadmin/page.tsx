import { PersonnelDashboard } from "@/components/personnel/personnel-dashboard";
import { PersonnelShell } from "@/components/personnel/personnel-shell";
import { getPersonnelDashboardData } from "@/lib/personnel-dashboard-data";

export default async function PersonnelSuperAdminPage() {
  const data = await getPersonnelDashboardData();

  return (
    <PersonnelShell title="Dashboard" headerVariant="dashboard">
      <PersonnelDashboard data={data} />
    </PersonnelShell>
  );
}
