import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["red-tough-takin-185.mypinata.cloud"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1gb",
    },
  },
};

export default nextConfig;
