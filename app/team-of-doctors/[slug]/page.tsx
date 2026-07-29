import { SiteHeaderHeightSync } from "@/components/site-header-height-sync";
import { SiteHeader } from "@/components/site-header";
import { DoctorProfileAbout } from "@/components/doctor-profile-about";
import { DoctorProfileHero } from "@/components/doctor-profile-hero";
import {
  DOCTORS,
  getDoctorBySlug,
} from "@/lib/doctors";
import { getPersonnelPhotoMapBySlug } from "@/lib/personnel-photos";
import type { Metadata } from "next";
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

export default async function TeamDoctorProfilePage({ params }: DoctorPageProps) {
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
        <DoctorProfileAbout doctor={doctor} photoUrl={photoUrl} />
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Shivneri Hospital. All rights reserved.
      </footer>
    </div>
  );
}
