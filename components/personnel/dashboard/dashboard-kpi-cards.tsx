import type { DashboardStats } from "@/lib/personnel-dashboard-data";

const KPI_ITEMS = [
  {
    key: "todayAppointments" as const,
    label: "Today's Appointments",
    icon: CalendarIcon,
    iconClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "opdPatients" as const,
    label: "OPD Patients",
    icon: UserIcon,
    iconClassName: "bg-blue-50 text-blue-600",
  },
  {
    key: "ipdPatients" as const,
    label: "IPD Patients",
    icon: BedIcon,
    iconClassName: "bg-violet-50 text-violet-600",
  },
  {
    key: "emergencyCases" as const,
    label: "Emergency Cases",
    icon: AlertIcon,
    iconClassName: "bg-orange-50 text-orange-600",
  },
  {
    key: "todayRevenue" as const,
    label: "Today's Revenue",
    icon: RevenueIcon,
    iconClassName: "bg-teal-50 text-teal-600",
    format: (value: number) =>
      value > 0
        ? `₹ ${value.toLocaleString("en-IN")}`
        : "₹ 0",
  },
] as const;

type DashboardKpiCardsProps = {
  stats: DashboardStats;
};

export function DashboardKpiCards({ stats }: DashboardKpiCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {KPI_ITEMS.map((item) => {
        const { key, label, icon: Icon, iconClassName } = item;
        const value = stats[key];
        const displayValue =
          "format" in item && item.format
            ? item.format(value)
            : String(value);

        return (
          <article
            key={key}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {displayValue}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </svg>
  );
}

function BedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 12V8a2 2 0 0 1 2-2h8v12H5a2 2 0 0 1-2-2v-2z" />
      <path d="M13 6h6a2 2 0 0 1 2 2v8h-8V6z" />
      <path d="M3 18v2M21 18v2" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 2 20h20L12 3z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

function RevenueIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7 6V4M17 6V4" />
    </svg>
  );
}
