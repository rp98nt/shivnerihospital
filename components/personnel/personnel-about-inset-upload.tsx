"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type PersonnelAboutInsetUploadProps = {
  accountId: string;
  aboutInsetUrl?: string | null;
  showAboutInset?: boolean;
  disabled?: boolean;
};

export function PersonnelAboutInsetUpload({
  accountId,
  aboutInsetUrl,
  showAboutInset = true,
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
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[14rem] overflow-visible rounded-2xl bg-slate-100 shadow-sm">
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-b from-teal-50 to-slate-100">
          <div className="flex h-full items-center justify-center px-6 text-center text-xs text-slate-500">
            Portrait photo appears here on the public page
          </div>
        </div>

        {aboutInsetUrl && showAboutInset !== false ? (
          <div className="absolute bottom-[14%] -right-3 z-10 w-[58%] overflow-hidden rounded-xl border-2 border-amber-200 bg-white shadow-lg">
            <Image
              src={aboutInsetUrl}
              alt="About section inset preview"
              width={640}
              height={480}
              className="aspect-[4/3] h-auto w-full object-cover object-center"
              sizes="8rem"
            />
          </div>
        ) : null}
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
        Stored in your doctor media folder on blob storage. This smaller photo
        overlays the portrait in the About section on your public profile page.
      </p>

      {error ? (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
