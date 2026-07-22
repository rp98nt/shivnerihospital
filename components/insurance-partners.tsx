"use client";

import Image from "next/image";

type IconVariant = "shield" | "accreditation";

type InsurancePartner = {
  name: string;
  abbr: string;
  accent: string;
  iconBg: string;
  icon: IconVariant;
  logo?: string;
  /** Multiplier on the default large logo size (ICICI 1.3×, Care/Bajaj 1.5×). */
  logoScale?: number;
};

const PARTNERS: InsurancePartner[] = [
  { name: "Aditya Birla", abbr: "AB", accent: "text-red-700", iconBg: "bg-red-50 ring-red-200", icon: "shield" },
  {
    name: "ICICI Lombard",
    abbr: "IL",
    accent: "text-orange-700",
    iconBg: "bg-orange-50 ring-orange-200",
    icon: "shield",
    logo: "/insurance-partners/icici-lombard.jpeg",
    logoScale: 1.3,
  },
  { name: "Star Health Insurance", abbr: "SH", accent: "text-blue-700", iconBg: "bg-blue-50 ring-blue-200", icon: "shield" },
  {
    name: "HDFC Ergo",
    abbr: "HE",
    accent: "text-sky-800",
    iconBg: "bg-sky-50 ring-sky-200",
    icon: "shield",
    logo: "/insurance-partners/hdfc-ergo.png",
  },
  {
    name: "Bajaj Allianz",
    abbr: "BA",
    accent: "text-indigo-800",
    iconBg: "bg-indigo-50 ring-indigo-200",
    icon: "shield",
    logo: "/insurance-partners/bajaj-allianz.jpeg",
    logoScale: 1.5,
  },
  {
    name: "Care Health",
    abbr: "CH",
    accent: "text-emerald-700",
    iconBg: "bg-emerald-50 ring-emerald-200",
    icon: "shield",
    logo: "/insurance-partners/care-health.jpeg",
    logoScale: 1.5,
  },
  { name: "Indus Ind", abbr: "II", accent: "text-rose-800", iconBg: "bg-rose-50 ring-rose-200", icon: "shield" },
  { name: "Niva Bupa", abbr: "NB", accent: "text-teal-700", iconBg: "bg-teal-50 ring-teal-200", icon: "shield" },
  { name: "Tata AIG", abbr: "TA", accent: "text-blue-800", iconBg: "bg-blue-50 ring-blue-200", icon: "shield", logo: "/insurance-partners/tata-aig.jpeg" },
  { name: "SBI General", abbr: "SG", accent: "text-cyan-800", iconBg: "bg-cyan-50 ring-cyan-200", icon: "shield" },
  { name: "Zurich Kotak", abbr: "ZK", accent: "text-red-800", iconBg: "bg-red-50 ring-red-200", icon: "shield", logo: "/insurance-partners/zurich-kotak.jpeg" },
  { name: "Manipal Cigna", abbr: "MC", accent: "text-green-700", iconBg: "bg-green-50 ring-green-200", icon: "shield", logo: "/insurance-partners/manipal-cigna.jpeg" },
  { name: "Liberty General", abbr: "LG", accent: "text-amber-800", iconBg: "bg-amber-50 ring-amber-200", icon: "shield", logo: "/insurance-partners/liberty-general.jpeg" },
  { name: "NABH Accreditation", abbr: "NABH", accent: "text-violet-800", iconBg: "bg-violet-50 ring-violet-200", icon: "accreditation", logo: "/insurance-partners/nabh-accredited.jpeg" },
];

export function InsurancePartners() {
  const carouselItems = [...PARTNERS, ...PARTNERS];

  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-xl font-semibold text-slate-800 sm:text-2xl">
          Insurance <span className="text-teal-800">Partners</span>
        </h2>

        <div className="insurance-carousel-mask relative mt-8 sm:mt-10">
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

const LOGO_SIZING = {
  standard: {
    container: "h-24 sm:h-28",
    image: "h-20 w-full max-w-[11rem] object-contain sm:h-24 sm:max-w-[12rem]",
    card: "h-44 w-48 sm:h-48 sm:w-52",
  },
  scaled130: {
    container: "h-36 sm:h-[10.4rem]",
    image:
      "h-[7.8rem] w-full max-w-[16.25rem] object-contain sm:h-[9.1rem] sm:max-w-[17.55rem]",
    card: "h-52 w-52 sm:h-56 sm:w-56",
  },
  scaled150: {
    container: "h-42 sm:h-48",
    image:
      "h-36 w-full max-w-[18.75rem] object-contain sm:h-42 sm:max-w-[20.25rem]",
    card: "h-56 w-56 sm:h-60 sm:w-60",
  },
} as const;

function getLogoSizing(partner: InsurancePartner) {
  if (!partner.logo) return LOGO_SIZING.standard;
  if (partner.logoScale === 1.5) return LOGO_SIZING.scaled150;
  if (partner.logoScale === 1.3) return LOGO_SIZING.scaled130;
  return LOGO_SIZING.standard;
}

function InsurancePartnerCard({ partner }: { partner: InsurancePartner }) {
  const sizing = getLogoSizing(partner);

  return (
    <article
      className={`group flex shrink-0 flex-col items-center justify-center rounded-xl border border-slate-100 bg-white px-3 py-4 shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:px-4 sm:py-5 ${sizing.card}`}
    >
      <div className={`flex w-full items-center justify-center ${sizing.container}`}>
        {partner.logo ? (
          <Image
            src={partner.logo}
            alt=""
            width={208}
            height={128}
            className={sizing.image}
          />
        ) : partner.icon === "accreditation" ? (
          <AccreditationIcon className={`h-12 w-12 sm:h-14 sm:w-14 ${partner.accent}`} />
        ) : (
          <InsuranceShieldIcon className={`h-12 w-12 sm:h-14 sm:w-14 ${partner.accent}`} />
        )}
      </div>
      {!partner.logo ? (
        <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {partner.abbr}
        </p>
      ) : null}
      <p
        className={`mt-1 px-1 text-center font-semibold leading-snug text-slate-800 ${
          partner.logo ? "text-xs sm:text-sm" : "text-sm"
        }`}
      >
        {partner.name}
      </p>
    </article>
  );
}

function AccreditationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 14 7 22l5-2 5 2-1.5-8" />
      <path d="M10 9h4M12 7v4" />
    </svg>
  );
}

function InsuranceShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
