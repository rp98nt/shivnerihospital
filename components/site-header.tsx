import Image from "next/image";
import Link from "next/link";

const EMERGENCY_PHONE = "+91XXXXXXXXXX";
const APPOINTMENT_PHONE = "+91XXXXXXXXXX";

const LOWER_NAV_ITEMS = [
  "About us",
  "Diagnostics",
  "Specialities",
  "Super Specialities",
  "Services",
  "Patient Guide",
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 text-teal-900 transition-opacity hover:opacity-90"
          >
            <Image
              src="/shivneri-logo.png"
              alt=""
              width={44}
              height={44}
              className="h-10 w-auto object-contain sm:h-11"
              priority
            />
            <span
              className="h-8 w-px shrink-0 bg-slate-300 sm:h-9"
              aria-hidden
            />
            <span className="text-lg font-bold tracking-tight">
              Shivneri Hospital
            </span>
          </Link>

          <div className="flex flex-col gap-2 sm:items-end lg:flex-row lg:items-center lg:gap-6">
            <TopBarContact
              icon={<BloodBankIcon className="h-4 w-4 text-red-600" />}
              label="24 Hour Blood Bank Service"
            />
            <TopBarContact
              icon={<EmergencyIcon className="h-4 w-4 text-red-600" />}
              label={`For Emergency ${EMERGENCY_PHONE}`}
              href={`tel:${EMERGENCY_PHONE.replace(/\s/g, "")}`}
            />
            <TopBarContact
              icon={<AppointmentIcon className="h-4 w-4 text-teal-700" />}
              label={`For Appointment ${APPOINTMENT_PHONE}`}
              href={`tel:${APPOINTMENT_PHONE.replace(/\s/g, "")}`}
            />
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-4 sm:px-6">
        <nav
          className="mx-auto flex max-w-6xl divide-x divide-slate-200"
          aria-label="Main"
        >
          {LOWER_NAV_ITEMS.map((label) => (
            <NavDropdown key={label} label={label} />
          ))}
        </nav>
      </div>
    </header>
  );
}

function TopBarContact({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
        {icon}
      </span>
      <span className="font-medium text-slate-700">{label}</span>
    </>
  );

  const className =
    "flex items-center gap-2 text-xs sm:text-sm transition-opacity hover:opacity-80";

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

function NavDropdown({ label }: { label: string }) {
  return (
    <div className="group relative min-w-0 flex-1">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-1 px-2 py-3 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-teal-800 sm:gap-1.5 sm:px-3 sm:text-sm"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
        <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="pointer-events-none absolute left-1/2 top-full z-50 min-w-[220px] -translate-x-1/2 rounded-b-lg border border-slate-200 bg-white py-2 text-slate-700 opacity-0 shadow-lg transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <p className="px-4 py-2 text-sm text-slate-500">
          Menu items for {label} coming soon.
        </p>
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

function BloodBankIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2c-1.5 3.5-4 6.2-4 9.8a4 4 0 0 0 8 0C16 8.2 13.5 5.5 12 2Z" />
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
