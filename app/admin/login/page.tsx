import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f3f5f9] px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 6v12M6 12h12" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Shivneri Admin</h1>
          <p className="mt-2 text-sm text-slate-500">
            Staff sign-in will be enabled when authentication is connected.
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              placeholder="staff@shivnerihospital.com"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <Link
            href="/admin"
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Continue to Dashboard
          </Link>
        </form>
      </div>
    </div>
  );
}
