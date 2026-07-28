"use client";

import type { PersonnelRole } from "@/lib/personnel-access";
import { PERSONNEL_ROLE_LABELS } from "@/lib/personnel-access";
import { signOut } from "next-auth/react";

type PersonnelHeaderProps = {
  title: string;
  displayName: string;
  username: string;
  role: PersonnelRole;
};

export function PersonnelHeader({
  title,
  displayName,
  username,
  role,
}: PersonnelHeaderProps) {
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
            placeholder="Search here..."
            className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 lg:w-72"
          />
        </label>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{displayName}</p>
            <p className="text-xs text-slate-500">
              {PERSONNEL_ROLE_LABELS[role]} · @{username}
            </p>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/personnel/login" })}
            className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
