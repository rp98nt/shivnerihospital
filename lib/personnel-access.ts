export const PERSONNEL_ROLES = [
  "super_admin",
  "reception",
  "clinical_lead",
  "finance",
  "operations",
] as const;

export type PersonnelRole = (typeof PERSONNEL_ROLES)[number];

export const PERSONNEL_PERMISSIONS = [
  "dashboard:view",
  "appointments:manage",
  "doctors:manage",
  "patients:manage",
  "departments:manage",
  "schedule:manage",
  "payment:manage",
  "inventory:manage",
  "messages:manage",
  "personnel:manage",
] as const;

export type PersonnelPermission = (typeof PERSONNEL_PERMISSIONS)[number];

export const PERSONNEL_ROLE_LABELS: Record<PersonnelRole, string> = {
  super_admin: "Super Admin",
  reception: "Reception",
  clinical_lead: "Clinical Lead",
  finance: "Finance",
  operations: "Operations",
};

const ROLE_PERMISSIONS: Record<
  PersonnelRole,
  PersonnelPermission[] | "all"
> = {
  super_admin: "all",
  reception: [
    "dashboard:view",
    "appointments:manage",
    "patients:manage",
    "messages:manage",
  ],
  clinical_lead: [
    "dashboard:view",
    "appointments:manage",
    "doctors:manage",
    "patients:manage",
    "departments:manage",
    "schedule:manage",
  ],
  finance: ["dashboard:view", "payment:manage"],
  operations: ["dashboard:view", "inventory:manage", "schedule:manage"],
};

export function getPermissionsForRole(role: PersonnelRole): PersonnelPermission[] {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions === "all" ? [...PERSONNEL_PERMISSIONS] : permissions;
}

export function roleHasPermission(
  role: PersonnelRole,
  permission: PersonnelPermission,
) {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions === "all" || permissions.includes(permission);
}

export function canAccessPersonnelPath(role: PersonnelRole, pathname: string) {
  if (pathname === "/personnel" || pathname === "/personnel/") {
    return roleHasPermission(role, "dashboard:view");
  }

  const routePermissions: Array<[prefix: string, permission: PersonnelPermission]> =
    [
      ["/personnel/appointments", "appointments:manage"],
      ["/personnel/doctors-schedule", "schedule:manage"],
      ["/personnel/doctors", "doctors:manage"],
      ["/personnel/patients", "patients:manage"],
      ["/personnel/departments", "departments:manage"],
      ["/personnel/payment", "payment:manage"],
      ["/personnel/inventory", "inventory:manage"],
      ["/personnel/messages", "messages:manage"],
    ];

  const match = routePermissions.find(([prefix]) => pathname.startsWith(prefix));
  if (!match) {
    return role === "super_admin";
  }

  return roleHasPermission(role, match[1]);
}
