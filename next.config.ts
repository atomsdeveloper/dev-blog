import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "dev-blog-atoms.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
