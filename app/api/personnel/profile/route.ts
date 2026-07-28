import { auth } from "@/lib/auth";
import { updatePersonnelAccountSpecialty } from "@/lib/personnel-accounts";
import { z } from "zod";

const profileUpdateSchema = z.object({
  specialty: z.string().trim().min(1, "Specialty is required.").max(120),
});

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.accountRole !== "doctor") {
    return Response.json(
      { error: "Only doctor accounts can update profile details." },
      { status: 403 },
    );
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

    const updated = await updatePersonnelAccountSpecialty(
      session.user.id,
      parsed.data.specialty,
    );

    if (!updated) {
      return Response.json({ error: "Failed to update profile." }, { status: 500 });
    }

    return Response.json({
      specialty: updated.specialty,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update profile.";

    return Response.json({ error: message }, { status: 400 });
  }
}
