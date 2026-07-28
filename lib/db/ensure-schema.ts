import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";

export async function ensurePersonnelSchema() {
  const db = getDb();
  if (!db) {
    return false;
  }

  try {
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "public"."personnel_role" AS ENUM(
          'super_admin',
          'reception',
          'clinical_lead',
          'finance',
          'operations'
        );
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "personnel_users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "username" text NOT NULL,
        "password_hash" text NOT NULL,
        "display_name" text NOT NULL,
        "role" "personnel_role" NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "personnel_users_username_unique" UNIQUE("username")
      );
    `);

    return true;
  } catch (error) {
    console.error("Failed to ensure personnel schema:", error);
    return false;
  }
}
