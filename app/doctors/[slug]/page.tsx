import { SiteHeader } from "@/components/site-header";
import {
  DOCTORS,
  getDoctorAppointmentPath,
  getDoctorBySlug,
} from "@/lib/doctors";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type DoctorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({
  params,
}: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return { title: "Doctor Not Found | Shivneri Hospital" };
  }

  return {
    title: `${doctor.name} | Shivneri Hospital`,
    description: `${doctor.name} — ${doctor.specialty}. ${doctor.qualifications}`,
  };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-slate-50">
        <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Link
              href="/"
              className="text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              ← Back to home
            </Link>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
              <div className="bg-linear-to-b from-teal-50 to-slate-100 px-6 py-10 sm:px-8 sm:py-12">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <span className="text-4xl font-semibold">
                    {doctor.name.replace(/^Dr\.?\s+/i, "").charAt(0)}
                  </span>
                </div>
              </div>

              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-wrap items-start gap-3">
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    {doctor.name}
                  </h1>
                  {doctor.isGuest ? (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
                      Guest Faculty
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-base font-medium text-teal-800">
                  {doctor.specialty}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {doctor.qualifications}
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Shivneri Hospital, Parbhani
                </p>

                <Link
                  href={getDoctorAppointmentPath(doctor.slug)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 sm:w-auto sm:min-w-[220px]"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
