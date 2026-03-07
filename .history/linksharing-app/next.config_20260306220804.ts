import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "YOUR_PROJECT_REF.supabase.co",
      },
    ],
  },
};

export default nextConfig;