import { eq } from "drizzle-orm";
import {
  buildDoctorMediaPath,
  deletePersonnelPhoto,
  uploadPersonnelPhoto,
} from "@/lib/blob-storage";
import type { Doctor } from "@/lib/doctors";
import { getDb } from "@/lib/db";
import { ensurePersonnelSchema } from "@/lib/db/ensure-schema";
import { personnelAccounts } from "@/lib/db/schema";
import { getPersonnelAccountSlug } from "@/lib/personnel-accounts";

export type DoctorProfileSettings = {
  aboutInsetUrl?: string | null;
  showAboutInset?: boolean;
  expertiseTags?: string[];
  languages?: string;
  availability?: string;
};

export type ResolvedDoctorProfileSettings = {
  aboutInsetUrl?: string;
  expertiseTags: string[];
  languages: string;
  availability: string;
};

export const DEFAULT_PROFILE_LANGUAGES = "English, Hindi, Marathi";
export const DEFAULT_PROFILE_AVAILABILITY = "Mon - Sat";

export function parseDoctorProfileSettings(
  value: unknown,
): DoctorProfileSettings {
  if (!value || typeof value !== "object") {
    return {};
  }

  const record = value as Record<string, unknown>;

  return {
    aboutInsetUrl:
      typeof record.aboutInsetUrl === "string" ? record.aboutInsetUrl : null,
    showAboutInset:
      typeof record.showAboutInset === "boolean"
        ? record.showAboutInset
        : undefined,
    expertiseTags: Array.isArray(record.expertiseTags)
      ? record.expertiseTags
          .filter((tag): tag is string => typeof tag === "string")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : undefined,
    languages:
      typeof record.languages === "string" ? record.languages : undefined,
    availability:
      typeof record.availability === "string" ? record.availability : undefined,
  };
}

export function getDefaultExpertiseTags(doctor: Doctor) {
  if (doctor.expertiseTags?.length) {
    return doctor.expertiseTags;
  }

  const qualificationTags = doctor.qualifications
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return [doctor.specialty, ...qualificationTags].filter(
    (tag, index, tags) => tags.indexOf(tag) === index,
  );
}

export function resolvePublicProfileSettings(
  doctor: Doctor,
  settings?: DoctorProfileSettings | null,
): ResolvedDoctorProfileSettings {
  const aboutInsetUrl =
    settings?.showAboutInset !== false && settings?.aboutInsetUrl
      ? settings.aboutInsetUrl
      : undefined;

  return {
    aboutInsetUrl,
    expertiseTags: settings?.expertiseTags?.length
      ? settings.expertiseTags
      : getDefaultExpertiseTags(doctor),
    languages: settings?.languages?.trim() || DEFAULT_PROFILE_LANGUAGES,
    availability: settings?.availability?.trim() || DEFAULT_PROFILE_AVAILABILITY,
  };
}

export async function getDoctorProfileSettingsMapBySlug() {
  const db = getDb();
  if (!db) {
    return new Map<string, DoctorProfileSettings>();
  }

  try {
    await ensurePersonnelSchema();

    const accounts = await db
      .select({
        username: personnelAccounts.username,
        profileSettings: personnelAccounts.profileSettings,
      })
      .from(personnelAccounts)
      .where(eq(personnelAccounts.role, "doctor"));

    const settingsMap = new Map<string, DoctorProfileSettings>();

    for (const account of accounts) {
      if (!account.profileSettings) {
        continue;
      }

      settingsMap.set(
        account.username.replace(/@shivnerihospital\.com$/i, ""),
        parseDoctorProfileSettings(account.profileSettings),
      );
    }

    return settingsMap;
  } catch (error) {
    console.error("Failed to load doctor profile settings map:", error);
    return new Map<string, DoctorProfileSettings>();
  }
}

export async function updateDoctorProfileSettings(
  accountId: string,
  patch: Partial<DoctorProfileSettings>,
) {
  const db = getDb();
  if (!db) {
    throw new Error("Database is not configured.");
  }

  await ensurePersonnelSchema();

  const [account] = await db
    .select()
    .from(personnelAccounts)
    .where(eq(personnelAccounts.id, accountId))
    .limit(1);

  if (!account) {
    throw new Error("Personnel account not found.");
  }

  const current = parseDoctorProfileSettings(account.profileSettings);
  const nextSettings: DoctorProfileSettings = {
    ...current,
    ...patch,
  };

  const [updated] = await db
    .update(personnelAccounts)
    .set({
      profileSettings: nextSettings,
      updatedAt: new Date(),
    })
    .where(eq(personnelAccounts.id, accountId))
    .returning();

  return updated ?? null;
}

export async function uploadDoctorAboutInset(accountId: string, file: File) {
  const db = getDb();
  if (!db) {
    throw new Error("Database is not configured.");
  }

  await ensurePersonnelSchema();

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
    pathname: buildDoctorMediaPath(slug, "about-inset", file.name),
  });

  const current = parseDoctorProfileSettings(account.profileSettings);

  if (current.aboutInsetUrl) {
    await deletePersonnelPhoto(current.aboutInsetUrl);
  }

  return updateDoctorProfileSettings(accountId, {
    aboutInsetUrl: blob.url,
    showAboutInset: true,
  });
}

export async function removeDoctorAboutInset(accountId: string) {
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

  const current = parseDoctorProfileSettings(account.profileSettings);

  if (current.aboutInsetUrl) {
    await deletePersonnelPhoto(current.aboutInsetUrl);
  }

  return updateDoctorProfileSettings(accountId, {
    aboutInsetUrl: null,
    showAboutInset: false,
  });
}
