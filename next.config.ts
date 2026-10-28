import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  images: {
    // Static export has no image optimizer. The portrait is already a webp in public/.
    unoptimized: true,
  },
};

export default nextConfig;
