"use client";

import {
  APPOINTMENT_PHONE,
  APPOINTMENT_PHONE_TEL,
  EMERGENCY_MOBILE,
  EMERGENCY_MOBILE_TEL,
  HOSPITAL_NAME,
  VISIT_LOCATION,
} from "@/lib/hospital-contact";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState, type ReactNode } from "react";

const FOOTER_BG_CLASS =
  "bg-linear-to-br from-teal-800 via-teal-900 to-slate-900";

const USEFUL_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Shivneri", href: "/about-us" },
  { label: "Patient Guide", href: "/" },
  { label: "Contact", href: "/appointment" },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Team of Doctors", href: "/team-of-doctors" },
];

const POPULAR_POSTS = [
  {
    title: "Managing Diabetes with Expert Care at Shivneri Hospital",
    date: "April 17, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Understanding Joint Replacement and Recovery Support",
    date: "April 10, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=200&q=80",
  },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className={`${FOOTER_BG_CLASS} text-white`}>
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_auto] lg:items-center lg:gap-10 lg:py-12">
          <div className="min-w-0">
            <h3 className="text-xl font-bold sm:text-2xl">Subscribe Now</h3>
            <span className="mt-2 block h-1 w-10 rounded-full bg-teal-400" />
            <p className="mt-3 text-sm leading-relaxed text-teal-100/85 sm:text-base">
              For any help mail us. 24/7 emergency services available at{" "}
              {HOSPITAL_NAME}.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter Your Email"
                required
                className="min-h-11 flex-1 rounded-lg border border-white/10 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="min-h-11 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-400"
              >
                Message
              </button>
            </form>
            {submitted ? (
              <p className="mt-2 text-sm text-lime-200">
                Thank you. We&apos;ll be in touch soon.
              </p>
            ) : null}
          </div>

          <div className="text-center lg:text-left">
            <p className="text-sm leading-relaxed text-teal-100/80">
              Compassionate multispecialty care for families across Parbhani and
              surrounding regions.
            </p>
            <p className="mt-3 text-3xl font-bold sm:text-4xl">25+ Specialists</p>
          </div>

          <div className="flex lg:justify-end">
            <Link
              href="/appointment"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-teal-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-teal-400"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="min-w-0">
            <h4 className="text-lg font-bold">About {HOSPITAL_NAME}</h4>
            <p className="mt-4 text-sm leading-relaxed text-teal-100/80">
              {HOSPITAL_NAME} provides trusted outpatient, inpatient, diagnostic,
              and emergency care with experienced consultants and modern
              facilities in Parbhani, Maharashtra.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <SocialLink href="#" label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="YouTube">
                <YouTubeIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="LinkedIn">
                <LinkedInIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="X">
                <XIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="text-lg font-bold">Useful Links</h4>
            <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
              {USEFUL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-start gap-2 text-sm text-teal-100/85 transition hover:text-white"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-lg font-bold">Popular Posts</h4>
            <ul className="mt-4 space-y-4">
              {POPULAR_POSTS.map((post) => (
                <li key={post.title}>
                  <Link
                    href="/"
                    className="group flex gap-3 transition hover:opacity-90"
                  >
                    <div
                      className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-teal-800"
                      aria-hidden
                    >
                      <Image
                        src={post.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-teal-100/70">{post.date}</p>
                      <p className="mt-1 text-sm font-medium leading-snug text-white group-hover:text-lime-200">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-lg font-bold">Get In Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-teal-100/85">
              <li>
                <span className="font-semibold text-white">Email:</span>{" "}
                <a
                  href="mailto:info@shivnerihospital.com"
                  className="break-all transition hover:text-white"
                >
                  info@shivnerihospital.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Appointment:</span>{" "}
                <a
                  href={`tel:${APPOINTMENT_PHONE_TEL}`}
                  className="transition hover:text-white"
                >
                  {APPOINTMENT_PHONE}
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Emergency:</span>{" "}
                <a
                  href={`tel:${EMERGENCY_MOBILE_TEL}`}
                  className="transition hover:text-white"
                >
                  {EMERGENCY_MOBILE}
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Location:</span>{" "}
                <a
                  href={VISIT_LOCATION.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  {VISIT_LOCATION.address}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-teal-100/75 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {HOSPITAL_NAME}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Designed with
            <HeartIcon className="h-4 w-4 text-red-500" />
            by AlienCore
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-teal-100 transition hover:border-teal-400 hover:text-white"
    >
      {children}
    </a>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v8h4v-8h3.4l.6-4H13V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C17.8 5 12 5 12 5s-5.8 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 9.2 2 12 2 12s0 2.8.4 4.8a2.5 2.5 0 0 0 1.8 1.8C6.2 19 12 19 12 19s5.8 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-2 .4-4.8.4-4.8s0-2.8-.4-4.8zM10 15.5V8.5L16 12l-6 3.5z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 8.5h3V19h-3V8.5zM8 4a1.8 1.8 0 1 1 0 3.6A1.8 1.8 0 0 1 8 4zM11 8.5h2.9v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V19h-3v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.4-2 2.7V19h-3V8.5z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5H19l-6.1 7 6.5 7h-4.8l-4-4.7L6.4 19H4l6.7-7.7L4.2 5h4.9l3.6 4.3L16.6 5z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
    </svg>
  );
}
