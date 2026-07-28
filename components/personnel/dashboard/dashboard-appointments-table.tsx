import {
  DashboardCard,
  DashboardEmptyState,
} from "@/components/personnel/dashboard/dashboard-card";

export function DashboardAppointmentsTable() {
  return (
    <DashboardCard title="Today's Appointments" actionHref="/personnel/appointments">
      <DashboardEmptyState message="No appointments scheduled for today." />
    </DashboardCard>
  );
}
