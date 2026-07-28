export const PERSONNEL_SUPERADMIN_PATH = "/personnel/superadmin";

export const PERSONNEL_ROLES = [
  "super_admin",
  "doctor",
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
  "reports:manage",
  "messages:manage",
  "settings:manage",
  "personnel:manage",
] as const;

export type PersonnelPermission = (typeof PERSONNEL_PERMISSIONS)[number];

export const PERSONNEL_ROLE_LABELS: Record<PersonnelRole, string> = {
  super_admin: "Super Admin",
  doctor: "Doctor",
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
  doctor: [
    "appointments:manage",
    "patients:manage",
    "schedule:manage",
  ],
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
    "reports:manage",
  ],
  finance: ["dashboard:view", "reports:manage"],
  operations: ["dashboard:view", "inventory:manage", "reports:manage"],
};

export function formatPersonnelRoleLabel(role: string): string {
  const normalized = role.trim().toLowerCase().replace(/-/g, "_");

  if (normalized === "superadmin") {
    return "Super Admin";
  }

  if (PERSONNEL_ROLES.includes(normalized as PersonnelRole)) {
    return PERSONNEL_ROLE_LABELS[normalized as PersonnelRole];
  }

  return role
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function normalizePersonnelRole(role: string): PersonnelRole | null {
  const normalized = role.trim().toLowerCase().replace(/-/g, "_");

  if (normalized === "superadmin") {
    return "super_admin";
  }

  if (PERSONNEL_ROLES.includes(normalized as PersonnelRole)) {
    return normalized as PersonnelRole;
  }

  return null;
}

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
  if (
    pathname === PERSONNEL_SUPERADMIN_PATH ||
    pathname === `${PERSONNEL_SUPERADMIN_PATH}/`
  ) {
    return role === "super_admin";
  }

  if (pathname === "/personnel" || pathname === "/personnel/") {
    return true;
  }

  const routePermissions: Array<[prefix: string, permission: PersonnelPermission]> =
    [
      ["/personnel/appointments", "appointments:manage"],
      ["/personnel/doctors", "doctors:manage"],
      ["/personnel/patients", "patients:manage"],
      ["/personnel/inventory", "inventory:manage"],
      ["/personnel/reports", "reports:manage"],
      ["/personnel/messages", "messages:manage"],
      ["/personnel/settings", "settings:manage"],
    ];

  const match = routePermissions.find(([prefix]) => pathname.startsWith(prefix));
  if (!match) {
    return role === "super_admin";
  }

  return roleHasPermission(role, match[1]);
}

export function getPersonnelHomePath(role: PersonnelRole) {
  if (role === "super_admin") {
    return PERSONNEL_SUPERADMIN_PATH;
  }

  const fallbackRoutes: Array<[prefix: string, permission: PersonnelPermission]> = [
    ["/personnel/appointments", "appointments:manage"],
    ["/personnel/patients", "patients:manage"],
    ["/personnel/messages", "messages:manage"],
    ["/personnel/doctors", "doctors:manage"],
    ["/personnel/inventory", "inventory:manage"],
    ["/personnel/reports", "reports:manage"],
    ["/personnel/settings", "settings:manage"],
  ];

  const match = fallbackRoutes.find(([, permission]) =>
    roleHasPermission(role, permission),
  );

  return match?.[0] ?? "/personnel/unauthorized";
}
