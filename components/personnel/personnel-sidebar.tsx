"use client";

import { PersonnelNavIconGlyph } from "@/components/personnel/personnel-nav-icons";
import type { PersonnelRole } from "@/lib/personnel-access";
import {
  getPersonnelHomePath,
  PERSONNEL_SUPERADMIN_PATH,
  roleHasPermission,
} from "@/lib/personnel-access";
import { PERSONNEL_NAV_ITEMS } from "@/lib/personnel-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PersonnelSidebarProps = {
  role: PersonnelRole;
};

export function PersonnelSidebar({ role }: PersonnelSidebarProps) {
  const pathname = usePathname();
  const homePath = getPersonnelHomePath(role);
  const navItems = PERSONNEL_NAV_ITEMS.filter((item) => {
    if (item.href === PERSONNEL_SUPERADMIN_PATH && role !== "super_admin") {
      return false;
    }

    return roleHasPermission(role, item.permission);
  });

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6">
      <Link href={homePath} className="flex items-center gap-2 px-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 6v12M6 12h12" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </span>
        <span className="text-lg font-bold text-slate-900">Shivneri Personnel</span>
      </Link>

      <nav className="mt-8 flex-1 space-y-1" aria-label="Personnel navigation">
        {navItems.map((item) => {
          const isActive =
            item.href === PERSONNEL_SUPERADMIN_PATH
              ? pathname === PERSONNEL_SUPERADMIN_PATH
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <PersonnelNavIconGlyph icon={item.icon} />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 p-4 text-white shadow-lg">
        <p className="text-sm font-semibold leading-snug">
          Streamline hospital operations from one dashboard
        </p>
        <p className="mt-2 text-xs text-blue-100">
          Appointments, doctors, and analytics in one place.
        </p>
      </div>
    </aside>
  );
}
