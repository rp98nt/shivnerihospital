import { auth } from "@/lib/auth";
import { isBlobStorageConfigured } from "@/lib/blob-storage";
import { uploadPersonnelAccountPhoto } from "@/lib/personnel-photos";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isBlobStorageConfigured()) {
    return Response.json(
      { error: "Blob storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel." },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const accountId = String(formData.get("accountId") ?? "");
    const file = formData.get("file");

    if (!accountId) {
      return Response.json({ error: "Missing accountId." }, { status: 400 });
    }

    const isSelfUpload = accountId === session.user.id;
    const isSuperAdmin = session.user.role === "super_admin";

    if (isSelfUpload && session.user.accountRole !== "doctor") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSelfUpload && !isSuperAdmin) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!(file instanceof File)) {
      return Response.json({ error: "Missing image file." }, { status: 400 });
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
