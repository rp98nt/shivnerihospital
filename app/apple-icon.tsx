import { createCircularIcon } from "@/lib/circular-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const body = await createCircularIcon(180);

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
