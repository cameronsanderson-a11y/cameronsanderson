import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Cameron Sanderson. Making things that help the Church communicate better.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return createOgImage();
}
