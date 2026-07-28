import { PersonnelDashboard } from "@/components/personnel/personnel-dashboard";
import { PersonnelShell } from "@/components/personnel/personnel-shell";

export default function PersonnelSuperAdminPage() {
  return (
    <PersonnelShell title="Dashboard">
      <PersonnelDashboard />
    </PersonnelShell>
  );
}
