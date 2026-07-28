import { SORTED_DOCTORS } from "@/lib/doctors";

const KPI_STATS = [
  { label: "Patients", value: "600", tone: "bg-blue-50 text-blue-600" },
  { label: "Staff Members", value: "150", tone: "bg-violet-50 text-violet-600" },
  { label: "Vehicles", value: "35", tone: "bg-orange-50 text-orange-600" },
  { label: "Appointment", value: "120", tone: "bg-emerald-50 text-emerald-600" },
  { label: "Operations", value: "20", tone: "bg-rose-50 text-rose-600" },
] as const;

const TREND_DATA = [
  { label: "Apr 13", male: 42, female: 38, children: 18 },
  { label: "Apr 14", male: 48, female: 35, children: 22 },
  { label: "Apr 15", male: 40, female: 42, children: 20 },
  { label: "Apr 16", male: 52, female: 36, children: 24 },
  { label: "Apr 17", male: 45, female: 40, children: 19 },
  { label: "Apr 18", male: 50, female: 38, children: 21 },
  { label: "Apr 19", male: 47, female: 41, children: 23 },
] as const;

const DEPARTMENT_STATS = [
  { label: "General Medicine", value: 32, color: "#3b82f6" },
  { label: "Orthopedics", value: 24, color: "#22c55e" },
  { label: "Cardiology", value: 18, color: "#f97316" },
  { label: "Gynecology", value: 26, color: "#ec4899" },
] as const;

const REPORT_ITEMS = [
  {
    title: "Oxygen Cylinder Refill Needed",
    time: "10 mins ago",
    tone: "bg-rose-100 text-rose-600",
  },
  {
    title: "Ambulance Dispatched",
    time: "30 mins ago",
    tone: "bg-blue-100 text-blue-600",
  },
  {
    title: "Room Cleaning Needed",
    time: "1 hour ago",
    tone: "bg-amber-100 text-amber-600",
  },
  {
    title: "Patient Transport Required",
    time: "Yesterday",
    tone: "bg-violet-100 text-violet-600",
  },
] as const;

const TIMELINE_ITEMS = [
  {
    time: "08:00 AM",
    title: "Morning Staff Meeting",
    subtitle: "Conference Room",
    tone: "border-blue-200 bg-blue-50",
  },
  {
    time: "10:00 AM - 12:00 PM",
    title: "Surgery - Orthopedics",
    subtitle: "Dr. Ninad Suryatale",
    tone: "border-emerald-200 bg-emerald-50",
  },
  {
    time: "01:00 PM",
    title: "Training Session",
    subtitle: "Dr. Sanjay Khillare",
    tone: "border-violet-200 bg-violet-50",
  },
] as const;

const SCHEDULE_DOCTORS = SORTED_DOCTORS.slice(0, 4).map((doctor, index) => ({
  ...doctor,
  available: index !== 2,
  slot: index % 2 === 0 ? "09:00 AM - 12:00 PM" : "02:00 PM - 05:00 PM",
}));

export function PersonnelDashboard() {
  const today = new Date();
  const calendar = buildCalendarGrid(today);
  const trendMax = Math.max(
    ...TREND_DATA.flatMap((entry) => [entry.male, entry.female, entry.children]),
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {KPI_STATS.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.tone}`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Total Trends" action="Last week">
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            <LegendDot color="#3b82f6" label="Male" />
            <LegendDot color="#22c55e" label="Female" />
            <LegendDot color="#f97316" label="Children" />
          </div>
          <div className="mt-6 flex h-56 items-end justify-between gap-2">
            {TREND_DATA.map((entry) => (
              <div key={entry.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end justify-center gap-1">
                  <Bar height={(entry.male / trendMax) * 100} color="#3b82f6" />
                  <Bar height={(entry.female / trendMax) * 100} color="#22c55e" />
                  <Bar height={(entry.children / trendMax) * 100} color="#f97316" />
                </div>
                <span className="text-[10px] text-slate-400">{entry.label}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Patients by Department" action="Today">
          <div className="mt-4 flex items-center gap-6">
            <DonutChart segments={DEPARTMENT_STATS} total="320" />
            <ul className="space-y-2 text-xs text-slate-600">
              {DEPARTMENT_STATS.map((segment) => (
                <li key={segment.label} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  {segment.label}
                </li>
              ))}
            </ul>
          </div>
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

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr_0.8fr]">
        <DashboardCard title="Doctor's Schedule">
          <ul className="mt-4 space-y-3">
            {SCHEDULE_DOCTORS.map((doctor) => (
              <li
                key={doctor.slug}
                className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {doctor.name.replace(/^Dr\.?\s+/i, "").charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {doctor.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">{doctor.specialty}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      doctor.available
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                  <p className="mt-1 text-[10px] text-slate-400">{doctor.slot}</p>
                </div>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard title="Report">
          <ul className="mt-4 space-y-3">
            {REPORT_ITEMS.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.tone}`}
                >
                  !
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard
          title="Daily Timeline"
          action={today.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        >
          <ul className="mt-4 space-y-3">
            {TIMELINE_ITEMS.map((item) => (
              <li
                key={item.title}
                className={`rounded-xl border px-3 py-3 ${item.tone}`}
              >
                <p className="text-[11px] font-semibold text-slate-500">{item.time}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">{item.subtitle}</p>
              </li>
            ))}
          </ul>
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
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {action ? (
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {action}
          </span>
        ) : null}
      </div>
      {children}
    </article>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function Bar({
  height,
  color,
}: {
  height: number;
  color: string;
}) {
  return (
    <span
      className="w-2 rounded-t-md sm:w-2.5"
      style={{
        height: `${Math.max(height, 8)}%`,
        backgroundColor: color,
      }}
    />
  );
}

function DonutChart({
  segments,
  total,
}: {
  segments: readonly { label: string; value: number; color: string }[];
  total: string;
}) {
  const sum = segments.reduce((acc, segment) => acc + segment.value, 0);
  let cursor = 0;
  const gradient = segments
    .map((segment) => {
      const start = (cursor / sum) * 100;
      cursor += segment.value;
      const end = (cursor / sum) * 100;
      return `${segment.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className="relative h-32 w-32 shrink-0">
      <div
        className="h-full w-full rounded-full"
        style={{ background: `conic-gradient(${gradient})` }}
      />
      <div className="absolute inset-4 flex items-center justify-center rounded-full bg-white text-center">
        <div>
          <p className="text-lg font-bold text-slate-900">{total}</p>
          <p className="text-[10px] text-slate-400">Total</p>
        </div>
      </div>
    </div>
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
