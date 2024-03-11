/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "expert-fly-560.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
