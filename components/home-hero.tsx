"use client";

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

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
            <div>
              <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                Your health is in{" "}
                <span className="text-lime-300">safe hands</span> at Shivneri
                Hospital
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-teal-50/90 sm:text-lg">
                Share your details. We&apos;ll help you find the right doctor and
                support you till recovery.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-lime-400/40 bg-lime-400/15 px-4 py-2 text-xs font-medium text-lime-100 sm:text-sm">
                <ShieldIcon className="h-4 w-4 shrink-0 text-lime-300" />
                Same-Day Doctor Appointments | 24/7 Patient Support
              </div>

              <div className="mt-10 inline-grid grid-cols-2 gap-3 sm:gap-4">
                <FeatureCard
                  icon={<DoctorIcon />}
                  label="Expert Team of Doctors"
                />
                <FeatureCard
                  icon={<FacilityIcon />}
                  label="Latest Medical Facilities"
                />
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

      <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
            How to Skip the Wait Time at{" "}
            <span className="text-teal-800">Shivneri Hospital</span>
          </h2>
        </div>
      </section>
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
    <div className="flex w-[7.25rem] flex-col items-center rounded-xl bg-white px-2 py-3 text-center shadow-md sm:w-32 sm:px-2.5 sm:py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-700 sm:h-10 sm:w-10">
        {icon}
      </div>
      <p className="mt-1.5 text-[10px] font-medium leading-snug text-slate-700 sm:text-[11px]">
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
    <svg className="h-5 w-5 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
    </svg>
  );
}

function FacilityIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M8 4h8v16H8z" />
      <path d="M12 8v4M10 10h4" />
      <path d="M4 10h4v10H4zM16 10h4v10h-4z" />
    </svg>
  );
}
