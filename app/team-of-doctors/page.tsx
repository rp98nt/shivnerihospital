import { SiteHeaderHeightSync } from "@/components/site-header-height-sync";
import { SiteHeader } from "@/components/site-header";
import { TeamOfDoctorsSection } from "@/components/team-of-doctors-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team of Doctors | Shivneri Hospital",
  description:
    "Meet the consultants and visiting guest faculty at Shivneri Hospital, Parbhani.",
};

export default function TeamOfDoctorsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeaderHeightSync />
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-slate-50">
        <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="text-center text-3xl font-bold text-teal-900 sm:text-4xl">
              Team of <span className="text-teal-700">Doctors</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
              Meet our experienced consultants and visiting guest faculty.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <TeamOfDoctorsSection />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Shivneri Hospital. All rights reserved.
      </footer>
    </div>
  );
}
