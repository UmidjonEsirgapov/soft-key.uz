import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.texnoman.uz" },
      { protocol: "https", hostname: "texnoman.uz" },
    ],
  },
};

export default nextConfig;
