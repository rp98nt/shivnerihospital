"use client";

import { PersonnelUserMenu } from "@/components/personnel/personnel-user-menu";

type PersonnelHeaderProps = {
  title: string;
  displayName: string;
  accountRole: string;
  photoUrl?: string | null;
};

export function PersonnelHeader({
  title,
  displayName,
  accountRole,
  photoUrl,
}: PersonnelHeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>

      <div className="ml-auto flex flex-wrap items-center gap-3">
        <label className="relative hidden sm:block">
          <span className="sr-only">Search</span>
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search patients, appointments, invoices..."
            className="w-full max-w-xs rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:max-w-sm lg:max-w-md"
          />
        </label>

        <PersonnelUserMenu
          displayName={displayName}
          accountRole={accountRole}
          photoUrl={photoUrl}
        />
      </div>
    </header>
  );
}
