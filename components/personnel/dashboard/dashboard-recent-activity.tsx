import {
  DashboardCard,
  DashboardEmptyState,
} from "@/components/personnel/dashboard/dashboard-card";

export function DashboardRecentActivity() {
  return (
    <DashboardCard title="Recent Activity">
      <DashboardEmptyState message="Recent hospital activity will appear here as events are logged." />
    </DashboardCard>
  );
}
