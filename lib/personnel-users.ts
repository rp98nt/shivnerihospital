import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { ensurePersonnelSchema } from "@/lib/db/ensure-schema";
import { getDb } from "@/lib/db";
import { personnelAccounts, type PersonnelAccount } from "@/lib/db/schema";
import { normalizePersonnelRole, type PersonnelRole } from "@/lib/personnel-access";

export type VerifiedPersonnelAccount = PersonnelAccount & {
  accessRole: PersonnelRole;
};

export async function ensurePersonnelAccounts() {
  return ensurePersonnelSchema();
}

export async function findPersonnelAccountByUsername(username: string) {
  const db = getDb();
  if (!db) {
    return null;
  }

  try {
    const [account] = await db
      .select()
      .from(personnelAccounts)
      .where(eq(personnelAccounts.username, username.toLowerCase().trim()))
      .limit(1);

    return account ?? null;
  } catch (error) {
    console.error("Failed to find personnel account:", error);
    return null;
  }
}

export async function verifyPersonnelCredentials(
  username: string,
  password: string,
): Promise<VerifiedPersonnelAccount | null> {
  await ensurePersonnelAccounts();

  const account = await findPersonnelAccountByUsername(username);
  if (!account || !account.isActive) {
    return null;
  }

  const accessRole = normalizePersonnelRole(account.role);
  if (!accessRole) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, account.passwordHash);
  if (!passwordMatches) {
    return null;
  }

  return {
    ...account,
    accessRole,
  };
}
