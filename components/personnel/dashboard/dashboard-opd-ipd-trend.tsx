import {
  DashboardCard,
  DashboardEmptyState,
} from "@/components/personnel/dashboard/dashboard-card";

export function DashboardOpdIpdTrend() {
  return (
    <DashboardCard title="OPD vs IPD Trend (This Week)">
      <div className="mb-4 flex items-center gap-4 text-xs font-medium">
        <span className="flex items-center gap-1.5 text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          OPD
        </span>
        <span className="flex items-center gap-1.5 text-slate-600">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          IPD
        </span>
      </div>
      <DashboardEmptyState message="Patient trend data will appear here once OPD and IPD activity is recorded." />
    </DashboardCard>
  );
}
