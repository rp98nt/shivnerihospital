import { auth } from "@/lib/auth";
import { updateDoctorProfileSettings } from "@/lib/doctor-profile-settings";
import { updatePersonnelAccountSpecialty } from "@/lib/personnel-accounts";
import { revalidateDoctorPublicProfile } from "@/lib/revalidate-doctor-profile";
import { z } from "zod";

const profileSettingsSchema = z.object({
  showAboutInset: z.boolean().optional(),
  aboutInsetX: z.number().min(-25).max(125).optional(),
  aboutInsetY: z.number().min(-25).max(125).optional(),
  showExperienceBadge: z.boolean().optional(),
  experienceBadgeValue: z.string().trim().max(12).optional(),
  experienceBadgeLabel: z.string().trim().min(1).max(80).optional(),
  expertiseTags: z.array(z.string().trim().min(1).max(80)).max(12).optional(),
  languages: z.string().trim().min(1).max(200).optional(),
  availability: z.string().trim().min(1).max(120).optional(),
});

const profileUpdateSchema = z.object({
  accountId: z.string().uuid().optional(),
  specialty: z.string().trim().min(1, "Specialty is required.").max(120).optional(),
  profileSettings: profileSettingsSchema.optional(),
});

function canUpdateAccount(
  session: {
    user?: {
      id?: string;
      role?: string;
      accountRole?: string;
    };
  },
  accountId: string,
) {
  const isSelfUpdate = accountId === session.user?.id;
  const isSuperAdmin = session.user?.role === "super_admin";

  if (isSelfUpdate && session.user?.accountRole !== "doctor") {
    return false;
  }

  return isSelfUpdate || isSuperAdmin;
}

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = profileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid profile data." },
        { status: 400 },
      );
    }

    const accountId = parsed.data.accountId ?? session.user.id;

    if (!canUpdateAccount(session, accountId)) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (
      parsed.data.specialty === undefined &&
      parsed.data.profileSettings === undefined
    ) {
      return Response.json(
        { error: "No profile fields provided to update." },
        { status: 400 },
      );
    }

    let updatedAccount = null;

    if (parsed.data.specialty !== undefined) {
      if (accountId !== session.user.id) {
        return Response.json(
          { error: "Only the doctor can update their specialty." },
          { status: 403 },
        );
      }

      updatedAccount = await updatePersonnelAccountSpecialty(
        accountId,
        parsed.data.specialty,
      );
    }

    if (parsed.data.profileSettings) {
      updatedAccount = await updateDoctorProfileSettings(
        accountId,
        parsed.data.profileSettings,
      );
    }

    if (!updatedAccount) {
      return Response.json({ error: "Failed to update profile." }, { status: 500 });
    }

    await revalidateDoctorPublicProfile(accountId);

    return Response.json({
      specialty: updatedAccount.specialty,
      profileSettings: updatedAccount.profileSettings,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update profile.";

    return Response.json({ error: message }, { status: 400 });
  }
}
