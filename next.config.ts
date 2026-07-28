import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/personnel/login",
        permanent: false,
      },
      {
        source: "/admin",
        destination: "/personnel/login",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "/personnel/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
