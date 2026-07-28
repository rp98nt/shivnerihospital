export type AdminNavItem = {
  label: string;
  href: string;
  icon: AdminNavIcon;
  badge?: number;
};

export type AdminNavIcon =
  | "dashboard"
  | "appointments"
  | "doctors"
  | "patients"
  | "departments"
  | "schedule"
  | "payment"
  | "inventory"
  | "messages";

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Appointments", href: "/admin/appointments", icon: "appointments" },
  { label: "Doctors", href: "/admin/doctors", icon: "doctors" },
  { label: "Patients", href: "/admin/patients", icon: "patients" },
  { label: "Departments", href: "/admin/departments", icon: "departments" },
  {
    label: "Doctor's Schedule",
    href: "/admin/doctors-schedule",
    icon: "schedule",
  },
  { label: "Payment", href: "/admin/payment", icon: "payment" },
  { label: "Inventory", href: "/admin/inventory", icon: "inventory" },
  { label: "Messages", href: "/admin/messages", icon: "messages", badge: 3 },
];
