import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Você pode omitir ou definir se quiser
      // bodySizeLimit: '1mb', // opcional
      allowedOrigins: ["https://dev-blog-theta-nine.vercel.app"], // opcional
    },
  },
  images: {
    domains: ["localhost", "https://dev-blog-eight-drab.vercel.app"],
  },
};

export default nextConfig;
