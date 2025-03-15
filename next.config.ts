import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /* tbh the image was working fine even without it XD */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
