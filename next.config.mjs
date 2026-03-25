/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/privacy-policy',
        destination: '/privacy-policy.html',
      },
    ];
  },
};

export default nextConfig;
