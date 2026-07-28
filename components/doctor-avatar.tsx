"use client";

import Image from "next/image";

type DoctorAvatarProps = {
  name: string;
  photoUrl?: string | null;
  size?: "sm" | "md" | "lg";
  tone?: "blue" | "teal";
  className?: string;
};

const SIZE_CLASSES = {
  sm: "h-9 w-9 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-32 w-32 text-4xl",
} as const;

const TONE_CLASSES = {
  blue: "bg-blue-100 text-blue-700",
  teal: "bg-teal-100 text-teal-700",
} as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DoctorAvatar({
  name,
  photoUrl,
  size = "sm",
  tone = "blue",
  className = "",
}: DoctorAvatarProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full ${SIZE_CLASSES[size]} ${!photoUrl ? TONE_CLASSES[tone] : "bg-slate-100"} ${className}`}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          fill
          className="object-cover object-[center_22%]"
          sizes={
            size === "lg" ? "8rem" : size === "md" ? "3rem" : "2.25rem"
          }
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-semibold">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}

export { getInitials as getDoctorInitials };
