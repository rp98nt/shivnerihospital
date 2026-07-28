import Link from "next/link";
import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  action?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
  className?: string;
};

export function DashboardCard({
  title,
  action,
  actionHref,
  actionLabel = "View all",
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <article
      className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {action ? (
          <div className="shrink-0">{action}</div>
        ) : actionHref ? (
          <Link
            href={actionHref}
            className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
      {children}
    </article>
  );
}

export function DashboardEmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
      {message}
    </p>
  );
}

export function DashboardViewLink({
  href,
  label = "View all",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
    >
      {label}
    </Link>
  );
}
