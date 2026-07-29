"use client";

import { DoctorAboutExperienceBadge } from "@/components/doctor-about-experience-badge";
import { DoctorAboutInsetOverlay } from "@/components/doctor-about-inset-overlay";
import { DoctorAvatar } from "@/components/doctor-avatar";
import {
  type AboutInsetPosition,
  normalizeExperienceBadgePosition,
} from "@/lib/about-inset-position";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type MediaType = "about-background" | "about-inset";

type PersonnelAboutSectionEditorProps = {
  accountId: string;
  doctorName: string;
  headshotUrl?: string | null;
  aboutBackgroundUrl?: string | null;
  aboutInsetUrl?: string | null;
  showAboutInset?: boolean;
  insetPosition: AboutInsetPosition;
  onInsetPositionChange: (position: AboutInsetPosition) => void;
  showExperienceBadge?: boolean;
  experienceBadgeValue?: string;
  experienceBadgeLabel?: string;
  experienceBadgePosition: AboutInsetPosition;
  onExperienceBadgePositionChange: (position: AboutInsetPosition) => void;
  disabled?: boolean;
};

export function PersonnelAboutSectionEditor({
  accountId,
  doctorName,
  headshotUrl,
  aboutBackgroundUrl,
  aboutInsetUrl,
  showAboutInset = true,
  insetPosition,
  onInsetPositionChange,
  showExperienceBadge = true,
  experienceBadgeValue = "",
  experienceBadgeLabel = "Years Of Experience",
  experienceBadgePosition,
  onExperienceBadgePositionChange,
  disabled = false,
}: PersonnelAboutSectionEditorProps) {
  const router = useRouter();
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const insetInputRef = useRef<HTMLInputElement>(null);
  const [uploadingType, setUploadingType] = useState<MediaType | null>(null);
  const [removingType, setRemovingType] = useState<MediaType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const previewBackgroundUrl = aboutBackgroundUrl ?? headshotUrl ?? null;
  const usingHeadshotFallback = !aboutBackgroundUrl && Boolean(headshotUrl);

  async function handleUpload(mediaType: MediaType, file: File) {
    setUploadingType(mediaType);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("accountId", accountId);
      formData.append("file", file);
      formData.append("mediaType", mediaType);

      const response = await fetch("/api/personnel/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      router.refresh();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setUploadingType(null);
    }
  }

  async function handleRemove(mediaType: MediaType) {
    setRemovingType(mediaType);
    setError(null);

    try {
      const response = await fetch("/api/personnel/profile-media", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId, mediaType }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to remove photo.");
      }

      router.refresh();
    } catch (removeError) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : "Unable to remove photo.",
      );
    } finally {
      setRemovingType(null);
    }
  }

  const isBusy = uploadingType !== null || removingType !== null;
  const previewExperienceBadge =
    showExperienceBadge && experienceBadgeValue.trim()
      ? {
          value: experienceBadgeValue.trim(),
          label: experienceBadgeLabel.trim() || "Years Of Experience",
        }
      : undefined;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          About section preview
        </p>
        <div className="relative mx-auto mt-3 aspect-[4/5] w-full max-w-[14rem] overflow-visible pr-4">
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-b from-teal-50 to-slate-100 shadow-sm">
            {previewBackgroundUrl ? (
              <Image
                src={previewBackgroundUrl}
                alt={`${doctorName} about section background`}
                fill
                className="object-cover object-[center_22%]"
                sizes="14rem"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-xs text-slate-500">
                <DoctorAvatar
                  name={doctorName}
                  photoUrl={null}
                  size="lg"
                  tone="teal"
                />
              </div>
            )}
          </div>

          {previewExperienceBadge ? (
            <DoctorAboutExperienceBadge
              value={previewExperienceBadge.value}
              label={previewExperienceBadge.label}
              position={experienceBadgePosition}
              draggable={!disabled}
              onPositionChange={onExperienceBadgePositionChange}
            />
          ) : null}

          {aboutInsetUrl && showAboutInset !== false ? (
            <DoctorAboutInsetOverlay
              aboutInsetUrl={aboutInsetUrl}
              alt="About section overlay preview"
              position={insetPosition}
              draggable={!disabled}
              onPositionChange={onInsetPositionChange}
              sizes="8rem"
            />
          ) : null}
        </div>
        {usingHeadshotFallback ? (
          <p className="mt-2 text-xs text-slate-500">
            Using your profile photo as the background until an About background
            is uploaded.
          </p>
        ) : null}
      </div>

      <MediaControl
        title="About background"
        description="Large portrait behind the overlay in the About section. Can differ from your main profile photo."
        uploadLabel={
          aboutBackgroundUrl ? "Change background" : "Upload background"
        }
        uploading={uploadingType === "about-background"}
        removing={removingType === "about-background"}
        disabled={disabled || isBusy}
        hasImage={Boolean(aboutBackgroundUrl)}
        inputRef={backgroundInputRef}
        onUpload={(file) => void handleUpload("about-background", file)}
        onRemove={() => void handleRemove("about-background")}
      />

      <MediaControl
        title="About overlay"
        description="Smaller photo placed on top of the background. Drag it in the preview to reposition — it can extend slightly past the background edges."
        uploadLabel={aboutInsetUrl ? "Change overlay" : "Upload overlay"}
        uploading={uploadingType === "about-inset"}
        removing={removingType === "about-inset"}
        disabled={disabled || isBusy}
        hasImage={Boolean(aboutInsetUrl)}
        inputRef={insetInputRef}
        onUpload={(file) => void handleUpload("about-inset", file)}
        onRemove={() => void handleRemove("about-inset")}
      />

      {error ? (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function MediaControl({
  title,
  description,
  uploadLabel,
  uploading,
  removing,
  disabled,
  hasImage,
  inputRef,
  onUpload,
  onRemove,
}: {
  title: string;
  description: string;
  uploadLabel: string;
  uploading: boolean;
  removing: boolean;
  disabled: boolean;
  hasImage: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        {description}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onUpload(file);
          }
          event.target.value = "";
        }}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="rounded-xl bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {uploading ? "Uploading..." : uploadLabel}
        </button>

        {hasImage ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onRemove}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {removing ? "Removing..." : "Remove"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
