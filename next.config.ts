import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/kategoriya/data-science", destination: "/kategoriya/dasturlash", permanent: true },
      { source: "/kategoriya/mobil", destination: "/kategoriya/dasturlash", permanent: true },
    ];
  },
};

export default nextConfig;
