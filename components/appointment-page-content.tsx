"use client";

import { AppointmentForm } from "@/components/appointment-form";
import { SiteHeader } from "@/components/site-header";
import { useSearchParams } from "next/navigation";

export function AppointmentPageContent() {
  const searchParams = useSearchParams();
  const doctorSlug = searchParams.get("doctor") ?? "";

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-linear-to-br from-teal-800 via-teal-900 to-slate-900 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-md">
          <AppointmentForm initialDoctorSlug={doctorSlug} />
        </div>
      </main>
    </div>
  );
}
