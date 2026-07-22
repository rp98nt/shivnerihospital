"use client";

import { PartnerCarousel } from "@/components/partner-carousel";

const FINANCE_PARTNERS = [
  { name: "SBI", logo: "/finance-partners/sbi.jpeg" },
  { name: "Kotak", logo: "/finance-partners/kotak.jpeg" },
  { name: "Axis Bank", logo: "/finance-partners/axis-bank.jpeg" },
  { name: "HDFC Bank", logo: "/finance-partners/hdfc-bank.jpeg" },
  { name: "ICICI Bank", logo: "/finance-partners/icici-bank.jpeg" },
];

const QUALITY_PARTNERS = [
  { name: "FSSAI", logo: "/quality-iso/fssai.jpeg" },
  { name: "NABH", logo: "/quality-iso/nabh.jpeg" },
  { name: "ISO", logo: "/quality-iso/iso.jpeg" },
  { name: "Ayush", logo: "/quality-iso/ayush.jpeg" },
];

const RESEARCH_PARTNERS = [
  { name: "The Lancet", logo: "/peer-review/the-lancet.jpeg" },
  { name: "Indian Heart Journal" },
  { name: "British Journal" },
  { name: "AJCC" },
];

export function HomePartnerCarousels() {
  return (
    <>
      <PartnerCarousel
        heading={
          <>
            Finance & <span className="text-teal-800">EMI Partners</span>
          </>
        }
        partners={FINANCE_PARTNERS}
        direction="ltr"
      />
      <PartnerCarousel
        heading={
          <>
            Quality & <span className="text-teal-800">ISO Certification</span>
          </>
        }
        partners={QUALITY_PARTNERS}
        direction="rtl"
      />
      <PartnerCarousel
        heading={
          <>
            Peer-Reviewed <span className="text-teal-800">Research</span>
          </>
        }
        partners={RESEARCH_PARTNERS}
        direction="ltr"
      />
    </>
  );
}
