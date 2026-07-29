"use client";

import { PersonnelAboutInsetUpload } from "@/components/personnel/personnel-about-inset-upload";
import { getDoctorBySlug } from "@/lib/doctors";
import {
  DEFAULT_PROFILE_AVAILABILITY,
  DEFAULT_PROFILE_LANGUAGES,
  getDefaultExpertiseTags,
  parseDoctorProfileSettings,
} from "@/lib/doctor-profile-settings";
import type { PersonnelAccount } from "@/lib/db/schema";
import { getPersonnelAccountSlug } from "@/lib/personnel-accounts";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type PersonnelPublicProfileEditorProps = {
  account: PersonnelAccount;
  canEdit: boolean;
  backHref?: string;
  backLabel?: string;
};

export function PersonnelPublicProfileEditor({
  account,
  canEdit,
  backHref,
  backLabel = "Back",
}: PersonnelPublicProfileEditorProps) {
  const slug = getPersonnelAccountSlug(account);
  const staticDoctor = getDoctorBySlug(slug);
  const profileSettings = parseDoctorProfileSettings(account.profileSettings);

  const defaultTags = useMemo(() => {
    if (staticDoctor) {
      return getDefaultExpertiseTags(staticDoctor).join(", ");
    }

    return "";
  }, [staticDoctor]);

  const [showAboutInset, setShowAboutInset] = useState(
    profileSettings.showAboutInset ?? Boolean(profileSettings.aboutInsetUrl),
  );
  const [expertiseTags, setExpertiseTags] = useState(
    profileSettings.expertiseTags?.join(", ") ?? defaultTags,
  );
  const [languages, setLanguages] = useState(
    profileSettings.languages ?? DEFAULT_PROFILE_LANGUAGES,
  );
  const [availability, setAvailability] = useState(
    profileSettings.availability ?? DEFAULT_PROFILE_AVAILABILITY,
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canEdit) {
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
        body: JSON.stringify({
          accountId: account.id,
          profileSettings: {
            showAboutInset,
            expertiseTags: expertiseTags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
            languages,
            availability,
          },
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to save profile page settings.");
      }

      setMessage("Public profile page settings saved.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save profile page settings.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {backHref ? (
        <Link
          href={backHref}
          className="inline-flex text-sm font-medium text-teal-700 transition hover:text-teal-600"
        >
          ← {backLabel}
        </Link>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Public profile page
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Customize how {account.name}&apos;s profile appears on the hospital
            website. Photos are stored in a dedicated blob folder for this
            doctor.
          </p>
          {staticDoctor ? (
            <Link
              href={`/team-of-doctors/${slug}`}
              target="_blank"
              className="mt-2 inline-flex text-sm font-medium text-teal-700 transition hover:text-teal-600"
            >
              View live profile →
            </Link>
          ) : null}
        </div>

        <div className="grid gap-8 lg:grid-cols-[12rem_1fr]">
          <PersonnelAboutInsetUpload
            accountId={account.id}
            aboutInsetUrl={profileSettings.aboutInsetUrl}
            showAboutInset={showAboutInset}
            disabled={!canEdit}
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                checked={showAboutInset}
                disabled={!canEdit || !profileSettings.aboutInsetUrl}
                onChange={(event) => setShowAboutInset(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <span className="text-sm text-slate-700">
                <span className="font-medium text-slate-900">
                  Show layered about photo
                </span>
                <span className="mt-1 block text-slate-500">
                  Displays the uploaded inset image over your portrait in the
                  About section.
                </span>
              </span>
            </label>

            <div>
              <label
                htmlFor="expertiseTags"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Expertise tags
              </label>
              <input
                id="expertiseTags"
                type="text"
                value={expertiseTags}
                disabled={!canEdit}
                onChange={(event) => setExpertiseTags(event.target.value)}
                placeholder="Orthoscopy, Orthoplasty, Spine"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:bg-slate-100"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Comma-separated tags shown below the details grid.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="languages"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Languages
                </label>
                <input
                  id="languages"
                  type="text"
                  value={languages}
                  disabled={!canEdit}
                  onChange={(event) => setLanguages(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:bg-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="availability"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Availability
                </label>
                <input
                  id="availability"
                  type="text"
                  value={availability}
                  disabled={!canEdit}
                  onChange={(event) => setAvailability(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:bg-slate-100"
                />
              </div>
            </div>

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

            {canEdit ? (
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save profile page settings"}
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
