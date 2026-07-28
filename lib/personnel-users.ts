import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { personnelUsers } from "@/lib/db/schema";
import type { PersonnelRole } from "@/lib/personnel-access";

export async function findPersonnelUserByUsername(username: string) {
  const db = getDb();
  if (!db) {
    return null;
  }

  const [user] = await db
    .select()
    .from(personnelUsers)
    .where(eq(personnelUsers.username, username.toLowerCase().trim()))
    .limit(1);

  return user ?? null;
}

export async function verifyPersonnelCredentials(
  username: string,
  password: string,
) {
  const user = await findPersonnelUserByUsername(username);
  if (!user || !user.isActive) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return null;
  }

  return user;
}

export async function ensureBootstrapSuperAdmin() {
  const db = getDb();
  const username = process.env.PERSONNEL_SUPER_ADMIN_USERNAME?.trim().toLowerCase();
  const password = process.env.PERSONNEL_SUPER_ADMIN_PASSWORD;
  const displayName =
    process.env.PERSONNEL_SUPER_ADMIN_DISPLAY_NAME?.trim() || "Super Admin";

  if (!db || !username || !password) {
    return null;
  }

  const existing = await findPersonnelUserByUsername(username);
  if (existing) {
    return existing;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [created] = await db
    .insert(personnelUsers)
    .values({
      username,
      passwordHash,
      displayName,
      role: "super_admin" satisfies PersonnelRole,
    })
    .returning();

  return created ?? null;
}
