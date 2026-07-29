"use client";

import { useState } from "react";

type DoctorShareButtonProps = {
  doctorName: string;
  profilePath: string;
};

export function DoctorShareButton({
  doctorName,
  profilePath,
}: DoctorShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  async function handleShare(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const url = `${window.location.origin}${profilePath}`;
    const shareData: ShareData = {
      title: `${doctorName} | Shivneri Hospital`,
      text: `View ${doctorName} at Shivneri Hospital`,
      url,
    };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        return;
      }

      await copyLink(url);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      try {
        await copyLink(url);
      } catch {
        window.prompt("Copy this link:", url);
      }
    }
  }

  async function copyLink(url: string) {
    await navigator.clipboard.writeText(url);
    setStatus("copied");
    window.setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={
        status === "copied" ? "Link copied" : `Share ${doctorName}`
      }
      title={status === "copied" ? "Link copied" : `Share ${doctorName}`}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30"
    >
      {status === "copied" ? (
        <CheckIcon className="h-4 w-4 text-teal-600" />
      ) : (
        <ShareIcon className="h-4 w-4" />
      )}
    </button>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
