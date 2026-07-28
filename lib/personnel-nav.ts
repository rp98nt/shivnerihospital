import type { PersonnelPermission } from "@/lib/personnel-access";
import { PERSONNEL_SUPERADMIN_PATH } from "@/lib/personnel-access";

export type PersonnelNavItem = {
  label: string;
  href: string;
  icon: PersonnelNavIcon;
  permission: PersonnelPermission;
  badge?: number;
};

export type PersonnelNavIcon =
  | "dashboard"
  | "appointments"
  | "doctors"
  | "patients"
  | "inventory"
  | "reports"
  | "messages"
  | "settings";

export const PERSONNEL_NAV_ITEMS: PersonnelNavItem[] = [
  {
    label: "Dashboard",
    href: PERSONNEL_SUPERADMIN_PATH,
    icon: "dashboard",
    permission: "dashboard:view",
  },
  {
    label: "Appointments",
    href: "/personnel/appointments",
    icon: "appointments",
    permission: "appointments:manage",
  },
  {
    label: "Doctors",
    href: "/personnel/doctors",
    icon: "doctors",
    permission: "doctors:manage",
  },
  {
    label: "Patients",
    href: "/personnel/patients",
    icon: "patients",
    permission: "patients:manage",
  },
  {
    label: "Inventory",
    href: "/personnel/inventory",
    icon: "inventory",
    permission: "inventory:manage",
  },
  {
    label: "Reports",
    href: "/personnel/reports",
    icon: "reports",
    permission: "reports:manage",
  },
  {
    label: "Messages",
    href: "/personnel/messages",
    icon: "messages",
    permission: "messages:manage",
  },
  {
    label: "Settings",
    href: "/personnel/settings",
    icon: "settings",
    permission: "settings:manage",
  },
];
