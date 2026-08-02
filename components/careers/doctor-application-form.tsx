"use client";

import { HOSPITAL_NAME } from "@/lib/hospital-contact";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef, useState, type RefObject } from "react";

const MEDICAL_SPECIALTIES = [
  "Cardiology",
  "Chest Medicine",
  "Critical Care",
  "Emergency Medicine",
  "General Surgery",
  "Medicine",
  "Nephrology",
  "Neuro-Surgery",
  "Oncosurgery",
  "Orthopaedics",
  "Pathology",
  "Radiology",
  "Gynaecology",
  "Paediatrics",
  "Anaesthesiology",
  "Physiotherapy",
  "Other",
];

const DEGREE_OPTIONS = [
  "MBBS",
  "MD",
  "MS",
  "DM",
  "MCh",
  "DNB",
  "FCPS",
  "Diploma",
  "PhD",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10–15 years",
  "15+ years",
];

const TITLE_OPTIONS = ["Dr.", "Prof.", "Mr.", "Ms.", "Mrs."];

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Visiting Consultant",
  "Telehealth",
] as const;

const SHIFT_OPTIONS = ["Morning", "Evening", "Night", "Flexible"] as const;

const PROGRESS_STEPS = [
  "Personal Information",
  "Professional Credentials",
  "Documents Upload",
] as const;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80";

const INPUT_CLASS =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";

const LABEL_CLASS = "mb-1.5 block text-sm font-medium text-slate-700";

type UploadField = "cv" | "license" | "certification";

type UploadState = {
  file: File | null;
  error: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UPLOAD_CONFIG: Record<
  UploadField,
  { label: string; required: boolean; accept: string; hint: string }
> = {
  cv: {
    label: "Curriculum Vitae (CV) / Resume",
    required: true,
    accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    hint: "PDF, DOCX (Max. 5MB)",
  },
  license: {
    label: "Medical License Certificate",
    required: true,
    accept: ".pdf,.jpg,.jpeg,.png,image/jpeg,image/png,application/pdf",
    hint: "PDF, JPG, PNG (Max. 5MB)",
  },
  certification: {
    label: "Board Certification / Fellowship (Optional)",
    required: false,
    accept: ".pdf,.jpg,.jpeg,.png,image/jpeg,image/png,application/pdf",
    hint: "PDF, JPG, PNG (Max. 5MB)",
  },
};

function validateUpload(file: File, field: UploadField): string {
  const config = UPLOAD_CONFIG[field];
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (file.size > MAX_FILE_SIZE) {
    return "File must be 5 MB or smaller.";
  }

  if (field === "cv") {
    if (!["pdf", "doc", "docx"].includes(extension)) {
      return "Upload a PDF or DOCX file.";
    }
    return "";
  }

  if (!["pdf", "jpg", "jpeg", "png"].includes(extension)) {
    return "Upload a PDF, JPG, or PNG file.";
  }

  return "";
}

export function DoctorApplicationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>(["Full-time"]);
  const [preferredShift, setPreferredShift] = useState<string>("Morning");
  const [uploads, setUploads] = useState<Record<UploadField, UploadState>>({
    cv: { file: null, error: "" },
    license: { file: null, error: "" },
    certification: { file: null, error: "" },
  });

  const cvInputRef = useRef<HTMLInputElement>(null);
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const certificationInputRef = useRef<HTMLInputElement>(null);

  const uploadRefs: Record<UploadField, RefObject<HTMLInputElement | null>> = {
    cv: cvInputRef,
    license: licenseInputRef,
    certification: certificationInputRef,
  };

  function toggleEmploymentType(type: string) {
    setEmploymentTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  }

  function handleUploadChange(field: UploadField, file: File | null) {
    if (!file) {
      setUploads((current) => ({
        ...current,
        [field]: { file: null, error: "" },
      }));
      return;
    }

    const error = validateUpload(file, field);
    setUploads((current) => ({
      ...current,
      [field]: { file: error ? null : file, error },
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextUploads = { ...uploads };
    let hasUploadError = false;

    (["cv", "license"] as UploadField[]).forEach((field) => {
      if (!nextUploads[field].file) {
        nextUploads[field] = {
          file: null,
          error: "This document is required.",
        };
        hasUploadError = true;
      }
    });

    if (employmentTypes.length === 0) {
      hasUploadError = true;
    }

    if (hasUploadError) {
      setUploads(nextUploads);
      setActiveStep(2);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-teal-100 bg-white p-8 text-center shadow-sm sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Application Submitted
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Thank you for applying to {HOSPITAL_NAME}. Our HR team will review
          your application and contact you within 5–7 working days.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-100 bg-[#f8fbfd] px-4 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/shivneri-logo.png"
              alt=""
              width={44}
              height={44}
              className="h-10 w-auto object-contain"
            />
            <div>
              <p className="text-sm font-bold tracking-wide text-teal-900 sm:text-base">
                SHIVNERI HOSPITAL
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-teal-700/80 sm:text-[11px]">
                Compassion • Care • Excellence
              </p>
            </div>
          </Link>

          <p className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
            <ShieldIcon className="h-4 w-4 text-teal-600" />
            Your information is safe and secure
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_220px] lg:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Apply as a Doctor
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
              Join our team of dedicated healthcare professionals.
            </p>
          </div>

          <div className="relative hidden h-36 overflow-hidden rounded-xl bg-slate-100 lg:block">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              className="object-cover object-center"
              sizes="220px"
            />
          </div>
        </div>

        <nav
          className="mt-8 grid gap-2 sm:grid-cols-3"
          aria-label="Application progress"
        >
          {PROGRESS_STEPS.map((step, index) => (
            <button
              key={step}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition sm:text-sm ${
                index === activeStep
                  ? "bg-teal-700 text-white"
                  : index < activeStep
                    ? "bg-teal-50 text-teal-800"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              <span
                className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  index === activeStep
                    ? "bg-white text-teal-700"
                    : index < activeStep
                      ? "bg-teal-700 text-white"
                      : "bg-white text-slate-400"
                }`}
              >
                {index + 1}
              </span>
              <span className="leading-tight">{step}</span>
            </button>
          ))}
        </nav>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-6 sm:px-8 sm:py-8">
        {activeStep === 0 ? (
          <FormSection
            number={1}
            title="Personal & Contact Information"
            icon={<UserIcon className="h-5 w-5" />}
            illustration={<HeartbeatIllustration />}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className={LABEL_CLASS}>Title</span>
                <select name="title" className={INPUT_CLASS} defaultValue="Dr.">
                  {TITLE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-1">
                <span className={LABEL_CLASS}>
                  Full Name <RequiredMark />
                </span>
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className={INPUT_CLASS}
                />
              </label>

              <label className="block sm:col-span-1">
                <span className={LABEL_CLASS}>
                  Email Address <RequiredMark />
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className={INPUT_CLASS}
                />
              </label>

              <label className="block sm:col-span-1">
                <span className={LABEL_CLASS}>
                  Phone Number <RequiredMark />
                </span>
                <div className="flex overflow-hidden rounded-lg border border-slate-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20">
                  <span className="inline-flex items-center gap-1 border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
                    <span aria-hidden>🇮🇳</span>
                    +91
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit number"
                    className="min-w-0 flex-1 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="block sm:col-span-2">
                <span className={LABEL_CLASS}>
                  Current Location / City <RequiredMark />
                </span>
                <input
                  name="city"
                  type="text"
                  required
                  placeholder="Enter your city"
                  className={INPUT_CLASS}
                />
              </label>

              <label className="block sm:col-span-1">
                <span className={LABEL_CLASS}>LinkedIn Profile URL</span>
                <div className="relative">
                  <LinkedInIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={`${INPUT_CLASS} pl-10`}
                  />
                </div>
              </label>

              <label className="block sm:col-span-1">
                <span className={LABEL_CLASS}>Personal Website (if any)</span>
                <div className="relative">
                  <GlobeIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    className={`${INPUT_CLASS} pl-10`}
                  />
                </div>
              </label>
            </div>
          </FormSection>
        ) : null}

        {activeStep === 1 ? (
          <>
            <FormSection
              number={2}
              title="Professional Qualifications"
              icon={<GraduationIcon className="h-5 w-5" />}
              illustration={<CertificateIllustration />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className={LABEL_CLASS}>
                    Medical Specialty <RequiredMark />
                  </span>
                  <select name="specialty" required className={INPUT_CLASS} defaultValue="">
                    <option value="" disabled>
                      Select Specialty
                    </option>
                    {MEDICAL_SPECIALTIES.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block sm:col-span-1">
                  <span className={LABEL_CLASS}>
                    Sub-specialty / Area of Expertise
                  </span>
                  <input
                    name="subSpecialty"
                    type="text"
                    placeholder="Enter your sub-specialty or expertise"
                    className={INPUT_CLASS}
                  />
                </label>

                <label className="block sm:col-span-1">
                  <span className={LABEL_CLASS}>
                    Medical License Number <RequiredMark />
                  </span>
                  <input
                    name="licenseNumber"
                    type="text"
                    required
                    placeholder="Enter license number"
                    className={INPUT_CLASS}
                  />
                </label>

                <label className="block sm:col-span-1">
                  <span className={LABEL_CLASS}>
                    Issuing State / Country Authority <RequiredMark />
                  </span>
                  <input
                    name="issuingAuthority"
                    type="text"
                    required
                    placeholder="Enter issuing authority"
                    className={INPUT_CLASS}
                  />
                </label>

                <label className="block sm:col-span-1">
                  <span className={LABEL_CLASS}>
                    Years of Experience <RequiredMark />
                  </span>
                  <select
                    name="experience"
                    required
                    className={INPUT_CLASS}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select experience
                    </option>
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block sm:col-span-1">
                  <span className={LABEL_CLASS}>
                    Highest Degree Obtained <RequiredMark />
                  </span>
                  <select name="degree" required className={INPUT_CLASS} defaultValue="">
                    <option value="" disabled>
                      Select degree
                    </option>
                    {DEGREE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className={LABEL_CLASS}>
                    University / Institution <RequiredMark />
                  </span>
                  <input
                    name="university"
                    type="text"
                    required
                    placeholder="Enter university / institution name"
                    className={INPUT_CLASS}
                  />
                </label>
              </div>
            </FormSection>

            <FormSection
              number={3}
              title="Practice Preferences & Availability"
              icon={<ClockIcon className="h-5 w-5" />}
              illustration={<CalendarIllustration />}
              className="mt-6"
            >
              <div className="space-y-5">
                <fieldset>
                  <legend className={LABEL_CLASS}>
                    Employment Type <RequiredMark />
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {EMPLOYMENT_TYPES.map((type) => (
                      <label
                        key={type}
                        className="inline-flex items-center gap-2 text-sm text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={employmentTypes.includes(type)}
                          onChange={() => toggleEmploymentType(type)}
                          className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className={LABEL_CLASS}>
                    Preferred Shift / Timing <RequiredMark />
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {SHIFT_OPTIONS.map((shift) => (
                      <label
                        key={shift}
                        className="inline-flex items-center gap-2 text-sm text-slate-700"
                      >
                        <input
                          type="radio"
                          name="preferredShift"
                          value={shift}
                          checked={preferredShift === shift}
                          onChange={() => setPreferredShift(shift)}
                          className="h-4 w-4 border-slate-300 text-teal-700 focus:ring-teal-500"
                        />
                        {shift}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block max-w-xs">
                  <span className={LABEL_CLASS}>
                    Expected Joining Date <RequiredMark />
                  </span>
                  <input
                    name="joiningDate"
                    type="date"
                    required
                    className={INPUT_CLASS}
                  />
                </label>
              </div>
            </FormSection>
          </>
        ) : null}

        {activeStep === 2 ? (
          <FormSection
            number={4}
            title="Document Uploads"
            icon={<DocumentIcon className="h-5 w-5" />}
          >
            <div className="space-y-4">
              {(Object.keys(UPLOAD_CONFIG) as UploadField[]).map((field) => {
                const config = UPLOAD_CONFIG[field];
                const state = uploads[field];

                return (
                  <div key={field}>
                    <p className={LABEL_CLASS}>
                      {config.label}{" "}
                      {config.required ? <RequiredMark /> : null}
                    </p>
                    <button
                      type="button"
                      onClick={() => uploadRefs[field].current?.click()}
                      className="mt-1 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:border-teal-400 hover:bg-teal-50/40"
                    >
                      <UploadCloudIcon className="h-8 w-8 text-teal-600" />
                      <span className="mt-2 text-sm font-medium text-teal-700">
                        {state.file
                          ? state.file.name
                          : "Click or tap to upload"}
                      </span>
                      <span className="mt-1 text-xs text-slate-500">
                        {config.hint}
                      </span>
                    </button>
                    <input
                      ref={uploadRefs[field]}
                      type="file"
                      accept={config.accept}
                      className="sr-only"
                      onChange={(event) =>
                        handleUploadChange(
                          field,
                          event.target.files?.[0] ?? null,
                        )
                      }
                    />
                    {state.error ? (
                      <p className="mt-1.5 text-xs text-red-600">{state.error}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </FormSection>
        ) : null}

        <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-4">
            <p className="inline-flex items-start gap-2 text-sm leading-relaxed text-teal-900">
              <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
              <span>
                <strong>Privacy &amp; Confidentiality:</strong> We ensure that
                your personal and professional information is kept confidential
                and used only for recruitment purposes in compliance with
                applicable data protection laws.
              </span>
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
              disabled={activeStep === 0}
              className="inline-flex items-center justify-center rounded-lg border border-teal-700 px-5 py-2.5 text-sm font-semibold text-teal-800 transition enabled:hover:bg-teal-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
            >
              <ChevronLeftIcon className="mr-1 h-4 w-4" />
              Previous
            </button>

            {activeStep < PROGRESS_STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setActiveStep((step) =>
                    Math.min(step + 1, PROGRESS_STEPS.length - 1),
                  )
                }
                className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
              >
                Continue
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
              >
                <LockIcon className="mr-2 h-4 w-4" />
                Review &amp; Submit Application
              </button>
            )}
          </div>
        </div>

        <p className="mt-3 text-right text-xs text-slate-500">
          Please review all details before submitting your application.
        </p>
      </form>
    </div>
  );
}

function FormSection({
  number,
  title,
  icon,
  illustration,
  className = "",
  children,
}: {
  number: number;
  title: string;
  icon: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`overflow-hidden rounded-xl border border-slate-200 ${className}`}
    >
      <div className="grid lg:grid-cols-[220px_1fr]">
        <div className="border-b border-slate-100 bg-[#f8fbfd] px-5 py-5 lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-white">
              {icon}
            </span>
            <h2 className="mt-4 text-lg font-semibold leading-snug text-slate-900">
              {number}. {title}
            </h2>
            {illustration ? (
              <div className="mt-auto hidden pt-6 lg:block">{illustration}</div>
            ) : null}
          </div>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </section>
  );
}

function RequiredMark() {
  return <span className="text-red-500">*</span>;
}

function HeartbeatIllustration() {
  return (
    <svg viewBox="0 0 180 48" className="h-12 w-full text-teal-600/50" aria-hidden>
      <path
        d="M0 24 H36 L42 12 L48 36 L54 24 H180"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function CertificateIllustration() {
  return (
    <svg viewBox="0 0 120 80" className="mx-auto h-16 w-24 text-teal-600/35" aria-hidden>
      <rect x="8" y="8" width="104" height="64" rx="6" fill="currentColor" opacity="0.15" />
      <rect x="20" y="22" width="56" height="4" rx="2" fill="currentColor" />
      <rect x="20" y="34" width="80" height="4" rx="2" fill="currentColor" />
      <circle cx="88" cy="52" r="10" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function CalendarIllustration() {
  return (
    <svg viewBox="0 0 120 80" className="mx-auto h-16 w-24 text-teal-600/35" aria-hidden>
      <rect x="16" y="14" width="88" height="58" rx="6" fill="currentColor" opacity="0.15" />
      <rect x="16" y="14" width="88" height="14" rx="6" fill="currentColor" opacity="0.35" />
      <rect x="28" y="38" width="12" height="12" rx="2" fill="currentColor" />
      <rect x="48" y="38" width="12" height="12" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="68" y="38" width="12" height="12" rx="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

function GraduationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 8 12 3l9 5-9 5-9-5Z" />
      <path d="M6 10v5c0 2 3 4 6 4s6-2 6-4v-5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h8" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3 4 7v6c0 5 3.5 8 8 8s8-3 8-8V7l-8-4Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.8v2.05h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.15V23h-4v-7.2c0-1.72-.03-3.92-2.39-3.92-2.39 0-2.75 1.87-2.75 3.8V23h-4V8Z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function UploadCloudIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 16V7" strokeLinecap="round" />
      <path d="m8 11 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17a4 4 0 0 0 4 4h8a4 4 0 0 0 0-8h-1" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
