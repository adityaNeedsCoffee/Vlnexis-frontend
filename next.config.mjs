
const nextConfig = {
  output: "export",
 
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