"use client";

import { PersonnelDoctorPhoto } from "@/components/personnel/personnel-doctor-photo";
import { PersonnelPublicProfileEditor } from "@/components/personnel/personnel-public-profile-editor";
import { formatPersonnelRoleLabel } from "@/lib/personnel-access";
import type { PersonnelAccount } from "@/lib/db/schema";
import { FormEvent, useState } from "react";

type PersonnelProfileFormProps = {
  account: PersonnelAccount;
};

export function PersonnelProfileForm({ account }: PersonnelProfileFormProps) {
  const [specialty, setSpecialty] = useState(account.specialty ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isDoctor = account.role === "doctor";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isDoctor) {
      return;
    }

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/personnel/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ specialty }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to save profile.");
      }

      setMessage("Profile updated successfully.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">My profile</h2>
          <p className="mt-1 text-sm text-slate-500">
            Update your professional details. Name and role can only be changed
            by hospital administration.
          </p>
        </div>

        {isDoctor ? (
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Profile photo
            </p>
            <p className="mb-3 text-xs text-slate-500">
              Used in the profile hero, team cards, and header avatar — not the
              About section background.
            </p>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[12rem] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:max-w-[14rem]">
              <PersonnelDoctorPhoto doctor={account} canUpload layout="profile" />
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              value={account.name}
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Role
            </label>
            <input
              type="text"
              value={formatPersonnelRoleLabel(account.role)}
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-600"
            />
          </div>

          {isDoctor ? (
            <div>
              <label
                htmlFor="specialty"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Specialty
              </label>
              <input
                id="specialty"
                type="text"
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value)}
                placeholder="e.g. Cardiology"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          ) : null}

          {error ? (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="rounded-lg bg-teal-50 px-3 py-2 text-sm text-teal-700">
              {message}
            </p>
          ) : null}

          {isDoctor ? (
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          ) : null}
        </form>
      </div>

      {isDoctor ? (
        <PersonnelPublicProfileEditor account={account} canEdit />
      ) : null}
    </div>
  );
}
