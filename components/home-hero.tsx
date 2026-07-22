"use client";

import { InsurancePartners } from "@/components/insurance-partners";
import { OurSpecialties } from "@/components/our-specialties";
import { FormEvent, useState, type ReactNode } from "react";

export function HomeHero() {
  const [otpSent, setOtpSent] = useState(false);

  function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    setOtpSent(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-teal-800 via-teal-900 to-slate-900 text-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-teal-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14 lg:py-16">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
            <div>
              <h1 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                Your health is in{" "}
                <span className="text-lime-300">safe hands</span> at Shivneri
                Hospital
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-teal-50/90 sm:mt-4 sm:text-lg">
                Share your details. We&apos;ll help you find the right doctor and
                support for you till recovery.
              </p>

              <div className="mt-5 inline-grid w-full gap-y-5 sm:mt-6 sm:gap-y-8">
                <div className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full border border-lime-400/40 bg-lime-400/15 px-4 py-2.5 text-center text-xs font-medium leading-snug text-lime-100 sm:w-fit sm:justify-start sm:text-left sm:text-sm">
                  <ShieldIcon className="h-4 w-4 shrink-0 text-lime-300" />
                  <span className="sm:hidden">
                    Same-Day Appointments · 24/7 Support
                  </span>
                  <span className="hidden sm:inline">
                    Same-Day Doctor Appointments | 24/7 Patient Support
                  </span>
                </div>
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2 lg:gap-3">
                  <FeatureCard
                    icon={<DoctorIcon />}
                    label="Expert Team of Doctors"
                  />
                  <FeatureCard
                    icon={<FacilityIcon />}
                    label="Latest Medical Facilities"
                  />
                  <FeatureCard
                    icon={<AmbulanceIcon />}
                    label="Request an Ambulance"
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:justify-self-end">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-6 text-slate-800 shadow-xl sm:p-7"
              >
                <h2 className="text-center text-lg font-semibold text-slate-900">
                  Book the Next Available Slot
                </h2>

                <div className="mt-5 space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full rounded-lg bg-teal-700 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
                  >
                    Send OTP
                  </button>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    disabled={!otpSent}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-amber-400 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <InsurancePartners />
      <OurSpecialties />
    </>
  );
}

function FeatureCard({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex w-full min-w-0 flex-row items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-left shadow-md sm:h-28 sm:flex-col sm:justify-center sm:px-2 sm:py-0 sm:text-center lg:h-32">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700 sm:h-10 sm:w-10">
        {icon}
      </div>
      <p className="min-w-0 text-sm font-medium leading-snug text-slate-700 sm:mt-1.5 sm:px-1 sm:text-xs lg:text-sm">
        {label}
      </p>
    </div>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.93h2V19h-2v-2.07z" />
    </svg>
  );
}

function DoctorIcon() {
  return (
    <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
    </svg>
  );
}

function FacilityIcon() {
  return (
    <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M8 4h8v16H8z" />
      <path d="M12 8v4M10 10h4" />
      <path d="M4 10h4v10H4zM16 10h4v10h-4z" />
    </svg>
  );
}

function AmbulanceIcon() {
  return (
    <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M10 10H6V6h4v4z" />
      <path d="M3 12v4a1 1 0 0 0 1 1h1" />
      <path d="M14 19H9" />
      <path d="M16 17h2a1 1 0 0 0 1-1v-4.5L16 7H4a1 1 0 0 0-1 1v4" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
      <path d="M10 9v6" />
      <path d="M8 11h4" />
    </svg>
  );
}
