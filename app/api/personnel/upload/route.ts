import { auth } from "@/lib/auth";
import { isBlobStorageConfigured } from "@/lib/blob-storage";
import { uploadDoctorAboutInset } from "@/lib/doctor-profile-settings";
import { uploadPersonnelAccountPhoto } from "@/lib/personnel-photos";

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

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isBlobStorageConfigured()) {
    return Response.json(
      {
        error:
          "Blob storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel.",
      },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const accountId = String(formData.get("accountId") ?? "");
    const mediaType = String(formData.get("mediaType") ?? "headshot");
    const file = formData.get("file");

    if (!accountId) {
      return Response.json({ error: "Missing accountId." }, { status: 400 });
    }

    if (!canManageAccountUpload(session, accountId)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!(file instanceof File)) {
      return Response.json({ error: "Missing image file." }, { status: 400 });
    }

    if (mediaType === "about-inset") {
      const updated = await uploadDoctorAboutInset(accountId, file);

      if (!updated) {
        return Response.json(
          { error: "Failed to update about section photo." },
          { status: 500 },
        );
      }

      return Response.json({
        accountId: updated.id,
        aboutInsetUrl:
          updated.profileSettings &&
          typeof updated.profileSettings === "object" &&
          "aboutInsetUrl" in updated.profileSettings
            ? updated.profileSettings.aboutInsetUrl
            : null,
      });
    }

    const updated = await uploadPersonnelAccountPhoto(accountId, file);

    if (!updated) {
      return Response.json({ error: "Failed to update account photo." }, { status: 500 });
    }

    return Response.json({
      photoUrl: updated.photoUrl,
      accountId: updated.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to upload photo.";

    return Response.json({ error: message }, { status: 400 });
  }
}
