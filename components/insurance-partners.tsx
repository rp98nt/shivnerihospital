"use client";

import { PartnerCarousel } from "@/components/partner-carousel";

const PARTNERS = [
  { name: "Aditya Birla", logo: "/insurance-partners/aditya-birla.jpeg" },
  { name: "ICICI Lombard", logo: "/insurance-partners/icici-lombard.jpeg" },
  { name: "Star Health Insurance", logo: "/insurance-partners/star-health-insurance.jpeg" },
  { name: "HDFC Ergo", logo: "/insurance-partners/hdfc-ergo.png" },
  { name: "Bajaj Allianz", logo: "/insurance-partners/bajaj-allianz.jpeg" },
  { name: "Care Health", logo: "/insurance-partners/care-health.jpeg" },
  { name: "Indus Ind", logo: "/insurance-partners/indus-ind.jpeg" },
  { name: "Niva Bupa", logo: "/insurance-partners/niva-bupa.jpeg" },
  { name: "Tata AIG", logo: "/insurance-partners/tata-aig.jpeg" },
  { name: "SBI General", logo: "/insurance-partners/sbi-general.jpeg" },
  { name: "Zurich Kotak", logo: "/insurance-partners/zurich-kotak.jpeg" },
  { name: "Manipal Cigna", logo: "/insurance-partners/manipal-cigna.jpeg" },
  { name: "Liberty General", logo: "/insurance-partners/liberty-general.jpeg" },
];

export function InsurancePartners() {
  return (
    <PartnerCarousel
      heading={
        <>
          Insurance <span className="text-teal-800">Partners</span>
        </>
      }
      partners={PARTNERS}
      direction="rtl"
      spacing="first"
    />
  );
}
