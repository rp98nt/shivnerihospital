import { PersonnelShell } from "@/components/personnel/personnel-shell";

type PersonnelPlaceholderProps = {
  title: string;
  description: string;
};

export function PersonnelPlaceholder({
  title,
  description,
}: PersonnelPlaceholderProps) {
  return (
    <PersonnelShell title={title}>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{description}</p>
      </div>
    </PersonnelShell>
  );
}
