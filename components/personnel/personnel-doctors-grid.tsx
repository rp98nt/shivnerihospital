"use client";

import { DoctorAvatar } from "@/components/doctor-avatar";
import { PersonnelDoctorPhoto } from "@/components/personnel/personnel-doctor-photo";
import { getDoctorBySlug } from "@/lib/doctors";
import type { PersonnelAccount } from "@/lib/db/schema";
import { getPersonnelAccountSlug } from "@/lib/personnel-accounts";
import { useMemo, useState } from "react";

type PersonnelDoctorsGridProps = {
  doctors: PersonnelAccount[];
  canUploadPhotos?: boolean;
};

type StatusFilter = "all" | "available" | "unavailable";

export function PersonnelDoctorsGrid({
  doctors,
  canUploadPhotos = false,
}: PersonnelDoctorsGridProps) {
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const departments = useMemo(() => {
    const values = new Set(
      doctors
        .map((doctor) => doctor.specialty?.trim())
        .filter((value): value is string => Boolean(value)),
    );

    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [doctors]);

  const doctorCards = useMemo(
    () =>
      doctors.map((doctor) => {
        const slug = getPersonnelAccountSlug(doctor);
        const profile = getDoctorBySlug(slug);

        return {
          doctor,
          slug,
          profile,
          available: getDoctorAvailability(slug, profile?.isGuest),
        };
      }),
    [doctors],
  );

  const filteredDoctors = doctorCards.filter(({ doctor, available }) => {
    const matchesDepartment =
      department === "all" || doctor.specialty === department;
    const matchesStatus =
      status === "all" ||
      (status === "available" && available) ||
      (status === "unavailable" && !available);

    return matchesDepartment && matchesStatus;
  });

  if (doctors.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-900">No doctors found</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Doctor accounts will appear here once they are added to the personnel database.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <FilterSelect
          label="Department"
          value={department}
          onChange={setDepartment}
          options={[
            { value: "all", label: "All Departments" },
            ...departments.map((value) => ({ value, label: value })),
          ]}
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={(value) => setStatus(value as StatusFilter)}
          options={[
            { value: "all", label: "All Status" },
            { value: "available", label: "Available" },
            { value: "unavailable", label: "Unavailable" },
          ]}
        />

        <button
          type="button"
          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <span aria-hidden>+</span>
          Add Doctor
        </button>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">No doctors match the selected filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map(({ doctor, available }) => (
            <article
              key={doctor.id}
              className="flex min-h-[17.5rem] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative min-h-0 flex-[7] bg-linear-to-b from-slate-100 to-slate-200/80">
                <PersonnelDoctorPhoto doctor={doctor} canUpload={canUploadPhotos} />
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm ${
                    available ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                >
                  {available ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="flex min-h-0 flex-[3] flex-col items-center justify-center border-t border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <DoctorAvatar
                    name={doctor.name}
                    photoUrl={doctor.photoUrl}
                    size="sm"
                  />
                  <div className="min-w-0 text-left">
                    <h2 className="text-sm font-bold leading-snug text-slate-900">
                      {doctor.name}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {doctor.specialty ?? "Specialty not set"}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent pr-1 text-sm text-slate-700 outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function getDoctorAvailability(_slug: string, _isGuest?: boolean) {
  return false;
}
