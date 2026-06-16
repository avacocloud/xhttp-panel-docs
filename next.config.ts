import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/xhttp-panel-docs" : "",
  images: { unoptimized: true },
};

export default nextConfig;
