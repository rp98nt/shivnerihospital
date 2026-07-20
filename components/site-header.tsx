import Image from "next/image";
import Link from "next/link";

const PHONE = "+910000000000";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-teal-900 transition-opacity hover:opacity-90"
        >
          <Image
            src="/shivneri-logo.png"
            alt=""
            width={44}
            height={44}
            className="h-10 w-auto object-contain sm:h-11"
            priority
          />
          <span
            className="h-8 w-px shrink-0 bg-slate-300 sm:h-9"
            aria-hidden
          />
          <span className="text-lg font-bold tracking-tight">
            Shivneri Hospital
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="#" className="hover:text-teal-800">
            Find a Doctor
          </Link>
          <Link href="#" className="hover:text-teal-800">
            Departments
          </Link>
          <Link href="#" className="hover:text-teal-800">
            Book Appointment
          </Link>
          <Link href="#" className="hover:text-teal-800">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${PHONE}`}
            className="hidden text-sm font-semibold text-red-600 sm:inline"
          >
            24/7 Emergency
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-amber-300 sm:px-4 sm:text-sm"
          >
            <PhoneIcon className="h-4 w-4" />
            Call Us
          </a>
        </div>
      </div>
    </header>
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
