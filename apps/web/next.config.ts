import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from the local network (e.g. phone testing).
  allowedDevOrigins: ["172.28.192.1", "localhost"],
};

export default nextConfig;
