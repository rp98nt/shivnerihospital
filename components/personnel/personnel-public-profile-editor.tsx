"use client";

import { PersonnelAboutSectionEditor } from "@/components/personnel/personnel-about-section-editor";
import { getDoctorBySlug } from "@/lib/doctors";
import {
  normalizeAboutInsetPosition,
  normalizeExperienceBadgePosition,
  type AboutInsetPosition,
} from "@/lib/about-inset-position";
import {
  DEFAULT_EXPERIENCE_BADGE_LABEL,
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
  const [insetPosition, setInsetPosition] = useState<AboutInsetPosition>(
    normalizeAboutInsetPosition({
      x: profileSettings.aboutInsetX,
      y: profileSettings.aboutInsetY,
    }),
  );
  const [showExperienceBadge, setShowExperienceBadge] = useState(
    profileSettings.showExperienceBadge ??
      Boolean(profileSettings.experienceBadgeValue),
  );
  const [experienceBadgeValue, setExperienceBadgeValue] = useState(
    profileSettings.experienceBadgeValue ?? "",
  );
  const [experienceBadgeLabel, setExperienceBadgeLabel] = useState(
    profileSettings.experienceBadgeLabel ?? DEFAULT_EXPERIENCE_BADGE_LABEL,
  );
  const [experienceBadgePosition, setExperienceBadgePosition] =
    useState<AboutInsetPosition>(
      normalizeExperienceBadgePosition({
        x: profileSettings.experienceBadgeX,
        y: profileSettings.experienceBadgeY,
      }),
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
            aboutInsetX: insetPosition.x,
            aboutInsetY: insetPosition.y,
            showExperienceBadge,
            experienceBadgeValue: experienceBadgeValue.trim(),
            experienceBadgeLabel: experienceBadgeLabel.trim(),
            experienceBadgeX: experienceBadgePosition.x,
            experienceBadgeY: experienceBadgePosition.y,
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
            Control the About section images and experience badge separately
            from your main profile photo.
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

        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <PersonnelAboutSectionEditor
            accountId={account.id}
            doctorName={account.name}
            headshotUrl={account.photoUrl}
            aboutBackgroundUrl={profileSettings.aboutBackgroundUrl}
            aboutInsetUrl={profileSettings.aboutInsetUrl}
            showAboutInset={showAboutInset}
            insetPosition={insetPosition}
            onInsetPositionChange={setInsetPosition}
            showExperienceBadge={showExperienceBadge}
            experienceBadgeValue={experienceBadgeValue}
            experienceBadgeLabel={experienceBadgeLabel}
            experienceBadgePosition={experienceBadgePosition}
            onExperienceBadgePositionChange={setExperienceBadgePosition}
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
                  About section. Drag it in the preview to choose placement.
                </span>
              </span>
            </label>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={showExperienceBadge}
                  disabled={!canEdit || !experienceBadgeValue.trim()}
                  onChange={(event) =>
                    setShowExperienceBadge(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-700">
                  <span className="font-medium text-slate-900">
                    Show experience badge
                  </span>
                  <span className="mt-1 block text-slate-500">
                    Small teal badge on the About photo. Drag it in the preview
                    to reposition — it can extend slightly past the background
                    edges.
                  </span>
                </span>
              </label>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="experienceBadgeValue"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Badge number
                  </label>
                  <input
                    id="experienceBadgeValue"
                    type="text"
                    value={experienceBadgeValue}
                    disabled={!canEdit}
                    onChange={(event) =>
                      setExperienceBadgeValue(event.target.value)
                    }
                    placeholder="15"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="experienceBadgeLabel"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Badge label
                  </label>
                  <input
                    id="experienceBadgeLabel"
                    type="text"
                    value={experienceBadgeLabel}
                    disabled={!canEdit}
                    onChange={(event) =>
                      setExperienceBadgeLabel(event.target.value)
                    }
                    placeholder="Years Of Experience"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:bg-slate-100"
                  />
                </div>
              </div>
            </div>

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
                placeholder="Arthroscopy, Arthroplasty, Spine"
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
