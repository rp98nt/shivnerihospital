import { AboutUsContent } from "@/components/about-us-content";
import { SiteHeaderHeightSync } from "@/components/site-header-height-sync";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HOSPITAL_NAME } from "@/lib/hospital-contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About Us | ${HOSPITAL_NAME}`,
  description: `Learn about ${HOSPITAL_NAME} — compassionate multispecialty healthcare, experienced consultants, and modern facilities in Parbhani, Maharashtra.`,
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeaderHeightSync />
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <AboutUsContent />
      </main>

      <SiteFooter />
    </div>
  );
}
