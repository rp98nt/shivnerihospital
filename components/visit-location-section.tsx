import { VISIT_LOCATION } from "@/lib/hospital-contact";

export function VisitLocationSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-800 via-teal-900 to-slate-900 text-white">
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-teal-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
              Visit Our{" "}
              <span className="text-lime-300">Parbhani Hospital Campus</span>
            </h2>

            <div className="mt-6 space-y-5 sm:mt-8">
              <div className="flex items-start gap-3">
                <LocationPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-lime-300 sm:h-6 sm:w-6" />
                <p className="max-w-lg text-sm leading-relaxed text-teal-50/90 sm:text-lg">
                  {VISIT_LOCATION.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 shrink-0 text-lime-300 sm:h-6 sm:w-6" />
                <a
                  href={`tel:${VISIT_LOCATION.phoneTel}`}
                  className="text-sm font-medium text-white transition hover:text-lime-200 sm:text-lg"
                >
                  {VISIT_LOCATION.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="relative min-h-[320px] w-full sm:min-h-[360px] lg:min-h-[420px]">
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
