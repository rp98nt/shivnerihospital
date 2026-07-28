import type { PersonnelNavIcon } from "@/lib/personnel-nav";

export function PersonnelNavIconGlyph({
  icon,
}: {
  icon: PersonnelNavIcon;
}) {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-current"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      {ICON_PATHS[icon]}
    </svg>
  );
}

const ICON_PATHS: Record<PersonnelNavIcon, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  appointments: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  doctors: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
    </>
  ),
  patients: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 20c0-3 2.7-5.5 6-5.5M13 20c0-2.2 1.8-4 4-4" />
    </>
  ),
  inventory: (
    <>
      <path d="M4 7h16v12H4z" />
      <path d="M8 7V5h8v2M8 11h8M8 15h5" />
    </>
  ),
  reports: (
    <>
      <path d="M6 4h12v16H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  messages: (
    <>
      <path d="M4 6h16v10H8l-4 4V6z" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
};
