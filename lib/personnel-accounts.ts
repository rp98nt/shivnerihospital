import { asc, eq } from "drizzle-orm";
import { ensurePersonnelSchema } from "@/lib/db/ensure-schema";
import { getDb } from "@/lib/db";
import { personnelAccounts, type PersonnelAccount } from "@/lib/db/schema";

export async function getPersonnelAccountsByRole(role: string) {
  await ensurePersonnelSchema();

  const db = getDb();
  if (!db) {
    return [];
  }

  try {
    return await db
      .select()
      .from(personnelAccounts)
      .where(eq(personnelAccounts.role, role))
      .orderBy(asc(personnelAccounts.name));
  } catch (error) {
    console.error("Failed to fetch personnel accounts:", error);
    return [];
  }
}

export function getPersonnelAccountSlug(account: PersonnelAccount) {
  return account.username.replace(/@shivnerihospital\.com$/i, "");
}
