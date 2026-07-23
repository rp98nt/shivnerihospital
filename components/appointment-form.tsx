"use client";

import { DOCTORS } from "@/lib/doctors";
import Link from "next/link";
import { FormEvent, useState } from "react";

type AppointmentFormProps = {
  initialDoctorSlug?: string;
};

export function AppointmentForm({ initialDoctorSlug = "" }: AppointmentFormProps) {
  const validInitialDoctor = DOCTORS.some(
    (doctor) => doctor.slug === initialDoctorSlug,
  )
    ? initialDoctorSlug
    : "";
  const [otpSent, setOtpSent] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(validInitialDoctor);

  function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    setOtpSent(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 text-slate-800 shadow-xl sm:p-7"
    >
      <h1 className="text-center text-lg font-semibold text-slate-900 sm:text-xl">
        Book an Appointment
      </h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Share your details and we&apos;ll confirm your slot with the selected doctor.
      </p>

      <div className="mt-5 space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Select Doctor
          </span>
          <select
            name="doctor"
            value={selectedDoctor}
            onChange={(event) => setSelectedDoctor(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            required
          >
            <option value="" disabled>
              Choose a doctor
            </option>
            {DOCTORS.map((doctor) => (
              <option key={doctor.slug} value={doctor.slug}>
                {doctor.name} — {doctor.specialty}
              </option>
            ))}
          </select>
        </label>

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

      <p className="mt-4 text-center text-sm text-slate-500">
        <Link href="/" className="font-medium text-teal-700 hover:text-teal-800">
          Back to home
        </Link>
      </p>
    </form>
  );
}
