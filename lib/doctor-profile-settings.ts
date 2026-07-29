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
import {
  DEFAULT_ABOUT_INSET_POSITION,
  DEFAULT_EXPERIENCE_BADGE_POSITION,
  normalizeAboutInsetPosition,
  normalizeExperienceBadgePosition,
} from "@/lib/about-inset-position";
import { getPersonnelAccountSlug } from "@/lib/personnel-accounts";

export type DoctorProfileSettings = {
  aboutBackgroundUrl?: string | null;
  aboutInsetUrl?: string | null;
  showAboutInset?: boolean;
  aboutInsetX?: number;
  aboutInsetY?: number;
  showExperienceBadge?: boolean;
  experienceBadgeValue?: string;
  experienceBadgeLabel?: string;
  experienceBadgeX?: number;
  experienceBadgeY?: number;
  expertiseTags?: string[];
  languages?: string;
  availability?: string;
};

export type ResolvedDoctorProfileSettings = {
  aboutBackgroundUrl?: string;
  aboutInsetUrl?: string;
  aboutInsetX: number;
  aboutInsetY: number;
  experienceBadge?: {
    value: string;
    label: string;
    x: number;
    y: number;
  };
  expertiseTags: string[];
  languages: string;
  availability: string;
};

export const DEFAULT_PROFILE_LANGUAGES = "English, Hindi, Marathi";
export const DEFAULT_PROFILE_AVAILABILITY = "Mon - Sat";
export const DEFAULT_EXPERIENCE_BADGE_LABEL = "Years Of Experience";

export function parseDoctorProfileSettings(
  value: unknown,
): DoctorProfileSettings {
  if (!value || typeof value !== "object") {
    return {};
  }

  const record = value as Record<string, unknown>;

  return {
    aboutBackgroundUrl:
      typeof record.aboutBackgroundUrl === "string"
        ? record.aboutBackgroundUrl
        : null,
    aboutInsetUrl:
      typeof record.aboutInsetUrl === "string" ? record.aboutInsetUrl : null,
    showAboutInset:
      typeof record.showAboutInset === "boolean"
        ? record.showAboutInset
        : undefined,
    aboutInsetX:
      typeof record.aboutInsetX === "number" ? record.aboutInsetX : undefined,
    aboutInsetY:
      typeof record.aboutInsetY === "number" ? record.aboutInsetY : undefined,
    showExperienceBadge:
      typeof record.showExperienceBadge === "boolean"
        ? record.showExperienceBadge
        : undefined,
    experienceBadgeValue:
      typeof record.experienceBadgeValue === "string"
        ? record.experienceBadgeValue
        : undefined,
    experienceBadgeLabel:
      typeof record.experienceBadgeLabel === "string"
        ? record.experienceBadgeLabel
        : undefined,
    experienceBadgeX:
      typeof record.experienceBadgeX === "number"
        ? record.experienceBadgeX
        : undefined,
    experienceBadgeY:
      typeof record.experienceBadgeY === "number"
        ? record.experienceBadgeY
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

  const insetPosition = normalizeAboutInsetPosition({
    x: settings?.aboutInsetX,
    y: settings?.aboutInsetY,
  });

  const experienceValue = settings?.experienceBadgeValue?.trim();
  const experienceLabel =
    settings?.experienceBadgeLabel?.trim() || DEFAULT_EXPERIENCE_BADGE_LABEL;
  const showExperienceBadge =
    settings?.showExperienceBadge !== false &&
    Boolean(experienceValue);
  const badgePosition = normalizeExperienceBadgePosition({
    x: settings?.experienceBadgeX,
    y: settings?.experienceBadgeY,
  });

  return {
    aboutBackgroundUrl: settings?.aboutBackgroundUrl ?? undefined,
    aboutInsetUrl,
    aboutInsetX: insetPosition.x,
    aboutInsetY: insetPosition.y,
    experienceBadge: showExperienceBadge
      ? {
          value: experienceValue!,
          label: experienceLabel,
          x: badgePosition.x,
          y: badgePosition.y,
        }
      : undefined,
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
    aboutInsetX: DEFAULT_ABOUT_INSET_POSITION.x,
    aboutInsetY: DEFAULT_ABOUT_INSET_POSITION.y,
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

export async function uploadDoctorAboutBackground(accountId: string, file: File) {
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
    pathname: buildDoctorMediaPath(slug, "about-background", file.name),
  });

  const current = parseDoctorProfileSettings(account.profileSettings);

  if (current.aboutBackgroundUrl) {
    await deletePersonnelPhoto(current.aboutBackgroundUrl);
  }

  return updateDoctorProfileSettings(accountId, {
    aboutBackgroundUrl: blob.url,
  });
}

export async function removeDoctorAboutBackground(accountId: string) {
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

  if (current.aboutBackgroundUrl) {
    await deletePersonnelPhoto(current.aboutBackgroundUrl);
  }

  return updateDoctorProfileSettings(accountId, {
    aboutBackgroundUrl: null,
  });
}
