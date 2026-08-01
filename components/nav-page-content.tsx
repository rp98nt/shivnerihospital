import {
  APPOINTMENT_PHONE,
  APPOINTMENT_PHONE_TEL,
  HOSPITAL_NAME,
} from "@/lib/hospital-contact";
import type { NavPageContent } from "@/lib/nav-pages/types";
import Link from "next/link";

export function NavPageContentView({ page }: { page: NavPageContent }) {
  return (
    <>
      <section className="border-b border-slate-200 bg-[#eef6fc] py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
            {page.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
            {page.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              {page.intro}
            </p>

            <div className="mt-8 space-y-8">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-semibold text-teal-900">
                    {section.heading}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            {page.relatedLinks && page.relatedLinks.length > 0 ? (
              <div className="mt-10 flex flex-wrap gap-3">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-teal-700 px-4 py-2 text-sm font-medium text-teal-800 transition-colors hover:bg-teal-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-teal-900">Highlights</h2>
              <ul className="mt-4 space-y-3">
                {page.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-slate-600"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-sm font-medium text-slate-800">Need assistance?</p>
                <p className="mt-2 text-sm text-slate-600">
                  Call{" "}
                  <a
                    href={`tel:${APPOINTMENT_PHONE_TEL}`}
                    className="font-medium text-teal-800 hover:underline"
                  >
                    {APPOINTMENT_PHONE}
                  </a>{" "}
                  or visit {HOSPITAL_NAME}, Parbhani.
                </p>
                <Link
                  href="/appointment"
                  className="mt-4 inline-flex rounded-full bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
                >
                  Book appointment
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
