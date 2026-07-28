import type { PersonnelNavIcon } from "@/lib/personnel-nav";

export function PersonnelNavIconGlyph({
  icon,
}: {
  icon: PersonnelNavIcon;
}) {
  return (
    <svg
      className="h-5 w-5 shrink-0"
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
  departments: (
    <>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  schedule: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  payment: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  inventory: (
    <>
      <path d="M4 7h16v12H4z" />
      <path d="M8 7V5h8v2M8 11h8M8 15h5" />
    </>
  ),
  messages: (
    <>
      <path d="M4 6h16v10H8l-4 4V6z" />
    </>
  ),
};
