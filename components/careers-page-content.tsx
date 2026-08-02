import { DoctorApplicationForm } from "@/components/careers/doctor-application-form";
import { HOSPITAL_NAME } from "@/lib/hospital-contact";

export function CareersPageContent() {
  return (
    <>
      <section className="border-b border-slate-200 bg-[#eef6fc] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
            About us
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Careers
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
            Join {HOSPITAL_NAME} — apply below for consultant and medical officer
            positions across our multispecialty team in Parbhani.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <DoctorApplicationForm />
        </div>
      </section>
    </>
  );
}
