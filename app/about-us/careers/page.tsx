import { CareersPageContent } from "@/components/careers-page-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteHeaderHeightSync } from "@/components/site-header-height-sync";
import { HOSPITAL_NAME } from "@/lib/hospital-contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Careers | ${HOSPITAL_NAME}`,
  description: `Apply to join ${HOSPITAL_NAME} as a doctor or healthcare professional in Parbhani, Maharashtra.`,
};

export default function CareersPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeaderHeightSync />
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <CareersPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
