import { auth } from "@/lib/auth";
import { getPersonnelHomePath } from "@/lib/personnel-access";
import { redirect } from "next/navigation";

export default async function PersonnelIndexPage() {
  const session = await auth();
  const role = session?.user?.role;

  if (role) {
    redirect(getPersonnelHomePath(role));
  }

  redirect("/personnel/login");
}
