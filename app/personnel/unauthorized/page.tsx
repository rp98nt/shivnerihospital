import Link from "next/link";
import { PersonnelShell } from "@/components/personnel/personnel-shell";

export default function PersonnelUnauthorizedPage() {
  return (
    <PersonnelShell title="Access denied">
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h2 className="text-xl font-semibold text-slate-900">You do not have access</h2>
        <p className="mt-2 text-sm text-slate-500">
          Your account is signed in, but this section is restricted to a different access level.
          Contact a super admin if you need permission for this area.
        </p>
        <Link
          href="/personnel"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Back to dashboard
        </Link>
      </div>
    </PersonnelShell>
  );
}
