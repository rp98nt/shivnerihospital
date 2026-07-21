import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const LOGO_PATH = path.join(process.cwd(), "media", "Shivneri Logo.png");

export async function createCircularIcon(size: number): Promise<Buffer> {
  const input = await readFile(LOGO_PATH);
  const radius = size / 2;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/></svg>`,
  );

  return sharp(input)
    .resize(size, size, { fit: "cover" })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}
