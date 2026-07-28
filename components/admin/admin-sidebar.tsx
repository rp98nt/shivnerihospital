"use client";

import { AdminNavIconGlyph } from "@/components/admin/admin-nav-icons";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6">
      <Link href="/admin" className="flex items-center gap-2 px-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 6v12M6 12h12" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </span>
        <span className="text-lg font-bold text-slate-900">Shivneri Admin</span>
      </Link>

      <nav className="mt-8 flex-1 space-y-1" aria-label="Admin navigation">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
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
              <AdminNavIconGlyph icon={item.icon} />
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
        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur transition hover:bg-white/25"
        >
          Learn more
        </button>
      </div>
    </aside>
  );
}
