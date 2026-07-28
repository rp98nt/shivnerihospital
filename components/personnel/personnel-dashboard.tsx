import { DashboardAppointmentsTable } from "@/components/personnel/dashboard/dashboard-appointments-table";
import { DashboardBedOccupancy } from "@/components/personnel/dashboard/dashboard-bed-occupancy";
import { DashboardDoctorAvailability } from "@/components/personnel/dashboard/dashboard-doctor-availability";
import { DashboardKpiCards } from "@/components/personnel/dashboard/dashboard-kpi-cards";
import { DashboardOpdIpdTrend } from "@/components/personnel/dashboard/dashboard-opd-ipd-trend";
import { DashboardRecentActivity } from "@/components/personnel/dashboard/dashboard-recent-activity";
import { DashboardTodaySummary } from "@/components/personnel/dashboard/dashboard-today-summary";
import type { PersonnelDashboardData } from "@/lib/personnel-dashboard-data";

type PersonnelDashboardProps = {
  data: PersonnelDashboardData;
};

export function PersonnelDashboard({ data }: PersonnelDashboardProps) {
  return (
    <div className="space-y-6">
      <DashboardKpiCards stats={data.stats} />

      <section className="grid gap-6 xl:grid-cols-3">
        <DashboardAppointmentsTable />
        <DashboardBedOccupancy occupancy={data.bedOccupancy} />
        <DashboardOpdIpdTrend />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <DashboardRecentActivity />
        <DashboardDoctorAvailability doctors={data.doctors} />
        <DashboardTodaySummary summary={data.summary} />
      </section>
    </div>
  );
}
