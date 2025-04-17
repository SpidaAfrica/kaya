import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add other Next.js config options here
};

export default nextConfig;

// If you want to enable PWA later:
// import withPWA from 'next-pwa'
// export default withPWA({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   ...nextConfig,
// });
