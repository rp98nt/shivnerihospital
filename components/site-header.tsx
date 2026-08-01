import { SiteHeaderTopBar } from "@/components/site-header-top-bar";
import Link from "next/link";
import {
  isNavGroup,
  LOWER_NAV_ITEMS,
  NAV_MENUS,
  type NavEntry,
  type NavLink,
  type NavGroup,
} from "@/lib/nav-menus";

export function SiteHeader() {
  return (
    <header id="site-header" className="sticky top-0 z-50 overflow-visible shadow-sm">
      <div className="border-b border-slate-200 bg-white">
        <SiteHeaderTopBar />
      </div>

      <div className="hidden overflow-visible border-b border-slate-200 bg-white px-4 lg:block lg:px-6">
        <nav className="mx-auto flex max-w-6xl overflow-visible" aria-label="Main">
          {LOWER_NAV_ITEMS.map((label) => (
            <NavDropdown key={label} label={label} items={NAV_MENUS[label]} />
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavDropdown({ label, items }: { label: string; items: NavEntry[] }) {
  return (
    <div className="group relative min-w-0 flex-1">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-teal-800"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
        <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="pointer-events-none absolute left-0 top-full z-50 w-full overflow-visible rounded-b-lg border border-slate-200 bg-white py-1 text-slate-700 opacity-0 shadow-lg transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              {isNavGroup(item) ? (
                <NavSubmenu item={item} />
              ) : (
                <NavMenuLink item={item} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function NavMenuLink({ item }: { item: NavLink }) {
  return (
    <Link
      href={item.href ?? "#"}
      className="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-teal-800"
    >
      {item.label}
    </Link>
  );
}

function NavSubmenu({ item }: { item: NavGroup }) {
  return (
    <div className="group/sub relative mt-1 border-t border-slate-100">
      <div className="flex items-stretch">
        <span className="flex min-w-0 flex-1 items-center px-4 py-2.5 text-sm font-medium text-slate-700">
          {item.label}
        </span>

        <div className="relative flex shrink-0 items-center border-l border-slate-100 bg-slate-50/80 px-3 transition-colors group-hover/sub:bg-teal-50">
          <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-hover/sub:rotate-90 group-hover/sub:text-teal-700" />

          <div className="pointer-events-none absolute left-full top-0 z-[60] pl-2 opacity-0 transition-opacity duration-200 group-hover/sub:pointer-events-auto group-hover/sub:opacity-100">
            <div className="min-w-[19rem] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
              <p className="border-b border-slate-100 bg-teal-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal-900">
                {item.label}
              </p>
              <ul className="py-1">
                {item.items.map((child) => (
                  <li key={child.label}>
                    <NavMenuLink item={child} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

