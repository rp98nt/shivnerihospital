import { createCircularIcon } from "@/lib/circular-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const body = await createCircularIcon(32);

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
