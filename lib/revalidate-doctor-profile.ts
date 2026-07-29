import { getPersonnelAccountById, getPersonnelAccountSlug } from "@/lib/personnel-accounts";
import { revalidatePath } from "next/cache";

export async function revalidateDoctorPublicProfile(accountId: string) {
  const account = await getPersonnelAccountById(accountId);

  if (!account) {
    return;
  }

  const slug = getPersonnelAccountSlug(account);
  revalidatePath(`/team-of-doctors/${slug}`);
  revalidatePath("/team-of-doctors");
}
