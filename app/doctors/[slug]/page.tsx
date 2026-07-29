import { SiteHeaderHeightSync } from "@/components/site-header-height-sync";
import { SiteHeader } from "@/components/site-header";
import { DoctorProfileHero } from "@/components/doctor-profile-hero";
import {
  DOCTORS,
  getDoctorAppointmentPath,
  getDoctorBySlug,
} from "@/lib/doctors";
import { getPersonnelPhotoMapBySlug } from "@/lib/personnel-photos";
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

  const photoMap = await getPersonnelPhotoMapBySlug();
  const photoUrl = photoMap.get(slug);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeaderHeightSync />
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-slate-50">
        <DoctorProfileHero doctor={doctor} photoUrl={photoUrl} />

        <section className="border-t border-slate-200 bg-slate-50 py-10 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-teal-900 sm:text-2xl">
                About {doctor.name}
              </h2>

              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Speciality
                  </dt>
                  <dd className="mt-1 text-base font-semibold text-slate-900">
                    {doctor.specialty}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Qualifications
                  </dt>
                  <dd className="mt-1 text-base font-semibold text-slate-900">
                    {doctor.qualifications}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Hospital
                  </dt>
                  <dd className="mt-1 text-base font-semibold text-slate-900">
                    Shivneri Hospital, Parbhani
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Role</dt>
                  <dd className="mt-1 text-base font-semibold text-slate-900">
                    {doctor.isGuest ? "Guest Faculty" : "Consultant"}
                  </dd>
                </div>
              </dl>

              <Link
                href={getDoctorAppointmentPath(doctor.slug)}
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Book Appointment with {doctor.name}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Shivneri Hospital. All rights reserved.
      </footer>
    </div>
  );
}
