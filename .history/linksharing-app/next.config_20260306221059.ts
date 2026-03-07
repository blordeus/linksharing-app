import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://lqiuhigydzptykupboov.supabase.co",
      },
    ],
  },
};

export default nextConfig;