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
  | "departments"
  | "schedule"
  | "payment"
  | "inventory"
  | "messages";

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
    label: "Departments",
    href: "/personnel/departments",
    icon: "departments",
    permission: "departments:manage",
  },
  {
    label: "Doctor's Schedule",
    href: "/personnel/doctors-schedule",
    icon: "schedule",
    permission: "schedule:manage",
  },
  {
    label: "Payment",
    href: "/personnel/payment",
    icon: "payment",
    permission: "payment:manage",
  },
  {
    label: "Inventory",
    href: "/personnel/inventory",
    icon: "inventory",
    permission: "inventory:manage",
  },
  {
    label: "Messages",
    href: "/personnel/messages",
    icon: "messages",
    permission: "messages:manage",
    badge: 3,
  },
];
