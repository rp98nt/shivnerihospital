"use client";

const TREND_PERIOD_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "this-quarter", label: "This quarter" },
  { value: "this-year", label: "This year" },
  { value: "last-year", label: "Last Year" },
] as const;

export function DashboardPeriodSelect() {
  return (
    <label className="inline-flex items-center">
      <span className="sr-only">Trend period</span>
      <select
        defaultValue="this-week"
        className="rounded-lg border-0 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 outline-none ring-0 focus:ring-2 focus:ring-blue-100"
      >
        {TREND_PERIOD_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
