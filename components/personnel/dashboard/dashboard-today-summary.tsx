import {
  DashboardCard,
  DashboardViewLink,
} from "@/components/personnel/dashboard/dashboard-card";
import type { DashboardSummary } from "@/lib/personnel-dashboard-data";

const SUMMARY_ITEMS = [
  { key: "newPatients" as const, label: "New Patients" },
  { key: "discharged" as const, label: "Discharged" },
  { key: "labTests" as const, label: "Lab Tests" },
  { key: "radiology" as const, label: "Radiology" },
  { key: "procedures" as const, label: "Procedures" },
] as const;

type DashboardTodaySummaryProps = {
  summary: DashboardSummary;
};

export function DashboardTodaySummary({ summary }: DashboardTodaySummaryProps) {
  return (
    <DashboardCard
      title="Today's Summary"
      action={<DashboardViewLink href="/personnel/reports" label="View report" />}
    >
      <ul className="divide-y divide-slate-100">
        {SUMMARY_ITEMS.map(({ key, label }) => (
          <li
            key={key}
            className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <span className="text-sm text-slate-600">{label}</span>
            <span className="text-sm font-bold text-slate-900">{summary[key]}</span>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
