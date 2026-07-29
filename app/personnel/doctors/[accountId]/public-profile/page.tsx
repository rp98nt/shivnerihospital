import { PersonnelPublicProfileEditor } from "@/components/personnel/personnel-public-profile-editor";
import { PersonnelShell } from "@/components/personnel/personnel-shell";
import { auth } from "@/lib/auth";
import { getPersonnelAccountById } from "@/lib/personnel-accounts";
import { notFound, redirect } from "next/navigation";

type PersonnelDoctorPublicProfilePageProps = {
  params: Promise<{ accountId: string }>;
};

export default async function PersonnelDoctorPublicProfilePage({
  params,
}: PersonnelDoctorPublicProfilePageProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/personnel/login");
  }

  if (session.user.role !== "super_admin") {
    redirect("/personnel/unauthorized");
  }

  const { accountId } = await params;
  const account = await getPersonnelAccountById(accountId);

  if (!account || account.role !== "doctor") {
    notFound();
  }

  return (
    <PersonnelShell title="Doctor public profile">
      <PersonnelPublicProfileEditor
        account={account}
        canEdit
        backHref="/personnel/doctors"
        backLabel="Back to doctors"
      />
    </PersonnelShell>
  );
}
