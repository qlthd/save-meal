/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Allow Builder.io domain for cross-origin requests
  allowedDevOrigins: [
    "ba36b85d50e646fcbf95731d99c2de47-b497e2ce836f4199a06ea9ec8.projects.builder.codes",
  ],
};

export default nextConfig;
