import { FaqSection } from "@/components/faq-section";
import { HomeHero } from "@/components/home-hero";
import { OurDoctorsSection } from "@/components/our-doctors-section";
import { SiteHeaderHeightSync } from "@/components/site-header-height-sync";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VisitLocationSection } from "@/components/visit-location-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeaderHeightSync />
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HomeHero doctorsSection={<OurDoctorsSection />} />
        <FaqSection />
        <VisitLocationSection />
      </main>

      <SiteFooter />
    </div>
  );
}
