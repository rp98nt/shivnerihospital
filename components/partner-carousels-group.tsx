"use client";

import { HomePartnerCarousels } from "@/components/home-partner-carousels";
import { InsurancePartners } from "@/components/insurance-partners";

export function PartnerCarouselsGroup() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md divide-y divide-slate-200">
          <InsurancePartners />
          <HomePartnerCarousels />
        </div>
      </div>
    </section>
  );
}
