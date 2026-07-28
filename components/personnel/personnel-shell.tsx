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
    <div className="flex min-h-dvh bg-[#f3f5f9]">
      {user ? <PersonnelSidebar role={user.role} /> : null}
      <div className="flex min-w-0 flex-1 flex-col">
        {user ? (
          <PersonnelHeader
            title={title}
            displayName={user.name ?? user.username}
            username={user.username}
            role={user.role}
          />
        ) : null}
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
