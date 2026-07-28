"use client";

type AdminHeaderProps = {
  title: string;
};

export function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>

      <div className="ml-auto flex flex-wrap items-center gap-3">
        <label className="relative hidden sm:block">
          <span className="sr-only">Search</span>
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search here..."
            className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 lg:w-72"
          />
        </label>

        <div className="flex items-center gap-1">
          <AdminIconButton label="Favorites">
            <path d="M12 21s-6.5-4.5-6.5-10a4.5 4.5 0 0 1 8-2.9A4.5 4.5 0 0 1 18.5 11C18.5 16.5 12 21 12 21z" />
          </AdminIconButton>
          <AdminIconButton label="Bookmarks">
            <path d="M6 4h12v16l-6-4-6 4V4z" />
          </AdminIconButton>
          <AdminIconButton label="Notifications">
            <path d="M15 17H9M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          </AdminIconButton>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            SG
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Staff Admin</p>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Online
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function AdminIconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        {children}
      </svg>
    </button>
  );
}
