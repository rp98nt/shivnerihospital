import { del, put } from "@vercel/blob";

const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export function isBlobStorageConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function validatePersonnelPhoto(file: File) {
  if (!ALLOWED_PHOTO_TYPES.has(file.type)) {
    return "Only JPEG, PNG, WebP, and GIF images are allowed.";
  }

  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    return "Image must be 5 MB or smaller.";
  }

  return null;
}

export async function uploadPersonnelPhoto({
  file,
  pathname,
}: {
  file: File;
  pathname: string;
}) {
  if (!isBlobStorageConfigured()) {
    throw new Error("Blob storage is not configured.");
  }

  const validationError = validatePersonnelPhoto(file);
  if (validationError) {
    throw new Error(validationError);
  }

  return put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export async function deletePersonnelPhoto(url: string | null | undefined) {
  if (!url || !isBlobStorageConfigured()) {
    return;
  }

  try {
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (error) {
    console.error("Failed to delete blob photo:", error);
  }
}

export function buildDoctorPhotoPath(slug: string, fileName: string) {
  return buildDoctorMediaPath(slug, "headshot", fileName);
}

export function buildDoctorMediaPath(
  slug: string,
  mediaType: "headshot" | "about-background" | "about-inset",
  fileName: string,
) {
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";
  return `personnel/doctors/${slug}/${mediaType}.${extension}`;
}
