import { PersonnelDashboardHeader } from "@/components/personnel/personnel-dashboard-header";
import { PersonnelHeader } from "@/components/personnel/personnel-header";
import { PersonnelSidebar } from "@/components/personnel/personnel-sidebar";
import { auth } from "@/lib/auth";
import { getPersonnelAccountById } from "@/lib/personnel-accounts";

type PersonnelShellProps = {
  title: string;
  children: React.ReactNode;
  headerVariant?: "default" | "dashboard";
};

export async function PersonnelShell({
  title,
  children,
  headerVariant = "default",
}: PersonnelShellProps) {
  const session = await auth();
  const user = session?.user;
  const account = user?.id ? await getPersonnelAccountById(user.id) : null;

  return (
    <div className="min-h-dvh bg-slate-200/40">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-stretch bg-[#f3f5f9] shadow-sm">
        {user ? <PersonnelSidebar role={user.role} /> : null}
        <div className="flex min-w-0 flex-1 flex-col">
          {user ? (
            headerVariant === "dashboard" ? (
              <PersonnelDashboardHeader
                displayName={user.name ?? user.username}
                accountRole={user.accountRole ?? user.role}
                photoUrl={account?.photoUrl}
              />
            ) : (
              <PersonnelHeader
                title={title}
                displayName={user.name ?? user.username}
                accountRole={user.accountRole ?? user.role}
                photoUrl={account?.photoUrl}
              />
            )
          ) : null}
          <main className="flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
