import { FaqSection } from "@/components/faq-section";
import { HomeHero } from "@/components/home-hero";
import { SiteHeader } from "@/components/site-header";
import { VisitLocationSection } from "@/components/visit-location-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HomeHero />
        <FaqSection />
        <VisitLocationSection />
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Shivneri Hospital. All rights reserved.
      </footer>
    </div>
  );
}
