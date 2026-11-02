
const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? "/Vlnexis-frontend" : "",
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;