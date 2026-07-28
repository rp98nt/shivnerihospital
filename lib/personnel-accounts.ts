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

export async function getPersonnelAccountById(id: string) {
  await ensurePersonnelSchema();

  const db = getDb();
  if (!db) {
    return null;
  }

  try {
    const [account] = await db
      .select()
      .from(personnelAccounts)
      .where(eq(personnelAccounts.id, id))
      .limit(1);

    return account ?? null;
  } catch (error) {
    console.error("Failed to fetch personnel account:", error);
    return null;
  }
}

export async function updatePersonnelAccountSpecialty(
  id: string,
  specialty: string,
) {
  await ensurePersonnelSchema();

  const db = getDb();
  if (!db) {
    throw new Error("Database is not configured.");
  }

  const [updated] = await db
    .update(personnelAccounts)
    .set({
      specialty: specialty.trim(),
      updatedAt: new Date(),
    })
    .where(eq(personnelAccounts.id, id))
    .returning();

  return updated ?? null;
}
