"use client";

import type { PersonnelAccount } from "@/lib/db/schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type PersonnelDoctorPhotoProps = {
  doctor: PersonnelAccount;
  canUpload?: boolean;
  layout?: "card" | "profile";
};

export function PersonnelDoctorPhoto({
  doctor,
  canUpload = false,
  layout = "card",
}: PersonnelDoctorPhotoProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("accountId", doctor.id);
      formData.append("file", file);

      const response = await fetch("/api/personnel/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        error?: string;
        photoUrl?: string;
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

  const imageClassName =
    layout === "profile"
      ? "object-contain object-center p-1"
      : "object-cover object-[center_22%]";

  return (
    <div className="relative h-full w-full">
      {doctor.photoUrl ? (
        <Image
          src={doctor.photoUrl}
          alt={doctor.name}
          fill
          className={imageClassName}
          sizes={
            layout === "profile"
              ? "(max-width: 640px) 12rem, 14rem"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      ) : (
        <PersonnelDoctorPhotoPlaceholder />
      )}

      {canUpload ? (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleUpload(file);
              }
              event.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {uploading ? "Uploading..." : doctor.photoUrl ? "Change photo" : "Upload photo"}
          </button>
        </>
      ) : null}

      {error ? (
        <p className="absolute bottom-12 left-3 right-3 rounded-lg bg-rose-500/90 px-2 py-1 text-center text-[10px] font-medium text-white">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function PersonnelDoctorPhotoPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-slate-500/70">
      <svg className="h-24 w-24" viewBox="0 0 64 64" fill="none" aria-hidden>
        <circle cx="32" cy="22" r="10" fill="currentColor" opacity="0.25" />
        <path
          d="M14 54c2.5-10 8.5-14 18-14s15.5 4 18 14"
          fill="currentColor"
          opacity="0.2"
        />
        <rect
          x="18"
          y="34"
          width="28"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
