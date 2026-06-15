import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to be opened via tunnel domains (Cloudflare/ngrok).
  allowedDevOrigins: ["*.trycloudflare.com", "*.ngrok-free.app"],
};

export default nextConfig;
