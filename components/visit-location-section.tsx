import { VISIT_LOCATION } from "@/lib/hospital-contact";

export function VisitLocationSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
          <div className="grid min-h-[360px] grid-cols-1 lg:min-h-[420px] lg:grid-cols-2">
            <div className="relative flex flex-col justify-center overflow-hidden bg-linear-to-br from-teal-100 via-teal-50 to-emerald-100 px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <div className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-teal-300/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 left-0 h-24 w-24 rounded-full bg-emerald-300/25 blur-2xl" />

              <div className="relative">
                <h2 className="max-w-lg text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                  Visit Our{" "}
                  <span className="text-teal-800">Parbhani Center Clinic</span>
                </h2>

                <div className="mt-8 space-y-5">
                  <div className="flex items-start gap-3">
                    <LocationPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-teal-800" />
                    <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                      {VISIT_LOCATION.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 shrink-0 text-teal-800" />
                    <a
                      href={`tel:${VISIT_LOCATION.phoneTel}`}
                      className="text-sm font-medium text-slate-800 transition hover:text-teal-900 sm:text-base"
                    >
                      {VISIT_LOCATION.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[320px] w-full sm:min-h-[360px] lg:min-h-full">
              <iframe
                src={VISIT_LOCATION.mapsEmbedSrc}
                title={`${VISIT_LOCATION.heading} map`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
