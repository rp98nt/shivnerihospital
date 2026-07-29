"use client";

import { DoctorAboutInsetOverlay } from "@/components/doctor-about-inset-overlay";
import { DoctorAvatar } from "@/components/doctor-avatar";
import type { AboutInsetPosition } from "@/lib/about-inset-position";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type PersonnelAboutInsetUploadProps = {
  accountId: string;
  doctorName: string;
  photoUrl?: string | null;
  aboutInsetUrl?: string | null;
  showAboutInset?: boolean;
  insetPosition: AboutInsetPosition;
  onInsetPositionChange: (position: AboutInsetPosition) => void;
  disabled?: boolean;
};

export function PersonnelAboutInsetUpload({
  accountId,
  doctorName,
  photoUrl,
  aboutInsetUrl,
  showAboutInset = true,
  insetPosition,
  onInsetPositionChange,
  disabled = false,
}: PersonnelAboutInsetUploadProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("accountId", accountId);
      formData.append("file", file);
      formData.append("mediaType", "about-inset");

      const response = await fetch("/api/personnel/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      router.refresh();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    setRemoving(true);
    setError(null);

    try {
      const response = await fetch("/api/personnel/profile-media", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
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
      setRemoving(false);
    }
  }

  const isBusy = uploading || removing;

  return (
    <div className="space-y-3">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[14rem] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-b from-teal-50 to-slate-100">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={doctorName}
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

          {aboutInsetUrl && showAboutInset !== false ? (
            <DoctorAboutInsetOverlay
              aboutInsetUrl={aboutInsetUrl}
              alt="About section inset preview"
              position={insetPosition}
              draggable={!disabled}
              onPositionChange={onInsetPositionChange}
              sizes="8rem"
            />
          ) : null}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={disabled || isBusy}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleUpload(file);
          }
          event.target.value = "";
        }}
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled || isBusy}
          onClick={() => inputRef.current?.click()}
          className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {uploading
            ? "Uploading..."
            : aboutInsetUrl
              ? "Change about photo"
              : "Upload about photo"}
        </button>

        {aboutInsetUrl ? (
          <button
            type="button"
            disabled={disabled || isBusy}
            onClick={() => void handleRemove()}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {removing ? "Removing..." : "Remove"}
          </button>
        ) : null}
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        Drag the overlay anywhere on the portrait, then save your profile page
        settings. Photos are stored in your doctor media folder on blob storage.
      </p>

      {error ? (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
