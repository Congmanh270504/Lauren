import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["red-tough-takin-185.mypinata.cloud"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1gb",
    },
  },
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

export default nextConfig;
