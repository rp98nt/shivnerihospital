import { DashboardPeriodSelect } from "@/components/personnel/dashboard-period-select";

const KPI_STATS = [
  { label: "Patients", value: "0" },
  { label: "Staff Members", value: "0" },
  { label: "Vehicles", value: "0" },
  { label: "Appointment", value: "0" },
  { label: "Operations", value: "0" },
] as const;

export function PersonnelDashboard() {
  const today = new Date();
  const calendar = buildCalendarGrid(today);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {KPI_STATS.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Total Trends" action={<DashboardPeriodSelect />}>
          <DashboardEmptyState message="Trend data will appear here once patient activity is recorded." />
        </DashboardCard>

        <DashboardCard title="Patients by Department" action="Today">
          <DashboardEmptyState message="Department breakdown will appear here once patient data is available." />
        </DashboardCard>

        <DashboardCard
          title={today.toLocaleString("en-US", { month: "long", year: "numeric" })}
          action={`${today.getDate()}`}
        >
          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px]">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <span key={day} className="py-1 font-medium text-slate-400">
                {day}
              </span>
            ))}
            {calendar.map((cell) => (
              <span
                key={cell.key}
                className={`flex h-8 items-center justify-center rounded-full ${
                  cell.isToday
                    ? "bg-blue-600 font-semibold text-white"
                    : cell.inMonth
                      ? "text-slate-700"
                      : "text-slate-300"
                }`}
              >
                {cell.day}
              </span>
            ))}
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Doctor's Schedule">
          <DashboardEmptyState message="Doctor schedules will appear here once rosters are configured." />
        </DashboardCard>

        <DashboardCard title="Report">
          <DashboardEmptyState message="Operational reports will appear here once activity is logged." />
        </DashboardCard>

        <DashboardCard
          title="Daily Timeline"
          action={today.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        >
          <DashboardEmptyState message="Daily timeline events will appear here once they are scheduled." />
        </DashboardCard>
      </section>
    </div>
  );
}

function DashboardCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </article>
  );
}

function DashboardEmptyState({ message }: { message: string }) {
  return (
    <p className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
      {message}
    </p>
  );
}

function buildCalendarGrid(referenceDate: Date) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{
    key: string;
    day: number;
    inMonth: boolean;
    isToday: boolean;
  }> = [];

  for (let i = 0; i < startOffset; i += 1) {
    cells.push({
      key: `prev-${i}`,
      day: new Date(year, month, -startOffset + i + 1).getDate(),
      inMonth: false,
      isToday: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      key: `day-${day}`,
      day,
      inMonth: true,
      isToday: day === referenceDate.getDate(),
    });
  }

  while (cells.length % 7 !== 0) {
    const day = cells.length - startOffset - daysInMonth + 1;
    cells.push({
      key: `next-${day}`,
      day,
      inMonth: false,
      isToday: false,
    });
  }

  return cells;
}
