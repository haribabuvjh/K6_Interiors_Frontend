import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — outputs a fully static site to `out/` for AWS S3 + CloudFront.
  // No Node server; all pages are pre-rendered HTML.
  output: "export",
  // Emit each route as a folder with index.html (e.g. /contact/index.html) so
  // S3/CloudFront serve clean URLs without a rewrite function.
  trailingSlash: true,
  // Raw <img> is used throughout; disable the Image Optimization API (needs a
  // server) so any future next/image usage also works in a static export.
  images: { unoptimized: true },
  // Allow the dev server to be opened via tunnel domains (Cloudflare/ngrok).
  allowedDevOrigins: ["*.trycloudflare.com", "*.ngrok-free.app"],
};

export default nextConfig;
