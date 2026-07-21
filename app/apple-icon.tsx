import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logoSrc = await loadLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={180}
            height={180}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}

async function loadLogoDataUri() {
  const buffer = await readFile(
    path.join(process.cwd(), "media", "Shivneri Logo.png"),
  );
  return `data:image/png;base64,${buffer.toString("base64")}`;
}
