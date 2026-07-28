import { Suspense } from "react";
import { PersonnelLoginForm } from "@/components/personnel/personnel-login-form";

export default function PersonnelLoginPage() {
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
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Shivneri Personnel</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in with your staff username and password.
          </p>
        </div>

        <Suspense fallback={<div className="mt-8 h-40 animate-pulse rounded-lg bg-slate-100" />}>
          <PersonnelLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
