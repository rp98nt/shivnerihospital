import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
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
      {
        source: "/doctors",
        destination: "/team-of-doctors",
        permanent: true,
      },
      {
        source: "/doctors/:slug",
        destination: "/team-of-doctors/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
