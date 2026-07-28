import { eq } from "drizzle-orm";
import {
  buildDoctorPhotoPath,
  deletePersonnelPhoto,
  uploadPersonnelPhoto,
} from "@/lib/blob-storage";
import { getDb } from "@/lib/db";
import { personnelAccounts } from "@/lib/db/schema";
import { getPersonnelAccountSlug } from "@/lib/personnel-accounts";

export async function updatePersonnelAccountPhoto(
  accountId: string,
  photoUrl: string | null,
) {
  const db = getDb();
  if (!db) {
    throw new Error("Database is not configured.");
  }

  const [updated] = await db
    .update(personnelAccounts)
    .set({
      photoUrl,
      updatedAt: new Date(),
    })
    .where(eq(personnelAccounts.id, accountId))
    .returning();

  return updated ?? null;
}

export async function uploadPersonnelAccountPhoto(
  accountId: string,
  file: File,
) {
  const db = getDb();
  if (!db) {
    throw new Error("Database is not configured.");
  }

  const [account] = await db
    .select()
    .from(personnelAccounts)
    .where(eq(personnelAccounts.id, accountId))
    .limit(1);

  if (!account) {
    throw new Error("Personnel account not found.");
  }

  const slug = getPersonnelAccountSlug(account);
  const blob = await uploadPersonnelPhoto({
    file,
    pathname: buildDoctorPhotoPath(slug, file.name),
  });

  if (account.photoUrl) {
    await deletePersonnelPhoto(account.photoUrl);
  }

  const updated = await updatePersonnelAccountPhoto(accountId, blob.url);
  return updated;
}

export async function getPersonnelPhotoMapBySlug() {
  const db = getDb();
  if (!db) {
    return new Map<string, string>();
  }

  const accounts = await db
    .select({
      username: personnelAccounts.username,
      photoUrl: personnelAccounts.photoUrl,
    })
    .from(personnelAccounts)
    .where(eq(personnelAccounts.role, "doctor"));

  const photoMap = new Map<string, string>();

  for (const account of accounts) {
    if (!account.photoUrl) {
      continue;
    }

    photoMap.set(
      account.username.replace(/@shivnerihospital\.com$/i, ""),
      account.photoUrl,
    );
  }

  return photoMap;
}
