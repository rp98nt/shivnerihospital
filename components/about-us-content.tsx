import {
  APPOINTMENT_PHONE,
  APPOINTMENT_PHONE_TEL,
  EMERGENCY_MOBILE,
  EMERGENCY_MOBILE_TEL,
  HOSPITAL_NAME,
  VISIT_LOCATION,
} from "@/lib/hospital-contact";
import Link from "next/link";

const HIGHLIGHTS = [
  {
    title: "Multispecialty Care",
    description:
      "Outpatient, inpatient, diagnostic, and emergency services under one trusted campus in Parbhani.",
  },
  {
    title: "Experienced Consultants",
    description:
      "A dedicated team of specialists and visiting guest faculty across medicine, surgery, and super-specialty care.",
  },
  {
    title: "Modern Facilities",
    description:
      "Contemporary diagnostics, ICU support, dialysis, and treatment infrastructure designed for safe recovery.",
  },
  {
    title: "Patient-First Approach",
    description:
      "Compassionate guidance from consultation through treatment, admission, and follow-up support.",
  },
] as const;

const COMMITMENTS = [
  "Transparent communication with patients and families",
  "Round-the-clock emergency and critical care access",
  "Cashless treatment support through insurance and government schemes",
  "Evidence-based care delivered with empathy and respect",
] as const;

export function AboutUsContent() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-teal-900 sm:text-4xl">
            About <span className="text-teal-700">Us</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
            {HOSPITAL_NAME} is a trusted multispecialty hospital serving families
            across Parbhani and surrounding regions with compassionate,
            professional healthcare.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Our Story
            </span>

            <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
              Care rooted in trust, guided by expertise
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                {HOSPITAL_NAME} provides trusted outpatient, inpatient, diagnostic,
                and emergency care with experienced consultants and modern
                facilities in Parbhani, Maharashtra.
              </p>
              <p>
                From same-day appointments and specialist consultations to ICU
                support, dialysis, diagnostics, and surgical care, our hospital
                is built to support patients at every stage of their health
                journey.
              </p>
              <p>
                We believe every patient deserves clear guidance, timely
                treatment, and a team that listens. That commitment shapes how
                we deliver care every day.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-lg font-bold text-teal-900">At a glance</h3>
            <dl className="mt-5 space-y-4">
              <AboutFact label="Location" value={VISIT_LOCATION.address} />
              <AboutFact
                label="Emergency"
                value={EMERGENCY_MOBILE}
                href={`tel:${EMERGENCY_MOBILE_TEL}`}
              />
              <AboutFact
                label="Appointments"
                value={APPOINTMENT_PHONE}
                href={`tel:${APPOINTMENT_PHONE_TEL}`}
              />
              <AboutFact label="Specialists" value="25+ consultants and guest faculty" />
              <AboutFact label="Support" value="24/7 emergency and patient assistance" />
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-teal-900 sm:text-3xl">
              What we <span className="text-teal-700">stand for</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Our work is guided by clinical excellence, accessibility, and a
              deep respect for every patient who walks through our doors.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <h3 className="text-base font-bold text-teal-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl bg-linear-to-br from-teal-800 via-teal-900 to-slate-900 px-6 py-8 text-white sm:px-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Our commitment to you
                </h2>
                <ul className="mt-5 space-y-3">
                  {COMMITMENTS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-300" />
                      <span className="text-teal-50/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/team-of-doctors"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-900 transition hover:bg-teal-50"
                >
                  Meet Our Doctors
                </Link>
                <Link
                  href="/appointment"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutFact({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-slate-700">
        {href ? (
          <a href={href} className="transition hover:text-teal-800">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
