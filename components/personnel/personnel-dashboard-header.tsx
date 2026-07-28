"use client";

import { PersonnelUserMenu } from "@/components/personnel/personnel-user-menu";
import Link from "next/link";

type PersonnelDashboardHeaderProps = {
  displayName: string;
  accountRole: string;
  photoUrl?: string | null;
};

export function PersonnelDashboardHeader({
  displayName,
  accountRole,
  photoUrl,
}: PersonnelDashboardHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-0 flex-1">
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
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-16 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:inline">
            Ctrl + K
          </span>
        </label>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <HeaderIconButton href="/personnel/appointments" label="Calendar">
            <CalendarIcon />
          </HeaderIconButton>
          <HeaderIconButton href="/personnel/messages" label="Messages">
            <MessageIcon />
          </HeaderIconButton>
          <HeaderIconButton href="/personnel/messages" label="Notifications">
            <BellIcon />
          </HeaderIconButton>

          <PersonnelUserMenu
            displayName={displayName}
            accountRole={accountRole}
            photoUrl={photoUrl}
          />
        </div>
      </div>
    </header>
  );
}

function HeaderIconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
    >
      {children ?? <MessageIcon />}
    </Link>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M18 16H6l1.2-1.6A2 2 0 0 0 8 12.3V9a4 4 0 1 1 8 0v3.3c0 .5.2 1 .5 1.4L18 16z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8z" />
    </svg>
  );
}
