import type { DoctorProfileSettings } from "@/lib/doctor-profile-settings";
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const personnelAccounts = pgTable("personnel_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  specialty: text("specialty"),
  photoUrl: text("photo_url"),
  profileSettings: jsonb("profile_settings").$type<DoctorProfileSettings | null>(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type PersonnelAccount = typeof personnelAccounts.$inferSelect;
