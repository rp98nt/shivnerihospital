import { AdminShell } from "@/components/admin/admin-shell";

type AdminPlaceholderProps = {
  title: string;
  description: string;
};

export function AdminPlaceholder({ title, description }: AdminPlaceholderProps) {
  return (
    <AdminShell title={title}>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">{description}</p>
        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-blue-600">
          Module coming soon
        </p>
      </div>
    </AdminShell>
  );
}
