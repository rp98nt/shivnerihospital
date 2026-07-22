"use client";

import { HomePartnerCarousels } from "@/components/home-partner-carousels";
import { InsurancePartners } from "@/components/insurance-partners";

export function PartnerCarouselsGroup() {
  return (
    <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
          <div className="border-b border-slate-100 px-4 py-8 text-center sm:px-6 sm:py-10">
            <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
              Our Credentials &{" "}
              <span className="text-teal-800">Industry Validation</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Shivneri is recognized and supported by major industry institutions.
            </p>
          </div>
          <InsurancePartners />
          <HomePartnerCarousels />
        </div>
      </div>
    </section>
  );
}
