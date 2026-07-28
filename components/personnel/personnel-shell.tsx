import { PersonnelHeader } from "@/components/personnel/personnel-header";
import { PersonnelSidebar } from "@/components/personnel/personnel-sidebar";
import { auth } from "@/lib/auth";

type PersonnelShellProps = {
  title: string;
  children: React.ReactNode;
};

export async function PersonnelShell({ title, children }: PersonnelShellProps) {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="min-h-dvh bg-slate-200/40">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl bg-[#f3f5f9] shadow-sm">
        {user ? <PersonnelSidebar role={user.role} /> : null}
        <div className="flex min-w-0 flex-1 flex-col">
          {user ? (
            <PersonnelHeader
              title={title}
              displayName={user.name ?? user.username}
              accountRole={user.accountRole ?? user.role}
            />
          ) : null}
          <main className="flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
