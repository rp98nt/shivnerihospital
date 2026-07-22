"use client";

import Image from "next/image";

type InsurancePartner = {
  name: string;
  logo: string;
};

const PARTNERS: InsurancePartner[] = [
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
  const carouselItems = [...PARTNERS, ...PARTNERS];

  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-xl font-semibold text-slate-800 sm:text-2xl">
          Insurance <span className="text-teal-800">Partners</span>
        </h2>

        <div className="insurance-carousel-mask relative mt-8 py-3 sm:mt-10 sm:py-4">
          <div className="insurance-carousel-track flex w-max gap-4 sm:gap-5">
            {carouselItems.map((partner, index) => (
              <InsurancePartnerCard
                key={`${partner.name}-${index}`}
                partner={partner}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InsurancePartnerCard({ partner }: { partner: InsurancePartner }) {
  return (
    <article className="insurance-partner-card group relative flex shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white px-5 py-3 shadow-md hover:shadow-xl sm:px-6 sm:py-3.5">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={208}
        height={128}
        className="insurance-partner-logo h-full w-full object-contain"
      />
    </article>
  );
}
