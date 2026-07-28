import {
  DashboardCard,
  DashboardEmptyState,
} from "@/components/personnel/dashboard/dashboard-card";
import type { DashboardBedOccupancy } from "@/lib/personnel-dashboard-data";

type DashboardBedOccupancyProps = {
  occupancy: DashboardBedOccupancy;
};

export function DashboardBedOccupancy({ occupancy }: DashboardBedOccupancyProps) {
  const { totalBeds, occupied, available, cleaning } = occupancy;
  const hasBeds = totalBeds > 0;

  const segments = hasBeds
    ? [
        { label: "Occupied", value: occupied, color: "#10b981" },
        { label: "Available", value: available, color: "#3b82f6" },
        { label: "Cleaning", value: cleaning, color: "#f97316" },
      ]
    : [];

  return (
    <DashboardCard title="Bed Occupancy">
      {hasBeds ? (
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <BedDonutChart total={totalBeds} segments={segments} />
          <ul className="w-full space-y-2.5 sm:flex-1">
            {segments.map((segment) => (
              <li
                key={segment.label}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="flex items-center gap-2 text-slate-600">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  {segment.label}
                </span>
                <span className="font-semibold text-slate-900">
                  {segment.value}{" "}
                  <span className="font-normal text-slate-400">
                    ({((segment.value / totalBeds) * 100).toFixed(1)}%)
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <DashboardEmptyState message="Bed inventory has not been configured yet." />
      )}
    </DashboardCard>
  );
}

function BedDonutChart({
  total,
  segments,
}: {
  total: number;
  segments: Array<{ label: string; value: number; color: string }>;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="14"
        />
        {segments.map((segment) => {
          const length = (segment.value / total) * circumference;
          const dashArray = `${length} ${circumference - length}`;
          const circle = (
            <circle
              key={segment.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="14"
              strokeDasharray={dashArray}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += length;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Total Beds
        </p>
        <p className="text-2xl font-bold text-slate-900">{total}</p>
      </div>
    </div>
  );
}
