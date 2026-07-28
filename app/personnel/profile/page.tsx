import { PersonnelProfileForm } from "@/components/personnel/personnel-profile-form";
import { PersonnelShell } from "@/components/personnel/personnel-shell";
import { auth } from "@/lib/auth";
import { getPersonnelAccountById } from "@/lib/personnel-accounts";
import { redirect } from "next/navigation";

export default async function PersonnelProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/personnel/login");
  }

  const account = await getPersonnelAccountById(userId);

  if (!account) {
    redirect("/personnel/login");
  }

  return (
    <PersonnelShell title="Profile">
      <PersonnelProfileForm account={account} />
    </PersonnelShell>
  );
}
