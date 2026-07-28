import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { PERSONNEL_SEED_ACCOUNTS } from "@/lib/personnel-seed";

export async function ensurePersonnelSchema() {
  const db = getDb();
  if (!db) {
    return false;
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "personnel_accounts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" text NOT NULL,
        "role" text NOT NULL,
        "specialty" text,
        "username" text NOT NULL,
        "password_hash" text NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "personnel_accounts_username_unique" UNIQUE("username")
      );
    `);

    await db.execute(sql`
      ALTER TABLE "personnel_accounts"
      ADD COLUMN IF NOT EXISTS "specialty" text;
    `);

    for (const account of PERSONNEL_SEED_ACCOUNTS) {
      await db.execute(sql`
        INSERT INTO "personnel_accounts" (
          "name",
          "role",
          "specialty",
          "username",
          "password_hash"
        )
        SELECT
          ${account.name},
          ${account.role},
          ${account.specialty},
          ${account.username},
          ${account.passwordHash}
        WHERE NOT EXISTS (
          SELECT 1 FROM "personnel_accounts"
          WHERE "username" = ${account.username}
        );
      `);
    }

    return true;
  } catch (error) {
    console.error("Failed to ensure personnel schema:", error);
    return false;
  }
}
