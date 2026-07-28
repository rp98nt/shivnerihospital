"use client";

import { PersonnelNavIconGlyph } from "@/components/personnel/personnel-nav-icons";
import type { PersonnelRole } from "@/lib/personnel-access";
import {
  getPersonnelHomePath,
  PERSONNEL_SUPERADMIN_PATH,
  roleHasPermission,
} from "@/lib/personnel-access";
import { PERSONNEL_NAV_ITEMS } from "@/lib/personnel-nav";
import Image from "next/image";
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
    <aside className="flex h-full w-64 shrink-0 flex-col bg-linear-to-b from-teal-800 via-teal-900 to-slate-900 px-4 py-6 text-white shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)]">
      <Link
        href={homePath}
        className="flex min-w-0 items-center gap-2.5 rounded-xl px-2 py-2 transition hover:bg-white/10"
      >
        <Image
          src="/shivneri-logo.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 object-contain brightness-0 invert"
          priority
        />
        <span className="truncate text-[15px] font-bold leading-tight tracking-tight text-white">
          Shivneri Hospital
        </span>
      </Link>

      <nav className="mt-6 flex-1 space-y-1" aria-label="Personnel navigation">
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
                  ? "bg-white/15 text-white shadow-sm ring-1 ring-white/20"
                  : "text-teal-50/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <PersonnelNavIconGlyph icon={item.icon} />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-300 px-1.5 text-[10px] font-bold text-teal-950">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-sm font-semibold leading-snug text-white">
          Streamline hospital operations from one dashboard
        </p>
        <p className="mt-2 text-xs text-teal-100/90">
          Appointments, doctors, and analytics in one place.
        </p>
      </div>
    </aside>
  );
}
