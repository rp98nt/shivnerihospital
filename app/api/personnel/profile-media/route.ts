import { auth } from "@/lib/auth";
import { removeDoctorAboutInset } from "@/lib/doctor-profile-settings";
import { revalidateDoctorPublicProfile } from "@/lib/revalidate-doctor-profile";

function canManageAccountUpload(
  session: {
    user?: {
      id?: string;
      role?: string;
      accountRole?: string;
    };
  },
  accountId: string,
) {
  const isSelfUpload = accountId === session.user?.id;
  const isSuperAdmin = session.user?.role === "super_admin";

  if (isSelfUpload && session.user?.accountRole !== "doctor") {
    return false;
  }

  return isSelfUpload || isSuperAdmin;
}

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { accountId?: string };
    const accountId = body.accountId ?? "";

    if (!accountId) {
      return Response.json({ error: "Missing accountId." }, { status: 400 });
    }

    if (!canManageAccountUpload(session, accountId)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updated = await removeDoctorAboutInset(accountId);

    if (!updated) {
      return Response.json(
        { error: "Failed to remove about section photo." },
        { status: 500 },
      );
    }

    await revalidateDoctorPublicProfile(accountId);

    return Response.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to remove photo.";

    return Response.json({ error: message }, { status: 400 });
  }
}
