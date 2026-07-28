import { DOCTORS } from "@/lib/doctors";

export const DEFAULT_SUPER_ADMIN_ACCOUNT = {
  name: "Super Admin",
  role: "superadmin",
  specialty: "Administration",
  username: "superadmin@shivnerihospital.com",
  passwordHash:
    "$2b$12$.G5.bU8uRGW5d.A4LSi0XewbsjUY6tgxdlMGwHJMSfAx1weT86eWC",
} as const;

export const DEFAULT_DOCTOR_PASSWORD_HASH =
  "$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW";

export const DOCTOR_PERSONNEL_ACCOUNTS = DOCTORS.map((doctor) => ({
  name: doctor.name,
  role: "doctor",
  specialty: doctor.specialty,
  username: `${doctor.slug}@shivnerihospital.com`,
  passwordHash: DEFAULT_DOCTOR_PASSWORD_HASH,
}));

export const PERSONNEL_SEED_ACCOUNTS = [
  DEFAULT_SUPER_ADMIN_ACCOUNT,
  ...DOCTOR_PERSONNEL_ACCOUNTS,
];
