import {
  APPOINTMENT_PHONE,
  APPOINTMENT_PHONE_TEL,
  EMERGENCY_MOBILE,
  EMERGENCY_MOBILE_TEL,
} from "@/lib/hospital-contact";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
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
    <header className="sticky top-0 z-50 overflow-visible shadow-sm">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 lg:flex lg:items-center lg:justify-between lg:px-6 lg:py-2.5">
          <div className="flex items-center justify-between gap-3 lg:flex-initial lg:justify-start">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3 text-teal-900 transition-opacity hover:opacity-90"
            >
              <Image
                src="/shivneri-logo.png"
                alt=""
                width={44}
                height={44}
                className="h-10 w-auto shrink-0 object-contain lg:h-11"
                priority
              />
              <span
                className="h-8 w-px shrink-0 bg-slate-300 lg:h-9"
                aria-hidden
              />
              <span className="truncate text-base font-bold tracking-tight sm:text-lg">
                Shivneri Hospital
              </span>
            </Link>

            <MobileNav />
          </div>

          <div className="mt-3 flex justify-end lg:mt-0 lg:shrink-0">
            <TopBarContactGroup />
          </div>
        </div>
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

function TopBarContactGroup() {
  return (
    <div className="inline-flex max-w-full items-center gap-4 overflow-x-auto lg:gap-6 lg:overflow-visible">
      <TopBarPhoneContact
        icon={<EmergencyIcon className="h-4 w-4 text-red-600" />}
        title="For Emergency"
        phone={EMERGENCY_MOBILE}
        phoneTel={EMERGENCY_MOBILE_TEL}
        phoneClassName="hover:text-red-600"
      />

      <TopBarPhoneContact
        icon={<AppointmentIcon className="h-4 w-4 text-teal-700" />}
        title="For Appointment"
        phone={APPOINTMENT_PHONE}
        phoneTel={APPOINTMENT_PHONE_TEL}
        phoneClassName="hover:text-teal-800"
      />
    </div>
  );
}

function TopBarPhoneContact({
  icon,
  title,
  phone,
  phoneTel,
  phoneClassName,
}: {
  icon: React.ReactNode;
  title: string;
  phone: string;
  phoneTel: string;
  phoneClassName: string;
}) {
  return (
    <a
      href={`tel:${phoneTel}`}
      className="flex shrink-0 items-center gap-2 rounded-xl px-1 py-1 transition-opacity hover:opacity-80"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        {icon}
      </span>
      <span className="whitespace-nowrap text-[11px] font-medium leading-none text-slate-700 sm:text-sm">
        {title}{" "}
        <span className={`text-slate-600 transition-colors ${phoneClassName}`}>
          {phone}
        </span>
      </span>
    </a>
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

function EmergencyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

function AppointmentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  );
}
